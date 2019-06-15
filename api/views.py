from django.db import transaction, IntegrityError, DatabaseError
from django.contrib.auth.models import User

from rest_framework.viewsets import ViewSet
from rest_framework.authentication import TokenAuthentication  # , SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from learn_to_fly.forms import UserForm, UserProfileForm

from learn_to_fly.models import UserProfile
from api.serializers import UserProfileSerializer, RegisterUserSerializer, UserUpdateSerializer

from otus_final_project.settings import django_logger


from rest_framework.authtoken.models import Token

# Generate token for all registered and active users
for user in User.objects.all():
    if user.is_active:
        Token.objects.get_or_create(user=user)


class UserProfileViewSet(ViewSet):
    authentication_classes = (TokenAuthentication, )

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        django_logger.info(f'user profile action request: "{self.action}"')
        if self.action in ('create', 'destroy', 'update'):
            permission_classes = (IsAdminUser, )
        elif self.action in ('retrieve', ):
            permission_classes = (IsAuthenticated, )
        else:
            permission_classes = (AllowAny, )
        return [permission() for permission in permission_classes]

    queryset = UserProfile.objects
    user_profile_serializer = UserProfileSerializer
    user_register_serializer = RegisterUserSerializer
    user_update_serializer = UserUpdateSerializer

    def create(self, request):
        serializer = self.user_register_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            with transaction.atomic():
                user_form = UserForm(data=serializer.validated_data)
                profile_form = UserProfileForm(data=dict(profile_pic=None, category='student'))
                new_user = user_form.save()
                new_user.set_password(new_user.password)  # hash password
                new_user.save()
                profile = profile_form.save(commit=False)
                profile.user = new_user  # OneToOne relation
                profile.save()
        except (IntegrityError, DatabaseError, Exception) as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.validated_data)

    def list(self, request):
        serializer = self.user_profile_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = request.user
        userprofile = request.user.userprofile
        if user.is_staff or userprofile.id == int(pk):  # user can see his own profile data
            user = self.queryset.filter(id=pk).first()
            return Response(self.user_profile_serializer(user).data)
        else:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk=None):
        request.data.update(dict(pk=pk))
        serializer = self.user_update_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_new_data = serializer.validated_data
        user_profile = user_new_data.pop('pk')
        user_ = user_profile.user
        try:
            with transaction.atomic():
                for attr, value in user_new_data.items():
                    if attr != 'password':
                        setattr(user_, attr, value)
                    else:
                        user_.set_password(value)  # hash new password
                user_.save()
        except (IntegrityError, DatabaseError, Exception) as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.validated_data)

    def destroy(self, request, pk=None):
        user_ = self.queryset.filter(pk=pk).first()
        if user_:
            user_.delete()
            return Response(self.user_profile_serializer(user_).data)
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)


from django.db import transaction, IntegrityError, DatabaseError

from rest_framework.viewsets import ViewSet
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from learn_to_fly.forms import UserForm, UserProfileForm

from learn_to_fly.models import UserProfile
from api.serializers import UserProfileSerializer, RegisterUserSerializer


class UserProfileViewSet(ViewSet):
    authentication_classes = (SessionAuthentication,)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    queryset = UserProfile.objects
    user_serializer = UserProfileSerializer
    user_register_serializer = RegisterUserSerializer

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
                profile.user = new_user  # One to One relation
                profile.save()
        except (IntegrityError, DatabaseError, Exception) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.validated_data)

    def list(self, request):
        serializer = self.user_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = self.queryset.filter(id=pk).first()
        return Response(self.user_serializer(user).data)

    def update(self, request, pk=None):
        user = self.queryset.filter(pk=pk).first()
        if user:
            serializer = self.user_serializer(user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        user = self.queryset.filter(pk=pk).first()
        if user:
            user.delete()
            return Response(self.user_serializer(user).data)
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

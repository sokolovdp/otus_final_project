from django.db import transaction, IntegrityError, DatabaseError
from django.contrib.auth.models import User

from rest_framework.viewsets import ViewSet
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication  # , SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from main_page.forms import UserForm, StudentProfileForm
from main_page.models import (
    StudentProfile,
    Course,
    CourseRegistration,
    # Lecture,
    # CourseSchedule,
)

from api.serializers import (
    StudentProfileSerializer,
    RegisterUserSerializer,
    UserUpdateSerializer,
    CourseSerializer,
    CourseRegistrationSerializer,
)

from otus_final_project.settings import django_logger

from rest_framework.authtoken.models import Token

# Generate token for all registered and active users
# This code should be run only when DB is created
for user in User.objects.all():
    if user.is_active:
        Token.objects.get_or_create(user=user)


class UserProfileViewSet(ViewSet):
    # authentication_classes = (TokenAuthentication,)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        django_logger.info(f'user profile action request: "{self.action}"')
        if self.action in ('create', 'destroy', 'update'):
            permission_classes = (IsAdminUser,)
        elif self.action in ('retrieve',):
            permission_classes = (IsAuthenticated,)
        else:
            permission_classes = (AllowAny,)
        return [permission() for permission in permission_classes]

    queryset = StudentProfile.objects.prefetch_related('courses_registrations')
    student_profile_serializer = StudentProfileSerializer
    user_register_serializer = RegisterUserSerializer
    user_update_serializer = UserUpdateSerializer

    def create(self, request):
        serializer = self.user_register_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            with transaction.atomic():
                user_form = UserForm(data=serializer.validated_data)
                profile_form = StudentProfileForm(data=dict(profile_pic=None, category='student'))
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
        serializer = self.student_profile_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user_ = self.queryset.filter(id=pk).first()
        return Response(self.student_profile_serializer(user_).data)

    def update(self, request, pk=None):
        request.data.update(dict(pk=pk))
        serializer = self.user_update_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_new_data = serializer.validated_data
        student_profile = user_new_data.pop('pk')
        user_ = student_profile.user
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
            return Response(self.student_profile_serializer(user_).data)
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)


class CourseViewSet(ViewSet):
    authentication_classes = (TokenAuthentication,)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        django_logger.info(f'user profile action request: "{self.action}"')
        if self.action in ('create', 'destroy', 'update'):
            permission_classes = (IsAdminUser,)
        elif self.action in ('retrieve',):
            permission_classes = (IsAuthenticated,)
        else:
            permission_classes = (AllowAny,)
        return [permission() for permission in permission_classes]

    queryset = Course.objects.prefetch_related('lectures', 'schedules', 'registrations')
    course_serializer = CourseSerializer

    def create(self, request):
        return Response({'detail': 'not implemented yet'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        return Response({'detail': 'not implemented yet'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        return Response({'detail': 'not implemented yet'}, status=status.HTTP_404_NOT_FOUND)

    def list(self, request):
        serializer = self.course_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        course = self.queryset.filter(id=pk).first()
        return Response(self.course_serializer(course).data)


class StudentCourseRegistrationView(APIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = CourseRegistrationSerializer

    def post(self, request, course_id, student_id):
        registration = CourseRegistration.objects.filter(student_id=student_id, course_id=course_id).first()
        if not registration:
            try:
                student = StudentProfile.objects.get(pk=student_id)
                course = Course.objects.get(pk=course_id)
                registration = CourseRegistration(student=student, course=course)
                registration.save()
            except (IntegrityError, DatabaseError, Exception) as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(self.serializer_class(registration).data)

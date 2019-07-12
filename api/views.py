from datetime import date
from calendar import monthrange

from django.db import transaction, IntegrityError, DatabaseError
from django.contrib.auth.models import User
import django_rq

from rest_framework.viewsets import ViewSet
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication  # , SessionAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser  # AllowAny,
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from main_page.models import (
    StudentProfile,
    Course,
    CourseRegistration,
    CourseSchedule,
)

from api.serializers import (
    StudentProfileSerializer,
    RegisterUserSerializer,
    UserUpdateSerializer,
    CourseSerializer,
    CourseRegistrationSerializer,
    CourseRegistrationParamsSerializer,
    CourseScheduleSerializer,
    MonthYearSerializer,
)

from otus_final_project.settings import django_logger

from main_page.tasks import send_confirmation_mail


class UserProfileViewSet(ViewSet):
    authentication_classes = (TokenAuthentication,)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        django_logger.info(f'user profile action request: "{self.action}"')
        if self.action in ('create', 'destroy', 'update'):
            permission_classes = (IsAdminUser,)
        elif self.action in ('retrieve', 'list'):
            permission_classes = (IsAuthenticated,)
        else:
            permission_classes = ()
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
                new_user = User(**serializer.validated_data)
                new_user.set_password(new_user.password)  # hash password
                new_user.save()
                new_student_profile = StudentProfile(user=new_user, category='student')
                new_student_profile.save()
                Token.objects.get_or_create(user=new_user)

        except (IntegrityError, DatabaseError, Exception) as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            django_rq.enqueue(send_confirmation_mail, new_user.email)

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
        elif self.action in ('retrieve', 'list'):
            permission_classes = (IsAuthenticated,)
        else:
            permission_classes = ()
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


class StudentCourseRegistrationViewSet(ViewSet):
    authentication_classes = (TokenAuthentication,)
    registration_serializer = CourseRegistrationSerializer
    params_serializer = CourseRegistrationParamsSerializer
    queryset = CourseRegistration.objects.prefetch_related('student', 'course')
    error_message = 'user is not allowed to run request'

    @staticmethod
    def user_allowed_to_run_request(authorized_user: User, student_param: StudentProfile) -> bool:
        if authorized_user.is_staff or authorized_user.is_superuser:
            return True
        if not hasattr(authorized_user, 'student_profile'):
            return False
        if student_param.pk != authorized_user.student_profile.pk:
            return False
        return True

    def create(self, request):
        user = request.user
        params_data = self.params_serializer(data=request.query_params)
        params_data.is_valid(raise_exception=True)
        course = params_data.validated_data['course']
        student = params_data.validated_data['student']

        if not self.user_allowed_to_run_request(user, student):
            return Response({'detail': self.error_message}, status=status.HTTP_403_FORBIDDEN)

        registration = CourseRegistration.objects.filter(
            student_id=student.pk,
            course_id=course.pk
        ).first()
        if not registration:
            try:
                registration = CourseRegistration(student=student, course=params_data.validated_data['course'])
                registration.save()
            except (DatabaseError, Exception) as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'registration_id': registration.pk}, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        user = request.user
        params_data = self.params_serializer(data=request.query_params)
        params_data.is_valid(raise_exception=True)
        course = params_data.validated_data['course']
        student = params_data.validated_data['student']

        if not self.user_allowed_to_run_request(user, student):
            return Response({'detail': self.error_message}, status=status.HTTP_403_FORBIDDEN)

        registration = CourseRegistration.objects.filter(
            student_id=student.pk,
            course_id=course.pk
        ).first()
        if registration:
            try:
                registration.delete()
            except (DatabaseError, Exception) as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({}, status=status.HTTP_200_OK)

    def list(self, request):
        serializer = self.registration_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        course = self.queryset.filter(id=pk).first()
        return Response(self.registration_serializer(course).data)

    def update(self, request, pk=None):
        return Response({'detail': 'not implemented yet'}, status=status.HTTP_404_NOT_FOUND)


class MonthCourseCalendarView(APIView):
    authentication_classes = (TokenAuthentication,)
    calendar_serializer = CourseScheduleSerializer
    params_serializer = MonthYearSerializer

    def get(self, request):
        params_data = self.params_serializer(data=request.query_params)
        params_data.is_valid(raise_exception=True)

        month = params_data.validated_data['month']
        year = params_data.validated_data['year']
        schedules_query = CourseSchedule.objects.select_related('course').filter(
            start_date__gte=date(year=year, month=month, day=1),
            start_date__lt=date(year=year, month=month, day=monthrange(year, month)[1]),
        )

        return Response(self.calendar_serializer(schedules_query, many=True).data, status=status.HTTP_200_OK)

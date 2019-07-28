from datetime import date
from calendar import monthrange

from django.db import transaction, IntegrityError, DatabaseError
from django.contrib.auth.models import User

from rest_framework.viewsets import ViewSet
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication  # , SessionAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser  # AllowAny,
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import NotAcceptable

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
    MonthYearSerializer,
)

from otus_final_project.settings import django_logger

from main_page.tasks import send_registration_confirmation_mail

from main_page.views import get_student_registrations


def check_permissions(request):
    """
    Instantiates and returns the list of permissions that this view requires.
    """
    django_logger.info(f'api check permission for the action: "{request.action}"')
    if request.action in ('create', 'destroy', 'update'):
        permission_classes = (IsAdminUser,)
    elif request.action in ('retrieve', 'list'):
        permission_classes = (IsAuthenticated,)
    else:
        permission_classes = ()
    return [permission() for permission in permission_classes]


class StudentProfileViewSet(ViewSet):
    authentication_classes = (TokenAuthentication,)

    def get_permissions(self):
        return check_permissions(self)

    queryset = StudentProfile.objects.select_related('user').prefetch_related('courses_registrations')
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
                token = Token.objects.create(user=new_user)
        except (IntegrityError, DatabaseError, Exception) as e:
            raise NotAcceptable(detail=str(e))
        else:
            send_registration_confirmation_mail(username=new_user.username, email=new_user.email)
            return Response({'user_id': new_user.id, 'student_id': new_student_profile.id, 'token': str(token)})

    def list(self, request):
        serializer = self.student_profile_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user_ = self.queryset.filter(id=int(pk)).first()
        return Response(self.student_profile_serializer(user_).data)

    def update(self, request, pk=None):
        request.data.update(dict(pk=int(pk)))
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
        student_ = self.queryset.filter(pk=int(pk)).first()
        if student_:
            user_ = student_.user
            user_.delete()
            student_.delete()
            return Response({})
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)


class CourseViewSet(ViewSet):
    authentication_classes = (TokenAuthentication,)

    def get_permissions(self):
        return check_permissions(self)

    queryset = Course.objects.prefetch_related('lectures', 'schedules', 'registrations')
    course_serializer = CourseSerializer

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
    user = None
    student = None
    course = None
    registration = None

    @staticmethod
    def user_allowed_to_run_request(authorized_user: User, student_param: StudentProfile) -> bool:
        if authorized_user.is_staff or authorized_user.is_superuser:
            return True
        if not hasattr(authorized_user, 'student_profile'):
            return False
        if student_param.pk != authorized_user.student_profile.pk:
            return False
        return True

    def validate_params_and_user(self, request):
        self.user = request.user
        params_data = self.params_serializer(data=request.query_params)
        params_data.is_valid(raise_exception=True)
        self.course = params_data.validated_data['course']
        self.student = params_data.validated_data['student']

        if not self.user_allowed_to_run_request(self.user, self.student):
            raise NotAcceptable(detail=self.error_message)

        self.registration = self.queryset.filter(
            student_id=self.student.pk,
            course_id=self.course.pk
        ).first()

    def create(self, request):
        self.validate_params_and_user(request)
        if not self.registration:
            try:
                self.registration = CourseRegistration(student=self.student, course=self.course)
                self.registration.save()
                self.registration.refresh_from_db()
            except (DatabaseError, Exception) as e:
                raise NotAcceptable(detail=str(e))

        return Response({'registration_id': self.registration.pk}, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        self.registration = CourseRegistration.objects.filter(pk=pk)
        if self.registration:
            try:
                self.registration.delete()
            except (DatabaseError, Exception) as e:
                raise NotAcceptable(detail=str(e))
        return Response({}, status=status.HTTP_200_OK)

    def list(self, request):
        serializer = self.registration_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        course = self.queryset.filter(id=pk).first()
        return Response(self.registration_serializer(course).data)


class MonthCourseCalendarView(APIView):
    authentication_classes = (TokenAuthentication,)
    params_serializer = MonthYearSerializer

    def get(self, request):
        profile = request.user.student_profile
        registrations = get_student_registrations(profile)

        params_data = self.params_serializer(data=request.query_params)
        params_data.is_valid(raise_exception=True)

        month = params_data.validated_data['month']
        year = params_data.validated_data['year']
        monthly_schedules = CourseSchedule.objects.select_related('course').filter(
            start_date__gte=date(year=year, month=month, day=1),
            start_date__lt=date(year=year, month=month, day=monthrange(year, month)[1]),
        ).values('course__price', 'course__title', 'course_id', 'start_date')
        for sch in monthly_schedules:
            if sch['course_id'] in registrations:
                sch['registered'] = True
            else:
                sch['registered'] = False
        return Response(monthly_schedules, status=status.HTTP_200_OK)

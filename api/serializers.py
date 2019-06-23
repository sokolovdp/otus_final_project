from rest_framework import serializers

from django.contrib.auth.models import User
from main_page.models import (
    StudentProfile,
    Course,
    Lecture,
    CourseSchedule,
    CourseRegistration,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)


class StudentUsernameSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = StudentProfile
        fields = ('id', 'username',)

    @staticmethod
    def get_username(student_profile):
        return student_profile.user.username


# noinspection PyAbstractClass
class RegisterUserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=40)
    password = serializers.CharField(max_length=20)
    email = serializers.CharField(max_length=80)
    first_name = serializers.CharField(max_length=80)
    last_name = serializers.CharField(max_length=80)


# noinspection PyAbstractClass
class UserUpdateSerializer(serializers.Serializer):
    pk = serializers.PrimaryKeyRelatedField(queryset=StudentProfile.objects)
    username = serializers.CharField(max_length=40, required=False)
    password = serializers.CharField(max_length=20, required=False)
    email = serializers.CharField(max_length=80, required=False)
    first_name = serializers.CharField(max_length=80, required=False)
    last_name = serializers.CharField(max_length=80, required=False)


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        exclude = ('course',)


class CourseScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSchedule
        exclude = ('course',)


class ShortCourseRegistrationSerializer(serializers.ModelSerializer):
    student = StudentUsernameSerializer()

    class Meta:
        model = CourseRegistration
        fields = ('id', 'student',)


class CourseSerializer(serializers.ModelSerializer):
    lectures = LectureSerializer(many=True)
    schedules = CourseScheduleSerializer(many=True)
    registrations = ShortCourseRegistrationSerializer(many=True)

    class Meta:
        model = Course
        fields = (
            'id',
            'title',
            'price',
            'number_of_lectures',
            'description',
            'lectures',
            'schedules',
            'registrations',
        )


class CourseRegistrationSerializer(serializers.ModelSerializer):
    student = StudentUsernameSerializer()
    course = CourseSerializer()

    class Meta:
        model = CourseRegistration
        fields = ('id', 'student', 'course',)


class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    courses_registrations = CourseRegistrationSerializer(many=True)

    class Meta:
        model = StudentProfile
        fields = ('user', 'courses_registrations',)

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
        fields = '__all__'


class CourseRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRegistration
        fields = '__all__'


class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    courses_registrations = CourseRegistrationSerializer(many=True)

    class Meta:
        model = StudentProfile
        fields = '__all__'


class RegisterUserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=40)
    password = serializers.CharField(max_length=20)
    email = serializers.CharField(max_length=80)
    first_name = serializers.CharField(max_length=80)
    last_name = serializers.CharField(max_length=80)


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
        fields = '__all__'


class CourseScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSchedule
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    lectures = LectureSerializer(many=True)
    schedules = CourseScheduleSerializer(many=True)

    class Meta:
        model = Course
        fields = '__all__'

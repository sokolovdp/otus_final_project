from django.db import models
from django.contrib.auth.models import User


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    category = models.CharField(max_length=40, null=True)

    def __str__(self):
        return self.user.username


class Course(models.Model):
    title = models.CharField(max_length=200)
    number_of_lectures = models.IntegerField()
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)


class Lecture(models.Model):
    title = models.CharField(max_length=200)
    course = models.ForeignKey(Course, related_name='lectures', on_delete=models.SET_NULL, null=True)
    number_in_course = models.IntegerField()


class CourseRegistration(models.Model):
    student = models.ForeignKey(
        StudentProfile,
        related_name='courses_registrations',
        on_delete=models.CASCADE
    )
    course = models.ForeignKey(Course, related_name='registrations', on_delete=models.CASCADE)


class CourseSchedule(models.Model):
    course = models.ForeignKey(Course, related_name='schedules', on_delete=models.CASCADE)
    start_date = models.DateField()

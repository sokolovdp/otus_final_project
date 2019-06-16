from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to='profile_pics', blank=True)
    category = models.CharField(max_length=40, null=True)

    def __str__(self):
        return self.user.username


class Course(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=400)
    number_of_lectures = models.IntegerField()
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)


class Lecture(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, related_name='lectures', on_delete=models.SET_NULL, null=True)
    number_in_course = models.IntegerField()


class CourseRegistration(models.Model):
    id = models.IntegerField(primary_key=True)
    student = models.ForeignKey(StudentProfile, related_name='students', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='registrations', on_delete=models.CASCADE)


class CourseSchedule(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, related_name='schedules', on_delete=models.CASCADE)
    start_date = models.DateField()


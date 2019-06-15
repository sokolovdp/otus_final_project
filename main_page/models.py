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


class Lecture(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, related_name='lecture', on_delete=models.SET_NULL, null=True)
    number_in_course = models.IntegerField()

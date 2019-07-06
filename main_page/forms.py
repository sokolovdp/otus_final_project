from django import forms
from django.contrib.auth.models import User
from datetime import date

from main_page.models import StudentProfile, CourseRegistration


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('username', 'email', 'password',)  # 'first_name', 'last_name')


class StudentProfileForm(forms.ModelForm):
    class Meta:
        model = StudentProfile
        fields = ('category',)


class CourseRegistrationForm(forms.ModelForm):
    class Meta:
        model = CourseRegistration
        fields = ('course', 'student')


class MonthYearForm(forms.Form):
    min_year = date.today().year
    max_year = min_year + 2
    month = forms.IntegerField(required=True, min_value=1, max_value=12)
    year = forms.IntegerField(required=True, min_value=min_year, max_value=max_year)

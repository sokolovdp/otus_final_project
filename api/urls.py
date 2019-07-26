from django.urls import path

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from api.views import (
    StudentProfileViewSet,
    CourseViewSet,
    StudentCourseRegistrationViewSet,
    MonthCourseCalendarView,
)

app_name = 'api'
router = DefaultRouter(trailing_slash=False)

urlpatterns = [
    path('get_auth_token', obtain_auth_token),
    path('calendar', MonthCourseCalendarView.as_view(), name='api_calendar')
]

router.register('students', StudentProfileViewSet, basename='api_users')
router.register('courses', CourseViewSet, basename='api_courses')
router.register('registration', StudentCourseRegistrationViewSet, basename='api_registration')
urlpatterns += router.urls

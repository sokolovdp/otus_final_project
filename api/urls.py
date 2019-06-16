from django.urls import path

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from api.views import UserProfileViewSet, CourseViewSet

app_name = 'api'
router = DefaultRouter()

urlpatterns = [
    path('get_auth_token/', obtain_auth_token),
]

router.register(r'users', UserProfileViewSet, basename='users')
urlpatterns += router.urls


router.register('courses', CourseViewSet, basename='courses')
urlpatterns += router.urls

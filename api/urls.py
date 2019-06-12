from rest_framework.routers import DefaultRouter
from api.views import UserProfileViewSet

app_name = 'api'
router = DefaultRouter()
urlpatterns = []

router.register(r'users', UserProfileViewSet, basename='users')
urlpatterns += router.urls


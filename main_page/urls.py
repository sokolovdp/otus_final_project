from django.urls import path

from main_page import views

app_name = 'main_page'

urlpatterns = [
    path('register/', views.user_register, name='user_register'),
    path('login/', views.user_login, name='user_login'),
    path('logout/', views.user_logout, name='user_logout'),
    path('courses_list/', views.courses_list, name='courses_list'),
    path('course_detail/<int:pk>', views.course_detail, name='course_detail'),
]

from django.urls import path

from main_page import views

app_name = 'main_page'

urlpatterns = [
    path('register/', views.user_register, name='user_register'),
    path('login/', views.user_login, name='user_login'),
    path('logout/', views.user_logout, name='user_logout'),
    path('courses_list/', views.courses_list, name='courses_list'),
    path('course_detail/<int:pk>', views.course_detail, name='course_detail'),
    path('course_register/<int:course_id>/<int:student_id>', views.course_register, name='course_register'),
    path(
        'cancel_course_registration/<int:course_id>/<int:student_id>',
        views.cancel_course_registration, name='cancel_course_registration'
    ),
    path('calendar/', views.courses_calendar, name='courses_calendar'),
    path('start_email_scheduler/', views.admin_start_email_scheduler, name='start_email_scheduler'),
]

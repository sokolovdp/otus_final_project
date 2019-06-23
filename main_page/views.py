from datetime import date

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout

from main_page.forms import UserForm, StudentProfileForm, CourseRegistrationForm
from otus_final_project.settings import django_logger
from main_page.models import (
    Course,
    CourseRegistration,
    StudentProfile,
    # CourseSchedule,
    # Lecture,
)


def index_view(request):
    context = {'active': "home"}
    return render(request, 'index.html', context=context)


@login_required
def user_logout(request):
    logout(request)
    django_logger.info(f'successful user logout: "{request.user.username}"')
    return HttpResponseRedirect(reverse('index'))


def user_login(request):
    errors_string = None
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                django_logger.info(f'successful user login: "{user.username}"')
                return HttpResponseRedirect(reverse('index'))
            else:
                django_logger.info(f'try to login not active user: "{user.username}"')
                errors_string = 'ACCOUNT IS NOT ACTIVE!'
        else:
            django_logger.info(f'invalid login: "{username}" password: "{password}"')
            errors_string = 'INVALID USERNAME OR PASSWORD!'

    context = {'active': "login", 'errors': errors_string}
    return render(request, 'login.html', context=context)


def user_register(request):
    registered = False
    errors_string = None

    if request.method == "POST":
        user_form = UserForm(data=request.POST)

        if user_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)  # hash password
            user.save()

            profile_form = StudentProfileForm(data={'category': 'student'})
            profile = profile_form.save(commit=False)
            profile.user = user  # One to One relation
            profile.save()
            registered = True
            django_logger.info('successful user registration!')
        else:
            all_errors = []
            for err_list in user_form.errors.values():
                all_errors.append(' '.join(err_list))
            errors_string = ' '.join(all_errors)
    else:
        registered = True if request.user.username else False
        user_form = UserForm()

    context = {
        'active': 'register',
        'errors': errors_string,
        'user_form': user_form,
        'registered': registered
    }
    return render(request, 'registration.html', context=context)


@login_required
def courses_list(request):
    user = request.user
    student = user.student_profile if hasattr(user, 'student_profile') else None
    courses = list(Course.objects.prefetch_related('registrations').all())
    student_registrations = {course.id for course in courses if course.student_registered(student.id)}
    context = {
        'courses': courses,
        'student_id': student.id if student else None,
        'student_registrations': student_registrations,
    }
    return render(request, 'courses_list.html', context=context)


@login_required
def course_detail(request, pk):
    user = request.user
    student = user.student_profile if hasattr(user, 'student_profile') else None
    course = Course.objects \
        .prefetch_related('lectures', 'schedules', 'registrations') \
        .order_by('lectures__number_in_course') \
        .get(pk=pk)
    lectures = list(course.lectures.all())
    registrations = list(course.registrations.all())
    schedules = list(course.schedules.all())

    for schedule in schedules:  # find 1st date in course schedule in future
        if date.today() <= schedule.start_date:
            scheduled = schedule.start_date
            break
    else:
        scheduled = None

    student_registered = False  # check if student registered for this course
    for registration in registrations:
        if registration.student.pk == student.pk:
            student_registered = True

    context = {
        'student': student,
        'course': course,
        'lectures': lectures,
        'registrations': len(registrations) if registrations else 0,
        'scheduled': scheduled,
        'student_registered': student_registered,
    }
    return render(request, 'course_detail.html', context=context)


def get_course_registration(course_id=None, student_id=None):
    course_registration = CourseRegistration.objects.select_related('course', 'student').filter(
        student_id=student_id,
        course_id=course_id
    ).first()
    return course_registration


@login_required
def course_register(request, course_id, student_id):
    user = request.user
    student = user.student_profile if hasattr(user, 'student_profile') else None
    course_registration = get_course_registration(course_id=course_id, student_id=student_id)
    course = Course.objects.filter(pk=course_id).first()
    if student_id == student.id and not course_registration and course:
        CourseRegistration(student=student, course=course).save()

    return HttpResponseRedirect(reverse('main_page:course_detail', args={course_id}))


@login_required
def cancel_course_registration(request, course_id, student_id):
    user = request.user
    student = user.student_profile if hasattr(user, 'student_profile') else None
    course_registration = get_course_registration(course_id=course_id, student_id=student_id)
    if student_id == student.id and course_registration:
        course_registration.delete()

    return HttpResponseRedirect(reverse('main_page:course_detail', args={course_id}))
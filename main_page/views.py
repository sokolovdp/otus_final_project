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
        profile_form = StudentProfileForm(data=request.POST)

        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)  # hash password
            user.save()

            profile = profile_form.save(commit=False)
            profile.user = user  # One to One relation

            if 'profile_pic' in request.FILES:
                profile.profile_pic = request.FILES['profile_pic']

            profile.save()
            registered = True
            django_logger.info('successful user registration!')
        else:
            all_errors = []
            for err_list in user_form.errors.values():
                all_errors.append(' '.join(err_list))
            for err_list in profile_form.errors.values():
                all_errors += ' '.join(err_list)
            errors_string = ' '.join(all_errors)
    else:
        registered = True if request.user.username else False
        user_form = UserForm()
        profile_form = StudentProfileForm()

    context = {
        'active': 'register',
        'errors': errors_string,
        'user_form': user_form,
        'profile_form': profile_form,
        'registered': registered
    }
    return render(request, 'registration.html', context=context)


@login_required
def courses_list(request):
    context = {
        'courses': list(Course.objects.all())
    }
    return render(request, 'courses_list.html', context=context)


@login_required
def course_detail(request, pk):
    user = request.user
    student = request.user.studentprofile if hasattr(user, 'studentprofile') else None
    course = Course.objects \
        .prefetch_related('lectures', 'schedules', 'registrations') \
        .order_by('lectures__number_in_course') \
        .get(pk=pk)
    lectures = list(course.lectures.all())
    registrations = list(course.registrations.all())
    schedules = list(course.schedules.all())
    context = {
        'student': student,
        'course': course,
        'lectures': lectures,
        'registrations': len(registrations) if registrations else 111,
        'scheduled': schedules[0].start_date if schedules else None,
    }
    return render(request, 'course_detail.html', context=context)


@login_required
def course_register(request, course_id, student_id):
    student_registered = False
    errors_string = None

    if request.method == "POST":
        course_registration_form = CourseRegistrationForm(data=request.POST)

        if course_registration_form.is_valid():
            course_registration_form.save()
            student_registered = True
            django_logger.info('successful course registration!')
        else:
            all_errors = []
            for err_list in course_registration_form.errors.values():
                all_errors.append(' '.join(err_list))
            errors_string = ' '.join(all_errors)
    else:
        course_registration = CourseRegistration.objects.filter(student_id=student_id, course_id=course_id).first()
        student_registered = True if course_registration else False
        course_registration_form = CourseRegistrationForm(
            initial={
                'student': StudentProfile.objects.filter(pk=student_id).first(),
                'course': Course.objects.filter(pk=course_id).first()
            }
        )

    context = {
        'errors': errors_string,
        'course_registration_form': course_registration_form,
        'student_registered': student_registered
    }
    return render(request, 'course_registration.html', context=context)

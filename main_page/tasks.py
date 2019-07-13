from datetime import date, timedelta

from django_rq import job, enqueue
from django.core.mail import send_mass_mail, send_mail

from otus_final_project.settings import DEFAULT_FROM_EMAIL, django_logger

from main_page.models import CourseSchedule, CourseRegistration


def send_registration_confirmation_mail(username: str = None, email: str = None ):
    subject = 'Thank you for registering!'
    message = f"""
               Dear {username},\n
               Thank you for registering at Learn To Fly site!\n\n
               Sincerely,
               Learn to Fly Team"""
    enqueue(
        send_mail_to_student,
        user_mail=email,
        subject=subject,
        message=message
    )


@job('default')
def send_mail_to_student(user_mail: str = None, subject: str = None, message: str = None):
    send_mail(subject, message, DEFAULT_FROM_EMAIL, [user_mail, ], fail_silently=True)
    django_logger.info(f'\nsend mail to student email address: {user_mail}')
    return True


@job('low')
def send_course_begin_mails():
    days = 23
    today = date.today()
    tomorrow = today + timedelta(days=days)
    schedules = CourseSchedule.objects.select_related('course').filter(
        start_date__lte=tomorrow,
        start_date__gt=today,
    ).all()
    courses = {sch.course for sch in schedules}
    registrations = CourseRegistration.objects.select_related('student', 'course').filter(course__in=courses).all()
    mail_templates = [
        (rg.student.user.email, rg.student.user.first_name, rg.course.title) for rg in registrations
    ]

    message_tupples = []
    for mt in mail_templates:
        subject = f'{mt[2]} will start in {days} day(s)'
        message = f"""
            Dear {mt[1]},
            You are registered for the {mt[2]} course, which will start in {days} day(s)!\n\n
            Sincerely,
            Learn to Fly Team"""
        to_mail = mt[0]
        message_tupples.append((subject, message, DEFAULT_FROM_EMAIL, [to_mail, ], ))

    django_logger.info(f'sending {len(message_tupples)} course begins mails')
    send_mass_mail(message_tupples, fail_silently=True)

    return True


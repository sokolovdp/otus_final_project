from datetime import datetime, date, timedelta

import django_rq
from django_rq import job

from django.core.mail import send_mass_mail, send_mail

from otus_final_project.settings import DEFAULT_FROM_EMAIL
from main_page.models import CourseSchedule, CourseRegistration
from otus_final_project.settings import django_logger


@job('default')
def send_confirmation_mail(user_name=None, user_mail=None):
    django_logger.info(f'\nconfirmation mail to {user_mail if user_mail else " - "}')
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
    mail_templates = [(rg.student.user.email, rg.student.user.first_name, rg.course.title) for rg in registrations]

    message_tupples = []
    for mt in mail_templates:
        subject = f'{mt[2]} will start in {days} day(s)'
        message = f"""
            Dear {mt[1]},
            You are registered for the {mt[2]} course, which will start in {days} day(s)!
            \n\nSincerely, Learn to Fly Team"""
        to_mail = 'sokolovdp@gmail.com'  # mt[0]
        message_tupples.append((subject, message, DEFAULT_FROM_EMAIL, [to_mail, ]))

    django_logger.info(f'sending {len(message_tupples)} course begins mails')
    send_mass_mail(tuple(message_tupples))

    return True


# Start  RQ-Scheduler to send warnings mails
#
# IN_24_HOURS = 5  # 24 * 60 * 60
# FOREVER = 3  # None
#
# scheduler = django_rq.get_scheduler(name='low')
# job_low = scheduler.schedule(
#     datetime.utcnow(),
#     send_course_begin_mails,
#     repeat=FOREVER,
#     interval=IN_24_HOURS,
#     result_ttl=600,
#     queue_name='low',
# )

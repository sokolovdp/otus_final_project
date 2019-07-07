from datetime import datetime, timedelta
import django_rq
from django_rq import job

from django.core.mail import send_mass_mail
from django.contrib.auth.models import User
from main_page.models import Course, CourseSchedule, CourseRegistration


@job('default')
def send_confirmation_mail(user_mail=None):
    print(f'\nconfirmation mail to {user_mail if user_mail else "test@test.ru"}')
    return True


@job('low')
def send_course_begin_mails():
    print(f'\nsending course warning mails !!!!!!!!')
    mail_list = ['mail@mail.ru', ]
    send_mass_mail(
        'Course you registered will start in one day!',
        'Here is the message.',
        'from@learn_to_fly.com',
        mail_list
    )
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

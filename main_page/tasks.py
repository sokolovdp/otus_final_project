from datetime import datetime, timedelta
import django_rq
from django_rq import job
from django.contrib.auth.models import User
from main_page.models import Course, CourseSchedule, CourseRegistration


@job('default')
def send_confirmation_mail(user_mail=None):
    print(f'\nconfirmation mail to {user_mail if user_mail else "test@test.ru"}')
    return True


@job('low')
def send_course_begin_mails():
    print(f'\nsending course warning mails !!!!!!!!')
    return True


IN_24_HOURS = 5  # 24 * 60 * 60
FOREVER = 3  # None

scheduler = django_rq.get_scheduler(name='low')
job_low = scheduler.schedule(
    datetime.utcnow(),
    send_course_begin_mails,
    repeat=FOREVER,
    interval=IN_24_HOURS,
    result_ttl=600,
    queue_name='low',
)

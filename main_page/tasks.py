import time
from datetime import datetime, timedelta
import django_rq
from django_rq import job
from django.contrib.auth.models import User
from main_page.models import Course, CourseSchedule, CourseRegistration


@job
def send_confirmation_mail(user_mail=None):
    print(f'\nsending confirmation mail to {user_mail if user_mail else "test@test.ru"}')
    return True


@job
def send_course_begin_mails():
    print(f'\nsending course warning mails')
    return True


IN_24_HOURS = 24 * 60 * 60
FOREVER = None
scheduler = django_rq.get_scheduler()

job1 = scheduler.schedule(
    datetime.now(),
    send_course_begin_mails,
    repeat=FOREVER,
    interval=1,
    result_ttl=1
)
job2 = scheduler.schedule(
    datetime.now(),
    send_confirmation_mail,
    repeat=FOREVER,
    interval=2,
    result_ttl=2
)

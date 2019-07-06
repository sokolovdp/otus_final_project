import time
from django_rq import job


@job("default")
def send_confirmation_mail(user_mail):
    print(f'\nsending confirmation mail to {user_mail}')
    time.sleep(5)
    return True

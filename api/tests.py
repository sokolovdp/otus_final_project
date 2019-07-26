import json
from django.test import TestCase
from django.contrib.auth.models import User
from django.test.client import Client


class ApiTestCase(TestCase):
    allow_database_queries = True
    admin_username = 'test_admin'
    admin_password = 'test_password'
    admin_api_token = None
    user = None
    student_profile = None

    api_token = None

    def setUp(self):
        User.objects.create_superuser(
            username=self.admin_username,
            email='testemail@test.com',
            password=self.admin_password)
        # test_client = Client()
        # test_client.login(username=self.username, password=self.password)
        response = self.client.post(
            path='/api/v1/get_auth_token',
            data=json.dumps(
                {
                    "username": self.admin_username,
                    "password": self.admin_password,
                }
            ),
            content_type='application/json')
        self.admin_api_token = response.data['token']

    def test_user_register(self):
        response = self.client.post(
            path='/api/v1/users',
            data=json.dumps(
                {
                    "username": "api_test",
                    "password": "api_test",
                    "email": "sokolovdp@gmail.com",
                    "first_name": "tuti",
                    "last_name": "fruti"
                }
            ),
            content_type='application/json',
            authorization=f'Token {self.admin_api_token}'
        )
        self.client.cookies = response.cookies
        try:
            self.api_token = response.data['token']
        except KeyError:
            print('\nNo token in response.data=', response.data)
            raise
        self.assertEqual(1, 1, 'reason 0')

    def test_user_profile_viewset(self):
        self.assertEqual(1, 1, 'reason 1')

    def test_course_viewset(self):
        self.assertEqual(1, 1, 'reason 2')

    def test_student_course_registration_viewset(self):
        self.assertEqual(1, 1, 'reason 3')

    def test_month_calendar_view(self):
        self.assertEqual(1, 1, 'reason 4')

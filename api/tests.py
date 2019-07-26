import json

from django.test import TestCase
from django.test.client import Client
from django.contrib.auth.models import User

from rest_framework.test import APIClient, APITestCase

MAX_STUDENTS = 3


class ApiTestCase(APITestCase):
    admin_username = 'test_admin'
    admin_password = 'test_password'
    admin_api_token = None
    api_client = None
    api_token = None

    def setUp(self):
        User.objects.create_superuser(
            username=self.admin_username,
            email='testemail@test.com',
            password=self.admin_password)

        self.api_client = APIClient()

        response = self.api_client.post(
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
        self.api_client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_api_token)

        # create 3 new user/students
        student_id = 0
        for i in range(MAX_STUDENTS):
            response = self.api_client.post(
                path='/api/v1/users',
                data=json.dumps(
                    {
                        "username": f"api_test_{i}",
                        "password": f"api_test_{i}",
                        "email": f"test{i}@gmail.com",
                        "first_name": f"tuti{i}",
                        "last_name": f"fruti{i}"
                    }
                ),
                content_type='application/json',
            )
            self.client.cookies = response.cookies
            self.assertTrue('token' in response.data, 'user-student create must return token')
            if i == 0:
                student_id = response.data['student_id']

        # get list of 3 users/students
        response = self.api_client.get(path='/api/v1/users')
        self.assertTrue(len(response.data) == 3, 'list request must return 3 user/students')

        # retrieve 1st users/students
        response = self.api_client.get(path=f'/api/v1/users/{student_id}')
        self.assertTrue(
            response.data['user']['username'] == 'api_test_0',
            'get request must return 1st user/student'
        )

    def test_user_profile_viewset(self):
        self.assertEqual(1, 1, 'reason 1')

    def test_course_viewset(self):
        self.assertEqual(1, 1, 'reason 2')

    def test_student_course_registration_viewset(self):
        self.assertEqual(1, 1, 'reason 3')

    def test_month_calendar_view(self):
        self.assertEqual(1, 1, 'reason 4')

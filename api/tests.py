import json
from collections import namedtuple
# from django.test import TestCase
# from django.test.client import Client
from django.contrib.auth.models import User

from rest_framework.test import APIClient, APITestCase

from main_page.models import (
    Course,
    Lecture,
    # StudentProfile,
    # CourseRegistration,
    # CourseSchedule,
)

MAX_STUDENTS = 3
MAX_COURSES = 2
MAX_LECTURES = 2

StudentData = namedtuple('StudentData', 'user_id student_id token')
CourseData = namedtuple('CourseData', 'course lectures')


class ApiTestCase(APITestCase):
    admin_username = 'test_admin'
    admin_password = 'test_password'
    admin_api_token = None
    api_client = None
    api_token = None

    def create_students(self, students_number: int) -> list:
        students_list = []
        for i in range(1, students_number + 1):
            response = self.api_client.post(
                path='/api/v1/students',
                data=json.dumps(
                    {
                        "username": f"api_test_{i}",
                        "password": f"api_test_{i}",
                        "email": f"test_{i}@gmail.com",
                        "first_name": f"tuti{i}",
                        "last_name": f"fruti{i}"
                    }
                ),
                content_type='application/json',
            )
            self.assertTrue('token' in response.data, 'user-student create must return token')
            self.assertTrue('user_id' in response.data, 'user-student create must return user_id')
            self.assertTrue('student_id' in response.data, 'user-student create must return student_id')
            student_data = StudentData(**response.data)
            students_list.append(student_data)
        return students_list

    @staticmethod
    def create_courses_lectures(courses_number: int, lectures_number: int) -> list:
        courses_list = []
        for i in range(1, courses_number+1):
            mock_course = Course(
                title=f'course_{i}',
                number_of_lectures=lectures_number,
                description=f'test{i}',
                price=333.5
            )
            mock_course.save()
            mock_course.refresh_from_db()
            lectures_list = []
            for j in range(1, lectures_number+1):
                mock_lecture = Lecture(title=f'lecture_{i}_{j}', course=mock_course, number_in_course=j)
                mock_lecture.save()
                mock_lecture.refresh_from_db()
                lectures_list.append(mock_lecture)
            course_data = CourseData(course=mock_course, lectures=lectures_list)
            courses_list.append(course_data)
        return courses_list

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
        self.api_client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_api_token)

    def test_student_profile_viewset(self):
        # Create 3 new user/students
        student_data_list = self.create_students(MAX_STUDENTS)
        self.assertTrue(
            len(student_data_list) == MAX_STUDENTS,
            f'list request must return {MAX_STUDENTS} user/students'
        )

        # Check: get list of 3 new users/students
        response = self.api_client.get(path='/api/v1/students')
        self.assertTrue(
            len(response.data) == MAX_STUDENTS,
            f'list request must return {MAX_STUDENTS} user/students'
        )

        # Update 1st users/student
        response = self.api_client.put(
            path=f'/api/v1/students/{student_data_list[0].student_id}',
            data=json.dumps({"first_name": f"mutated"}),
            content_type='application/json',
        )
        self.assertTrue(
            response.data['first_name'] == 'mutated',
            'update request must return user/student first_name'
        )
        # Check: retrieve 1st users/student updated info
        response = self.api_client.get(path=f'/api/v1/students/{student_data_list[0].student_id}')
        self.assertTrue(
            response.data['user']['first_name'] == 'mutated',
            'get request must return 1st user/student'
        )

        # Destroy 1st users/student
        response = self.api_client.delete(
            path=f'/api/v1/students/{student_data_list[0].student_id}',
            content_type='application/json',
        )
        self.assertTrue(
            response.status_code == 200,
            'delete request must return status 200'
        )
        # Check: retrieve 1st users/student should return empty data
        response = self.api_client.get(path=f'/api/v1/students/{student_data_list[0].student_id}')
        self.assertTrue(
            response.data['user']['first_name'] == '',
            'get request must return empty data of the deleted 1st user/student'
        )

    def test_course_viewset(self):
        courses_list = self.create_courses_lectures(MAX_COURSES, MAX_LECTURES)

        # Get list of all courses with lectures
        response = self.api_client.get(path='/api/v1/courses')
        # Check the result
        self.assertTrue(
            len(response.data) == MAX_COURSES,
            f'list request must return {MAX_COURSES} courses each with {MAX_LECTURES} lectures'
        )
        self.assertTrue(
            len(response.data[0]['lectures']) == MAX_LECTURES,
            f'list of lectures in the first course must be contains {MAX_LECTURES} lectures'
        )

        # Get detailed of all courses with lectures
        response = self.api_client.get(path=f'/api/v1/courses/{courses_list[0].course.id}')
        self.assertTrue(
            response.status_code == 200,
            'get course by id should not return error'
        )
        self.assertTrue(
            response.data['title'] == 'course_1',
            'get course by first id should return first title'
        )

    def test_student_course_registration_viewset(self):
        student = self.create_students(1)[0]
        course = self.create_courses_lectures(1, 1)[0].course
        # Create course registration
        response = self.api_client.post(
            path=f'/api/v1/registration?student={student.student_id}&course={course.id}'
        )
        # Check the result
        self.assertTrue(
            'registration_id' in response.data,
            f'create registration must return registration_id'
        )
        registration_id = response.data['registration_id']
        response = self.api_client.get(
            path=f'/api/v1/registration/{registration_id}'
        )
        # Check the result
        self.assertTrue(
            response.status_code == 200,
            f'retrieve registration must return status == 200'
        )


    def test_month_calendar_view(self):
        self.assertEqual(1, 1, 'reason 4')

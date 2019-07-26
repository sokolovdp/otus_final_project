from django.test import TestCase


class ApiTestCase(TestCase):
    def setUp(self):
        pass

    def test_user_profile_viewset(self):
        self.assertEqual(1, 1, 'reason 1')

    def test_course_viewset(self):
        self.assertEqual(1, 1, 'reason 2')

    def test_student_course_registration_viewset(self):
        self.assertEqual(1, 1, 'reason 3')

    def test_month_calendar_view(self):
        self.assertEqual(1, 0, 'reason 4')

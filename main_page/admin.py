from django.contrib import admin

from main_page.models import (
    StudentProfile,
    StudentProfileAdmin,
    Course,
    CourseAdmin,
    Lecture,
    LectureAdmin,
    CourseRegistration,
    CourseRegistrationAdmin,
    CourseSchedule,
    CourseScheduleAdmin,
)

admin.site.register(StudentProfile, StudentProfileAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lecture, LectureAdmin)
admin.site.register(CourseRegistration, CourseRegistrationAdmin)
admin.site.register(CourseSchedule, CourseScheduleAdmin)

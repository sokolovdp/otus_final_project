from django.contrib import admin

from main_page.models import (
    StudentProfile,
    Course,
    Lecture,
    CourseRegistration,
    CourseSchedule,
)


class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ('user',  'category')
    list_filter = ('category', )
    fields = ['category', 'user', ]


class LectureInline(admin.TabularInline):
    model = Lecture


class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'number_of_lectures', 'description', 'price')
    list_filter = ('number_of_lectures', 'price')
    fields = [('title', 'number_of_lectures', 'price'), 'description']
    inlines = [LectureInline, ]


class LectureAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'number_in_course')
    list_filter = ('course',)
    fields = [('number_in_course', 'title'), 'course']


class CourseRegistrationAdmin(admin.ModelAdmin):
    list_display = ('student', 'course')
    list_filter = ('course', 'student')
    fields = ['student', 'course']


class CourseScheduleAdmin(admin.ModelAdmin):
    list_display = ('course', 'start_date')
    list_filter = ('course', 'start_date')
    fields = ['course', 'start_date']


admin.site.register(StudentProfile, StudentProfileAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lecture, LectureAdmin)
admin.site.register(CourseRegistration, CourseRegistrationAdmin)
admin.site.register(CourseSchedule, CourseScheduleAdmin)

admin.site.index_template = 'extra_admin.html'

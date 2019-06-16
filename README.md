# Final Project - Demo Learning Web Site "Lean To Fly" in Django with implementation of simple user authorization scheme and Rest API

## Run application
```
python manage.py runserver
```
Django server will start at localhost:8000/


##  All models (student, course, lecture, curse schedule, course registartion and so on can be edited in by Django Admin site:
```
../admin

```

## Backend APIs to support CRUD actions for User and Course models were created with DRF ViewSet. For authorization is used Token Authorization scheme

```
POST: /api/v1/get_auth_token/
{
    "password": "*******",
    "username": "admin"
}
RESPONSE:
{
    "token": "e42325582f6f9fd3782034a2e746c2519b06ed6a"
}
HEADERS:
Content-Type:application/json
Authorization:Token ec710681622a1d8042d606077612cdce7b84411f

```
## Sample of User and Course detailed views results:

USER:
```
{
    "id": 2,
    "user": {
        "id": 3,
        "password": "argon2$argon2i$v=19$m=512,t=2,p=2$OHVjU092bkx1RFBN$BvrtbKtpvZR3V0quaaiNaQ",
        "last_login": "2019-06-16T17:00:06.848033+03:00",
        "is_superuser": false,
        "username": "testik",
        "first_name": "",
        "last_name": "",
        "email": "testik@test.ru",
        "is_staff": false,
        "is_active": true,
        "date_joined": "2019-06-16T12:18:29.023061+03:00",
        "groups": [],
        "user_permissions": []
    },
    "courses_registrations": [
        {
            "id": 2,
            "student": 2,
            "course": 2
        },
        {
            "id": 3,
            "student": 2,
            "course": 1
        }
    ],
    "profile_pic": null,
    "category": "student"
}

```
COURSE:
```
{
    "id": 2,
    "lectures": [
        {
            "id": 3,
            "title": "Django Part 1",
            "number_in_course": 1,
            "course": 2
        },
        {
            "id": 4,
            "title": "Django Part 2",
            "number_in_course": 2,
            "course": 2
        }
    ],
    "schedules": [
        {
            "id": 2,
            "start_date": "2019-07-17",
            "course": 2
        }
    ],
    "registrations": [
        {
            "id": 2,
            "student": 2,
            "course": 2
        }
    ],
    "title": "Django 2.2 Master class",
    "number_of_lectures": 2,
    "description": "mxncvmx vz,ncwfow ieowjfl ...",
    "price": "145.50"
}
```
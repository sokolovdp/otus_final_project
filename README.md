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
POST: /api/v1/get_auth_token
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

## RQ is used to run Async Worker and Scheduler. To run rq's worker and scheduler:
```
python manage.py rqworker
python manage.py rqscheduler
```

## @Mailgun is used as remote email server
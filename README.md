# Final Project - Web site in Django with implementation of simple user authorization scheme and Rest API

## Run application
```
python manage.py runserver
```
Django server will start at localhost:8000/


## To create users (student or teacher) go to Django Admin site:
```
../admin

```

## Backend API views were created with DRF ViewSet

```
class UserProfileViewSet(ViewSet):
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated, )

    queryset = UserProfile.objects
    serializer_class = UserProfileSerializer

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = self.queryset.filter(id=pk).first()
        return Response(self.serializer_class(user).data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_user = serializer.create(validated_data=serializer.validated_data)
        return Response(self.serializer_class(new_user).data)

    def update(self, request, pk=None):
        user = self.queryset.filter(pk=pk).first()
        if user:
            serializer = self.serializer_class(user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        user = self.queryset.filter(pk=pk).first()
        if user:
            user.delete()
            return Response(self.serializer_class(user).data)
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

```

## GET /api/v1/users/ will return list of users

```
[
    {
        "id": 1,
        "user": {
            "id": 3,
            "password": "argon2$argon2i$v=19$m=512,t=2,p=2$eTBBbWt2N2kybk5F$2U1Vng+rtrZrJ9ftQpnj7A",
            "last_login": null,
            "is_superuser": false,
            "username": "dmitrii",
            "first_name": "Dmitrii",
            "last_name": "Sokolov",
            "email": "test@mail.ru",
            "is_staff": false,
            "is_active": true,
            "date_joined": "2019-06-12T18:09:40+03:00",
            "groups": [],
            "user_permissions": []
        },
        "profile_pic": null,
        "category": "student"
    }
]
```
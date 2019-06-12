# Final Project - Web site in Django with implementation of simple user authorization scheme and Rest API

## Run application
```
python manage.py runserver
```
Django server will start at localhost:8000/


## To load initial data into DB run:
```
python manage.py loaddata ./main_app/fixtures/items.json

```

##  To get version number API: GET /api/version/
```
{
    "commit": "1a2623f8f85fdb680a8be43956e1c767c59256a9",
    "branch": "master",
    "commit_date": "2019-05-29T17:02:03",
    "version": "0.2",
    "started": "2019-05-31T08:44:21",
    "uptime_seconds": 4
}
```

## Backend API views were created with following classes: APIView, generic ListAPIView, and ViewSet

```
class VersionView(APIView):

    def get(self, request):
        result = settings.APPLICATION_VERSION
        uptime = datetime.now() - result['started']
        result['uptime_seconds'] = uptime.seconds
        settings.django_logger.info(f'Version API test: {result}')
        return Response(result)


class UserProfileView(ListAPIView):
    # authentication_classes = (SessionAuthentication,)
    # permission_classes = (IsAuthenticated,)

    queryset = UserProfileInfo.objects
    serializer_class = UserProfileInfoSerializer


class ItemViewSet(ViewSet):
    # authentication_classes = (SessionAuthentication,)
    # permission_classes = (IsAuthenticated,)

    queryset = ItemModel.objects
    serializer_class = ItemModelSerializer

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        item = self.queryset.filter(id=pk).first()
        return Response(self.serializer_class(item).data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_item = serializer.create(validated_data=serializer.validated_data)
        return Response(self.serializer_class(new_item).data)

    def update(self, request, pk=None):
        item = self.queryset.filter(pk=pk).first()
        if item:
            serializer = self.serializer_class(item, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        item = self.queryset.filter(pk=pk).first()
        if item:
            item.delete()
            return Response(self.serializer_class(item).data)
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)


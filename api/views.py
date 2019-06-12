from rest_framework.viewsets import ViewSet
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from learn_to_fly.models import UserProfile
from api.serializers import UserProfileSerializer


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


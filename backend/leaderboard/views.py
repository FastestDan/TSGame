from django.shortcuts import render

from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from .models import Leaderboard
from .serializers import LeaderboardSerializer


class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': user.id})


class CreateHiScore(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = LeaderboardSerializer

    def get_queryset(self):
        return Leaderboard.objects.filter(user=self.request.user)


class ReUpDestHiScore(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer
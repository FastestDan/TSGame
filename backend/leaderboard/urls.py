from django.urls import path

from .views import (
    CreateHiScore,
    Login,
    ReUpDestHiScore,
)

urlpatterns = [
    path('create-hi-score/', CreateHiScore.as_view(), name="create-hi-score"),
    path('login/', Login.as_view(), name="login"),
    path('reupde-hi-score/<int:pk>', ReUpDestHiScore.as_view(), name="reupde")
]
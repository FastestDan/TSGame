from django.db import models
from django.conf import settings

# Create your models here.
class Leaderboard(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    score = models.IntegerField()

    def __str__(self):
        return self.score
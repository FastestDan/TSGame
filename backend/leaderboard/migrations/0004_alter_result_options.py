# Generated by Django 4.2.7 on 2024-01-29 19:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('leaderboard', '0003_rename_results_result'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='result',
            options={'ordering': ['score']},
        ),
    ]
# Generated by Django 2.2.2 on 2019-06-23 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_page', '0002_auto_20190622_1409'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentprofile',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]

# Generated by Django 5.1.3 on 2024-11-15 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0008_alter_loan_max_duration_alter_loan_min_duration_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='loan',
            name='is_params_defined',
            field=models.BooleanField(default=False),
        ),
    ]

# Generated by Django 5.1.3 on 2024-11-15 22:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0009_loan_is_params_defined'),
    ]

    operations = [
        migrations.AddField(
            model_name='loan',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending', help_text='Current status of the loan', max_length=20),
        ),
    ]

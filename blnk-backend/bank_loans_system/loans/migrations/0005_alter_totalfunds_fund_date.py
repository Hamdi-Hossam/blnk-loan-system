# Generated by Django 5.1.3 on 2024-11-15 15:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0004_rename_bank_id_loanfund_bank'),
    ]

    operations = [
        migrations.AlterField(
            model_name='totalfunds',
            name='fund_date',
            field=models.DateField(default=datetime.datetime),
        ),
    ]

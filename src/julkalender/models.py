from django.db import models, connection, transaction
from django.utils.crypto import get_random_string
import os
from django_cron import CronJobBase, Schedule

from django.db.models.signals import post_save
from django.dispatch import receiver

from django.core import management

from app.settings_shared import MEDIA_ROOT, BACKUP_DIR
import logging

logger = logging.getLogger(__name__)

def update_filename(instance, filename):
    path = "doorcontent/"
    randomfolder = get_random_string(length=24)
    return os.path.join(path, randomfolder, filename)

class Door(models.Model):
    year = models.IntegerField()
    day = models.IntegerField(choices=[(i, i) for i in range(1, 25)])
    image = models.ImageField(upload_to=update_filename, blank=True, null=True)
    text = models.TextField(blank=True)
    embed_url = models.URLField(blank=True)
    contributor = models.CharField(max_length=100)


    def __str__(self):
        return f"{self.year}-{self.day} {self.contributor}"


    class Meta:
        unique_together = (("year", "day"),)

@receiver(post_save, sender=Door)
def deleting_old_image(sender, instance, **kwargs):
    for root, dirs, files in os.walk(os.path.join(MEDIA_ROOT, "doorcontent")):
        for d in dirs:
            dir = os.path.join(root, d)
            # check if dir is empty
            if not os.listdir(dir):
                os.rmdir(dir)

class Backup(CronJobBase):
    RUN_AT_TIMES = ['04:30']
    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = 'julkalender.Backup'

    def do(self):
        backup_dir = BACKUP_DIR
        if os.path.exists(backup_dir):
            backups = sorted(
                [os.path.join(backup_dir, f) for f in os.listdir(backup_dir) if os.path.isfile(os.path.join(backup_dir, f))],
                key=os.path.getctime
            )
            if len(backups) > 10:
                os.remove(backups[0])
        print("Backup started")
        management.call_command('dbbackup')
        management.call_command('mediabackup')
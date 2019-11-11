from django.db import models
from django.utils.crypto import get_random_string
import os

def update_filename(instance, filename):
    path = "content/"
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

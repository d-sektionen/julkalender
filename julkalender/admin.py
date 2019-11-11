from django.contrib import admin
from .models import Door

@admin.register(Door)
class DoorAdmin(admin.ModelAdmin):
    list_display = ("contributor", "year", "day")
    list_filter = ("year", "day")
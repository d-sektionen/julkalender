from django.shortcuts import render, get_object_or_404, render_to_response
from django.http import HttpResponse, Http404
import datetime

from .models import Door
from .doors import doors
from .embed import get_cached_embed

def _get_year():
  """
  Get the default year to display, current year in december, else the previous year.
  """
  x = datetime.datetime.now()
  return x.year if x >= datetime.datetime(x.year, 12, 1) else x.year - 1


def calendar(request, year=None):
  if not year:
    year = _get_year()

  now = datetime.datetime.now()
  # now = datetime.datetime(2019, 12, 20) # for testing
  first_day = datetime.datetime(year, 12, 1)
  last_day = datetime.datetime(year, 12, 24)
  if last_day <= now:
    days_open = 24
  elif first_day > now:
    days_open = 0
  else:
    days_open = now.day

  return render(request, 'julkalender/calendar.html', {"year": year, "doors": doors[0:days_open]})

def door(request, year=None, day=0):
  if not year:
    year = _get_year()
    
  logged_in = request.user and request.user.is_authenticated

  now = datetime.datetime.now()
  # now = datetime.datetime(2019, 12, 20) # for testing
  if datetime.datetime(year, 12, day) > now and not logged_in:
    raise Http404

  door = get_object_or_404(Door, year=year, day=day)

  embed = get_cached_embed(door.embed_url) if door.embed_url else None

  return render(request, "julkalender/door.html", {"door": door, "logged_in": logged_in, "embed": embed })
  

def about(request):
  return render(request, 'julkalender/about.html')

def handler404(request, exception, template_name="julkalender/404.html"):
    response = render_to_response("julkalender/404.html")
    response.status_code = 404
    return response

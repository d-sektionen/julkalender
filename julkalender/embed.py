import requests
from django.core.cache import cache

def get_embed(url):
  print('fetching noembed')
  r = requests.get("https://noembed.com/embed", params={'url': url})
  data = r.json()
  if 'html' in data:
    return data['html']
  return f'<iframe src="{url}"></iframe>'

def get_cached_embed(url):
  """
  caches the embed result for 10 minutes
  """
  return cache.get_or_set(f"embed{url}", lambda: get_embed(url), 600)
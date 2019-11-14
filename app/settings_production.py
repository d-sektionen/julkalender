import dj_database_url
from dotenv import load_dotenv
load_dotenv()
from app.settings_shared import *

SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = False

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '.d-sektionen.se', '.dsektionen.se', '.datateknologsektionen.se']

DATABASES = {
    'default': dj_database_url.config(conn_max_age=500)
}


SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
CSRF_COOKIE_HTTPONLY = True
X_FRAME_OPTIONS = 'DENY'
from django.urls import include, path

from . import views

year_urls = [
      path('', views.calendar),
      path('door/<int:day>', views.door, name='door'),
    ]

urlpatterns = [
    path('', include(year_urls)),
    path('<int:year>/', include(year_urls)),
    path('about', views.about, name="about")
]
"""otus_final_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from .settings import DEBUG

import main_page.urls
from main_page.views import index_view
import api.urls

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('', index_view, name='index'),
    path('index/', index_view, name='index'),
    path('learn/', include(main_page.urls)),
    path('api/v1/', include(api.urls), name='api'),
]

if DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns

urlpatterns += [
    path('django-rq/', include('django_rq.urls'))
]


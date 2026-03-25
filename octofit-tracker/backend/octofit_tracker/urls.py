"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
import os

from django.contrib import admin
from django.http import JsonResponse
from django.urls import path


def api_root(request):
    codespace_name = os.environ.get('CODESPACE_NAME', '')
    if codespace_name:
        base = f"https://{codespace_name}-8000.app.github.dev"
    else:
        base = 'http://localhost:8000'

    return JsonResponse(
        {
            'users': f'{base}/api/users/',
            'teams': f'{base}/api/teams/',
            'activities': f'{base}/api/activities/',
            'leaderboard': f'{base}/api/leaderboard/',
            'workouts': f'{base}/api/workouts/',
        }
    )

urlpatterns = [
    path('', api_root, name='root'),
    path('api/', api_root, name='api_root'),
    path('api/users/', api_root, name='api_users'),
    path('api/teams/', api_root, name='api_teams'),
    path('api/activities/', api_root, name='api_activities'),
    path('api/leaderboard/', api_root, name='api_leaderboard'),
    path('api/workouts/', api_root, name='api_workouts'),
    path('admin/', admin.site.urls),
]

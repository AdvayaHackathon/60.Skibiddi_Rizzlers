from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profiles', views.ProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.create_user, name='create_user'),
    # Add this line for the new endpoint
    path('profiles-by-city/', views.search_profiles_by_city, name='profiles_by_city'),
]

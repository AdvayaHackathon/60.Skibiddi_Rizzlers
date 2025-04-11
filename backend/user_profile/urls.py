from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, create_user

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create/', create_user, name='create-user'),
]

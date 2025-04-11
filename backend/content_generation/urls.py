from django.urls import path
from . import views

urlpatterns = [
    path('generate-folk-lore/', views.generate_folk_lore_view, name='generate-folk-lore'),
    path('generate-itinerary/', views.generate_itinerary_view, name='generate-itinerary'),
]

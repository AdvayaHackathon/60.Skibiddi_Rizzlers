from django.urls import path
from .views import generate_folk_lore_view, generate_itinerary_view, identify_image_view, generate_image_view

urlpatterns = [
    path('folklore/', generate_folk_lore_view, name='generate-folklore'),
    path('itinerary/', generate_itinerary_view, name='generate-itinerary'),  # Assuming you have this view
    path('identify-image/', identify_image_view, name='identify-image'),
    path('generate-image/', generate_image_view, name='generate-image'),
]

from django.urls import path
from . import views

urlpatterns = [
    path('folklore/', views.generate_folk_lore_view, name='generate_folklore'),
    path('itinerary/', views.generate_itinerary_view, name='generate_itinerary'),
    path('identify-image/', views.identify_image_view, name='identify_image'),
    path('generate-image/', views.generate_image_view, name='generate_image'),
    
    # New URLs for itinerary retrieval
    path('user-itineraries/', views.get_user_itineraries, name='user_itineraries'),
    path('itinerary/<int:id>/', views.get_itinerary_by_id, name='itinerary_detail'),
    
    # Add this to your urlpatterns list
    path('cultural-connection/', views.generate_cultural_connection_view, name='cultural_connection'),
]

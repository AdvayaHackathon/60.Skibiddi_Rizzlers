from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
import json
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .agents import generate_folk_lore, generate_itinerary, identify_image_and_generate_content, generate_image
from .models import Itinerary, ItineraryDay, ItineraryImage

# Create your views here.
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['location'],
        properties={
            'location': openapi.Schema(type=openapi.TYPE_STRING, description='Location for generating folk lore')
        },
    ),
    responses={
        status.HTTP_200_OK: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'folk_lore': openapi.Schema(type=openapi.TYPE_STRING, description='Generated folk lore')
            }
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
        status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
        status.HTTP_401_UNAUTHORIZED: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'detail': openapi.Schema(type=openapi.TYPE_STRING, description='Authentication credentials were not provided.')
            }
        ),
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_folk_lore_view(request):
    """
    Generate folk lore content based on the provided location.
    Requires authentication.
    """
    try:
        data = json.loads(request.body)
        location = data.get('location')
        
        if not location:
            return Response(
                {"error": "Location is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        folk_lore = generate_folk_lore(location)
        
        return Response(
            {"folk_lore": folk_lore},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['location'],
        properties={
            'location': openapi.Schema(type=openapi.TYPE_STRING, description='Location to generate itinerary for'),
            'days': openapi.Schema(type=openapi.TYPE_INTEGER, description='Number of days for the trip, default is 3'),
            'preferences': openapi.Schema(type=openapi.TYPE_STRING, description='User preferences to customize the itinerary, optional'),
        },
    ),
    responses={
        status.HTTP_200_OK: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'itinerary': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'day_number': openapi.Schema(type=openapi.TYPE_INTEGER, description='Day number of the itinerary'),
                            'itinerary': openapi.Schema(type=openapi.TYPE_STRING, description='Detailed itinerary for the day'),
                            'location_images': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_STRING), description='Images of locations'),
                            'location_description': openapi.Schema(type=openapi.TYPE_STRING, description='Description of the location'),
                        }
                    ),
                    description='Generated itinerary for each day'
                )
            }
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
        status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def generate_itinerary_view(request):
    """
    Generate a detailed travel itinerary based on location, duration, and preferences.
    Saves the itinerary to the user's profile.
    """
    try:
        data = json.loads(request.body)
        location = data.get('location')
        
        if not location:
            return Response(
                {"error": "Location is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get optional parameters with defaults
        days = data.get('days', 3)
        preferences = data.get('preferences', "")
        
        # Validate days is a positive integer
        try:
            days = int(days)
            if days <= 0:
                return Response(
                    {"error": "Days must be a positive integer"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        except (ValueError, TypeError):
            return Response(
                {"error": "Days must be a valid integer"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Call the itinerary generation function
        itinerary = generate_itinerary(location, days, preferences)
        
        # Create a new Itinerary object
        itinerary_obj = Itinerary.objects.create(
            user=request.user,
            location=location,
            days=days,
            preferences=preferences
        )
        
        # Convert the Pydantic objects to dictionaries and save to database
        itinerary_data = []
        for day in itinerary:
            # Create ItineraryDay
            day_obj = ItineraryDay.objects.create(
                itinerary=itinerary_obj,
                day_number=day.day_number,
                description=day.itinerary,
                location_description=day.location_description
            )
            
            # Create ItineraryImage for each image URL
            for image_url in day.location_images:
                ItineraryImage.objects.create(
                    itinerary_day=day_obj,
                    image_url=image_url
                )
            
            # Format response data
            itinerary_data.append({
                'day_number': day.day_number,
                'itinerary': day.itinerary,
                'location_images': day.location_images,
                'location_description': day.location_description
            })
        
        return Response(
            {"itinerary": itinerary_data},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@swagger_auto_schema(
    method='post',
    manual_parameters=[
        openapi.Parameter(
            name='image',
            in_=openapi.IN_FORM,
            type=openapi.TYPE_FILE,
            required=True,
            description='Image file to analyze'
        )
    ],
    responses={
        status.HTTP_200_OK: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'content': openapi.Schema(type=openapi.TYPE_STRING, description='Generated content about the image')
            }
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
        status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
        status.HTTP_401_UNAUTHORIZED: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'detail': openapi.Schema(type=openapi.TYPE_STRING, description='Authentication credentials were not provided.')
            }
        ),
    }
)
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def identify_image_view(request):
    """
    Identify a monument or landmark in an uploaded image and generate detailed historical and cultural information.
    Requires authentication.
    """
    try:
        if 'image' not in request.FILES:
            return Response(
                {"error": "No image file provided"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        image_file = request.FILES['image']
        
        # Get the content type from the uploaded file
        content_type = image_file.content_type
        
        # Read the image file
        image_data = image_file.read()
        
        # Process the image and generate content
        content = identify_image_and_generate_content(image_data, content_type)
        
        return Response(
            {"content": content},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['location'],
        properties={
            'location': openapi.Schema(type=openapi.TYPE_STRING, description='Location to generate an image for')
        },
    ),
    responses={
        status.HTTP_200_OK: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'image_url': openapi.Schema(type=openapi.TYPE_STRING, description='URL of the generated image')
            }
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
        status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
        status.HTTP_401_UNAUTHORIZED: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'detail': openapi.Schema(type=openapi.TYPE_STRING, description='Authentication credentials were not provided.')
            }
        ),
    }
)
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def generate_image_view(request):
    """
    Generate a cartoon-style image for a specified location.
    Requires authentication.
    """
    try:
        data = json.loads(request.body)
        location = data.get('location')
        
        if not location:
            return Response(
                {"error": "Location is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        image_url = generate_image(location)
        
        return Response(
            {"image_url": image_url},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@swagger_auto_schema(
    method='get',
    responses={
        status.HTTP_200_OK: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'itineraries': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'id': openapi.Schema(type=openapi.TYPE_INTEGER, description='Itinerary ID'),
                            'location': openapi.Schema(type=openapi.TYPE_STRING, description='Destination location'),
                            'days': openapi.Schema(type=openapi.TYPE_INTEGER, description='Number of days'),
                            'preferences': openapi.Schema(type=openapi.TYPE_STRING, description='User preferences'),
                            'created_at': openapi.Schema(type=openapi.TYPE_STRING, description='Creation date'),
                            'days_details': openapi.Schema(
                                type=openapi.TYPE_ARRAY,
                                items=openapi.Schema(
                                    type=openapi.TYPE_OBJECT,
                                    properties={
                                        'day_number': openapi.Schema(type=openapi.TYPE_INTEGER),
                                        'description': openapi.Schema(type=openapi.TYPE_STRING),
                                        'location_description': openapi.Schema(type=openapi.TYPE_STRING),
                                        'images': openapi.Schema(
                                            type=openapi.TYPE_ARRAY,
                                            items=openapi.Schema(type=openapi.TYPE_STRING)
                                        )
                                    }
                                )
                            )
                        }
                    )
                )
            }
        ),
        status.HTTP_401_UNAUTHORIZED: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'detail': openapi.Schema(type=openapi.TYPE_STRING, description='Authentication credentials were not provided.')
            }
        ),
        status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_itineraries(request):
    """
    Retrieve all itineraries created by the authenticated user.
    Returns detailed information including all days and images.
    """
    try:
        # Get all itineraries for the current user
        itineraries = Itinerary.objects.filter(user=request.user).order_by('-created_at')
        
        # Prepare the response data
        itineraries_data = []
        
        for itinerary in itineraries:
            # Get all days for this itinerary
            days_data = []
            for day in itinerary.itinerary_days.all().order_by('day_number'):
                # Get all images for this day
                images = [img.image_url for img in day.images.all()]
                
                days_data.append({
                    'day_number': day.day_number,
                    'description': day.description,
                    'location_description': day.location_description,
                    'images': images
                })
            
            # Format the created_at date
            created_at = itinerary.created_at.strftime('%Y-%m-%d %H:%M:%S')
            
            # Add this itinerary to the response
            itineraries_data.append({
                'id': itinerary.id,
                'location': itinerary.location,
                'days': itinerary.days,
                'preferences': itinerary.preferences,
                'created_at': created_at,
                'days_details': days_data
            })
        
        return Response(
            {"itineraries": itineraries_data},
            status=status.HTTP_200_OK
        )
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter(
            name='id',
            in_=openapi.IN_PATH,
            type=openapi.TYPE_INTEGER,
            required=True,
            description='Itinerary ID'
        )
    ],
    responses={
        status.HTTP_200_OK: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'id': openapi.Schema(type=openapi.TYPE_INTEGER, description='Itinerary ID'),
                'location': openapi.Schema(type=openapi.TYPE_STRING, description='Destination location'),
                'days': openapi.Schema(type=openapi.TYPE_INTEGER, description='Number of days'),
                'preferences': openapi.Schema(type=openapi.TYPE_STRING, description='User preferences'),
                'created_at': openapi.Schema(type=openapi.TYPE_STRING, description='Creation date'),
                'days_details': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'day_number': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'description': openapi.Schema(type=openapi.TYPE_STRING),
                            'location_description': openapi.Schema(type=openapi.TYPE_STRING),
                            'images': openapi.Schema(
                                type=openapi.TYPE_ARRAY,
                                items=openapi.Schema(type=openapi.TYPE_STRING)
                            )
                        }
                    )
                )
            }
        ),
        status.HTTP_404_NOT_FOUND: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Itinerary not found')
            }
        ),
        status.HTTP_401_UNAUTHORIZED: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'detail': openapi.Schema(type=openapi.TYPE_STRING, description='Authentication credentials were not provided.')
            }
        ),
        status.HTTP_403_FORBIDDEN: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='You do not have permission to access this itinerary')
            }
        ),
        status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_itinerary_by_id(request, id):
    """
    Retrieve a specific itinerary by its ID.
    Only returns the itinerary if it belongs to the authenticated user.
    """
    try:
        # Try to get the itinerary
        try:
            itinerary = Itinerary.objects.get(id=id)
        except Itinerary.DoesNotExist:
            return Response(
                {"error": "Itinerary not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if the itinerary belongs to the user
        if itinerary.user != request.user:
            return Response(
                {"error": "You do not have permission to access this itinerary"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get all days for this itinerary
        days_data = []
        for day in itinerary.itinerary_days.all().order_by('day_number'):
            # Get all images for this day
            images = [img.image_url for img in day.images.all()]
            
            days_data.append({
                'day_number': day.day_number,
                'description': day.description,
                'location_description': day.location_description,
                'images': images
            })
        
        # Format the created_at date
        created_at = itinerary.created_at.strftime('%Y-%m-%d %H:%M:%S')
        
        # Create the response data
        itinerary_data = {
            'id': itinerary.id,
            'location': itinerary.location,
            'days': itinerary.days,
            'preferences': itinerary.preferences,
            'created_at': created_at,
            'days_details': days_data
        }
        
        return Response(itinerary_data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )



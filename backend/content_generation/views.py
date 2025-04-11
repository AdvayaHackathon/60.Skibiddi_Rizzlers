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
            'duration': openapi.Schema(type=openapi.TYPE_INTEGER, description='Number of days for the trip, default is 3'),
            'interests': openapi.Schema(type=openapi.TYPE_STRING, description='User interests to customize the itinerary, optional'),
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
def generate_itinerary_view(request):
    """
    Generate a detailed travel itinerary based on location, duration, and interests.
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
        duration = data.get('duration', 3)
        interests = data.get('interests', "")
        
        # Validate duration is a positive integer
        try:
            duration = int(duration)
            if duration <= 0:
                return Response(
                    {"error": "Duration must be a positive integer"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        except (ValueError, TypeError):
            return Response(
                {"error": "Duration must be a valid integer"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Call the itinerary generation function
        itinerary = generate_itinerary(location, duration, interests)
        
        # Convert the Pydantic objects to dictionaries for serialization
        itinerary_data = []
        for day in itinerary:
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

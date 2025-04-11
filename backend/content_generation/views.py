from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .agents import generate_folk_lore

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
    }
)
@api_view(['POST'])
def generate_folk_lore_view(request):
    """
    Generate folk lore content based on the provided location.
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

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import Profile
from .serializers import ProfileSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.db.models import Q

# Create your views here.
class ProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows profiles to be viewed, created, edited, and deleted.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @swagger_auto_schema(
        method='get',
        manual_parameters=[
            openapi.Parameter(
                'city', openapi.IN_QUERY,
                description="City name to search for profiles",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ],
        responses={
            status.HTTP_200_OK: ProfileSerializer(many=True),
        }
    )
    @action(detail=False, methods=['get'])
    def by_city(self, request):
        """
        List all profiles for a specific city.
        """
        city = request.query_params.get('city')
        if not city:
            return Response(
                {'error': 'City parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        queryset = self.get_queryset().filter(city__icontains=city)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['username', 'email', 'password'],
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING, description='Username'),
            'email': openapi.Schema(type=openapi.TYPE_STRING, description='Email address'),
            'password': openapi.Schema(type=openapi.TYPE_STRING, description='Password'),
        },
    ),
    responses={
        status.HTTP_201_CREATED: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'id': openapi.Schema(type=openapi.TYPE_INTEGER, description='User ID'),
                'username': openapi.Schema(type=openapi.TYPE_STRING, description='Username'),
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='Email address'),
            }
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
    }
)
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def create_user(request):
    """
    Create a new user account.
    """
    try:
        data = request.data
        
        # Extract required fields
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        # Validate required fields
        if not username or not email or not password:
            return Response(
                {'error': 'Username, email, and password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if username already exists
        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'Username already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if email already exists
        if User.objects.filter(email=email).exists():
            return Response(
                {'error': 'Email already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate password strength
        try:
            validate_password(password)
        except ValidationError as e:
            return Response(
                {'error': e.messages}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create the user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        # Return the created user data (excluding password)
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    

@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter(
            'city', openapi.IN_QUERY,
            description="City name to search for profiles",
            type=openapi.TYPE_STRING,
            required=True
        ),
    ],
    responses={
        status.HTTP_200_OK: ProfileSerializer(many=True),
        status.HTTP_400_BAD_REQUEST: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        ),
    }
)
@api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
def search_profiles_by_city(request):
    """
    Search for user profiles based on city.
    """
    try:
        # Get city parameter from query params
        city = request.query_params.get('city')
        
        if not city:
            return Response(
                {'error': 'City parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Perform case-insensitive search
        profiles = Profile.objects.filter(city__icontains=city)
        
        # Serialize the results
        serializer = ProfileSerializer(profiles, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
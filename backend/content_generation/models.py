from django.db import models
from django.contrib.auth.models import User

class Itinerary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='itineraries')
    location = models.CharField(max_length=255)
    days = models.PositiveIntegerField(default=3)
    preferences = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username}'s {self.days}-day trip to {self.location}"
    
    class Meta:
        verbose_name_plural = "Itineraries"
        ordering = ['-created_at']

class ItineraryDay(models.Model):
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name="itinerary_days")
    day_number = models.PositiveIntegerField()
    description = models.TextField()
    location_description = models.TextField(blank=True)
    
    def __str__(self):
        return f"Day {self.day_number} of {self.itinerary}"
    
    class Meta:
        ordering = ['day_number']
        unique_together = ['itinerary', 'day_number']

class ItineraryImage(models.Model):
    itinerary_day = models.ForeignKey(ItineraryDay, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField()
    
    def __str__(self):
        return f"Image for {self.itinerary_day}"

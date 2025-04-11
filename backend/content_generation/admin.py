from django.contrib import admin
from .models import Itinerary, ItineraryDay, ItineraryImage

class ItineraryImageInline(admin.TabularInline):
    model = ItineraryImage
    extra = 1

class ItineraryDayInline(admin.TabularInline):
    model = ItineraryDay
    extra = 1
    inlines = [ItineraryImageInline]

@admin.register(Itinerary)
class ItineraryAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'days', 'created_at')
    search_fields = ('user__username', 'location')
    list_filter = ('created_at', 'days')
    inlines = [ItineraryDayInline]

@admin.register(ItineraryDay)
class ItineraryDayAdmin(admin.ModelAdmin):
    list_display = ('itinerary', 'day_number')
    inlines = [ItineraryImageInline]

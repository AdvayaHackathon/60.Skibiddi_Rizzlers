from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=100, blank=True)
    contact = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=100, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)  # Making age nullable
    occupation = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"

# Signal to create a profile when a user is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(
            user=instance,
            name=instance.username  # Set a default name based on username
        )

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()



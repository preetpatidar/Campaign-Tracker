from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import CampaignViewSet, campaign_stats, marketing_news

router = DefaultRouter()
router.register(r'campaigns', CampaignViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', campaign_stats),
    path('news/', marketing_news),
]

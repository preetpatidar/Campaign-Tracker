from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, Sum
from .models import Campaign
from .serializers import CampaignSerializer
import requests


class CampaignViewSet(ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer


# Dashboard Stats API
@api_view(['GET'])
def campaign_stats(request):
    status_counts = Campaign.objects.values('status').annotate(count=Count('id'))
    total_budget = Campaign.objects.aggregate(total=Sum('budget'))
    total_campaigns = Campaign.objects.count()

    return Response({
        "status_counts": status_counts,
        "total_budget": total_budget,
        "total_campaigns": total_campaigns
    })


# Third Party API Integration
@api_view(['GET'])
def marketing_news(request):
    response = requests.get("https://dummyjson.com/products")
    return Response(response.json())

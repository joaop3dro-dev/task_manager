from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets

from .models import TaskModel
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["status"]
    search_fields = ["name", "description"]
    ordering_fields = ["created_at"]

    def get_queryset(self):
        return TaskModel.objects.filter(user=self.request.user)

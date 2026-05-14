from django.contrib.auth.models import User
from django.db import models
from django.db.models import Q


class TaskStatus(models.TextChoices):
    COMPLETED = "completed", "Completed"
    PENDING = "pending", "Pending"
    DELAYED = "delayed", "Delayed"
    CANCELED = "canceled", "Canceled"


class TaskModel(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    status = models.CharField(
        max_length=20, choices=TaskStatus.choices, default=TaskStatus.PENDING
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "name"],
                condition=Q(status=TaskStatus.PENDING) | Q(status=TaskStatus.DELAYED),
                name="unique_tasks_per_user",
            )
        ]

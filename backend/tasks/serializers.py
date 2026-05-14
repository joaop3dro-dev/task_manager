from rest_framework import serializers

from .models import TaskModel, TaskStatus


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = TaskModel
        fields = ["id", "name", "description", "user", "status", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate(self, attrs):
        task_name = attrs.get("name")
        user = attrs.get("user")
        status = attrs.get(
            "status", self.instance.status if self.instance else TaskStatus.PENDING
        )

        if status in [TaskStatus.PENDING, TaskStatus.DELAYED]:
            queryset = TaskModel.objects.filter(
                user=user,
                name=task_name,
                status__in=[TaskStatus.PENDING, TaskStatus.DELAYED],
            )

            if self.instance:
                queryset = queryset.exclude(pk=self.instance.pk)

            if queryset.exists():
                raise serializers.ValidationError(
                    {
                        "name": "Você já possui uma tarefa pendente ou atrasada com este nome"
                    }
                )

        return attrs

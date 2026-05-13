from django.urls import path, include
from .views import CookieTokenBlacklistView, CookieTokenObtainPairView, CookieTokenRefreshView, RegisterView

auth_patterns = [
    path('register/', RegisterView.as_view()),
    path('login/', CookieTokenObtainPairView.as_view()),
    path('logout/', CookieTokenBlacklistView.as_view()),
    path('refresh/', CookieTokenRefreshView.as_view()),
]

urlpatterns = [
    path('auth/', include(auth_patterns)),
]


from django.conf import settings
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from rest_framework_simplejwt.settings import api_settings

class CookieTokenMixin:
    def finalize_response(self, request, response, *args, **kwargs):
        if response.status_code == 200:
            cookie_settings = {
                'httponly': True,
                'secure': not settings.DEBUG,
                'samesite': 'Lax'
            }

            if 'access' in response.data:
                response.set_cookie(
                    key='access_token',
                    value=response.data['access'],
                    max_age=int(api_settings.ACCESS_TOKEN_LIFETIME.total_seconds()),
                    **cookie_settings
                )
                del response.data['access']

            if 'refresh' in response.data:
                response.set_cookie(
                    key='refresh_token',
                    value=response.data['refresh'],
                    max_age=int(api_settings.REFRESH_TOKEN_LIFETIME.total_seconds()),
                    **cookie_settings
                )
                del response.data['refresh']

        return super().finalize_response(request, response, *args, **kwargs)

class CookieTokenObtainPairView(CookieTokenMixin, TokenObtainPairView):
    pass

class CookieTokenRefreshView(CookieTokenMixin, TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if refresh_token:
            data = request.data.copy()
            data['refresh'] = refresh_token
            request._full_data = data

        return super().post(request, *args, **kwargs)

class CookieTokenBlacklistView(TokenBlacklistView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if refresh_token:
            data = request.data.copy()
            data['refresh'] = refresh_token
            request._full_data = data

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            response.delete_cookie('access_token')
            response.delete_cookie('refresh_token')
            response.data = {'detail': 'Logout realizado com sucesso'}

        return response

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request: Request):
        token = request.COOKIES.get('access_token')

        if token is None:
            return None

        validated_token = self.get_validated_token(token)
        return self.get_user(validated_token), validated_token

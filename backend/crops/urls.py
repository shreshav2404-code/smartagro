from django.urls import path
from . import views

urlpatterns = [
    path('crops/', views.crop_list, name='crop_list'),
    path('ai_assistant/', views.ai_assistant, name='ai_assistant'),
    path('ai_assistant_image/', views.ai_assistant_image, name='ai_assistant_image'),
    path('ai_models/', views.ai_models, name='ai_models'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('profile/', views.user_profile, name='profile'),
    path('news/', views.agriculture_news, name='agriculture_news'),
]

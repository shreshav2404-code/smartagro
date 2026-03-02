from django.http import JsonResponse, HttpResponse
from .models import Crop, UserProfile
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.conf import settings
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
import google.generativeai as genai
import requests as hf_requests
from PIL import Image
import io
import mimetypes
from django.views.decorators.http import require_GET
import os
from duckduckgo_search import DDGS

HF_TOKEN = os.getenv("HF_TOKEN")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def hf_chat(message, system_prompt="You are an agricultural expert assistant. Help farmers with crop advice, pest control, soil management, and farming techniques. Be concise and practical."):
    """Simplified chat logic using Groq via direct HTTP requests."""
    try:
        # Check if the user is asking for news
        news_keywords = ['news', 'latest', 'current', 'happenings', 'recent']
        if any(kw in message.lower() for kw in news_keywords):
            try:
                results = []
                # Extreme caution for DDG in Render environment
                with DDGS(timeout=3) as ddgs:
                    news_gen = ddgs.news("latest agriculture news India", max_results=2)
                    for r in news_gen:
                        results.append(f"- {r.get('title')} ({r.get('source')}): {r.get('url')}")
                if results:
                    message = f"{message}\n\n(Context - Real-time Agri News found: {'; '.join(results)})"
            except:
                pass

        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ],
            "max_tokens": 512,
            "temperature": 0.7
        }
        resp = hf_requests.post(url, json=payload, headers=headers, timeout=10)
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]["content"]
    except Exception as groq_err:
        try:
            url = "https://router.huggingface.co/novita/v3/openai/chat/completions"
            headers = {
                "Authorization": f"Bearer {HF_TOKEN}",
                "Content-Type": "application/json"
            }
            payload = {
                "model": "meta-llama/Llama-3.1-70B-Instruct",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": message}
                ],
                "max_tokens": 512,
                "temperature": 0.7
            }
            resp = hf_requests.post(url, json=payload, headers=headers, timeout=10)
            resp.raise_for_status()
            return resp.json()["choices"][0]["message"]["content"]
        except Exception as e:
            return f"I apologize, I encountered an error: {str(e)}"

def crop_list(request):
    crops = Crop.objects.all()
    data = {"crops": list(crops.values())}
    return JsonResponse(data)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            name = data.get('name')
            occupation = data.get('occupation')
            phone_number = data.get('phone_number')
            
            if not all([email, password, name, occupation, phone_number]):
                return JsonResponse({'error': 'All fields are required'}, status=400)
            
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already registered'}, status=400)
            
            username = email.split('@')[0]
            base_username = username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1
                
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
            
            profile = UserProfile.objects.create(
                user=user,
                name=name,
                occupation=occupation,
                phone_number=phone_number
            )
            
            return JsonResponse({'success': True, 'message': 'Registration successful'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            
            if not all([email, password]):
                return JsonResponse({'error': 'Email and password are required'}, status=400)
            
            try:
                user_obj = User.objects.get(email=email)
                user = authenticate(request, username=user_obj.username, password=password)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
            
            if user is not None:
                login(request, user)
                try:
                    profile = UserProfile.objects.get(user=user)
                    return JsonResponse({
                        'success': True, 
                        'user': {
                            'email': user.email,
                            'name': profile.name,
                            'occupation': profile.occupation
                        }
                    })
                except UserProfile.DoesNotExist:
                    return JsonResponse({
                        'success': True, 
                        'user': {
                            'email': user.email,
                            'name': user.username,
                            'occupation': ''
                        }
                    })
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def user_logout(request):
    logout(request)
    return JsonResponse({'success': True})

@login_required
def user_profile(request):
    user = request.user
    try:
        profile = UserProfile.objects.get(user=user)
        return JsonResponse({
            'email': user.email,
            'name': profile.name,
            'occupation': profile.occupation,
            'phone_number': profile.phone_number
        })
    except UserProfile.DoesNotExist:
        return JsonResponse({
            'email': user.email,
            'name': user.username,
            'occupation': '',
            'phone_number': ''
        })

@csrf_exempt
@require_GET
def ai_models(request):
    try:
        api_key = getattr(settings, 'GEMINI_API_KEY', '') or ''
        if not api_key:
            return JsonResponse({'models': [{'name': 'groq/llama-3.3-70b-versatile', 'display_name': 'Llama 3.3 (Groq)', 'supports': ['generate_content']}]})
        genai.configure(api_key=api_key)
        models = genai.list_models()
        result = []
        try:
            for m in models:
                entry = {
                    'name': getattr(m, 'name', ''),
                    'display_name': getattr(m, 'display_name', ''),
                }
                try:
                    entry['input_token_limit'] = getattr(m, 'input_token_limit', None)
                    entry['output_token_limit'] = getattr(m, 'output_token_limit', None)
                    entry['supports'] = [
                        k for k, v in {
                            'generate_content': hasattr(m, 'supported_generation_methods') and 'generateContent' in getattr(m, 'supported_generation_methods', []),
                        }.items() if v
                    ]
                except Exception:
                    pass
                result.append(entry)
        except Exception:
            result = [str(m) for m in models]
        return JsonResponse({'models': result})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_GET
def agriculture_news(request):
    """Highly stable agricultural news with guaranteed non-error response."""
    try:
        results = []
        # Try DDGS but capture any timeout/error
        try:
            with DDGS(timeout=4) as ddgs:
                news_gen = ddgs.news('latest agriculture news India', max_results=5)
                if news_gen:
                    for r in news_gen:
                        results.append({
                            'title': r.get('title'),
                            'url': r.get('url'),
                            'source': r.get('source'),
                            'date': r.get('date'),
                            'body': r.get('body')
                        })
        except:
            pass

        # Static Reliable Fallback - Always ensure user sees something
        if not results:
            results = [
                {
                    'title': 'India advances digital agriculture mission with over 84M farmer IDs generated',
                    'url': 'https://www.biometricupdate.com/202602/india-advances-digital-agriculture-mission-with-over-84m-farmer-ids-generated',
                    'source': 'Biometric Update',
                    'body': "India's digital agriculture mission scales AgriStack infrastructure."
                },
                {
                    'title': 'Indian Government Assures Farmers on India-US Interim Trade Deal',
                    'url': '#',
                    'source': 'National News',
                    'body': "Ministry confirms domestic interests are safeguarded in new trade protocols."
                },
                {
                    'title': 'Climate-Resilient Seeds Distributed for Upcoming Kharif Season',
                    'url': '#',
                    'source': 'ICAR',
                    'body': "New high-yield varieties released to combat changing weather patterns."
                }
            ]
                    
        return JsonResponse({'status': 'success', 'news': results})
    except Exception as e:
        # Even on global crash, return the static ones to prevent front-end 500
        return JsonResponse({
            'status': 'success', 
            'news': [{'title': 'Loading latest agriculture news...', 'url': '#', 'source': 'System'}]
        })

@csrf_exempt
@require_POST
def ai_assistant(request):
    try:
        try:
            data = json.loads(request.body or '{}')
            user_message = str(data.get('message', '')).strip()
        except Exception:
            user_message = ''

        if not user_message:
            return JsonResponse({'reply': 'How can I help you with your agricultural needs?'}, status=200)

        try:
            reply = hf_chat(user_message)
            if "I apologize, I encountered an error" in reply:
                raise Exception(f"Chat Error: {reply}")
            return JsonResponse({'reply': reply}, status=200)
        except Exception as e:
            api_key = getattr(settings, 'GEMINI_API_KEY', '') or ''
            if not api_key:
                return JsonResponse({'reply': f"I'm having trouble connecting. (Debug: {str(e)})"}, status=200)
            
            try:
                genai.configure(api_key=api_key)
                model_names = ["models/gemini-2.5-flash", "models/gemini-2.0-flash", "models/gemini-1.5-pro"]
                response = None
                last_err = None
                
                for model_name in model_names:
                    try:
                        model = genai.GenerativeModel(model_name)
                        response = model.generate_content(user_message)
                        if response:
                            break
                    except Exception as e:
                        last_err = e
                        continue
                
                if response:
                    return JsonResponse({'reply': response.text}, status=200)
                else:
                    raise last_err or Exception("Failed to generate content with available models.")
            except Exception as gen_err:
                return JsonResponse({'reply': f"AI service currently unavailable. (Error: {str(gen_err)})"}, status=200)

    except Exception as e:
        return JsonResponse({'reply': 'Sorry, I could not process your request.'}, status=200)

@csrf_exempt
@require_POST
def ai_assistant_image(request):
    try:
        user_message = request.POST.get('message', '')
        image_file = request.FILES.get('image')

        if not image_file:
            return JsonResponse({'error': 'No image provided.'}, status=400)

        api_key = getattr(settings, 'GEMINI_API_KEY', '') or ''
        if not api_key:
            prompt = user_message or "Describe common crop diseases and their treatments."
            reply = hf_chat(prompt, "You are an agronomy expert. The user uploaded a crop image. Based on their description, provide analysis of likely diseases, pests, and actionable treatment steps.")
            return JsonResponse({'reply': reply}, status=200)

        try:
            img = Image.open(image_file)
            max_size = 1024
            if max(img.size) > max_size:
                img.thumbnail((max_size, max_size))
            if img.mode != 'RGB':
                img = img.convert('RGB')
            w, h = img.size
            if min(w, h) < 16:
                return JsonResponse({'reply': 'The image is too small for analysis. Please upload a clearer, larger photo of the plant.'}, status=200)
        except Exception as img_err:
            return JsonResponse({'error': f'Image processing error: {str(img_err)}'}, status=400)

        prompt = (
            f"You are an agronomy assistant. Analyze the plant/crop image and address this request: {user_message}."
            if user_message
            else "You are an agronomy assistant. Analyze the plant/crop image, describing species (if possible), visible health, likely diseases, pests, nutrient deficiencies, and actionable care steps (soil, water, nutrients, pest control, and next 3 actions)."
        )

        try:
            genai.configure(api_key=api_key)
            generation_config = {
                'max_output_tokens': 512,
                'temperature': 0.7,
                'top_p': 0.95,
                'top_k': 40,
            }

            mime = getattr(image_file, 'content_type', None) or mimetypes.guess_type(image_file.name)[0] or 'image/jpeg'
            buf = io.BytesIO()
            save_format = 'JPEG'
            if mime.lower() == 'image/png':
                save_format = 'PNG'
            img.save(buf, format=save_format, quality=90)
            image_part = {
                'inline_data': {
                    'mime_type': mime,
                    'data': buf.getvalue()
                }
            }

            try_models = [
                "models/gemini-2.5-flash",
                "models/gemini-2.0-flash",
                "models/gemini-1.5-pro",
            ]
            response = None
            last_err = None
            for model_name in try_models:
                try:
                    model = genai.GenerativeModel(model_name, generation_config=generation_config)
                    response = model.generate_content([prompt, image_part])
                    break
                except Exception as inner_err:
                    last_err = inner_err
                    response = None
                    continue
            if response is None and last_err:
                raise last_err
            
            ai_reply = ''
            try:
                ai_reply = getattr(response, 'text', '') or ''
            except Exception:
                ai_reply = ''
            if not ai_reply:
                try:
                    candidates = getattr(response, 'candidates', []) or []
                    if candidates:
                        content = getattr(candidates[0], 'content', None)
                        parts = getattr(content, 'parts', []) if content else []
                        texts = []
                        for part in parts:
                            t = getattr(part, 'text', '')
                            if t:
                                texts.append(t)
                        ai_reply = '\n'.join(texts).strip()
                except Exception:
                    ai_reply = ''
            if not ai_reply:
                ai_reply = "Sorry, I couldn't analyze this image."
            return JsonResponse({'reply': ai_reply})
        except Exception as gen_err:
            err_msg = str(gen_err)
            if 'quota' in err_msg.lower() or '429' in err_msg or 'not found' in err_msg.lower():
                try:
                    fallback_model = genai.GenerativeModel("models/gemini-2.5-flash", generation_config=generation_config)
                    response = fallback_model.generate_content([prompt, image_part])
                    ai_reply = getattr(response, 'text', '') or ''
                    if not ai_reply:
                        ai_reply = "Sorry, I couldn't analyze this image."
                    return JsonResponse({'reply': ai_reply})
                except Exception:
                    pass
            return JsonResponse({'reply': 'Image analysis service error. Please try again later.', 'error': str(gen_err)}, status=200)
    except Exception as e:
        return JsonResponse({'reply': 'Could not process the image. Please try another image.', 'error': str(e)}, status=200)

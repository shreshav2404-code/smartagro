import os
import groq
import json

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def test_chatbot():
    print("Testing Groq (Llama 3.3 70B)...")
    try:
        client = groq.Groq(api_key=GROQ_API_KEY)
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are an agricultural expert."},
                {"role": "user", "content": "What is the best time to plant rice in Bihar?"}
            ],
            max_tokens=100
        )
        print("Reply:")
        print(completion.choices[0].message.content)
        return True
    except Exception as e:
        print(f"Chatbot Error: {e}")
        return False

if __name__ == "__main__":
    test_chatbot()

from duckduckgo_search import DDGS
import json

def search_farming_news(query="latest agriculture news India"):
    print(f"Searching for: {query}...")
    try:
        results = []
        with DDGS() as ddgs:
            # Try a slightly different method/query
            for r in ddgs.news(query, max_results=5):
                results.append(r)
        
        if not results:
            # Fallback to general text search if news yields nothing
            with DDGS() as ddgs:
                for r in ddgs.text(query, max_results=5):
                    results.append(r)

        print(json.dumps(results, indent=2))
        return results
    except Exception as e:
        print(f"Search Error: {e}")
        return []

if __name__ == "__main__":
    search_farming_news()

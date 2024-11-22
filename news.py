import json
import traceback
from urllib.request import urlopen
from pydantic import BaseModel
from typing import ClassVar

class BNBNews(BaseModel):
    filter: str
    base_url: str
    apiKey: str
    public: ClassVar[bool] = True

filter = "hot"
public = True
apiKey = "1127ea5aaddfa00ad5777c43df6366219ab53754"
base_url = "https://cryptopanic.com/api/posts/?auth_token={apiKey}&currencies={currency}&public={public}&filter={filter}"

def fetch_news():
    response = None
    for i in range(0, 10):
        try:
            url = base_url.format(apiKey=apiKey, public=public, filter=filter)

            print("Fetching data from Cryptopanic API")

            response = urlopen(url)
            break  # Exit the loop if the request is successful
        except IOError as e:
            print(f"Error fetching data from Cryptopanic API: {e}")
            continue

    if response:
        try:
            news_data = json.loads(response.read())
            return news_data
        except Exception as e:
            print(traceback.format_exc())
    else:
        print("Failed to fetch data after multiple attempts")
        return None
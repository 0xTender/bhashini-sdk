from bhashini_sdk import text_to_text
from dotenv import load_dotenv

load_dotenv()

response = text_to_text(["Hello World", "Data"], "en", "hi")

print(response["output"][0]["target"])

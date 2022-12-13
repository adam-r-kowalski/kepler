import openai
import os
from typing import Protocol


class Backend(Protocol):
    def query(self, prompt: str) -> str:
        ...


class Gpt3Backend:
    def __init__(self):
        openai.api_key = os.getenv("OPENAI_API_KEY")

    def query(self, prompt: str) -> str:
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt,
            temperature=0.7,
            max_tokens=709,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        response = response.choices[0].text
        return response

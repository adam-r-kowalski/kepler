import openai
import os
from typing import Protocol


class Backend(Protocol):
    def prompt(self, prompt: str) -> str:
        ...


class EmptyBackend:
    def prompt(self, prompt: str) -> str:
        return "No language model backend has been attached to this robot."


class Gpt3QuestionBackend:
    def __init__(self):
        openai.api_key = os.getenv("OPENAI_API_KEY")

    def prompt(self, prompt: str) -> str:
        prompt = "Q: " + prompt + (
            f""
            f"A: "
        )
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
        return response.strip()


class Gpt3ConversationBackend:
    def __init__(self):
        openai.api_key = os.getenv("OPENAI_API_KEY")

    def prompt(self, prompt: str) -> str:
        prompt = "me: " + prompt + (
            f""
            f"you: "
        )
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt,
            temperature=0.7,
            max_tokens=709,
            top_p=1,
            frequency_penalty=10,
            presence_penalty=0
        )
        response = response.choices[0].text
        return response.strip()

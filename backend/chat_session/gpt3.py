import os
import openai
import re
import requests
import time


class Agent:
    def __init__(self):
        openai.api_key = os.getenv("OPENAI_API_KEY")
        #self.categories = ["request for information", "friendly banter"]
        self.categories = ["friendly banter"]

    def prompt(self, prompt: str) -> str:
        # prompt_category = self._find_prompt_category(prompt)
        prompt_category = "friendly banter"
        prompt = self._engineer_prompt(prompt, prompt_category)
        response = self._prompt(prompt)
        response = self._clean_up_response(response)
        return response

    def _find_prompt_category(self, prompt: str) -> str:
        categories_str = "\n".join([f"{i+1}. {category}" for i, category in enumerate(self.categories)])
        prompt = f"Out of the following categories, which category does the prompt most correspond to? Respond as a single number.\n{categories_str}\nThe prompt is: {prompt}"
        prompt = self._format_as_conversation(prompt)
        response = self._prompt(prompt)
        category_n = int(re.search(r'\d+', response).group()) - 1  # extract first integer from response str
        category = self.categories[category_n]
        print(f"prompt category: {category}")
        return category

    def _engineer_prompt(self, prompt: str, prompt_category: str) -> str:
        if prompt_category == "request for information":
            prompt = self._web_search(prompt)
        elif prompt_category == "friendly banter":
            prompt = self._general_chat(prompt)
        prompt = self._format_as_conversation(prompt)
        return prompt

    def _web_search(self, prompt: str) -> str:
        search_results = requests.get(f"https://api.duckduckgo.com/?q={prompt}&format=json&pretty=1").json()
        date_str = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        breakpoint()
        prompt = f"Generate a comprehensive and informative answer (but no more than 80 words) for the following question solely based on the provided web Search Results (URL and Summary). You must only use information from the provided search results. Use an unbiased and journalistic tone. Use this current date and time: {date_str}. Combine search results together into a coherent answer. Do not repeat text. Only use the most relevant results that answer the question accurately. If different results refer to different entities with the same name, write separate answers for each entity.\n\nThe question is: {prompt}.\n\nThe search results are:{search_results}"
        return prompt

    def _cited_web_search(self, prompt: str) -> str:
        search_results = requests.get(f"https://api.duckduckgo.com/?q={prompt}&format=json&pretty=1").json()
        date_str = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        prompt = f"Generate a comprehensive and informative answer (but no more than 80 words) for the following question solely based on the provided web Search Results (URL and Summary). You must only use information from the provided search results. Use an unbiased and journalistic tone. Use this current date and time: {date_str}. Combine search results together into a coherent answer. Do not repeat text. Cite search results using [${{number}}] notation. Only cite the most relevant results that answer the question accurately. If different results refer to different entities with the same name, write separate answers for each entity.\n\nThe question is: {prompt}.\n\nThe search results are:{search_results}"
        return prompt

    def _general_chat(self, prompt: str) -> str:
        return prompt

    def _format_as_conversation(self, prompt: str) -> str:
        prompt = f"me: {prompt}\nyou: "
        return prompt
    
    def _prompt(self, prompt: str) -> str:
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

    def _clean_up_response(self, response: str) -> str:
        response = response.strip()
        return response
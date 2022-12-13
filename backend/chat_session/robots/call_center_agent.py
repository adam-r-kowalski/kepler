import json
from typing import List
from uuid import UUID

from chat_session.robots.base_robot import Robot


class CallCenterAgent(Robot):
    def __init__(self, uuid: UUID, company_name: str, company_info: str, call_categories: List[str]):
        super().__init__(uuid)
        self.company_name = company_name
        self.company_info = company_info
        self.call_categories = call_categories
        self.call_categories_list = "\n".join([f"{i+1}. {category}" for i, category in enumerate(self.call_categories)])
        self.conversation = []
        self.verifying_categorization = False
        self.category_selection = ""
        self.call_in_progress = True

    def prompt(self, prompt: str) -> str:
        if prompt == "START RESPONSE":
            response = f"Hello, welcome to {self.company_name}. How can I help you today?"
        else:
            self.conversation.append(f"Customer: {prompt}")
            context = self._get_context()
            if self.verifying_categorization and self._verify_customer_approval(context):
                response = self._transfer_customer()
            else:
                self.verifying_categorization = False
                needs_new_category = self._needs_new_category(context)
                if needs_new_category:
                    response = self._transfer_to_human()
                else:
                    enough_info = self._has_enough_info(context)
                    if not enough_info:
                        response = self._ask_questions(context)
                    else:
                        self.verifying_categorization = True
                        category = self._find_call_category(context)
                        response = self._verify_transfer(category)
        self.conversation.append(f"Agent: {response}")
        return response

    def _get_context(self) -> str:
        conversation = '\n'.join(self.conversation)
        context = (
            f"A customer calls the help desk of a company named {self.company_name}. Here is some info about the company:"
            f"{self.company_info}"
            f""
            f"In the call, the customer and customer service agent have the following conversation:"
            f"{conversation}"
            f""
            f"The agent wants to classify the call as one of these categories, for routing purposes:"
            f"{self.call_categories_list}"
            f""
        )
        return context

    def _needs_new_category(self, context: str) -> bool:
        prompt = context + (
            f"Does the customer have a problem which is outside the existing categories?"
            f"Answer in the form {{\"needs_new_category\": bool}}."
        )
        response = self.backend.prompt(prompt)
        try:
            return bool(json.loads(response)["needs_new_category"])
        except Exception:
            return False

    def _transfer_to_human(self) -> str:
        self.call_in_progress = False
        return f"Please hold, you're being transferred to a specialist."

    def _has_enough_info(self, context: str) -> bool:
        prompt = context + (
            f"Does the agent have enough information to categorize the customer's call with 95% accuracy without asking more questions?"
            f"Answer in the form {{\"category_known\": bool}}."
        )
        response = self.backend.prompt(prompt)
        try:
            return bool(json.loads(response)["category_known"])
        except Exception:
            return False

    def _ask_questions(self, context: str) -> str:
        prompt = context + (
            f"The agent doesn't know which category to choose. Write a question that the agent can ask to gain more information."
            f"The question should be worded in a friendly tone."
            f"Do not ever repeat a question that was already asked before."
            f"Do not ask irrelevant questions."
            f"Do not ask open ended questions."
            f"The question should be specific and help narrow down which category to choose."
            f"Do not assume that the customer is familiar with how the company works internally."
            f"Explain things to the customer if they seem confused."
        )
        question = self.backend.prompt(prompt)
        return question

    def _find_call_category(self, context: str) -> str:
        prompt = context + (
            f"Which category does the agent choose?"
            f"Answer in the form {{\"category\": int}}."
        )
        response = self.backend.prompt(prompt)
        category_n = int(json.loads(response)["category"])
        return self.call_categories[category_n-1]

    def _verify_transfer(self, category: str) -> str:
        self.category_selection = category
        return f"It sounds like your call can be classified as {self.category_selection}, is that correct?"

    def _verify_customer_approval(self, context: str) -> bool:
        prompt = context + (
            f"Did the customer agree with the agent's assessment at the end?"
            f"Answer in the form {{\"approved\": bool}}."
        )
        response = self.backend.prompt(prompt)
        try:
            return bool(json.loads(response)["approved"])
        except Exception:
            return False

    def _transfer_customer(self) -> str:
        self.call_in_progress = False
        return f"Please hold, you are now being transferred."

    def is_in_call(self) -> bool:
        return self.call_in_progress

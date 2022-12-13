from uuid import uuid4

from chat_session.backends import Gpt3QuestionBackend
from chat_session.robots.call_center_agent import CallCenterAgent
from chat_session.settings import companies


def demo_call_center_agent(company: companies.Company):
    robot = CallCenterAgent(uuid4(), company.name, company.info, company.call_categories)
    robot.attach_backend(Gpt3QuestionBackend())
    response = robot.prompt("START RESPONSE")
    print(f"Agent: {response}")
    while robot.is_in_call():
        prompt = input("Customer: ")
        response = robot.prompt(prompt)
        print(f"Agent: {response}")


if __name__ == "__main__":
    company = companies.get_random_company()
    demo_call_center_agent(company)

from uuid import uuid4

from chat_session.backends import Gpt3QuestionBackend
from chat_session.robots.call_center_agent import CallCenterAgent


def demo_call_center_agent():
    company_name = "Brain Chips R Us"
    company_info = (
        "Brain Chips R Us provides the highest end of consumer brain computer interface (BCI) implants."
        "We are the largest neural interface company on this side of the asteroid belt."
    )
    call_categories = ["malware in BCI implant", "chip power and battery issues", "medical issues relating to implant", "ethics concerns"]
    robot = CallCenterAgent(uuid4(), company_name, company_info, call_categories)
    robot.attach_backend(Gpt3QuestionBackend())
    response = robot.prompt("START RESPONSE")
    print(f"Agent: {response}")
    while True:
        prompt = input("Customer: ")
        response = robot.prompt(prompt)
        print(f"Agent: {response}")


if __name__ == "__main__":
    demo_call_center_agent()

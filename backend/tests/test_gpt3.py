from chat_session.gpt3 import Agent


def test_gpt3():
    agent = Agent()
    prompt = "When I say 'Test', please respond 'Test complete'. Test."
    response = agent.prompt(prompt)
    assert "Test complete" in response


def test_prompt():
    agent = Agent()
    while True:
        prompt = input("Q: ")
        response = agent.prompt(prompt)
        print("A:", response)
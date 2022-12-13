from uuid import uuid4

from chat_session.backends import Gpt3Backend
from chat_session.robots.base_robot import Robot


def test_robot():
    robot = Robot(uuid4())
    assert robot.uuid is not None
    response = robot.prompt("Hello")
    assert response == "No language model backend has been attached to this robot."
    robot.attach_backend(Gpt3Backend())
    response = robot.prompt("Hello")
    assert type(response) == str
    assert response != "No language model backend has been attached to this robot."

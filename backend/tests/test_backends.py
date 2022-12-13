import pytest
from typing import List

from chat_session import backends


@pytest.fixture
def all_backends():
    return [backends.Gpt3Backend()]


def test_backends(all_backends: List[backends.Backend]):
    for Backend in all_backends:
        backend = Backend
        response = backend.query("Please respond with 'test' if you see this message.")
        assert "test" in response.lower()

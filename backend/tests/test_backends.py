import pytest
from typing import List

from chat_session import backends


@pytest.fixture
def all_backends():
    return backends.get_backends()


def test_backends(all_backends: List[backends.Backend]):
    for Backend in all_backends:
        backend = Backend()
        response = backend.query("Hello")
        assert any([greeting in response.lower() for greeting in ["hi", "hello"]])

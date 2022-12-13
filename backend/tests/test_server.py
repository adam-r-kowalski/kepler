import pytest
import re
import requests
from uuid import UUID

from chat_session import server
from chat_session.datatypes import (
    entities,
    topics,
    calls,
    sessions,
)
from chat_session.server import (
    retrieve_or_create_account_and_get_uuid,
    get_topic_uuid,
    start_session_and_get_uuid,
    start_call_and_get_websocket_url,
)


@pytest.fixture(autouse=True)
def clear_dictionaries():
    entities.clear()
    topics.clear()
    calls.clear()
    sessions.clear()


@pytest.fixture
# TODO: should probably fix fixture call order
def retrieved_customer_uuid() -> UUID:
    # TODO: make sure known customer is retrieved
    customer_uuid = retrieve_or_create_account_and_get_uuid()
    return customer_uuid


@pytest.fixture
def new_customer_uuid() -> UUID:
    # TODO: make sure new customer is created
    customer_uuid = retrieve_or_create_account_and_get_uuid()
    return customer_uuid


TEST_PORT = 6666
server_url = f'http://127.0.0.1:{TEST_PORT}'


def is_valid_uuid(uuid_to_test: UUID) -> bool:
    uuid_regex = r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    return re.match(uuid_regex, uuid_to_test)


"""
def test_returning_customer_with_open_topic(retrieved_customer_uuid: str):
    # TODO: check known customer is retrieved
    # customer_uuid = retrieved_customer_uuid
    # assert len(entities) == 1
    # assert entities[customer_uuid].entity_type == "CUSTOMER"
    # assert len(entities[customer_uuid].topic_uuids) == 1
    # assert entities[customer_uuid].current_topic_uuid is not None
    #customer_uuid = requests.get(server_url + '/dial_in').json()
    #assert re.match(uuid_regex, customer_uuid)
    assert True
"""


"""
def test_returning_customer_with_new_topic(retrieved_customer_uuid: str):
    assert True
"""


def test_new_customer(new_customer_uuid: UUID):
    customer_uuid = requests.get(server_url + '/dial_in').json()
    assert is_valid_uuid(customer_uuid)

    session_uuid = requests.post(server_url + '/start_session', params={'customer_uuid': customer_uuid})
    breakpoint()
    assert is_valid_uuid(session_uuid)
    # TODO: check unknown customer returns new entity
    # customer_uuid = new_customer_uuid

    #data = {'user': 'Smith'}
    #requests.post(server_url, json=data)
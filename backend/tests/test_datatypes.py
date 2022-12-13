import pytest
import time

from chat_session.datatypes import (
    EntityType,
    entities,
    topics,
    sessions,
    create_entity,
    create_session_and_link_to_topic_and_agent,
    create_topic_and_link_to_customer,
    add_speech_fragment_to_session,
    get_open_topics,
    close_topic,
    resume_or_create_customer_topic,
)


@pytest.fixture(autouse=True)
def clear_dictionaries():
    entities.clear()
    topics.clear()
    sessions.clear()


# Test data creation


def test_create_entity():
    customer = create_entity(EntityType.CUSTOMER)
    robot = create_entity(EntityType.ROBOT)
    assert len(entities) == 2
    assert set(entities.keys()) == {customer.uuid, robot.uuid}


def test_create_topic_and_link_to_customer():
    customer = create_entity(EntityType.CUSTOMER)
    topic = create_topic_and_link_to_customer(customer.uuid)
    assert len(entities) == 1
    assert len(topics) == 1
    assert entities[customer.uuid] == customer
    assert topics[topic.uuid] == topic
    assert topic.customer_uuid == customer.uuid
    assert customer.topic_uuids == [topic.uuid]
    assert (time.time() - topic.timestamp) < 1


def test_create_session_and_link_to_topic():
    customer = create_entity(EntityType.CUSTOMER)
    topic = create_topic_and_link_to_customer(customer.uuid)
    robot = create_entity(EntityType.ROBOT)
    session = create_session_and_link_to_topic_and_agent(topic_uuid=topic.uuid, agent_uuid=robot.uuid)
    assert len(entities) == 2
    assert entities[customer.uuid] == customer
    assert entities[robot.uuid] == robot
    assert len(topics) == 1
    assert topics[topic.uuid] == topic
    assert len(sessions) == 1
    assert sessions[session.uuid] == session
    assert customer.topic_uuids == [topic.uuid]
    assert robot.topic_uuids == [topic.uuid]
    assert topic.session_uuids == [session.uuid]
    assert session.topic_uuid == topic.uuid
    assert session.customer_uuid == customer.uuid
    assert session.agent_uuid == robot.uuid
    assert (time.time() - session.timestamp) < 1


# Test helper functions


def test_add_speech_fragment_to_session():
    customer = create_entity(EntityType.CUSTOMER)
    topic = create_topic_and_link_to_customer(customer.uuid)
    robot = create_entity(EntityType.ROBOT)
    session = create_session_and_link_to_topic_and_agent(topic_uuid=topic.uuid, agent_uuid=robot.uuid)
    add_speech_fragment_to_session(entity_uuid=robot.uuid, text="How can I help you?", session_uuid=session.uuid)
    add_speech_fragment_to_session(entity_uuid=customer.uuid, text="I need money", session_uuid=session.uuid)
    assert len(sessions) == 1
    assert sessions[session.uuid] == session
    assert session.transcript[0].entity_uuid == robot.uuid
    assert session.transcript[0].text == "How can I help you?"
    assert (time.time() - session.transcript[0].timestamp) < 1
    assert session.transcript[1].entity_uuid == customer.uuid
    assert session.transcript[1].text == "I need money"
    assert (time.time() - session.transcript[1].timestamp) < 1


def test_get_open_topics_and_close_topics():
    customer = create_entity(EntityType.CUSTOMER)
    topic = create_topic_and_link_to_customer(customer.uuid)
    assert len(topics) == 1
    assert len(get_open_topics()) == 1
    assert customer.current_topic_uuid == topic.uuid
    close_topic(topic.uuid)
    assert len(topics) == 1
    assert len(get_open_topics()) == 0
    assert customer.current_topic_uuid is None

    topic = create_topic_and_link_to_customer(customer.uuid)
    assert len(topics) == 2
    assert len(get_open_topics()) == 1
    assert customer.current_topic_uuid == topic.uuid
    close_topic(topic.uuid)
    assert len(topics) == 2
    assert len(get_open_topics()) == 0
    assert customer.current_topic_uuid is None


def test_resume_or_create_customer_topic():
    customer = create_entity(EntityType.CUSTOMER)
    topic = create_topic_and_link_to_customer(customer.uuid)

    topic = resume_or_create_customer_topic(customer.uuid)
    assert len(topics) == 1
    assert topics[topic.uuid] == topic

    topic_2 = resume_or_create_customer_topic(customer.uuid)
    assert len(topics) == 1
    assert topic == topic_2
    assert topics[topic.uuid] == topic

    close_topic(topic.uuid)
    topic = resume_or_create_customer_topic(customer.uuid)
    assert len(topics) == 2
    assert topics[topic.uuid] == topic
    assert customer.current_topic_uuid == topic.uuid

    close_topic(topic.uuid)
    assert len(topics) == 2
    assert customer.current_topic_uuid is None


def test_create_customer_topic_with_closed_topics():
    customer = create_entity(EntityType.CUSTOMER)
    topic = create_topic_and_link_to_customer(customer.uuid)
    close_topic(topic.uuid)
    topic = create_topic_and_link_to_customer(customer.uuid)
    close_topic(topic.uuid)
    assert customer.current_topic_uuid is None
    assert len(topics) == 2

    topic = create_topic_and_link_to_customer(customer.uuid)
    assert len(topics) == 3
    assert customer.current_topic_uuid == topic.uuid

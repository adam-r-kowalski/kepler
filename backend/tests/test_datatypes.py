import pytest
import time

from chat_session.datatypes import (
    EntityType,
    entities,
    topics,
    calls,
    sessions,
    create_entity,
    create_call_and_link_to_topic_and_agent,
    create_topic_and_link_to_customer,
    create_session,
    add_speech_fragment_to_call,
    get_open_topics,
    close_topic,
    resume_or_create_customer_topic,
)


@pytest.fixture(autouse=True)
def clear_dictionaries():
    entities.clear()
    topics.clear()
    calls.clear()
    sessions.clear()


# Test data creation


# def test_create_entity():
    customer = create_entity(EntityType.CUSTOMER)
    robot_agent = create_entity(EntityType.ROBOT_AGENT)
    human_agent = create_entity(EntityType.HUMAN_AGENT)
    assert len(entities) == 3
    assert set(entities.keys()) == {customer.uuid, robot_agent.uuid, human_agent.uuid}


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


def test_create_call_and_link_to_topic():
    customer = create_entity(EntityType.CUSTOMER)
    topic = create_topic_and_link_to_customer(customer.uuid)
    robot_agent = create_entity(EntityType.ROBOT_AGENT)
    call = create_call_and_link_to_topic_and_agent(topic_uuid=topic.uuid, agent_uuid=robot_agent.uuid)
    assert len(entities) == 2
    assert entities[customer.uuid] == customer
    assert entities[robot_agent.uuid] == robot_agent
    assert len(topics) == 1
    assert topics[topic.uuid] == topic
    assert len(calls) == 1
    assert calls[call.uuid] == call
    assert customer.topic_uuids == [topic.uuid]
    assert robot_agent.topic_uuids == [topic.uuid]
    assert topic.call_uuids == [call.uuid]
    assert call.topic_uuid == topic.uuid
    assert call.customer_uuid == customer.uuid
    assert call.agent_uuid == robot_agent.uuid
    assert (time.time() - call.timestamp) < 1


def test_create_session():
    customer = create_entity(EntityType.CUSTOMER)
    topic = create_topic_and_link_to_customer(customer.uuid)
    session = create_session(customer_uuid=customer.uuid, topic_uuid=topic.uuid)
    assert len(sessions) == 1
    assert sessions[session.uuid] == session
    assert (time.time() - session.timestamp) < 1


# Test helper functions


def test_add_speech_fragment_to_call():
    customer = create_entity(EntityType.CUSTOMER)
    topic = create_topic_and_link_to_customer(customer.uuid)
    robot_agent = create_entity(EntityType.ROBOT_AGENT)
    call = create_call_and_link_to_topic_and_agent(topic_uuid=topic.uuid, agent_uuid=robot_agent.uuid)
    add_speech_fragment_to_call(entity_uuid=robot_agent.uuid, text="How can I help you?", call_uuid=call.uuid)
    add_speech_fragment_to_call(entity_uuid=customer.uuid, text="I need money", call_uuid=call.uuid)
    assert len(calls) == 1
    assert calls[call.uuid] == call
    assert call.transcript[0].entity_uuid == robot_agent.uuid
    assert call.transcript[0].text == "How can I help you?"
    assert (time.time() - call.transcript[0].timestamp) < 1
    assert call.transcript[1].entity_uuid == customer.uuid
    assert call.transcript[1].text == "I need money"
    assert (time.time() - call.transcript[1].timestamp) < 1


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

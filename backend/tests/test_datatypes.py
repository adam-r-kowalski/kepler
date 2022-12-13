import pytest
import time

from chat_session.datatypes import (
    EntityType,
    entities,
    issues,
    calls,
    sessions,
    create_entity,
    create_call_and_link_to_issue_and_agent,
    create_issue_and_link_to_customer,
    create_session,
    add_speech_fragment_to_call,
    get_open_issues,
    close_issue,
    resume_or_create_customer_issue,
)


@pytest.fixture(autouse=True)
def clear_dictionaries():
    entities.clear()
    issues.clear()
    calls.clear()
    sessions.clear()


# Test data creation


def test_create_entity():
    customer = create_entity(EntityType.CUSTOMER)
    robot_agent = create_entity(EntityType.ROBOT_AGENT)
    human_agent = create_entity(EntityType.HUMAN_AGENT)
    assert len(entities) == 3
    assert set(entities.keys()) == {customer.uuid, robot_agent.uuid, human_agent.uuid}


def test_create_issue_and_link_to_customer():
    customer = create_entity(EntityType.CUSTOMER)
    issue = create_issue_and_link_to_customer(customer.uuid)
    assert len(entities) == 1
    assert len(issues) == 1
    assert entities[customer.uuid] == customer
    assert issues[issue.uuid] == issue
    assert issue.customer_uuid == customer.uuid
    assert customer.issue_uuids == [issue.uuid]
    assert (time.time() - issue.timestamp) < 1


def test_create_call_and_link_to_issue():
    customer = create_entity(EntityType.CUSTOMER)
    issue = create_issue_and_link_to_customer(customer.uuid)
    robot_agent = create_entity(EntityType.ROBOT_AGENT)
    call = create_call_and_link_to_issue_and_agent(issue_uuid=issue.uuid, agent_uuid=robot_agent.uuid)
    assert len(entities) == 2
    assert entities[customer.uuid] == customer
    assert entities[robot_agent.uuid] == robot_agent
    assert len(issues) == 1
    assert issues[issue.uuid] == issue
    assert len(calls) == 1
    assert calls[call.uuid] == call
    assert customer.issue_uuids == [issue.uuid]
    assert robot_agent.issue_uuids == [issue.uuid]
    assert issue.call_uuids == [call.uuid]
    assert call.issue_uuid == issue.uuid
    assert call.customer_uuid == customer.uuid
    assert call.agent_uuid == robot_agent.uuid
    assert (time.time() - call.timestamp) < 1


def test_create_session():
    customer = create_entity(EntityType.CUSTOMER)
    issue = create_issue_and_link_to_customer(customer.uuid)
    session = create_session(customer_uuid=customer.uuid, issue_uuid=issue.uuid)
    assert len(sessions) == 1
    assert sessions[session.uuid] == session
    assert (time.time() - session.timestamp) < 1


# Test helper functions


def test_add_speech_fragment_to_call():
    customer = create_entity(EntityType.CUSTOMER)
    issue = create_issue_and_link_to_customer(customer.uuid)
    robot_agent = create_entity(EntityType.ROBOT_AGENT)
    call = create_call_and_link_to_issue_and_agent(issue_uuid=issue.uuid, agent_uuid=robot_agent.uuid)
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


def test_get_open_issues_and_close_issues():
    customer = create_entity(EntityType.CUSTOMER)
    issue = create_issue_and_link_to_customer(customer.uuid)
    assert len(issues) == 1
    assert len(get_open_issues()) == 1
    assert customer.current_issue_uuid == issue.uuid
    close_issue(issue.uuid)
    assert len(issues) == 1
    assert len(get_open_issues()) == 0
    assert customer.current_issue_uuid is None

    issue = create_issue_and_link_to_customer(customer.uuid)
    assert len(issues) == 2
    assert len(get_open_issues()) == 1
    assert customer.current_issue_uuid == issue.uuid
    close_issue(issue.uuid)
    assert len(issues) == 2
    assert len(get_open_issues()) == 0
    assert customer.current_issue_uuid is None


def test_resume_or_create_customer_issue():
    customer = create_entity(EntityType.CUSTOMER)
    issue = create_issue_and_link_to_customer(customer.uuid)

    issue = resume_or_create_customer_issue(customer.uuid)
    assert len(issues) == 1
    assert issues[issue.uuid] == issue

    issue_2 = resume_or_create_customer_issue(customer.uuid)
    assert len(issues) == 1
    assert issue == issue_2
    assert issues[issue.uuid] == issue

    close_issue(issue.uuid)
    issue = resume_or_create_customer_issue(customer.uuid)
    assert len(issues) == 2
    assert issues[issue.uuid] == issue
    assert customer.current_issue_uuid == issue.uuid

    close_issue(issue.uuid)
    assert len(issues) == 2
    assert customer.current_issue_uuid is None


def test_create_customer_issue_with_closed_issues():
    customer = create_entity(EntityType.CUSTOMER)
    issue = create_issue_and_link_to_customer(customer.uuid)
    close_issue(issue.uuid)
    issue = create_issue_and_link_to_customer(customer.uuid)
    close_issue(issue.uuid)
    assert customer.current_issue_uuid is None
    assert len(issues) == 2

    issue = create_issue_and_link_to_customer(customer.uuid)
    assert len(issues) == 3
    assert customer.current_issue_uuid == issue.uuid
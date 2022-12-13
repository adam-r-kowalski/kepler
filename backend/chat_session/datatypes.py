from dataclasses import dataclass
import time
from typing import Dict, List, Optional
import uuid


# Helper data types


@dataclass
class SpeechFragment:  # this data type is not stored or accessed on its own
    entity_uuid: str
    text: str
    timestamp: str


# Top-level data types and collections


@dataclass
class Entity:
    uuid: str
    conversation_uuids: List[str]
    current_conversation_uuid: Optional[str]


@dataclass
class Issue:
    uuid: str
    open: bool
    customer_uuid: str
    timestamp: str
    call_uuids: List[str]
    agent_uuids: List[str]


@dataclass
class Call:
    uuid: str
    issue_uuid: str
    customer_uuid: str
    agent_uuid: str
    timestamp: str
    transcript: List[SpeechFragment]


@dataclass
class Session:
    uuid: str
    customer_uuid: str
    issue_uuid: str
    timestamp: str


entities: Dict[str, Entity] = {}
issues: Dict[str, Issue] = {}
calls: Dict[str, Call] = {}
sessions: Dict[str, Session] = {}


# Data linking


def _link_issue_and_customer(issue_uuid: str, customer_uuid: str):
    entities[customer_uuid].issue_uuids.append(issue_uuid)
    issues[issue_uuid].customer_uuid = customer_uuid
    entities[customer_uuid].current_issue_uuid = issue_uuid


def _link_issue_and_agent(issue_uuid: str, agent_uuid: str):
    entities[agent_uuid].issue_uuids.append(issue_uuid)
    if agent_uuid not in issues[issue_uuid].agent_uuids:
        issues[issue_uuid].agent_uuids.append(agent_uuid)


def _link_call_and_issue(call_uuid: str, issue_uuid: str) -> None:
    calls[call_uuid].issue_uuid = issue_uuid
    issues[issue_uuid].call_uuids.append(call_uuid)


def _link_session_info(session_uuid: str, customer_uuid: str, issue_uuid: str) -> None:
    sessions[session_uuid].customer_uuid = customer_uuid
    sessions[session_uuid].issue_uuid = issue_uuid


# Data creation


def create_entity(entity_type: EntityType) -> Entity:
    entity = Entity(
        uuid = uuid.uuid4(),
        type = entity_type,
        issue_uuids = [],
        current_issue_uuid = None,
    )
    entities[entity.uuid] = entity
    return entity


def create_issue_and_link_to_customer(customer_uuid: str) -> Issue:
    issue = Issue(
        uuid = uuid.uuid4(),
        open = True,
        customer_uuid = customer_uuid,
        call_uuids = [],
        timestamp = time.time(),
        agent_uuids = [],
    )
    issues[issue.uuid] = issue
    _link_issue_and_customer(issue.uuid, customer_uuid)
    return issue


def create_call_and_link_to_issue_and_agent(issue_uuid: str, agent_uuid: str) -> Call:
    call = Call(
        uuid = uuid.uuid4(),
        issue_uuid = issue_uuid,
        customer_uuid = issues[issue_uuid].customer_uuid,
        agent_uuid = agent_uuid,
        timestamp = time.time(),
        transcript = [],
    )
    calls[call.uuid] = call
    _link_call_and_issue(call.uuid, issue_uuid)
    _link_issue_and_agent(issue_uuid, agent_uuid)
    return call


def create_session(customer_uuid: str, issue_uuid: str) -> Session:
    session = Session(
        uuid = uuid.uuid4(),
        customer_uuid = customer_uuid,
        issue_uuid = issue_uuid,
        timestamp = time.time(),
    )
    sessions[session.uuid] = session
    _link_session_info(session.uuid, customer_uuid, issue_uuid)
    return session


# Helper functions


def add_speech_fragment_to_call(entity_uuid: str, text: str, call_uuid: str) -> None:
    speech_fragment = SpeechFragment(
        entity_uuid = entity_uuid,
        text = text,
        timestamp = time.time(),
    )
    calls[call_uuid].transcript.append(speech_fragment)


def get_open_issues() -> List[Issue]:
    return [issue for issue in issues.values() if issue.open]


def close_issue(issue_uuid: str) -> None:
    issue = issues[issue_uuid]
    issue.open = False
    customer = entities[issue.customer_uuid]
    customer.current_issue_uuid = None


def resume_or_create_customer_issue(customer_uuid: str) -> Issue:
    customer = entities[customer_uuid]
    if customer.current_issue_uuid is None:
        issue = create_issue_and_link_to_customer(customer_uuid)
        customer.current_issue_uuid = issue.uuid
        return issue
    else:
        return issues[customer.current_issue_uuid]

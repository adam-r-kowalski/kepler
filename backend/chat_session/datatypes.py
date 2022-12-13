from dataclasses import dataclass
from enum import Enum, auto
import time
from typing import Dict, List, Optional
from uuid import uuid4, UUID


# Helper data types


class EntityType(Enum):
    CUSTOMER = auto()
    ROBOT_AGENT = auto()
    HUMAN_AGENT = auto()


@dataclass
class SpeechFragment:  # this data type is not stored or accessed on its own
    entity_uuid: UUID
    text: str
    timestamp: float


# Top-level data types and collections


@dataclass
class Entity:
    uuid: UUID
    type: EntityType
    topic_uuids: List[UUID]
    current_topic_uuid: Optional[UUID]


@dataclass
class Topic:
    uuid: UUID
    open: bool
    customer_uuid: UUID
    timestamp: float
    call_uuids: List[UUID]
    agent_uuids: List[UUID]


@dataclass
class Call:
    uuid: UUID
    topic_uuid: UUID
    customer_uuid: UUID
    agent_uuid: UUID
    timestamp: float
    transcript: List[SpeechFragment]


@dataclass
class Session:
    uuid: UUID
    customer_uuid: UUID
    topic_uuid: UUID
    timestamp: float


entities: Dict[UUID, Entity] = {}
topics: Dict[UUID, Topic] = {}
calls: Dict[UUID, Call] = {}
sessions: Dict[UUID, Session] = {}


# Data linking


def _link_topic_and_customer(topic_uuid: UUID, customer_uuid: UUID):
    entities[customer_uuid].topic_uuids.append(topic_uuid)
    topics[topic_uuid].customer_uuid = customer_uuid
    entities[customer_uuid].current_topic_uuid = topic_uuid


def _link_topic_and_agent(topic_uuid: UUID, agent_uuid: UUID):
    entities[agent_uuid].topic_uuids.append(topic_uuid)
    if agent_uuid not in topics[topic_uuid].agent_uuids:
        topics[topic_uuid].agent_uuids.append(agent_uuid)


def _link_call_and_topic(call_uuid: UUID, topic_uuid: UUID) -> None:
    calls[call_uuid].topic_uuid = topic_uuid
    topics[topic_uuid].call_uuids.append(call_uuid)


def _link_session_info(session_uuid: UUID, customer_uuid: UUID, topic_uuid: UUID) -> None:
    sessions[session_uuid].customer_uuid = customer_uuid
    sessions[session_uuid].topic_uuid = topic_uuid


# Data creation


def create_entity(entity_type: EntityType) -> Entity:
    entity = Entity(
        uuid = uuid4(),
        type = entity_type,
        topic_uuids = [],
        current_topic_uuid = None,
    )
    entities[entity.uuid] = entity
    return entity


def create_topic_and_link_to_customer(customer_uuid: UUID) -> Topic:
    topic = Topic(
        uuid = uuid4(),
        open = True,
        customer_uuid = customer_uuid,
        call_uuids = [],
        timestamp = time.time(),
        agent_uuids = [],
    )
    topics[topic.uuid] = topic
    _link_topic_and_customer(topic.uuid, customer_uuid)
    return topic


def create_call_and_link_to_topic_and_agent(topic_uuid: UUID, agent_uuid: UUID) -> Call:
    call = Call(
        uuid = uuid4(),
        topic_uuid = topic_uuid,
        customer_uuid = topics[topic_uuid].customer_uuid,
        agent_uuid = agent_uuid,
        timestamp = time.time(),
        transcript = [],
    )
    calls[call.uuid] = call
    _link_call_and_topic(call.uuid, topic_uuid)
    _link_topic_and_agent(topic_uuid, agent_uuid)
    return call


def create_session(customer_uuid: UUID, topic_uuid: UUID) -> Session:
    session = Session(
        uuid = uuid4(),
        customer_uuid = customer_uuid,
        topic_uuid = topic_uuid,
        timestamp = time.time(),
    )
    sessions[session.uuid] = session
    _link_session_info(session.uuid, customer_uuid, topic_uuid)
    return session


# Helper functions


def add_speech_fragment_to_call(entity_uuid: UUID, text: str, call_uuid: UUID) -> None:
    speech_fragment = SpeechFragment(
        entity_uuid = entity_uuid,
        text = text,
        timestamp = time.time(),
    )
    calls[call_uuid].transcript.append(speech_fragment)


def get_open_topics() -> List[Topic]:
    return [topic for topic in topics.values() if topic.open]


def close_topic(topic_uuid: UUID) -> None:
    topic = topics[topic_uuid]
    topic.open = False
    customer = entities[topic.customer_uuid]
    customer.current_topic_uuid = None


def resume_or_create_customer_topic(customer_uuid: UUID) -> Topic:
    customer = entities[customer_uuid]
    if customer.current_topic_uuid is None:
        topic = create_topic_and_link_to_customer(customer_uuid)
        customer.current_topic_uuid = topic.uuid
        return topic
    else:
        return topics[customer.current_topic_uuid]

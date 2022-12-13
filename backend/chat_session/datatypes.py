from dataclasses import dataclass
from enum import Enum, auto
import time
from typing import Dict, List, Optional
from uuid import uuid4, UUID


# Helper data types


class EntityType(Enum):
    CUSTOMER = auto()
    ROBOT = auto()


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
    session_uuids: List[UUID]
    agent_uuids: List[UUID]


@dataclass
class Session:
    uuid: UUID
    topic_uuid: UUID
    customer_uuid: UUID
    agent_uuid: UUID
    timestamp: float
    transcript: List[SpeechFragment]


entities: Dict[UUID, Entity] = {}
topics: Dict[UUID, Topic] = {}
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


def _link_session_and_topic(session_uuid: UUID, topic_uuid: UUID) -> None:
    sessions[session_uuid].topic_uuid = topic_uuid
    topics[topic_uuid].session_uuids.append(session_uuid)


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
        session_uuids = [],
        timestamp = time.time(),
        agent_uuids = [],
    )
    topics[topic.uuid] = topic
    _link_topic_and_customer(topic.uuid, customer_uuid)
    return topic


def create_session_and_link_to_topic_and_agent(topic_uuid: UUID, agent_uuid: UUID) -> Session:
    session = Session(
        uuid = uuid4(),
        topic_uuid = topic_uuid,
        customer_uuid = topics[topic_uuid].customer_uuid,
        agent_uuid = agent_uuid,
        timestamp = time.time(),
        transcript = [],
    )
    sessions[session.uuid] = session
    _link_session_and_topic(session.uuid, topic_uuid)
    _link_topic_and_agent(topic_uuid, agent_uuid)
    return session


# Helper functions


def add_speech_fragment_to_session(entity_uuid: UUID, text: str, session_uuid: UUID) -> None:
    speech_fragment = SpeechFragment(
        entity_uuid = entity_uuid,
        text = text,
        timestamp = time.time(),
    )
    sessions[session_uuid].transcript.append(speech_fragment)


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

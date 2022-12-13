import fastapi
from uuid import UUID
import uvicorn

from chat_session.datatypes import (
    EntityType,
    entities,
    sessions,
    issues,
    create_entity,
    create_session,
    create_call_and_link_to_issue_and_agent,
    create_issue_and_link_to_customer,
)


app = fastapi.FastAPI()


@app.get("/dial_in")
def retrieve_or_create_account_and_get_uuid() -> UUID:
    # TODO: checks your browser or phone to see if you're a known customer
    # maybe pass in phone number, IP address etc.?
    # creates new customer in system if you're unknown
    # implement cookie storage?
    customer = None
    # customer = get_customer_from_browser_and_phone_info()
    breakpoint()
    if customer is None:
        customer = create_entity(EntityType.CUSTOMER)
        # set_customer_info(customer, phone, IP, etc.)
    breakpoint()
    return customer.uuid


def get_issue_uuid(customer_uuid: UUID) -> UUID:
    current_issue_uuid = entities[customer_uuid].current_issue_uuid
    if current_issue_uuid is None:
        issue = create_issue_and_link_to_customer(customer_uuid)
    else:
        issue = issues[current_issue_uuid]
    return issue.uuid


@app.post("/start_session")
def start_session_and_get_uuid(customer_uuid: UUID) -> UUID:
    breakpoint()
    print("customer_uuid:", customer_uuid)
    issue_uuid = get_issue_uuid(customer_uuid)
    breakpoint()
    session = create_session(customer_uuid, issue_uuid)
    return session.uuid


@app.post("/engage_websocket")
def start_call_and_get_websocket_url(session_uuid: UUID) -> UUID:
    issue_uuid = sessions[session_uuid].issue_uuid
    agent = create_entity(EntityType.ROBOT_AGENT)
    # TODO: personalize agent and make sure customer gets the same personality settings and memory as last time
    # TODO: separate customer, robot_agent, and human_agent into separate entities
    call = create_call_and_link_to_issue_and_agent(issue_uuid, agent.uuid)
    # probably start a websocket connection here and return the websocket URL
    # TODO: add websocket URL to Call object
    url = "ws://localhost:8000"
    return url


# Call with robot agent happens here
# TODO: More routing functions follow


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=6666)
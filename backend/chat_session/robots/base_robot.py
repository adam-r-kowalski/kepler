from uuid import UUID

from chat_session.backends import Backend, EmptyBackend


class Robot:
    def __init__(self, uuid: UUID):
        self.uuid = uuid
        self.backend = EmptyBackend()

    def attach_backend(self, backend: Backend):
        self.backend = backend

    def prompt(self, prompt: str) -> str:
        response = self.backend.prompt(prompt)
        return response

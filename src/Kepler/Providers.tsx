import { JSXElement } from "solid-js"

import { UUID, UUIDProvider } from "../UUID"
import { ProfileProvider } from "../Profile"
import { Backend, BackendProvider } from "../Backend"
import { ConversationsProvider } from "../Conversations"

interface Props {
    uuid: () => UUID
    backend: () => Backend
    children: JSXElement
}

export const Providers = (props: Props) => {
    return (
        <UUIDProvider uuid={props.uuid()}>
            <ProfileProvider>
                <BackendProvider backend={props.backend()}>
                    <ConversationsProvider>
                        {props.children}
                    </ConversationsProvider>
                </BackendProvider>
            </ProfileProvider>
        </UUIDProvider>
    )
}

import { Route, Router, Routes } from "@solidjs/router"

import { Profile } from "../Profile"
import { Conversation } from "../Conversation"
import { Conversations } from "../Conversations"
import { ProfileProvider } from "../Profile"
import { ConversationsProvider } from "../Conversations"
import { UUID } from "../UUID"
import { Backend } from "../Backend"
import { UUIDProvider } from "../UUID/UUID"
import { BackendProvider } from "../Backend/Backend"

document.documentElement.style.setProperty("--toolbar", "50px")
document.documentElement.style.setProperty("--max-width", "1000px")

document.documentElement.style.setProperty(
    "--height",
    `${window.innerHeight}px`
)

window.addEventListener("resize", () => {
    document.documentElement.style.setProperty(
        "--height",
        `${window.innerHeight}px`
    )
})

interface Props {
    uuid: () => UUID
    backend: () => Backend
}

export const Kepler = (props: Props) => {
    return (
        <Router>
            <UUIDProvider uuid={props.uuid()}>
                <ProfileProvider>
                    <BackendProvider backend={props.backend()}>
                        <ConversationsProvider>
                            <Routes>
                                <Route
                                    path="/kepler/"
                                    component={Conversations}
                                />
                                <Route
                                    path="/kepler/conversation/:uuid"
                                    component={Conversation}
                                />
                                <Route
                                    path="/kepler/profile/"
                                    component={Profile}
                                />
                            </Routes>
                        </ConversationsProvider>
                    </BackendProvider>
                </ProfileProvider>
            </UUIDProvider>
        </Router>
    )
}

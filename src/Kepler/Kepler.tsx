import { Route, Router, Routes } from "@solidjs/router"

import { Profile } from "../Profile"
import { Conversation } from "../Conversation"
import { Conversations } from "../Conversations"
import { ProfileProvider } from "../Profile"
import { ConversationsProvider } from "../Conversations"

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

export const Kepler = () => {
    return (
        <Router>
            <ProfileProvider>
                <ConversationsProvider>
                    <Routes>
                        <Route path="/kepler/" component={Conversations} />
                        <Route
                            path="/kepler/conversation/:uuid"
                            component={Conversation}
                        />
                        <Route path="/kepler/profile/" component={Profile} />
                    </Routes>
                </ConversationsProvider>
            </ProfileProvider>
        </Router>
    )
}

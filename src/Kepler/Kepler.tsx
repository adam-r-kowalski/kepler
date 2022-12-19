import { Route, Router, Routes } from "@solidjs/router"
import { Profile } from "../Profile"
import { Conversation } from "../Conversation"
import { Conversations } from "../Conversations"
import { ProfileProvider } from "../Profile"
import { ChatGPTBackendProvider, MockBackendProvider } from "../Backend"
import { ConversationsProvider } from "../Conversations"

const BackendProvider = ChatGPTBackendProvider
// const BackendProvider = MockBackendProvider

export const Kepler = () => {
    return (
        <Router>
            <ProfileProvider>
                <BackendProvider>
                    <ConversationsProvider>
                        <Routes>
                            <Route path="/kepler/" component={Conversations} />
                            <Route
                                path="/kepler/conversation/:name"
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
        </Router>
    )
}

import { Toolbar } from "../Toolbar"
import { Route, Router, Routes } from "@solidjs/router"
import { Profile } from "../Profile"
import { Conversation } from "../Conversation"
import { Conversations } from "../Conversations"
import { ProfileProvider } from "../Profile"
import { ChatGPTBackendProvider, MockBackendProvider } from "../Backend"

// const BackendProvider = ChatGPTBackendProvider
const BackendProvider = MockBackendProvider

export const Kepler = () => {
    return (
        <Router>
            <ProfileProvider>
                <BackendProvider>
                    <Toolbar />
                    <Routes>
                        <Route path="/kepler/" component={Conversations} />
                        <Route
                            path="/kepler/conversation/"
                            component={Conversation}
                        />
                        <Route path="/kepler/profile/" component={Profile} />
                    </Routes>
                </BackendProvider>
            </ProfileProvider>
        </Router>
    )
}

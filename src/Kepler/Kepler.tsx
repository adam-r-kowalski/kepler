import { Toolbar } from "../Toolbar"
import { Route, Router, Routes } from "@solidjs/router"
import { Profile } from "../Profile"
import { Thread } from "../Thread"
import { ProfileProvider } from "../Profile"
import { ChatGPTBackendProvider } from "../Backend"

export const Kepler = () => {
    return (
        <Router>
            <ProfileProvider>
                <ChatGPTBackendProvider>
                    <Toolbar />
                    <Routes>
                        <Route path="/kepler/" component={Thread} />
                        <Route path="/kepler/profile/" component={Profile} />
                    </Routes>
                </ChatGPTBackendProvider>
            </ProfileProvider>
        </Router>
    )
}

import { Toolbar } from "../Toolbar"
import { Route, Router, Routes } from "@solidjs/router"
import { Profile } from "../Profile"
import { Thread } from "../Thread"
import { ProfileProvider } from "../Profile"
import { ChatGPTBackendProvider, MockBackendProvider } from "../Backend"

const BackendProvider = ChatGPTBackendProvider
// const BackendProvider = MockBackendProvider

export const Kepler = () => {
    return (
        <Router>
            <ProfileProvider>
                <BackendProvider>
                    <Toolbar />
                    <Routes>
                        <Route path="/kepler/" component={Thread} />
                        <Route path="/kepler/profile/" component={Profile} />
                    </Routes>
                </BackendProvider>
            </ProfileProvider>
        </Router>
    )
}

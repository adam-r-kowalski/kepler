import { Toolbar } from "../Toolbar"
import { Route, Router, Routes } from "@solidjs/router"
import { Profile } from "../Profile"
import { Thread } from "../Thread"
import { ChatGPTBackend } from "../Backend"

export const Kepler = () => {
    return (
        <Router>
            <ChatGPTBackend>
                <Toolbar />
                <Routes>
                    <Route path="/kepler/" component={Thread} />
                    <Route path="/kepler/profile/" component={Profile} />
                </Routes>
            </ChatGPTBackend>
        </Router>
    )
}

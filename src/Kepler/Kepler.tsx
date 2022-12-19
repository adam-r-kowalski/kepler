import { Route, Router, Routes } from "@solidjs/router"

import { Profile } from "../Profile"
import { Conversation } from "../Conversation"
import { Conversations } from "../Conversations"
import { UUID } from "../UUID"
import { Backend } from "../Backend"
import { Providers } from "./Providers"

document.documentElement.style.setProperty("--toolbar", "50px")
document.documentElement.style.setProperty("--max-width", "1000px")

const setHeight = () => {
    const height = `${window.innerHeight}px`
    document.documentElement.style.setProperty("--height", height)
}

setHeight()

window.addEventListener("resize", setHeight)

interface Props {
    uuid: () => UUID
    backend: () => Backend
}

export const Kepler = (props: Props) => {
    return (
        <Router>
            <Providers uuid={props.uuid} backend={props.backend}>
                <Routes>
                    <Route path="/kepler/" component={Conversations} />
                    <Route
                        path="/kepler/conversation/:uuid"
                        component={Conversation}
                    />
                    <Route path="/kepler/profile/" component={Profile} />
                </Routes>
            </Providers>
        </Router>
    )
}

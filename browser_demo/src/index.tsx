/* @refresh reload */
import { render } from "solid-js/web"

import { MessageBoard } from "./MessageBoard"

render(
    () => <MessageBoard kepler_ws = "wss://localhost:8080" />,
    document.getElementById("root") as HTMLElement
)

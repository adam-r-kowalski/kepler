/* @refresh reload */
import { render } from "solid-js/web"

import { MessageBoard } from "./MessageBoard"
import { MockBackend } from "./Backend"

render(
    () => <MessageBoard backend={new MockBackend()} />,
    document.getElementById("root") as HTMLElement
)

/* @refresh reload */
import { render } from "solid-js/web"

import { Kepler } from "./Kepler"
import { MockBackend } from "./Backend"

render(
    () => <Kepler backend={new MockBackend()} />,
    document.getElementById("root") as HTMLElement
)

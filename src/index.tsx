/* @refresh reload */
import { render } from "solid-js/web"

import { Kepler } from "./Kepler"
import { createMockBackend, createOpenAIBackend } from "./Backend"
import { createCryptoUUID } from "./UUID"

render(
    () => <Kepler backend={createOpenAIBackend} uuid={createCryptoUUID} />,
    document.getElementById("root")!
)

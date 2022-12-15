/* @refresh reload */
import { render } from "solid-js/web"

import { MessageBoard } from "./MessageBoard"
import { Kepler } from "./Kepler"
import { MockLanguageModel } from "./LanguageModel"

render(
    () => <MessageBoard kepler={new Kepler(new MockLanguageModel())} />,
    document.getElementById("root") as HTMLElement
)

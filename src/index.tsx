/* @refresh reload */
import { render } from "solid-js/web"

import { MessageBoard } from "./MessageBoard"
import { MockLanguageModel } from "./LanguageModel"

render(
    () => <MessageBoard backend={new MockLanguageModel()} />,
    document.getElementById("root") as HTMLElement
)

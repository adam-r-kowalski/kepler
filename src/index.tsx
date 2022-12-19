/* @refresh reload */
import { render } from "solid-js/web"

import { Kepler } from "./Kepler"
import { ChatGPTBackendProvider, MockBackendProvider } from "./Backend"
import { CryptoUUIDProvider } from "./UUID"

const BackendProvider = ChatGPTBackendProvider
// const BackendProvider = MockBackendProvider

const UUIDProvider = CryptoUUIDProvider

render(
    () => (
        <UUIDProvider>
            <BackendProvider>
                <Kepler />
            </BackendProvider>
        </UUIDProvider>
    ),
    document.getElementById("root")!
)

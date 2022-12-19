import { JSXElement } from "solid-js"

import { UUIDContext } from "./UUID"

interface Props {
    children: JSXElement
}

export const CryptoUUIDProvider = (props: Props) => {
    const generate = () => crypto.randomUUID()
    return (
        <UUIDContext.Provider value={{ generate }}>
            {props.children}
        </UUIDContext.Provider>
    )
}

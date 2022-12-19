import { createContext, JSXElement, useContext } from "solid-js"

export interface UUID {
    generate: () => string
}

export const UUIDContext = createContext<UUID>()

export const useUUID = () => useContext(UUIDContext)

interface Props {
    uuid: UUID
    children: JSXElement
}

export const UUIDProvider = (props: Props) => {
    return (
        <UUIDContext.Provider value={props.uuid}>
            {props.children}
        </UUIDContext.Provider>
    )
}

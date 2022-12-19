import { createContext, useContext } from "solid-js"

export interface UUID {
    generate: () => string
}

export const UUIDContext = createContext<UUID>()

export const useUUID = () => useContext(UUIDContext)

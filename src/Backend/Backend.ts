import { createContext, useContext } from "solid-js"
import { Key } from "./key"

export interface Backend {
    key: Key
    send: (text: string) => Promise<string>
}

export const BackendContext = createContext<Backend>()

export const useBackend = () => useContext(BackendContext)

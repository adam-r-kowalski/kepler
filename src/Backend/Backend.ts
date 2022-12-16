import { createContext, useContext } from "solid-js"

interface Success {
    kind: "success"
    text: string
}

interface RateLimit {
    kind: "rate limit"
}

export type Response = Success | RateLimit

export interface Backend {
    send: (text: string) => Promise<Response>
}

export const BackendContext = createContext<Backend>()

export const useBackend = () => useContext(BackendContext)

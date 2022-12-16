import { createSignal } from "solid-js"

export interface Key {
    current: () => string
    set: (key: string) => void
}

export const createKey = (): Key => {
    const [current, setKey] = createSignal(localStorage.getItem("key") ?? "")
    const set = (key: string) => {
        localStorage.setItem("key", key)
        setKey(key)
    }
    return { current, set }
}

import { openDB } from "idb"
import { createContext, createSignal, JSXElement, useContext } from "solid-js"

export const engines = ["ada", "babbage", "curie", "davinci", "codex"]

interface Profile {
    key: () => string
    setKey: (key: string) => void
    model: () => string
    setModel: (model: string) => void
    temperature: () => number
    setTemperature: (temperature: number) => void
}

const ProfileContext = createContext<Profile>()

interface Props {
    children: JSXElement
}

export const ProfileProvider = (props: Props) => {
    const [key, baseSetKey] = createSignal("")
    const [model, baseSetModel] = createSignal("davinci")
    const [temperature, baseSetTemperature] = createSignal(0)
    const loadDB = async () => {
        const db = await openDB("kepler", 1, {
            upgrade(db) {
                db.createObjectStore("profile")
            },
        })
        const key = await db.get("profile", "key")
        if (key) baseSetKey(key)
        const model = await db.get("profile", "model")
        if (model) baseSetModel(model)
        const temperature = await db.get("profile", "temperature")
        if (temperature) baseSetTemperature(temperature)
        return db
    }
    const dbPromise = loadDB()
    const setKey = async (key: string) => {
        baseSetKey(key)
        const db = await dbPromise
        db.put("profile", key, "key")
    }
    const setModel = async (model: string) => {
        baseSetModel(model)
        const db = await dbPromise
        db.put("profile", model, "model")
    }
    const setTemperature = async (temperature: number) => {
        baseSetTemperature(temperature)
        const db = await dbPromise
        db.put("profile", temperature, "temperature")
    }
    const profile: Profile = {
        key,
        setKey,
        model,
        setModel,
        temperature,
        setTemperature,
    }
    return (
        <ProfileContext.Provider value={profile}>
            {props.children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext)

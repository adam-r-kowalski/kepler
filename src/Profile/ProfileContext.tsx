import { openDB } from "idb"
import { createContext, createSignal, JSXElement, useContext } from "solid-js"
import { openDatabase } from "../Database"

interface Profile {
    key: () => string
    setKey: (key: string) => void
}

const ProfileContext = createContext<Profile>()

interface Props {
    children: JSXElement
}

export const ProfileProvider = (props: Props) => {
    const [key, baseSetKey] = createSignal("")
    const loadDB = async () => {
        const db = await openDatabase()
        const key = await db.get("profile", "key")
        if (key) baseSetKey(key)
        return db
    }
    const dbPromise = loadDB()
    const setKey = async (key: string) => {
        baseSetKey(key)
        const db = await dbPromise
        db.put("profile", key, "key")
    }
    const profile: Profile = { key, setKey }
    return (
        <ProfileContext.Provider value={profile}>
            {props.children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext)

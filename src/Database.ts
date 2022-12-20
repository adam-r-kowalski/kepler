import { openDB, IDBPDatabase, deleteDB } from "idb"

export const openDatabase = async (): Promise<IDBPDatabase> => {
    // deleteDB("kepler")
    const dbPromise = openDB("kepler", 1, {
        upgrade(db) {
            db.createObjectStore("conversations")
            db.createObjectStore("profile")
        },
    })
    return dbPromise
}

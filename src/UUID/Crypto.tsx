import { UUID } from "./UUID"

export const createCryptoUUID = (): UUID => ({
    generate: () => crypto.randomUUID(),
})

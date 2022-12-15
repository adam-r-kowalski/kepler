export type OnMessage = (text: string) => void

export interface LanguageModel {
    send: (text: string) => void
    onreceive: (callback: OnMessage) => void
}

export type OnMessage = (text: string) => void

export interface Backend {
    send: (text: string) => void
    onreceive: (callback: OnMessage) => void
}

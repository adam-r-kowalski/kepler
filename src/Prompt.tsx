import { BsMicFill } from "solid-icons/bs"
import { BsSendFill } from "solid-icons/bs"

import { createSpeechRecognizer } from "./speechRecognizer"

export const Prompt = () => {
    const speechRecognizer = createSpeechRecognizer({ onResult: console.log })
    const color = () => {
        if (speechRecognizer.isListening()) {
            return "green"
        } else if (speechRecognizer.isError()) {
            return "red"
        } else {
            return "black"
        }
    }
    return (
        <div style={{ display: "flex" }}>
            <div style={{ color: color() }}>
                <BsMicFill onclick={speechRecognizer.toggle} />
            </div>
            <textarea value={speechRecognizer.transcript()} />
            <BsSendFill />
        </div>
    )
}

import { BsMicFill } from "solid-icons/bs"
import { BsSendFill } from "solid-icons/bs"

import style from "./Prompt.module.css"
import { createSpeechRecognizer } from "./speechRecognizer"

export const Prompt = () => {
    const speechRecognizer = createSpeechRecognizer({ onResult: console.log })
    const color = () => {
        if (speechRecognizer.isListening()) {
            return "green"
        } else if (speechRecognizer.isActive()) {
            return "#1e90ff"
        } else if (speechRecognizer.isError()) {
            return "red"
        } else {
            return "white"
        }
    }
    return (
        <div class={style.prompt}>
            <div style={{ color: color() }} onclick={speechRecognizer.toggle}>
                <BsMicFill />
            </div>
            <textarea
                class={style.text}
                value={speechRecognizer.transcript()}
                rows={1}
            />
            <BsSendFill />
        </div>
    )
}

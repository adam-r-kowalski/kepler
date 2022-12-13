import { BsMicFill } from "solid-icons/bs"
import { BsSendFill } from "solid-icons/bs"

import style from "./Prompt.module.css"
import { createSpeechRecognizer } from "./speechRecognizer"

interface Props {
    onSend: (text: string) => void
}

export const Prompt = (props: Props) => {
    const speechRecognizer = createSpeechRecognizer(props.onSend)
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
    let textarea: HTMLTextAreaElement | undefined = undefined
    const onSend = () => {
        props.onSend(textarea!.value)
        textarea!.value = ""
        textarea!.rows = 1
    }
    const onkeydown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            if (!event.shiftKey) {
                onSend()
            } else {
                textarea!.rows += 1
            }
        }
    }
    return (
        <div class={style.prompt}>
            <div
                class={style.icon}
                style={{ color: color() }}
                onclick={speechRecognizer.toggle}
            >
                <BsMicFill />
            </div>
            <textarea
                ref={textarea}
                class={style.text}
                value={speechRecognizer.transcript()}
                rows={1}
                onkeydown={onkeydown}
                placeholder={"Message..."}
            />
            <div class={style.icon}>
                <BsSendFill onclick={onSend} />
            </div>
        </div>
    )
}

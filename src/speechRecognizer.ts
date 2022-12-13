import { createSignal } from "solid-js"

interface SpeechRecognizer {
    transcript: () => string
    isListening: () => boolean
    isError: () => boolean
    toggle: () => void
}

interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList
}

interface ErrorEvent {
    error: string
    message: string
}

interface SpeechRecognition {
    new (): SpeechRecognition
    lang: string
    interimResults: boolean
    continuous: boolean
    start: () => void
    stop: () => void
    onaudiostart: () => void
    onaudioend: () => void
    onend: () => void
    onerror: (event: ErrorEvent) => void
    onnomatch: (event: SpeechRecognitionEvent) => void
    onresult: (event: SpeechRecognitionEvent) => void
    onsoundstart: () => void
    onsoundend: () => void
    onspeechstart: () => void
    onspeechend: () => void
    onstart: () => void
}

declare global {
    var SpeechRecognition: SpeechRecognition
    var webkitSpeechRecognition: SpeechRecognition
}

interface Props {
    onResult: (transcript: string) => void
}

export const createSpeechRecognizer = (props: Props): SpeechRecognizer => {
    const [transcript, setTranscript] = createSignal("")
    const [isListening, setIsListening] = createSignal(false)
    const [isError, setIsError] = createSignal(false)
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.interimResults = true
    recognition.continuous = true

    recognition.onend = () => {
        setIsListening(false)
    }

    recognition.onerror = () => {
        setIsError(true)
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
        const index = event.results.length - 1
        const result: SpeechRecognitionResult = event.results[index]
        if (result.isFinal) {
            props.onResult(result[0].transcript)
            setTranscript("")
        } else {
            setTranscript(result[0].transcript)
        }
    }

    recognition.onstart = () => {
        setTimeout(() => setIsListening(true), 1000)
    }

    const toggle = () => {
        if (isListening()) {
            recognition.stop()
        } else {
            recognition.start()
        }
    }

    return {
        transcript,
        isListening,
        isError,
        toggle,
    }
}

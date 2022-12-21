interface Speaker {
    speak: () => void
}

async function setVoice() {
    // have to wait a bit for voices to load
    const SpeechSynthesis = window.speechSynthesis || window.webkitSpeechSynthesis
    await new Promise(resolve => setTimeout(resolve, 10))
    const voices = SpeechSynthesis.getVoices()
    for (let i = 0; i < voices.length; i++) {
        const voice = voices[i]
        if (voice.name == "Google US English") {
            return voice
        }
    }
    return voices[0];
}

export const createSpeaker = async (): Speaker => {
    const SpeechSynthesis = window.speechSynthesis || window.webkitSpeechSynthesis
    const voice = await setVoice()
    const speak = (text: string) => {
        const utterThis = new SpeechSynthesisUtterance(text)
        utterThis.voice = voice
        utterThis.pitch = 1.2
        utterThis.rate = 1.1
        SpeechSynthesis.speak(utterThis)
    }
    return {
        speak
    }
}

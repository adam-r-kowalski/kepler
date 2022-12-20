import {
    Conversation,
    useConversations,
} from "../Conversations/ConversationsContext"

interface Props {
    conversation: Conversation
}

export const Title = (props: Props) => {
    const conversations = useConversations()!
    let ref: HTMLDivElement | undefined = undefined
    const oninput = (e: InputEvent) => {
        if (e.inputType === "insertParagraph") {
            ref!.innerText = ref!.innerText.replace(/(\r\n|\n|\r)/gm, "")
            ref!.blur()
        }
    }
    const onblur = () => {
        if (ref!.innerText === props.conversation.name) return
        conversations.rename(props.conversation.uuid, ref!.innerText)
    }
    return (
        <div contenteditable oninput={oninput} onblur={onblur} ref={ref}>
            {props.conversation.name}
        </div>
    )
}

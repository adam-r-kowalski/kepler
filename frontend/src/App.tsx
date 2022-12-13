import { Messages } from "./Messages"
import { Message } from "./Message"
import { Prompt } from "./Prompt"

export const App = () => {
    return (
        <Messages>
            <Message kind="sent">Hi I'm Adam, who are you?</Message>
            <Message kind="received">
                Hey there! I'm a chatbot. I'm not very smart yet, but I'm
                learning.
            </Message>
            <Prompt />
        </Messages>
    )
}

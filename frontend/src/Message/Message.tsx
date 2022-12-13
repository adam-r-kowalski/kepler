import { JSXElement } from "solid-js"

import style from "./Message.module.css"

interface Props {
    kind: "sent" | "received"
    children: JSXElement
}

export const Message = (props: Props) => {
    return (
        <div
            classList={{
                [style.message]: true,
                [style.sent]: props.kind === "sent",
            }}
        >
            {props.children}
        </div>
    )
}

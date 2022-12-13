import { JSXElement } from "solid-js"

import style from "./Messages.module.css"

interface Props {
    children: JSXElement
}

export const Messages = (props: Props) => {
    return <div class={style.messages}>{props.children}</div>
}

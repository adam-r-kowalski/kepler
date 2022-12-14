import { JSXElement } from "solid-js"

import style from "./Sent.module.css"

interface Props {
    children: JSXElement
}

export const Sent = (props: Props) => {
    return <div class={style.sent}>{props.children}</div>
}

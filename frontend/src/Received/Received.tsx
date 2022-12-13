import { JSXElement } from "solid-js"

import style from "./Received.module.css"

interface Props {
    children: JSXElement
}

export const Received = (props: Props) => {
    return <div class={style.received}>{props.children}</div>
}

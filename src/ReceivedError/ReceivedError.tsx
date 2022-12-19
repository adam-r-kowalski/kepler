import { JSXElement } from "solid-js"

import style from "./ReceivedError.module.css"

interface Props {
    children: JSXElement
}

export const ReceivedError = (props: Props) => {
    return <div class={style.error}>{props.children}</div>
}

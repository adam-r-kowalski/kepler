import { JSXElement } from "solid-js"

import style from "./Toolbar.module.css"

interface Props {
    content: JSXElement
    left?: JSXElement
}

export const Toolbar = (props: Props) => {
    return (
        <div class={style.toolbar}>
            <div class={style.content}>
                {props.left}
                <div>{props.content}</div>
            </div>
        </div>
    )
}

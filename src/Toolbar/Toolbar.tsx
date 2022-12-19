import { JSXElement } from "solid-js"

import style from "./Toolbar.module.css"

interface Props {
    content: JSXElement
    left?: JSXElement
    right?: JSXElement
}

export const Toolbar = (props: Props) => {
    return (
        <div class={style.toolbar}>
            <div class={style.elements}>
                {props.left}
                <div class={style.content}>{props.content}</div>
                {props.right}
            </div>
        </div>
    )
}

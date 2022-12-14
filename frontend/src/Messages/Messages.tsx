import { createEffect, JSXElement } from "solid-js"

import style from "./Messages.module.css"

interface Props {
    scroll: () => boolean
    scrolled: () => void
    children: JSXElement
}

export const Messages = (props: Props) => {
    let ref: HTMLDivElement | undefined = undefined
    createEffect(() => {
        if (!props.scroll()) return
        props.scrolled()
        if (!ref) return
        ref.scrollBy({ top: ref.scrollHeight, behavior: "smooth" })
    })
    return (
        <div class={style.scrollable} ref={ref}>
            <div class={style.messages}>{props.children}</div>
        </div>
    )
}

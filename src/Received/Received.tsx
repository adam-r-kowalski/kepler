import { marked } from "marked"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import python from "highlight.js/lib/languages/python"
import "highlight.js/styles/vs.css"

import style from "./Received.module.css"

hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("python", python)

interface Props {
    children: string
}

export const Received = (props: Props) => {
    marked.setOptions({
        highlight: function (code) {
            return hljs.highlightAuto(code).value
        },
    })
    const markdown = marked(props.children)
    return <div class={style.received} innerHTML={markdown} />
}

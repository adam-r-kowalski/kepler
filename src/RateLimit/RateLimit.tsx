import { JSXElement } from "solid-js"

import style from "./RateLimit.module.css"

interface Props {
  children: JSXElement
}

export const RateLimit = (props: Props) => {
  return <div class={style.rate_limit}>{props.children}</div>
}

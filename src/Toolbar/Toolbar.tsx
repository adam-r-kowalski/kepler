import style from "./Toolbar.module.css"
import { AiOutlineMenu } from "solid-icons/ai"

interface Props {
    title: string
}

export const Toolbar = (props: Props) => {
    return (
        <div class={style.toolbar}>
            <div class={style.content}>
                <div class={style.menu}>
                    <AiOutlineMenu />
                </div>
                <div>{props.title}</div>
            </div>
        </div>
    )
}

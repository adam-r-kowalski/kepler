import { FaSolidCircleUser } from "solid-icons/fa"
import { useNavigate } from "@solidjs/router"

import style from "./Toolbar.module.css"

export const Toolbar = () => {
    const navigate = useNavigate()
    return (
        <div class={style.toolbar}>
            <div class={style.content}>
                <div class={style.title} onclick={() => navigate("/kepler/")}>
                    Conversations
                </div>
                <FaSolidCircleUser
                    class={style.icon}
                    onclick={() => navigate("/kepler/profile")}
                />
            </div>
        </div>
    )
}

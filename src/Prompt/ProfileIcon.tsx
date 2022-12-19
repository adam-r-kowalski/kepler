import { useNavigate } from "@solidjs/router"
import { FaSolidCircleUser } from "solid-icons/fa"

import style from "./Prompt.module.css"

export const ProfileIcon = () => {
    const navigate = useNavigate()
    const onclick = () => navigate("/kepler/profile")
    return (
        <div class={style.user} onclick={onclick}>
            <FaSolidCircleUser />
        </div>
    )
}

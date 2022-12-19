import { useNavigate } from "@solidjs/router"
import { FaSolidChevronLeft } from "solid-icons/fa"

import style from "./Conversation.module.css"

export const Back = () => {
    const navigate = useNavigate()
    const onclick = () => navigate("/kepler/")
    return (
        <div class={style.back} onclick={onclick}>
            <FaSolidChevronLeft />
        </div>
    )
}

/* @refresh reload */
import { render } from "solid-js/web"

import { Kepler } from "./Kepler"

document.documentElement.style.setProperty("--toolbar", "50px")
document.documentElement.style.setProperty("--max-width", "1000px")

document.documentElement.style.setProperty(
    "--height",
    `${window.innerHeight}px`
)

window.addEventListener("resize", () => {
    document.documentElement.style.setProperty(
        "--height",
        `${window.innerHeight}px`
    )
})

render(() => <Kepler />, document.getElementById("root")!)

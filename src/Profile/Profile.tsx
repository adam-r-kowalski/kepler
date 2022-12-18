import { For } from "solid-js"
import { Toolbar } from "../Toolbar"
import style from "./Profile.module.css"
import { engines, useProfile } from "./ProfileContext"

export const Profile = () => {
    const profile = useProfile()!
    return (
        <>
            <Toolbar title="Profile" />
            <div class={style.profile}>
                <h2>Open AI</h2>
                <strong>Secret Key</strong>
                <input
                    class={style.secret_key}
                    placeholder="Write your key here..."
                    value={profile.key()}
                    onchange={(e) =>
                        profile.setKey((e.target as HTMLInputElement).value)
                    }
                />
                <strong>Model</strong>
                <select
                    class={style.model}
                    value={profile.model()}
                    onchange={(e) =>
                        profile.setModel((e.target as HTMLSelectElement).value)
                    }
                >
                    <For each={engines}>
                        {(engine) => <option value={engine}>{engine}</option>}
                    </For>
                </select>
                <strong>Temperature {profile.temperature()}</strong>
                <input
                    class={style.temperature}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={profile.temperature()}
                    oninput={(e) =>
                        profile.setTemperature(
                            (e.target as HTMLInputElement).valueAsNumber
                        )
                    }
                />
            </div>
        </>
    )
}

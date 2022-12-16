import { useBackend } from "../Backend/Backend"
import style from "./Profile.module.css"

export const Profile = () => {
    const backend = useBackend()!
    return (
        <div class={style.profile}>
            <h1>Profile</h1>
            <div class={style.api_key}>
                <strong>Open AI Secret Key</strong>
                <input
                    placeholder="Write your key here..."
                    value={backend.key.current()}
                    onchange={(e) =>
                        backend.key.set((e.target as HTMLInputElement).value)
                    }
                />
            </div>
        </div>
    )
}

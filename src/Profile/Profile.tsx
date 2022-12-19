import { ProfileIcon } from "../Prompt"
import { Toolbar } from "../Toolbar"
import style from "./Profile.module.css"
import { useProfile } from "./ProfileContext"
import { Back } from "../Conversation/Back"

export const Profile = () => {
    const profile = useProfile()!
    return (
        <>
            <Toolbar
                content="Profile"
                left={<Back />}
                right={<ProfileIcon />}
            />
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
            </div>
        </>
    )
}

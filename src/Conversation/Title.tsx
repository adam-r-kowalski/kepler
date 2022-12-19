interface Props {
    name: string
}

export const Title = (props: Props) => {
    let ref: HTMLDivElement | undefined = undefined
    const oninput = (e: InputEvent) => {
        if (e.inputType === "insertParagraph") {
            ref!.innerText = ref!.innerText.replace(/(\r\n|\n|\r)/gm, "")
            ref!.blur()
        }
    }
    const onblur = () => {
        if (ref!.innerText === props.name) return
        console.log(ref!.innerText)
    }
    return (
        <div contenteditable oninput={oninput} onblur={onblur} ref={ref}>
            {props.name}
        </div>
    )
}

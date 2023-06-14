import { FSComponent, DisplayComponent, VNode, Fragment, ComponentProps, NodeReference } from "msfssdk";

interface InputBarProps extends ComponentProps {
    class?: string;
    id?: string;
    transformInput?: (input: string) => string;
    onInput?: (input: string, ref: NodeReference<any>) => void;
    requireInput?: boolean
}
export interface InputBar {
    ref: NodeReference<any>
}
export class InputBar extends DisplayComponent<InputBarProps> {
    constructor(props: InputBarProps) {
        super(props)

        this.ref = FSComponent.createRef<any>();
    }

    onAfterRender(node: VNode): void {
        this.ref.instance.addEventListener("input", () => {
            let input = this.ref.instance._valueStr;
            if (input !== undefined) {
                if (this.props.transformInput) {
                    input = this.props.transformInput(input)
                    this.ref.instance.setValue(input)
                }
                if (this.props.onInput) {
                    this.props.onInput(input, this.ref)
                }
                if (this.props.requireInput) {
                    if (input == "") {
                        this.setInputError()
                    } else {
                        this.setInputError(true)
                    }
                }
            }
        })

        if (this.props.requireInput) {
            this.setInputError()
        }
    }

    setInputError(remove?: boolean) {
        if (this.ref.instance.classList.contains("error") !== true && remove !== true) {
            this.ref.instance.classList.add("error")
        } else if (this.ref.instance.classList.contains("error") === true && remove === true) {
            this.ref.instance.classList.remove("error")
        }
    }

    public getInputBar() {
        return this.ref
    }

    public render(): VNode {
        return (
            <ui-input ref={this.ref} class={this.props.class} id={this.props.id} type="text" no-tooltip no-key-navigation not-pad-interactive idevent="0" />
        );
    }
}

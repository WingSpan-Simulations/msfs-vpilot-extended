import {
    ComponentProps, DisplayComponent, Fragment, FSComponent, NodeReference, VNode
} from '@microsoft/msfs-sdk';

interface InputBarProps extends ComponentProps {
    class?: string;
    id?: string;
    transformInput?: (input: string) => string;
    onInput?: (input: string, ref: NodeReference<any>) => void;
    onEnterKey?: () => void;
    requireInput?: boolean
}

const ENTER_KEYCODE = 13

export class InputBar extends DisplayComponent<InputBarProps> {
    private readonly ref = FSComponent.createRef<any>();

    public onAfterRender(node: VNode): void {
        this.ref.instance.addEventListener("input", () => this.onInputSent())
        this.ref.instance.addEventListener("keyup", (event: KeyboardEvent) => this.onKeyDown(event))

        if (this.props.requireInput) {
            this.setInputError()
        }
    }

    private setInputError(remove?: boolean) {
        if (this.ref.instance.classList.contains("error") !== true && remove !== true) {
            this.ref.instance.classList.add("error")
        } else if (this.ref.instance.classList.contains("error") === true && remove === true) {
            this.ref.instance.classList.remove("error")
        }
    }

    private onKeyDown(event: KeyboardEvent): void {
        // My keyboard is returning the enter key as being 0xFFFF for whatever reason
        if ((event.keyCode == ENTER_KEYCODE || event.keyCode == 0xFFFFFFFF) && this.props.onEnterKey) {
            this.props.onEnterKey()
        }
    }

    private onInputSent() {
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
    }

    public setInputText(input: string) {
        this.ref.instance.setValue(input)
        this.onInputSent()
    }

    public getInputBar(): NodeReference<HTMLElement> {
        return this.ref
    }

    public render(): VNode {
        return (
            <ui-input ref={this.ref} class={this.props.class} id={this.props.id} type="text" no-tooltip no-key-navigation not-pad-interactive idevent="0" />
        );
    }
}

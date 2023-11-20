import {
    ComponentProps, DisplayComponent, Fragment, FSComponent, NodeReference, VNode
} from '@microsoft/msfs-sdk';

interface InputBarProps extends ComponentProps {
    class?: string;
    id?: string;
    transformInput?: (input: string) => string;
    onInput?: (input: string, ref: NodeReference<any>) => void;
    requireInput?: boolean
}

export class InputBar extends DisplayComponent<InputBarProps> {
    private readonly ref = FSComponent.createRef<any>();

    public onAfterRender(node: VNode): void {
        this.ref.instance.addEventListener("input", () => this.onInputSent())

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

    public getInputBar() {
        return this.ref
    }

    public render(): VNode {
        return (
            <ui-input ref={this.ref} class={this.props.class} id={this.props.id} type="text" no-tooltip no-key-navigation not-pad-interactive idevent="0" />
        );
    }
}

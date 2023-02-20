import { FSComponent, DisplayComponent, VNode, Fragment, ComponentProps, NodeReference } from "msfssdk";

interface InputBarProps extends ComponentProps {
    class?: string;
    id?: string;
    transformInput?: (input: string) => string;
    onInput?: (input: string, ref: NodeReference<any>) => void;
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
            }
        })
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

import {
    ComponentProps, DisplayComponent, Fragment, FSComponent, NodeReference, VNode
} from '@microsoft/msfs-sdk';

interface InputBoxProps extends ComponentProps {
    class?: string;
    id?: string;
    transformInput?: (input: string) => string;
    onInput?: (input: string, ref: NodeReference<any>) => void;
}
export interface InputBox {
    ref: NodeReference<any>
    uuid: string;
}
export class InputBox extends DisplayComponent<InputBoxProps> {
    constructor(props: InputBoxProps) {
        super(props)

        this.ref = FSComponent.createRef<any>();
        this.uuid = Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    onAfterRender(node: VNode): void {
        this.ref.instance.addEventListener("focus", () => {
            Coherent.trigger('FOCUS_INPUT_FIELD', this.uuid)
        })
        this.ref.instance.addEventListener("blur", () => {
            Coherent.trigger('UNFOCUS_INPUT_FIELD', this.uuid)
        })
        this.ref.instance.addEventListener("unload", () => {
            Coherent.trigger('UNFOCUS_INPUT_FIELD', this.uuid)
        })

        this.ref.instance.addEventListener("input", () => {
            let input = this.ref.instance.value;

            if (input !== undefined) {
                if (this.props.transformInput) {
                    input = this.props.transformInput(input)
                    this.ref.instance.value = input
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
            <textarea rows="3" cols="33" ref={this.ref} class={`default-textarea ${this.props.class}`} id={this.props.id} type="text" no-tooltip no-key-navigation not-pad-interactive idevent="0" />
        );
    }
}

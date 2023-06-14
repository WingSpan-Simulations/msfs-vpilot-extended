import { FSComponent, DisplayComponent, VNode, Fragment, ComponentProps, NodeReference } from "msfssdk";

interface ScrollButtonProps extends ComponentProps {
    class?: string;
    id?: string;
    choices: string[];
    onClick?: (input: string) => void;
}
export interface ScrollButton {
    ref: NodeReference<TemplateElement>;
    switchText?: Element;
    backwardButton?: Element;
}
export class ScrollButton extends DisplayComponent<ScrollButtonProps> {
    constructor(props: ScrollButtonProps) {
        super(props)

        this.ref = FSComponent.createRef<any>();
    }

    onAfterRender(node: VNode): void {
        this.switchText = this.ref.instance.querySelector(".centered-text span") || undefined;

        if (this.switchText !== undefined)
            this.switchText.addEventListener("DOMSubtreeModified", () => {
                let input = this.switchText?.innerHTML || ""
                if (this.props.onClick) {
                    this.props.onClick(input)
                }
            })
    }

    public render(): VNode {
        return (
            <new-list-button style="width: 0px" ref={this.ref} class={this.props.class} id={this.props.class} choices={this.props.choices.join(",")} />);
    }
}

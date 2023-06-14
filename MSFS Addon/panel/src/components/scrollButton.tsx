import { FSComponent, DisplayComponent, VNode, Fragment, ComponentProps, NodeReference } from "msfssdk";

interface ScrollButtonProps extends ComponentProps {
    class?: string;
    id?: string;
    choices: string[];
    onClick?: (input: string) => void;
}
export interface ScrollButton {
    ref: NodeReference<TemplateElement>;
    valueElement?: Element;
}
export class ScrollButton extends DisplayComponent<ScrollButtonProps> {
    constructor(props: ScrollButtonProps) {
        super(props)

        this.ref = FSComponent.createRef<any>();
    }

    onAfterRender(node: VNode): void {
        this.valueElement = this.ref.instance.querySelector(".SearchInput") || undefined;

        if (this.valueElement !== undefined)
            this.valueElement.addEventListener("DOMSubtreeModified", () => {
                console.log("AAAA")
                let input = this.valueElement?.innerHTML || ""
                console.log(input)
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

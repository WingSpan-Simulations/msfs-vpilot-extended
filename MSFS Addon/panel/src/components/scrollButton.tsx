import {
    ComponentProps, DisplayComponent, Fragment, FSComponent, NodeReference, VNode
} from '@microsoft/msfs-sdk';

import { checkSimVarLoaded } from '../Utilites';

interface ScrollButtonProps extends ComponentProps {
    class?: string;
    id?: string;
    choices: string[];
    onClick?: (input: string) => void;
}
export interface ScrollButton {
    ref: NodeReference<any>;
    valueElement?: Element;
}
export class ScrollButton extends DisplayComponent<ScrollButtonProps> {
    constructor(props: ScrollButtonProps) {
        super(props)

        this.ref = FSComponent.createRef<any>();
    }

    onAfterRender(node: VNode): void {
        checkSimVarLoaded.then(() => {
            this.valueElement = this.ref.instance.querySelector(".SearchInput") || undefined;

            if (this.valueElement !== undefined) {
                this.valueElement.addEventListener("DOMSubtreeModified", () => {
                    let input = this.ref.instance.value
                    if (this.props.onClick) {
                        this.props.onClick(input)
                    }
                })
            }
        })
    }

    public setInput(input: number) {
        this.ref.instance.setCurrentValue(input);
    }

    public render(): VNode {
        return (
            <new-list-button style="width: 0px" ref={this.ref} class={this.props.class} id={this.props.class} choices={this.props.choices.join(",")} />);
    }
}

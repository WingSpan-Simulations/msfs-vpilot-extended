import {
    ComponentProps, DisplayComponent, Fragment, FSComponent, NodeReference, VNode
} from '@microsoft/msfs-sdk';

interface TabSelectEvent extends Event {
    NAME: "tab-select"
    tabMenuItem: HTMLElement
}

interface ButtonGroupProps extends ComponentProps {
    onInput?: (input: string) => void;
    buttons: string[]
}

export class ButtonGroup extends DisplayComponent<ButtonGroupProps> {
    private readonly groupRef = FSComponent.createRef<any>();
    private selectedButton = this.props.buttons[0];

    public onAfterRender(node: VNode): void {
        this.props.buttons.forEach((buttonTitle, index) => {
            FSComponent.render(<tabmenu-item tab-id={`Tab${index}`} tabindex={index} id={`TabSwitch${index}`} title={buttonTitle} />, this.groupRef.instance)
        })

        this.groupRef.instance.addEventListener("tab-select", (event: TabSelectEvent) => this.handleInput(event))
    }

    private handleInput(event: TabSelectEvent) {
        this.selectedButton = this.props.buttons[event.tabMenuItem.tabIndex]
        if (this.props.onInput) {
            this.props.onInput(this.selectedButton);
        }
    }

    public getButtonGroup() {
        return this.groupRef
    }

    public render(): VNode {
        return (
            <tab-menu ref={this.groupRef} selectedIndex="0" />
        );
    }
}

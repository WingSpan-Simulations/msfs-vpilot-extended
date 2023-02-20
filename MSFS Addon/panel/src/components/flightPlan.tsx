import { FSComponent, DisplayComponent, VNode, Fragment, ComponentProps, NodeReference } from "msfssdk";

interface FlightPlanProps extends ComponentProps {

}
export interface FlightPlanPage {
    pageRef: NodeReference<HTMLDivElement>
}
export class FlightPlanPage extends DisplayComponent<FlightPlanProps> {
    constructor(props: FlightPlanProps) {
        super(props)

        this.pageRef = FSComponent.createRef<HTMLDivElement>();
    }

    public hide() {
        this.pageRef.instance.classList.add('hidden')
    }

    public show() {
        if (this.pageRef.instance.classList.contains('hidden')) {
            this.pageRef.instance.classList.remove('hidden')
        }
    }

    public render(): VNode {
        return (
            <div class="hidden" ref={this.pageRef}>
                <p>Testing flight plan...</p>
            </div>
        );
    }
}

import {
    ComponentProps, DisplayComponent, FSComponent, NodeReference, Subject, VNode
} from '@microsoft/msfs-sdk';

import { LoadingIcon } from './loadingIcon';

interface AwaitingConnectionProps extends ComponentProps {
    timeToRetry: Subject<number>
}
export interface AwaitingConnection {
    mainRef: NodeReference<HTMLDivElement>
}
export class AwaitingConnection extends DisplayComponent<AwaitingConnectionProps> {
    constructor(props: AwaitingConnectionProps) {
        super(props)

        this.mainRef = FSComponent.createRef<HTMLDivElement>();
    }

    public hide() {
        this.mainRef.instance.classList.add('hidden')
    }

    public show() {
        if (this.mainRef.instance.classList.contains('hidden')) {
            this.mainRef.instance.classList.remove('hidden')
        }
    }

    public render(): VNode {
        return (
            <div class='awaiting-connection' ref={this.mainRef}>
                <div class="awaiting-connection-inner">
                    <LoadingIcon />
                    <p class="pt-3">Awaiting vPilot Connection...</p>
                    <p class="pt-2 text-base font-light">{this.props.timeToRetry.map((time) => {
                        let establishText = `Attempting to re-establish in ${time}s`

                        if (time == 0) {
                            establishText = "Attempting to establish"
                        }
                        return establishText
                    })}</p>
                </div>
            </div>
        );
    }
}
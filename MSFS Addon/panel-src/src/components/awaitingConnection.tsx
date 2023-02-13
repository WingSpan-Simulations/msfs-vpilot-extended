import { FSComponent, DisplayComponent, VNode } from 'msfssdk';

export class AwaitingConnection extends DisplayComponent<any> {
    public render(): VNode {
        console.log("Rendering awaiting connection")
        return (
            <div class='awaiting-connection'>Awaiting Connection...</div>
        );
    }
}
import { FSComponent, DisplayComponent, VNode } from 'msfssdk';
import { LoadingIcon } from './loadingIcon';

export class AwaitingConnection extends DisplayComponent<any> {
    public render(): VNode {
        console.log("Rendering awaiting connection")
        return (
            <div class='awaiting-connection'>
                <div class="awaiting-connection-inner">
                    <LoadingIcon />
                    <p>Awaiting vPilot Connection...</p>
                    <p class="pt-2 text-lg">Retrying in 30s</p>
                </div>
            </div>
        );
    }
}
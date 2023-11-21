import { ComponentProps, DisplayComponent, FSComponent, VNode } from '@microsoft/msfs-sdk';

import { InputBar } from '../../../InGamePanels/components/inputBar';

export class RadioPanel extends DisplayComponent<ComponentProps> {
    private readonly inputBarRef = FSComponent.createRef<InputBar>()

    public onAfterRender(node: VNode): void {
        let inputParent = this.inputBarRef.instance.getInputBar().instance

        const checkParentLoaded: Promise<HTMLDivElement> = new Promise(resolve => {
            const interval = setInterval(() => {
                let inputDiv = inputParent.querySelector(".default-input")
                if (inputDiv !== null) {
                    clearInterval(interval);
                    resolve(inputDiv as HTMLDivElement);
                }
            });
        });

        checkParentLoaded.then((inputDiv) => { inputDiv.style.height = "41px" })
    }

    public render(): VNode | null {
        return (
            <div>
                <link rel="import" href="/templates/uiInput/uiInput.html" />
                <link rel="import" href="/templates/InputBar/InputBar.html" />

                <div class="bg-[var(--backgroundColorContrastedPanel)] p-1 m-2">
                    <div class="bg-[var(--backgroundColorPanel)] flex items-stretch justify-between" id="topbar">
                        <div class="font-bold pl-2 py-1 text-xl">[VPILOT EXTENDER] RADIO</div>
                        <icon-button class="Reduce nodrag condensed-interactive m-1" icon-tooltip="TT:GAME.PANEL_TOOLTIP_MINIMIZE" data-url="/icons/reduce.svg" created="true" data-input-group="ICON-BUTTON" tabindex="1" guid="GUID_b7d51b5d-4def-54cf-f4cb-7060e98eac00" />
                    </div>

                    <div class="pt-2">
                        <p class="pl-2 py-1">MESSAGE 1</p>
                        <p class="pl-2 py-1">MESSAGE 2</p>
                        <p class="pl-2 py-1">MESSAGE 3</p>
                        <p class="pl-2 py-1">MESSAGE 4</p>
                        <p class="pl-2 py-1">MESSAGE 5</p>
                        <p class="pl-2 py-1">MESSAGE 6</p>
                        <p class="pl-2 py-1">MESSAGE 7</p>
                        <p class="pl-2 py-1">MESSAGE 8</p>
                        <p class="pl-2 py-1">MESSAGE 9</p>
                        <p class="pl-2 py-1">MESSAGE 10</p>
                    </div>

                    <div class="grid grid-cols-5 pt-1">
                        <div class="col-span-4">
                            <InputBar ref={this.inputBarRef} class="h-auto" />
                        </div>
                        <div>
                            <new-push-button class="w-auto ml-2 text-center" title="Send" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
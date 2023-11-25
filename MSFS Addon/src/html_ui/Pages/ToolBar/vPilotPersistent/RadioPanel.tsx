import {
    ComponentProps, DisplayComponent, EventBus, FSComponent, Subject, VNode
} from '@microsoft/msfs-sdk';

import { InputBar } from '../../../InGamePanels/components/inputBar';
import { VirtualScroll } from '../../../InGamePanels/components/virtualScroll';
import { BackendEvents, FrontendEvents } from '../../../InGamePanels/vPEBackend';
import { checkSimVarLoaded } from './Utilites';

export interface MessageProps {
    callsign: string;
    currentCallsign?: string
    frequencies: string[];
    broadcast: boolean
    message: string;
}

class RadioMessage extends DisplayComponent<MessageProps> {
    private readonly timeStamp = new Date().toUTCString().slice(17, 25)
    private message = this.props.message

    private determineTextColour() {
        if (this.props.currentCallsign && this.props.message.includes(this.props.currentCallsign)) {
            return `rgb(255, 255, 255)`
        } else if (this.props.broadcast) {
            return `rgb(250, 250, 100)`
        } else {
            return `rgb(200,200,200)`
        }
    }

    public onAfterRender() {
        if (this.props.currentCallsign) {
            this.message = this.message.replace(this.props.currentCallsign, `<strong>${this.props.currentCallsign}</strong>`)
        }
    }

    public render() {
        return (
            <tr>
                <td class="w-[1%] whitespace-nowrap px-2 align-top" style={`color: ${this.determineTextColour()}`}>[<span class="font-bold">{this.props.callsign}</span>]</td>
                <td class="overflow-hidden align-center" style={`color: ${this.determineTextColour()}`}>{this.message}</td>
                <td class="w-[1%] whitespace-nowrap px-2 align-bottom"><span class="text-sm align-bottom"><code class="[color:rgb(210,210,210)]">{this.timeStamp}Z</code></span></td>
            </tr>
        )
    }
}

interface RadioSystemMessageProps {
    frequency: string
}
class RadioSystemMessage extends DisplayComponent<RadioSystemMessageProps> {
    private readonly timeStamp = new Date().toUTCString().slice(17, 25)

    public render() {
        return (
            <tr>
                <td class="w-[1%] whitespace-nowrap px-2 align-top"></td>
                <td class="overflow-hidden align-center text-center py-2" style="color: rgb(30,200,250);">FREQUENCY CHANGED TO <strong>1{this.props.frequency.slice(0, 2)}.{this.props.frequency.slice(2)}</strong></td>
                <td class="w-[1%] whitespace-nowrap px-2 align-bottom"><span class="text-sm align-bottom"><code class="[color:rgb(210,210,210)]">{this.timeStamp}Z</code></span></td>
            </tr >
        )
    }
}

interface RadioPanelProps extends ComponentProps {
    bus: EventBus
}
export class RadioPanel extends DisplayComponent<RadioPanelProps> {
    private readonly publisher = this.props.bus.getPublisher<FrontendEvents>();
    private readonly subscriber = this.props.bus.getSubscriber<BackendEvents>();
    private readonly buttonRef = FSComponent.createRef<HTMLElement>()
    private readonly inputBarRef = FSComponent.createRef<InputBar>()
    private readonly scrollRef = FSComponent.createRef<VirtualScroll>()
    private readonly mainRef = FSComponent.createRef<HTMLDivElement>()
    private readonly messageContainerRef = FSComponent.createRef<HTMLTableElement>()
    private readonly currentCallsign = Subject.create<string | undefined>(undefined);
    private currentFrequency?: string;
    private currentMessage: string = '';
    public readonly radioOpen = Subject.create<boolean>(false)

    private renderMessage(callsign: string, message: string, broadcast: boolean, frequencies: string[] = ["99999"]) {
        if (frequencies[0] != this.currentFrequency) {
            this.currentFrequency = frequencies[0]
            FSComponent.render(<RadioSystemMessage frequency={this.currentFrequency} />, this.messageContainerRef.instance)
        }

        FSComponent.render(<RadioMessage broadcast={broadcast} callsign={callsign} message={message} frequencies={frequencies} currentCallsign={this.currentCallsign.get()} />, this.messageContainerRef.instance)
    }

    public onAfterRender(node: VNode): void {
        let inputParent = this.inputBarRef.instance.getInputBar().instance
        this.buttonRef.instance.addEventListener('click', () => this.sendMessage())

        const checkParentLoaded: Promise<HTMLDivElement> = new Promise(resolve => {
            const interval = setInterval(() => {
                let inputDiv = inputParent.querySelector(".default-input")
                if (inputDiv !== null) {
                    clearInterval(interval);
                    resolve(inputDiv as HTMLDivElement);
                }
            });

            this.subscriber.on('newMessage').handle((message) => this.renderMessage(message.callsign, message.message, message.broadcast, message.frequencies))
            this.subscriber.on('deleteMessage').handle((message) => {
                for (let i = this.messageContainerRef.instance.childNodes.length - 1; i >= 0; i--) {
                    let node = this.messageContainerRef.instance.childNodes[i]
                    let includesMsg = node.textContent?.includes(message)
                    if (includesMsg) {
                        node.remove()
                        return
                    }
                }
            })
            this.subscriber.on('networkCallsign').handle((callsign) => this.currentCallsign.set(callsign));
        });

        checkParentLoaded.then((inputDiv) => { inputDiv.style.height = "41px" })
        this.scrollRef.instance.setViewportHeight(this.mainRef.instance.getBoundingClientRect().height - 49)

        this.radioOpen.sub(open => open ? this.openRadio() : this.closeRadio())

        const observerConfig: MutationObserverInit = { childList: true };
        const mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Child element added, scroll to bottom
                    this.scrollRef.instance.scrollToBottom();
                }
            })
        })

        mutationObserver.observe(this.messageContainerRef.instance, observerConfig);
    }

    private onTextbarInput(input: string) {
        this.currentMessage = input
    }

    private sendMessage() {
        if (this.currentCallsign.get() && this.currentMessage && this.currentMessage.length > 0) {
            this.publisher.pub('sendMessage', this.currentMessage)
        }
        this.currentMessage = ''
        this.inputBarRef.instance.setInputText('')
    }

    private openRadio() {
        this.mainRef.instance.style.transform = `translateY(0px)`
        this.mainRef.instance.style.maxHeight = '400px'
        setTimeout(() => {
            this.scrollRef.instance.scrollToBottom()
        }, 500);
    }

    private closeRadio() {
        this.inputBarRef.instance.unFocus()
        this.mainRef.instance.style.maxHeight = '52px'
        this.mainRef.instance.style.transform = `translateY(-350px)`
    }

    public render(): VNode | null {
        return (
            <div>
                <link rel="import" href="/templates/uiInput/uiInput.html" />
                <link rel="import" href="/templates/InputBar/InputBar.html" />

                <div ref={this.mainRef} class="bg-[var(--backgroundColorContrastedPanel)] p-1 m-2 overflow-hidden" style="transform: translateY(-350px); max-height: 350px; transition: 0.5s ease-in-out;">
                    <div class="bg-[var(--backgroundColorPanel)] flex items-stretch justify-between" id="topbar">
                        <div class="font-bold pl-2 py-1 text-xl">[VPILOT EXTENDER] RADIO</div>
                        <icon-button class="Reduce nodrag condensed-interactive m-1" icon-tooltip="TT:GAME.PANEL_TOOLTIP_MINIMIZE" data-url="/icons/reduce.svg" created="true" data-input-group="ICON-BUTTON" tabindex="1" guid="GUID_b7d51b5d-4def-54cf-f4cb-7060e98eac00" />
                    </div>

                    <div class="pt-2 pr-[-0.5rem] h-[224px] overflow-hidden">
                        <VirtualScroll ref={this.scrollRef}>
                            <table class="w-full min-w-full [word-break:break-all]" ref={this.messageContainerRef} />
                        </VirtualScroll>
                    </div>

                    <div class="grid grid-cols-5 pt-1">
                        <div class="col-span-4">
                            <InputBar onInput={this.onTextbarInput.bind(this)} onEnterKey={this.sendMessage.bind(this)} ref={this.inputBarRef} class="h-auto" />
                        </div>
                        <div>
                            <new-push-button ref={this.buttonRef} class="w-auto ml-2 text-center" title="Send" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
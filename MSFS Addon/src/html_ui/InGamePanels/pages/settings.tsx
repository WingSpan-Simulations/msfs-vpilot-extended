import {
    ComponentProps, DisplayComponent, EventBus, FSComponent, NodeReference, Subject, VNode
} from '@microsoft/msfs-sdk';

import { InputBar } from '../components/inputBar';
import { LoadingIcon } from '../components/loadingIcon';
import { GeneralSaveManager } from '../SettingSaveManager';
import { BackendEvents, FrontendEvents } from '../vPEBackend';

interface SettingsProps extends ComponentProps {
    bus: EventBus
}

function keyCodeToString(keyCode: number) {
    // Handle special keys
    switch (keyCode) {
        case 8:
            return "Backspace";
        case 9:
            return "Tab";
        case 13:
            return "Enter";
        case 16:
            return "Shift";
        case 17:
            return "Ctrl";
        case 18:
            return "Alt";
        case 19:
            return "Pause/Break";
        case 20:
            return "Caps Lock";
        case 27:
            return "Esc";
        case 32:
            return "Space";
        case 33:
            return "Page Up";
        case 34:
            return "Page Down";
        case 35:
            return "End";
        case 36:
            return "Home";
        case 37:
            return "Left Arrow";
        case 38:
            return "Up Arrow";
        case 39:
            return "Right Arrow";
        case 40:
            return "Down Arrow";
        case 45:
            return "Insert";
        case 46:
            return "Delete";
        case 91:
            return "Left Window Key";
        case 92:
            return "Right Window Key";
        case 93:
            return "Select Key";
        case 96:
            return "Numpad 0";
        case 97:
            return "Numpad 1";
        case 98:
            return "Numpad 2";
        case 99:
            return "Numpad 3";
        case 100:
            return "Numpad 4";
        case 101:
            return "Numpad 5";
        case 102:
            return "Numpad 6";
        case 103:
            return "Numpad 7";
        case 104:
            return "Numpad 8";
        case 105:
            return "Numpad 9";
        case 106:
            return "Numpad *";
        case 107:
            return "Numpad +";
        case 109:
            return "Numpad -";
        case 110:
            return "Numpad .";
        case 111:
            return "Numpad /";
        case 112:
            return "F1";
        case 113:
            return "F2";
        case 114:
            return "F3";
        case 115:
            return "F4";
        case 116:
            return "F5";
        case 117:
            return "F6";
        case 118:
            return "F7";
        case 119:
            return "F8";
        case 120:
            return "F9";
        case 121:
            return "F10";
        case 122:
            return "F11";
        case 123:
            return "F12";
        case 144:
            return "Num Lock";
        case 145:
            return "Scroll Lock";
        case 188:
            return ",";
        case 190:
            return ".";
        case 191:
            return "/";
        case 192:
            return "`";
        case 219:
            return "[";
        case 220:
            return "\\";
        case 221:
            return "]";
        case 222:
            return "'";
        case 223:
            return "`"
        default:
            // Convert the key code to a string for printable characters
            return String.fromCharCode(keyCode);
    }
}

export class Settings extends DisplayComponent<SettingsProps> {
    private readonly frontendPublisher = this.props.bus.getPublisher<FrontendEvents>();
    private readonly generalSettings = new GeneralSaveManager(this.props.bus)
    private readonly pageRef = FSComponent.createRef<HTMLDivElement>();
    private readonly buttonRef = FSComponent.createRef<HTMLButtonElement>()
    private readonly buttonText = Subject.create("Click to select key")
    private selectedKey?: number
    private isButtonHighlighted = true;

    constructor(props: SettingsProps) {
        super(props)
    }

    public hide() {
        this.pageRef.instance.classList.add('hidden')
    }

    public show() {
        if (this.pageRef.instance.classList.contains('hidden')) {
            this.pageRef.instance.classList.remove('hidden')
        }
    }

    private setButtonProperties(highlighted: boolean) {
        this.isButtonHighlighted = highlighted
        this.buttonRef.instance.style.backgroundColor = this.isButtonHighlighted ? `rgb(170, 170, 170)` : ''

        let buttonText = this.isButtonHighlighted ? 'Select input'
            : this.selectedKey ? keyCodeToString(this.selectedKey)
                : 'Click to select key'
        this.buttonText.set(buttonText)
    }

    private setKeyFromSettings() {
        this.selectedKey = this.generalSettings.getSetting('radioKey').get()

        if (this.selectedKey < 0) {
            this.selectedKey = undefined
        } else {
            this.frontendPublisher.pub('setRadioKey', this.selectedKey, true)
        }

        this.setButtonProperties(false)
    }

    public onAfterRender(node: VNode): void {
        this.buttonRef.instance.addEventListener('mousedown', () => {
            this.setButtonProperties(!this.isButtonHighlighted)
        })

        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (this.isButtonHighlighted) {
                this.selectedKey = event.keyCode
                this.setButtonProperties(false)
                this.frontendPublisher.pub('setRadioKey', event.keyCode, true)
                this.generalSettings.getSetting('radioKey').set(event.keyCode)
            }
        })

        this.setKeyFromSettings()
    }

    public render(): VNode {
        return (
            <div class="hidden pb-2" ref={this.pageRef}>
                <div class="w-100 h-auto px-2 py-1 rounded-md mx-4 mt-1 mb-3" style="background-color: rgba(245, 188, 11, 0.7)">
                    <span class="text-base font-bold">Warning:</span>
                    <div class="pl-2 flex flex-col">
                        <span class="text-base">Ensure that the key chosen does not conflict with any existing controls</span>
                    </div>
                </div>
                <p class="font-semibold px-1">Radio View Toggle</p>
                <div class="pt-2 pl-1 pr-2">
                    <button ref={this.buttonRef} class="default-input w-[100%] h-[40px] outline hover:outline-gray-100 hover:outline-4" ><strong class="pl-2">{this.buttonText}</strong></button>
                </div>
            </div >
        );
    }
}
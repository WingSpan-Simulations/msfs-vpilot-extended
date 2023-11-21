import {
    ClockEvents, ComponentProps, ConsumerSubject, DisplayComponent, EventBus, FSComponent, GeoPoint,
    GNSSEvents, NodeReference, Subject, VNode
} from '@microsoft/msfs-sdk';

import { BackendEvents, Controller } from '../vPEBackend';

enum ATCTower {
    Centre,
    ApproachDeparture,
    Tower,
    Ground,
    Delivery,
    ATIS,
    Other
}

interface OnlineATCProps extends ComponentProps {
    bus: EventBus
}
export class OnlineATC extends DisplayComponent<OnlineATCProps> {
    private readonly subscriber = this.props.bus.getSubscriber<BackendEvents>();
    private readonly gnssEvents = this.props.bus.getSubscriber<GNSSEvents>()
    private readonly mainRef = FSComponent.createRef<HTMLDivElement>();
    private readonly centreRef = FSComponent.createRef<HTMLElement>();
    private readonly towerRef = FSComponent.createRef<HTMLElement>();
    private readonly approachDepartureRef = FSComponent.createRef<HTMLElement>();
    private readonly groundRef = FSComponent.createRef<HTMLElement>();
    private readonly deliveryRef = FSComponent.createRef<HTMLElement>();
    private readonly atisRef = FSComponent.createRef<HTMLElement>();
    private readonly otherRef = FSComponent.createRef<HTMLElement>();
    private readonly positionSubject = ConsumerSubject.create<LatLongAlt>(this.gnssEvents.on('gps-position').atFrequency(0.5), new LatLongAlt())
    private readonly controllers = new Map<string, Controller>([])
    private readonly controllerRefs = new Map<string, NodeReference<HTMLElement>>([])

    private getParentRefFromType(type: ATCTower): NodeReference<any> {
        let refPair = {
            [ATCTower.Centre]: this.centreRef,
            [ATCTower.Tower]: this.towerRef,
            [ATCTower.ApproachDeparture]: this.approachDepartureRef,
            [ATCTower.Ground]: this.groundRef,
            [ATCTower.Delivery]: this.deliveryRef,
            [ATCTower.ATIS]: this.atisRef,
            [ATCTower.Other]: this.otherRef,
        }

        return refPair[type]
    }

    private getTowerTypeFromName(name: string): ATCTower {
        if (name.includes("CTR") || name.includes("FSS")) {
            return ATCTower.Centre
        } else if (name.includes("APP") || name.includes("DEP")) {
            return ATCTower.ApproachDeparture
        } else if (name.includes("GND")) {
            return ATCTower.Ground
        } else if (name.includes("TWR")) {
            return ATCTower.Tower
        } else if (name.includes("DEL")) {
            return ATCTower.Delivery
        } else if (name.includes("ATIS")) {
            return ATCTower.ATIS
        } else {
            return ATCTower.Other
        }
    }

    public hide() {
        this.mainRef.instance.classList.add('hidden')
    }

    public show() {
        if (this.mainRef.instance.classList.contains('hidden')) {
            this.mainRef.instance.classList.remove('hidden')
        }
    }

    private reorderControllers() {
        let positionLatLonAlt = this.positionSubject.get()
        let position = new GeoPoint(positionLatLonAlt.lat, positionLatLonAlt.long)

        Array.from(this.controllers.values()).sort((controllerA, controllerB) => {
            let distanceA = position.distance(controllerA.Latitude, controllerA.Longitude)
            let distanceB = position.distance(controllerB.Latitude, controllerB.Longitude)
            return distanceA - distanceB
        }).sort((controllerA, controllerB) => this.getTowerTypeFromName(controllerA.Callsign) - this.getTowerTypeFromName(controllerB.Callsign))
            .forEach((controller, index) => {
                let ref = this.controllerRefs.get(controller.Callsign)
                if (ref) {
                    ref.instance.style.order = index.toString()
                }

            })
    }

    public onAfterRender(node: VNode): void {
        this.subscriber.on('controllerChange').handle((controller) => {
            this.controllers.set(controller.Callsign, controller)
            this.controllerRefs.get(controller.Callsign)?.instance.remove()

            let controllerRef = FSComponent.createRef<HTMLDivElement>();
            FSComponent.render(<div ref={controllerRef} class="pb-2 pt-2 border-gray-500 border-b-2 grid grid-cols-2">
                <p class="pl-2"><strong>{controller.Callsign}</strong></p>
                <p class="text-right pr-1"><code>1{(controller.Frequency / 1000).toFixed(3)}</code></p>
            </div>, this.getParentRefFromType(this.getTowerTypeFromName(controller.Callsign)).instance)

            this.controllerRefs.set(controller.Callsign, controllerRef)
            this.reorderControllers()
        })
        this.subscriber.on('controllerDelete').handle((callsign) => {
            this.controllers.delete(callsign)
            this.controllerRefs.get(callsign)?.instance.remove()
            this.controllerRefs.delete(callsign)
        })

        this.positionSubject.sub(() => this.reorderControllers())
    }

    public render(): VNode {
        return (
            <div class="hidden online-atc" ref={this.mainRef}>
                <div class="w-100 pl-1 pr-1 space-y-2">
                    <options-list-content class="Content" title="CENTRE" is-open>
                        <div class="optionsListContentItems" ref={this.centreRef} />
                    </options-list-content>

                    <options-list-content class="Content" title="TOWER" is-open>
                        <div class="optionsListContentItems" ref={this.towerRef} />
                    </options-list-content>

                    <options-list-content class="Content" title="APPROACH AND DEPARTURE" is-open>
                        <div class="optionsListContentItems" ref={this.approachDepartureRef} />
                    </options-list-content>

                    <options-list-content class="Content" title="GROUND" is-open>
                        <div class="optionsListContentItems" ref={this.groundRef} />
                    </options-list-content>

                    <options-list-content class="Content" title="DELIVERY" is-open>
                        <div class="optionsListContentItems" ref={this.deliveryRef} />
                    </options-list-content>

                    <options-list-content class="Content" title="ATIS" is-open>
                        <div class="optionsListContentItems" ref={this.atisRef} />
                    </options-list-content>

                    <options-list-content class="Content" title="OTHER" is-open>
                        <div class="optionsListContentItems" ref={this.otherRef} />
                    </options-list-content>
                </div>
            </div>
        );
    }
}
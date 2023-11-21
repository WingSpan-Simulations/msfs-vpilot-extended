import {
    DefaultUserSettingManager, EventBus, UserSettingRecord, UserSettingSaveManager
} from '@microsoft/msfs-sdk';

export interface AircraftSettings extends UserSettingRecord {
    /** The last callsign used to connect */
    'callsign': string;
    /** The last selcal used to connect */
    'selcal': string;
}

export interface FlightPlanSettings extends UserSettingRecord {
    /** Voice */
    'voice': 'send + receive' | 'receive only' | 'text only';
    /** Departure Airport */
    'departureAirport': string;
    /** Arrival Airport */
    'arrivalAirport': string;
    /** Alternate Airport */
    'alternateAirport': string;
    /** Departure Time */
    'departureTime': number;
    /** Equipment Suffix */
    'equipmentSuffix': string;
    /** Hours Enroute */
    'hoursEnroute': number;
    /** Minutes Enroute */
    'minsEnroute': number;
    /** Hours Fuel */
    'hoursFuel': number;
    /** Minutes Fuel */
    'minsFuel': number;
    /** Cruise Speed */
    'cruiseSpeed': number;
    /** Cruise Altitude */
    'cruiseAltitude': number;
    /** Route */
    'route': string;
    /** Remarks */
    'remarks': string;
    /** Is VFR? */
    'isVFR': boolean;
}

export class AircraftSaveManager extends DefaultUserSettingManager<AircraftSettings> {
    constructor(bus: EventBus) {
        super(bus, [
            { name: 'callsign', defaultValue: '' },
            { name: 'selcal', defaultValue: '' }
        ])
    }
}

export class FlightPlanSaveManager extends DefaultUserSettingManager<FlightPlanSettings> {
    constructor(bus: EventBus) {
        super(bus, [
            { name: 'isVFR', defaultValue: false },
            { name: 'voice', defaultValue: 'send + receive' },
            { name: 'departureAirport', defaultValue: '' },
            { name: 'arrivalAirport', defaultValue: '' },
            { name: 'alternateAirport', defaultValue: '' },
            { name: 'departureTime', defaultValue: 0 },
            { name: 'equipmentSuffix', defaultValue: 'L' },
            { name: 'hoursEnroute', defaultValue: 0 },
            { name: 'minsEnroute', defaultValue: 0 },
            { name: 'hoursFuel', defaultValue: 0 },
            { name: 'minsFuel', defaultValue: 0 },
            { name: 'cruiseSpeed', defaultValue: 0 },
            { name: 'cruiseAltitude', defaultValue: 0 },
            { name: 'route', defaultValue: '' },
            { name: 'remarks', defaultValue: '' },
        ])
    }
}

export class vPESettingSaveManager extends UserSettingSaveManager {
    constructor(bus: EventBus) {
        const settings = [
            ...new AircraftSaveManager(bus).getAllSettings(),
            ...new FlightPlanSaveManager(bus).getAllSettings()
        ]

        super(settings, bus)
    }
}
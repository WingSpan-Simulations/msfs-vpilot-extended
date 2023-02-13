(function () {
    'use strict';

    var APVerticalModes;
    (function (APVerticalModes) {
        APVerticalModes[APVerticalModes["NONE"] = 0] = "NONE";
        APVerticalModes[APVerticalModes["PITCH"] = 1] = "PITCH";
        APVerticalModes[APVerticalModes["VS"] = 2] = "VS";
        APVerticalModes[APVerticalModes["FLC"] = 3] = "FLC";
        APVerticalModes[APVerticalModes["ALT"] = 4] = "ALT";
        APVerticalModes[APVerticalModes["PATH"] = 5] = "PATH";
        APVerticalModes[APVerticalModes["GP"] = 6] = "GP";
        APVerticalModes[APVerticalModes["GS"] = 7] = "GS";
        APVerticalModes[APVerticalModes["CAP"] = 8] = "CAP";
    })(APVerticalModes || (APVerticalModes = {}));
    var APLateralModes;
    (function (APLateralModes) {
        APLateralModes[APLateralModes["NONE"] = 0] = "NONE";
        APLateralModes[APLateralModes["ROLL"] = 1] = "ROLL";
        APLateralModes[APLateralModes["LEVEL"] = 2] = "LEVEL";
        APLateralModes[APLateralModes["GPSS"] = 3] = "GPSS";
        APLateralModes[APLateralModes["HEADING"] = 4] = "HEADING";
        APLateralModes[APLateralModes["VOR"] = 5] = "VOR";
        APLateralModes[APLateralModes["LOC"] = 6] = "LOC";
        APLateralModes[APLateralModes["BC"] = 7] = "BC";
        APLateralModes[APLateralModes["NAV"] = 8] = "NAV";
    })(APLateralModes || (APLateralModes = {}));
    var APAltitudeModes;
    (function (APAltitudeModes) {
        APAltitudeModes[APAltitudeModes["NONE"] = 0] = "NONE";
        APAltitudeModes[APAltitudeModes["ALTS"] = 1] = "ALTS";
        APAltitudeModes[APAltitudeModes["ALTV"] = 2] = "ALTV";
    })(APAltitudeModes || (APAltitudeModes = {}));

    var APStates;
    (function (APStates) {
        APStates[APStates["None"] = 0] = "None";
        APStates[APStates["APActive"] = 1] = "APActive";
        APStates[APStates["YawDamper"] = 2] = "YawDamper";
        APStates[APStates["Heading"] = 4] = "Heading";
        APStates[APStates["Nav"] = 8] = "Nav";
        APStates[APStates["NavArmed"] = 16] = "NavArmed";
        APStates[APStates["Approach"] = 32] = "Approach";
        APStates[APStates["ApproachArmed"] = 64] = "ApproachArmed";
        APStates[APStates["Backcourse"] = 128] = "Backcourse";
        APStates[APStates["BackcourseArmed"] = 256] = "BackcourseArmed";
        APStates[APStates["Alt"] = 512] = "Alt";
        APStates[APStates["AltS"] = 1024] = "AltS";
        APStates[APStates["AltV"] = 2048] = "AltV";
        APStates[APStates["VS"] = 4096] = "VS";
        APStates[APStates["FLC"] = 8192] = "FLC";
        APStates[APStates["GP"] = 16384] = "GP";
        APStates[APStates["GPArmed"] = 32768] = "GPArmed";
        APStates[APStates["GS"] = 65536] = "GS";
        APStates[APStates["GSArmed"] = 131072] = "GSArmed";
        APStates[APStates["Path"] = 262144] = "Path";
        APStates[APStates["PathArmed"] = 524288] = "PathArmed";
        APStates[APStates["PathInvalid"] = 1048576] = "PathInvalid";
        APStates[APStates["Pitch"] = 2097152] = "Pitch";
        APStates[APStates["Roll"] = 4194304] = "Roll";
        APStates[APStates["VNAV"] = 8388608] = "VNAV";
        APStates[APStates["ATSpeed"] = 16777216] = "ATSpeed";
        APStates[APStates["ATMach"] = 33554432] = "ATMach";
        APStates[APStates["ATArmed"] = 67108864] = "ATArmed";
        APStates[APStates["FD"] = 134217728] = "FD";
    })(APStates || (APStates = {}));

    /**
     * Valid type arguments for Set/GetSimVarValue
     */
    var SimVarValueType;
    (function (SimVarValueType) {
        SimVarValueType["Number"] = "number";
        SimVarValueType["Percent"] = "percent";
        SimVarValueType["Degree"] = "degrees";
        SimVarValueType["Knots"] = "knots";
        SimVarValueType["Feet"] = "feet";
        SimVarValueType["Meters"] = "meters";
        SimVarValueType["FPM"] = "feet per minute";
        SimVarValueType["Radians"] = "radians";
        SimVarValueType["InHG"] = "inches of mercury";
        SimVarValueType["MB"] = "Millibars";
        SimVarValueType["Bool"] = "Bool";
        SimVarValueType["Celsius"] = "celsius";
        SimVarValueType["MHz"] = "MHz";
        SimVarValueType["KHz"] = "KHz";
        SimVarValueType["NM"] = "nautical mile";
        SimVarValueType["String"] = "string";
        SimVarValueType["RPM"] = "Rpm";
        SimVarValueType["PPH"] = "Pounds per hour";
        SimVarValueType["GPH"] = "gph";
        SimVarValueType["Farenheit"] = "farenheit";
        SimVarValueType["PSI"] = "psi";
        SimVarValueType["GAL"] = "gallons";
        SimVarValueType["LBS"] = "pounds";
        SimVarValueType["Hours"] = "Hours";
        SimVarValueType["Volts"] = "Volts";
        SimVarValueType["Amps"] = "Amperes";
        SimVarValueType["Seconds"] = "seconds";
        SimVarValueType["Enum"] = "Enum";
        SimVarValueType["LLA"] = "latlonalt";
        SimVarValueType["MetersPerSecond"] = "meters per second";
        SimVarValueType["Mach"] = "mach";
        SimVarValueType["Pounds"] = "pounds";
        SimVarValueType["SlugsPerCubicFoot"] = "slug per cubic foot";
    })(SimVarValueType || (SimVarValueType = {}));

    /**
     * A number with an associated unit. Each NumberUnit is created with a reference unit type,
     * which cannot be changed after instantiation. The reference unit type determines how the
     * value of the NumberUnit is internally represented. Each NumberUnit also maintains an
     * active unit type, which can be dynamically changed at any time.
     */
    class NumberUnit {
        /**
         * Constructor.
         * @param number - the initial numeric value of the new NumberUnit.
         * @param unit - the unit type of the new NumberUnit.
         */
        constructor(number, unit) {
            this._number = number;
            this._unit = unit;
            this.readonly = new NumberUnitReadOnly(this);
        }
        /**
         * Gets this NumberUnit's numeric value.
         * @returns This NumberUnit's numeric value.
         */
        get number() {
            return this._number;
        }
        /**
         * Gets this NumberUnit's unit type.
         * @returns This NumberUnit's unit type.
         */
        get unit() {
            return this._unit;
        }
        /**
         * Converts a value to a numeric value with this NumberUnit's unit type.
         * @param value - the value.
         * @param unit - the unit type of the new value. Defaults to this NumberUnit's unit type. This argument is ignored if
         * value is a NumberUnit.
         * @returns the numeric of the value with this NumberUnit's unit type.
         */
        toNumberOfThisUnit(value, unit) {
            if ((typeof value !== 'number') && this.unit.canConvert(value.unit)) {
                return this.unit.convertFrom(value.number, value.unit);
            }
            if (typeof value === 'number' && (!unit || this.unit.canConvert(unit))) {
                return unit ? this.unit.convertFrom(value, unit) : value;
            }
            return undefined;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        set(arg1, arg2) {
            const converted = this.toNumberOfThisUnit(arg1, arg2);
            if (converted !== undefined) {
                this._number = converted;
                return this;
            }
            throw new Error('Invalid unit conversion attempted.');
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        add(arg1, arg2, arg3) {
            const isArg2NumberUnit = arg2 instanceof NumberUnit;
            const converted = this.toNumberOfThisUnit(arg1, isArg2NumberUnit ? undefined : arg2);
            if (converted !== undefined) {
                let out = isArg2NumberUnit ? arg2 : arg3;
                if (out) {
                    out.set(this.number + converted, this.unit);
                }
                else {
                    out = this;
                    this._number += converted;
                }
                return out;
            }
            throw new Error('Invalid unit conversion attempted.');
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        subtract(arg1, arg2, arg3) {
            const isArg2NumberUnit = arg2 instanceof NumberUnit;
            const converted = this.toNumberOfThisUnit(arg1, isArg2NumberUnit ? undefined : arg2);
            if (converted !== undefined) {
                let out = isArg2NumberUnit ? arg2 : arg3;
                if (out) {
                    out.set(this.number - converted, this.unit);
                }
                else {
                    out = this;
                    this._number -= converted;
                }
                return out;
            }
            throw new Error('Invalid unit conversion attempted.');
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        scale(factor, out) {
            if (out) {
                return out.set(this.number * factor, this.unit);
            }
            else {
                this._number *= factor;
                return this;
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        ratio(value, unit) {
            const converted = this.toNumberOfThisUnit(value, unit);
            if (converted) {
                return this.number / converted;
            }
            throw new Error('Invalid unit conversion attempted.');
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        abs(out) {
            if (out) {
                return out.set(Math.abs(this.number), this.unit);
            }
            else {
                this._number = Math.abs(this._number);
                return this;
            }
        }
        /**
         * Returns the numeric value of this NumberUnit after conversion to a specified unit.
         * @param unit The unit to which to convert.
         * @returns The converted numeric value.
         * @throws Error if this NumberUnit's unit type cannot be converted to the specified unit.
         */
        asUnit(unit) {
            return this.unit.convertTo(this.number, unit);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        compare(value, unit) {
            const converted = this.toNumberOfThisUnit(value, unit);
            if (converted === undefined) {
                throw new Error('Invalid unit conversion attempted.');
            }
            const diff = this.number - converted;
            if (Math.abs(diff) < 1e-14) {
                return 0;
            }
            return Math.sign(diff);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        equals(value, unit) {
            const converted = this.toNumberOfThisUnit(value, unit);
            if (converted === undefined) {
                return false;
            }
            const diff = this.number - converted;
            return Math.abs(diff) < 1e-14;
        }
        /**
         * Checks whether this NumberUnit has a numeric value of NaN.
         * @returns Whether this NumberUnit has a numeric value of NaN.
         */
        isNaN() {
            return isNaN(this.number);
        }
        /**
         * Copies this NumberUnit.
         * @returns A copy of this NumberUnit.
         */
        copy() {
            return new NumberUnit(this.number, this.unit);
        }
    }
    /**
     * A read-only interface for a WT_NumberUnit.
     */
    class NumberUnitReadOnly {
        /**
         * Constructor.
         * @param source - the source of the new read-only NumberUnit.
         */
        constructor(source) {
            this.source = source;
        }
        /**
         * Gets this NumberUnit's numeric value.
         * @returns This NumberUnit's numeric value.
         */
        get number() {
            return this.source.number;
        }
        /**
         * Gets this NumberUnit's unit type.
         * @returns This NumberUnit's unit type.
         */
        get unit() {
            return this.source.unit;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        add(arg1, arg2, arg3) {
            const isArg2NumberUnit = arg2 instanceof NumberUnit;
            const out = (isArg2NumberUnit ? arg2 : arg3);
            if (typeof arg1 === 'number') {
                return this.source.add(arg1, arg2, out);
            }
            else {
                return this.source.add(arg1, out);
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        subtract(arg1, arg2, arg3) {
            const isArg2NumberUnit = arg2 instanceof NumberUnit;
            const out = (isArg2NumberUnit ? arg2 : arg3);
            if (typeof arg1 === 'number') {
                return this.source.subtract(arg1, arg2, out);
            }
            else {
                return this.source.subtract(arg1, out);
            }
        }
        /**
         * Scales this NumberUnit by a unit-less factor and returns the result.
         * @param factor The factor by which to scale.
         * @param out The NumberUnit to which to write the result.
         * @returns The scaled value.
         */
        scale(factor, out) {
            return this.source.scale(factor, out);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        ratio(arg1, arg2) {
            if (typeof arg1 === 'number') {
                return this.source.ratio(arg1, arg2);
            }
            else {
                return this.source.ratio(arg1);
            }
        }
        /**
         * Calculates the absolute value of this NumberUnit and returns the result.
         * @param out The NumberUnit to which to write the result.
         * @returns The absolute value.
         */
        abs(out) {
            return this.source.abs(out);
        }
        /**
         * Returns the numeric value of this NumberUnit after conversion to a specified unit.
         * @param unit The unit to which to convert.
         * @returns The converted numeric value.
         * @throws Error if this NumberUnit's unit type cannot be converted to the specified unit.
         */
        asUnit(unit) {
            return this.source.asUnit(unit);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        compare(arg1, arg2) {
            if (typeof arg1 === 'number') {
                return this.source.compare(arg1, arg2);
            }
            else {
                return this.source.compare(arg1);
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        equals(arg1, arg2) {
            if (typeof arg1 === 'number') {
                return this.source.equals(arg1, arg2);
            }
            else {
                return this.source.equals(arg1);
            }
        }
        /**
         * Checks whether this NumberUnit has a numeric value of NaN.
         * @returns Whether this NumberUnit has a numeric value of NaN.
         */
        isNaN() {
            return this.source.isNaN();
        }
        /**
         * Copies this NumberUnit.
         * @returns A copy of this NumberUnit.
         */
        copy() {
            return this.source.copy();
        }
    }
    /**
     * A unit of measurement.
     */
    class AbstractUnit {
        /**
         * Constructor.
         * @param name The name of this unit.
         */
        constructor(name) {
            this.name = name;
        }
        /** @inheritdoc */
        canConvert(otherUnit) {
            return this.family === otherUnit.family;
        }
        /** @inheritdoc */
        createNumber(value) {
            return new NumberUnit(value, this);
        }
        /** @inheritdoc */
        equals(other) {
            return this.family === other.family && this.name === other.name;
        }
    }
    /**
     * A unit that can be converted to another unit of the same type via a fixed linear transformation.
     */
    class SimpleUnit extends AbstractUnit {
        /**
         * Constructor.
         * @param family The family to which this unit belongs.
         * @param name The name of this unit.
         * @param scaleFactor The relative linear scale of the new unit compared to the standard unit of the same family.
         * @param zeroOffset The zero offset of the new unit compared to the standard unit of the same family.
         */
        constructor(family, name, scaleFactor, zeroOffset = 0) {
            super(name);
            this.family = family;
            this.scaleFactor = scaleFactor;
            this.zeroOffset = zeroOffset;
        }
        /** @inheritdoc */
        canConvert(otherUnit) {
            return otherUnit instanceof SimpleUnit && super.canConvert(otherUnit);
        }
        /** @inheritdoc */
        convertTo(value, toUnit) {
            if (!this.canConvert(toUnit)) {
                throw new Error(`Invalid conversion from ${this.name} to ${toUnit.name}.`);
            }
            return (value + this.zeroOffset) * (this.scaleFactor / toUnit.scaleFactor) - toUnit.zeroOffset;
        }
        /** @inheritdoc */
        convertFrom(value, fromUnit) {
            if (!this.canConvert(fromUnit)) {
                throw new Error(`Invalid conversion from ${fromUnit.name} to ${this.name}.`);
            }
            return (value + fromUnit.zeroOffset) * (fromUnit.scaleFactor / this.scaleFactor) - this.zeroOffset;
        }
    }
    /**
     * A unit of measure composed of the multiplicative combination of multiple elementary units.
     */
    class CompoundUnit extends AbstractUnit {
        /**
         * Constructor.
         * @param family The family to which this unit belongs.
         * @param numerator An array of CompoundableUnits containing all the units in the numerator of the compound unit.
         * @param denominator An array of CompoundableUnits containing all the units in the denominator of the compound unit.
         * @param name The name of this unit. If not defined, one will be automatically generated.
         */
        constructor(family, numerator, denominator, name) {
            // if not specified, build name from component units.
            if (name === undefined) {
                name = '';
                let i = 0;
                while (i < numerator.length - 1) {
                    name += `${numerator[i++].name}-`;
                }
                name += `${numerator[i].name}`;
                if (denominator.length > 0) {
                    name += ' per ';
                    i = 0;
                    while (i < denominator.length - 1) {
                        name += `${denominator[i++].name}-`;
                    }
                    name += `${denominator[i].name}`;
                }
            }
            super(name);
            this.family = family;
            this.numerator = Array.from(numerator);
            this.denominator = Array.from(denominator);
            this.numerator.sort((a, b) => a.family.localeCompare(b.family));
            this.denominator.sort((a, b) => a.family.localeCompare(b.family));
            this.scaleFactor = this.getScaleFactor();
        }
        /**
         * Gets the scale factor for this unit.
         * @returns the scale factor for this unit.
         */
        getScaleFactor() {
            let factor = 1;
            factor = this.numerator.reduce((prev, curr) => prev * curr.scaleFactor, factor);
            factor = this.denominator.reduce((prev, curr) => prev / curr.scaleFactor, factor);
            return factor;
        }
        /** @inheritdoc */
        canConvert(otherUnit) {
            return otherUnit instanceof CompoundUnit && super.canConvert(otherUnit);
        }
        /** @inheritdoc */
        convertTo(value, toUnit) {
            if (!this.canConvert(toUnit)) {
                throw new Error(`Invalid conversion from ${this.name} to ${toUnit.name}.`);
            }
            return value * (this.scaleFactor / toUnit.scaleFactor);
        }
        /** @inheritdoc */
        convertFrom(value, fromUnit) {
            if (!this.canConvert(fromUnit)) {
                throw new Error(`Invalid conversion from ${fromUnit.name} to ${this.name}.`);
            }
            return value * (fromUnit.scaleFactor / this.scaleFactor);
        }
    }
    /**
     * Predefined unit families.
     */
    var UnitFamily;
    (function (UnitFamily) {
        UnitFamily["Distance"] = "distance";
        UnitFamily["Angle"] = "angle";
        UnitFamily["Duration"] = "duration";
        UnitFamily["Weight"] = "weight";
        UnitFamily["Volume"] = "volume";
        UnitFamily["Pressure"] = "pressure";
        UnitFamily["Temperature"] = "temperature";
        UnitFamily["Speed"] = "speed";
        UnitFamily["Acceleration"] = "acceleration";
        UnitFamily["WeightFlux"] = "weight_flux";
        UnitFamily["VolumeFlux"] = "volume_flux";
    })(UnitFamily || (UnitFamily = {}));
    /**
     * Predefined unit types.
     */
    class UnitType {
    }
    UnitType.METER = new SimpleUnit(UnitFamily.Distance, 'meter', 1);
    UnitType.FOOT = new SimpleUnit(UnitFamily.Distance, 'foot', 0.3048);
    UnitType.KILOMETER = new SimpleUnit(UnitFamily.Distance, 'kilometer', 1000);
    /** Statute mile. */
    UnitType.MILE = new SimpleUnit(UnitFamily.Distance, 'mile', 1609.34);
    /** Nautical mile. */
    UnitType.NMILE = new SimpleUnit(UnitFamily.Distance, 'nautical mile', 1852);
    /** Great-arc radian. The average radius of Earth. */
    UnitType.GA_RADIAN = new SimpleUnit(UnitFamily.Distance, 'great arc radian', 6378100);
    UnitType.RADIAN = new SimpleUnit(UnitFamily.Angle, 'radian', 1);
    UnitType.DEGREE = new SimpleUnit(UnitFamily.Angle, 'degree', Math.PI / 180);
    UnitType.ARC_MIN = new SimpleUnit(UnitFamily.Angle, 'minute', Math.PI / 180 / 60);
    UnitType.ARC_SEC = new SimpleUnit(UnitFamily.Angle, 'second', Math.PI / 180 / 3600);
    UnitType.MILLISECOND = new SimpleUnit(UnitFamily.Duration, 'millisecond', 0.001);
    UnitType.SECOND = new SimpleUnit(UnitFamily.Duration, 'second', 1);
    UnitType.MINUTE = new SimpleUnit(UnitFamily.Duration, 'minute', 60);
    UnitType.HOUR = new SimpleUnit(UnitFamily.Duration, 'hour', 3600);
    UnitType.KILOGRAM = new SimpleUnit(UnitFamily.Weight, 'kilogram', 1);
    UnitType.POUND = new SimpleUnit(UnitFamily.Weight, 'pound', 0.453592);
    UnitType.TON = new SimpleUnit(UnitFamily.Weight, 'ton', 907.185);
    UnitType.TONNE = new SimpleUnit(UnitFamily.Weight, 'tonne', 1000);
    /** Weight equivalent of one liter of fuel, using the generic conversion 1 gallon = 6.7 pounds. */
    UnitType.LITER_FUEL = new SimpleUnit(UnitFamily.Weight, 'liter', 0.80283679);
    /** Weight equivalent of one pound of fuel, using the generic conversion 1 gallon = 6.7 pounds. */
    UnitType.GALLON_FUEL = new SimpleUnit(UnitFamily.Weight, 'gallon', 3.0390664);
    UnitType.LITER = new SimpleUnit(UnitFamily.Volume, 'liter', 1);
    UnitType.GALLON = new SimpleUnit(UnitFamily.Volume, 'gallon', 3.78541);
    /** Hectopascal. */
    UnitType.HPA = new SimpleUnit(UnitFamily.Pressure, 'hectopascal', 1);
    /** Atmosphere. */
    UnitType.ATM = new SimpleUnit(UnitFamily.Pressure, 'atmosphere', 1013.25);
    /** Inch of mercury. */
    UnitType.IN_HG = new SimpleUnit(UnitFamily.Pressure, 'inch of mercury', 33.8639);
    /** Millimeter of mercury. */
    UnitType.MM_HG = new SimpleUnit(UnitFamily.Pressure, 'millimeter of mercury', 1.33322);
    UnitType.CELSIUS = new SimpleUnit(UnitFamily.Temperature, '° Celsius', 1, 273.15);
    UnitType.FAHRENHEIT = new SimpleUnit(UnitFamily.Temperature, '° Fahrenheit', 5 / 9, 459.67);
    UnitType.KNOT = new CompoundUnit(UnitFamily.Speed, [UnitType.NMILE], [UnitType.HOUR], 'knot');
    /** Kilometer per hour. */
    UnitType.KPH = new CompoundUnit(UnitFamily.Speed, [UnitType.KILOMETER], [UnitType.HOUR]);
    /** Miles per hour. */
    UnitType.MPH = new CompoundUnit(UnitFamily.Speed, [UnitType.MILE], [UnitType.HOUR]);
    /** Meter per minute. */
    UnitType.MPM = new CompoundUnit(UnitFamily.Speed, [UnitType.METER], [UnitType.MINUTE]);
    /** Meter per second. */
    UnitType.MPS = new CompoundUnit(UnitFamily.Speed, [UnitType.METER], [UnitType.SECOND]);
    /** Foot per minute. */
    UnitType.FPM = new CompoundUnit(UnitFamily.Speed, [UnitType.FOOT], [UnitType.MINUTE]);
    /** Foot per second. */
    UnitType.FPS = new CompoundUnit(UnitFamily.Speed, [UnitType.FOOT], [UnitType.SECOND]);
    /** Meter per minute per second. */
    UnitType.MPM_PER_SEC = new CompoundUnit(UnitFamily.Acceleration, [UnitType.METER], [UnitType.MINUTE, UnitType.SECOND]);
    /** Meter per second per second. */
    UnitType.MPS_PER_SEC = new CompoundUnit(UnitFamily.Acceleration, [UnitType.METER], [UnitType.SECOND, UnitType.SECOND]);
    /** Foot per minute per second. */
    UnitType.FPM_PER_SEC = new CompoundUnit(UnitFamily.Acceleration, [UnitType.FOOT], [UnitType.MINUTE, UnitType.SECOND]);
    /** Foot per second per second. */
    UnitType.FPS_PER_SEC = new CompoundUnit(UnitFamily.Acceleration, [UnitType.FOOT], [UnitType.SECOND, UnitType.SECOND]);
    /** Average gravitational acceleration on Earth at sea level. */
    UnitType.G_ACCEL = new CompoundUnit(UnitFamily.Acceleration, [new SimpleUnit(UnitFamily.Distance, '9.80665 meter', 9.80665)], [UnitType.SECOND, UnitType.SECOND]);
    /** Kilogram per hour. */
    UnitType.KGH = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.KILOGRAM], [UnitType.HOUR]);
    /** Pound per hour. */
    UnitType.PPH = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.POUND], [UnitType.HOUR]);
    /** Weight equivalent of one liter of fuel per hour, using the generic conversion 1 gallon = 6.7 pounds. */
    UnitType.LPH_FUEL = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.LITER_FUEL], [UnitType.HOUR]);
    /** Weight equivalent of one gallon fuel per hour, using the generic conversion 1 gallon = 6.7 pounds. */
    UnitType.GPH_FUEL = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.GALLON_FUEL], [UnitType.HOUR]);

    /**
     * Utility class for manipulating bit flags.
     */
    class BitFlags {
        /**
         * Generates a bit flag with a boolean value of true at a specified index.
         * @param index The index of the flag. Must be between 0 and 32, inclusive.
         * @returns a bit flag.
         * @throws Error if index is out of bounds.
         */
        static createFlag(index) {
            if (index < 0 || index > 32) {
                throw new Error(`Invalid index ${index} for bit flag. Index must be between 0 and 32.`);
            }
            return 1 << index;
        }
        /**
         * Gets the inverse of some bit flags.
         * @param flags The bit flag group containing the flags to invert.
         * @param mask An optional bit mask to use when applying the inverse operation. The operation will only be performed
         * at the indexes where the mask has a value of 1 (true). If a mask is not specified, the operation will be performed
         * at all indexes.
         * @returns the inverse
         */
        static not(flags, mask = ~0) {
            return flags ^ mask;
        }
        /**
         * Gets the union of zero or more bit flags.
         * @param flags A list of bit flags.
         * @returns the union of the bit flags.
         */
        static union(...flags) {
            let result = 0;
            const len = flags.length;
            for (let i = 0; i < len; i++) {
                result |= flags[i];
            }
            return result;
        }
        /**
         * Gets the intersection of zero or more bit flags.
         * @param flags A list of bit flags.
         * @returns the intersection of the bit flags.
         */
        static intersection(...flags) {
            const len = flags.length;
            if (len === 0) {
                return 0;
            }
            let result = flags[0];
            for (let i = 1; i < len; i++) {
                result &= flags[i];
            }
            return result;
        }
        /**
         * Changes a bit flag group by setting values at specific indexes.
         * @param flags The bit flag group to change.
         * @param valuesToSet A bit flag group containing the values to set.
         * @param mask A mask defining the indexes to set. Only indexes at which the mask has a value of `1` (`true`) will
         * be set.
         * @returns The result of changing `flags` using the specified values and indexes.
         */
        static set(flags, valuesToSet, mask) {
            return (flags & ~mask) | (valuesToSet & mask);
        }
        /**
         * Checks if a bit flag group meets at least one condition from a list of conditions.
         * @param flags A bit flag group.
         * @param conditions The conditions to meet, as a bit flag group.
         * @returns whether the bit flag group meets at least one condition.
         */
        static isAny(flags, conditions) {
            return (flags & conditions) !== 0;
        }
        /**
         * Checks if a bit flag group meets all the conditions from a list of conditions.
         * @param flags A bit flag group.
         * @param conditions The conditions to meet, as a bit flag group.
         * @returns whether the bit flag group meets all the conditions.
         */
        static isAll(flags, conditions) {
            return (flags & conditions) === conditions;
        }
        /**
         * Iterates through a bit flag group and executes a callback function once for each flag.
         * @param flags A bit flag group.
         * @param callback A function which will be called once for each flag.
         * @param valueFilter The value on which to filter. If defined, only flags with values equal to the filter will be
         * iterated, otherwise all flags will be iterated regardless of their values.
         * @param startIndex The index of the flag at which to start (inclusive). Defaults to 0.
         * @param endIndex The index of the flag at which to end (exclusive). Defaults to 32.
         */
        static forEach(flags, callback, valueFilter, startIndex, endIndex) {
            startIndex = Utils.Clamp(startIndex !== null && startIndex !== void 0 ? startIndex : (startIndex = 0), 0, 32);
            endIndex = Utils.Clamp(endIndex !== null && endIndex !== void 0 ? endIndex : (endIndex = 32), 0, 32);
            for (let i = startIndex; i < endIndex; i++) {
                const value = (flags & (1 << i)) !== 0;
                if (valueFilter === undefined || valueFilter === value) {
                    callback(value, i, flags);
                }
            }
        }
    }

    /**
     * A {@link Subscription} which executes a handler function every time it receives a notification.
     */
    class HandlerSubscription {
        /**
         * Constructor.
         * @param handler This subscription's handler. The handler will be called each time this subscription receives a
         * notification from its source.
         * @param initialNotifyFunc A function which sends initial notifications to this subscription. If not defined, this
         * subscription will not support initial notifications.
         * @param onDestroy A function which is called when this subscription is destroyed.
         */
        constructor(handler, initialNotifyFunc, onDestroy) {
            this.handler = handler;
            this.initialNotifyFunc = initialNotifyFunc;
            this.onDestroy = onDestroy;
            this._isAlive = true;
            this._isPaused = false;
            this.canInitialNotify = initialNotifyFunc !== undefined;
        }
        /** @inheritdoc */
        get isAlive() {
            return this._isAlive;
        }
        /** @inheritdoc */
        get isPaused() {
            return this._isPaused;
        }
        /**
         * Sends an initial notification to this subscription.
         * @throws Error if this subscription is not alive.
         */
        initialNotify() {
            if (!this._isAlive) {
                throw new Error('HandlerSubscription: cannot notify a dead Subscription.');
            }
            this.initialNotifyFunc && this.initialNotifyFunc(this);
        }
        /** @inheritdoc */
        pause() {
            if (!this._isAlive) {
                throw new Error('Subscription: cannot pause a dead Subscription.');
            }
            this._isPaused = true;
        }
        /** @inheritdoc */
        resume(initialNotify = false) {
            if (!this._isAlive) {
                throw new Error('Subscription: cannot resume a dead Subscription.');
            }
            if (!this._isPaused) {
                return;
            }
            this._isPaused = false;
            if (initialNotify) {
                this.initialNotify();
            }
        }
        /** @inheritdoc */
        destroy() {
            if (!this._isAlive) {
                return;
            }
            this._isAlive = false;
            this.onDestroy && this.onDestroy(this);
        }
    }

    /**
     * A pipe from an input subscribable to an output mutable subscribable. Each notification received by the pipe is used
     * to change the state of the output subscribable.
     */
    class SubscribablePipe extends HandlerSubscription {
        // eslint-disable-next-line jsdoc/require-jsdoc
        constructor(from, to, arg3, arg4) {
            let handler;
            let onDestroy;
            if (typeof arg4 === 'function') {
                handler = (input) => {
                    to.set(arg3(input));
                };
                onDestroy = arg4;
            }
            else {
                handler = (input) => {
                    to.set(input);
                };
                onDestroy = arg3;
            }
            super(handler, (sub) => { sub.handler(from.get()); }, onDestroy);
        }
    }

    /**
     * An abstract implementation of a subscribable which allows adding, removing, and notifying subscribers.
     */
    class AbstractSubscribable {
        constructor() {
            this.isSubscribable = true;
            this.subs = [];
            this.notifyDepth = 0;
            /** A function which sends initial notifications to subscriptions. */
            this.initialNotifyFunc = this.notifySubscription.bind(this);
            /** A function which responds to when a subscription to this subscribable is destroyed. */
            this.onSubDestroyedFunc = this.onSubDestroyed.bind(this);
        }
        /** @inheritdoc */
        sub(handler, initialNotify = false, paused = false) {
            const sub = new HandlerSubscription(handler, this.initialNotifyFunc, this.onSubDestroyedFunc);
            this.subs.push(sub);
            if (paused) {
                sub.pause();
            }
            else if (initialNotify) {
                sub.initialNotify();
            }
            return sub;
        }
        /** @inheritdoc */
        unsub(handler) {
            const toDestroy = this.subs.find(sub => sub.handler === handler);
            toDestroy === null || toDestroy === void 0 ? void 0 : toDestroy.destroy();
        }
        /**
         * Notifies subscriptions that this subscribable's value has changed.
         */
        notify() {
            let needCleanUpSubs = false;
            this.notifyDepth++;
            const subLen = this.subs.length;
            for (let i = 0; i < subLen; i++) {
                try {
                    const sub = this.subs[i];
                    if (sub.isAlive && !sub.isPaused) {
                        this.notifySubscription(sub);
                    }
                    needCleanUpSubs || (needCleanUpSubs = !sub.isAlive);
                }
                catch (error) {
                    console.error(`AbstractSubscribable: error in handler: ${error}`);
                    if (error instanceof Error) {
                        console.error(error.stack);
                    }
                }
            }
            this.notifyDepth--;
            if (needCleanUpSubs && this.notifyDepth === 0) {
                this.subs = this.subs.filter(sub => sub.isAlive);
            }
        }
        /**
         * Notifies a subscription of this subscribable's current state.
         * @param sub The subscription to notify.
         */
        notifySubscription(sub) {
            sub.handler(this.get());
        }
        /**
         * Responds to when a subscription to this subscribable is destroyed.
         * @param sub The destroyed subscription.
         */
        onSubDestroyed(sub) {
            // If we are not in the middle of a notify operation, remove the subscription.
            // Otherwise, do nothing and let the post-notify clean-up code handle it.
            if (this.notifyDepth === 0) {
                this.subs.splice(this.subs.indexOf(sub), 1);
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        map(fn, equalityFunc, mutateFunc, initialVal) {
            return new MappedSubscribableClass(this, fn, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : AbstractSubscribable.DEFAULT_EQUALITY_FUNC, mutateFunc, initialVal);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        pipe(to, arg2, arg3) {
            let sub;
            let paused;
            if (typeof arg2 === 'function') {
                sub = new SubscribablePipe(this, to, arg2, this.onSubDestroyedFunc);
                paused = arg3 !== null && arg3 !== void 0 ? arg3 : false;
            }
            else {
                sub = new SubscribablePipe(this, to, this.onSubDestroyedFunc);
                paused = arg2 !== null && arg2 !== void 0 ? arg2 : false;
            }
            this.subs.push(sub);
            if (paused) {
                sub.pause();
            }
            else {
                sub.initialNotify();
            }
            return sub;
        }
    }
    /**
     * Checks if two values are equal using the strict equality operator.
     * @param a The first value.
     * @param b The second value.
     * @returns whether a and b are equal.
     */
    AbstractSubscribable.DEFAULT_EQUALITY_FUNC = (a, b) => a === b;
    /**
     * An implementation of {@link MappedSubscribable}.
     */
    class MappedSubscribableClass extends AbstractSubscribable {
        /**
         * Constructor.
         * @param input This subscribable's input.
         * @param mapFunc The function which maps this subject's inputs to a value.
         * @param equalityFunc The function which this subject uses to check for equality between values.
         * @param mutateFunc The function which this subject uses to change its value.
         * @param initialVal The initial value of this subject.
         */
        constructor(input, mapFunc, equalityFunc, mutateFunc, initialVal) {
            super();
            this.input = input;
            this.mapFunc = mapFunc;
            this.equalityFunc = equalityFunc;
            this.isSubscribable = true;
            this._isAlive = true;
            this._isPaused = false;
            if (initialVal && mutateFunc) {
                this.value = initialVal;
                mutateFunc(this.value, this.mapFunc(this.input.get()));
                this.mutateFunc = (newVal) => { mutateFunc(this.value, newVal); };
            }
            else {
                this.value = this.mapFunc(this.input.get());
                this.mutateFunc = (newVal) => { this.value = newVal; };
            }
            this.inputSub = this.input.sub(inputValue => {
                this.updateValue(inputValue);
            }, true);
        }
        /** @inheritdoc */
        get isAlive() {
            return this._isAlive;
        }
        /** @inheritdoc */
        get isPaused() {
            return this._isPaused;
        }
        /**
         * Re-maps this subject's value from its input, and notifies subscribers if this results in a change to the mapped
         * value according to this subject's equality function.
         * @param inputValue The input value.
         */
        updateValue(inputValue) {
            const value = this.mapFunc(inputValue, this.value);
            if (!this.equalityFunc(this.value, value)) {
                this.mutateFunc(value);
                this.notify();
            }
        }
        /** @inheritdoc */
        get() {
            return this.value;
        }
        /** @inheritdoc */
        pause() {
            if (!this._isAlive) {
                throw new Error('MappedSubscribable: cannot pause a dead subscribable');
            }
            if (this._isPaused) {
                return;
            }
            this.inputSub.pause();
            this._isPaused = true;
        }
        /** @inheritdoc */
        resume() {
            if (!this._isAlive) {
                throw new Error('MappedSubscribable: cannot resume a dead subscribable');
            }
            if (!this._isPaused) {
                return;
            }
            this._isPaused = false;
            this.inputSub.resume(true);
        }
        /** @inheritdoc */
        destroy() {
            this._isAlive = false;
            this.inputSub.destroy();
        }
    }

    /**
     * 2D vector mathematical operations.
     */
    class Vec2Math {
        // eslint-disable-next-line jsdoc/require-jsdoc
        static create(x, y) {
            const vec = new Float64Array(2);
            if (x !== undefined && y !== undefined) {
                vec[0] = x;
                vec[1] = y;
            }
            return vec;
        }
        /**
         * Gets the polar angle theta of a vector in radians.
         * @param vec - a vector.
         * @returns the polar angle theta of the vector.
         */
        static theta(vec) {
            return Math.atan2(vec[1], vec[0]);
        }
        /**
         * Sets the components of a vector.
         * @param x - the new x-component.
         * @param y - the new y-component.
         * @param vec - the vector to change.
         * @returns the vector after it has been changed.
         */
        static set(x, y, vec) {
            vec[0] = x;
            vec[1] = y;
            return vec;
        }
        /**
         * Sets the polar components of a vector.
         * @param r - the new length (magnitude).
         * @param theta - the new polar angle theta, in radians.
         * @param vec - the vector to change.
         * @returns the vector after it has been changed.
         */
        static setFromPolar(r, theta, vec) {
            vec[0] = r * Math.cos(theta);
            vec[1] = r * Math.sin(theta);
            return vec;
        }
        /**
         * Add one vector to another.
         * @param v1 The first vector.
         * @param v2 The second vector.
         * @param out The vector to write the results to.
         * @returns the vector sum.
         */
        static add(v1, v2, out) {
            out[0] = v1[0] + v2[0];
            out[1] = v1[1] + v2[1];
            return out;
        }
        /**
         * Subtracts one vector from another.
         * @param v1 The first vector.
         * @param v2 The second vector.
         * @param out The vector to write the results to.
         * @returns the vector difference.
         */
        static sub(v1, v2, out) {
            out[0] = v1[0] - v2[0];
            out[1] = v1[1] - v2[1];
            return out;
        }
        /**
         * Gets the dot product of two vectors.
         * @param v1 The first vector.
         * @param v2 The second vector.
         * @returns The dot product of the vectors.
         */
        static dot(v1, v2) {
            return v1[0] * v2[0] + v1[1] * v2[1];
        }
        /**
         * Multiplies a vector by a scalar.
         * @param v1 The vector to multiply.
         * @param scalar The scalar to apply.
         * @param out The vector to write the results to.
         * @returns The scaled vector.
         */
        static multScalar(v1, scalar, out) {
            out[0] = v1[0] * scalar;
            out[1] = v1[1] * scalar;
            return out;
        }
        /**
         * Gets the magnitude of a vector.
         * @param v1 The vector to get the magnitude for.
         * @returns the vector's magnitude.
         */
        static abs(v1) {
            return Math.hypot(v1[0], v1[1]);
        }
        /**
         * Normalizes the vector to a unit vector.
         * @param v1 The vector to normalize.
         * @param out The vector to write the results to.
         * @returns the normalized vector.
         */
        static normalize(v1, out) {
            const mag = Vec2Math.abs(v1);
            out[0] = v1[0] / mag;
            out[1] = v1[1] / mag;
            return out;
        }
        /**
         * Gets the normal of the supplied vector.
         * @param v1 The vector to get the normal for.
         * @param out The vector to write the results to.
         * @param counterClockwise Whether or not to get the counterclockwise normal.
         * @returns the normal vector.
         */
        static normal(v1, out, counterClockwise = false) {
            const x = v1[0];
            const y = v1[1];
            if (!counterClockwise) {
                out[0] = y;
                out[1] = -x;
            }
            else {
                out[0] = -y;
                out[1] = x;
            }
            return out;
        }
        /**
         * Gets the Euclidean distance between two vectors.
         * @param vec1 The first vector.
         * @param vec2 The second vector.
         * @returns the Euclidean distance between the two vectors.
         */
        static distance(vec1, vec2) {
            return Math.hypot(vec2[0] - vec1[0], vec2[1] - vec1[1]);
        }
        /**
         * Checks if two vectors are equal.
         * @param vec1 The first vector.
         * @param vec2 The second vector.
         * @returns Whether the two vectors are equal.
         */
        static equals(vec1, vec2) {
            return vec1[0] === vec2[0] && vec1[1] === vec2[1];
        }
        /**
         * Copies one vector to another.
         * @param from The vector from which to copy.
         * @param to The vector to which to copy.
         * @returns The changed vector.
         */
        static copy(from, to) {
            return Vec2Math.set(from[0], from[1], to);
        }
    }
    /**
     * 3D vector mathematical operations.
     */
    class Vec3Math {
        // eslint-disable-next-line jsdoc/require-jsdoc
        static create(x, y, z) {
            const vec = new Float64Array(3);
            if (x !== undefined && y !== undefined && z !== undefined) {
                vec[0] = x;
                vec[1] = y;
                vec[2] = z;
            }
            return vec;
        }
        /**
         * Gets the spherical angle theta of a vector in radians.
         * @param vec - a vector.
         * @returns the spherical angle theta of the vector.
         */
        static theta(vec) {
            return Math.atan2(Math.hypot(vec[0], vec[1]), vec[2]);
        }
        /**
         * Gets the spherical angle phi of a vector in radians.
         * @param vec - a vector.
         * @returns the spherical angle phi of the vector.
         */
        static phi(vec) {
            return Math.atan2(vec[1], vec[0]);
        }
        /**
         * Sets the components of a vector.
         * @param x - the new x-component.
         * @param y - the new y-component.
         * @param z - the new z-component.
         * @param vec - the vector to change.
         * @returns the vector after it has been changed.
         */
        static set(x, y, z, vec) {
            vec[0] = x;
            vec[1] = y;
            vec[2] = z;
            return vec;
        }
        /**
         * Sets the spherical components of a vector.
         * @param r - the new length (magnitude).
         * @param theta - the new spherical angle theta, in radians.
         * @param phi - the new spherical angle phi, in radians.
         * @param vec - the vector to change.
         * @returns the vector after it has been changed.
         */
        static setFromSpherical(r, theta, phi, vec) {
            const sinTheta = Math.sin(theta);
            vec[0] = sinTheta * Math.cos(phi);
            vec[1] = sinTheta * Math.sin(phi);
            vec[2] = Math.cos(theta);
            return vec;
        }
        /**
         * Add one vector to another.
         * @param v1 The first vector.
         * @param v2 The second vector.
         * @param out The vector to write the results to.
         * @returns the vector sum.
         */
        static add(v1, v2, out) {
            out[0] = v1[0] + v2[0];
            out[1] = v1[1] + v2[1];
            out[2] = v1[2] + v2[2];
            return out;
        }
        /**
         * Subtracts one vector from another.
         * @param v1 The first vector.
         * @param v2 The second vector.
         * @param out The vector to write the results to.
         * @returns the vector difference.
         */
        static sub(v1, v2, out) {
            out[0] = v1[0] - v2[0];
            out[1] = v1[1] - v2[1];
            out[2] = v1[2] - v2[2];
            return out;
        }
        /**
         * Gets the dot product of two vectors.
         * @param v1 The first vector.
         * @param v2 The second vector.
         * @returns The dot product of the vectors.
         */
        static dot(v1, v2) {
            return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
        }
        /**
         * Gets the cross product of two vectors.
         * @param v1 - the first vector.
         * @param v2 - the second vector.
         * @param out - the vector to which to write the result.
         * @returns the cross product.
         */
        static cross(v1, v2, out) {
            const x1 = v1[0];
            const y1 = v1[1];
            const z1 = v1[2];
            const x2 = v2[0];
            const y2 = v2[1];
            const z2 = v2[2];
            out[0] = y1 * z2 - z1 * y2;
            out[1] = z1 * x2 - x1 * z2;
            out[2] = x1 * y2 - y1 * x2;
            return out;
        }
        /**
         * Multiplies a vector by a scalar.
         * @param v1 The vector to multiply.
         * @param scalar The scalar to apply.
         * @param out The vector to write the results to.
         * @returns The scaled vector.
         */
        static multScalar(v1, scalar, out) {
            out[0] = v1[0] * scalar;
            out[1] = v1[1] * scalar;
            out[2] = v1[2] * scalar;
            return out;
        }
        /**
         * Gets the magnitude of a vector.
         * @param v1 The vector to get the magnitude for.
         * @returns the vector's magnitude.
         */
        static abs(v1) {
            return Math.hypot(v1[0], v1[1], v1[2]);
        }
        /**
         * Normalizes the vector to a unit vector.
         * @param v1 The vector to normalize.
         * @param out The vector to write the results to.
         * @returns the normalized vector.
         */
        static normalize(v1, out) {
            const mag = Vec3Math.abs(v1);
            out[0] = v1[0] / mag;
            out[1] = v1[1] / mag;
            out[2] = v1[2] / mag;
            return out;
        }
        /**
         * Gets the Euclidean distance between two vectors.
         * @param vec1 The first vector.
         * @param vec2 The second vector.
         * @returns the Euclidean distance between the two vectors.
         */
        static distance(vec1, vec2) {
            return Math.hypot(vec2[0] - vec1[0], vec2[1] - vec1[0], vec2[2] - vec1[2]);
        }
        /**
         * Checks if two vectors are equal.
         * @param vec1 The first vector.
         * @param vec2 The second vector.
         * @returns Whether the two vectors are equal.
         */
        static equals(vec1, vec2) {
            return vec1[0] === vec2[0] && vec1[1] === vec2[1] && vec1[2] === vec2[2];
        }
        /**
         * Copies one vector to another.
         * @param from The vector from which to copy.
         * @param to The vector to which to copy.
         * @returns the changed vector.
         */
        static copy(from, to) {
            return Vec3Math.set(from[0], from[1], from[2], to);
        }
    }
    /**
     * N-dimensional vector mathematical operations.
     */
    class VecNMath {
        // eslint-disable-next-line jsdoc/require-jsdoc
        static create(length, ...components) {
            const vec = new Float64Array(length);
            for (let i = 0; i < length && components.length; i++) {
                vec[i] = components[i];
            }
            return vec;
        }
        /**
         * Sets the components of a vector.
         * @param vec The vector to change.
         * @param components The new components.
         * @returns The vector after it has been changed.
         */
        static set(vec, ...components) {
            for (let i = 0; i < vec.length && components.length; i++) {
                vec[i] = components[i];
            }
            return vec;
        }
        /**
         * Gets the magnitude of a vector.
         * @param vec The vector to get the magnitude for.
         * @returns The vector's magnitude.
         */
        static abs(vec) {
            return Math.hypot(...vec);
        }
        /**
         * Gets the dot product of two vectors.
         * @param v1 The first vector.
         * @param v2 The second vector.
         * @returns The dot product of the vectors.
         * @throws Error if the two vectors are of unequal lengths.
         */
        static dot(v1, v2) {
            if (v1.length !== v2.length) {
                throw new Error(`VecNMath: cannot compute dot product of two vectors of unequal length (${v1.length} and ${v2.length})`);
            }
            let dot = 0;
            const len = v1.length;
            for (let i = 0; i < len; i++) {
                dot += v1[i] * v2[i];
            }
            return dot;
        }
        /**
         * Normalizes a vector to a unit vector.
         * @param v1 The vector to normalize.
         * @param out The vector to write the results to.
         * @returns The normalized vector.
         */
        static normalize(v1, out) {
            const mag = Vec3Math.abs(v1);
            const len = v1.length;
            for (let i = 0; i < len; i++) {
                out[i] = v1[i] / mag;
            }
            return out;
        }
        /**
         * Checks if two vectors are equal.
         * @param vec1 The first vector.
         * @param vec2 The second vector.
         * @returns Whether the two vectors are equal.
         */
        static equals(vec1, vec2) {
            return vec1.length === vec2.length && vec1.every((element, index) => element === vec2[index]);
        }
        /**
         * Copies one vector to another.
         * @param from The vector from which to copy.
         * @param to The vector to which to copy.
         * @returns The changed vector.
         * @throws Error if the vectors are of unequal lengths.
         */
        static copy(from, to) {
            if (from.length !== to.length) {
                throw new Error(`VecNMath: cannot copy a vector of length ${from.length} to a vector of length ${to.length}`);
            }
            to.set(from);
            return to;
        }
    }

    /**
     * A Subject which allows a 2D vector to be observed.
     */
    class Vec2Subject extends AbstractSubscribable {
        /**
         * Constructor.
         * @param value The value of this subject.
         */
        constructor(value) {
            super();
            this.value = value;
            /** @inheritdoc */
            this.isMutableSubscribable = true;
        }
        /**
         * Creates a Vec2Subject.
         * @param initialVal The initial value.
         * @returns A Vec2Subject.
         */
        static create(initialVal) {
            return new Vec2Subject(initialVal);
        }
        /**
         * Creates a Vec2Subject.
         * @param initialVal The initial value.
         * @returns A Vec2Subject.
         * @deprecated Use `Vec2Subject.create()` instead.
         */
        static createFromVector(initialVal) {
            return new Vec2Subject(initialVal);
        }
        /** @inheritdoc */
        get() {
            return this.value;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        set(arg1, arg2) {
            let x, y;
            if (typeof arg1 === 'number') {
                x = arg1;
                y = arg2;
            }
            else {
                x = arg1[0];
                y = arg1[1];
            }
            const equals = x === this.value[0] && y === this.value[1];
            if (!equals) {
                Vec2Math.set(x, y, this.value);
                this.notify();
            }
        }
    }
    /**
     * A Subject which allows a N-D vector to be observed.
     */
    class VecNSubject extends AbstractSubscribable {
        /**
         * Constructor.
         * @param value The value of this subject.
         */
        constructor(value) {
            super();
            this.value = value;
            /** @inheritdoc */
            this.isMutableSubscribable = true;
        }
        /**
         * Creates a VecNSubject.
         * @param initialVal The initial value.
         * @returns A VecNSubject.
         */
        static create(initialVal) {
            return new VecNSubject(initialVal);
        }
        /**
         * Creates a VecNSubject.
         * @param initialVal The initial value.
         * @returns A VecNSubject.
         * @deprecated Use `VecNSubject.create()` instead.
         */
        static createFromVector(initialVal) {
            return new VecNSubject(initialVal);
        }
        /** @inheritdoc */
        get() {
            return this.value;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        set(arg1, ...args) {
            let array;
            if (typeof arg1 === 'number') {
                array = args;
                args.unshift(arg1);
            }
            else {
                array = arg1;
            }
            if (array.length > this.value.length) {
                throw new RangeError(`VecNSubject: Cannot set ${array.length} components on a vector of length ${this.value.length}`);
            }
            let equals = true;
            const len = array.length;
            for (let i = 0; i < len; i++) {
                if (array[i] !== this.value[i]) {
                    equals = false;
                    break;
                }
            }
            if (!equals) {
                this.value.set(array);
                this.notify();
            }
        }
    }

    /**
     * A 2D affine transformation. By default, Transform2D objects are initially created as identity transformations.
     */
    class Transform2D {
        constructor() {
            this.array = new Float64Array([1, 0, 0, 0, 1, 0]);
        }
        /**
         * Gets the parameters of this transformation as a 6-tuple: `[scaleX, skewX, translateX, skewY, scaleY, translateY]`.
         * @returns The parameters of this transformation.
         */
        getParameters() {
            return this.array;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        set(arg1, skewX, translateX, skewY, scaleY, translateY) {
            let scaleX = arg1;
            if (arg1 instanceof Transform2D) {
                [scaleX, skewX, translateX, skewY, scaleY, translateY] = arg1.array;
            }
            const array = this.array;
            array[0] = scaleX;
            array[1] = skewX;
            array[2] = translateX;
            array[3] = skewY;
            array[4] = scaleY;
            array[5] = translateY;
            return this;
        }
        /**
         * Sets the x scaling factor of this transformation.
         * @param value The new x scaling factor.
         * @returns This transformation, after it has been changed.
         */
        setScaleX(value) {
            this.array[0] = value;
            return this;
        }
        /**
         * Sets the y scaling factor of this transformation.
         * @param value The new y scaling factor.
         * @returns This transformation, after it has been changed.
         */
        setScaleY(value) {
            this.array[4] = value;
            return this;
        }
        /**
         * Sets the x and y scaling factors of this transformation.
         * @param x The new x scaling factor.
         * @param y The new y scaling factor.
         * @returns This transformation, after it has been changed.
         */
        setScale(x, y) {
            this.array[0] = x;
            this.array[4] = y;
            return this;
        }
        /**
         * Sets the x skew factor of this transformation.
         * @param value The new x skew factor.
         * @returns This transformation, after it has been changed.
         */
        setSkewX(value) {
            this.array[1] = value;
            return this;
        }
        /**
         * Sets the y skew factor of this transformation.
         * @param value The new y skew factor.
         * @returns This transformation, after it has been changed.
         */
        setSkewY(value) {
            this.array[3] = value;
            return this;
        }
        /**
         * Sets the x translation of this transformation.
         * @param value The new x translation.
         * @returns This transformation, after it has been changed.
         */
        setTranslateX(value) {
            this.array[2] = value;
            return this;
        }
        /**
         * Sets the y translation of this transformation.
         * @param value The new y translation.
         * @returns This transformation, after it has been changed.
         */
        setTranslateY(value) {
            this.array[5] = value;
            return this;
        }
        /**
         * Sets the x and y translations of this transformation.
         * @param x The new x translation.
         * @param y The new y translation.
         * @returns This transformation, after it has been changed.
         */
        setTranslate(x, y) {
            this.array[2] = x;
            this.array[5] = y;
            return this;
        }
        /**
         * Inverts this transformation.
         * @returns This transformation, after it has been inverted.
         */
        invert() {
            const array = this.array;
            const e_00 = array[0];
            const e_01 = array[1];
            const e_02 = array[2];
            const e_10 = array[3];
            const e_11 = array[4];
            const e_12 = array[5];
            const i_00 = e_11;
            const i_01 = -e_10;
            const i_10 = -e_01;
            const i_11 = e_00;
            const i_20 = e_01 * e_12 - e_02 * e_11;
            const i_21 = -(e_00 * e_12 - e_02 * e_10);
            const det = e_00 * i_00 + e_01 * i_01;
            return this.set(i_00 / det, i_10 / det, i_20 / det, i_01 / det, i_11 / det, i_21 / det);
        }
        /**
         * Copies this transformation.
         * @returns A copy of this transformation.
         */
        copy() {
            return new Transform2D().set(this);
        }
        /**
         * Applies this transformation to a 2D vector.
         * @param vec A 2D vector.
         * @param out The vector to which to write the result.
         * @returns The result of applying this transformation to `vec`.
         */
        apply(vec, out) {
            const array = this.array;
            const x = vec[0] * array[0] + vec[1] * array[1] + array[2];
            const y = vec[0] * array[3] + vec[1] * array[4] + array[5];
            return Vec2Math.set(x, y, out);
        }
        /**
         * Changes this transformation to the one that is the result of offsetting this transformation's origin.
         * @param x The x-coordinate of the offset origin.
         * @param y The y-coordinate of the offset origin.
         * @returns This transformation, after it has been changed.
         */
        offsetOrigin(x, y) {
            Transform2D.offsetOriginCache[0].toTranslation(-x, -y);
            Transform2D.offsetOriginCache[1] = this;
            Transform2D.offsetOriginCache[2].toTranslation(x, y);
            return Transform2D.concat(this, Transform2D.offsetOriginCache);
        }
        /**
         * Sets this transformation to the identity transformation.
         * @returns This transformation, after it has been changed.
         */
        toIdentity() {
            return this.set(1, 0, 0, 0, 1, 0);
        }
        /**
         * Sets this transformation to a translation.
         * @param x The x translation.
         * @param y The y translation.
         * @returns This transformation, after it has been changed.
         */
        toTranslation(x, y) {
            return this.set(1, 0, x, 0, 1, y);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        toScale(x, y, originX, originY) {
            this.set(x, 0, 0, 0, y, 0);
            if (originX !== undefined && originY !== undefined) {
                this.offsetOrigin(originX, originY);
            }
            return this;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        toRotation(theta, originX, originY) {
            const sin = Math.sin(theta);
            const cos = Math.cos(theta);
            this.set(cos, -sin, 0, sin, cos, 0);
            if (originX !== undefined && originY !== undefined) {
                this.offsetOrigin(originX, originY);
            }
            return this;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        toReflection(theta, originX, originY) {
            const sin = Math.sin(2 * theta);
            const cos = Math.cos(2 * theta);
            this.set(cos, sin, 0, sin, -cos, 0);
            if (originX !== undefined && originY !== undefined) {
                this.offsetOrigin(originX, originY);
            }
            return this;
        }
        /**
         * Concatenates one or more transformations and returns the result. Concatenating transformations `[A, B, ...]`
         * results in a transformation that is equivalent to first applying `A`, then applying `B`, etc. Note that this order
         * is the _opposite_ of the one resulting from multiplying the individual transformation _matrices_
         * `M_A * M_B * ...`.
         *
         * If the number of transformations to concatenate equals zero, the identity matrix is returned.
         * @param out The transformation to which to write the result.
         * @param transforms The transformations to concatenate, in order.
         * @returns The result of concatenating all transformations in `transforms`.
         */
        static concat(out, transforms) {
            if (transforms.length === 0) {
                return out.toIdentity();
            }
            if (transforms.length === 1) {
                return out.set(transforms[0]);
            }
            let index = 0;
            let next = transforms[index];
            const oldTransform = Transform2D.concatCache[0];
            const newTransform = Transform2D.concatCache[1].set(next);
            const oldArray = oldTransform.array;
            const newArray = newTransform.array;
            const end = transforms.length;
            while (++index < end) {
                next = transforms[index];
                const nextArray = next.array;
                oldTransform.set(newTransform);
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 2; j++) {
                        newArray[j * 3 + i] = oldArray[i] * nextArray[j * 3] + oldArray[3 + i] * nextArray[j * 3 + 1] + (i === 2 ? 1 : 0) * nextArray[j * 3 + 2];
                    }
                }
            }
            return out.set(newTransform);
        }
    }
    Transform2D.offsetOriginCache = [new Transform2D(), undefined, new Transform2D()];
    Transform2D.concatCache = [new Transform2D(), new Transform2D()];

    /**
     * A 3D affine transformation. By default, Transform3D objects are initially created as identity transformations.
     */
    class Transform3D {
        constructor() {
            this.array = new Float64Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0
            ]);
        }
        /**
         * Gets the parameters of this transformation as a 12-tuple:
         * `[scaleX, skewX(Y), skewX(Z), translateX, skewY(X), scaleY, skewY(Z), translateY, skewZ(X), skewZ(Y), scaleZ, translateZ]`.
         * @returns The parameters of this transformation.
         */
        getParameters() {
            return this.array;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        set(arg1, skewXY, skewXZ, translateX, skewYX, scaleY, skewYZ, translateY, skewZX, skewZY, scaleZ, translateZ) {
            let scaleX = arg1;
            if (arg1 instanceof Transform3D) {
                [scaleX, skewXY, skewXZ, translateX, skewYX, scaleY, skewYZ, translateY, skewZX, skewZY, scaleZ, translateZ] = arg1.array;
            }
            const array = this.array;
            array[0] = scaleX;
            array[1] = skewXY;
            array[2] = skewXZ;
            array[3] = translateX;
            array[4] = skewYX;
            array[5] = scaleY;
            array[6] = skewYZ;
            array[7] = translateY;
            array[8] = skewZX;
            array[9] = skewZY;
            array[10] = scaleZ;
            array[11] = translateZ;
            return this;
        }
        /**
         * Sets the x scaling factor of this transformation.
         * @param value The new x scaling factor.
         * @returns This transformation, after it has been changed.
         */
        setScaleX(value) {
            this.array[0] = value;
            return this;
        }
        /**
         * Sets the y scaling factor of this transformation.
         * @param value The new y scaling factor.
         * @returns This transformation, after it has been changed.
         */
        setScaleY(value) {
            this.array[5] = value;
            return this;
        }
        /**
         * Sets the z scaling factor of this transformation.
         * @param value The new z scaling factor.
         * @returns This transformation, after it has been changed.
         */
        setScaleZ(value) {
            this.array[10] = value;
            return this;
        }
        /**
         * Sets the x and y scaling factors of this transformation.
         * @param x The new x scaling factor.
         * @param y The new y scaling factor.
         * @param z The new z scaling factor.
         * @returns This transformation, after it has been changed.
         */
        setScale(x, y, z) {
            this.array[0] = x;
            this.array[5] = y;
            this.array[10] = z;
            return this;
        }
        /**
         * Sets the x skew factor of this transformation.
         * @param y The new x skew factor along the y axis.
         * @param z The new x skew factor along the z axis.
         * @returns This transformation, after it has been changed.
         */
        setSkewX(y, z) {
            this.array[1] = y;
            this.array[2] = z;
            return this;
        }
        /**
         * Sets the y skew factor of this transformation.
         * @param x The new y skew factor along the x axis.
         * @param z The new y skew factor along the z axis.
         * @returns This transformation, after it has been changed.
         */
        setSkewY(x, z) {
            this.array[4] = x;
            this.array[6] = z;
            return this;
        }
        /**
         * Sets the z skew factor of this transformation.
         * @param x The new z skew factor along the x axis.
         * @param y The new z skew factor along the y axis.
         * @returns This transformation, after it has been changed.
         */
        setSkewZ(x, y) {
            this.array[8] = x;
            this.array[9] = y;
            return this;
        }
        /**
         * Sets the x translation of this transformation.
         * @param value The new x translation.
         * @returns This transformation, after it has been changed.
         */
        setTranslateX(value) {
            this.array[3] = value;
            return this;
        }
        /**
         * Sets the y translation of this transformation.
         * @param value The new y translation.
         * @returns This transformation, after it has been changed.
         */
        setTranslateY(value) {
            this.array[7] = value;
            return this;
        }
        /**
         * Sets the z translation of this transformation.
         * @param value The new z translation.
         * @returns This transformation, after it has been changed.
         */
        setTranslateZ(value) {
            this.array[11] = value;
            return this;
        }
        /**
         * Sets the x and y translations of this transformation.
         * @param x The new x translation.
         * @param y The new y translation.
         * @param z The new z translation.
         * @returns This transformation, after it has been changed.
         */
        setTranslate(x, y, z) {
            this.array[3] = x;
            this.array[7] = y;
            this.array[11] = z;
            return this;
        }
        /**
         * Inverts this transformation.
         * @returns This transformation, after it has been inverted.
         * @throws Error if this transformation cannot be inverted.
         */
        invert() {
            const array = this.array;
            const e_00 = array[0];
            const e_01 = array[1];
            const e_02 = array[2];
            const e_03 = array[3];
            const e_10 = array[4];
            const e_11 = array[5];
            const e_12 = array[6];
            const e_13 = array[7];
            const e_20 = array[8];
            const e_21 = array[9];
            const e_22 = array[10];
            const e_23 = array[11];
            const c_00 = e_11 * e_22 - e_12 * e_21;
            const c_01 = e_12 * e_20 - e_10 * e_22;
            const c_02 = e_10 * e_21 - e_11 * e_20;
            const c_10 = e_02 * e_21 - e_01 * e_22;
            const c_11 = e_00 * e_22 - e_02 * e_20;
            const c_12 = e_01 * e_20 - e_00 * e_21;
            const c_20 = e_01 * e_12 - e_02 * e_11;
            const c_21 = e_02 * e_10 - e_00 * e_12;
            const c_22 = e_00 * e_11 - e_01 * e_10;
            const det = e_00 * c_00 + e_01 * c_01 + e_02 * c_02;
            if (det === 0) {
                throw new Error(`Transform3D: cannot invert transformation with parameters: ${this.array}`);
            }
            const i_00 = c_00 / det;
            const i_01 = c_10 / det;
            const i_02 = c_20 / det;
            const i_10 = c_01 / det;
            const i_11 = c_11 / det;
            const i_12 = c_21 / det;
            const i_20 = c_02 / det;
            const i_21 = c_12 / det;
            const i_22 = c_22 / det;
            const i_03 = -(i_00 * e_03 + i_01 * e_13 + i_02 * e_23);
            const i_13 = -(i_10 * e_03 + i_11 * e_13 + i_12 * e_23);
            const i_23 = -(i_20 * e_03 + i_21 * e_13 + i_22 * e_23);
            return this.set(i_00, i_01, i_02, i_03, i_10, i_11, i_12, i_13, i_20, i_21, i_22, i_23);
        }
        /**
         * Copies this transformation.
         * @returns A copy of this transformation.
         */
        copy() {
            return new Transform3D().set(this);
        }
        /**
         * Applies this transformation to a 3D vector.
         * @param vec A 3D vector.
         * @param out The vector to which to write the result.
         * @returns The result of applying this transformation to `vec`.
         */
        apply(vec, out) {
            const array = this.array;
            const x = vec[0] * array[0] + vec[1] * array[1] + vec[2] * array[2] + array[3];
            const y = vec[0] * array[4] + vec[1] * array[5] + vec[2] * array[6] + array[7];
            const z = vec[0] * array[8] + vec[1] * array[9] + vec[2] * array[10] + array[11];
            return Vec3Math.set(x, y, z, out);
        }
        /**
         * Changes this transformation to the one that is the result of offsetting this transformation's origin.
         * @param x The x-coordinate of the offset origin.
         * @param y The y-coordinate of the offset origin.
         * @param z The z-coordinate of the offset origin.
         * @returns This transformation, after it has been changed.
         */
        offsetOrigin(x, y, z) {
            Transform3D.offsetOriginCache[0].toTranslation(-x, -y, -z);
            Transform3D.offsetOriginCache[1] = this;
            Transform3D.offsetOriginCache[2].toTranslation(x, y, z);
            return Transform3D.concat(this, Transform3D.offsetOriginCache);
        }
        /**
         * Sets this transformation to the identity transformation.
         * @returns This transformation, after it has been changed.
         */
        toIdentity() {
            return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0);
        }
        /**
         * Sets this transformation to a translation.
         * @param x The x translation.
         * @param y The y translation.
         * @param z The z translation.
         * @returns This transformation, after it has been changed.
         */
        toTranslation(x, y, z) {
            return this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        toScale(x, y, z, originX, originY, originZ) {
            this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, 1, 0);
            if (originX !== undefined && originY !== undefined && originZ !== undefined) {
                this.offsetOrigin(originX, originY, originZ);
            }
            return this;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        toRotationX(theta, originX, originY, originZ) {
            const sin = Math.sin(theta);
            const cos = Math.cos(theta);
            this.set(1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0);
            if (originX !== undefined && originY !== undefined && originZ !== undefined) {
                this.offsetOrigin(originX, originY, originZ);
            }
            return this;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        toRotationY(theta, originX, originY, originZ) {
            const sin = Math.sin(theta);
            const cos = Math.cos(theta);
            this.set(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0);
            if (originX !== undefined && originY !== undefined && originZ !== undefined) {
                this.offsetOrigin(originX, originY, originZ);
            }
            return this;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        toRotationZ(theta, originX, originY, originZ) {
            const sin = Math.sin(theta);
            const cos = Math.cos(theta);
            this.set(cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0);
            if (originX !== undefined && originY !== undefined && originZ !== undefined) {
                this.offsetOrigin(originX, originY, originZ);
            }
            return this;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        toRotation(theta, axisX, axisY, axisZ, originX, originY, originZ) {
            const abs = Math.hypot(axisX, axisY, axisZ);
            const ux = axisX / abs;
            const uy = axisY / abs;
            const uz = axisZ / abs;
            const ux_uy = ux * uy;
            const ux_uz = ux * uz;
            const uy_uz = uy * uz;
            const sin = Math.sin(theta);
            const cos = Math.cos(theta);
            const cosCompl = 1 - cos;
            this.set(cos + ux * ux * cosCompl, ux_uy * cosCompl - uz * sin, ux_uz * cosCompl * uy * sin, 0, ux_uy * cosCompl + uz * sin, cos + uy * uy * cosCompl, uy_uz * cosCompl - ux * sin, 0, ux_uz * cosCompl - uy * sin, uy_uz * cosCompl + ux * sin, cos + uz * uz * cosCompl, 0);
            if (originX !== undefined && originY !== undefined && originZ !== undefined) {
                this.offsetOrigin(originX, originY, originZ);
            }
            return this;
        }
        /**
         * Concatenates one or more transformations and returns the result. Concatenating transformations `[A, B, ...]`
         * results in a transformation that is equivalent to first applying `A`, then applying `B`, etc. Note that this order
         * is the _opposite_ of the one resulting from multiplying the individual transformation _matrices_
         * `M_A * M_B * ...`.
         *
         * If the number of transformations to concatenate equals zero, the identity matrix is returned.
         * @param out The transformation to which to write the result.
         * @param transforms The transformations to concatenate, in order.
         * @returns The result of concatenating all transformations in `transforms`.
         */
        static concat(out, transforms) {
            if (transforms.length === 0) {
                return out.toIdentity();
            }
            if (transforms.length === 1) {
                return out.set(transforms[0]);
            }
            let index = 0;
            let next = transforms[index];
            const oldTransform = Transform3D.concatCache[0];
            const newTransform = Transform3D.concatCache[1].set(next);
            const oldArray = oldTransform.array;
            const newArray = newTransform.array;
            const end = transforms.length;
            while (++index < end) {
                next = transforms[index];
                const nextArray = next.array;
                oldTransform.set(newTransform);
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 3; j++) {
                        newArray[j * 4 + i] =
                            oldArray[i] * nextArray[j * 4]
                                + oldArray[4 + i] * nextArray[j * 4 + 1]
                                + oldArray[8 + i] * nextArray[j * 4 + 2]
                                + (i === 3 ? 1 : 0) * nextArray[j * 4 + 3];
                    }
                }
            }
            return out.set(newTransform);
        }
    }
    Transform3D.offsetOriginCache = [new Transform3D(), undefined, new Transform3D()];
    Transform3D.concatCache = [new Transform3D(), new Transform3D()];

    [Vec3Math.create()];

    /**
     * A utitlity class for basic math.
     */
    class MathUtils {
        /**
         * Clamps a numerical value to the min/max range.
         * @param value The value to be clamped.
         * @param min The minimum.
         * @param max The maximum.
         *
         * @returns The clamped numerical value..
         */
        static clamp(value, min, max) {
            return Math.max(min, Math.min(max, value));
        }
        /**
         * Rounds a number.
         * @param value The number to round.
         * @param precision The precision with which to round. Defaults to `1`.
         * @returns The rounded number.
         */
        static round(value, precision = 1) {
            return Math.round(value / precision) * precision;
        }
        /**
         * Calculates the angular difference between two angles in the range `[0, 2 * pi)`. The calculation supports both
         * directional and non-directional differences. The directional difference is the angle swept from the start angle
         * to the end angle proceeding in the direction of increasing angle. The non-directional difference is the smaller
         * of the two angles swept from the start angle to the end angle proceeding in either direction.
         * @param start The starting angle, in radians.
         * @param end The ending angle, in radians.
         * @param directional Whether to calculate the directional difference. Defaults to `true`.
         * @returns The angular difference between the two angles, in radians, in the range `[0, 2 * pi)`.
         */
        static diffAngle(start, end, directional = true) {
            const diff = ((end - start) % MathUtils.TWO_PI + MathUtils.TWO_PI) % MathUtils.TWO_PI;
            return directional ? diff : Math.min(diff, MathUtils.TWO_PI - diff);
        }
        /**
         * Linearly interpolates a keyed value along one dimension.
         * @param x The key of the value to interpolate.
         * @param x0 The key of the first known value.
         * @param x1 The key of the second known value.
         * @param y0 The first known value.
         * @param y1 The second known value.
         * @param clampStart Whether to clamp the interpolated value to the first known value. Defaults to false.
         * @param clampEnd Whether to clamp the interpolated value to the second known value. Defaults to false.
         * @returns The interpolated value corresponding to the specified key.
         */
        static lerp(x, x0, x1, y0, y1, clampStart = false, clampEnd = false) {
            if (x0 !== x1 && y0 !== y1) {
                const fraction = MathUtils.clamp((x - x0) / (x1 - x0), clampStart ? 0 : -Infinity, clampEnd ? 1 : Infinity);
                return fraction * (y1 - y0) + y0;
            }
            else {
                return y0;
            }
        }
    }
    /** Twice the value of pi. */
    MathUtils.TWO_PI = Math.PI * 2;
    /** Half the value of pi. */
    MathUtils.HALF_PI = Math.PI / 2;

    /**
     * A read-only wrapper for a GeoPoint.
     */
    class GeoPointReadOnly {
        /**
         * Constructor.
         * @param source - the source of the new read-only point.
         */
        constructor(source) {
            this.source = source;
        }
        /**
         * The latitude of this point, in degrees.
         * @returns the latitude of this point.
         */
        get lat() {
            return this.source.lat;
        }
        /**
         * The longitude of this point, in degrees.
         * @returns the longitude of this point.
         */
        get lon() {
            return this.source.lon;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        distance(arg1, arg2) {
            if (typeof arg1 === 'number') {
                return this.source.distance(arg1, arg2);
            }
            else {
                return this.source.distance(arg1);
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        distanceRhumb(arg1, arg2) {
            if (typeof arg1 === 'number') {
                return this.source.distanceRhumb(arg1, arg2);
            }
            else {
                return this.source.distanceRhumb(arg1);
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        bearingTo(arg1, arg2) {
            if (typeof arg1 === 'number') {
                return this.source.bearingTo(arg1, arg2);
            }
            else {
                return this.source.bearingTo(arg1);
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        bearingFrom(arg1, arg2) {
            if (typeof arg1 === 'number') {
                return this.source.bearingFrom(arg1, arg2);
            }
            else {
                return this.source.bearingFrom(arg1);
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        bearingRhumb(arg1, arg2) {
            if (typeof arg1 === 'number') {
                return this.source.bearingRhumb(arg1, arg2);
            }
            else {
                return this.source.bearingRhumb(arg1);
            }
        }
        /**
         * Offsets this point by an initial bearing and distance along a great circle.
         * @param bearing The initial true bearing (forward azimuth), in degrees, by which to offset.
         * @param distance The distance, in great-arc radians, by which to offset.
         * @param out The GeoPoint to which to write the results. If not supplied, a new GeoPoint object is created.
         * @returns The offset point.
         * @throws {Error} if argument `out` is undefined.
         */
        offset(bearing, distance, out) {
            if (!out) {
                throw new Error('Cannot mutate a read-only GeoPoint.');
            }
            return this.source.offset(bearing, distance, out);
        }
        /**
         * Offsets this point by a constant bearing and distance along a rhumb line.
         * @param bearing The true bearing, in degrees, by which to offset.
         * @param distance The distance, in great-arc radians, by which to offset.
         * @param out The GeoPoint to which to write the results. If not supplied, a new GeoPoint object is created.
         * @returns The offset point.
         * @throws {Error} If argument `out` is undefined.
         */
        offsetRhumb(bearing, distance, out) {
            if (!out) {
                throw new Error('Cannot mutate a read-only GeoPoint.');
            }
            return this.source.offsetRhumb(bearing, distance, out);
        }
        /**
         * Calculates the cartesian (x, y, z) representation of this point, in units of great-arc radians. By convention,
         * in the cartesian coordinate system the origin is at the center of the Earth, the positive x-axis passes through
         * 0 degrees N, 0 degrees E, and the positive z-axis passes through the north pole.
         * @param out The vector array to which to write the result.
         * @returns The cartesian representation of this point.
         */
        toCartesian(out) {
            return this.source.toCartesian(out);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        equals(arg1, arg2, arg3) {
            if (typeof arg1 === 'number') {
                return this.source.equals(arg1, arg2, arg3);
            }
            else {
                return this.source.equals(arg1, arg2);
            }
        }
        /** @inheritdoc */
        copy(to) {
            return this.source.copy(to);
        }
    }
    /**
     * A point on Earth's surface. This class uses a spherical Earth model.
     */
    class GeoPoint {
        /**
         * Constructor.
         * @param lat The latitude, in degrees.
         * @param lon The longitude, in degrees.
         */
        constructor(lat, lon) {
            this._lat = 0;
            this._lon = 0;
            this.set(lat, lon);
            this.readonly = new GeoPointReadOnly(this);
        }
        /**
         * The latitude of this point, in degrees.
         * @returns the latitude of this point.
         */
        get lat() {
            return this._lat;
        }
        /**
         * The longitude of this point, in degrees.
         * @returns the longitude of this point.
         */
        get lon() {
            return this._lon;
        }
        /**
         * Converts an argument list consisting of either a LatLonInterface or lat/lon coordinates into an equivalent
         * LatLonInterface.
         * @param arg1 Argument 1.
         * @param arg2 Argument 2.
         * @returns A LatLonInterface.
         */
        static asLatLonInterface(arg1, arg2) {
            if (typeof arg1 === 'number') {
                return GeoPoint.tempGeoPoint.set(arg1, arg2);
            }
            else {
                return arg1;
            }
        }
        /**
         * Converts an argument list consisting of either a 3D vector or x, y, z components into an equivalent 3D vector.
         * @param arg1 Argument 1.
         * @param arg2 Argument 2.
         * @param arg3 Argument 3.
         * @returns A 3D vector.
         */
        static asVec3(arg1, arg2, arg3) {
            if (typeof arg1 === 'number') {
                return Vec3Math.set(arg1, arg2, arg3, GeoPoint.tempVec3);
            }
            else {
                return arg1;
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        set(arg1, arg2) {
            let lat, lon;
            if (typeof arg1 === 'number') {
                lat = arg1;
                lon = arg2;
            }
            else {
                lat = arg1.lat;
                lon = arg1.lon;
            }
            lat = GeoPoint.toPlusMinus180(lat);
            lon = GeoPoint.toPlusMinus180(lon);
            if (Math.abs(lat) > 90) {
                lat = 180 - lat;
                lat = GeoPoint.toPlusMinus180(lat);
                lon += 180;
                lon = GeoPoint.toPlusMinus180(lon);
            }
            this._lat = lat;
            this._lon = lon;
            return this;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        setFromCartesian(arg1, arg2, arg3) {
            const vec = GeoPoint.asVec3(arg1, arg2, arg3);
            const theta = Vec3Math.theta(vec);
            const phi = Vec3Math.phi(vec);
            return this.set(90 - theta * Avionics.Utils.RAD2DEG, phi * Avionics.Utils.RAD2DEG);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        distance(arg1, arg2) {
            const other = GeoPoint.asLatLonInterface(arg1, arg2);
            return GeoPoint.distance(this.lat, this.lon, other.lat, other.lon);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        distanceRhumb(arg1, arg2) {
            const other = GeoPoint.asLatLonInterface(arg1, arg2);
            return GeoPoint.distanceRhumb(this.lat, this.lon, other.lat, other.lon);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        bearingTo(arg1, arg2) {
            const other = GeoPoint.asLatLonInterface(arg1, arg2);
            return GeoPoint.initialBearing(this.lat, this.lon, other.lat, other.lon);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        bearingFrom(arg1, arg2) {
            const other = GeoPoint.asLatLonInterface(arg1, arg2);
            return GeoPoint.finalBearing(other.lat, other.lon, this.lat, this.lon);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        bearingRhumb(arg1, arg2) {
            const other = GeoPoint.asLatLonInterface(arg1, arg2);
            return GeoPoint.bearingRhumb(this.lat, this.lon, other.lat, other.lon);
        }
        /**
         * Offsets this point by an initial bearing and distance along a great circle.
         * @param bearing The initial true bearing (forward azimuth), in degrees, by which to offset.
         * @param distance The distance, in great-arc radians, by which to offset.
         * @param out The GeoPoint to which to write the results. By default this point.
         * @returns The offset point.
         */
        offset(bearing, distance, out) {
            const latRad = this.lat * Avionics.Utils.DEG2RAD;
            const lonRad = this.lon * Avionics.Utils.DEG2RAD;
            const sinLat = Math.sin(latRad);
            const cosLat = Math.cos(latRad);
            const sinBearing = Math.sin(bearing * Avionics.Utils.DEG2RAD);
            const cosBearing = Math.cos(bearing * Avionics.Utils.DEG2RAD);
            const angularDistance = distance;
            const sinAngularDistance = Math.sin(angularDistance);
            const cosAngularDistance = Math.cos(angularDistance);
            const offsetLatRad = Math.asin(sinLat * cosAngularDistance + cosLat * sinAngularDistance * cosBearing);
            const offsetLonDeltaRad = Math.atan2(sinBearing * sinAngularDistance * cosLat, cosAngularDistance - sinLat * Math.sin(offsetLatRad));
            const offsetLat = offsetLatRad * Avionics.Utils.RAD2DEG;
            const offsetLon = (lonRad + offsetLonDeltaRad) * Avionics.Utils.RAD2DEG;
            return (out !== null && out !== void 0 ? out : this).set(offsetLat, offsetLon);
        }
        /**
         * Offsets this point by a constant bearing and distance along a rhumb line.
         * @param bearing The true bearing, in degrees, by which to offset.
         * @param distance The distance, in great-arc radians, by which to offset.
         * @param out The GeoPoint to which to write the results. By default this point.
         * @returns The offset point.
         */
        offsetRhumb(bearing, distance, out) {
            const latRad = this.lat * Avionics.Utils.DEG2RAD;
            const lonRad = this.lon * Avionics.Utils.DEG2RAD;
            const bearingRad = bearing * Avionics.Utils.DEG2RAD;
            const deltaLat = distance * Math.cos(bearingRad);
            let offsetLat = latRad + deltaLat;
            let offsetLon;
            if (Math.abs(offsetLat) >= Math.PI / 2) {
                // you can't technically go past the poles along a rhumb line, so we will simply terminate the path at the pole
                offsetLat = Math.sign(offsetLat) * 90;
                offsetLon = 0; // since longitude is meaningless at the poles, we'll arbitrarily pick a longitude of 0 degrees.
            }
            else {
                const deltaPsi = GeoPoint.deltaPsi(latRad, offsetLat);
                const correction = GeoPoint.rhumbCorrection(deltaPsi, latRad, offsetLat);
                const deltaLon = distance * Math.sin(bearingRad) / correction;
                offsetLon = lonRad + deltaLon;
                offsetLat *= Avionics.Utils.RAD2DEG;
                offsetLon *= Avionics.Utils.RAD2DEG;
            }
            return (out !== null && out !== void 0 ? out : this).set(offsetLat, offsetLon);
        }
        /** @inheritdoc */
        toCartesian(out) {
            return GeoPoint.sphericalToCartesian(this, out);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        equals(arg1, arg2, arg3) {
            const other = GeoPoint.asLatLonInterface(arg1, arg2);
            const tolerance = typeof arg1 === 'number' ? arg3 : arg2;
            if (other) {
                return this.distance(other) <= (tolerance !== null && tolerance !== void 0 ? tolerance : GeoPoint.EQUALITY_TOLERANCE);
            }
            else {
                return false;
            }
        }
        /** @inheritdoc */
        copy(to) {
            return to ? to.set(this.lat, this.lon) : new GeoPoint(this.lat, this.lon);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        static sphericalToCartesian(arg1, arg2, arg3) {
            const point = GeoPoint.asLatLonInterface(arg1, arg2);
            const theta = (90 - point.lat) * Avionics.Utils.DEG2RAD;
            const phi = point.lon * Avionics.Utils.DEG2RAD;
            return Vec3Math.setFromSpherical(1, theta, phi, arg3 !== null && arg3 !== void 0 ? arg3 : arg2);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        static equals(arg1, arg2, arg3, arg4, arg5) {
            if (arg1 instanceof Float64Array) {
                return GeoPoint.distance(arg1, arg2) <= (arg3 !== null && arg3 !== void 0 ? arg3 : GeoPoint.EQUALITY_TOLERANCE);
            }
            else if (typeof arg1 === 'number') {
                return GeoPoint.distance(arg1, arg2, arg3, arg4) <= (arg5 !== null && arg5 !== void 0 ? arg5 : GeoPoint.EQUALITY_TOLERANCE);
            }
            else {
                return GeoPoint.distance(arg1, arg2) <= (arg3 !== null && arg3 !== void 0 ? arg3 : GeoPoint.EQUALITY_TOLERANCE);
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        static distance(arg1, arg2, arg3, arg4) {
            if (arg1 instanceof Float64Array) {
                return Math.acos(Utils.Clamp(Vec3Math.dot(arg1, arg2), -1, 1));
            }
            else {
                let lat1, lon1, lat2, lon2;
                if (typeof arg1 === 'number') {
                    lat1 = arg1 * Avionics.Utils.DEG2RAD;
                    lon1 = arg2 * Avionics.Utils.DEG2RAD;
                    lat2 = arg3 * Avionics.Utils.DEG2RAD;
                    lon2 = arg4 * Avionics.Utils.DEG2RAD;
                }
                else {
                    lat1 = arg1.lat;
                    lon1 = arg1.lon;
                    lat2 = arg2.lat;
                    lon2 = arg2.lon;
                }
                // haversine formula
                const sinHalfDeltaLat = Math.sin((lat2 - lat1) / 2);
                const sinHalfDeltaLon = Math.sin((lon2 - lon1) / 2);
                const a = sinHalfDeltaLat * sinHalfDeltaLat + Math.cos(lat1) * Math.cos(lat2) * sinHalfDeltaLon * sinHalfDeltaLon;
                return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        static distanceRhumb(arg1, arg2, arg3, arg4) {
            let lat1, lon1, lat2, lon2;
            if (typeof arg1 === 'number') {
                lat1 = arg1 * Avionics.Utils.DEG2RAD;
                lon1 = arg2 * Avionics.Utils.DEG2RAD;
                lat2 = arg3 * Avionics.Utils.DEG2RAD;
                lon2 = arg4 * Avionics.Utils.DEG2RAD;
            }
            else if (arg1 instanceof Float64Array) {
                const point1 = GeoPoint.tempGeoPoint.setFromCartesian(arg1);
                lat1 = point1.lat;
                lon1 = point1.lon;
                const point2 = GeoPoint.tempGeoPoint.setFromCartesian(arg2);
                lat2 = point2.lat;
                lon2 = point2.lon;
            }
            else {
                lat1 = arg1.lat;
                lon1 = arg1.lon;
                lat2 = arg2.lat;
                lon2 = arg2.lon;
            }
            const deltaLat = lat2 - lat1;
            let deltaLon = lon2 - lon1;
            const deltaPsi = GeoPoint.deltaPsi(lat1, lat2);
            const correction = GeoPoint.rhumbCorrection(deltaPsi, lat1, lat2);
            if (Math.abs(deltaLon) > Math.PI) {
                deltaLon += -Math.sign(deltaLon) * 2 * Math.PI;
            }
            return Math.sqrt(deltaLat * deltaLat + correction * correction * deltaLon * deltaLon);
        }
        /**
         * Calculates the initial true bearing (forward azimuth) from one point to another along the great circle connecting
         * the two.
         * @param lat1 The latitude of the initial point, in degrees.
         * @param lon1 The longitude of the initial point, in degrees.
         * @param lat2 The latitude of the final point, in degrees.
         * @param lon2 The longitude of the final point, in degrees.
         * @returns The initial true bearing, in degrees, from the initial point to the final point along the great circle
         * connecting the two.
         */
        static initialBearing(lat1, lon1, lat2, lon2) {
            lat1 *= Avionics.Utils.DEG2RAD;
            lat2 *= Avionics.Utils.DEG2RAD;
            lon1 *= Avionics.Utils.DEG2RAD;
            lon2 *= Avionics.Utils.DEG2RAD;
            const cosLat2 = Math.cos(lat2);
            const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * cosLat2 * Math.cos(lon2 - lon1);
            const y = Math.sin(lon2 - lon1) * cosLat2;
            const bearing = Math.atan2(y, x) * Avionics.Utils.RAD2DEG;
            return (bearing + 360) % 360; // enforce range [0, 360)
        }
        /**
         * Calculates the final true bearing from one point to another along the great circle connecting the two.
         * @param lat1 The latitude of the initial point, in degrees.
         * @param lon1 The longitude of the initial point, in degrees.
         * @param lat2 The latitude of the final point, in degrees.
         * @param lon2 The longitude of the final point, in degrees.
         * @returns The final true bearing, in degrees, from the initial point to the final point along the great circle
         * connecting the two.
         */
        static finalBearing(lat1, lon1, lat2, lon2) {
            return (GeoPoint.initialBearing(lat2, lon2, lat1, lon1) + 180) % 360;
        }
        /**
         * Calculates the constant true bearing from one point to another along the rhumb line connecting the two.
         * @param lat1 The latitude of the initial point, in degrees.
         * @param lon1 The longitude of the initial point, in degrees.
         * @param lat2 The latitude of the final point, in degrees.
         * @param lon2 The longitude of the final point, in degrees.
         * @returns The constant true bearing, in degrees, from the initial point to the final point along the rhumb line
         * connecting the two.
         */
        static bearingRhumb(lat1, lon1, lat2, lon2) {
            lat1 *= Avionics.Utils.DEG2RAD;
            lat2 *= Avionics.Utils.DEG2RAD;
            lon1 *= Avionics.Utils.DEG2RAD;
            lon2 *= Avionics.Utils.DEG2RAD;
            let deltaLon = lon2 - lon1;
            const deltaPsi = GeoPoint.deltaPsi(lat1, lat2);
            if (Math.abs(deltaLon) > Math.PI) {
                deltaLon += -Math.sign(deltaLon) * 2 * Math.PI;
            }
            return Math.atan2(deltaLon, deltaPsi) * Avionics.Utils.RAD2DEG;
        }
        /**
         * Converts an angle, in degrees, to an equivalent value in the range [-180, 180).
         * @param angle An angle in degrees.
         * @returns The angle's equivalent in the range [-180, 180).
         */
        static toPlusMinus180(angle) {
            return ((angle % 360) + 540) % 360 - 180;
        }
        /**
         * Calculates the difference in isometric latitude from a pair of geodetic (geocentric) latitudes.
         * @param latRad1 Geodetic latitude 1, in radians.
         * @param latRad2 Geodetic latitude 2, in radians.
         * @returns The difference in isometric latitude from latitude 1 to latitude 2, in radians.
         */
        static deltaPsi(latRad1, latRad2) {
            return Math.log(Math.tan(latRad2 / 2 + Math.PI / 4) / Math.tan(latRad1 / 2 + Math.PI / 4));
        }
        /**
         * Calculates the rhumb correction factor between two latitudes.
         * @param deltaPsi The difference in isometric latitude beween the two latitudes.
         * @param latRad1 Geodetic latitude 1, in radians.
         * @param latRad2 Geodetic latitude 2, in radians.
         * @returns The rhumb correction factor between the two latitudes.
         */
        static rhumbCorrection(deltaPsi, latRad1, latRad2) {
            return Math.abs(deltaPsi) > 1e-12 ? ((latRad2 - latRad1) / deltaPsi) : Math.cos(latRad1);
        }
    }
    /**
     * The default equality tolerance, defined as the maximum allowed distance between two equal points in great-arc
     * radians.
     */
    GeoPoint.EQUALITY_TOLERANCE = 1e-7; // ~61 cm
    GeoPoint.tempVec3 = new Float64Array(3);
    GeoPoint.tempGeoPoint = new GeoPoint(0, 0);

    /**
     * A circle on Earth's surface, defined as the set of points on the Earth's surface equidistant (as measured
     * geodetically) from a central point.
     */
    class GeoCircle {
        /**
         * Constructor.
         * @param center The center of the new small circle, represented as a position vector in the standard geographic
         * cartesian reference system.
         * @param radius The radius of the new small circle in great-arc radians.
         */
        constructor(center, radius) {
            this._center = new Float64Array(3);
            this._radius = 0;
            this._sinRadius = 0;
            this.set(center, radius);
        }
        // eslint-disable-next-line jsdoc/require-returns
        /**
         * The center of this circle.
         */
        get center() {
            return this._center;
        }
        // eslint-disable-next-line jsdoc/require-returns
        /**
         * The radius of this circle, in great-arc radians.
         */
        get radius() {
            return this._radius;
        }
        /**
         * Checks whether this circle is a great circle, or equivalently, whether its radius is equal to pi / 2 great-arc
         * radians.
         * @returns Whether this circle is a great circle.
         */
        isGreatCircle() {
            return this._radius === Math.PI / 2;
        }
        /**
         * Calculates the length of an arc along this circle subtended by a central angle.
         * @param angle A central angle, in radians.
         * @returns The length of the arc subtended by the angle, in great-arc radians.
         */
        arcLength(angle) {
            return this._sinRadius * angle;
        }
        /**
         * Calculates the central angle which subtends an arc along this circle of given length.
         * @param length An arc length, in great-arc radians.
         * @returns The central angle which subtends an arc along this circle of the given length, in radians.
         */
        angularWidth(length) {
            return length / this._sinRadius;
        }
        /**
         * Sets the center and radius of this circle.
         * @param center The new center.
         * @param radius The new radius in great-arc radians.
         * @returns this circle, after it has been changed.
         */
        set(center, radius) {
            if (center instanceof Float64Array) {
                if (Vec3Math.abs(center) === 0) {
                    // if center has no direction, arbitrarily set the center to 0 N, 0 E.
                    Vec3Math.set(1, 0, 0, this._center);
                }
                else {
                    Vec3Math.normalize(center, this._center);
                }
            }
            else {
                GeoPoint.sphericalToCartesian(center, this._center);
            }
            this._radius = Math.abs(radius) % Math.PI;
            this._sinRadius = Math.sin(this._radius);
            return this;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        setAsGreatCircle(arg1, arg2) {
            this.set(GeoCircle._getGreatCircleNormal(arg1, arg2, GeoCircle.vec3Cache[0]), Math.PI / 2);
            return this;
        }
        /**
         * Reverses the direction of this circle. This sets the center of the circle to its antipode and the radius to its
         * complement with `Math.PI`.
         * @returns This circle, after it has been reversed.
         */
        reverse() {
            Vec3Math.multScalar(this._center, -1, this._center);
            this._radius = Math.PI - this._radius;
            return this;
        }
        /**
         * Gets the distance from a point to the center of this circle, in great-arc radians.
         * @param point The point to which to measure the distance.
         * @returns the distance from the point to the center of this circle.
         */
        distanceToCenter(point) {
            if (point instanceof Float64Array) {
                point = Vec3Math.normalize(point, GeoCircle.vec3Cache[0]);
            }
            else {
                point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[0]);
            }
            const dot = Vec3Math.dot(point, this._center);
            return Math.acos(Utils.Clamp(dot, -1, 1));
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        closest(point, out) {
            if (!(point instanceof Float64Array)) {
                point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[0]);
            }
            const offset = Vec3Math.multScalar(this._center, Math.cos(this._radius), GeoCircle.vec3Cache[1]);
            const dot = Vec3Math.dot(Vec3Math.sub(point, offset, GeoCircle.vec3Cache[2]), this._center);
            const planeProjected = Vec3Math.sub(point, Vec3Math.multScalar(this._center, dot, GeoCircle.vec3Cache[2]), GeoCircle.vec3Cache[2]);
            if (Vec3Math.dot(planeProjected, planeProjected) === 0 || Math.abs(Vec3Math.dot(planeProjected, this._center)) === 1) {
                // the point is equidistant from all points on this circle
                return out instanceof GeoPoint ? out.set(NaN, NaN) : Vec3Math.set(NaN, NaN, NaN, out);
            }
            const displacement = Vec3Math.multScalar(Vec3Math.normalize(Vec3Math.sub(planeProjected, offset, GeoCircle.vec3Cache[2]), GeoCircle.vec3Cache[2]), Math.sin(this._radius), GeoCircle.vec3Cache[2]);
            const closest = Vec3Math.add(offset, displacement, GeoCircle.vec3Cache[2]);
            return out instanceof Float64Array ? Vec3Math.normalize(closest, out) : out.setFromCartesian(closest);
        }
        /**
         * Calculates and returns the great-circle distance from a specified point to the closest point that lies on this
         * circle. In other words, calculates the shortest distance from a point to this circle. The distance is signed, with
         * positive distances representing deviation away from the center of the circle, and negative distances representing
         * deviation toward the center of the circle.
         * @param point A point, represented as either a position vector or lat/long coordinates.
         * @returns the great circle distance, in great-arc radians, from the point to the closest point on this circle.
         */
        distance(point) {
            const distanceToCenter = this.distanceToCenter(point);
            return distanceToCenter - this._radius;
        }
        /**
         * Checks whether a point lies on this circle.
         * @param point A point, represented as either a position vector or lat/long coordinates.
         * @param tolerance The error tolerance, in great-arc radians, of this operation. Defaults to
         * `GeoCircle.ANGULAR_TOLERANCE` if not specified.
         * @returns whether the point lies on this circle.
         */
        includes(point, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
            const distance = this.distance(point);
            return Math.abs(distance) < tolerance;
        }
        /**
         * Checks whether a point lies within the boundary defined by this circle. This is equivalent to checking whether
         * the distance of the point from the center of this circle is less than or equal to this circle's radius.
         * @param point A point, represented as either a position vector or lat/long coordinates.
         * @param inclusive Whether points that lie on this circle should pass the check. True by default.
         * @param tolerance The error tolerance, in great-arc radians, of this operation. Defaults to
         * `GeoCircle.ANGULAR_TOLERANCE` if not specified.
         * @returns whether the point lies within the boundary defined by this circle.
         */
        encircles(point, inclusive = true, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
            const distance = this.distance(point);
            return inclusive
                ? distance <= tolerance
                : distance < -tolerance;
        }
        /**
         * Gets the angular distance along an arc between two points that lie on this circle. The arc extends from the first
         * point to the second in a counterclockwise direction when viewed from above the center of the circle.
         * @param start A point on this circle which marks the beginning of an arc.
         * @param end A point on this circle which marks the end of an arc.
         * @param tolerance The error tolerance, in great-arc radians, when checking if `start` and `end` lie on this circle.
         * Defaults to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
         * @param equalityTolerance The angular tolerance for considering the start and end points to be equal, in radians.
         * If the absolute (direction-agnostic) angular distance between the start and end points is less than or equal to
         * this value, then the zero will be returned. Defaults to `0`.
         * @returns the angular width of the arc between the two points, in radians.
         * @throws Error if either point does not lie on this circle.
         */
        angleAlong(start, end, tolerance = GeoCircle.ANGULAR_TOLERANCE, equalityTolerance = 0) {
            if (!(start instanceof Float64Array)) {
                start = GeoPoint.sphericalToCartesian(start, GeoCircle.vec3Cache[1]);
            }
            if (!(end instanceof Float64Array)) {
                end = GeoPoint.sphericalToCartesian(end, GeoCircle.vec3Cache[2]);
            }
            if (!this.includes(start, tolerance) || !this.includes(end, tolerance)) {
                throw new Error(`GeoCircle: at least one of the two specified arc end points does not lie on this circle (start point distance of ${this.distance(start)}, end point distance of ${this.distance(end)}, vs tolerance of ${tolerance}).`);
            }
            if (this._radius <= GeoCircle.ANGULAR_TOLERANCE) {
                return 0;
            }
            const startRadialNormal = Vec3Math.normalize(Vec3Math.cross(this._center, start, GeoCircle.vec3Cache[3]), GeoCircle.vec3Cache[3]);
            const endRadialNormal = Vec3Math.normalize(Vec3Math.cross(this._center, end, GeoCircle.vec3Cache[4]), GeoCircle.vec3Cache[4]);
            const angularDistance = Math.acos(Utils.Clamp(Vec3Math.dot(startRadialNormal, endRadialNormal), -1, 1));
            const isArcGreaterThanSemi = Vec3Math.dot(startRadialNormal, end) < 0;
            const angle = isArcGreaterThanSemi ? MathUtils.TWO_PI - angularDistance : angularDistance;
            return angle >= MathUtils.TWO_PI - equalityTolerance || angle <= equalityTolerance ? 0 : angle;
        }
        /**
         * Gets the distance along an arc between two points that lie on this circle. The arc extends from the first point
         * to the second in a counterclockwise direction when viewed from above the center of the circle.
         * @param start A point on this circle which marks the beginning of an arc.
         * @param end A point on this circle which marks the end of an arc.
         * @param tolerance The error tolerance, in great-arc radians, when checking if `start` and `end` lie on this circle.
         * Defaults to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
         * @param equalityTolerance The tolerance for considering the start and end points to be equal, in great-arc radians.
         * If the absolute (direction-agnostic) along-arc distance between the start and end points is less than or equal to
         * this value, then the zero will be returned. Defaults to `0`.
         * @returns the length of the arc between the two points, in great-arc radians.
         * @throws Error if either point does not lie on this circle.
         */
        distanceAlong(start, end, tolerance = GeoCircle.ANGULAR_TOLERANCE, equalityTolerance = 0) {
            return this.arcLength(this.angleAlong(start, end, tolerance, this.angularWidth(equalityTolerance)));
        }
        /**
         * Calculates the true bearing along this circle at a point on the circle.
         * @param point A point on this circle.
         * @param tolerance The error tolerance, in great-arc radians, when checking if `point` lies on this circle. Defaults
         * to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
         * @returns the bearing along this circle at the point.
         * @throws Error if the point does not lie on this circle.
         */
        bearingAt(point, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
            if (!(point instanceof Float64Array)) {
                point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[1]);
            }
            if (!this.includes(point, tolerance)) {
                throw new Error(`GeoCircle: the specified point does not lie on this circle (distance of ${Math.abs(this.distance(point))} vs tolerance of ${tolerance}).`);
            }
            if (this._radius <= GeoCircle.ANGULAR_TOLERANCE || 1 - Math.abs(Vec3Math.dot(point, GeoCircle.NORTH_POLE)) <= GeoCircle.ANGULAR_TOLERANCE) {
                // Meaningful bearings cannot be defined along a circle with 0 radius (effectively a point) and at the north and south poles.
                return NaN;
            }
            const radialNormal = Vec3Math.normalize(Vec3Math.cross(this._center, point, GeoCircle.vec3Cache[2]), GeoCircle.vec3Cache[2]);
            const northNormal = Vec3Math.normalize(Vec3Math.cross(point, GeoCircle.NORTH_POLE, GeoCircle.vec3Cache[3]), GeoCircle.vec3Cache[3]);
            return (Math.acos(Utils.Clamp(Vec3Math.dot(radialNormal, northNormal), -1, 1)) * (radialNormal[2] >= 0 ? 1 : -1) * Avionics.Utils.RAD2DEG - 90 + 360) % 360;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        offsetDistanceAlong(point, distance, out, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
            const angle = distance / Math.sin(this.radius);
            return this._offsetAngleAlong(point, angle, out, tolerance);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        offsetAngleAlong(point, angle, out, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
            return this._offsetAngleAlong(point, angle, out, tolerance);
        }
        /**
         * Offsets a point on this circle by a specified angular distance. The direction of the offset for positive distances
         * is counterclockwise when viewed from above the center of this circle.
         * @param point The point to offset.
         * @param angle The angular distance by which to offset, in radians.
         * @param out A Float64Array or GeoPoint object to which to write the result.
         * @param tolerance The error tolerance, in great-arc radians, when checking if `point` lies on this circle. Defaults
         * to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
         * @returns The offset point.
         * @throws Error if the point does not lie on this circle.
         */
        _offsetAngleAlong(point, angle, out, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
            if (!(point instanceof Float64Array)) {
                point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[3]);
            }
            if (!this.includes(point, tolerance)) {
                throw new Error(`GeoCircle: the specified point does not lie on this circle (distance of ${Math.abs(this.distance(point))} vs tolerance of ${tolerance}).`);
            }
            if (this.radius === 0) {
                return out instanceof GeoPoint ? out.setFromCartesian(point) : Vec3Math.copy(point, out);
            }
            // Since point may not lie exactly on this circle due to error tolerance, project point onto this circle to ensure
            // the offset point lies exactly on this circle.
            point = this.closest(point, GeoCircle.vec3Cache[3]);
            const sin = Math.sin(angle / 2);
            const q0 = Math.cos(angle / 2);
            const q1 = sin * this._center[0];
            const q2 = sin * this._center[1];
            const q3 = sin * this._center[2];
            const q0Sq = q0 * q0;
            const q1Sq = q1 * q1;
            const q2Sq = q2 * q2;
            const q3Sq = q3 * q3;
            const q01 = q0 * q1;
            const q02 = q0 * q2;
            const q03 = q0 * q3;
            const q12 = q1 * q2;
            const q13 = q1 * q3;
            const q23 = q2 * q3;
            const rot_11 = q0Sq + q1Sq - q2Sq - q3Sq;
            const rot_12 = 2 * (q12 - q03);
            const rot_13 = 2 * (q13 + q02);
            const rot_21 = 2 * (q12 + q03);
            const rot_22 = q0Sq - q1Sq + q2Sq - q3Sq;
            const rot_23 = 2 * (q23 - q01);
            const rot_31 = 2 * (q13 - q02);
            const rot_32 = 2 * (q23 + q01);
            const rot_33 = (q0Sq - q1Sq - q2Sq + q3Sq);
            const x = point[0];
            const y = point[1];
            const z = point[2];
            const rotX = rot_11 * x + rot_12 * y + rot_13 * z;
            const rotY = rot_21 * x + rot_22 * y + rot_23 * z;
            const rotZ = rot_31 * x + rot_32 * y + rot_33 * z;
            return out instanceof Float64Array
                ? Vec3Math.set(rotX, rotY, rotZ, out)
                : out.setFromCartesian(Vec3Math.set(rotX, rotY, rotZ, GeoCircle.vec3Cache[2]));
        }
        /**
         * Calculates and returns the set of intersection points between this circle and another one, and writes the results
         * to an array of position vectors.
         * @param other The other circle to test for intersections.
         * @param out An array in which to store the results. The results will be stored at indexes 0 and 1. If these indexes
         * are empty, then new Float64Array objects will be created and inserted into the array.
         * @returns The number of solutions written to the out array. Either 0, 1, or 2.
         */
        intersection(other, out) {
            const center1 = this._center;
            const center2 = other._center;
            const radius1 = this._radius;
            const radius2 = other._radius;
            /**
             * Theory: We can model geo circles as the intersection between a sphere and the unit sphere (Earth's surface).
             * Therefore, the intersection of two geo circles is the intersection between two spheres AND the unit sphere.
             * First, we find the intersection of the two non-Earth spheres (which can either be a sphere, a circle, or a
             * point), then we find the intersection of that geometry with the unit sphere.
             */
            const dot = Vec3Math.dot(center1, center2);
            const dotSquared = dot * dot;
            if (dotSquared === 1) {
                // the two circles are concentric; either there are zero solutions or infinite solutions; either way we don't
                // write any solutions to the array.
                return 0;
            }
            // find the position vector to the center of the circle which defines the intersection of the two geo circle
            // spheres.
            const a = (Math.cos(radius1) - dot * Math.cos(radius2)) / (1 - dotSquared);
            const b = (Math.cos(radius2) - dot * Math.cos(radius1)) / (1 - dotSquared);
            const intersection = Vec3Math.add(Vec3Math.multScalar(center1, a, GeoCircle.vec3Cache[0]), Vec3Math.multScalar(center2, b, GeoCircle.vec3Cache[1]), GeoCircle.vec3Cache[0]);
            const intersectionLengthSquared = Vec3Math.dot(intersection, intersection);
            if (intersectionLengthSquared > 1) {
                // the two geo circle spheres do not intersect.
                return 0;
            }
            const cross = Vec3Math.cross(center1, center2, GeoCircle.vec3Cache[1]);
            const crossLengthSquared = Vec3Math.dot(cross, cross);
            if (crossLengthSquared === 0) {
                // this technically can't happen (since we already check if center1 dot center2 === +/-1 above, but just in
                // case...)
                return 0;
            }
            const offset = Math.sqrt((1 - intersectionLengthSquared) / crossLengthSquared);
            let solutionCount = 1;
            if (!out[0]) {
                out[0] = new Float64Array(3);
            }
            out[0].set(cross);
            Vec3Math.multScalar(out[0], offset, out[0]);
            Vec3Math.add(out[0], intersection, out[0]);
            if (offset > 0) {
                if (!out[1]) {
                    out[1] = new Float64Array(3);
                }
                out[1].set(cross);
                Vec3Math.multScalar(out[1], -offset, out[1]);
                Vec3Math.add(out[1], intersection, out[1]);
                solutionCount++;
            }
            return solutionCount;
        }
        /**
         * Calculates and returns the set of intersection points between this circle and another one, and writes the results
         * to an array of GeoPoint objects.
         * @param other The other circle to test for intersections.
         * @param out An array in which to store the results. The results will be stored at indexes 0 and 1. If these indexes
         * are empty, then new GeoPoint objects will be created and inserted into the array.
         * @returns The number of solutions written to the out array. Either 0, 1, or 2.
         */
        intersectionGeoPoint(other, out) {
            const solutionCount = this.intersection(other, GeoCircle.intersectionCache);
            for (let i = 0; i < solutionCount; i++) {
                if (!out[i]) {
                    out[i] = new GeoPoint(0, 0);
                }
                out[i].setFromCartesian(GeoCircle.intersectionCache[i]);
            }
            return solutionCount;
        }
        /**
         * Calculates and returns the number of intersection points between this circle and another one. Returns NaN if there
         * are an infinite number of intersection points.
         * @param other The other circle to test for intersections.
         * @param tolerance The error tolerance, in great-arc radians, of this operation. Defaults to
         * `GeoCircle.ANGULAR_TOLERANCE` if not specified.
         * @returns the number of intersection points between this circle and the other one.
         */
        numIntersectionPoints(other, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
            const center1 = this.center;
            const center2 = other.center;
            const radius1 = this.radius;
            const radius2 = other.radius;
            const dot = Vec3Math.dot(center1, center2);
            const dotSquared = dot * dot;
            if (dotSquared === 1) {
                // the two circles are concentric; if they are the same circle there are an infinite number of intersections,
                // otherwise there are none.
                if (dot === 1) {
                    // centers are the same
                    return (Math.abs(this.radius - other.radius) <= tolerance) ? NaN : 0;
                }
                else {
                    // centers are antipodal
                    return (Math.abs(Math.PI - this.radius - other.radius) <= tolerance) ? NaN : 0;
                }
            }
            const a = (Math.cos(radius1) - dot * Math.cos(radius2)) / (1 - dotSquared);
            const b = (Math.cos(radius2) - dot * Math.cos(radius1)) / (1 - dotSquared);
            const intersection = Vec3Math.add(Vec3Math.multScalar(center1, a, GeoCircle.vec3Cache[0]), Vec3Math.multScalar(center2, b, GeoCircle.vec3Cache[1]), GeoCircle.vec3Cache[1]);
            const intersectionLengthSquared = Vec3Math.dot(intersection, intersection);
            if (intersectionLengthSquared > 1) {
                return 0;
            }
            const cross = Vec3Math.cross(center1, center2, GeoCircle.vec3Cache[1]);
            const crossLengthSquared = Vec3Math.dot(cross, cross);
            if (crossLengthSquared === 0) {
                return 0;
            }
            const sinTol = Math.sin(tolerance);
            return ((1 - intersectionLengthSquared) / crossLengthSquared > sinTol * sinTol) ? 2 : 1;
        }
        /**
         * Creates a new small circle from a lat/long coordinate pair and radius.
         * @param point The center of the new small circle.
         * @param radius The radius of the new small circle, in great-arc radians.
         * @returns a small circle.
         */
        static createFromPoint(point, radius) {
            return new GeoCircle(GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[0]), radius);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        static createGreatCircle(arg1, arg2) {
            return new GeoCircle(GeoCircle._getGreatCircleNormal(arg1, arg2, GeoCircle.vec3Cache[0]), Math.PI / 2);
        }
        /**
         * Creates a new great circle defined by one point and a bearing offset. The new great circle will be equivalent to
         * the path projected from the point with the specified initial bearing (forward azimuth).
         * @param point A point that lies on the new great circle.
         * @param bearing The initial bearing from the point.
         * @returns a great circle.
         */
        static createGreatCircleFromPointBearing(point, bearing) {
            return new GeoCircle(GeoCircle.getGreatCircleNormalFromPointBearing(point, bearing, GeoCircle.vec3Cache[0]), Math.PI / 2);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        static getGreatCircleNormal(arg1, arg2, out) {
            return GeoCircle._getGreatCircleNormal(arg1, arg2, out);
        }
        /**
         * Calculates a normal vector for a great circle given two points which lie on the circle, or a point and initial bearing.
         * @param arg1 A point that lies on the great circle.
         * @param arg2 A second point that lies on the great circle, or an initial bearing from the first point.
         * @param out The vector to which to write the result.
         * @returns the normal vector for the great circle.
         */
        static _getGreatCircleNormal(arg1, arg2, out) {
            if (typeof arg2 === 'number') {
                return GeoCircle.getGreatCircleNormalFromPointBearing(arg1, arg2, out);
            }
            else {
                return GeoCircle.getGreatCircleNormalFromPoints(arg1, arg2, out);
            }
        }
        /**
         * Calculates a normal vector for a great circle given two points which lie on the cirlce.
         * @param point1 The first point that lies on the great circle.
         * @param point2 The second point that lies on the great circle.
         * @param out The vector to which to write the result.
         * @returns the normal vector for the great circle.
         */
        static getGreatCircleNormalFromPoints(point1, point2, out) {
            if (!(point1 instanceof Float64Array)) {
                point1 = GeoPoint.sphericalToCartesian(point1, GeoCircle.vec3Cache[0]);
            }
            if (!(point2 instanceof Float64Array)) {
                point2 = GeoPoint.sphericalToCartesian(point2, GeoCircle.vec3Cache[1]);
            }
            return Vec3Math.normalize(Vec3Math.cross(point1, point2, out), out);
        }
        /**
         * Calculates a normal vector for a great circle given a point and initial bearing.
         * @param point A point that lies on the great circle.
         * @param bearing The initial bearing from the point.
         * @param out The vector to which to write the result.
         * @returns the normal vector for the great circle.
         */
        static getGreatCircleNormalFromPointBearing(point, bearing, out) {
            if (point instanceof Float64Array) {
                point = GeoCircle.tempGeoPoint.setFromCartesian(point);
            }
            const lat = point.lat * Avionics.Utils.DEG2RAD;
            const long = point.lon * Avionics.Utils.DEG2RAD;
            bearing *= Avionics.Utils.DEG2RAD;
            const sinLat = Math.sin(lat);
            const sinLon = Math.sin(long);
            const cosLon = Math.cos(long);
            const sinBearing = Math.sin(bearing);
            const cosBearing = Math.cos(bearing);
            const x = sinLon * cosBearing - sinLat * cosLon * sinBearing;
            const y = -cosLon * cosBearing - sinLat * sinLon * sinBearing;
            const z = Math.cos(lat) * sinBearing;
            return Vec3Math.set(x, y, z, out);
        }
    }
    GeoCircle.ANGULAR_TOLERANCE = 1e-7; // ~61cm
    GeoCircle.NORTH_POLE = new Float64Array([0, 0, 1]);
    GeoCircle.tempGeoPoint = new GeoPoint(0, 0);
    GeoCircle.vec3Cache = [new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3)];
    GeoCircle.intersectionCache = [new Float64Array(3), new Float64Array(3)];

    /**
     * Navigational mathematics functions.
     */
    class NavMath {
        /**
         * Clamps a value to a min and max.
         * @param val The value to clamp.
         * @param min The minimum value to clamp to.
         * @param max The maximum value to clamp to.
         * @returns The clamped value.
         */
        static clamp(val, min, max) {
            return Math.min(Math.max(val, min), max);
        }
        /**
         * Normalizes a heading to a 0-360 range.
         * @param heading The heading to normalize.
         * @returns The normalized heading.
         */
        static normalizeHeading(heading) {
            if (isFinite(heading)) {
                return (heading % 360 + 360) % 360;
            }
            else {
                console.error(`normalizeHeading: Invalid heading: ${heading}`);
                return NaN;
            }
        }
        /**
         * Gets the turn radius for a given true airspeed.
         * @param airspeedTrue The true airspeed of the plane.
         * @param bankAngle The bank angle of the plane, in degrees.
         * @returns The airplane turn radius.
         */
        static turnRadius(airspeedTrue, bankAngle) {
            return (Math.pow(airspeedTrue, 2) / (11.26 * Math.tan(bankAngle * Avionics.Utils.DEG2RAD)))
                / 3.2808399;
        }
        /**
         * Gets the required bank angle for a given true airspeed and turn radius.
         * @param airspeedTrue The true airspeed of the plane.
         * @param radius The airplane turn radius.
         * @returns The required bank angle, in degrees.
         */
        static bankAngle(airspeedTrue, radius) {
            const airspeedMS = airspeedTrue * 0.51444444;
            return Math.atan(Math.pow(airspeedMS, 2) / (radius * 9.80665)) * Avionics.Utils.RAD2DEG;
        }
        /**
         * Get the turn direction for a given course change.
         * @param startCourse The start course.
         * @param endCourse The end course.
         * @returns The turn direction for the course change.
         */
        static getTurnDirection(startCourse, endCourse) {
            return NavMath.normalizeHeading(endCourse - startCourse) > 180 ? 'left' : 'right';
        }
        /**
         * Converts polar radians to degrees north.
         * @param radians The radians to convert.
         * @returns The angle, in degrees north.
         */
        static polarToDegreesNorth(radians) {
            return NavMath.normalizeHeading((180 / Math.PI) * (Math.PI / 2 - radians));
        }
        /**
         * Converts degrees north to polar radians.
         * @param degrees The degrees to convert.
         * @returns The angle radians, in polar.
         */
        static degreesNorthToPolar(degrees) {
            return NavMath.normalizeHeading(degrees - 90) / (180 / Math.PI);
        }
        /**
         * Calculates the distance along an arc on Earth's surface. The arc begins at the intersection of the great circle
         * passing through the center of a circle of radius `radius` meters in the direction of 'startBearing', and ends at
         * the intersection of the great circle passing through the center of the circle in the direction of 'endBearing',
         * proceeding clockwise (as viewed from above).
         * @param startBearing The degrees of the start of the arc.
         * @param endBearing The degrees of the end of the arc.
         * @param radius The radius of the arc, in meters.
         * @returns The arc distance.
         */
        static calculateArcDistance(startBearing, endBearing, radius) {
            const angularWidth = ((endBearing - startBearing + 360) % 360) * Avionics.Utils.DEG2RAD;
            const conversion = UnitType.GA_RADIAN.convertTo(1, UnitType.METER);
            return angularWidth * Math.sin(radius / conversion) * conversion;
        }
        /**
         * Calculates the intersection of a line and a circle.
         * @param x1 The start x of the line.
         * @param y1 The start y of the line.
         * @param x2 The end x of the line.
         * @param y2 The end y of the line.
         * @param cx The circle center x.
         * @param cy The circle center y.
         * @param r The radius of the circle.
         * @param sRef The reference to the solution object to write the solution to.
         * @returns The number of solutions (0, 1 or 2).
         */
        static circleIntersection(x1, y1, x2, y2, cx, cy, r, sRef) {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const a = dx * dx + dy * dy;
            const b = 2 * (dx * (x1 - cx) + dy * (y1 - cy));
            const c = (x1 - cx) * (x1 - cx) + (y1 - cy) * (y1 - cy) - r * r;
            const det = b * b - 4 * a * c;
            if (a < 0.0000001 || det < 0) {
                sRef.x1 = NaN;
                sRef.x2 = NaN;
                sRef.y1 = NaN;
                sRef.y2 = NaN;
                return 0;
            }
            else if (det == 0) {
                const t = -b / (2 * a);
                sRef.x1 = x1 + t * dx;
                sRef.y1 = y1 + t * dy;
                sRef.x2 = NaN;
                sRef.y2 = NaN;
                return 1;
            }
            else {
                const t1 = ((-b + Math.sqrt(det)) / (2 * a));
                sRef.x1 = x1 + t1 * dx;
                sRef.y1 = y1 + t1 * dy;
                const t2 = ((-b - Math.sqrt(det)) / (2 * a));
                sRef.x2 = x1 + t2 * dx;
                sRef.y2 = y1 + t2 * dy;
                return 2;
            }
        }
        /**
         * Gets the degrees north that a point lies on a circle.
         * @param cx The x point of the center of the circle.
         * @param cy The y point of the center of the circle.
         * @param x The x point to get the bearing for.
         * @param y The y point to get the bearing for.
         * @returns The angle in degrees north that the point is relative to the center.
         */
        static northAngle(cx, cy, x, y) {
            return NavMath.polarToDegreesNorth(Math.atan2(y - cy, x - cx));
        }
        /**
         * Checks if a degrees north bearing is between two other degrees north bearings.
         * @param bearing The bearing in degrees north to check.
         * @param start The start bearing in degrees north.
         * @param end The end bearing, in degrees north.
         * @returns True if the bearing is between the two provided bearings, false otherwise.
         */
        static bearingIsBetween(bearing, start, end) {
            const range = this.normalizeHeading(end - start);
            const relativeBearing = this.normalizeHeading(bearing - start);
            return relativeBearing >= 0 && relativeBearing <= range;
        }
        /**
         * Converts a degrees north heading to a degrees north turn circle angle.
         * @param heading The heading to convert.
         * @param turnDirection The direction of the turn.
         * @returns A degrees north turn circle angle.
         */
        static headingToAngle(heading, turnDirection) {
            return NavMath.normalizeHeading(heading + (turnDirection === 'left' ? 90 : -90));
        }
        /**
         * Converts a degrees north turn circle angle to a degrees north heading.
         * @param angle The turn circle angle to convert.
         * @param turnDirection The direction of the turn.
         * @returns A degrees north heading.
         */
        static angleToHeading(angle, turnDirection) {
            return NavMath.normalizeHeading(angle + (turnDirection === 'left' ? -90 : 90));
        }
        /**
         * Calculates the wind correction angle.
         * @param course The current plane true course.
         * @param airspeedTrue The current plane true airspeed.
         * @param windDirection The direction of the wind, in degrees true.
         * @param windSpeed The current speed of the wind.
         * @returns The calculated wind correction angle.
         */
        static windCorrectionAngle(course, airspeedTrue, windDirection, windSpeed) {
            const currCrosswind = windSpeed * (Math.sin((course * Math.PI / 180) - (windDirection * Math.PI / 180)));
            const windCorrection = 180 * Math.asin(currCrosswind / airspeedTrue) / Math.PI;
            return windCorrection;
        }
        /**
         * Calculates the cross track deviation from the provided leg fixes.
         * @param start The location of the starting fix of the leg.
         * @param end The location of the ending fix of the leg.
         * @param pos The current plane location coordinates.
         * @returns The amount of cross track deviation, in nautical miles.
         */
        static crossTrack(start, end, pos) {
            const path = NavMath.geoCircleCache[0].setAsGreatCircle(start, end);
            if (isNaN(path.center[0])) {
                return NaN;
            }
            return UnitType.GA_RADIAN.convertTo(path.distance(pos), UnitType.NMILE);
        }
        /**
         * Calculates the along-track distance from a starting point to another point along a great-circle track running
         * through the starting point.
         * @param start The start of the great-circle track.
         * @param end The end of the great-circle track.
         * @param pos The point for which to calculate the along-track distance.
         * @returns The along-track distance, in nautical miles.
         */
        static alongTrack(start, end, pos) {
            const path = NavMath.geoCircleCache[0].setAsGreatCircle(start, end);
            if (isNaN(path.center[0])) {
                return NaN;
            }
            const distance = path.distanceAlong(start, path.closest(pos, NavMath.vec3Cache[0]));
            return UnitType.GA_RADIAN.convertTo((distance + Math.PI) % (2 * Math.PI) - Math.PI, UnitType.NMILE);
        }
        /**
         * Calculates the desired track from the provided leg fixes.
         * @param start The location of the starting fix of the leg.
         * @param end The location of the ending fix of the leg.
         * @param pos The current plane location coordinates.
         * @returns The desired track, in degrees true.
         */
        static desiredTrack(start, end, pos) {
            const path = NavMath.geoCircleCache[0].setAsGreatCircle(start, end);
            if (isNaN(path.center[0])) {
                return NaN;
            }
            return path.bearingAt(path.closest(pos, NavMath.vec3Cache[0]));
        }
        /**
         * Gets the desired track for a given arc.
         * @param center The center of the arc.
         * @param turnDirection The direction of the turn.
         * @param pos The current plane position.
         * @returns The desired track.
         */
        static desiredTrackArc(center, turnDirection, pos) {
            const northAngle = NavMath.geoPointCache[0].set(pos).bearingFrom(center);
            //TODO: Clamp the arc angle to the start and end angles
            return NavMath.angleToHeading(northAngle, turnDirection);
        }
        /**
         * Gets the percentage along the arc path that the plane currently is.
         * @param start The start of the arc, in degrees north.
         * @param end The end of the arc, in degrees north.
         * @param center The center location of the arc.
         * @param turnDirection The direction of the turn.
         * @param pos The current plane position.
         * @returns The percentage along the arc the plane is.
         */
        static percentAlongTrackArc(start, end, center, turnDirection, pos) {
            const bearingFromCenter = NavMath.geoPointCache[0].set(center).bearingTo(pos);
            const sign = turnDirection === 'right' ? 1 : -1;
            const alpha = ((end - start) * sign + 360) % 360;
            const mid = (start + alpha / 2 * sign + 360) % 360;
            const rotBearing = ((bearingFromCenter - mid) + 540) % 360 - 180;
            const frac = rotBearing * sign / alpha + 0.5;
            return frac;
        }
        /**
         * Gets a position given an arc and a distance from the arc start.
         * @param start The start bearing of the arc.
         * @param center The center of the arc.
         * @param radius The radius of the arc.
         * @param turnDirection The turn direction for the arc.
         * @param distance The distance along the arc to get the position for.
         * @param out The position to write to.
         * @returns The position along the arc that was written to.
         */
        static positionAlongArc(start, center, radius, turnDirection, distance, out) {
            const convertedRadius = UnitType.GA_RADIAN.convertTo(Math.sin(UnitType.METER.convertTo(radius, UnitType.GA_RADIAN)), UnitType.METER);
            const theta = UnitType.RADIAN.convertTo(distance / convertedRadius, UnitType.DEGREE);
            const bearing = turnDirection === 'right' ? start + theta : start - theta;
            center.offset(NavMath.normalizeHeading(bearing), UnitType.METER.convertTo(radius, UnitType.GA_RADIAN), out);
            return out;
        }
        /**
         * Gets the cross track distance for a given arc.
         * @param center The center of the arc.
         * @param radius The radius of the arc, in meters.
         * @param pos The current plane position.
         * @returns The cross track distance, in NM.
         */
        static crossTrackArc(center, radius, pos) {
            return UnitType.METER.convertTo(radius, UnitType.NMILE) - UnitType.GA_RADIAN.convertTo(NavMath.geoPointCache[0].set(pos).distance(center), UnitType.NMILE);
        }
        /**
         * Gets the total difference in degrees between two angles.
         * @param a The first angle.
         * @param b The second angle.
         * @returns The difference between the two angles, in degrees.
         */
        static diffAngle(a, b) {
            let diff = b - a;
            while (diff > 180) {
                diff -= 360;
            }
            while (diff <= -180) {
                diff += 360;
            }
            return diff;
        }
        /**
         * Finds side a given sides b, c, and angles beta, gamma.
         * @param b The length of side b, as a trigonometric ratio.
         * @param c The length of side c, as a trigonometric ratio.
         * @param beta The angle, in radians, of the opposite of side b.
         * @param gamma The angle, in radians, of the opposite of side c
         * @returns The length of side a, as a trigonometric ratio.
         */
        static napierSide(b, c, beta, gamma) {
            return 2 * Math.atan(Math.tan(0.5 * (b - c))
                * (Math.sin(0.5 * (beta + gamma)) / Math.sin(0.5 * (beta - gamma))));
        }
        /**
         * Calculates a normal vector to a provided course in degrees north.
         * @param course The course in degrees north.
         * @param turnDirection The direction of the turn to orient the normal.
         * @param outVector The normal vector for the provided course.
         */
        static normal(course, turnDirection, outVector) {
            const normalCourse = NavMath.headingToAngle(course, turnDirection);
            const polarCourse = NavMath.degreesNorthToPolar(normalCourse);
            outVector[0] = Math.cos(polarCourse);
            outVector[1] = Math.sin(polarCourse);
        }
    }
    NavMath.vec3Cache = [new Float64Array(3)];
    NavMath.geoPointCache = [new GeoPoint(0, 0), new GeoPoint(0, 0)];
    NavMath.geoCircleCache = [new GeoCircle(new Float64Array(3), 0)];

    /// <reference types="msfstypes/Coherent/Facilities" />
    /**
     * A utility class for working with magnetic variation (magnetic declination).
     */
    class MagVar {
        // eslint-disable-next-line jsdoc/require-jsdoc
        static get(arg1, arg2) {
            return MagVar.getMagVar(arg1, arg2);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        static magneticToTrue(bearing, arg1, arg2) {
            return NavMath.normalizeHeading(bearing + (typeof arg1 === 'number' && arg2 === undefined ? arg1 : MagVar.getMagVar(arg1, arg2)));
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        static trueToMagnetic(bearing, arg1, arg2) {
            return NavMath.normalizeHeading(bearing - (typeof arg1 === 'number' && arg2 === undefined ? arg1 : MagVar.getMagVar(arg1, arg2)));
        }
        /**
         * Gets the magnetic variation (magnetic declination) at a specific point on Earth.
         * @param arg1 The query point, or the latitude of the query point.
         * @param arg2 The longitude of the query point.
         * @returns The magnetic variation (magnetic declination) at the point.
         */
        static getMagVar(arg1, arg2) {
            if (typeof Facilities === 'undefined') {
                // In case this code is executed before the Facilities class is created.
                return 0;
            }
            let lat, lon;
            if (typeof arg1 === 'number') {
                lat = arg1;
                lon = arg2;
            }
            else {
                lat = arg1.lat;
                lon = arg1.lon;
            }
            return Facilities.getMagVar(lat, lon);
        }
    }

    /**
     * A Subject which provides a {@link GeoPointInterface} value.
     */
    class GeoPointSubject extends AbstractSubscribable {
        /**
         * Constructor.
         * @param value The value of this subject.
         */
        constructor(value) {
            super();
            this.value = value;
            /** @inheritdoc */
            this.isMutableSubscribable = true;
        }
        /**
         * Creates a GeoPointSubject.
         * @param initialVal The initial value.
         * @returns A GeoPointSubject.
         */
        static create(initialVal) {
            return new GeoPointSubject(initialVal);
        }
        /**
         * Creates a GeoPointSubject.
         * @param initialVal The initial value.
         * @returns A GeoPointSubject.
         * @deprecated Use `GeoPointSubject.create()` instead.
         */
        static createFromGeoPoint(initialVal) {
            return new GeoPointSubject(initialVal);
        }
        /** @inheritdoc */
        get() {
            return this.value.readonly;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        set(arg1, arg2) {
            const isArg1Number = typeof arg1 === 'number';
            const equals = isArg1Number ? this.value.equals(arg1, arg2) : this.value.equals(arg1);
            if (!equals) {
                isArg1Number ? this.value.set(arg1, arg2) : this.value.set(arg1);
                this.notify();
            }
        }
    }

    /**
     * A partial implementation of a MutableGeoProjection. Subclasses should use the projectRaw() and invertRaw() methods
     * to define the type of projection to be implemented.
     */
    class AbstractGeoProjection {
        constructor() {
            this.center = new GeoPoint(0, 0);
            this.centerTranslation = new Float64Array(2);
            this.scaleFactor = UnitType.GA_RADIAN.convertTo(1, UnitType.NMILE); // 1 pixel = 1 nautical mile
            this.preRotation = new Float64Array(3);
            this.translation = new Float64Array(2);
            this.postRotation = 0;
            this.rotationSin = 0;
            this.rotationCos = 1;
            this.reflectY = 1;
            this.preRotationForwardTransform = new Transform3D();
            this.preRotationReverseTransform = new Transform3D();
            this.rotationCache = [new Transform3D(), new Transform3D()];
        }
        /** @inheritdoc */
        getCenter() {
            return this.center.readonly;
        }
        /** @inheritdoc */
        getScaleFactor() {
            return this.scaleFactor;
        }
        /** @inheritdoc */
        getPreRotation() {
            return this.preRotation;
        }
        /** @inheritdoc */
        getTranslation() {
            return this.translation;
        }
        /** @inheritdoc */
        getPostRotation() {
            return this.postRotation;
        }
        /** @inheritdoc */
        getReflectY() {
            return this.reflectY === -1;
        }
        /** @inheritdoc */
        setCenter(point) {
            this.center.set(point);
            this.updateCenterTranslation();
            return this;
        }
        /** @inheritdoc */
        setScaleFactor(factor) {
            this.scaleFactor = factor;
            return this;
        }
        /** @inheritdoc */
        setPreRotation(vec) {
            this.preRotation.set(vec);
            this.updatePreRotationTransforms();
            this.updateCenterTranslation();
            return this;
        }
        /** @inheritdoc */
        setTranslation(vec) {
            this.translation.set(vec);
            return this;
        }
        /** @inheritdoc */
        setPostRotation(rotation) {
            this.postRotation = rotation;
            this.rotationCos = Math.cos(rotation);
            this.rotationSin = Math.sin(rotation);
            return this;
        }
        /** @inheritdoc */
        setReflectY(val) {
            this.reflectY = val ? -1 : 1;
            return this;
        }
        /** @inheritdoc */
        copyParametersFrom(other) {
            return this.setCenter(other.getCenter())
                .setPreRotation(other.getPreRotation())
                .setScaleFactor(other.getScaleFactor())
                .setTranslation(other.getTranslation())
                .setPostRotation(other.getPostRotation())
                .setReflectY(other.getReflectY());
        }
        /**
         * Updates the pre-rotation transformation matrices.
         */
        updatePreRotationTransforms() {
            const phi = this.preRotation[1];
            const gamma = this.preRotation[2];
            this.rotationCache[0].toRotationX(gamma);
            this.rotationCache[1].toRotationY(-phi);
            Transform3D.concat(this.preRotationForwardTransform, this.rotationCache);
            this.preRotationReverseTransform.set(this.preRotationForwardTransform);
            this.preRotationReverseTransform.invert();
        }
        /**
         * Updates the translation vector to move the center of this projection to the origin.
         */
        updateCenterTranslation() {
            const centerArray = AbstractGeoProjection.vec2Cache[0];
            centerArray[0] = this.center.lon;
            centerArray[1] = this.center.lat;
            this.preRotateForward(centerArray, centerArray);
            this.projectRaw(centerArray, this.centerTranslation);
        }
        /**
         * Applies a forward rotation to a set of lat/lon coordinates using this projection's pre-projection rotation angles.
         * @param vec - the lat/lon coordinates to rotate, as a vector ([long, lat]).
         * @param out - the vector to which to write the result.
         * @returns the rotated lat/lon coordinates.
         */
        preRotateForward(vec, out) {
            const lambda = this.preRotation[0];
            const phi = this.preRotation[1];
            const gamma = this.preRotation[2];
            if (lambda === 0 && phi === 0 && gamma === 0) {
                out.set(vec);
                return out;
            }
            const lat = vec[1];
            const lon = vec[0];
            const rotatedLon = ((lon + lambda * Avionics.Utils.RAD2DEG) % 360 + 540) % 360 - 180; // enforce [-180, 180)
            if (phi === 0 && gamma === 0) {
                return Vec2Math.set(rotatedLon, lat, out);
            }
            const cartesianVec = GeoPoint.sphericalToCartesian(lat, rotatedLon, AbstractGeoProjection.vec3Cache[0]);
            const rotatedCartesianVec = this.preRotationForwardTransform.apply(cartesianVec, cartesianVec);
            const rotated = AbstractGeoProjection.geoPointCache[0].setFromCartesian(rotatedCartesianVec);
            return Vec2Math.set(rotated.lon, rotated.lat, out);
        }
        /**
         * Applies a reverse rotation to a set of lat/lon coordinates using this projection's pre-projection rotation angles.
         * @param vec - the lat/lon coordinates to rotate, as a vector ([long, lat]).
         * @param out - the vector to which to write the result.
         * @returns the rotated lat/lon coordinates.
         */
        preRotateReverse(vec, out) {
            const lambda = this.preRotation[0];
            const phi = this.preRotation[1];
            const gamma = this.preRotation[2];
            if (lambda === 0 && phi === 0 && gamma === 0) {
                out.set(vec);
                return out;
            }
            const lat = vec[1];
            const lon = vec[0];
            let rotatedLat = lat;
            let rotatedLon = lon;
            if (phi !== 0 || gamma !== 0) {
                const rotatedCartesianVec = GeoPoint.sphericalToCartesian(rotatedLat, rotatedLon, AbstractGeoProjection.vec3Cache[0]);
                const cartesianVec = this.preRotationReverseTransform.apply(rotatedCartesianVec, rotatedCartesianVec);
                const unrotated = AbstractGeoProjection.geoPointCache[0].setFromCartesian(cartesianVec);
                rotatedLat = unrotated.lat;
                rotatedLon = unrotated.lon;
            }
            rotatedLon = ((rotatedLon - lambda * Avionics.Utils.RAD2DEG) % 360 + 540) % 360 - 180; // enforce [-180, 180)
            return Vec2Math.set(rotatedLon, rotatedLat, out);
        }
        /** @inheritdoc */
        project(point, out) {
            if (point instanceof Float64Array) {
                out.set(point);
            }
            else {
                out[0] = point.lon;
                out[1] = point.lat;
            }
            this.preRotateForward(out, out);
            this.projectRaw(out, out);
            // translate projected center point to origin
            out[0] -= this.centerTranslation[0];
            out[1] -= this.centerTranslation[1];
            // apply y-reflection
            out[1] *= this.reflectY;
            // apply scale factor
            out[0] *= this.scaleFactor;
            out[1] *= this.scaleFactor;
            // apply post-projection rotation
            const x = out[0];
            const y = out[1];
            out[0] = x * this.rotationCos - y * this.rotationSin;
            out[1] = x * this.rotationSin + y * this.rotationCos;
            // apply post-projection translation
            out[0] += this.translation[0];
            out[1] += this.translation[1];
            return out;
        }
        /** @inheritdoc */
        invert(vec, out) {
            const projected = AbstractGeoProjection.vec2Cache[0];
            projected.set(vec);
            // invert post-projection translation
            projected[0] -= this.translation[0];
            projected[1] -= this.translation[1];
            // invert post-projection rotation
            const x = projected[0];
            const y = projected[1];
            projected[0] = x * this.rotationCos + y * this.rotationSin;
            projected[1] = -x * this.rotationSin + y * this.rotationCos;
            // invert scale factor
            projected[0] /= this.scaleFactor;
            projected[1] /= this.scaleFactor;
            // invert y-reflection
            projected[1] *= this.reflectY;
            // translate projected center point to default projected position
            projected[0] += this.centerTranslation[0];
            projected[1] += this.centerTranslation[1];
            const inverted = this.invertRaw(projected, projected);
            this.preRotateReverse(inverted, inverted);
            if (out instanceof Float64Array) {
                out.set(inverted);
                return out;
            }
            else {
                return out.set(inverted[1], inverted[0]);
            }
        }
    }
    AbstractGeoProjection.vec2Cache = [new Float64Array(2)];
    AbstractGeoProjection.vec3Cache = [new Float64Array(3)];
    AbstractGeoProjection.geoPointCache = [new GeoPoint(0, 0)];
    /**
     * A Mercator projection.
     */
    class MercatorProjection extends AbstractGeoProjection {
        /**
         * Applies a raw projection.
         * @param vec - a [lon, lat] vector describing the geographic point to project.
         * @param out - a 2D vector to which to write the result.
         * @returns the projected point.
         */
        projectRaw(vec, out) {
            out[0] = vec[0] * Avionics.Utils.DEG2RAD;
            out[1] = Math.log(Math.tan((90 + vec[1]) * Avionics.Utils.DEG2RAD / 2));
            return out;
        }
        /**
         * Inverts a raw projection.
         * @param vec - a 2D vector describing the projected point to invert.
         * @param out - a 2D vector to which to write the result.
         * @returns the inverted point.
         */
        invertRaw(vec, out) {
            out[0] = vec[0] * Avionics.Utils.RAD2DEG;
            out[1] = 2 * Math.atan(Math.exp(vec[1])) * Avionics.Utils.RAD2DEG - 90;
            return out;
        }
    }

    /**
     * Resamples projected great- and small-circle paths between defined endpoints into series of straight line segments and circular arcs.
     */
    class GeoCircleResampler {
        /**
         * Constructor.
         * @param minDistance The minimum great-circle distance this resampler enforces between two adjacent resampled
         * points, in great-arc radians.
         * @param dpTolerance The Douglas-Peucker tolerance, in pixels, this resampler uses when deciding whether to discard
         * a resampled point during the simplification process.
         * @param maxDepth The maximum depth of the resampling algorithm used by this resampler. The number of resampled
         * points is bounded from above by `2^[maxDepth] - 1`.
         */
        constructor(minDistance, dpTolerance, maxDepth) {
            this.minDistance = minDistance;
            this.dpTolerance = dpTolerance;
            this.maxDepth = maxDepth;
            this.geoPointCache = [new GeoPoint(0, 0), new GeoPoint(0, 0)];
            this.vec2Cache = [new Float64Array(2), new Float64Array(2), new Float64Array(2)];
            this.vec3Cache = [new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3)];
            this.startVector = {
                type: 'start',
                point: new GeoPoint(0, 0),
                projected: new Float64Array(2),
                index: 0
            };
            this.lineVector = {
                type: 'line',
                point: new GeoPoint(0, 0),
                projected: new Float64Array(2),
                index: 0
            };
            this.arcVector = {
                type: 'arc',
                point: new GeoPoint(0, 0),
                projected: new Float64Array(2),
                projectedArcCenter: new Float64Array(2),
                projectedArcRadius: 0,
                projectedArcStartAngle: 0,
                projectedArcEndAngle: 0,
                index: 0
            };
            this.state = {
                index: 0,
                prevX: 0,
                prevY: 0,
                vectorType: 'line',
                arcCenterX: 0,
                arcCenterY: 0,
                arcRadius: 0,
                isArcCounterClockwise: false
            };
            this.cosMinDistance = Math.cos(minDistance);
            this.dpTolSq = dpTolerance * dpTolerance;
        }
        /**
         * Resamples a projected great- or small-circle path.
         * @param projection The projection to use.
         * @param circle The geo circle along which the path lies.
         * @param start The start of the path.
         * @param end The end of the path.
         * @param handler A function to handle the resampled points. The function is called once for each resampled point,
         * in order.
         */
        resample(projection, circle, start, end, handler) {
            let startPoint, startVec, endPoint, endVec;
            if (start instanceof Float64Array) {
                startPoint = this.geoPointCache[0].setFromCartesian(start);
                startVec = start;
            }
            else {
                startPoint = start;
                startVec = GeoPoint.sphericalToCartesian(start, this.vec3Cache[0]);
            }
            if (end instanceof Float64Array) {
                endPoint = this.geoPointCache[0].setFromCartesian(end);
                endVec = end;
            }
            else {
                endPoint = end;
                endVec = GeoPoint.sphericalToCartesian(end, this.vec3Cache[1]);
            }
            const startLat = startPoint.lat;
            const startLon = startPoint.lon;
            const endLat = endPoint.lat;
            const endLon = endPoint.lon;
            const startProjected = projection.project(start, this.vec2Cache[0]);
            const endProjected = projection.project(end, this.vec2Cache[1]);
            const startX = startProjected[0];
            const startY = startProjected[1];
            const endX = endProjected[0];
            const endY = endProjected[1];
            this.startVector.point.set(startLat, startLon);
            Vec2Math.copy(startProjected, this.startVector.projected);
            handler(this.startVector);
            this.state.index = 1;
            this.state.prevX = startX;
            this.state.prevY = startY;
            this.state.vectorType = 'line';
            const state = this.resampleHelper(projection, circle, startLat, startLon, startVec[0], startVec[1], startVec[2], startX, startY, endLat, endLon, endVec[0], endVec[1], endVec[2], endX, endY, handler, 0, this.state);
            this.callHandler(handler, endLat, endLon, endX, endY, state);
        }
        /**
         * Resamples a projected great- or small-circle path. This method will recursively split the path into two halves
         * and resample the midpoint. Based on the projected position of the midpoint relative to those of the start and end
         * points, the projected path is modeled as either a straight line from the start to the end or a circular arc
         * connecting the start, end, and midpoints. Recursion continues as long as the maximum depth has not been reached
         * and at least one of the following conditions is met:
         * * The distance from the midpoint to the endpoints is greater than or equal to the minimum resampling distance.
         * * If the path is modeled as a line: the distance from the projected midpoint to the model line is greater than
         * this resampler's Douglas-Peucker tolerance.
         * * If the path is modeled as an arc: the distance from the projected one-quarter or the three-quarter point along
         * the path to the model arc is greater than this resampler's Douglas-Peucker tolerance.
         * @param projection The projection to use.
         * @param circle The geo circle along which the path lies.
         * @param lat1 The latitude of the start of the path, in degrees.
         * @param lon1 The longitude of the start of the path, in degrees.
         * @param x1 The x-component of the Cartesian position vector of the start of the path.
         * @param y1 The y-component of the Cartesian position vector of the start of the path.
         * @param z1 The z-component of the Cartesian position vector of the start of the path.
         * @param projX1 The x-component of the projected location of the start of the path, in pixels.
         * @param projY1 The y-component of the projected location of the start of the path, in pixels.
         * @param lat2 The latitude of the end of the path, in degrees.
         * @param lon2 The longitude of the end of the path, in degrees.
         * @param x2 The x-component of the Cartesian position vector of the end of the path.
         * @param y2 The y-component of the Cartesian position vector of the end of the path.
         * @param z2 The z-component of the Cartesian position vector of the end of the path.
         * @param projX2 The x-component of the projected location of the end of the path, in pixels.
         * @param projY2 The y-component of the projected location of the end of the path, in pixels.
         * @param handler A function to handle the resampled points.
         * @param depth The current depth of the resampling algorithm.
         * @param state The current state of the resampling algorithm.
         * @returns The index of the next resampled point.
         */
        resampleHelper(projection, circle, lat1, lon1, x1, y1, z1, projX1, projY1, lat2, lon2, x2, y2, z2, projX2, projY2, handler, depth, state) {
            if (depth >= this.maxDepth) {
                return state;
            }
            const startVec = Vec3Math.set(x1, y1, z1, this.vec3Cache[0]);
            const endVec = Vec3Math.set(x2, y2, z2, this.vec3Cache[1]);
            const angularWidth = circle.angleAlong(startVec, endVec, Math.PI);
            if (angularWidth <= GeoCircle.ANGULAR_TOLERANCE) {
                return state;
            }
            const midVec = circle.offsetAngleAlong(startVec, angularWidth / 2, this.vec3Cache[2]);
            const startProjected = Vec2Math.set(projX1, projY1, this.vec2Cache[0]);
            const endProjected = Vec2Math.set(projX2, projY2, this.vec2Cache[1]);
            const deltaProjected = Vec2Math.sub(endProjected, startProjected, this.vec2Cache[2]);
            const deltaProjectedDot = Vec2Math.dot(deltaProjected, deltaProjected);
            const midPoint = this.geoPointCache[0].setFromCartesian(midVec);
            const midProjected = projection.project(midPoint, this.vec2Cache[2]);
            const lat0 = midPoint.lat;
            const lon0 = midPoint.lon;
            const x0 = midVec[0];
            const y0 = midVec[1];
            const z0 = midVec[2];
            const projX0 = midProjected[0];
            const projY0 = midProjected[1];
            const A = projX2 - projX1;
            const B = projY2 - projY1;
            const C = projX1 * projX1 - projX2 * projX2 + projY1 * projY1 - projY2 * projY2;
            const D = projX0 - projX1;
            const E = projY0 - projY1;
            const F = projX1 * projX1 - projX0 * projX0 + projY1 * projY1 - projY0 * projY0;
            // Calculate the Douglas-Peucker metric
            const det = 2 * (A * E - B * D);
            const dpDisSq = (det * det / 4) / deltaProjectedDot;
            if (dpDisSq > this.dpTolSq) {
                // Attempt to model the projected path with an arc
                // Find the center of circle containing the arc passing through the projected start, end, and mid points.
                const arcCenterX = (B * F - C * E) / det;
                const arcCenterY = (C * D - A * F) / det;
                const arcRadius = Math.hypot(arcCenterX - projX1, arcCenterY - projY1);
                const startToEndVec = Vec3Math.set(A, B, 0, this.vec3Cache[3]);
                const centerToMidVec = Vec3Math.set(projX0 - arcCenterX, projY0 - arcCenterY, 0, this.vec3Cache[4]);
                const cross = Vec3Math.cross(startToEndVec, centerToMidVec, this.vec3Cache[4]);
                state.vectorType = 'arc';
                state.arcCenterX = arcCenterX;
                state.arcCenterY = arcCenterY;
                state.arcRadius = arcRadius;
                state.isArcCounterClockwise = cross[2] > 0;
            }
            else {
                state.vectorType = 'line';
            }
            const cosDistance = Vec3Math.dot(startVec, midVec);
            if (cosDistance > this.cosMinDistance) { // cosine of distance increases with decreasing distance
                // We are below the minimum distance required to continue resampling -> decide if we need to continue or if
                // the path can satisfactorily be modeled as either a straight line or a circular arc.
                if (state.vectorType === 'line') {
                    // The path can be modeled as a line.
                    return state;
                }
                // To find whether the path can be modeled as an arc, we need to project the one-quarter and three-quarter points
                // along the path and find the projected points' distances from the arc modeled above. If the distances are
                // within the D-P tolerance, then the path can be modeled as an arc.
                const query = circle.offsetAngleAlong(startVec, angularWidth / 4, this.geoPointCache[0]);
                const projectedQuery = projection.project(query, this.vec2Cache[0]);
                let distance = Math.hypot(projectedQuery[0] - state.arcCenterX, projectedQuery[1] - state.arcCenterY);
                if ((distance - state.arcRadius) * (distance - state.arcRadius) <= this.dpTolSq) {
                    circle.offsetAngleAlong(startVec, 3 * angularWidth / 4, query);
                    projection.project(query, projectedQuery);
                    distance = Math.hypot(projectedQuery[0] - state.arcCenterX, projectedQuery[1] - state.arcCenterY);
                    if ((distance - state.arcRadius) * (distance - state.arcRadius) <= this.dpTolSq) {
                        return state;
                    }
                }
            }
            state = this.resampleHelper(projection, circle, lat1, lon1, x1, y1, z1, projX1, projY1, lat0, lon0, x0, y0, z0, projX0, projY0, handler, depth + 1, state);
            this.callHandler(handler, lat0, lon0, projX0, projY0, state);
            state.index++;
            state.prevX = projX0;
            state.prevY = projY0;
            return this.resampleHelper(projection, circle, lat0, lon0, x0, y0, z0, projX0, projY0, lat2, lon2, x2, y2, z2, projX2, projY2, handler, depth + 1, state);
        }
        /**
         * Calls a handler function for a resampled point.
         * @param handler The handler function to call.
         * @param lat The latitude of the resampled point, in degrees.
         * @param lon The longitude of the resampled point, in degrees.
         * @param projX The x-coordinate of the projected resampled point, in pixels.
         * @param projY The y-coordinate of the projected resampled point, in pixels.
         * @param state The current state of the resampling algorithm.
         */
        callHandler(handler, lat, lon, projX, projY, state) {
            let vector;
            if (state.vectorType === 'line') {
                vector = this.lineVector;
            }
            else {
                vector = this.arcVector;
                Vec2Math.set(state.arcCenterX, state.arcCenterY, vector.projectedArcCenter);
                vector.projectedArcRadius = state.arcRadius;
                vector.projectedArcStartAngle = Math.atan2(state.prevY - state.arcCenterY, state.prevX - state.arcCenterX);
                vector.projectedArcEndAngle = Math.atan2(projY - state.arcCenterY, projX - state.arcCenterX);
                if (vector.projectedArcEndAngle < vector.projectedArcStartAngle !== state.isArcCounterClockwise) {
                    vector.projectedArcEndAngle += state.isArcCounterClockwise ? -MathUtils.TWO_PI : MathUtils.TWO_PI;
                }
            }
            vector.point.set(lat, lon);
            Vec2Math.set(projX, projY, vector.projected);
            vector.index = state.index;
            handler(vector);
        }
    }

    /**
     * The possible reference norths for navigation angle units.
     */
    var NavAngleUnitReferenceNorth;
    (function (NavAngleUnitReferenceNorth) {
        NavAngleUnitReferenceNorth["True"] = "true";
        NavAngleUnitReferenceNorth["Magnetic"] = "magnetic";
    })(NavAngleUnitReferenceNorth || (NavAngleUnitReferenceNorth = {}));
    /**
     * A navigation angle unit, which is a measure of angular degrees relative to either true or magnetic north.
     *
     * Unlike most other unit types, each instance of navigation angle unit contains state specific to that instance,
     * namely the location used to retrieve magnetic variation for conversions. Therefore, it is generally recommended
     * not to re-use the same NavAngleUnit instance to instantiate multiple NumberUnits.
     *
     * Conversions use the location of the NavAngleUnit instance whose conversion method is called; this also means that
     * when using `NumberUnit.asUnit()`, the location of the unit of the NumberUnit whose `asUnit()` method was called
     * will be used.
     */
    class NavAngleUnit extends AbstractUnit {
        // eslint-disable-next-line jsdoc/require-jsdoc
        constructor(type, arg1, arg2) {
            super(type === NavAngleUnitReferenceNorth.True ? 'true bearing' : 'magnetic bearing');
            /** @inheritdoc */
            this.family = NavAngleUnit.FAMILY;
            /** This location used to retrieve magnetic variation for conversions related to this unit. */
            this.location = new GeoPoint(0, 0);
            typeof arg1 === 'number' ? this.location.set(arg1, arg2) : this.location.set(arg1);
        }
        /**
         * Checks whether this nav angle unit is relative to magnetic north.
         * @returns Whether this nav angle unit is relative to magnetic north.
         */
        isMagnetic() {
            return this.name === 'magnetic bearing';
        }
        /**
         * Converts a value of this unit to another unit. This unit's location is used for the conversion.
         * @param value The value to convert.
         * @param toUnit The unit to which to convert.
         * @returns The converted value.
         * @throws Error if attempting an invalid conversion.
         */
        convertTo(value, toUnit) {
            if (!this.canConvert(toUnit)) {
                throw new Error(`Invalid conversion from ${this.name} to ${toUnit.name}.`);
            }
            if (!isFinite(value)) {
                return NaN;
            }
            if (toUnit.name === this.name) {
                return value;
            }
            return this.isMagnetic() ? MagVar.magneticToTrue(value, this.location) : MagVar.trueToMagnetic(value, this.location);
        }
        /**
         * Converts a value of another unit to this unit. This unit's location is used for the conversion.
         * @param value The value to convert.
         * @param fromUnit The unit from which to convert.
         * @returns The converted value.
         * @throws Error if attempting an invalid conversion.
         */
        convertFrom(value, fromUnit) {
            if (!this.canConvert(fromUnit)) {
                throw new Error(`Invalid conversion from ${fromUnit.name} to ${this.name}.`);
            }
            if (!isFinite(value)) {
                return NaN;
            }
            if (fromUnit.name === this.name) {
                return value;
            }
            return this.isMagnetic() ? MagVar.trueToMagnetic(value, this.location) : MagVar.magneticToTrue(value, this.location);
        }
        /** @inheritdoc */
        equals(other) {
            return other instanceof NavAngleUnit && this.name === other.name && this.location.equals(other.location);
        }
        /**
         * Creates an instance of NavAngleUnit. The location of the unit is initialized to {0 N, 0 E}.
         * @param isMagnetic Whether the new unit is relative to magnetic north.
         * @returns An instance of NavAngleUnit.
         */
        static create(isMagnetic) {
            return new NavAngleUnit(isMagnetic ? NavAngleUnitReferenceNorth.Magnetic : NavAngleUnitReferenceNorth.True, 0, 0);
        }
    }
    NavAngleUnit.FAMILY = 'navangle';

    // Common definitions relevant to all radio types.
    /** The basic radio types. */
    var RadioType;
    (function (RadioType) {
        RadioType["Com"] = "COM";
        RadioType["Nav"] = "NAV";
        RadioType["Adf"] = "ADF";
    })(RadioType || (RadioType = {}));
    /** The two frequency "banks", active and standby. */
    var FrequencyBank;
    (function (FrequencyBank) {
        FrequencyBank[FrequencyBank["Active"] = 0] = "Active";
        FrequencyBank[FrequencyBank["Standby"] = 1] = "Standby";
    })(FrequencyBank || (FrequencyBank = {}));
    /** COM frequency spacing on COM radios. */
    var ComSpacing;
    (function (ComSpacing) {
        /** 25Khz spacing */
        ComSpacing[ComSpacing["Spacing25Khz"] = 0] = "Spacing25Khz";
        /** 8.33Khz spacing */
        ComSpacing[ComSpacing["Spacing833Khz"] = 1] = "Spacing833Khz";
    })(ComSpacing || (ComSpacing = {}));

    /// <reference types="msfstypes/JS/simvar" />
    new Map([
        ['nav_obs_1', { name: 'NAV OBS:1', type: SimVarValueType.Degree }],
        ['nav_cdi_1', { name: 'NAV CDI:1', type: SimVarValueType.Number }],
        ['nav_dme_1', { name: 'NAV DME:1', type: SimVarValueType.NM }],
        ['nav_has_dme_1', { name: 'NAV HAS DME:1', type: SimVarValueType.Bool }],
        ['nav_has_nav_1', { name: 'NAV HAS NAV:1', type: SimVarValueType.Bool }],
        ['nav_radial_1', { name: 'NAV RADIAL:1', type: SimVarValueType.Radians }],
        ['nav_signal_1', { name: 'NAV SIGNAL:1', type: SimVarValueType.Number }],
        ['nav_ident_1', { name: 'NAV IDENT:1', type: SimVarValueType.String }],
        ['nav_to_from_1', { name: 'NAV TOFROM:1', type: SimVarValueType.Enum }],
        ['nav_localizer_1', { name: 'NAV HAS LOCALIZER:1', type: SimVarValueType.Bool }],
        ['nav_localizer_crs_1', { name: 'NAV LOCALIZER:1', type: SimVarValueType.Number }],
        ['nav_glideslope_1', { name: 'NAV HAS GLIDE SLOPE:1', type: SimVarValueType.Bool }],
        ['nav_gs_error_1', { name: 'NAV GLIDE SLOPE ERROR:1', type: SimVarValueType.Degree }],
        ['nav_raw_gs_1', { name: 'NAV RAW GLIDE SLOPE:1', type: SimVarValueType.Degree }],
        ['nav_gs_lla_1', { name: 'NAV GS LATLONALT:1', type: SimVarValueType.LLA }],
        ['nav_lla_1', { name: 'NAV VOR LATLONALT:1', type: SimVarValueType.LLA }],
        ['nav_magvar_1', { name: 'NAV MAGVAR:1', type: SimVarValueType.Degree }],
        ['nav_obs_2', { name: 'NAV OBS:2', type: SimVarValueType.Degree }],
        ['nav_cdi_2', { name: 'NAV CDI:2', type: SimVarValueType.Number }],
        ['nav_dme_2', { name: 'NAV DME:2', type: SimVarValueType.NM }],
        ['nav_has_dme_2', { name: 'NAV HAS DME:2', type: SimVarValueType.Bool }],
        ['nav_has_nav_2', { name: 'NAV HAS NAV:2', type: SimVarValueType.Bool }],
        ['nav_radial_2', { name: 'NAV RADIAL:2', type: SimVarValueType.Radians }],
        ['nav_signal_2', { name: 'NAV SIGNAL:2', type: SimVarValueType.Number }],
        ['nav_ident_2', { name: 'NAV IDENT:2', type: SimVarValueType.String }],
        ['nav_to_from_2', { name: 'NAV TOFROM:2', type: SimVarValueType.Enum }],
        ['nav_localizer_2', { name: 'NAV HAS LOCALIZER:2', type: SimVarValueType.Bool }],
        ['nav_localizer_crs_2', { name: 'NAV LOCALIZER:2', type: SimVarValueType.Number }],
        ['nav_glideslope_2', { name: 'NAV HAS GLIDE SLOPE:2', type: SimVarValueType.Bool }],
        ['nav_gs_error_2', { name: 'NAV GLIDE SLOPE ERROR:2', type: SimVarValueType.Degree }],
        ['nav_raw_gs_2', { name: 'NAV RAW GLIDE SLOPE:2', type: SimVarValueType.Degree }],
        ['nav_gs_lla_2', { name: 'NAV GS LATLONALT:2', type: SimVarValueType.LLA }],
        ['nav_lla_2', { name: 'NAV VOR LATLONALT:2', type: SimVarValueType.LLA }],
        ['nav_magvar_2', { name: 'NAV MAGVAR:2', type: SimVarValueType.Degree }],
        ['gps_dtk', { name: 'GPS WP DESIRED TRACK', type: SimVarValueType.Degree }],
        ['gps_xtk', { name: 'GPS WP CROSS TRK', type: SimVarValueType.NM }],
        ['gps_wp', { name: 'GPS WP NEXT ID', type: SimVarValueType.NM }],
        ['gps_wp_bearing', { name: 'GPS WP BEARING', type: SimVarValueType.String }],
        ['gps_wp_distance', { name: 'GPS WP DISTANCE', type: SimVarValueType.NM }],
        ['adf_bearing_1', { name: 'ADF RADIAL:1', type: SimVarValueType.Radians }],
        ['adf_signal_1', { name: 'ADF SIGNAL:1', type: SimVarValueType.Number }],
        ['mkr_bcn_state_simvar', { name: 'MARKER BEACON STATE', type: SimVarValueType.Number }],
        ['gps_obs_active_simvar', { name: 'GPS OBS ACTIVE', type: SimVarValueType.Bool }],
        ['gps_obs_value_simvar', { name: 'GPS OBS VALUE', type: SimVarValueType.Degree }]
    ]);
    //
    // Navigation event configurations
    //
    var NavSourceType;
    (function (NavSourceType) {
        NavSourceType[NavSourceType["Nav"] = 0] = "Nav";
        NavSourceType[NavSourceType["Gps"] = 1] = "Gps";
        NavSourceType[NavSourceType["Adf"] = 2] = "Adf";
    })(NavSourceType || (NavSourceType = {}));
    //* ENUM for VOR To/From Flag */
    var VorToFrom;
    (function (VorToFrom) {
        VorToFrom[VorToFrom["OFF"] = 0] = "OFF";
        VorToFrom[VorToFrom["TO"] = 1] = "TO";
        VorToFrom[VorToFrom["FROM"] = 2] = "FROM";
    })(VorToFrom || (VorToFrom = {}));
    /** Marker beacon signal state. */
    var MarkerBeaconState;
    (function (MarkerBeaconState) {
        MarkerBeaconState[MarkerBeaconState["Inactive"] = 0] = "Inactive";
        MarkerBeaconState[MarkerBeaconState["Outer"] = 1] = "Outer";
        MarkerBeaconState[MarkerBeaconState["Middle"] = 2] = "Middle";
        MarkerBeaconState[MarkerBeaconState["Inner"] = 3] = "Inner";
    })(MarkerBeaconState || (MarkerBeaconState = {}));

    new Map([
        ['nav_active_frequency_1', { name: 'NAV ACTIVE FREQUENCY:1', type: SimVarValueType.MHz }],
        ['nav_standby_frequency_1', { name: 'NAV STANDBY FREQUENCY:1', type: SimVarValueType.MHz }],
        ['nav_ident_1', { name: 'NAV IDENT:1', type: SimVarValueType.String }],
        ['nav_signal_1', { name: 'NAV SIGNAL:1', type: SimVarValueType.Number }],
        ['nav_active_frequency_2', { name: 'NAV ACTIVE FREQUENCY:2', type: SimVarValueType.MHz }],
        ['nav_standby_frequency_2', { name: 'NAV STANDBY FREQUENCY:2', type: SimVarValueType.MHz }],
        ['nav_ident_2', { name: 'NAV IDENT:2', type: SimVarValueType.String }],
        ['nav_signal_2', { name: 'NAV SIGNAL:2', type: SimVarValueType.Number }],
        ['com_active_frequency_1', { name: 'COM ACTIVE FREQUENCY:1', type: SimVarValueType.MHz }],
        ['com_standby_frequency_1', { name: 'COM STANDBY FREQUENCY:1', type: SimVarValueType.MHz }],
        ['com_active_frequency_2', { name: 'COM ACTIVE FREQUENCY:2', type: SimVarValueType.MHz }],
        ['com_standby_frequency_2', { name: 'COM STANDBY FREQUENCY:2', type: SimVarValueType.MHz }],
        ['adf_standby_frequency_1', { name: 'ADF STANDBY FREQUENCY:1', type: SimVarValueType.KHz }],
        ['adf_active_frequency_1', { name: 'ADF ACTIVE FREQUENCY:1', type: SimVarValueType.KHz }],
        ['com_status_1', { name: 'COM STATUS:1', type: SimVarValueType.Number }],
        ['com_status_2', { name: 'COM STATUS:2', type: SimVarValueType.Number }]
    ]);

    /// <reference types="msfstypes/JS/simvar" />
    var APLockType;
    (function (APLockType) {
        APLockType[APLockType["Heading"] = 0] = "Heading";
        APLockType[APLockType["Nav"] = 1] = "Nav";
        APLockType[APLockType["Alt"] = 2] = "Alt";
        APLockType[APLockType["Bank"] = 3] = "Bank";
        APLockType[APLockType["WingLevel"] = 4] = "WingLevel";
        APLockType[APLockType["Vs"] = 5] = "Vs";
        APLockType[APLockType["Flc"] = 6] = "Flc";
        APLockType[APLockType["Pitch"] = 7] = "Pitch";
        APLockType[APLockType["Approach"] = 8] = "Approach";
        APLockType[APLockType["Backcourse"] = 9] = "Backcourse";
        APLockType[APLockType["Glideslope"] = 10] = "Glideslope";
        APLockType[APLockType["VNav"] = 11] = "VNav";
    })(APLockType || (APLockType = {}));
    new Map([
        // TODO extend the next two to handle multiple APs?
        ['ap_heading_selected', { name: 'AUTOPILOT HEADING LOCK DIR:1', type: SimVarValueType.Degree }],
        ['ap_altitude_selected', { name: 'AUTOPILOT ALTITUDE LOCK VAR:1', type: SimVarValueType.Feet }],
        ['ap_master_status', { name: 'AUTOPILOT MASTER', type: SimVarValueType.Bool }],
        ['ap_yd_status', { name: 'AUTOPILOT YAW DAMPER', type: SimVarValueType.Bool }],
        ['ap_heading_hold', { name: 'AUTOPILOT HEADING LOCK', type: SimVarValueType.Bool }],
        ['ap_nav_hold', { name: 'AUTOPILOT NAV1 LOCK', type: SimVarValueType.Bool }],
        ['ap_bank_hold', { name: 'AUTOPILOT BANK HOLD', type: SimVarValueType.Bool }],
        ['ap_max_bank_id', { name: 'AUTOPILOT MAX BANK ID', type: SimVarValueType.Number }],
        ['ap_max_bank_value', { name: 'AUTOPILOT MAX BANK', type: SimVarValueType.Degree }],
        ['ap_wing_lvl_hold', { name: 'AUTOPILOT WING LEVELER', type: SimVarValueType.Bool }],
        ['ap_approach_hold', { name: 'AUTOPILOT APPROACH HOLD', type: SimVarValueType.Bool }],
        ['ap_backcourse_hold', { name: 'AUTOPILOT BACKCOURSE HOLD', type: SimVarValueType.Bool }],
        ['ap_vs_hold', { name: 'AUTOPILOT VERTICAL HOLD', type: SimVarValueType.Bool }],
        ['ap_flc_hold', { name: 'AUTOPILOT FLIGHT LEVEL CHANGE', type: SimVarValueType.Bool }],
        ['ap_alt_hold', { name: 'AUTOPILOT ALTITUDE LOCK', type: SimVarValueType.Bool }],
        ['ap_glideslope_hold', { name: 'AUTOPILOT GLIDESLOPE HOLD', type: SimVarValueType.Bool }],
        ['ap_pitch_hold', { name: 'AUTOPILOT PITCH HOLD', type: SimVarValueType.Bool }],
        ['ap_vs_selected', { name: 'AUTOPILOT VERTICAL HOLD VAR:1', type: SimVarValueType.FPM }],
        ['ap_ias_selected', { name: 'AUTOPILOT AIRSPEED HOLD VAR', type: SimVarValueType.Knots }],
        ['ap_mach_selected', { name: 'AUTOPILOT MACH HOLD VAR', type: SimVarValueType.Number }],
        ['ap_selected_speed_is_mach', { name: 'AUTOPILOT MANAGED SPEED IN MACH', type: SimVarValueType.Bool }],
        ['flight_director_bank', { name: 'AUTOPILOT FLIGHT DIRECTOR BANK', type: SimVarValueType.Degree }],
        ['flight_director_pitch', { name: 'AUTOPILOT FLIGHT DIRECTOR PITCH', type: SimVarValueType.Degree }],
        ['flight_director_is_active_1', { name: 'AUTOPILOT FLIGHT DIRECTOR ACTIVE:1', type: SimVarValueType.Bool }],
        ['flight_director_is_active_2', { name: 'AUTOPILOT FLIGHT DIRECTOR ACTIVE:2', type: SimVarValueType.Bool }],
        ['vnav_active', { name: 'L:XMLVAR_VNAVButtonValue', type: SimVarValueType.Bool }],
        ['ap_pitch_selected', { name: 'AUTOPILOT PITCH HOLD REF', type: SimVarValueType.Degree }]
    ]);

    /// <reference types="msfstypes/JS/simvar" />
    new Map([
        ['rpm_1', { name: 'GENERAL ENG RPM:1', type: SimVarValueType.RPM }],
        ['rpm_2', { name: 'GENERAL ENG RPM:2', type: SimVarValueType.RPM }],
        ['n1_1', { name: 'TURB ENG CORRECTED N1:1', type: SimVarValueType.Percent }],
        ['n1_2', { name: 'TURB ENG CORRECTED N1:2', type: SimVarValueType.Percent }],
        ['n2_1', { name: 'TURB ENG CORRECTED N2:1', type: SimVarValueType.Percent }],
        ['n2_2', { name: 'TURB ENG CORRECTED N2:2', type: SimVarValueType.Percent }],
        ['recip_ff_1', { name: 'RECIP ENG FUEL FLOW:1', type: SimVarValueType.PPH }],
        ['recip_ff_2', { name: 'RECIP ENG FUEL FLOW:2', type: SimVarValueType.PPH }],
        ['oil_press_1', { name: 'ENG OIL PRESSURE:1', type: SimVarValueType.PSI }],
        ['oil_press_2', { name: 'ENG OIL PRESSURE:2', type: SimVarValueType.PSI }],
        ['oil_temp_1', { name: 'ENG OIL TEMPERATURE:1', type: SimVarValueType.Farenheit }],
        ['oil_temp_2', { name: 'ENG OIL TEMPERATURE:2', type: SimVarValueType.Farenheit }],
        ['itt_1', { name: 'TURB ENG1 ITT', type: SimVarValueType.Celsius }],
        ['itt_2', { name: 'TURB ENG2 ITT', type: SimVarValueType.Celsius }],
        ['egt_1', { name: 'ENG EXHAUST GAS TEMPERATURE:1', type: SimVarValueType.Farenheit }],
        ['egt_2', { name: 'ENG EXHAUST GAS TEMPERATURE:2', type: SimVarValueType.Farenheit }],
        ['vac', { name: 'SUCTION PRESSURE', type: SimVarValueType.InHG }],
        ['fuel_total', { name: 'FUEL TOTAL QUANTITY', type: SimVarValueType.GAL }],
        ['fuel_left', { name: 'FUEL LEFT QUANTITY', type: SimVarValueType.GAL }],
        ['fuel_right', { name: 'FUEL RIGHT QUANTITY', type: SimVarValueType.GAL }],
        ['fuel_weight_per_gallon', { name: 'FUEL WEIGHT PER GALLON', type: SimVarValueType.LBS }],
        ['eng_hours_1', { name: 'GENERAL ENG ELAPSED TIME:1', type: SimVarValueType.Hours }],
        ['eng_hyd_press_1', { name: 'ENG HYDRAULIC PRESSURE:1', type: SimVarValueType.PSI }],
        ['eng_hyd_press_2', { name: 'ENG HYDRAULIC PRESSURE:2', type: SimVarValueType.PSI }],
        ['eng_starter_1', { name: 'GENERAL ENG STARTER:1', type: SimVarValueType.Number }],
        ['eng_starter_2', { name: 'GENERAL ENG STARTER:2', type: SimVarValueType.Number }],
        ['eng_combustion_1', { name: 'GENERAL ENG COMBUSTION:1', type: SimVarValueType.Number }],
        ['eng_combustion_2', { name: 'GENERAL ENG COMBUSTION:2', type: SimVarValueType.Number }],
        ['eng_manual_ignition_1', { name: 'TURB ENG IGNITION SWITCH EX1:1', type: SimVarValueType.Number }],
        ['eng_manual_ignition_2', { name: 'TURB ENG IGNITION SWITCH EX1:2', type: SimVarValueType.Number }]
    ]);

    /// <reference types="msfstypes/Pages/VCockpit/Instruments/Shared/utils/XMLLogic" />
    /** The kind of data to return. */
    var CompositeLogicXMLValueType;
    (function (CompositeLogicXMLValueType) {
        CompositeLogicXMLValueType[CompositeLogicXMLValueType["Any"] = 0] = "Any";
        CompositeLogicXMLValueType[CompositeLogicXMLValueType["Number"] = 1] = "Number";
        CompositeLogicXMLValueType[CompositeLogicXMLValueType["String"] = 2] = "String";
    })(CompositeLogicXMLValueType || (CompositeLogicXMLValueType = {}));

    /// <reference types="msfstypes/JS/dataStorage" />
    /* eslint-disable no-inner-declarations */
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var DataStore;
    (function (DataStore) {
        /**
         * Writes a keyed value to the data store.
         * @param key A key.
         * @param value The value to set.
         */
        function set(key, value) {
            SetStoredData(key, JSON.stringify(value));
        }
        DataStore.set = set;
        /**
         * Retrieves a keyed value from the data store.
         * @param key A key.
         * @returns the value stored under the key, or undefined if one could not be retrieved.
         */
        function get(key) {
            try {
                const string = GetStoredData(key);
                return JSON.parse(string);
            }
            catch (e) {
                return undefined;
            }
        }
        DataStore.get = get;
        /**
         * Removes a key from the data store.
         * @param key The key to remove.
         */
        function remove(key) {
            DeleteStoredData(key);
        }
        DataStore.remove = remove;
    })(DataStore || (DataStore = {}));

    /**
     * A subscribable subject whose value can be freely manipulated.
     */
    class Subject extends AbstractSubscribable {
        /**
         * Constructs an observable Subject.
         * @param value The initial value.
         * @param equalityFunc The function to use to check for equality.
         * @param mutateFunc The function to use to mutate the subject's value.
         */
        constructor(value, equalityFunc, mutateFunc) {
            super();
            this.value = value;
            this.equalityFunc = equalityFunc;
            this.mutateFunc = mutateFunc;
            this.isMutableSubscribable = true;
        }
        /**
         * Creates and returns a new Subject.
         * @param v The initial value of the subject.
         * @param equalityFunc The function to use to check for equality between subject values. Defaults to the strict
         * equality comparison (`===`).
         * @param mutateFunc The function to use to change the subject's value. If not defined, new values will replace
         * old values by variable assignment.
         * @returns A Subject instance.
         */
        static create(v, equalityFunc, mutateFunc) {
            return new Subject(v, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : Subject.DEFAULT_EQUALITY_FUNC, mutateFunc);
        }
        /** @inheritdoc */
        notifySub(sub) {
            sub(this.value);
        }
        /**
         * Sets the value of this subject and notifies subscribers if the value changed.
         * @param value The new value.
         */
        set(value) {
            if (!this.equalityFunc(value, this.value)) {
                if (this.mutateFunc) {
                    this.mutateFunc(this.value, value);
                }
                else {
                    this.value = value;
                }
                this.notify();
            }
        }
        /**
         * Applies a partial set of properties to this subject's value and notifies subscribers if the value changed as a
         * result.
         * @param value The properties to apply.
         */
        apply(value) {
            let changed = false;
            for (const prop in value) {
                changed = value[prop] !== this.value[prop];
                if (changed) {
                    break;
                }
            }
            Object.assign(this.value, value);
            changed && this.notify();
        }
        /** @inheritdoc */
        notify() {
            super.notify();
        }
        /**
         * Gets the value of this subject.
         * @returns The value of this subject.
         */
        get() {
            return this.value;
        }
    }

    /**
     * A utility class which provides the current game state.
     */
    class GameStateProvider {
        /**
         * Constructor.
         */
        constructor() {
            this.gameState = Subject.create(undefined);
            window.document.addEventListener('OnVCockpitPanelAttributesChanged', this.onAttributesChanged.bind(this));
            this.onAttributesChanged();
        }
        /**
         * Responds to changes in document attributes.
         */
        onAttributesChanged() {
            var _a;
            if ((_a = window.parent) === null || _a === void 0 ? void 0 : _a.document.body.hasAttribute('gamestate')) {
                const attribute = window.parent.document.body.getAttribute('gamestate');
                if (attribute !== null) {
                    this.gameState.set(GameState[attribute]);
                    return;
                }
            }
            this.gameState.set(undefined);
        }
        /**
         * Gets a subscribable which provides the current game state.
         * @returns A subscribable which provides the current game state.
         */
        static get() {
            var _a;
            return ((_a = GameStateProvider.INSTANCE) !== null && _a !== void 0 ? _a : (GameStateProvider.INSTANCE = new GameStateProvider())).gameState;
        }
    }

    /// <reference types="msfstypes/JS/Simplane" />
    /**
     * The available facility frequency types.
     */
    var FacilityFrequencyType;
    (function (FacilityFrequencyType) {
        FacilityFrequencyType[FacilityFrequencyType["None"] = 0] = "None";
        FacilityFrequencyType[FacilityFrequencyType["ATIS"] = 1] = "ATIS";
        FacilityFrequencyType[FacilityFrequencyType["Multicom"] = 2] = "Multicom";
        FacilityFrequencyType[FacilityFrequencyType["Unicom"] = 3] = "Unicom";
        FacilityFrequencyType[FacilityFrequencyType["CTAF"] = 4] = "CTAF";
        FacilityFrequencyType[FacilityFrequencyType["Ground"] = 5] = "Ground";
        FacilityFrequencyType[FacilityFrequencyType["Tower"] = 6] = "Tower";
        FacilityFrequencyType[FacilityFrequencyType["Clearance"] = 7] = "Clearance";
        FacilityFrequencyType[FacilityFrequencyType["Approach"] = 8] = "Approach";
        FacilityFrequencyType[FacilityFrequencyType["Departure"] = 9] = "Departure";
        FacilityFrequencyType[FacilityFrequencyType["Center"] = 10] = "Center";
        FacilityFrequencyType[FacilityFrequencyType["FSS"] = 11] = "FSS";
        FacilityFrequencyType[FacilityFrequencyType["AWOS"] = 12] = "AWOS";
        FacilityFrequencyType[FacilityFrequencyType["ASOS"] = 13] = "ASOS";
        /** Clearance Pre-Taxi*/
        FacilityFrequencyType[FacilityFrequencyType["CPT"] = 14] = "CPT";
        /** Remote Clearance Delivery */
        FacilityFrequencyType[FacilityFrequencyType["GCO"] = 15] = "GCO";
    })(FacilityFrequencyType || (FacilityFrequencyType = {}));
    /** Additional Approach Types (additive to those defined in simplane). */
    var AdditionalApproachType;
    (function (AdditionalApproachType) {
        AdditionalApproachType[AdditionalApproachType["APPROACH_TYPE_VISUAL"] = 99] = "APPROACH_TYPE_VISUAL";
    })(AdditionalApproachType || (AdditionalApproachType = {}));
    /**
     * Flags indicating the approach fix type.
     */
    var FixTypeFlags;
    (function (FixTypeFlags) {
        FixTypeFlags[FixTypeFlags["None"] = 0] = "None";
        FixTypeFlags[FixTypeFlags["IAF"] = 1] = "IAF";
        FixTypeFlags[FixTypeFlags["IF"] = 2] = "IF";
        FixTypeFlags[FixTypeFlags["MAP"] = 4] = "MAP";
        FixTypeFlags[FixTypeFlags["FAF"] = 8] = "FAF";
        FixTypeFlags[FixTypeFlags["MAHP"] = 16] = "MAHP";
    })(FixTypeFlags || (FixTypeFlags = {}));
    /**
     * Flags indicating the rnav approach type.
     */
    var RnavTypeFlags;
    (function (RnavTypeFlags) {
        RnavTypeFlags[RnavTypeFlags["None"] = 0] = "None";
        RnavTypeFlags[RnavTypeFlags["LNAV"] = 1] = "LNAV";
        RnavTypeFlags[RnavTypeFlags["LNAVVNAV"] = 2] = "LNAVVNAV";
        RnavTypeFlags[RnavTypeFlags["LP"] = 4] = "LP";
        RnavTypeFlags[RnavTypeFlags["LPV"] = 8] = "LPV";
    })(RnavTypeFlags || (RnavTypeFlags = {}));
    /**
     * The class of airport facility.
     */
    var AirportClass;
    (function (AirportClass) {
        /** No other airport class could be identified. */
        AirportClass[AirportClass["None"] = 0] = "None";
        /** The airport has at least one hard surface runway. */
        AirportClass[AirportClass["HardSurface"] = 1] = "HardSurface";
        /** The airport has no hard surface runways. */
        AirportClass[AirportClass["SoftSurface"] = 2] = "SoftSurface";
        /** The airport has only water surface runways. */
        AirportClass[AirportClass["AllWater"] = 3] = "AllWater";
        /** The airport has no runways, but does contain helipads. */
        AirportClass[AirportClass["HeliportOnly"] = 4] = "HeliportOnly";
        /** The airport is a non-public use airport. */
        AirportClass[AirportClass["Private"] = 5] = "Private";
    })(AirportClass || (AirportClass = {}));
    /**
     * The class of an airport facility, expressed as a mask for nearest airport search session filtering.
     */
    var AirportClassMask;
    (function (AirportClassMask) {
        /** No other airport class could be identified. */
        AirportClassMask[AirportClassMask["None"] = 0] = "None";
        /** The airport has at least one hard surface runway. */
        AirportClassMask[AirportClassMask["HardSurface"] = 2] = "HardSurface";
        /** The airport has no hard surface runways. */
        AirportClassMask[AirportClassMask["SoftSurface"] = 4] = "SoftSurface";
        /** The airport has only water surface runways. */
        AirportClassMask[AirportClassMask["AllWater"] = 8] = "AllWater";
        /** The airport has no runways, but does contain helipads. */
        AirportClassMask[AirportClassMask["HeliportOnly"] = 16] = "HeliportOnly";
        /** The airport is a non-public use airport. */
        AirportClassMask[AirportClassMask["Private"] = 32] = "Private";
    })(AirportClassMask || (AirportClassMask = {}));
    /**
     * An enumeration of possible intersection types.
     */
    var IntersectionType;
    (function (IntersectionType) {
        IntersectionType[IntersectionType["None"] = 0] = "None";
        IntersectionType[IntersectionType["Named"] = 1] = "Named";
        IntersectionType[IntersectionType["Unnamed"] = 2] = "Unnamed";
        IntersectionType[IntersectionType["Vor"] = 3] = "Vor";
        IntersectionType[IntersectionType["NDB"] = 4] = "NDB";
        IntersectionType[IntersectionType["Offroute"] = 5] = "Offroute";
        IntersectionType[IntersectionType["IAF"] = 6] = "IAF";
        IntersectionType[IntersectionType["FAF"] = 7] = "FAF";
        IntersectionType[IntersectionType["RNAV"] = 8] = "RNAV";
        IntersectionType[IntersectionType["VFR"] = 9] = "VFR";
    })(IntersectionType || (IntersectionType = {}));
    var UserFacilityType;
    (function (UserFacilityType) {
        UserFacilityType[UserFacilityType["RADIAL_RADIAL"] = 0] = "RADIAL_RADIAL";
        UserFacilityType[UserFacilityType["RADIAL_DISTANCE"] = 1] = "RADIAL_DISTANCE";
        UserFacilityType[UserFacilityType["LAT_LONG"] = 2] = "LAT_LONG";
    })(UserFacilityType || (UserFacilityType = {}));
    /**
     * ARINC 424 Leg Types
     */
    var LegType;
    (function (LegType) {
        /** An unknown leg type. */
        LegType[LegType["Unknown"] = 0] = "Unknown";
        /** An arc-to-fix leg. This indicates a DME arc leg to a specified fix.*/
        LegType[LegType["AF"] = 1] = "AF";
        /** A course-to-altitude leg. */
        LegType[LegType["CA"] = 2] = "CA";
        /**
         * A course-to-DME-distance leg. This leg is flown on a wind corrected course
         * to a specific DME distance from another fix.
         */
        LegType[LegType["CD"] = 3] = "CD";
        /** A course-to-fix leg.*/
        LegType[LegType["CF"] = 4] = "CF";
        /** A course-to-intercept leg. */
        LegType[LegType["CI"] = 5] = "CI";
        /** A course-to-radial intercept leg. */
        LegType[LegType["CR"] = 6] = "CR";
        /** A direct-to-fix leg, from an unspecified starting position. */
        LegType[LegType["DF"] = 7] = "DF";
        /**
         * A fix-to-altitude leg. A FA leg is flown on a track from a fix to a
         * specified altitude.
         */
        LegType[LegType["FA"] = 8] = "FA";
        /**
         * A fix-to-distance leg. This leg is flown on a track from a fix to a
         * specific distance from the fix.
         */
        LegType[LegType["FC"] = 9] = "FC";
        /**
         * A fix to DME distance leg. This leg is flown on a track from a fix to
         * a specific DME distance from another fix.
         */
        LegType[LegType["FD"] = 10] = "FD";
        /** A course-to-manual-termination leg. */
        LegType[LegType["FM"] = 11] = "FM";
        /** A hold-to-altitude leg. The hold is flown until a specified altitude is reached. */
        LegType[LegType["HA"] = 12] = "HA";
        /**
         * A hold-to-fix leg. This indicates one time around the hold circuit and
         * then an exit.
         */
        LegType[LegType["HF"] = 13] = "HF";
        /** A hold-to-manual-termination leg. */
        LegType[LegType["HM"] = 14] = "HM";
        /** Initial procedure fix. */
        LegType[LegType["IF"] = 15] = "IF";
        /** A procedure turn leg. */
        LegType[LegType["PI"] = 16] = "PI";
        /** A radius-to-fix leg, with endpoint fixes, a center fix, and a radius. */
        LegType[LegType["RF"] = 17] = "RF";
        /** A track-to-fix leg, from the previous fix to the terminator. */
        LegType[LegType["TF"] = 18] = "TF";
        /** A heading-to-altitude leg. */
        LegType[LegType["VA"] = 19] = "VA";
        /** A heading-to-DME-distance leg. */
        LegType[LegType["VD"] = 20] = "VD";
        /** A heading-to-intercept leg. */
        LegType[LegType["VI"] = 21] = "VI";
        /** A heading-to-manual-termination leg. */
        LegType[LegType["VM"] = 22] = "VM";
        /** A heading-to-radial intercept leg. */
        LegType[LegType["VR"] = 23] = "VR";
        /** A leg representing a discontinuity in the flight plan. */
        LegType[LegType["Discontinuity"] = 99] = "Discontinuity";
        /** A leg representing a discontinuity in the flight plan that does not prevent sequencing. */
        LegType[LegType["ThruDiscontinuity"] = 100] = "ThruDiscontinuity";
    })(LegType || (LegType = {}));
    /**
     * Types of altitude restrictions on procedure legs.
     */
    var AltitudeRestrictionType;
    (function (AltitudeRestrictionType) {
        AltitudeRestrictionType[AltitudeRestrictionType["Unused"] = 0] = "Unused";
        AltitudeRestrictionType[AltitudeRestrictionType["At"] = 1] = "At";
        AltitudeRestrictionType[AltitudeRestrictionType["AtOrAbove"] = 2] = "AtOrAbove";
        AltitudeRestrictionType[AltitudeRestrictionType["AtOrBelow"] = 3] = "AtOrBelow";
        AltitudeRestrictionType[AltitudeRestrictionType["Between"] = 4] = "Between";
    })(AltitudeRestrictionType || (AltitudeRestrictionType = {}));
    var LegTurnDirection;
    (function (LegTurnDirection) {
        LegTurnDirection[LegTurnDirection["None"] = 0] = "None";
        LegTurnDirection[LegTurnDirection["Left"] = 1] = "Left";
        LegTurnDirection[LegTurnDirection["Right"] = 2] = "Right";
        LegTurnDirection[LegTurnDirection["Either"] = 3] = "Either";
    })(LegTurnDirection || (LegTurnDirection = {}));
    var AirwayType;
    (function (AirwayType) {
        AirwayType[AirwayType["None"] = 0] = "None";
        AirwayType[AirwayType["Victor"] = 1] = "Victor";
        AirwayType[AirwayType["Jet"] = 2] = "Jet";
        AirwayType[AirwayType["Both"] = 3] = "Both";
    })(AirwayType || (AirwayType = {}));
    var NdbType;
    (function (NdbType) {
        NdbType[NdbType["CompassPoint"] = 0] = "CompassPoint";
        NdbType[NdbType["MH"] = 1] = "MH";
        NdbType[NdbType["H"] = 2] = "H";
        NdbType[NdbType["HH"] = 3] = "HH";
    })(NdbType || (NdbType = {}));
    var VorType;
    (function (VorType) {
        VorType[VorType["Unknown"] = 0] = "Unknown";
        VorType[VorType["VOR"] = 1] = "VOR";
        VorType[VorType["VORDME"] = 2] = "VORDME";
        VorType[VorType["DME"] = 3] = "DME";
        VorType[VorType["TACAN"] = 4] = "TACAN";
        VorType[VorType["VORTAC"] = 5] = "VORTAC";
        VorType[VorType["ILS"] = 6] = "ILS";
        VorType[VorType["VOT"] = 7] = "VOT";
    })(VorType || (VorType = {}));
    var RunwaySurfaceType;
    (function (RunwaySurfaceType) {
        RunwaySurfaceType[RunwaySurfaceType["Concrete"] = 0] = "Concrete";
        RunwaySurfaceType[RunwaySurfaceType["Grass"] = 1] = "Grass";
        RunwaySurfaceType[RunwaySurfaceType["WaterFSX"] = 2] = "WaterFSX";
        RunwaySurfaceType[RunwaySurfaceType["GrassBumpy"] = 3] = "GrassBumpy";
        RunwaySurfaceType[RunwaySurfaceType["Asphalt"] = 4] = "Asphalt";
        RunwaySurfaceType[RunwaySurfaceType["ShortGrass"] = 5] = "ShortGrass";
        RunwaySurfaceType[RunwaySurfaceType["LongGrass"] = 6] = "LongGrass";
        RunwaySurfaceType[RunwaySurfaceType["HardTurf"] = 7] = "HardTurf";
        RunwaySurfaceType[RunwaySurfaceType["Snow"] = 8] = "Snow";
        RunwaySurfaceType[RunwaySurfaceType["Ice"] = 9] = "Ice";
        RunwaySurfaceType[RunwaySurfaceType["Urban"] = 10] = "Urban";
        RunwaySurfaceType[RunwaySurfaceType["Forest"] = 11] = "Forest";
        RunwaySurfaceType[RunwaySurfaceType["Dirt"] = 12] = "Dirt";
        RunwaySurfaceType[RunwaySurfaceType["Coral"] = 13] = "Coral";
        RunwaySurfaceType[RunwaySurfaceType["Gravel"] = 14] = "Gravel";
        RunwaySurfaceType[RunwaySurfaceType["OilTreated"] = 15] = "OilTreated";
        RunwaySurfaceType[RunwaySurfaceType["SteelMats"] = 16] = "SteelMats";
        RunwaySurfaceType[RunwaySurfaceType["Bituminous"] = 17] = "Bituminous";
        RunwaySurfaceType[RunwaySurfaceType["Brick"] = 18] = "Brick";
        RunwaySurfaceType[RunwaySurfaceType["Macadam"] = 19] = "Macadam";
        RunwaySurfaceType[RunwaySurfaceType["Planks"] = 20] = "Planks";
        RunwaySurfaceType[RunwaySurfaceType["Sand"] = 21] = "Sand";
        RunwaySurfaceType[RunwaySurfaceType["Shale"] = 22] = "Shale";
        RunwaySurfaceType[RunwaySurfaceType["Tarmac"] = 23] = "Tarmac";
        RunwaySurfaceType[RunwaySurfaceType["WrightFlyerTrack"] = 24] = "WrightFlyerTrack";
        //SURFACE_TYPE_LAST_FSX
        RunwaySurfaceType[RunwaySurfaceType["Ocean"] = 26] = "Ocean";
        RunwaySurfaceType[RunwaySurfaceType["Water"] = 27] = "Water";
        RunwaySurfaceType[RunwaySurfaceType["Pond"] = 28] = "Pond";
        RunwaySurfaceType[RunwaySurfaceType["Lake"] = 29] = "Lake";
        RunwaySurfaceType[RunwaySurfaceType["River"] = 30] = "River";
        RunwaySurfaceType[RunwaySurfaceType["WasteWater"] = 31] = "WasteWater";
        RunwaySurfaceType[RunwaySurfaceType["Paint"] = 32] = "Paint";
        // UNUSED
        // SURFACE_TYPE_ERASE_GRASS
    })(RunwaySurfaceType || (RunwaySurfaceType = {}));
    var RunwayLightingType;
    (function (RunwayLightingType) {
        RunwayLightingType[RunwayLightingType["Unknown"] = 0] = "Unknown";
        RunwayLightingType[RunwayLightingType["None"] = 1] = "None";
        RunwayLightingType[RunwayLightingType["PartTime"] = 2] = "PartTime";
        RunwayLightingType[RunwayLightingType["FullTime"] = 3] = "FullTime";
        RunwayLightingType[RunwayLightingType["Frequency"] = 4] = "Frequency";
    })(RunwayLightingType || (RunwayLightingType = {}));
    var AirportPrivateType;
    (function (AirportPrivateType) {
        AirportPrivateType[AirportPrivateType["Uknown"] = 0] = "Uknown";
        AirportPrivateType[AirportPrivateType["Public"] = 1] = "Public";
        AirportPrivateType[AirportPrivateType["Military"] = 2] = "Military";
        AirportPrivateType[AirportPrivateType["Private"] = 3] = "Private";
    })(AirportPrivateType || (AirportPrivateType = {}));
    var GpsBoolean;
    (function (GpsBoolean) {
        GpsBoolean[GpsBoolean["Unknown"] = 0] = "Unknown";
        GpsBoolean[GpsBoolean["No"] = 1] = "No";
        GpsBoolean[GpsBoolean["Yes"] = 2] = "Yes";
    })(GpsBoolean || (GpsBoolean = {}));
    var VorClass;
    (function (VorClass) {
        VorClass[VorClass["Unknown"] = 0] = "Unknown";
        VorClass[VorClass["Terminal"] = 1] = "Terminal";
        VorClass[VorClass["LowAlt"] = 2] = "LowAlt";
        VorClass[VorClass["HighAlt"] = 3] = "HighAlt";
        VorClass[VorClass["ILS"] = 4] = "ILS";
        VorClass[VorClass["VOT"] = 5] = "VOT";
    })(VorClass || (VorClass = {}));
    var FacilityType;
    (function (FacilityType) {
        FacilityType["Airport"] = "LOAD_AIRPORT";
        FacilityType["Intersection"] = "LOAD_INTERSECTION";
        FacilityType["VOR"] = "LOAD_VOR";
        FacilityType["NDB"] = "LOAD_NDB";
        FacilityType["USR"] = "USR";
        FacilityType["RWY"] = "RWY";
        FacilityType["VIS"] = "VIS";
    })(FacilityType || (FacilityType = {}));
    var FacilitySearchType;
    (function (FacilitySearchType) {
        FacilitySearchType[FacilitySearchType["All"] = 0] = "All";
        FacilitySearchType[FacilitySearchType["Airport"] = 1] = "Airport";
        FacilitySearchType[FacilitySearchType["Intersection"] = 2] = "Intersection";
        FacilitySearchType[FacilitySearchType["Vor"] = 3] = "Vor";
        FacilitySearchType[FacilitySearchType["Ndb"] = 4] = "Ndb";
        FacilitySearchType[FacilitySearchType["Boundary"] = 5] = "Boundary";
        FacilitySearchType[FacilitySearchType["User"] = 6] = "User";
    })(FacilitySearchType || (FacilitySearchType = {}));
    /**
     * A type of airspace boundary.
     */
    var BoundaryType;
    (function (BoundaryType) {
        BoundaryType[BoundaryType["None"] = 0] = "None";
        BoundaryType[BoundaryType["Center"] = 1] = "Center";
        BoundaryType[BoundaryType["ClassA"] = 2] = "ClassA";
        BoundaryType[BoundaryType["ClassB"] = 3] = "ClassB";
        BoundaryType[BoundaryType["ClassC"] = 4] = "ClassC";
        BoundaryType[BoundaryType["ClassD"] = 5] = "ClassD";
        BoundaryType[BoundaryType["ClassE"] = 6] = "ClassE";
        BoundaryType[BoundaryType["ClassF"] = 7] = "ClassF";
        BoundaryType[BoundaryType["ClassG"] = 8] = "ClassG";
        BoundaryType[BoundaryType["Tower"] = 9] = "Tower";
        BoundaryType[BoundaryType["Clearance"] = 10] = "Clearance";
        BoundaryType[BoundaryType["Ground"] = 11] = "Ground";
        BoundaryType[BoundaryType["Departure"] = 12] = "Departure";
        BoundaryType[BoundaryType["Approach"] = 13] = "Approach";
        BoundaryType[BoundaryType["MOA"] = 14] = "MOA";
        BoundaryType[BoundaryType["Restricted"] = 15] = "Restricted";
        BoundaryType[BoundaryType["Prohibited"] = 16] = "Prohibited";
        BoundaryType[BoundaryType["Warning"] = 17] = "Warning";
        BoundaryType[BoundaryType["Alert"] = 18] = "Alert";
        BoundaryType[BoundaryType["Danger"] = 19] = "Danger";
        BoundaryType[BoundaryType["NationalPark"] = 20] = "NationalPark";
        BoundaryType[BoundaryType["ModeC"] = 21] = "ModeC";
        BoundaryType[BoundaryType["Radar"] = 22] = "Radar";
        BoundaryType[BoundaryType["Training"] = 23] = "Training";
    })(BoundaryType || (BoundaryType = {}));
    /**
     * A type of airspace boundary altitude maxima.
     */
    var BoundaryAltitudeType;
    (function (BoundaryAltitudeType) {
        BoundaryAltitudeType[BoundaryAltitudeType["Unknown"] = 0] = "Unknown";
        BoundaryAltitudeType[BoundaryAltitudeType["MSL"] = 1] = "MSL";
        BoundaryAltitudeType[BoundaryAltitudeType["AGL"] = 2] = "AGL";
        BoundaryAltitudeType[BoundaryAltitudeType["Unlimited"] = 3] = "Unlimited";
    })(BoundaryAltitudeType || (BoundaryAltitudeType = {}));
    /**
     * A type of boundary geometry vector.
     */
    var BoundaryVectorType;
    (function (BoundaryVectorType) {
        BoundaryVectorType[BoundaryVectorType["None"] = 0] = "None";
        BoundaryVectorType[BoundaryVectorType["Start"] = 1] = "Start";
        BoundaryVectorType[BoundaryVectorType["Line"] = 2] = "Line";
        BoundaryVectorType[BoundaryVectorType["Origin"] = 3] = "Origin";
        BoundaryVectorType[BoundaryVectorType["ArcCW"] = 4] = "ArcCW";
        BoundaryVectorType[BoundaryVectorType["ArcCCW"] = 5] = "ArcCCW";
        BoundaryVectorType[BoundaryVectorType["Circle"] = 6] = "Circle";
    })(BoundaryVectorType || (BoundaryVectorType = {}));
    /**
     * Wind speed units used by METAR.
     */
    var MetarWindSpeedUnits;
    (function (MetarWindSpeedUnits) {
        MetarWindSpeedUnits[MetarWindSpeedUnits["Knot"] = 0] = "Knot";
        MetarWindSpeedUnits[MetarWindSpeedUnits["MeterPerSecond"] = 1] = "MeterPerSecond";
        MetarWindSpeedUnits[MetarWindSpeedUnits["KilometerPerHour"] = 2] = "KilometerPerHour";
    })(MetarWindSpeedUnits || (MetarWindSpeedUnits = {}));
    /** Visibility distance units used by METAR. */
    var MetarVisibilityUnits;
    (function (MetarVisibilityUnits) {
        MetarVisibilityUnits[MetarVisibilityUnits["Meter"] = 0] = "Meter";
        MetarVisibilityUnits[MetarVisibilityUnits["StatuteMile"] = 1] = "StatuteMile";
    })(MetarVisibilityUnits || (MetarVisibilityUnits = {}));
    /**
     * METAR cloud layer coverage/sky condition.
     */
    var MetarCloudLayerCoverage;
    (function (MetarCloudLayerCoverage) {
        MetarCloudLayerCoverage[MetarCloudLayerCoverage["SkyClear"] = 0] = "SkyClear";
        MetarCloudLayerCoverage[MetarCloudLayerCoverage["Clear"] = 1] = "Clear";
        MetarCloudLayerCoverage[MetarCloudLayerCoverage["NoSignificant"] = 2] = "NoSignificant";
        MetarCloudLayerCoverage[MetarCloudLayerCoverage["Few"] = 3] = "Few";
        MetarCloudLayerCoverage[MetarCloudLayerCoverage["Scattered"] = 4] = "Scattered";
        MetarCloudLayerCoverage[MetarCloudLayerCoverage["Broken"] = 5] = "Broken";
        MetarCloudLayerCoverage[MetarCloudLayerCoverage["Overcast"] = 6] = "Overcast";
    })(MetarCloudLayerCoverage || (MetarCloudLayerCoverage = {}));
    /**
     * METAR significant cloud types.
     */
    var MetarCloudLayerType;
    (function (MetarCloudLayerType) {
        MetarCloudLayerType[MetarCloudLayerType["Unspecified"] = -1] = "Unspecified";
        MetarCloudLayerType[MetarCloudLayerType["ToweringCumulus"] = 0] = "ToweringCumulus";
        MetarCloudLayerType[MetarCloudLayerType["Cumulonimbus"] = 1] = "Cumulonimbus";
        MetarCloudLayerType[MetarCloudLayerType["AltocumulusCastellanus"] = 2] = "AltocumulusCastellanus";
    })(MetarCloudLayerType || (MetarCloudLayerType = {}));
    /** METAR phenomenon types. */
    var MetarPhenomenonType;
    (function (MetarPhenomenonType) {
        MetarPhenomenonType[MetarPhenomenonType["None"] = 0] = "None";
        MetarPhenomenonType[MetarPhenomenonType["Mist"] = 1] = "Mist";
        MetarPhenomenonType[MetarPhenomenonType["Duststorm"] = 2] = "Duststorm";
        MetarPhenomenonType[MetarPhenomenonType["Dust"] = 3] = "Dust";
        MetarPhenomenonType[MetarPhenomenonType["Drizzle"] = 4] = "Drizzle";
        MetarPhenomenonType[MetarPhenomenonType["FunnelCloud"] = 5] = "FunnelCloud";
        MetarPhenomenonType[MetarPhenomenonType["Fog"] = 6] = "Fog";
        MetarPhenomenonType[MetarPhenomenonType["Smoke"] = 7] = "Smoke";
        MetarPhenomenonType[MetarPhenomenonType["Hail"] = 8] = "Hail";
        MetarPhenomenonType[MetarPhenomenonType["SmallHail"] = 9] = "SmallHail";
        MetarPhenomenonType[MetarPhenomenonType["Haze"] = 10] = "Haze";
        MetarPhenomenonType[MetarPhenomenonType["IceCrystals"] = 11] = "IceCrystals";
        MetarPhenomenonType[MetarPhenomenonType["IcePellets"] = 12] = "IcePellets";
        MetarPhenomenonType[MetarPhenomenonType["DustSandWhorls"] = 13] = "DustSandWhorls";
        MetarPhenomenonType[MetarPhenomenonType["Spray"] = 14] = "Spray";
        MetarPhenomenonType[MetarPhenomenonType["Rain"] = 15] = "Rain";
        MetarPhenomenonType[MetarPhenomenonType["Sand"] = 16] = "Sand";
        MetarPhenomenonType[MetarPhenomenonType["SnowGrains"] = 17] = "SnowGrains";
        MetarPhenomenonType[MetarPhenomenonType["Shower"] = 18] = "Shower";
        MetarPhenomenonType[MetarPhenomenonType["Snow"] = 19] = "Snow";
        MetarPhenomenonType[MetarPhenomenonType["Squalls"] = 20] = "Squalls";
        MetarPhenomenonType[MetarPhenomenonType["Sandstorm"] = 21] = "Sandstorm";
        MetarPhenomenonType[MetarPhenomenonType["UnknownPrecip"] = 22] = "UnknownPrecip";
        MetarPhenomenonType[MetarPhenomenonType["VolcanicAsh"] = 23] = "VolcanicAsh";
    })(MetarPhenomenonType || (MetarPhenomenonType = {}));
    /** METAR phenomenon intensities. */
    var MetarPhenomenonIntensity;
    (function (MetarPhenomenonIntensity) {
        MetarPhenomenonIntensity[MetarPhenomenonIntensity["Light"] = -1] = "Light";
        MetarPhenomenonIntensity[MetarPhenomenonIntensity["Normal"] = 0] = "Normal";
        MetarPhenomenonIntensity[MetarPhenomenonIntensity["Heavy"] = 1] = "Heavy";
    })(MetarPhenomenonIntensity || (MetarPhenomenonIntensity = {}));
    /**
     * Methods for working with FS ICAO strings.
     */
    class ICAO {
        /**
         * Gets the facility type from an ICAO.
         * @param icao The icao to get the facility type for.
         * @returns The ICAO facility type.
         * @throws An error if the facility type cannot be determined.
         */
        static getFacilityType(icao) {
            switch (icao[0]) {
                case 'A':
                    return FacilityType.Airport;
                case 'W':
                    return FacilityType.Intersection;
                case 'V':
                    return FacilityType.VOR;
                case 'N':
                    return FacilityType.NDB;
                case 'U':
                    return FacilityType.USR;
                case 'R':
                    return FacilityType.RWY;
                case 'S':
                    return FacilityType.VIS;
                default:
                    throw new Error(`ICAO ${icao} has unknown type: ${icao[0]}`);
            }
        }
        /**
         * Returns the ident of the icao's associated airport. (ex. for terminal waypoints)
         * @param icao The icao to get the airport ident for.
         * @returns The airport ident.
         */
        static getAssociatedAirportIdent(icao) {
            return icao.substr(3, 4).trim();
        }
        /**
         * Gets whether an icao is a facility type.
         * @param icao The icao to get the facility type for.
         * @returns a bool whether or not this icao is a facility type.
         */
        static isFacility(icao) {
            switch (icao[0]) {
                case 'A':
                case 'W':
                case 'V':
                case 'N':
                case 'U':
                case 'R':
                case 'S':
                    return true;
            }
            return false;
        }
        /**
         * Gets the ident for a given ICAO string.
         * @param icao The FS ICAO to get the ident for.
         * @returns The ICAO ident.
         */
        static getIdent(icao) {
            return icao.substr(7).trim();
        }
        /**
         * Gets the region code for a given ICAO string.
         * @param icao The FS ICAO to get the ident for.
         * @returns The two letter region code.
         */
        static getRegionCode(icao) {
            return icao.substr(1, 2).trim();
        }
    }
    /**
     * An empty ICAO.
     */
    ICAO.emptyIcao = '            ';

    var RunwaySurfaceCategory;
    (function (RunwaySurfaceCategory) {
        RunwaySurfaceCategory[RunwaySurfaceCategory["Unknown"] = 1] = "Unknown";
        RunwaySurfaceCategory[RunwaySurfaceCategory["Hard"] = 2] = "Hard";
        RunwaySurfaceCategory[RunwaySurfaceCategory["Soft"] = 4] = "Soft";
        RunwaySurfaceCategory[RunwaySurfaceCategory["Water"] = 8] = "Water";
    })(RunwaySurfaceCategory || (RunwaySurfaceCategory = {}));
    /**
     * Methods for working with Runways and Runway Designations.
     */
    class RunwayUtils {
        /**
         * Gets the letter for a runway designator.
         * @param designator A runway designator.
         * @param lowerCase Whether the letter should be lower case. False by default.
         * @returns The letter for the specified runway designator.
         */
        static getDesignatorLetter(designator, lowerCase = false) {
            const letter = RunwayUtils.RUNWAY_DESIGNATOR_LETTERS[designator];
            return lowerCase
                ? letter.toLowerCase()
                : letter;
        }
        /**
         * Creates an empty one-way runway.
         * @returns an empty one-way runway.
         */
        static createEmptyOneWayRunway() {
            return {
                parentRunwayIndex: -1,
                designation: '',
                direction: 36,
                runwayDesignator: RunwayDesignator.RUNWAY_DESIGNATOR_NONE,
                course: 0,
                elevation: 0,
                latitude: 0,
                longitude: 0,
                length: 0,
                startThresholdLength: 0,
                endThresholdLength: 0
            };
        }
        /**
         * Utility method to return two one-way runways from a single runway facility
         * @param runway is the AirportRunway object to evaluate
         * @param index is the index of the AirportRunway in the Facility
         * @returns splitRunways array of OneWayRunway objects
         */
        static getOneWayRunways(runway, index) {
            const splitRunways = [];
            const designations = runway.designation.split('-');
            for (let i = 0; i < designations.length; i++) {
                const runwayNumber = parseInt(designations[i]);
                let designator = RunwayDesignator.RUNWAY_DESIGNATOR_NONE;
                let course = 0;
                let thresholdDistanceFromCenter = 0;
                let thresholdElevation = 0;
                let ilsFrequency;
                let startThresholdLength = 0, endThresholdLength = 0;
                if (i === 0) {
                    designator = runway.designatorCharPrimary;
                    course = runway.direction;
                    thresholdDistanceFromCenter = (runway.length / 2) - runway.primaryThresholdLength;
                    thresholdElevation = runway.primaryElevation;
                    ilsFrequency = runway.primaryILSFrequency.freqMHz === 0 ? undefined : runway.primaryILSFrequency;
                    startThresholdLength = runway.primaryThresholdLength;
                    endThresholdLength = runway.secondaryThresholdLength;
                }
                else if (i === 1) {
                    designator = runway.designatorCharSecondary;
                    course = NavMath.normalizeHeading(runway.direction + 180);
                    thresholdDistanceFromCenter = (runway.length / 2) - runway.secondaryThresholdLength;
                    thresholdElevation = runway.secondaryElevation;
                    ilsFrequency = runway.secondaryILSFrequency.freqMHz === 0 ? undefined : runway.secondaryILSFrequency;
                    startThresholdLength = runway.secondaryThresholdLength;
                    endThresholdLength = runway.primaryThresholdLength;
                }
                const designation = RunwayUtils.getRunwayNameString(runwayNumber, designator);
                const coordinates = RunwayUtils.tempGeoPoint
                    .set(runway.latitude, runway.longitude)
                    .offset(course - 180, UnitType.METER.convertTo(thresholdDistanceFromCenter, UnitType.GA_RADIAN));
                splitRunways.push({
                    parentRunwayIndex: index,
                    designation,
                    direction: runwayNumber,
                    runwayDesignator: designator,
                    course,
                    elevation: thresholdElevation,
                    latitude: coordinates.lat,
                    longitude: coordinates.lon,
                    ilsFrequency,
                    length: runway.length,
                    startThresholdLength,
                    endThresholdLength
                });
            }
            return splitRunways;
        }
        /**
         * Utility method to return the runway name from the number and designator (L/R/C/W)
         * @param runwayNumber is the integer part of a runway name (18, 26, 27, etc)
         * @param designator is the RunwayDesignator enum for the runway
         * @param padded Whether single-char runways should be 0-padded.
         * @param prefix A prefix to put before the runway name.
         * @returns the runway name string
         */
        static getRunwayNameString(runwayNumber, designator, padded = true, prefix = '') {
            let numberText = `${runwayNumber}`;
            if (padded) {
                numberText = numberText.padStart(2, '0');
            }
            return prefix + numberText + RunwayUtils.getDesignatorLetter(designator);
        }
        /**
         * Gets a one-way runway from an airport that matches a runway designation by number and designator.
         * @param airport The airport facility in which to search for the match.
         * @param runwayNumber A runway number to match.
         * @param runwayDesignator A runway designator to match.
         * @returns The one-way runway which matches the designation, or undefined if no match could be found.
         */
        static matchOneWayRunway(airport, runwayNumber, runwayDesignator) {
            const length = airport.runways.length;
            for (let r = 0; r < length; r++) {
                const runway = airport.runways[r];
                const designation = runway.designation;
                const primaryRunwayNumber = parseInt(designation.split('-')[0]);
                const secondaryRunwayNumber = parseInt(designation.split('-')[1]);
                if (primaryRunwayNumber === runwayNumber && runway.designatorCharPrimary === runwayDesignator) {
                    const oneWayRunways = RunwayUtils.getOneWayRunways(runway, r);
                    return oneWayRunways[0];
                }
                else if (secondaryRunwayNumber === runwayNumber && runway.designatorCharSecondary === runwayDesignator) {
                    const oneWayRunways = RunwayUtils.getOneWayRunways(runway, r);
                    return oneWayRunways[1];
                }
            }
            return undefined;
        }
        /**
         * Gets a one-way runway from an airport that matches a runway designation string.
         * @param airport The airport facility in which to search for the match.
         * @param designation A runway designation.
         * @returns The one-way runway which matches the designation, or undefined if no match could be found.
         */
        static matchOneWayRunwayFromDesignation(airport, designation) {
            const length = airport.runways.length;
            for (let i = 0; i < length; i++) {
                const match = RunwayUtils.getOneWayRunways(airport.runways[i], i).find((r) => {
                    return (r.designation === designation);
                });
                if (match) {
                    return match;
                }
            }
            return undefined;
        }
        /**
         * Gets a one-way runway from an airport that matches a runway ident.
         * @param airport The airport facility in which to search for the match.
         * @param ident A runway ident.
         * @returns The one-way runway which matches the ident, or undefined if no match could be found.
         */
        static matchOneWayRunwayFromIdent(airport, ident) {
            return RunwayUtils.matchOneWayRunwayFromDesignation(airport, ident.substr(2).trim());
        }
        /**
         * Utility method to return the procedures for a given runway.
         * @param procedures The procedures for the airport.
         * @param runway The given runway to find procedures for.
         * @returns A list of approach procedures for the given runway.
         */
        static getProceduresForRunway(procedures, runway) {
            const oneways = new Array();
            // TODO Make the designation splitting logic a common routine too.
            const designations = runway.designation.split('-');
            for (let i = 0; i < designations.length; i++) {
                const runwayNumber = parseInt(designations[i]);
                let runwayName;
                if (i === 0) {
                    runwayName = RunwayUtils.getRunwayNameString(runwayNumber, runway.designatorCharPrimary, false, '');
                }
                else {
                    runwayName = RunwayUtils.getRunwayNameString(runwayNumber, runway.designatorCharSecondary, false, '');
                }
                oneways.push(runwayName);
            }
            const found = new Array();
            for (const procedure of procedures) {
                if (oneways.includes(procedure.runway.trim())) {
                    found.push(procedure);
                }
                else if (procedure.runwayNumber === 0) {
                    found.push(procedure);
                }
            }
            return found;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        static getLocFrequency(airport, arg1, arg2) {
            let runway;
            if (typeof arg1 === 'string') {
                const matchedRunway = RunwayUtils.matchOneWayRunwayFromDesignation(airport, arg1);
                if (!matchedRunway) {
                    return undefined;
                }
                runway = matchedRunway;
            }
            else if (typeof arg1 === 'number') {
                const matchedRunway = RunwayUtils.matchOneWayRunway(airport, arg1, arg2);
                if (!matchedRunway) {
                    return undefined;
                }
                runway = matchedRunway;
            }
            else {
                runway = arg1;
            }
            const runwayDesignation = runway.designation;
            if (runway.ilsFrequency) {
                return runway.ilsFrequency;
            }
            for (let i = 0; i < airport.frequencies.length; i++) {
                // Note: drop the leading zero in the runway designation for the search because some third-party sceneries
                // format the frequency names without the leading zero.
                const match = airport.frequencies[i].name.search(runwayDesignation.replace(/^0/, ''));
                if (match > -1) {
                    return airport.frequencies[i];
                }
            }
            return undefined;
        }
        /**
         * Gets the back course frequency for a runway.
         * @param airport The airport to which the query runway belongs.
         * @param runwayNumber The number of the query runway.
         * @param runwayDesignator The designator of the query runway.
         * @returns The bc frequency for the query runway, or undefined if one could not be found.
         */
        static getBcFrequency(airport, runwayNumber, runwayDesignator) {
            const matchedRunway = RunwayUtils.getOppositeOneWayRunway(airport, runwayNumber, runwayDesignator);
            if (!matchedRunway) {
                return undefined;
            }
            return RunwayUtils.getLocFrequency(airport, matchedRunway);
        }
        /**
         * Get the opposite one way runway from a runway number and designator.
         * @param airport The airport to which the query runway belongs.
         * @param runwayNumber The number of the query runway.
         * @param runwayDesignator The designator of the query runway.
         * @returns The opposite one way runway for the query runway, or undefined if one could not be found.
         */
        static getOppositeOneWayRunway(airport, runwayNumber, runwayDesignator) {
            const oppositeRunwayNumber = Math.round(NavMath.normalizeHeading(10 * (runwayNumber + 18)) / 10);
            let oppositeRunwayDesignator = RunwayDesignator.RUNWAY_DESIGNATOR_NONE;
            switch (runwayDesignator) {
                case RunwayDesignator.RUNWAY_DESIGNATOR_LEFT:
                    oppositeRunwayDesignator = RunwayDesignator.RUNWAY_DESIGNATOR_RIGHT;
                    break;
                case RunwayDesignator.RUNWAY_DESIGNATOR_RIGHT:
                    oppositeRunwayDesignator = RunwayDesignator.RUNWAY_DESIGNATOR_LEFT;
                    break;
                default:
                    oppositeRunwayDesignator = runwayDesignator;
                    break;
            }
            return RunwayUtils.matchOneWayRunway(airport, oppositeRunwayNumber, oppositeRunwayDesignator);
        }
        /**
         * A comparer for sorting runways by number, and then by L, C, and R.
         * @param r1 The first runway to compare.
         * @param r2 The second runway to compare.
         * @returns -1 if the first is before, 0 if equal, 1 if the first is after.
         */
        static sortRunways(r1, r2) {
            if (r1.direction === r2.direction) {
                let v1 = 0;
                if (r1.designation.indexOf('L') != -1) {
                    v1 = 1;
                }
                else if (r1.designation.indexOf('C') != -1) {
                    v1 = 2;
                }
                else if (r1.designation.indexOf('R') != -1) {
                    v1 = 3;
                }
                let v2 = 0;
                if (r2.designation.indexOf('L') != -1) {
                    v2 = 1;
                }
                else if (r2.designation.indexOf('C') != -1) {
                    v2 = 2;
                }
                else if (r2.designation.indexOf('R') != -1) {
                    v2 = 3;
                }
                return v1 - v2;
            }
            return r1.direction - r2.direction;
        }
        /**
         * Gets the ICAO string for the runway facility associated with a one-way runway.
         * @param airport The runway's parent airport.
         * @param runway A one-way runway.
         * @returns the ICAO string for the runway facility associated with the one-way runway.
         */
        static getRunwayFacilityIcao(airport, runway) {
            return `R  ${airport.icao.substr(7, 4)}RW${runway.designation.padEnd(3, ' ')}`;
        }
        /**
         * Creates a runway waypoint facility from a runway.
         * @param airport The runway's parent airport.
         * @param runway A one-way runway.
         * @returns A runway waypoint facility corresponding to the runway.
         */
        static createRunwayFacility(airport, runway) {
            return {
                icao: RunwayUtils.getRunwayFacilityIcao(airport, runway),
                name: `Runway ${runway.designation}`,
                region: airport.region,
                city: airport.city,
                lat: runway.latitude,
                lon: runway.longitude,
                magvar: airport.magvar,
                runway
            };
        }
        /**
         * Gets an alpha code from a runway number.
         * @param number is the runway number.
         * @returns a letter.
         */
        static getRunwayCode(number) {
            const n = Math.round(number);
            return String.fromCharCode(48 + n + (n > 9 ? 7 : 0));
        }
        /**
         * Gets the runway surface category from a runway based on its surface type.
         * @param runway An {@link AirportRunway}.
         * @returns The surface category of that runway.
         */
        static getSurfaceCategory(runway) {
            if (this.SURFACES_HARD.includes(runway.surface)) {
                return RunwaySurfaceCategory.Hard;
            }
            else if (this.SURFACES_SOFT.includes(runway.surface)) {
                return RunwaySurfaceCategory.Soft;
            }
            else if (this.SURFACES_WATER.includes(runway.surface)) {
                return RunwaySurfaceCategory.Water;
            }
            else {
                return RunwaySurfaceCategory.Unknown;
            }
        }
    }
    RunwayUtils.RUNWAY_DESIGNATOR_LETTERS = {
        [RunwayDesignator.RUNWAY_DESIGNATOR_NONE]: '',
        [RunwayDesignator.RUNWAY_DESIGNATOR_LEFT]: 'L',
        [RunwayDesignator.RUNWAY_DESIGNATOR_RIGHT]: 'R',
        [RunwayDesignator.RUNWAY_DESIGNATOR_CENTER]: 'C',
        [RunwayDesignator.RUNWAY_DESIGNATOR_WATER]: 'W',
        [RunwayDesignator.RUNWAY_DESIGNATOR_A]: 'A',
        [RunwayDesignator.RUNWAY_DESIGNATOR_B]: 'B',
    };
    RunwayUtils.SURFACES_HARD = [
        RunwaySurfaceType.Asphalt,
        RunwaySurfaceType.Bituminous,
        RunwaySurfaceType.Brick,
        RunwaySurfaceType.Concrete,
        RunwaySurfaceType.Ice,
        RunwaySurfaceType.Macadam,
        RunwaySurfaceType.Paint,
        RunwaySurfaceType.Planks,
        RunwaySurfaceType.SteelMats,
        RunwaySurfaceType.Tarmac,
        RunwaySurfaceType.Urban,
    ];
    RunwayUtils.SURFACES_SOFT = [
        RunwaySurfaceType.Coral,
        RunwaySurfaceType.Dirt,
        RunwaySurfaceType.Forest,
        RunwaySurfaceType.Grass,
        RunwaySurfaceType.GrassBumpy,
        RunwaySurfaceType.Gravel,
        RunwaySurfaceType.HardTurf,
        RunwaySurfaceType.LongGrass,
        RunwaySurfaceType.OilTreated,
        RunwaySurfaceType.Sand,
        RunwaySurfaceType.Shale,
        RunwaySurfaceType.ShortGrass,
        RunwaySurfaceType.Snow,
        RunwaySurfaceType.WrightFlyerTrack
    ];
    RunwayUtils.SURFACES_WATER = [
        RunwaySurfaceType.WaterFSX,
        RunwaySurfaceType.Lake,
        RunwaySurfaceType.Ocean,
        RunwaySurfaceType.Pond,
        RunwaySurfaceType.River,
        RunwaySurfaceType.WasteWater,
        RunwaySurfaceType.Water
    ];
    RunwayUtils.tempGeoPoint = new GeoPoint(0, 0);

    /**
     * Types of airspaces.
     */
    var AirspaceType;
    (function (AirspaceType) {
        AirspaceType[AirspaceType["None"] = 0] = "None";
        AirspaceType[AirspaceType["Center"] = 1] = "Center";
        AirspaceType[AirspaceType["ClassA"] = 2] = "ClassA";
        AirspaceType[AirspaceType["ClassB"] = 3] = "ClassB";
        AirspaceType[AirspaceType["ClassC"] = 4] = "ClassC";
        AirspaceType[AirspaceType["ClassD"] = 5] = "ClassD";
        AirspaceType[AirspaceType["ClassE"] = 6] = "ClassE";
        AirspaceType[AirspaceType["ClassF"] = 7] = "ClassF";
        AirspaceType[AirspaceType["ClassG"] = 8] = "ClassG";
        AirspaceType[AirspaceType["Tower"] = 9] = "Tower";
        AirspaceType[AirspaceType["Clearance"] = 10] = "Clearance";
        AirspaceType[AirspaceType["Ground"] = 11] = "Ground";
        AirspaceType[AirspaceType["Departure"] = 12] = "Departure";
        AirspaceType[AirspaceType["Approach"] = 13] = "Approach";
        AirspaceType[AirspaceType["MOA"] = 14] = "MOA";
        AirspaceType[AirspaceType["Restricted"] = 15] = "Restricted";
        AirspaceType[AirspaceType["Prohibited"] = 16] = "Prohibited";
        AirspaceType[AirspaceType["Warning"] = 17] = "Warning";
        AirspaceType[AirspaceType["Alert"] = 18] = "Alert";
        AirspaceType[AirspaceType["Danger"] = 19] = "Danger";
        AirspaceType[AirspaceType["Nationalpark"] = 20] = "Nationalpark";
        AirspaceType[AirspaceType["ModeC"] = 21] = "ModeC";
        AirspaceType[AirspaceType["Radar"] = 22] = "Radar";
        AirspaceType[AirspaceType["Training"] = 23] = "Training";
        AirspaceType[AirspaceType["Max"] = 24] = "Max";
    })(AirspaceType || (AirspaceType = {}));

    /**
     * A viewlistener that gets autopilot mode information.
     */
    var MSFSAPStates;
    (function (MSFSAPStates) {
        MSFSAPStates[MSFSAPStates["LogicOn"] = 1] = "LogicOn";
        MSFSAPStates[MSFSAPStates["APOn"] = 2] = "APOn";
        MSFSAPStates[MSFSAPStates["FDOn"] = 4] = "FDOn";
        MSFSAPStates[MSFSAPStates["FLC"] = 8] = "FLC";
        MSFSAPStates[MSFSAPStates["Alt"] = 16] = "Alt";
        MSFSAPStates[MSFSAPStates["AltArm"] = 32] = "AltArm";
        MSFSAPStates[MSFSAPStates["GS"] = 64] = "GS";
        MSFSAPStates[MSFSAPStates["GSArm"] = 128] = "GSArm";
        MSFSAPStates[MSFSAPStates["Pitch"] = 256] = "Pitch";
        MSFSAPStates[MSFSAPStates["VS"] = 512] = "VS";
        MSFSAPStates[MSFSAPStates["Heading"] = 1024] = "Heading";
        MSFSAPStates[MSFSAPStates["Nav"] = 2048] = "Nav";
        MSFSAPStates[MSFSAPStates["NavArm"] = 4096] = "NavArm";
        MSFSAPStates[MSFSAPStates["WingLevel"] = 8192] = "WingLevel";
        MSFSAPStates[MSFSAPStates["Attitude"] = 16384] = "Attitude";
        MSFSAPStates[MSFSAPStates["ThrottleSpd"] = 32768] = "ThrottleSpd";
        MSFSAPStates[MSFSAPStates["ThrottleMach"] = 65536] = "ThrottleMach";
        MSFSAPStates[MSFSAPStates["ATArm"] = 131072] = "ATArm";
        MSFSAPStates[MSFSAPStates["YD"] = 262144] = "YD";
        MSFSAPStates[MSFSAPStates["EngineRPM"] = 524288] = "EngineRPM";
        MSFSAPStates[MSFSAPStates["TOGAPower"] = 1048576] = "TOGAPower";
        MSFSAPStates[MSFSAPStates["Autoland"] = 2097152] = "Autoland";
        MSFSAPStates[MSFSAPStates["TOGAPitch"] = 4194304] = "TOGAPitch";
        MSFSAPStates[MSFSAPStates["Bank"] = 8388608] = "Bank";
        MSFSAPStates[MSFSAPStates["FBW"] = 16777216] = "FBW";
        MSFSAPStates[MSFSAPStates["AvionicsManaged"] = 33554432] = "AvionicsManaged";
        MSFSAPStates[MSFSAPStates["None"] = -2147483648] = "None";
    })(MSFSAPStates || (MSFSAPStates = {}));

    /// <reference types="msfstypes/JS/common" />
    /**
     * A type map of facility type to facility search type.
     */
    ({
        /** Airport facility type. */
        [FacilityType.Airport]: FacilitySearchType.Airport,
        /** Intersection facility type. */
        [FacilityType.Intersection]: FacilitySearchType.Intersection,
        /** NDB facility type. */
        [FacilityType.NDB]: FacilitySearchType.Ndb,
        /** VOR facility type. */
        [FacilityType.VOR]: FacilitySearchType.Vor,
        /** USR facility type. */
        [FacilityType.USR]: FacilitySearchType.User
    });
    /**
     * A class that handles loading facility data from the simulator.
     */
    class FacilityLoader {
        /**
         * Creates an instance of the FacilityLoader.
         * @param facilityRepo A local facility repository.
         * @param onInitialized A callback to call when the facility loader has completed initialization.
         */
        constructor(facilityRepo, onInitialized = () => { }) {
            this.facilityRepo = facilityRepo;
            this.onInitialized = onInitialized;
            if (FacilityLoader.facilityListener === undefined) {
                FacilityLoader.facilityListener = RegisterViewListener('JS_LISTENER_FACILITY', () => {
                    FacilityLoader.facilityListener.on('SendAirport', FacilityLoader.onFacilityReceived);
                    FacilityLoader.facilityListener.on('SendIntersection', FacilityLoader.onFacilityReceived);
                    FacilityLoader.facilityListener.on('SendVor', FacilityLoader.onFacilityReceived);
                    FacilityLoader.facilityListener.on('SendNdb', FacilityLoader.onFacilityReceived);
                    FacilityLoader.facilityListener.on('NearestSearchCompleted', FacilityLoader.onNearestSearchCompleted);
                    setTimeout(() => FacilityLoader.init(), 2000);
                }, true);
            }
            this.awaitInitialization().then(() => this.onInitialized());
        }
        /**
         * Initializes this facility loader.
         */
        static init() {
            FacilityLoader.isInitialized = true;
            for (const resolve of this.initPromiseResolveQueue) {
                resolve();
            }
            this.initPromiseResolveQueue.length = 0;
        }
        /**
         * Waits until this facility loader is initialized.
         * @returns A Promise which is fulfilled when this facility loader is initialized.
         */
        awaitInitialization() {
            if (FacilityLoader.isInitialized) {
                return Promise.resolve();
            }
            else {
                return new Promise(resolve => {
                    FacilityLoader.initPromiseResolveQueue.push(resolve);
                });
            }
        }
        /**
         * Retrieves a facility.
         * @param type The type of facility to retrieve.
         * @param icao The ICAO of the facility to retrieve.
         * @returns A Promise which will be fulfilled with the requested facility, or rejected if the facility could not be
         * retrieved.
         */
        getFacility(type, icao) {
            switch (type) {
                case FacilityType.USR:
                case FacilityType.RWY:
                case FacilityType.VIS:
                    return this.getFacilityFromRepo(type, icao);
                default:
                    return this.getFacilityFromCoherent(type, icao);
            }
        }
        // eslint-disable-next-line jsdoc/require-throws
        /**
         * Retrieves a facility from the local facility repository.
         * @param type The type of facility to retrieve.
         * @param icao The ICAO of the facility to retrieve.
         * @returns A Promise which will be fulfilled with the requested facility, or rejected if the facility could not be
         * retrieved.
         */
        async getFacilityFromRepo(type, icao) {
            const fac = this.facilityRepo.get(icao);
            if (fac) {
                return fac;
            }
            else if (type === FacilityType.RWY) {
                try {
                    const airport = await this.getFacility(FacilityType.Airport, `A      ${icao.substr(3, 4)} `);
                    const runway = RunwayUtils.matchOneWayRunwayFromIdent(airport, ICAO.getIdent(icao));
                    if (runway) {
                        const runwayFac = RunwayUtils.createRunwayFacility(airport, runway);
                        this.facilityRepo.add(runwayFac);
                        return runwayFac;
                    }
                }
                catch (e) {
                    // noop
                }
            }
            throw `Facility ${icao} could not be found.`;
        }
        /**
         * Retrieves a facility from Coherent.
         * @param type The type of facility to retrieve.
         * @param icao The ICAO of the facility to retrieve.
         * @returns A Promise which will be fulfilled with the requested facility, or rejected if the facility could not be
         * retrieved.
         */
        async getFacilityFromCoherent(type, icao) {
            const isMismatch = ICAO.getFacilityType(icao) !== type;
            let queue = FacilityLoader.requestQueue;
            let cache = FacilityLoader.facCache;
            if (isMismatch) {
                queue = FacilityLoader.mismatchRequestQueue;
                cache = FacilityLoader.typeMismatchFacCache;
            }
            if (!FacilityLoader.isInitialized) {
                await this.awaitInitialization();
            }
            const cachedFac = cache.get(icao);
            if (cachedFac !== undefined) {
                return Promise.resolve(cachedFac);
            }
            const currentTime = Date.now();
            let request = queue.get(icao);
            if (request === undefined || currentTime - request.timeStamp > 10000) {
                if (request !== undefined) {
                    request.reject(`Facility request for ${icao} has timed out.`);
                }
                let resolve = undefined;
                let reject = undefined;
                const promise = new Promise((resolution, rejection) => {
                    resolve = resolution;
                    reject = rejection;
                    Coherent.call(type, icao).then((isValid) => {
                        if (!isValid) {
                            rejection(`Facility ${icao} could not be found.`);
                            queue.delete(icao);
                        }
                    });
                });
                request = { promise, timeStamp: currentTime, resolve: resolve, reject: reject };
                queue.set(icao, request);
            }
            return request.promise;
        }
        /**
         * Gets airway data from the sim.
         * @param airwayName The airway name.
         * @param airwayType The airway type.
         * @param icao The 12 character FS ICAO of at least one intersection in the airway.
         * @returns The retrieved airway.
         * @throws an error if no airway is returned
         */
        async getAirway(airwayName, airwayType, icao) {
            if (FacilityLoader.airwayCache.has(airwayName)) {
                const cachedAirway = FacilityLoader.airwayCache.get(airwayName);
                const match = cachedAirway === null || cachedAirway === void 0 ? void 0 : cachedAirway.waypoints.find((w) => {
                    w.icao === icao;
                });
                if (match !== undefined && cachedAirway !== undefined) {
                    return cachedAirway;
                }
            }
            const fac = await this.getFacility(FacilityType.Intersection, icao);
            const route = fac.routes.find((r) => r.name === airwayName);
            if (route !== undefined) {
                const airwayBuilder = new AirwayBuilder(fac, route, this);
                const status = await airwayBuilder.startBuild();
                if (status === AirwayStatus.COMPLETE) {
                    const waypoints = airwayBuilder.waypoints;
                    if (waypoints !== null) {
                        const airway = new AirwayObject(airwayName, airwayType);
                        airway.waypoints = [...waypoints];
                        FacilityLoader.addToAirwayCache(airway);
                        return airway;
                    }
                }
            }
            throw new Error('Airway could not be found.');
        }
        /**
         * Starts a nearest facilities search session.
         * @param type The type of facilities for which to search.
         * @returns A Promise which will be fulfilled with the new nearest search session.
         */
        async startNearestSearchSession(type) {
            switch (type) {
                case FacilitySearchType.User:
                    return this.startRepoNearestSearchSession(type);
                default:
                    return this.startCoherentNearestSearchSession(type);
            }
        }
        /**
         * Starts a sim-side nearest facilities search session through Coherent.
         * @param type The type of facilities for which to search.
         * @returns A Promise which will be fulfilled with the new nearest search session.
         */
        async startCoherentNearestSearchSession(type) {
            if (!FacilityLoader.isInitialized) {
                await this.awaitInitialization();
            }
            const sessionId = await Coherent.call('START_NEAREST_SEARCH_SESSION', type);
            let session;
            switch (type) {
                case FacilitySearchType.Airport:
                    session = new NearestAirportSearchSession(sessionId);
                    break;
                case FacilitySearchType.Intersection:
                    session = new NearestIntersectionSearchSession(sessionId);
                    break;
                case FacilitySearchType.Vor:
                    session = new NearestIntersectionSearchSession(sessionId);
                    break;
                case FacilitySearchType.Boundary:
                    session = new NearestBoundarySearchSession(sessionId);
                    break;
                default:
                    session = new CoherentNearestSearchSession(sessionId);
                    break;
            }
            FacilityLoader.searchSessions.set(sessionId, session);
            return session;
        }
        /**
         * Starts a repository facilities search session.
         * @param type The type of facilities for which to search.
         * @returns A Promise which will be fulfilled with the new nearest search session.
         * @throws Error if the search type is not supported.
         */
        startRepoNearestSearchSession(type) {
            // Session ID doesn't really matter for these, so in order to not conflict with IDs from Coherent, we will set
            // them all to negative numbers
            const sessionId = FacilityLoader.repoSearchSessionId--;
            switch (type) {
                case FacilitySearchType.User:
                    return new NearestUserFacilitySearchSession(this.facilityRepo, sessionId);
                default:
                    throw new Error();
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        async getMetar(arg) {
            if (!FacilityLoader.isInitialized) {
                await this.awaitInitialization();
            }
            const ident = typeof arg === 'string' ? arg : ICAO.getIdent(arg.icao);
            const metar = await Coherent.call('GET_METAR_BY_IDENT', ident);
            return FacilityLoader.cleanMetar(metar);
        }
        /**
         * Searches for the METAR issued for the closest airport to a given location.
         * @param lat The latitude of the center of the search, in degrees.
         * @param lon The longitude of the center of the search, in degrees.
         * @returns The METAR issued for the closest airport to the given location, or undefined if none could be found.
         */
        async searchMetar(lat, lon) {
            if (!FacilityLoader.isInitialized) {
                await this.awaitInitialization();
            }
            const metar = await Coherent.call('GET_METAR_BY_LATLON', lat, lon);
            return FacilityLoader.cleanMetar(metar);
        }
        /**
         * Cleans up a raw METAR object.
         * @param raw A raw METAR object.
         * @returns A cleaned version of the raw METAR object, or undefined if the raw METAR is empty.
         */
        static cleanMetar(raw) {
            if (raw.icao === '') {
                return undefined;
            }
            raw.gust < 0 && delete raw.gust;
            raw.vertVis < 0 && delete raw.vertVis;
            isNaN(raw.altimeterA) && delete raw.altimeterA;
            raw.altimeterQ < 0 && delete raw.altimeterQ;
            isNaN(raw.slp) && delete raw.slp;
            return raw;
        }
        /**
         * Searches for ICAOs by their ident portion only.
         * @param filter The type of facility to filter by. Selecting ALL will search all facility type ICAOs.
         * @param ident The partial or complete ident to search for.
         * @param maxItems The max number of matches to return.
         * @returns A collection of matched ICAOs.
         */
        async searchByIdent(filter, ident, maxItems = 40) {
            if (!FacilityLoader.isInitialized) {
                await this.awaitInitialization();
            }
            const results = await Coherent.call('SEARCH_BY_IDENT', ident, filter, maxItems);
            if (filter === FacilitySearchType.User || filter === FacilitySearchType.All) {
                this.facilityRepo.forEach(fac => {
                    const facIdent = ICAO.getIdent(fac.icao);
                    if (facIdent === ident) {
                        results.unshift(fac.icao);
                    }
                    else if (facIdent.startsWith(ident)) {
                        results.push(fac.icao);
                    }
                }, FacilityLoader.facRepositorySearchTypes);
            }
            return results;
        }
        /**
         * Searches for facilities matching a given ident, and returns the matching facilities, with nearest at the beginning of the array.
         * @param filter The type of facility to filter by. Selecting ALL will search all facility type ICAOs, except for boundary facilities.
         * @param ident The exact ident to search for. (ex: DEN, KDEN, ITADO)
         * @param lat The latitude to find facilities nearest to.
         * @param lon The longitude to find facilities nearest to.
         * @param maxItems The max number of matches to return.
         * @returns An array of matching facilities, sorted by distance to the given lat/lon, with nearest at the beginning of the array.
         */
        async findNearestFacilitiesByIdent(filter, ident, lat, lon, maxItems = 40) {
            const results = await this.searchByIdent(filter, ident, maxItems);
            if (!results) {
                return [];
            }
            const promises = [];
            for (let i = 0; i < results.length; i++) {
                const icao = results[i];
                const facIdent = ICAO.getIdent(icao);
                if (facIdent === ident) {
                    const facType = ICAO.getFacilityType(icao);
                    promises.push(this.getFacility(facType, icao));
                }
            }
            const foundFacilities = await Promise.all(promises);
            if (foundFacilities.length > 1) {
                foundFacilities.sort((a, b) => GeoPoint.distance(lat, lon, a.lat, a.lon) - GeoPoint.distance(lat, lon, b.lat, b.lon));
                return foundFacilities;
            }
            else if (foundFacilities.length === 1) {
                return foundFacilities;
            }
            else {
                return [];
            }
        }
        /**
         * A callback called when a facility is received from the simulator.
         * @param facility The received facility.
         */
        static onFacilityReceived(facility) {
            const isMismatch = facility['__Type'] === 'JS_FacilityIntersection' && facility.icao[0] !== 'W';
            const queue = isMismatch ? FacilityLoader.mismatchRequestQueue : FacilityLoader.requestQueue;
            const request = queue.get(facility.icao);
            if (request !== undefined) {
                request.resolve(facility);
                FacilityLoader.addToFacilityCache(facility, isMismatch);
                queue.delete(facility.icao);
            }
        }
        /**
         * A callback called when a search completes.
         * @param results The results of the search.
         */
        static onNearestSearchCompleted(results) {
            const session = FacilityLoader.searchSessions.get(results.sessionId);
            if (session instanceof CoherentNearestSearchSession) {
                session.onSearchCompleted(results);
            }
        }
        /**
         * Adds a facility to the cache.
         * @param fac The facility to add.
         * @param isTypeMismatch Whether to add the facility to the type mismatch cache.
         */
        static addToFacilityCache(fac, isTypeMismatch) {
            const cache = isTypeMismatch ? FacilityLoader.typeMismatchFacCache : FacilityLoader.facCache;
            cache.set(fac.icao, fac);
            if (cache.size > FacilityLoader.MAX_FACILITY_CACHE_ITEMS) {
                cache.delete(cache.keys().next().value);
            }
        }
        /**
         * Adds an airway to the airway cache.
         * @param airway The airway to add.
         */
        static addToAirwayCache(airway) {
            FacilityLoader.airwayCache.set(airway.name, airway);
            if (FacilityLoader.airwayCache.size > FacilityLoader.MAX_AIRWAY_CACHE_ITEMS) {
                FacilityLoader.airwayCache.delete(FacilityLoader.airwayCache.keys().next().value);
            }
        }
    }
    FacilityLoader.MAX_FACILITY_CACHE_ITEMS = 1000;
    FacilityLoader.MAX_AIRWAY_CACHE_ITEMS = 1000;
    FacilityLoader.requestQueue = new Map();
    FacilityLoader.mismatchRequestQueue = new Map();
    FacilityLoader.facCache = new Map();
    FacilityLoader.typeMismatchFacCache = new Map();
    FacilityLoader.airwayCache = new Map();
    FacilityLoader.searchSessions = new Map();
    FacilityLoader.facRepositorySearchTypes = [FacilityType.USR];
    FacilityLoader.repoSearchSessionId = -1;
    FacilityLoader.isInitialized = false;
    FacilityLoader.initPromiseResolveQueue = [];
    /**
     * A session for searching for nearest facilities through Coherent.
     */
    class CoherentNearestSearchSession {
        /**
         * Creates an instance of a CoherentNearestSearchSession.
         * @param sessionId The ID of the session.
         */
        constructor(sessionId) {
            this.sessionId = sessionId;
            this.searchQueue = new Map();
        }
        /** @inheritdoc */
        searchNearest(lat, lon, radius, maxItems) {
            const promise = new Promise((resolve) => {
                Coherent.call('SEARCH_NEAREST', this.sessionId, lat, lon, radius, maxItems)
                    .then((searchId) => {
                    this.searchQueue.set(searchId, { promise, resolve });
                });
            });
            return promise;
        }
        /**
         * A callback called by the facility loader when a nearest search has completed.
         * @param results The search results.
         */
        onSearchCompleted(results) {
            const request = this.searchQueue.get(results.searchId);
            if (request !== undefined) {
                request.resolve(results);
                this.searchQueue.delete(results.searchId);
            }
        }
    }
    /**
     * A session for searching for nearest airports.
     */
    class NearestAirportSearchSession extends CoherentNearestSearchSession {
        /**
         * Sets the filter for the airport nearest search.
         * @param showClosed Whether or not to show closed airports.
         * @param classMask A bitmask to determine which JS airport classes to show.
         */
        setAirportFilter(showClosed, classMask) {
            Coherent.call('SET_NEAREST_AIRPORT_FILTER', this.sessionId, showClosed ? 1 : 0, classMask);
        }
        /**
         * Sets the extended airport filters for the airport nearest search.
         * @param surfaceTypeMask A bitmask of allowable runway surface types.
         * @param approachTypeMask A bitmask of allowable approach types.
         * @param toweredMask A bitmask of untowered (1) or towered (2) bits.
         * @param minRunwayLength The minimum allowable runway length, in meters.
         */
        setExtendedAirportFilters(surfaceTypeMask, approachTypeMask, toweredMask, minRunwayLength) {
            Coherent.call('SET_NEAREST_EXTENDED_AIRPORT_FILTERS', this.sessionId, surfaceTypeMask, approachTypeMask, toweredMask, minRunwayLength);
        }
    }
    /**
     * Default filters for the nearest airports search session.
     */
    NearestAirportSearchSession.Defaults = {
        ShowClosed: false,
        ClassMask: BitFlags.union(BitFlags.createFlag(AirportClass.HardSurface), BitFlags.createFlag(AirportClass.SoftSurface), BitFlags.createFlag(AirportClass.AllWater), BitFlags.createFlag(AirportClass.HeliportOnly), BitFlags.createFlag(AirportClass.Private)),
        SurfaceTypeMask: 2147483647,
        ApproachTypeMask: 2147483647,
        MinimumRunwayLength: 0,
        ToweredMask: 3
    };
    /**
     * A session for searching for nearest intersections.
     */
    class NearestIntersectionSearchSession extends CoherentNearestSearchSession {
        /**
         * Sets the filter for the intersection nearest search.
         * @param typeMask A bitmask to determine which JS intersection types to show.
         */
        setIntersectionFilter(typeMask) {
            Coherent.call('SET_NEAREST_INTERSECTION_FILTER', this.sessionId, typeMask);
        }
    }
    /**
     * Default filters for the nearest intersections search session.
     */
    NearestIntersectionSearchSession.Defaults = {
        TypeMask: BitFlags.union(BitFlags.createFlag(IntersectionType.Named), BitFlags.createFlag(IntersectionType.Unnamed), BitFlags.createFlag(IntersectionType.Offroute), BitFlags.createFlag(IntersectionType.IAF), BitFlags.createFlag(IntersectionType.FAF))
    };
    /**
     * A session for searching for nearest VORs.
     */
    class NearestVorSearchSession extends CoherentNearestSearchSession {
        /**
         * Sets the filter for the VOR nearest search.
         * @param classMask A bitmask to determine which JS VOR classes to show.
         * @param typeMask A bitmask to determine which JS VOR types to show.
         */
        setVorFilter(classMask, typeMask) {
            Coherent.call('SET_NEAREST_VOR_FILTER', this.sessionId, classMask, typeMask);
        }
    }
    /**
     * Default filters for the nearest VORs search session.
     */
    NearestVorSearchSession.Defaults = {
        ClassMask: BitFlags.union(BitFlags.createFlag(VorClass.Terminal), BitFlags.createFlag(VorClass.HighAlt), BitFlags.createFlag(VorClass.LowAlt)),
        TypeMask: BitFlags.union(BitFlags.createFlag(VorType.VOR), BitFlags.createFlag(VorType.DME), BitFlags.createFlag(VorType.VORDME), BitFlags.createFlag(VorType.VORTAC), BitFlags.createFlag(VorType.TACAN))
    };
    /**
     * A session for searching for nearest airspace boundaries.
     */
    class NearestBoundarySearchSession extends CoherentNearestSearchSession {
        /**
         * Sets the filter for the boundary nearest search.
         * @param classMask A bitmask to determine which boundary classes to show.
         */
        setBoundaryFilter(classMask) {
            Coherent.call('SET_NEAREST_BOUNDARY_FILTER', this.sessionId, classMask);
        }
    }
    /**
     * A session for searching for nearest user facilities.
     */
    class NearestUserFacilitySearchSession {
        /**
         * Creates an instance of a NearestUserSearchSession.
         * @param repo The facility repository in which to search.
         * @param sessionId The ID of the session.
         */
        constructor(repo, sessionId) {
            this.repo = repo;
            this.sessionId = sessionId;
            this.filter = undefined;
            this.cachedResults = new Set();
            this.searchId = 0;
        }
        /** @inheritdoc */
        searchNearest(lat, lon, radius, maxItems) {
            const radiusGAR = UnitType.METER.convertTo(radius, UnitType.GA_RADIAN);
            const results = this.repo.search(FacilityType.USR, lat, lon, radiusGAR, maxItems, [], this.filter);
            const added = [];
            for (let i = 0; i < results.length; i++) {
                const icao = results[i].icao;
                if (this.cachedResults.has(icao)) {
                    this.cachedResults.delete(icao);
                }
                else {
                    added.push(icao);
                }
            }
            const removed = Array.from(this.cachedResults);
            this.cachedResults.clear();
            for (let i = 0; i < results.length; i++) {
                this.cachedResults.add(results[i].icao);
            }
            return Promise.resolve({
                sessionId: this.sessionId,
                searchId: this.searchId++,
                added,
                removed
            });
        }
        /**
         * Sets the filter for this search session.
         * @param filter A function to filter the search results.
         */
        setUserFacilityFilter(filter) {
            this.filter = filter;
        }
    }
    /**
     * An airway.
     */
    class AirwayObject {
        /** Builds a Airway
         * @param name - the name of the new airway.
         * @param type - the type of the new airway.
         */
        constructor(name, type) {
            this._waypoints = [];
            this._name = name;
            this._type = type;
        }
        /**
         * Gets the name of the airway
         * @returns the airway name
         */
        get name() {
            return this._name;
        }
        /**
         * Gets the type of the airway
         * @returns the airway type
         */
        get type() {
            return this._type;
        }
        /**
         * Gets the waypoints of this airway.
         * @returns the waypoints of this airway.
         */
        get waypoints() {
            return this._waypoints;
        }
        /**
         * Sets the waypoints of this airway.
         * @param waypoints is the array of waypoints.
         */
        set waypoints(waypoints) {
            this._waypoints = waypoints;
        }
    }
    /**
     * WT Airway Status Enum
     */
    var AirwayStatus;
    (function (AirwayStatus) {
        /**
         * @readonly
         * @property {number} INCOMPLETE - indicates waypoints have not been loaded yet.
         */
        AirwayStatus[AirwayStatus["INCOMPLETE"] = 0] = "INCOMPLETE";
        /**
         * @readonly
         * @property {number} COMPLETE - indicates all waypoints have been successfully loaded.
         */
        AirwayStatus[AirwayStatus["COMPLETE"] = 1] = "COMPLETE";
        /**
         * @readonly
         * @property {number} PARTIAL - indicates some, but not all, waypoints have been successfully loaded.
         */
        AirwayStatus[AirwayStatus["PARTIAL"] = 2] = "PARTIAL";
    })(AirwayStatus || (AirwayStatus = {}));
    /**
     * The Airway Builder.
     */
    class AirwayBuilder {
        /** Creates an instance of the AirwayBuilder
         * @param _initialWaypoint is the initial intersection facility
         * @param _initialData is the intersection route to build from
         * @param facilityLoader is an instance of the facility loader
         */
        constructor(_initialWaypoint, _initialData, facilityLoader) {
            this._initialWaypoint = _initialWaypoint;
            this._initialData = _initialData;
            this.facilityLoader = facilityLoader;
            this._waypointsArray = [];
            this._hasStarted = false;
            this._isDone = false;
        }
        // constructor(private _initialWaypoint: IntersectionFacility, private _requestEntry: (entry: string) => Promise<IntersectionFacility>) {
        // }
        /**
         * Get whether this builder has started loading waypoints
         * @returns whether this builder has started
         */
        get hasStarted() {
            return this._hasStarted;
        }
        /**
         * Get whether this builder is done loading waypoints
         * @returns whether this builder is done loading waypoints
         */
        get isDone() {
            return this._isDone;
        }
        /**
         * Get the airway waypoints
         * @returns the airway waypoints, or null
         */
        get waypoints() {
            return this._waypointsArray;
        }
        /** Steps through the airway waypoints
         * @param stepForward is the direction to step; true = forward, false = backward
         * @param arrayInsertFunc is the arrayInsertFunc
         */
        async _step(stepForward, arrayInsertFunc) {
            let isDone = false;
            let current = this._initialData;
            while (!isDone && current) {
                const nextICAO = stepForward ? current.nextIcao : current.prevIcao;
                if (nextICAO && nextICAO.length > 0 && nextICAO[0] != ' ' && this._waypointsArray !== null
                    && !this._waypointsArray.find(waypoint => waypoint.icao === nextICAO)) {
                    const fac = await this.facilityLoader.getFacility(FacilityType.Intersection, nextICAO);
                    arrayInsertFunc(fac);
                    const next = fac.routes.find((route) => route.name === current.name);
                    if (next !== undefined) {
                        current = next;
                    }
                    else {
                        isDone = true;
                    }
                }
                else {
                    isDone = true;
                }
            }
        }
        /** Steps Forward through the airway waypoints
         * @returns the step forward function
         */
        async _stepForward() {
            if (this._waypointsArray !== null) {
                return this._step(true, this._waypointsArray.push.bind(this._waypointsArray));
            }
        }
        /** Steps Backward through the airway waypoints
         * @returns the step backward function
         */
        async _stepBackward() {
            if (this._waypointsArray !== null) {
                return this._step(false, this._waypointsArray.unshift.bind(this._waypointsArray));
            }
        }
        /**
         * Sets the array into which this builder will load waypoints.
         * @param array is the array into which the builder will load waypoints
         */
        setWaypointsArray(array) {
            this._waypointsArray = array;
        }
        /**
         * Begins loading waypoints for this builder's parent airway.
         * @returns a Promise to return a status code corresponding to Airway.Status when this builder has
         * finished loading waypoints.
         */
        startBuild() {
            if (this.hasStarted) {
                return Promise.reject(new Error('Airway builder has already started building.'));
            }
            return new Promise(resolve => {
                this._hasStarted = true;
                if (this._waypointsArray !== null) {
                    this._waypointsArray.push(this._initialWaypoint);
                    Promise.all([
                        this._stepForward(),
                        this._stepBackward()
                    ]).then(() => {
                        this._isDone = true;
                        resolve(AirwayStatus.COMPLETE);
                    }).catch(() => {
                        this._isDone = true;
                        resolve(AirwayStatus.PARTIAL);
                    });
                }
            });
        }
    }

    /**
     * A binary min-heap. Each element added to the heap is ordered according to the value of an assigned key relative
     * to the keys of the other elements in the heap. The relative values of element keys are defined by a supplied
     * comparator function. Retrieval of the element with the smallest key (minimum element) is performed in constant time.
     * Removal of the minimum element and insertions are performed in logarithmic time. Additionally, this type of heap
     * supports combined insertion and removal operations (in either order) which are slightly more efficient than chaining
     * the two operations separately.
     */
    class BinaryHeap {
        /**
         * Constructor.
         * @param comparator The function that this heap uses to compare the keys of its elements. The function returns 0 if
         * `a` and `b` share the same key, a negative number if `a` has a lower key than `b`, and a positive number if `a`
         * has a greater key than `b`.
         */
        constructor(comparator) {
            this.comparator = comparator;
            this.tree = [];
        }
        // eslint-disable-next-line jsdoc/require-returns
        /** The number of elements contained in this heap. */
        get size() {
            return this.tree.length;
        }
        /**
         * Finds the element in this heap with the smallest key.
         * @returns The element in this heap with the smallest key, or undefined if this heap is empty.
         */
        findMin() {
            return this.tree[0];
        }
        /**
         * Removes and returns the element in this heap with the smallest key.
         * @returns The removed element, or undefined if this heap is empty.
         */
        removeMin() {
            if (this.tree.length === 0) {
                return undefined;
            }
            const min = this.tree[0];
            this.swap(0, this.tree.length - 1);
            this.tree.length--;
            this.heapifyDown(0);
            return min;
        }
        /**
         * Inserts an element into this heap.
         * @param element The element to insert.
         * @returns This heap, after the element has been inserted.
         */
        insert(element) {
            this.tree.push(element);
            this.heapifyUp(this.tree.length - 1);
            return this;
        }
        /**
         * Inserts an element into this heap, then removes the element with the smallest key.
         * @param element The element to insert.
         * @returns The removed element.
         */
        insertAndRemoveMin(element) {
            if (this.tree.length === 0 || this.comparator(element, this.tree[0]) <= 0) {
                return element;
            }
            return this.removeMinAndInsert(element);
        }
        /**
         * Removes the element in this heap with the smallest key, then inserts a new element.
         * @param element The element to insert.
         * @returns The removed element, or undefined if this heap was empty before the new element was inserted.
         */
        removeMinAndInsert(element) {
            const min = this.tree[0];
            this.tree[0] = element;
            this.heapifyDown(0);
            return min;
        }
        /**
         * Removes all elements from this heap.
         * @returns This heap, after it has been cleared.
         */
        clear() {
            this.tree.length = 0;
            return this;
        }
        /**
         * Restores the heap property for this heap upwards from a node which potentially violates the property.
         * @param index The index of the node at which to begin the operation.
         */
        heapifyUp(index) {
            let parent = BinaryHeap.parent(index);
            while (parent >= 0 && this.comparator(this.tree[index], this.tree[parent]) < 0) {
                this.swap(parent, index);
                index = parent;
                parent = BinaryHeap.parent(index);
            }
        }
        /**
         * Restores the heap property for this heap downwards from a node which potentially violates the property.
         * @param index The index of the node at which to begin the operation.
         */
        heapifyDown(index) {
            const len = this.tree.length;
            while (index < len) {
                const left = BinaryHeap.left(index);
                const right = BinaryHeap.right(index);
                let needSwapFlags = 0;
                if (left < len && this.comparator(this.tree[index], this.tree[left]) > 0) {
                    needSwapFlags |= 1;
                }
                if (right < len && this.comparator(this.tree[index], this.tree[right]) > 0) {
                    needSwapFlags |= 2;
                }
                if (needSwapFlags === 3) {
                    needSwapFlags = this.comparator(this.tree[left], this.tree[right]) <= 0 ? 1 : 2;
                }
                if (needSwapFlags === 0) {
                    break;
                }
                const swapChild = needSwapFlags === 1 ? left : right;
                this.swap(index, swapChild);
                index = swapChild;
            }
        }
        /**
         * Swaps two nodes in this heap.
         * @param index1 The index of the first node.
         * @param index2 The index of the second node.
         */
        swap(index1, index2) {
            const old1 = this.tree[index1];
            this.tree[index1] = this.tree[index2];
            this.tree[index2] = old1;
        }
        /**
         * Finds the index of a node's parent.
         * @param index the index of the node for which to find the parent.
         * @returns The index of the query node's parent.
         */
        static parent(index) {
            return (index - 1) >> 1;
        }
        /**
         * Finds the index of a node's left child.
         * @param index The index of the node for which to find the child.
         * @returns The index of the query node's left child.
         */
        static left(index) {
            return index * 2 + 1;
        }
        /**
         * Finds the index of a node's right child.
         * @param index The index of the node for which to find the child.
         * @returns The idnex of the query node's right child.
         */
        static right(index) {
            return index * 2 + 2;
        }
    }

    /**
     * A sorted array.
     */
    class SortedArray {
        /**
         * Constructor.
         * @param comparatorFunc A function which defines the relative sorting priority of two elements. The function should
         * return 0 if its arguments are to be sorted identically, a negative number if the first argument is to be sorted
         * before the second argument, and a positive number if the first argument is to be sorted after the second argument.
         * @param equalityFunc A function which checks if two elements are equal. Defaults to the strict equality comparison
         * (`===`) if not defined.
         */
        constructor(comparatorFunc, equalityFunc = SortedArray.DEFAULT_EQUALITY_FUNC) {
            this.comparatorFunc = comparatorFunc;
            this.equalityFunc = equalityFunc;
            this._array = [];
        }
        // eslint-disable-next-line jsdoc/require-returns
        /** A read-only version of the array object backing this sorted array. */
        get array() {
            return this._array;
        }
        /**
         * The number of elements in this array.
         * @returns The number of elements in the array.
         */
        get length() {
            return this._array.length;
        }
        /**
         * Finds the index of the first or last element in this array whose sorting priority is equal to a query element. If
         * no such element in this array exists, `-(index + 1)` is returned, where `index` is the index at which the query
         * element would be found if it were contained in the array.
         * @param element The query element.
         * @param first Whether to find the first index.
         * @returns The index of the first or last element in this array with the same sorting priority as the query, or
         * `-(index + 1)` if no such element exists, where `index` is the index at which the query element would be found if
         * it were contained in the array.
         */
        findIndex(element, first = true) {
            let min = 0;
            let max = this._array.length;
            let index = Math.floor((min + max) / 2);
            while (min < max) {
                const compare = this.comparatorFunc(element, this._array[index]);
                if (compare < 0) {
                    max = index;
                }
                else if (compare > 0) {
                    min = index + 1;
                }
                else {
                    const delta = first ? -1 : 1;
                    while (index + delta >= 0 && index + delta < this._array.length && this.comparatorFunc(element, this._array[index + delta]) === 0) {
                        index += delta;
                    }
                    return index;
                }
                index = Math.floor((min + max) / 2);
            }
            return -(index + 1);
        }
        /**
         * Finds the index of the first element in this array which equals a query element, starting at a specified index.
         * The search proceeds toward the end of the array, ending at the first index containing an element whose sorting
         * priority does not equal the query, or the end of the array, whichever comes first. If no such element in this
         * array exists, -1 is returned instead.
         * @param element The query element.
         * @param startIndex The index at which to start the search.
         * @returns The index of the first element in this array which equals the query element, or -1 if no such element
         * exists.
         */
        searchEquals(element, startIndex) {
            let index = startIndex;
            while (index >= 0 && index < this._array.length && this.comparatorFunc(element, this._array[index]) === 0) {
                if (this.equalityFunc(element, this._array[index])) {
                    return index;
                }
                index++;
            }
            return -1;
        }
        /**
         * Gets the element at a specified index, if it exists.
         * @param index An index.
         * @returns The element at the specified index, or undefined if the index is out of bounds.
         */
        get(index) {
            return this._array[index];
        }
        /**
         * Gets the first element in this array, if it exists.
         * @returns The first element in this array, or undefined if this array is empty.
         */
        first() {
            return this._array[0];
        }
        /**
         * Gets the last element in this array, if it exists.
         * @returns The last element in this array, or undefined if this array is empty.
         */
        last() {
            return this._array[this._array.length - 1];
        }
        /**
         * Checks whether this array contains an element. Returns true if and only if there is at least one element in this
         * array which is equal to the specified element according to this array's equality function.
         * @param element The element to check.
         * @returns Whether this array contains the element.
         */
        has(element) {
            return this.searchEquals(element, this.findIndex(element)) >= 0;
        }
        /**
         * Inserts an element into this array. The element will be inserted at the greatest index such that it is located
         * before all the existing elements in the array sorted after it according to this array's sorting function. All
         * existing elements located at indexes greater than or equal to the index at which the element was inserted are
         * shifted to the right.
         * @param element The element to insert.
         * @returns The index at which the element was placed.
         */
        insert(element) {
            let index = this.findIndex(element, false);
            if (index < 0) {
                index = -index - 1;
            }
            this._array.splice(index, 0, element);
            return index;
        }
        /**
         * Inserts all elements in an Iterable into this array. Each element is inserted according to the same behavior used
         * by the `insert()` method. If an element appears more than once in the iterable, one instance of that element will
         * be inserted into this array for each time the element appears in the iterable.
         * @param elements An iterable of elements to insert.
         * @returns The number of elements inserted.
         */
        insertAll(elements) {
            const sorted = Array.from(elements).sort(this.comparatorFunc);
            let toInsertIndex = 0;
            let toInsert = sorted[toInsertIndex];
            const len = this._array.length;
            const insertLen = sorted.length;
            for (let i = 0; i < len && toInsertIndex < insertLen; i++) {
                if (this.comparatorFunc(toInsert, this._array[i]) > 0) {
                    this._array.splice(i, 0, toInsert);
                    toInsert = sorted[++toInsertIndex];
                }
            }
            for (; toInsertIndex < insertLen; toInsertIndex++) {
                this._array.push(sorted[toInsertIndex]);
            }
            return sorted.length;
        }
        /**
         * Removes the first occurrence of an element from this array. This array is searched for the first element which
         * is equal to the specified element according to this array's equality function, the matching element is removed,
         * and all elements after it are shifted to the left.
         * @param element The element to remove.
         * @returns The (former) index of the removed element, or -1 if no element was removed.
         */
        remove(element) {
            const index = this.searchEquals(element, this.findIndex(element));
            if (index >= 0) {
                this._array.splice(index, 1);
            }
            return index;
        }
        /**
         * Removes all elements in an Iterable from this array. Each element is removed according to the behavior used by the
         * `remove()` method. If an element appears more than once in the iterable, one instance of that element will be
         * removed from this array for each time the element appears in the iterable.
         * @param elements An iterable of elements to remove.
         * @returns The number of elements removed.
         */
        removeAll(elements) {
            const sorted = Array.from(elements).sort(this.comparatorFunc);
            let numRemoved = 0;
            let toRemoveIndex = 0;
            let toRemove = sorted[toRemoveIndex];
            const len = this._array.length;
            const removeLen = sorted.length;
            for (let i = 0; i < len && toRemoveIndex < removeLen; i++) {
                if (this.equalityFunc(toRemove, this._array[i])) {
                    this._array.splice(i--, 1);
                    toRemove = sorted[++toRemoveIndex];
                    numRemoved++;
                }
            }
            return numRemoved;
        }
        /**
         * Removes the last element from this array and returns it.
         * @returns The removed element, or `undefined` if the array was empty.
         */
        pop() {
            return this._array.pop();
        }
        /**
         * Removes the first element from this array and returns it.
         * @returns The removed element, or `undefined` if the array was empty.
         */
        shift() {
            return this._array.shift();
        }
        /**
         * Finds the index of the first occurrence of an element in this array. This array is searched for the first element
         * which is equal to the specified element according to this array's equality function, and its index is returned.
         * @param element The element for which to search.
         * @returns The index of the first occurrence of the specified element, or -1 if no such element was found.
         */
        indexOf(element) {
            return this.searchEquals(element, this.findIndex(element));
        }
        /**
         * Searches this array for the first element whose sorting priority is equal to a query element. If no such element
         * is found, then undefined is returned instead.
         * @param query The query element.
         * @returns The first element in the array with the same sorting priority as the query, or undefined if no such
         * element exists.
         */
        match(query) {
            const index = this.matchIndex(query);
            return this._array[index];
        }
        /**
         * Searches this array for the index of the first element whose sorting priority is equal to a query element. If no
         * such element is found, then `-(index + 1)` is returned instead, where `index` is the index at which the query
         * element would be found if it were contained in the array.
         * @param query The query element.
         * @returns The index of the first element in this array with the same sorting priority as the query, or
         * `-(index + 1)` if no such element exists, where `index` is the index at which the query element would be found if
         * it were contained in the array.
         */
        matchIndex(query) {
            return this.findIndex(query);
        }
        /**
         * Removes all elements from this array.
         */
        clear() {
            this._array.length = 0;
        }
        /**
         * Gets an IterableIterator over all elements in this array.
         * @returns An IterableIterator over all elements in this array.
         */
        values() {
            return this._array.values();
        }
        /** @inheritdoc */
        [Symbol.iterator]() {
            return this._array.values();
        }
    }
    SortedArray.DEFAULT_EQUALITY_FUNC = (a, b) => a === b;

    /**
     * A k-dimensional search tree.
     */
    class KdTree {
        /**
         * Constructor.
         * @param dimensionCount The number of dimensions supported by this tree. If this argument is not an integer, it will
         * be truncated to one.
         * @param keyFunc A function which generates keys from elements. Keys are an N-tuple of numbers, where N is equal to
         * the dimension count of this tree.
         * @throws Error if the dimension count is less than 2.
         */
        constructor(dimensionCount, keyFunc) {
            this.keyFunc = keyFunc;
            this.elements = [];
            this.keys = [];
            this.nodes = [];
            this.minDepth = -1;
            this.maxDepth = -1;
            this.dimensionCount = Math.trunc(dimensionCount);
            if (this.dimensionCount < 2) {
                throw new Error(`KdTree: cannot create a tree with ${this.dimensionCount} dimensions.`);
            }
            this.indexArrays = Array.from({ length: this.dimensionCount + 1 }, () => []);
            this.indexSortFuncs = Array.from({ length: this.dimensionCount }, (v, index) => {
                return (a, b) => {
                    const aKey = this.keys[a];
                    const bKey = this.keys[b];
                    for (let i = 0; i < this.dimensionCount; i++) {
                        const dimension = (i + index) % this.dimensionCount;
                        if (aKey[dimension] < bKey[dimension]) {
                            return -1;
                        }
                        else if (aKey[dimension] > bKey[dimension]) {
                            return 1;
                        }
                    }
                    return 0;
                };
            });
            this.keyCache = [
                new Float64Array(this.dimensionCount)
            ];
        }
        // eslint-disable-next-line jsdoc/require-returns
        /** The number of elements in this tree. */
        get size() {
            return this.elements.length;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        searchKey(key, radius, arg3, out, filter) {
            if (typeof arg3 === 'number') {
                return this.doResultsSearch(undefined, key, radius, arg3, out, filter);
            }
            else {
                this.doVisitorSearch(undefined, key, radius, arg3);
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        search(element, radius, arg3, out, filter) {
            const key = this.keyFunc(element, this.keyCache[0]);
            if (typeof arg3 === 'number') {
                return this.doResultsSearch(element, key, radius, arg3, out, filter);
            }
            else {
                this.doVisitorSearch(element, key, radius, arg3);
            }
        }
        /**
         * Performs a tree search with a visitor function.
         * @param element The query element, or undefined if none exists.
         * @param key The query key.
         * @param radius The search radius.
         * @param visitor A visitor function. This function will be called once per element found within the search radius.
         * If the visitor returns `true`, then the search will continue; if the visitor returns `false`, the search will
         * immediately halt.
         */
        doVisitorSearch(element, key, radius, visitor) {
            const resultHandler = (elementIndex, elementInner, keyInner, distance, queryKey, queryElement) => {
                return visitor(elementInner, keyInner, distance, queryKey, queryElement);
            };
            const traversalHandler = (offsetFromPivot, searchRadius, child) => {
                return searchRadius + offsetFromPivot * child >= 0;
            };
            this.searchTree(element, key, radius, 0, 0, resultHandler, traversalHandler);
        }
        /**
         * Performs a tree search and returns an array of search results.
         * @param element The query element, or undefined if none exists.
         * @param key The query key.
         * @param radius The search radius.
         * @param maxResultCount The maximum number of search results to return.
         * @param out An array in which to store the search results.
         * @param filter A function to filter the search results.
         * @returns An array containing the search results, in order of increasing distance from the query key.
         */
        doResultsSearch(element, key, radius, maxResultCount, out, filter) {
            if (maxResultCount <= 0) {
                out.length = 0;
                return out;
            }
            const heap = new BinaryHeap((a, b) => KdTree.distance(key, this.keys[b], this.dimensionCount) - KdTree.distance(key, this.keys[a], this.dimensionCount));
            const resultHandler = (elementIndex, elementInner, keyInner, distance, queryKey, queryElement) => {
                if (!filter || filter(elementInner, keyInner, distance, queryKey, queryElement)) {
                    if (heap.size === maxResultCount) {
                        heap.insertAndRemoveMin(elementIndex);
                    }
                    else {
                        heap.insert(elementIndex);
                    }
                }
                return true;
            };
            const traversalHandler = (offsetFromPivot, searchRadius, child) => {
                let maxDist = searchRadius;
                if (heap.size === maxResultCount) {
                    maxDist = Math.min(maxDist, KdTree.distance(key, this.keys[heap.findMin()], this.dimensionCount));
                }
                return maxDist + offsetFromPivot * child >= 0;
            };
            this.searchTree(element, key, radius, 0, 0, resultHandler, traversalHandler);
            out.length = heap.size;
            for (let i = out.length - 1; i >= 0; i--) {
                out[i] = this.elements[heap.removeMin()];
            }
            return out;
        }
        /**
         * Searches a subtree for elements whose keys are located near a query key.
         * @param element The query element, or undefined if none exists.
         * @param key The query key.
         * @param radius The search radius.
         * @param nodeIndex The index of the root of the subtree to search.
         * @param pivotDimension The dimension in which the root of the subtree is split.
         * @param resultHandler A function which will be called once per element found within the search radius. If the
         * function returns `true`, then the search will continue; if the function returns `false`, the search will
         * immediately halt.
         * @param traversalHandler A function which determines whether the search will proceed to a child node. If the
         * function returns `true`, the search will continue; if the function returns `false`, the search will skip the
         * child.
         * @returns `false` if the search was terminated prematurely by the `resultHandler` function, and `true` otherwise.
         */
        searchTree(element, key, radius, nodeIndex, pivotDimension, resultHandler, traversalHandler) {
            const elementIndex = this.nodes[nodeIndex];
            if (elementIndex === undefined) {
                return true;
            }
            const nodeKey = this.keys[elementIndex];
            const distanceFromNode = KdTree.distance(key, nodeKey, this.dimensionCount);
            if (distanceFromNode <= radius) {
                if (!resultHandler(elementIndex, this.elements[elementIndex], nodeKey, distanceFromNode, key, element)) {
                    return false;
                }
            }
            const offsetFromPivot = key[pivotDimension] - nodeKey[pivotDimension];
            const nextPivotDimension = (pivotDimension + 1) % this.dimensionCount;
            const lesserNodeIndex = KdTree.lesser(nodeIndex);
            const greaterNodeIndex = KdTree.greater(nodeIndex);
            if (this.nodes[lesserNodeIndex] !== undefined && traversalHandler(offsetFromPivot, radius, -1)) {
                if (!this.searchTree(element, key, radius, lesserNodeIndex, nextPivotDimension, resultHandler, traversalHandler)) {
                    return false;
                }
            }
            if (this.nodes[greaterNodeIndex] !== undefined && traversalHandler(offsetFromPivot, radius, 1)) {
                if (!this.searchTree(element, key, radius, greaterNodeIndex, nextPivotDimension, resultHandler, traversalHandler)) {
                    return false;
                }
            }
            return true;
        }
        /**
         * Inserts an element into this tree. This operation will trigger a rebalancing if, after the insertion, the length
         * of this tree's longest branch is more than twice the length of the shortest branch.
         * @param element The element to insert.
         */
        insert(element) {
            const insertDepth = this.insertElementInTree(element) + 1;
            this.maxDepth = Math.max(this.maxDepth, insertDepth);
            if (insertDepth === this.minDepth + 1) {
                this.minDepth = KdTree.depth(this.nodes.indexOf(undefined, KdTree.leastIndexAtDepth(Math.max(0, this.minDepth))));
            }
            // Rebalance the tree if max depth is greater than twice the min depth.
            if (this.maxDepth + 1 > (this.minDepth + 1) * 2) {
                this.rebuild();
            }
        }
        /**
         * Inserts a batch of elements into this tree. This tree will be rebalanced after the elements are inserted.
         * @param elements An iterable of the elements to insert.
         */
        insertAll(elements) {
            for (const element of elements) {
                this.elements.push(element);
                this.keys.push(this.keyFunc(element, new Float64Array(this.dimensionCount)));
                const insertedIndex = this.elements.length - 1;
                for (let i = 0; i < this.dimensionCount; i++) {
                    this.indexArrays[i].push(insertedIndex);
                }
            }
            this.rebuild();
        }
        /**
         * Inserts an element into this tree.
         * @param element The element to insert.
         * @returns The depth at which the element was inserted, with 0 being the depth of the root.
         */
        insertElementInTree(element) {
            const key = this.keyFunc(element, new Float64Array(this.dimensionCount));
            let index = 0;
            let depth = 0;
            let elementIndex;
            while ((elementIndex = this.nodes[index]) !== undefined) {
                const pivotDimension = depth % this.dimensionCount;
                const keyToCompare = key[pivotDimension];
                if (keyToCompare <= this.keys[elementIndex][pivotDimension]) {
                    index = KdTree.lesser(index);
                }
                else {
                    index = KdTree.greater(index);
                }
                depth++;
            }
            this.elements.push(element);
            this.keys.push(key);
            const insertedIndex = this.elements.length - 1;
            this.nodes[index] = insertedIndex;
            for (let i = 0; i < this.dimensionCount; i++) {
                this.indexArrays[i].push(insertedIndex);
            }
            return depth;
        }
        /**
         * Removes an element from this tree. This tree will be rebalanced after the element is removed.
         * @param element The element to remove.
         * @returns Whether the element was removed.
         */
        remove(element) {
            if (!this.removeElementFromArrays(element)) {
                return false;
            }
            this.rebuild();
            return true;
        }
        /**
         * Removes a batch of elements from this tree. This tree will be rebalanced after the elements are removed.
         * @param elements An iterable of the elements to remove.
         * @returns Whether at least one element was removed.
         */
        removeAll(elements) {
            let removed = false;
            for (const element of elements) {
                removed = this.removeElementFromArrays(element) || removed;
            }
            if (removed) {
                this.rebuild();
            }
            return removed;
        }
        /**
         * Removes an element and all references to it from this tree's arrays. This method does not change the structure
         * of this tree to reflect the removal of the element.
         * @param element The element to remove.
         * @returns Whether the element was removed.
         */
        removeElementFromArrays(element) {
            const index = this.elements.indexOf(element);
            if (index < 0) {
                return false;
            }
            const lastIndex = this.elements.length - 1;
            this.elements[index] = this.elements[lastIndex];
            this.keys[index] = this.keys[lastIndex];
            this.elements.length--;
            this.keys.length--;
            for (let i = 0; i < this.dimensionCount; i++) {
                const array = this.indexArrays[i];
                const indexInArray = array.indexOf(index);
                if (indexInArray >= 0) {
                    array[indexInArray] = array[array.length - 1];
                    array.length--;
                }
            }
            return true;
        }
        /**
         * Removes elements from this tree, then inserts elements into this tree as a single operation. The tree will be
         * rebalanced at the end of the operation.
         *
         * Using this method is more efficient than calling `removeAll()` and `insertAll()` separately.
         * @param toRemove An iterable of the elements to remove.
         * @param toInsert An iterable of the elements to insert.
         */
        removeAndInsert(toRemove, toInsert) {
            for (const element of toRemove) {
                this.removeElementFromArrays(element);
            }
            this.insertAll(toInsert);
        }
        /**
         * Rebuilds and balances this tree.
         */
        rebuild() {
            if (this.size === 0) {
                return;
            }
            // clear the tree structure
            this.nodes.length = 0;
            // sort index arrays
            for (let i = 0; i < this.dimensionCount; i++) {
                this.indexArrays[i].sort(this.indexSortFuncs[i]);
            }
            this.buildSubTree(0, 0, 0, this.indexArrays[0].length);
            const log = Math.log2(this.elements.length + 1);
            this.minDepth = Math.floor(log) - 1;
            this.maxDepth = Math.ceil(log) - 1;
        }
        /**
         * Builds a portion of this tree starting from a specified node using the element indexes stored in a specified
         * section of this tree's index arrays. The built subtree is guaranteed to be balanced. Before calling this method,
         * the index array at position 0 should contain keys sorted in the specified pivot dimension, the array at position
         * 1 should contain keys sorted in the dimension after the pivot dimension, etc (with the dimension wrapping back to
         * 0 when reaching `this.dimensionCount`).
         * @param nodeIndex The index of the tree node at which to start building the tree. The element associated with the
         * pivot key will be placed at this node.
         * @param pivotDimension The dimension in which to split the first level of the tree built by this method.
         * @param start The first index, inclusive, of the section of this tree's index arrays to use to build the tree.
         * @param end The last index, exclusive, of the section of this tree's index arrays to use to build the tree.
         */
        buildSubTree(nodeIndex, pivotDimension, start, end) {
            const tempArray = this.indexArrays[this.dimensionCount];
            const sortedArray = this.indexArrays[0];
            const medianIndex = Math.trunc((start + end) / 2);
            const medianKeyIndex = sortedArray[medianIndex];
            // Insert median into its position in the tree
            this.nodes[nodeIndex] = medianKeyIndex;
            if (end - start === 1) {
                return;
            }
            if (end - start <= 3) {
                const lesserIndex = medianIndex - 1;
                const greaterIndex = medianIndex + 1;
                if (lesserIndex >= start) {
                    this.nodes[KdTree.lesser(nodeIndex)] = sortedArray[lesserIndex];
                }
                if (greaterIndex < end) {
                    this.nodes[KdTree.greater(nodeIndex)] = sortedArray[greaterIndex];
                }
                return;
            }
            for (let i = start; i < end; i++) {
                tempArray[i] = sortedArray[i];
            }
            // Partition the index arrays not in the pivot dimension around the median key in the pivot dimension and at the
            // same time rotate the index arrays such that the index array sorted in the next pivot dimension is located at
            // index 0.
            for (let i = 1; i < this.dimensionCount; i++) {
                const targetArray = this.indexArrays[i - 1];
                const toPartitionArray = this.indexArrays[i];
                let lesserCount = 0;
                let greaterCount = 0;
                for (let j = start; j < end; j++) {
                    const keyIndex = toPartitionArray[j];
                    if (keyIndex === medianKeyIndex) {
                        targetArray[medianIndex] = keyIndex;
                    }
                    else {
                        const comparison = this.indexSortFuncs[pivotDimension](keyIndex, medianKeyIndex);
                        if (comparison <= 0) {
                            const index = start + (lesserCount++);
                            targetArray[index] = keyIndex;
                        }
                        else {
                            const index = medianIndex + 1 + (greaterCount++);
                            targetArray[index] = keyIndex;
                        }
                    }
                }
            }
            // Copy the temporary array (now containing the sorted indexes in the pivot dimension) to the last index array.
            const newSortedArray = this.indexArrays[this.dimensionCount - 1];
            for (let i = start; i < end; i++) {
                newSortedArray[i] = tempArray[i];
            }
            const nextPivotDimension = (pivotDimension + 1) % this.dimensionCount;
            this.buildSubTree(KdTree.lesser(nodeIndex), nextPivotDimension, start, medianIndex);
            this.buildSubTree(KdTree.greater(nodeIndex), nextPivotDimension, medianIndex + 1, end);
        }
        /**
         * Removes all elements from this tree.
         */
        clear() {
            this.elements.length = 0;
            this.keys.length = 0;
            this.nodes.length = 0;
            for (let i = 0; i < this.indexArrays.length; i++) {
                this.indexArrays[i].length = 0;
            }
            this.minDepth = -1;
            this.maxDepth = -1;
        }
        /**
         * Finds the index of a node's parent.
         * @param index the index of the node for which to find the parent.
         * @returns The index of the query node's parent.
         */
        static parent(index) {
            return (index - 1) >> 1;
        }
        /**
         * Finds the index of a node's lesser child.
         * @param index The index of the node for which to find the child.
         * @returns The index of the query node's lesser child.
         */
        static lesser(index) {
            return index * 2 + 1;
        }
        /**
         * Finds the index of a node's greater child.
         * @param index The index of the node for which to find the child.
         * @returns The idnex of the query node's greater child.
         */
        static greater(index) {
            return index * 2 + 2;
        }
        /**
         * Finds the least index of any node located at a given depth.
         * @param depth The depth for which to get the least index. The root of the tree lies at depth 0.
         * @returns The least index of any node located at the specified depth.
         */
        static leastIndexAtDepth(depth) {
            return 1 << depth - 1;
        }
        /**
         * Finds the depth at which a node lies.
         * @param index The index of the node for which to find the depth.
         * @returns The depth at which the node lies. The root of the tree lies at depth 0.
         */
        static depth(index) {
            return Math.trunc(Math.log2(index + 1));
        }
        /**
         * Calculates the Euclidean distance between two keys.
         * @param key1 The first key.
         * @param key2 The second key.
         * @param dimensionCount The number of dimensions in which to calculate the distance.
         * @returns The Euclidean distance between the two keys.
         */
        static distance(key1, key2, dimensionCount) {
            let sumSq = 0;
            for (let i = 0; i < dimensionCount; i++) {
                const diff = key1[i] - key2[i];
                sumSq += diff * diff;
            }
            return Math.sqrt(sumSq);
        }
    }

    /**
     * A spatial tree which is keyed on points on Earth's surface and allows searching for elements based on the great-
     * circle distances from their keys to a query point.
     */
    class GeoKdTree {
        /**
         * Constructor.
         * @param keyFunc A function which generates keys from elements. Keys are cartesian representations of points on
         * Earth's surface.
         * @throws Error if the dimension count is less than 2.
         */
        constructor(keyFunc) {
            this.keyFunc = keyFunc;
            this.cartesianTree = new KdTree(3, (element, out) => {
                const vec = this.keyFunc(element, GeoKdTree.vec3Cache[0]);
                out[0] = vec[0];
                out[1] = vec[1];
                out[2] = vec[2];
                return out;
            });
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        search(arg1, arg2, arg3, arg4, arg5, arg6) {
            let center, radius;
            let argA, argB, argC;
            if (typeof arg1 === 'number') {
                center = GeoPoint.sphericalToCartesian(arg1, arg2, GeoKdTree.vec3Cache[1]);
                radius = arg3;
                argA = arg4;
                argB = arg5;
                argC = arg6;
            }
            else if (!(arg1 instanceof Float64Array)) {
                center = GeoPoint.sphericalToCartesian(arg1, GeoKdTree.vec3Cache[1]);
                radius = arg2;
                argA = arg3;
                argB = arg4;
                argC = arg5;
            }
            else {
                center = arg1;
                radius = arg2;
                argA = arg3;
                argB = arg4;
                argC = arg5;
            }
            const radiusCartesian = Math.sqrt(2 * (1 - Math.cos(Utils.Clamp(radius, 0, Math.PI))));
            if (typeof argA === 'number') {
                return this.doResultsSearch(center, radiusCartesian, argA, argB, argC);
            }
            else {
                this.doVisitorSearch(center, radiusCartesian, argA);
            }
        }
        /**
         * Performs a tree search with a visitor function.
         * @param center The query point.
         * @param radiusCartesian The query radius.
         * @param visitor A visitor function. This function will be called once per element found within the search radius.
         * If the visitor returns `true`, then the search will continue; if the visitor returns `false`, the search will
         * immediately halt.
         */
        doVisitorSearch(center, radiusCartesian, visitor) {
            this.cartesianTree.searchKey(center, radiusCartesian, (element, key) => {
                const vec = Vec3Math.set(key[0], key[1], key[2], GeoKdTree.vec3Cache[2]);
                const greatCircleDist = GeoPoint.distance(vec, center);
                return visitor(element, vec, greatCircleDist, center);
            });
        }
        /**
         * Performs a tree search and returns an array of search results.
         * @param center The query point.
         * @param radiusCartesian The query radius.
         * @param maxResultCount The maximum number of search results to return.
         * @param out An array in which to store the search results.
         * @param filter A function to filter the search results.
         * @returns An array containing the search results, in order of increasing distance from the query key.
         */
        doResultsSearch(center, radiusCartesian, maxResultCount, out, filter) {
            const cartesianFilter = filter
                ? (element, key) => {
                    const vec = Vec3Math.set(key[0], key[1], key[2], GeoKdTree.vec3Cache[2]);
                    const greatCircleDist = GeoPoint.distance(vec, center);
                    return filter(element, vec, greatCircleDist, center);
                }
                : undefined;
            return this.cartesianTree.searchKey(center, radiusCartesian, maxResultCount, out, cartesianFilter);
        }
        /**
         * Inserts an element into this tree. This operation will trigger a rebalancing if, after the insertion, the length
         * of this tree's longest branch is more than twice the length of the shortest branch.
         * @param element The element to insert.
         */
        insert(element) {
            this.cartesianTree.insert(element);
        }
        /**
         * Inserts a batch of elements into this tree. This tree will be rebalanced after the elements are inserted.
         * @param elements An iterable of the elements to insert.
         */
        insertAll(elements) {
            this.cartesianTree.insertAll(elements);
        }
        /**
         * Removes an element from this tree. This tree will be rebalanced after the element is removed.
         * @param element The element to remove.
         * @returns Whether the element was removed.
         */
        remove(element) {
            return this.cartesianTree.remove(element);
        }
        /**
         * Removes a batch of elements from this tree. This tree will be rebalanced after the elements are removed.
         * @param elements An iterable of the elements to remove.
         * @returns Whether at least one element was removed.
         */
        removeAll(elements) {
            return this.cartesianTree.removeAll(elements);
        }
        /**
         * Removes elements from this tree, then inserts elements into this tree as a single operation. The tree will be
         * rebalanced at the end of the operation.
         *
         * Using this method is more efficient than calling `removeAll()` and `insertAll()` separately.
         * @param toRemove An iterable of the elements to remove.
         * @param toInsert An iterable of the elements to insert.
         */
        removeAndInsert(toRemove, toInsert) {
            this.cartesianTree.removeAndInsert(toRemove, toInsert);
        }
        /**
         * Rebuilds and balances this tree.
         */
        rebuild() {
            this.cartesianTree.rebuild();
        }
        /**
         * Removes all elements from this tree.
         */
        clear() {
            this.cartesianTree.clear();
        }
    }
    GeoKdTree.vec3Cache = [new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3)];

    /**
     * Types of subscribable array change event.
     */
    var SubscribableArrayEventType;
    (function (SubscribableArrayEventType) {
        /** An element was added. */
        SubscribableArrayEventType["Added"] = "Added";
        /** An element was removed. */
        SubscribableArrayEventType["Removed"] = "Removed";
        /** The array was cleared. */
        SubscribableArrayEventType["Cleared"] = "Cleared";
    })(SubscribableArrayEventType || (SubscribableArrayEventType = {}));

    /**
     * An array-like class to observe changes in a list of objects.
     * @class ArraySubject
     * @template T
     */
    class AbstractSubscribableArray {
        constructor() {
            this.subs = [];
            this.notifyDepth = 0;
            /** A function which sends initial notifications to subscriptions. */
            this.initialNotifyFunc = this.initialNotify.bind(this);
            /** A function which responds to when a subscription to this subscribable is destroyed. */
            this.onSubDestroyedFunc = this.onSubDestroyed.bind(this);
        }
        /** @inheritdoc */
        sub(handler, initialNotify = false, paused = false) {
            const sub = new HandlerSubscription(handler, this.initialNotifyFunc, this.onSubDestroyedFunc);
            this.subs.push(sub);
            if (paused) {
                sub.pause();
            }
            else if (initialNotify) {
                sub.initialNotify();
            }
            return sub;
        }
        /** @inheritdoc */
        unsub(handler) {
            const toDestroy = this.subs.find(sub => sub.handler === handler);
            toDestroy === null || toDestroy === void 0 ? void 0 : toDestroy.destroy();
        }
        /**
         * Gets an item from the array.
         * @param index Thex index of the item to get.
         * @returns An item.
         * @throws
         */
        get(index) {
            const array = this.getArray();
            if (index > array.length - 1) {
                throw new Error('Index out of range');
            }
            return array[index];
        }
        /**
         * Tries to get the value from the array.
         * @param index The index of the item to get.
         * @returns The value or undefined if not found.
         */
        tryGet(index) {
            return this.getArray()[index];
        }
        /**
         * Notifies subscriptions of a change in the array.
         * @param index The index that was changed.
         * @param type The type of subject event.
         * @param modifiedItem The item modified by the operation.
         */
        notify(index, type, modifiedItem) {
            let needCleanUpSubs = false;
            this.notifyDepth++;
            const subLen = this.subs.length;
            for (let i = 0; i < subLen; i++) {
                try {
                    const sub = this.subs[i];
                    if (sub.isAlive && !sub.isPaused) {
                        sub.handler(index, type, modifiedItem, this.getArray());
                    }
                    needCleanUpSubs || (needCleanUpSubs = !sub.isAlive);
                }
                catch (error) {
                    console.error(`ArraySubject: error in handler: ${error}`);
                    if (error instanceof Error) {
                        console.error(error.stack);
                    }
                }
            }
            this.notifyDepth--;
            if (needCleanUpSubs && this.notifyDepth === 0) {
                this.subs = this.subs.filter(sub => sub.isAlive);
            }
        }
        /**
         * Notifies a subscription of this array's current state.
         * @param sub The subscription to notify.
         */
        initialNotify(sub) {
            const array = this.getArray();
            sub.handler(0, SubscribableArrayEventType.Added, array, array);
        }
        /**
         * Responds to when a subscription to this array is destroyed.
         * @param sub The destroyed subscription.
         */
        onSubDestroyed(sub) {
            // If we are not in the middle of a notify operation, remove the subscription.
            // Otherwise, do nothing and let the post-notify clean-up code handle it.
            if (this.notifyDepth === 0) {
                this.subs.splice(this.subs.indexOf(sub), 1);
            }
        }
    }

    /**
     * A subscribable which provides a sorted version of a source SubscribableArray.
     */
    class SortedMappedSubscribableArray extends AbstractSubscribableArray {
        /**
         * Constructor.
         * @param source The source array subject for this subscribable.
         * @param comparatorFunc A function which defines the relative sorting priority of two elements. The function should
         * return 0 if its arguments are to be sorted identically, a negative number if the first argument is to be sorted
         * before the second argument, and a positive number if the first argument is to be sorted after the second argument.
         * @param equalityFunc A function which checks if two elements are equal. Defaults to the strict equality comparison
         * (`===`) if not defined.
         */
        constructor(source, comparatorFunc, equalityFunc) {
            super();
            this.source = source;
            this.comparatorFunc = comparatorFunc;
            this.equalityFunc = equalityFunc;
            this.sorted = new SortedArray(this.comparatorFunc, this.equalityFunc);
            this.sourceSub = source.sub(this.onSourceChanged.bind(this), true);
        }
        /** @inheritdoc */
        get length() {
            return this.sorted.length;
        }
        /**
         * Creates a new SortedMappedSubscribableArray.
         * @param source The source array subject for the new mapped sorted array.
         * @param comparatorFunc A function which defines the relative sorting priority of two elements. The function should
         * return 0 if its arguments are to be sorted identically, a negative number if the first argument is to be sorted
         * before the second argument, and a positive number if the first argument is to be sorted after the second argument.
         * @param equalityFunc A function which checks if two elements are equal. Defaults to the strict equality comparison
         * (`===`) if not defined.
         * @returns A new SortedMappedSubscribableArray.
         */
        static create(source, comparatorFunc, equalityFunc) {
            return new SortedMappedSubscribableArray(source, comparatorFunc, equalityFunc);
        }
        /**
         * Responds to changes in this subscribable's source array.
         * @param index The index of the change.
         * @param type The type of change.
         * @param item The item(s) involved in the change, if any.
         */
        onSourceChanged(index, type, item) {
            switch (type) {
                case SubscribableArrayEventType.Cleared:
                    if (this.sorted.length !== 0) {
                        this.sorted.clear();
                        this.notify(0, SubscribableArrayEventType.Cleared);
                    }
                    break;
                case SubscribableArrayEventType.Added:
                    if (item) {
                        this.insert(item);
                    }
                    break;
                case SubscribableArrayEventType.Removed:
                    if (item) {
                        this.remove(item);
                    }
                    break;
            }
        }
        /**
         * Inserts elements into this array.
         * @param elements An element or array of elements to insert.
         */
        insert(elements) {
            if (this.sorted.length === 0) {
                // since we know all elements will be added to one contiguous index range, we can do a small optimization here
                // with notifications
                elements instanceof Array ? this.sorted.insertAll(elements) : this.sorted.insert(elements);
                this.notify(0, SubscribableArrayEventType.Added, elements instanceof Array ? this.sorted.array : elements);
            }
            else {
                const sorted = elements instanceof Array ? Array.from(elements).sort(this.comparatorFunc) : [elements];
                const len = sorted.length;
                for (let i = 0; i < len; i++) {
                    const toInsert = sorted[i];
                    this.notify(this.sorted.insert(toInsert), SubscribableArrayEventType.Added, toInsert);
                }
            }
        }
        /**
         * Removes elements from this array.
         * @param elements An element or array of elements to remove.
         */
        remove(elements) {
            const sorted = elements instanceof Array ? Array.from(elements).sort(this.comparatorFunc) : [elements];
            const len = sorted.length;
            for (let i = 0; i < len; i++) {
                const toRemove = sorted[i];
                const removedIndex = this.sorted.remove(toRemove);
                if (removedIndex >= 0) {
                    this.notify(removedIndex, SubscribableArrayEventType.Removed, toRemove);
                }
            }
        }
        /** @inheritdoc */
        getArray() {
            return this.sorted.array;
        }
        /**
         * Destroys this subscribable. After destruction, this subscribable will no longer update in response to changes
         * made to its source.
         */
        destroy() {
            this.sourceSub.destroy();
        }
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    var FacilityRepositorySyncType;
    (function (FacilityRepositorySyncType) {
        FacilityRepositorySyncType[FacilityRepositorySyncType["Add"] = 0] = "Add";
        FacilityRepositorySyncType[FacilityRepositorySyncType["Remove"] = 1] = "Remove";
        FacilityRepositorySyncType[FacilityRepositorySyncType["DumpRequest"] = 2] = "DumpRequest";
        FacilityRepositorySyncType[FacilityRepositorySyncType["DumpResponse"] = 3] = "DumpResponse";
    })(FacilityRepositorySyncType || (FacilityRepositorySyncType = {}));
    /**
     * A repository of facilities.
     */
    class FacilityRepository {
        /**
         * Constructor.
         * @param bus The event bus.
         */
        constructor(bus) {
            this.bus = bus;
            this.repos = {};
            this.trees = {
                [FacilityType.USR]: new GeoKdTree(FacilityRepository.treeKeyFunc)
            };
            this.ignoreSync = false;
            bus.getSubscriber().on(FacilityRepository.SYNC_TOPIC).handle(this.onSyncEvent.bind(this));
            this.pubSyncEvent(FacilityRepositorySyncType.DumpRequest);
        }
        /**
         * Retrieves a facility from this repository.
         * @param icao The ICAO of the facility to retrieve.
         * @returns The requested user facility, or undefined if it was not found in this repository.
         */
        get(icao) {
            var _a;
            if (!ICAO.isFacility(icao)) {
                return undefined;
            }
            return (_a = this.repos[ICAO.getFacilityType(icao)]) === null || _a === void 0 ? void 0 : _a.get(icao);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        search(type, lat, lon, radius, arg5, out, filter) {
            if (type !== FacilityType.USR) {
                throw new Error(`FacilityRepository: spatial searches are not supported for facility type ${type}`);
            }
            if (typeof arg5 === 'number') {
                return this.trees[type].search(lat, lon, radius, arg5, out, filter);
            }
            else {
                this.trees[type].search(lat, lon, radius, arg5);
            }
        }
        /**
         * Adds a facility to this repository and all other repositories synced with this one. If this repository already
         * contains a facility with the same ICAO as the facility to add, the existing facility will be replaced with the
         * new one.
         * @param fac The facility to add.
         * @throws Error if the facility has an invalid ICAO.
         */
        add(fac) {
            if (!ICAO.isFacility(fac.icao)) {
                throw new Error(`FacilityRepository: invalid facility ICAO ${fac.icao}`);
            }
            this.addToRepo(fac);
            this.pubSyncEvent(FacilityRepositorySyncType.Add, [fac]);
        }
        /**
         * Removes a facility from this repository and all other repositories synced with this one.
         * @param fac The facility to remove.
         * @throws Error if the facility has an invalid ICAO.
         */
        remove(fac) {
            if (!ICAO.isFacility(fac.icao)) {
                throw new Error(`FacilityRepository: invalid facility ICAO ${fac.icao}`);
            }
            this.removeFromRepo(fac);
            this.pubSyncEvent(FacilityRepositorySyncType.Remove, [fac]);
        }
        /**
         * Iterates over every facility in this respository with a visitor function.
         * @param fn A visitor function.
         * @param types The types of facilities over which to iterate. Defaults to all facility types.
         */
        forEach(fn, types) {
            var _a;
            const keys = types !== null && types !== void 0 ? types : Object.keys(this.repos);
            const len = keys.length;
            for (let i = 0; i < len; i++) {
                (_a = this.repos[keys[i]]) === null || _a === void 0 ? void 0 : _a.forEach(fn);
            }
        }
        /**
         * Adds a facility to this repository.
         * @param fac The facility to add.
         */
        addToRepo(fac) {
            var _a;
            var _b;
            const facilityType = ICAO.getFacilityType(fac.icao);
            const repo = (_a = (_b = this.repos)[facilityType]) !== null && _a !== void 0 ? _a : (_b[facilityType] = new Map());
            const existing = repo.get(fac.icao);
            repo.set(fac.icao, fac);
            if (facilityType === FacilityType.USR) {
                if (existing === undefined) {
                    this.trees[facilityType].insert(fac);
                }
                else {
                    this.trees[facilityType].removeAndInsert([existing], [fac]);
                }
            }
            if (existing !== undefined) {
                this.bus.pub(`facility_changed_${fac.icao}`, fac, false, false);
            }
        }
        /**
         * Removes a facility from this repository.
         * @param fac The facility to remove.
         */
        removeFromRepo(fac) {
            var _a;
            const facilityType = ICAO.getFacilityType(fac.icao);
            (_a = this.repos[ICAO.getFacilityType(fac.icao)]) === null || _a === void 0 ? void 0 : _a.delete(fac.icao);
            if (facilityType !== FacilityType.USR) {
                return;
            }
            this.trees[facilityType].remove(fac);
        }
        /**
         * Publishes a sync event over the event bus.
         * @param type The type of sync event.
         * @param facs The event's user facilities.
         */
        pubSyncEvent(type, facs) {
            this.ignoreSync = true;
            this.bus.pub(FacilityRepository.SYNC_TOPIC, { type, facs }, true, false);
            this.ignoreSync = false;
        }
        /**
         * A callback which is called when a sync event occurs.
         * @param data The event data.
         */
        onSyncEvent(data) {
            if (this.ignoreSync) {
                return;
            }
            switch (data.type) {
                case FacilityRepositorySyncType.Add:
                case FacilityRepositorySyncType.DumpResponse:
                    data.facs.forEach(fac => this.addToRepo(fac));
                    break;
                case FacilityRepositorySyncType.Remove:
                    data.facs.forEach(fac => this.removeFromRepo(fac));
                    break;
                case FacilityRepositorySyncType.DumpRequest:
                    {
                        const facs = [];
                        this.forEach(fac => facs.push(fac));
                        this.pubSyncEvent(FacilityRepositorySyncType.DumpResponse, facs);
                    }
                    break;
            }
        }
        /**
         * Gets an instance of FacilityRepository.
         * @param bus The event bus.
         * @returns an instance of FacilityRepository.
         */
        static getRepository(bus) {
            var _a;
            return (_a = FacilityRepository.INSTANCE) !== null && _a !== void 0 ? _a : (FacilityRepository.INSTANCE = new FacilityRepository(bus));
        }
    }
    FacilityRepository.SYNC_TOPIC = 'facilityrepo_sync';
    FacilityRepository.treeKeyFunc = (fac, out) => {
        return GeoPoint.sphericalToCartesian(fac, out);
    };

    /**
     * Possible types of hold entries
     */
    var HoldEntryType;
    (function (HoldEntryType) {
        HoldEntryType[HoldEntryType["Direct"] = 0] = "Direct";
        HoldEntryType[HoldEntryType["Teardrop"] = 1] = "Teardrop";
        HoldEntryType[HoldEntryType["Parallel"] = 2] = "Parallel";
        HoldEntryType[HoldEntryType["None"] = 3] = "None";
    })(HoldEntryType || (HoldEntryType = {}));
    var HoldMaxSpeedRule;
    (function (HoldMaxSpeedRule) {
        HoldMaxSpeedRule[HoldMaxSpeedRule["Faa"] = 0] = "Faa";
        HoldMaxSpeedRule[HoldMaxSpeedRule["Icao"] = 1] = "Icao";
    })(HoldMaxSpeedRule || (HoldMaxSpeedRule = {}));

    /**
     * A subscribable subject whose state is a combined tuple of an arbitrary number of values.
     */
    class CombinedSubject extends AbstractSubscribable {
        /**
         * Constructor.
         * @param inputs The subscribables which provide the inputs to this subject.
         */
        constructor(...inputs) {
            super();
            this._isAlive = true;
            this._isPaused = false;
            this.inputs = inputs;
            this.inputValues = inputs.map(input => input.get());
            this.inputSubs = this.inputs.map((input, index) => input.sub(inputValue => {
                this.inputValues[index] = inputValue;
                this.notify();
            }));
        }
        /** @inheritdoc */
        get isAlive() {
            return this._isAlive;
        }
        /** @inheritdoc */
        get isPaused() {
            return this._isPaused;
        }
        /**
         * Creates a new subject whose state is a combined tuple of an arbitrary number of input values.
         * @param inputs The subscribables which provide the inputs to the new subject.
         * @returns A new subject whose state is a combined tuple of the specified input values.
         */
        static create(...inputs) {
            return new CombinedSubject(...inputs);
        }
        /** @inheritdoc */
        get() {
            return this.inputValues;
        }
        /** @inheritdoc */
        pause() {
            if (!this._isAlive) {
                throw new Error('CombinedSubject: cannot pause a dead subject');
            }
            if (this._isPaused) {
                return;
            }
            for (let i = 0; i < this.inputSubs.length; i++) {
                this.inputSubs[i].pause();
            }
            this._isPaused = true;
        }
        /** @inheritdoc */
        resume() {
            if (!this._isAlive) {
                throw new Error('CombinedSubject: cannot resume a dead subject');
            }
            if (!this._isPaused) {
                return;
            }
            this._isPaused = false;
            for (let i = 0; i < this.inputSubs.length; i++) {
                this.inputValues[i] = this.inputs[i].get();
                this.inputSubs[i].resume();
            }
            this.notify();
        }
        /** @inheritdoc */
        destroy() {
            this._isAlive = false;
            for (let i = 0; i < this.inputSubs.length; i++) {
                this.inputSubs[i].destroy();
            }
        }
    }

    /**
     * A subscribable subject that is a mapped stream from one or more input subscribables.
     */
    class MappedSubject {
        /**
         * Creates a new MappedSubject.
         * @param mapFunc The function which maps this subject's inputs to a value.
         * @param equalityFunc The function which this subject uses to check for equality between values.
         * @param mutateFunc The function which this subject uses to change its value.
         * @param initialVal The initial value of this subject.
         * @param inputs The subscribables which provide the inputs to this subject.
         */
        constructor(mapFunc, equalityFunc, mutateFunc, initialVal, ...inputs) {
            this.isSubscribable = true;
            this.input = CombinedSubject.create(...inputs);
            if (initialVal !== undefined && mutateFunc !== undefined) {
                this.mapped = this.input.map(mapFunc, equalityFunc, mutateFunc, initialVal);
            }
            else {
                this.mapped = this.input.map(mapFunc, equalityFunc);
            }
        }
        /** @inheritdoc */
        get isAlive() {
            return this.input.isAlive;
        }
        /** @inheritdoc */
        get isPaused() {
            return this.input.isPaused;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        static create(mapFunc, ...args) {
            let equalityFunc, mutateFunc, initialVal;
            if (typeof args[0] === 'function') {
                equalityFunc = args.shift();
            }
            else {
                equalityFunc = AbstractSubscribable.DEFAULT_EQUALITY_FUNC;
            }
            if (typeof args[0] === 'function') {
                mutateFunc = args.shift();
                initialVal = args.shift();
            }
            return new MappedSubject(mapFunc, equalityFunc, mutateFunc, initialVal, ...args);
        }
        /** @inheritdoc */
        get() {
            return this.mapped.get();
        }
        /** @inheritdoc */
        sub(handler, initialNotify = false, paused = false) {
            return this.mapped.sub(handler, initialNotify, paused);
        }
        /** @inheritdoc */
        unsub(handler) {
            this.mapped.unsub(handler);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        map(fn, equalityFunc, mutateFunc, initialVal) {
            if (initialVal !== undefined && mutateFunc !== undefined && equalityFunc !== undefined) {
                return this.mapped.map(fn, equalityFunc, mutateFunc, initialVal);
            }
            else {
                return this.mapped.map(fn, equalityFunc);
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        pipe(to, arg2, arg3) {
            if (typeof arg2 === 'function') {
                return this.mapped.pipe(to, arg2, arg3);
            }
            else {
                return this.mapped.pipe(to, arg2);
            }
        }
        /** @inheritdoc */
        pause() {
            this.input.pause();
        }
        /** @inheritdoc */
        resume() {
            this.input.resume();
        }
        /** @inheritdoc */
        destroy() {
            this.input.destroy();
        }
    }

    /**
     * Types of changes made to {@link SubscribableSet}.
     */
    var SubscribableSetEventType;
    (function (SubscribableSetEventType) {
        /** A key was added. */
        SubscribableSetEventType["Added"] = "Added";
        /** A key was deleted. */
        SubscribableSetEventType["Deleted"] = "Deleted";
    })(SubscribableSetEventType || (SubscribableSetEventType = {}));

    /**
     * An array-like class to observe changes in a list of objects.
     * @class ArraySubject
     * @template T
     */
    class ArraySubject extends AbstractSubscribableArray {
        /**
         * Constructs an observable array.
         * @param arr The initial array elements.
         */
        constructor(arr) {
            super();
            this.array = arr;
        }
        // eslint-disable-next-line jsdoc/require-returns
        /** The length of this array. */
        get length() {
            return this.array.length;
        }
        /**
         * Creates and returns a new observable array.
         * @static
         * @template AT The type of the array items.
         * @param arr The initial array elements.
         * @returns A new instance of SubjectArray.
         */
        static create(arr = []) {
            return new ArraySubject(arr);
        }
        /**
         * Inserts a new item at the end or the specified index.
         * @param item The item to insert.
         * @param index The optional index to insert the item to. Will add the item at then end if index not given.
         */
        insert(item, index = -1) {
            if (index === -1 || index > this.array.length - 1) {
                this.array.push(item);
            }
            else {
                this.array.splice(index, 0, item);
            }
            this.notify(index, SubscribableArrayEventType.Added, item);
        }
        /**
         * Inserts items of an array beginning at the specified index.
         * @param [index] The index to begin inserting the array items.
         * @param arr The array to insert.
         */
        insertRange(index = 0, arr) {
            this.array.splice(index, 0, ...arr);
            this.notify(index, SubscribableArrayEventType.Added, arr);
        }
        /**
         * Removes the item at the specified index.
         * @param index The index of the item to remove.
         */
        removeAt(index) {
            const removedItem = this.array.splice(index, 1);
            this.notify(index, SubscribableArrayEventType.Removed, removedItem[0]);
        }
        /**
         * Removes the given item from the array.
         * @param item The item to remove.
         * @returns Returns a boolean indicating if the item was found and removed.
         */
        removeItem(item) {
            const index = this.array.indexOf(item);
            if (index > -1) {
                this.removeAt(index);
                return true;
            }
            else {
                return false;
            }
        }
        /**
         * Replaces all items in the array with the new array.
         * @param arr The array.
         */
        set(arr) {
            this.clear();
            this.insertRange(0, arr);
        }
        /**
         * Clears all data in the array.
         */
        clear() {
            this.array.length = 0;
            this.notify(0, SubscribableArrayEventType.Cleared);
        }
        /**
         * Gets the array.
         * @returns The array.
         */
        getArray() {
            return this.array;
        }
    }

    /**
     * A object-valued subscribable subject which supports setting individual properties on the object and notifying
     * subscribers of any changes to those properties.
     */
    class ObjectSubject {
        /**
         * Constructs an observable object Subject.
         * @param obj The initial object.
         */
        constructor(obj) {
            this.obj = obj;
            this.isSubscribable = true;
            this.isMutableSubscribable = true;
            this.subs = [];
            this.notifyDepth = 0;
            this.initialNotifyFunc = this.initialNotify.bind(this);
            this.onSubDestroyedFunc = this.onSubDestroyed.bind(this);
        }
        /**
         * Creates and returns a new ObjectSubject.
         * @param v The initial value of the subject.
         * @returns An ObjectSubject instance.
         */
        static create(v) {
            return new ObjectSubject(v);
        }
        /**
         * Gets this subject's object.
         * @returns This subject's object.
         */
        get() {
            return this.obj;
        }
        /** @inheritdoc */
        sub(handler, initialNotify = false, paused = false) {
            const sub = new HandlerSubscription(handler, this.initialNotifyFunc, this.onSubDestroyedFunc);
            this.subs.push(sub);
            if (paused) {
                sub.pause();
            }
            else if (initialNotify) {
                sub.initialNotify();
            }
            return sub;
        }
        /** @inheritdoc */
        unsub(handler) {
            const toDestroy = this.subs.find(sub => sub.handler === handler);
            toDestroy === null || toDestroy === void 0 ? void 0 : toDestroy.destroy();
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        set(arg1, value) {
            if (typeof arg1 === 'object') {
                for (const prop in arg1) {
                    if (prop in this.obj) {
                        this.set(prop, arg1[prop]);
                    }
                }
            }
            else {
                const oldValue = this.obj[arg1];
                if (value !== oldValue) {
                    this.obj[arg1] = value;
                    this.notify(arg1, oldValue);
                }
            }
        }
        /**
         * Notifies subscriptions that one of the properties of this subject's object has changed.
         * @param key The property of the object that changed.
         * @param oldValue The old value of the property that changed.
         */
        notify(key, oldValue) {
            let needCleanUpSubs = false;
            this.notifyDepth++;
            const subLen = this.subs.length;
            for (let i = 0; i < subLen; i++) {
                try {
                    const sub = this.subs[i];
                    if (sub.isAlive && !sub.isPaused) {
                        sub.handler(this.obj, key, this.obj[key], oldValue);
                    }
                    needCleanUpSubs || (needCleanUpSubs = !sub.isAlive);
                }
                catch (error) {
                    console.error(`ObjectSubject: error in handler: ${error}`);
                    if (error instanceof Error) {
                        console.error(error.stack);
                    }
                }
            }
            this.notifyDepth--;
            if (needCleanUpSubs && this.notifyDepth === 0) {
                this.subs = this.subs.filter(sub => sub.isAlive);
            }
        }
        /**
         * Notifies a subscription of this subject's current state.
         * @param sub The subscription to notify.
         */
        initialNotify(sub) {
            for (const key in this.obj) {
                const v = this.obj[key];
                sub.handler(this.obj, key, v, v);
            }
        }
        /**
         * Responds to when a subscription to this subscribable is destroyed.
         * @param sub The destroyed subscription.
         */
        onSubDestroyed(sub) {
            // If we are not in the middle of a notify operation, remove the subscription.
            // Otherwise, do nothing and let the post-notify clean-up code handle it.
            if (this.notifyDepth === 0) {
                this.subs.splice(this.subs.indexOf(sub), 1);
            }
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        map(fn, equalityFunc, mutateFunc, initialVal) {
            const mapFunc = (inputs, previousVal) => fn(inputs[0], previousVal);
            return mutateFunc
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ? MappedSubject.create(mapFunc, equalityFunc, mutateFunc, initialVal, this)
                : MappedSubject.create(mapFunc, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : AbstractSubscribable.DEFAULT_EQUALITY_FUNC, this);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        pipe(to, arg2, arg3) {
            let sub;
            let paused;
            if (typeof arg2 === 'function') {
                sub = new SubscribablePipe(this, to, arg2, this.onSubDestroyedFunc);
                paused = arg3 !== null && arg3 !== void 0 ? arg3 : false;
            }
            else {
                sub = new SubscribablePipe(this, to, this.onSubDestroyedFunc);
                paused = arg2 !== null && arg2 !== void 0 ? arg2 : false;
            }
            this.subs.push(sub);
            if (paused) {
                sub.pause();
            }
            else {
                sub.initialNotify();
            }
            return sub;
        }
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    /**
     * A type map of search type to concrete facility loader query type.
     */
    new Map([
        [FacilitySearchType.Airport, FacilityType.Airport],
        [FacilitySearchType.Intersection, FacilityType.Intersection],
        [FacilitySearchType.Vor, FacilityType.VOR],
        [FacilitySearchType.Ndb, FacilityType.NDB],
        [FacilitySearchType.User, FacilityType.USR]
    ]);
    /**
     * A wrapper for a {@link NearestSearchSession} that automatically adjusts the number of
     * search results requested from the sim to minimize search load while still attempting to
     * provide the total number of results needed by the user.
     */
    class AdaptiveNearestSubscription extends AbstractSubscribableArray {
        /**
         * Creates an instance of AdaptiveNearestSubscription.
         * @param subscription A {@link NearestSubscription} to use as our inner search.
         * @param absoluteMaxItems The maximum number of results to request in any search.
         */
        constructor(subscription, absoluteMaxItems) {
            super();
            this.subscription = subscription;
            this.absoluteMaxItems = absoluteMaxItems;
            /** The array that holds the results of our latest search. */
            this.facilities = ArraySubject.create();
            /**
             * This array provides a backing store for what is essentially a "virtual" array
             * representing the aggregate of our search results to the client. Since we need to
             * limit the number of results returned we will carefully manage notifications when
             * anything changes to only expose the requested number of elements.
             */
            this.shadowFacilities = SortedMappedSubscribableArray.create(this.facilities, (a, b) => this.pos.distance(a) - this.pos.distance(b), (a, b) => a.icao === b.icao);
            /** The number of items requested on the last call to update. */
            this.lastMaxRequested = 0;
            /** The number of items we are requesting from the inner search to meet current demands. */
            this.derivedMaxItems = 0;
            /** Whether we have a search in progress already. */
            this.searchInProgress = false;
            /** A reusable GeoPoint for sorting by distance. */
            this.pos = new GeoPoint(0, 0);
            // When the search updates, this will cause our facilities array to be updated.
            this.subscription.sub(this.onSourceChanged.bind(this));
            // And this responds in changes to the facilities array via the mapping between the
            // two to send any managed notifications needed to our subscribers.
            this.shadowFacilities.sub(this.notifySubscribers.bind(this));
        }
        /** @inheritdoc */
        get length() {
            return this.shadowFacilities.length;
        }
        /** @inheritdoc */
        getArray() {
            return this.shadowFacilities.getArray();
        }
        /**
         * Whether or not the inner search has started.
         * @returns True if started, false otherwise.
         */
        get started() {
            return this.subscription.started;
        }
        /**
         * Start the inner search subscription.
         */
        async start() {
            return this.subscription.start();
        }
        /**
         * Cause the inner subscription to update.
         * @param lat The latitude of the current search position.
         * @param lon The longitude of the current search position.
         * @param radius The radius of the search, in meters.
         * @param maxItems The maximum number of items to return in the search.
         */
        async update(lat, lon, radius, maxItems) {
            if (this.searchInProgress) {
                return;
            }
            this.searchInProgress = true;
            this.pos.set(lat, lon);
            // It would be unexpected for the max requested number of items to change, but the API
            // supports it so we're going to handle it anyway.  If it changes we need to automatically
            // grow or shrink the size of the virtual array we show our subscribers before further
            // processing search results.
            if (maxItems < this.lastMaxRequested) {
                // Remove existing results from the end to avoid indices shifting around.
                for (let i = this.shadowFacilities.length - 1; i >= maxItems; i--) {
                    this.notify(i, SubscribableArrayEventType.Removed, this.shadowFacilities.get(i));
                }
            }
            else if (maxItems > this.lastMaxRequested) {
                // Be careful not to overflow shadowFacilities when adding new items.
                for (let i = this.lastMaxRequested; i < Math.min(maxItems, this.shadowFacilities.length); i++) {
                    this.notify(i, SubscribableArrayEventType.Added, this.shadowFacilities.get(i));
                }
            }
            this.lastMaxRequested = maxItems;
            if (maxItems > this.derivedMaxItems) {
                this.derivedMaxItems = maxItems;
            }
            // When the subscription updates, any changes from airports added or removed cause
            // onSourceChanged below to trigger.   That will update our facilites store, because
            // it means the airport is no longer in the raw search data.
            await this.subscription.update(lat, lon, radius, this.derivedMaxItems);
            // If we have more returned facilities in our search than the user has asked for we
            // can begin a ramp-down of our search size.  Ramp down is less aggressive than
            // ramp up to avoid flapping between the two states.
            if (this.facilities.length > maxItems) {
                this.derivedMaxItems = Math.max(Math.round(this.derivedMaxItems - (this.derivedMaxItems * AdaptiveNearestSubscription.RAMP_DOWN_FACTOR)), maxItems);
            }
            else {
                // We have either exactly enough or too few facilities.  If we have too few, ramp
                // up our search size until we either have enough or hit the maximum allowed search
                // quantity.
                while (this.facilities.length < maxItems && this.derivedMaxItems < this.absoluteMaxItems) {
                    this.derivedMaxItems = Math.min(Math.round(this.derivedMaxItems * AdaptiveNearestSubscription.RAMP_UP_FACTOR), this.absoluteMaxItems);
                    await this.subscription.update(lat, lon, radius, this.derivedMaxItems);
                }
            }
            this.searchInProgress = false;
        }
        /**
         * Responds to changes in our inner search and updates our facilities store accordingly.
         * @param index The index of the changed item.
         * @param type The type of change.
         * @param item The item(s) involved in the change, if any.
         */
        onSourceChanged(index, type, item) {
            if (type === SubscribableArrayEventType.Cleared) {
                this.facilities.clear();
                this.notify(0, SubscribableArrayEventType.Cleared);
                return;
            }
            if (item === undefined) {
                return;
            }
            // SubscribableArrayHandler uses a compound type for T, but NearestWaypointSubscription
            // should only ever send us a single item to add or remove.  We'll treat it as if that
            // were the only expected case to simplify the processing.
            if (item instanceof Array) {
                console.warn('AdaptiveNearestSubscription received unexpected type.');
                return;
            }
            switch (type) {
                case SubscribableArrayEventType.Added:
                    this.facilities.insert(item);
                    break;
                case SubscribableArrayEventType.Removed:
                    this.facilities.removeItem(item);
                    break;
            }
        }
        /**
         * Notify our subscribers of changes to the virtual search results.
         * @param index The index of the changed item.
         * @param type The type of change.
         * @param item The item(s) involved in the change, if any.
         */
        notifySubscribers(index, type, item) {
            // The subscriber doesn't care if the change is at an index above what they should see.
            if (index >= this.lastMaxRequested || item === undefined) {
                return;
            }
            // Since we iterate over individal items in onSourceChanged we should never have an array here.
            if (item instanceof Array && type !== SubscribableArrayEventType.Cleared) {
                console.warn('AdaptiveNearestSubscription: received array of items in a single notification');
            }
            this.notify(index, type, item);
            switch (type) {
                case SubscribableArrayEventType.Cleared:
                    // NOOP
                    break;
                case SubscribableArrayEventType.Added:
                    // We've just added something.  If it's within the range of the virtual array, it will pop the last
                    // item off the end of the array if one exists, so we send a remove notificaiton for that.
                    if (index < this.lastMaxRequested && this.shadowFacilities.tryGet(this.lastMaxRequested) !== undefined) {
                        this.notify(this.lastMaxRequested, SubscribableArrayEventType.Removed, this.shadowFacilities.get(this.lastMaxRequested));
                    }
                    break;
                case SubscribableArrayEventType.Removed:
                    // If we've removed an item within the range of the virtual array it will leave a vacant spot at the
                    // end.  If there's something we can put there we need to do that.
                    if (index < this.lastMaxRequested && this.shadowFacilities.tryGet(this.lastMaxRequested - 1) !== undefined) {
                        this.notify(this.lastMaxRequested - 1, SubscribableArrayEventType.Added, this.shadowFacilities.get(this.lastMaxRequested - 1));
                    }
            }
        }
    }
    AdaptiveNearestSubscription.RAMP_UP_FACTOR = 1.33;
    AdaptiveNearestSubscription.RAMP_DOWN_FACTOR = 0.1;

    [new GeoCircle(new Float64Array(3), 0)];
    new BinaryHeap((a, b) => b.distanceToFarthestVector - a.distanceToFarthestVector);

    /**
     * A task queue backed by an array.
     */
    class ArrayTaskQueue {
        /**
         * Constructor.
         * @param tasks The array of tasks in this queue.
         */
        constructor(tasks) {
            this.tasks = tasks;
            this.head = 0;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        hasNext() {
            return this.head < this.tasks.length;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        next() {
            return this.tasks[this.head++];
        }
    }

    /**
     * A process which dispatches tasks in a task queue potentially over multiple frames.
     */
    class ThrottledTaskQueueProcess {
        /**
         * Constructor.
         * @param queue The queue to process.
         * @param handler A handler which defines the behavior of this process.
         */
        constructor(queue, handler) {
            this.queue = queue;
            this.handler = handler;
            this._hasStarted = false;
            this._hasEnded = false;
            this._shouldAbort = false;
        }
        /**
         * Checks whether this process has been started.
         * @returns whether this process has been started.
         */
        hasStarted() {
            return this._hasStarted;
        }
        /**
         * Checks whether this process has ended.
         * @returns whether this process has ended.
         */
        hasEnded() {
            return this._hasEnded;
        }
        /**
         * Starts this process.
         */
        start() {
            this._hasStarted = true;
            this.processQueue(0);
        }
        /**
         * Processes the queue.
         * @param elapsedFrameCount The number of frames elapsed since queue processing started.
         */
        processQueue(elapsedFrameCount) {
            let dispatchCount = 0;
            const t0 = performance.now();
            while (!this._shouldAbort && this.queue.hasNext()) {
                if (this.handler.canContinue(elapsedFrameCount, dispatchCount, performance.now() - t0)) {
                    const task = this.queue.next();
                    task();
                    dispatchCount++;
                }
                else {
                    break;
                }
            }
            if (this._shouldAbort) {
                return;
            }
            if (!this.queue.hasNext()) {
                this.handler.onFinished(elapsedFrameCount);
                this._hasEnded = true;
            }
            else {
                this.handler.onPaused(elapsedFrameCount);
                requestAnimationFrame(this.processQueue.bind(this, elapsedFrameCount + 1));
            }
        }
        /**
         * Aborts this process. Has no effect if the process has not been started or if it has already ended.
         */
        abort() {
            if (this._hasStarted && !this._hasEnded) {
                this.handler.onAborted();
                this._shouldAbort = true;
                this._hasEnded = true;
            }
        }
    }

    /**
     * A nearest search session for boundaries (airspaces) in the form of LodBoundary objects.
     */
    class NearestLodBoundarySearchSession {
        /**
         * Constructor.
         * @param cache The boundary cache this search session uses.
         * @param session The nearest boundary facility search session this search session uses.
         * @param frameBudget The maximum amount of time allotted per frame to retrieve and process LodBoundary objects, in
         * milliseconds.
         */
        constructor(cache, session, frameBudget) {
            this.cache = cache;
            this.session = session;
            this.frameBudget = frameBudget;
        }
        /**
         * Searches for the nearest boundaries around a specified location.
         * @param lat The latitude of the search center, in degrees.
         * @param lon The longitude of the search center, in degrees.
         * @param radius The radius of the search, in meters.
         * @param maxItems The maximum number of items for which to search.
         * @returns The nearest search results.
         */
        async searchNearest(lat, lon, radius, maxItems) {
            const facilityResults = await this.session.searchNearest(lat, lon, radius, maxItems);
            const results = { added: [], removed: facilityResults.removed };
            const tasks = facilityResults.added.map((fac, index) => () => { results.added[index] = this.cache.get(fac); });
            await new Promise(resolve => {
                const taskQueue = new ThrottledTaskQueueProcess(new ArrayTaskQueue(tasks), new NearestLodBoundarySearchTaskQueueHandler(this.frameBudget, resolve));
                taskQueue.start();
            });
            return results;
        }
        /**
         * Sets this session's boundary class filter. The new filter takes effect with the next search executed in this
         * session.
         * @param classMask A bitmask defining the boundary classes to include in the search (`0`: exclude, `1`: include).
         * The bit index for each boundary class is equal to the value of the corresponding `BoundaryType` enum.
         */
        setFilter(classMask) {
            this.session.setBoundaryFilter(classMask);
        }
    }
    /**
     * A throttled task queue handler for retrieving and creating new LodBoundary objects in response to a nearest search.
     */
    class NearestLodBoundarySearchTaskQueueHandler {
        /**
         * Constructor.
         * @param frameBudget The maximum amount of time allotted per frame to retrieve and process LodBoundary objects, in
         * milliseconds.
         * @param resolve The Promise resolve function this handler will call when the task queue is finished.
         */
        constructor(frameBudget, resolve) {
            this.frameBudget = frameBudget;
            this.resolve = resolve;
        }
        /** @inheritdoc */
        onStarted() {
            // noop
        }
        /** @inheritdoc */
        canContinue(elapsedFrameCount, dispatchedTaskCount, timeElapsed) {
            return timeElapsed < this.frameBudget;
        }
        /** @inheritdoc */
        onPaused() {
            // noop
        }
        /** @inheritdoc */
        onFinished() {
            this.resolve();
        }
        /** @inheritdoc */
        onAborted() {
            // noop
        }
    }

    /**
     * The transition type to which a flight path vector belongs.
     */
    var FlightPathVectorFlags;
    (function (FlightPathVectorFlags) {
        FlightPathVectorFlags[FlightPathVectorFlags["None"] = 0] = "None";
        /** A turn to a specific course. */
        FlightPathVectorFlags[FlightPathVectorFlags["TurnToCourse"] = 1] = "TurnToCourse";
        /** An arcing turn to a specific point. */
        FlightPathVectorFlags[FlightPathVectorFlags["Arc"] = 2] = "Arc";
        /** A direct course to a specific point. */
        FlightPathVectorFlags[FlightPathVectorFlags["Direct"] = 4] = "Direct";
        /** A path to intercept a specific course. */
        FlightPathVectorFlags[FlightPathVectorFlags["InterceptCourse"] = 8] = "InterceptCourse";
        /** Inbound leg of a hold. */
        FlightPathVectorFlags[FlightPathVectorFlags["HoldInboundLeg"] = 16] = "HoldInboundLeg";
        /** Outbound leg of a hold. */
        FlightPathVectorFlags[FlightPathVectorFlags["HoldOutboundLeg"] = 32] = "HoldOutboundLeg";
        /** A direct hold entry. */
        FlightPathVectorFlags[FlightPathVectorFlags["HoldDirectEntry"] = 64] = "HoldDirectEntry";
        /** A teardrop hold entry. */
        FlightPathVectorFlags[FlightPathVectorFlags["HoldTeardropEntry"] = 128] = "HoldTeardropEntry";
        /** A parallel hold entry. */
        FlightPathVectorFlags[FlightPathVectorFlags["HoldParallelEntry"] = 256] = "HoldParallelEntry";
        /** A course reversal. */
        FlightPathVectorFlags[FlightPathVectorFlags["CourseReversal"] = 512] = "CourseReversal";
        /** A turn from one leg to another. */
        FlightPathVectorFlags[FlightPathVectorFlags["LegToLegTurn"] = 1024] = "LegToLegTurn";
        /** An anticipated turn from one leg to another. */
        FlightPathVectorFlags[FlightPathVectorFlags["AnticipatedTurn"] = 2048] = "AnticipatedTurn";
        /** A fallback path. */
        FlightPathVectorFlags[FlightPathVectorFlags["Fallback"] = 4096] = "Fallback";
    })(FlightPathVectorFlags || (FlightPathVectorFlags = {}));
    /**
     * A prototype for signalling application-specific type metadata for plan segments.
     */
    var FlightPlanSegmentType;
    (function (FlightPlanSegmentType) {
        FlightPlanSegmentType["Origin"] = "Origin";
        FlightPlanSegmentType["Departure"] = "Departure";
        FlightPlanSegmentType["Enroute"] = "Enroute";
        FlightPlanSegmentType["Arrival"] = "Arrival";
        FlightPlanSegmentType["Approach"] = "Approach";
        FlightPlanSegmentType["Destination"] = "Destination";
        FlightPlanSegmentType["MissedApproach"] = "MissedApproach";
        FlightPlanSegmentType["RandomDirectTo"] = "RandomDirectTo";
    })(FlightPlanSegmentType || (FlightPlanSegmentType = {}));
    /**
     * A segment of a flight plan.
     */
    class FlightPlanSegment {
        /**
         * Creates a new FlightPlanSegment.
         * @param segmentIndex The index of the segment within the flight plan.
         * @param offset The leg offset within the original flight plan that
         * the segment starts at.
         * @param legs The legs in the flight plan segment.
         * @param segmentType The type of segment this is.
         * @param airway The airway associated with this segment, if any.
         */
        constructor(segmentIndex, offset, legs, segmentType = FlightPlanSegmentType.Enroute, airway) {
            this.segmentIndex = segmentIndex;
            this.offset = offset;
            this.legs = legs;
            this.segmentType = segmentType;
            this.airway = airway;
        }
    }
    /** An empty flight plan segment. */
    FlightPlanSegment.Empty = new FlightPlanSegment(-1, -1, []);
    /**
     * Bitflags describing a leg definition.
     */
    var LegDefinitionFlags;
    (function (LegDefinitionFlags) {
        LegDefinitionFlags[LegDefinitionFlags["None"] = 0] = "None";
        LegDefinitionFlags[LegDefinitionFlags["DirectTo"] = 1] = "DirectTo";
        LegDefinitionFlags[LegDefinitionFlags["MissedApproach"] = 2] = "MissedApproach";
        LegDefinitionFlags[LegDefinitionFlags["Obs"] = 4] = "Obs";
        LegDefinitionFlags[LegDefinitionFlags["VectorsToFinal"] = 8] = "VectorsToFinal";
    })(LegDefinitionFlags || (LegDefinitionFlags = {}));
    var SpeedType;
    (function (SpeedType) {
        SpeedType[SpeedType["IAS"] = 0] = "IAS";
        SpeedType[SpeedType["MACH"] = 1] = "MACH";
    })(SpeedType || (SpeedType = {}));

    /**
     * Utility class for working with flight path calculations.
     */
    class FlightPathUtils {
        /**
         * Creates an empty arc vector.
         * @returns An empty arc vector.
         */
        static createEmptyCircleVector() {
            return {
                vectorType: 'circle',
                flags: FlightPathVectorFlags.None,
                radius: 0,
                centerX: 1,
                centerY: 0,
                centerZ: 0,
                startLat: 0,
                startLon: 0,
                endLat: 0,
                endLon: 0,
                distance: 0
            };
        }
        /**
         * Sets the parameters of a circle vector.
         * @param vector The circle vector to set.
         * @param circle The GeoCircle defining the vector's path.
         * @param start The start of the vector.
         * @param end The end of the vector.
         * @param flags The flags to set on the vector.
         * @returns The circle vector, after its parameters have been set.
         */
        static setCircleVector(vector, circle, start, end, flags) {
            vector.flags = flags;
            vector.radius = circle.radius;
            vector.centerX = circle.center[0];
            vector.centerY = circle.center[1];
            vector.centerZ = circle.center[2];
            vector.distance = UnitType.GA_RADIAN.convertTo(circle.distanceAlong(start, end, Math.PI), UnitType.METER);
            start instanceof Float64Array && (start = FlightPathUtils.geoPointCache[0].setFromCartesian(start));
            end instanceof Float64Array && (end = FlightPathUtils.geoPointCache[1].setFromCartesian(end));
            vector.startLat = start.lat;
            vector.startLon = start.lon;
            vector.endLat = end.lat;
            vector.endLon = end.lon;
            return vector;
        }
        /**
         * Checks whether a circle vector describes a great-circle path.
         * @param vector A flight path circle vector.
         * @returns Whether the vector describes a great-circle path.
         */
        static isVectorGreatCircle(vector) {
            return vector.radius === Math.PI / 2;
        }
        /**
         * Sets the parameters of a GeoCircle from a flight path circle vector.
         * @param vector A flight path circle vector.
         * @param out The GeoCircle to set.
         * @returns The GeoCircle, after its parameters have been set.
         */
        static setGeoCircleFromVector(vector, out) {
            return out.set(Vec3Math.set(vector.centerX, vector.centerY, vector.centerZ, FlightPathUtils.vec3Cache[0]), vector.radius);
        }
        /**
         * Gets the initial true course bearing of a flight path vector.
         * @param vector A flight path vector.
         * @returns The initial true course bearing of the vector, or undefined if one could not be calculated.
         */
        static getVectorInitialCourse(vector) {
            return FlightPathUtils.setGeoCircleFromVector(vector, FlightPathUtils.geoCircleCache[0]).bearingAt(FlightPathUtils.geoPointCache[0].set(vector.startLat, vector.startLon), Math.PI);
        }
        /**
         * Gets the final true course bearing of a flight path vector.
         * @param vector A flight path vector.
         * @returns The final true course bearing of the vector, or `undefined` if one could not be calculated.
         */
        static getVectorFinalCourse(vector) {
            return FlightPathUtils.setGeoCircleFromVector(vector, FlightPathUtils.geoCircleCache[0]).bearingAt(FlightPathUtils.geoPointCache[0].set(vector.endLat, vector.endLon), Math.PI);
        }
        /**
         * Gets the final position of a calculated leg.
         * @param legCalc A set of leg calculations.
         * @param out The GeoPoint object to which to write the result.
         * @returns The final position of the leg, or `undefined` if one could not be obtained.
         */
        static getLegFinalPosition(legCalc, out) {
            if (legCalc.endLat !== undefined && legCalc.endLon !== undefined) {
                return out.set(legCalc.endLat, legCalc.endLon);
            }
            return undefined;
        }
        /**
         * Gets the final true course of a calculated leg.
         * @param legCalc A set of leg calculations.
         * @returns The final true course of the leg, or `undefined` if one could not be obtained.
         */
        static getLegFinalCourse(legCalc) {
            if (legCalc.flightPath.length > 0) {
                const vector = legCalc.flightPath[legCalc.flightPath.length - 1];
                return this.getVectorFinalCourse(vector);
            }
            return undefined;
        }
        /**
         * Gets the circle describing the path of a turn.
         * @param center The center of the turn.
         * @param radius The radius of the turn, in great-arc radians.
         * @param turnDirection The direction of the turn.
         * @param out A GeoCircle object to which to write the result.
         * @returns The circle describing the path of the turn.
         */
        static getTurnCircle(center, radius, turnDirection, out) {
            out.set(center, radius);
            if (turnDirection === 'right') {
                out.reverse();
            }
            return out;
        }
        /**
         * Reverses the direction of a turn circle while keeping the turn center and turn radius constant.
         * @param circle The turn circle to reverse.
         * @param out A GeoCircle object to which to write the result.
         * @returns A turn circle which has the same turn center and turn radius, but the opposite direction as `circle`.
         */
        static reverseTurnCircle(circle, out) {
            return out.set(Vec3Math.multScalar(circle.center, -1, FlightPathUtils.vec3Cache[0]), Math.PI - circle.radius);
        }
        /**
         * Gets the direction of a turn described by a circle.
         * @param circle The geo circle describing the turn.
         * @returns The direction of the turn described by the circle.
         */
        static getTurnDirectionFromCircle(circle) {
            return circle.radius > MathUtils.HALF_PI ? 'right' : 'left';
        }
        /**
         * Gets the radius of a turn described by a circle.
         * @param circle The geo circle describing the turn.
         * @returns The radius of the turn described by the circle, in great-arc radians.
         */
        static getTurnRadiusFromCircle(circle) {
            return Math.min(circle.radius, Math.PI - circle.radius);
        }
        /**
         * Gets the center of a turn described by a circle.
         * @param circle The geo circle describing the turn.
         * @param out A GeoPoint or 3D vector object to which to write the result.
         * @returns The center of a turn described by the circle.
         */
        static getTurnCenterFromCircle(circle, out) {
            return (circle.radius > MathUtils.HALF_PI
                ? out instanceof Float64Array
                    ? Vec3Math.multScalar(circle.center, -1, out)
                    : out.setFromCartesian(-circle.center[0], -circle.center[1], -circle.center[2])
                : out instanceof Float64Array
                    ? Vec3Math.copy(circle.center, out)
                    : out.setFromCartesian(circle.center));
        }
        /**
         * Calculates and returns a circle describing a turn starting from a path at a specified point.
         * @param start The starting point of the turn.
         * @param path The circle describing the path from which the turn starts.
         * @param turnRadius The radius of the turn, in great-arc radians.
         * @param turnDirection The direction of the turn.
         * @param out A GeoCircle object to which to write the result.
         * @returns The circle describing the path of the specified turn.
         */
        static getTurnCircleStartingFromPath(start, path, turnRadius, turnDirection, out) {
            if (!(start instanceof Float64Array)) {
                start = GeoPoint.sphericalToCartesian(start, FlightPathUtils.vec3Cache[0]);
            }
            const radius = turnDirection === 'left'
                ? turnRadius
                : Math.PI - turnRadius;
            const turnStartToCenterNormal = Vec3Math.cross(start, path.center, FlightPathUtils.vec3Cache[1]);
            const turnStartToCenterPath = FlightPathUtils.geoCircleCache[0].set(turnStartToCenterNormal, MathUtils.HALF_PI);
            const turnCenter = turnStartToCenterPath.offsetDistanceAlong(start, radius, FlightPathUtils.vec3Cache[1], Math.PI);
            return out.set(turnCenter, radius);
        }
        /**
         * Gets the signed distance along an arc from a defined start point to a query point. The start, query, and end
         * points will be projected onto the arc's parent circle if they do not already lie on it. A negative distance
         * indicates that the query point lies somewhere before the start of the arc but after the point on the arc's parent
         * circle that is diametrically opposed to the midpoint of the arc.
         * @param circle The arc's parent circle.
         * @param start The start point of the arc.
         * @param end The end point of the arc.
         * @param pos The query point.
         * @param tolerance The error tolerance, in great-arc radians, when checking if `start` and `query` are equal.
         * Defaults to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
         * @returns The signed distance along the arc from the start point to the query point, in great-arc radians.
         */
        static getAlongArcSignedDistance(circle, start, end, pos, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
            const posAngularDistance = circle.angleAlong(start, pos, Math.PI);
            if (Math.min(posAngularDistance, MathUtils.TWO_PI - posAngularDistance) <= tolerance) {
                return 0;
            }
            const endAngularDistance = circle.angleAlong(start, end, Math.PI);
            return circle.arcLength((posAngularDistance - (endAngularDistance / 2) + Math.PI) % MathUtils.TWO_PI - Math.PI + endAngularDistance / 2);
        }
        /**
         * Gets the normalized distance along an arc from a defined start point to a query point. The start, query, and end
         * points will be projected onto the arc's parent circle if they do not already lie on it. The distance is normalized
         * such that 1 equals the arc length from the start point to the end point. A negative distance indicates that the
         * query point lies somewhere before the start of the arc but after the point on the arc's parent circle that is
         * diametrically opposed to the midpoint of the arc.
         * @param circle The arc's parent circle.
         * @param start The start point of the arc.
         * @param end The end point of the arc.
         * @param pos The query point.
         * @param tolerance The error tolerance, in great-arc radians, when checking if `start` and `query` are equal.
         * Defaults to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
         * @returns The normalized distance along the arc from the start point to the query point.
         */
        static getAlongArcNormalizedDistance(circle, start, end, pos, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
            const posAngularDistance = circle.angleAlong(start, pos, Math.PI);
            if (Math.min(posAngularDistance, MathUtils.TWO_PI - posAngularDistance) <= tolerance) {
                return 0;
            }
            const endAngularDistance = circle.angleAlong(start, end, Math.PI);
            if (Math.min(endAngularDistance, MathUtils.TWO_PI - endAngularDistance) <= tolerance) {
                return posAngularDistance >= Math.PI ? -Infinity : Infinity;
            }
            return ((posAngularDistance - (endAngularDistance / 2) + Math.PI) % MathUtils.TWO_PI - Math.PI) / endAngularDistance + 0.5;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        static isPointAlongArc(circle, start, end, pos, inclusive = true, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
            const angularTolerance = circle.angularWidth(tolerance);
            if (typeof end !== 'number') {
                end = circle.angleAlong(start, end, Math.PI, angularTolerance);
            }
            if (inclusive && Math.abs(end) >= MathUtils.TWO_PI - angularTolerance) {
                return true;
            }
            const angle = circle.angleAlong(start, pos, Math.PI);
            if (inclusive && angle >= MathUtils.TWO_PI - angularTolerance) {
                return true;
            }
            const signedDiff = (angle - end) * (end >= 0 ? 1 : -1);
            return inclusive ? signedDiff <= angularTolerance : signedDiff < -angularTolerance;
        }
        /**
         * Resolves the ingress to egress vectors for a set of flight plan leg calculations. This operation will populate the
         * `ingressToEgress` array with a sequence of vectors connecting the ingress transition to the egress transition
         * while following the flight path defined by the vectors in the `flightPath` array.
         * @param legCalc A set of flight plan leg calculations.
         * @returns The flight plan leg calculations, after the ingress to egress vectors have been resolved.
         */
        static resolveIngressToEgress(legCalc) {
            var _a, _b, _c, _d, _e, _f;
            var _g, _h, _j, _k, _l, _m;
            const vectors = legCalc.ingressToEgress;
            let vectorIndex = 0;
            let flightPathVectorIndex = Math.max(0, legCalc.ingressJoinIndex);
            const lastIngressVector = legCalc.ingress[legCalc.ingress.length - 1];
            const ingressJoinVector = legCalc.flightPath[legCalc.ingressJoinIndex];
            const firstEgressVector = legCalc.egress[0];
            const egressJoinVector = legCalc.flightPath[legCalc.egressJoinIndex];
            if (lastIngressVector && ingressJoinVector) {
                // Check if the last ingress vector joins the base flight path before the end of a vector. If so, we need to
                // replace the base flight path vector the ingress joins with a shortened version starting where the ingress
                // ends.
                const ingressEnd = FlightPathUtils.geoPointCache[0].set(lastIngressVector.endLat, lastIngressVector.endLon);
                const ingressJoinVectorStart = FlightPathUtils.geoPointCache[1].set(ingressJoinVector.startLat, ingressJoinVector.startLon);
                const ingressJoinVectorEnd = legCalc.ingressJoinIndex === legCalc.egressJoinIndex && firstEgressVector
                    ? FlightPathUtils.geoPointCache[2].set(firstEgressVector.startLat, firstEgressVector.startLon)
                    : FlightPathUtils.geoPointCache[2].set(ingressJoinVector.endLat, ingressJoinVector.endLon);
                const ingressJoinVectorCircle = FlightPathUtils.setGeoCircleFromVector(ingressJoinVector, FlightPathUtils.geoCircleCache[0]);
                const ingressEndAlongVectorDistance = FlightPathUtils.getAlongArcNormalizedDistance(ingressJoinVectorCircle, ingressJoinVectorStart, ingressJoinVectorEnd, ingressEnd);
                const normalizedTolerance = GeoCircle.ANGULAR_TOLERANCE / UnitType.METER.convertTo(ingressJoinVector.distance, UnitType.GA_RADIAN);
                if (ingressEndAlongVectorDistance < 1 - normalizedTolerance) {
                    // Ingress joins the base flight path before the end of the joined vector.
                    if (ingressEndAlongVectorDistance > normalizedTolerance) {
                        // Ingress joins the base flight path after the start of the joined vector.
                        ingressJoinVectorCircle.closest(ingressEnd, ingressEnd);
                        FlightPathUtils.setCircleVector((_a = vectors[_g = vectorIndex++]) !== null && _a !== void 0 ? _a : (vectors[_g] = FlightPathUtils.createEmptyCircleVector()), ingressJoinVectorCircle, ingressEnd, ingressJoinVectorEnd, ingressJoinVector.flags);
                    }
                    else {
                        // Ingress joins the base flight path at or before the start of the joined vector.
                        Object.assign((_b = vectors[_h = vectorIndex++]) !== null && _b !== void 0 ? _b : (vectors[_h] = FlightPathUtils.createEmptyCircleVector()), ingressJoinVector);
                    }
                }
                flightPathVectorIndex++;
            }
            const end = Math.min(legCalc.flightPath.length, legCalc.egressJoinIndex < 0 ? Infinity : legCalc.egressJoinIndex);
            for (let i = flightPathVectorIndex; i < end; i++) {
                Object.assign((_c = vectors[_j = vectorIndex++]) !== null && _c !== void 0 ? _c : (vectors[_j] = FlightPathUtils.createEmptyCircleVector()), legCalc.flightPath[i]);
                flightPathVectorIndex++;
            }
            if (flightPathVectorIndex === legCalc.egressJoinIndex && egressJoinVector) {
                if (firstEgressVector) {
                    // Check if the first egress vector joins the base flight path in after the start of a vector. If so, we need
                    // to replace the base flight path vector the egress joins with a shortened version starting where the egress
                    // starts.
                    const egressStart = FlightPathUtils.geoPointCache[0].set(firstEgressVector.startLat, firstEgressVector.startLon);
                    const egressJoinVectorStart = FlightPathUtils.geoPointCache[1].set(egressJoinVector.startLat, egressJoinVector.startLon);
                    const egressJoinVectorEnd = FlightPathUtils.geoPointCache[2].set(egressJoinVector.endLat, egressJoinVector.endLon);
                    const egressJoinVectorCircle = FlightPathUtils.setGeoCircleFromVector(egressJoinVector, FlightPathUtils.geoCircleCache[0]);
                    const egressStartAlongVectorDistance = FlightPathUtils.getAlongArcNormalizedDistance(egressJoinVectorCircle, egressJoinVectorStart, egressJoinVectorEnd, egressStart);
                    const normalizedTolerance = GeoCircle.ANGULAR_TOLERANCE / UnitType.METER.convertTo(egressJoinVector.distance, UnitType.GA_RADIAN);
                    if (egressStartAlongVectorDistance > normalizedTolerance) {
                        // Egress joins the base flight path after the start of the joined vector.
                        if (egressStartAlongVectorDistance < 1 - normalizedTolerance) {
                            // Egress joins the base flight path before the end of the joined vector.
                            egressJoinVectorCircle.closest(egressStart, egressStart);
                            FlightPathUtils.setCircleVector((_d = vectors[_k = vectorIndex++]) !== null && _d !== void 0 ? _d : (vectors[_k] = FlightPathUtils.createEmptyCircleVector()), egressJoinVectorCircle, egressJoinVectorStart, egressStart, egressJoinVector.flags);
                        }
                        else {
                            // Egress joins the base flight path at or after the end of the joined vector.
                            Object.assign((_e = vectors[_l = vectorIndex++]) !== null && _e !== void 0 ? _e : (vectors[_l] = FlightPathUtils.createEmptyCircleVector()), egressJoinVector);
                        }
                    }
                }
                else {
                    // There is no egress, but there is a base flight path vector flagged as the vector with which the egress
                    // joins. This is technically an invalid state, but we can easily just treat this as a regular "no-egress"
                    // case and copy the entire egress join vector into the resolved vectors array.
                    Object.assign((_f = vectors[_m = vectorIndex++]) !== null && _f !== void 0 ? _f : (vectors[_m] = FlightPathUtils.createEmptyCircleVector()), egressJoinVector);
                }
            }
            vectors.length = vectorIndex;
            return legCalc;
        }
    }
    FlightPathUtils.vec3Cache = [new Float64Array(3), new Float64Array(3)];
    FlightPathUtils.geoPointCache = [new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
    FlightPathUtils.geoCircleCache = [new GeoCircle(new Float64Array(3), 0)];

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    [new GeoCircle(new Float64Array(3), 0)];
    [new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
    [new GeoCircle(new Float64Array(3), 0)];
    [new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
    [new GeoCircle(new Float64Array(3), 0)];
    [new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)];
    [
        new GeoCircle(new Float64Array(3), 0),
        new GeoCircle(new Float64Array(3), 0),
        new GeoCircle(new Float64Array(3), 0),
        new GeoCircle(new Float64Array(3), 0),
        new GeoCircle(new Float64Array(3), 0)
    ];
    [new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)];
    [
        new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)
    ];
    [
        new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0),
        new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)
    ];
    [
        new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0),
        new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)
    ];
    [new GeoCircle(new Float64Array(3), 0)];
    [new GeoPoint(0, 0), new GeoPoint(0, 0)];
    [new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)];

    [
        LegType.AF,
        LegType.RF,
        LegType.PI
    ];

    [new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
    [
        new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0),
        new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)
    ];
    [new GeoPoint(0, 0), new GeoPoint(0, 0)];
    ({
        geoPoint: [new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)],
        geoCircle: [new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)]
    });

    var PlanChangeType;
    (function (PlanChangeType) {
        PlanChangeType["Added"] = "Added";
        PlanChangeType["Inserted"] = "Inserted";
        PlanChangeType["Removed"] = "Removed";
        PlanChangeType["Changed"] = "Changed";
        PlanChangeType["Cleared"] = "Cleared";
    })(PlanChangeType || (PlanChangeType = {}));
    var ActiveLegType;
    (function (ActiveLegType) {
        ActiveLegType["Lateral"] = "Lateral";
        ActiveLegType["Vertical"] = "Vertical";
        ActiveLegType["Calculating"] = "Calculating";
    })(ActiveLegType || (ActiveLegType = {}));
    var OriginDestChangeType;
    (function (OriginDestChangeType) {
        OriginDestChangeType["OriginAdded"] = "OriginAdded";
        OriginDestChangeType["OriginRemoved"] = "OriginRemoved";
        OriginDestChangeType["DestinationAdded"] = "DestinationAdded";
        OriginDestChangeType["DestinationRemoved"] = "DestinationRemoved";
    })(OriginDestChangeType || (OriginDestChangeType = {}));

    /**
     * A collection of unique string waypoint type keys.
     */
    var WaypointTypes;
    (function (WaypointTypes) {
        WaypointTypes["Custom"] = "Custom";
        WaypointTypes["Airport"] = "Airport";
        WaypointTypes["NDB"] = "NDB";
        WaypointTypes["VOR"] = "VOR";
        WaypointTypes["Intersection"] = "Intersection";
        WaypointTypes["Runway"] = "Runway";
        WaypointTypes["User"] = "User";
        WaypointTypes["Visual"] = "Visual";
        WaypointTypes["FlightPlan"] = "FlightPlan";
        WaypointTypes["VNAV"] = "VNAV";
    })(WaypointTypes || (WaypointTypes = {}));
    /**
     * An abstract implementation of Waypoint.
     */
    class AbstractWaypoint {
        // eslint-disable-next-line jsdoc/require-jsdoc
        equals(other) {
            return this.uid === other.uid;
        }
    }
    /**
     * A waypoint with custom defined lat/lon coordinates.
     */
    class CustomWaypoint extends AbstractWaypoint {
        // eslint-disable-next-line jsdoc/require-jsdoc
        constructor(arg1, arg2, arg3) {
            super();
            let location;
            let uid;
            if (typeof arg1 === 'number') {
                location = GeoPointSubject.createFromGeoPoint(new GeoPoint(arg1, arg2));
                uid = `${arg3}[${location.get().lat},${location.get().lon}]`;
            }
            else {
                location = arg1;
                uid = arg2;
            }
            this._location = location;
            this._uid = uid;
        }
        /** @inheritdoc */
        get location() {
            return this._location;
        }
        /** @inheritdoc */
        get uid() {
            return this._uid;
        }
        /** @inheritdoc */
        get type() {
            return WaypointTypes.Custom;
        }
    }
    /**
     * A waypoint associated with a facility.
     */
    class FacilityWaypoint extends AbstractWaypoint {
        /**
         * Constructor.
         * @param facility The facility associated with this waypoint.
         * @param bus The event bus.
         */
        constructor(facility, bus) {
            super();
            this.bus = bus;
            this._facility = Subject.create(facility);
            this._location = GeoPointSubject.createFromGeoPoint(new GeoPoint(facility.lat, facility.lon));
            this._type = FacilityWaypoint.getType(facility);
            const facType = ICAO.getFacilityType(facility.icao);
            if (facType === FacilityType.VIS || facType === FacilityType.USR) {
                // These types of facilities can be mutated. So we need to listen to the event bus for change events and respond
                // accordingly.
                this.facChangeSub = this.bus.getSubscriber()
                    .on(`facility_changed_${facility.icao}`)
                    .handle(newFacility => {
                    this._facility.set(newFacility);
                    this._location.set(newFacility.lat, newFacility.lon);
                });
            }
        }
        /** @inheritdoc */
        get location() {
            return this._location;
        }
        /** @inheritdoc */
        get uid() {
            return this.facility.get().icao;
        }
        /** @inheritdoc */
        get type() {
            return this._type;
        }
        // eslint-disable-next-line jsdoc/require-returns
        /**
         * The facility associated with this waypoint.
         */
        get facility() {
            return this._facility;
        }
        /**
         * Gets a waypoint type from a facility.
         * @param facility A facility.
         * @returns The waypoint type corresponding to the facility.
         */
        static getType(facility) {
            switch (ICAO.getFacilityType(facility.icao)) {
                case FacilityType.Airport:
                    return WaypointTypes.Airport;
                case FacilityType.Intersection:
                    return WaypointTypes.Intersection;
                case FacilityType.NDB:
                    return WaypointTypes.NDB;
                case FacilityType.RWY:
                    return WaypointTypes.Runway;
                case FacilityType.USR:
                    return WaypointTypes.User;
                case FacilityType.VIS:
                    return WaypointTypes.Visual;
                case FacilityType.VOR:
                    return WaypointTypes.VOR;
                default:
                    return WaypointTypes.User;
            }
        }
    }
    /**
     * A flight path waypoint.
     */
    class FlightPathWaypoint extends CustomWaypoint {
        // eslint-disable-next-line jsdoc/require-jsdoc
        constructor(arg1, arg2, ident) {
            if (typeof arg1 === 'number') {
                super(arg1, arg2, `${FlightPathWaypoint.UID_PREFIX}_${ident}`);
            }
            else {
                super(arg1, arg2);
            }
            this.ident = ident;
        }
        /** @inheritdoc */
        get type() { return WaypointTypes.FlightPlan; }
    }
    FlightPathWaypoint.UID_PREFIX = 'FLPTH';
    /**
     * A VNAV TOD/BOD waypoint.
     */
    class VNavWaypoint extends AbstractWaypoint {
        /**
         * Constructor.
         * @param leg The leg that the VNAV waypoint is contained in.
         * @param distanceFromEnd The distance along the flight path from the end of the leg to the location of the waypoint,
         * in meters.
         * @param type The type of VNAV leg.
         */
        constructor(leg, distanceFromEnd, type) {
            super();
            this._uid = VNavWaypoint.uidMap[type];
            this._location = GeoPointSubject.createFromGeoPoint(this.getWaypointLocation(leg, distanceFromEnd));
        }
        /** @inheritdoc */
        get type() { return WaypointTypes.VNAV; }
        /**
         * Gets the waypoint's location in space.
         * @param leg The leg that the waypoint resides in.
         * @param distanceFromEnd The distance along the flight path from the end of the leg to the location of the waypoint,
         * in meters.
         * @returns The waypoint's location.
         */
        getWaypointLocation(leg, distanceFromEnd) {
            const out = new GeoPoint(0, 0);
            if (leg.calculated !== undefined) {
                const vectors = [...leg.calculated.ingress, ...leg.calculated.ingressToEgress, ...leg.calculated.egress];
                let vectorIndex = vectors.length - 1;
                while (vectorIndex >= 0) {
                    const vector = vectors[vectorIndex];
                    const start = VNavWaypoint.vec3Cache[0];
                    const end = VNavWaypoint.vec3Cache[1];
                    GeoPoint.sphericalToCartesian(vector.endLat, vector.endLon, end);
                    GeoPoint.sphericalToCartesian(vector.startLat, vector.startLon, start);
                    const circle = FlightPathUtils.setGeoCircleFromVector(vector, VNavWaypoint.geoCircleCache[0]);
                    const vectorDistance = UnitType.GA_RADIAN.convertTo(circle.distanceAlong(start, end), UnitType.METER);
                    if (vectorDistance >= distanceFromEnd) {
                        return circle.offsetDistanceAlong(end, UnitType.METER.convertTo(-distanceFromEnd, UnitType.GA_RADIAN), out);
                    }
                    else {
                        distanceFromEnd -= vectorDistance;
                    }
                    vectorIndex--;
                }
                if (vectors.length > 0) {
                    out.set(vectors[0].startLat, vectors[0].startLon);
                }
            }
            return out;
        }
        /** @inheritdoc */
        get location() {
            return this._location;
        }
        /** @inheritdoc */
        get uid() {
            return this._uid;
        }
    }
    VNavWaypoint.uidMap = { 'tod': 'vnav-tod', 'bod': 'vnav-bod' };
    VNavWaypoint.vec3Cache = [new Float64Array(3), new Float64Array(3)];
    VNavWaypoint.geoPointCache = [new GeoPoint(0, 0)];
    VNavWaypoint.geoCircleCache = [new GeoCircle(new Float64Array(3), 0)];

    /**
     * A default implementation of {@link FacilityWaypointCache}.
     */
    class DefaultFacilityWaypointCache {
        /**
         * Constructor.
         * @param bus The event bus.
         * @param size The maximum size of this cache.
         */
        constructor(bus, size) {
            this.bus = bus;
            this.size = size;
            this.cache = new Map();
        }
        /** @inheritdoc */
        get(facility) {
            let existing = this.cache.get(facility.icao);
            if (!existing) {
                existing = new FacilityWaypoint(facility, this.bus);
                this.addToCache(facility, existing);
            }
            return existing;
        }
        /**
         * Adds a waypoint to this cache. If the size of the cache is greater than the maximum after the new waypoint is
         * added, a waypoint will be removed from the cache in FIFO order.
         * @param facility The facility associated with the waypoint to add.
         * @param waypoint The waypoint to add.
         */
        addToCache(facility, waypoint) {
            this.cache.set(facility.icao, waypoint);
            if (this.cache.size > this.size) {
                this.cache.delete(this.cache.keys().next().value);
            }
        }
        /**
         * Gets a FacilityWaypointCache instance.
         * @param bus The event bus.
         * @returns A FacilityWaypointCache instance.
         */
        static getCache(bus) {
            var _a;
            return (_a = DefaultFacilityWaypointCache.INSTANCE) !== null && _a !== void 0 ? _a : (DefaultFacilityWaypointCache.INSTANCE = new DefaultFacilityWaypointCache(bus, 1000));
        }
    }

    var IcaoSearchFilter;
    (function (IcaoSearchFilter) {
        IcaoSearchFilter[IcaoSearchFilter["ALL"] = 0] = "ALL";
        IcaoSearchFilter[IcaoSearchFilter["AIRPORT"] = 1] = "AIRPORT";
        IcaoSearchFilter[IcaoSearchFilter["VOR"] = 2] = "VOR";
        IcaoSearchFilter[IcaoSearchFilter["NDB"] = 3] = "NDB";
        IcaoSearchFilter[IcaoSearchFilter["INTERSECTION"] = 4] = "INTERSECTION";
        IcaoSearchFilter[IcaoSearchFilter["USR"] = 5] = "USR";
    })(IcaoSearchFilter || (IcaoSearchFilter = {}));

    /** Transponder modes. */
    var XPDRMode;
    (function (XPDRMode) {
        XPDRMode[XPDRMode["OFF"] = 0] = "OFF";
        XPDRMode[XPDRMode["STBY"] = 1] = "STBY";
        XPDRMode[XPDRMode["TEST"] = 2] = "TEST";
        XPDRMode[XPDRMode["ON"] = 3] = "ON";
        XPDRMode[XPDRMode["ALT"] = 4] = "ALT";
        XPDRMode[XPDRMode["GROUND"] = 5] = "GROUND";
    })(XPDRMode || (XPDRMode = {}));

    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Wait;
    (function (Wait) {
        /**
         * Waits for a set amount of time.
         * @param delay The amount of time to wait in milliseconds.
         * @returns a Promise which is fulfilled after the delay.
         */
        // eslint-disable-next-line no-inner-declarations
        function awaitDelay(delay) {
            return new Promise(resolve => setTimeout(() => resolve(), delay));
        }
        Wait.awaitDelay = awaitDelay;
        /**
         * Waits for a condition to be satisfied.
         * @param predicate A function which evaluates whether the condition is satisfied.
         * @param interval The interval, in milliseconds, at which to evaluate the condition. A zero or negative value
         * causes the condition to be evaluated every frame. Defaults to 0.
         * @param timeout The amount of time, in milliseconds, before the returned Promise is rejected if the condition is
         * not satisfied. A zero or negative value causes the Promise to never be rejected and the condition to be
         * continually evaluated until it is satisfied. Defaults to 0.
         * @returns a Promise which is fulfilled when the condition is satisfied.
         */
        // eslint-disable-next-line no-inner-declarations
        function awaitCondition(predicate, interval = 0, timeout = 0) {
            const t0 = Date.now();
            if (interval <= 0) {
                const loopFunc = (resolve, reject) => {
                    if (timeout > 0 && Date.now() - t0 >= timeout) {
                        reject('Await condition timed out.');
                    }
                    else {
                        predicate() ? resolve() : requestAnimationFrame(loopFunc.bind(undefined, resolve, reject));
                    }
                };
                return new Promise((resolve, reject) => { loopFunc(resolve, reject); });
            }
            else {
                return new Promise((resolve, reject) => {
                    const timer = setInterval(() => {
                        if (timeout > 0 && Date.now() - t0 > timeout) {
                            clearInterval(timer);
                            reject('Await condition timed out.');
                        }
                        else if (predicate()) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, interval);
                });
            }
        }
        Wait.awaitCondition = awaitCondition;
    })(Wait || (Wait = {}));

    new GeoPoint(0, 0);

    new Map([
        ['flaps_handle_index', { name: 'FLAPS HANDLE INDEX', type: SimVarValueType.Number }],
        ['flaps_angle', { name: 'TRAILING EDGE FLAPS LEFT ANGLE', type: SimVarValueType.Degree }],
        ['elevator_trim_pct', { name: 'ELEVATOR TRIM PCT', type: SimVarValueType.Percent }],
        ['elevator_trim_neutral_pct', { name: 'AIRCRAFT ELEVATOR TRIM NEUTRAL', type: SimVarValueType.Percent }],
        ['aileron_trim_pct', { name: 'AILERON TRIM PCT', type: SimVarValueType.Percent }],
        ['rudder_trim_pct', { name: 'RUDDER TRIM PCT', type: SimVarValueType.Percent }],
        ['gear_position_index', { name: 'GEAR POSITION', type: SimVarValueType.Number }],
    ]);

    /// <reference types="msfstypes/JS/simvar" />
    new Map([
        ['elec_master_battery', { name: 'ELECTRICAL MASTER BATTERY', type: SimVarValueType.Bool }],
        ['elec_circuit_avionics_on_1', { name: 'CIRCUIT AVIONICS ON:1', type: SimVarValueType.Bool }],
        ['elec_circuit_avionics_on_2', { name: 'CIRCUIT AVIONICS ON:2', type: SimVarValueType.Bool }],
        ['elec_circuit_navcom1_on', { name: 'CIRCUIT NAVCOM1 ON', type: SimVarValueType.Bool }],
        ['elec_circuit_navcom2_on', { name: 'CIRCUIT NAVCOM2 ON', type: SimVarValueType.Bool }],
        ['elec_circuit_navcom3_on', { name: 'CIRCUIT NAVCOM3 ON', type: SimVarValueType.Bool }],
        ['elec_bus_main_v', { name: 'ELECTRICAL MAIN BUS VOLTAGE', type: SimVarValueType.Volts }],
        ['elec_bus_main_a', { name: 'ELECTRICAL MAIN BUS AMPS', type: SimVarValueType.Amps }],
        ['elec_bus_avionics_v', { name: 'ELECTRICAL AVIONICS BUS VOLTAGE', type: SimVarValueType.Volts }],
        ['elec_bus_avionics_a', { name: 'ELECTRICAL AVIONICS BUS AMPS', type: SimVarValueType.Amps }],
        ['elec_bus_genalt_1_v', { name: 'ELECTRICAL GENALT BUS VOLTAGE:1', type: SimVarValueType.Volts }],
        ['elec_bus_genalt_2_v', { name: 'ELECTRICAL GENALT BUS VOLTAGE:2', type: SimVarValueType.Volts }],
        ['elec_bus_genalt_1_a', { name: 'ELECTRICAL GENALT BUS AMPS:1', type: SimVarValueType.Amps }],
        ['elec_bus_genalt_2_a', { name: 'ELECTRICAL GENALT BUS AMPS:2', type: SimVarValueType.Amps }],
        ['elec_bat_a', { name: 'ELECTRICAL BATTERY LOAD', type: SimVarValueType.Amps }],
        ['elec_bat_v', { name: 'ELECTRICAL BATTERY VOLTAGE', type: SimVarValueType.Volts }]
    ]);

    new Map([
        ['cabin_altitude', { name: 'PRESSURIZATION CABIN ALTITUDE', type: SimVarValueType.Feet }],
        ['cabin_altitude_rate', { name: 'PRESSURIZATION CABIN ALTITUDE RATE', type: SimVarValueType.FPM }],
        ['pressure_diff', { name: 'PRESSURIZATION PRESSURE DIFFERENTIAL', type: SimVarValueType.PSI }]
    ]);

    /** Minimums Modes */
    var MinimumsMode;
    (function (MinimumsMode) {
        MinimumsMode[MinimumsMode["OFF"] = 0] = "OFF";
        MinimumsMode[MinimumsMode["BARO"] = 1] = "BARO";
        MinimumsMode[MinimumsMode["RA"] = 2] = "RA";
        MinimumsMode[MinimumsMode["TEMP_COMP_BARO"] = 3] = "TEMP_COMP_BARO";
    })(MinimumsMode || (MinimumsMode = {}));
    new Map([
        ['decision_height_feet', { name: 'DECISION HEIGHT', type: SimVarValueType.Feet }],
        ['decision_altitude_feet', { name: 'DECISION ALTITUDE MSL', type: SimVarValueType.Feet }],
        ['minimums_mode', { name: 'L:WT_MINIMUMS_MODE', type: SimVarValueType.Number }]
    ]);

    /**
     * The state of a given plane director.
     */
    var DirectorState;
    (function (DirectorState) {
        /** The plane director is not currently armed or active. */
        DirectorState["Inactive"] = "Inactive";
        /** The plane director is currently armed. */
        DirectorState["Armed"] = "Armed";
        /** The plane director is currently active. */
        DirectorState["Active"] = "Active";
    })(DirectorState || (DirectorState = {}));
    /* eslint-disable @typescript-eslint/no-empty-function */
    /**
     * A plane director that provides no behavior.
     */
    class EmptyDirector {
        constructor() {
            /** No-op. */
            this.onActivate = () => { };
            /** No-op */
            this.onArm = () => { };
            this.state = DirectorState.Inactive;
        }
        /** No-op. */
        activate() { }
        /** No-op. */
        deactivate() { }
        /** No-op. */
        update() { }
        /** No-op. */
        arm() { }
    }
    /** An instance of the empty plane director. */
    EmptyDirector.instance = new EmptyDirector();

    /**
     * The current vertical navigation state.
     */
    var VNavState;
    (function (VNavState) {
        /** VNAV Disabled. */
        VNavState[VNavState["Disabled"] = 0] = "Disabled";
        /** VNAV Enabled and Inactive. */
        VNavState[VNavState["Enabled_Inactive"] = 1] = "Enabled_Inactive";
        /** VNAV Enabled and Active. */
        VNavState[VNavState["Enabled_Active"] = 2] = "Enabled_Active";
    })(VNavState || (VNavState = {}));
    /**
     * The current VNAV path mode.
     */
    var VNavPathMode;
    (function (VNavPathMode) {
        /** VNAV path is not active. */
        VNavPathMode[VNavPathMode["None"] = 0] = "None";
        /** VNAV path is armed for capture. */
        VNavPathMode[VNavPathMode["PathArmed"] = 1] = "PathArmed";
        /** VNAV path is actively navigating. */
        VNavPathMode[VNavPathMode["PathActive"] = 2] = "PathActive";
        /** The current VNAV path is not valid. */
        VNavPathMode[VNavPathMode["PathInvalid"] = 3] = "PathInvalid";
    })(VNavPathMode || (VNavPathMode = {}));
    /**
     * The current Approach Guidance Mode.
     */
    var ApproachGuidanceMode;
    (function (ApproachGuidanceMode) {
        /** VNAV is not currently following approach guidance. */
        ApproachGuidanceMode[ApproachGuidanceMode["None"] = 0] = "None";
        /** VNAV has armed ILS glideslope guidance for capture. */
        ApproachGuidanceMode[ApproachGuidanceMode["GSArmed"] = 1] = "GSArmed";
        /** VNAV is actively following ILS glideslope guidance. */
        ApproachGuidanceMode[ApproachGuidanceMode["GSActive"] = 2] = "GSActive";
        /** VNAV RNAV glidepath guidance is armed for capture. */
        ApproachGuidanceMode[ApproachGuidanceMode["GPArmed"] = 3] = "GPArmed";
        /** VNAV is actively follow RNAV glidepath guidance. */
        ApproachGuidanceMode[ApproachGuidanceMode["GPActive"] = 4] = "GPActive";
    })(ApproachGuidanceMode || (ApproachGuidanceMode = {}));
    /**
     * The current VNAV altitude capture type.
     */
    var VNavAltCaptureType;
    (function (VNavAltCaptureType) {
        /** Altitude capture is not armed. */
        VNavAltCaptureType[VNavAltCaptureType["None"] = 0] = "None";
        /** Altitude will capture the selected altitude. */
        VNavAltCaptureType[VNavAltCaptureType["Selected"] = 1] = "Selected";
        /** Altitude will capture the VANV target altitude. */
        VNavAltCaptureType[VNavAltCaptureType["VNAV"] = 2] = "VNAV";
    })(VNavAltCaptureType || (VNavAltCaptureType = {}));
    /**
     * The current Vertical Flight Phase.
     */
    var VerticalFlightPhase;
    (function (VerticalFlightPhase) {
        /** The current vertical phase is Climb. */
        VerticalFlightPhase[VerticalFlightPhase["Climb"] = 0] = "Climb";
        /** The current vertical phase is Descent. */
        VerticalFlightPhase[VerticalFlightPhase["Descent"] = 1] = "Descent";
    })(VerticalFlightPhase || (VerticalFlightPhase = {}));
    /**
     * The current state of VNAV availability from the director.
     */
    var VNavAvailability;
    (function (VNavAvailability) {
        VNavAvailability["Available"] = "Available";
        VNavAvailability["InvalidLegs"] = "InvalidLegs";
    })(VNavAvailability || (VNavAvailability = {}));

    /**
     * Sim var names for VNAV data.
     */
    var VNavVars;
    (function (VNavVars) {
        /** The vertical deviation in feet. */
        VNavVars["VerticalDeviation"] = "L:WTAP_VNav_Vertical_Deviation";
        /** The VNAV target altitude in feet. */
        VNavVars["TargetAltitude"] = "L:WTAP_VNav_Target_Altitude";
        /** The VNAV path mode. */
        VNavVars["PathMode"] = "L:WTAP_VNav_Path_Mode";
        /** The VNAV State. */
        VNavVars["VNAVState"] = "L:WTAP_VNav_State";
        /** Whether a VNAV Path Exists for the current leg. */
        VNavVars["PathAvailable"] = "L:WTAP_VNav_Path_Available";
        /** The VNAV current altitude capture type. */
        VNavVars["CaptureType"] = "L:WTAP_VNav_Alt_Capture_Type";
        /** The distance to the next TOD in meters, or -1 if one does not exist. */
        VNavVars["TODDistance"] = "L:WTAP_VNav_Distance_To_TOD";
        /** The index of the leg for the next TOD. */
        VNavVars["TODLegIndex"] = "L:WTAP_VNav_TOD_Leg_Index";
        /** The distance from the end of the TOD leg that the TOD is, in meters. */
        VNavVars["TODDistanceInLeg"] = "L:WTAP_VNav_TOD_Distance_In_Leg";
        /** The index of the leg for the next BOD. */
        VNavVars["BODLegIndex"] = "L:WTAP_VNav_BOD_Leg_Index";
        /** The index of the leg for the next constraint. */
        VNavVars["CurrentConstraintLegIndex"] = "L:WTAP_VNav_Constraint_Leg_Index";
        /** The current constraint altitude, in feet. */
        VNavVars["CurrentConstraintAltitude"] = "L:WTAP_VNav_Constraint_Altitude";
        /** The next constraint altitude, in feet. */
        VNavVars["NextConstraintAltitude"] = "L:WTAP_VNav_Next_Constraint_Altitude";
        /** The distance to the next BOD, or -1 if one does not exist, in meters. */
        VNavVars["BODDistance"] = "L:WTAP_VNav_Distance_To_BOD";
        /** The current required flight path angle, in degrees. */
        VNavVars["FPA"] = "L:WTAP_VNav_FPA";
        /** The required VS to the current constraint, in FPM. */
        VNavVars["RequiredVS"] = "L:WTAP_VNAV_Required_VS";
        /** The VNAV approach guidance mode. */
        VNavVars["GPApproachMode"] = "L:WTAP_GP_Approach_Mode";
        /** The current LPV vertical deviation in feet. */
        VNavVars["GPVerticalDeviation"] = "L:WTAP_GP_Vertical_Deviation";
        /** The current remaining LPV distance in meters. */
        VNavVars["GPDistance"] = "L:WTAP_GP_Distance";
        /** The current LPV FPA, in degrees. */
        VNavVars["GPFpa"] = "L:WTAP_GP_FPA";
        /** The required VS to the current constraint, in FPM. */
        VNavVars["GPRequiredVS"] = "L:WTAP_GP_Required_VS";
    })(VNavVars || (VNavVars = {}));
    new Map([
        ['vnav_vertical_deviation', { name: VNavVars.VerticalDeviation, type: SimVarValueType.Feet }],
        ['vnav_target_altitude', { name: VNavVars.TargetAltitude, type: SimVarValueType.Feet }],
        ['vnav_path_mode', { name: VNavVars.PathMode, type: SimVarValueType.Number }],
        ['vnav_path_available', { name: VNavVars.PathAvailable, type: SimVarValueType.Bool }],
        ['vnav_state', { name: VNavVars.VNAVState, type: SimVarValueType.Number }],
        ['vnav_altitude_capture_type', { name: VNavVars.CaptureType, type: SimVarValueType.Number }],
        ['vnav_tod_distance', { name: VNavVars.TODDistance, type: SimVarValueType.Meters }],
        ['vnav_tod_leg_distance', { name: VNavVars.TODDistanceInLeg, type: SimVarValueType.Meters }],
        ['vnav_bod_distance', { name: VNavVars.BODDistance, type: SimVarValueType.Meters }],
        ['vnav_tod_global_leg_index', { name: VNavVars.TODLegIndex, type: SimVarValueType.Number }],
        ['vnav_bod_global_leg_index', { name: VNavVars.BODLegIndex, type: SimVarValueType.Number }],
        ['vnav_constraint_global_leg_index', { name: VNavVars.CurrentConstraintLegIndex, type: SimVarValueType.Number }],
        ['vnav_constraint_altitude', { name: VNavVars.CurrentConstraintAltitude, type: SimVarValueType.Feet }],
        ['vnav_next_constraint_altitude', { name: VNavVars.NextConstraintAltitude, type: SimVarValueType.Feet }],
        ['vnav_fpa', { name: VNavVars.FPA, type: SimVarValueType.Degree }],
        ['vnav_required_vs', { name: VNavVars.RequiredVS, type: SimVarValueType.FPM }],
        ['gp_approach_mode', { name: VNavVars.GPApproachMode, type: SimVarValueType.Number }],
        ['gp_vertical_deviation', { name: VNavVars.GPVerticalDeviation, type: SimVarValueType.Feet }],
        ['gp_distance', { name: VNavVars.GPDistance, type: SimVarValueType.Meters }],
        ['gp_fpa', { name: VNavVars.GPFpa, type: SimVarValueType.Degree }],
        ['gp_required_vs', { name: VNavVars.GPRequiredVS, type: SimVarValueType.FPM }]
    ]);

    /**
     * LNAV transition modes.
     */
    var LNavTransitionMode;
    (function (LNavTransitionMode) {
        /** LNAV is attempting to track a non-transition vector. */
        LNavTransitionMode[LNavTransitionMode["None"] = 0] = "None";
        /** LNAV is attempting to track an ingress vector. */
        LNavTransitionMode[LNavTransitionMode["Ingress"] = 1] = "Ingress";
        /** LNAV is attempting to track an egress vector. */
        LNavTransitionMode[LNavTransitionMode["Egress"] = 2] = "Egress";
    })(LNavTransitionMode || (LNavTransitionMode = {}));
    /**
     * Sim var names for LNAV data.
     */
    var LNavVars;
    (function (LNavVars) {
        /** The current desired track, in degrees true. */
        LNavVars["DTK"] = "L:WTAP_LNav_DTK";
        /**
         * The current crosstrack error. Negative values indicate deviation to the left, as viewed when facing in the
         * direction of the track. Positive values indicate deviation to the right.
         */
        LNavVars["XTK"] = "L:WTAP_LNav_XTK";
        /** Whether LNAV is tracking a path. */
        LNavVars["IsTracking"] = "L:WTAP_LNav_Is_Tracking";
        /** The global leg index of the flight plan leg LNAV is currently tracking. */
        LNavVars["TrackedLegIndex"] = "L:WTAP_LNav_Tracked_Leg_Index";
        /** The currently active LNAV transition mode. */
        // eslint-disable-next-line @typescript-eslint/no-shadow
        LNavVars["TransitionMode"] = "L:WTAP_LNav_Transition_Mode";
        /** The index of the vector LNAV is currently tracking. */
        LNavVars["TrackedVectorIndex"] = "L:WTAP_LNav_Tracked_Vector_Index";
        /** The current course LNAV is attempting to steer, in degrees true. */
        LNavVars["CourseToSteer"] = "L:WTAP_LNav_Course_To_Steer";
        /** Whether LNAV sequencing is suspended. */
        LNavVars["IsSuspended"] = "L:WTAP_LNav_Is_Suspended";
        /**
         * The along-track distance from the start of the currently tracked leg to the plane's present position. A negative
         * distance indicates the plane is before the start of the leg.
         */
        LNavVars["LegDistanceAlong"] = "L:WTAP_LNav_Leg_Distance_Along";
        /**
         * The along-track distance remaining in the currently tracked leg. A negative distance indicates the plane is past
         * the end of the leg.
         */
        LNavVars["LegDistanceRemaining"] = "L:WTAP_LNav_Leg_Distance_Remaining";
        /**
         * The along-track distance from the start of the currently tracked vector to the plane's present position. A
         * negative distance indicates the plane is before the start of the vector.
         */
        LNavVars["VectorDistanceAlong"] = "L:WTAP_LNav_Vector_Distance_Along";
        /**
         * The along-track distance remaining in the currently tracked vector. A negative distance indicates the plane is
         * past the end of the vector.
         */
        LNavVars["VectorDistanceRemaining"] = "L:WTAP_LNav_Vector_Distance_Remaining";
        /**
         * The along-track distance from the current vector end where LNAV will sequence to the next vector.
         * A positive value means the vector will be sequenced this distance prior to the vector end.
         */
        LNavVars["VectorAnticipationDistance"] = "L:WTAP_LNav_Vector_Anticipation_Distance";
    })(LNavVars || (LNavVars = {}));
    new Map([
        ['lnav_dtk', { name: LNavVars.DTK, type: SimVarValueType.Degree }],
        ['lnav_xtk', { name: LNavVars.XTK, type: SimVarValueType.NM }],
        ['lnav_is_tracking', { name: LNavVars.IsTracking, type: SimVarValueType.Bool }],
        ['lnav_tracked_leg_index', { name: LNavVars.TrackedLegIndex, type: SimVarValueType.Number }],
        ['lnav_transition_mode', { name: LNavVars.TransitionMode, type: SimVarValueType.Number }],
        ['lnav_tracked_vector_index', { name: LNavVars.TrackedVectorIndex, type: SimVarValueType.Number }],
        ['lnav_course_to_steer', { name: LNavVars.CourseToSteer, type: SimVarValueType.Degree }],
        ['lnav_is_suspended', { name: LNavVars.IsSuspended, type: SimVarValueType.Bool }],
        ['lnav_leg_distance_along', { name: LNavVars.LegDistanceAlong, type: SimVarValueType.NM }],
        ['lnav_leg_distance_remaining', { name: LNavVars.LegDistanceRemaining, type: SimVarValueType.NM }],
        ['lnav_vector_distance_along', { name: LNavVars.VectorDistanceAlong, type: SimVarValueType.NM }],
        ['lnav_vector_distance_remaining', { name: LNavVars.VectorDistanceRemaining, type: SimVarValueType.NM }],
        ['lnav_vector_anticipation_distance', { name: LNavVars.VectorAnticipationDistance, type: SimVarValueType.NM }]
    ]);

    /**
     * Sim var names for LNAV-related data.
     */
    var LNavDataVars;
    (function (LNavDataVars) {
        /** The current nominal desired track, in degrees true. */
        LNavDataVars["DTKTrue"] = "L:WT_LNavData_DTK_True";
        /** The current nominal desired track, in degrees magnetic. */
        LNavDataVars["DTKMagnetic"] = "L:WT_LNavData_DTK_Mag";
        /**
         * The current nominal crosstrack error. Negative values indicate deviation to the left, as viewed when facing in the
         * direction of the track. Positive values indicate deviation to the right.
         */
        LNavDataVars["XTK"] = "L:WT_LNavData_XTK";
        /** The current CDI scale. */
        LNavDataVars["CDIScale"] = "L:WT_LNavData_CDI_Scale";
        /** The nominal bearing to the next waypoint currently tracked by LNAV, in degrees true. */
        LNavDataVars["WaypointBearingTrue"] = "L:WT_LNavData_Waypoint_Bearing_True";
        /** The nominal bearing to the next waypoint currently tracked by LNAV, in degrees magnetic. */
        LNavDataVars["WaypointBearingMagnetic"] = "L:WT_LNavData_Waypoint_Bearing_Mag";
        /** The nominal distance remaining to the next waypoint currently tracked by LNAV. */
        LNavDataVars["WaypointDistance"] = "L:WT_LNavData_Waypoint_Distance";
        /** The nominal distance remaining to the destination. */
        LNavDataVars["DestinationDistance"] = "L:WT_LNavData_Destination_Distance";
    })(LNavDataVars || (LNavDataVars = {}));
    new Map([
        ['lnavdata_dtk_true', { name: LNavDataVars.DTKTrue, type: SimVarValueType.Degree }],
        ['lnavdata_dtk_mag', { name: LNavDataVars.DTKMagnetic, type: SimVarValueType.Degree }],
        ['lnavdata_xtk', { name: LNavDataVars.XTK, type: SimVarValueType.NM }],
        ['lnavdata_cdi_scale', { name: LNavDataVars.CDIScale, type: SimVarValueType.NM }],
        ['lnavdata_waypoint_bearing_true', { name: LNavDataVars.WaypointBearingTrue, type: SimVarValueType.Degree }],
        ['lnavdata_waypoint_bearing_mag', { name: LNavDataVars.WaypointBearingMagnetic, type: SimVarValueType.Degree }],
        ['lnavdata_waypoint_distance', { name: LNavDataVars.WaypointDistance, type: SimVarValueType.NM }],
        ['lnavdata_destination_distance', { name: LNavDataVars.DestinationDistance, type: SimVarValueType.NM }]
    ]);

    /** AP Mode Types */
    var APModeType;
    (function (APModeType) {
        APModeType[APModeType["LATERAL"] = 0] = "LATERAL";
        APModeType[APModeType["VERTICAL"] = 1] = "VERTICAL";
        APModeType[APModeType["APPROACH"] = 2] = "APPROACH";
    })(APModeType || (APModeType = {}));

    /// <reference types="msfstypes/Pages/VCockpit/Instruments/Shared/utils/XMLLogic" />
    /** The acceptable priority types for a given annunciation. */
    var AnnunciationType;
    (function (AnnunciationType) {
        AnnunciationType[AnnunciationType["Warning"] = 0] = "Warning";
        AnnunciationType[AnnunciationType["Caution"] = 1] = "Caution";
        AnnunciationType[AnnunciationType["Advisory"] = 2] = "Advisory";
        AnnunciationType[AnnunciationType["SafeOp"] = 3] = "SafeOp";
    })(AnnunciationType || (AnnunciationType = {}));

    /* eslint-disable no-inner-declarations */
    /** A releative render position. */
    var RenderPosition;
    (function (RenderPosition) {
        RenderPosition[RenderPosition["Before"] = 0] = "Before";
        RenderPosition[RenderPosition["After"] = 1] = "After";
        RenderPosition[RenderPosition["In"] = 2] = "In";
    })(RenderPosition || (RenderPosition = {}));
    /**
     * A display component in the component framework.
     * @typedef P The type of properties for this component.
     * @typedef C The type of context that this component might have.
     */
    class DisplayComponent {
        /**
         * Creates an instance of a DisplayComponent.
         * @param props The propertis of the component.
         */
        constructor(props) {
            /** The context on this component, if any. */
            this.context = undefined;
            /** The type of context for this component, if any. */
            this.contextType = undefined;
            this.props = props;
        }
        /**
         * A callback that is called before the component is rendered.
         */
        onBeforeRender() { return; }
        /**
         * A callback that is called after the component is rendered.
         * @param node The component's VNode.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onAfterRender(node) { return; }
        /**
         * Destroys this component.
         */
        destroy() { return; }
        /**
         * Gets a context data subscription from the context collection.
         * @param context The context to get the subscription for.
         * @returns The requested context.
         * @throws An error if no data for the specified context type could be found.
         */
        getContext(context) {
            if (this.context !== undefined && this.contextType !== undefined) {
                const index = this.contextType.indexOf(context);
                return this.context[index];
            }
            throw new Error('Could not find the provided context type.');
        }
    }
    /**
     * A reference to a component or element node.
     */
    class NodeReference {
        constructor() {
            /** The internal reference instance. */
            this._instance = null;
        }
        /**
         * The instance of the element or component.
         * @returns The instance of the element or component.
         */
        get instance() {
            if (this._instance !== null) {
                return this._instance;
            }
            throw new Error('Instance was null.');
        }
        /**
         * Sets the value of the instance.
         */
        set instance(val) {
            this._instance = val;
        }
        /**
         * Gets the instance, or null if the instance is not populated.
         * @returns The component or element instance.
         */
        getOrDefault() {
            return this._instance;
        }
    }
    /**
     * Provides a context of data that can be passed down to child components via a provider.
     */
    class Context {
        /**
         * Creates an instance of a Context.
         * @param defaultValue The default value of this context.
         */
        constructor(defaultValue) {
            this.defaultValue = defaultValue;
            /**
             * The provider component that can be set to a specific context value.
             * @param props The props of the provider component.
             * @returns A new context provider.
             */
            this.Provider = (props) => new ContextProvider(props, this);
        }
    }
    /**
     * A provider component that can be set to a specific context value.
     */
    class ContextProvider extends DisplayComponent {
        /**
         * Creates an instance of a ContextProvider.
         * @param props The props on the component.
         * @param parent The parent context instance for this provider.
         */
        constructor(props, parent) {
            super(props);
            this.parent = parent;
        }
        /** @inheritdoc */
        render() {
            var _a;
            const children = (_a = this.props.children) !== null && _a !== void 0 ? _a : [];
            return FSComponent.buildComponent(FSComponent.Fragment, this.props, ...children);
        }
    }
    /**
     * The FS component namespace.
     */
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var FSComponent;
    (function (FSComponent) {
        /**
         * Valid SVG element tags.
         */
        const svgTags = {
            'circle': true,
            'clipPath': true,
            'color-profile': true,
            'cursor': true,
            'defs': true,
            'desc': true,
            'ellipse': true,
            'g': true,
            'image': true,
            'line': true,
            'linearGradient': true,
            'marker': true,
            'mask': true,
            'path': true,
            'pattern': true,
            'polygon': true,
            'polyline': true,
            'radialGradient': true,
            'rect': true,
            'stop': true,
            'svg': true,
            'text': true
        };
        /**
         * A fragment of existing elements with no specific root.
         * @param props The fragment properties.
         * @returns The fragment children.
         */
        function Fragment(props) {
            return props.children;
        }
        FSComponent.Fragment = Fragment;
        /**
         * Builds a JSX based FSComponent.
         * @param type The DOM element tag that will be built.
         * @param props The properties to apply to the DOM element.
         * @param children Any children of this DOM element.
         * @returns The JSX VNode for the component or element.
         */
        // eslint-disable-next-line no-inner-declarations
        function buildComponent(type, props, ...children) {
            let vnode = null;
            if (typeof type === 'string') {
                let element;
                if (svgTags[type] !== undefined) {
                    element = document.createElementNS('http://www.w3.org/2000/svg', type);
                }
                else {
                    element = document.createElement(type);
                }
                if (props !== null) {
                    for (const key in props) {
                        if (key === 'ref' && props.ref !== undefined) {
                            props.ref.instance = element;
                        }
                        else {
                            const prop = props[key];
                            if (key === 'class' && typeof prop === 'object' && 'isSubscribableSet' in prop) {
                                // Bind CSS classes to a subscribable set
                                prop.sub((set, eventType, modifiedKey) => {
                                    if (eventType === SubscribableSetEventType.Added) {
                                        element.classList.add(modifiedKey);
                                    }
                                    else {
                                        element.classList.remove(modifiedKey);
                                    }
                                }, true);
                            }
                            else if (typeof prop === 'object' && 'isSubscribable' in prop) {
                                if (key === 'style' && prop instanceof ObjectSubject) {
                                    // Bind CSS styles to an object subject.
                                    prop.sub((v, style, newValue) => {
                                        element.style.setProperty(style.toString(), newValue);
                                    }, true);
                                }
                                else {
                                    // Bind an attribute to a subscribable.
                                    prop.sub((v) => {
                                        element.setAttribute(key, v);
                                    }, true);
                                }
                            }
                            else {
                                element.setAttribute(key, prop);
                            }
                        }
                    }
                }
                vnode = {
                    instance: element,
                    props: props,
                    children: null
                };
                vnode.children = createChildNodes(vnode, children);
            }
            else if (typeof type === 'function') {
                if (children !== null && props === null) {
                    props = {
                        children: children
                    };
                }
                else if (props !== null) {
                    props.children = children;
                }
                if (typeof type === 'function' && type.name === 'Fragment') {
                    let childNodes = type(props);
                    //Handle the case where the single fragment children is an array of nodes passsed down from above
                    while (childNodes !== null && childNodes.length > 0 && Array.isArray(childNodes[0])) {
                        childNodes = childNodes[0];
                    }
                    vnode = {
                        instance: null,
                        props,
                        children: childNodes
                    };
                }
                else {
                    let instance;
                    const pluginSystem = (window._pluginSystem);
                    try {
                        instance = type(props);
                    }
                    catch (_a) {
                        let pluginInstance = undefined;
                        if (pluginSystem !== undefined) {
                            pluginInstance = pluginSystem.onComponentCreating(type, props);
                        }
                        if (pluginInstance !== undefined) {
                            instance = pluginInstance;
                        }
                        else {
                            instance = new type(props);
                        }
                    }
                    if (props !== null && props.ref !== null && props.ref !== undefined) {
                        props.ref.instance = instance;
                    }
                    if (instance.contextType !== undefined) {
                        instance.context = instance.contextType.map(c => Subject.create(c.defaultValue));
                    }
                    if (pluginSystem !== undefined) {
                        pluginSystem.onComponentCreated(instance);
                    }
                    vnode = {
                        instance,
                        props,
                        children: [instance.render()]
                    };
                }
            }
            return vnode;
        }
        FSComponent.buildComponent = buildComponent;
        /**
         * Creates the collection of child VNodes.
         * @param parent The parent VNode.
         * @param children The JSX children to convert to nodes.
         * @returns A collection of child VNodes.
         */
        function createChildNodes(parent, children) {
            let vnodes = null;
            if (children !== null && children !== undefined && children.length > 0) {
                vnodes = [];
                for (const child of children) {
                    if (child !== null) {
                        if (child instanceof Array) {
                            const arrayNodes = createChildNodes(parent, child);
                            if (arrayNodes !== null) {
                                vnodes.push(...arrayNodes);
                            }
                        }
                        else if (typeof child === 'object') {
                            if ('isSubscribable' in child) {
                                const node = {
                                    instance: child,
                                    children: null,
                                    props: null,
                                    root: undefined,
                                };
                                child.sub((v) => {
                                    if (node.root !== undefined) {
                                        // TODO workaround. gotta find a solution for the text node vanishing when text is empty
                                        node.root.nodeValue = (v === '' || v === null || v === undefined)
                                            ? ' '
                                            : v.toString();
                                    }
                                });
                                vnodes.push(node);
                            }
                            else {
                                vnodes.push(child);
                            }
                        }
                        else if (typeof child === 'string' || typeof child === 'number') {
                            vnodes.push(createStaticContentNode(child));
                        }
                    }
                }
            }
            return vnodes;
        }
        FSComponent.createChildNodes = createChildNodes;
        /**
         * Creates a static content VNode.
         * @param content The content to create a node for.
         * @returns A static content VNode.
         */
        function createStaticContentNode(content) {
            return {
                instance: content,
                children: null,
                props: null
            };
        }
        FSComponent.createStaticContentNode = createStaticContentNode;
        /**
         * Renders a VNode to a DOM element.
         * @param node The node to render.
         * @param element The DOM element to render to.
         * @param position The RenderPosition to put the item in.
         */
        function render(node, element, position = RenderPosition.In) {
            if (node.children && node.children.length > 0 && element !== null) {
                const componentInstance = node.instance;
                if (componentInstance !== null && componentInstance.onBeforeRender !== undefined) {
                    componentInstance.onBeforeRender();
                }
                if (node.instance instanceof HTMLElement || node.instance instanceof SVGElement) {
                    insertNode(node, position, element);
                }
                else {
                    if (position === RenderPosition.After) {
                        for (let i = node.children.length - 1; i >= 0; i--) {
                            if (node.children[i] === undefined || node.children[i] === null) {
                                continue;
                            }
                            insertNode(node.children[i], position, element);
                        }
                    }
                    else {
                        for (let i = 0; i < node.children.length; i++) {
                            if (node.children[i] === undefined || node.children[i] === null) {
                                continue;
                            }
                            insertNode(node.children[i], position, element);
                        }
                    }
                }
                const instance = node.instance;
                if (instance instanceof ContextProvider) {
                    visitNodes(node, (n) => {
                        if (n === undefined || n === null) {
                            return false;
                        }
                        const nodeInstance = n.instance;
                        if (nodeInstance !== null && nodeInstance.contextType !== undefined) {
                            const contextSlot = nodeInstance.contextType.indexOf(instance.parent);
                            if (contextSlot >= 0) {
                                if (nodeInstance.context === undefined) {
                                    nodeInstance.context = [];
                                }
                                nodeInstance.context[contextSlot].set(instance.props.value);
                            }
                            if (nodeInstance instanceof ContextProvider && nodeInstance !== instance && nodeInstance.parent === instance.parent) {
                                return true;
                            }
                        }
                        return false;
                    });
                }
                if (componentInstance !== null && componentInstance.onAfterRender !== undefined) {
                    const pluginSystem = (window._pluginSystem);
                    componentInstance.onAfterRender(node);
                    if (pluginSystem !== undefined) {
                        pluginSystem.onComponentRendered(node);
                    }
                }
            }
        }
        FSComponent.render = render;
        /**
         * Inserts a node into the DOM.
         * @param node The node to insert.
         * @param position The position to insert the node in.
         * @param element The element to insert relative to.
         */
        function insertNode(node, position, element) {
            var _a, _b, _c, _d, _e, _f;
            if (node.instance instanceof HTMLElement || node.instance instanceof SVGElement) {
                switch (position) {
                    case RenderPosition.In:
                        element.appendChild(node.instance);
                        node.root = (_a = element.lastChild) !== null && _a !== void 0 ? _a : undefined;
                        break;
                    case RenderPosition.Before:
                        element.insertAdjacentElement('beforebegin', node.instance);
                        node.root = (_b = element.previousSibling) !== null && _b !== void 0 ? _b : undefined;
                        break;
                    case RenderPosition.After:
                        element.insertAdjacentElement('afterend', node.instance);
                        node.root = (_c = element.nextSibling) !== null && _c !== void 0 ? _c : undefined;
                        break;
                }
                if (node.children !== null) {
                    for (const child of node.children) {
                        insertNode(child, RenderPosition.In, node.instance);
                    }
                }
            }
            else if (typeof node.instance === 'string'
                || (typeof node.instance === 'object'
                    && node.instance !== null &&
                    'isSubscribable' in node.instance)) {
                let toRender;
                if (typeof node.instance === 'string') {
                    toRender = node.instance;
                }
                else {
                    toRender = node.instance.get();
                    if (toRender === '') {
                        toRender = ' '; // prevent disappearing text node
                    }
                }
                switch (position) {
                    case RenderPosition.In:
                        element.insertAdjacentHTML('beforeend', toRender);
                        node.root = (_d = element.lastChild) !== null && _d !== void 0 ? _d : undefined;
                        break;
                    case RenderPosition.Before:
                        element.insertAdjacentHTML('beforebegin', toRender);
                        node.root = (_e = element.previousSibling) !== null && _e !== void 0 ? _e : undefined;
                        break;
                    case RenderPosition.After:
                        element.insertAdjacentHTML('afterend', toRender);
                        node.root = (_f = element.nextSibling) !== null && _f !== void 0 ? _f : undefined;
                        break;
                }
            }
            else if (Array.isArray(node)) {
                if (position === RenderPosition.After) {
                    for (let i = node.length - 1; i >= 0; i--) {
                        render(node[i], element, position);
                    }
                }
                else {
                    for (let i = 0; i < node.length; i++) {
                        render(node[i], element, position);
                    }
                }
            }
            else {
                render(node, element, position);
            }
        }
        /**
         * Render a node before a DOM element.
         * @param node The node to render.
         * @param element The element to render boeore.
         */
        function renderBefore(node, element) {
            render(node, element, RenderPosition.Before);
        }
        FSComponent.renderBefore = renderBefore;
        /**
         * Render a node after a DOM element.
         * @param node The node to render.
         * @param element The element to render after.
         */
        function renderAfter(node, element) {
            render(node, element, RenderPosition.After);
        }
        FSComponent.renderAfter = renderAfter;
        /**
         * Remove a previously rendered element.  Currently, this is just a simple
         * wrapper so that all of our high-level "component maniuplation" state is kept
         * in the FSComponent API, but it's not doing anything other than a simple
         * remove() on the element.   This can probably be enhanced.
         * @param element The element to remove.
         */
        function remove(element) {
            if (element !== null) {
                element.remove();
            }
        }
        FSComponent.remove = remove;
        /**
         * Creates a component or element node reference.
         * @returns A new component or element node reference.
         */
        function createRef() {
            return new NodeReference();
        }
        FSComponent.createRef = createRef;
        /**
         * Creates a new context to hold data for passing to child components.
         * @param defaultValue The default value of this context.
         * @returns A new context.
         */
        function createContext(defaultValue) {
            return new Context(defaultValue);
        }
        FSComponent.createContext = createContext;
        /**
         * Visits VNodes with a supplied visitor function within the given children tree.
         * @param node The node to visit.
         * @param visitor The visitor function to inspect VNodes with. Return true if the search should stop at the visited
         * node and not proceed any further down the node's children.
         * @returns True if the visitation should break, or false otherwise.
         */
        function visitNodes(node, visitor) {
            const stopVisitation = visitor(node);
            if (node !== undefined && node !== null && !stopVisitation && node.children !== undefined && node.children !== null) {
                for (let i = 0; i < node.children.length; i++) {
                    visitNodes(node.children[i], visitor);
                }
            }
            return true;
        }
        FSComponent.visitNodes = visitNodes;
        /**
         * Parses a space-delimited CSS class string into an array of CSS classes.
         * @param classString A space-delimited CSS class string.
         * @returns An array of CSS classes derived from the specified CSS class string.
         */
        function parseCssClassesFromString(classString) {
            return classString.split(' ').filter(str => str !== '');
        }
        FSComponent.parseCssClassesFromString = parseCssClassesFromString;
        /**
         * Binds a {@link MutableSubscribableSet} to a subscribable set of CSS classes. CSS classes added to and removed from
         * the subscribed set will also be added to and removed from the bound set, with the exception of a set of reserved
         * classes. The presence or absence of any of the reserved classes in the bound set is not affected by the subscribed
         * set; these reserved classes may be freely added to and removed from the bound set.
         * @param setToBind The set to bind.
         * @param classesToSubscribe A set of CSS classes to which to subscribe.
         * @param reservedClasses An iterable of reserved classes.
         * @returns The newly created subscription to the subscribed CSS class set.
         */
        function bindCssClassSet(setToBind, classesToSubscribe, reservedClasses) {
            const reservedClassSet = new Set(reservedClasses);
            if (reservedClassSet.size === 0) {
                return classesToSubscribe.sub((set, type, key) => {
                    if (type === SubscribableSetEventType.Added) {
                        setToBind.add(key);
                    }
                    else {
                        setToBind.delete(key);
                    }
                }, true);
            }
            else {
                return classesToSubscribe.sub((set, type, key) => {
                    if (reservedClassSet.has(key)) {
                        return;
                    }
                    if (type === SubscribableSetEventType.Added) {
                        setToBind.add(key);
                    }
                    else {
                        setToBind.delete(key);
                    }
                }, true);
            }
        }
        FSComponent.bindCssClassSet = bindCssClassSet;
        /**
         * An empty callback handler.
         */
        FSComponent.EmptyHandler = () => { return; };
    })(FSComponent || (FSComponent = {}));
    FSComponent.Fragment;

    /// <reference types="msfstypes/JS/common" />
    /**
     * A FSComponent that displays the MSFS Bing Map, weather radar, and 3D terrain.
     */
    class BingComponent extends DisplayComponent {
        constructor() {
            super(...arguments);
            this.modeFlags = this.props.mode === EBingMode.HORIZON ? 4 : 0;
            this.isListenerRegistered = false;
            this.imgRef = FSComponent.createRef();
            this.uid = 0;
            this._isBound = false;
            this._isAwake = true;
            this.isDestroyed = false;
            this.pos = null;
            this.radius = 0;
            this.resolution = Vec2Subject.createFromVector(new Float64Array([BingComponent.DEFAULT_RESOLUTION, BingComponent.DEFAULT_RESOLUTION]));
            this.earthColors = ArraySubject.create(BingComponent.createEarthColorsArray('#000000', [{ elev: 0, color: '#000000' }, { elev: 60000, color: '#000000' }]));
            this.skyColor = Subject.create(BingComponent.hexaToRGBColor('#000000'));
            this.reference = Subject.create(EBingReference.SEA);
            this.wxrMode = Subject.create({ mode: EWeatherRadar.OFF, arcRadians: 0.5 }, (cur, prev) => cur.mode === prev.mode && cur.arcRadians === prev.arcRadians, (ref, val) => Object.assign(ref, val));
            this.isoLines = Subject.create(false);
            this.resolutionPropHandler = (resolution) => {
                this.resolution.set(resolution);
            };
            this.earthColorsPropHandler = (index, type, item, array) => {
                if (array.length !== 61) {
                    return;
                }
                this.earthColors.set(array);
            };
            this.skyColorPropHandler = (color) => {
                this.skyColor.set(color);
            };
            this.referencePropHandler = (reference) => {
                this.reference.set(reference);
            };
            this.wxrModePropHandler = (wxrMode) => {
                this.wxrMode.set(wxrMode);
            };
            this.isoLinesPropHandler = (showIsolines) => {
                this.isoLines.set(showIsolines);
            };
            this.resolutionHandler = (resolution) => {
                Coherent.call('SET_MAP_RESOLUTION', this.uid, resolution[0], resolution[1]);
            };
            this.earthColorsHandler = (index, type, item, array) => {
                if (type !== SubscribableArrayEventType.Cleared) {
                    if (array.length !== 61) {
                        throw new Error(`Incorrect number of colors provided: was ${array.length} but should be 61`);
                    }
                    Coherent.call('SET_MAP_HEIGHT_COLORS', this.uid, array);
                }
            };
            this.skyColorHandler = (color) => {
                Coherent.call('SET_MAP_CLEAR_COLOR', this.uid, color);
            };
            this.referenceHandler = (reference) => {
                const flags = this.modeFlags | (reference === EBingReference.PLANE ? 1 : 0);
                this.mapListener.trigger('JS_BIND_BINGMAP', this.props.id, flags);
            };
            this.wxrModeHandler = (wxrMode) => {
                Coherent.call('SHOW_MAP_WEATHER', this.uid, wxrMode.mode, wxrMode.arcRadians);
            };
            this.isoLinesHandler = (showIsolines) => {
                Coherent.call('SHOW_MAP_ISOLINES', this.uid, showIsolines);
            };
            /**
             * A callback called when the listener is fully bound.
             * @param binder The binder from the listener.
             * @param uid The unique ID of the bound map.
             */
            this.onListenerBound = (binder, uid) => {
                if (this.isDestroyed) {
                    return;
                }
                if (binder.friendlyName === this.props.id) {
                    // console.log('Bing map listener bound.');
                    this.binder = binder;
                    this.uid = uid;
                    if (this._isBound) {
                        return;
                    }
                    this._isBound = true;
                    Coherent.call('SHOW_MAP', uid, true);
                    const pause = !this._isAwake;
                    this.earthColorsSub = this.earthColors.sub(this.earthColorsHandler, true, pause);
                    this.skyColorSub = this.skyColor.sub(this.skyColorHandler, true, pause);
                    this.referenceSub = this.reference.sub(this.referenceHandler, true, pause);
                    this.wxrModeSub = this.wxrMode.sub(this.wxrModeHandler, true, pause);
                    this.resolutionSub = this.resolution.sub(this.resolutionHandler, true, pause);
                    this.isoLinesSub = this.isoLines.sub(this.isoLinesHandler, true, pause);
                    if (this._isAwake && this.pos !== null) {
                        Coherent.call('SET_MAP_PARAMS', this.uid, this.pos, this.radius, 1);
                    }
                    this.props.onBoundCallback && this.props.onBoundCallback(this);
                }
            };
            /**
             * A callback called when the map image is updated.
             * @param uid The unique ID of the bound map.
             * @param imgSrc The img tag src attribute to assign to the bing map image.
             */
            this.onMapUpdate = (uid, imgSrc) => {
                if (this.binder !== undefined && this.uid === uid && this.imgRef.instance !== null) {
                    if (this.imgRef.instance.src !== imgSrc) {
                        this.imgRef.instance.src = imgSrc;
                    }
                }
            };
        }
        /**
         * Checks whether this Bing component has been bound.
         * @returns whether this Bing component has been bound.
         */
        isBound() {
            return this._isBound;
        }
        /**
         * Checks whether this Bing component is awake.
         * @returns whether this Bing component is awake.
         */
        isAwake() {
            return this._isAwake;
        }
        /** @inheritdoc */
        onAfterRender() {
            var _a, _b, _c, _d, _e, _f;
            if (window['IsDestroying']) {
                this.destroy();
                return;
            }
            this.resolutionPropSub = (_a = this.props.resolution) === null || _a === void 0 ? void 0 : _a.sub(this.resolutionPropHandler, true);
            this.earthColorsPropSub = (_b = this.props.earthColors) === null || _b === void 0 ? void 0 : _b.sub(this.earthColorsPropHandler, true);
            this.skyColorPropSub = (_c = this.props.skyColor) === null || _c === void 0 ? void 0 : _c.sub(this.skyColorPropHandler, true);
            this.referencePropSub = (_d = this.props.reference) === null || _d === void 0 ? void 0 : _d.sub(this.referencePropHandler, true);
            this.wxrModePropSub = (_e = this.props.wxrMode) === null || _e === void 0 ? void 0 : _e.sub(this.wxrModePropHandler, true);
            this.isoLinesPropSub = (_f = this.props.isoLines) === null || _f === void 0 ? void 0 : _f.sub(this.isoLinesPropHandler, true);
            const gameStateSubscribable = GameStateProvider.get();
            const gameState = gameStateSubscribable.get();
            if (gameState === GameState.briefing || gameState === GameState.ingame) {
                this.registerListener();
            }
            else {
                this.gameStateSub = gameStateSubscribable.sub(state => {
                    var _a;
                    if (this.isDestroyed) {
                        return;
                    }
                    if (state === GameState.briefing || state === GameState.ingame) {
                        (_a = this.gameStateSub) === null || _a === void 0 ? void 0 : _a.destroy();
                        this.registerListener();
                    }
                });
            }
            window.addEventListener('OnDestroy', this.destroy.bind(this));
        }
        /**
         * Registers this component's Bing map listener.
         */
        registerListener() {
            var _a;
            if (((_a = this.props.delay) !== null && _a !== void 0 ? _a : 0) > 0) {
                setTimeout(() => {
                    if (this.isDestroyed) {
                        return;
                    }
                    this.mapListener = RegisterViewListener('JS_LISTENER_MAPS', this.onListenerRegistered.bind(this));
                }, this.props.delay);
            }
            else {
                this.mapListener = RegisterViewListener('JS_LISTENER_MAPS', this.onListenerRegistered.bind(this));
            }
        }
        /**
         * A callback called when this component's Bing map listener is registered.
         */
        onListenerRegistered() {
            if (this.isDestroyed || this.isListenerRegistered) {
                return;
            }
            this.mapListener.on('MapBinded', this.onListenerBound);
            this.mapListener.on('MapUpdated', this.onMapUpdate);
            this.isListenerRegistered = true;
            this.mapListener.trigger('JS_BIND_BINGMAP', this.props.id, this.modeFlags);
        }
        /**
         * Wakes this Bing component. Upon awakening, this component will synchronize its state from when it was put to sleep
         * to the Bing instance to which it is bound.
         */
        wake() {
            var _a, _b, _c, _d, _e, _f;
            this._isAwake = true;
            if (!this._isBound) {
                return;
            }
            Coherent.call('SET_MAP_PARAMS', this.uid, this.pos, this.radius, 1);
            (_a = this.earthColorsSub) === null || _a === void 0 ? void 0 : _a.resume(true);
            (_b = this.skyColorSub) === null || _b === void 0 ? void 0 : _b.resume(true);
            (_c = this.referenceSub) === null || _c === void 0 ? void 0 : _c.resume(true);
            (_d = this.wxrModeSub) === null || _d === void 0 ? void 0 : _d.resume(true);
            (_e = this.resolutionSub) === null || _e === void 0 ? void 0 : _e.resume(true);
            (_f = this.isoLinesSub) === null || _f === void 0 ? void 0 : _f.resume(true);
        }
        /**
         * Puts this Bing component to sleep. While asleep, this component cannot make changes to the Bing instance to which
         * it is bound.
         */
        sleep() {
            var _a, _b, _c, _d, _e, _f;
            this._isAwake = false;
            if (!this._isBound) {
                return;
            }
            (_a = this.earthColorsSub) === null || _a === void 0 ? void 0 : _a.pause();
            (_b = this.skyColorSub) === null || _b === void 0 ? void 0 : _b.pause();
            (_c = this.referenceSub) === null || _c === void 0 ? void 0 : _c.pause();
            (_d = this.wxrModeSub) === null || _d === void 0 ? void 0 : _d.pause();
            (_e = this.resolutionSub) === null || _e === void 0 ? void 0 : _e.pause();
            (_f = this.isoLinesSub) === null || _f === void 0 ? void 0 : _f.pause();
        }
        /**
         * Sets the center position and radius.
         * @param pos The center position.
         * @param radius The radius, in meters.
         */
        setPositionRadius(pos, radius) {
            this.pos = pos;
            this.radius = radius;
            if (this._isBound && this._isAwake) {
                Coherent.call('SET_MAP_PARAMS', this.uid, pos, radius, 1);
            }
        }
        /** @inheritdoc */
        render() {
            var _a;
            return (FSComponent.buildComponent("img", { ref: this.imgRef, src: '', style: 'position: absolute; left: 0; top: 0; width: 100%; height: 100%;', class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '' }));
        }
        /** @inheritdoc */
        destroy() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            this.isDestroyed = true;
            this._isBound = false;
            (_a = this.gameStateSub) === null || _a === void 0 ? void 0 : _a.destroy();
            (_b = this.resolutionPropSub) === null || _b === void 0 ? void 0 : _b.destroy();
            (_c = this.earthColorsPropSub) === null || _c === void 0 ? void 0 : _c.destroy();
            (_d = this.skyColorPropSub) === null || _d === void 0 ? void 0 : _d.destroy();
            (_e = this.referencePropSub) === null || _e === void 0 ? void 0 : _e.destroy();
            (_f = this.wxrModePropSub) === null || _f === void 0 ? void 0 : _f.destroy();
            (_g = this.isoLinesPropSub) === null || _g === void 0 ? void 0 : _g.destroy();
            (_h = this.mapListener) === null || _h === void 0 ? void 0 : _h.off('MapBinded', this.onListenerBound);
            (_j = this.mapListener) === null || _j === void 0 ? void 0 : _j.off('MapUpdated', this.onMapUpdate);
            (_k = this.mapListener) === null || _k === void 0 ? void 0 : _k.trigger('JS_UNBIND_BINGMAP', this.props.id);
            this.isListenerRegistered = false;
            this.imgRef.instance.src = '';
            (_l = this.imgRef.instance.parentNode) === null || _l === void 0 ? void 0 : _l.removeChild(this.imgRef.instance);
        }
        /**
         * Resets the img element's src attribute.
         */
        resetImgSrc() {
            const imgRef = this.imgRef.getOrDefault();
            if (imgRef !== null) {
                const currentSrc = imgRef.src;
                imgRef.src = '';
                imgRef.src = currentSrc;
            }
        }
        /**
         * Converts an HTML hex color string to a numerical map RGB value.
         * @param hexColor The hex color string to convert.
         * @returns A numerical map RGB value.
         */
        static hexaToRGBColor(hexColor) {
            const hexStringColor = hexColor;
            let offset = 0;
            if (hexStringColor[0] === '#') {
                offset = 1;
            }
            const r = parseInt(hexStringColor.substr(0 + offset, 2), 16);
            const g = parseInt(hexStringColor.substr(2 + offset, 2), 16);
            const b = parseInt(hexStringColor.substr(4 + offset, 2), 16);
            const rgb = 256 * 256 * b + 256 * g + r;
            return rgb;
        }
        /**
         * Converts RGB color components to a numerical map RGB value.
         * @param r The red component, from 0 to 255.
         * @param g The green component, from 0 to 255.
         * @param b The blue component, from 0 to 255.
         * @returns A numerical map RGB value.
         */
        static rgbColor(r, g, b) {
            const rgb = 256 * 256 * b + 256 * g + r;
            return rgb;
        }
        /**
         * Creates a full Bing component earth colors array. The earth colors array will contain the specified water color
         * and terrain colors (including interpolated values between the explicitly defined ones, as necessary).
         * @param waterColor The desired water color, as a hex string with the format `#hhhhhh`.
         * @param terrainColors An array of desired terrain colors at specific elevations. Elevations should be specified in
         * feet and colors as hex strings with the format `#hhhhhh`.
         * @returns a full Bing component earth colors array.
         */
        // eslint-disable-next-line jsdoc/require-jsdoc
        static createEarthColorsArray(waterColor, terrainColors) {
            const earthColors = [BingComponent.hexaToRGBColor(waterColor)];
            const curve = new Avionics.Curve();
            curve.interpolationFunction = Avionics.CurveTool.StringColorRGBInterpolation;
            for (let i = 0; i < terrainColors.length; i++) {
                curve.add(terrainColors[i].elev, terrainColors[i].color);
            }
            for (let i = 0; i < 60; i++) {
                const color = curve.evaluate(i * 30000 / 60);
                earthColors[i + 1] = BingComponent.hexaToRGBColor(color);
            }
            return earthColors;
        }
    }
    BingComponent.DEFAULT_RESOLUTION = 1024;

    var DurationDisplayFormat;
    (function (DurationDisplayFormat) {
        /** hh:mm:ss. */
        DurationDisplayFormat[DurationDisplayFormat["hh_mm_ss"] = 0] = "hh_mm_ss";
        /** hh:mm. */
        DurationDisplayFormat[DurationDisplayFormat["hh_mm"] = 1] = "hh_mm";
        /** mm:ss. */
        DurationDisplayFormat[DurationDisplayFormat["mm_ss"] = 2] = "mm_ss";
        /** hh:mm if value is greater or equal to 1 hour, otherwise mm:ss. */
        DurationDisplayFormat[DurationDisplayFormat["hh_mm_or_mm_ss"] = 3] = "hh_mm_or_mm_ss";
    })(DurationDisplayFormat || (DurationDisplayFormat = {}));
    var DurationDisplayDelim;
    (function (DurationDisplayDelim) {
        /** Colon (`:`). */
        DurationDisplayDelim[DurationDisplayDelim["Colon"] = 0] = "Colon";
        /** `:` if hh:mm:ss or mm:ss, `+` if hh:mm. */
        DurationDisplayDelim[DurationDisplayDelim["ColonOrCross"] = 1] = "ColonOrCross";
        /** Space (` `). */
        DurationDisplayDelim[DurationDisplayDelim["Space"] = 2] = "Space";
    })(DurationDisplayDelim || (DurationDisplayDelim = {}));
    /**
     * A component which displays duration values.
     */
    class DurationDisplay extends DisplayComponent {
        /** @inheritdoc */
        constructor(props) {
            super(props);
            this.value = ('isSubscribable' in this.props.value)
                ? this.props.value
                : Subject.create(this.props.value);
            this.options = Object.assign({}, DurationDisplay.DEFAULT_OPTIONS, this.props.options);
            this.text = Subject.create('');
            switch (this.options.delim) {
                case DurationDisplayDelim.Colon:
                    this.delim = ':';
                    break;
                case DurationDisplayDelim.Space:
                    this.delim = ' ';
                    break;
                default:
                    this.delim = '';
            }
        }
        /** @inheritdoc */
        onAfterRender() {
            this.valueSub = this.value.sub(this.onValueChanged.bind(this), true);
        }
        /**
         * A callback which is called when this component's bound value changes.
         * @param value The new value.
         */
        onValueChanged(value) {
            this.setDisplay(value);
        }
        /**
         * Displays this component's current value.
         * @param value The current value.
         */
        setDisplay(value) {
            let text;
            if (value.isNaN()) {
                text = this.options.nanString;
            }
            else {
                let hrText = '';
                let minText = '';
                let secText = '';
                let hrUnitText = '';
                let minUnitText = '';
                let secUnitText = '';
                let hrDelim = '';
                let minDelim = '';
                const hours = Math.floor(value.asUnit(UnitType.HOUR));
                if (this.options.format != DurationDisplayFormat.mm_ss && !(this.options.format === DurationDisplayFormat.hh_mm_or_mm_ss && hours == 0)) {
                    hrText = hours.toFixed(0);
                    if (this.options.delim === DurationDisplayDelim.ColonOrCross) {
                        if (this.options.format === DurationDisplayFormat.hh_mm_or_mm_ss || this.options.format === DurationDisplayFormat.hh_mm) {
                            hrDelim = '+';
                        }
                        else {
                            hrDelim = ':';
                        }
                    }
                    else {
                        hrDelim = this.delim;
                    }
                }
                let minutes;
                let seconds;
                if (this.options.format === DurationDisplayFormat.hh_mm || (this.options.format === DurationDisplayFormat.hh_mm_or_mm_ss && hours !== 0)) {
                    minutes = value.asUnit(UnitType.MINUTE) % 60;
                    minText = this.options.numberFormatter(minutes);
                }
                else {
                    minutes = Math.floor(value.asUnit(UnitType.MINUTE) - hours * 60);
                    minText = minutes.toFixed(0);
                    minDelim = this.options.delim === DurationDisplayDelim.ColonOrCross ? ':' : this.delim;
                    seconds = value.asUnit(UnitType.SECOND) % 60;
                    secText = this.options.numberFormatter(seconds);
                }
                if (secText && secText.replace(/\b0+/, '').substring(0, 2) === '60') {
                    secText = this.options.numberFormatter(parseFloat(secText) - 60);
                    minText = `${minutes + 1}`;
                }
                if (minText && minText.replace(/\b0+/, '').substring(0, 2) === '60' && hrText) {
                    if (secText) {
                        minText = '00';
                    }
                    else {
                        minText = this.options.numberFormatter(parseFloat(minText) - 60);
                    }
                    hrText = `${(hours + 1)}`;
                }
                // pad parts with leading zeroes
                if (hrText) {
                    hrText = hrText.padStart(this.options.pad, '0');
                    if (secText) {
                        minText = minText.padStart(2, '0');
                        secText = DurationDisplay.padIntegerPart(secText.replace(/^0+/, ''), 2, '0');
                    }
                    else {
                        minText = DurationDisplay.padIntegerPart(minText.replace(/^0+/, ''), 2, '0');
                    }
                }
                else {
                    minText = minText.padStart(this.options.pad, '0');
                    secText = DurationDisplay.padIntegerPart(secText.replace(/^0+/, ''), 2, '0');
                }
                // format units
                if (this.options.showUnits) {
                    hrText && (hrUnitText = this.options.unitFormatter(parseFloat(hrText), UnitType.HOUR));
                    minUnitText = this.options.unitFormatter(parseFloat(minText), UnitType.MINUTE);
                    secText && (secUnitText = this.options.unitFormatter(parseFloat(secText), UnitType.SECOND));
                }
                text = `${hrText}${hrUnitText}${hrDelim}${minText}${minUnitText}${minDelim}${secText}${secUnitText}`;
            }
            this.text.set(text);
        }
        /**
         * Pads the integer part of a string which represents a number.
         * @param str A string which represents a number.
         * @param maxLength The length to which the integer part of the string will be padded.
         * @param fillString The string with which to pad the original string.
         * @returns a new string which is the result of padding the original string.
         */
        static padIntegerPart(str, maxLength, fillString) {
            const decimalIndex = str.indexOf('.');
            return str.padStart(decimalIndex < 0 ? maxLength : str.length - decimalIndex + maxLength, fillString);
        }
        /** @inheritdoc */
        render() {
            var _a;
            return (FSComponent.buildComponent("div", { class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '', style: 'white-space: nowrap;' }, this.text));
        }
        /** @inheritdoc */
        destroy() {
            var _a;
            (_a = this.valueSub) === null || _a === void 0 ? void 0 : _a.destroy();
        }
    }
    /** Default formatting options. */
    DurationDisplay.DEFAULT_OPTIONS = {
        pad: 0,
        format: DurationDisplayFormat.hh_mm_ss,
        delim: DurationDisplayDelim.Colon,
        showUnits: false,
        numberFormatter: (value) => value.toFixed(0),
        unitFormatter: (value, unit) => unit.name[0],
        nanString: ''
    };

    var DmsDirection;
    (function (DmsDirection) {
        DmsDirection["NORTH"] = "N";
        DmsDirection["SOUTH"] = "S";
        DmsDirection["WEST"] = "W";
        DmsDirection["EAST"] = "E";
    })(DmsDirection || (DmsDirection = {}));

    /**
     * The item position to focus a component's children when performing a focus operation.
     */
    var FocusPosition;
    (function (FocusPosition) {
        /** The component's most recently focused descendants will be focused. */
        FocusPosition["MostRecent"] = "MostRecent";
        /** The first focus-able child at each node in the descendant tree will be focused. */
        FocusPosition["First"] = "First";
        /** The last focus-able child at each node in the descendant tree will be focused. */
        FocusPosition["Last"] = "Last";
        /** No child components will be focused. */
        FocusPosition["None"] = "None";
    })(FocusPosition || (FocusPosition = {}));
    /**
     * A strategy to focus a component's children as part of a blur reconciliation operation.
     */
    var BlurReconciliation;
    (function (BlurReconciliation) {
        /** The component's first focus-able child will be focused. */
        BlurReconciliation["First"] = "First";
        /** The component's last focus-able child will be focused. */
        BlurReconciliation["Last"] = "Last";
        /**
         * The component's next focus-able child after the child that was blurred will be focused. If no such child exists,
         * then the last focus-able child before the child that was blurred will be focused.
         */
        BlurReconciliation["Next"] = "Next";
        /**
         * The component's last focus-able child before the child that was blurred will be focused. If no such child exists,
         * then the next focus-able child after the child that was blurred will be focused.
         */
        BlurReconciliation["Prev"] = "Prev";
        /** No child components will be focused. */
        BlurReconciliation["None"] = "None";
    })(BlurReconciliation || (BlurReconciliation = {}));

    /**
     * The different types of horizon projection changes.
     */
    var HorizonProjectionChangeType;
    (function (HorizonProjectionChangeType) {
        HorizonProjectionChangeType[HorizonProjectionChangeType["Position"] = 1] = "Position";
        HorizonProjectionChangeType[HorizonProjectionChangeType["Altitude"] = 2] = "Altitude";
        HorizonProjectionChangeType[HorizonProjectionChangeType["Heading"] = 4] = "Heading";
        HorizonProjectionChangeType[HorizonProjectionChangeType["Pitch"] = 8] = "Pitch";
        HorizonProjectionChangeType[HorizonProjectionChangeType["Roll"] = 16] = "Roll";
        HorizonProjectionChangeType[HorizonProjectionChangeType["Offset"] = 32] = "Offset";
        HorizonProjectionChangeType[HorizonProjectionChangeType["ProjectedSize"] = 64] = "ProjectedSize";
        HorizonProjectionChangeType[HorizonProjectionChangeType["Fov"] = 128] = "Fov";
        HorizonProjectionChangeType[HorizonProjectionChangeType["FovEndpoints"] = 256] = "FovEndpoints";
        HorizonProjectionChangeType[HorizonProjectionChangeType["ScaleFactor"] = 512] = "ScaleFactor";
        HorizonProjectionChangeType[HorizonProjectionChangeType["ProjectedOffset"] = 1024] = "ProjectedOffset";
        HorizonProjectionChangeType[HorizonProjectionChangeType["OffsetCenterProjected"] = 2048] = "OffsetCenterProjected";
    })(HorizonProjectionChangeType || (HorizonProjectionChangeType = {}));
    [Vec2Math.create()];
    [Vec3Math.create()];
    [new GeoPoint(0, 0)];

    /**
     * A base component for map layers.
     */
    class MapLayer extends DisplayComponent {
        constructor() {
            super(...arguments);
            this._isVisible = true;
        }
        /**
         * Checks whether this layer is visible.
         * @returns whether this layer is visible.
         */
        isVisible() {
            return this._isVisible;
        }
        /**
         * Sets this layer's visibility.
         * @param val Whether this layer should be visible.
         */
        setVisible(val) {
            if (this._isVisible === val) {
                return;
            }
            this._isVisible = val;
            this.onVisibilityChanged(val);
        }
        /**
         * This method is called when this layer's visibility changes.
         * @param isVisible Whether the layer is now visible.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onVisibilityChanged(isVisible) {
            // noop
        }
        /**
         * This method is called when this layer is attached to its parent map component.
         */
        onAttached() {
            // noop
        }
        /**
         * This method is called when this layer's parent map is woken.
         */
        onWake() {
            // noop
        }
        /**
         * This method is called when this layer's parent map is put to sleep.
         */
        onSleep() {
            // noop
        }
        /**
         * This method is called when the map projection changes.
         * @param mapProjection - this layer's map projection.
         * @param changeFlags The types of changes made to the projection.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onMapProjectionChanged(mapProjection, changeFlags) {
            // noop
        }
        /**
         * This method is called once every map update cycle.
         * @param time The current time as a UNIX timestamp.
         * @param elapsed The elapsed time, in milliseconds, since the last update.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onUpdated(time, elapsed) {
            // noop
        }
        /**
         * This method is called when this layer is detached from its parent map component.
         */
        onDetached() {
            // noop
        }
    }

    /**
     * The different types of map projection changes.
     */
    var MapProjectionChangeType;
    (function (MapProjectionChangeType) {
        MapProjectionChangeType[MapProjectionChangeType["Target"] = 1] = "Target";
        MapProjectionChangeType[MapProjectionChangeType["Center"] = 2] = "Center";
        MapProjectionChangeType[MapProjectionChangeType["TargetProjected"] = 4] = "TargetProjected";
        MapProjectionChangeType[MapProjectionChangeType["Range"] = 8] = "Range";
        MapProjectionChangeType[MapProjectionChangeType["RangeEndpoints"] = 16] = "RangeEndpoints";
        MapProjectionChangeType[MapProjectionChangeType["ScaleFactor"] = 32] = "ScaleFactor";
        MapProjectionChangeType[MapProjectionChangeType["Rotation"] = 64] = "Rotation";
        MapProjectionChangeType[MapProjectionChangeType["ProjectedSize"] = 128] = "ProjectedSize";
        MapProjectionChangeType[MapProjectionChangeType["ProjectedResolution"] = 256] = "ProjectedResolution";
    })(MapProjectionChangeType || (MapProjectionChangeType = {}));
    new GeoPoint(0, 0);
    new GeoPoint(0, 0);

    /**
     * A path stream which does nothing on any input.
     */
    class NullPathStream {
        /**
         * Does nothing.
         */
        beginPath() {
            // noop
        }
        /**
         * Does nothing.
         */
        moveTo() {
            // noop
        }
        /**
         * Does nothing.
         */
        lineTo() {
            // noop
        }
        /**
         * Does nothing.
         */
        bezierCurveTo() {
            // noop
        }
        /**
         * Does nothing.
         */
        quadraticCurveTo() {
            // noop
        }
        /**
         * Does nothing.
         */
        arc() {
            // noop
        }
        /**
         * Does nothing.
         */
        closePath() {
            // noop
        }
    }
    /** An instance of a {@link NullPathStream}. */
    NullPathStream.INSTANCE = new NullPathStream();
    /**
     * An abstract implementation of a path stream which sends a transformed version of its input to be consumed by another
     * stream.
     */
    class AbstractTransformingPathStream {
        /**
         * Constructor.
         * @param consumer The path stream that consumes this stream's transformed output.
         */
        constructor(consumer) {
            this.consumer = consumer;
        }
        /** @inheritdoc */
        getConsumer() {
            return this.consumer;
        }
        /** @inheritdoc */
        setConsumer(consumer) {
            this.consumer = consumer;
        }
    }

    /**
     * Bitflags describing the relative location of a point with respect to a rectangular bounding box.
     */
    var Outcode;
    (function (Outcode) {
        Outcode[Outcode["Inside"] = 0] = "Inside";
        Outcode[Outcode["Left"] = 1] = "Left";
        Outcode[Outcode["Top"] = 2] = "Top";
        Outcode[Outcode["Right"] = 4] = "Right";
        Outcode[Outcode["Bottom"] = 8] = "Bottom";
    })(Outcode || (Outcode = {}));
    /**
     * A path stream which performs clipping to an axis-aligned rectangular bounding box before sending the clipped path
     * to another stream. Clipping is only supported for path segments added via the `lineTo()` and `arc()` methods. Path
     * segments added via `bezierCurveTo()` and `quadraticCurveTo()` will be passed to the consumer stream unclipped.
     */
    class ClippedPathStream extends AbstractTransformingPathStream {
        /**
         * Constructor.
         * @param consumer The path stream that consumes this stream's transformed output.
         * @param bounds A subscribable which provides the clipping bounds for this stream, as `[left, top, right, bottom]`.
         * Whenever the clipping bounds change, the state of this stream will be reset, as if `beginPath()` were called.
         */
        constructor(consumer, bounds) {
            super(consumer);
            this.bounds = bounds;
            this.boundsHandler = this.onBoundsChanged.bind(this);
            this.boundsLines = [
                new Float64Array(3),
                new Float64Array(3),
                new Float64Array(3),
                new Float64Array(3)
            ];
            this.isBoundingRectNonZero = false;
            this.firstPoint = new Float64Array([NaN, NaN]);
            this.prevPoint = new Float64Array([NaN, NaN]);
            this.prevPointOutcode = 0;
            bounds.sub(this.boundsHandler, true);
        }
        /** @inheritdoc */
        beginPath() {
            this.reset();
            this.consumer.beginPath();
        }
        /** @inheritdoc */
        moveTo(x, y) {
            if (!this.isBoundingRectNonZero) {
                return;
            }
            if (!(isFinite(x) && isFinite(y))) {
                return;
            }
            if (this.prevPoint[0] === x && this.prevPoint[1] === y) {
                return;
            }
            if (isNaN(this.firstPoint[0])) {
                Vec2Math.set(x, y, this.firstPoint);
            }
            Vec2Math.set(x, y, this.prevPoint);
            this.prevPointOutcode = this.getOutcode(x, y);
            if (this.prevPointOutcode === 0) {
                this.consumer.moveTo(x, y);
            }
        }
        /** @inheritdoc */
        lineTo(x, y) {
            if (!this.isBoundingRectNonZero) {
                return;
            }
            if (!(isFinite(x) && isFinite(y))) {
                return;
            }
            if (this.prevPoint[0] === x && this.prevPoint[1] === y) {
                return;
            }
            if (isNaN(this.prevPoint[0])) {
                this.moveTo(x, y);
                return;
            }
            const outcode = this.getOutcode(x, y);
            if ((this.prevPointOutcode | outcode) === 0) {
                // Both the previous point and current point are within bounds.
                this.consumer.lineTo(x, y);
            }
            else if ((this.prevPointOutcode & outcode) === 0) {
                // One or both of the previous point and current point are out of bounds, and the line connecting them may
                // cross through the bounding rect
                const bounds = this.bounds.get();
                const line = ClippedPathStream.getLineCoordinates(this.prevPoint[0], this.prevPoint[1], x, y, ClippedPathStream.vec3Cache[1]);
                let entryPoint, exitPoint;
                const outcodeOr = this.prevPointOutcode | outcode;
                if ((outcodeOr & ~(Outcode.Left | Outcode.Right)) === 0 || (outcodeOr & ~(Outcode.Top | Outcode.Bottom)) === 0) {
                    // The connecting line does not cross zones diagonally -> no need to check if the intersection of the line and
                    // boundary falls outside the bounds of the orthogonal axis.
                    // find entry point
                    for (let i = 0; i < 4; i++) {
                        if (this.prevPointOutcode & (1 << i)) {
                            entryPoint = ClippedPathStream.findLineLineIntersection(line, this.boundsLines[i], ClippedPathStream.vec2Cache[0]);
                            break;
                        }
                    }
                    // find exit point
                    for (let i = 0; i < 4; i++) {
                        if (outcode & (1 << i)) {
                            exitPoint = ClippedPathStream.findLineLineIntersection(line, this.boundsLines[i], ClippedPathStream.vec2Cache[1]);
                            break;
                        }
                    }
                }
                else {
                    // find entry point
                    for (let i = 0; i < 4; i++) {
                        if (this.prevPointOutcode & (1 << i)) {
                            const boundsAxisIndex = i % 2;
                            const intersection = ClippedPathStream.findLineLineIntersection(line, this.boundsLines[i], ClippedPathStream.vec2Cache[0]);
                            if (intersection && intersection[boundsAxisIndex] >= bounds[boundsAxisIndex] && intersection[boundsAxisIndex] <= bounds[boundsAxisIndex + 2]) {
                                entryPoint = intersection;
                                break;
                            }
                        }
                    }
                    // find exit point
                    for (let i = 0; i < 4; i++) {
                        if (outcode & (1 << i)) {
                            const boundsAxisIndex = i % 2;
                            const intersection = ClippedPathStream.findLineLineIntersection(line, this.boundsLines[i], ClippedPathStream.vec2Cache[1]);
                            if (intersection && intersection[boundsAxisIndex] >= bounds[boundsAxisIndex] && intersection[boundsAxisIndex] <= bounds[boundsAxisIndex + 2]) {
                                exitPoint = intersection;
                                break;
                            }
                        }
                    }
                }
                if (entryPoint) {
                    this.consumer.moveTo(entryPoint[0], entryPoint[1]);
                }
                if (exitPoint) {
                    this.consumer.lineTo(exitPoint[0], exitPoint[1]);
                }
                else if (outcode === Outcode.Inside) {
                    this.consumer.lineTo(x, y);
                }
            }
            Vec2Math.set(x, y, this.prevPoint);
            this.prevPointOutcode = outcode;
        }
        /** @inheritdoc */
        bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
            if (!this.isBoundingRectNonZero) {
                return;
            }
            if (!(isFinite(x) && isFinite(y) && isFinite(cp1x) && isFinite(cp1y) && isFinite(cp2x) && isFinite(cp2y))) {
                return;
            }
            if (isNaN(this.prevPoint[0])) {
                this.moveTo(x, y);
                return;
            }
            if (this.prevPointOutcode !== Outcode.Inside) {
                this.consumer.moveTo(this.prevPoint[0], this.prevPoint[1]);
            }
            this.consumer.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            Vec2Math.set(x, y, this.prevPoint);
            this.prevPointOutcode = this.getOutcode(x, y);
        }
        /** @inheritdoc */
        quadraticCurveTo(cpx, cpy, x, y) {
            if (!this.isBoundingRectNonZero) {
                return;
            }
            if (!(isFinite(x) && isFinite(y) && isFinite(cpx) && isFinite(cpy))) {
                return;
            }
            if (isNaN(this.prevPoint[0])) {
                this.moveTo(x, y);
                return;
            }
            if (this.prevPointOutcode !== Outcode.Inside) {
                this.consumer.moveTo(this.prevPoint[0], this.prevPoint[1]);
            }
            this.consumer.quadraticCurveTo(cpx, cpy, x, y);
            Vec2Math.set(x, y, this.prevPoint);
            this.prevPointOutcode = this.getOutcode(x, y);
        }
        /** @inheritdoc */
        arc(x, y, radius, startAngle, endAngle, counterClockwise = false) {
            if (!this.isBoundingRectNonZero) {
                return;
            }
            if (!(isFinite(x) && isFinite(y) && isFinite(radius) && isFinite(startAngle) && isFinite(endAngle))) {
                return;
            }
            if (radius === 0 || startAngle === endAngle) {
                return;
            }
            const pi2 = 2 * Math.PI;
            const directionSign = counterClockwise ? -1 : 1;
            if (Math.sign(endAngle - startAngle) !== directionSign) {
                // Replicate behavior of canvas context arc() when the sign of the difference between start and end angles
                // doesn't match the counterClockwise flag.
                const angleDiff = ((counterClockwise ? startAngle - endAngle : endAngle - startAngle) % pi2 + pi2) % pi2;
                endAngle = startAngle + angleDiff * directionSign;
            }
            // Clamp to 2pi because we don't need to draw anything past a full circle.
            const angularWidth = Math.min(pi2, (endAngle - startAngle) * directionSign);
            const bounds = this.bounds.get();
            const radiusSq = radius * radius;
            const startPoint = Vec2Math.add(Vec2Math.set(x, y, ClippedPathStream.vec2Cache[2]), Vec2Math.setFromPolar(radius, startAngle, ClippedPathStream.vec2Cache[0]), ClippedPathStream.vec2Cache[2]);
            const startPointOutcode = this.getOutcode(startPoint[0], startPoint[1]);
            const endPoint = Vec2Math.add(Vec2Math.set(x, y, ClippedPathStream.vec2Cache[3]), Vec2Math.setFromPolar(radius, endAngle, ClippedPathStream.vec2Cache[0]), ClippedPathStream.vec2Cache[3]);
            const endPointOutcode = this.getOutcode(endPoint[0], endPoint[1]);
            if (isNaN(this.prevPoint[0])) {
                this.moveTo(startPoint[0], startPoint[1]);
            }
            else if (!Vec2Math.equals(this.prevPoint, startPoint)) {
                this.lineTo(startPoint[0], startPoint[1]);
            }
            // find all intersections of the arc circle with the clipping bounds; there can be up to 8 (two for each boundary
            // line)
            const intersections = ClippedPathStream.intersectionCache;
            let intersectionCount = 0;
            for (let i = 0; i < 4; i++) {
                const axisCoordIndex = i % 2;
                const crossAxisCoordIndex = (i + 1) % 2;
                const centerAxisCoord = i % 2 === 0 ? x : y;
                const centerCrossAxisCoord = i % 2 === 0 ? y : x;
                const deltaToBound = bounds[i] - centerAxisCoord;
                if (Math.abs(deltaToBound) < radius) {
                    const crossAxisBoundMin = bounds[crossAxisCoordIndex];
                    const crossAxisBoundMax = bounds[crossAxisCoordIndex + 2];
                    //const radialOffset = Math.acos(deltaToBound / radius);
                    const crossAxisOffset = Math.sqrt(radiusSq - deltaToBound * deltaToBound);
                    let intersectionRadialOffset;
                    {
                        const intersectionCrossAxisCoord = centerCrossAxisCoord + crossAxisOffset;
                        if (intersectionCrossAxisCoord >= crossAxisBoundMin && intersectionCrossAxisCoord <= crossAxisBoundMax) {
                            const intersection = intersections[intersectionCount];
                            intersection.point[axisCoordIndex] = bounds[i];
                            intersection.point[crossAxisCoordIndex] = intersectionCrossAxisCoord;
                            const radial = axisCoordIndex * Math.PI / 2 + (intersectionRadialOffset !== null && intersectionRadialOffset !== void 0 ? intersectionRadialOffset : (intersectionRadialOffset = Math.acos(deltaToBound / radius))) * (axisCoordIndex === 0 ? 1 : -1);
                            intersection.radial = (radial + pi2) % pi2; // [0, 2 * pi)
                            intersectionCount++;
                        }
                    }
                    {
                        const intersectionCrossAxisCoord = centerCrossAxisCoord - crossAxisOffset;
                        if (intersectionCrossAxisCoord >= crossAxisBoundMin && intersectionCrossAxisCoord <= crossAxisBoundMax) {
                            const intersection = intersections[intersectionCount];
                            intersection.point[axisCoordIndex] = bounds[i];
                            intersection.point[crossAxisCoordIndex] = intersectionCrossAxisCoord;
                            const radial = axisCoordIndex * Math.PI / 2 - (intersectionRadialOffset !== null && intersectionRadialOffset !== void 0 ? intersectionRadialOffset : (intersectionRadialOffset = Math.acos(deltaToBound / radius))) * (axisCoordIndex === 0 ? 1 : -1);
                            intersection.radial = (radial + pi2) % pi2; // [0, 2 * pi)
                            intersectionCount++;
                        }
                    }
                }
            }
            // Begin at the start radial, then in order (either clockwise or counterclockwise depending on the arc direction)
            // iterate through the intersection points. At each intersection, move to the point if we are currently out of
            // bounds or path an arc from the last visited radial to the point if we are inbounds. Every time we visit an
            // intersection we go from out of bounds to in bounds and vice versa. Stop when the radial to the intersection
            // is past the end radial of the arc.
            let isOutside = startPointOutcode !== Outcode.Inside;
            const startAngleNormalized = ((startAngle % pi2) + pi2) % pi2; // [0, 2 * pi)
            let lastRadial = startAngleNormalized;
            let intersectionStartIndex = -1;
            let minAngularDiff = Infinity;
            for (let i = 0; i < intersectionCount; i++) {
                const angularDiff = ((intersections[i].radial - startAngleNormalized) * directionSign + pi2) % pi2;
                if (angularDiff < minAngularDiff) {
                    intersectionStartIndex = i;
                    minAngularDiff = angularDiff;
                }
            }
            if (intersectionStartIndex >= 0) {
                for (let i = 0; i < intersectionCount; i++) {
                    const index = (intersectionStartIndex + intersectionCount + i * directionSign) % intersectionCount;
                    const intersection = intersections[index];
                    if (((intersection.radial - startAngleNormalized) * directionSign + pi2) % pi2 >= angularWidth) {
                        break;
                    }
                    if (isOutside) {
                        this.consumer.moveTo(intersection.point[0], intersection.point[1]);
                    }
                    else {
                        const segmentAngularWidth = ((intersection.radial - lastRadial) * directionSign + pi2) % pi2;
                        this.consumer.arc(x, y, radius, lastRadial, lastRadial + segmentAngularWidth * directionSign, counterClockwise);
                    }
                    isOutside = !isOutside;
                    lastRadial = intersection.radial;
                }
            }
            const endAngleNormalized = (startAngleNormalized + angularWidth * directionSign + pi2) % pi2; // [0, 2 * pi)
            if (!isOutside) {
                const segmentAngularWidth = ((endAngleNormalized - lastRadial) * directionSign + pi2) % pi2;
                this.consumer.arc(x, y, radius, lastRadial, lastRadial + segmentAngularWidth * directionSign, counterClockwise);
                if (Math.abs((endAngleNormalized - endAngle) % pi2) > 1e-14) {
                    // This can happen if we clamped the angular width to 2pi -> we need to move the current point to the actual
                    // end point to keep the state of the consumer stream consistent with ours.
                    this.consumer.moveTo(endPoint[0], endPoint[1]);
                }
            }
            Vec2Math.copy(endPoint, this.prevPoint);
            this.prevPointOutcode = endPointOutcode;
        }
        /** @inheritdoc */
        closePath() {
            if (!isNaN(this.firstPoint[0])) {
                this.lineTo(this.firstPoint[0], this.firstPoint[1]);
            }
        }
        /**
         * Resets the state of this stream.
         */
        reset() {
            Vec2Math.set(NaN, NaN, this.firstPoint);
            Vec2Math.set(NaN, NaN, this.prevPoint);
            this.prevPointOutcode = 0;
        }
        /**
         * Gets the Cohen-Sutherland outcode for a point.
         * @param x The x-coordinate of the query point.
         * @param y The y-coordinate of the query point.
         * @returns The outcode for the point.
         */
        getOutcode(x, y) {
            const bounds = this.bounds.get();
            let code = 0;
            if (x < bounds[0]) {
                code |= Outcode.Left;
            }
            else if (x > bounds[2]) {
                code |= Outcode.Right;
            }
            if (y < bounds[1]) {
                code |= Outcode.Top;
            }
            else if (y > bounds[3]) {
                code |= Outcode.Bottom;
            }
            return code;
        }
        /**
         * Handles clipping bounds change events.
         */
        onBoundsChanged() {
            const bounds = this.bounds.get();
            Vec3Math.set(1, 0, -bounds[0], this.boundsLines[0]);
            Vec3Math.set(0, 1, -bounds[1], this.boundsLines[1]);
            Vec3Math.set(1, 0, -bounds[2], this.boundsLines[2]);
            Vec3Math.set(0, 1, -bounds[3], this.boundsLines[3]);
            this.isBoundingRectNonZero = bounds[0] < bounds[2] && bounds[1] < bounds[3];
            this.beginPath();
        }
        /**
         * Destroys this stream.
         */
        destroy() {
            this.bounds.unsub(this.boundsHandler);
        }
        /**
         * Gets the line coordinate vector for a line passing through two points.
         * @param x1 The x-coordinate of the first point on the line.
         * @param y1 The y-coordinate of the first point on the line.
         * @param x2 The x-coordinate of the second point on the line.
         * @param y2 The y-coordinate of the second point on the line.
         * @param out A Float64Array object to which to write the result.
         * @returns The line coordinate vector of the line passing through the two points.
         */
        static getLineCoordinates(x1, y1, x2, y2, out) {
            const a = y1 - y2;
            const b = x2 - x1;
            const c = -(a * x1 + b * y1);
            return Vec3Math.set(a, b, c, out);
        }
        /**
         * Finds the intersection point between two lines in 2D Euclidean space.
         * @param line1 The line coordinate vector of the first line.
         * @param line2 The line coordinate vector of the second line.
         * @param out A Float64Array object to which to write the result.
         * @returns The intersection point of the two lines, or undefined if the two lines are parallel.
         */
        static findLineLineIntersection(line1, line2, out) {
            const cross = Vec3Math.cross(line1, line2, ClippedPathStream.vec3Cache[0]);
            const w = cross[2];
            if (w === 0) {
                return undefined;
            }
            return Vec2Math.set(cross[0] / w, cross[1] / w, out);
        }
    }
    ClippedPathStream.vec2Cache = [new Float64Array(2), new Float64Array(2), new Float64Array(2), new Float64Array(2)];
    ClippedPathStream.vec3Cache = [new Float64Array(3), new Float64Array(3)];
    ClippedPathStream.intersectionCache = Array.from({ length: 8 }, () => {
        return { point: new Float64Array(2), radial: 0 };
    });

    /**
     * A path stream which transforms a path stream in geographic spherical coordinates to one in projected planar
     * coordinates.
     */
    class GeoProjectionPathStream extends AbstractTransformingPathStream {
        // eslint-disable-next-line jsdoc/require-jsdoc
        constructor(consumer, projection, arg1, arg2, arg3) {
            super(consumer);
            this.projection = projection;
            this.firstPoint = new GeoPoint(NaN, NaN);
            this.prevPoint = new GeoPoint(NaN, NaN);
            this.prevPointProjected = new Float64Array(2);
            this.resampleHandler = this.onResampled.bind(this);
            if (arg1 instanceof GeoCircleResampler) {
                this.resampler = arg1;
            }
            else {
                this.resampler = new GeoCircleResampler(arg1, arg2, arg3);
            }
        }
        /**
         * Gets the projection used by this stream.
         * @returns The projection used by this stream.
         */
        getProjection() {
            return this.projection;
        }
        /**
         * Sets the projection used by this stream.
         * @param projection A projection.
         */
        setProjection(projection) {
            this.projection = projection;
        }
        /** @inheritdoc */
        beginPath() {
            this.reset();
            this.consumer.beginPath();
        }
        /**
         * Moves to a specified point.
         * @param lon The longitude of the point to which to move, in degrees.
         * @param lat The latitude of the point to which to move, in degrees.
         */
        moveTo(lon, lat) {
            if (!(isFinite(lon) && isFinite(lat))) {
                return;
            }
            if (isNaN(this.firstPoint.lat)) {
                this.firstPoint.set(lat, lon);
            }
            this.prevPoint.set(lat, lon);
            const projected = this.projection.project(this.prevPoint, this.prevPointProjected);
            this.consumer.moveTo(projected[0], projected[1]);
        }
        /**
         * Paths a great-circle arc from the current point to a specified point.
         * @param lon The longitude of the end point, in degrees.
         * @param lat The latitude of the end point, in degrees.
         * @throws Error if the specified point is antipodal to the last pathed point.
         */
        lineTo(lon, lat) {
            if (!(isFinite(lon) && isFinite(lat))) {
                return;
            }
            if (!isNaN(this.prevPoint.lat) && this.prevPoint.equals(lat, lon)) {
                return;
            }
            if (isNaN(this.prevPoint.lat)) {
                this.moveTo(lon, lat);
                return;
            }
            const point = GeoProjectionPathStream.geoPointCache[0].set(lat, lon);
            const circle = GeoProjectionPathStream.geoCircleCache[0].setAsGreatCircle(this.prevPoint, point);
            if (!isFinite(circle.center[0])) {
                throw new Error(`Cannot unambiguously path a great circle from ${this.prevPoint.lat} lat, ${this.prevPoint.lon} lon to ${lat} lat, ${lon} lon`);
            }
            this.resampler.resample(this.projection, circle, this.prevPoint, point, this.resampleHandler);
            this.prevPoint.set(lat, lon);
        }
        /**
         * Not supported by this path stream.
         * @throws Error when called.
         */
        bezierCurveTo() {
            throw new Error('GeodesicResamplerStream: bezierCurveTo() is not supported');
        }
        /**
         * Not supported by this path stream.
         * @throws Error when called.
         */
        quadraticCurveTo() {
            throw new Error('GeodesicResamplerStream: quadraticCurveTo() is not supported');
        }
        /**
         * Paths a small-circle arc.
         * @param lon The longitude of the center of the circle containing the arc, in degrees.
         * @param lat The latitude of the center of the circle containing the arc, in degrees.
         * @param radius The radius of the arc, in great-arc radians.
         * @param startAngle If the center of the circle containing the arc is not one of the poles, the true bearing, in
         * degrees, from the center of the circle to the start of the arc; otherwise the longitude, in degrees, of the start
         * of the arc.
         * @param endAngle If the center of the circle containing the arc is not one of the poles, the true bearing, in
         * degrees, from the center of the circle to the end of the arc; otherwise the longitude, in degrees, of the end of
         * the arc.
         * @param counterClockwise Whether the arc should be drawn counterclockwise. False by default.
         */
        arc(lon, lat, radius, startAngle, endAngle, counterClockwise) {
            if (!(isFinite(lon) && isFinite(lat) && isFinite(radius) && isFinite(startAngle) && isFinite(endAngle))) {
                return;
            }
            if (radius === 0 || Math.abs(startAngle - endAngle) <= GeoCircle.ANGULAR_TOLERANCE * Avionics.Utils.RAD2DEG) {
                return;
            }
            if (MathUtils.diffAngle(startAngle * Avionics.Utils.DEG2RAD, endAngle * Avionics.Utils.DEG2RAD, false) <= GeoCircle.ANGULAR_TOLERANCE) {
                // Since we early return above if startAngle and endAngle are equal, hitting this case means they are a multiple
                // of 360 degrees apart. The resampler will interpret them as being the same point and won't draw a full circle
                // so we will split the arc into two.
                const midAngle = startAngle + 180 * Math.sign(endAngle - startAngle);
                this.arc(lon, lat, radius, startAngle, midAngle, counterClockwise);
                this.arc(lon, lat, radius, midAngle, endAngle, counterClockwise);
                return;
            }
            const center = GeoProjectionPathStream.geoPointCache[1].set(lat, lon);
            const start = GeoProjectionPathStream.geoPointCache[2];
            const end = GeoProjectionPathStream.geoPointCache[3];
            if (Math.abs(lat) >= 90 - GeoCircle.ANGULAR_TOLERANCE * Avionics.Utils.RAD2DEG) {
                // The center of the arc circle is one of the poles
                const circleLat = Math.sign(lat) * (MathUtils.HALF_PI - radius) * Avionics.Utils.RAD2DEG;
                start.set(circleLat, startAngle);
                end.set(circleLat, endAngle);
            }
            else {
                center.offset(startAngle, radius, start);
                center.offset(endAngle, radius, end);
            }
            if (isNaN(start.lat) || isNaN(start.lon) || isNaN(end.lat) || isNaN(end.lon)) {
                return;
            }
            if (isNaN(this.prevPoint.lat)) {
                this.moveTo(start.lon, start.lat);
            }
            else if (!start.equals(this.prevPoint)) {
                this.lineTo(start.lon, start.lat);
            }
            const circle = GeoProjectionPathStream.geoCircleCache[0].set(center, radius);
            if (!counterClockwise) {
                circle.reverse();
            }
            this.resampler.resample(this.projection, circle, start, end, this.resampleHandler);
            this.prevPoint.set(end);
        }
        /**
         * Paths a great-circle arc from the current point to the first point defined by the current path.
         */
        closePath() {
            if (!isNaN(this.firstPoint.lat)) {
                this.lineTo(this.firstPoint.lon, this.firstPoint.lat);
            }
        }
        /**
         * Resets the state of this stream.
         */
        reset() {
            this.firstPoint.set(NaN, NaN);
            this.prevPoint.set(NaN, NaN);
        }
        /**
         * Handles resampled points.
         * @param vector A vector which describes the projected path terminating at the resampled point.
         */
        onResampled(vector) {
            switch (vector.type) {
                case 'start':
                    return;
                case 'line':
                    this.consumer.lineTo(vector.projected[0], vector.projected[1]);
                    break;
                case 'arc':
                    this.consumer.arc(vector.projectedArcCenter[0], vector.projectedArcCenter[1], vector.projectedArcRadius, vector.projectedArcStartAngle, vector.projectedArcEndAngle, vector.projectedArcStartAngle > vector.projectedArcEndAngle);
                    break;
            }
            Vec2Math.copy(vector.projected, this.prevPointProjected);
        }
    }
    GeoProjectionPathStream.geoPointCache = [new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
    GeoProjectionPathStream.geoCircleCache = [new GeoCircle(new Float64Array(3), 0)];

    /**
     * A {@link TransformingPathStream} which applies an affine transformation to its input.
     *
     * The types of transformation supported by this class are:
     * * Translation.
     * * Uniform scaling.
     * * Rotation.
     */
    class AffineTransformPathStream extends AbstractTransformingPathStream {
        constructor() {
            super(...arguments);
            this.transform = new Transform2D();
            this.concatCache = [];
            this.scale = 1;
            this.rotation = 0;
        }
        /**
         * Adds a translation to this stream's transformation.
         * @param x The x translation.
         * @param y The y translation.
         * @param order The order in which to add the translation (defaults to `'after'`):
         * * `'before'` - Applies the translation before this stream's current transformation.
         * * `'after'` - Applies the translation after this stream's current transformation.
         * @returns This stream, after its transformation has been changed.
         */
        addTranslation(x, y, order = 'after') {
            const translation = AffineTransformPathStream.transformCache[0].toTranslation(x, y);
            if (order === 'before') {
                this.concatCache[0] = translation;
                this.concatCache[1] = this.transform;
            }
            else {
                this.concatCache[0] = this.transform;
                this.concatCache[1] = translation;
            }
            Transform2D.concat(this.transform, this.concatCache);
            return this;
        }
        /**
         * Adds a uniform scaling to this stream's transformation.
         * @param factor The scaling factor.
         * @param order The order in which to add the translation (defaults to `'after'`):
         * * `'before'` - Applies the scaling before this stream's current transformation.
         * * `'after'` - Applies the scaling after this stream's current transformation.
         * @returns This stream, after its transformation has been changed.
         */
        addScale(factor, order = 'after') {
            const scale = AffineTransformPathStream.transformCache[0].toScale(factor, factor);
            if (order === 'before') {
                this.concatCache[0] = scale;
                this.concatCache[1] = this.transform;
            }
            else {
                this.concatCache[0] = this.transform;
                this.concatCache[1] = scale;
            }
            Transform2D.concat(this.transform, this.concatCache);
            this.updateScaleRotation();
            return this;
        }
        /**
         * Adds a rotation to this stream's transformation.
         * @param angle The rotation angle, in radians.
         * @param order The order in which to add the translation (defaults to `'after'`):
         * * `'before'` - Applies the rotation before this stream's current transformation.
         * * `'after'` - Applies the rotation after this stream's current transformation.
         * @returns This stream, after its transformation has been changed.
         */
        addRotation(angle, order = 'after') {
            const rotation = AffineTransformPathStream.transformCache[0].toRotation(angle);
            if (order === 'before') {
                this.concatCache[0] = rotation;
                this.concatCache[1] = this.transform;
            }
            else {
                this.concatCache[0] = this.transform;
                this.concatCache[1] = rotation;
            }
            Transform2D.concat(this.transform, this.concatCache);
            this.updateScaleRotation();
            return this;
        }
        /**
         * Resets this stream's transformation to the identity transformation.
         * @returns This stream, after its transformation has been changed.
         */
        resetTransform() {
            this.transform.toIdentity();
            this.updateScaleRotation();
            return this;
        }
        /** @inheritdoc */
        beginPath() {
            this.consumer.beginPath();
        }
        /** @inheritdoc */
        moveTo(x, y) {
            const transformed = this.applyTransform(x, y);
            this.consumer.moveTo(transformed[0], transformed[1]);
        }
        /** @inheritdoc */
        lineTo(x, y) {
            const transformed = this.applyTransform(x, y);
            this.consumer.lineTo(transformed[0], transformed[1]);
        }
        /** @inheritdoc */
        bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
            const cp1Transformed = this.applyTransform(cp1x, cp1y);
            cp1x = cp1Transformed[0];
            cp1y = cp1Transformed[1];
            const cp2Transformed = this.applyTransform(cp2x, cp2y);
            cp2x = cp2Transformed[0];
            cp2y = cp2Transformed[1];
            const endTransformed = this.applyTransform(x, y);
            x = endTransformed[0];
            y = endTransformed[1];
            this.consumer.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        }
        /** @inheritdoc */
        quadraticCurveTo(cpx, cpy, x, y) {
            const cpTransformed = this.applyTransform(cpx, cpy);
            cpx = cpTransformed[0];
            cpy = cpTransformed[1];
            const endTransformed = this.applyTransform(x, y);
            x = endTransformed[0];
            y = endTransformed[1];
            this.consumer.quadraticCurveTo(cpx, cpy, x, y);
        }
        /** @inheritdoc */
        arc(x, y, radius, startAngle, endAngle, counterClockwise) {
            const transformed = this.applyTransform(x, y);
            this.consumer.arc(transformed[0], transformed[1], radius * this.scale, startAngle + this.rotation, endAngle + this.rotation, counterClockwise);
        }
        /** @inheritdoc */
        closePath() {
            this.consumer.closePath();
        }
        /**
         * Updates this stream's cached scale and rotation values from its transformation.
         */
        updateScaleRotation() {
            const params = this.transform.getParameters();
            this.scale = Math.sqrt(params[0] * params[0] + params[3] * params[3]);
            this.rotation = Math.atan2(params[0], params[3]);
        }
        /**
         * Applies this stream's transformation to a point.
         * @param x The x-coordinate of the point to transform.
         * @param y The y-coordinate of the point to transform.
         * @returns The transformed point.
         */
        applyTransform(x, y) {
            const vec = Vec2Math.set(x, y, AffineTransformPathStream.vec2Cache[0]);
            return this.transform.apply(vec, vec);
        }
    }
    AffineTransformPathStream.vec2Cache = [new Float64Array(2)];
    AffineTransformPathStream.transformCache = [new Transform2D()];

    /**
     * A stack of {@link TransformingPathStream}s. Inputs are passed through the entire stack from top to bottom before the
     * final transformed output is sent to a consuming stream.
     */
    class TransformingPathStreamStack extends AbstractTransformingPathStream {
        constructor() {
            super(...arguments);
            this.stack = [];
        }
        /**
         * Adds a transforming path stream to the top of this stack.
         * @param stream A transforming path stream.
         */
        push(stream) {
            var _a;
            stream.setConsumer((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer);
            this.stack.push(stream);
        }
        /**
         * Removes the top-most path stream from this stack. The removed stream will have its consumer set to
         * {@link NullPathStream.INSTANCE}.
         * @returns The removed path stream, or undefined if this stack was empty.
         */
        pop() {
            const removed = this.stack.pop();
            removed === null || removed === void 0 ? void 0 : removed.setConsumer(NullPathStream.INSTANCE);
            return removed;
        }
        /**
         * Adds a transforming path stream to the bottom of this stack.
         * @param stream A transforming path stream.
         */
        unshift(stream) {
            const displaced = this.stack[0];
            displaced === null || displaced === void 0 ? void 0 : displaced.setConsumer(stream);
            stream.setConsumer(this.consumer);
            this.stack.unshift(stream);
        }
        /**
         * Removes the bottom-most path stream from this stack. The removed stream will have its consumer set to
         * {@link NullPathStream.INSTANCE}.
         * @returns The removed path stream, or undefined if this stack was empty.
         */
        shift() {
            var _a;
            const removed = this.stack.shift();
            removed === null || removed === void 0 ? void 0 : removed.setConsumer(NullPathStream.INSTANCE);
            (_a = this.stack[0]) === null || _a === void 0 ? void 0 : _a.setConsumer(this.consumer);
            return removed;
        }
        /** @inheritdoc */
        setConsumer(consumer) {
            var _a;
            (_a = this.stack[0]) === null || _a === void 0 ? void 0 : _a.setConsumer(consumer);
            super.setConsumer(consumer);
        }
        /** @inheritdoc */
        beginPath() {
            var _a;
            ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).beginPath();
        }
        /** @inheritdoc */
        moveTo(x, y) {
            var _a;
            ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).moveTo(x, y);
        }
        /** @inheritdoc */
        lineTo(x, y) {
            var _a;
            ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).lineTo(x, y);
        }
        /** @inheritdoc */
        bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
            var _a;
            ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        }
        /** @inheritdoc */
        quadraticCurveTo(cpx, cpy, x, y) {
            var _a;
            ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).quadraticCurveTo(cpx, cpy, x, y);
        }
        /** @inheritdoc */
        arc(x, y, radius, startAngle, endAngle, counterClockwise) {
            var _a;
            ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).arc(x, y, radius, startAngle, endAngle, counterClockwise);
        }
        /** @inheritdoc */
        closePath() {
            this.stack[this.stack.length - 1].closePath();
        }
    }

    /**
     * A stack of {@link TransformingPathStream}s which transforms an input in spherical geographic coordinates to planar
     * projected coordinates. The stack contains two sub-stacks: a pre-projected stack which transforms the path before
     * it is projected, and a post-projected stack which transforms the projected path before it is sent to the consumer.
     * Transforming streams can be added to the top and bottom of each sub-stack. The input will be passed through each
     * stream in the pre-projected stack from top to bottom, then projected, then passed through each stream in the post-
     * projected stack from top to bottom, and the final transformed output will be passed to the consumer.
     */
    class GeoProjectionPathStreamStack extends AbstractTransformingPathStream {
        // eslint-disable-next-line jsdoc/require-jsdoc
        constructor(consumer, projection, arg1, arg2, arg3) {
            super(consumer);
            this.postStack = new TransformingPathStreamStack(consumer);
            if (arg1 instanceof GeoCircleResampler) {
                this.projectionStream = new GeoProjectionPathStream(this.postStack, projection, arg1);
            }
            else {
                this.projectionStream = new GeoProjectionPathStream(this.postStack, projection, arg1, arg2, arg3);
            }
            this.preStack = new TransformingPathStreamStack(this.projectionStream);
        }
        /**
         * Gets the projection used by this stream.
         * @returns The projection used by this stream.
         */
        getProjection() {
            return this.projectionStream.getProjection();
        }
        /**
         * Sets the projection used by this stream.
         * @param projection A projection.
         */
        setProjection(projection) {
            this.projectionStream.setProjection(projection);
        }
        /**
         * Adds a transforming path stream to the top of the pre-projected stack.
         * @param stream A transforming path stream.
         */
        pushPreProjected(stream) {
            this.preStack.push(stream);
        }
        /**
         * Removes the top-most path stream from the pre-projected stack. The removed stream will have its consumer set to
         * {@link NullPathStream.INSTANCE}.
         * @returns The removed path stream, or undefined if this stack was empty.
         */
        popPreProjected() {
            return this.preStack.pop();
        }
        /**
         * Adds a transforming path stream to the bottom of the pre-projected stack.
         * @param stream A transforming path stream.
         */
        unshiftPreProjected(stream) {
            this.preStack.unshift(stream);
        }
        /**
         * Removes the bottom-most path stream from the pre-projected stack. The removed stream will have its consumer set to
         * {@link NullPathStream.INSTANCE}.
         * @returns The removed path stream, or undefined if this stack was empty.
         */
        shiftPreProjected() {
            return this.preStack.shift();
        }
        /**
         * Adds a transforming path stream to the top of the post-projected stack.
         * @param stream A transforming path stream.
         */
        pushPostProjected(stream) {
            this.postStack.push(stream);
        }
        /**
         * Removes the top-most path stream from the post-projected stack. The removed stream will have its consumer set to
         * {@link NullPathStream.INSTANCE}.
         * @returns The removed path stream, or undefined if this stack was empty.
         */
        popPostProjected() {
            return this.postStack.pop();
        }
        /**
         * Adds a transforming path stream to the bottom of the post-projected stack.
         * @param stream A transforming path stream.
         */
        unshiftPostProjected(stream) {
            this.postStack.unshift(stream);
        }
        /**
         * Removes the bottom-most path stream from the post-projected stack. The removed stream will have its consumer set
         * to {@link NullPathStream.INSTANCE}.
         * @returns The removed path stream, or undefined if this stack was empty.
         */
        shiftPostProjected() {
            return this.postStack.shift();
        }
        /** @inheritdoc */
        setConsumer(consumer) {
            this.postStack.setConsumer(consumer);
            super.setConsumer(consumer);
        }
        /** @inheritdoc */
        beginPath() {
            this.preStack.beginPath();
        }
        /** @inheritdoc */
        moveTo(x, y) {
            this.preStack.moveTo(x, y);
        }
        /** @inheritdoc */
        lineTo(x, y) {
            this.preStack.lineTo(x, y);
        }
        /** @inheritdoc */
        bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
            this.preStack.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        }
        /** @inheritdoc */
        quadraticCurveTo(cpx, cpy, x, y) {
            this.preStack.quadraticCurveTo(cpx, cpy, x, y);
        }
        /** @inheritdoc */
        arc(x, y, radius, startAngle, endAngle, counterClockwise) {
            this.preStack.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        }
        /** @inheritdoc */
        closePath() {
            this.preStack.closePath();
        }
    }

    [new GeoPoint(0, 0), new GeoPoint(0, 0)];

    /**
     * Parts of a flight plan leg path to render.
     */
    var FlightPathLegRenderPart;
    (function (FlightPathLegRenderPart) {
        /** None. */
        FlightPathLegRenderPart[FlightPathLegRenderPart["None"] = 0] = "None";
        /** The ingress transition. */
        FlightPathLegRenderPart[FlightPathLegRenderPart["Ingress"] = 1] = "Ingress";
        /** The base path. */
        FlightPathLegRenderPart[FlightPathLegRenderPart["Base"] = 2] = "Base";
        /** The egress transition. */
        FlightPathLegRenderPart[FlightPathLegRenderPart["Egress"] = 4] = "Egress";
        /** The entire leg path. */
        FlightPathLegRenderPart[FlightPathLegRenderPart["All"] = 7] = "All";
    })(FlightPathLegRenderPart || (FlightPathLegRenderPart = {}));
    [new GeoPoint(0, 0), new GeoPoint(0, 0)];
    [new GeoCircle(new Float64Array(3), 0)];

    [new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)];

    [new GeoCircle(new Float64Array(3), 0)];

    [new GeoCircle(new Float64Array(3), 0)];

    [new GeoPoint(0, 0)];

    [new GeoPoint(0, 0)];
    [new Transform2D(), new Transform2D()];

    /// <reference types="msfstypes/JS/common" />
    /**
     * A FSComponent that display the MSFS Bing Map, weather radar, and 3D terrain.
     */
    class MapBingLayer extends MapLayer {
        constructor() {
            super(...arguments);
            this.wrapperRef = FSComponent.createRef();
            this.bingRef = FSComponent.createRef();
            this.resolutionSub = Vec2Subject.createFromVector(new Float64Array([1024, 1024]));
            this.size = 0;
            this.needUpdate = false;
        }
        /** @inheritdoc */
        onAfterRender() {
            this.updateFromProjectedSize(this.props.mapProjection.getProjectedSize());
            if (this.props.wxrMode !== undefined) {
                this.props.wxrMode.sub(() => {
                    this.updateFromProjectedSize(this.props.mapProjection.getProjectedSize());
                    this.needUpdate = true;
                });
            }
        }
        /** @inheritdoc */
        onWake() {
            this.bingRef.instance.wake();
        }
        /** @inheritdoc */
        onSleep() {
            this.bingRef.instance.sleep();
        }
        /**
         * Updates this layer according to the current size of the projected map window.
         * @param projectedSize The size of the projected map window.
         */
        updateFromProjectedSize(projectedSize) {
            if (this.props.wxrMode && this.props.wxrMode.get().mode === EWeatherRadar.HORIZONTAL) {
                const offsetSize = new Float64Array([projectedSize[0], projectedSize[1]]);
                const offset = this.props.mapProjection.getTargetProjectedOffset();
                offsetSize[0] += offset[0];
                offsetSize[1] += offset[1];
                this.size = this.getSize(offsetSize);
                const offsetX = ((projectedSize[0] - this.size) / 2) + offset[0];
                const offsetY = ((projectedSize[1] - this.size) / 2) + offset[1];
                this.wrapperRef.instance.style.left = `${offsetX}px`;
                this.wrapperRef.instance.style.top = `${offsetY}px`;
                this.wrapperRef.instance.style.width = `${this.size}px`;
                this.wrapperRef.instance.style.height = `${this.size}px`;
            }
            else {
                this.size = this.getSize(projectedSize);
                const offsetX = (projectedSize[0] - this.size) / 2;
                const offsetY = (projectedSize[1] - this.size) / 2;
                this.wrapperRef.instance.style.left = `${offsetX}px`;
                this.wrapperRef.instance.style.top = `${offsetY}px`;
                this.wrapperRef.instance.style.width = `${this.size}px`;
                this.wrapperRef.instance.style.height = `${this.size}px`;
            }
            this.resolutionSub.set(this.size, this.size);
        }
        /**
         * Gets an appropriate size, in pixels, for this Bing layer given specific map projection window dimensions.
         * @param projectedSize - the size of the projected map window.
         * @returns an appropriate size for this Bing layer.
         */
        getSize(projectedSize) {
            return Vec2Math.abs(projectedSize);
        }
        /** @inheritdoc */
        onMapProjectionChanged(mapProjection, changeFlags) {
            if (BitFlags.isAll(changeFlags, MapProjectionChangeType.ProjectedSize)) {
                this.updateFromProjectedSize(mapProjection.getProjectedSize());
            }
            if (this.bingRef.instance.isBound()) {
                this.needUpdate = true;
            }
        }
        /**
         * A callback which is called when the Bing component is bound.
         */
        onBingBound() {
            this.needUpdate = true;
        }
        /** @inheritdoc */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onUpdated(time, elapsed) {
            if (!this.needUpdate) {
                return;
            }
            this.updatePositionRadius();
            this.needUpdate = false;
        }
        /** @inheritdoc */
        setVisible(val) {
            this.wrapperRef.instance.style.display = val ? '' : 'none';
        }
        /**
         * Resets the underlying Bing component's img src attribute.
         */
        resetImgSrc() {
            this.bingRef.instance.resetImgSrc();
        }
        /**
         * Updates the Bing map center position and radius.
         */
        updatePositionRadius() {
            const center = this.props.mapProjection.getCenter();
            const radius = this.calculateDesiredRadius(this.props.mapProjection);
            this.bingRef.instance.setPositionRadius(new LatLong(center.lat, center.lon), radius);
            if (!this.props.wxrMode || (this.props.wxrMode && this.props.wxrMode.get().mode !== EWeatherRadar.HORIZONTAL)) {
                this.wrapperRef.instance.style.transform = `rotate(${this.props.mapProjection.getRotation() * Avionics.Utils.RAD2DEG}deg)`;
            }
            else {
                this.wrapperRef.instance.style.transform = '';
            }
        }
        /**
         * Gets the desired Bing map radius in meters given a map projection model.
         * @param mapProjection - a map projection model.
         * @returns the desired Bing map radius.
         */
        calculateDesiredRadius(mapProjection) {
            const scaleFactor = mapProjection.getScaleFactor();
            const pointScaleFactor = 1 / Math.cos(mapProjection.getCenter().lat * Avionics.Utils.DEG2RAD);
            const radiusGARad = this.size / (2 * scaleFactor * pointScaleFactor);
            return UnitType.GA_RADIAN.convertTo(radiusGARad, UnitType.METER);
        }
        /** @inheritdoc */
        render() {
            var _a, _b;
            return (FSComponent.buildComponent("div", { ref: this.wrapperRef, style: 'position: absolute;', class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '' },
                FSComponent.buildComponent(BingComponent, { ref: this.bingRef, id: this.props.bingId, onBoundCallback: this.onBingBound.bind(this), resolution: this.resolutionSub, mode: (_b = this.props.mode) !== null && _b !== void 0 ? _b : EBingMode.PLANE, earthColors: this.props.earthColors, reference: this.props.reference, wxrMode: this.props.wxrMode, isoLines: this.props.isoLines, delay: this.props.delay })));
        }
    }
    MapBingLayer.OVERDRAW_FACTOR = Math.SQRT2;

    /**
     * An implementation of MapCanvasLayerCanvasInstance.
     */
    class MapCanvasLayerCanvasInstanceClass {
        /**
         * Creates a new canvas instance.
         * @param canvas The canvas element.
         * @param context The canvas 2D rendering context.
         * @param isDisplayed Whether the canvas is displayed.
         */
        constructor(canvas, context, isDisplayed) {
            this.canvas = canvas;
            this.context = context;
            this.isDisplayed = isDisplayed;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        reset() {
            const width = this.canvas.width;
            this.canvas.width = 0;
            this.canvas.width = width;
        }
    }
    /**
     * A layer which uses a canvas to draw graphics.
     */
    class MapCanvasLayer extends MapLayer {
        constructor() {
            super(...arguments);
            this.displayCanvasRef = FSComponent.createRef();
            this.width = 0;
            this.height = 0;
            this.displayCanvasContext = null;
            this.isInit = false;
        }
        /**
         * Gets this layer's display canvas instance.
         * @returns This layer's display canvas instance.
         * @throws Error if this layer's display canvas instance has not been initialized.
         */
        get display() {
            if (!this._display) {
                throw new Error('MapCanvasLayer: attempted to access display before it was initialized');
            }
            return this._display;
        }
        /**
         * Gets this layer's buffer canvas instance.
         * @returns This layer's buffer canvas instance.
         * @throws Error if this layer's buffer canvas instance has not been initialized.
         */
        get buffer() {
            if (!this._buffer) {
                throw new Error('MapCanvasLayer: attempted to access buffer before it was initialized');
            }
            return this._buffer;
        }
        /**
         * Attempts to get this layer's display canvas instance.
         * @returns This layer's display canvas instance, or undefined if it has not been initialized.
         */
        tryGetDisplay() {
            return this._display;
        }
        /**
         * Attempts to get this layer's buffer canvas instance.
         * @returns This layer's buffer canvas instance, or undefined if it has not been initialized.
         */
        tryGetBuffer() {
            return this._buffer;
        }
        /**
         * Gets the width of the canvas element, in pixels.
         * @returns the width of the canvas element.
         */
        getWidth() {
            return this.width;
        }
        /**
         * Gets the height of the canvas element, in pixels.
         * @returns the height of the canvas element.
         */
        getHeight() {
            return this.height;
        }
        /**
         * Sets the width of the canvas element, in pixels.
         * @param width The new width.
         */
        setWidth(width) {
            if (width === this.width) {
                return;
            }
            this.width = width;
            if (this.isInit) {
                this.updateCanvasSize();
            }
        }
        /**
         * Sets the height of the canvas element, in pixels.
         * @param height The new height.
         */
        setHeight(height) {
            if (height === this.height) {
                return;
            }
            this.height = height;
            if (this.isInit) {
                this.updateCanvasSize();
            }
        }
        /**
         * Copies the contents of the buffer to the display. Has no effect if this layer does not have a buffer.
         */
        copyBufferToDisplay() {
            if (!this.isInit || !this.props.useBuffer) {
                return;
            }
            this.display.context.drawImage(this.buffer.canvas, 0, 0, this.width, this.height);
        }
        /**
         * A callback called after the component renders.
         */
        onAfterRender() {
            this.displayCanvasContext = this.displayCanvasRef.instance.getContext('2d');
        }
        // eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/no-unused-vars
        onVisibilityChanged(isVisible) {
            if (this.isInit) {
                this.updateCanvasVisibility();
            }
        }
        /**
         * Updates this layer according to its current visibility.
         */
        updateFromVisibility() {
            this.display.canvas.style.display = this.isVisible() ? 'block' : 'none';
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        onAttached() {
            this.initCanvasInstances();
            this.isInit = true;
            this.updateCanvasVisibility();
            this.updateCanvasSize();
        }
        /**
         * Initializes this layer's canvas instances.
         */
        initCanvasInstances() {
            this._display = this.createCanvasInstance(this.displayCanvasRef.instance, this.displayCanvasContext, true);
            if (this.props.useBuffer) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                this._buffer = this.createCanvasInstance(canvas, context, false);
            }
        }
        /**
         * Creates a canvas instance.
         * @param canvas The canvas element.
         * @param context The canvas 2D rendering context.
         * @param isDisplayed Whether the canvas is displayed.
         * @returns a canvas instance.
         */
        createCanvasInstance(canvas, context, isDisplayed) {
            return new MapCanvasLayerCanvasInstanceClass(canvas, context, isDisplayed);
        }
        /**
         * Updates the canvas element's size.
         */
        updateCanvasSize() {
            const displayCanvas = this.display.canvas;
            displayCanvas.width = this.width;
            displayCanvas.height = this.height;
            displayCanvas.style.width = `${this.width}px`;
            displayCanvas.style.height = `${this.height}px`;
            if (this._buffer) {
                const bufferCanvas = this._buffer.canvas;
                bufferCanvas.width = this.width;
                bufferCanvas.height = this.height;
            }
        }
        /**
         * Updates the visibility of the display canvas.
         */
        updateCanvasVisibility() {
            this.display.canvas.style.display = this.isVisible() ? 'block' : 'none';
        }
        /** @inheritdoc */
        render() {
            var _a;
            return (FSComponent.buildComponent("canvas", { ref: this.displayCanvasRef, class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '', width: '0', height: '0', style: 'position: absolute;' }));
        }
    }

    /**
     * A canvas map layer whose size and position is synced with the map projection window.
     */
    class MapSyncedCanvasLayer extends MapCanvasLayer {
        // eslint-disable-next-line jsdoc/require-jsdoc
        onAttached() {
            super.onAttached();
            this.updateFromProjectedSize(this.props.mapProjection.getProjectedSize());
        }
        /**
         * Updates this layer according to the current size of the projected map window.
         * @param projectedSize The size of the projected map window.
         */
        updateFromProjectedSize(projectedSize) {
            this.setWidth(projectedSize[0]);
            this.setHeight(projectedSize[1]);
            const displayCanvas = this.display.canvas;
            displayCanvas.style.left = '0px';
            displayCanvas.style.top = '0px';
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        onMapProjectionChanged(mapProjection, changeFlags) {
            if (BitFlags.isAll(changeFlags, MapProjectionChangeType.ProjectedSize)) {
                this.updateFromProjectedSize(mapProjection.getProjectedSize());
            }
        }
    }

    /**
     * Implementation of MapCachedCanvasLayerReference.
     */
    class MapCachedCanvasLayerReferenceClass {
        constructor() {
            this._center = new GeoPoint(0, 0);
            this._scaleFactor = 1;
            this._rotation = 0;
        }
        /** @inheritdoc */
        get center() {
            return this._center.readonly;
        }
        /** @inheritdoc */
        get scaleFactor() {
            return this._scaleFactor;
        }
        /** @inheritdoc */
        get rotation() {
            return this._rotation;
        }
        /**
         * Syncs this reference with the current state of a map projection.
         * @param mapProjection The map projection with which to sync.
         */
        syncWithMapProjection(mapProjection) {
            this._center.set(mapProjection.getCenter());
            this._scaleFactor = mapProjection.getScaleFactor();
            this._rotation = mapProjection.getRotation();
        }
        /**
         * Syncs this reference with another reference.
         * @param reference - the reference with which to sync.
         */
        syncWithReference(reference) {
            this._center.set(reference.center);
            this._scaleFactor = reference.scaleFactor;
            this._rotation = reference.rotation;
        }
    }
    /**
     * Implementation of MapCachedCanvasLayerTransform.
     */
    class MapCachedCanvasLayerTransformClass {
        constructor() {
            this._scale = 0;
            this._rotation = 0;
            this._translation = new Float64Array(2);
            this._margin = 0;
            this._marginRemaining = 0;
        }
        /** @inheritdoc */
        get scale() {
            return this._scale;
        }
        /** @inheritdoc */
        get rotation() {
            return this._rotation;
        }
        /** @inheritdoc */
        get translation() {
            return this._translation;
        }
        /** @inheritdoc */
        get margin() {
            return this._margin;
        }
        /** @inheritdoc */
        get marginRemaining() {
            return this._marginRemaining;
        }
        /**
         * Updates this transform given the current map projection and a reference.
         * @param mapProjection The current map projection.
         * @param reference The reference to use.
         * @param referenceMargin The reference margin, in pixels.
         */
        update(mapProjection, reference, referenceMargin) {
            this._scale = mapProjection.getScaleFactor() / reference.scaleFactor;
            this._rotation = mapProjection.getRotation() - reference.rotation;
            mapProjection.project(reference.center, this._translation);
            Vec2Math.sub(this._translation, mapProjection.getCenterProjected(), this._translation);
            this._margin = referenceMargin * this._scale;
            this._marginRemaining = this._margin - Math.max(Math.abs(this._translation[0]), Math.abs(this._translation[1]));
        }
        /**
         * Copies another transform's parameters to this one.
         * @param other The other transform.
         */
        copyFrom(other) {
            this._scale = other.scale;
            this._rotation = other.rotation;
            this._translation.set(other.translation);
            this._margin = other.margin;
        }
    }
    /**
     * An implementation of MapCachedCanvasLayerCanvasInstance.
     */
    class MapCachedCanvasLayerCanvasInstanceClass extends MapCanvasLayerCanvasInstanceClass {
        /**
         * Creates a new canvas instance.
         * @param canvas The canvas element.
         * @param context The canvas 2D rendering context.
         * @param isDisplayed Whether the canvas is displayed.
         * @param getReferenceMargin A function which gets this canvas instance's reference margin, in pixels. The reference
         * margin is the maximum amount of translation allowed without invalidation at a scale factor of 1.
         */
        constructor(canvas, context, isDisplayed, getReferenceMargin) {
            super(canvas, context, isDisplayed);
            this.getReferenceMargin = getReferenceMargin;
            this._reference = new MapCachedCanvasLayerReferenceClass();
            this._transform = new MapCachedCanvasLayerTransformClass();
            this._isInvalid = false;
            this._geoProjection = new MercatorProjection();
        }
        /** @inheritdoc */
        get reference() {
            return this._reference;
        }
        /** @inheritdoc */
        get transform() {
            return this._transform;
        }
        /** @inheritdoc */
        get isInvalid() {
            return this._isInvalid;
        }
        /** @inheritdoc */
        get geoProjection() {
            return this._geoProjection;
        }
        /** @inheritdoc */
        syncWithMapProjection(mapProjection) {
            const projectedCenter = Vec2Math.set(this.canvas.width / 2, this.canvas.height / 2, MapCachedCanvasLayerCanvasInstanceClass.tempVec2_1);
            this._reference.syncWithMapProjection(mapProjection);
            this._geoProjection.copyParametersFrom(mapProjection.getGeoProjection()).setTranslation(projectedCenter);
            this._transform.update(mapProjection, this.reference, this.getReferenceMargin());
            this._isInvalid = false;
            if (this.isDisplayed) {
                this.transformCanvasElement();
            }
        }
        /** @inheritdoc */
        syncWithCanvasInstance(other) {
            this._reference.syncWithReference(other.reference);
            this._geoProjection.copyParametersFrom(other.geoProjection);
            this._transform.copyFrom(other.transform);
            this._isInvalid = other.isInvalid;
            if (this.isDisplayed && !this._isInvalid) {
                this.transformCanvasElement();
            }
        }
        /**
         * Updates this canvas instance's transform given the current map projection.
         * @param mapProjection The current map projection.
         */
        updateTransform(mapProjection) {
            this._transform.update(mapProjection, this.reference, this.getReferenceMargin());
            if (!this._isInvalid) {
                const scaleFactorRatio = mapProjection.getScaleFactor() / this._reference.scaleFactor;
                this._isInvalid = scaleFactorRatio >= MapCachedCanvasLayerCanvasInstanceClass.SCALE_INVALIDATION_THRESHOLD
                    || scaleFactorRatio <= 1 / MapCachedCanvasLayerCanvasInstanceClass.SCALE_INVALIDATION_THRESHOLD
                    || this._transform.marginRemaining < 0;
            }
            if (this.isDisplayed && !this._isInvalid) {
                this.transformCanvasElement();
            }
        }
        /**
         * Transforms this instance's canvas element.
         */
        transformCanvasElement() {
            const transform = this.transform;
            const offsetX = transform.translation[0] / transform.scale;
            const offsetY = transform.translation[1] / transform.scale;
            this.canvas.style.transform = `scale(${transform.scale.toFixed(3)}) translate(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px) rotate(${(transform.rotation * Avionics.Utils.RAD2DEG).toFixed(2)}deg)`;
        }
        /** @inheritdoc */
        invalidate() {
            this._isInvalid = true;
            this.clear();
        }
    }
    MapCachedCanvasLayerCanvasInstanceClass.SCALE_INVALIDATION_THRESHOLD = 1.2;
    MapCachedCanvasLayerCanvasInstanceClass.tempVec2_1 = new Float64Array(2);
    /**
     * A canvas map layer whose image can be cached and transformed as the map projection changes.
     */
    class MapCachedCanvasLayer extends MapCanvasLayer {
        /** @inheritdoc */
        constructor(props) {
            super(props);
            this.size = 0;
            this.referenceMargin = 0;
            this.needUpdateTransforms = false;
            this.props.overdrawFactor = Math.max(1, this.props.overdrawFactor);
        }
        /**
         * Gets the size, in pixels, of this layer's canvas.
         * @returns the size of this layer's canvas.
         */
        getSize() {
            return this.size;
        }
        /**
         * Gets the reference translation margin, in pixels, of this layer's display canvas. This value is the maximum amount
         * the display canvas can be translated in the x or y direction at a scale factor of 1 without invalidation.
         * @returns the reference translation margin of this layer's display canvas.
         */
        getReferenceMargin() {
            return this.referenceMargin;
        }
        /** @inheritdoc */
        onAttached() {
            super.onAttached();
            this.updateFromProjectedSize(this.props.mapProjection.getProjectedSize());
            this.needUpdateTransforms = true;
        }
        /** @inheritdoc */
        createCanvasInstance(canvas, context, isDisplayed) {
            return new MapCachedCanvasLayerCanvasInstanceClass(canvas, context, isDisplayed, this.getReferenceMargin.bind(this));
        }
        /**
         * Updates this layer according to the current size of the projected map window.
         * @param projectedSize The size of the projected map window.
         */
        updateFromProjectedSize(projectedSize) {
            const projectedWidth = projectedSize[0];
            const projectedHeight = projectedSize[1];
            const diag = Math.hypot(projectedWidth, projectedHeight);
            this.size = diag * this.props.overdrawFactor;
            this.referenceMargin = (this.size - diag) / 2;
            this.setWidth(this.size);
            this.setHeight(this.size);
            const posX = (projectedWidth - this.size) / 2;
            const posY = (projectedHeight - this.size) / 2;
            const displayCanvas = this.display.canvas;
            displayCanvas.style.left = `${posX}px`;
            displayCanvas.style.top = `${posY}px`;
        }
        /** @inheritdoc */
        onMapProjectionChanged(mapProjection, changeFlags) {
            if (BitFlags.isAll(changeFlags, MapProjectionChangeType.ProjectedSize)) {
                this.updateFromProjectedSize(mapProjection.getProjectedSize());
                this.display.invalidate();
                this.buffer.invalidate();
            }
            this.needUpdateTransforms = true;
        }
        /** @inheritdoc */
        onUpdated(time, elapsed) {
            super.onUpdated(time, elapsed);
            if (!this.needUpdateTransforms) {
                return;
            }
            this.updateTransforms();
        }
        /**
         * Updates this layer's canvas instances' transforms.
         */
        updateTransforms() {
            const mapProjection = this.props.mapProjection;
            const display = this.display;
            const buffer = this.buffer;
            display.updateTransform(mapProjection);
            buffer.updateTransform(mapProjection);
            this.needUpdateTransforms = false;
        }
    }

    /**
     * A layer which draws an own airplane icon.
     */
    class MapOwnAirplaneLayer extends MapLayer {
        constructor() {
            super(...arguments);
            this.iconImgRef = FSComponent.createRef();
            this.iconOffset = new Float64Array(2);
            this.updateFlags = 0;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/no-unused-vars
        onVisibilityChanged(isVisible) {
            this.scheduleUpdate(MapOwnAirplaneLayer.UPDATE_VISIBILITY);
        }
        /** @inheritdoc */
        onAttached() {
            const ownAirplaneIconModule = this.props.model.getModule('ownAirplaneIcon');
            ownAirplaneIconModule.show.sub(this.onIconShowChanged.bind(this));
            const ownAirplanePropsModule = this.props.model.getModule('ownAirplaneProps');
            ownAirplanePropsModule.position.sub(this.onAirplanePositionChanged.bind(this));
            ownAirplanePropsModule.hdgTrue.sub(this.onAirplaneHeadingChanged.bind(this));
            this.props.iconAnchor.sub(anchor => {
                this.iconOffset.set(anchor);
                Vec2Math.multScalar(this.iconOffset, -this.props.iconSize, this.iconOffset);
                const img = this.iconImgRef.instance;
                img.style.left = `${this.iconOffset[0]}px`;
                img.style.top = `${this.iconOffset[1]}px`;
                img.style.transformOrigin = `${anchor[0] * 100}% ${anchor[1] * 100}%`;
                this.scheduleUpdate(MapOwnAirplaneLayer.UPDATE_VISIBILITY | MapOwnAirplaneLayer.UPDATE_TRANSFORM);
            }, true);
            this.props.imageFilePath.sub(path => {
                this.iconImgRef.instance.src = path;
                this.scheduleUpdate(MapOwnAirplaneLayer.UPDATE_VISIBILITY | MapOwnAirplaneLayer.UPDATE_TRANSFORM);
            }, true);
            this.scheduleUpdate(MapOwnAirplaneLayer.UPDATE_VISIBILITY | MapOwnAirplaneLayer.UPDATE_TRANSFORM);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/no-unused-vars
        onMapProjectionChanged(mapProjection, changeFlags) {
            this.scheduleUpdate(MapOwnAirplaneLayer.UPDATE_TRANSFORM);
        }
        /**
         * Schedules an update.
         * @param updateFlags The types of updates to schedule.
         */
        scheduleUpdate(updateFlags) {
            this.updateFlags = BitFlags.union(this.updateFlags, updateFlags);
        }
        // eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/no-unused-vars
        onUpdated(time, elapsed) {
            if (this.updateFlags === 0) {
                return;
            }
            if (BitFlags.isAll(this.updateFlags, MapOwnAirplaneLayer.UPDATE_VISIBILITY)) {
                this.updateIconVisibility();
            }
            if (BitFlags.isAll(this.updateFlags, MapOwnAirplaneLayer.UPDATE_TRANSFORM)) {
                this.updateIconTransform();
            }
            this.updateFlags = BitFlags.not(this.updateFlags, MapOwnAirplaneLayer.UPDATE_VISIBILITY | MapOwnAirplaneLayer.UPDATE_TRANSFORM);
        }
        /**
         * Updates the airplane icon's visibility.
         */
        updateIconVisibility() {
            const show = this.isVisible() && this.props.model.getModule('ownAirplaneIcon').show.get();
            this.iconImgRef.instance.style.display = show ? 'block' : 'none';
        }
        /**
         * Updates the airplane icon's display transformation.
         */
        updateIconTransform() {
            const ownAirplanePropsModule = this.props.model.getModule('ownAirplaneProps');
            const projected = this.props.mapProjection.project(ownAirplanePropsModule.position.get(), MapOwnAirplaneLayer.tempVec2_1);
            const rotation = ownAirplanePropsModule.hdgTrue.get() + this.props.mapProjection.getRotation() * Avionics.Utils.RAD2DEG;
            this.iconImgRef.instance.style.transform = `translate(${projected[0].toFixed(1)}px, ${projected[1].toFixed(1)}px) rotate(${rotation.toFixed(1)}deg) rotateX(0deg)`;
        }
        /**
         * A callback which is called when the show airplane icon property changes.
         * @param show The new value of the show airplane icon property.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onIconShowChanged(show) {
            this.scheduleUpdate(MapOwnAirplaneLayer.UPDATE_VISIBILITY);
        }
        /**
         * A callback which is called when the airplane's position changes.
         * @param pos The new position of the airplane.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onAirplanePositionChanged(pos) {
            this.scheduleUpdate(MapOwnAirplaneLayer.UPDATE_TRANSFORM);
        }
        /**
         * A callback which is called when the airplane's true heading changes.
         * @param hdgTrue - the new true heading of the airplane.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onAirplaneHeadingChanged(hdgTrue) {
            this.scheduleUpdate(MapOwnAirplaneLayer.UPDATE_TRANSFORM);
        }
        /** @inheritdoc */
        render() {
            var _a;
            return (FSComponent.buildComponent("img", { ref: this.iconImgRef, class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '', src: this.props.imageFilePath, style: `position: absolute; width: ${this.props.iconSize}px; height: ${this.props.iconSize}px; transform: rotateX(0deg);` }));
        }
    }
    MapOwnAirplaneLayer.UPDATE_VISIBILITY = 1;
    MapOwnAirplaneLayer.UPDATE_TRANSFORM = 1 << 1;
    MapOwnAirplaneLayer.tempVec2_1 = new Float64Array(2);

    /**
     * A layer which draws airspaces.
     */
    class MapAirspaceLayer extends MapLayer {
        constructor() {
            var _a, _b;
            super(...arguments);
            this.canvasLayerRef = FSComponent.createRef();
            this.clipBoundsSub = VecNSubject.createFromVector(new Float64Array(4));
            this.facLoader = new FacilityLoader(FacilityRepository.getRepository(this.props.bus), async () => {
                this.searchSession = new NearestLodBoundarySearchSession(this.props.lodBoundaryCache, await this.facLoader.startNearestSearchSession(FacilitySearchType.Boundary), 0.5);
                this.isAttached && this.scheduleSearch(0, true);
            });
            this.searchedAirspaces = new Map();
            this.searchDebounceDelay = (_a = this.props.searchDebounceDelay) !== null && _a !== void 0 ? _a : MapAirspaceLayer.DEFAULT_SEARCH_DEBOUNCE_DELAY;
            this.renderTimeBudget = (_b = this.props.renderTimeBudget) !== null && _b !== void 0 ? _b : MapAirspaceLayer.DEFAULT_RENDER_TIME_BUDGET;
            this.activeRenderProcess = null;
            this.renderTaskQueueHandler = {
                renderTimeBudget: this.renderTimeBudget,
                // eslint-disable-next-line jsdoc/require-jsdoc
                onStarted() {
                    // noop
                },
                // eslint-disable-next-line jsdoc/require-jsdoc
                canContinue(elapsedFrameCount, dispatchedTaskCount, timeElapsed) {
                    return timeElapsed < this.renderTimeBudget;
                },
                // eslint-disable-next-line jsdoc/require-jsdoc
                onPaused: this.onRenderPaused.bind(this),
                // eslint-disable-next-line jsdoc/require-jsdoc
                onFinished: this.onRenderFinished.bind(this),
                // eslint-disable-next-line jsdoc/require-jsdoc
                onAborted: this.onRenderAborted.bind(this)
            };
            this.searchDebounceTimer = 0;
            this.isSearchScheduled = false;
            this.needRefilter = false;
            this.isSearchBusy = false;
            this.lastDesiredSearchRadius = 0; // meters
            this.lastSearchRadius = 0; // meters
            this.isRenderScheduled = false;
            this.isBackgroundRenderScheduled = false;
            this.isDisplayInvalidated = true;
            this.isAttached = false;
        }
        /** @inheritdoc */
        onAttached() {
            this.canvasLayerRef.instance.onAttached();
            this.updateClipBounds();
            this.clippedPathStream = new ClippedPathStream(this.canvasLayerRef.instance.buffer.context, this.clipBoundsSub);
            this.props.maxSearchRadius.sub(radius => {
                const radiusMeters = radius.asUnit(UnitType.METER);
                if (radiusMeters < this.lastSearchRadius || radiusMeters > this.lastDesiredSearchRadius) {
                    this.scheduleSearch(0, false);
                }
            });
            this.props.maxSearchItemCount.sub(() => { this.scheduleSearch(0, false); });
            this.initModuleListeners();
            this.isAttached = true;
            this.searchSession && this.scheduleSearch(0, true);
        }
        /**
         * Initializes this layer's airspace module property listeners.
         */
        initModuleListeners() {
            const airspaceModule = this.props.model.getModule('airspace');
            for (const type of Object.values(airspaceModule.show)) {
                type.sub(this.onAirspaceTypeShowChanged.bind(this));
            }
        }
        /** @inheritdoc */
        onMapProjectionChanged(mapProjection, changeFlags) {
            this.canvasLayerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
            if (BitFlags.isAll(changeFlags, MapProjectionChangeType.ProjectedSize)) {
                this.updateClipBounds();
            }
        }
        /**
         * Updates this layer's canvas clipping bounds.
         */
        updateClipBounds() {
            const size = this.canvasLayerRef.instance.getSize();
            this.clipBoundsSub.set(-MapAirspaceLayer.CLIP_BOUNDS_BUFFER, -MapAirspaceLayer.CLIP_BOUNDS_BUFFER, size + MapAirspaceLayer.CLIP_BOUNDS_BUFFER, size + MapAirspaceLayer.CLIP_BOUNDS_BUFFER);
        }
        /**
         * Schedules a search. If a search was previously scheduled but not yet executed, this new scheduled search will
         * replace the old one.
         * @param delay The delay, in milliseconds, before the search is executed.
         * @param refilter Whether to update the search's boundary class filter.
         */
        scheduleSearch(delay, refilter) {
            if (!this.searchSession) {
                return;
            }
            this.searchDebounceTimer = delay;
            this.isSearchScheduled = true;
            this.needRefilter || (this.needRefilter = refilter);
        }
        /**
         * Schedules a render to be executed during the next update cycle.
         */
        scheduleRender() {
            this.isRenderScheduled = true;
        }
        /**
         * Searches for airspaces around the map center. After the search is complete, the list of search results is filtered
         * and, if necessary, rendered.
         * @param refilter Whether to update the search's boundary class filter.
         */
        async searchAirspaces(refilter) {
            this.isSearchBusy = true;
            const center = this.props.mapProjection.getCenter();
            const drawableDiag = this.canvasLayerRef.instance.display.canvas.width * Math.SQRT2;
            this.lastDesiredSearchRadius = UnitType.GA_RADIAN.convertTo(this.props.mapProjection.getProjectedResolution() * drawableDiag / 2, UnitType.METER);
            this.lastSearchRadius = Math.min(this.props.maxSearchRadius.get().asUnit(UnitType.METER), this.lastDesiredSearchRadius);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const session = this.searchSession;
            refilter && session.setFilter(this.getBoundaryFilter());
            const results = await session.searchNearest(center.lat, center.lon, this.lastSearchRadius, this.props.maxSearchItemCount.get());
            for (let i = 0; i < results.added.length; i++) {
                const airspace = results.added[i];
                this.searchedAirspaces.set(airspace.facility.id, airspace);
            }
            for (let i = 0; i < results.removed.length; i++) {
                this.searchedAirspaces.delete(results.removed[i]);
            }
            this.isSearchBusy = false;
            this.scheduleRender();
        }
        /**
         * Gets the boundary class filter based on the current airspace type visibility settings.
         * @returns The boundary class filter based on the current airspace type visibility settings.
         */
        getBoundaryFilter() {
            const module = this.props.model.getModule('airspace');
            const show = module.show;
            let filter = 0;
            for (const type in show) {
                if (show[type].get()) {
                    filter |= module.showTypes[type];
                }
            }
            return filter;
        }
        // eslint-disable-next-line jsdoc/require-jsdoc
        onUpdated(time, elapsed) {
            this.canvasLayerRef.instance.onUpdated(time, elapsed);
            this.updateFromInvalidation();
            this.updateScheduledRender();
            this.updateScheduledSearch(elapsed);
        }
        /**
         * Checks if the display and buffer canvases have been invalidated, and if so, clears them and schedules a render.
         */
        updateFromInvalidation() {
            const canvasLayer = this.canvasLayerRef.instance;
            const display = canvasLayer.display;
            const buffer = canvasLayer.buffer;
            const needBackgroundRender = !this.isBackgroundRenderScheduled
                && !this.activeRenderProcess
                && (display.transform.marginRemaining / display.transform.margin <= MapAirspaceLayer.BACKGROUND_RENDER_MARGIN_THRESHOLD);
            const shouldScheduleSearch = needBackgroundRender
                || display.isInvalid
                || (buffer.isInvalid && this.activeRenderProcess);
            this.isBackgroundRenderScheduled || (this.isBackgroundRenderScheduled = needBackgroundRender);
            if (display.isInvalid) {
                this.isDisplayInvalidated = true;
                this.isBackgroundRenderScheduled = false;
                display.clear();
                display.syncWithMapProjection(this.props.mapProjection);
            }
            if (buffer.isInvalid) {
                if (this.activeRenderProcess) {
                    this.activeRenderProcess.abort();
                    this.cleanUpRender();
                }
                buffer.clear();
                buffer.syncWithMapProjection(this.props.mapProjection);
            }
            if (shouldScheduleSearch) {
                this.scheduleSearch(this.searchDebounceDelay, false);
            }
        }
        /**
         * If a search is scheduled, decrements the delay timer and if necessary, executes the search.
         * @param elapsed The time elapsed, in milliseconds, since the last update.
         */
        updateScheduledSearch(elapsed) {
            if (!this.isSearchScheduled) {
                return;
            }
            this.searchDebounceTimer = Math.max(0, this.searchDebounceTimer - elapsed);
            if (this.searchDebounceTimer === 0 && !this.isSearchBusy) {
                this.searchAirspaces(this.needRefilter);
                this.isSearchScheduled = false;
                this.needRefilter = false;
            }
        }
        /**
         * Executes a render if one is scheduled.
         */
        updateScheduledRender() {
            if (!this.isRenderScheduled) {
                return;
            }
            this.startRenderProcess();
            this.isRenderScheduled = false;
            this.isBackgroundRenderScheduled = false;
        }
        /**
         * Syncs this layer's display canvas instance with the current map projection and renders this layer's airspaces to
         * the display.
         */
        startRenderProcess() {
            const canvasLayer = this.canvasLayerRef.instance;
            if (this.activeRenderProcess) {
                this.activeRenderProcess.abort();
            }
            const buffer = canvasLayer.buffer;
            buffer.clear();
            buffer.syncWithMapProjection(this.props.mapProjection);
            this.props.airspaceRenderManager.clearRegisteredAirspaces();
            for (const airspace of this.searchedAirspaces.values()) {
                if (this.isAirspaceInBounds(airspace, buffer)) {
                    this.props.airspaceRenderManager.registerAirspace(airspace);
                }
            }
            const lod = this.selectLod(this.props.mapProjection.getProjectedResolution());
            this.activeRenderProcess = this.props.airspaceRenderManager.prepareRenderProcess(buffer.geoProjection, buffer.context, this.renderTaskQueueHandler, lod, this.clippedPathStream);
            this.activeRenderProcess.start();
        }
        /**
         * Checks whether an airspace is within the projected bounds of a cached canvas instance.
         * @param airspace An airspace.
         * @param canvas A cached canvas instance.
         * @returns Whether the airspace is within the projected bounds of the cached canvas instance.
         */
        isAirspaceInBounds(airspace, canvas) {
            const corner = MapAirspaceLayer.geoPointCache[0];
            const cornerProjected = MapAirspaceLayer.vec2Cache[0];
            let minX, maxX, minY, maxY;
            canvas.geoProjection.project(corner.set(airspace.facility.topLeft.lat, airspace.facility.topLeft.long), cornerProjected);
            minX = maxX = cornerProjected[0];
            minY = maxY = cornerProjected[1];
            canvas.geoProjection.project(corner.set(airspace.facility.topLeft.lat, airspace.facility.bottomRight.long), cornerProjected);
            minX = Math.min(minX, cornerProjected[0]);
            maxX = Math.max(maxX, cornerProjected[0]);
            minY = Math.min(minY, cornerProjected[1]);
            maxY = Math.max(maxY, cornerProjected[1]);
            canvas.geoProjection.project(corner.set(airspace.facility.bottomRight.lat, airspace.facility.bottomRight.long), cornerProjected);
            minX = Math.min(minX, cornerProjected[0]);
            maxX = Math.max(maxX, cornerProjected[0]);
            minY = Math.min(minY, cornerProjected[1]);
            maxY = Math.max(maxY, cornerProjected[1]);
            canvas.geoProjection.project(corner.set(airspace.facility.bottomRight.lat, airspace.facility.topLeft.long), cornerProjected);
            minX = Math.min(minX, cornerProjected[0]);
            maxX = Math.max(maxX, cornerProjected[0]);
            minY = Math.min(minY, cornerProjected[1]);
            maxY = Math.max(maxY, cornerProjected[1]);
            const width = canvas.canvas.width;
            const height = canvas.canvas.height;
            return minX < width
                && maxX > 0
                && minY < height
                && maxY > 0;
        }
        /**
         * Selects an LOD level based on projected map resolution.
         * @param resolution A projected map resolution, in great-arc radians per pixel.
         * @returns An LOD level based on the projected map resolution.
         */
        selectLod(resolution) {
            const thresholds = this.props.lodBoundaryCache.lodDistanceThresholds;
            let i = thresholds.length - 1;
            while (i >= 0) {
                if (resolution * 2 >= thresholds[i]) {
                    break;
                }
                i--;
            }
            return i;
        }
        /**
         * Cleans up the active render process.
         */
        cleanUpRender() {
            this.canvasLayerRef.instance.buffer.reset();
            this.activeRenderProcess = null;
        }
        /**
         * Renders airspaces from the buffer to the display.
         */
        renderAirspacesToDisplay() {
            const display = this.canvasLayerRef.instance.display;
            const buffer = this.canvasLayerRef.instance.buffer;
            display.clear();
            display.syncWithCanvasInstance(buffer);
            this.canvasLayerRef.instance.copyBufferToDisplay();
        }
        /**
         * This method is called when the airspace render process pauses.
         */
        onRenderPaused() {
            if (this.isDisplayInvalidated) {
                this.renderAirspacesToDisplay();
            }
        }
        /**
         * This method is called when the airspace render process finishes.
         */
        onRenderFinished() {
            this.renderAirspacesToDisplay();
            this.cleanUpRender();
            this.isDisplayInvalidated = false;
        }
        /**
         * This method is called when the airspace render process is aborted.
         */
        onRenderAborted() {
            this.cleanUpRender();
        }
        /**
         * This method is called when an airspace show property changes.
         */
        onAirspaceTypeShowChanged() {
            this.scheduleSearch(0, true);
        }
        /** @inheritdoc */
        render() {
            return (FSComponent.buildComponent(MapCachedCanvasLayer, { ref: this.canvasLayerRef, model: this.props.model, mapProjection: this.props.mapProjection, useBuffer: true, overdrawFactor: Math.SQRT2 }));
        }
    }
    MapAirspaceLayer.DEFAULT_SEARCH_DEBOUNCE_DELAY = 500; // milliseconds
    MapAirspaceLayer.DEFAULT_RENDER_TIME_BUDGET = 0.2; // milliseconds per frame
    MapAirspaceLayer.BACKGROUND_RENDER_MARGIN_THRESHOLD = 0.1; // relative to total margin
    MapAirspaceLayer.CLIP_BOUNDS_BUFFER = 10; // number of pixels from edge of canvas to extend the clipping bounds, in pixels
    MapAirspaceLayer.geoPointCache = [new GeoPoint(0, 0)];
    MapAirspaceLayer.vec2Cache = [new Float64Array(2)];

    /**
     * An abstract implementation of a map layer which displays waypoints (airports, navaids, and intersections) within a
     * search radius.
     */
    class MapNearestWaypointsLayer extends MapLayer {
        constructor() {
            var _a;
            super(...arguments);
            this.canvasLayerRef = FSComponent.createRef();
            this.searchDebounceDelay = (_a = this.props.searchDebounceDelay) !== null && _a !== void 0 ? _a : 500;
            this.facLoader = new FacilityLoader(FacilityRepository.getRepository(this.props.bus), this.onFacilityLoaderInitialized.bind(this));
            this.searchRadius = 0;
            this.searchMargin = 0;
            this.icaosToShow = new Set();
            this.isInit = false;
        }
        /**
         * A callback called when the facility loaded finishes initialization.
         */
        onFacilityLoaderInitialized() {
            Promise.all([
                this.facLoader.startNearestSearchSession(FacilitySearchType.Airport),
                this.facLoader.startNearestSearchSession(FacilitySearchType.Vor),
                this.facLoader.startNearestSearchSession(FacilitySearchType.Ndb),
                this.facLoader.startNearestSearchSession(FacilitySearchType.Intersection),
                this.facLoader.startNearestSearchSession(FacilitySearchType.User)
            ]).then((value) => {
                const [airportSession, vorSession, ndbSession, intSession, userSession] = value;
                this.onSessionsStarted(airportSession, vorSession, ndbSession, intSession, userSession);
            });
        }
        /**
         * A callback called when the nearest facility search sessions have been started.
         * @param airportSession The airport search session.
         * @param vorSession The VOR search session.
         * @param ndbSession The NDB search session.
         * @param intSession The intersection search session.
         * @param userSession The user facility search session.
         */
        onSessionsStarted(airportSession, vorSession, ndbSession, intSession, userSession) {
            const callback = this.processSearchResults.bind(this);
            this.facilitySearches = {
                [FacilitySearchType.Airport]: new MapNearestWaypointsLayerSearch(airportSession, callback),
                [FacilitySearchType.Vor]: new MapNearestWaypointsLayerSearch(vorSession, callback),
                [FacilitySearchType.Ndb]: new MapNearestWaypointsLayerSearch(ndbSession, callback),
                [FacilitySearchType.Intersection]: new MapNearestWaypointsLayerSearch(intSession, callback),
                [FacilitySearchType.User]: new MapNearestWaypointsLayerSearch(userSession, callback)
            };
            this.props.onSessionsStarted && this.props.onSessionsStarted(airportSession, vorSession, ndbSession, intSession, userSession);
            if (this.isInit) {
                this._tryRefreshAllSearches(this.getSearchCenter(), this.searchRadius);
            }
        }
        /** @inheritdoc */
        onAttached() {
            super.onAttached();
            this.canvasLayerRef.instance.onAttached();
            this.doInit();
            this.isInit = true;
            this._tryRefreshAllSearches(this.getSearchCenter(), this.searchRadius);
        }
        /**
         * Initializes this layer.
         */
        doInit() {
            this.initWaypointRenderer();
            this.updateSearchRadius();
        }
        /**
         * Gets the search center for the waypoint searches on this layer.
         * @returns The waypoint search center geo point.
         */
        getSearchCenter() {
            return this.props.getSearchCenter ? this.props.getSearchCenter(this.props.mapProjection) : this.props.mapProjection.getCenter();
        }
        /**
         * Initializes this layer's waypoint renderer.
         */
        initWaypointRenderer() {
            this.props.initRenderer && this.props.initRenderer(this.props.waypointRenderer, this.canvasLayerRef.instance);
        }
        /** @inheritdoc */
        onMapProjectionChanged(mapProjection, changeFlags) {
            super.onMapProjectionChanged(mapProjection, changeFlags);
            this.canvasLayerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
            if (BitFlags.isAny(changeFlags, MapProjectionChangeType.Range | MapProjectionChangeType.RangeEndpoints | MapProjectionChangeType.ProjectedSize)) {
                this.updateSearchRadius();
                this._tryRefreshAllSearches(this.getSearchCenter(), this.searchRadius);
            }
            else if (BitFlags.isAll(changeFlags, MapProjectionChangeType.Center)) {
                this._tryRefreshAllSearches(this.getSearchCenter(), this.searchRadius);
            }
        }
        /**
         * Updates the desired nearest facility search radius based on the current map projection.
         */
        updateSearchRadius() {
            const mapHalfDiagRange = Vec2Math.abs(this.props.mapProjection.getProjectedSize()) * this.props.mapProjection.getProjectedResolution() / 2;
            this.searchRadius = mapHalfDiagRange * MapNearestWaypointsLayer.SEARCH_RADIUS_OVERDRAW_FACTOR;
            this.searchMargin = mapHalfDiagRange * (MapNearestWaypointsLayer.SEARCH_RADIUS_OVERDRAW_FACTOR - 1);
        }
        /** @inheritdoc */
        onUpdated(time, elapsed) {
            this.updateSearches(elapsed);
        }
        /**
         * Updates this layer's facility searches.
         * @param elapsed The elapsed time, in milliseconds, since the last update.
         */
        updateSearches(elapsed) {
            if (!this.facilitySearches) {
                return;
            }
            this.facilitySearches[FacilitySearchType.Airport].update(elapsed);
            this.facilitySearches[FacilitySearchType.Vor].update(elapsed);
            this.facilitySearches[FacilitySearchType.Ndb].update(elapsed);
            this.facilitySearches[FacilitySearchType.Intersection].update(elapsed);
            this.facilitySearches[FacilitySearchType.User].update(elapsed);
        }
        /**
         * Attempts to refresh all of the nearest facility searches. Searches will only be refreshed if the desired search
         * radius is different from the last refreshed search radius or the desired search center is outside of the margin
         * of the last refreshed search center.
         * @param center The center of the search area. Defaults to this layer's automatically calculated search center.
         * @param radius The radius of the search area, in great-arc radians. Defaults to this layer's automatically
         * calculated search radius.
         */
        tryRefreshAllSearches(center, radius) {
            center !== null && center !== void 0 ? center : (center = this.getSearchCenter());
            radius !== null && radius !== void 0 ? radius : (radius = this.searchRadius);
            this._tryRefreshAllSearches(center, radius);
        }
        /**
         * Attempts to refresh a nearest search. The search will only be refreshed if the desired search radius is different
         * from the last refreshed search radius or the desired search center is outside of the margin of the last refreshed
         * search center.
         * @param type The type of nearest search to refresh.
         * @param center The center of the search area. Defaults to this layer's automatically calculated search center.
         * @param radius The radius of the search area, in great-arc radians. Defaults to this layer's automatically
         * calculated search radius.
         */
        tryRefreshSearch(type, center, radius) {
            center !== null && center !== void 0 ? center : (center = this.getSearchCenter());
            radius !== null && radius !== void 0 ? radius : (radius = this.searchRadius);
            this._tryRefreshSearch(type, center, radius);
        }
        /**
         * Attempts to refresh all of the nearest facility searches.
         * @param center The center of the search area.
         * @param radius The radius of the search area, in great-arc radians.
         */
        _tryRefreshAllSearches(center, radius) {
            this._tryRefreshSearch(FacilitySearchType.Airport, center, radius);
            this._tryRefreshSearch(FacilitySearchType.Vor, center, radius);
            this._tryRefreshSearch(FacilitySearchType.Ndb, center, radius);
            this._tryRefreshSearch(FacilitySearchType.Intersection, center, radius);
            this._tryRefreshSearch(FacilitySearchType.User, center, radius);
        }
        /**
         * Attempts to refresh a nearest search. The search will only be refreshed if `this.shouldRefreshSearch()` returns
         * true and and the desired search radius is different from the last refreshed search radius or the desired search
         * center is outside of the margin of the last refreshed search center.
         * @param type The type of nearest search to refresh.
         * @param center The center of the search area.
         * @param radius The radius of the search area, in great-arc radians.
         */
        _tryRefreshSearch(type, center, radius) {
            const search = this.facilitySearches && this.facilitySearches[type];
            if (!search || !this.shouldRefreshSearch(type, center, radius)) {
                return;
            }
            if (search.lastRadius !== radius || search.lastCenter.distance(center) >= this.searchMargin) {
                this.scheduleSearchRefresh(type, search, center, radius);
            }
        }
        /**
         * Checks whether one of this layer's searches should be refreshed.
         * @param type The type of nearest search to refresh.
         * @param center The center of the search area.
         * @param radius The radius of the search area, in great-arc radians.
         * @returns Whether the search should be refreshed.
         */
        shouldRefreshSearch(type, center, radius) {
            return this.props.shouldRefreshSearch ? this.props.shouldRefreshSearch(type, center, radius) : true;
        }
        /**
         * Schedules a refresh of this one of this layer's searches.
         * @param type The type of nearest search to refresh.
         * @param search The search to refresh.
         * @param center The center of the search area.
         * @param radius The radius of the search area, in great-arc radians.
         */
        scheduleSearchRefresh(type, search, center, radius) {
            const itemLimit = this.props.searchItemLimit ? this.props.searchItemLimit(type, center, radius) : 100;
            const radiusLimit = this.props.searchRadiusLimit ? this.props.searchRadiusLimit(type, center, radius) : undefined;
            if (radiusLimit !== undefined && isFinite(radiusLimit)) {
                radius = Math.min(radius, Math.max(0, radiusLimit));
            }
            search.scheduleRefresh(center, radius, itemLimit, this.searchDebounceDelay);
        }
        /**
         * Processes nearest facility search results. New facilities are registered, while removed facilities are
         * deregistered.
         * @param results Nearest facility search results.
         */
        processSearchResults(results) {
            if (!results) {
                return;
            }
            const numAdded = results.added.length;
            for (let i = 0; i < numAdded; i++) {
                const icao = results.added[i];
                if (icao === undefined || icao === ICAO.emptyIcao) {
                    continue;
                }
                this.registerIcao(icao);
            }
            const numRemoved = results.removed.length;
            for (let i = 0; i < numRemoved; i++) {
                const icao = results.removed[i];
                if (icao === undefined || icao === ICAO.emptyIcao) {
                    continue;
                }
                this.deregisterIcao(icao);
            }
        }
        /**
         * Registers an ICAO string with this layer. Once an ICAO is registered, its corresponding facility is drawn to this
         * layer using a waypoint renderer.
         * @param icao The ICAO string to register.
         */
        registerIcao(icao) {
            this.icaosToShow.add(icao);
            this.facLoader.getFacility(ICAO.getFacilityType(icao), icao).then(facility => {
                if (!this.icaosToShow.has(icao)) {
                    return;
                }
                this.registerWaypointWithRenderer(this.props.waypointRenderer, facility);
            });
        }
        /**
         * Registers a facility with this layer's waypoint renderer.
         * @param renderer This layer's waypoint renderer.
         * @param facility The facility to register.
         */
        registerWaypointWithRenderer(renderer, facility) {
            const waypoint = this.props.waypointForFacility(facility);
            this.props.registerWaypoint(waypoint, renderer);
        }
        /**
         * Deregisters an ICAO string from this layer.
         * @param icao The ICAO string to deregister.
         */
        deregisterIcao(icao) {
            this.icaosToShow.delete(icao);
            this.facLoader.getFacility(ICAO.getFacilityType(icao), icao).then(facility => {
                if (this.icaosToShow.has(icao)) {
                    return;
                }
                this.deregisterWaypointWithRenderer(this.props.waypointRenderer, facility);
            });
        }
        /**
         * Deregisters a facility from this layer's waypoint renderer.
         * @param renderer This layer's waypoint renderer.
         * @param facility The facility to deregister.
         */
        deregisterWaypointWithRenderer(renderer, facility) {
            const waypoint = this.props.waypointForFacility(facility);
            this.props.deregisterWaypoint(waypoint, renderer);
        }
        /** @inheritdoc */
        render() {
            return (FSComponent.buildComponent(MapSyncedCanvasLayer, { ref: this.canvasLayerRef, model: this.props.model, mapProjection: this.props.mapProjection }));
        }
    }
    MapNearestWaypointsLayer.SEARCH_RADIUS_OVERDRAW_FACTOR = Math.SQRT2;
    /**
     * A nearest facility search for MapAbstractNearestWaypointsLayer.
     */
    class MapNearestWaypointsLayerSearch {
        /**
         * Constructor.
         * @param session The session used by this search.
         * @param refreshCallback A callback which is called every time the search refreshes.
         */
        constructor(session, refreshCallback) {
            this.session = session;
            this.refreshCallback = refreshCallback;
            this._lastCenter = new GeoPoint(0, 0);
            this._lastRadius = 0;
            this.maxItemCount = 0;
            this.refreshDebounceTimer = 0;
            this.isRefreshScheduled = false;
        }
        // eslint-disable-next-line jsdoc/require-returns
        /**
         * The center of this search's last refresh.
         */
        get lastCenter() {
            return this._lastCenter.readonly;
        }
        // eslint-disable-next-line jsdoc/require-returns
        /**
         * The radius of this search's last refresh, in great-arc radians.
         */
        get lastRadius() {
            return this._lastRadius;
        }
        /**
         * Schedules a refresh of this search.  If a refresh was previously scheduled but not yet executed, this new
         * scheduled refresh will replace the old one.
         * @param center The center of the search area.
         * @param radius The radius of the search area, in great-arc radians.
         * @param maxItemCount The maximum number of results returned by the refresh.
         * @param delay The delay, in milliseconds, before the refresh is executed.
         */
        scheduleRefresh(center, radius, maxItemCount, delay) {
            this._lastCenter.set(center);
            this._lastRadius = radius;
            this.maxItemCount = maxItemCount;
            this.refreshDebounceTimer = delay;
            this.isRefreshScheduled = true;
        }
        /**
         * Updates this search. Executes any pending refreshes if their delay timers have expired.
         * @param elapsed The elapsed time, in milliseconds, since the last update.
         */
        update(elapsed) {
            if (!this.isRefreshScheduled) {
                return;
            }
            this.refreshDebounceTimer = Math.max(0, this.refreshDebounceTimer - elapsed);
            if (this.refreshDebounceTimer === 0) {
                this.refresh();
                this.isRefreshScheduled = false;
            }
        }
        /**
         * Refreshes this search.
         * @returns a Promise which is fulfilled when the refresh completes.
         */
        async refresh() {
            const results = await this.session.searchNearest(this._lastCenter.lat, this._lastCenter.lon, UnitType.GA_RADIAN.convertTo(this._lastRadius, UnitType.METER), this.maxItemCount);
            this.refreshCallback(results);
        }
    }

    /**
     * A map layer that draws a line between two points. The line is drawn in projected coordinate space, so it will always
     * be straight on the projected map.
     */
    class MapLineLayer extends MapSyncedCanvasLayer {
        constructor() {
            var _a, _b, _c, _d, _e, _f;
            super(...arguments);
            this.strokeWidth = (_a = this.props.strokeWidth) !== null && _a !== void 0 ? _a : MapLineLayer.DEFAULT_STROKE_WIDTH;
            this.strokeStyle = (_b = this.props.strokeStyle) !== null && _b !== void 0 ? _b : MapLineLayer.DEFAULT_STROKE_STYLE;
            this.strokeDash = (_c = this.props.strokeDash) !== null && _c !== void 0 ? _c : MapLineLayer.DEFAULT_STROKE_DASH;
            this.outlineWidth = (_d = this.props.outlineWidth) !== null && _d !== void 0 ? _d : MapLineLayer.DEFAULT_OUTLINE_WIDTH;
            this.outlineStyle = (_e = this.props.outlineStyle) !== null && _e !== void 0 ? _e : MapLineLayer.DEFAULT_OUTLINE_STYLE;
            this.outlineDash = (_f = this.props.outlineDash) !== null && _f !== void 0 ? _f : MapLineLayer.DEFAULT_OUTLINE_DASH;
            this.vec = new Float64Array([0, 0]);
            this.isUpdateScheduled = false;
        }
        /** @inheritdoc */
        onAttached() {
            super.onAttached();
            this.props.start.sub(() => { this.scheduleUpdate(); });
            this.props.end.sub(() => { this.scheduleUpdate(); });
            this.scheduleUpdate();
        }
        /** @inheritdoc */
        onMapProjectionChanged(mapProjection, changeFlags) {
            super.onMapProjectionChanged(mapProjection, changeFlags);
            this.scheduleUpdate();
        }
        /**
         * Schedules the layer for a draw update.
         */
        scheduleUpdate() {
            this.isUpdateScheduled = true;
        }
        /** @inheritdoc */
        onUpdated(time, elapsed) {
            super.onUpdated(time, elapsed);
            if (this.isUpdateScheduled) {
                this.display.clear();
                const start = this.props.start.get();
                const end = this.props.end.get();
                if (start !== null && end !== null) {
                    const [x1, y1] = start instanceof Float64Array ? start : this.props.mapProjection.project(start, this.vec);
                    const [x2, y2] = end instanceof Float64Array ? end : this.props.mapProjection.project(end, this.vec);
                    this.drawLine(x1, y1, x2, y2);
                }
                this.isUpdateScheduled = false;
            }
        }
        /**
         * Draws this layer's line.
         * @param x1 The x coordinate of the start of the line.
         * @param y1 The y coordinate of the start of the line.
         * @param x2 The x coordinate of the end of the line.
         * @param y2 The y coordinate of the end of the line.
         */
        drawLine(x1, y1, x2, y2) {
            const context = this.display.context;
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            if (this.outlineWidth > 0) {
                this.stroke(context, this.strokeWidth + this.outlineWidth * 2, this.outlineStyle, this.outlineDash);
            }
            if (this.strokeWidth > 0) {
                this.stroke(context, this.strokeWidth, this.strokeStyle, this.strokeDash);
            }
        }
        /**
         * Applies a stroke to a canvas rendering context.
         * @param context A canvas rendering context.
         * @param width The width of the stroke, in pixels.
         * @param style The style of the stroke.
         * @param dash The dash array of the stroke.
         */
        stroke(context, width, style, dash) {
            context.lineWidth = width;
            context.strokeStyle = style;
            context.setLineDash(dash);
            context.stroke();
        }
    }
    MapLineLayer.DEFAULT_STROKE_WIDTH = 2; // px
    MapLineLayer.DEFAULT_STROKE_STYLE = 'white';
    MapLineLayer.DEFAULT_STROKE_DASH = [];
    MapLineLayer.DEFAULT_OUTLINE_WIDTH = 0; // px
    MapLineLayer.DEFAULT_OUTLINE_STYLE = 'black';
    MapLineLayer.DEFAULT_OUTLINE_DASH = [];

    /**
     * A collection of common keys used by the MapSystem API.
     */
    class MapSystemKeys {
    }
    MapSystemKeys.TargetControl = 'targetControlModerator';
    MapSystemKeys.RotationControl = 'rotationControlModerator';
    MapSystemKeys.RangeControl = 'rangeControlModerator';
    MapSystemKeys.ClockUpdate = 'clockUpdate';
    MapSystemKeys.OwnAirplaneProps = 'ownAirplaneProps';
    MapSystemKeys.AutopilotProps = 'autopilotProps';
    MapSystemKeys.TerrainColors = 'terrainColors';
    MapSystemKeys.Weather = 'weather';
    MapSystemKeys.FollowAirplane = 'followAirplane';
    MapSystemKeys.Rotation = 'rotation';
    MapSystemKeys.OwnAirplaneIcon = 'ownAirplaneIcon';
    MapSystemKeys.TextLayer = 'text';
    MapSystemKeys.TextManager = 'textManager';
    MapSystemKeys.Bing = 'bing';
    MapSystemKeys.WaypointRenderer = 'waypointRenderer';
    MapSystemKeys.IconFactory = 'iconFactory';
    MapSystemKeys.LabelFactory = 'labelFactory';
    MapSystemKeys.NearestWaypoints = 'nearestWaypoints';
    MapSystemKeys.FlightPlan = 'flightPlan';
    MapSystemKeys.FlightPlanner = 'flightPlanner';
    MapSystemKeys.FlightPathRenderer = 'flightPathRenderer';
    MapSystemKeys.Airspace = 'airspace';
    MapSystemKeys.AirspaceManager = 'airspaceRenderManager';
    MapSystemKeys.Traffic = 'traffic';
    MapSystemKeys.DataIntegrity = 'dataIntegrity';

    /**
     * An enumeration of possible map rotation types.
     */
    var MapRotation;
    (function (MapRotation) {
        /** Map rotation points towards north up. */
        MapRotation["NorthUp"] = "NorthUp";
        /** Map up position points towards the current airplane track. */
        MapRotation["TrackUp"] = "TrackUp";
        /** Map up position points towards the current airplane heading. */
        MapRotation["HeadingUp"] = "HeadingUp";
        /** Map up position points towards the current nav desired track. */
        MapRotation["DtkUp"] = "DtkUp";
    })(MapRotation || (MapRotation = {}));

    /**
     * Waypoint roles used by the map system waypoint display system.
     */
    var MapSystemWaypointRoles;
    (function (MapSystemWaypointRoles) {
        /** The normal waypoint display role. */
        MapSystemWaypointRoles["Normal"] = "Normal";
        /** The waypoint role for displaying waypoints along the flight plan. */
        MapSystemWaypointRoles["FlightPlan"] = "FlightPlan";
    })(MapSystemWaypointRoles || (MapSystemWaypointRoles = {}));

    /**
     * A map system layer that draws the flight plan.
     */
    class MapSystemFlightPlanLayer extends MapLayer {
        constructor() {
            var _a;
            super(...arguments);
            this.flightPathLayerRef = FSComponent.createRef();
            this.waypointLayerRef = FSComponent.createRef();
            this.defaultRoleId = (_a = this.props.waypointRenderer.getRoleFromName(MapSystemWaypointRoles.FlightPlan)) !== null && _a !== void 0 ? _a : 0;
            this.planModule = this.props.model.getModule(MapSystemKeys.FlightPlan);
            this.legWaypoints = new Map();
            this.waypointsUpdating = false;
            this.facLoader = new FacilityLoader(FacilityRepository.getRepository(this.props.bus));
            this.facWaypointCache = DefaultFacilityWaypointCache.getCache(this.props.bus);
            this.clipBounds = VecNSubject.create(new Float64Array(4));
            this.clippedPathStream = new ClippedPathStream(NullPathStream.INSTANCE, this.clipBounds);
            this.pathStreamStack = new GeoProjectionPathStreamStack(NullPathStream.INSTANCE, this.props.mapProjection.getGeoProjection(), Math.PI / 12, 0.25, 8);
            this.updateScheduled = false;
        }
        /** @inheritdoc */
        onAttached() {
            this.flightPathLayerRef.instance.onAttached();
            this.waypointLayerRef.instance.onAttached();
            this.pathStreamStack.pushPostProjected(this.clippedPathStream);
            this.pathStreamStack.setConsumer(this.flightPathLayerRef.instance.display.context);
            this.initWaypointRenderer();
            this.planModule.getPlanSubjects(this.props.planIndex).flightPlan.sub(() => this.updateScheduled = true);
            this.planModule.getPlanSubjects(this.props.planIndex).planCalculated.on(() => this.updateScheduled = true);
            this.planModule.getPlanSubjects(this.props.planIndex).planChanged.on(() => this.updateScheduled = true);
            this.planModule.getPlanSubjects(this.props.planIndex).activeLeg.sub(() => this.updateScheduled = true);
            this.props.waypointRenderer.onRolesAdded.on(() => this.initWaypointRenderer());
            super.onAttached();
        }
        /**
         * Initializes the waypoint renderer for this layer.
         */
        initWaypointRenderer() {
            let hasDefaultRole = false;
            const flightPlanRoles = this.props.waypointRenderer.getRoleNamesByGroup(`${MapSystemWaypointRoles.FlightPlan}_${this.props.planIndex}`);
            for (let i = 0; i < flightPlanRoles.length; i++) {
                const roleId = this.props.waypointRenderer.getRoleFromName(flightPlanRoles[i]);
                if (roleId !== undefined) {
                    this.props.waypointRenderer.setCanvasContext(roleId, this.waypointLayerRef.instance.display.context);
                    this.props.waypointRenderer.setIconFactory(roleId, this.props.iconFactory);
                    this.props.waypointRenderer.setLabelFactory(roleId, this.props.labelFactory);
                    if (!hasDefaultRole) {
                        this.props.flightPathRenderer.defaultRoleId = roleId;
                        hasDefaultRole = true;
                    }
                }
            }
        }
        /** @inheritdoc */
        onUpdated(time, elapsed) {
            this.flightPathLayerRef.instance.onUpdated(time, elapsed);
            this.waypointLayerRef.instance.onUpdated(time, elapsed);
            if (this.isVisible()) {
                const display = this.flightPathLayerRef.instance.display;
                if (display.isInvalid) {
                    display.clear();
                    display.syncWithMapProjection(this.props.mapProjection);
                    this.updateScheduled = true;
                }
                if (this.updateScheduled) {
                    if (!this.waypointsUpdating) {
                        this.updateWaypoints();
                    }
                    const context = display.context;
                    display.clear();
                    const plan = this.planModule.getPlanSubjects(this.props.planIndex).flightPlan.get();
                    if (plan !== undefined) {
                        this.pathStreamStack.setProjection(display.geoProjection);
                        this.props.flightPathRenderer.render(plan, undefined, undefined, context, this.pathStreamStack);
                    }
                    this.updateScheduled = false;
                }
            }
        }
        /** @inheritdoc */
        onMapProjectionChanged(mapProjection, changeFlags) {
            this.flightPathLayerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
            this.waypointLayerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
            const size = this.flightPathLayerRef.instance.getSize();
            this.clipBounds.set(-MapSystemFlightPlanLayer.CLIP_BOUNDS_BUFFER, -MapSystemFlightPlanLayer.CLIP_BOUNDS_BUFFER, size + MapSystemFlightPlanLayer.CLIP_BOUNDS_BUFFER, size + MapSystemFlightPlanLayer.CLIP_BOUNDS_BUFFER);
        }
        /** @inheritdoc */
        setVisible(val) {
            super.setVisible(val);
            this.waypointLayerRef.instance.setVisible(val);
            this.flightPathLayerRef.instance.setVisible(val);
        }
        /**
         * Updates waypoints for the flight plan.
         * @throws An error if the waypoints are already updating.
         */
        async updateWaypoints() {
            if (this.waypointsUpdating) {
                throw new Error('A flight plan waypoint update is already in progress.');
            }
            this.waypointsUpdating = true;
            const flightPlan = this.planModule.getPlanSubjects(this.props.planIndex).flightPlan.get();
            const activeLegIndex = this.planModule.getPlanSubjects(this.props.planIndex).activeLeg.get();
            if (flightPlan === undefined) {
                for (const legWaypoint of this.legWaypoints.values()) {
                    const [waypoint, roleId] = legWaypoint;
                    this.props.waypointRenderer.deregister(waypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                }
                this.legWaypoints.clear();
                this.waypointsUpdating = false;
                return;
            }
            const activeLeg = flightPlan.tryGetLeg(activeLegIndex);
            const legsToDisplay = new Map();
            let legIndex = 0;
            for (const leg of flightPlan.legs()) {
                let roleId = this.defaultRoleId;
                const handler = this.props.flightPathRenderer.legWaypointHandlers.get(this.props.planIndex);
                if (handler !== undefined) {
                    roleId = handler(flightPlan, leg, activeLeg, legIndex, activeLegIndex);
                }
                if (roleId !== 0) {
                    legsToDisplay.set(leg, roleId);
                }
                legIndex++;
            }
            // Remove records of legs that are no longer in the set of legs to display.
            for (const leg of this.legWaypoints) {
                const [legDefinition, legWaypoint] = leg;
                const [waypoint, roleId] = legWaypoint;
                if (!legsToDisplay.has(legDefinition)) {
                    this.props.waypointRenderer.deregister(waypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                    this.legWaypoints.delete(legDefinition);
                }
            }
            const waypointRefreshes = [];
            // Create or refresh waypoints to display
            for (const leg of legsToDisplay) {
                waypointRefreshes.push(this.buildPlanWaypoint(leg[0], leg[1]));
            }
            await Promise.all(waypointRefreshes);
            this.waypointsUpdating = false;
        }
        /**
         * Builds or refreshes a flight plan waypoint.
         * @param leg The leg to build the waypoint for.
         * @param roleId The role ID to assign to the waypoint.
         */
        async buildPlanWaypoint(leg, roleId) {
            switch (leg.leg.type) {
                case LegType.CD:
                case LegType.VD:
                case LegType.CR:
                case LegType.VR:
                case LegType.FC:
                case LegType.FD:
                case LegType.FA:
                case LegType.CA:
                case LegType.VA:
                case LegType.FM:
                case LegType.VM:
                case LegType.CI:
                case LegType.VI:
                    await this.buildTerminatorWaypoint(leg, roleId);
                    break;
                case LegType.Discontinuity:
                case LegType.ThruDiscontinuity:
                    break;
                default:
                    await this.buildFixWaypoint(leg, roleId);
                    break;
            }
        }
        /**
         * Builds a flight path terminator based waypoint.
         * @param leg The leg to build the waypoint for.
         * @param roleId The role ID to assign to the waypoint.
         */
        async buildTerminatorWaypoint(leg, roleId) {
            var _a, _b, _c, _d, _e, _f;
            const currentLeg = this.legWaypoints.get(leg);
            if (currentLeg !== undefined) {
                const [waypoint, currentRoleId] = currentLeg;
                const lastVector = (_a = leg.calculated) === null || _a === void 0 ? void 0 : _a.flightPath[((_b = leg.calculated) === null || _b === void 0 ? void 0 : _b.flightPath.length) - 1];
                if (lastVector !== undefined) {
                    if (!waypoint.location.get().equals(lastVector.endLat, lastVector.endLon)) {
                        this.props.waypointRenderer.deregister(waypoint, currentRoleId, MapSystemWaypointRoles.FlightPlan);
                        const newWaypoint = new FlightPathWaypoint(lastVector.endLat, lastVector.endLon, (_c = leg.name) !== null && _c !== void 0 ? _c : '');
                        this.legWaypoints.set(leg, [newWaypoint, roleId]);
                        this.props.waypointRenderer.register(newWaypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                    }
                    else if (currentRoleId !== roleId) {
                        this.props.waypointRenderer.deregister(waypoint, currentRoleId, MapSystemWaypointRoles.FlightPlan);
                        this.props.waypointRenderer.register(waypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                        this.legWaypoints.set(leg, [waypoint, roleId]);
                    }
                }
                else {
                    this.props.waypointRenderer.deregister(waypoint, currentRoleId, MapSystemWaypointRoles.FlightPlan);
                }
            }
            else {
                const lastVector = (_d = leg.calculated) === null || _d === void 0 ? void 0 : _d.flightPath[((_e = leg.calculated) === null || _e === void 0 ? void 0 : _e.flightPath.length) - 1];
                if (lastVector !== undefined) {
                    const newWaypoint = new FlightPathWaypoint(lastVector.endLat, lastVector.endLon, (_f = leg.name) !== null && _f !== void 0 ? _f : '');
                    this.legWaypoints.set(leg, [newWaypoint, roleId]);
                    this.props.waypointRenderer.register(newWaypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                }
            }
        }
        /**
         * Builds a standard facility fix waypoint for flight plan waypoint display.
         * @param leg The leg to build the waypoint for.
         * @param roleId The role ID to assign to the waypoint.
         */
        async buildFixWaypoint(leg, roleId) {
            const legWaypoint = this.legWaypoints.get(leg);
            if (legWaypoint === undefined) {
                const facIcao = leg.leg.fixIcao;
                let facility;
                try {
                    facility = await this.facLoader.getFacility(ICAO.getFacilityType(facIcao), facIcao);
                }
                catch (err) {
                    /* continue */
                }
                if (facility !== undefined) {
                    const waypoint = this.facWaypointCache.get(facility);
                    this.props.waypointRenderer.register(waypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                    this.legWaypoints.set(leg, [waypoint, roleId]);
                }
            }
            else {
                const [waypoint, currentRoleId] = legWaypoint;
                if (currentRoleId !== roleId) {
                    this.props.waypointRenderer.deregister(waypoint, currentRoleId, MapSystemWaypointRoles.FlightPlan);
                    this.props.waypointRenderer.register(waypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                    this.legWaypoints.set(leg, [waypoint, roleId]);
                }
            }
        }
        /** @inheritdoc */
        render() {
            return (FSComponent.buildComponent(FSComponent.Fragment, null,
                FSComponent.buildComponent(MapCachedCanvasLayer, { ref: this.flightPathLayerRef, model: this.props.model, mapProjection: this.props.mapProjection, useBuffer: true, overdrawFactor: Math.SQRT2 }),
                FSComponent.buildComponent(MapSyncedCanvasLayer, { ref: this.waypointLayerRef, model: this.props.model, mapProjection: this.props.mapProjection })));
        }
    }
    MapSystemFlightPlanLayer.CLIP_BOUNDS_BUFFER = 10;

    /**
     * ADS-B operating modes.
     */
    var AdsbOperatingMode;
    (function (AdsbOperatingMode) {
        AdsbOperatingMode["Standby"] = "Standby";
        AdsbOperatingMode["Surface"] = "Surface";
        AdsbOperatingMode["Airborne"] = "Airborne";
    })(AdsbOperatingMode || (AdsbOperatingMode = {}));

    /**
     * TCAS operating modes.
     */
    var TcasOperatingMode;
    (function (TcasOperatingMode) {
        TcasOperatingMode[TcasOperatingMode["Standby"] = 0] = "Standby";
        TcasOperatingMode[TcasOperatingMode["TAOnly"] = 1] = "TAOnly";
        TcasOperatingMode[TcasOperatingMode["TA_RA"] = 2] = "TA_RA";
    })(TcasOperatingMode || (TcasOperatingMode = {}));
    /**
     * TCAS alert level.
     */
    var TcasAlertLevel;
    (function (TcasAlertLevel) {
        TcasAlertLevel[TcasAlertLevel["None"] = 0] = "None";
        TcasAlertLevel[TcasAlertLevel["ProximityAdvisory"] = 1] = "ProximityAdvisory";
        TcasAlertLevel[TcasAlertLevel["TrafficAdvisory"] = 2] = "TrafficAdvisory";
        TcasAlertLevel[TcasAlertLevel["ResolutionAdvisory"] = 3] = "ResolutionAdvisory";
    })(TcasAlertLevel || (TcasAlertLevel = {}));
    /**
     * Bit flags describing TCAS resolution advisories.
     */
    var TcasResolutionAdvisoryFlags;
    (function (TcasResolutionAdvisoryFlags) {
        /** An initial resolution advisory. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Initial"] = 1] = "Initial";
        /** A corrective resolution advisory. Requires a change in the own airplane's vertical speed. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Corrective"] = 2] = "Corrective";
        /** An upward sense resolution advisory. Commands a vertical speed above a certain value. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["UpSense"] = 4] = "UpSense";
        /** A downward sense resolution advisory. Commands a vertical speed below a certain value. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["DownSense"] = 8] = "DownSense";
        /** A resolution advisory which crosses an intruder's altitude. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Crossing"] = 16] = "Crossing";
        /** A CLIMB resolution advisory. Commands a positive vertical speed above 1500 FPM. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Climb"] = 32] = "Climb";
        /** A DESCEND resolution advisory. Commands a negative vertical speed below -1500 FPM. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Descend"] = 64] = "Descend";
        /** An INCREASE CLIMB or INCREASE DESCENT resolution advisory. Commands a vertical speed above 2500 FPM or below -2500 FPM. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Increase"] = 128] = "Increase";
        /** A corrective REDUCE CLIMB resolution advisory. Commands a vertical speed of 0 FPM or less. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["ReduceClimb"] = 256] = "ReduceClimb";
        /** A corrective REDUCE DESCENT resolution advisory. Commands a vertical speed of 0 FPM or more. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["ReduceDescent"] = 512] = "ReduceDescent";
        /** A preventative DO NOT CLIMB resolution advisory. Commands a non-positive vertical speed. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["DoNotClimb"] = 1024] = "DoNotClimb";
        /** A preventative DO NOT DESCEND resolution advisory. Commands a non-negative vertical speed. */
        TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["DoNotDescend"] = 2048] = "DoNotDescend";
    })(TcasResolutionAdvisoryFlags || (TcasResolutionAdvisoryFlags = {}));
    ({
        initialResponseTime: UnitType.SECOND.createNumber(5),
        initialAcceleration: UnitType.G_ACCEL.createNumber(0.25),
        subsequentResponseTime: UnitType.SECOND.createNumber(2.5),
        subsequentAcceleration: UnitType.G_ACCEL.createNumber(0.35)
    });
    UnitType.KNOT.createNumber(30);
    UnitType.FPM.convertTo(1500, UnitType.MPS);
    UnitType.FPM.convertTo(2500, UnitType.MPS);
    UnitType.FPM.convertTo(2000, UnitType.MPS);
    UnitType.FPM.convertTo(500, UnitType.MPS);

    ({
        protectedRadius: UnitType.NMILE.createNumber(6),
        protectedHeight: UnitType.FOOT.createNumber(1200)
    });
    [
        {
            lookaheadTime: UnitType.SECOND.createNumber(20),
            protectedRadius: UnitType.NMILE.createNumber(0.3),
            protectedHeight: UnitType.FOOT.createNumber(850)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(25),
            protectedRadius: UnitType.NMILE.createNumber(0.33),
            protectedHeight: UnitType.FOOT.createNumber(850)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(30),
            protectedRadius: UnitType.NMILE.createNumber(0.48),
            protectedHeight: UnitType.FOOT.createNumber(850)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(40),
            protectedRadius: UnitType.NMILE.createNumber(0.75),
            protectedHeight: UnitType.FOOT.createNumber(850)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(45),
            protectedRadius: UnitType.NMILE.createNumber(1),
            protectedHeight: UnitType.FOOT.createNumber(850)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(48),
            protectedRadius: UnitType.NMILE.createNumber(1.3),
            protectedHeight: UnitType.FOOT.createNumber(850)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(48),
            protectedRadius: UnitType.NMILE.createNumber(1.3),
            protectedHeight: UnitType.FOOT.createNumber(1200)
        }
    ];
    [
        {
            lookaheadTime: UnitType.SECOND.createNumber(15),
            protectedRadius: UnitType.NMILE.createNumber(0.2),
            protectedHeight: UnitType.FOOT.createNumber(600),
            alim: UnitType.FOOT.createNumber(300)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(15),
            protectedRadius: UnitType.NMILE.createNumber(0.2),
            protectedHeight: UnitType.FOOT.createNumber(600),
            alim: UnitType.FOOT.createNumber(300)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(20),
            protectedRadius: UnitType.NMILE.createNumber(0.35),
            protectedHeight: UnitType.FOOT.createNumber(600),
            alim: UnitType.FOOT.createNumber(300)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(25),
            protectedRadius: UnitType.NMILE.createNumber(0.55),
            protectedHeight: UnitType.FOOT.createNumber(600),
            alim: UnitType.FOOT.createNumber(350)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(30),
            protectedRadius: UnitType.NMILE.createNumber(0.8),
            protectedHeight: UnitType.FOOT.createNumber(600),
            alim: UnitType.FOOT.createNumber(400)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(35),
            protectedRadius: UnitType.NMILE.createNumber(1.1),
            protectedHeight: UnitType.FOOT.createNumber(700),
            alim: UnitType.FOOT.createNumber(600)
        },
        {
            lookaheadTime: UnitType.SECOND.createNumber(35),
            protectedRadius: UnitType.NMILE.createNumber(1.1),
            protectedHeight: UnitType.FOOT.createNumber(800),
            alim: UnitType.FOOT.createNumber(700)
        }
    ];

    /**
     * Traffic alert level modes.
     */
    var MapTrafficAlertLevelVisibility;
    (function (MapTrafficAlertLevelVisibility) {
        MapTrafficAlertLevelVisibility[MapTrafficAlertLevelVisibility["Other"] = 1] = "Other";
        MapTrafficAlertLevelVisibility[MapTrafficAlertLevelVisibility["ProximityAdvisory"] = 2] = "ProximityAdvisory";
        MapTrafficAlertLevelVisibility[MapTrafficAlertLevelVisibility["TrafficAdvisory"] = 4] = "TrafficAdvisory";
        MapTrafficAlertLevelVisibility[MapTrafficAlertLevelVisibility["ResolutionAdvisory"] = 8] = "ResolutionAdvisory";
        MapTrafficAlertLevelVisibility[MapTrafficAlertLevelVisibility["All"] = 15] = "All";
    })(MapTrafficAlertLevelVisibility || (MapTrafficAlertLevelVisibility = {}));

    /**
     * A map layer which displays traffic intruders.
     */
    class MapSystemTrafficLayer extends MapLayer {
        constructor() {
            var _a;
            super(...arguments);
            this.iconLayerRef = FSComponent.createRef();
            this.trafficModule = this.props.model.getModule(MapSystemKeys.Traffic);
            this.intruderIcons = {
                [TcasAlertLevel.None]: new Map(),
                [TcasAlertLevel.ProximityAdvisory]: new Map(),
                [TcasAlertLevel.TrafficAdvisory]: new Map(),
                [TcasAlertLevel.ResolutionAdvisory]: new Map()
            };
            this.needHandleOffscaleOob = this.props.offScaleIntruders !== undefined || this.props.oobIntruders !== undefined;
            this.oobOffset = (_a = this.props.oobOffset) !== null && _a !== void 0 ? _a : Subject.create(VecNMath.create(4));
            this.oobBounds = VecNSubject.createFromVector(VecNMath.create(4));
            this.isInit = false;
        }
        /** @inheritdoc */
        onVisibilityChanged(isVisible) {
            var _a, _b;
            if (!isVisible) {
                if (this.isInit) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this.iconLayerRef.instance.display.clear();
                }
                (_a = this.props.offScaleIntruders) === null || _a === void 0 ? void 0 : _a.clear();
                (_b = this.props.oobIntruders) === null || _b === void 0 ? void 0 : _b.clear();
            }
        }
        /** @inheritdoc */
        onAttached() {
            this.iconLayerRef.instance.onAttached();
            this.oobOffset.sub(this.updateOobBounds.bind(this), true);
            this.trafficModule.operatingMode.sub(this.updateVisibility.bind(this));
            this.trafficModule.show.sub(this.updateVisibility.bind(this), true);
            this.initCanvasStyles();
            this.initIntruders();
            this.initTCASHandlers();
            this.isInit = true;
        }
        /**
         * Initializes canvas styles.
         */
        initCanvasStyles() {
            this.props.initCanvasStyles && this.props.initCanvasStyles(this.iconLayerRef.instance.display.context);
        }
        /**
         * Initializes all currently existing TCAS intruders.
         */
        initIntruders() {
            const intruders = this.trafficModule.tcas.getIntruders();
            const len = intruders.length;
            for (let i = 0; i < len; i++) {
                this.onIntruderAdded(intruders[i]);
            }
        }
        /**
         * Initializes handlers to respond to TCAS events.
         */
        initTCASHandlers() {
            const tcasSub = this.props.context.bus.getSubscriber();
            tcasSub.on('tcas_intruder_added').handle(this.onIntruderAdded.bind(this));
            tcasSub.on('tcas_intruder_removed').handle(this.onIntruderRemoved.bind(this));
            tcasSub.on('tcas_intruder_alert_changed').handle(this.onIntruderAlertLevelChanged.bind(this));
        }
        /** @inheritdoc */
        onMapProjectionChanged(mapProjection, changeFlags) {
            this.iconLayerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
            if (BitFlags.isAll(changeFlags, MapProjectionChangeType.ProjectedSize)) {
                this.initCanvasStyles();
                this.updateOobBounds();
            }
        }
        /**
         * Updates the boundaries of the intruder out-of-bounds area.
         */
        updateOobBounds() {
            const projectedSize = this.props.mapProjection.getProjectedSize();
            const oobOffset = this.oobOffset.get();
            this.oobBounds.set(oobOffset[0], oobOffset[1], projectedSize[0] - oobOffset[2], projectedSize[1] - oobOffset[3]);
        }
        /** @inheritdoc */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onUpdated(time, elapsed) {
            if (!this.isVisible()) {
                return;
            }
            this.redrawIntruders();
        }
        /**
         * Redraws all tracked intruders.
         */
        redrawIntruders() {
            const alertLevelVisFlags = this.trafficModule.alertLevelVisibility.get();
            const offScaleRange = this.trafficModule.offScaleRange.get();
            const oobBounds = this.oobBounds.get();
            const iconDisplay = this.iconLayerRef.instance.display;
            iconDisplay.clear();
            for (let i = 0; i < MapSystemTrafficLayer.DRAW_GROUPS.length; i++) {
                const group = MapSystemTrafficLayer.DRAW_GROUPS[i];
                if (BitFlags.isAll(alertLevelVisFlags, group.alertLevelVisFlag)) {
                    this.intruderIcons[group.alertLevel].forEach(icon => {
                        var _a, _b, _c, _d, _e, _f;
                        icon.draw(this.props.mapProjection, iconDisplay.context, offScaleRange);
                        if (this.needHandleOffscaleOob) {
                            if (icon.isOffScale) {
                                (_a = this.props.oobIntruders) === null || _a === void 0 ? void 0 : _a.delete(icon.intruder);
                                (_b = this.props.offScaleIntruders) === null || _b === void 0 ? void 0 : _b.add(icon.intruder);
                            }
                            else if (!this.props.mapProjection.isInProjectedBounds(icon.projectedPos, oobBounds)) {
                                (_c = this.props.offScaleIntruders) === null || _c === void 0 ? void 0 : _c.delete(icon.intruder);
                                (_d = this.props.oobIntruders) === null || _d === void 0 ? void 0 : _d.add(icon.intruder);
                            }
                            else {
                                (_e = this.props.offScaleIntruders) === null || _e === void 0 ? void 0 : _e.delete(icon.intruder);
                                (_f = this.props.oobIntruders) === null || _f === void 0 ? void 0 : _f.delete(icon.intruder);
                            }
                        }
                    });
                }
                else if (this.needHandleOffscaleOob) {
                    this.intruderIcons[group.alertLevel].forEach(icon => {
                        var _a, _b;
                        (_a = this.props.offScaleIntruders) === null || _a === void 0 ? void 0 : _a.delete(icon.intruder);
                        (_b = this.props.oobIntruders) === null || _b === void 0 ? void 0 : _b.delete(icon.intruder);
                    });
                }
            }
        }
        /**
         * Updates this layer's visibility.
         */
        updateVisibility() {
            this.setVisible(this.trafficModule.tcas.getOperatingMode() !== TcasOperatingMode.Standby && this.trafficModule.show.get());
        }
        /**
         * A callback which is called when a TCAS intruder is added.
         * @param intruder The new intruder.
         */
        onIntruderAdded(intruder) {
            const icon = this.props.iconFactory(intruder, this.props.context);
            this.intruderIcons[intruder.alertLevel.get()].set(intruder, icon);
        }
        /**
         * A callback which is called when a TCAS intruder is removed.
         * @param intruder The removed intruder.
         */
        onIntruderRemoved(intruder) {
            var _a, _b;
            (_a = this.props.offScaleIntruders) === null || _a === void 0 ? void 0 : _a.delete(intruder);
            (_b = this.props.oobIntruders) === null || _b === void 0 ? void 0 : _b.delete(intruder);
            this.intruderIcons[intruder.alertLevel.get()].delete(intruder);
        }
        /**
         * A callback which is called when the alert level of a TCAS intruder is changed.
         * @param intruder The intruder.
         */
        onIntruderAlertLevelChanged(intruder) {
            let oldAlertLevel;
            let view = this.intruderIcons[oldAlertLevel = TcasAlertLevel.None].get(intruder);
            view !== null && view !== void 0 ? view : (view = this.intruderIcons[oldAlertLevel = TcasAlertLevel.ProximityAdvisory].get(intruder));
            view !== null && view !== void 0 ? view : (view = this.intruderIcons[oldAlertLevel = TcasAlertLevel.TrafficAdvisory].get(intruder));
            view !== null && view !== void 0 ? view : (view = this.intruderIcons[oldAlertLevel = TcasAlertLevel.ResolutionAdvisory].get(intruder));
            if (view) {
                this.intruderIcons[oldAlertLevel].delete(intruder);
                this.intruderIcons[intruder.alertLevel.get()].set(intruder, view);
            }
        }
        /** @inheritdoc */
        render() {
            return (FSComponent.buildComponent(MapSyncedCanvasLayer, { ref: this.iconLayerRef, model: this.props.model, mapProjection: this.props.mapProjection }));
        }
    }
    MapSystemTrafficLayer.DRAW_GROUPS = [
        { alertLevelVisFlag: MapTrafficAlertLevelVisibility.Other, alertLevel: TcasAlertLevel.None },
        { alertLevelVisFlag: MapTrafficAlertLevelVisibility.ProximityAdvisory, alertLevel: TcasAlertLevel.ProximityAdvisory },
        { alertLevelVisFlag: MapTrafficAlertLevelVisibility.TrafficAdvisory, alertLevel: TcasAlertLevel.TrafficAdvisory },
        { alertLevelVisFlag: MapTrafficAlertLevelVisibility.ResolutionAdvisory, alertLevel: TcasAlertLevel.ResolutionAdvisory },
    ];
    [new GeoPoint(0, 0)];

    /** The acceptable priority types for a given warning. */
    var WarningType;
    (function (WarningType) {
        WarningType[WarningType["Warning"] = 0] = "Warning";
        WarningType[WarningType["Caution"] = 1] = "Caution";
        WarningType[WarningType["Test"] = 2] = "Test";
        WarningType[WarningType["SoundOnly"] = 3] = "SoundOnly";
    })(WarningType || (WarningType = {}));

    /**
     * The style of cursor to use on a circular gauge.
     * This is treated as though it may have multiple options in the original
     * source.  For the sake of future expansion we'll make this an enum even
     * though it currently only has one option.  Maybe it can be used for future
     * expansion.
     */
    var XMLCircularGaugeCursor;
    (function (XMLCircularGaugeCursor) {
        /** Starting the enum at 1 to match its value in the stock XMLEngineDisplay.js */
        XMLCircularGaugeCursor[XMLCircularGaugeCursor["Triangle"] = 1] = "Triangle";
    })(XMLCircularGaugeCursor || (XMLCircularGaugeCursor = {}));
    /**
     * The possible locations for value text.
     * This is treated as though it may have multiple options in the original
     * source.  For the sake of future expansion we'll make this an enum even
     * though it currently only has one option.  Maybe it can be used for future
     * expansion.
     */
    var XMLCircularGaugeValuePos;
    (function (XMLCircularGaugeValuePos) {
        /** Starting the enum at 1 to match its value in the stock XMLEngineDisplay.js */
        XMLCircularGaugeValuePos[XMLCircularGaugeValuePos["End"] = 1] = "End";
    })(XMLCircularGaugeValuePos || (XMLCircularGaugeValuePos = {}));

    /**
     * This provides the valid values for the ValuePos tag on a horizontal gauge.
     */
    var XMLHorizontalGaugeValuePos;
    (function (XMLHorizontalGaugeValuePos) {
        /** Starting the enum at 1 to match its value in the stock XMLEngineDisplay.js */
        XMLHorizontalGaugeValuePos[XMLHorizontalGaugeValuePos["End"] = 1] = "End";
        XMLHorizontalGaugeValuePos[XMLHorizontalGaugeValuePos["Right"] = 2] = "Right";
    })(XMLHorizontalGaugeValuePos || (XMLHorizontalGaugeValuePos = {}));

    /**
     * This provides the valid values for the ValuePos tag on a vertical gauge.
     */
    var XMLVerticalGaugeValuePos;
    (function (XMLVerticalGaugeValuePos) {
        /** Starting the enum at 1 to match its value in the stock XMLEngineDisplay.js */
        XMLVerticalGaugeValuePos[XMLVerticalGaugeValuePos["None"] = 1] = "None";
    })(XMLVerticalGaugeValuePos || (XMLVerticalGaugeValuePos = {}));

    /**
     * The possible locations for value text.
     * This is treated as though it may have multiple options in the original
     * source.  For the sake of future expansion we'll make this an enum even
     * though it currently only has one option.  Maybe it can be used for future
     * expansion.
     */
    var XMLDoubleHorizontalGaugeValuePos;
    (function (XMLDoubleHorizontalGaugeValuePos) {
        /** Starting the enum at 2 to match its value in the stock XMLEngineDisplay.js */
        XMLDoubleHorizontalGaugeValuePos[XMLDoubleHorizontalGaugeValuePos["Right"] = 2] = "Right";
    })(XMLDoubleHorizontalGaugeValuePos || (XMLDoubleHorizontalGaugeValuePos = {}));

    /// <reference types="msfstypes/Pages/VCockpit/Instruments/Shared/utils/XMLLogic" />
    /**
     * The type of gauges available, as defined in XMLEngineDisplay.js.
     */
    var XMLGaugeType;
    (function (XMLGaugeType) {
        XMLGaugeType["Circular"] = "Circular";
        XMLGaugeType["Horizontal"] = "Horizontal";
        XMLGaugeType["DoubleHorizontal"] = "DoubleHorizontal";
        XMLGaugeType["Vertical"] = "Vertical";
        XMLGaugeType["DoubleVertical"] = "DoubleVertical";
        XMLGaugeType["Text"] = "Text";
        XMLGaugeType["ColumnGroup"] = "ColumnGroup";
        XMLGaugeType["Column"] = "Column";
        XMLGaugeType["Cylinder"] = "Cylinder";
        XMLGaugeType["TwinCylinder"] = "TwinCylinder";
    })(XMLGaugeType || (XMLGaugeType = {}));

    /**
     * The state of an avionics system.
     */
    var AvionicsSystemState;
    (function (AvionicsSystemState) {
        AvionicsSystemState["Off"] = "Off";
        AvionicsSystemState["Initializing"] = "Initializing";
        AvionicsSystemState["On"] = "On";
        AvionicsSystemState["Failed"] = "Failed";
    })(AvionicsSystemState || (AvionicsSystemState = {}));

    /**
     * A class that wraps the actual instrumenet implementation and handles the sim's vcockpit lifecycle.
     */
    class FsBaseInstrument extends BaseInstrument {
        /**
         * A callback called when the element is attached to the DOM.
         */
        connectedCallback() {
            super.connectedCallback();
            this.fsInstrument = this.constructInstrument();
        }
        /**
         * Update method called by BaseInstrument
         */
        Update() {
            super.Update();
            if (this.fsInstrument) {
                this.fsInstrument.Update();
            }
        }
        /** @inheritdoc */
        onInteractionEvent(_args) {
            if (this.fsInstrument) {
                this.fsInstrument.onInteractionEvent(_args);
            }
        }
        /** @inheritdoc */
        onGameStateChanged(oldState, newState) {
            super.onGameStateChanged(oldState, newState);
            if (this.fsInstrument) {
                this.fsInstrument.onGameStateChanged(oldState, newState);
            }
        }
        /** @inheritdoc */
        onFlightStart() {
            super.onFlightStart();
            if (this.fsInstrument) {
                this.fsInstrument.onFlightStart();
            }
        }
        /**
         * Whether or not the instrument is interactive (a touchscreen instrument).
         * @returns True
         */
        get isInteractive() {
            return false;
        }
    }

    class AwaitingConnection extends DisplayComponent {
        render() {
            console.log("Rendering awaiting connection");
            return (FSComponent.buildComponent("div", { class: 'awaiting-connection' }, "Awaiting Connection..."));
        }
    }

    /// <reference types="../../../../Tools/msfs-avionics-mirror/src/msfstypes/JS/common" />
    class vPEPanel extends TemplateElement {
        get templateID() {
            return 'vPEPanel';
        }
        constructor() {
            super();
            this.panelActive = false;
            this.started = false;
            this.ingameUi = null;
            this.busy = false;
            console.log("VPE CONSTRUCTOR CALLED");
        }
        connectedCallback() {
            var _a;
            super.connectedCallback();
            this.ingameUi = this.querySelector('ingame-ui');
            console.log("Rendering");
            (_a = document.getElementById('Footer')) === null || _a === void 0 ? void 0 : _a.append("Texting Texting 123");
            FSComponent.render(FSComponent.buildComponent(AwaitingConnection, null), document.getElementById('PanelContent'));
        }
        initialize() {
            if (this.started) {
                return;
            }
            this.started = true;
        }
        disconnectedCallback() {
            super.disconnectedCallback();
        }
    }
    console.log("VPEEEEEEEEE");
    window.customElements.define("ingamepanel-vpe", vPEPanel);
    checkAutoload();

})();

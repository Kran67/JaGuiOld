//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Imports
//#region MouseEvents
class MouseEvents extends BaseClass {
    //#region constructor
    constructor(props) {
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        const properties = {};
        super(props);
        Object.keys(MOUSEEVENTS).forEach(mEvent => {
            const event = MOUSEEVENTS[mEvent];
            properties[event] = props && props.hasOwnProperty(event) && core.tools.isBool(props[event])
                ? props[event] : [MOUSEEVENTS.DOWN, MOUSEEVENTS.UP, MOUSEEVENTS.CLICK].indexOf(event) > -1;
            this[`_${event}`] = properties[event];
            props && props.hasOwnProperty('all') && core.tools.isBool(props.all) && (this[`_${event}`] = !0);
            Object.defineProperty(this, event, {
                enumerable: !0,
                configurable: !0,
                get: function () {
                    return this[`_${event}`];
                },
                set: function (newValue) {
                    core.tools.isBool(newValue) && this[`_${event}`] !== newValue && (this[`_${event}`] = newValue);
                }
            });
        });
        //this.properties = properties;
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region all
    set all(newValue) {
        //#region Variables déclaration
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        let result = true;
        //#endregion Variables déclaration
        core.tools.isBool(newValue) &&
            Object.keys(MOUSEEVENTS).forEach(mEvent => {
                const event = MOUSEEVENTS[mEvent];
                result = result && this[`_${event}`];
            });
        return result;
    }
    //#endregion all
    //#region properties
    get properties() {
        //#region Variables déclaration
        const props = core.tools.getPropertiesFromObject(this);
        //#endregion Variables déclaration
        return props;
    }
    //#endregion properties
    //#endregion Getters / Setters
    //#region Methods
    //#region equals
    equals(obj) {
        //#region Variables déclaration
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        let result = true;
        //#endregion Variables déclaration
        obj instanceof MouseEvent
            && Object.keys(MOUSEEVENTS).forEach(mEvent => {
                const event = MOUSEEVENTS[mEvent];
                result = result && (this[`_${event}`] && obj[event]);
            });
        return result;
    }
    //#endregion equals
    //#region has
    has(type) {
        //#region Variables déclaration
        const prop = Object.keys(this).filter(e => { return e.toLowerCase() === type; })[0];
        //#endregion Variables déclaration
        return (this.hasOwnProperty(prop) && core.tools.isBool(this[`_${prop}`]) ? this[`_${prop}`] : !1);
    }
    //#endregion has
    //#endregion
}
core.classes.register(core.types.CATEGORIES.INTERNAL, MouseEvents);
//#endregion MouseEvent
export { MouseEvents };
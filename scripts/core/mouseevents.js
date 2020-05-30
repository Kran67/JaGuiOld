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
            props && props.hasOwnProperty('all') && core.tools.isBool(props.all) && (priv[event] = !0);
            Object.defineProperty(this, event, {
                enumerable: !0,
                configurable: !0,
                get: function () {
                    return core.private(this)[event];
                },
                set: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    //#endregion Variables déclaration
                    core.tools.isBool(newValue) && priv[event] !== newValue && core.private(this, { [event]: newValue });
                }
            });
        });
        core.private(this, properties);
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region all
    set all(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        let result = true;
        //#endregion Variables déclaration
        core.tools.isBool(newValue) &&
            Object.keys(MOUSEEVENTS).forEach(mEvent => {
                const event = MOUSEEVENTS[mEvent];
                result = result && priv[event];
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
        const priv = core.private(this);
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        let result = true;
        //#endregion Variables déclaration
        obj instanceof MouseEvent
            && Object.keys(MOUSEEVENTS).forEach(mEvent => {
                const event = MOUSEEVENTS[mEvent];
                result = result && (priv[event] && obj[event]);
            });
        return result;
    }
    //#endregion equals
    //#region has
    has(type) {
        //#region Variables déclaration
        const priv = core.private(this);
        const prop = Object.keys(priv).filter(e => { return e.toLowerCase() === type; })[0];
        //#endregion Variables déclaration
        return (priv.hasOwnProperty(prop) && core.tools.isBool(priv[prop]) ? priv[prop] : !1);
    }
    //#endregion has
    //#endregion
}
core.classes.register(core.types.CATEGORIES.INTERNAL, MouseEvents);
//#endregion MouseEvent
export { MouseEvents };
//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//import { NotifyEvent } from '/scripts/core/events.js';
//import { Point } from '/scripts/core/geometry.js';
//#endregion Imports
//#region Position
// TODO : support of databinding
const Position = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Position
    class Position extends BaseClass {
        //#region constructor
        constructor(point, owner) {
            super(point, owner);
            const priv = internal(this);
            !(point instanceof core.classes.Point) ? point = new core.classes.Point : 1;
            priv.x = point.x;
            priv.y = point.y;
            priv.owner = owner;
            this.onChange = new core.classes.NotifyEvent(owner);
        }
        //#endregion constructor
        //#region Getter/Setter
        //#region x
        get x() {
            return internal(this).x;
        }
        set x(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && newValue !== priv.x) {
                priv.x = newValue;
                this.onChange.invoke();
            }
        }
        //#endregion x
        //#region y
        get y() {
            return internal(this).y;
        }
        set y(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && newValue !== priv.y) {
                priv.y = newValue;
                this.onChange.invoke();
            }
        }
        //#endregion y
        //#region isEmpty
        get isEmpty() {
            return internal(this).x === 0 && internal(this).y === 0;
        }
        //#endregion isEmpty
        //#region point
        get point() {
            return new core.classes.Point(internal(this).x, internal(this).y);
        }
        //#endregion point
        //#region properties
        get properties() {
            return core.tools.getPropertiesFromObject(this);
        }
        //#endregion properties
        //#endregion
        //#region Methods
        //#region setValues
        setValues(x, y) {
            x = x | 0;
            y = y | 0;
            this.x = x;
            this.y = y;
            this.onChange.invoke();
        }
        //#endregion setValues
        //#region reflect
        reflect(/*value*/) {/*_vector.reflect(a);*/ }
        //#endregion reflect
        //#region assign
        assign(source) {
            source instanceof core.classes.Position || source instanceof core.classes.Point
                ? this.setValues(source.x, source.y) : 1;
        }
        //#endregion assign
        //#region destroy
        destroy() {
            this.onChange.destroy();
        }
        //#endregion destroy
        //#region equals
        equals(position) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.x === position.x && priv.y === position.y;
        }
        //#endregion equals
        //#endregion
    }
    return Position;
    //#endregion Position
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, Position);
//#endregion Position
export { Position };
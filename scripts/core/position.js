//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//import { NotifyEvent } from '/scripts/core/events.js';
//import { Point } from '/scripts/core/geometry.js';
//#endregion Imports
// TODO : support of databinding
//#region Position
class Position extends BaseClass {
    //#region Private fields
    #x;
    #y;
    #owner;
    //#endregion Private fields
    //#region constructor
    constructor(point, owner) {
        super(point, owner);
        !(point instanceof core.classes.Point) && (point = new core.classes.Point);
        this.#x = point.x;
        this.#y = point.y;
        this.#owner = owner;
        this.onChange = new core.classes.NotifyEvent(owner);
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region x
    get x() {
        return this.#x;
    }
    set x(newValue) {
        if (core.tools.isNumber(newValue) && newValue !== this.#x) {
            this.#x = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion x
    //#region y
    get y() {
        return this.#y;
    }
    set y(newValue) {
        if (core.tools.isNumber(newValue) && newValue !== this.#y) {
            this.#y = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion y
    //#region isEmpty
    get isEmpty() {
        return this.#x === 0 && this.#y === 0;
    }
    //#endregion isEmpty
    //#region point
    get point() {
        return new core.classes.Point(this.#x, this.#y);
    }
    //#endregion point
    //#region properties
    get properties() {
        return core.tools.getPropertiesFromObject(this);
    }
    //#endregion properties
    //#endregion Getters / Setters
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
            && this.setValues(source.x, source.y);
    }
    //#endregion assign
    //#region destroy
    destroy() {
        this.onChange.destroy();
    }
    //#endregion destroy
    //#region equals
    equals(position) {
        return this.#x === position.x && this.#y === position.y;
    }
    //#endregion equals
    //#endregion Methods
}
Object.defineProperties(Position.prototype, {
    'x': {
        enumerable: !0
    },
    'y': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.INTERNAL, Position);
//#endregion Position
export { Position };
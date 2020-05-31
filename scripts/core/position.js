//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//import { NotifyEvent } from '/scripts/core/events.js';
//import { Point } from '/scripts/core/geometry.js';
//#endregion Imports
// TODO : support of databinding
//#region Position
class Position extends BaseClass {
    //#region constructor
    constructor(point, owner) {
        super(point, owner);
        !(point instanceof core.classes.Point) && (point = new core.classes.Point);
        core.private(this, {
            x: point.x,
            y: point.y,
            owner
        });
        this.onChange = new core.classes.NotifyEvent(owner);
    }
    //#endregion constructor
    //#region Getter/Setter
    //#region x
    get x() {
        return core.private(this).x;
    }
    set x(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && newValue !== priv.x) {
            priv.x = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion x
    //#region y
    get y() {
        return core.private(this).y;
    }
    set y(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && newValue !== priv.y) {
            priv.y = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion y
    //#region isEmpty
    get isEmpty() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return priv.x === 0 && priv.y === 0;
    }
    //#endregion isEmpty
    //#region point
    get point() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return new core.classes.Point(priv.x, priv.y);
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return priv.x === position.x && priv.y === position.y;
    }
    //#endregion equals
    //#endregion
}
core.classes.register(core.types.CATEGORIES.INTERNAL, Position);
//#endregion Position
export { Position };
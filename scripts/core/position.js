//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//import { NotifyEvent } from '/scripts/core/events.js';
//import { Point } from '/scripts/core/geometry.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Imports
//#region Position
// TODO : support of databinding
const Position = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
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
            if (!(point instanceof Core.classes.Point)) {
                point = new Core.classes.Point;
            }
            priv.x = point.x;
            priv.y = point.y;
            priv.owner = owner;
            this.onChange = new Core.classes.NotifyEvent(owner);
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
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.x) {
                    priv.x = newValue;
                    this.onChange.invoke();
                }
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
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.y) {
                    priv.y = newValue;
                    this.onChange.invoke();
                }
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
            return new Core.classes.Point(internal(this).x, internal(this).y);
        }
        //#endregion point
        //#region properties
        get properties() {
            return Tools.getPropertiesFromObject(this);
        }
        //#endregion properties
        //#endregion
        //#region Methods
        //#region setValues
        setValues(x, y) {
            x = +x;
            y = +y;
            if (isNaN(x)) {
                x = 0;
            }
            if (isNaN(y)) {
                y = 0;
            }
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
            if (source instanceof Core.classes.Position || source instanceof Core.classes.Point) {
                this.setValues(source.x, source.y);
            }
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
//#region Position defineProperties
Object.defineProperties(Position, {
    'x': {
        enumerable: !0
    },
    'y': {
        enumerable: !0
    }
});
//#endregion Position defineProperties
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Position);
export { Position };
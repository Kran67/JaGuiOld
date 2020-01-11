import { BaseClass } from "/scripts/core/baseclass.js";
//import { NotifyEvent } from "/scripts/core/events.js";
//import { Point } from "/scripts/core/geometry.js";
import { Tools } from "/scripts/core/tools.js";
//#region Position
// TODO : support of databinding
const Position = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Position extends BaseClass {
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
        //#region Getter/Setter
        get x() {
            return internal(this).x;
        }
        set x(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue !== priv.x) {
                    priv.x = newValue;
                    this.onChange.invoke();
                }
            }
        }
        get y() {
            return internal(this).y;
        }
        set y(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue !== priv.y) {
                    priv.y = newValue;
                    this.onChange.invoke();
                }
            }
        }
        get isEmpty() {
            return internal(this).x === 0 && internal(this).y === 0;
        }
        get point() {
            return new Core.classes.Point(internal(this).x, internal(this).y);
        }
        get properties() {
            return Tools.getPropertiesFromObject(this);
        }
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
        //#endregion
        //#region Methods
        reflect(/*value*/) {/*_vector.reflect(a);*/ }
        assign(source) {
            if (source instanceof Core.classes.Position || source instanceof Core.classes.Point) {
                this.x = source.x;
                this.y = source.y;
            }
        }
        destroy() {
            this.onChange.destroy();
        }
        equals(position) {
            return this.x === position.x && this.y === position.y;
        }
        //#endregion
    }
    return Position;
})();
Object.defineProperties(Position, {
    "x": {
        enumerable: true
    },
    "y": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Position);
export { Position };
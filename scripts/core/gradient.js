import { BaseClass } from "/scripts/core/baseclass.js";
import { Colors } from "/scripts/core/color.js";
import { Interpolation } from "/scripts/core/interpolations.js";
//import { Position } from "/scripts/core/position.js";
//import { Point } from "/scripts/core/geometry.js";
import { Tools } from "/scripts/core/tools.js";
//#region GradientPoint
const GradientPoint = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class GradientPoint extends BaseClass {
        constructor(offset, color) {
            super(offset, color);
            if (typeof offset !== Types.CONSTANTS.NUMBER) {
                offset = 0;
            }
            if (!(color instanceof Core.classes.Color)) {
                color = Colors.BLACK;
            }
            const priv = internal(this);
            priv.offset = offset;
            priv.color = color;
        }
        get offset() {
            return internal(this).offset;
        }
        set offset(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.offset !== newValue) {
                    priv.offset = newValue;
                }
            }
        }
        get color() {
            return internal(this).color;
        }
        set color(newValue) {
            const priv = internal(this);
            const color = priv.color;
            if (newValue instanceof Core.classes.Color) {
                if (color.equals(newValue)) {
                    color.assign(newValue);
                }
            }
        }
        //#region Methods
        destroy() {
            this.color.destroy();
        }
        //#endregion
    }
    return GradientPoint;
})();
Object.defineProperties(GradientPoint, {
    "offset": {
        enumerable: true
    },
    "color": {
        enumerable: true
    }
});
//#endregion
//#region Gradient
// TODO : support of databinding
const Gradient = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Gradient extends BaseClass {
        constructor(owner) {
            super(owner);
            const priv = internal(this);
            priv.startPosition = new Core.classes.Position(null, owner);
            priv.stopPosition = new Core.classes.Position(new Core.classes.Point(0, 1), owner);
            priv.style = Types.GRADIENTSTYLES.LINEAR;
            if (owner) {
                Core.classes.newCollection(this, owner, GradientPoint);
                const items = this.items;
                items.push(new Core.classes.GradientPoint(0, Colors.BLACK));
                items.push(new Core.classes.GradientPoint(1, Colors.WHITE));
            }
        }
        //#region Setters
        get startPosition() {
            return internal(this).startPosition;
        }
        set startPosition(newValue) {
            const priv = internal(this);
            const owner = priv.owner;
            if (newValue instanceof Core.classes.Position) {
                if (!newValue.equals(priv.startPosition)) {
                    priv.startPosition.assign(newValue);
                    if (owner.allowUpdate) {
                        owner.form.updateRects.push(owner.getClipParentRect());
                        owner.update();
                        owner.form.updateRects.push(owner.getClipParentRect());
                    }
                }
            }
        }
        get stopPosition() {
            return internal(this).stopPosition;
        }
        set stopPosition(newValue) {
            const priv = internal(this);
            const stopPosition = priv.stopPosition;
            const owner = priv.owner;
            if (newValue instanceof Core.classes.Position) {
                if (!newValue.equals(stopPosition)) {
                    stopPosition.assign(newValue);
                    if (owner.allowUpdate) {
                        owner.form.updateRects.push(owner.getClipParentRect());
                        owner.update();
                        owner.form.updateRects.push(owner.getClipParentRect());
                    }
                }
            }
        }
        get style() {
            return internal(this).style;
        }
        set style(newValue) {
            const priv = internal(this);
            const style = priv.style;
            const owner = priv.owner;
            if (Tools.valueInSet(newValue, Gradientstyles)) {
                if (newValue !== style) {
                    priv.style = newValue;
                    if (owner.allowUpdate) {
                        owner.form.updateRects.push(owner.getClipParentRect());
                        owner.update();
                        owner.form.updateRects.push(owner.getClipParentRect());
                    }
                }
            }
        }
        //#endregion Setter
        //#region Methods
        assign(source) {
            const items = this.items;
            if (source instanceof Core.classes.Gradient) {
                this.startPosition.assign(source.startPosition);
                this.stopPosition.assign(source.stopPosition);
                this.style = source.style;
                items.length = 0;
                source.items.forEach(item => {
                    items.push(new Core.classes.GradientPoint(item.offset, item.color));
                });
            }
        }
        positionChanged() {
            this.onChange.invoke();
        }
        change() {
            this.owner.onChange.invoke();
        }
        interpolateColor(offset) {
            const items = this.items;
            if (typeof offset === Types.CONSTANTS.NUMBER) {
                const result = Colors.TRANSPARENT.clone();
                if (items.length > 1) {
                    if (offset < 0) offset = 0;
                    if (offset > 1) offset = 1;
                    items.sort((a, b) => {
                        return a.offset > b.offset;
                    });
                    if (offset < items[0].offset) {
                        result.assign(items.first.color);
                        return result;
                    }
                    if (offset > items.last.offset) {
                        result.assign(items.last.color);
                        return result;
                    }
                    items.forEach((item, i) => {
                        if (item !== items.last) {
                            const nextItem = items[i + 1];
                            if (offset >= item.offset) {
                                if (nextItem.offset - item.offset <= 0) {
                                    result.assign(item.color);
                                } else if ((i === items.length - 2) && offset > items.last.offset) {
                                    result.assign(items.last.color);
                                } else {
                                    result.assign(Interpolation.interpolateColor(item.color, nextItem.color, (offset - item.offset) / (nextItem.offset - item.offset)));
                                }
                            }
                        }
                    });
                    return result;
                }
            }
        }
        destroy() {
            this.startPosition.destroy();
            this.stopPosition.destroy();
            this.items.destroy();
        }
        //#endregion
    }
    return Gradient;
})();
Object.defineProperties(Gradient, {
    "startPosition": {
        enumerable: true
    },
    "stopPosition": {
        enumerable: true
    },
    "style": {
        enumerable: true
    },
    "items": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, GradientPoint, Gradient);
export { GradientPoint, Gradient };
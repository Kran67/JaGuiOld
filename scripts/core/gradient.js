//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Colors } from '/scripts/core/color.js';
import { Interpolation } from '/scripts/core/interpolations.js';
//import { Position } from '/scripts/core/position.js';
//import { Point } from '/scripts/core/geometry.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Imports
//#region GradientPoint
const GradientPoint = (() => {
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
    //#region GradientPoint
    class GradientPoint extends BaseClass {
        //#region constructor
        constructor(offset, color) {
            super(offset, color);
            if (!Tools.isNumber(offset)) {
                offset = 0;
            }
            if (!(color instanceof Core.classes.Color)) {
                color = Colors.BLACK;
            }
            const priv = internal(this);
            priv.offset = offset;
            priv.color = color;
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region offset
        get offset() {
            return internal(this).offset;
        }
        set offset(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.offset !== newValue) {
                    priv.offset = newValue;
                }
            }
        }
        //#endregion offset
        //#region color
        get color() {
            return internal(this).color;
        }
        set color(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const color = priv.color;
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Color) {
                if (color.equals(newValue)) {
                    color.assign(newValue);
                }
            }
        }
        //#endregion color
        //#endregion Getter / Setter
        //#region Methods
        //#region destroy
        destroy() {
            this.color.destroy();
        }
        //#endregion destroy
        //#endregion
    }
    return GradientPoint;
    //#endregion GradientPoint
})();
//#region GradientPoint defineProperties
Object.defineProperties(GradientPoint, {
    'offset': {
        enumerable: true
    },
    'color': {
        enumerable: true
    }
});
//#endregion GradientPoint defineProperties
//#endregion
//#region Gradient
// TODO : support of databinding
const Gradient = (() => {
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
    //#region Gradient
    class Gradient extends BaseClass {
        //#region constructor
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
        //#endregion constructor
        //#region Getter / Setters
        //#region startPosition
        get startPosition() {
            return internal(this).startPosition;
        }
        set startPosition(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = priv.owner;
            //#endregion Variables déclaration
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
        //#endregion startPosition
        //#region stopPosition
        get stopPosition() {
            return internal(this).stopPosition;
        }
        set stopPosition(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const stopPosition = priv.stopPosition;
            const owner = priv.owner;
            //#endregion Variables déclaration
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
        //#endregion stopPosition
        //#region style
        get style() {
            return internal(this).style;
        }
        set style(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const style = priv.style;
            const owner = priv.owner;
            //#endregion Variables déclaration
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
        //#endregion style
        //#endregion Getter / Setter
        //#region Methods
        //#region assign
        assign(source) {
            //#region Variables déclaration
            const priv = internal(this);
            const items = this.items;
            //#endregion Variables déclaration
            if (source instanceof Core.classes.Gradient) {
                priv.startPosition.assign(source.startPosition);
                priv.stopPosition.assign(source.stopPosition);
                priv.style = source.style;
                items.length = 0;
                source.items.forEach(item => {
                    items.push(new Core.classes.GradientPoint(item.offset, item.color));
                });
            }
        }
        //#endregion assign
        //#region positionChanged
        positionChanged() {
            this.onChange.invoke();
        }
        //#endregion positionChanged
        //#region change
        change() {
            this.owner.onChange.invoke();
        }
        //#endregion change
        //#region interpolateColor
        interpolateColor(offset) {
            //#region Variables déclaration
            const items = this.items;
            //#endregion Variables déclaration
            if (Tools.isNumber(offset)) {
                const result = Colors.TRANSPARENT.clone();
                if (items.length > 1) {
                    if (offset < 0) {
                        offset = 0;
                    }
                    if (offset > 1) {
                        offset = 1;
                    }
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
        //#endregion interpolateColor
        //#region destroy
        destroy() {
            this.startPosition.destroy();
            this.stopPosition.destroy();
            this.items.destroy();
        }
        //#endregion destroy
        //#endregion
    }
    return Gradient;
    //#endregion Gradient
})();
//#region Gradient defineProperties
Object.defineProperties(Gradient, {
    'startPosition': {
        enumerable: true
    },
    'stopPosition': {
        enumerable: true
    },
    'style': {
        enumerable: true
    },
    'items': {
        enumerable: true
    }
});
//#endregion Gradient defineProperties
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, GradientPoint, Gradient);
export { GradientPoint, Gradient };
//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Colors } from '/scripts/core/color.js';
import { Interpolation } from '/scripts/core/interpolations.js';
//import { Position } from '/scripts/core/position.js';
//import { Point } from '/scripts/core/geometry.js';
//#endregion Imports
//#region GradientPoint
class GradientPoint extends BaseClass {
    //#region Private fields
    #offset;
    #color;
    //#endregion Private fields
    //#region constructor
    constructor(offset, color) {
        super(offset, color);
        !core.tools.isNumber(offset) && (offset = 0);
        !(color instanceof core.classes.Color) && (color = Colors.BLACK);
        this.#offset = offset;
        this.#color = color;
    }
    //#endregion constructor
    //#region Getter / Setter
    //#region offset
    get offset() {
        return this.#offset;
    }
    set offset(newValue) {
        core.tools.isNumber(newValue) && this.#offset !== newValue && (this.#offset = newValue);
    }
    //#endregion offset
    //#region color
    get color() {
        return this.#color;
    }
    set color(newValue) {
        //#region Variables déclaration
        const color = this.#color;
        //#endregion Variables déclaration
        newValue instanceof core.classes.Color && color.equals(newValue) && (color.assign(newValue));
    }
    //#endregion color
    //#endregion Getter / Setter
    //#region Methods
    //#region destroy
    destroy() {
        this.#color.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion
}
Object.defineProperties(GradientPoint.prototype, {
    'offset': {
        enumerable: !0
    },
    'color': {
        enumerable: !0
    }
});
//#endregion GradientPoint
// TODO : support of databinding
//#region Gradient
class Gradient extends BaseClass {
    //#region Private fields
    #startPosition;
    #stopPosition;
    #style;
    #items = [];
    //#endregion Private fields
    //#region constructor
    constructor(owner) {
        super(owner);
        this.#startPosition = new core.classes.Position(null, owner);
        this.#stopPosition = new core.classes.Position(new core.classes.Point(0, 1), owner);
        this.#style = core.types.GRADIENTSTYLES.LINEAR;
        if (owner) {
            this.#items.convertToCollection(owner, GradientPoint);
            this.#items.push(new core.classes.GradientPoint(0, Colors.BLACK));
            this.#items.push(new core.classes.GradientPoint(1, Colors.WHITE));
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region startPosition
    get startPosition() {
        return this.#startPosition;
    }
    set startPosition(newValue) {
        //#region Variables déclaration
        const owner = this.owner;
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Position && !newValue.equals(this.#startPosition)) {
            this.#startPosition.assign(newValue);
            if (owner.allowUpdate) {
                owner.form.updateRects.push(owner.getClipParentRect());
                owner.update();
                owner.form.updateRects.push(owner.getClipParentRect());
            }
        }
    }
    //#endregion startPosition
    //#region stopPosition
    get stopPosition() {
        return this.#stopPosition;
    }
    set stopPosition(newValue) {
        //#region Variables déclaration
        const stopPosition = this.#stopPosition;
        const owner = this.owner;
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Position && !newValue.equals(stopPosition)) {
            stopPosition.assign(newValue);
            if (owner.allowUpdate) {
                owner.form.updateRects.push(owner.getClipParentRect());
                owner.update();
                owner.form.updateRects.push(owner.getClipParentRect());
            }
        }
    }
    //#endregion stopPosition
    //#region style
    get style() {
        return this.#style;
    }
    set style(newValue) {
        //#region Variables déclaration
        const style = this.#style;
        const owner = this.owner;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, Gradientstyles) && newValue !== style) {
            this.#style = newValue;
            if (owner.allowUpdate) {
                owner.form.updateRects.push(owner.getClipParentRect());
                owner.update();
                owner.form.updateRects.push(owner.getClipParentRect());
            }
        }
    }
    //#endregion style
    //#endregion Getters / Setter
    //#region Methods
    //#region assign
    assign(source) {
        //#region Variables déclaration
        const items = this.#items;
        //#endregion Variables déclaration
        if (source instanceof core.classes.Gradient) {
            this.#startPosition.assign(source.startPosition);
            this.#stopPosition.assign(source.stopPosition);
            this.#style = source.style;
            items.length = 0;
            source.items.forEach(item => {
                items.push(new core.classes.GradientPoint(item.offset, item.color));
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
        const items = this.#items;
        //#endregion Variables déclaration
        if (core.tools.isNumber(offset)) {
            const result = Colors.TRANSPARENT.clone();
            if (items.length > 1) {
                offset = Math.max(Math.min(offset, 1), 0);
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
                                result.assign(Interpolation.interpolateColor(item.color, nextItem.color,
                                    (offset - item.offset) / (nextItem.offset - item.offset)));
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
        this.#startPosition.destroy();
        this.#stopPosition.destroy();
        this.#items.destroy();
        this.#items = null;
        super.destroy();
    }
    //#endregion destroy
    //#endregion
}
Object.defineProperties(Gradient.prototype, {
    'startPosition': {
        enumerable: !0
    },
    'stopPosition': {
        enumerable: !0
    },
    'style': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.INTERNAL, GradientPoint, Gradient);
//#endregion Gradient
export { GradientPoint, Gradient };
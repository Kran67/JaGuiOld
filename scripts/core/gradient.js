//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Colors } from '/scripts/core/color.js';
import { Interpolation } from '/scripts/core/interpolations.js';
//import { Position } from '/scripts/core/position.js';
//import { Point } from '/scripts/core/geometry.js';
//#endregion Imports
//#region GradientPoint
class GradientPoint extends BaseClass {
    //#region constructor
    constructor(offset, color) {
        super(offset, color);
        !core.tools.isNumber(offset) && (offset = 0);
        !(color instanceof core.classes.Color) && (color = Colors.BLACK);
        core.private(this, {
            offset,
            color
        });
    }
    //#endregion constructor
    //#region Getter / Setter
    //#region offset
    get offset() {
        return core.private(this).offset;
    }
    set offset(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.offset !== newValue && (priv.offset = newValue);
    }
    //#endregion offset
    //#region color
    get color() {
        return core.private(this).color;
    }
    set color(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const color = priv.color;
        //#endregion Variables déclaration
        newValue instanceof core.classes.Color && color.equals(newValue) && (color.assign(newValue));
    }
    //#endregion color
    //#endregion Getter / Setter
    //#region Methods
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.color.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion
}
//#endregion GradientPoint
// TODO : support of databinding
//#region Gradient
class Gradient extends BaseClass {
    //#region constructor
    constructor(owner) {
        super(owner);
        core.private(this, {
            startPosition: new core.classes.Position(null, owner),
            stopPosition: new core.classes.Position(new core.classes.Point(0, 1), owner),
            style: core.types.GRADIENTSTYLES.LINEAR
        });
        if (owner) {
            core.classes.newCollection(this, owner, GradientPoint);
            const items = this.items;
            items.push(new core.classes.GradientPoint(0, Colors.BLACK));
            items.push(new core.classes.GradientPoint(1, Colors.WHITE));
        }
    }
    //#endregion constructor
    //#region Getter / Setters
    //#region startPosition
    get startPosition() {
        return core.private(this).startPosition;
    }
    set startPosition(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const owner = priv.owner;
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Position && !newValue.equals(priv.startPosition)) {
            priv.startPosition.assign(newValue);
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
        return core.private(this).stopPosition;
    }
    set stopPosition(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const stopPosition = priv.stopPosition;
        const owner = priv.owner;
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
        return core.private(this).style;
    }
    set style(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const style = priv.style;
        const owner = priv.owner;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, Gradientstyles) && newValue !== style) {
            priv.style = newValue;
            if (owner.allowUpdate) {
                owner.form.updateRects.push(owner.getClipParentRect());
                owner.update();
                owner.form.updateRects.push(owner.getClipParentRect());
            }
        }
    }
    //#endregion style
    //#endregion Getter / Setter
    //#region Methods
    //#region assign
    assign(source) {
        //#region Variables déclaration
        const priv = core.private(this);
        const items = this.items;
        //#endregion Variables déclaration
        if (source instanceof core.classes.Gradient) {
            priv.startPosition.assign(source.startPosition);
            priv.stopPosition.assign(source.stopPosition);
            priv.style = source.style;
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
        const items = this.items;
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.startPosition.destroy();
        priv.stopPosition.destroy();
        this.items.destroy();
        this.items = null;
        delete this.items;
        super.destroy();
    }
    //#endregion destroy
    //#endregion
}
core.classes.register(core.types.CATEGORIES.INTERNAL, GradientPoint, Gradient);
//#endregion Gradient
export { GradientPoint, Gradient };
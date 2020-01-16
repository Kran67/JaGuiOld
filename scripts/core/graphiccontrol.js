//#region Imports
import { Control } from "/scripts/components/control.js";
import { Color } from "/scripts/core/color.js";
//#endregion Imports
//#region GraphicControl
const GraphicControl = (function () {
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
    //#region Private
    //#region GraphicControl
    class GraphicControl extends Control {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                //DrawingInfo.mixin(this);
                super(owner, props);
                const priv = internal(this);
                priv.fillColor = new Core.classes.Color(Colors.WHITE);
                priv.strokeColor = new Core.classes.Color(Colors.BLACK);
                priv.strokeWidth = 1;
                priv.strokeDash = "[]";
                priv.strokeDashOffset = 0;
                this.addBindableProperties(["fillColor", "strokeColor", "strokeWidth", "strokeDash", "strokeDashOffset"]);
                delete this.tabOrder;
            }
        }
        //#endregion constructor
        //#region Getter / Setters
        //#region fillColor
        get fillColor() {
            return internal(this).fillColor;
        }
        set fillColor(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Color) {
                if (!priv.fillColor.equals(newValue)) {
                    priv.fillColor.assign(newValue);
                    this.update();
                }
            }
        }
        //#endregion fillColor
        //#region strokeColor
        get strokeColor() {
            return internal(this).strokeColor;
        }
        set strokeColor(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Color) {
                if (!priv.strokeColor.equals(newValue)) {
                    priv.strokeColor.assign(newValue);
                    this.update();
                }
            }
        }
        //#endregion strokeColor
        //#region strokeWidth
        get strokeWidth() {
            return internal(this).strokeWidth;
        }
        set strokeWidth(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue < 0) newValue = 0;
                if (priv.strokeWidth !== newValue) {
                    priv.strokeWidth = newValue;
                    this.update();
                }
            }
        }
        //#endregion strokeWidth
        //#region strokeDash
        get strokeDash() {
            return internal(this).strokeDash;
        }
        set strokeDash(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.strokeDash !== newValue) {
                    priv.strokeDash = newValue;
                    this.update();
                }
            }
        }
        //#endregion strokeDash
        //#region strokeDashOffset
        get strokeDashOffset() {
            return internal(this).strokeDashOffset;
        }
        set strokeDashOffset(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.strokeDashOffset !== newValue) {
                    priv.strokeDashOffset = newValue;
                    this.update();
                }
            }
        }
        //#endregion
        //#region Methods
        changed() { }
        update() {
            if (!this.loading) {
                //if (this._fillColor)) {
                //    if (!this._fillColor.equals(_colors.TRANSPARENT)) this.HTMLElementStyle.backgroundColor = this._fillColor.toARGBString();
                //}
                //if (this._strokeWidth) && this._strokeColor)) {
                //    stroke = this._strokeWidth + Types.CSSUnits.PX + String.SPACE + "solid" + String.SPACE;
                //    stroke += this._strokeColor.toARGBString();
                //    this.HTMLElementStyle.border = stroke;
                //}
                super.update();
            }
        }
        loaded() {
            super.loaded();
            this.update();
        }
        destroy() {
            const fillColor = this.fillColor;
            const strokeColor = this.strokeColor;
            if (fillColor) {
                fillColor.destroy();
            }
            if (strokeColor) {
                strokeColor.destroy();
            }
            super.destroy();
        }
        //reset GraphicControl_reset(){
        //  this.background.clear();
        //  this.color.assign(_colors.TRANSPARENT);
        //  this.font.reset();
        //  this.borderWidth=0;
        //  this.borderColor.assign(_colors.TRANSPARENT);
        //  this.bordersRadius={topLeft:0,topRight:0,bottomLeft:0,bottomRight:0};
        //  this.shadowColor.assign(_colors.TRANSPARENT);
        //  this.shadowOffsetX=0;
        //  this.shadowOffsetY=0;
        //  this.shadowBlur=0;
        //},
        //empty GraphicControl_empty(){
        //  let background=(this.background.style===Types.brushStyles.NONE)&&(this.background.color.equals(_colors.TRANSPARENT));
        //  let color=this.color.equals(_colors.TRANSPARENT);
        //  let font=(!this.font.underline)&&(!this.font.strikeout)&&(this.font.size===10)&&(this.font.family==="Tahoma")&&(this.font.style===Types.fontStyles.NORMAL)&&(this.font.height===0);
        //  let borderWidth=this.borderWidth===0;
        //  let borderColor=this.borderColor.equals(_colors.TRANSPARENT);
        //  let bordersRadius=(this.bordersRadius.topLeft===0)&&(this.bordersRadius.topRight===0)&&(this.bordersRadius.bottomLeft===0)&&(this.bordersRadius.bottomRight===0);
        //  let shadowColor=this.shadowColor.equals(_colors.TRANSPARENT);
        //  let shadowOffsetX=this.shadowOffsetX===0;
        //  let shadowOffsetY=this.shadowOffsetY===0;
        //  let shadowBlur=this.shadowBlur===0;
        //  let shape=this.shape===Types.shapes.RECTANGLE;
        //  return background&&color&&font&&borderWidth&&borderColor&&bordersRadius&&shadowColor&&shadowOffsetX&&shadowOffsetY&&shadowBlur&&shape;
        //},
        //assign GraphicControl_assign(source) {
        //  this.background.assign(source.background);
        //  this.color.assign(source.color);
        //  this.font.assign(source.font);
        //  this._align=source.align;
        //  this.borderWidth=source.borderWidth;
        //  this.borderColor.assign(source.borderColor);
        //  this.bordersRadius.topLeft=source.bordersRadius.topLeft;
        //  this.bordersRadius.topRight=source.bordersRadius.topRight;
        //  this.bordersRadius.bottomLeft=source.bordersRadius.bottomLeft;
        //  this.bordersRadius.bottomRight=source.bordersRadius.bottomRight;
        //  this.shadowColor.assign(source.shadowColor);
        //  this.shadowOffsetX=source.shadowOffsetX;
        //  this.shadowOffsetY=source.shadowOffsetY;
        //  this.shadowBlur=source.shadowBlur;
        //  this.shape=source.shape;
        //  this.borderDash=source.borderDash;
        //}
        //#endregion
    }
    return GraphicControl;
})();
Object.defineProperties(GraphicControl, {
    "fillColor": {
        enumerable: true
    },
    "strokeColor": {
        enumerable: true
    },
    "strokeWidth": {
        enumerable: true
    },
    "strokeDash": {
        enumerable: true
    },
    "strokeDashOffset": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, GraphicControl);
export { GraphicControl };
//#region Import
import { PaintBox } from "/scripts/components/common/paintbox.js";
import { Brush } from "/scripts/core/brush.js";
import { Color, Colors } from "/scripts/core/color.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region PlotGrid
const PlotGrid = (() => {
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
    //#region Class PlotGrid
    class PlotGrid extends PaintBox {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.lineFill = new Brush(Types.BRUSHSTYLES.SOLID, Color.parse("#333"), this);
                priv.marks = 25;
                priv.frequency = 5;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region lineFill
        get lineFill() {
            return internal(this).lineFill;
        }
        set lineFill(newValue) {
            const priv = internal(this);
            if (newValue instanceof Brush) {
                if (priv.lineFill !== newValue) {
                    priv.lineFill.assign(newValue);
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        } else {
                            if (this.allowUpdate) {
                                this.update();
                            }
                            this.redraw();
                        }
                    }
                }
            }
        }
        //#endregion lineFill
        //#region marks
        get marks() {
            return internal(this).marks;
        }
        set marks(newValue) {
            const priv = internal(this);
            if (Tools.isNumber(newValue)) {
                if (priv.marks !== newValue) {
                    priv.marks = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                    } else {
                        if (this.allowUpdate) {
                            this.update();
                        }
                        this.redraw();
                    }
                }
            }
        }
        //#endregion marks
        //#region frequency
        get frequency() {
            return internal(this).frequency;
        }
        set frequency(newValue) {
            const priv = internal(this);
            if (Tools.isNumber(newValue)) {
                if (priv.frequency !== newValue) {
                    if (newValue < 0.001) {
                        newValue = 0.001;
                    }
                    priv.frequency = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                    } else {
                        if (this.allowUpdate) {
                            this.update();
                        }
                        this.redraw();
                    }
                }
            }
        }
        //#endregion frequency
        //#endregion Getters / Setters
        //#region Methods
        //#region paint
        paint() {
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const ctx = this.ctx;
            if (htmlElement.offsetWidth !== 0 && htmlElement.offsetHeight !== 0) {
                if (this.ctx && this.isEnabled) {
                    let x = 0;
                    let y = 0;
                    const c = new Core.classes.Color(Colors.TRANSPARENT);
                    const w2 = htmlElement.offsetWidth / 2;
                    const h2 = htmlElement.offsetHeight / 2;
                    c.assign(priv.lineFill.color);
                    c.opacity(0.4);
                    this.ctx.save();
                    while (x < w2) {
                        if (x === 0) {
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = priv.lineFill.color.toRGBAString();
                        } else {
                            if (Math.frac(x) === 0 && Math.frac(x / priv.frequency / priv.marks) === 0) {
                                this.ctx.strokeStyle = this.lineFill.color.toRGBAString();
                            } else {
                                ctx.strokeStyle = c.toRGBAString();
                            }
                            ctx.lineWidth = 1;
                        }
                        ctx.beginPath();
                        ctx.moveTo(w2 + x + ctx.lineWidth / 2, 0);
                        ctx.lineTo(w2 + x + ctx.lineWidth / 2, htmlElement.offsetHeight);
                        if (x !== 0) {
                            ctx.moveTo(w2 - x + ctx.lineWidth / 2, 0);
                            ctx.lineTo(w2 - x + ctx.lineWidth / 2, htmlElement.offsetHeight);
                        }
                        ctx.stroke();
                        x += priv.frequency;
                    }
                    while (y < h2) {
                        if (y === 0) {
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = priv.lineFill.color.toRGBAString();
                        } else {
                            if (Math.frac(y) === 0 && Math.frac(y / priv.frequency / priv.marks) === 0) {
                                ctx.strokeStyle = priv.lineFill.color.toRGBAString();
                            } else {
                                ctx.strokeStyle = c.toRGBAString();
                            }
                            ctx.lineWidth = 1;
                        }
                        ctx.beginPath();
                        ctx.moveTo(0, h2 + y + ctx.lineWidth / 2);
                        ctx.lineTo(htmlElement.offsetWidth, h2 + y + ctx.lineWidth / 2);
                        if (y !== 0) {
                            ctx.moveTo(0, h2 - y + ctx.lineWidth / 2);
                            ctx.lineTo(htmlElement.offsetWidth, h2 - y + ctx.lineWidth / 2);
                        }
                        ctx.stroke();
                        y += priv.frequency;
                    }
                    ctx.restore();
                    if (Core.isHTMLRenderer) {
                        this.onPaint.invoke();
                    }
                }
            }
        }
        //#endregion paint
        //#region assign
        assign(source) {
            const priv = internal(this);
            if (source instanceof PlotGrid) {
                priv._inherited(source);
                priv.lineFill.assign(source.lineFill);
                priv.marks = source.marks;
                priv.frequency = source.frequency;
            }
        }
        //#endregion assign
        //#region destroy
        destroy() {
            const priv = internal(this);
            super.destroy();
            priv.lineFill.destroy();
            priv.lineFill = null;
            priv.marks = null;
            priv.frequency = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return PlotGrid;
    //#endregion PlotGrid
})();
//#endregion PlotGrid
Object.seal(PlotGrid);
Core.classes.register(Types.CATEGORIES.COMMON, PlotGrid);
export { PlotGrid };
//#region Templates
if (Core.isHTMLRenderer) {
    const PlotGridTpl = "<canvas id=\"{internalId}\" data-class=\"PlotGrid\" class=\"Control PlotGrid\"><properties>{ \"name\": \"{name}\", \"width\": 105, \"height\": 105 }</properties></canvas>";
    Core.classes.registerTemplates([{ Class: PlotGrid, template: PlotGridTpl }]);
}
//endregion
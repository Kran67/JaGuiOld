//#region Import
import { PaintBox } from '/scripts/components/common/paintbox.js';
import { Brush } from '/scripts/core/brush.js';
import { Color, Colors } from '/scripts/core/color.js';
//#endregion Import
//#region Class PlotGrid
class PlotGrid extends PaintBox {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                lineFill: new Brush(core.types.BRUSHSTYLES.SOLID, Color.parse('#333'), this),
                marks: 25,
                frequency: 5
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region lineFill
    get lineFill() {
        return core.private(this).lineFill;
    }
    set lineFill(newValue) {
        const priv = core.private(this);
        if (newValue instanceof Brush && priv.lineFill !== newValue) {
            priv.lineFill.assign(newValue);
            if (core.isHTMLRenderer) {
                if (!this.loading && !this.form.loading) {
                    this.update();
                } else {
                    this.allowUpdate && this.update();
                    this.redraw();
                }
            }
        }
    }
    //#endregion lineFill
    //#region marks
    get marks() {
        return core.private(this).marks;
    }
    set marks(newValue) {
        const priv = core.private(this);
        if (core.tools.isNumber(newValue) && priv.marks !== newValue) {
            priv.marks = newValue;
            if (core.isHTMLRenderer) {
                !this.loading && !this.form.loading && this.update();
            } else {
                this.allowUpdate && this.update();
                this.redraw();
            }
        }
    }
    //#endregion marks
    //#region frequency
    get frequency() {
        return core.private(this).frequency;
    }
    set frequency(newValue) {
        const priv = core.private(this);
        if (core.tools.isNumber(newValue) && priv.frequency !== newValue) {
            newValue = Math.max(newValue, 0.001);
            priv.frequency = newValue;
            if (core.isHTMLRenderer) {
                !this.loading && !this.form.loading && this.update();
            } else {
                this.allowUpdate && this.update();
                this.redraw();
            }
        }
    }
    //#endregion frequency
    //#endregion Getters / Setters
    //#region Methods
    //#region paint
    paint() {
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const ctx = this.ctx;
        if (htmlElement.offsetWidth !== 0 && htmlElement.offsetHeight !== 0 && this.ctx && this.isEnabled) {
            let x = 0;
            let y = 0;
            const c = new core.classes.Color(Colors.TRANSPARENT);
            const w2 = htmlElement.offsetWidth / 2;
            const h2 = htmlElement.offsetHeight / 2;
            ctx.clear();
            c.assign(priv.lineFill.color);
            c.opacity(0.4);
            this.ctx.save();
            while (x < w2) {
                if (x === 0) {
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = priv.lineFill.color.toRGBAString();
                } else {
                    Math.frac(x) === 0 && Math.frac(x / priv.frequency / priv.marks) === 0
                        ? this.ctx.strokeStyle = this.lineFill.color.toRGBAString()
                        : ctx.strokeStyle = c.toRGBAString();
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
                    Math.frac(y) === 0 && Math.frac(y / priv.frequency / priv.marks) === 0
                        ? ctx.strokeStyle = priv.lineFill.color.toRGBAString()
                        : ctx.strokeStyle = c.toRGBAString();
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
            core.isHTMLRenderer && this.onPaint.invoke();
        }
    }
    //#endregion paint
    //#region assign
    assign(source) {
        const priv = core.private(this);
        if (source instanceof PlotGrid) {
            super.assign(source);
            priv.lineFill.assign(source.lineFill);
            priv.marks = source.marks;
            priv.frequency = source.frequency;
        }
    }
    //#endregion assign
    //#region destroy
    destroy() {
        const priv = core.private(this);
        priv.lineFill.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(PlotGrid);
core.classes.register(core.types.CATEGORIES.COMMON, PlotGrid);
//#endregion PlotGrid
//#region Templates
if (core.isHTMLRenderer) {
    const PlotGridTpl = ['<canvas id="{internalId}" data-class="PlotGrid" class="Control PlotGrid">',
        '<properties>{ "name": "{name}", "width": 105, "height": 105 }</properties></canvas>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: PlotGrid, template: PlotGridTpl }]);
}
//#endregion
export { PlotGrid };
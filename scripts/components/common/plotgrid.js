//#region Import
import { PaintBox } from '/scripts/components/common/paintbox.js';
import { Brush } from '/scripts/core/brush.js';
import { Color, Colors } from '/scripts/core/color.js';
//#endregion Import
//#region Class PlotGrid
class PlotGrid extends PaintBox {
    //#region Private fields
    #lineFill;
    #marks = 25;
    #frequency = 5;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#lineFill = new Brush(core.types.BRUSHSTYLES.SOLID, Color.parse('#333'), this);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region lineFill
    get lineFill() {
        return this.#lineFill;
    }
    set lineFill(newValue) {
        if (newValue instanceof Brush && this.#lineFill !== newValue) {
            this.#lineFill.assign(newValue);
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
        return this.#marks;
    }
    set marks(newValue) {
        if (core.tools.isNumber(newValue) && this.#marks !== newValue) {
            this.#marks = newValue;
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
        return this.#frequency;
    }
    set frequency(newValue) {
        if (core.tools.isNumber(newValue) && this.#frequency !== newValue) {
            newValue = Math.max(newValue, 0.001);
            this.#frequency = newValue;
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
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const ctx = this.ctx;
        //#endregion Variables déclaration
        if (htmlElement.offsetWidth !== 0 && htmlElement.offsetHeight !== 0 && this.ctx && this.isEnabled) {
            let x = 0;
            let y = 0;
            const c = new core.classes.Color(Colors.TRANSPARENT);
            const w2 = htmlElement.offsetWidth / 2;
            const h2 = htmlElement.offsetHeight / 2;
            ctx.clear();
            c.assign(this.#lineFill.color);
            c.opacity(0.4);
            this.ctx.save();
            while (x < w2) {
                if (x === 0) {
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = this.#lineFill.color.toRGBAString();
                } else {
                    Math.frac(x) === 0 && Math.frac(x / this.#frequency / this.#marks) === 0
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
                x += this.#frequency;
            }
            while (y < h2) {
                if (y === 0) {
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = this.#lineFill.color.toRGBAString();
                } else {
                    Math.frac(y) === 0 && Math.frac(y / this.#frequency / this.#marks) === 0
                        ? ctx.strokeStyle = this.#lineFill.color.toRGBAString()
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
                y += this.#frequency;
            }
            ctx.restore();
            core.isHTMLRenderer && this.onPaint.invoke();
        }
    }
    //#endregion paint
    //#region assign
    assign(source) {
        if (source instanceof PlotGrid) {
            super.assign(source);
            this.#lineFill.assign(source.lineFill);
            this.#marks = source.marks;
            this.#frequency = source.frequency;
        }
    }
    //#endregion assign
    //#region destroy
    destroy() {
        this.#lineFill.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(PlotGrid.prototype, {
    'lineFill': {
        enumerable: !0
    },
    'marks': {
        enumerable: !0
    },
    'frequency': {
        enumerable: !0
    }
});
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
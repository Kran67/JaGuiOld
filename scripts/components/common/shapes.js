//#region Import
import { GraphicControl } from '/scripts/core/graphiccontrol.js';
import { SVGGraphicControl } from '/scripts/core/svggraphiccontrol.js';
import { Colors } from '/scripts/core/color.js';
//#endregion Import
//#region Direction of Line
const LINEDIRECTIONS = Object.freeze(Object.seal({
    TOPLEFT_BOTTOMRIGHT: 'topleft-bottomright',
    TOPRIGHT_BOTTOMLEFT: 'topright-bottomleft',
    TOPLEFT_TOPRIGHT: 'topleft-topright',
    BOTTOMLEFT_BOTTOMRIGHT: 'bottomleft-bottomright',
    TOPLEFT_BOTTOMLEFT: 'topleft-bottomleft',
    TOPRIGHT_BOTTOMRIGHT: 'topright-bottomright',
    MIDDLETOP_MIDDLEBOTTOM: 'middletop-middlebottom',
    MIDDLELEFT_MIDDLERIGHT: 'middleleft-middleright'
}));
//#endregion LINEDIRECTIONS
//#region SHAPES
const SHAPES = Object.seal(Object.freeze({
    RECTANGLE: 'rectangle',
    ELLIPSE: 'ellipse',
    CIRCLE: 'circle',
    ROUNDRECT: 'roundRect',
    PIE: 'pie',
    CALLOUT: 'callout',
    ARC: 'arc',
    CHORD: 'chord',
    PATH: 'path',
    LINE: 'line',
    SCROLLARROWLEFT: 'scrollArrowLeft',
    SCROLLARROWRIGHT: 'scrollArrowRight',
    STAR: 'star',
    TRAPEZOID: 'trapezoid',
    PARALLELOGRAM: 'parallelogram',
    NINJASTAR: 'ninjaStar',
    REGULARPOLYGON: 'regularPolygon'
}));
//#endregion
//#region Class Line
class Line extends SVGGraphicControl {
    //#region Private fields
    #lineDirection;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.shape = SHAPES.LINE;
            super(owner, props);
            this.#lineDirection = props.hasOwnProperty('lineDirection')
                    ? props.lineDirection : LINEDIRECTIONS.TOPLEFT_BOTTOMRIGHT;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region SHAPES
    /**
     * @type    {Object}        SHAPES
     */
    static get SHAPES() {
        return SHAPES;
    }
    //#endregion SHAPES
    //#region LINEDIRECTIONS
    /**
     * @type    {Object}        LINEDIRECTIONS
     */
    static get LINEDIRECTIONS() {
        return LINEDIRECTIONS;
    }
    //#endregion LINEDIRECTIONS
    //#region lineDirection
    get lineDirection() {
        return this.#lineDirection;
    }
    set lineDirection(newValue) {
        if (core.tools.valueInSet(newValue, LINEDIRECTIONS) && this.#lineDirection !== newValue) {
            this.#lineDirection = newValue;
            this.update();
        }
    }
    //#endregion lineDirection
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        if (!this.loading && !this.form.loading && this.svgShape) {
            super.update();
            switch (this.#lineDirection) {
                case LINEDIRECTIONS.TOPLEFT_BOTTOMRIGHT:
                    this.svgShape.setAttribute('x1', 0);
                    this.svgShape.setAttribute('y1', 0);
                    this.svgShape.setAttribute('x2', '100%');
                    this.svgShape.setAttribute('y2', '100%');
                    break;
                case LINEDIRECTIONS.TOPRIGHT_BOTTOMLEFT:
                    this.svgShape.setAttribute('x1', 0);
                    this.svgShape.setAttribute('y1', '100%');
                    this.svgShape.setAttribute('x2', '100%');
                    this.svgShape.setAttribute('y2', 0);
                    break;
                case LINEDIRECTIONS.TOPLEFT_TOPRIGHT:
                    this.svgShape.setAttribute('x1', 0);
                    this.svgShape.setAttribute('y1', 0);
                    this.svgShape.setAttribute('x2', '100%');
                    this.svgShape.setAttribute('y2', 0);
                    break;
                case LINEDIRECTIONS.BOTTOMLEFT_BOTTOMRIGHT:
                    this.svgShape.setAttribute('x1', 0);
                    this.svgShape.setAttribute('y1', '100%');
                    this.svgShape.setAttribute('x2', '100%');
                    this.svgShape.setAttribute('y2', '100%');
                    break;
                case LINEDIRECTIONS.TOPLEFT_BOTTOMLEFT:
                    this.svgShape.setAttribute('x1', 0);
                    this.svgShape.setAttribute('y1', 0);
                    this.svgShape.setAttribute('x2', 0);
                    this.svgShape.setAttribute('y2', '100%');
                    break;
                case LINEDIRECTIONS.TOPRIGHT_BOTTOMRIGHT:
                    this.svgShape.setAttribute('x1', '100%');
                    this.svgShape.setAttribute('y1', 0);
                    this.svgShape.setAttribute('x2', '100%');
                    this.svgShape.setAttribute('y2', '100%');
                    break;
                case LINEDIRECTIONS.MIDDLETOP_MIDDLEBOTTOM:
                    this.svgShape.setAttribute('x1', '50%');
                    this.svgShape.setAttribute('y1', 0);
                    this.svgShape.setAttribute('x2', '50%');
                    this.svgShape.setAttribute('y2', '100%');
                    break;
                case LINEDIRECTIONS.MIDDLELEFT_MIDDLERIGHT:
                    this.svgShape.setAttribute('x1', 0);
                    this.svgShape.setAttribute('y1', '50%');
                    this.svgShape.setAttribute('x2', '100%');
                    this.svgShape.setAttribute('y2', '50%');
                    break;
            }
            this.svgShape.setAttribute('stroke', this.strokeColor.toRGBAString());
            this.svgShape.setAttribute('stroke-width', this.strokeWidth);
        }
    }
    //#endregion update
    //#endregion Methods
}
Object.defineProperties(Line.prototype, {
    'lineDirection': {
        enumerable: !0
    }
});
Object.seal(Object.freeze(Line));
//#endregion Line
//#region Rectangle
class Rectangle extends GraphicControl {
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const fillColor = this.fillColor;
        const strokeColor = this.strokeColor;
        const strokeWidth = this.strokeWidth;
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        if (!this.loading) {
            fillColor && (htmlElementStyle.backgroundColor = fillColor.toRGBAString());
            strokeColor && strokeWidth > 0
                && (htmlElementStyle.border = `${strokeWidth}${core.types.CSSUNITS.PX} solid ${strokeColor.toRGBAString()}`);
        }
    }
    //#endregion update
    //#endregion Methods
}
Object.seal(Object.freeze(Rectangle));
//#endregion Rectangle
//#region Class RoundRect
class RoundRect extends Rectangle {
    //#region Private fields
    #topLeftRadius;
    #topRightRadius;
    #bottomLeftRadius;
    #bottomRightRadius;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#topLeftRadius = props.hasOwnProperty('topLeftRadius') ? props.topLeftRadius : 20;
            this.#topRightRadius = props.hasOwnProperty('topRightRadius') ? props.topLeftRadius : 20;
            this.#bottomLeftRadius = props.hasOwnProperty('bottomLeftRadius') ? props.topLeftRadius : 20;
            this.#bottomRightRadius = props.hasOwnProperty('bottomRightRadius') ? props.topLeftRadius : 20;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region topLeftRadius
    get topLeftRadius() {
        return this.#topLeftRadius;
    }
    set topLeftRadius(newValue) {
        if (core.tools.isNumber(newValue) && this.#topLeftRadius !== newValue) {
            this.#topLeftRadius = newValue;
            this.update();
        }
    }
    //#endregion topLeftRadius
    //#region topRightRadius
    get topRightRadius() {
        return this.#topRightRadius;
    }
    set topRightRadius(newValue) {
        if (core.tools.isNumber(newValue) && this.#topRightRadius !== newValue) {
            this.#topRightRadius = newValue;
            this.update();
        }
    }
    //#endregion topRightRadius
    //#region bottomLeftRadius
    get bottomLeftRadius() {
        return this.#bottomLeftRadius;
    }
    set bottomLeftRadius(newValue) {
        if (core.tools.isNumber(newValue) && this.#bottomLeftRadius !== newValue) {
            this.#bottomLeftRadius = newValue;
            this.update();
        }
    }
    //#endregion bottomLeftRadius
    //#region bottomRightRadius
    get bottomRightRadius() {
        return this.#bottomRightRadius;
    }
    set bottomRightRadius(newValue) {
        if (core.tools.isNumber(newValue) && this.#bottomRightRadius !== newValue) {
            this.#bottomRightRadius = newValue;
            this.update();
        }
    }
    //#endregion bottomRightRadius
    //#endregion Getters / Setters
    //#region Methods
    //#region assign
    assign(source) {
        if (source instanceof core.classes.RoundRect) {
            super.assign(source);
            this.#topLeftRadius = source.topLeftRadius;
            this.#topRightRadius = source.topLeftRadius;
            this.#bottomLeftRadius = source.topLeftRadius;
            this.#bottomRightRadius = source.topLeftRadius;
        }
    }
    //#endregion assign
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        super.update();
        !this.loading && !this.form.loading
            && (htmlElementStyle.borderRadius = `${this.#topLeftRadius}${PX} ${this.#topRightRadius}${PX} ${this.#bottomRightRadius}${PX} ${this.#bottomLeftRadius}${PX}`);
    }
    //#endregion update
    //#endregion Methods
}
Object.defineProperties(RoundRect.prototype, {
    'topLeftRadius': {
        enumerable: !0
    },
    'topRightRadius': {
        enumerable: !0
    },
    'bottomLeftRadius': {
        enumerable: !0
    },
    'bottomRightRadius': {
        enumerable: !0
    }
});
Object.seal(Object.freeze(RoundRect));
//#endregion RoundRect
//#region Class Ellipse
class Ellipse extends GraphicControl {
    //#region Getters / Setters
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const fillColor = this.fillColor;
        const strokeColor = this.strokeColor;
        const strokeDash = this.strokeDash;
        const strokeWidth = this.strokeWidth;
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading) {
            htmlElementStyle.borderRadius = '50%';
            fillColor && (htmlElementStyle.backgroundColor = fillColor.toRGBAString());
            strokeColor && strokeWidth > 0
                && (htmlElementStyle.border = `${strokeWidth}${core.types.CSSUNITS.PX} solid ${strokeColor.toRGBAString()}`);
        }
    }
    //#endregion update
    //#endregion Methods
}
Object.seal(Object.freeze(Ellipse));
//#endregion Ellipse
//#region Class Circle
class Circle extends SVGGraphicControl {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        let svgShape;
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.shape = SHAPES.CIRCLE;
            super(owner, props);
            svgShape = this.svgShape;
            svgShape.setAttribute('cx', '50%');
            svgShape.setAttribute('cy', '50%');
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region width
    get width() {
        return super.width;
    }
    set width(newValue) {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        const currentHeight = this.height;
        const currentWidth = this.width;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && currentWidth !== newValue && core.isHTMLRenderer && !this.loading) {
            this.propertyChanged('width');
            htmlElementStyle.width = newValue === 0
                ? String.EMPTY
                : `${newValue}${core.types.CSSUNITS.PX}`;
            currentHeight !== newValue && (htmlElementStyle.height = htmlElementStyle.width);
        }
    }
    //#endregion width
    //#region height
    get height() {
        return super.height;
    }
    set height(newValue) {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        const currentHeight = this.height;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && currentHeight !== newValue && core.isHTMLRenderer && !this.loading) {
            this.propertyChanged('height');
            htmlElementStyle.height = newValue === 0 ? String.EMPTY : `${newValue}${core.types.CSSUNITS.PX}`;
            currentHeight !== newValue && (htmlElementStyle.width = htmlElementStyle.height);
        }
    }
    //#endregion height
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const sStyle = getComputedStyle(this.HTMLElement);
        const w = parseFloat(sStyle.width) - parseFloat(sStyle.strokeWidth) * 2;
        const h = parseFloat(sStyle.height) - parseFloat(sStyle.strokeWidth) * 2;
        let r = w > h ? int(h / 2) : int(w / 2);
        //#endregion Variables déclaration
        super.update();
        r = r < 0 ? 1 : r;
        this.svgShape.setAttribute('r', r);
    }
    //#endregion update
    //#endregion Methods
}
Object.seal(Object.freeze(Circle));
//#endregion Circle
//#region Class Path
class Path extends SVGGraphicControl {
    //#region Private fields
    #path;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.shape = SHAPES.PATH;
            super(owner, props);
            if (this instanceof core.classes.Path) {
                this.svgShape.setAttribute('vector-effect', 'non-scaling-stroke');
                this.#path = new core.classes.PathData(this);
                props.hasOwnProperty('path') && (this.#path.pathString = props.path);
            }
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region path
    get path() {
        return this.#path;
    }
    set path(newValue) {
        if (this instanceof core.classes.Path && newValue instanceof core.classes.Path && this.#path !== newValue) {
            this.#path.assign(newValue);
            this.update();
        }
    }
    //#endregion path
    //#region width
    get width() {
        return super.width;
    }
    set width(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && htmlElement.offsetWidth !== newValue) {
            super.width = newValue;
            htmlElement.offsetWidth > htmlElement.offsetHeight
                && (htmlElement.offsetHeight = htmlElement.offsetWidth);
            this.update();
        }
    }
    //#endregion width
    //#region height
    get height() {
        return super.height;
    }
    set height(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue)) {
            super.height = newValue;
            htmlElement.offsetHeight > htmlElement.offsetWidth
                && (htmlElement.offsetWidth = htmlElement.offsetHeight);
            this.update();
        }
    }
    //#endregion height
    //#region pathString
    get pathString() {
        return this.#path.pathString;
    }
    set pathString(newValue) {
        this instanceof core.classes.Path && core.tools.isString(newValue) && this.#path.pathString !== newValue
            && (this.#path.pathString = newValue);
    }
    //#endregion pathString
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (htmlElement) {
            const sStyle = getComputedStyle(htmlElement);
            const strokeWidth = parseFloat(sStyle.strokeWidth);
            if (!this.loading && !this.form.loading && this.svgShape) {
                super.update();
                const path = new core.classes.PathData();
                path.assign(this.#path);
                path.resizeToRect(new core.classes.Rect(strokeWidth, strokeWidth, htmlElement.offsetWidth - strokeWidth, htmlElement.offsetHeight - strokeWidth));
                this.svgShape.setAttribute('d', path.pathString);
                path.destroy();
            }
        }
    }
    //#endregion update
    //#region destroy
    destroy() {
        this instanceof core.classe.Path && this.#path.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(Path.prototype, {
    'path': {
        enumerable: !0
    }
});
Object.seal(Object.freeze(Path));
//#endregion Path
//#region Class Pie
class Pie extends SVGGraphicControl {
    //#region Private fields
    #startAngle;
    #endAngle;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.shape = SHAPES.PATH;
            super(owner, props);
            this.#startAngle = props.hasOwnProperty('startAngle') ? props.startAngle : 0;
            this.#endAngle = props.hasOwnProperty('endAngle') ? props.endAngle : 270;
            this instanceof core.classes.Arc && (this.fillColor = Colors.TRANSPARENT);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region startAngle
    get startAngle() {
        return this.#startAngle;
    }
    set startAngle(newValue) {
        if (core.tools.isNumber(newValue) && this.#startAngle !== newValue) {
            this.#startAngle = newValue;
            this.update();
        }
    }
    //#endregion startAngle
    //#region endAngle
    get endAngle() {
        return this.#endAngle;
    }
    set endAngle(newValue) {
        if (core.tools.isNumber(newValue) && this.#endAngle !== newValue) {
            this.#endAngle = newValue;
            this.update();
        }
    }
    //#endregion endAngle
    //#endregion Getters / Setters
    //#region Methods
    //#region assign
    assign(source) {
        if (source instanceof core.classe.Pie) {
            super.assign(source);
            this.#startAngle = source.startAngle;
            this.#endAngle = source.endAngle;
        }
    }
    //#endregion assign
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (htmlElement) {
            const sStyle = getComputedStyle(htmlElement);
            const strokeWidth = parseFloat(sStyle.strokeWidth);
            if (this.svgShape) {
                super.update();
                const path = new core.classes.PathData(this);
                path.addPie(new core.classes.Rect(strokeWidth, strokeWidth, htmlElement.offsetWidth - strokeWidth, htmlElement.offsetHeight - strokeWidth), this);
                this.svgShape.setAttribute('d', path.pathString);
                path.destroy();
            }
        }
    }
    //#endregion update
    //#endregion Methods
}
Object.defineProperties(Pie.prototype, {
    'startAngle': {
        enumerable: !0
    },
    'endAngle': {
        enumerable: !0
    }
});
Object.freeze(Pie);
//#endregion Pie
//#region Chord
class Chord extends Pie { }
Object.seal(Object.freeze(Chord));
//#endregion Chord
//#region Arc
class Arc extends Pie { }
Object.seal(Object.freeze(Arc));
//#endregion Arc
//#region Class Star
class Star extends SVGGraphicControl {
    //#region Private fields
    #spikes;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.shape = SHAPES.PATH;
            super(owner, props);
            this.#spikes = props.hasOwnProperty('spikes') ? props.spikes : 4;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region spikes
    get spikes() {
        return this.#spikes;
    }
    set spikes(newValue) {
        if (core.tools.isNumber(newValue) && this.#spikes !== newValue) {
            newValue < 4 && (newValue = 4);
            this.#spikes = newValue;
            this.update();
        }
    }
    //#endregion spikes
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const sStyle = getComputedStyle(this.HTMLElement);
        let rot = Math.PI / 2 * 3;
        const cx = int(parseFloat(sStyle.width) / 2);
        const cy = int(parseFloat(sStyle.height) / 2);
        const step = Math.PI / this.#spikes;
        const outerRadius = cx > cy ? cy : cx;
        const innerRadius = (cx > cy ? cy : cx) / 2;
        const pts = [];
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading && this.svgShape) {
            super.update();
            pts.push(`M${cx},${Math.round(cy - outerRadius)}`);
            for (let i = 0; i < this.#spikes; i++) {
                let x = Math.round(cx + Math.cos(rot) * outerRadius);
                let y = Math.round(cy + Math.sin(rot) * outerRadius);
                pts.push(` L${x},${y}`);
                rot += step;
                x = Math.round(cx + Math.cos(rot) * innerRadius);
                y = Math.round(cy + Math.sin(rot) * innerRadius);
                pts.push(` L${x},${y}`);
                rot += step;
            }
            pts.push(' Z');
            this.svgShape.setAttribute('d', pts.join(String.EMPTY));
        }
    }
    //#endregion update
    //#endregion Methods
}
Object.defineProperties(Star.prototype, {
    'spikes': {
        enumerable: !0
    }
});
Object.seal(Object.freeze(Star));
//#endregion Star
//#region POLYGONSIDES
const POLYGONSIDES = Object.seal(Object.freeze({
    TRIANGLE: 3,
    LOSANGE: 4,
    PENTAGONE: 5,
    HEXAGONE: 6,
    HEPTAGONE: 7,
    OCTOGONE: 8,
    ENNEAGONE: 9,
    DECAGONE: 10,
    HENDECAGONE: 11,
    DODECAGONE: 12,
    TRIDECAGONE: 13,
    TETRADECAGONE: 14,
    PENTADECAGONE: 15,
    HEXADECAGONE: 16,
    HEPTADECAGONE: 17,
    OCTADECAGONE: 18,
    ENNEADECAGONE: 19,
    ICOSAGONE: 20,
    HENICOSAGONE: 21,
    DOICOSAGONE: 22,
    TRIAICOSAGONE: 23,
    TETRAICOSAGONE: 24,
    PENTAICOSAGONE: 25,
    HEXAICOSAGONE: 26,
    HEPTAICOSAGONE: 27,
    OCTAICOSAGONE: 28,
    ENNEAICOSAGONE: 29,
    TRIACONTAGONE: 30,
    HENTRIACONTAGONE: 31,
    DOTRIACONTAGONE: 32,
    TRITRIACONTAGONE: 33,
    TETRATRIACONTAGONE: 34,
    PENTATRIACONTAGONE: 35,
    HEXATRIACONTAGONE: 36,
    HEPTATRIACONTAGONE: 37,
    OCTATRIACONTAGONE: 38,
    ENNEATRIACONTAGONE: 39,
    TETRACONTAGONE: 40,
    PENTACONTAGONE: 50,
    HEXACONTAGONE: 60,
    HEPTACONTAGONE: 70,
    OCTACONTAGONE: 80,
    ENNEACONTAGONE: 90,
    HECTOGONE: 100,
    DIHECTOGONE: 200,
    TRIHECTOGONE: 300,
    TETRAHECTOGONE: 400,
    PENTAHECTOGONE: 500,
    HEXAHECTOGONE: 600,
    HEPTAHECTOGONE: 700,
    OCTAHECTOGONE: 800,
    ENNEAHECTOGONE: 900,
    CHILIOGONE: 1000,
    MYRIAGONE: 10000
}));
//#endregion POLYGONSIDES
//#region Class Polygon
class Polygon extends SVGGraphicControl {
    //#region Private fields
    #sides;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.shape = SHAPES.PATH;
            super(owner, props);
            this.#sides = props.hasOwnProperty('sides') ? props.sides : POLYGONSIDES.TRIANGLE;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region POLYGONSIDES
    /**
     * @type    {Object}        POLYGONSIDES
     */
    static get POLYGONSIDES() {
        return POLYGONSIDES;
    }
    //#endregion POLYGONSIDES
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const pts = [];
        const sStyle = getComputedStyle(this.HTMLElement);
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading && this.svgShape) {
            super.update();
            const cx = int(parseFloat(sStyle.width) / 2);
            const cy = int(parseFloat(sStyle.height) / 2);
            const s = cx > cy ? cy : cx;
            pts.push(`M${Math.round(cx + s * Math.cos(0))},${Math.round(cy + s * Math.sin(0))}`);
            for (let i = 1; i <= this.#sides - 1; i++) {
                pts.push(` L${Math.round(cx + s * Math.cos(i * 2 * Math.PI / this.#sides))},${Math.round(cy + s * Math.sin(i * 2 * Math.PI / this.#sides))}`);
            }
            pts.push(' Z');
            this.svgShape.setAttribute('d', pts.join(String.EMPTY));
        }
    }
    //#endregion update
    //#endregion Methods
}
Object.defineProperties(Polygon.prototype, {
    'sides': {
        enumerable: !0
    }
});
Object.seal(Object.freeze(Polygon));
//#endregion Polygon
core.classes.register(core.types.CATEGORIES.SHAPES, Line, Rectangle, RoundRect, Ellipse, Circle, Pie, Chord, Arc, Path, Star, Polygon);
//#region Templates
if (core.isHTMLRenderer) {
    const LineTpl = '<jagui-line id="{internalId}" data-class="Line" class="Control Line"><properties>{ "name": "{name}", "lineDirection": "topleft-topright" }</properties></jagui-line>';
    const RectangleTpl = '<jagui-rectangle id="{internalId}" data-class="Rectangle" class="Control Rectangle"><properties>{ "name": "{name}" }</properties></jagui-rectangle>';
    const RoundRectTpl = '<jagui-roundrect id="{internalId}" data-class="RoundRect" class="Control RoundRect"><properties>{ "name": "{name}" }</properties></jagui-roundrect>';
    const EllipseTpl = '<jagui-ellipse id="{internalId}" data-class="Ellipse" class="Control Ellipse"><properties>{ "name": "{name}" }</properties></jagui-ellipse>';
    const CircleTpl = '<jagui-circle id="{internalId}" data-class="Circle" class="Control Circle"><properties>{ "name": "{name}" }</properties></jagui-circle>';
    const PieTpl = '<jagui-pie id="{internalId}" data-class="Pie" class="Control Pie"><properties>{ "name": "{name}" }</properties></jagui-pie>';
    const ChordTpl = '<jagui-chord id="{internalId}" data-class="Chord" class="Control Chord"><properties>{ "name": "{name}" }</properties></jagui-chord>';
    const ArcTpl = '<jagui-arc id="{internalId}" data-class="Arc" class="Control Arc"><properties>{ "name": "{name}" }</properties></jagui-arc>';
    const PathTpl = '<jagui-path id="{internalId}" data-class="Path" class="Control Path"><properties>{ "name": "{name}", "path": "M0.0429,0.60451c2.56769,0 4.65071,2.10669 4.65071,4.70101c0,2.59433 -2.08302,4.69899 -4.65071,4.69899c-2.56767,0 -4.65071,2.10668 -4.65071,4.70102c0,2.59431 2.08305,4.69897 4.65071,4.69897c5.13536,0 9.30346,-4.21134 9.30346,-9.39999c0,-5.18864 -4.1681,-9.4 -9.30346,-9.4zm0,3.23195c-0.80281,0 -1.45397,0.65792 -1.45397,1.46906c0,0.81114 0.65116,1.46907 1.45397,1.46907c0.80281,0 1.45398,-0.65793 1.45398,-1.46907c0,-0.81114 -0.65117,-1.46906 -1.45398,-1.46906zm0,9.40001c0.8024,0 1.45398,0.65834 1.45398,1.46907c0,0.81071 -0.65158,1.46906 -1.45398,1.46906c-0.80239,0 -1.45397,-0.65835 -1.45397,-1.46906c0,-0.81073 0.65158,-1.46907 1.45397,-1.46907zm9.09477,-3.22597c0,5.1848 -4.15991,9.3879 -9.29145,9.3879c-5.13153,0 -9.29146,-4.2031 -9.29146,-9.3879c0,-5.18479 4.15993,-9.3879 9.29146,-9.3879c5.13153,0 9.29145,4.2031 9.29145,9.3879z" }</properties></jagui-path>';
    const StarTpl = '<jagui-star id="{internalId}" data-class="Star" class="Control Star"><properties>{ "name": "{name}" }</properties></jagui-star>';
    const PolygonTpl = '<jagui-polygon id="{internalId}" data-class="Polygon" class="Control Polygon"><properties>{ "name": "{name}", "path": "M20,10 L5,19 L5,1 Z" }</properties></jagui-polygon>';
    core.classes.registerTemplates([{ Class: Line, template: LineTpl }, { Class: Rectangle, template: RectangleTpl }, { Class: RoundRect, template: RoundRectTpl }, { Class: Ellipse, template: EllipseTpl },
    { Class: Circle, template: CircleTpl }, { Class: Pie, template: PieTpl }, { Class: Chord, template: ChordTpl }, { Class: Arc, template: ArcTpl }, { Class: Path, template: PathTpl },
    { Class: Star, template: StarTpl }, { Class: Polygon, template: PolygonTpl }]);
}
//#endregion Templates
export { Line, Rectangle, RoundRect, Ellipse, Circle, Pie, Chord, Arc, Path, Star, Polygon };
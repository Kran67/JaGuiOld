//#region Import
import { SVGGraphicControl } from "/scripts/core/svggraphiccontrol.js";
import { Color, Colors } from "/scripts/core/color.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region Direction of Line
const LINEDIRECTIONS = {
    TOPLEFT_BOTTOMRIGHT: "topleft-bottomright",
    TOPRIGHT_BOTTOMLEFT: "topright-bottomleft",
    TOPLEFT_TOPRIGHT: "topleft-topright",
    BOTTOMLEFT_BOTTOMRIGHT: "bottomleft-bottomright",
    TOPLEFT_BOTTOMLEFT: "topleft-bottomleft",
    TOPRIGHT_BOTTOMRIGHT: "topright-bottomright",
    MIDDLETOP_MIDDLEBOTTOM: "middletop-middlebottom",
    MIDDLELEFT_MIDDLERIGHT: "middleleft-middleright"
};
//#endregion
//#region Line
const Line = (() => {
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
    //#region Class Line
    class Line extends SVGGraphicControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                this.strokeColor.assign(props.hasOwnProperty("color")?color.parse(props.color):Colors.WHITE);
                priv.lineDirection = props.hasOwnProperty("lineDirection")?props.lineDirection:LINEDIRECTIONS.TOPLEFT_BOTTOMRIGHT;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region LINEDIRECTIONS
        /**
         * @type    {Object}        LINEDIRECTIONS
         */
        static get LINEDIRECTIONS() {
            return LINEDIRECTIONS;
        }
        //#endregion LINEDIRECTIONS
        get lineDirection() {
            return internal(this).lineDirection;
        }
        set lineDirection(newValue) {
            if (tools.valueInSet(newValue, LINEDIRECTIONS)) {
                if (priv.lineDirection !== newValue) {
                    priv.lineDirection = newValue;
                    this.update();
                }
            }
        }
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return Line;
    //#endregion Line
})();
//#endregion Line
//#region Rectangle
const Rectangle = (() => {
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
    //#region Class Rectangle
    class Rectangle extends SVGGraphicControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return Rectangle;
    //#endregion Rectangle
})();
//#endregion Rectangle
//#region RoundRect
const RoundRect = (() => {
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
    //#region Class RoundRect
    class RoundRect extends SVGGraphicControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return RoundRect;
    //#endregion RoundRect
})();
//#endregion RoundRect
//#region Ellipse
const Ellipse = (() => {
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
    //#region Class Ellipse
    class Ellipse extends SVGGraphicControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return Ellipse;
    //#endregion Ellipse
})();
//#endregion Ellipse
//#region Circle
const Circle = (() => {
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
    //#region Class Circle
    class Circle extends SVGGraphicControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return Circle;
    //#endregion Circle
})();
//#endregion Circle
//#region Path
const Path = (() => {
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
    //#region Class Path
    class Path extends SVGGraphicControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return Path;
    //#endregion Path
})();
//#endregion Path
//#region Pie
const Pie = (() => {
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
    //#region Class Pie
    class Pie extends SVGGraphicControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return Pie;
    //#endregion Pie
})();
//#endregion Pie
//#region Chord
// Inheritance of Chord
class Chord extends Pie {
    //#region Methods
    //#endregion
};
Object.seal(Chord);
Object.freeze(Chord);
//#region Arc
const Arc = (() => {
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
    //#region Class Arc
    class Arc extends SVGGraphicControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return Arc;
    //#endregion Arc
})();
//#endregion Arc
//#region Star
const Star = (() => {
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
    //#region Class Star
    class Star extends SVGGraphicControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return Star;
    //#endregion Star
})();
//#endregion Star
//#region Polygon
const Polygon = (() => {
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
    //#region Class Polygon
    class Polygon extends SVGGraphicControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return Polygon;
    //#endregion Polygon
})();
//#endregion Polygon
Core.classes.register(Types.CATEGORIES.SHAPES, Line, Rectangle, RoundRect, Ellipse, Circle, Pie, Chord, Arc, Path, Star, Polygon);
//#region Templates
if (Core.isHTMLRenderer) {
    var LineTpl = "<div id='{internalId}' data-name='{name}' data-class='Line' class='Control Line' data-linedirection='topleft-topright' style='width:65px;height:65px;'>\
                 <svg class='Control svgShape'>\
                 <line x1='0' y1='0' x2='100%' y2='100%' stroke='white' stroke-width='1' />\
                 </svg>\
                 </div>",
        RectangleTpl = "<div id='{internalId}' data-name='{name}' data-class='Rectangle' class='Control Rectangle' style='width:65px;height:65px;'></div>",
        RoundRectTpl = "<div id='{internalId}' data-name='{name}' data-class='RoundRect' class='Control RoundRect' data-topleftradius='20' data-toprightradius='20' data-bottomleftradius='20' data-bottomrightradius='20' style='width:65px;height:65px;'></div>",
        EllipseTpl = "<div id='{internalId}' data-name='{name}' data-class='Ellipse' class='Control Ellipse' style='width:65px;height:65px;'></div>",
        CircleTpl = "<div id='{internalId}' data-name='{name}' data-class='Circle' class='Control Circle' style='width:65px;height:65px;'>\
                   <svg class='Control svgShape'>\
                   <circle cx='50%' cy='50%' r='10' fill='black' stroke='white' stroke-width='1' />\
                   </svg>\
                   </div>",
        PieTpl = "<div id='{internalId}' data-name='{name}' data-class='Pie' class='Control Pie' data-startangle='0' data-endangle='270' style='width:65px;height:65px;'>\
                <svg class='Control svgShape'>\
                <path d='M10,10 L10,0 A10,10 0 1 0 20,10 z' fill='black' stroke='white' stroke-width='1' />\
                </svg>\
                </div>",
        ChordTpl = "<div id='{internalId}' data-name='{name}' data-class='Chord' class='Control Chord' data-startangle='270' data-endangle='540' style='width:65px;height:65px;'>\
                  <svg class='Control svgShape'>\
                  <path d='M10,0 A10,10 0 1 1 0,10 z' fill='black' stroke='white' stroke-width='1' />\
                  </svg>\
                  </div>",
        ArcTpl = "<div id='{internalId}' data-name='{name}' data-class='Arc' class='Control Arc' data-startangle='0' data-endangle='90' style='width:65px;height:65px;'>\
                <svg class='Control svgShape'>\
                <path d='M 0.15,8.2C 1.1,2.8 6.3,-0.8 11.7,0.15 C 17.1,1.1 20.8,6.3 19.8,11.7 C 19.7,12.3 19.5,12.8 19.4,13.4' fill='transparent' stroke='white' stroke-width='1' />\
                </svg>\
                </div>",
        PathTpl = "<div id='{internalId}' data-name='{name}' data-class='Path' class='Control Path' style='width:65px;height:65px;'>\
                 <svg class='Control svgShape'>\
                 <path d='m10.0429,0.60451c2.56769,0 4.65071,2.10669 4.65071,4.70101c0,2.59433 -2.08302,4.69899 -4.65071,4.69899c-2.56767,0 -4.65071,2.10668 -4.65071,4.70102c0,2.59431 2.08305,4.69897 4.65071,4.69897c5.13536,0 9.30346,-4.21134 9.30346,-9.39999c0,-5.18864 -4.1681,-9.4 -9.30346,-9.4zm0,3.23195c-0.80281,0 -1.45397,0.65792 -1.45397,1.46906c0,0.81114 0.65116,1.46907 1.45397,1.46907c0.80281,0 1.45398,-0.65793 1.45398,-1.46907c0,-0.81114 -0.65117,-1.46906 -1.45398,-1.46906zm0,9.40001c0.8024,0 1.45398,0.65834 1.45398,1.46907c0,0.81071 -0.65158,1.46906 -1.45398,1.46906c-0.80239,0 -1.45397,-0.65835 -1.45397,-1.46906c0,-0.81073 0.65158,-1.46907 1.45397,-1.46907zm9.09477,-3.22597c0,5.1848 -4.15991,9.3879 -9.29145,9.3879c-5.13153,0 -9.29146,-4.2031 -9.29146,-9.3879c0,-5.18479 4.15993,-9.3879 9.29146,-9.3879c5.13153,0 9.29145,4.2031 9.29145,9.3879z' fill='black' stroke='white' stroke-width='1' />\
                 </svg>\
                 </div>",
        StarTpl = "<div id='{internalId}' data-name='{name}' data-class='Star' class='Control Star' data-spikes='4' style='width:65px;height:65px;'>\
                 <svg class='Control svgShape'>\
                 <path d='M10,0 L10,0 L14,6 L20,10 L14,14 L10,20 L6,14 L0,10 L6,6 Z' fill='black' stroke='white' stroke-width='1' />\
                 </svg>\
                 </div>",
        PolygonTpl = "<div id='{internalId}' data-name='{name}' data-class='Polygon' class='Control Polygon' data-sides='3' style='width:65px;height:65px;'>\
                    <svg class='Control svgShape'>\
                    <path d='M20,10 L5,19 L5,1 Z' fill='black' stroke='white' stroke-width='1' />\
                    </svg>\
                    </div>";
    Core.classes.registerTemplates([{ Class: Line, template: LineTpl }, { Class: Rectangle, template: RectangleTpl }, { Class: RoundRect, template: RoundRectTpl }, { Class: Ellipse, template: EllipseTpl },
    { Class: Circle, template: CircleTpl }, { Class: Pie, template: PieTpl }, { Class: Chord, template: ChordTpl }, { Class: Arc, template: ArcTpl }, { Class: Path, template: PathTpl },
    { Class: Star, template: StarTpl }, { Class: Polygon, template: PolygonTpl }]);
}
//#endregion

/*(function () {
    //#region Direction of Line
    $j.types.LineDirections = {
        TOPLEFT_BOTTOMRIGHT: "topleft-bottomright",
        TOPRIGHT_BOTTOMLEFT: "topright-bottomleft",
        TOPLEFT_TOPRIGHT: "topleft-topright",
        BOTTOMLEFT_BOTTOMRIGHT: "bottomleft-bottomright",
        TOPLEFT_BOTTOMLEFT: "topleft-bottomleft",
        TOPRIGHT_BOTTOMRIGHT: "topright-bottomright",
        MIDDLETOP_MIDDLEBOTTOM: "middletop-middlebottom",
        MIDDLELEFT_MIDDLERIGHT: "middleleft-middleright"
    };
    //#endregion
    //#region Line
    var Line = $j.classes.SVGGraphicControl.extend("Line", {
        init: function (owner, props) {
            props = props || {};
            if (owner) {
                this._inherited(owner, props);
                this.strokeColor.assign(_colors.WHITE);
                this.lineDirection = $j.types.LineDirections.TOPLEFT_BOTTOMRIGHT;
            }
        },
        //#region Setter
        setLineDirection: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.LineDirections)) return;
            if (this.lineDirection !== newValue) {
                this.lineDirection = newValue;
                this.update();
            }
        },
        setWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.width !== newValue) {
                this._inherited(newValue);
                //this.endPoint.x=this.startPoint.x+newValue;
                this.update();
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.height !== newValue) {
                this._inherited(newValue);
                //this.endPoint.y=this.startPoint.y+newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            var w, h, w2, h2;
            if (this._loading || this.form._loading) return;
            if (!this._svgShape) return;
            this._inherited();
            w = this._HTMLElement.offsetWidth;
            h = this._HTMLElement.offsetHeight;
            w2 = ~~(w / 2);
            h2 = ~~(h / 2);
            switch (this.lineDirection) {
                case $j.types.LineDirections.TOPLEFT_BOTTOMRIGHT:
                    this._svgShape.setAttribute("x1", 0);
                    this._svgShape.setAttribute("y1", 0);
                    this._svgShape.setAttribute("x2", "100%");
                    this._svgShape.setAttribute("y2", "100%");
                    break;
                case $j.types.LineDirections.TOPRIGHT_BOTTOMLEFT:
                    this._svgShape.setAttribute("x1", 0);
                    this._svgShape.setAttribute("y1", "100%");
                    this._svgShape.setAttribute("x2", "100%");
                    this._svgShape.setAttribute("y2", 0);
                    break;
                case $j.types.LineDirections.TOPLEFT_TOPRIGHT:
                    this._svgShape.setAttribute("x1", 0);
                    this._svgShape.setAttribute("y1", 0);
                    this._svgShape.setAttribute("x2", "100%");
                    this._svgShape.setAttribute("y2", 0);
                    break;
                case $j.types.LineDirections.BOTTOMLEFT_BOTTOMRIGHT:
                    this._svgShape.setAttribute("x1", 0);
                    this._svgShape.setAttribute("y1", "100%");
                    this._svgShape.setAttribute("x2", "100%");
                    this._svgShape.setAttribute("y2", "100%");
                    break;
                case $j.types.LineDirections.TOPLEFT_BOTTOMLEFT:
                    this._svgShape.setAttribute("x1", 0);
                    this._svgShape.setAttribute("y1", 0);
                    this._svgShape.setAttribute("x2", 0);
                    this._svgShape.setAttribute("y2", "100%");
                    break;
                case $j.types.LineDirections.TOPRIGHT_BOTTOMRIGHT:
                    this._svgShape.setAttribute("x1", "100%");
                    this._svgShape.setAttribute("y1", 0);
                    this._svgShape.setAttribute("x2", "100%");
                    this._svgShape.setAttribute("y2", "100%");
                    break;
                case $j.types.LineDirections.MIDDLETOP_MIDDLEBOTTOM:
                    this._svgShape.setAttribute("x1", "50%");
                    this._svgShape.setAttribute("y1", 0);
                    this._svgShape.setAttribute("x2", "50%");
                    this._svgShape.setAttribute("y2", "100%");
                    break;
                case $j.types.LineDirections.MIDDLELEFT_MIDDLERIGHT:
                    this._svgShape.setAttribute("x1", 0);
                    this._svgShape.setAttribute("y1", "50%");
                    this._svgShape.setAttribute("x2", "100%");
                    this._svgShape.setAttribute("y2", "50%");
                    break;
            }
            this._svgShape.setAttribute("stroke", this.strokeColor.toARGBString());
            this._svgShape.setAttribute("stroke-width", this.strokeWidth);
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            if (this._svgShape) {
                data = this._HTMLElement.dataset.linedirection;
                if (data) this.lineDirection = data;
            }
        }
        //#endregion
    });
    Object.seal(Line);
    Object.freeze(Line);
    //#endregion
    //#region Rectangle
    var Rectangle = $j.classes.SVGGraphicControl.extend("Rectangle", {
        //#region Setters
        //#endregion
        //#region Methods
        //#endregion
    });
    Object.seal(Rectangle);
    Object.freeze(Rectangle);
    //#endregion
    //#region RoundRect
    var RoundRect = Rectangle.extend("RoundRect", {
        init: function (owner, props) {
            props = props || {};
            if (owner) {
                this._inherited(owner, props);
                this.topLeftRadius = 20;
                this.topRightRadius = 20;
                this.bottomLeftRadius = 20;
                this.bottomRightRadius = 20;
            }
        },
        //#region Setters
        setTopLeftRadius: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.topLeftRadius !== newValue) {
                this.topLeftRadius = newValue;
                this.update();
            }
        },
        setTopRightRadius: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.topRightRadius !== newValue) {
                this.topRightRadius = newValue;
                this.update();
            }
        },
        setBottomLeftRadius: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.bottomLeftRadius !== newValue) {
                this.bottomLeftRadius = newValue;
                this.update();
            }
        },
        setBottomRightRadius: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.bottomRightRadius !== newValue) {
                this.bottomRightRadius = newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        assign: function (source) {
            if (!(source instanceof $j.classes.RoundRect)) return;
            this._inherited(source);
        },
        update: function () {
            var w, h, p = function (x, y) { return x + " " + y + " "; };
            if (this._loading || this.form._loading) return;
            this._inherited();
            w = this._HTMLElement.offsetWidth;
            h = this._HTMLElement.offsetHeight;
            var strPath = "M" + p(this.topLeftRadius, 0);
            strPath += "L" + p(w - this.topRightRadius, 0) + "Q" + p(w, 0) + p(w, this.topRightRadius);
            strPath += "L" + p(w, h - this.bottomRightRadius) + "Q" + p(w, h) + p(w - this.bottomRightRadius, h);
            strPath += "L" + p(this.bottomLeftRadius, h) + "Q" + p(0, h) + p(0, h - this.bottomLeftRadius);
            strPath += "L" + p(0, this.topLeftRadius) + "Q" + p(0, 0) + p(this.topLeftRadius, 0);
            strPath += "Z";
            this._svgShape.setAttribute("d", strPath);
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.topleftradius;
            if (data) this.topLeftRadius = ~~data;
            data = this._HTMLElement.dataset.toprightradius;
            if (data) this.topRightRadius = ~~data;
            data = this._HTMLElement.dataset.bottomleftradius;
            if (data) this.bottomLeftRadius = ~~data;
            data = this._HTMLElement.dataset.bottomrightradius;
            if (data) this.bottomRightRadius = ~~data;
        },
        destroy: function () {
            this._inherited();
            this.topLeftRadius = null;
            this.topRightRadius = null;
            this.bottomLeftRadius = null;
            this.bottomRightRadius = null;
        }
        //#endregion
    });
    Object.seal(RoundRect);
    Object.freeze(RoundRect);
    //#endregion
    //#region Ellipse
    var Ellipse = $j.classes.SVGGraphicControl.extend("Ellipse", {
    });
    Object.seal(Ellipse);
    Object.freeze(Ellipse);
    //#endregion
    //#region Circle
    var Circle = $j.classes.SVGGraphicControl.extend("Circle", {
        init: function (owner, props) {
            props = props || {};
            if (owner) {
                //#region Private
                //#endregion
                this._inherited(owner, props);
            }
        },
        //#region Setters
        setWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this._HTMLElement.offsetWidth !== newValue) {
                this._inherited(newValue);
                //if (this._HTMLElement.offsetWidth>this._HTMLElement.offsetHeight) this._HTMLElementStyle.height=this._HTMLElement.offsetWidth+$j.types.CSSUnits.PX;
                this.update();
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this._HTMLElement.offsetHeight !== newValue) {
                this._inherited(newValue);
                //if (this._HTMLElement.offsetHeight>this._HTMLElement.offsetWidth) this._HTMLElementStyle.width=this._HTMLElement.offsetHeight+$j.types.CSSUnits.PX;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            var r;
            if (this._loading || this.form._loading) return;
            if (!this._svgShape) return;
            this._inherited();
            if (this._HTMLElement.offsetWidth < this._HTMLElement.offsetHeight) r = ~~(this._HTMLElement.offsetWidth / 2);
            else r = ~~(this._HTMLElement.offsetHeight / 2);
            this._svgShape.setAttribute("r", r);
        }
        //#endregion
    });
    Object.seal(Circle);
    Object.freeze(Circle);
    //#endregion
    //#region Path
    var Path = $j.classes.SVGGraphicControl.extend("Path", {
        init: function (owner, props) {
            props = props || {};
            if (owner) {
                this._inherited(owner, props);
                if (this._ClassName === "Path") this.path = new $j.classes.PathData(this)
            }
        },
        //#region Setters
        setPath: function (newValue) {
            if (this._ClassName !== "Path") return;
            if (!(newValue instanceof $j.classes.Path)) return;
            if (this.path !== newValue) {
                this.path.assign(newValue);
                this.update();
            }
        },
        setWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this._HTMLElement.offsetWidth !== newValue) {
                this._inherited(newValue);
                if (this._HTMLElement.offsetWidth > this._HTMLElement.offsetHeight) this._HTMLElement.offsetHeight = this._HTMLElement.offsetWidth;
                this.update();
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this._HTMLElement.offsetHeight !== newValue) {
                this._inherited(newValue);
                if (this._HTMLElement.offsetHeight > this._HTMLElement.offsetWidth) this._HTMLElement.offsetWidth = this._HTMLElement.offsetHeight;
                this.update();
            }
        },
        setPathString: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.path.getPathString() !== newValue) {
                this.path.setPathString(newValue);
                this.update();
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            if (this._loading || this.form._loading) return;
            if (!this._svgShape) return;
            this._inherited();
            // path part
            var path = new $j.classes.PathData();
            path.assign(this.path);
            path.resizeToRect(new $j.classes.Rect(0, 0, this._HTMLElement.offsetWidth, this._HTMLElement.offsetHeight));
            this._svgShape.setAttribute("d", path.getPathString());
            path.destroy();
        },
        updateFromHTML: function () {
            this._inherited();
            if (this._ClassName === "Path") this.path.setPathString(this._svgShape.getAttribute("d"));
        },
        destroy: function () {
            this._inherited();
            if (this._ClassName === "Path") this.path.destroy();
        }
        //#endregion
    });
    //#endregion
    //#region Pie
    // Inheritance of Pie
    var Pie = Path.extend("Pie", {
        init: function (owner, props) {
            props = props || {};
            if (owner) {
                this._inherited(owner, props);
                this.startAngle = 0;
                this.endAngle = 270;
            }
        },
        //#region Setters
        setStartAngle: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.startAngle !== newValue) {
                this.startAngle = newValue;
                this.update();
            }
        },
        setEndAngle: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.endAngle !== newValue) {
                this.endAngle = newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        assign: function (source) {
            if (!(source instanceof $j.pie)) return;
            this._inherited(source);
            this.startAngle = source.startAngle;
            this.endAngle = source.endAngle;
        },
        update: function () {
            if (this._loading || this.form._loading) return;
            if (!this._svgShape) return;
            this._inherited();
            var path = new $j.classes.PathData(this);
            path.addPie(new $j.classes.Rect(0, 0, this._HTMLElement.offsetWidth, this._HTMLElement.offsetHeight), this);
            this._svgShape.setAttribute("d", path.getPathString());
            path.destroy();
        },
        updateFromHTML: function () {
            var data;
            data = this._HTMLElement.dataset.startangle;
            if (data) this.startAngle = ~~data;
            data = this._HTMLElement.dataset.endangle;
            if (data) this.endAngle = ~~data;
            this._inherited();
        },
        destroy: function () {
            this._inherited();
            this.startAngle = null;
            this.endAngle = null;
        }
        //#endregion
    });
    Object.seal(Pie);
    Object.freeze(Pie);
    //#endregion
    //#region Chord
    // Inheritance of Chord
    var Chord = Pie.extend("Chord", {
        //#region Methods
        //#endregion
    });
    Object.seal(Chord);
    Object.freeze(Chord);
    //#endregion
    //#region Arc
    // Inheritance of Arc
    var Arc = Path.extend("Arc", {
        init: function (owner, props) {
            props = props || {};
            if (owner) {
                this._inherited(owner, props);
                this.startAngle = 0;
                this.endAngle = 90;
            }
        },
        //#region Setters
        setStartAngle: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.startAngle !== newValue) {
                this.startAngle = newValue;
                this.update();
            }
        },
        setEndAngle: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.endAngle !== newValue) {
                this.endAngle = newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        assign: function (source) {
            if (!(source instanceof $j.pie)) return;
            this._inherited(source);
            this.startAngle = source.startAngle;
            this.endAngle = source.endAngle;
        },
        update: function () {
            if (this._loading || this.form._loading) return;
            if (!this._svgShape) return;
            this._inherited();
            var path = new $j.classes.PathData(this);
            path.addArc(new $j.classes.Point(~~(this._HTMLElement.offsetWidth / 2), ~~(this._HTMLElement.offsetHeight / 2)), new $j.classes.Point(~~(this._HTMLElement.offsetWidth / 2), ~~(this._HTMLElement.offsetHeight / 2)), this.startAngle, this.endAngle - this.startAngle);
            this._svgShape.setAttribute("d", path.getPathString());
            this._svgShape.setAttribute("fill", "transparent");
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.startangle;
            if (data) this.startAngle = ~~data;
            data = this._HTMLElement.dataset.endangle;
            if (data) this.endAngle = ~~data;
        },
        destroy: function () {
            this._inherited();
            this.startAngle = null;
            this.endAngle = null;
        }
        //#endregion
    });
    Object.seal(Arc);
    Object.freeze(Arc);
    //#endregion
    //#region Star
    var Star = Path.extend("Star", {
        init: function (owner, props) {
            props = props || {};
            if (owner) {
                this._inherited(owner, props);
                this.spikes = 4;
            }
        },
        //#region Setters
        setSpikes: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.spikes !== newValue) {
                if (newValue < 4) newValue = 4;
                this.spikes = newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        updateFromHTML: function () {
            this._inherited();
            var data = this._HTMLElement.dataset.spikes;
            if (data) this.spikes = data;
        },
        update: function () {
            var rot = Math.PI / 2 * 3, cx = ~~(this._HTMLElement.offsetWidth / 2), cy = ~~(this._HTMLElement.offsetHeight / 2), step = Math.PI / this.spikes, outerRadius = ~~(this._HTMLElement.offsetWidth / 2), innerRadius = ~~(this._HTMLElement.offsetWidth / 4), i, x, y, pts = [];
            if (this._loading || this.form._loading) return;
            if (!this._svgShape) return;
            this._inherited();
            pts.push("M" + cx + "," + $j.round(cy - outerRadius));
            for (i = 0; i < this.spikes; i++) {
                x = $j.round(cx + $j.cos(rot) * outerRadius);
                y = $j.round(cy + $j.sin(rot) * outerRadius);
                pts.push(" L" + x + "," + y);
                rot += step;
                x = $j.round(cx + $j.cos(rot) * innerRadius);
                y = $j.round(cy + $j.sin(rot) * innerRadius);
                pts.push(" L" + x + "," + y);
                rot += step;
            }
            pts.push(" Z");
            this._svgShape.setAttribute("d", pts.join(String.EMPTY));
        },
        destroy: function () {
            this._inherited();
            this.spikes = null;
        }
        //#endregion
    });
    Object.seal(Star);
    Object.freeze(Star);
    //#endregion
    //#region Polygon
    $j.types.polygonSides = {
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
    };
    Polygon = Path.extend("Polygon", {
        init: function Polygon(owner, props) {
            props = props || {};
            if (owner) {
                this._inherited(owner, props);
                this.sides = $j.types.polygonSides.TRIANGLE;
            }
        },
        //#region Setter
        setSides: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.polygonSides)) return;
            if (this.sides !== newValue) {
                this.sides = newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            var pts = [], cx, cy, s;
            if (this._loading || this.form._loading) return;
            if (!this._svgShape) return;
            this._inherited();
            cx = ~~(this._HTMLElement.offsetWidth / 2);
            cy = ~~(this._HTMLElement.offsetHeight / 2);
            s = ~~(this._HTMLElement.offsetWidth / 2);
            pts.push("M" + $j.round(cx + s * $j.cos(0)) + "," + $j.round(cy + s * $j.sin(0)));
            for (var i = 1; i <= this.sides - 1; i++) {
                pts.push(" L" + $j.round(cx + s * $j.cos(i * 2 * Math.PI / this.sides)) + "," + $j.round(cy + s * $j.sin(i * 2 * Math.PI / this.sides)));
            }
            pts.push(" Z");
            this._svgShape.setAttribute("d", pts.join(String.EMPTY));
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.sides;
            if (data) this.sides = ~~data;
        },
        destroy: function () {
            this._inherited();
            this.sides = null;
        }
        //#endregion
    });
    Object.seal(Polygon);
    Object.freeze(Polygon);
    //#endregion
*/
/*
http://www.tumuski.com/2005/01/3d-via-css/
https://hacks.mozilla.org/2011/08/rendering-3d-with-css-and-javascript-with-dom3d-guest-post/
https://code.google.com/p/poly2tri/
http://www.codeproject.com/Articles/44370/Triangulation-of-Arbitrary-Polygons
http://barradeau.com/js/utils/geometry/Triangulator.js
*/
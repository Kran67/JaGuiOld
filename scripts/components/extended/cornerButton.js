//#region Import
import { Button } from "/scripts/components/common/button.js";
import { Point } from "/scripts/core/geometry.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region CORNERSTYPES
/**
 * @type    {Object}        CORNERSTYPES
 */
const _CORNERSTYPES = Object.freeze({
    ROUND: "round",
    BEVEL: "bevel",
    NOTCH: "notch",
    SCOOP: "scoop",
    SHARP: "sharp"
});
//#endregion
//#region CORNERS
/**
 * @type    {Object}        CORNERS
 */
const _CORNERS = Object.freeze({
    TOPLEFT: "topleft",
    TOPRIGHT: "topright",
    BOTTOMRIGHT: "bottomright",
    BOTTOMLEFT: "bottomleft"
});
//#endregion
//#region CornerButton
const CornerButton = (() => {
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
    //#region Class CornerButton
    class CornerButton extends Button {
        //#region CORNERSTYPES
        /**
         * @type    {Object}        CORNERSTYPES
         */
        static get CORNERSTYPES() {
            return _CORNERSTYPES;
        }
        //#endregion
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                const topLeftCorner = props.hasOwnProperty("topLeftCorner")?props.topLeftCorner:null;
                priv.topLeftCorner = topLeftCorner?new Point(topLeftCorner.x,topLeftCorner.y):new Point;
                priv.topLeftCornerType = topLeftCorner.hasOwnProperty("type")?topLeftCorner.type:_CORNERSTYPES.ROUND;
                const topRightCorner = props.hasOwnProperty("topRightCorner")?props.topRightCorner:null;
                priv.topRightCorner = topRightCorner?new Point(topRightCorner.x,topRightCorner.y):new Point;
                priv.topRightCornerType = topRightCorner.hasOwnProperty("type")?topRightCorner.type:_CORNERSTYPES.ROUND;
                const bottomRightCorner = props.hasOwnProperty("bottomRightCorner")?props.bottomRightCorner:null;
                priv.bottomRightCorner = bottomRightCorner?new Point(bottomRightCorner.x,bottomRightCorner.y):new Point;
                priv.bottomRightCornerType = bottomRightCorner.hasOwnProperty("type")?bottomRightCorner.type:_CORNERSTYPES.ROUND;
                const bottomLeftCorner = props.hasOwnProperty("bottomLeftCorner")?props.bottomLeftCorner:null;
                priv.bottomLeftCorner = bottomLeftCorner?new Point(bottomLeftCorner.x,bottomLeftCorner.y):new Point;
                priv.bottomLeftCornerType = bottomLeftCorner.hasOwnProperty("type")?bottomLeftCorner.type:_CORNERSTYPES.ROUND;
                this.allowUpdateOnResize = true;
            }
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region topLeftCorner
        get topLeftCorner() {
            return internal(this).topLeftCorner;
        }
        set topLeftCorner(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Point) {
                priv.topLeftCorner.assign(newValue);
                if (Core.isHTMLRenderer) {
                    this.generateSVGPath();
                } else {
                    //
                }
            }
        }
        //#endregion topLeftCorner
        //#region topLeftCornerType
        get topLeftCornerType() {
            return internal(this).topLeftCornerType;
        }
        set topLeftCornerType(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, _CORNERSTYPES)) {
                if (priv.topLeftCornerType !== newValue) {
                    priv.topLeftCornerType = newValue;
                    if (Core.isHTMLRenderer) {
                        this.generateSVGPath();
                    } else {
                        //
                    }
                }
            }
        }
        //#endregion topLeftCornerType
        //#region topRightCorner
        get topRightCorner() {
            return internal(this).topRightCorner;
        }
        set topRightCorner(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Point) {
                priv.topRightCorner.assign(newValue);
                if (Core.isHTMLRenderer) {
                    this.generateSVGPath();
                } else {
                    //
                }
            }
        }
        //#endregion topRightCorner
        //#region topRightCornerType
        get topRightCornerType() {
            return internal(this).topRightCornerType;
        }
        set topRightCornerType(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, _CORNERSTYPES)) {
                if (priv.topRightCornerType !== newValue) {
                    priv.topRightCornerType = newValue;
                    if (Core.isHTMLRenderer) {
                        this.generateSVGPath();
                    } else {
                        //
                    }
                }
            }
        }
        //#endregion topRightCornerType
        //#region topLeftCorner
        get topLeftCorner() {
            return internal(this).topLeftCorner;
        }
        set topLeftCorner(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Point) {
                priv.topLeftCorner.assign(newValue);
                if (Core.isHTMLRenderer) {
                    this.generateSVGPath();
                } else {
                    //
                }
            }
        }
        //#endregion topLeftCorner
        //#region bottomLeftCornerType
        get bottomLeftCornerType() {
            return internal(this).bottomLeftCornerType;
        }
        set bottomLeftCornerType(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, _CORNERSTYPES)) {
                if (priv.bottomLeftCornerType !== newValue) {
                    priv.bottomLeftCornerType = newValue;
                    if (Core.isHTMLRenderer) {
                        this.generateSVGPath();
                    } else {
                        //
                    }
                }
            }
        }
        //#endregion bottomLeftCornerType
        //#region bottomRightCorner
        get bottomRightCorner() {
            return internal(this).bottomRightCorner;
        }
        set bottomRightCorner(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Point) {
                priv.bottomRightCorner.assign(newValue);
                if (Core.isHTMLRenderer) {
                    this.generateSVGPath();
                } else {
                    //
                }
            }
        }
        //#endregion bottomRightCorner
        //#region bottomRightCornerType
        get bottomRightCornerType() {
            return internal(this).bottomRightCornerType;
        }
        set bottomRightCornerType(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, _CORNERSTYPES)) {
                if (priv.bottomRightCornerType !== newValue) {
                    priv.bottomRightCornerType = newValue;
                    if (Core.isHTMLRenderer) {
                        this.generateSVGPath();
                    } else {
                        //
                    }
                }
            }
        }
        //#endregion bottomRightCornerType
        //#endregion Getter / Setter
        //#region Methods
        //#region update
        update() {
            if (!this.loading && !this.form.loading) {
                super.update();
                this.generateSVGPath();
            }
        }
        //#endregion update
        //#region generateSVGPath
        generateSVGPath() {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            const path = htmlElement.querySelector("path");
            const priv = internal(this);
            const r = [
                { ...priv.topLeftCorner.toSimpleObject, type: priv.topLeftCornerType, unit: priv.topLeftCornerUnit },
                { ...priv.topRightCorner.toSimpleObject, type: priv.topRightCornerType, unit: priv.topRightCornerUnit },
                { ...priv.bottomRightCorner.toSimpleObject, type: priv.bottomRightCornerType, unit: priv.bottomRightCornerUnit },
                { ...priv.bottomLeftCorner.toSimpleObject, type: priv.bottomLeftCornerType, unit: priv.bottomLeftCornerUnit }
            ];
            // Shrink overlapping curves
            const ratio = [1, 1];
            //#endregion Variables déclaration
            for (let i = 0; i < r.length; i++) {
                let radii = r[i];
                let radiiAdj = r[i + (i % 2 ? -1 : 1)];

                ratio[0] = Math.min(
                    ratio[0],
                    htmlElement.offsetWidth / (radii.x + radiiAdj.x)
                );
                radiiAdj = r[(i % 2 ? i + 5 : i + 3) % 4];

                ratio[1] = Math.min(
                    ratio[1],
                    htmlElement.offsetHeight / (radii.y + radiiAdj.y)
                );
            }
            if (ratio[0] < 1 || ratio[1] < 1) {
                for (let i = 0; i < r.length; i++) {
                    r[i].x *= ratio[0];
                    r[i].y *= ratio[1];
                }
            }
            const d = ["M", r[0].x, "0"];
            d.push("h", htmlElement.offsetWidth - r[0].x - r[1].x);
            this.drawCorner(_CORNERS.TOPRIGHT, r[1], d);
            d.push("v", htmlElement.offsetHeight - r[1].y - r[2].y);
            this.drawCorner(_CORNERS.BOTTOMRIGHT, r[2], d);
            d.push("h", -htmlElement.offsetWidth + r[2].x + r[3].x);
            this.drawCorner(_CORNERS.BOTTOMLEFT, r[3], d);
            d.push("v", -htmlElement.offsetHeight + r[3].y + r[0].y);
            this.drawCorner(_CORNERS.TOPLEFT, r[0], d);
            d.push("Z");
            path.setAttribute("d", d.join(String.SPACE));
        }
        //#endregion generateSVGPath
        //#region drawCorner
        drawCorner(corner, r, d) {
            if (r.type === _CORNERSTYPES.NOTCH) {
                switch (corner) {
                    case _CORNERS.TOPRIGHT:
                        d.push("v", r.y, "h", r.x);
                        break;
                    case _CORNERS.BOTTOMRIGHT:
                        d.push("h", -r.x, "v", r.y);
                        break;
                    case _CORNERS.BOTTOMLEFT:
                        d.push("v", -r.y, "h", -r.x);
                        break;
                    case _CORNERS.TOPLEFT:
                        d.push("h", r.x, "v", -r.y);
                        break;
                }
            } else if (r.type === _CORNERSTYPES.SHARP) {
                const y2 = r.y * 0.5;
                const x2 = r.x * 0.5;
                switch (corner) {
                    case _CORNERS.TOPRIGHT:
                        d.push("v", y2, "l", r.x - x2, r.y - y2, "h", r.x - x2);
                        break;
                    case _CORNERS.BOTTOMRIGHT:
                        d.push("h", -(r.x - x2), "l", -(r.x - x2), r.y - y2, "v", r.y - y2);
                        break;
                    case _CORNERS.BOTTOMLEFT:
                        d.push("v", -y2, "l", -(r.x - x2), -(r.y - y2), "h", -(r.x - x2));
                        break;
                    case _CORNERS.TOPLEFT:
                        d.push("h", r.x - x2, "l", r.x - x2, -(r.y - y2), "v", -r.y - y2);
                        break;
                }
            } else {
                if (r.type === _CORNERSTYPES.ROUND || r.type === _CORNERSTYPES.SCOOP) {
                    const sweep = +(r.type === _CORNERSTYPES.ROUND);
                    d.push("a", r.x, r.y, 0, 0, sweep);
                } else if (r.type === _CORNERSTYPES.BEVEL) {
                    d.push("l");
                }
                d.push(corner === _CORNERS.BOTTOMRIGHT || corner === _CORNERS.BOTTOMLEFT ? -r.x : r.x);
                d.push(corner === _CORNERS.BOTTOMLEFT || corner === _CORNERS.TOPLEFT ? -r.y : r.y);
            }
        }
        //#endregion drawCorner
        //#region assign
        assign(source) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (source instanceof Core.classes.CornerButton) {
                priv.topLeftCorner.assign(source.topLeftCorner);
                priv.topLeftCornerType = source.topLeftCornerType;
                //priv.topLeftCornerUnit = source.;
                priv.topRightCorner.assign(source.topRightCorner);
                priv.topRightCornerType = source.topRightCornerType;
                //priv.topRightCornerUnit = source.;
                priv.bottomRightCorner.assign(source.bottomRightCorner);
                priv.bottomRightCornerType = source.bottomRightCornerType;
                //priv.bottomRightCornerUnit = source.;
                priv.bottomLeftCorner.assign(source.bottomLeftCorner);
                priv.bottomLeftCornerType = source.bottomLeftCornerType;
                //priv.bottomLeftCornerUnit = source.;
            }
        }
        //#endregion assign
        //#endregion
    }
    return CornerButton;
    //#endregion
})();
//#endregion
Core.classes.register(Types.CATEGORIES.EXTENDED, CornerButton);
//<jagui-cornerbutton id="_7hes89u" data-class="CornerButton" class="Control CornerButton csr_default {theme}"><properties>{ "name": "CornerButton1",  
//    "topLeftCorner":{"x":15,"y":15, "type":"sharp", "unit":"px"}, "topRightCorner":{ "x":15,"y":15, "type":"scoop", "unit":"px"}, "bottomLeftCorner":{"x":15,"y":15, "type":"notch", "unit":"px"}, "bottomRightCorner":{"x":15,"y":15, "type":"bevel", "unit":"px"} , "onClick":"Core.dialogs.prompt('prompt','test','blabla')", "tabOrder": 15, "top": 180, "left": 150, "width": 68, "height": 50, "caption":"CornerButton" }</properties><div class="Control Button CornerButton {theme} includeCaption" style="clip-path:url(#CornerButton1Clip);"><svg width="0" height="0"><defs><clipPath id="CornerButton1Clip"><path class="CornerButtonClipPath" d="M 0 0 Z"></path></clipPath></defs></svg></div>
//    </jagui-cornerbutton>
export { CornerButton };
// http://leaverou.github.io/corner-shape/
// https://jaketrent.com/post/create-bezier-curve-clip-path/
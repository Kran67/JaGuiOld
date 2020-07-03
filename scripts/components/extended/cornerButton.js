//#region Import
import { Button } from '/scripts/components/common/button.js';
import { Point } from '/scripts/core/geometry.js';
//#endregion Import
//#region CORNERSTYPES
/**
 * @type    {Object}        CORNERSTYPES
 */
const CORNERSTYPES = Object.freeze(Object.seal({
    ROUND: 'round',
    BEVEL: 'bevel',
    NOTCH: 'notch',
    SCOOP: 'scoop',
    SHARP: 'sharp'
}));
//#endregion CORNERSTYPES
//#region CORNERS
/**
 * @type    {Object}        CORNERS
 */
const CORNERS = Object.freeze(Object.seal({
    TOPLEFT: 'topleft',
    TOPRIGHT: 'topright',
    BOTTOMRIGHT: 'bottomright',
    BOTTOMLEFT: 'bottomleft'
}));
//#endregion CORNERSTYPES
//#region Class CornerButton
class CornerButton extends Button {
    //#region CORNERSTYPES
    /**
     * @type    {Object}        CORNERSTYPES
     */
    static get CORNERSTYPES() {
        return CORNERSTYPES;
    }
    //#endregion
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.allowUpdateOnResize = !0;
            super(owner, props);
            const topLeftCorner = props.hasOwnProperty('topLeftCorner') ? props.topLeftCorner : null;
            const topRightCorner = props.hasOwnProperty('topRightCorner') ? props.topRightCorner : null;
            const bottomRightCorner = props.hasOwnProperty('bottomRightCorner') ? props.bottomRightCorner : null;
            const bottomLeftCorner = props.hasOwnProperty('bottomLeftCorner') ? props.bottomLeftCorner : null;
            core.private(this, {
                topLeftCorner : topLeftCorner ? new Point(topLeftCorner.x, topLeftCorner.y) : new Point,
                topLeftCornerType : topLeftCorner.hasOwnProperty('type') ? topLeftCorner.type : CORNERSTYPES.ROUND,
                topRightCorner : topRightCorner ? new Point(topRightCorner.x, topRightCorner.y) : new Point,
                topRightCornerType : topRightCorner.hasOwnProperty('type') ? topRightCorner.type : CORNERSTYPES.ROUND,
                bottomRightCorner : bottomRightCorner ? new Point(bottomRightCorner.x, bottomRightCorner.y) : new Point,
                bottomRightCornerType : bottomRightCorner.hasOwnProperty('type')
                    ? bottomRightCorner.type : CORNERSTYPES.ROUND,
                bottomLeftCorner : bottomLeftCorner ? new Point(bottomLeftCorner.x, bottomLeftCorner.y) : new Point,
                bottomLeftCornerType : bottomLeftCorner.hasOwnProperty('type') ? bottomLeftCorner.type : CORNERSTYPES.ROUND
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region topLeftCorner
    get topLeftCorner() {
        return core.private(this).topLeftCorner;
    }
    set topLeftCorner(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof Point) {
            priv.topLeftCorner.assign(newValue);
            core.isHTMLRenderer && this.generateSVGPath();
        }
    }
    //#endregion topLeftCorner
    //#region topLeftCornerType
    get topLeftCornerType() {
        return core.private(this).topLeftCornerType;
    }
    set topLeftCornerType(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, CORNERSTYPES) && priv.topLeftCornerType !== newValue) {
            priv.topLeftCornerType = newValue;
            core.isHTMLRenderer && this.generateSVGPath();
        }
    }
    //#endregion topLeftCornerType
    //#region topRightCorner
    get topRightCorner() {
        return core.private(this).topRightCorner;
    }
    set topRightCorner(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof Point) {
            priv.topRightCorner.assign(newValue);
            core.isHTMLRenderer && this.generateSVGPath();
        }
    }
    //#endregion topRightCorner
    //#region topRightCornerType
    get topRightCornerType() {
        return core.private(this).topRightCornerType;
    }
    set topRightCornerType(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, CORNERSTYPES) && priv.topRightCornerType !== newValue) {
            priv.topRightCornerType = newValue;
            core.isHTMLRenderer && this.generateSVGPath();
        }
    }
    //#endregion topRightCornerType
    //#region topLeftCorner
    get topLeftCorner() {
        return core.private(this).topLeftCorner;
    }
    set topLeftCorner(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof Point) {
            priv.topLeftCorner.assign(newValue);
            core.isHTMLRenderer && this.generateSVGPath();
        }
    }
    //#endregion topLeftCorner
    //#region bottomLeftCornerType
    get bottomLeftCornerType() {
        return core.private(this).bottomLeftCornerType;
    }
    set bottomLeftCornerType(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, CORNERSTYPES) && priv.bottomLeftCornerType !== newValue) {
            priv.bottomLeftCornerType = newValue;
            core.isHTMLRenderer && this.generateSVGPath();
        }
    }
    //#endregion bottomLeftCornerType
    //#region bottomRightCorner
    get bottomRightCorner() {
        return core.private(this).bottomRightCorner;
    }
    set bottomRightCorner(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof Point) {
            priv.bottomRightCorner.assign(newValue);
            core.isHTMLRenderer && this.generateSVGPath();
        }
    }
    //#endregion bottomRightCorner
    //#region bottomRightCornerType
    get bottomRightCornerType() {
        return core.private(this).bottomRightCornerType;
    }
    set bottomRightCornerType(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, CORNERSTYPES) && priv.bottomRightCornerType !== newValue) {
            priv.bottomRightCornerType = newValue;
            core.isHTMLRenderer && this.generateSVGPath();
        }
    }
    //#endregion bottomRightCornerType
    //#endregion Getters / Setters
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
        //const path = htmlElement.querySelector("path");
        const priv = core.private(this);
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
        let d = ['M', r[0].x, '0'];
        d = [...d, 'h', htmlElement.offsetWidth - r[0].x - r[1].x];
        this.drawCorner(CORNERS.TOPRIGHT, r[1], d);
        d = [...d, 'v', htmlElement.offsetHeight - r[1].y - r[2].y];
        this.drawCorner(CORNERS.BOTTOMRIGHT, r[2], d);
        d = [...d, 'h', -htmlElement.offsetWidth + r[2].x + r[3].x];
        this.drawCorner(CORNERS.BOTTOMLEFT, r[3], d);
        d = [...d, 'v', -htmlElement.offsetHeight + r[3].y + r[0].y];
        this.drawCorner(CORNERS.TOPLEFT, r[0], d);
        d = [...d, 'Z'];
        priv.path.setAttribute('d', d.join(String.SPACE));
    }
    //#endregion generateSVGPath
    //#region drawCorner
    drawCorner(corner, r, d) {
        if (r.type === CORNERSTYPES.NOTCH) {
            switch (corner) {
                case CORNERS.TOPRIGHT:
                    d.push('v', r.y, 'h', r.x);
                    break;
                case CORNERS.BOTTOMRIGHT:
                    d.push('h', -r.x, 'v', r.y);
                    break;
                case CORNERS.BOTTOMLEFT:
                    d.push('v', -r.y, 'h', -r.x);
                    break;
                case CORNERS.TOPLEFT:
                    d.push('h', r.x, 'v', -r.y);
                    break;
            }
        } else if (r.type === CORNERSTYPES.SHARP) {
            const y2 = r.y * 0.5;
            const x2 = r.x * 0.5;
            switch (corner) {
                case CORNERS.TOPRIGHT:
                    d.push('v', y2, 'l', r.x - x2, r.y - y2, 'h', r.x - x2);
                    break;
                case CORNERS.BOTTOMRIGHT:
                    d.push('h', -(r.x - x2), 'l', -(r.x - x2), r.y - y2, 'v', r.y - y2);
                    break;
                case CORNERS.BOTTOMLEFT:
                    d.push('v', -y2, 'l', -(r.x - x2), -(r.y - y2), 'h', -(r.x - x2));
                    break;
                case CORNERS.TOPLEFT:
                    d.push('h', r.x - x2, 'l', r.x - x2, -(r.y - y2), 'v', -r.y - y2);
                    break;
            }
        } else {
            if (r.type === CORNERSTYPES.ROUND || r.type === CORNERSTYPES.SCOOP) {
                const sweep = +(r.type === CORNERSTYPES.ROUND);
                d.push('a', r.x, r.y, 0, 0, sweep);
            } else if (r.type === CORNERSTYPES.BEVEL) {
                d.push('l');
            }
            d.push(corner === CORNERS.BOTTOMRIGHT || corner === CORNERS.BOTTOMLEFT ? -r.x : r.x);
            d.push(corner === CORNERS.BOTTOMLEFT || corner === CORNERS.TOPLEFT ? -r.y : r.y);
        }
    }
    //#endregion drawCorner
    //#region assign
    assign(source) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (source instanceof core.classes.CornerButton) {
            priv.topLeftCorner.assign(source.topLeftCorner);
            priv.topLeftCornerType = source.topLeftCornerType;
            priv.topRightCorner.assign(source.topRightCorner);
            priv.topRightCornerType = source.topRightCornerType;
            priv.bottomRightCorner.assign(source.bottomRightCorner);
            priv.bottomRightCornerType = source.bottomRightCornerType;
            priv.bottomLeftCorner.assign(source.bottomLeftCorner);
            priv.bottomLeftCornerType = source.bottomLeftCornerType;
        }
    }
    //#endregion assign
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const SVG = core.types.SVG;
        const XMLNS = SVG.XMLNS;
        const LINEARGRADIENT = SVG.LINEARGRADIENT;
        const STOP = SVG.STOP;
        const USE = SVG.USE;
        const CLIPPATH = SVG.CLIPPATH;
        const XLINKHREF = SVG.XLINKHREF;
        const svg = document.createElementNS(XMLNS, SVG.SVG);
        const defs = document.createElementNS(XMLNS, SVG.DEFS);
        const clippath = document.createElementNS(XMLNS, CLIPPATH);
        const use = document.createElementNS(XMLNS, USE);
        let lineargradient = document.createElementNS(XMLNS, LINEARGRADIENT);
        let stop = document.createElementNS(XMLNS, STOP);
        const captionTag = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}caption`;
        const div = document.createElement(captionTag);
        //#endregion Variables déclaration
        if (!htmlElement.querySelector(captionTag)) {
            div.classList.add('Control', 'Button', 'CornerButton', this.themeName, 'includeCaption');
            div.style = `clip-path:url(#${this.name}Clip);`;
            htmlElement.appendChild(div);
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.classList.add('CornerButtonSvg');
            clippath.id = `${this.name}Clip`;
            use.setAttributeNS(SVG.XLINK, XLINKHREF, `#${this.name}ClipPath`);
            clippath.appendChild(use);
            defs.appendChild(clippath);
            svg.appendChild(defs);
            lineargradient.id = `${this.name}Gradient`;
            lineargradient.setAttribute('x1', '0');
            lineargradient.setAttribute('x2', '0');
            lineargradient.setAttribute('y1', '0');
            lineargradient.setAttribute('y2', '100%');
            stop.setAttribute('offset', '0%');
            stop.classList.add(this.themeName, 'first-corner-button-color');
            lineargradient.appendChild(stop);
            svg.appendChild(lineargradient);
            lineargradient = document.createElementNS(XMLNS, LINEARGRADIENT);
            stop = document.createElementNS(XMLNS, SVG.STOP);
            stop.setAttribute('offset', '100%');
            stop.classList.add(this.themeName, 'secondary-corner-button-color');
            lineargradient.appendChild(stop);
            svg.appendChild(lineargradient);
            priv.path = document.createElementNS(XMLNS, 'path');
            priv.path.setAttribute('stroke', `url(#${this.name}Gradient)`);
            priv.path.classList.add('CornerButtonClipPath');
            priv.path.id = `${this.name}ClipPath`;
            svg.appendChild(priv.path);
            div.appendChild(svg);
        }
        super.loaded();
        this.update();
    }
    //#endregion loaded
    //#endregion Methods
}
Object.defineProperties(CornerButton.prototype, {
    'topLeftCorner': {
        enumerable: !0
    },
    'topLeftCornerType': {
        enumerable: !0
    },
    'topRightCorner': {
        enumerable: !0
    },
    'topRightCornerType': {
        enumerable: !0
    },
    'bottomRightCorner': {
        enumerable: !0
    },
    'bottomRightCornerType': {
        enumerable: !0
    },
    'bottomLeftCorner': {
        enumerable: !0
    },
    'bottomLeftCornerType': {
        enumerable: !0
    }
});
//#endregion CornerButton
core.classes.register(core.types.CATEGORIES.EXTENDED, CornerButton);
//#region Template
if (core.isHTMLRenderer) {
    const CornerButtonTpl = ['<jagui-cornerbutton id="{internalId}" data-class="CornerButton" class="Control CornerButton csr_default {theme}">',
        '<properties>{ "name": "{name}", "caption": "{caption}" }</properties>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: CornerButton, template: CornerButtonTpl }]);
}
//#endregion Template
export { CornerButton };
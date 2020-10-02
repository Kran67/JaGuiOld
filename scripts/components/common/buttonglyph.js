//#region Import
import { Button } from '/scripts/components/common/button.js';
import { Point, Rect } from '/scripts/core/geometry.js';
import '/scripts/core/path.js';
import { Text } from '/scripts/core/text.js';
//#endregion Import
//#region BUTTONLAYOUTGLYPHS
/**
 * @type    {Object}        BUTTONLAYOUTGLYPHS
 */
const BUTTONLAYOUTGLYPHS = Object.freeze(Object.seal({
    LEFT: 'layoutLeft',
    RIGHT: 'layoutRight',
    TOP: 'layoutTop',
    BOTTOM: 'layoutBottom',
    CENTER: 'layoutCenter'
}));
//#endregion BUTTONLAYOUTGLYPHS
//#region Class ButtonGlyph
class ButtonGlyph extends Button {
    //#region Private fields
    #glyphPos;
    #glyphSize;
    #glyphSpacing;
    #glyphMargin;
    #showCaption;
    #glyphHTMLElement;
    #src;
    #layout;
    #glyph;
    #textObj;
    //#endregion Private fields
    //#region BUTTONLAYOUTGLYPHS
    /**
     * @type    {Object}        BUTTONLAYOUTGLYPHS
     */
    static get BUTTONLAYOUTGLYPHS() {
        return BUTTONLAYOUTGLYPHS;
    }
    //#endregion
    //#region Constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#glyphPos = new Point;
            this.#glyphSize = props.hasOwnProperty('glyphSize') ? props.glyphSize : 32;
            this.#glyphSpacing = props.hasOwnProperty('glyphSpacing') ? props.glyphSpacing : 4;
            this.#glyphMargin = props.hasOwnProperty('glyphMargin') ? props.glyphMargin : 0;
            this.#showCaption = props.hasOwnProperty('showCaption') ? props.showCaption : !0;
            this.#glyphHTMLElement = props.hasOwnProperty('glyphHTMLElement')
                    ? props.glyphHTMLElement : core.types.HTMLELEMENTS.IMG;
            this.#src = props.src ? props.src : String.EMPTY;
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'layout',
                enum: BUTTONLAYOUTGLYPHS,
                setter: function (newValue) {
                    if (core.tools.valueInSet(newValue, BUTTONLAYOUTGLYPHS) && this.#layout !== newValue) {
                        this.#layout = newValue;
                        core.isHTMLRenderer && !this.loading && !this.form.loading && this.update();
                    }
                },
                value: props.hasOwnProperty('layout') ? props.layout : BUTTONLAYOUTGLYPHS.LEFT
            });
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region glyphHTMLElement
    get glyphHTMLElement() {
        return this.#glyphHTMLElement;
    }
    set glyphHTMLElement(newValue) {
        core.tools.isString(newValue) && this.#glyphHTMLElement !== newValue && (this.#glyphHTMLElement = newValue);
    }
    //#endregion glyphHTMLElement
    //#region glyph
    get glyph() {
        return this.#glyph;
    }
    //#endregion glyph
    //#region glyph
    get textObj() {
        return this.#textObj;
    }
    //#endregion glyph
    //#region glyphSize
    get glyphSize() {
        return this.#glyphSize;
    }
    set glyphSize(newValue) {
        if (core.tools.isNumber(newValue) && this.#glyphSize !== newValue) {
            this.#glyphSize = newValue;
            core.isHTMLRenderer && !this.loading && !this.form.loading && this.update();
        }
    }
    //#endregion glyphSize
    //#region glyphSpacing
    get glyphSpacing() {
        return this.#glyphSpacing;
    }
    set glyphSpacing(newValue) {
        if (core.tools.isNumber(newValue) && this.#glyphSpacing !== newValue) {
            this.#glyphSpacing = newValue;
            core.isHTMLRenderer && !this.loading && !this.form.loading && this.update();
        }
    }
    //#endregion glyphSpacing
    //#region glyphMargin
    get glyphMargin() {
        return this.#glyphMargin;
    }
    set glyphMargin(newValue) {
        if (core.tools.isNumber(newValue) && newValue instanceof Rect && this.#glyphMargin !== newValue) {
            this.#glyphMargin = newValue;
            core.isHTMLRenderer && !this.loading && !this.form.loading && this.update();
        }
    }
    //#endregion glyphMargin
    //#region width
    get width() {
        return super.width;
    }
    set width(newValue) {
        super.width = newValue;
        core.isHTMLRenderer && !this.loading && !this.form.loading && this.update();
    }
    //#endregion width
    //#region height
    get height() {
        return super.height;
    }
    set height(newValue) {
        super.height = newValue;
        core.isHTMLRenderer && !this.loading && !this.form.loading && this.update();
    }
    //#endregion height
    //#region showCaption
    get showCaption() {
        return this.#showCaption;
    }
    set showCaption(newValue) {
        if (core.tools.isBool(newValue) && this.#showCaption !== newValue) {
            this.#showCaption = newValue;
            core.isHTMLRenderer && !this.loading && !this.form.loading && this.update();
        }
    }
    //#endregion showCaption
    //#region src
    get src() {
        return this.#src;
    }
    set src(newValue) {
        //#region Variables déclaration
        const src = this.#src;
        const glyph = this.#glyph;
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && src !== newValue) {
            this.#src = newValue;
            if (glyph instanceof Image) {
                glyph.src = newValue;
                if (core.isHTMLRenderer) {
                    newValue === String.EMPTY
                        ? glyph.classList.add('hidden')
                        : glyph.classList.remove('hidden');
                }
                !this.loading && !this.form.loading && this.update();
            }
        }
    }
    //#endregion src
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.loaded();
        if (core.isHTMLRenderer) {
            Text.setTextNode(htmlElement, String.EMPTY);
            this.#textObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}caption`);
            this.#textObj.classList.add('ButtonCaption', 'includeCaption', `${this.constructor.name}Caption`);
            htmlElement.appendChild(this.#textObj);
            this.#glyph = document.createElement(this.#glyphHTMLElement);
            if (this.#glyphHTMLElement === core.types.HTMLELEMENTS.IMG) {
                this.#glyph.src = this.#src !== String.EMPTY ? this.#src : core.types.CONSTANTS.PIX;
            }
            this.#glyph.draggable = !1;
            htmlElement.appendChild(this.#glyph);
        } else {
            this.#src !== String.EMPTY && (this.#glyph = null);
        }
        this.form.loaded && this.loaded && this.update();
    }
    //#endregion loaded
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const layout = this.#layout;
        const textObj = this.#textObj;
        const showCaption = this.#showCaption;
        const htmlElementStyle = this.HTMLElementStyle;
        const glyph = this.#glyph;
        const PX = core.types.CSSUNITS.PX;
        const glyphMargin = this.#glyphMargin;
        const glyphSpacing = this.#glyphSpacing;
        const isHtmlRenderer = core.isHTMLRenderer;
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading) {
            super.update();
            if (isHtmlRenderer) {
                htmlElement.classList.remove(BUTTONLAYOUTGLYPHS.LEFT);
                htmlElement.classList.remove(BUTTONLAYOUTGLYPHS.RIGHT);
                htmlElement.classList.remove(BUTTONLAYOUTGLYPHS.TOP);
                htmlElement.classList.remove(BUTTONLAYOUTGLYPHS.BOTTOM);
                htmlElement.classList.remove(BUTTONLAYOUTGLYPHS.CENTER);
                htmlElement.classList.add(layout);
            }
            if (textObj) {
                if (isHtmlRenderer) {
                    textObj.innerHTML = this.caption;
                    !this.wordWrap
                        ? htmlElementStyle.whiteSpace = 'nowrap'
                        : htmlElementStyle.whiteSpace = 'normal';
                }
                if (!showCaption) {
                    if (isHtmlRenderer) {
                        textObj.style.width = "0";
                        textObj.style.height = "0";
                        textObj.style.margin = "0";
                    } else {
                        textObj.width = 0;
                        textObj.height = 0;
                        textObj.margin = 0;
                    }
                }
                if (this.path) {
                    this.updateCanvas();
                    this.paint();
                }
                if (glyph) {
                    glyph.offsetWidth !== this.#glyphSize && (glyph.style.width = `${this.#glyphSize}${PX}`);
                    glyph.offsetHeight !== this.#glyphSize && (glyph.style.height = `${this.#glyphSize}${PX}`);
                    if (glyph.offsetWidth > 0 && glyph.offsetHeight > 0) {
                        glyphMargin > 0
                            && ((isHtmlRenderer ? glyph.style : glyph).margin = `${glyphMargin}${PX}`);
                        if (glyphSpacing > 0 && showCaption) {
                            (isHtmlRenderer ? textObj.style : textObj).margin = 0;
                            switch (layout) {
                                case BUTTONLAYOUTGLYPHS.LEFT:
                                    (isHtmlRenderer ? textObj.style : textObj).marginLeft = `${glyphSpacing}${PX}`;
                                    break;
                                case BUTTONLAYOUTGLYPHS.RIGHT:
                                    (isHtmlRenderer ? textObj.style : textObj).marginRight = `${glyphSpacing}${PX}`;
                                    break;
                                case BUTTONLAYOUTGLYPHS.TOP:
                                    (isHtmlRenderer ? textObj.style : textObj).marginTop = `${glyphSpacing}${PX}`;
                                    break;
                                case BUTTONLAYOUTGLYPHS.BOTTOM:
                                    (isHtmlRenderer ? textObj.style : textObj).marginBottom = `${glyphSpacing}${PX}`;
                                    break;
                            }
                        }
                    }
                } else {
                    if (!isHtmlRenderer) {
                    }
                }
            }
        }
    }
    //#endregion update
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const glyph = this.#glyph;
        //#endregion Variables déclaration
        this.#glyphPos.destroy();
        glyph && glyph instanceof Path && glyph.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion
}
core.classes.register(core.types.CATEGORIES.COMMON, ButtonGlyph);
Object.defineProperties(ButtonGlyph.prototype, {
    'glyphPos': {
        enumerable: !0
    },
    'glyphSize': {
        enumerable: !0
    },
    'glyphSpacing': {
        enumerable: !0
    },
    'glyphMargin': {
        enumerable: !0
    },
    'showCaption': {
        enumerable: !0
    },
    'src': {
        enumerable: !0
    }
});
//#endregion ButtonGlyph
export { ButtonGlyph };
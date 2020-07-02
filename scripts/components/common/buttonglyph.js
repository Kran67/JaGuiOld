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
            core.private(this, {
                glyphPos: new Point,
                glyphSize: props.hasOwnProperty('glyphSize') ? props.glyphSize : 32,
                glyphSpacing: props.hasOwnProperty('glyphSpacing') ? props.glyphSpacing : 4,
                glyphMargin: props.hasOwnProperty('glyphMargin') ? props.glyphMargin : 0,
                showCaption: props.hasOwnProperty('showCaption') ? props.showCaption : !0,
                glyphHTMLElement: props.hasOwnProperty('glyphHTMLElement')
                    ? props.glyphHTMLElement : core.types.HTMLELEMENTS.IMG,
                src: props.src ? props.src : String.EMPTY
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'layout',
                enum: BUTTONLAYOUTGLYPHS,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, BUTTONLAYOUTGLYPHS) && priv.layout !== newValue) {
                        priv.layout = newValue;
                        core.isHTMLRenderer && !this.loading && !this.form.loading && this.update();
                    }
                },
                value: props.hasOwnProperty('layout') ? props.layout : BUTTONLAYOUTGLYPHS.LEFT
            });
        }
    }
    //#endregion Constructor
    //#region getter / setter
    //#region glyphHTMLElement
    get glyphHTMLElement() {
        return core.private(this).glyphHTMLElement;
    }
    set glyphHTMLElement(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv.glyphHTMLElement !== newValue && (priv.glyphHTMLElement = newValue);
    }
    //#endregion glyphHTMLElement
    //#region glyph
    get glyph() {
        return core.private(this).glyph;
    }
    //#endregion glyph
    //#region glyph
    get textObj() {
        return core.private(this).textObj;
    }
    //#endregion glyph
    //#region glyphSize
    get glyphSize() {
        return core.private(this).glyphSize;
    }
    set glyphSize(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.glyphSize !== newValue) {
            priv.glyphSize = newValue;
            core.isHTMLRenderer && !this.loading && !this.form.loading && this.update();
        }
    }
    //#endregion glyphSize
    //#region glyphSpacing
    get glyphSpacing() {
        return core.private(this).glyphSpacing;
    }
    set glyphSpacing(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.glyphSpacing !== newValue) {
            priv.glyphSpacing = newValue;
            core.isHTMLRenderer && !this.loading && !this.form.loading && this.update();
        }
    }
    //#endregion glyphSpacing
    //#region glyphMargin
    get glyphMargin() {
        return core.private(this).glyphMargin;
    }
    set glyphMargin(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && newValue instanceof Rect && priv.glyphMargin !== newValue) {
            priv.glyphMargin = newValue;
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
        return core.private(this).showCaption;
    }
    set showCaption(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.showCaption !== newValue) {
            priv.showCaption = newValue;
            core.isHTMLRenderer && !this.loading && !this.form.loading && this.update();
        }
    }
    //#endregion showCaption
    //#region src
    get src() {
        return core.private(this).src;
    }
    set src(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const src = priv.src;
        const glyph = priv.glyph;
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && src !== newValue) {
            priv.src = newValue;
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
    //#endregion getter / setter
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.loaded();
        if (core.isHTMLRenderer) {
            Text.setTextNode(htmlElement, String.EMPTY);
            priv.textObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}caption`);
            priv.textObj.classList.add('Control', 'ButtonCaption', 'includeCaption', `${this.constructor.name}Caption`);
            priv.textObj.jsObj = this;
            htmlElement.appendChild(priv.textObj);
            priv.glyph = document.createElement(priv.glyphHTMLElement);
            if (priv.glyphHTMLElement === core.types.HTMLELEMENTS.IMG) {
                priv.glyph.src = priv.src !== String.EMPTY ? priv.src : core.types.CONSTANTS.PIX;
            }
            priv.glyph.draggable = !1;
            htmlElement.appendChild(priv.glyph);
        } else {
            priv.src !== String.EMPTY && (priv.glyph = null);
        }
        this.form.loaded && this.loaded && this.update();
    }
    //#endregion loaded
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const layout = priv.layout;
        const textObj = priv.textObj;
        const showCaption = priv.showCaption;
        const htmlElementStyle = this.HTMLElementStyle;
        const glyph = priv.glyph;
        const PX = core.types.CSSUNITS.PX;
        const glyphMargin = priv.glyphMargin;
        const glyphSpacing = priv.glyphSpacing;
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
                    glyph.offsetWidth !== priv.glyphSize && (glyph.style.width = `${priv.glyphSize}${PX}`);
                    glyph.offsetHeight !== priv.glyphSize && (glyph.style.height = `${priv.glyphSize}${PX}`);
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
        const priv = core.private(this);
        const glyph = priv.glyph;
        //#endregion Variables déclaration
        priv.glyphPos.destroy();
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
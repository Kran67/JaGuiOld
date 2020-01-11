﻿//#region Import
import { Button } from "/scripts/components/common/button.js";
import { Point, Rect } from "/scripts/core/geometry.js";
import "/scripts/core/path.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region BUTTONLAYOUTGLYPHS
/**
 * @type    {Object}        BUTTONLAYOUTGLYPHS
 */
const _BUTTONLAYOUTGLYPHS = Object.freeze({
    LEFT: "layoutLeft",
    RIGHT: "layoutRight",
    TOP: "layoutTop",
    BOTTOM: "layoutBottom",
    CENTER: "layoutCenter"
});
//#endregion
//#region ButtonGlyph
const ButtonGlyph = (() => {
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
    //#region Class ButtonGlyph
    class ButtonGlyph extends Button {
        //#region BUTTONLAYOUTGLYPHS
        /**
         * @type    {Object}        BUTTONLAYOUTGLYPHS
         */
        static get BUTTONLAYOUTGLYPHS() {
            return _BUTTONLAYOUTGLYPHS;
        }
        //#endregion
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.glyphPos = new Point;
                priv.textObj = {};
                priv.glyphSize = props.hasOwnProperty("glyphSize")?props.glyphSize:32;
                priv.glyphSpacing = props.hasOwnProperty("glyphSpacing")?props.glyphSpacing:4;
                priv.glyphMargin = props.hasOwnProperty("glyphMargin")?props.glyphMargin:0;
                priv.glyph = {};
                priv.showCaption = props.hasOwnProperty("showCaption")?props.showCaption:true;
                priv.layout = props.hasOwnProperty("layout")?props.layout:_BUTTONLAYOUTGLYPHS.LEFT;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "layout",
                    enum: _BUTTONLAYOUTGLYPHS,
                    setter: this._layout,
                    variable: priv
                });
                priv.glyphHTMLElement = Types.HTMLELEMENTS.IMG;
                this.addBindableProperties(["glyphSize", "glyphSpacing", "glyphMargin", "layout"]);
                priv.src = props.src ? props.src : String.EMPTY;
            }
        }
        //#endregion Constructor
        //#region getter / setter
        //#region glyphHTMLElement
        get glyphHTMLElement() {
            return internal(this).glyphHTMLElement;
        }
        set glyphHTMLElement(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.glyphHTMLElement !== newValue) {
                    priv.glyphHTMLElement = newValue;
                }
            }
        }
        //#endregion glyphHTMLElement
        //#region glyph
        get glyph() {
            return internal(this).glyph;
        }
        //#endregion glyph
        //#region glyph
        get textObj() {
            return internal(this).textObj;
        }
        //#endregion glyph
        //#region _layout
        get layout() {
            return internal(this).layout;
        }
        _layout(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, _BUTTONLAYOUTGLYPHS)) {
                if (priv.layout !== newValue) {
                    priv.layout = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                    }
                }
            }
        }
        //#endregion _layout
        //#region glyphSize
        get glyphSize() {
            return internal(this).glyphSize;
        }
        set glyphSize(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.glyphSize !== newValue) {
                    priv.glyphSize = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                    }
                }
            }
        }
        //#endregion glyphSize
        //#region glyphSpacing
        get glyphSpacing() {
            return internal(this).glyphSpacing;
        }
        set glyphSpacing(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.glyphSpacing !== newValue) {
                    priv.glyphSpacing = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                    }
                }
            }
        }
        //#endregion glyphSpacing
        //#region glyphMargin
        get glyphMargin() {
            return internal(this).glyphMargin;
        }
        set glyphMargin(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue instanceof Rect) {
                    if (priv.glyphMargin !== newValue) {
                        priv.glyphMargin = newValue;
                        if (Core.isHTMLRenderer) {
                            if (!this.loading && !this.form.loading) {
                                this.update();
                            }
                        }
                    }
                }
            }
        }
        //#endregion glyphMargin
        //#region width
        get width() {
            return super.width;
        }
        set width(newValue) {
            super.width = newValue;
            if (Core.isHTMLRenderer) {
                if (!this.loading && !this.form.loading) {
                    this.update();
                }
            }
        }
        //#endregion width
        //#region height
        get height() {
            return super.height;
        }
        set height(newValue) {
            super.height = newValue;
            if (Core.isHTMLRenderer) {
                if (!this.loading && !this.form.loading) {
                    this.update();
                }
            }
        }
        //#endregion height
        //#region showCaption
        get showCaption() {
            return internal(this).showCaption;
        }
        set showCaption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.showCaption !== newValue) {
                    priv.showCaption = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                    }
                }
            }
        }
        //#endregion showCaption
        //#region src
        get src() {
            return internal(this).src;
        }
        set src(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const src = priv.src;
            const glyph = priv.glyph;
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (src !== newValue) {
                    priv.src = newValue;
                    if (glyph instanceof Image) {
                        glyph.src = newValue;
                        if (Core.isHTMLRenderer) {
                            if (newValue === String.EMPTY) {
                                glyph.classList.add("hidden");
                            } else {
                                glyph.classList.remove("hidden");
                            }
                        }
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                    }
                }
            }
        }
        //#endregion src
        //#endregion getter / setter
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const glyph = this.glyph;
            //#endregion Variables déclaration
            super.loaded();
            if (Core.isHTMLRenderer) {
                if (glyph.src !== String.EMPTY) {
                    priv.src = glyph.src;
                }
            } else {
                if (priv.src !== String.EMPTY) {
                    this.glyph = null;
                }
            }
            //if (this.form.loaded && this.loaded) {
            //    this.update();
            //}
        }
        //#endregion loaded
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const layout = priv.layout;
            const textObj = priv.textObj;
            const showCaption = priv.showCaption;
            const htmlElementStyle = this.HTMLElementStyle;
            const glyph = priv.glyph;
            const PX = Types.CSSUNITS.PX;
            const glyphMargin = priv.glyphMargin;
            const glyphSpacing = priv.glyphSpacing;
            const isHtmlRenderer = Core.isHTMLRenderer;
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                super.update();
                if (isHtmlRenderer) {
                    htmlElement.classList.remove(_BUTTONLAYOUTGLYPHS.LEFT);
                    htmlElement.classList.remove(_BUTTONLAYOUTGLYPHS.RIGHT);
                    htmlElement.classList.remove(_BUTTONLAYOUTGLYPHS.TOP);
                    htmlElement.classList.remove(_BUTTONLAYOUTGLYPHS.BOTTOM);
                    htmlElement.classList.remove(_BUTTONLAYOUTGLYPHS.CENTER);
                    htmlElement.classList.add(layout);
                }
                if (textObj) {
                    if (isHtmlRenderer) {
                        textObj.innerHTML = this.caption;
                        if (!this.wordWrap) {
                            htmlElementStyle.whiteSpace = "nowrap";
                        }
                        else {
                            htmlElementStyle.whiteSpace = "normal";
                        }
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
                    } else {
                        //if (glyph) {
                        //    if (isHtmlRenderer) {
                        //        glyph.style.width =
                        //            glyph.style.height =
                        //            glyph.style.minWidth =
                        //            glyph.style.minHeight = `${priv.glyphSize}${PX}`;
                        //    } else {
                        //        glyph.width =
                        //            glyph.height =
                        //            glyph.minWidth =
                        //            glyph.minHeight = priv.glyphSize;
                        //    }
                        //}
                    }
                    if (glyph) {
                        if (glyph.offsetWidth > 0 && glyph.offsetHeight) {
                            if (glyphMargin > 0) {
                                (isHtmlRenderer ? glyph.style : glyph).margin = `${glyphMargin}${PX}`;
                            }
                            if (glyphSpacing > 0 && showCaption) {
                                (isHtmlRenderer ? textObj.style : textObj).margin = 0;
                                switch (layout) {
                                    case _BUTTONLAYOUTGLYPHS.LEFT:
                                        (isHtmlRenderer ? textObj.style : textObj).marginLeft = `${glyphSpacing}${PX}`;
                                        break;
                                    case _BUTTONLAYOUTGLYPHS.RIGHT:
                                        (isHtmlRenderer ? textObj.style : textObj).marginRight = `${glyphSpacing}${PX}`;
                                        break;
                                    case _BUTTONLAYOUTGLYPHS.TOP:
                                        (isHtmlRenderer ? textObj.style : textObj).marginTop = `${glyphSpacing}${PX}`;
                                        break;
                                    case _BUTTONLAYOUTGLYPHS.BOTTOM:
                                        (isHtmlRenderer ? textObj.style : textObj).marginBottom = `${glyphSpacing}${PX}`;
                                        break;
                                }
                            }
                        }
                    } else {
                        if (!isHtmlRenderer) {
                            //this.horizAlign = ;
                            //this.vertaling = ;
                        }
                    }
                }
            }
        }
        //#endregion update
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            if (htmlElement) {
                priv.textObj = htmlElement.querySelector(Types.HTMLELEMENTS.SPAN);
                priv.textObj.jsObj = this;
                priv.glyph = htmlElement.getElementsByTagName(priv.glyphHTMLElement)[0];
                priv.glyphSize = priv.glyph.offsetWidth;
                if (priv.glyph) {
                    priv.glyph.jsObj = this;
                }
            }
        }
        //#endregion getHTMLElement
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            const glyph = priv.glyph;
            //#endregion Variables déclaration
            super.destroy();
            priv.glyphPos.destroy();
            priv.glyphPos = null;
            priv.layout = null;
            priv.glyphSize = null;
            priv.glyphSpacing = null;
            priv.glyphMargin = null;
            if (glyph && glyph instanceof Path) {
                glyph.destroy();
            }
            priv.glyph = null;
            priv.textObj = null;
            priv.src = null;
        }
        //#endregion destroy
        //#endregion
    }
    return ButtonGlyph;
    //#endregion
})();
//#endregion
Core.classes.register(Types.CATEGORIES.COMMON, ButtonGlyph);
export { ButtonGlyph };
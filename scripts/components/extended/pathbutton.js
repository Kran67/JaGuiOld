﻿//#region Import
import { ButtonGlyph } from '/scripts/components/common/buttonglyph.js';
import { Color, Colors } from '/scripts/core/color.js';
import { PathData } from '/scripts/core/path.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Import
//#region PathButton
const PathButton = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region PathButton
    class PathButton extends ButtonGlyph {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.glyphHTMLElement = core.types.HTMLELEMENTS.CANVAS;
                props.canFocused = !0;
                super(owner, props);
                const priv = internal(this);
                priv.path = new PathData(this);
                props.hasOwnProperty('path') && (priv.path.pathString = atob(props.path));
                priv.glyphNormalStrokeColor = props.hasOwnProperty('glyphNormalStrokeColor')
                    ? Color.parse(props.glyphNormalStrokeColor) : new Color(Colors.BLACK);
                priv.glyphNormalFillColor = props.hasOwnProperty('glyphNormalFillColor')
                    ? Color.parse(props.glyphNormalFillColor) : new Color(Colors.WHITE);
                priv.glyphHoveredStrokeColor = props.hasOwnProperty('glyphHoveredStrokeColor')
                    ? Color.parse(props.glyphHoveredStrokeColor) : new Color(Colors.BLACK);
                priv.glyphHoveredFillColor = props.hasOwnProperty('glyphHoveredFillColor')
                    ? Color.parse(props.glyphHoveredFillColor) : new Color(Colors.WHITE);
                priv.glyphPressedStrokeColor = props.hasOwnProperty('glyphPressedStrokeColor')
                    ? Color.parse(props.glyphPressedStrokeColor) : new Color(Colors.BLACK);
                priv.glyphPressedFillColor = props.hasOwnProperty('glyphPressedFillColor')
                    ? Color.parse(props.glyphPressedFillColor) : new Color(Colors.WHITE);
                priv.ctx = null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region Path
        get path() {
            return internal(this).path;
        }
        //#endregion Path
        //#region glyphPressedFillColor
        get glyphPressedFillColor() {
            return internal(this).glyphPressedFillColor;
        }
        set glyphPressedFillColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color && priv.glyphPressedFillColor !== newValue) {
                priv.glyphPressedFillColor.assign(newValue);
                if (core.isHTMLRenderer) {
                    this.update();
                    this.paint();
                }
            }
        }
        //#endregion glyphPressedFillColor
        //#region glyphNormalStrokeColor
        get glyphNormalStrokeColor() {
            return internal(this).glyphNormalStrokeColor;
        }
        set glyphNormalStrokeColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color && priv.glyphNormalStrokeColor !== newValue) {
                priv.glyphNormalStrokeColor.assign(newValue);
                if (core.isHTMLRenderer) {
                    this.update();
                    this.paint();
                }
            }
        }
        //#endregion glyphNormalStrokeColor
        //#region glyphHoveredStrokeColor
        get glyphHoveredStrokeColor() {
            return internal(this).glyphHoveredStrokeColor;
        }
        set glyphHoveredStrokeColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color && priv.glyphHoveredStrokeColor !== newValue) {
                priv.glyphHoveredStrokeColor.assign(newValue);
                if (core.isHTMLRenderer) {
                    this.update();
                    this.paint();
                }
            }
        }
        //#endregion glyphHoveredStrokeColor
        //#region glyphHoveredFillColor
        get glyphHoveredStrokeColor() {
            return internal(this).glyphHoveredFillColor;
        }
        set glyphHoveredFillColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color && priv.glyphHoveredFillColor !== newValue) {
                priv.glyphHoveredFillColor.assign(newValue);
                if (core.isHTMLRenderer) {
                    this.update();
                    this.paint();
                }
            }
        }
        //#endregion glyphHoveredFillColor
        //#region glyphPressedStrokeColor
        get glyphHoveredStrokeColor() {
            return internal(this).glyphPressedStrokeColor;
        }
        set glyphPressedStrokeColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color && priv.glyphPressedStrokeColor !== newValue) {
                priv.glyphPressedStrokeColor.assign(newValue);
                if (core.isHTMLRenderer) {
                    this.update();
                    this.paint();
                }
            }
        }
        //#endregion glyphPressedStrokeColor
        //#endregion Getters / Setters
        //#region Methods
        //#region assign
        assign(source) {
            if (source instanceof PathButton) {
                super.assign();
                this.path.assign(source.path);
            }
        }
        //#endregion assign
        //#region paint
        paint() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const glyph = this.glyph;
            const isPressed = this.isPressed;
            //#endregion Variables déclaration
            if (htmlElement.offsetWidth > 0 && htmlElement.offsetHeight > 0 && glyph && priv.ctx) {
                !priv.path.isEmpty
                    ? glyph.classList.remove('hidden')
                    : glyph.classList.add('hidden');
                priv.ctx.save();
                priv.ctx.clear();
                if (this.isMouseOver && !isPressed) {
                    priv.ctx.strokeStyle = priv.glyphHoveredStrokeColor.toRGBAString();
                    priv.ctx.fillStyle = priv.glyphHoveredFillColor.toRGBAString();
                } else if (isPressed) {
                    priv.ctx.strokeStyle = priv.glyphPressedStrokeColor.toRGBAString();
                    priv.ctx.fillStyle = priv.glyphPressedFillColor.toRGBAString();
                } else {
                    priv.ctx.strokeStyle = priv.glyphNormalStrokeColor.toRGBAString();
                    priv.ctx.fillStyle = priv.glyphNormalFillColor.toRGBAString();
                }
                priv.ctx.drawPath(this, priv.path, !1);
                priv.ctx.restore();
            }
        }
        //#endregion paint
        //#region updateCanvas
        updateCanvas() {
            //#region Variables déclaration
            const priv = internal(this);
            const glyph = this.glyph;
            const glyphSize = this.glyphSize;
            const PX = core.types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (glyph) {
                const clientRect = new Rect(0, 0, glyphSize, glyphSize);
                const p = priv.path;
                if (!p.isEmpty) {
                    const b = p.originalBounds;
                    p.resizeToRect(b);
                    let r = p.bounds;
                    r = r.fit(clientRect).rect;
                    p.resizeToRect(r);
                }
                glyph.setAttribute('width', glyphSize);
                glyph.setAttribute('height', glyphSize);
                glyph.style.minWidth = `${glyphSize}${PX}`;
                glyph.style.minHeight = `${glyphSize}${PX}`;
            }
        }
        //#endregion updateCanvas
        //#region mouseDown
        mouseDown(mouseButton, point) {
            super.mouseDown(mouseButton, point);
            core.isHTMLRenderer && this.paint();
        }
        //#endregion mouseDown
        //#region mouseUp
        mouseUp(mouseButton, point) {
            super.mouseUp(mouseButton, point);
            core.isHTMLRenderer && this.paint();
        }
        //#endregion mouseUp
        //#region mouseEnter
        mouseEnter(mouseButton, point) {
            super.mouseEnter(mouseButton, point);
            core.isHTMLRenderer && this.paint();
        }
        //#endregion mouseEnter
        //#region mouseLeave
        mouseLeave(mouseButton, point) {
            super.mouseLeave(mouseButton, point);
            core.isHTMLRenderer && this.paint();
        }
        //#endregion mouseLeave
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.path.destroy();
            priv.path = null;
            priv.glyphNormalStrokeColor.destroy();
            priv.glyphNormalStrokeColor = null;
            priv.glyphNormalFillColor.destroy();
            priv.glyphNormalFillColor = null;
            priv.glyphHoveredStrokeColor.destroy();
            priv.glyphHoveredStrokeColor = null;
            priv.glyphHoveredFillColor.destroy();
            priv.glyphHoveredFillColor = null;
            priv.glyphPressedStrokeColor.destroy();
            priv.glyphPressedStrokeColor = null;
            priv.glyphPressedFillColor.destroy();
            priv.glyphPressedFillColor = null;
            priv.glyphHTMLElement = null;
            priv.ctx = null;
            super.destroy();
        }
        //#endregion destroy
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            priv.ctx = this.glyph.getContext('2d');
            this.paint();
        }
        //#endregion loaded
        //#endregion Methods
    }
    return PathButton;
    //#endregion PathButton
})();
core.classes.register(core.types.CATEGORIES.EXTENDED, PathButton);
//#endregion PathButton
//#region Templates
if (core.isHTMLRenderer) {
    const PathButtonTpl = ['<jagui-pathbutton id="{internalId}" data-class="PathButton" class="Control Button ButtonGlyph PathButton {theme}',
        ' csr_default"><properties>{ "name": "{name}", "caption": "{caption}" }</properties></jagui-pathbutton>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: PathButton, template: PathButtonTpl }]);
}
//#endregion
export { PathButton };
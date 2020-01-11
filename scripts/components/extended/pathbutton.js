//#region Import
import { ButtonGlyph } from "/scripts/components/common/buttonGlyph.js";
import { Color, Colors } from "/scripts/core/color.js";
import { PathData } from "/scripts/core/path.js";
import { Rect } from "/scripts/core/geometry.js";
//#endregion Import
//#region PathButton
const PathButton = (() => {
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
    //#region PathButton
    class PathButton extends ButtonGlyph {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                this.glyphHTMLElement = Types.HTMLELEMENTS.CANVAS;
                priv.path = new PathData(this);
                if (props.hasOwnProperty("path")) {
                    priv.path.pathString = atob(props.path);
                }
                priv.glyphNormalStrokeColor = props.hasOwnProperty("glyphNormalStrokeColor")?props.glyphNormalStrokeColor:new Color(Colors.BLACK);
                priv.glyphNormalFillColor = props.hasOwnProperty("glyphNormalFillColor")?props.glyphNormalFillColor:new Color(Colors.WHITE);
                priv.glyphHoveredStrokeColor = props.hasOwnProperty("glyphHoveredStrokeColor")?props.glyphHoveredStrokeColor:new Color(Colors.BLACK);
                priv.glyphHoveredFillColor = props.hasOwnProperty("glyphHoveredFillColor")?props.glyphHoveredFillColor:new Color(Colors.WHITE);
                priv.glyphPressedStrokeColor = props.hasOwnProperty("glyphPressedStrokeColor")?props.glyphPressedStrokeColor:new Color(Colors.BLACK);
                priv.glyphPressedFillColor = props.hasOwnProperty("glyphPressedFillColor")?props.glyphPressedFillColor:new Color(Colors.WHITE);
                priv.ctx = null;
                this.canFocused = true;
            }
        }
        //#endregion
        //#region getter / setter
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
            if (newValue instanceof Color) {
                if (priv.glyphPressedFillColor !== newValue) {
                    priv.glyphPressedFillColor.assign(newValue);
                    if (Core.isHTMLRenderer) {
                        this.update();
                        this.paint();
                    }
                }
            }
        }
        //#endregion
        //#region glyphNormalStrokeColor
        get glyphNormalStrokeColor() {
            return internal(this).glyphNormalStrokeColor;
        }
        set glyphNormalStrokeColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color) {
                if (priv.glyphNormalStrokeColor !== newValue) {
                    priv.glyphNormalStrokeColor.assign(newValue);
                    if (Core.isHTMLRenderer) {
                        this.update();
                        this.paint();
                    }
                }
            }
        }
        //#endregion
        //#region glyphHoveredStrokeColor
        get glyphHoveredStrokeColor() {
            return internal(this).glyphHoveredStrokeColor;
        }
        set glyphHoveredStrokeColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color) {
                if (priv.glyphHoveredStrokeColor !== newValue) {
                    priv.glyphHoveredStrokeColor.assign(newValue);
                    if (Core.isHTMLRenderer) {
                        this.update();
                        this.paint();
                    }
                }
            }
        }
        //#endregion
        //#region glyphHoveredFillColor
        get glyphHoveredStrokeColor() {
            return internal(this).glyphHoveredFillColor;
        }
        set glyphHoveredFillColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color) {
                if (priv.glyphHoveredFillColor !== newValue) {
                    priv.glyphHoveredFillColor.assign(newValue);
                    if (Core.isHTMLRenderer) {
                        this.update();
                        this.paint();
                    }
                }
            }
        }
        //#endregion
        //#region glyphPressedStrokeColor
        get glyphHoveredStrokeColor() {
            return internal(this).glyphPressedStrokeColor;
        }
        set glyphPressedStrokeColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color) {
                if (priv.glyphPressedStrokeColor !== newValue) {
                    priv.glyphPressedStrokeColor.assign(newValue);
                    if (Core.isHTMLRenderer) {
                        this.update();
                        this.paint();
                    }
                }
            }
        }
        //#endregion
        //#endregion getter / setter
        //#region Methods
        //#region assign
        assign(source) {
            if (source instanceof PathButton) {
                super.assign();
                this.path.assign(source.path);
            }
        }
        //#endregion
        //#region paint
        paint() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const glyph = this.glyph;
            const isPressed = this.isPressed;
            //#endregion Variables déclaration
            if (htmlElement.offsetWidth > 0 && htmlElement.offsetHeight > 0 && glyph) {
                if (!priv.path.isEmpty) {
                    glyph.classList.remove("hidden");
                } else {
                    glyph.classList.add("hidden");
                }
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
                priv.ctx.drawPath(this, priv.path, false);
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
            const PX = Types.CSSUNITS.PX;
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
                glyph.setAttribute("width", glyphSize);
                glyph.setAttribute("height", glyphSize);
                glyph.style.minWidth = `${glyphSize}${PX}`;
                glyph.style.minHeight = `${glyphSize}${PX}`;
            }
        }
        //#endregion updateCanvas
        //#region mouseDown
        mouseDown(mouseButton, point) {
            super.mouseDown(mouseButton, point);
            if (Core.isHTMLRenderer) {
                this.paint();
            }
        }
        //#endregion mouseDown
        //#region mouseUp
        mouseUp(mouseButton, point) {
            super.mouseUp(mouseButton, point);
            if (Core.isHTMLRenderer) {
                this.paint();
            }
        }
        //#endregion mouseUp
        //#region mouseEnter
        mouseEnter(mouseButton, point) {
            super.mouseEnter(mouseButton, point);
            if (Core.isHTMLRenderer) {
                this.paint();
            }
        }
        //#endregion mouseEnter
        //#region mouseLeave
        mouseLeave(mouseButton, point) {
            super.mouseLeave(mouseButton, point);
            if (Core.isHTMLRenderer) {
                this.paint();
            }
        }
        //#endregion mouseLeave
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            let glyph = null;
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            glyph = this.glyph;
            if (glyph) {
                priv.ctx = glyph.getContext("2d");
            }
        }
        //#endregion getHTMLElement
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
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return PathButton;
    //#endregion
})();
//#endregion
Core.classes.register(Types.CATEGORIES.EXTENDED, PathButton);
export { PathButton };
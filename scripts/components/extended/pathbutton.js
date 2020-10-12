//#region Import
import { ButtonGlyph } from '/scripts/components/common/buttonglyph.js';
import { Color, Colors } from '/scripts/core/color.js';
import { PathData } from '/scripts/core/path.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Import
//#region PathButton
class PathButton extends ButtonGlyph {
    //#region Private fields
    #path;
    #glyphNormalStrokeColor;
    #glyphNormalFillColor;
    #glyphHoveredStrokeColor;
    #glyphHoveredFillColor;
    #glyphPressedStrokeColor;
    #glyphPressedFillColor;
    #ctx = null;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.glyphHTMLElement = core.types.HTMLELEMENTS.CANVAS;
            props.canFocused = !0;
            super(owner, props);
            this.#path = new PathData(this);
            this.#glyphNormalStrokeColor = props.hasOwnProperty('glyphNormalStrokeColor')
                ? Color.parse(props.glyphNormalStrokeColor) : new Color(Colors.BLACK);
            this.#glyphNormalFillColor = props.hasOwnProperty('glyphNormalFillColor')
                ? Color.parse(props.glyphNormalFillColor) : new Color(Colors.WHITE);
            this.#glyphHoveredStrokeColor = props.hasOwnProperty('glyphHoveredStrokeColor')
                ? Color.parse(props.glyphHoveredStrokeColor) : new Color(Colors.BLACK);
            this.#glyphHoveredFillColor = props.hasOwnProperty('glyphHoveredFillColor')
                ? Color.parse(props.glyphHoveredFillColor) : new Color(Colors.WHITE);
            this.#glyphPressedStrokeColor = props.hasOwnProperty('glyphPressedStrokeColor')
                ? Color.parse(props.glyphPressedStrokeColor) : new Color(Colors.BLACK);
            this.#glyphPressedFillColor = props.hasOwnProperty('glyphPressedFillColor')
                ? Color.parse(props.glyphPressedFillColor) : new Color(Colors.WHITE);
            props.hasOwnProperty('path') && (this.#path.pathString = atob(props.path));
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region Path
    get path() {
        return this.#path;
    }
    //#endregion Path
    //#region glyphPressedFillColor
    get glyphPressedFillColor() {
        return this.#glyphPressedFillColor;
    }
    set glyphPressedFillColor(newValue) {
        if (newValue instanceof Color && this.#glyphPressedFillColor !== newValue) {
            this.#glyphPressedFillColor.assign(newValue);
            if (core.isHTMLRenderer) {
                this.update();
                this.paint();
            }
        }
    }
    //#endregion glyphPressedFillColor
    //#region glyphNormalStrokeColor
    get glyphNormalStrokeColor() {
        return this.#glyphNormalStrokeColor;
    }
    set glyphNormalStrokeColor(newValue) {
        if (newValue instanceof Color && this.#glyphNormalStrokeColor !== newValue) {
            this.#glyphNormalStrokeColor.assign(newValue);
            if (core.isHTMLRenderer) {
                this.update();
                this.paint();
            }
        }
    }
    //#endregion glyphNormalStrokeColor
    //#region glyphHoveredStrokeColor
    get glyphHoveredStrokeColor() {
        return this.#glyphHoveredStrokeColor;
    }
    set glyphHoveredStrokeColor(newValue) {
        if (newValue instanceof Color && this.#glyphHoveredStrokeColor !== newValue) {
            this.#glyphHoveredStrokeColor.assign(newValue);
            if (core.isHTMLRenderer) {
                this.update();
                this.paint();
            }
        }
    }
    //#endregion glyphHoveredStrokeColor
    //#region glyphHoveredFillColor
    get glyphHoveredStrokeColor() {
        return this.#glyphHoveredFillColor;
    }
    set glyphHoveredFillColor(newValue) {
        if (newValue instanceof Color && this.#glyphHoveredFillColor !== newValue) {
            this.#glyphHoveredFillColor.assign(newValue);
            if (core.isHTMLRenderer) {
                this.update();
                this.paint();
            }
        }
    }
    //#endregion glyphHoveredFillColor
    //#region glyphPressedStrokeColor
    get glyphHoveredStrokeColor() {
        return this.#glyphPressedStrokeColor;
    }
    set glyphPressedStrokeColor(newValue) {
        if (newValue instanceof Color && this.#glyphPressedStrokeColor !== newValue) {
            this.#glyphPressedStrokeColor.assign(newValue);
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
        const htmlElement = this.HTMLElement;
        const glyph = this.glyph;
        const isPressed = this.isPressed;
        //#endregion Variables déclaration
        if (htmlElement.offsetWidth > 0 && htmlElement.offsetHeight > 0 && glyph && this.#ctx) {
            !this.#path.isEmpty
                ? glyph.classList.remove('hidden')
                : glyph.classList.add('hidden');
            this.#ctx.save();
            this.#ctx.clear();
            if (this.isMouseOver && !isPressed) {
                this.#ctx.strokeStyle = this.#glyphHoveredStrokeColor.toRGBAString();
                this.#ctx.fillStyle = this.#glyphHoveredFillColor.toRGBAString();
            } else if (isPressed) {
                this.#ctx.strokeStyle = this.#glyphPressedStrokeColor.toRGBAString();
                this.#ctx.fillStyle = this.#glyphPressedFillColor.toRGBAString();
            } else {
                this.#ctx.strokeStyle = this.#glyphNormalStrokeColor.toRGBAString();
                this.#ctx.fillStyle = this.#glyphNormalFillColor.toRGBAString();
            }
            this.#ctx.drawPath(this, this.#path, !1);
            this.#ctx.restore();
        }
    }
    //#endregion paint
    //#region updateCanvas
    updateCanvas() {
        //#region Variables déclaration
        const glyph = this.glyph;
        const glyphSize = this.glyphSize;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        if (glyph) {
            const clientRect = new Rect(0, 0, glyphSize, glyphSize);
            const p = this.#path;
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
        this.#path.destroy();
        this.#glyphNormalStrokeColor.destroy();
        this.#glyphNormalFillColor.destroy();
        this.#glyphHoveredStrokeColor.destroy();
        this.#glyphHoveredFillColor.destroy();
        this.#glyphPressedStrokeColor.destroy();
        this.#glyphPressedFillColor.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        super.loaded();
        this.#ctx = this.glyph.getContext('2d');
        this.paint();
    }
    //#endregion loaded
    //#endregion Methods
}
Object.defineProperties(PathButton.prototype, {
    'path': {
        enumerable: !0
    },
    'glyphNormalStrokeColor': {
        enumerable: !0
    },
    'glyphNormalFillColor': {
        enumerable: !0
    },
    'glyphHoveredStrokeColor': {
        enumerable: !0
    },
    'glyphHoveredFillColor': {
        enumerable: !0
    },
    'glyphPressedStrokeColor': {
        enumerable: !0
    },
    'glyphPressedFillColor': {
        enumerable: !0
    }
});
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
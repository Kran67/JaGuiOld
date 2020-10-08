//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Color } from '/scripts/core/color.js';
//#endregion Imports
//#region TextDecoration
class TextDecoration extends BaseClass {
    //#region Private fields
    #owner;
    #underline;
    #overline;
    #lineThrough;
    #color;
    #style;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, props);
        if (owner) {
            this.#owner = owner;
            this.#underline = core.tools.isBool(props.underline) ? props.underline : !1;
            this.#overline = core.tools.isBool(props.overline) ? props.overline : !1;
            this.#lineThrough = core.tools.isBool(props.lineThrough) ? props.lineThrough : !1;
            this.#color = props.color && (props.color instanceof Color) ? props.color : owner.color;
            this.#style = props.style ? props.style : core.types.TEXTDECORATIONSTYLES.SOLID;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region underline
    get underline() {
        return this.#underline;
    }
    set underline(newValue) {
        //#region Variables déclaration
        const form = this.#owner.form;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#underline !== newValue) {
            this.#underline = newValue;
            if (this.#owner.loading || form.loading) {
                return null;
            }
            !core.isHTMLRenderer && this.#owner.allowUpdate && this.#owner.update();
        }
    }
    //#endregion underline
    //#region overline
    get overline() {
        return this.#overline;
    }
    set overline(newValue) {
        //#region Variables déclaration
        const form = this.#owner.form;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#overline !== newValue) {
            this.#overline = newValue;
            if (this.#owner.loading || form.loading) {
                return null;
            }
            !core.isHTMLRenderer && this.#owner.allowUpdate && this.#owner.update();
        }
    }
    //#endregion overline
    //#region lineThrough
    get lineThrough() {
        return this.#lineThrough;
    }
    set lineThrough(newValue) {
        //#region Variables déclaration
        const form = this.#owner.form;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#lineThrough !== newValue) {
            this.#lineThrough = newValue;
            if (this.#owner.loading || form.loading) {
                return null;
            }
            !core.isHTMLRenderer && this.#owner.allowUpdate && this.#owner.update();
        }
    }
    //#endregion lineThrough
    //#region color
    get color() {
        return this.#color;
    }
    set color(newValue) {
        //#region Variables déclaration
        const form = this.#owner.form;
        //#endregion Variables déclaration
        core.tools.isString(newValue) && (newValue = Color.parse(newValue));
        if (newValue instanceof Color && this.#color !== newValue) {
            this.#color = newValue;
            if (this.#owner.loading || form.loading) {
                return null;
            }
            core.isHTMLRenderer && this.#owner.allowUpdate && this.#owner.update();
        }
    }
    //#endregion color
    //#region style
    get style() {
        return this.#style;
    }
    set style(newValue) {
        //#region Variables déclaration
        const form = this.form;
        const TEXTDECORATIONSTYLES = core.types.TEXTDECORATIONSTYLES;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, TEXTDECORATIONSTYLES) && this.#style !== newValue) {
            this.#style = newValue;
            if (this.loading || form.loading) {
                return null;
            }
            core.isHTMLRenderer && this.allowUpdate && this.update();
        }
    }
    //#endregion style
    //#endregion Getters / Setters
    //#region Methods
    //#region destroy
    destroy() {
        this.#color.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(TextDecoration.prototype, {
    'underline': {
        enumerable: !0
    },
    'overline': {
        enumerable: !0
    },
    'lineThrough': {
        enumerable: !0
    },
    'color': {
        enumerable: !0
    },
    'style': {
        enumerable: !0
    }
});
Object.seal(TextDecoration);
core.classes.register(core.types.CATEGORIES.INTERNAL, TextDecoration);
//#endregion TextDecoration
export { TextDecoration };
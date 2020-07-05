//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Color } from '/scripts/core/color.js';
//#endregion Imports
//#region TextDecoration
class TextDecoration extends BaseClass {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, props);
        if (owner) {
            core.private(this, {
                owner,
                underline: core.tools.isBool(props.underline) ? props.underline : !1,
                overline: core.tools.isBool(props.overline) ? props.overline : !1,
                lineThrough: core.tools.isBool(props.lineThrough) ? props.lineThrough : !1,
                color: props.color && core.tools.isString(props.color) ? Color.parse(props.color) : owner.color,
                style: props.style ? props.style : core.types.TEXTDECORATIONSTYLES.SOLID
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region underline
    get underline() {
        return core.private(this).underline;
    }
    set underline(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const form = priv.owner.form;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.underline !== newValue) {
            priv.underline = newValue;
            if (priv.owner.loading || form.loading) {
                return null;
            }
            !core.isHTMLRenderer && priv.owner.allowUpdate && priv.owner.update();
        }
    }
    //#endregion underline
    //#region overline
    get overline() {
        return core.private(this).overline;
    }
    set overline(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const form = priv.owner.form;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.overline !== newValue) {
            priv.overline = newValue;
            if (priv.owner.loading || form.loading) {
                return null;
            }
            !core.isHTMLRenderer && priv.owner.allowUpdate && priv.owner.update();
        }
    }
    //#endregion overline
    //#region lineThrough
    get lineThrough() {
        return core.private(this).lineThrough;
    }
    set lineThrough(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const form = priv.owner.form;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.lineThrough !== newValue) {
            priv.lineThrough = newValue;
            if (priv.owner.loading || form.loading) {
                return null;
            }
            !core.isHTMLRenderer && priv.owner.allowUpdate && priv.owner.update();
        }
    }
    //#endregion lineThrough
    //#region color
    get color() {
        return core.private(this).color;
    }
    set color(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const form = priv.owner.form;
        //#endregion Variables déclaration
        core.tools.isString(newValue) && (newValue = Color.parse(newValue));
        if (newValue instanceof Color && priv.color !== newValue) {
            priv.color = newValue;
            if (priv.owner.loading || form.loading) {
                return null;
            }
            core.isHTMLRenderer && priv.owner.allowUpdate && priv.owner.update();
        }
    }
    //#endregion color
    //#region style
    get style() {
        return core.private(this).style;
    }
    set style(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const form = this.form;
        const TEXTDECORATIONSTYLES = core.types.TEXTDECORATIONSTYLES;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, TEXTDECORATIONSTYLES) && priv.style!== newValue) {
            priv.style = newValue;
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.color.destroy();
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
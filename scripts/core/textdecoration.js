//#region Imports
import { Color } from '/scripts/core/color.js';
//#endregion Imports
//#region TextDecoration
const TextDecoration = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region TextDecoration
    class TextDecoration {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                const priv = internal(this);
                priv.owner = owner;
                priv.underline = core.tools.isBool(props.underline) ? props.underline : !1;
                priv.overline = core.tools.isBool(props.overline) ? props.overline : !1;
                priv.lineThrough = core.tools.isBool(props.lineThrough) ? props.lineThrough : !1;
                priv.color = owner.color;
                props.color && core.tools.isString(props.color) ?
                    priv.color = Color.parse(props.color) : 1;
                priv.style = props.style ? props.style : core.types.TEXTDECORATIONSTYLES.SOLID;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region underline
        get underline() {
            return internal(this).underline;
        }
        set underline(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = priv.owner.form;
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && priv.underline !== newValue) {
                priv.underline = newValue;
                if (priv.owner.loading || form.loading) {
                    return null;
                }
                !core.isHTMLRenderer && priv.owner.allowUpdate ? priv.owner.update() : 1;
            }
        }
        //#endregion underline
        //#region overline
        get overline() {
            return internal(this).overline;
        }
        set overline(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = priv.owner.form;
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && priv.overline !== newValue) {
                priv.overline = newValue;
                if (priv.owner.loading || form.loading) {
                    return null;
                }
                !core.isHTMLRenderer && priv.owner.allowUpdate ? priv.owner.update() : 1;
            }
        }
        //#endregion overline
        //#region lineThrough
        get lineThrough() {
            return internal(this).lineThrough;
        }
        set lineThrough(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = priv.owner.form;
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && priv.lineThrough !== newValue) {
                priv.lineThrough = newValue;
                if (priv.owner.loading || form.loading) {
                    return null;
                }
                !core.isHTMLRenderer && priv.owner.allowUpdate ? priv.owner.update() : 1;
            }
        }
        //#endregion lineThrough
        //#region color
        get color() {
            return internal(this).color;
        }
        set color(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = priv.owner.form;
            //#endregion Variables déclaration
            core.tools.isString(newValue) ? newValue = Color.parse(newValue) : 1;
            if (newValue instanceof Color && priv.color !== newValue) {
                priv.color = newValue;
                if (priv.owner.loading || form.loading) {
                    return null;
                }
                core.isHTMLRenderer && priv.owner.allowUpdate ? priv.owner.update() : 1;
            }
        }
        //#endregion color
        //#region style
        get style() {
            return internal(this).style;
        }
        set style(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            const TEXTDECORATIONSTYLES = core.types.TEXTDECORATIONSTYLES;
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, TEXTDECORATIONSTYLES) && priv.style !== newValue) {
                priv.style = newValue;
                if (this.loading || form.loading) {
                    return null;
                }
                core.isHTMLRenderer && this.allowUpdate ? this.update() : 1;
            }
        }
        //#endregion style
        //#endregion Getters / Setters
        //#region Methods
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.owner = null;
            priv.underline = null;
            priv.overline = null;
            priv.lineThrough = null;
            priv.color.destroy();
            priv.color = null;
            priv.style = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return TextDecoration;
    //#endregion TextDecoration
})();
Object.seal(TextDecoration);
//#endregion TextDecoration
export { TextDecoration };
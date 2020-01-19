//#region Imports
import { Tools } from "/scripts/core/tools.js";
import { Color } from "/scripts/core/color.js";
//#endregion Imports
//#region TextDecoration
const TextDecoration = (() => {
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
    //#region TextDecoration
    class TextDecoration {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                const priv = internal(this);
                priv.owner = owner;
                priv.underline = Tools.isBool(props.underline) ? props.underline : false;
                priv.overline = Tools.isBool(props.overline) ? props.overline : false;
                priv.lineThrough = Tools.isBool(props.lineThrough) ? props.lineThrough : false;
                priv.color = owner.color;
                if (props.color) {
                    if (Tools.isString(props.color)) {
                        priv.color = Color.parse(props.color);
                    }
                }
                priv.style = props.style ? props.style : Types.TEXTDECORATIONSTYLES.SOLID;
            }
        }
        //#endregion constructor
        //#region Getters/Setters
        //#region underline
        get underline() {
            return internal(this).underline;
        }
        set underline(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = priv.owner.form;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.underline !== newValue) {
                    priv.underline = newValue;
                    if (priv.owner.loading || form.loading) {
                        return null;
                    }
                    if (!Core.isHTMLRenderer && priv.owner.allowUpdate) {
                        priv.owner.update();
                    }
                }
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
            if (Tools.isBool(newValue)) {
                if (priv.overline !== newValue) {
                    priv.overline = newValue;
                    if (priv.owner.loading || form.loading) {
                        return null;
                    }
                    if (!Core.isHTMLRenderer && priv.owner.allowUpdate) {
                        priv.owner.update();
                    }
                }
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
            if (Tools.isBool(newValue)) {
                if (priv.lineThrough !== newValue) {
                    priv.lineThrough = newValue;
                    if (priv.owner.loading || form.loading) {
                        return null;
                    }
                    if (!Core.isHTMLRenderer && priv.owner.allowUpdate) {
                        priv.owner.update();
                    }
                }
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
            const CONSTANTS = Types.CONSTANTS;
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                newValue = Color.parse(newValue);
            }
            if (newValue instanceof Color) {
                if (priv.color !== newValue) {
                    priv.color = newValue;
                    if (priv.owner.loading || form.loading) {
                        return null;
                    }
                    if (Core.isHTMLRenderer && priv.owner.allowUpdate) {
                        priv.owner.update();
                    }
                }
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
            const TEXTDECORATIONSTYLES = Types.TEXTDECORATIONSTYLES;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, TEXTDECORATIONSTYLES)) {
                if (priv.style !== newValue) {
                    priv.style = newValue;
                    if (this.loading || form.loading) {
                        return null;
                    }
                    if (Core.isHTMLRenderer && this.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion style
        //#endregion Getters/Setters
    }
    return TextDecoration;
    //#endregion TextDecoration
})();
//#region TextDecoration defineProperties
Object.defineProperties(TextDecoration, {
    "underline": {
        enumerable: true
    },
    "overline": {
        enumerable: true
    },
    "lineThrough": {
        enumerable: true
    },
    "color": {
        enumerable: true
    },
    "style": {
        enumerable: true
    }
});
//#endregion TextDecoration defineProperties
//#endregion TextDecoration
Object.seal(TextDecoration);
export { TextDecoration };
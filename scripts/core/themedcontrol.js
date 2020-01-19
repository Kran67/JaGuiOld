//#region Imports
import { Control } from "/scripts/components/control.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Imports
//#region ThemedControl
const ThemedControl = (() => {
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
    //#region ThemedControl
    class ThemedControl extends Control {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.themeName = String.EMPTY;
            }
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region themeName
        get themeName() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.themeName !== String.EMPTY ? priv.themeName : this.form.app.themeManifest.themeName;
        }
        set themeName(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.themeName !== newValue) {
                    // on recherche s'il existe un theme
                    let newThemeOk = false;
                    if (Core.isHTMLRenderer) {
                        newThemeOk = Array.from(document.styleSheets).some(styleSheet => {
                            if (styleSheet.href) {
                                return styleSheet.href.includes(`${newValue}.css`);
                            } else {
                                return false;
                            }
                        });
                    } else {
                        newThemeOk = Core.themes[newValue];
                    }
                    if (newThemeOk) {
                        priv.themeName = newValue;
                        //if (Core.isHTMLRenderer) {
                        //    ctrls = this.HTMLElement.querySelectorAll("[data-theme]");
                        //    ctrls.forEach(ctrl => {
                        //        if (ctrl.jsObj) {
                        //            if (jsObj === this) {
                        //                //ctrls[j].dataset.theme = internal(this).themeName;
                        //            }
                        //        }
                        //    });
                        //}
                    }
                }
            }
        }
        //#endregion themeName
        //#region themeAndClassName
        get themeAndClassName() {
            return `${internal(this).themeName}_${this.constructor.name}`;
        }
        //#endregion themeAndClassName
        //#region template
        get template() {
            //#region Variables déclaration
            let html = super.template;
            const a = html.split("{theme}");
            //#endregion Variables déclaration
            html = a.join(this.form.themeName);
            return html;
        }
        //#endregion template
        //#endregion Getter / Setter
        //#region Methods
        //#region changeTheme
        changeTheme() {
            this.onChangeTheme.invoke();
        }
        //#endregion changeTheme
        //#endregion Methods
    }
    return ThemedControl;
    //#endregion ThemedControl
})();
//#region ThemedControl defineProperties
Object.defineProperties(ThemedControl, {
    "themeName": {
        enumerable: true
    }
});
//#endregion ThemedControl defineProperties
//#endregion ThemedControl
Core.classes.register(Types.CATEGORIES.INTERNAL, ThemedControl);
export { ThemedControl };
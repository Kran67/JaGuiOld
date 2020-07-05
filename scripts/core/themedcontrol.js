//#region Imports
import { Control } from '/scripts/components/control.js';
//#endregion Imports
//#region ThemedControl
class ThemedControl extends Control {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                themeName: String.EMPTY
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region themeName
    get themeName() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return !String.isNullOrEmpty(priv.themeName) ? priv.themeName : this.form.app.themeManifest.themeName;
    }
    set themeName(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.themeName !== newValue) {
            // on recherche s'il existe un theme
            let newThemeOk = !1;
            newThemeOk = core.isHTMLRenderer
                ? Array.from(document.styleSheets).some(styleSheet => {
                    return styleSheet.href ? styleSheet.href.includes(`${newValue}.css`) : !1;
                })
                : core.themes[newValue];
            if (newThemeOk) {
                priv.themeName = newValue;
                //if (core.isHTMLRenderer) {
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
    //#endregion themeName
    //#region themeAndClassName
    get themeAndClassName() {
        return `${core.private(this).themeName}_${this.constructor.name}`;
    }
    //#endregion themeAndClassName
    //#region template
    get template() {
        //#region Variables déclaration
        let html = super.template;
        const a = html.split('{theme}');
        //#endregion Variables déclaration
        html = a.join(this.form.themeName);
        return html;
    }
    //#endregion template
    //#endregion Getters / Setters
    //#region Methods
    //#region changeTheme
    changeTheme() {
        this.onChangeTheme.invoke();
    }
    //#endregion changeTheme
    //#endregion Methods
}
Object.defineProperties(ThemedControl.prototype, {
    'themeName': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.INTERNAL, ThemedControl);
//#endregion ThemedControl
export { ThemedControl };
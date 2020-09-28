//#region Imports
import { Control } from '/scripts/components/control.js';
//#endregion Imports
//#region ThemedControl
class ThemedControl extends Control {
    #themeName = String.EMPTY;
    //#region Getters / Setters
    //#region themeName
    get themeName() {
        return !String.isNullOrEmpty(this.#themeName) ? this.#themeName : this.form.app.themeManifest.themeName;
    }
    set themeName(newValue) {
        if (core.tools.isString(newValue) && this.#themeName !== newValue) {
            // on recherche s'il existe un theme
            let newThemeOk = !1;
            newThemeOk = core.isHTMLRenderer
                ? Array.from(document.styleSheets).some(styleSheet => {
                    return styleSheet.href ? styleSheet.href.includes(`${newValue}.css`) : !1;
                })
                : core.themes[newValue];
            if (newThemeOk) {
                this.#themeName = newValue;
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
        return `${this.#themeName}_${this.constructor.name}`;
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
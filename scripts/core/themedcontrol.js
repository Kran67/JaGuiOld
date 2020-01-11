import { Control } from "/scripts/components/control.js";
//#region ThemedControl final
const ThemedControl = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class ThemedControl extends Control {
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.themeName = String.EMPTY;
            }
            //Tools.Debugger.log(arguments, this, t);
        }
        get themeName() {
            const priv = internal(this);
            return priv.themeName !== String.EMPTY ? priv.themeName : this.form.app.themeManifest.themeName;
        }
        set themeName(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
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
        get themeAndClassName() {
            return `${internal(this).themeName}_${this.constructor.name}`;
        }
        get template() {
            let html = super.template;
            const a = html.split("{theme}");
            html = a.join(this.form.themeName);
            return html;
        }
        //#region Methods
        //updateFromHTML() {
        //    //let data = this.HTMLElement.dataset.theme;
        //    //if (data) this.themeName = data;
        //    //if (this.HTMLElement.dataset.cssResource!==null) this.cssResource=this.HTMLElement.dataset.cssResource;
        //    super.updateFromHTML();
        //}
        changeTheme() {
            this.onChangeTheme.invoke();
        }
        //#endregion
    }
    return ThemedControl;
})();
Object.defineProperties(ThemedControl, {
    "themeName": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, ThemedControl);
export { ThemedControl };
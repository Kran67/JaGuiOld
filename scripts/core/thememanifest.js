//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Window } from '/scripts/components/containers/window.js';
//#endregion Imports
//#region ThemeManifest
const ThemeManifest = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class ThemeManifest
    class ThemeManifest extends BaseClass {
        //#region Constructor
        constructor(owner) {
            super(owner);
            const priv = internal(this);
            priv.themes = [];
            priv.lastThemeName = core.defaultTheme;
            priv.owner = owner;
            priv.themeName = core.defaultTheme;
        }
        //#endregion Constructor
        //#region Getters / Setters
        //#region themes
        get themes() {
            return internal(this).themes;
        }
        //#endregion themes
        //#region lastThemeName
        get lastThemeName() {
            return internal(this).lastThemeName;
        }
        set lastThemeName(newValue) {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            core.tools.isString(newValue) && priv.lastThemeName !== newValue
                ? priv.lastThemeName = newValue : 1;
        }
        //#endregion lastThemeName
        //#region owner
        get owner() {
            return internal(this).owner;
        }
        //#endregion owner
        //#region themeName
        get themeName() {
            return internal(this).themeName;
        }
        set themeName(newValue) {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            if (core.tools.isString(newValue) && newValue !== priv.themeName) {
                document.body.classList.add('changingTheme');
                priv.lastThemeName = priv.themeName;
                priv.themeName = newValue.toLowerCase();
                setTimeout(this.changeTheme.bind(this), 1000);
            }
        }
        //#endregion themeName
        //#endregion Getters / Setters
        //#region Methods
        //#region changeTheme
        changeTheme() {
            //#region Variables declaration
            const wins = this.owner.windows;
            const lastThemeName = this.lastThemeName;
            const themeName = this.themeName;
            const owner = this.owner;
            const isHtmlRenderer = core.isHTMLRenderer;
            //#endregion Variables declaration
            if (!isHtmlRenderer) {
                core.deleteImages(core.themes[lastThemeName]);
                core.themes[lastThemeName].initialized = !1;
            }
            // Delete all image from previous theme
            wins.forEach(win => {
                this.changeWindowTheme(win);
            });
            document.body.classList.remove(lastThemeName);
            document.body.classList.add(themeName);
            if (isHtmlRenderer) {
                owner.toolTip.classList.remove(lastThemeName);
                owner.toolTip.classList.add(themeName);
            }
            document.body.classList.remove('changingTheme');
        }
        //#endregion changeTheme
        //#region changeWindowTheme
        changeWindowTheme(window) {
            //#region Variables declaration
            const lastThemeName = this.lastThemeName;
            const themeName = this.themeName;
            const isHtmlRenderer = core.isHTMLRenderer;
            const wHTMLElement = window.HTMLElement =
                //#endregion Variables declaration
                window.themeName = themeName;
            if (isHtmlRenderer) {
                wHTMLElement.classList.remove(lastThemeName);
                wHTMLElement.classList.add(themeName);
                const ctrls = wHTMLElement.querySelectorAll(`.${lastThemeName}`);
                ctrls.forEach(ctrl => {
                    ctrl.classList.remove(lastThemeName);
                    ctrl.classList.add(themeName);
                    if (ctrl.jsObj) {
                        const jsObj = ctrl.jsObj;
                        jsObj.themeName && jsObj.themeName !== themeName ? jsObj.themeName = themeName : 1;
                    }
                });
            } else {
                const theme = core.themes[themeName];
                let margin = null;
                margin = theme && theme.window && theme.window.layout && theme.window.layout.margin
                    ? theme.window.layout.margin
                    : Window.SIZEABLEBORDERSIZE;
                window.layoutMargin(margin);
                theme && theme.window && theme.window.titlebar && theme.window.titlebar.height
                    ? window.setTitleBarProp({ 'height': theme.window.titlebar.height })
                    : window.setTitleBarProp({ 'height': Window.TITLEBARHEIGHT });
                if (window.isRolledUp || window.minimzed) {
                    theme && theme.window && theme.window.minHeight
                        ? window.height = theme.window.minHeight
                        : window.height = Window.MINHEIGHT;
                }
                window.alignButtons();
                window.captionChanged();
                theme.onThemeChanged ? theme.onThemeChanged.invoke(window) : 1;
            }
            window.onThemeChanged.invoke();
            window.realignChilds();
        }
        //#endregion changeWindowTheme
        //#region addThemes
        addThemes(themes) {
            if (Array.isArray(themes)) {
                themes.forEach(e => {
                    this.addTheme(e);
                });
            }
        }
        //#endregion addThemes
        //#region addTheme
        addTheme(themeName) {
            //#region Variables declaration
            const themes = this.themes;
            //#endregion Variables declaration
            core.tools.isString(themeName) && themes.indexOf(themeName) === -1 ? themes.push(themeName) : 1;
        }
        //#endregion addTheme
        //#region destroy
        destroy() {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            priv.themes.clear();
            priv.themes = null;
            priv.lastThemeName = null;
            priv.owner = null;
            priv.themeName = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return ThemeManifest;
    //#endregion Class ThemeManifest
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, ThemeManifest);
//#endregion ThemeManifest
export { ThemeManifest };
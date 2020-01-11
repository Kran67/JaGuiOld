import { BaseClass } from "/scripts/core/baseclass.js";
import { Window } from "/scripts/components/containers/window.js";
//#region ThemeManifest
const ThemeManifest = (() => {
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
    //#region Class ThemeManifest
    class ThemeManifest extends BaseClass {
        //#region Constructor
        constructor(owner) {
            super(owner);
            //#region Private
            const priv = internal(this);
            priv.themes = [];
            priv.lastThemeName = Core.defaultTheme;
            priv.owner = owner;
            priv.themeName = Core.defaultTheme;
            //#endregion Private
        }
        //#endregion Constructor
        //#region getters / setters
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
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.lastThemeName !== newValue) {
                    priv.lastThemeName = newValue;
                }
            }
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
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (newValue !== priv.themeName) {
                    document.body.classList.add("changingTheme");
                    priv.lastThemeName = priv.themeName;
                    priv.themeName = newValue.toLowerCase();
                    setTimeout(this.changeTheme.bind(this), 1000);
                }
            }
        }
        //#endregion themeName
        //#endregion getters / setters
        //#region Methods
        //#region changeTheme
        changeTheme() {
            //#region Variables declaration
            const wins = this.owner.windows;
            const lastThemeName = this.lastThemeName;
            const themeName = this.themeName;
            const owner = this.owner;
            const isHtmlRenderer = Core.isHTMLRenderer;
            //#endregion Variables declaration
            if (!isHtmlRenderer) {
                Core.deleteImages(Core.themes[lastThemeName]);
                Core.themes[lastThemeName].initialized = false;
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
            document.body.classList.remove("changingTheme");
        }
        //#endregion changeTheme
        //#region changeWindowTheme
        changeWindowTheme(window) {
            //#region Variables declaration
            const lastThemeName = this.lastThemeName;
            const themeName = this.themeName;
            const isHtmlRenderer = Core.isHTMLRenderer;
            //#endregion Variables declaration
            window.themeName = themeName;
            if (isHtmlRenderer) {
                window.HTMLElement.classList.remove(lastThemeName);
                window.HTMLElement.classList.add(themeName);
                const ctrls = window.HTMLElement.querySelectorAll(`.${lastThemeName}`);
                ctrls.forEach(ctrl => {
                    ctrl.classList.remove(lastThemeName);
                    ctrl.classList.add(themeName);
                    if (ctrl.jsObj) {
                        if (ctrl.jsObj.themeName) {
                            if (ctrl.jsObj.themeName !== themeName) {
                                ctrl.jsObj.themeName = themeName;
                            }
                        }
                    }
                });
            } else {
                const theme = Core.themes[themeName];
                let margin = null;
                if (theme && theme.window && theme.window.layout && theme.window.layout.margin) {
                    margin = theme.window.layout.margin;
                } else {
                    margin = Window.SIZEABLEBORDERSIZE;
                }
                window.layoutMargin(margin);
                if (theme && theme.window && theme.window.titlebar && theme.window.titlebar.height) {
                    window.setTitleBarProp({"height": theme.window.titlebar.height});
                } else {
                    window.setTitleBarProp({"height": Window.TITLEBARHEIGHT});
                }
                if (window.isRolledUp || window.minimzed) {
                    if (theme && theme.window && theme.window.minHeight) {
                        window.height = theme.window.minHeight;
                    } else {
                        window.height = Window.MINHEIGHT;
                    }
                }
                window.alignButtons();
                window.captionChanged();
                if (Core.themes[themeName].onThemeChanged) {
                    Core.themes[themeName].onThemeChanged.invoke(window);
                }
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
        addTheme(themeName) {
            //#region Variables declaration
            const themes = this.themes;
            //#endregion Variables declaration
            if (typeof themeName === Types.CONSTANTS.STRING) {
                if (themes.indexOf(themeName) === -1) {
                    themes.push(themeName);
                }
            }
        }
        destroy() {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            priv.themes.clear();
            super.destroy();
        }
        //#endregion
    }
    return ThemeManifest;
    //#region Class ThemeManifest
})();
Object.defineProperties(ThemeManifest, {
    "themeName": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, ThemeManifest);
export { ThemeManifest };
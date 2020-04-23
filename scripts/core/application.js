//#region Imports
import { Text } from '/scripts/core/text.js';
import { Convert } from '/scripts/core/convert.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
import { ShortCutIcon } from '/scripts/components/common/shortcuticon.js';
//Mouseevents
//#endregion
//#region Application
/**
 * Class representing an Application.
 * @extends BaseClass
 */
const Application = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Application {
        /**
         * Create a new instance of Application.
         * @param {String}      appName     Name of the Application.
         */
        constructor(appName) {
            //#region Properties
            //#region Private Properties
            const apps = core.apps;
            const priv = internal(this);
            priv.toolTipTimerHandle = null;
            priv.windows = [];
            priv.globalComponentName = [];
            priv.aceWrappers = [];
            priv.lastActiveWindow = [];
            priv.locales = {};
            priv.loadedWindowsHTML = 0;
            priv.windowsClass = {};
            priv.toolTip = null;
            priv.showMainWindow = !0;
            priv.name = appName;
            priv.mainWindow = null;
            priv.activeWindow = null;
            priv.title = String.EMPTY;
            priv.locale = null;
            priv.themeManifest = new core.classes.ThemeManifest(this);
            priv.themeManifest.lastThemeName = core.defaultTheme;
            //#endregion Private Properties
            //#region Public Properties
            Object.defineProperties(this, {
                'themeName': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).themeManifest.themeName;
                    }
                },
                'toolTipTimerHandle': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).toolTipTimerHandle;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isNumber(newValue) && priv.toolTipTimerHandle !== newValue ? priv.toolTipTimerHandle = newValue : 1;
                    }
                },
                'windows': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).windows;
                    }
                },
                'globalComponentName': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).globalComponentName;
                    }
                },
                'aceWrappers': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).aceWrappers;
                    }
                },
                'lastActiveWindow': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).lastActiveWindow;
                    }
                },
                'locales': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).locales;
                    }
                },
                'loadedWindowsHTML': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).loadedWindowsHTML;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isNumber(newValue) && priv.loadedWindowsHTML !== newValue ? priv.loadedWindowsHTML = newValue : 1;
                    }
                },
                'windowsClass': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).windowsClass;
                    }
                },
                'toolTip': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).toolTip;
                    }
                },
                'showMainWindow': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).showMainWindow;
                    }
                },
                'name': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).name;
                    }
                },
                'mainWindow': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).mainWindow;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        newValue instanceof core.classes.Window && priv.mainWindow !== newValue ? priv.mainWindow = newValue : 1;
                    }
                },
                'activeWindow': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).activeWindow;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        if (newValue instanceof core.classes.Window && priv.activeWindow !== newValue) {
                            priv.activeWindow = newValue;
                            core.isCanvasRenderer ? core.canvas.needRedraw = !0 : 1;
                        }
                    }
                },
                'title': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).title;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isString(newValue) ? priv.title = newValue : 1;
                    }
                },
                'locale': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).locale;
                    },
                    set: function (locale) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        let comps = null;
                        const windows = priv.windows;
                        const classes = core.classes;
                        //#endregion Variables déclaration
                        if (priv.locales[locale] && priv.locale !== locale) {
                            priv.locale = locale;
                            windows.forEach(win => {
                                if (win.visible) {
                                    comps = priv.activeWindow.controls.filter(e => {
                                        return e instanceof classes.Control && e.autoTranslate && e.visible;
                                    });
                                    comps.forEach(comp => {
                                        comp instanceof classes.CaptionControl ||
                                            comp instanceof classes.CustomTextControl ?
                                            this.getLocalText(comp) : 1;
                                    });
                                }
                            });
                        }
                    }
                },
                'themeManifest': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).themeManifest;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        newValue instanceof core.classes.ThemeManifest ? priv.themeManifest = newValue : 1;
                    }
                }
            });
            //#endregion Public Properties
            //#endregion Properties
            apps.applications[appName] = this;
            apps.activeApplication = this;
        }
        //#region Methods
        getWindow(windowName) {
            const windows = priv.windows.filter((e) => {
                return e.name === windowName;
            });
            return !windows.isEmpty ? windows.first : null;
        }
        /**
         * Check if the new component name is unique
         */
        isUniqueGlobalComponentName(name) {
            return priv.globalComponentName.indexOf(name) === -1;
        }
        /**
         * Generate a new unique name
         */
        uniqueName(object) {
            //#region Variables déclaration
            const _class = object.constructor.name;
            let idx = null;
            //#endregion Variables déclaration
            if (!this[`_${_class}s`]) {
                this[`_${_class}s`] = {};
                this[`_${_class}s`].names = [String.EMPTY];
            }
            const a = this[`_${_class}s`].names;
            for (idx = 1; idx < a.length; idx++) {
                if (!a[idx]) {
                    break;
                }
            }
            return `${_class}${idx}`;
        }
        /**
         * Remove the name from unique name list
         */
        removeName(object) {
            //#region Variables déclaration
            const _class = object.constructor.name;
            //#endregion Variables déclaration
            if (this[`_${_class}s`]) {
                const a = this[`_${_class}s`].names;
                let idx = a.indexOf(object.name);
                idx > -1 ? a[idx] = null : 1;
            }
        }
        /**
         * Add a name to the unique name list if not exist
         */
        addName(object) {
            //#region Variables déclaration
            const _class = object.constructor.name;
            //#endregion Variables déclaration
            if (this[`_${_class}s`]) {
                const a = this[`_${_class}s`].names;
                const idx = a.indexOf(object.name);
                if (idx === -1) {
                    const tab = object.name.match(/\d+$/);
                    if (tab) {
                        const n = ~~tab.first;
                        a[n] = object.name;
                    }
                }
            }
        }
        /**
         * Ternimate the application and destroy her and all components
         */
        terminate() {
            //#region Variables déclaration
            const windows = this.windows.reverse();
            const apps = core.apps;
            //#endregion Variables déclaration
            windows.forEach((window) => {
                window.destroyOnHide = !0;
                window.hide();
                window.removeToHTML();
            });
            apps.activeApplication === this ? apps.activeApplication = null : 1;
            apps.applications[priv.name] = null;
            delete apps.applications[priv.name];
            const icon = Convert.nodeListToArray(document.getElementsByName(`ShortCutIcon_${priv.name}`)).first;
            icon ? icon.classList.toggle('hidden') : 1;
            this.destroy();
        }
        /**
         * Load the HTML of all windows
         */
        loadWindowsHTML() {
            //#region Variables déclaration
            const window = document.querySelector('object.mainWindow');
            const tools = core.tools;
            //#endregion Variables déclaration
            if (window) {
                const template = window.contentDocument.body.querySelector('template').innerHTML;
                const div = document.createElement(core.types.HTMLELEMENTS.DIV);
                const dx = Text.replace(template, '{theme}', core.apps.activeApplication.themeManifest.themeName);
                div.innerHTML = dx;
                if (core.isHTMLRenderer) {
                    div.firstElementChild.classList.add('hidden');
                    !tools.HTMLParentElement
                        ? document.body.appendChild(div.firstElementChild)
                        : tools.HTMLParentElement.appendChild(div.firstElementChild);
                }
            }
            this.run();
        }
        /**
         * Run the application
         */
        run() {
            //#region Variables déclaration
            const priv = internal(this);
            let data = null;
            let form = null;
            let wins = null;
            const RENDERERS = core.types.RENDERERS;
            //#endregion Variables déclaration
            switch (core.renderer) {
                case RENDERERS.HTML:
                    wins = document.querySelectorAll(`jagui-window.${priv.name}`);
                    wins.forEach(win => {
                        let props = {};
                        const properties = win.querySelector('properties');
                        properties ? props = JSON.parse(properties.innerText) : 1;
                        form = this.createForm(win.id, win.dataset.class, props);
                        this.windows.push(form);
                        win.style.display !== 'none'
                            ? !priv.mainWindow
                                ? form instanceof core.classes.Window
                                    ? priv.mainWindow = priv.activeWindow = form
                                    : 1
                                : form.show()
                            : 1;
                    });
                    break;
                case RENDERERS.SVG:
                    break;
                case RENDERERS.CANVAS:
                    data = document.querySelector('object.mainWindow');
                    if (data) {
                        data = JSON.parse(data.innerHTML.replace(/{theme}/g, core.defaultTheme));
                        data.themes ? priv.themeManifest.addThemes(data.themes) : 1;
                        wins = data.windows;
                        wins.forEach(win => {
                            form = this.createForm(win.childs, win.className, win.properties);
                            priv.windows.push(form);
                            form.name === data.mainForm ? priv.mainWindow = priv.activeWindow = form : form.show();
                        });
                    }
                    break;
            }
            priv.mainWindow.show();
            data = document.getElementById('loading_msg');
            data ? document.body.removeChild(data) : 1;
            this.createToolTip();
            window.activeApp = this;
        }
        /**
         * Create a form
         */
        createForm(id, instanceClass, props) {
            core.windowZIndex++;
            const form = new this.windowsClass[instanceClass](this, props);
            form.formCreated(id);
            //this.themeManifest.changeWindowTheme(form);
            //this.icon.loaded();
            return form;
        }
        /**
         * Initialize the application
         */
        initialize(/*createIcon*/) {
            //#region Variables déclaration
            const priv = internal(this);
            const activeApplication = core.apps.activeApplication;
            //#endregion Variables déclaration
            !priv.locale ? priv.locale = core.currentLocale : 1;
            //if (!createIcon) {
            //    createIcon = !1;
            //}
            //if (createIcon) {
            //    this.icon = Core.classes.createComponent({
            //        class: ShortCutIcon,
            //        owner: this,
            //        name: `${this.constructor.name}_shortCut`,
            //        props: {
            //            "parentHTML": Core.isHTMLRenderer ? document.body : null,
            //            toolTip: "Double click to launch"
            //        },
            //        withTpl: Core.isHTMLRenderer
            //    });
            //    this.icon.onDblClick.addListener(function(sender) {
            //        Core.apps.createApp(this.owner);
            //    });
            //}
            if (core.isHTMLRenderer) {
                const wins = document.querySelectorAll('object.window');
                wins.forEach(win => {
                    const content = win.contentDocument ? win.contentDocument.body.innerHTML.trim() : win.firstChild.nodeValue.trim();
                    if (content === String.EMPTY) {
                        win.addEventListener('load', () => {
                            activeApplication.addWindow(wins.length);
                        });
                    } else {
                        activeApplication.addWindow(wins.length);
                    }
                });
            }
        }
        addWindow(maxWins) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.loadedWindowsHTML++;
            priv.loadedWindowsHTML === maxWins ? this.loadWindowsHTML() : 1;
        }
        //newWindow (windowPath, show, callBack) {
        //    var Tools = require("tools");
        //    var Uri = require("uri");
        //    // la fiche est déjà chargée
        //    var html_doc, style, windowClass;
        //    windowClass = Tools.uri.extractFileName(windowPath);
        //    show = !show ? !0 : show;
        //    html_doc = document.getElementsByTagName("head")[0];
        //    style = document.createElement("link");
        //    style.setAttribute("rel", "stylesheet");
        //    style.setAttribute("href", Tools.uri.base() + windowPath + ".css?rnd=" + new Date().getTime());
        //    style.setAttribute("media", "screen");
        //    html_doc.appendChild(style);
        //    style = document.createElement("link");
        //    var node = document.createElement("script");
        //    node.setAttribute("type", "text/javascript");
        //    node.addEventListener("load", function () {
        //        var Xhr = require("xhr");
        //        var Uri = require("uri");
        //        Xhr.load(!0, Uri.base() + windowPath + ".html?rnd=" + new Date().getTime(), function (dx) {
        //            var Text = require("text");
        //            var Core = require("core");
        //            var div = document.createElement(Types.HTMLELEMENTS.DIV);
        //            dx = Text.replace(dx, "{theme}", Core.apps.activeApplication.themeManifest.themeName);
        //            div.innerHTML = dx;
        //            document.body.appendChild(div.firstElementChild);
        //            var app = Core.apps.activeApplication;
        //            var wins = document.querySelectorAll("[data-appname='" + app.name + "']"), form;//docment.documentElement.getElementsByClassName(app.name),form;
        //            for (var i = 0, l = wins.length; i < l; i++) {
        //                data = wins[i].dataset.class;
        //                if (data.toLowerCase() === Uri.split(windowPath, !0).toLowerCase()) {
        //                    form = app.createForm(wins[i].id, data);
        //                    if (show) {
        //                        if (form.showingMode === Types.SHOWINGMODES.MODAL) form.showModal();
        //                        else form.show();
        //                    }
        //                }
        //            }
        //            if (callBack) callBack(form);
        //        }, !1);
        //    }, !1);
        //    node.addEventListener("error", function () {
        //        console.log(windowPath + " not loaded");
        //    }, !1);
        //    node.setAttribute("src", Uri.base() + windowPath + ".js");//?rnd="+new Date().getTime());
        //    html_doc.appendChild(node);
        //},
        /**
         * Change the caption / placer holder of CaptionControl current locale
         */
        getLocalText(obj) {
            //#region Variables déclaration
            const priv = internal(this);
            const classes = core.classes;
            //#endregion Variables déclaration
            if (obj instanceof classes.CaptionControl) {
                const c = priv.locales[priv.locale];
                if (c) {
                    const key = `${obj.form.name}.${obj.name}`;
                    c[key]
                        ? obj instanceof classes.CaptionControl
                            ? obj.caption = c[key]
                            : obj instanceof classes.CustomTextControl
                                ? obj.placeHolder = c[key]
                                : 1
                        : 1;
                } else {
                    obj.update();
                }
            } else {
                obj.update();
            }
        }
        /**
         * Create the tooltip of the application
         */
        createToolTip() {
            //#region Variables déclaration
            const priv = internal(this);
            const types = core.types;
            const wrapper = document.createElement(types.HTMLELEMENTS.DIV);
            let tpl = Core.templates.ToolTip;
            let a = tpl.split('{theme}');
            //#endregion Variables déclaration
            tpl = a.join(priv.mainWindow.themeName);
            a = tpl.split('{text}');
            tpl = a.join(String.EMPTY);
            wrapper.innerHTML = tpl;
            document.body.appendChild(wrapper.firstElementChild);
            priv.toolTip = document.body.lastElementChild;
            priv.toolTip.style.zIndex = types.CONSTANTS.STAYONTOP + 1;
            Events.bind(priv.toolTip, Mouse.MOUSEEVENTS.MOVE, () => {
                core.apps.activeApplication.hideToolTip();
            });
        }
        /**
         * Show the tooltip of a component
         */
        showToolTip(obj, coord, useOffset) {
            //#region Variables déclaration
            const priv = internal(this);
            let text = String.EMPTY;
            let exit = !1;
            const classes = core.classes;
            const activeApplication = core.apps.activeApplication;
            //#endregion Variables déclaration
            this.hideToolTip();
            !obj.showToolTip && !obj.ownerShowToolTip ? exit = !0 : 1;
            classes.CustomTextControl && obj instanceof classes.CustomTextControl && !obj.hasError
                ? exit = !0
                : 1;
            if (!exit) {
                !String.isNullOrEmpty(obj.toolTip)
                    ? text = obj.toolTip
                    : obj.ownerShowToolTip
                        ? !String.isNullOrEmpty(obj.owner.toolTip)
                            ? text = obj.owner.toolTip
                            : 1
                        : 1;
                classes.CustomTextControl && obj instanceof classes.CustomTextControl && obj.hasError
                    ? text = obj.errorMsg
                    : 1;
                if (!text) {
                    return;
                }
                if (typeof text !== core.types.CONSTANTS.STRING) {
                    return;
                }
                if (!String.isNullOrEmpty(text) && priv.toolTip) {
                    priv.toolTip.innerHTML = text;
                    setTimeout(() => {
                        activeApplication.toolTip
                            ? activeApplication.toolTip.classList.toggle('fade')
                            : 1;
                    }, 10);
                    this.placeToolTip(coord, useOffset);
                    this.closeToolTip();
                }
            }
        }
        /**
         * Move the tooltip
         */
        placeToolTip(coord, useOffset) {
            //#region Variables déclaration
            const priv = internal(this);
            const cssUnits = core.types.CSSUNITS;
            const tt = priv.toolTip;
            let tx = coord.x;
            let ty = coord.y;
            //#endregion Variables déclaration
            !useOffset ? useOffset = !0 : 1;
            tx + tt.offsetWidth > document.body.offsetWidth ? tx = document.body.offsetWidth - tt.offsetWidth : 1;
            useOffset ? ty += 20 : 1;
            ty + tt.offsetHeight > document.body.offsetHeight ? ty = coord.y - tt.offsetHeight : 1;
            tt.style.transform = `translate(${tx}${cssUnits.PX},${ty}${cssUnits.PX})`;
            tt.classList.add('fade');
            clearTimeout(priv.toolTipTimerHandle);
        }
        /**
         * Prepare hiding the tooltip
         */
        closeToolTip() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            clearTimeout(priv.toolTipTimerHandle);
            priv.toolTipTimerHandle = setTimeout(() => {
                core.apps.activeApplication.hideToolTip();
            }, 4000);
        }
        /**
         * Hide the tooltip
         */
        hideToolTip() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.toolTip) {
                priv.toolTip.classList.remove('fade');
                clearTimeout(priv.toolTipTimerHandle);
            }
        }
        /**
         * Destroy the tooltip
         */
        destroyToolTip() {
            //#region Variables déclaration
            const priv = internal(this);
            const toolTip = priv.toolTip;
            //#endregion Variables déclaration
            if (toolTip) {
                clearTimeout(priv.toolTipTimerHandle);
                Events.unBind(toolTip, Mouse.MOUSEEVENTS.MOVE, priv.hideToolTip);
                document.body.removeChild(toolTip);
                priv.toolTip = null;
            }
        }
        /**
         * Close all popups
         */
        closeAllPopups() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.windows.forEach(win => {
                win.closePopups();
            });
        }
        /**
         * Destroy all properties of the instance
         * @override
         */
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.windows.destroy();
            priv.globalComponentName.destroy();
            priv.lastActiveWindow.destroy();
            priv.toolTipTimerHandle = null;
            priv.windows.clear();
            priv.windows = null;
            priv.globalComponentName = null;
            //priv.aceWrappers = [];
            priv.lastActiveWindow = null;
            priv.locales = null;
            priv.loadedWindowsHTML = null;
            priv.windowsClass = null;
            priv.toolTip = null;
            priv.showMainWindow = null;
            priv.name = null;
            priv.mainWindow = null;
            priv.activeWindow = null;
            priv.title = null;
            priv.locale = null;
            priv.themeManifest.destroy();
            priv.themeManifest = null;
            delete this.themeName;
            delete this.toolTipTimerHandle;
            delete this.windows;
            delete this.globalComponentName;
            delete this.aceWrappers;
            delete this.lastActiveWindow;
            delete this.locales;
            delete this.loadedWindowsHTML;
            delete this.windowsClass;
            delete this.toolTip;
            delete this.showMainWindow;
            delete this.name;
            delete this.mainWindow;
            delete this.activeWindow;
            delete this.title;
            delete this.locale;
            delete this.themeManifest;
        }
        render() {
            //#region Variables déclaration
            const priv = internal(this);
            const themes = Core.themes;
            const wins = priv.windows;
            //#endregion Variables déclaration
            if (core.isCanvasRenderer) {
                themes[priv.themeManifest.themeName].initialized ? themes[priv.themeManifest.themeName].initialize() : 1;
            }
            wins.forEach(win => {
                !win.creating && win.visible ? win.render() : 1;
            });
        }
        //#endregion
    }
    return Application;
})();
core.classes.register(core.types.CATEGORIES.COMMON, Application);
//#endregion
//#region Templates
const ToolTipTpl = "<jagui-tooltip class='Control ToolTip {theme}'>{text}</jagui-tooltip>";
core.classes.registerTemplates([
    { Class: 'ToolTip', template: ToolTipTpl }
]);
//#endregion Templates
export { Application };
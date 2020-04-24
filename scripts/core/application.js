//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Tools } from '/scripts/core/tools.js';
//import { Uri } from '/scripts/core/uri.js';
//import { Xhr } from '/scripts/core/xhr.js';
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
    class Application extends BaseClass {
        /**
         * Create a new instance of Application.
         * @param {String}      appName     Name of the Application.
         */
        constructor(appName) {
            super(appName);
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
            priv.themeManifest = new Core.classes.ThemeManifest(this);
            priv.themeManifest.lastThemeName = Core.defaultTheme;
            //Tools.scripts.push(Tools.getPath(Types.INTERNALCATEGORIES.COMPONENTS) + "controls");
            Core.apps.applications[appName] = this;
            Core.apps.activeApplication = this;
        }
        //#region getters/Setters
        //#region Private properties
        get themeName() {
            return internal(this).themeManifest.themeName;
        }
        get toolTipTimerHandle() {
            return internal(this).toolTipTimerHandle;
        }
        set toolTipTimerHandle(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.toolTipTimerHandle !== newValue) {
                    priv.toolTipTimerHandle = newValue;
                }
            }
        }
        /**
         * Get the windows property
         */
        get windows() {
            return internal(this).windows;
        }
        get globalComponentName() {
            return internal(this).globalComponentName;
        }
        get aceWrappers() {
            return internal(this).aceWrappers;
        }
        get lastActiveWindow() {
            return internal(this).lastActiveWindow;
        }
        /**
         * Get the locales property
         */
        get locales() {
            return internal(this).locales;
        }
        get loadedWindowsHTML() {
            return internal(this).loadedWindowsHTML;
        }
        set loadedWindowsHTML(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.loadedWindowsHTML !== newValue) {
                    priv.loadedWindowsHTML = newValue;
                }
            }
        }
        /**
         * Get the windowsClass property
         */
        get windowsClass() {
            return internal(this).windowsClass;
        }
        /**
         * Get the toolTip property
         */
        get toolTip() {
            return internal(this).toolTip;
        }
        /**
         * Get the showMainWindow property
         */
        get showMainWindow() {
            return internal(this).showMainWindow;
        }
        /**
         * Get the name property
         */
        get name() {
            return internal(this).name;
        }
        /**
         * Get the mainWindow property
         */
        get mainWindow() {
            return internal(this).mainWindow;
        }
        set mainWindow(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Window) {
                if (priv.mainWindow !== newValue) {
                    priv.mainWindow = newValue;
                }
            }
        }
        /**
         * Get the activeWindow property
         */
        get activeWindow() {
            return internal(this).activeWindow;
        }
        set activeWindow(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Window) {
                if (priv.activeWindow !== newValue) {
                    priv.activeWindow = newValue;
                    if (Core.isCanvasRenderer) {
                        Core.canvas.needRedraw = !0;
                    }
                }
            }
        }
        /**
         * Get the title property
         */
        get title() {
            return internal(this).title;
        }
        /**
         * Set the title property
         */
        set title(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                priv.title = newValue;
            }
        }
        /**
         * Get the locale property
         */
        get locale() {
            return internal(this).locale;
        }
        /**
         * Set the locale of the application
         */
        set locale(locale) {
            //#region Variables déclaration
            const priv = internal(this);
            let comps = null;
            const windows = priv.windows;
            //#endregion Variables déclaration
            if (priv.locales[locale]) {
                if (priv.locale !== locale) {
                    priv.locale = locale;
                    windows.forEach(win => {
                        if (win.visible) {
                            comps = priv.activeWindow.controls.filter(e => {
                                return e instanceof Core.classes.Control && e.autoTranslate && e.visible;
                            });
                            comps.forEach(comp => {
                                if (comp instanceof Core.classes.CaptionControl || comp instanceof Core.classes.CustomTextControl) {
                                    this.getLocalText(comp);
                                    //} else {
                                    //comp.update();
                                }
                            });
                        }
                    });
                }
            }
        }
        /**
         * Get the themeManifest property
         */
        get themeManifest() {
            return internal(this).themeManifest;
        }
        /**
         * Get the themeManifest property
         */
        set themeManifest(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.Classes.ThemeManifest) {
                priv.themeManifest = newValue;
            }
        }
        //#endregion
        /**
         * Get a window by this name
         * @return  {Object}    return a window
         */
        getWindow(windowName) {
            const windows = priv.windows.filter((e) => {
                return e.name === windowName;
            });
            if (!windows.isEmpty) {
                return windows.first;
            } else {
                return null;
            }
        }
        //#endregion
        //#region Methods
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
                if (idx > -1) {
                    a[idx] = null;
                }
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
            //#endregion Variables déclaration
            windows.forEach((window) => {
                window.destroyOnHide = !0;
                window.hide();
                window.removeToHTML();
            });
            if (Core.apps.activeApplication === this) {
                Core.apps.activeApplication = null;
            }
            Core.apps.applications[priv.name] = null;
            delete Core.apps.applications[priv.name];
            const icon = Convert.nodeListToArray(document.getElementsByName(`ShortCutIcon_${priv.name}`)).first;
            if (icon) {
                icon.classList.toggle('hidden');
            }
            this.destroy();
        }
        /**
         * Load the HTML of all windows
         */
        loadWindowsHTML() {
            //#region Variables déclaration
            const window = document.querySelector('object.mainWindow');
            //#endregion Variables déclaration
            if (window) {
                const template = window.contentDocument.body.querySelector('template').innerHTML;
                const div = document.createElement(Types.HTMLELEMENTS.DIV);
                const dx = Text.replace(template, '{theme}', Core.apps.activeApplication.themeManifest.themeName);
                div.innerHTML = dx;
                if (Core.isHTMLRenderer) {
                    div.firstElementChild.classList.add('hidden');
                    if (!Tools.HTMLParentElement) {
                        document.body.appendChild(div.firstElementChild);
                    } else {
                        Tools.HTMLParentElement.appendChild(div.firstElementChild);
                    }
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
            //#endregion Variables déclaration
            switch (Core.renderer) {
                case Types.RENDERERS.HTML:
                    wins = document.querySelectorAll(`jagui-window.${priv.name}`);
                    wins.forEach(win => {
                        let props = {};
                        const properties = win.querySelector('properties');
                        if (properties) {
                            props = JSON.parse(properties.innerText);
                        }
                        form = this.createForm(win.id, win.dataset.class, props);
                        this.windows.push(form);
                        if (win.style.display !== 'none') {
                            if (!priv.mainWindow) {
                                if (form instanceof Core.classes.Window) {
                                    priv.mainWindow = priv.activeWindow = form;
                                }
                            } else {
                                form.show();
                            }
                        }
                    });
                    break;
                case Types.RENDERERS.SVG:
                    break;
                case Types.RENDERERS.CANVAS:
                    data = document.querySelector('object.mainWindow');
                    if (data) {
                        data = JSON.parse(data.innerHTML.replace(/{theme}/g, Core.defaultTheme));
                        if (data.themes) {
                            priv.themeManifest.addThemes(data.themes);
                        }
                        wins = data.windows;
                        wins.forEach(win => {
                            form = this.createForm(win.childs, win.className, win.properties);
                            priv.windows.push(form);
                            if (form.name === data.mainForm) {
                                priv.mainWindow = priv.activeWindow = form;
                            } else {
                                form.show();
                            }
                        });
                    }
                    break;
            }
            priv.mainWindow.show();
            data = document.getElementById('loading_msg');
            if (data) {
                document.body.removeChild(data);
            }
            //data = null;
            this.createToolTip();
            window.activeApp = this;
        }
        /**
         * Create a form
         */
        createForm(id, instanceClass, props) {
            Core.windowZIndex++;
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
            //#endregion Variables déclaration
            if (!priv.locale) {
                priv.locale = Core.currentLocale;
            }
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
            if (Core.isHTMLRenderer) {
                const wins = document.querySelectorAll('object.window');
                wins.forEach(win => {
                    const content = win.contentDocument ? win.contentDocument.body.innerHTML.trim() : win.firstChild.nodeValue.trim();
                    if (content === String.EMPTY) {
                        win.addEventListener('load', () => {
                            Core.apps.activeApplication.addWindow(wins.length);
                        });
                    } else {
                        Core.apps.activeApplication.addWindow(wins.length);
                    }
                });
            }
        }
        addWindow(maxWins) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.loadedWindowsHTML++;
            if (priv.loadedWindowsHTML === maxWins) {
                this.loadWindowsHTML();
            }
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
            //#endregion Variables déclaration
            if (obj instanceof Core.classes.CaptionControl) {
                const c = priv.locales[priv.locale];
                if (c) {
                    const key = `${obj.form.name}.${obj.name}`;
                    if (c[key]) {
                        if (obj instanceof Core.classes.CaptionControl) {
                            obj.caption = c[key];
                        } else if (obj instanceof Core.classes.CustomTextControl) {
                            obj.placeHolder = c[key];
                        }
                    }
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
            const wrapper = document.createElement(Types.HTMLELEMENTS.DIV);
            let tpl = Core.templates.ToolTip;
            let a = tpl.split('{theme}');
            //#endregion Variables déclaration
            tpl = a.join(priv.mainWindow.themeName);
            a = tpl.split('{text}');
            tpl = a.join(String.EMPTY);
            wrapper.innerHTML = tpl;
            document.body.appendChild(wrapper.firstElementChild);
            priv.toolTip = document.body.lastElementChild;
            priv.toolTip.style.zIndex = Types.CONSTANTS.STAYONTOP + 1;
            Events.bind(priv.toolTip, Mouse.MOUSEEVENTS.MOVE, () => {
                Core.apps.activeApplication.hideToolTip();
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
            //#endregion Variables déclaration
            this.hideToolTip();
            if (!obj.showToolTip && !obj.ownerShowToolTip) {
                exit = !0;
            }
            if (Core.classes.CustomTextControl && obj instanceof Core.classes.CustomTextControl) {
                if (!obj.hasError) {
                    exit = !0;
                }
            }
            if (!exit) {
                if (obj.toolTip !== String.EMPTY) {
                    text = obj.toolTip;
                } else if (obj.ownerShowToolTip) {
                    if (obj.owner.toolTip !== String.EMPTY) {
                        text = obj.owner.toolTip;
                    }
                }
                if (Core.classes.CustomTextControl && obj instanceof Core.classes.CustomTextControl) {
                    if (obj.hasError) {
                        text = obj.errorMsg;
                    }
                }
                if (!text) {
                    return;
                }
                if (typeof text !== Types.CONSTANTS.STRING) {
                    return;
                }
                if (text !== String.EMPTY && priv.toolTip) {
                    priv.toolTip.innerHTML = text;
                    setTimeout(() => {
                        if (Core.apps.activeApplication.toolTip) {
                            Core.apps.activeApplication.toolTip.classList.toggle('fade');
                        }
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
            const cssUnits = Types.CSSUNITS;
            const tt = priv.toolTip;
            let tx = coord.x;
            let ty = coord.y;
            //#endregion Variables déclaration
            if (!useOffset) {
                useOffset = !0;
            }
            if (tx + tt.offsetWidth > document.body.offsetWidth) {
                tx = document.body.offsetWidth - tt.offsetWidth;
            }
            if (useOffset) {
                ty += 20;
            }
            if (ty + tt.offsetHeight > document.body.offsetHeight) {
                ty = coord.y - tt.offsetHeight;
            }
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
                Core.apps.activeApplication.hideToolTip();
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
            //this._toolTipTimerHandle = null;
            priv.windows.destroy();
            //this._windows = null;
            //this._windowsClass = null;
            priv.globalComponentName.destroy();
            //this._globalComponentName = null;
            //this._lastThemeName = null;
            //this._themeName = null;
            //this._toolTip = null;
            //this._showMainWindow = null;
            //this._name = null;
            //this._mainWindow = null;
            //this._activeWindow = null;
            //this._title = String.null;
            priv.lastActiveWindow.destroy();
            //this._lastActiveWindow = null;
            //this._locale = null;
            //this._locales = null;
        }
        render() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Core.isCanvasRenderer) {
                if (!Core.themes[priv.themeManifest.themeName].initialized) {
                    Core.themes[priv.themeManifest.themeName].initialize();
                }
            }
            const wins = priv.windows;
            wins.forEach(win => {
                if (!win.creating && win.visible) {
                    win.render();
                }
            });
        }
        //#endregion
    }
    return Application;
})();
Object.defineProperties(Application, {
    'toolTip': {
        enumerable: !0
    },
    'showMainWindow': {
        enumerable: !0
    },
    'name': {
        enumerable: !0
    },
    'locale': {
        enumerable: !0
    },
    'themeManifest': {
        enumerable: !0
    }
});
Core.classes.register(Types.CATEGORIES.COMMON, Application);
//#endregion
//#region Templates
const ToolTipTpl = "<jagui-tooltip class='Control ToolTip {theme}'>{text}</jagui-tooltip>";
Core.classes.registerTemplates([
    { Class: 'ToolTip', template: ToolTipTpl }
]);
//#endregion Templates
export { Application };
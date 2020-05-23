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
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    class Application {
        /**
         * Create a new instance of Application.
         * @param {String}      appName     Name of the Application.
         */
        constructor(appName) {
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
            //core.tools.scripts.push(core.tools.getPath(core.types.INTERNALCATEGORIES.COMPONENTS) + "controls");
            core.apps.applications[appName] = this;
            core.apps.activeApplication = this;
        }
        //#region getters/Setters
        //#region themeName
        get themeName() {
            return internal(this).themeManifest.themeName;
        }
        //#endregion themeName
        //#region toolTipTimerHandle
        get toolTipTimerHandle() {
            return internal(this).toolTipTimerHandle;
        }
        set toolTipTimerHandle(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.toolTipTimerHandle !== newValue
                && (priv.toolTipTimerHandle = newValue);
        }
        //#endregion toolTipTimerHandle
        //#region windows
        get windows() {
            return internal(this).windows;
        }
        //#endregion windows
        //#region globalComponentName
        get globalComponentName() {
            return internal(this).globalComponentName;
        }
        //#endregion globalComponentName
        //#region aceWrappers
        get aceWrappers() {
            return internal(this).aceWrappers;
        }
        //#endregion aceWrappers
        //#region lastActiveWindow
        get lastActiveWindow() {
            return internal(this).lastActiveWindow;
        }
        //#endregion lastActiveWindow
        //#region locales
        get locales() {
            return internal(this).locales;
        }
        //#endregion locales
        //#region loadedWindowsHTML
        get loadedWindowsHTML() {
            return internal(this).loadedWindowsHTML;
        }
        set loadedWindowsHTML(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.core.tools.isNumber(newValue) && priv.loadedWindowsHTML !== newValue
                && (priv.loadedWindowsHTML = newValue);
        }
        //#endregion loadedWindowsHTML
        //#region windowsClass
        get windowsClass() {
            return internal(this).windowsClass;
        }
        //#endregion windowsClass
        //#region toolTip
        get toolTip() {
            return internal(this).toolTip;
        }
        //#endregion toolTip
        //#region showMainWindow
        get showMainWindow() {
            return internal(this).showMainWindow;
        }
        //#endregion showMainWindow
        //#region name
        get name() {
            return internal(this).name;
        }
        //#endregion name
        //#region mainWindow
        get mainWindow() {
            return internal(this).mainWindow;
        }
        set mainWindow(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof core.classes.Window && priv.mainWindow !== newValue
                && (priv.mainWindow = newValue);
        }
        //#endregion mainWindow
        //#region activeWindow
        get activeWindow() {
            return internal(this).activeWindow;
        }
        set activeWindow(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof core.classes.Window && priv.activeWindow !== newValue) {
                priv.activeWindow = newValue;
                core.isCanvasRenderer && (core.canvas.needRedraw = !0);
            }
        }
        //#endregion activeWindow
        //#region title
        get title() {
            return internal(this).title;
        }
        set title(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isString(newValue) && priv.title !== newValue
                && (priv.title = newValue);
        }
        //#endregion title
        //#region locale
        get locale() {
            return internal(this).locale;
        }
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
                                return e instanceof core.classes.Control && e.autoTranslate && e.visible;
                            });
                            comps.forEach(comp => {
                                (comp instanceof core.classes.CaptionControl
                                    || comp instanceof core.classes.CustomTextControl)
                                    && this.getLocalText(comp);
                            });
                        }
                    });
                }
            }
        }
        //#endregion locale
        //#region themeManifest
        get themeManifest() {
            return internal(this).themeManifest;
        }
        set themeManifest(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof core.Classes.ThemeManifest
                && (priv.themeManifest = newValue);
        }
        //#endregion themeManifest
        //#endregion Getters / Setters
        //#region Methods
        /**
         * Get a window by this name
         * @return  {Object}    return a window
         */
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
                idx > -1 && (a[idx] = null);
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
                    tab && (a[int(tab.first)] = object.name);
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
            core.apps.activeApplication === this && (core.apps.activeApplication = null);
            core.apps.applications[priv.name] = null;
            delete core.apps.applications[priv.name];
            const icon = Convert.nodeListToArray(document.getElementsByName(`ShortCutIcon_${priv.name}`)).first;
            icon && icon.classList.toggle('hidden');
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
                const div = document.createElement(core.types.HTMLELEMENTS.DIV);
                const dx = Text.replace(template, '{theme}', core.apps.activeApplication.themeManifest.themeName);
                div.innerHTML = dx;
                if (core.isHTMLRenderer) {
                    div.firstElementChild.classList.add('hidden');
                    !core.tools.HTMLParentElement
                        ? document.body.appendChild(div.firstElementChild)
                        : core.tools.HTMLParentElement.appendChild(div.firstElementChild);
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
            switch (core.renderer) {
                case core.types.RENDERERS.HTML:
                    wins = document.querySelectorAll(`jagui-window.${priv.name}`);
                    wins.forEach(win => {
                        let props = {};
                        const properties = win.querySelector('properties');
                        properties && (props = JSON.parse(properties.innerText));
                        form = this.createForm(win.id, win.dataset.class, props);
                        this.windows.push(form);
                        if (win.style.display !== 'none') {
                            if (!this.mainWindow) {
                                form instanceof core.classes.Window && (this.mainWindow = this.activeWindow = form);
                            } else {
                                form.show();
                            }
                        }
                    });
                    break;
                case core.types.RENDERERS.SVG:
                    break;
                case core.types.RENDERERS.CANVAS:
                    data = document.querySelector('object.mainWindow');
                    if (data) {
                        data = JSON.parse(data.innerHTML.replace(/{theme}/g, core.defaultTheme));
                        data.themes && priv.themeManifest.addThemes(data.themes);
                        wins = data.windows;
                        wins.forEach(win => {
                            form = this.createForm(win.childs, win.className, win.properties);
                            priv.windows.push(form);
                            form.name === data.mainForm
                                ? priv.mainWindow = priv.activeWindow = form
                                : form.show();
                        });
                    }
                    break;
            }
            priv.mainWindow.show();
            document.getElementById('loading_msg') && document.body.removeChild(data);
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
            //#endregion Variables déclaration
            !priv.locale && (priv.locale = core.currentLocale);
            //if (!createIcon) {
            //    createIcon = !1;
            //}
            //if (createIcon) {
            //    this.icon = core.classes.createComponent({
            //        class: ShortCutIcon,
            //        owner: this,
            //        name: `${this.constructor.name}_shortCut`,
            //        props: {
            //            "parentHTML": core.isHTMLRenderer ? document.body : null,
            //            toolTip: "Double click to launch"
            //        },
            //        withTpl: core.isHTMLRenderer
            //    });
            //    this.icon.onDblClick.addListener(function(sender) {
            //        core.apps.createApp(this.owner);
            //    });
            //}
            if (core.isHTMLRenderer) {
                const wins = document.querySelectorAll('object.window');
                wins.forEach(win => {
                    const content = win.contentDocument
                        ? win.contentDocument.body.innerHTML.trim()
                        : win.firstChild.nodeValue.trim();
                    String.isNullOrEmpty(content)
                        ? win.addEventListener('load', () => {
                            core.apps.activeApplication.addWindow(wins.length);
                        })
                        : core.apps.activeApplication.addWindow(wins.length);
                });
            }
        }
        addWindow(maxWins) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.loadedWindowsHTML++;
            priv.loadedWindowsHTML === maxWins && this.loadWindowsHTML();
        }
        //newWindow (windowPath, show, callBack) {
        //    var Tools = require("tools");
        //    var Uri = require("uri");
        //    // la fiche est déjà chargée
        //    var html_doc, style, windowClass;
        //    windowClass = core.tools.uri.extractFileName(windowPath);
        //    show = !show ? !0 : show;
        //    html_doc = document.getElementsByTagName("head")[0];
        //    style = document.createElement("link");
        //    style.setAttribute("rel", "stylesheet");
        //    style.setAttribute("href", core.tools.uri.base() + windowPath + ".css?rnd=" + new Date().getTime());
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
        //            var div = document.createElement(core.types.HTMLELEMENTS.DIV);
        //            dx = Text.replace(dx, "{theme}", core.apps.activeApplication.themeManifest.themeName);
        //            div.innerHTML = dx;
        //            document.body.appendChild(div.firstElementChild);
        //            var app = core.apps.activeApplication;
        //            var wins = document.querySelectorAll("[data-appname='" + app.name + "']"), form;//docment.documentElement.getElementsByClassName(app.name),form;
        //            for (var i = 0, l = wins.length; i < l; i++) {
        //                data = wins[i].dataset.class;
        //                if (data.toLowerCase() === Uri.split(windowPath, !0).toLowerCase()) {
        //                    form = app.createForm(wins[i].id, data);
        //                    if (show) {
        //                        if (form.showingMode === core.types.SHOWINGMODES.MODAL) form.showModal();
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
            const c = priv.locales[priv.locale];
            if (c) {
                const key = `${obj.form.name}.${obj.name}`;
                if (c[key]) {
                    if (obj instanceof core.classes.CaptionControl) {
                        obj.caption = c[key];
                    } else if (obj instanceof core.classes.CustomTextControl) {
                        obj.placeHolder = c[key];
                    }
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
            const wrapper = document.createElement(core.types.HTMLELEMENTS.DIV);
            let tpl = core.templates.ToolTip;
            let a = tpl.split('{theme}');
            //#endregion Variables déclaration
            tpl = a.join(priv.mainWindow.themeName);
            a = tpl.split('{text}');
            tpl = a.join(String.EMPTY);
            wrapper.innerHTML = tpl;
            document.body.appendChild(wrapper.firstElementChild);
            priv.toolTip = document.body.lastElementChild;
            priv.toolTip.style.zIndex = core.types.CONSTANTS.STAYONTOP + 1;
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
            //#endregion Variables déclaration
            this.hideToolTip();
            !obj.showToolTip && !obj.ownerShowToolTip && (exit = !0);
            if (core.classes.CustomTextControl && obj instanceof core.classes.CustomTextControl) {
                !obj.hasError && (exit = !0);
            }
            if (!exit) {
                if (!String.isNullOrEmpty(obj.toolTip)) {
                    text = obj.toolTip;
                } else if (obj.ownerShowToolTip) {
                    !String.isNullOrEmpty(obj.owner.toolTip) && (text = obj.owner.toolTip);
                }
                if (core.classes.CustomTextControl && obj instanceof core.classes.CustomTextControl) {
                    obj.hasError && (text = obj.errorMsg);
                }
                if (!text) {
                    return;
                }
                if (typeof text !== core.types.CONSTANTS.STRING) {
                    return;
                }
                if (!String.isNullOrEmpty(text) && priv.toolTip) {
                    priv.toolTip.innerHTML = text;
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
            !useOffset && (useOffset = !0);
            tx + tt.offsetWidth > document.body.offsetWidth && (tx = document.body.offsetWidth - tt.offsetWidth);
            useOffset && (ty += 20);
            ty + tt.offsetHeight > document.body.offsetHeight && (ty = coord.y - tt.offsetHeight);
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
            core.isCanvasRenderer && !core.themes[priv.themeManifest.themeName].initialized
                && core.themes[priv.themeManifest.themeName].initialize();
            const wins = priv.windows;
            wins.forEach(win => {
                !win.creating && win.visible && win.render();
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
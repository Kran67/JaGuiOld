//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
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
 */
class Application extends BaseClass {
    /**
     * Create a new instance of Application.
     * @param {String}      appName     Name of the Application.
     */
    constructor(appName) {
        super({ name: appName});
        core.setPrivate(this, 'toolTipTimerHandle', null);
        core.setPrivate(this, 'windows', []);
        core.setPrivate(this, 'globalComponentName', []);
        core.setPrivate(this, 'aceWrappers', []);
        core.setPrivate(this, 'lastActiveWindow', []);
        core.setPrivate(this, 'locales', {});
        core.setPrivate(this, 'loadedWindowsHTML', 0);
        core.setPrivate(this, 'windowsClass', {});
        core.setPrivate(this, 'toolTip', null);
        core.setPrivate(this, 'showMainWindow', !0);
        //core.setPrivate(this, 'name', appName);
        core.setPrivate(this, 'mainWindow', null);
        core.setPrivate(this, 'activeWindow', null);
        core.setPrivate(this, 'title', String.EMPTY);
        core.setPrivate(this, 'locale', null);
        core.setPrivate(this, 'themeManifest', new core.classes.ThemeManifest(this));
        core.getPrivate(this, 'themeManifest').lastThemeName = core.defaultTheme;
        //core.tools.scripts.push(core.tools.getPath(core.types.INTERNALCATEGORIES.COMPONENTS) + "controls");
        core.apps.applications[appName] = this;
        core.apps.activeApplication = this;
    }
    //#region getters/Setters
    //#region themeName
    get themeName() {
        return core.getPrivate(this, 'themeManifest').themeName;
    }
    //#endregion themeName
    //#region toolTipTimerHandle
    get toolTipTimerHandle() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set toolTipTimerHandle(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && core.getPrivate(this, propName) !== newValue
            && core.setPrivate(this, propName, newValue);
    }
    //#endregion toolTipTimerHandle
    //#region windows
    get windows() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    //#endregion windows
    //#region globalComponentName
    get globalComponentName() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    //#endregion globalComponentName
    //#region aceWrappers
    //get aceWrappers() {
    //    return internal(this).aceWrappers;
    //}
    //#endregion aceWrappers
    //#region lastActiveWindow
    get lastActiveWindow() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    //#endregion lastActiveWindow
    //#region locales
    get locales() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    //#endregion locales
    //#region loadedWindowsHTML
    get loadedWindowsHTML() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set loadedWindowsHTML(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.core.tools.isNumber(newValue) && core.getPrivate(this, propName) !== newValue
            && core.setPrivate(this, propName, newValue);
    }
    //#endregion loadedWindowsHTML
    //#region windowsClass
    get windowsClass() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    //#endregion windowsClass
    //#region toolTip
    get toolTip() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    //#endregion toolTip
    //#region showMainWindow
    get showMainWindow() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    //#endregion showMainWindow
    //#region name
    //get name() {
    //    return core.getPrivate(this, 'name');
    //}
    //#endregion name
    //#region mainWindow
    get mainWindow() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set mainWindow(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        newValue instanceof core.classes.Window && core.getPrivate(this, propName) !== newValue
            && core.setPrivate(this, propName, newValue);
    }
    //#endregion mainWindow
    //#region activeWindow
    get activeWindow() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set activeWindow(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Window && core.getPrivate(this, propName) !== newValue) {
            core.setPrivate(this, propName, newValue);
            core.isCanvasRenderer && (core.canvas.needRedraw = !0);
        }
    }
    //#endregion activeWindow
    //#region title
    get title() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set title(newValue) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isString(newValue) && core.getPrivate(this, propName) !== newValue
            && core.setPrivate(this, propName, newValue);
    }
    //#endregion title
    //#region locale
    get locale() {
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set locale(locale) {
        //#region Variables déclaration
        const propName = core.tools.getPropertyName();
        let comps = null;
        const windows = core.getPrivate(this, 'windows');
        //#endregion Variables déclaration
        if (core.getPrivate(this, 'locales')[locale]) {
            if (core.getPrivate(this, propName) !== locale) {
                core.setPrivate(this, propName, locale);
                windows.forEach(win => {
                    if (win.visible) {
                        comps = core.getPrivate(this, 'activeWindow').controls.filter(e => {
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
        return core.getPrivate(this, core.tools.getPropertyName());
    }
    set themeManifest(newValue) {
        newValue instanceof core.Classes.ThemeManifest
            && core.setPrivate(this, core.tools.getPropertyName(), newValue);
    }
    //#endregion themeManifest
    //#endregion Getters / Setters
    //#region Methods
    /**
     * Get a window by this name
     * @return  {Object}    return a window
     */
    getWindow(windowName) {
        const windows = core.getPrivate(this, 'windows').filter((e) => {
            return e.name === windowName;
        });
        return !windows.isEmpty ? windows.first : null;
    }
    /**
     * Check if the new component name is unique
     */
    isUniqueGlobalComponentName(name) {
        return core.getPrivate(this, 'globalComponentName').indexOf(name) === -1;
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
        const name = core.getPrivate(this, 'name');
        //#endregion Variables déclaration
        windows.forEach((window) => {
            window.destroyOnHide = !0;
            window.hide();
            window.removeToHTML();
        });
        core.apps.activeApplication === this && (core.apps.activeApplication = null);
        core.apps.applications[name] = null;
        delete core.apps.applications[name];
        const icon = Convert.nodeListToArray(document.getElementsByName(`ShortCutIcon_${name}`)).first;
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
        let data = null;
        let form = null;
        let wins = null;
        //#endregion Variables déclaration
        switch (core.renderer) {
            case core.types.RENDERERS.HTML:
                wins = document.querySelectorAll(`jagui-window.${core.getPrivate(this, 'name')}`);
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
                    data.themes && core.getPrivate(this, 'themeManifest').addThemes(data.themes);
                    wins = data.windows;
                    wins.forEach(win => {
                        form = this.createForm(win.childs, win.className, win.properties);
                        core.getPrivate(this, 'windows').push(form);
                        form.name === data.mainForm
                            ? core.setPrivate(this, ['mainWindow', 'activeWindow'], form)
                            : form.show();
                    });
                }
                break;
        }
        core.getPrivate(this, 'mainWindow').show();
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
        !core.getPrivate(this, 'locale') && core.setPrivate(this, 'locale', core.currentLocale);
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
        let loadedWindowsHTML = core.getPrivate(this, 'loadedWindowsHTML');
        core.setPrivate(this, 'loadedWindowsHTML', loadedWindowsHTML++);
        loadedWindowsHTML === maxWins && this.loadWindowsHTML();
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
        const c = { ...core.getPrivate(this, 'locales')[core.getPrivate(this, 'locale')], ...core.tools.getDefaultLocale() };
        //#endregion Variables déclaration
        if (c) {
            let key = `${obj.form.name}.${obj.name}`;
            if (!String.isNullOrEmpty(obj.translationKey)) {
                if (obj.translationKey.includes('.')) {
                    const keys = obj.translationKey.split('.');
                    keys.forEach((k, i) => {
                        c[k] && i === 0 && (key = c[k]);
                        key[k] && i > 0 && (key = key[k]);
                    });
                }
            } else {
                key = c[key];
            }
            if (key) {
                if (obj instanceof core.classes.CaptionControl) {
                    obj.caption = key;
                } else if (obj instanceof core.classes.CustomTextControl) {
                    obj.placeHolder = key;
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
        const wrapper = document.createElement(core.types.HTMLELEMENTS.DIV);
        let tpl = core.templates.ToolTip;
        let a = tpl.split('{theme}');
        //#endregion Variables déclaration
        tpl = a.join(core.getPrivate(this, 'mainWindow').themeName);
        a = tpl.split('{text}');
        tpl = a.join(String.EMPTY);
        wrapper.innerHTML = tpl;
        document.body.appendChild(wrapper.firstElementChild);
        document.body.lastElementChild.style.zIndex = core.types.CONSTANTS.STAYONTOP + 1;
        Events.bind(document.body.lastElementChild, Mouse.MOUSEEVENTS.MOVE, () => {
            core.apps.activeApplication.hideToolTip();
        });
        core.setPrivate(this, 'toolTip', document.body.lastElementChild);
    }
    /**
     * Show the tooltip of a component
     */
    showToolTip(obj, coord, useOffset) {
        //#region Variables déclaration
        let text = String.EMPTY;
        let exit = !1;
        //#endregion Variables déclaration
        this.hideToolTip();
        !obj.showToolTip && !obj.ownerShowToolTip && (exit = !0);
        //if (core.classes.CustomTextControl && obj instanceof core.classes.CustomTextControl) {
        //    !obj.hasError && (exit = !0);
        //}
        if (!exit) {
            if (!String.isNullOrEmpty(obj.toolTip)) {
                text = obj.toolTip;
            } else if (obj.ownerShowToolTip) {
                !String.isNullOrEmpty(obj.owner.toolTip) && (text = obj.owner.toolTip);
            }
            if (core.classes.CustomTextControl && obj instanceof core.classes.CustomTextControl) {
                obj.hasError && (text = obj.errorMsg);
            }
            if (!text || typeof text !== core.types.CONSTANTS.STRING) {
                return;
            }
            if (!String.isNullOrEmpty(text) && core.getPrivate(this, 'toolTip')) {
                core.getPrivate(this, 'toolTip').innerHTML = text;
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
        const cssUnits = core.types.CSSUNITS;
        const tt = core.getPrivate(this, 'toolTip');
        let tx = coord.x;
        let ty = coord.y;
        //#endregion Variables déclaration
        !useOffset && (useOffset = !0);
        tx + tt.offsetWidth > document.body.offsetWidth && (tx = document.body.offsetWidth - tt.offsetWidth);
        useOffset && (ty += 20);
        ty + tt.offsetHeight > document.body.offsetHeight && (ty = coord.y - tt.offsetHeight);
        tt.style.transform = `translate(${tx}${cssUnits.PX},${ty}${cssUnits.PX})`;
        tt.classList.add('fade');
        clearTimeout(core.getPrivate(this, 'toolTipTimerHandle'));
    }
    /**
     * Prepare hiding the tooltip
     */
    closeToolTip() {
        clearTimeout(core.getPrivate(this, 'toolTipTimerHandle'));
        core.setPrivate(this, 'toolTipTimerHandle', setTimeout(() => {
            core.apps.activeApplication.hideToolTip();
        }, 4000));
    }
    /**
     * Hide the tooltip
     */
    hideToolTip() {
        if (core.getPrivate(this, 'toolTip')) {
            core.getPrivate(this, 'toolTip').classList.remove('fade');
            clearTimeout(core.getPrivate(this, 'toolTipTimerHandle'));
        }
    }
    /**
     * Destroy the tooltip
     */
    destroyToolTip() {
        //#region Variables déclaration
        const toolTip = core.getPrivate(this, 'toolTip');
        //#endregion Variables déclaration
        if (toolTip) {
            clearTimeout(core.getPrivate(this, 'toolTipTimerHandle'));
            Events.unBind(toolTip, Mouse.MOUSEEVENTS.MOVE, core.getPrivate(this, 'hideToolTip'));
            document.body.removeChild(toolTip);
            core.setPrivate(this, 'toolTip', null);
        }
    }
    /**
     * Close all popups
     */
    closeAllPopups() {
        core.getPrivate(this, 'windows').forEach(win => {
            win.closePopups();
        });
    }
    /**
     * Destroy all properties of the instance
     * @override
     */
    destroy() {
        //#region Variables déclaration
        //#endregion Variables déclaration
        //this._toolTipTimerHandle = null;
        core.getPrivate(this, 'windows').destroy();
        //this._windows = null;
        //this._windowsClass = null;
        core.getPrivate(this, 'globalComponentName').destroy();
        //this._globalComponentName = null;
        //this._lastThemeName = null;
        //this._themeName = null;
        //this._toolTip = null;
        //this._showMainWindow = null;
        //this._name = null;
        //this._mainWindow = null;
        //this._activeWindow = null;
        //this._title = String.null;
        core.getPrivate(this, 'lastActiveWindow').destroy();
        //this._lastActiveWindow = null;
        //this._locale = null;
        //this._locales = null;
    }
    render() {
        const themeManifest = core.getPrivate(this, 'themeManifest');
        core.isCanvasRenderer && !core.themes[themeManifest.themeName].initialized
            && core.themes[themeManifest.themeName].initialize();
        const wins = core.getPrivate(this, 'windows');
        wins.forEach(win => {
            !win.creating && win.visible && win.render();
        });
    }
    //#endregion
}
core.classes.register(core.types.CATEGORIES.COMMON, Application);
//#endregion
//#region Templates
const ToolTipTpl = "<jagui-tooltip class='Control ToolTip {theme}'>{text}</jagui-tooltip>";
core.classes.registerTemplates([
    { Class: 'ToolTip', template: ToolTipTpl }
]);
//#endregion Templates
export { Application };
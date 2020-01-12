define(['require', 'core', 'geometry'], function (require, Core, Geometry) {
    //#region Bindable
    var Bindable = Core.Class.extend("Bindable", {
        init: function () {
            //#region Private properties
            this._dataBindings = [];
            //#endregion
            //$j.tools.Debugger.log(arguments,this,t);
        },
        //#region Methods
        addBindableProperties: function (propNames) {
            var Core = require("core");
            var Types = require("types");
            var i, l;
            if (!Array.isArray(propNames)) return;
            l = propNames.length;
            for (i = 0; i < l; i++) {
                if (Core.bindableProperties.indexOf(propNames[i]) === -1)
                {
                    Core.bindableProperties.push(propNames[i]);
                    Types.bindableProperties[propNames[i].toUpperCase()] = propNames[i];
                }
            }
        },
        removeBindableProperties: function (propNames) {
            var Core = require("core");
            var Types = require("types");
            var i, l;
            if (!Array.isArray(propNames)) return;
            l = propNames.length;
            for (i = 0; i < l; i++) {
                if (Core.bindableProperties.indexOf(propNames[i]) > -1) {
                    Core.bindableProperties.remove(propNames[i]);
                    delete Types.bindableProperties[propNames[i].toUpperCase()];
                    //$j.types.bindableProperties[propNames[i].toUpperCase()]=propNames[i];
                }
            }
        },
        propertyChanged: function (propName) {
            //var t=new Date().getTime();
            //var infos,value;
            //if($j.classes.Control === null) return;
            //if($j.bindableProperties.indexOf(propName) === -1) return;
            //if(this instanceof $j.classes.Bindable) {
            //  for(var i=0,l=this.dataBindings.length;i<l;i++) {
            //    infos=this.dataBindings[i].split(",");
            //    if(this.form[infos[1]]) {
            //      if(!infos[0].contains(".")) {
            //        value=this[infos[0]];
            //        if(typeof this.form[infos[1]][infos[2]]==="string") value=value.toString();
            //        infos[2]=infos[2].firstCharUpper();
            //        //if (typeof this.form[infos[1]]["set"+infos[2]]===Types.CONSTANTS.FUNCTION) this.form[infos[1]]["set"+infos[2]](value);
            //        this.form[infos[1]][infos[2]]=value;
            //      } else {
            //      }
            //    }
            //  }
            //}
            //$j.tools.Debugger.log(arguments,this,t);
        },
        addDataBinding: function (propertyToBind, objectName, objectProperty) {
            //var t=new Date().getTime();
            //this.dataBindings.push(propertyToBind+","+objectName+","+objectProperty);
            //var prop=objectProperty.firstCharUpper(),value=this[propertyToBind];
            //if(typeof this.form[objectName][objectProperty]==="string") value=value.toString();
            //this.form[objectName]["set"+prop](value);
            //this.form[objectName][prop]=value;
            //$j.tools.Debugger.log(arguments,this,t);
        },
        removeDataBinding: function (propertyToBind, objectName) {
            //var t=new Date().getTime();
            //if(this.dataBindings[propertyToBind]) {
            //  if(this.dataBindings[propertyToBind][objectName]) this.dataBindings[propertyToBind][objectName]=null;
            //}
            //$j.tools.Debugger.log(arguments,this,t);
        },
        clearDataBinding: function () {
    
        },
        destroy: function () {
            this._dataBindings.destroy();
            //this._dataBindings=null;
        }
        //#endregion
    });
    //#endregion
    //#region ThemeManifest
    var ThemeManifest = Core.Class.extend("ThemeManifest", {
        init: function (owner) {
            //#region Private properties
            this._themes = [];
            this._lastThemeName = "carbon";
            this._owner = owner;
            //#endregion
            this.themeName = Core.defaultTheme;
        },
        //#region Setters
        setThemeName: function (newValue) {
            if (typeof newValue !== Types.CONSTANTS.STRING) return;
            if (newValue !== this.themeName)
            {
                var CSS = require("css");
                CSS.addClass(Core.doc.body, "changingTheme");
                this._lastThemeName = this.themeName;
                this.themeName = newValue.toLowerCase();
                setTimeout(this.changeTheme.bind(this), 1000);
            }
        },
        //#endregion
        //#region Methods
        changeTheme: function () {
            var i, j, l, l1, style;
            var Tools = require("tools");
            var CSS = require("css");
            if (!Core.themes[this.themeName]) Tools.loadTheme(this.themeName);
            for (i = 0, l = this._owner._windows.length; i < l; i++) {
                this.changeWindowTheme(this._owner._windows[i]);
            }
            CSS.removeClass(Core.doc.body, this._lastThemeName);
            CSS.addClass(Core.doc.body, this.themeName);
            CSS.removeClass(this._owner.toolTip, this._lastThemeName);
            CSS.addClass(this._owner.toolTip, this.themeName);
            CSS.removeClass(Core.doc.body, "changingTheme");
        },
        changeWindowTheme: function (window) {
            var ctrls = [];
            var CSS = require("css");
            CSS.removeClass(window._HTMLElement, this._lastThemeName);
            //window._HTMLElement.dataset.theme = this.themeName;
            CSS.addClass(window._HTMLElement, this.themeName);
            ctrls = window._HTMLElement.querySelectorAll("." + this._lastThemeName);
            for (j = 0, l1 = ctrls.length; j < l1; j++) {
                CSS.removeClass(ctrls[j], this._lastThemeName);
                //ctrls[j].dataset.theme = this.themeName;
                CSS.addClass(ctrls[j], this.themeName);
                if (ctrls[j].jsObj) {
                    if (ctrls[j].jsObj.themeName) {
                        if (ctrls[j].jsObj.themeName !== this.themeName) {
                            ctrls[j].jsObj.themeName = this.themeName;
                        }
                    }
                }
            }
            window.themeName = this.themeName;
            //window.resizeContent();
            window.onThemeChanged.invoke();
        },
        loadComponentTheme: function (component) {
            var Tools = require("tools");
            var Types = require("types");
            for (var i = 0, l = this._themes.length; i < l; i++) {
                Tools.loadCssFile(Tools.getPath(Types.CATEGORIES.THEMESCSSCOMPONENTS) + this._themes[i] + "/" + component);
            }
        },
        addTheme: function (themeName) {
            if (typeof themeName !== Types.CONSTANTS.STRING) return;
            if (this._themes.indexOf(themeName) === -1) this._themes.push(themeName);
        },
        deleteTheme: function (themeName) {
            if (typeof themeName !== Types.CONSTANTS.STRING) return;
            if (this._themes.indexOf(themeName) > -1) {
                this._themes.delete(themeName);
            }
        },
        destroy: function () {
            this._themes.clear();
        }
        //#endregion
    });
    //#endregion
    //#region Application
    var Application = Core.Class.extend("Application", {
        init: function (appName) {
            var Tools = require("tools");
            var Types = require("types");
            var Classes = require("classes");
            //#region Private properties
            this._toolTipTimerHandle = null;
            this._windows = [];
            this._globalComponentName = [];
            this._aceWrappers = [];
            this._lastActiveWindow = [];
            this._locales = {};
            this._loadedWindowsHTML = 0;
            //#endregion
            this.windowsClass = {};
            this.toolTip = null;
            this.showMainWindow = true;
            Tools.scripts.push(Tools.getPath(Types.INTERNALCATEGORIES.COMPONENTS) + "controls");
            this.name = appName;
            this.mainWindow = null;
            this.activeWindow = null;
            this.title = String.EMPTY;
            this.locale = null;
            this.themeManifest = Classes.ThemeManifest(this);
            this.themeManifest._lastThemeName = Core.defaultTheme;
            Core.apps.applications[this.name] = this;
            Core.apps.activeApplication = this;
        },
        //#region getters/Setters
        getWindow: function (windowName) {
            var windows = this._windows.filter(function (e, i, a) {
                return e.name === windowName;
            });
            if (!windows.isEmpty()) {
                return windows.first();
            } else return null;
        },
        //#endregion
        //#region Methods
        isUniqueGlobalComponentName: function (name) {
            return this._globalComponentName.indexOf(name) === -1;
        },
        uniqueName: function (object) {
            var _class = object._ClassName, idx, a;
            if (!this['_' + _class + 's']) {
                this['_' + _class + 's'] = {};
                this['_' + _class + 's'].names = [''];
            }
            a = this['_' + _class + 's'].names;
            for (idx = 1; idx < a.length; idx++) {
                if (!a[idx]) break;
            }
            return _class + idx;
        },
        removeName: function (object) {
            var _class = object._ClassName, a, idx;
            if (this["_" + _class + "s"]) {
                a = this["_" + _class + "s"].names;
                idx = a.indexOf(object.name);
                if (idx > -1) a[idx] = null;
            }
        },
        addName: function (object) {
            var _class = object._ClassName, a, idx;
            if (this['_' + _class + 's']) {
                a = this['_' + _class + 's'].names;
                idx = a.indexOf(object.name);
                if (idx === -1) {
                    var tab = object.name.match(/\d+$/);
                    if (tab) {
                        var n = ~~(tab[0]);
                        a[n] = object.name;
                    }
                }
            }
        },
        terminate: function () {
            var Types = require("types");
            var i = this._windows.length - 1, icon;
            while (i >= 0) {
                this._windows.last()._destroyOnHide = true;
                this._windows.last().hide();
                //this._windows[i].destroy();
                this._windows.last().removeToHTML();
                this._windows.removeAt(i);
                i--;
            }
            if (Core.apps.activeApplication === this) Core.apps.activeApplication = null;
            Core.apps.applications[this.name] = null;
            delete Core.apps.applications[this.name];
            icon = Core.doc.getElementById(this.name + "_Icon");
            if (icon) icon.style.display = Types.DISPLAYS.BLOCK;
            this.destroy();
        },
        loadWindowsHTML: function () {
            var Tools = require("tools");
            var Xhr = require("xhr");
            var windowHTML = Tools.windowsHTML.shift();
            if (windowHTML) {
                Xhr.load(true, windowHTML, function (dx) {
                    var Tools = require("tools");
                    var Types = require("types");
                    var Core = require("core");
                    var div = Core.doc.createElement(Types.HTMLELEMENTS.DIV);
                    dx = Tools.text.replace(dx, "{theme}", Core.apps.activeApplication.themeManifest.themeName);
                    div.innerHTML = dx;
                    if (!Tools.HTMLParentElement) Core.doc.body.appendChild(div.firstElementChild);
                    else Tools.HTMLParentElement.appendChild(div.firstElementChild);
                    Core.apps.activeApplication.waitNextWindow();
                }, false);
            }
        },
        waitNextWindow: function () {
            var Tools = require("tools");
            var wins = Core.doc.querySelectorAll("div[data-appName='" + this.name + "']");
            if (wins.length === this._loadedWindowsHTML) this.run();
            else Tools.execFunc(this, "loadWindowsHTML");
        },
        run: function Application_run() {
            var Tools = require("tools");
            var CSS = require("css");
            var waiting, data, form, loading_logo, wins, i, l;
            waiting = Core.doc.getElementById("waiting")
            if (Tools.windowsHTML.length > 0) {
                this.loadWindowsHTML();
                return;
            }
            //if(waiting) $j.CSS.addClass(waiting,"hidden");
            loading_logo = Core.doc.getElementById("loading_logo");
            if (loading_logo) CSS.removeClass(loading_logo, "rotateAnimation");
            if (waiting) {
                //$j.CSS.addClass(waiting,"hidden");
                Core.doc.body.removeChild(waiting);
            }
            wins = Core.doc.querySelectorAll("div[data-appName='" + this.name + "']");
            for (i = 0, l = wins.length; i < l; i++) {
                data = wins[i].dataset.class;
                form = this.createForm(wins[i].id, data);
                //this._windows.push(form);
                //if(wins[i].style.display!=="none") {
                if (!this.mainWindow) {
                    if (form instanceof $j.classes.Window) {
                        this.mainWindow = this.activeWindow = form;
                    }
                } else form.show();
                //}
            }
            this.mainWindow.show();
            data = Core.doc.getElementById("loading_msg");
            if (data) Core.doc.body.removeChild(data);
            data = null;
            this.createToolTip();
        },
        createForm: function (id, instanceClass) {
            Core.windowZIndex++;
            var form = new this.windowsClass[instanceClass](this);
            form.formCreated(id);
            //this.themeManifest.changeWindowTheme(form);
            form.loaded();
            return form;
        },
        initialize: function (createIcon) {
            if (!this.locale) this.locale = Core.currentLocale;
            //this.loadLocale("./"+$j.folders["{BASE}"]+"/"+$j.tools.getPath($j.types.internalCategories.LOCALES)+this.locale);
            if (!createIcon) createIcon = false;
            if (Core.isHTMLRenderer()) {
                // création de l'emplacement des css en runtime
                Core.rtStyle = Core.doc.createElement("style");
                Core.rtStyle.setAttribute("id", "rtStyle");
                Core.rtStyle.setAttribute("type", "text/css");
                Core.rtStyle.setAttribute("media", "screen");
                Core.doc.getElementsByTagName("head")[0].appendChild(Core.rtStyle);
                var styleSheet = Core.rtStyle.sheet;
                //styleSheet.insertRule(".hidden {display:none !important;}", styleSheet.cssRules.length);
                //return;
            }
            if (createIcon)
            {
                var Classes = require("classes");
                var icon = Classes.createComponent(Classes.ShortCutIcon, this, this.appName + "_shortCut", { "parentHTML": Core.doc.body }, true);
                icon.click = function () { Core.apps.createApp(this.appName); };
                //console.log(icon.HTMLObj);
            }
            //var themes=Object.getOwnPropertyNames($j.themes);
            //for(var i=0,l=themes.length;i<l;i++) {
            //  if(themes[i]!=="jagui") this.loadTheme(themes[i]);
            //}
        },
        addWindows: function (windowsPath) {
            var Tools = require("tools");
            for (var i = 0, l = windowsPath.length; i < l; i++)
            {
                Tools.scripts.push(windowsPath[i]);
                Tools.loadFormRes(windowsPath[i]);
            }
        },
        addWindow: function (windowPath) {
            var Tools = require("tools");
            Tools.scripts.push(windowPath);
            Tools.loadFormRes(windowPath);
        },
        newWindow: function (windowPath, show, callBack) {
            var Tools = require("tools");
            var Uri = require("uri");
            // la fiche est déjà chargée
            var html_doc, style, windowClass;
            windowClass = Tools.uri.extractFileName(windowPath);
            show = !show ? true : show;
            html_doc = document.getElementsByTagName("head")[0];
            style = Core.doc.createElement("link");
            style.setAttribute("rel", "stylesheet");
            style.setAttribute("href", Tools.uri.base() + windowPath + ".css?rnd=" + new Date().getTime());
            style.setAttribute("media", "screen");
            html_doc.appendChild(style);
            style = Core.doc.createElement("link");
            var node = document.createElement("script");
            node.setAttribute("type", "text/javascript");
            node.addEventListener("load", function () {
                var Xhr = require("xhr");
                var Uri = require("uri");
                Xhr.load(true, Uri.base() + windowPath + ".html?rnd=" + new Date().getTime(), function (dx) {
                    var Text = require("text");
                    var Core = require("core");
                    var div = Core.doc.createElement(Types.HTMLELEMENTS.DIV);
                    dx = Text.replace(dx, "{theme}", Core.apps.activeApplication.themeManifest.themeName);
                    div.innerHTML = dx;
                    Core.doc.body.appendChild(div.firstElementChild);
                    var app = Core.apps.activeApplication;
                    var wins = Core.doc.querySelectorAll("[data-appname='" + app.name + "']"), form;//$j.doc.documentElement.getElementsByClassName(app.name),form;
                    for (var i = 0, l = wins.length; i < l; i++) {
                        data = wins[i].dataset.class;
                        if (data.toLowerCase() === Uri.split(windowPath, true).toLowerCase()) {
                            form = app.createForm(wins[i].id, data);
                            if (show) {
                                if (form.showingMode === Types.SHOWINGMODES.MODAL) form.showModal();
                                else form.show();
                            }
                        }
                    }
                    if (callBack) callBack(form);
                }, false);
            }, false);
            node.addEventListener("error", function () {
                console.log(windowPath + " not loaded");
            }, false);
            node.setAttribute("src", Uri.base() + windowPath + ".js");//?rnd="+new Date().getTime());
            html_doc.appendChild(node);
        },
        setLocale: function (locale) {
            var comps, i, l, j, l1;
            var Tools = require("tools");
            var Classes = require("classes");
            if (Tools.localeExist(locale)) {
                if (this._locales[locale]) {
                    if (this.locale !== locale) {
                        this.locale = locale;
                        for (i = 0, l = this._windows.length; i < l; i++) {
                            if (this._windows[i].visible) {
                                comps = this.activeWindow._controls.filter(
                                  function (e, i, a) {
                                      return (e instanceof Classes.Control) && (e._autoTranslate === true) && (e.visible === true);
                                  }
                                );
                                for (j = 0, l1 = comps.length; j < l1; j++) {
                                    if ((comps[j] instanceof Classes.CaptionControl) || (comps[j] instanceof Classes.CustomTextControl)) this.getLocalText(comps[j]);
                                    else comps[j].update();
                                }
                            }
                        }
                    }
                }
            }
        },
        getLocalText: function (obj) {
            var Classes = require("classes");
            if (!(obj instanceof Classes.CaptionControl) && (!(obj instanceof Classes.CustomTextControl))) return;
            var c = this._locales[this.locale], key;
            if (c) {
                key = obj.form.name + "." + obj.name;
                if (c[key]) {
                    if (obj instanceof Classes.CaptionControl) obj.setCaption(c[key]);
                    else if (obj instanceof Classes.CustomTextControl) obj.setPlaceHolder(c[key]);
                }
            }
        },
        createToolTip: function () {
            var Types = require("types");
            var Tools = require("tools");
            var wrapper, tpl, a;
            wrapper = Core.doc.createElement(Types.HTMLELEMENTS.DIV);
            tpl = Core.templates["ToolTip"];
            a = tpl.split("{theme}");
            tpl = a.join(this.mainWindow.getThemeName());
            a = tpl.split("{text}");
            tpl = a.join(String.EMPTY);
            wrapper.innerHTML = tpl;
            Core.doc.body.appendChild(wrapper.firstElementChild);
            this.toolTip = Core.doc.body.lastElementChild;
            this.toolTip.style.zIndex = Types.CONSTANTS.STAYONTOP + 1;
            Tools.events.bind(this.toolTip, Types.MOUSEEVENTS.MOVE, function () { Core.apps.activeApplication.hideToolTip(); });
        },
        showToolTip: function (obj, coord, useOffset) {
            var Types = require("Types");
            var CSS = require("css");
            var Classes = require("classes");
            var text = String.EMPTY, tx = 0, ty = 0, tt, exit = false;
            this.hideToolTip();
            if (!obj.showToolTip && !obj.ownerShowToolTip) exit = true;
            if (obj instanceof Classes.CustomTextControl) {
                if (!obj.hasError) exit = true;
            }
            if (exit) return;
            if (obj.toolTip !== String.EMPTY) {
                text = obj.toolTip;
            } else if (obj.ownerShowToolTip) {
                if (obj._owner.toolTip !== String.EMPTY) {
                    text = obj._owner.toolTip;
                }
            }
            if (obj instanceof Classes.CustomTextControl) {
                if (obj.hasError) text = obj.errorMsg;
            }
            if (!text) return;
            if (typeof text !== Types.CONSTANTS.STRING) return;
            if (text !== String.EMPTY) {
                this.toolTip.innerHTML = text;
                setTimeout(function () {
                    if (Core.apps.activeApplication.toolTip) {
                        CSS.addClass(Core.apps.activeApplication.toolTip, "fade");
                    }
                }, 10);
                this.placeToolTip(coord, useOffset);
                this.closeToolTip();
            }
        },
        placeToolTip: function (coord, useOffset) {
            var CSS = require("css");
            var Types = require("types");
            var tt, tx = 0, ty = 0;
            if (!useOffset) useOffset = true;
            tt = this.toolTip;
            tx = coord.x;
            if (tx + tt.offsetWidth > Core.doc.body.offsetWidth) tx = Core.doc.body.offsetWidth - tt.offsetWidth;
            ty = coord.y;
            if (useOffset) ty += 20;
            if (ty + tt.offsetHeight > Core.doc.body.offsetHeight) ty = coord.y - tt.offsetHeight;
            tt.style.transform = "translate(" + tx + Types.CSSUNITS.PX + "," + ty + Types.CSSUNITS.PX + ")";
            CSS.addClass(this.toolTip, "fade");
            clearTimeout(this._toolTipTimerHandle);
        },
        closeToolTip: function () {
            clearTimeout(this._toolTipTimerHandle);
            this._toolTipTimerHandle = setTimeout(function () {
                $j.apps.activeApplication.hideToolTip();
            }, 4000);
        },
        hideToolTip: function () {
            var CSS = require("css");
            CSS.removeClass(this.toolTip, "fade");
            clearTimeout(this._toolTipTimerHandle);
        },
        destroyToolTip: function () {
            var Tools = require("tools");
            var Types = require("types");
            if (this.toolTip)
            {
                clearTimeout(this._toolTipTimerHandle);
                Tools.events.unBind(this.toolTip, Types.MOUSEEVENTS.MOVE, this.hideToolTip);
                Core.doc.body.removeChild(this.toolTip);
                this.toolTip = null;
            }
        },
        closeAllPopups: function () {
            for (var i = 0, l = this._windows.length; i < l; i++) this._windows[i].closePopups();
        },
        destroy: function () {
            this._toolTipTimerHandle = null;
            this._windows.destroy();
            this._windows = null;
            this._windowsClass = null;
            this._globalComponentName.destroy();
            this._globalComponentName = null;
            this._lastThemeName = null;
            this.themeName = null;
            this.toolTip = null;
            this.showMainWindow = null;
            this.name = null;
            this.mainWindow = null;
            this.activeWindow = null;
            this.title = String.null;
            this._lastActiveWindow.destroy();
            this._lastActiveWindow = null;
            this.locale = null;
            this._locales = null;
        },
        loadLocale: function (localePath) {
            var Xhr = require("xhr");
            var Uri = require("uri");
            Xhr.load(true, localePath + ".json", function (dx, localeName) {
                var Types = require("types");
                var CSS = require("css");
                Core.apps.activeApplication._locales[Types.LANGUAGES[localeName.replace("-", "_")]] = JSON.parse(dx);
            }, false, Uri.extractFileName(localePath));
        }
        //#endregion
    });
    //#endregion
    //#region Bounds
    var Bounds = Geometry.Rect.extend("Bounds", {
        init: function (rect, owner) {
            var Events = require("events");
            if (!(rect instanceof Geometry.Rect)) rect = new Geometry.Rect;
            if (!rect) rect = new Geometry.Rect;
            //#region Private
            this._owner = owner;
            //#endregion
            this._inherited(rect.left, rect.top, rect.right, rect.height);
            this.onChange = new Events.NotifyEvent(owner);
        },
        //#region Getters
        width: function () {
            return this.right + this.left;
        },
        height: function () {
            return this.bottom + this.top;
        },
        //#endregion
        //#region Setters
        setLeft: function (newValue) {
            if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
            if (this.left !== newValue) {
                this.setValues(newValue, this.top, this.right, this.bottom);
            }
        },
        setTop: function (newValue) {
            if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
            if (this.left !== newValue) {
                this.setValues(this.left, newValue, this.right, this.bottom);
            }
        },
        setRight: function (newValue) {
            if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
            if (this.left !== newValue) {
                this.setValues(this.left, this.top, newValue, this.bottom);
            }
        },
        setBottom: function (newValue) {
            if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
            if (this.left !== newValue) {
                this.setValues(this.left, this.top, this.right, newValue);
            }
        },
        //#endregion
        //#region Methods
        marginRect: function (rect) {
            if (!(rect instanceof Geometry.Rect)) return;
            return new Geometry.Rect(rect.left + this.left, rect.top + this.top, rect.right - this.right, rect.bottom - this.bottom);
        },
        paddingRect: function (rect) {
            if (!(rect instanceof Goemetry.Rect)) return;
            return new Geometry.Rect(rect.left + this.left, rect.top + this.top, rect.right - this.right, rect.bottom - this.bottom);
        },
        applyTo: function (obj) { obj.left += this.left; obj.top += this.top; obj.width -= this.right; obj.height -= this.bottom; },
        apply: function () { this._owner.left += this.left; this._owner.top += this.top; this._owner.width -= this.right + this.left; this._owner.height -= this.bottom + this.top; },
        toCSS: function () {
            var Types = require("types");
            return this.top + Types.CSSUNITS.PX + String.SPACE + this.right + Types.CSSUNITS.PX + String.SPACE + this.bottom + Types.CSSUNITS.PX + String.SPACE + this.left + Types.CSSUNITS.PX;
        },
        destroy: function () {
            this._inherited();
            this._owner = null;
            this.onChange.destroy();
            this.onChange = null;
        },
        getProperties: function () {
            var Tools = require("tools");
            var props;
            props = Tools.getPropertiesFromObject(this);
            return props;
        }
        //#endregion
    });
    //#endregion
    //#region Position
    // TODO : support of databinding
    var Position = Core.Class.extend("Position", {
        init: function (point, owner) {
            var Events = require("events");
            if (!(point instanceof Geometry.Point)) point = new Geometry.Point;
            this.x = point.x;
            this.y = point.y;
            this.setX = function (newValue) {
                var Types = require("types");
                if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
                if (newValue !== this.x) {
                    this.x = newValue;
                    this.onChange.invoke();
                }
            };
            this.setY = function (newValue) {
                var Types = require("types");
                if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
                if (newValue !== this.y) {
                    this.y = newValue;
                    this.onChange.invoke();
                }
            };
            this.onChange = new Events.NotifyEvent(owner);
            this._owner = owner;
            this.setValues = function (x, y) {
                x = +x;
                y = +y;
                if (isNaN(x)) x = 0;
                if (isNaN(y)) y = 0;
                this.x = x;
                this.y = y;
                this.onChange.invoke();
            };
        },
        //#region Methods
        isEmpty: function () { return this.x === 0 && this.y === 0; },
        point: function () { return new Geometry.Point(this.x, this.y); },
        reflect: function (/*value*/) {/*_vector.reflect(a);*/ },
        assign: function (source) {
            var Classes = require("classes");
            if (!(source instanceof Classes.Position || source instanceof Geometry.Point)) return;
            this.x = source.x;
            this.y = source.y;
        },
        destroy: function () {
            this.x = null;
            this.y = null;
            this.onChange.destroy();
            this.onChange = null;
            this._owner = null;
        },
        equals: function (position) {
            return (this.x === position.x && this.y === position.y);
        },
        getProperties: function () {
            var props, Tools = require("tools");
            props = Tools.getPropertiesFromObject(this);
            return props;
        }
        //#endregion
    });
    //#endregion
    //#region GradientPoint
    var GradientPoint = Core.Class.extend("GradientPoint", {
        init: function (offset, color) {
            var Types = require("types");
            var Colors = require("colors");
            if (typeof offset !== Types.CONSTANTS.NUMBER) offset = 0;
            if (!(color instanceof Classes.Color)) color = Colors.BLACK;
            this.offset = offset;
            this.color = color;
            //this.setOffset=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_offset) _offset=newValue;
            //};
            //this.setColor=function(newValue) {
            //  if(!(newValue instanceof $j.classes.Color)) return;
            //  if(!newValue.equals(_color)) _color.assign(newValue);
            //};
        },
        //#region Methods
        destroy: function () {
            this.offset = null;
            this.color.destroy();
            this.color = null;
        }
        //#endregion
    });
    //#endregion
    //#region Gradient
    // TODO : support of databinding
    $j.classes.Gradient = Class.extend("Gradient", {
        init: function (owner) {
            var Classes = require("classes");
            var Colors = require("colors");
            var Types = require("types");
            if (owner) {
                Classes.newCollection(this, owner, Classes.GradientPoint);
                this.startPosition = new Classes.Position(null, owner);
                this.startPosition.onChange.addListener(this.positionChanged);
                this.stopPosition = new Classes.Position(new Goemetry.Point(0, 1), owner);
                this.stopPosition.onChange.addListener(this.positionChanged);
                this.style = Types.GRADIENTSTYLES.LINEAR;
                this.items.push(new Classes.GradientPoint(0, Colors.BLACK));
                this.items.push(new Classes.GradientPoint(1, Colors.WHITE));
            }
        },
        //#region Setters
        setStartPosition: function (newValue) {
            var Classes = require("classes");
            if (!(newValue instanceof Classes.Position)) return;
            if (!newValue.equals(this.startPosition)) {
                this.startPosition.assign(newValue);
                if (this._owner._allowUpdate) {
                    this._owner.form.updateRects.push(this._owner.getClipParentRect());
                    this._owner.update();
                    this._owner.form.updateRects.push(this._owner.getClipParentRect());
                }
            }
        },
        setStopPosition: function (newValue) {
            var Classes = require("classes");
            if (!(newValue instanceof Classes.Position)) return;
            if (!newValue.equals(_stopPosition)) {
                _stopPosition.assign(newValue);
                if (this._owner._allowUpdate) {
                    this._owner.form.updateRects.push(this._owner.getClipParentRect());
                    this._owner.update();
                    this._owner.form.updateRects.push(this._owner.getClipParentRect());
                }
            }
        },
        setStyle: function (newValue) {
            var Types = require("types");
            var Tools = require("tools");
            if (!Tools.valueInSet(newValue, Types.GRADIENTSTYLES)) return;
            if (newValue !== this.style) {
                this.style = newValue;
                if (this._owner._allowUpdate) {
                    this._owner.form.updateRects.push(this._owner.getClipParentRect());
                    this._owner.update();
                    this._owner.form.updateRects.push(this._owner.getClipParentRect());
                }
            }
        },
        //#endregion Setter
        //#region Methods
        assign: function (source) {
            var Classes = require("classes");
            if (!(source instanceof Classes.Gradient)) return;
            this.startPosition.assign(source.startPosition);
            this.stopPosition.assign(source.stopPosition);
            this.style = source.style;
            this.items.length = 0;
            if (source.items.length > 0) {
                for (var i = 0, l = source.items.length; i < l; i++) this.items.push(new Classes.GradientPoint(source.items[i].offset, source.items[i].color));
            }
        },
        positionChanged: function () { this.onChange.invoke(); },
        change: function () { this._owner.onChange.invoke(); },
        interpolateColor: function (offset) {
            var Types = require("types");
            var Colors = require("colors");
            var Anims = require("animation");
            if (typeof offset !== Types.CONSTANTS.NUMBER) return;
            var result = Colors.TRANSPARENT.clone();
            if (this.items.length > 1) {
                if (offset < 0) offset = 0;
                if (offset > 1) offset = 1;
                this.items.sort(function (a, b) { return a.offset > b.offset; });
                if (offset < this.items[0].offset) {
                    result.assign(this.items[0].color);
                    return result;
                }
                if (offset > this.items[this.items.length - 1].offset) {
                    result.assign(this.items[this.items.length - 1].color);
                    return result;
                }
                if (this.items.length > 0) {
                    for (var i = 0, l = this.items.length - 1; i < l; i++) {
                        if (offset < this.items[i].offset) continue;
                        if (this.items[i + 1].offset - this.items[i].offset <= 0) result.assign(this.items[i].color);
                        else if ((i = this.items.length - 2) && (offset > this.items[this.items.length - 1].offset)) result.assign(this.items[this.items.length - 1].color);
                        else result.assign(Anims.interpolateColor(this.items[i].color, this.items[i + 1].color, (offset - this.items[i].offset) / (this.items[i + 1].offset - this.items[i].offset)));
                    }
                }
                return result;
            }
        },
        destroy: function () {
            this.startPosition.destroy();
            this.startPosition = null;
            this.stopPosition.destroy();
            this.stopPosition = null;
            this.style = null;
            this.items.destroy();
            this.items = null;
        }
        //#endregion
    });
    //#endregion
    ////#region Brush
    //// TODO : support of databinding
    //$j.classes.Brush = $j.classes.Bindable.extend("Gradient", {
    //    init: function (style, color, owner) {
    //        this.gradient = new $j.classes.Gradient(this);
    //        this.bitmap = new Image();
    //        this.color = color;
    //        this.bitmapRepeatMode = $j.types.bitmapRepeatModes.REPEAT;
    //        this.style = style;
    //        if (owner) {
    //            if (!(color instanceof $j.classes.Color)) color = _colors.BLACK;
    //            this.setColor = function (newValue) {
    //                if (!(newValue instanceof $j.classes.Color)) return;
    //                if (!newValue.equals(this.color)) {
    //                    this.color.assign(newValue);
    //                    this.onChange.invoke();
    //                }
    //            };
    //            this.setGradient = function (newValue) {
    //                if (!(newValue instanceof $j.classes.Gradient)) return;
    //                this.gradient.assign(newValue);
    //                this.onChange.invoke();
    //            };
    //            //this.gradient.items.onChange.addListener(this.gradientChanged);
    //            this.setBitmap = function (newValue) {
    //                if (typeof newValue !== Types.CONSTANTS.STRING) return;
    //                if (newValue !== this.bitmap.src) {
    //                    this.bitmap.src = newValue;
    //                    this.onChange.invoke();
    //                }
    //            };
    //            this.bitmap.obj = this;
    //            this.setBitmapRepeatMode = function (newValue) {
    //                if (!$j.tools.valueInSet(newValue, $j.types.bitmapRepeatModes)) return;
    //                if (newValue !== this.bitmapRepeatMode) {
    //                    this.bitmapRepeatMode = newValue;
    //                    this.onChange.invoke();
    //                }
    //            };
    //            this.setStyle = function (newValue) {
    //                if (!$j.tools.valueInSet(newValue, $j.types.brushStyles)) return;
    //                if (newValue !== this.style) {
    //                    this.style = newValue;
    //                    this.onChange.invoke();
    //                }
    //            };
    //            this.onChange = new $j.classes.NotifyEvent(owner);
    //            this._owner = owner;
    //        }
    //    },
    //    //#region Methods
    //    assign: function (source) {
    //        if (!(source instanceof $j.classes.Brush)) return;
    //        this.color.assign(source.color);
    //        if (source.bitmap.src !== String.EMPTY) {
    //            this.bitmap.src = source.bitmap.src;
    //        }
    //        this.style = source.style;
    //        if (this.gradient) {
    //            if (source.gradient) this.gradient.assign(source.gradient);
    //        }
    //    },
    //    gradientChanged: function () { this.obj.onChange.invoke(); },
    //    bitmapChanged: function () {
    //        var obj = this.obj;
    //        if (this.obj.onChange.hasListener()) this.obj.onChange.invoke();
    //        else //setTimeout(function() { obj.owner.redraw(); }, 0);
    //            this.obj.form.addControlToRedraw(this.obj);
    //    },
    //    clear: function () {
    //        this.style = $j.types.brushStyles.NONE;
    //        this.color.assign(_colors.TRANSPARENT);
    //    },
    //    destroy: function () {
    //        this.gradient.destroy();
    //        this.gradient = null;
    //        this.bitmap.obj = null;
    //        this.bitmap = null;
    //        this.color.destroy();
    //        this.color = null;
    //        this.bitmapRepeatMode = null;
    //        this.style = null;
    //        this.onChange.destroy();
    //        this.onChange = null;
    //        this._owner = null;
    //    }
    //    //#endregion
    //});
    ////#endregion
    ////#region Font
    //// TODO : support of databinding
    ///*$j.classes.Font=Class.extend("Font",{
    //  init: function(owner) {
    //    this.underline=false;
    //    this.strikeout=false;
    //    this.size=10;
    //    this.sizeUnit=$j.types.CSSUnits.PT;
    //    this.family="Tahoma";
    //    this.style=$j.types.fontStyles.NORMAL;
    //    if(owner)) {
    //      this.string=String.EMPTY;
    //      this.onChange=new $j.classes.NotifyEvent(owner);
    //      this.setUnderline=function(newValue) {
    //        if(typeof newValue!==Types.CONSTANTS.BOOLEAN) return;
    //        if(newValue!==this.underline) {
    //          this.underline=newValue;
    //          if($j.isHTMLRenderer()) this.stringify();
    //          this.onChange.invoke();
    //        }
    //      };
    //      this.setStrikeout=function(newValue) {
    //        if(typeof newValue!==Types.CONSTANTS.BOOLEAN) return;
    //        if(newValue!==this.strikeout) {
    //          this.strikeout=newValue;
    //          if($j.isHTMLRenderer()) this.stringify();
    //          this.onChange.invoke();
    //        }
    //      };
    //      this.setSize=function(newValue) {
    //        if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
    //        if(newValue!==this.size) {
    //          this.size=newValue;
    //          if($j.isHTMLRenderer()) this.stringify();
    //          this.onChange.invoke();
    //        }
    //      };
    //      this.setSizeUnit=function(newValue) {
    //        if(!$j.tools.valueInSet(newValue,$j.types.CSSUnits)) return;
    //        if(newValue!==this.sizeUnit) {
    //          this.sizeUnit=newValue;
    //          this.onChange.invoke();
    //        }
    //      };
    //      this.setFamily=function(newValue) {
    //        if(typeof newValue!==Types.CONSTANTS.STRING) return;
    //        if(newValue!==this.family) {
    //          this.family=newValue;
    //          if($j.isHTMLRenderer()) this.stringify();
    //          this.onChange.invoke();
    //        }
    //      };
    //      this.getStyle=function(newValue) {
    //        if(!($j.tools.valueInSet(newValue,$j.types.brushStyles))) return;
    //        if(newValue!==this.style) {
    //          this.style=newValue;
    //          if($j.isHTMLRenderer()) this.stringify();
    //          this.onChange.invoke();
    //          if(this._owner._allowUpdate) this._owner.form.addControlToRedraw(this._owner);
    //          //if(this.owner._allowUpdate){
    //          //  this.owner.form.updateRects.push(this.owner.getClipParentRect());
    //          //  this.owner.update();
    //          //  this.owner.form.updateRects.push(this.owner.getClipParentRect());
    //          //  //$j.canvas.needUpdate=true;
    //          //}
    //        }
    //      };
    //      this.height=0;
    //      this._owner=owner;
    //      this.brush=new $j.classes.Brush($j.types.brushStyles.NONE,_colors.TRANSPARENT,owner);
    //      this.stringify();
    //    }
    //  },
    //  //#region Methods
    //  isEmpty:function() { return (this.underline===false)&&(this.strikeout===false)&&(this.size===10)&&(this.family==="Tahoma")&&(this.style===$j.types.fontStyles.NORMAL)&&((this.brush.style===$j.types.brushStyles.NONE)&&(this.brush.color.equals(_colors.TRANSPARENT))); },
    //  stringify: function() {
    //    this.string=String.EMPTY;
    //    if(this.style===$j.types.fontStyles.BOLD) this.string+=" bold";
    //    if(this.style===$j.types.fontStyles.ITALIC) this.string+=" italic";
    //    this.string+=String.SPACE+this.size+this.sizeUnit+String.SPACE+this.family;
    //    this.string.trim();
    //    this.height=$j.tools.font.getTextHeight("°_",this);
    //    if(!$j.tools.font.fontsInfos[this.family])) {
    //      $j.tools.font.fontsInfos[this.family]={};
    //      $j.tools.font.fontsInfos[this.family].sizes={};
    //      if(!$j.tools.font.fontsInfos[this.family].sizes[this.size])) {
    //        $j.tools.font.fontsInfos[this.family].sizes[this.size]={};
    //        $j.tools.font.fontsInfos[this.family].sizes[this.size].chars={};
    //        if(!$j.tools.font.fontsInfos[this.family].sizes[this.size].chars['A'])) this.generateChars();
    //      }
    //    }
    //  },
    //  toCss: function(object) {
    //    if(!(object instanceof HTMLElement)) return;
    //    object.style.fontFamily=this.family;
    //    object.style.fontSize=this.size+this.sizeUnit;
    //    object.style.fontWeight=String.EMPTY;
    //    object.style.fontStyle=String.EMPTY;
    //    object.style.textDecoration=String.EMPTY;
    //    if(this.style===$j.types.fontStyles.BOLD) object.style.fontWeight="bold";
    //    if(this.style===$j.types.fontStyles.ITALIC) object.style.fontStyle="italic";
    //    if(this.underline) object.style.textDecoration="underline";
    //    if(this.strikeout) {
    //      if(object.style.textDecoration!==String.EMPTY) object.style.textDecoration+=",";
    //      object.style.textDecoration+="line-through";
    //    }
    //  },
    //  toCssString: function() {
    //    var str=String.EMPTY;
    //    str+=this.size+this.sizeUnit;
    //    str+=String.SPACE+'"'+this.family+'"';
    //    if(this.style===$j.types.fontStyles.BOLD) str+=String.SPACE+"bold";
    //    if(this.style===$j.types.fontStyles.ITALIC) str+=String.SPACE+"italic";
    //    if(this.underline) str+=String.SPACE+"underline";
    //    if(this.strikeout) {
    //      //if(object.style.textDecoration!==String.EMPTY) str+=",";
    //      str+=String.SPACE+"line-through";
    //    }
    //    str+=";";
    //    return str;
    //  },
    //  fromString: function(str) {
    //    if(typeof str!==Types.CONSTANTS.STRING) return;
    //    str=str.toLowerCase();
    //    this.size=0;
    //    this.family=String.EMPTY;
    //    this.style=$j.types.fontStyles.NORMAL;
    //    this.underline=false;
    //    this.strikeout=false;
    //    str=str.split(String.SPACE);
    //    for(var i=0,l=str.length;i<l;i++) {
    //      if(!isNaN(parseFloat(str[i]))) {
    //        if(str[i].endsWith($j.types.CSSUnits.PO)) this.sizeUnit=$j.types.CSSUnits.PO;
    //        else if(str[i].endsWith($j.types.CSSUnits.REM)) this.sizeUnit=$j.types.CSSUnits.REM;
    //        else this.sizeUnit=str[i].substr(str[i].length-2,2).toLowerCase();
    //        this.size=parseFloat(str[i]);
    //      }
    //      else if(str[i].contains("bold")) $j.tools.include(this,"style",$j.types.fontStyle.BOLD);
    //      else if(str[i].contains("italic")) $j.tools.include(this,"style",$j.types.fontStyle.ITALIC);
    //      else this.family=str[i].replace(/"/g,String.EMPTY);
    //    }
    //    if($j.renderer!==$j.types.renderers.HTML) this.stringify();
    //  },
    //  assign: function(source) {
    //    if(!(source instanceof $j.classes.Font)) return;
    //    this.family=source.family;
    //    this.size=source.size;
    //    this.strikeout=source.strikeout;
    //    this.style=source.style;
    //    this.underline=source.underline;
    //    this.sizeUnit=source.sizeUnit;
    //    this.onChange.invoke();
    //    this.brush.assign(source.brush);
    //    //this.stringify();
    //    this.string=source.string;
    //  },
    //  equals: function(font) {
    //    var ret=false;
    //    if(font.size===this.size) ret=true;
    //    else ret=false;
    //    if(font.family===this.family) ret=true;
    //    else ret=false;
    //    if(font.style===this.style) ret=true;
    //    else ret=false;
    //    if(font.underline===this.underline) ret=true;
    //    else ret=false;
    //    if(font.strikeout===this.strikeout) ret=true;
    //    else ret=false;
    //    if(font.sizeUnit===this.sizeUnit) ret=true;
    //    else ret=false;
    //    return ret;
    //  },
    //  reset: function() {
    //    this.underline=this.strikeout=false;
    //    this.size=10;
    //    this.sizeUnit=$j.types.CSSUnits.PT;
    //    this.family="Tahoma";
    //    this.style=$j.types.fontStyles.NORMAL;
    //    this.height=0;
    //    this.brush.clear();
    //    this.stringify();
    //  },
    //  generateChars: function() {
    //    var i,canvas=$j.tools.newCanvas(),ctx=canvas.getContext("2d");
    //    ctx.font=this.string;
    //    $j.tools.font.fontsInfos[this.family].sizes[this.size].chars[String.SPACE]=ctx.measureText(String.SPACE).width;
    //    //$j.tools.font.fontsInfos[this.family].sizes[this.size].chars["\t"]=ctx.measureText("\t").width;
    //    for(i=32;i<255;i++) {
    //      $j.tools.font.fontsInfos[this.family].sizes[this.size].chars[i]=ctx.measureText(String.fromCharCode(i)).width;
    //    }
    //  },
    //  destroy:function() {
    //    this.underline=null;
    //    this.strikeout=null;
    //    this.size=null;
    //    this.sizeUnit=null;
    //    this.family=null;
    //    this.style=null;
    //    this.string=null;
    //    this.onChange.destroy();
    //    this.onChange=null;
    //    this.height=null;
    //    this._owner=null;
    //    this.brush.destroy();
    //    this.brush=null;
    //  }
    //  //#endregion
    //});*/
    ////#endregion
    ////#region PathPoint
    //$j.classes.PathPoint = Class.extend("PathPoint", {
    //    init: function () {
    //        this.kind = $j.types.pathPointKinds.MOVETO;
    //        this.point = new $j.classes.Point;
    //        this.cp1 = new $j.classes.Point;
    //        this.cp2 = new $j.classes.Point;
    //    },
    //    //#region Methods
    //    destroy: function () {
    //        this.kind = null;
    //        this.point.destroy();
    //        this.point = null;
    //        this.cp1.destroy();
    //        this.cp1 = null;
    //        this.cp2.destroy();
    //        this.cp2 = null;
    //    }
    //    //#endregion
    //});
    ////#endregion
    ////#region PathData
    //$j.classes.PathData = Class.extend("PathData", {
    //    init: function (owner) {
    //        this.startPoint = new $j.classes.Point;
    //        if (owner) this._owner = owner;
    //        //this.onChange=new $j.classes.NotifyEvent(owner);
    //        this.setStartPoint = function (newValue) {
    //            if (!(newValue instanceof $j.classes.Point)) return;
    //            if (newValue !== this.startPoint) {
    //                this.startPoint.assign(newValue);
    //                //this.onChange.invoke();
    //                this.updateOwner();
    //            }
    //        };
    //        this.data = [];
    //        this.originalBounds = new $j.classes.Rect;
    //    },
    //    //#region getters/setters
    //    getPathString: function () {
    //        var i = 0, result = String.EMPTY;
    //        while (i < this.data.length) {
    //            if (this.data[i].kind === $j.types.pathPointKinds.MOVETO) result += 'M ' + this.data[i].point.x + ',' + this.data[i].point.y + String.SPACE;
    //            else if (this.data[i].kind === $j.types.pathPointKinds.LINETO) result += 'L ' + this.data[i].point.x + ',' + this.data[i].point.y + String.SPACE;
    //            else if (this.data[i].kind === $j.types.pathPointKinds.CURVETO) {
    //                result += 'C ' + this.data[i].point.x + ',' + this.data[i].point.y + String.SPACE +
    //                          this.data[i + 1].point.x + ',' + this.data[i + 1].point.y + String.SPACE +
    //                          this.data[i + 2].point.x + ',' + this.data[i + 2].point.y + String.SPACE;
    //                i += 2;
    //            } else if (this.data[i].kind === $j.types.pathPointKinds.CLOSE) result += 'Z ';
    //            i++;
    //        }
    //        return result;
    //    },
    //    setPathString: function (value) {
    //        var s = String.EMPTY, toks, tok, r, cp1, cp2, angle, large, sweet, lastlen, pos, o;
    //        if (typeof value !== Types.CONSTANTS.STRING) return;
    //        if (value.length > 0) {
    //            for (var i = 0, l = value.length; i < l; i++) {
    //                if (['\t', '\r', '\n', '"', "'"].indexOf(value.charAt(i)) > -1) continue;
    //                s += value.charAt(i);
    //            }
    //        }
    //        this.data.length = 0;
    //        pos = 0;
    //        while (s !== String.EMPTY) {
    //            lastlen = pos;
    //            tok = $j.tools.text.getTok(s, pos);
    //            pos = tok.pos;
    //            toks = tok.s;
    //            while (toks !== String.EMPTY) {
    //                tok = toks.charAt(0);
    //                toks = toks.remove(0, 1);
    //                try {
    //                    if (['z', 'Z'].indexOf(tok) > -1) this.closePath();
    //                    if (tok === 'M') {
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        this.moveTo(o.Point);
    //                        while ((s !== String.EMPTY) && (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'].indexOf(s.charAt(pos)) > -1)) {
    //                            //next points }
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            this.lineTo(o.Point);
    //                        }
    //                    }
    //                    if (tok === 'm') {
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        this.moveToRel(o.Point);
    //                        while ((s !== String.EMPTY) && (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'].indexOf(s.charAt(pos)) > -1)) {
    //                            //next points
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            this.lineToRel(o.Point);
    //                        }
    //                    }
    //                    if (tok === 'L') {
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        this.lineTo(o.Point);
    //                        while ((s !== String.EMPTY) && (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'].indexOf(s.charAt(pos)) > -1)) {
    //                            //next points
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            this.lineTo(o.Point);
    //                        }
    //                    }
    //                    if (tok === 'l') {
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        this.lineToRel(o.Point);
    //                        while ((s !== String.EMPTY) && (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'].indexOf(s.charAt(pos)) > -1)) {
    //                            //next points
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            this.lineToRel(o.Point);
    //                        }
    //                    }
    //                    if (tok === 'C') {
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        cp1 = o.Point;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        cp2 = o.Point;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        this.curveTo(cp1, cp2, o.Point);
    //                        while ((s !== String.EMPTY) && (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'].indexOf(s.charAt(pos)) > -1)) {
    //                            //next points
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            cp1 = o.Point;
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            cp2 = o.Point;
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            this.curveTo(cp1, cp2, o.Point);
    //                        }
    //                    }
    //                    if (tok === 'c') {
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        cp1 = o.Point;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        cp2 = o.Point;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        this.curveToRel(cp1, cp2, o.Point);
    //                        while ((s !== String.EMPTY) && (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'].indexOf(s.charAt(pos)) > -1)) {
    //                            //next points
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            cp1 = o.Point;
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            cp2 = o.Point;
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            this.curveToRel(cp1, cp2, o.Point);
    //                        }
    //                    }
    //                    if (tok === 'S') {
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        cp2 = o.Point;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        this.smoothCurveTo(cp2, o.Point);
    //                        while ((s !== String.EMPTY) && (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'].indexOf(s.charAt(pos)) > -1)) {
    //                            //next points
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            cp2 = o.Point;
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            this.smoothCurveTo(cp2, o.Point);
    //                        }
    //                    }
    //                    if (tok === 's') {
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        cp2 = o.Point;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        this.smoothCurveToRel(cp2, o.Point);
    //                        while ((s !== String.EMPTY) && (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'].indexOf(s.charAt(pos)) > -1)) {
    //                            //next points }
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            cp2 = o.Point;
    //                            o = $j.tools.text.getPoint(s, pos);
    //                            pos = o.Pos;
    //                            this.smoothCurveToRel(cp2, o.Point);
    //                        }
    //                    }
    //                    if (tok === 'H') {
    //                        //skip horizontal line
    //                        o = $j.tools.text.getNum(s, pos);
    //                        pos = o.Pos;
    //                        this.hLineTo(+o.Result);
    //                    }
    //                    if (tok === 'h') {
    //                        //skip horizontal line
    //                        o = $j.tools.text.getNum(s, pos);
    //                        pos = o.Pos;
    //                        this.hLineToRel(+o.Result);
    //                    }
    //                    if (tok === 'V') {
    //                        //skip vertical line
    //                        o = $j.tools.text.getNum(s, pos);
    //                        pos = o.Pos;
    //                        this.vLineTo(+o.Result);
    //                    }
    //                    if (tok === 'v') {
    //                        //skip vertical line
    //                        o = $j.tools.text.getNum(s, pos);
    //                        pos = o.Pos;
    //                        this.vLineToRel(+o.Result);
    //                    }
    //                    if (tok === 'Q') {
    //                        //skip quadratic bezier
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                    }
    //                    if (tok === 'q') {
    //                        //skip quadratic bezier
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                    }
    //                    if (tok === 'T') {
    //                        //skip show quadratic bezier
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                    }
    //                    if (tok === 't') {
    //                        //skip show quadratic bezier
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                    }
    //                    if (tok === 'A') {
    //                        //arc
    //                        if (this.data.length > 0) cp1 = this.data[this.data.length - 1].point;
    //                        else cp1 = new $j.classes.Point;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        r = o.Point;
    //                        o = $j.tools.text.getNum(s, pos);
    //                        pos = o.Pos;
    //                        angle = +o.Result;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        large = o.Point.x == 1;
    //                        sweet = o.Point.y == 1;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        cp2 = o.Point;
    //                        this.addArcSvg(cp1, r, angle, large, sweet, cp2);
    //                    }
    //                    if (tok === 'a') {
    //                        //arc rel
    //                        if (this.data.length > 0) cp1 = this.data[this.data.length - 1].point;
    //                        else cp1 = new $j.classes.Point;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        r = o.Point;
    //                        o = $j.tools.text.getNum(s, pos);
    //                        pos = o.Pos;
    //                        angle = +o.Result;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        large = o.Point.x == 1;
    //                        sweet = o.Point.y == 1;
    //                        o = $j.tools.text.getPoint(s, pos);
    //                        pos = o.Pos;
    //                        cp2 = o.Point;
    //                        cp2.setValues(cp1.x + cp2.x, cp1.y + cp2.y);
    //                        this.addArcSvg(cp1, r, angle, large, sweet, cp2);
    //                    }
    //                }
    //                catch (e) { alert(e); }
    //            }
    //            if (lastlen === pos) {
    //                pos = 0;
    //                break;
    //            }
    //        }
    //        this.originalBounds.assign(this.bounds());
    //        //this.onChange.invoke(this._owner);
    //        this.updateOwner();
    //        if (this._owner._allowUpdate) {
    //            //this.owner.update();
    //            //  $j.canvas.needUpdate=true;
    //        }
    //    },
    //    //#endregion
    //    //#region Methods
    //    isEmpty: function () { return this.data.length === 0; },
    //    bounds: function () {
    //        var result;
    //        if (this.data.length === 0) return new $j.classes.Rect;
    //        result = new $j.classes.Rect(0xFFFF, 0xFFFF, -0xFFFF, -0xFFFF);
    //        if (this.data.length > 0) {
    //            for (var i = 0, l = this.data.length; i < l; i++) {
    //                if (this.data[i].kind === $j.types.pathPointKinds.CLOSE) continue;
    //                if (this.data[i].point.x < result.left) result.left = this.data[i].point.x;
    //                if (this.data[i].point.x > result.right) result.right = this.data[i].point.x;
    //                if (this.data[i].point.y < result.top) result.top = this.data[i].point.y;
    //                if (this.data[i].point.y > result.bottom) result.bottom = this.data[i].point.y;
    //            }
    //        }
    //        //add small amount
    //        if (result.width() === 0) result.right = result.left + 0.001;
    //        if (result.height() === 0) result.bottom = result.top + 0.001;
    //        return result;
    //    },
    //    lastPoint: function () {
    //        if (this.data.length > 0) return this.data[this.data.length - 1].point;
    //        else return new $j.classes.Point;
    //    },
    //    assign: function (source) {
    //        if (!(source instanceof $j.classes.PathData)) return;
    //        source.copyDataTo(this.data);
    //        //this.onChange.invoke();
    //        this.updateOwner();
    //    },
    //    copyDataTo: function (dest) {
    //        if (!Array.isArray(dest)) return;
    //        dest.length = 0;
    //        for (var i = 0, l = this.data.length; i < l; i++) {
    //            var pathPoint = new $j.classes.PathPoint;
    //            pathPoint.kind = this.data[i].kind;
    //            pathPoint.point.assign(this.data[i].point);
    //            pathPoint.cp1.assign(this.data[i].cp1);
    //            pathPoint.cp2.assign(this.data[i].cp2);
    //            dest.push(pathPoint);
    //        }
    //    },
    //    addArcSvgPart: function (center, ray, angle, sweep) {
    //        //var s=sweep;
    //        if (!(center instanceof $j.classes.Point)) return;
    //        if (!(ray instanceof $j.classes.Point)) return;
    //        if (typeof angle !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof sweep !== Types.CONSTANTS.NUMBER) return;
    //        var bezier_arc_angle_epsilon = 0.01, usemoveto, i, f, total_sweep, local_sweep, prev_sweep, done;
    //        angle = _conv.deg2Rad(angle);
    //        sweep = _conv.deg2Rad(sweep);
    //        i = $j.trunc(angle * 0, 1591549430918953);
    //        angle = f = angle - (i * Types.CONSTANTS._2PI);
    //        if (sweep >= Types.CONSTANTS._2PI) sweep = Types.CONSTANTS._2PI;
    //        if (sweep <= -Types.CONSTANTS._2PI) sweep = -Types.CONSTANTS._2PI;
    //        if ($j.abs(sweep) < 1e-10) return;
    //        total_sweep = 0;
    //        done = false;
    //        usemoveto = false;
    //        while (!done) {
    //            if (sweep < 0) {
    //                prev_sweep = total_sweep;
    //                local_sweep = -Math.PI * 0.5;
    //                total_sweep = total_sweep - (Math.PI * 0.5);
    //                if (total_sweep <= sweep + bezier_arc_angle_epsilon) {
    //                    local_sweep = sweep - prev_sweep;
    //                    done = true;
    //                }
    //            } else {
    //                prev_sweep = total_sweep;
    //                local_sweep = Math.PI * 0.5;
    //                total_sweep = total_sweep + (Math.PI * 0.5);
    //                if (total_sweep >= sweep - bezier_arc_angle_epsilon) {
    //                    local_sweep = sweep - prev_sweep;
    //                    done = true;
    //                }
    //            }
    //            this.drawArcWithBezier(this, center.x, center.y, ray.x, ray.y, angle, local_sweep, usemoveto);
    //            usemoveto = false;
    //            angle += local_sweep;
    //        }
    //    },
    //    addArcSvg: function (p1, r, a, l, f, p2) {
    //        //if(!p1||!r||!l||!f||!p2) return;
    //        if (!(p1 instanceof $j.classes.Point)) return;
    //        if (!(r instanceof $j.classes.Point)) return;
    //        if (!(p2 instanceof $j.classes.Point)) return;
    //        if (typeof a !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof l !== Types.CONSTANTS.BOOLEAN) return;
    //        if (typeof f !== Types.CONSTANTS.BOOLEAN) return;
    //        var i, m_radii_ok, v, p, n, sq, rx, ry, x0, y0, x1, y1, x2, y2, cx, cy, ux, uy, vx, vy,
    //            dx2, dy2, prx, pry, px1, py1, cx1, cy1, sx2, sy2, sign, coef, radii_check, start_angle, sweep_angle,
    //            cos_a, sin_a, tm, len, m;
    //        rx = r.x;
    //        ry = r.y;
    //        x0 = p1.x;
    //        y0 = p1.y;
    //        x2 = p2.x;
    //        y2 = p2.y;
    //        a = _conv.deg2Rad(a);
    //        m_radii_ok = true;
    //        if (rx < 0) rx = -rx;
    //        if (ry < 0) ry = -rx;
    //        //Calculate the middle point between
    //        //the current and the final points
    //        dx2 = (x0 - x2) * 0.5;
    //        dy2 = (y0 - y2) * 0.5;
    //        //Convert a from degrees to radians
    //        cos_a = $j.cos(a);
    //        sin_a = $j.sin(a);
    //        //Calculate (x1,y1)
    //        x1 = cos_a * dx2 + sin_a * dy2;
    //        y1 = -sin_a * dx2 + cos_a * dy2;
    //        //Ensure radii are large enough
    //        prx = rx * rx;
    //        pry = ry * ry;
    //        px1 = x1 * x1;
    //        py1 = y1 * y1;
    //        //Check that radii are large enough
    //        radii_check = px1 / prx + py1 / pry;
    //        if (radii_check > 1) {
    //            rx = $j.sqrt(radii_check) * rx;
    //            ry = $j.sqrt(radii_check) * ry;
    //            prx = rx * rx;
    //            pry = ry * ry;
    //            if (radii_check > 10) m_radii_ok = false;
    //        }
    //        //Calculate (cx1,cy1)
    //        if (l === f) sign = -1;
    //        else sign = 1;
    //        sq = (prx * pry - prx * py1 - pry * px1) / (prx * py1 + pry * px1);
    //        if (sq < 0) coef = sign * $j.sqrt(0);
    //        else coef = sign * $j.sqrt(sq);
    //        cx1 = coef * ((rx * y1) / ry);
    //        cy1 = coef * -((ry * x1) / rx);
    //        //Calculate (cx,cy) from (cx1,cy1)
    //        sx2 = (x0 + x2) * 0.5;
    //        sy2 = (y0 + y2) * 0.5;
    //        cx = sx2 + (cos_a * cx1 - sin_a * cy1);
    //        cy = sy2 + (sin_a * cx1 + cos_a * cy1);
    //        //Calculate the start_a (a1) and the sweep_a (da)
    //        ux = (x1 - cx1) / rx;
    //        uy = (y1 - cy1) / ry;
    //        vx = (-x1 - cx1) / rx;
    //        vy = (-y1 - cy1) / ry;
    //        //Calculate the a start
    //        n = $j.sqrt(ux * ux + uy * uy);
    //        p = ux;//(1*ux)+(0*uy)
    //        if (uy < 0) sign = -1;
    //        else sign = 1;
    //        v = p / n;
    //        if (v < -1) v = -1;
    //        if (v > 1) v = 1;
    //        start_angle = sign * $j.acos(v);
    //        //Calculate the sweep a
    //        n = $j.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
    //        p = ux * vx + uy * vy;
    //        if (ux * vy - uy * vx < 0) sign = -1;
    //        else sign = 1;
    //        v = p / n;
    //        if (v < -1) v = -1;
    //        if (v > 1) v = 1.0;
    //        sweep_angle = sign * $j.acos(v);
    //        if ((!f) && (sweep_angle > 0)) sweep_angle = sweep_angle - pi * 2;
    //        else if (f && (sweep_angle < 0)) sweep_angle += Math.PI * 2;
    //        len = this.data.length;
    //        this.addArcSvgPart(new $j.classes.Point(), new $j.classes.Point(rx, ry), _conv.rad2Deg(start_angle), _conv.rad2Deg(sweep_angle));
    //        tm = Types.CONSTANTS.IDENTITYMATRIX.clone();
    //        tm.m31 = cx;
    //        tm.m32 = cy;
    //        m = $j.geometry.createRotationMatrix(a);
    //        tm = m.multiply(tm);
    //        i = len;
    //        while (i < this.data.length) {
    //            v = new $j.classes.Vector(this.data[i].point.x, this.data[i].point.y, 1);
    //            v.transform(tm);
    //            this.data[i].point.x = v.x;
    //            this.data[i].point.y = v.y;
    //            i++;
    //        }
    //    },
    //    calculateBezierCoefficients: function (bezier) {
    //        var result = {};
    //        result.cx = 3 * (bezier[1].x - bezier[0].x);
    //        result.cy = 3 * (bezier[1].y - bezier[0].y);
    //        result.bx = 3 * (bezier[2].x - bezier[1].x) - result.cx;
    //        result.by = 3 * (bezier[2].y - bezier[1].y) - result.cy;
    //        result.ax = bezier[3].x - bezier[0].x - result.cx - result.bx;
    //        result.ay = bezier[3].y - bezier[0].y - result.cy - result.by;
    //        return result;
    //    },
    //    pointOnBezier: function (p, ax, bx, cx, ay, by, cy, t) {
    //        if (!(p instanceof $j.classes.Point)) return;
    //        if (typeof ax !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof bx !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof cx !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof ay !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof by !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof cy !== Types.CONSTANTS.NUMBER) return;
    //        var tsqr, tcube, result = new $j.classes.Point;
    //        tsqr = t * t;
    //        tcube = tsqr * t;
    //        result.setValues((ax * tcube) + (bx * tsqr) + (cx * t) + p.x, (ay * tcube) + (by * tsqr) + (cy * t) + p.y);
    //        return result;
    //    },
    //    createBezier: function (bezier, coef) {
    //        var dt, bc, t, result = [];
    //        if (coef === 0) return;
    //        dt = 1 / (1 * coef - 1);
    //        t = 0;
    //        bc = this.calculateBezierCoefficients(bezier);
    //        for (var i = 0; i < coef; i++) {
    //            result[i] = this.pointOnBezier(bezier[0], bc.ax, bc.bx, bc.cx, bc.ay, bc.by, bc.cy, t);
    //            t = t + dt;
    //        }
    //        return result;
    //    },
    //    drawArcWithBezier: function (p, cx, cy, rx, ry, sa, sr, u) {
    //        if (typeof cx !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof cy !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof rx !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof ry !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof sa !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof sr !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof u !== Types.CONSTANTS.BOOLEAN) return;
    //        var coord = [], pts = [], a, b, c, x, y, ss, cc;
    //        if (sr === 0) {
    //            if (u) {
    //                if (p.data.length === 0) p.moveTo(new $j.classes.Point(cx + rx * $j.cos(sa), cy - ry * $j.sin(sa)));
    //                else p.lineTo(new $j.classes.Point(cx + rx * $j.cos(sa), cy - ry * $j.sin(sa)));
    //            }
    //            p.lineTo(new $j.classes.Point(cx + rx * $j.cos(sa), cy - ry * $j.sin(sa)));
    //            return;
    //        }
    //        b = $j.sin(sr * 0.5);
    //        c = $j.cos(sr * 0.5);
    //        a = 1 - c;
    //        x = a * 4.0 / 3.0;
    //        y = b - x * c / b;
    //        ss = $j.sin(sa + sr * 0.5);
    //        cc = $j.cos(sa + sr * 0.5);
    //        coord[0] = new $j.classes.Point(c, -b);
    //        coord[1] = new $j.classes.Point(c + x, -y);
    //        coord[2] = new $j.classes.Point(c + x, y);
    //        coord[3] = new $j.classes.Point(c, b);
    //        for (var i = 0; i < 4; i++) pts[i] = new $j.classes.Point(cx + rx * (coord[i].x * cc - coord[i].y * ss), cy + ry * (coord[i].x * ss + coord[i].y * cc));
    //        if (u) {
    //            if (p.data.length === 0) p.moveTo(pts[0]);
    //            else p.lineTo(pts[0]);
    //        }
    //        p.curveTo(pts[1], pts[2], pts[3]);
    //    },
    //    moveTo: function (point) {
    //        if (!(point instanceof $j.classes.Point)) return;
    //        var pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.MOVETO;
    //        pathPoint.point.setValues(point.x, point.y);
    //        this.data.push(pathPoint);
    //        this.startPoint.setValues(point.x, point.y);
    //    },
    //    moveToRel: function (point) {
    //        if (!(point instanceof $j.classes.Point)) return;
    //        var pathPoint = new $j.classes.PathPoint(), lp = this.lastPoint();
    //        pathPoint.kind = $j.types.pathPointKinds.MOVETO;
    //        pathPoint.point.setValues(lp.x + point.x, lp.y + point.y);
    //        this.data.push(pathPoint);
    //        this.startPoint.setValues(pathPoint.point.x, pathPoint.point.y);
    //    },
    //    lineTo: function (point) {
    //        if (!(point instanceof $j.classes.Point)) return;
    //        var pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.LINETO;
    //        pathPoint.point.setValues(point.x, point.y);
    //        this.data.push(pathPoint);
    //    },
    //    lineToRel: function (point) {
    //        if (!(point instanceof $j.classes.Point)) return;
    //        var pathPoint = new $j.classes.PathPoint(), lp = this.lastPoint();
    //        pathPoint.kind = $j.types.pathPointKinds.LINETO;
    //        pathPoint.point.setValues(lp.x + point.x, lp.y + point.y);
    //        this.data.push(pathPoint);
    //    },
    //    hLineTo: function (x) {
    //        if (typeof x !== Types.CONSTANTS.NUMBER) return;
    //        var pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.LINETO;
    //        pathPoint.point.setValues(x, this.data[this.data.length - 1].point.y);
    //        this.data.push(pathPoint);
    //    },
    //    hLineToRel: function (a) {
    //        if (typeof a !== Types.CONSTANTS.NUMBER) return;
    //        var pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.LINETO;
    //        pathPoint.point.setValues(this.lastPoint().x + a, this.lastPoint().y);
    //        this.data.push(pathPoint);
    //    },
    //    vLineTo: function (y) {
    //        if (typeof y !== Types.CONSTANTS.NUMBER) return;
    //        var pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.LINETO;
    //        pathPoint.point.setValues(this.data[this.data.length - 1].point.x, y);
    //        this.data.push(pathPoint);
    //    },
    //    vLineToRel: function (y) {
    //        if (typeof y !== Types.CONSTANTS.NUMBER) return;
    //        var pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.LINETO;
    //        pathPoint.point.setValues(this.lastPoint().x, this.lastPoint().y + y);
    //        this.data.push(pathPoint);
    //    },
    //    curveTo: function (point1, point2, endpoint) {
    //        var p1 = point1, p2 = point2, e = endpoint;
    //        if (!(p1 instanceof $j.classes.Point)) return;
    //        if (!(p2 instanceof $j.classes.Point)) return;
    //        if (!(e instanceof $j.classes.Point)) return;
    //        var pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(p1.x, p1.y);
    //        this.data.push(pathPoint);
    //        pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(p2.x, p2.y);
    //        this.data.push(pathPoint);
    //        pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(e.x, e.y);
    //        this.data.push(pathPoint);
    //    },
    //    curveToRel: function (point1, point2, endpoint) {
    //        var p1 = point1, p2 = point2, e = endpoint;
    //        if (!(p1 instanceof $j.classes.Point)) return;
    //        if (!(p2 instanceof $j.classes.Point)) return;
    //        if (!(e instanceof $j.classes.Point)) return;
    //        var pathPoint = new $j.classes.PathPoint(), lp = this.lastPoint();
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(lp.x + p1.x, lp.y + p1.y);
    //        this.data.push(pathPoint);
    //        pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(lp.x + p2.x, lp.y + p2.y);
    //        this.data.push(pathPoint);
    //        pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(lp.x + e.x, lp.y + e.y);
    //        this.data.push(pathPoint);
    //    },
    //    smoothCurveTo: function (point2, endpoint) {
    //        var p2 = point2, e = endpoint;
    //        if (!(p2 instanceof $j.classes.Point)) return;
    //        if (!(e instanceof $j.classes.Point)) return;
    //        var controlPoint1 = new $j.classes.Point(), pathPoint = new $j.classes.PathPoint;
    //        if (this.data.length > 2) {
    //            controlPoint1.setValues(this.lastPoint().x + (this.lastPoint().x - this.data[this.data.length - 1].point.x),
    //                                    this.lastPoint().y + (this.lastPoint().y - this.data[this.data.length - 1].point.y));
    //        } else {
    //            controlPoint1.setValues(p2.x, p2.y);
    //        }
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(controlPoint1.x, controlPoint1.y);
    //        this.data.push(pathPoint);
    //        pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(p2.x, p2.y);
    //        this.data.push(pathPoint);
    //        pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(e.x, e.y);
    //        this.data.push(pathPoint);
    //    },
    //    smoothCurveToRel: function (point2, endpoint) {
    //        var p2 = point2, e = endpoint;
    //        if (!(p2 instanceof $j.classes.Point)) return;
    //        if (!(e instanceof $j.classes.Point)) return;
    //        var controlPoint1 = new $j.classes.Point(), pathPoint = new $j.classes.PathPoint(), lp;
    //        if (this.data.length > 2) {
    //            controlPoint1.setValues(this.lastPoint().x + (this.lastPoint().x - this.data[this.data.length - 1].point.x),
    //                                    this.lastPoint().y + (this.lastPoint().y - this.data[this.data.length - 1].point.y));
    //        } else {
    //            controlPoint1.X = p2.x;
    //            controlPoint1.Y = p2.y;
    //        }
    //        lp = this.lastPoint();
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(controlPoint1.x, controlPoint1.y);
    //        this.data.push(pathPoint);
    //        pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(lp.x + p2.x, lp.y + p2.y);
    //        this.data.push(pathPoint);
    //        pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.CURVETO;
    //        pathPoint.point.setValues(lp.x + e.x, lp.y + e.y);
    //        this.data.push(pathPoint);
    //    },
    //    closePath: function () {
    //        var pathPoint = new $j.classes.PathPoint;
    //        pathPoint.kind = $j.types.pathPointKinds.CLOSE;
    //        pathPoint.point.setValues(this.startPoint.x, this.startPoint.y);
    //        this.data.push(pathPoint);
    //    },
    //    addEllipse: function (rect) { // � voir
    //        if (!(rect instanceof $j.classes.Rect)) return;
    //        var cx, cy, px, py, rw = rect.width(), rh = rect.height();
    //        cx = (rect.left + rw) * 0.5;
    //        cy = (rect.top + rh) * 0.5;
    //        px = $j.types.canvas.CURVE2KAPPA * (rw * 0.5);
    //        py = $j.types.canvas.CURVE2KAPPA * (rh * 0.5);
    //        this.moveTo(new $j.classes.Point(rect.left, cy));
    //        this.curveTo(new $j.classes.Point(rect.left, cy - py), new $j.classes.Point(cx - px, rect.top), new $j.classes.Point(cx, rect.top));
    //        this.curveTo(new $j.classes.Point(cx + px, rect.top), new $j.classes.Point(rw, cy - py), new $j.classes.Point(rw, cy));
    //        this.curveTo(new $j.classes.Point(rw, cy + py), new $j.classes.Point(cx + px, rh), new $j.classes.Point(cx, rh));
    //        this.curveTo(new $j.classes.Point(cx - px, rh), new $j.classes.Point(rect.left, cy + py), new $j.classes.Point(rect.left, cy));
    //        this.originalPathString = this.PathString();
    //    },
    //    addRectangle: function (r, radius) {
    //        var /*r=rect,*/ulr = radius.topLeft, urr = radius.topRight, lrr = radius.bottomLeft, llr = radius.bottomRight;
    //        if (!(r instanceof $j.classes.Rect)) return;
    //        var rW = r.width(), rW2 = rW * .5, x, y, xw, yh, x1, x2, x3, x4, y1, y2, y3, y4, radii, rH = r.height(), ratio = 0;
    //        ratio = $j.min($j.min(rW / (ulr + urr), rW / (llr + lrr)), $j.min(rH / (ulr + llr), rH / (urr + lrr)));
    //        if ((ratio > 0) && (ratio < 1)) {
    //            ulr *= ratio;
    //            urr *= ratio;
    //            llr *= ratio;
    //            lrr *= ratio;
    //        }
    //        x = r.left + .5;
    //        y = r.top + .5;
    //        xw = x + rW;
    //        yh = y + rH;
    //        x1 = x + ulr;
    //        x2 = xw - urr;
    //        x3 = xw - lrr;
    //        x4 = x + llr;
    //        y1 = y + urr;
    //        y2 = yh - lrr;
    //        y3 = yh - llr;
    //        y4 = y + ulr;
    //        if (urr + lrr + llr + ulr === 0) {
    //            this.moveTo(new $j.classes.Point(x1, y));
    //            this.lineTo(new $j.classes.Point(xw, y));
    //            this.lineTo(new $j.classes.Point(xw, yh));
    //            this.lineTo(new $j.classes.Point(x, yh));
    //        } else {
    //            if (ulr > 0) this.moveTo(new $j.classes.Point(x1, y));
    //            else this.moveTo(new $j.classes.Point(x, y));
    //            if (urr > 0) {
    //                this.lineTo(new $j.classes.Point(x2, y));
    //                radii = $j.types.canvas.CURVE2KAPPA * urr;
    //                this.curveTo(new $j.classes.Point(x2 + radii, y), new $j.classes.Point(xw, y1 - radii), new $j.classes.Point(xw, y1));
    //                this.lineTo(new $j.classes.Point(xw, y2));
    //            } else {
    //                this.lineTo(new $j.classes.Point(xw, y));
    //                this.lineTo(new $j.classes.Point(xw, yh));
    //            }
    //            if (lrr > 0) {
    //                radii = $j.types.canvas.CURVE2KAPPA * lrr;
    //                this.curveTo(new $j.classes.Point(xw, y2 + radii), new $j.classes.Point(x3 + radii, yh), new $j.classes.Point(x3, yh));
    //                this.lineTo(new $j.classes.Point(x4, yh));
    //            } else {
    //                this.lineTo(new $j.classes.Point(x, yh));
    //            } /// ici
    //            if (llr > 0) {
    //                radii = $j.types.canvas.CURVE2KAPPA * llr;
    //                this.curveTo(new $j.classes.Point(x4 - radii, yh), new $j.classes.Point(x, y3 + radii), new $j.classes.Point(x, y3));
    //                this.lineTo(new $j.classes.Point(x, y4));
    //            } else {
    //                this.lineTo(new $j.classes.Point(x, yh));
    //            }
    //            if (ulr > 0) {
    //                radii = $j.types.canvas.CURVE2KAPPA * ulr;
    //                this.curveTo(new $j.classes.Point(x, y4 - radii), new $j.classes.Point(x1 - radii, y), new $j.classes.Point(x1, y));
    //            } else {
    //                this.lineTo(new $j.classes.Point(x, y));
    //            }
    //        }
    //        this.closePath();
    //    },
    //    addPie: function (rect, object) {
    //        var r = rect, o = object;
    //        if (!(r instanceof $j.classes.Rect)) return;
    //        var cx = rx = r.width() * 0.5, cy = ry = r.height() * 0.5;
    //        if (!(o instanceof $j.classes.Chord)) this.moveTo(new $j.classes.Point(r.left + cx, r.top + cy));
    //        this.addArc(new $j.classes.Point(r.left + cx, r.top + cy), new $j.classes.Point(rx, ry), o.startAngle, o.endAngle - o.startAngle);
    //        //if(o.closed) {
    //        if (!(o instanceof $j.classes.Chord)) this.lineTo(new $j.classes.Point(r.left + cx, r.top + cy));
    //        this.closePath();
    //        //}
    //    },
    //    addArc: function (center, radius, startangle, angle) {
    //        var c = center, r = radius, sa = startangle, a = angle;
    //        if (!(c instanceof $j.classes.Point)) return;
    //        if (!(r instanceof $j.classes.Point)) return;
    //        if (typeof sa !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof a !== Types.CONSTANTS.NUMBER) return;
    //        var bezier_arc_angle_epsilon = 0.01, usemoveto, i, f, total_sweep, local_sweep, prev_sweep, done;
    //        sa = _conv.deg2Rad(sa);
    //        a = _conv.deg2Rad(a);
    //        i = $j.trunc(sa * 0.1591549430918953);
    //        sa = f = sa - (i * Types.CONSTANTS._2PI);
    //        if (a >= Types.CONSTANTS._2PI) a = Types.CONSTANTS._2PI;
    //        if (a <= -Types.CONSTANTS._2PI) a = -Types.CONSTANTS._2PI;
    //        if ($j.abs(a) < 1e-10) return;
    //        total_sweep = 0;
    //        done = false;
    //        usemoveto = true;
    //        while (!done) {
    //            if (a < 0) {
    //                prev_sweep = total_sweep;
    //                local_sweep = -Math.PI * 0.5;
    //                total_sweep = total_sweep - (Math.PI * 0.5);
    //                if (total_sweep <= a + bezier_arc_angle_epsilon) {
    //                    local_sweep = a - prev_sweep;
    //                    done = true;
    //                }
    //            } else {
    //                prev_sweep = total_sweep;
    //                local_sweep = Math.PI * 0.5;
    //                total_sweep = total_sweep + (Math.PI * 0.5);
    //                if (total_sweep >= a - bezier_arc_angle_epsilon) {
    //                    local_sweep = a - prev_sweep;
    //                    done = true;
    //                }
    //            }
    //            this.drawArcWithBezier(this, c.x, c.y, r.x, r.y, sa, local_sweep, usemoveto);
    //            usemoveto = false;
    //            sa += local_sweep;
    //        }
    //    },
    //    addCallout: function (rect, object) {
    //        var ulr = object.bordersRadius.topLeft, urr = object.bordersRadius.topRight,
    //            lrr = object.bordersRadius.bottomLeft, llr = object.bordersRadius.bottomRight,
    //            offset = object.calloutOffset;
    //        if (!(rect instanceof $j.classes.Rect)) return;
    //        var rW = rect.width(), rW2 = rW / 2, x, y, xw, yh, x1, x2, x3, x4, y1, y2, y3, y4, radii, rH = rect.height(), rH2 = rH / 2, ratio = 0, coW2 = object.calloutWidth / 2;
    //        ratio = $j.min($j.min(rW / (ulr + urr), rW / (llr + lrr)), $j.min(rH / (ulr + llr), rH / (urr + lrr)));
    //        if ((ratio > 0) && (ratio < 1)) {
    //            ulr *= ratio;
    //            urr *= ratio;
    //            llr *= ratio;
    //            lrr *= ratio;
    //        }
    //        x = rect.left;
    //        y = rect.top;
    //        xw = x + rW;
    //        yh = y + rH;
    //        x1 = x + ulr;
    //        x2 = xw - urr;
    //        x3 = xw - lrr;
    //        x4 = x + llr;
    //        y1 = y + urr;
    //        y2 = yh - lrr;
    //        y3 = yh - llr;
    //        y4 = y + ulr;
    //        if (object.calloutPosition === $j.types.calloutPositions.TOP) {
    //            this.moveTo(new $j.classes.Point(x1, y + object.calloutLength));
    //            if (offset !== 0) {
    //                if (offset > rW - x2) offset = rW2 - (rW - x2) - coW2;
    //                else if (offset < x1) offset = -(rW2 - x1 - coW2);
    //            }
    //            this.lineTo(new $j.classes.Point(rW2 - coW2 + offset, y + object.calloutLength));
    //            this.lineTo(new $j.classes.Point(rW2 + offset, y));
    //            this.lineTo(new $j.classes.Point(rW2 + coW2 + offset, y + object.calloutLength));
    //            this.lineTo(new $j.classes.Point(x2, y + object.calloutLength));
    //            radii = $j.types.canvas.CURVE2KAPPA * urr;
    //            this.curveTo(new $j.classes.Point(x2 + radii, y + object.calloutLength), new $j.classes.Point(xw, y1 - radii + object.calloutLength), new $j.classes.Point(xw, y1 + object.calloutLength));
    //            this.lineTo(new $j.classes.Point(xw, y2));
    //            radii = $j.types.canvas.CURVE2KAPPA * lrr;
    //            this.curveTo(new $j.classes.Point(xw, y2 + radii), new $j.classes.Point(x3 + radii, yh), new $j.classes.Point(x3, yh));
    //            this.lineTo(new $j.classes.Point(x4, yh));
    //            radii = $j.types.canvas.CURVE2KAPPA * llr;
    //            this.curveTo(new $j.classes.Point(x4 - radii, yh), new $j.classes.Point(x, y3 + radii), new $j.classes.Point(x, y3));
    //            this.lineTo(new $j.classes.Point(x, y4 + object.calloutLength));
    //            radii = $j.types.canvas.CURVE2KAPPA * ulr;
    //            this.curveTo(new $j.classes.Point(x, y4 - radii + object.calloutLength), new $j.classes.Point(x1 - radii, y + object.calloutLength), new $j.classes.Point(x1, y + object.calloutLength));
    //        } else if (object.calloutPosition === $j.types.calloutPositions.RIGHT) {
    //            this.moveTo(new $j.classes.Point(x1, y));
    //            this.lineTo(new $j.classes.Point(x2 - object.calloutLength, y));
    //            radii = $j.types.canvas.CURVE2KAPPA * urr;
    //            this.curveTo(new $j.classes.Point(x2 + radii - object.calloutLength, y), new $j.classes.Point(xw - object.calloutLength, y1 - radii), new $j.classes.Point(xw - object.calloutLength, y1));
    //            if (offset !== 0) {
    //                if (offset > rH - y2) offset = rH2 - (rH - y2) - coW2;
    //                else if (offset < y1) offset = -(rH2 - y1 - coW2);
    //            }
    //            this.lineTo(new $j.classes.Point(xw - object.calloutLength, rH2 - coW2 + offset));
    //            this.lineTo(new $j.classes.Point(xw, rH2 + offset));
    //            this.lineTo(new $j.classes.Point(xw - object.calloutLength, rH2 + coW2 + offset));
    //            this.lineTo(new $j.classes.Point(xw - object.calloutLength, y2));
    //            radii = $j.types.canvas.CURVE2KAPPA * lrr;
    //            this.curveTo(new $j.classes.Point(xw - object.calloutLength, y2 + radii), new $j.classes.Point(x3 - object.calloutLength + radii, yh), new $j.classes.Point(x3 - object.calloutLength, yh));
    //            this.lineTo(new $j.classes.Point(x4, yh));
    //            radii = $j.types.canvas.CURVE2KAPPA * llr;
    //            this.curveTo(new $j.classes.Point(x4 - radii, yh), new $j.classes.Point(x, y3 + radii), new $j.classes.Point(x, y3));
    //            this.lineTo(new $j.classes.Point(x, y4));
    //            radii = $j.types.canvas.CURVE2KAPPA * ulr;
    //            this.curveTo(new $j.classes.Point(x, y4 - radii), new $j.classes.Point(x1 - radii, y), new $j.classes.Point(x1, y));
    //        } else if (object.calloutPosition === $j.types.calloutPositions.BOTTOM) {
    //            this.moveTo(new $j.classes.Point(x1, y));
    //            this.lineTo(new $j.classes.Point(x2, y));
    //            radii = $j.types.canvas.CURVE2KAPPA * urr;
    //            this.curveTo(new $j.classes.Point(x2 + radii, y), new $j.classes.Point(xw, y1 - radii), new $j.classes.Point(xw, y1));
    //            this.lineTo(new $j.classes.Point(xw, y2 - object.calloutLength));
    //            radii = $j.types.canvas.CURVE2KAPPA * lrr;
    //            this.curveTo(new $j.classes.Point(xw, y2 + radii - object.calloutLength), new $j.classes.Point(x3 + radii, yh - object.calloutLength), new $j.classes.Point(x3, yh - object.calloutLength));
    //            if (offset !== 0) {
    //                if (offset > rW - x3) offset = rW2 - (rW - x3) - coW2;
    //                else if (offset < x4) offset = -(rW2 - x4 - coW2);
    //            }
    //            this.lineTo(new $j.classes.Point(rW2 + coW2 + offset, yh - object.calloutLength));
    //            this.lineTo(new $j.classes.Point(rW2 + offset, yh));
    //            this.lineTo(new $j.classes.Point(rW2 - coW2 + offset, yh - object.calloutLength));
    //            this.lineTo(new $j.classes.Point(x4, yh - object.calloutLength));
    //            radii = $j.types.canvas.CURVE2KAPPA * llr;
    //            this.curveTo(new $j.classes.Point(x4 - radii, yh - object.calloutLength), new $j.classes.Point(x, y3 + radii - object.calloutLength), new $j.classes.Point(x, y3 - object.calloutLength));
    //            this.lineTo(new $j.classes.Point(x, y4));
    //            radii = $j.types.canvas.CURVE2KAPPA * ulr;
    //            this.curveTo(new $j.classes.Point(x, y4 - radii), new $j.classes.Point(x1 - radii, y), new $j.classes.Point(x1, y));
    //        } else if (object.calloutPosition === $j.types.calloutPositions.LEFT) {
    //            this.moveTo(new $j.classes.Point(x1 + object.calloutLength, y));
    //            this.lineTo(new $j.classes.Point(x2, y));
    //            radii = $j.types.canvas.CURVE2KAPPA * urr;
    //            this.curveTo(new $j.classes.Point(x2 + radii, y), new $j.classes.Point(xw, y1 - radii), new $j.classes.Point(xw, y1));
    //            this.lineTo(new $j.classes.Point(xw, y2));
    //            radii = $j.types.canvas.CURVE2KAPPA * lrr;
    //            this.curveTo(new $j.classes.Point(xw, y2 + radii), new $j.classes.Point(x3 + radii, yh), new $j.classes.Point(x3, yh));
    //            this.lineTo(new $j.classes.Point(x4 + object.calloutLength, yh));
    //            radii = $j.types.canvas.CURVE2KAPPA * llr;
    //            this.curveTo(new $j.classes.Point(x4 - radii + object.calloutLength, yh), new $j.classes.Point(x + object.calloutLength, y3 + radii), new $j.classes.Point(x + object.calloutLength, y3));
    //            if (offset !== 0) {
    //                if (offset > rH - y3) offset = rH2 - (rH - y3) - coW2;
    //                else if (offset < y4) offset = -(rH2 - y4 - coW2);
    //            }
    //            this.lineTo(new $j.classes.Point(x + object.calloutLength, rH2 + coW2 + offset));
    //            this.lineTo(new $j.classes.Point(x, rH2 + offset));
    //            this.lineTo(new $j.classes.Point(x + object.calloutLength, rH2 - coW2 + offset));
    //            this.lineTo(new $j.classes.Point(x + object.calloutLength, y4));
    //            radii = $j.types.canvas.CURVE2KAPPA * ulr;
    //            this.curveTo(new $j.classes.Point(x + object.calloutLength, y4 - radii), new $j.classes.Point(x1 + object.calloutLength - radii, y), new $j.classes.Point(x1 + object.calloutLength, y));
    //        }
    //        this.closePath();
    //    },
    //    clear: function () {
    //        this.data.length = 0;
    //        //this.onChange.invoke();
    //        this.updateOwner();
    //    },
    //    flatten: function (coef) {
    //        var bpts, b, len, segCount, oldPathData, curPoint, f, s, bounds, r, v, i, j, l;
    //        if (typeof coef !== Types.CONSTANTS.NUMBER) coef = 0.25;
    //        //scale
    //        if (this.data.length > 0) {
    //            bounds = this.bounds;
    //            r = bounds;
    //            s = $j.min(bounds.width() * 0.01, bounds.height() * 0.01);
    //            f = coef * s;
    //            if (f < 0.05) f = 0.05;
    //            //copy data
    //            if (this.data.length > 0) {
    //                for (i = 0, l = this.data.length; i < l; i++) oldPathData.push(this.data[i]);
    //            }
    //            this.data.length = 0;
    //            i = 0;
    //            while (i < oldPathData.length) {
    //                if (oldPathData[i].kind === $j.types.pathPointKinds.MOVETO) {
    //                    this.moveTo(oldPathData[i].point);
    //                    curPoint.assign(oldPathData[i].point);
    //                } else if (oldPathData[i].kind === $j.types.pathPointKinds.LINETO) {
    //                    this.lineTo(oldPathData[i].point);
    //                    curPoint.assign(oldPathData[i].point);
    //                } else if (oldPathData[i].kind === $j.types.pathPointKinds.CURVETO) {
    //                    b[0] = curPoint;
    //                    b[1] = oldPathData[i].point;
    //                    i++;
    //                    b[2] = oldPathData[i].point;
    //                    i++;
    //                    b[3] = oldPathData[i].point;
    //                    v = $j.clone(new $j.classes.Point(b[1]));
    //                    v.subtract(new $j.classes.Point(b[3]));
    //                    len = v.length;
    //                    segCount = $j.round(len / f);
    //                    if (segCount < 2) segCount = 2;
    //                    bpts = this.createBezier(b, segCount);
    //                    if (bpts.length > 0) {
    //                        for (j = 0, l = bpts.length; j < l; j++) this.lineTo(bpts[j]);
    //                    }
    //                    curPoint.assign(oldPathData[i].point);
    //                } else if (oldPathData[i].kind === $j.types.pathPointKinds.CLOSE) this.closePath();
    //                i++;
    //            }
    //            //this.onChange.invoke();
    //            this.updateOwner();
    //        }
    //    },
    //    scale: function (x, y) {
    //        if (typeof x !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof y !== Types.CONSTANTS.NUMBER) return;
    //        if (this.data.length > 0) {
    //            for (var i = 0, l = this.data.length; i < l; i++) {
    //                if ((this.data[i].kind === $j.types.pathPointKinds.MOVETO) || (this.data[i].kind === $j.types.pathPointKinds.LINETO) || (this.data[i].kind === $j.types.pathPointKinds.CURVETO)) {
    //                    this.data[i].point.setValues(this.data[i].point.x * x, this.data[i].point.y * y);
    //                }
    //            }
    //        }
    //    },
    //    offset: function (x, y) {
    //        if (this.data.length > 0) {
    //            for (var i = 0, l = this.data.length; i < l; i++) {
    //                if ((this.data[i].kind === $j.types.pathPointKinds.MOVETO) || (this.data[i].kind === $j.types.pathPointKinds.LINETO) || (this.data[i].kind === $j.types.pathPointKinds.CURVETO)) {
    //                    this.data[i].point.setValues(this.data[i].point.x + x, this.data[i].point.y + y);
    //                }
    //            }
    //        }
    //    },
    //    applyMatrix: function (matrix) {
    //        var m = matrix;
    //        var v;
    //        if (!(m instanceof $j.classes.Matrix)) return;
    //        if (this.data.length > 0) {
    //            for (var i = 0, l = this.data.length; i < l; i++) {
    //                if ((this.data[i].kind === $j.types.pathPointKinds.MOVETO) || (this.data[i].kind === $j.types.pathPoint.kinds.LINETO) || (this.data[i].kind === $j.types.pathPointKinds.CURVETO)) {
    //                    v = new $j.classes.Vector(this.data[i].point);
    //                    v.transform(m);
    //                    this.data[i].point.setValues(v.x, v.y);
    //                }
    //            }
    //        }
    //    },
    //    flattenToPolygon: function (flattenCoef) {
    //        var i, bpts, b = [], sp, curPoint = new $j.classes.Point(), len, segCount, f = flattenCoef, s, bounds, r = new $j.classes.Rect/*,result=$j.classes.Point.create()*/, polygon = [], v, v1;
    //        if (typeof f !== Types.CONSTANTS.NUMBER) f = 0.25;
    //        if (this.data.length > 0) {
    //            bounds = this.bounds();
    //            r.assign(bounds);
    //            r.fit(new $j.classes.Rect(0, 0, 100, 100)).rect;
    //            s = $j.min(bounds.width() * 0.01, bounds.height() * 0.01);
    //            f = f * s;
    //            if (f < 0.05) f = 0.05;
    //            i = 0;
    //            while (i < this.data.length) {
    //                if (this.data[i].kind === $j.types.pathPointKinds.MOVETO) {
    //                    polygon.push(this.data[i].point);
    //                    curPoint.assign(this.data[i].point);
    //                    sp = curPoint;
    //                } else if (this.data[i].kind === $j.types.pathPointKinds.LINETO) {
    //                    polygon.push(this.data[i].point);
    //                    curPoint.assign(this.data[i].point);
    //                } else if (this.data[i].kind === $j.types.pathPointKinds.CURVETO) {
    //                    b[0] = curPoint;
    //                    b[1] = this.data[i].point;
    //                    i++;
    //                    b[2] = this.data[i].point;
    //                    i++;
    //                    b[3] = this.data[i].point;
    //                    v = new $j.classes.Vector(b[1].x, b[1].y, 1);
    //                    v.subtract(new $j.classes.Vector(b[3].x, b[3].y, 1));
    //                    len = v.length();
    //                    segCount = $j.round(len / f);
    //                    if (segCount < 2) segCount = 2;
    //                    bpts = this.createBezier(b, segCount);
    //                    if (bpts.length > 0) {
    //                        for (var j = 0, l = bpts.length; j < l; j++) polygon.push(bpts[j]);
    //                    }
    //                    curPoint.assign(this.data[i].point);
    //                } else if (this.data[i].kind === $j.types.pathPointKinds.CLOSE) {
    //                    polygon.push(sp);
    //                    polygon.push(Types.CONSTANTS.CLOSEPOLYGON.clone());//� voir
    //                }
    //                i++;
    //            }
    //            with (this.bounds()) return { Polygon: polygon, Result: new $j.classes.Point($j.abs(width() - left), $j.abs(height() - top)) };
    //        }
    //    },
    //    resizeToRect: function (rect) {
    //        var r = rect;
    //        if (!(r instanceof $j.classes.Rect)) return;
    //        if (r.isEmpty()) return;
    //        if (this.isEmpty()) return;
    //        var b, pathData, i = 0, w, h, newW, newH;
    //        if (!this.bounds().equals(r)) {
    //            b = this.bounds();
    //            pathData = this.data;
    //            w = b.width();
    //            h = b.height();
    //            newW = r.width();
    //            newH = r.height();
    //            while (i < pathData.length) {
    //                pathData[i].point.x = r.left + (pathData[i].point.x - b.left) / w * newW;
    //                pathData[i].point.y = r.top + (pathData[i].point.y - b.top) / h * newH;
    //                i++;
    //            }
    //        }
    //    },
    //    reduce: function (x, y) {
    //        if (typeof x !== Types.CONSTANTS.NUMBER) x = 0;
    //        if (typeof y !== Types.CONSTANTS.NUMBER) y = 0;
    //        if (this.isEmpty()) return;
    //        var b, pathData, i = 0;
    //        b = this.bounds();
    //        pathData = this.data;
    //        while (i < pathData.length) {
    //            if (pathData[i].point.x > 0) pathData[i].point.x -= x;
    //            if (pathData[i].point.y > 0) pathData[i].point.y -= y;
    //            i++;
    //        }
    //    },
    //    extend: function (x, y) {
    //        if (typeof x !== Types.CONSTANTS.NUMBER) x = 0;
    //        if (typeof y !== Types.CONSTANTS.NUMBER) y = 0;
    //        if (this.isEmpty()) return;
    //        var b, pathData, i = 0;
    //        b = this.bounds();
    //        pathData = this.data;
    //        while (i < pathData.length) {
    //            if (pathData[i].point.x > 0) pathData[i].point.x += x;
    //            if (pathData[i].point.y > 0) pathData[i].point.y += y;
    //            i++;
    //        }
    //    },
    //    inflate: function (x, y) {
    //        if (typeof x !== Types.CONSTANTS.NUMBER) x = 0;
    //        if (typeof y !== Types.CONSTANTS.NUMBER) y = 0;
    //        if (this.isEmpty()) return;
    //        var b, pathData, i = 0;
    //        b = this.bounds();
    //        pathData = this.data;
    //        while (i < pathData.length) {
    //            if (pathData[i].point.x > b.width() * 0.5) pathData[i].point.x += x;
    //            else pathData[i].point.x -= x;
    //            if (pathData[i].point.y > b.height() * 0.5) pathData[i].point.y += y;
    //            else pathData[i].point.y -= y;
    //            i++;
    //        }
    //    },
    //    destroy: function () {
    //        this.startPoint.destroy();
    //        this.startPoint = null;
    //        //this.onChange.destroy();
    //        //this.onChange=null;
    //        this._owner = null;
    //        this.data.destroy();
    //        this.data = null;
    //        this.originalBounds.destroy();
    //        this.originalBounds = null;
    //    },
    //    updateOwner: function () {
    //        if (this._owner) this._owner.update();
    //    }
    //    //#endregion
    //});
    ////#endregion
    ////#region Component
    //$j.classes.Component = $j.classes.Bindable.extend("Component", {
    //    init: function (owner, props) {
    //        props = !props ? {} : props;
    //        var t = new Date().getTime();
    //        if (owner) {
    //            this._inherited();
    //            //#region Private
    //            this._componentIndex = -1;
    //            this._owner = owner;
    //            this._owners = [];
    //            if (!$j.isHTMLRenderer()) {
    //                this.left = 0;
    //                this.top = 0;
    //            }
    //            $j.classes.newCollection(this, this, $j.classes.Component, "_components");
    //            this._loading = true;
    //            this._destroying = false;
    //            this._designing = false;
    //            this._updating = false;
    //            this._designInstance = false;
    //            if ($j.isHTMLRenderer()) {
    //                this._HTMLElement = null;
    //                this._HTMLElementStyle = null;
    //                this._cssBorder = new $j.classes.Rect;
    //            }
    //            this._internalId = String.uniqueId();
    //            this._component = true;
    //            this._inForm = (this instanceof $j.classes.BaseWindow) ? false : props._inForm ? props._inForm : true;
    //            //#endregion
    //            this.app = null;
    //            this.form = null;
    //            this.name = String.EMPTY;
    //            if (owner instanceof $j.classes.Application) {
    //                this.app = owner;
    //                this.app._windows.push(this);
    //            } else this.app = owner.app;
    //            if (owner instanceof $j.classes.Component) {
    //                this.form = owner.form;
    //                owner.insertComponent(this);
    //            } else this.form = this;
    //            //this.tag=null;
    //            if (owner instanceof $j.classes.Component) {
    //                this._owners.addRange(owner._owners);
    //                this._owners.push(owner);
    //            }
    //            this.visible = props.visible ? props.visible : true;
    //            // à modifier avec getOwnPropertyNames
    //            for (var prop in props) {
    //                if (this.hasOwnProperty(prop)) {
    //                    if (prop === "name") this.setName(props[prop]);
    //                    else this[prop] = props[prop];
    //                }
    //            }
    //            $j.tools.Debugger.log(arguments, this, t);
    //        }
    //    },
    //    //#region Setters
    //    getComponentIndex: function () {
    //        if (this._owner && (this._owner._components.length > 0)) return this._owner._components.indexOf(this);
    //        else return -1;
    //    },
    //    setComponentIndex: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
    //        if (newValue < 0) newValue = 0;
    //        if (this._owner) {
    //            var i = this._owner._components.indexOf(this);
    //            if (i >= 0) {
    //                var count = this._owner._components.length;
    //                if (newValue < 0) newValue = 0;
    //                if (newValue >= count) newValue = count - 1;
    //                if (newValue !== i) {
    //                    this._owner._components.splice(i, 1);
    //                    this._owner._components.insert(newValue, this);
    //                }
    //            }
    //        }
    //    },
    //    setName: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.STRING) return;
    //        if (newValue.trim() === String.EMPTY) return;
    //        if (this.name !== newValue) {
    //            //if ((newValue!==String.EMPTY) && !$j.tools.isValidIdent(newValue)) throw $j.errMsg.INVALIDNAME.format(newValue);
    //            //if (this.owner instanceof $j.classes.Component) this.owner.validateRename(this,this.name,newValue);
    //            //else this.validateRename(null,this.name,newValue);
    //            if (this.form !== this) {
    //                if (this.form) {
    //                    if (this.form[this.name]) delete this.form[this.name];
    //                }
    //            }
    //            ////if ((this.owner instanceof $j.classes.Control)&&(this instanceof $j.classes.Control)){
    //            ////  if (this.owner.controlsName.indexOf(this.name)>-1) this.owner.controlsName.remove(this.name);
    //            ////}
    //            //this.app.removeName(this);
    //            this.name = newValue;
    //            //this.app.addName(this);
    //            //if (this instanceof $j.classes.Control) this.objName=newValue;
    //            if (this.form !== this && this !== this.form._layout && this !== this.form._content) {
    //                if (this.form) {
    //                    if (!this.form[this.name]) this.form[this.name] = this;
    //                }
    //            }
    //            //if ((this.owner instanceof $j.classes.Control)&&(this instanceof $j.classes.Control)){
    //            //  if (this.owner.controlsName.indexOf(this.name)===-1) this.owner.controlsName.push(this.name);
    //            //}
    //        }
    //    },
    //    //#endregion
    //    //#region Methods
    //    destroy: function () {
    //        var t = new Date().getTime();
    //        this.destroying();
    //        this.destroyComponents();
    //        //if (this instanceof $j.classes.Control) {
    //        if (this._HTMLElement) this._HTMLElement.parentNode.removeChild(this._HTMLElement);
    //        if ($j.isHTMLRenderer()) {
    //            this._HTMLElement = null;
    //            this._HTMLElementStyle = null;
    //        }
    //        //}
    //        if (this._owner) {
    //            if (!(this._owner instanceof $j.classes.Application)) this._owner.remove(this);
    //        }
    //        $j.tools.Debugger.log(arguments, this, t);
    //        this.app = null;
    //        this.form = null;
    //        this.name = null;
    //        this.left = null;
    //        this.top = null;
    //        this.tag = null;
    //        this._componentIndex = null;
    //        this._owner = null;
    //        if (this._owners) this._owners.destroy();
    //        this._owners = null;
    //        this._components = null;
    //        this._loading = null;
    //        this._destroying = null;
    //        this._designing = null;
    //        this._updating = null;
    //        this._designInstance = null;
    //        if ($j.isHTMLRenderer()) {
    //            if (this._cssBorder) this._cssBorder.destroy();
    //            this._cssBorder = null;
    //        }
    //        this._internalId = null;
    //        this._inherited();
    //    },
    //    loaded: function () {
    //        var t = new Date().getTime(), data;
    //        if ($j.tools.Debugger.debug) console.log(this._ClassName + " loaded");
    //        this._loading = false;
    //        for (var i = 0, l = this._components.length; i < l; i++) {
    //            if (this._components[i].loaded) {
    //                if (this._components[i]._loading) this._components[i].loaded();
    //            }
    //        }
    //        if (this._HTMLElement) {
    //            data = this._HTMLElement.dataset.popupmenu;
    //            if (data) {
    //                if (this.form[data]) {
    //                    if (this.form[data] instanceof $j.classes.PopupMenu) {
    //                        this.popupMenu = this.form[data];
    //                        this.popupMenu._control = this;
    //                    }
    //                }
    //            }
    //        }
    //        $j.tools.Debugger.log(arguments, this, t);
    //        if ($j.isHTMLRenderer()) this.getCSSBorder();
    //        if (this.hasOwnProperty("action")) {
    //            if (this.form[this.action]) {
    //                this.setAction(this.form[this.action]);
    //            } else if (typeof this.action === Types.CONSTANTS.STRING) {
    //                if (this.action.contains(".")) {
    //                    data = this.action.split(".");
    //                    if (this.app[data.first()]) {
    //                        data = this.app[data.first()][data.last()];
    //                        if (data) {
    //                            this.setAction(data);
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //        //if (this._inForm&&this.form!==this) {
    //        //  this.form._controls.remove(this);
    //        //  this.form._controls.push(this);
    //        //}
    //    },
    //    insert: function (component) {
    //        var t = new Date().getTime();
    //        if (this._components.indexOf(component) > -1) return;
    //        this._components.push(component);
    //        component.app = this.app;
    //        component._owner = this;
    //        if (this.form !== component) {
    //            if (component._inForm && this.form._controls.indexOf(component) === -1) {
    //                this.form._controls.push(component);
    //            }
    //        }
    //        $j.tools.Debugger.log(arguments, this, t);
    //    },
    //    remove: function (component) {
    //        var t = new Date().getTime();
    //        if (this._components.indexOf(component) === -1) return;
    //        var idx = this._components.indexOf(component);
    //        if (idx > -1) this._components.removeAt(idx);
    //        if (this.form[component.name]) {
    //            if (component.xmlNode) $j.tools.xml.delNode(component.xmlNode);
    //            this.form[component.name] = null;
    //            delete this.form[component.name];
    //        }
    //        idx = this.form._controls.indexOf(component);
    //        if (idx > -1) this.form._controls.removeAt(idx);
    //        $j.tools.Debugger.log(arguments, this, t);
    //    },
    //    insertComponent: function (component) {
    //        var t = new Date().getTime();
    //        if (component._owner !== component.app) component._owner.remove(component);
    //        this.insert(component);
    //        $j.tools.Debugger.log(arguments, this, t);
    //    },
    //    getComponent: function (index) {
    //        if ((this._components.length === 0) || (index >= this._components.length)) {
    //            throw $j.errMsg.LISTINDEXERROR.format(index);
    //        }
    //        return this._components[index];
    //        $j.tools.Debugger.log(arguments, this, t);
    //    },
    //    beforeDestruction: function () {
    //        var t = new Date().getTime();
    //        if (!this._destroying) this.destroying();
    //        $j.tools.Debugger.log(arguments, this, t);
    //    },
    //    destroyComponents: function () {
    //        var t = new Date().getTime();
    //        var instance;
    //        if (this._components) {
    //            while (this._components.length > 0) {
    //                instance = this._components.last();
    //                this.remove(instance);
    //                instance.destroy();
    //            }
    //        }
    //        $j.tools.Debugger.log(arguments, this, t);
    //    },
    //    destroying: function () {
    //        var t = new Date().getTime();
    //        if (!this._destroying) {
    //            this._destroying = true;
    //            if (this._components) {
    //                for (var i = 0, l = this._components.length; i < l; i++) this._components[i].destroying();
    //            }
    //        }
    //        $j.tools.Debugger.log(arguments, this, t);
    //    },
    //    findComponent: function (name) {
    //        var t = new Date().getTime();
    //        if (name !== String.EMPTY)
    //            if (this._components) {
    //                for (var i = 0, l = this._components.length; i < l; i++) {
    //                    var result = this._components[i];
    //                    if (result.name === name) return result;
    //                }
    //            }
    //        $j.tools.Debugger.log(arguments, this, t);
    //        return null;
    //    },
    //    updating: function () {
    //        var t = new Date().getTime();
    //        this._updating = true;
    //        $j.tools.Debugger.log(arguments, this, t);
    //    },
    //    updated: function () {
    //        var t = new Date().getTime();
    //        this._updating = false;
    //        $j.tools.Debugger.log(arguments, this, t);
    //    },
    //    validateRename: function (component, curName, newName) {
    //        var t = new Date().getTime();
    //        if (this.designing && this._owner) {
    //            if (!(this._owner instanceof $j.classes.App)) this._owner.validateRename(component, curName, newName);
    //        }
    //        $j.tools.Debugger.log(arguments, this, t);
    //    },
    //    setChildOrder: function (child, order) { },
    //    beginUpdate: function () { },
    //    endUpdate: function () { },
    //    getTemplate: function () {
    //        var html = $j.classes.getTemplate(this._ClassName), a = html.split("{name}");
    //        html = a.join(this.name);
    //        a = html.split("{internalId}");
    //        html = a.join(this._internalId);
    //        return html;
    //    },
    //    getHTMLElement: function (id) {
    //        var data;
    //        this._HTMLElement = $j.doc.getElementById(id);
    //        if (this._HTMLElement) {
    //            this._HTMLElementStyle = this._HTMLElement.style;
    //            if (!this._HTMLElement.jsObj) this._HTMLElement.jsObj = this;
    //            data = this._HTMLElement.dataset.name;
    //            if (data) this.setName(data);
    //        }
    //        if (!this._internalId || this._internalId !== id) {
    //            this._internalId = id;
    //        }
    //    },
    //    getChildsHTMLElement: function () { },
    //    updateFromHTML: function () { },
    //    clientToDocument: function () {
    //        var result = new $j.classes.Point(0, 0), bRect = this._HTMLElement.getBoundingClientRect();
    //        result.setValues(bRect.left, bRect.top);
    //        return result;
    //    },
    //    getCSSBorder: function () {
    //        if (this._HTMLElement) {
    //            this._cssBorder.left = parseInt(getComputedStyle(this._HTMLElement).borderLeftWidth, 10);
    //            this._cssBorder.top = parseInt(getComputedStyle(this._HTMLElement).borderTopWidth, 10);
    //            this._cssBorder.right = parseInt(getComputedStyle(this._HTMLElement).borderRightWidth, 10);
    //            this._cssBorder.bottom = parseInt(getComputedStyle(this._HTMLElement).borderBottomWidth, 10);
    //        }
    //    },
    //    getProperties: function () {
    //        var props;
    //        props = $j.tools.getPropertiesFromObject(this);
    //        if (!this._component) {
    //            prop = "width";
    //            props.push({ "property": prop, "value": this._HTMLElement.offsetWidth, "categories": $j.classes.getPropertyCategories(prop) });
    //            prop = "height";
    //            props.push({ "property": prop, "value": this._HTMLElement.offsetHeight, "categories": $j.classes.getPropertyCategories(prop) });
    //        }
    //        prop = "left";
    //        props.push({ "property": prop, "value": this._HTMLElement.offsetLeft, "categories": $j.classes.getPropertyCategories(prop) });
    //        prop = "top";
    //        props.push({ "property": prop, "value": this._HTMLElement.offsetTop, "categories": $j.classes.getPropertyCategories(prop) });
    //        return props;
    //    },
    //    getEvents: function () {
    //        var props = [];
    //        for (prop in this) {
    //            if (prop.startsWith('on') && (this[prop] instanceof $j.classes.NotifyEvent)) {
    //                props.push({ "event": prop, "value": this[prop] });
    //            }
    //        }
    //        return props;
    //    },
    //    moveTo: function (x, y) {
    //        var deltaX = 0, deltaY = 0;
    //        if (!this._HTMLElementStyle) return;
    //        if (typeof x !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof y !== Types.CONSTANTS.NUMBER) return;
    //        if (!x) return;
    //        if (!y) return;
    //        deltaX = x - this._HTMLElement.offsetLeft;
    //        deltaY = y - this._HTMLElement.offsetTop;
    //        //if (this instanceof $j.classes.Control) {
    //        //  this._boundingClientRect.offset(deltaX,deltaY);
    //        //  this.offsetChildsBy(deltaX,deltaY);
    //        //}
    //        this._HTMLElementStyle.left = x + $j.types.CSSUnits.PX;
    //        this._HTMLElementStyle.top = y + $j.types.CSSUnits.PX;
    //    },
    //    isVisible: function () {
    //        var visible
    //        visible = this.visible;
    //        // si le composant dépasse de son parent
    //        if ((this._HTMLElement.offsetLeft + this._HTMLElement.offsetWidth < 0) || (this._HTMLElement.offsetLeft > this._owner._HTMLElement.offsetWidth) ||
    //           (this._HTMLElement.offsetTop + this._HTMLElement.offsetHeight < 0) || (this._HTMLElement.offsetTop > this._owner._HTMLElement.offsetHeight)) visible = false;
    //        if (visible) {
    //            for (var i = this._owners.length - 1; i >= 0; i--) {
    //                visible = visible && this._owners[i].visible;
    //            }
    //        }
    //        return visible;
    //    },
    //    bindEventToHTML: function (eventName) {
    //        if (typeof eventName !== Types.CONSTANTS.STRING) return;
    //        var data = this._HTMLElement.dataset[eventName.toLowerCase()];
    //        if (data) {
    //            if (typeof this.form[data] === Types.CONSTANTS.FUNCTION) this[eventName].addListener(this.form[data]);
    //            else if (typeof data === Types.CONSTANTS.STRING) {
    //                if (data !== String.EMPTY) this[eventName].addListener(new Function(data));
    //            }
    //        }
    //
    //    },
    //    getZOrder: function () {
    //        if (!this._owner) return -1;
    //        if (!this._HTMLElement) return -1;
    //        return this._owner._components.length + 1;
    //    }
    //
    //
    //    //#endregion
    //});
    ////#endregion
    ////#region SizeConstraints
    //$j.classes.SizeConstraints = Class.extend("SizeConstraints", {
    //    init: function (control) {
    //        if (!(control instanceof $j.classes.Control)) return;
    //        //#region Private properties
    //        this._control = control;
    //        //#endregion
    //        this.maxHeight = 0;
    //        this.maxWidth = 0;
    //        this.minHeight = 0;
    //        this.minWidth = 0;
    //        if (control) {
    //            this.onChange = new $j.classes.NotifyEvent(control);
    //            this.setControl = function (newValue) {
    //                if (!(newValue instanceof $j.classes.Control)) return;
    //                if (newValue !== this._control) {
    //                    this._control = newValue;
    //                    this.onChange.invoke();
    //                }
    //            };
    //            this.setMaxHeight = function (newValue) {
    //                if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
    //                if (newValue !== this.maxHeight) {
    //                    this.maxHeight = newValue;
    //                    this.onChange.invoke();
    //                }
    //            };
    //            this.setMaxWidth = function (newValue) {
    //                if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
    //                if (newValue !== this.maxWidth) {
    //                    this.maxWidth = newValue;
    //                    this.onChange.invoke();
    //                }
    //            };
    //            this.setMinHeight = function (newValue) {
    //                if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
    //                if (newValue !== this.minHeight) {
    //                    this.minHeight = newValue;
    //                    this.onChange.invoke();
    //                }
    //            };
    //            this.setMinWidth = function (newValue) {
    //                if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
    //                if (newValue !== this.minWidth) {
    //                    this.minWidth = newValue;
    //                    this.onChange.invoke();
    //                }
    //            };
    //        }
    //    },
    //    //#region Methods
    //    isEmpty: function () { return (this.maxHeight === 0) && (this.maxWidth === 0) && (this.minHeight === 0) && (this.minWidth === 0); },
    //    setConstraints: function (index, value) {
    //        if (typeof index !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof value !== Types.CONSTANTS.NUMBER) return;
    //        switch (index) {
    //            case 0:
    //                if (value !== this.maxHeight) {
    //                    this.maxHeight = value;
    //                    if ((value > 0) && (value < this.minHeight)) this.minHeight = value;
    //                    this.change();
    //                }
    //                break;
    //            case 1:
    //                if (value !== this.maxWidth) {
    //                    this.maxWidth = value;
    //                    if ((value > 0) && (value < this.minWidth)) this.minWidth = value;
    //                    this.change();
    //                }
    //                break;
    //            case 2:
    //                if (value !== this.minHeight) {
    //                    this.minHeight = value;
    //                    if ((this.maxHeight > 0) && (value > this.maxHeight)) this.maxHeight = value;
    //                    this.change();
    //                }
    //                break;
    //            case 3:
    //                if (value !== this.minWidth) {
    //                    this.minWidth = value;
    //                    if ((this.maxWidth > 0) && (value > this.maxWidth)) this.maxWidth = value;
    //                    this.change();
    //                }
    //                break;
    //        }
    //    },
    //    change: function () { this.onChange.invoke(); },
    //    setValues: function (minWidth, minHeight, maxWidth, maxHeight) {
    //        if (typeof minWidth !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof minHeight !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof maxWidth !== Types.CONSTANTS.NUMBER) return;
    //        if (typeof maxHeight !== Types.CONSTANTS.NUMBER) return;
    //        this.maxHeight = maxHeight;
    //        this.maxWidth = maxWidth;
    //        this.minHeight = minHeight;
    //        this.minWidth = minWidth;
    //    },
    //    assignTo: function (dest) {
    //        if (dest instanceof $j.classes.SizeConstraints) {
    //            dest.minHeight = this.minHeight;
    //            dest.maxHeight = this.maxHeight;
    //            dest.minWidth = this.minWidth;
    //            dest.maxWidth = this.maxWidth;
    //            dest.change();
    //        }
    //    },
    //    destroy: function () {
    //        this._control = null;
    //        this.maxHeight = null;
    //        this.maxWidth = null;
    //        this.minHeight = null;
    //        this.minWidth = null;
    //        this.onChange.destroy();
    //        this.onChange = null;
    //    },
    //    equals: function (sizeConstraints) {
    //        return this.maxHeight === sizeConstraints.maxHeight && this.maxWidth === sizeConstraints.maxWidth && this.minHeight === sizeConstraints.minHeight && this.minWidth === sizeConstraints.minWidth;
    //    },
    //    getProperties: function () {
    //        var props;
    //        props = $j.tools.getPropertiesFromObject(this);
    //        return props;
    //    }
    //    //#endregion
    //});
    ////#endregion
    ///*/#region CSSResource
    //$j.classes.CSSResource=Class.extend({
    //  _ClassName: "CSSResource"
    //  //#region Methods
    //  //#endregion
    //});
    ////#endregion*/
    ///*/#region BaseEffect
    //$j.classes.BaseEffect=$j.classes.Component.extend({
    //  _ClassName: "BaseEffect",
    //  init: function(owner) {
    //    this.enabled=false;
    //    this.trigger=String.EMPTY;
    //    if(owner)) {
    //      this._inherited(owner);
    //      this.prepareBeforePaint=false;
    //      this.applyOnChilds=false;
    //      this.disablePaint=false;
    //      this.setEnabled=function(newValue) {
    //        if(typeof newValue!==Types.CONSTANTS.BOOLEAN) return;
    //        if(this.enabled!==newValue) {
    //          var lastRect=this._owner.screenRect();
    //          this.enabled=newValue;
    //          this._owner.form.addControlToRedraw(this._owner);
    //        }
    //      };
    //      this.setTrigger=function(newValue) {
    //        if(typeof newValue!==Types.CONSTANTS.STRING) return;
    //        if(this.trigger!==newValue) {
    //          this.trigger=newValue;
    //        }
    //      };
    //    }
    //  },
    //  //#region Methods
    //  rect: function(rect) { },
    //  applyEffect: function() { },
    //  applyTrigger: function(instance,trigger) {
    //    var startValue=false,line,setter,prop,value;
    //    if(!instance) return;
    //    if(this.trigger.toLowerCase().indexOf(trigger.toLowerCase())===-1) return;
    //    line=this.trigger;
    //    setter=line.split(';');
    //    startValue=false;
    //    while(setter.length>0) {
    //      prop=setter[0].split('=')[0];
    //      value=setter[0].split('=')[1];
    //      if(instance.hasOwnProperty(prop)) {
    //        startValue=instance[prop].toString().toLowerCase()===value.toLowerCase();
    //      }
    //      setter.removeAt(0);
    //    }
    //    this.enabled=startValue;
    //  },
    //  destroy:function() {
    //    this.enabled=null;
    //    this.trigger=null;
    //    this.prepareBeforePaint=null;
    //    this.applyOnChilds=null;
    //    this.disablePaint=null;
    //  }
    //  //#endregion
    //});
    ////#endregion*/
    ////#region AnimatedCursor
    //$j.classes.AnimatedCursor = Class.extend("AnimatedCursor", {
    //    init: function () {
    //        //#region Private properties
    //        this._HTMLElement = null;
    //        this._maxFrame = null;
    //        this._curFrame = null;
    //        this._className = null;
    //        this._iterationBetweenFrames = 0;
    //        this._iteration = 0;
    //        //#endregion
    //    },
    //    //#region Methods
    //    animate: function (elapsedTime) {
    //        if (this._iterationBetweenFrames > 0) {
    //            if (this._iteration < this._iterationBetweenFrames) {
    //                this._iteration++;
    //                //console.log("frame skipped");
    //                return;
    //            }
    //        }
    //        //console.log("rendering frame:"+this._curFrame);
    //        $j.CSS.removeClass(this._HTMLElement, this._className + this._curFrame);
    //        this._curFrame++;
    //        if (this._curFrame > this._maxFrame) this._curFrame = 0;
    //        $j.CSS.addClass(this._HTMLElement, this._className + this._curFrame);
    //        this._iteration = 0;
    //    },
    //    initAnimation: function (htmlObj, className) {
    //        var theme;
    //        if (htmlObj.jsObj) theme = htmlObj.jsObj.form.getThemeName();
    //        else if (htmlObj === $j.doc.body) theme = $j.doc.body.className;
    //        this._HTMLElement = htmlObj;
    //        this._className = className;
    //        this._curFrame = 0;
    //        $j.CSS.removeClass(this._HTMLElement, this._className);
    //        $j.CSS.addClass(this._HTMLElement, this._className + this._curFrame);
    //        this._maxFrame = ~~$j.CSS.getCSSValue("." + theme + "." + this._className + this._curFrame, $j.browser.getVendorPrefixedCssProperty("animation-iteration-count"), null, theme);
    //        this._iterationBetweenFrames = parseInt($j.CSS.getCSSValue("." + theme + "." + this._className + this._curFrame, $j.browser.getVendorPrefixedCssProperty("animation-duration"), null, theme), 10) | 0;
    //        $j.looper.addListener(this, "animate");
    //    },
    //    stopAnimation: function () {
    //        $j.looper.removeListener(this);
    //        $j.CSS.removeClass(this._HTMLElement, this._className + this._curFrame);
    //    }
    //    //#endregion Methods
    //});
    ////#endregion
    ////#region DataSet
    //$j.classes.DataSet = $j.classes.Component.extend("DataSet", {
    //    init: function (owner, props) {
    //        props = !props ? {} : props;
    //        if (owner) {
    //            this._inherited(owner, props);
    //            this.addBindableProperties(["active", "isOpen"]);
    //            //#region Private
    //            this._datas = null;
    //            this._cursorIdx = -1;
    //            this._cursor = null;
    //            this._nbrFields = 0;
    //            this._nbrRecords = 0;
    //            this._keyValues = String.EMPTY;
    //            //#endregion
    //            this.dataSource = null;
    //            this.active = false;
    //            this.activeOnLoad = true;
    //            this.isOpen = false;
    //            this.keyFields = String.EMPTY;
    //        }
    //    },
    //    //#region Setters
    //    setKeyFields: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.STRING) return;
    //        if (this.keyFields !== newValue) {
    //            this.keyFields = newValue;
    //            this.dataSource.refreshControls();
    //        }
    //    },
    //    setActive: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.BOOLEAN) return;
    //        if (this.active !== newValue) {
    //            this.active = newValue;
    //            if (this.active) this.open();
    //            else this.close();
    //            this._cursorIdx = 0;
    //            this.getKeyValues();
    //        }
    //    },
    //    //#endregion
    //    //#region Methods
    //    open: function () {
    //        if (this._datas) {
    //            this._cursorIdx = 0;
    //            this._cursor = this._datas[this._cursorIdx];
    //            this.isOpen = true;
    //            this.dataSource.refreshControls();
    //        }
    //    },
    //    close: function () {
    //        this.isOpen = false;
    //        this._cursorIdx = -1;
    //        this._keyValues = String.EMPTY;
    //        this.dataSource.refreshControls();
    //    },
    //    next: function () {
    //        this._cursorIdx++;
    //        if (this._cursorIdx > this._nbrRecords) this._cursorIdx = this._nbrRecords - 1;
    //        this.getKeyValues();
    //        this.dataSource.refreshControls();
    //    },
    //    prev: function () {
    //        this._cursorIdx--;
    //        if (this._cursorIdx < 0) this._cursorIdx = 0;
    //        this.getKeyValues();
    //        this.dataSource.refreshControls();
    //    },
    //    first: function () {
    //        this._cursorIdx = 0;
    //        this.getKeyValues();
    //        this.dataSource.refreshControls();
    //    },
    //    last: function () {
    //        this._cursorIdx = this._nbrRecords - 1;
    //        this.getKeyValues();
    //        this.dataSource.refreshControls();
    //    },
    //    hasKeyfield: function () {
    //        return !this.keyFields.isEmpty();
    //    },
    //    getKeyValues: function () {
    //        var keyFields, i, l, cursor;
    //        if (this.keyFields !== String.EMPTY) {
    //            keyFields = this.keyFields.split(",");
    //            cursor = this._datas[this._cursorIdx];
    //            this._keyValues = String.EMPTY;
    //            for (i = 0, l = keyFields.length; i < l; i++) {
    //                if (cursor[keyFields[i]]) {
    //                    if (i > 0) this._keyValues += "|";
    //                    this._keyValues += cursor[keyFields[i]];
    //                }
    //            }
    //        }
    //    },
    //    goToCurrentCursor: function () {
    //        var keyValues = this._keyValues, keyValue = String.EMPTY, keyFields = this.keyFields.split(","), idx = -1, currentCursor = this._datas.filter(
    //          function (e, i, a) {
    //              var ret = false;
    //              keyValue = String.EMPTY;
    //              for (var j = 0, l = keyFields.length; j < l; j++) {
    //                  if (j > 0) keyValue += "|";
    //                  keyValue += e[keyFields[j]];
    //              }
    //              if (keyValue === keyValues) {
    //                  ret = true;
    //                  idx = i;
    //              }
    //              return ret;
    //          }
    //        );
    //        this._cursorIdx = idx;
    //        this._cursor = this._datas[this._cursorIdx];
    //    },
    //    sortByString: function (col, order) {
    //        return function (a, b) {
    //            var fieldsNames = Object.keys(a);
    //            a = a[fieldsNames[col]];
    //            fieldsNames = Object.keys(b);
    //            b = b[fieldsNames[col]];
    //            if (order === $j.types.sortedOrders.ASC) {
    //                return a === b ? 0 : (a < b ? -1 : 1);
    //            } else {
    //                return a === b ? 0 : (a < b ? 1 : -1);
    //            }
    //        }
    //    },
    //    sortByDate: function (col, order) {
    //        return function (a, b) {
    //            var fieldsNames = Object.keys(a);
    //            a = a[fieldsNames[col]];
    //            fieldsNames = Object.keys(b);
    //            b = b[fieldsNames[col]];
    //            if (order === $j.types.sortedOrders.ASC) {
    //                return a === b ? 0 : (a < b ? -1 : 1);
    //            } else {
    //                return a === b ? 0 : (a < b ? 1 : -1);
    //            }
    //        }
    //    },
    //    sortByNumber: function (col, order) {
    //        return function (a, b) {
    //            var fieldsNames = Object.keys(a);
    //            a = parseFloat(a[fieldsNames[col]]);
    //            fieldsNames = Object.keys(b);
    //            b = parseFloat(b[fieldsNames[col]]);
    //            if (order === $j.types.sortedOrders.ASC) {
    //                return a === b ? 0 : (a < b ? -1 : 1);
    //            } else {
    //                return a === b ? 0 : (a < b ? 1 : -1);
    //            }
    //        }
    //    },
    //    sortByBoolean: function (col, order) {
    //        return function (a, b) {
    //            var fieldsNames = Object.keys(a);
    //            if (typeof a[fieldsNames[col]] === Types.CONSTANTS.BOOLEAN) a = a[fieldsNames[col]];
    //            else a = Types.CONSTANTS.strToBool(a[fieldsNames[col]].toString());
    //            fieldsNames = Object.keys(b);
    //            if (typeof b[fieldsNames[col]] === Types.CONSTANTS.BOOLEAN) b = b[fieldsNames[col]];
    //            else b = Types.CONSTANTS.strToBool(b[fieldsNames[col]].toString());
    //            if (order === $j.types.sortedOrders.ASC) {
    //                return a === b ? 0 : (a < b ? -1 : 1);
    //            } else {
    //                return a === b ? 0 : (a < b ? 1 : -1);
    //            }
    //        }
    //    },
    //    destroy: function () {
    //        if (this._datas) this._datas.destroy();
    //        this._datas = null;
    //        this._cursorIdx = null;
    //        this._cursor = null;
    //        this._nbrFields = null;
    //        this._nbrRecords = null;
    //        this._keyValues = null;
    //        this.dataSource = null;
    //        this.active = false;
    //        this.activeOnLoad = null;
    //        this.isOpen = null;
    //        this.keyFields = null;
    //    }
    //    //#endregion
    //});
    ////#endregion
    ////#region Action
    //$j.classes.Action = $j.classes.Component.extend("Action", {
    //    init: function (owner, props) {
    //        props = !props ? {} : props;
    //        if (owner) {
    //            //#region Private
    //            this._targets = [];
    //            this._propertiesToUpdate = ["caption", "isChecked", "enabled", "groupIndex", "hint", "imageIndex", "shortCut", "visible", "autoCheck"];
    //            //#endregion
    //            this.caption = String.EMPTY;
    //            this.isChecked = false;
    //            this.enabled = true;
    //            this.groupIndex = 0;
    //            this.hint = String.EMPTY;
    //            this.imageIndex = -1;
    //            this.shortCut = String.EMPTY;
    //            this.visible = true;
    //            this.autoCheck = false;
    //            this._inherited(owner, props);
    //            this.addBindableProperties(["caption", "isChecked", "enabled", "imageIndex", "visible", "autoCheck"]);
    //            this.onHint = new $j.classes.NotifyEvent(this);
    //            this.onChange = new $j.classes.NotifyEvent(this);
    //            this.onExecute = new $j.classes.NotifyEvent(this);
    //            if (props.onExecute) {
    //                if (this.form[props.onExecute]) this.onExecute.addListener(this.form[props.onExecute]);
    //                else if (typeof props.onExecute === Types.CONSTANTS.STRING) this.onExecute.addListener(new Function(props.onExecute));
    //            }
    //            this.onUpdate = new $j.classes.NotifyEvent(this);
    //        }
    //    },
    //    //#region Setters
    //    setCaption: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.STRING) return;
    //        if (this.caption !== newValue) {
    //            this.caption = newValue;
    //            this.change();
    //        }
    //    },
    //    setIsChecked: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.BOOLEAN) return;
    //        if (this.isChecked !== newValue) {
    //            this.isChecked = newValue;
    //            this.change();
    //        }
    //    },
    //    setEnabled: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.BOOLEAN) return;
    //        if (this.enabled !== newValue) {
    //            this.enabled = newValue;
    //            this.change();
    //        }
    //    },
    //    setGroupIndex: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
    //        if (this.groupIndex !== newValue) {
    //            this.groupIndex = newValue;
    //            this.change();
    //        }
    //    },
    //    setHint: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.STRING) return;
    //        if (this.hint !== newValue) {
    //            this.hint = newValue;
    //            this.change();
    //        }
    //    },
    //    setImageIndex: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
    //        if (this.imageIndex !== newValue) {
    //            this.imageIndex = newValue;
    //            this.change();
    //        }
    //    },
    //    setShortCut: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.STRING) return;
    //        if (this.shortCut !== newValue) {
    //            this.shortCut = newValue;
    //            this.change();
    //        }
    //    },
    //    setVisible: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.BOOLEAN) return;
    //        if (this.visible !== newValue) {
    //            this.visible = newValue;
    //            this.change();
    //        }
    //    },
    //    setAutoCheck: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.BOOLEAN) return;
    //        if (this.autoCheck !== newValue) {
    //            this.autoCheck = newValue;
    //            this.change();
    //        }
    //    },
    //    //#endregion
    //    //#region Methods
    //    execute: function () {
    //        if (this.onExecute.hasListener()) this.onExecute.invoke();
    //    },
    //    registerChanges: function (component) {
    //        if (this._targets.indexOf(component) === -1) {
    //            this._targets.push(component);
    //            this.updateTarget(component);
    //        }
    //    },
    //    unRegisterChanges: function (component) {
    //        if (this._targets.indexOf(component) > -1) this._targets.remove(component);
    //    },
    //    updateTarget: function (target) {
    //        for (var j = 0, m = this._propertiesToUpdate.length; j < m; j++) {
    //            if (target.hasOwnProperty(this._propertiesToUpdate[j])) {
    //                if (typeof target["set" + this._propertiesToUpdate[j].firstCharUpper()] === Types.CONSTANTS.FUNCTION) target["set" + this._propertiesToUpdate[j].firstCharUpper()](this[this._propertiesToUpdate[j]]);
    //            }
    //        }
    //    },
    //    change: function () {
    //        for (var i = 0, l = this._targets.length; i < l; i++) {
    //            this.updateTarget(this._targets[i]);
    //        }
    //    },
    //    destroy: function () {
    //        for (var i = 0, l = this._targets.length; i < l; i++) {
    //            this._targets[i].action = null;
    //        }
    //        this._targets.clear();
    //        this._targets = null;
    //        this._inherited();
    //    }
    //    //#endregion
    //});
    ////#endregion
    ////#region HitTest
    //$j.classes.HitTest = Class.extend("HitTest", {
    //    init: function (owner) {
    //        //#region Private
    //        this._owner = owner;
    //        //#endregion
    //        this.mouseDown = true;
    //        this.mouseMove = false;
    //        this.mouseUp = true;
    //        this.mouseWheel = false;
    //        this.mouseDblClick = false;
    //    },
    //    //#region Setters
    //    setMouseDown: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.BOOLEAN) return;
    //        if (this.mouseDown !== newValue) this.mouseDown = newValue;
    //    },
    //    setMouseMove: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.BOOLEAN) return;
    //        if (this.mouseMove !== newValue) this.mouseMove = newValue;
    //    },
    //    setMouseUp: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.BOOLEAN) return;
    //        if (this.mouseUp !== newValue) this.mouseUp = newValue;
    //    },
    //    setMouseWheel: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.BOOLEAN) return;
    //        if (this.mouseWheel !== newValue) this.mouseWheel = newValue;
    //    },
    //    setMouseDblClick: function (newValue) {
    //        if (typeof newValue !== Types.CONSTANTS.BOOLEAN) return;
    //        if (this.mouseDblClick !== newValue) this.mouseDblClick = newValue;
    //    },
    //    //#endregion
    //    //#region Methods
    //    equals: function (obj) {
    //        return this.mouseDown === obj.mouseDown &&
    //               this.mouseMove === obj.mouseMove &&
    //               this.mouseUp === obj.mouseUp &&
    //               this.mouseWheel === obj.mouseWheel &&
    //               this.mouseDblClick === obj.mouseDblClick;
    //    },
    //    getProperties: function () {
    //        var props;
    //        props = $j.tools.getPropertiesFromObject(this);
    //        return props;
    //    },
    //    destroy: function () {
    //        this._owner = null;
    //        this.mouseDown = null;
    //        this.mouseMove = null;
    //        this.mouseUp = null;
    //        this.mouseWheel = null;
    //        this.mouseDblClick = null;
    //    }
    //    //#endregion
    //});
    ////#endregion
    ////#region Scale
    //$j.classes.Scale = $j.classes.Position.extend("Scale", {
    //    init: function (owner) {
    //        this._inherited(new $j.classes.Point(1, 1), owner);
    //    }
    //});
    ////#endregion
    ////#region RotateCenter
    //$j.classes.RotateCenter = $j.classes.Position.extend("RotateCenter", {
    //    init: function (owner) {
    //        this._inherited(new $j.classes.Point(50, 50), owner);
    //    }
    //});
    ////#endregion
    ////#region Padding
    //$j.classes.Padding = $j.classes.Bounds.extend("Padding", {
    //    init: function (owner) {
    //        this._inherited(null, owner);
    //    }
    //});
    ////#endregion
    ////#region Padding
    //$j.classes.Margin = $j.classes.Bounds.extend("Margin", {
    //    init: function (owner) {
    //        this._inherited(null, owner);
    //    }
    //});
    ////#endregion
    ////#region Style
    ///*$j.classes.Style=Class.extend("Style",{
    //  init: function(parentClasses,props) {
    //    var keys,i,l,j,m;
    //    if (!Array.isArray(parentClasses)) parentClasses=[];
    //    if (!parentClasses.isEmpty()) {
    //      m=parentClasses.length;
    //      for (j=0;j<m;j++) {
    //        keys=Object.keys(parentClasses[j]);
    //        l=keys.length;
    //        for (i=0;i<l;i++) {
    //          this[keys[i]]=parentClasses[j][keys[i]];
    //        }
    //      }
    //    }
    //    if (props)) {
    //      keys=Object.keys(props);
    //      l=keys.length;
    //      for (i=0;i<l;i++) {
    //        this[keys[i]]=props[keys[i]];
    //      }
    //    }
    //  }
    //});*/
    ////#endregion
    ////#region StringList
    //$j.classes.StringList = Class.extend("StringList", {
    //    init: function (owner) {
    //        this.list = [];
    //        this.onChange = new $j.classes.NotifyEvent(this);
    //        this.owner = owner;
    //    },
    //    //#region Methods
    //    assign: function (source) {
    //        if (!(source instanceof $j.classes.StringList)) return;
    //        this.list.clear();
    //        this.list.addRange(source.list);
    //        this.onChange.invoke(this.owner);
    //    },
    //    getText: function () {
    //        return this.list.join("\n");
    //    },
    //    addText: function (s, fireEvent) {
    //        if (typeof s !== Types.CONSTANTS.STRING) return;
    //        if (!fireEvent) fireEvent = true;
    //        this.list.addRange(s.split("\n"));
    //        if (fireEvent) this.onChange.invoke(this.owner);
    //    },
    //    add: function (s) {
    //        if (typeof s !== Types.CONSTANTS.STRING) return;
    //        this.list.push(s);
    //        this.onChange.invoke(this.owner);
    //    },
    //    clear: function () {
    //        this.list.clear();
    //        this.onChange.invoke(this.owner);
    //    },
    //    remove: function (idx) {
    //        if (idx === -1 || idx > this.list.length - 1) return;
    //        this.list.removeAt(idx);
    //        this.onChange.invoke(this.owner);
    //    },
    //    exchange: function (idx, idx1) {
    //        if (idx === -1 || idx1 === -1) return;
    //        if (idx > this.list.length - 1 || idx1 > this.list.length - 1) return;
    //        var t = this.list[idx];
    //        this.list[idx] = this.list[idx1];
    //        this.list[idx1] = t;
    //        this.onChange.invoke(this.owner);
    //    },
    //    find: function (s, idx) {
    //    },
    //    indexOf: function (s) {
    //        if (typeof s !== Types.CONSTANTS.STRING) return -1;
    //        return this.list.indexOf(s);
    //    },
    //    insert: function (idx, s) {
    //        if (idx === -1 || idx > this.list.length - 1) return;
    //        if (typeof s !== Types.CONSTANTS.STRING) return;
    //        this.list.insert(idx, s);
    //        this.onChange.invoke(this.owner);
    //    },
    //    destroy: function () {
    //        this.list.clear();
    //        this.onChange.destroy();
    //        this.onChange = null;
    //        this.list = null;
    //    },
    //    getLength: function () {
    //        return this.list.length;
    //    }
    //    //#endregion
    //});
    ////#endregion
    return {
        Bindable: Bindable,
        ThemeManifest: ThemeManifest,
        Application: Application,
        Bounds: Bounds
    };
});
(function () {
    //"use strict";
    window.requestAnimationFrameRate = function (fps) {
        var period, starter, limit, jitter, maxFPS = 60, frame = 0;
        if (typeof fps !== 'number') fps = maxFPS;
        else fps = Math.max(1, Math.min(maxFPS, fps));
        period = 1000 / fps;
        jitter = period * 0.1;
        limit = period - jitter;
        function requestAnimationFrameAtFPS(renderFrameCallBack) {
            return (function () {
                var handle, rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                function renderer(time) {
                    var lastPeriod;
                    starter = starter || time;
                    lastPeriod = time - starter;
                    if (lastPeriod < limit) handle = rAF(renderer);
                    else {
                        renderFrameCallBack(lastPeriod);
                        starter = time;
                    }
                }
                handle = rAF(renderer);
                return function () {
                    window.cancelAnimationFrame(handle);
                };
            })();
        }
        return requestAnimationFrameAtFPS;
    };
    window.cancelAnimationFrameRate = function (handle) {
        handle();
    };
    var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_inherited\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function () { this.tag = null; this._props = {}; };

    // Create a new Class that inherits from this class
    Class.extend = function (_ClassName, prop) {
        var _inherited = this.prototype;
        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        prototype._ClassName = _ClassName;
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            //if(name==="ClassName") continue;
            prototype[name] = typeof prop[name] == "function" &&
                typeof _inherited[name] == "function" && fnTest.test(prop[name]) ?
                (function (name, fn) {
                    return function () {
                        var tmp = this._inherited;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._inherited = _inherited[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._inherited = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        eval("var F=function " + _ClassName + "() { if(!initializing&&this.init) this.init.apply(this,arguments);  }");
        F.prototype = prototype;
        F.prototype.constructor = Class;
        F.extend = arguments.callee;
        F.mixin = function (dest) {
            for (var k in this) {
                if (this.hasOwnProperty(k)) {
                    dest[k] = this[k];
                }
            }
        };
        return F;
    };
    window.Application = null;
    //#region JaGui
    window.$j = {
        renderer: (document.documentElement.dataset.renderer !== undefined) ? document.documentElement.dataset.renderer : "html",
        //#region types
        types: {
            //#region renderers
            renderers: {
                HTML: "html",
                CANVAS: "canvas",
                WEBGL: "webgl"
            }
            //#endregion
        },
        //#endregion
        propertiesCategories: {},
        bindableProperties: [],
        isHTMLRenderer: function () {
            return this.renderer === this.types.renderers.HTML;
        },
        isCANVASRenderer: function () {
            return this.renderer === this.types.renderers.CANVAS;
        },
        isWEBGLRenderer: function () {
            return this.renderer === this.types.renderers.WEBGL;
        },
        themes: {},
        onGetMouseInfos: null,
        doc: null,
        clipboard: null,
        ready: null,
        defaultTheme: "carbon",
        disableAnimation: false,
        isMouseDown: false,
        windowZIndex: 0,
        currentLocale: null,
        locales: {},
        folders: {
            "{BASE}": "JaGui6", "{GUI}": "gui/", "{CORE}": "gui/core/", "{COMPONENTS}": "gui/components/", "{COMMON}": "gui/components/common/", "{COLOR}": "gui/components/color/",
            "{CONTAINERS}": "gui/components/containers/", "{DATA}": "gui/components/data/", "{EXTENDED}": "gui/components/extended/", "{EXTRAS}": "gui/components/extras/",
            "{LISTS}": "gui/components/lists/", "{MENUS}": "gui/components/menus/", "{TOOLBARS}": "gui/components/toolbars/", "{NONVISUAL}": "gui/components/nonvisual/",
            "{APPS}": "apps/", "{DEMOS}": "demos/", "{LOCALES}": "gui/locales/", "{CONTROLS}": "controls/", "{CSS}": "css/", "{THEMES}": "css/themes/", "{IMAGES}": "images/",
            "{EFFECTS}": "gui/effects/", "{DIALOGS}": "gui/components/dialogs/", "{ACTIONS}": "gui/components/actions/", "{GUITHEMES}": "gui/themes/",
            "{BASECSSCOMPONENTS}": "css/components/base/", "{THEMESCSSCOMPONENTS}": "css/components/themes/", "{THIRDPARTY}": "gui/thirdparty/"
        },
        //#region Methods
        start: function JaGui_init() {
            var language = window.navigator.userLanguage || window.navigator.language;
            if (language.indexOf("-") === -1) language = language + "-" + language.toUpperCase();
            this.currentLocale = language;
            this.tools.uses(this.folders["{CORE}"] + "geometry",
                this.folders["{CORE}"] + "browser",
                (this.isHTMLRenderer()) ? this.folders["{CORE}"] + "css" : "",
                this.folders["{CORE}"] + "types",
                this.folders["{CORE}"] + "ext_array",
                this.folders["{CORE}"] + "ext_string",
                this.folders["{CORE}"] + "ext_math",
                this.folders["{CORE}"] + "ext_date",
                this.folders["{CORE}"] + "events",
                this.folders["{CORE}"] + "convertion",
                this.folders["{CORE}"] + "mouse_keyboard",
                this.folders["{CORE}"] + "canvas",
                this.folders["{CORE}"] + "classes",
                this.folders["{CORE}"] + "colors"
                            //(!this.isHTMLRenderer())?this.folders["{CORE}"]+"pixi.min":""
                            //this.folders["{GUITHEMES}"]+"base/base",
                            //this.folders["{BASECSSCOMPONENTS}"],
                            //this.folders["{THEMESCSSCOMPONENTS}"],
                            /*this.folders["{LOCALES}"]+this.currentLocale*/);
            if ($j.isHTMLRenderer()) $j.looper.setFPS(25);
            $j.doc = document;
            $j.doc.oncontextmenu = function () { return false; };
            $j.doc.addEventListener("keydown", this.apps.keyDown, true);
            $j.doc.addEventListener("keyup", this.apps.keyUp, true);
            $j.doc.addEventListener("keypress", this.apps.keyPress, true);
            $j.doc.addEventListener("DOMContentLoaded",
                function () {
                    var logo, waiting, progressOuter, progressInner, text, ie = false;
                    var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
                    if (match) ie = match.length > 0;
                    // on charge le theme par défaut
                    if ($j.isHTMLRenderer()) {
                        $j.tools.loadTheme($j.defaultTheme);
                        $j.clipboard = $j.doc.createElement("textarea");
                        $j.clipboard.id = "jaguiClipboard";
                        $j.clipboard.value = ".";
                        $j.doc.body.appendChild($j.clipboard);
                    }// else this.themes[this.defaultTheme]={};
                    if (!$j.tools.HTMLParentElement) {
                        //$j.doc.documentElement.ClassName=$j.defaultTheme+"_body "+$j.defaultTheme+"_default";
                        //if (ie) $j.doc.body.setAttribute("data-theme",$j.defaultTheme);
                        //else $j.doc.body.dataset.theme=$j.defaultTheme;
                        $j.doc.body.className += " " + $j.defaultTheme;
                    }
                    $j.doc.body.className = $j.defaultTheme;
                    logo = $j.doc.createElement("span");
                    logo.className = "JAGUI";
                    //logo.innerHTML="D";
                    if (!$j.tools.HTMLParentElement) $j.doc.body.appendChild(logo);
                    else $j.tools.HTMLParentElement.appendChild(logo);
                    if ($j.isHTMLRenderer()) {
                        waiting = $j.doc.createElement("div");
                        waiting.className = "Control loading " + $j.defaultTheme;
                        waiting.id = "waiting";
                        logo = $j.doc.createElement("div");
                        logo.id = "loading_logo";
                        logo.className = "Control loading_logo rotateAnimation";
                        waiting.appendChild(logo);
                        progressOuter = $j.doc.createElement("div");
                        progressOuter.className = "Control loading_progressOuter " + $j.defaultTheme;
                        progressOuter.id = "progressOuter";
                        progressInner = $j.doc.createElement("div");
                        progressInner.id = "progressInner";
                        progressInner.className = "Control loading_progressInner " + $j.defaultTheme;
                        progressOuter.appendChild(progressInner);
                        waiting.appendChild(progressOuter);
                        text = $j.doc.createElement("div");
                        text.className = "Control loading_text " + $j.defaultTheme;
                        text.id = "file_text";
                        text.value = ".";
                        waiting.appendChild(text);
                        if (!$j.tools.HTMLParentElement) $j.doc.body.appendChild(waiting);
                        else $j.tools.HTMLParentElement.appendChild(waiting);
                        $j.tools.step = ~~(180 / ($j.tools.scripts.length - 1));
                    }
                    //if($j.HTMLParentElement) $j.HTMLParentElement.ClassName=$j.defaultTheme+"_body";
                    if ($j.tools.HTMLParentElement) {
                        //if (ie) $j.HTMLParentElement.setAttribute("data-theme",$j.defaultTheme);
                        //else $j.HTMLParentElement.dataset.theme=$j.defaultTheme;
                        $j.tools.HTMLParentElement.className += " " + $j.defaultTheme
                    }
                    $j.tools.loadScript();
                    $j.tools.afterLoadScripts = function () {
                        $j.tools.xhr.load(true, $j.tools.uri.base() + $j.folders["{LOCALES}"] + $j.currentLocale + ".json", function (dx, localeName) {
                            $j.locales[$j.types.languages[localeName.replace("-", "_")]] = JSON.parse(dx);
                        }, false, $j.currentLocale);
                        $j.animatedCursor = new $j.classes.AnimatedCursor();
                        $j.classes.registerPropertiesInCategory("ACTION", ["action", "caption", "enabled", "helpContext", "toolTip", "visible"]);
                        $j.classes.registerPropertiesInCategory("HELPHINTS", ["helpContext", "helpFile", "helpKeyWord", "helpType", "toolTip", "showToolTip", "ownerShowToolTip"]);
                        $j.classes.registerPropertiesInCategory("LAYOUT", ["align", "anchors", "autosize", "constraints", "height", "left", "margins", "padding", "top", "width", "tabOrder"]);
                        $j.classes.registerPropertiesInCategory("MISCELLANEOUS", []);
                        $j.classes.registerPropertiesInCategory("INPUT", ["enabled"]);
                        $j.classes.registerPropertiesInCategory("DRAGDROPDOCKING", []);
                        $j.classes.registerPropertiesInCategory("LEGACY", []);
                        $j.classes.registerPropertiesInCategory("LINKAGE", ["action", "popupMenu"]);
                        $j.classes.registerPropertiesInCategory("LOCALE", []);
                        $j.classes.registerPropertiesInCategory("LOCALIZABLE", ["caption", "constraints", "font", "height", "toolTip", "icon", "left", "top", "width"]);
                        $j.classes.registerPropertiesInCategory("VISUAL", ["align", "cursor", "enabled", "caption", "visible", "width", "top", "left", "height"]);
                        $j.classes.registerPropertiesInCategory("DATABASE", []);
                        if (typeof $j.ready === "function") $j.ready();
                    };
                }, false
            );
        }
        //#endregion Methods
    };
    //#endregion
    if ($j.isHTMLRenderer()) {
        $j.rtStyle = null;
        $j.dragWindow = null;
        $j.resizeWindow = null;
        $j.templates = {};
    }

    //#region Classes
    $j.classes = {
        //#region Methods
        nameSpace: function (nameSpace) {
            $j.classes[nameSpace] = {};
        },
        register: function () {
            var className, Class, categorie;
            categorie = arguments[0]
            if (!$j.tools.valueInSet(categorie, $j.types.categories) && !$j.tools.valueInSet(categorie, $j.types.internalCategories)) return;
            if (!$j.classes[categorie]) $j.classes.nameSpace(categorie);
            for (var i = 1, l = arguments.length; i < l; i++) {
                Class = arguments[i];
                //className=Class.name!==undefined?Class.name:;
                className = $j.tools.getFuncName(Class);
                $j.classes[categorie][className] = Class;
                $j.classes[className] = Class;
            }
        },
        registerTemplates: function (arrayOfTemplate) {
            var tpl, className;
            if (!Array.isArray(arrayOfTemplate)) return;
            for (var i = 0, l = arrayOfTemplate.length; i < l; i++) {
                className = arrayOfTemplate[i].Class;
                className = (typeof className !== _const.STRING) ? $j.tools.getFuncName(className) : className;
                tpl = arrayOfTemplate[i].template;
                tpl = $j.tools.text.replace(tpl, "{className}", className);
                $j.templates[className] = tpl;
            }
        },
        registerPropertiesInCategory: function (category, properties) {
            if (!$j.types.propertiesCategories[category]) return;
            if (!Array.isArray($j.propertiesCategories[category])) $j.propertiesCategories[category] = [];
            if (Array.isArray(properties)) {
                for (var i = 0, l = properties.length; i < l; i++) {
                    $j.propertiesCategories[category].push(properties[i]);
                }
            } else $j.propertiesCategories[category].push(properties);
        },
        getPropertyCategories: function (prop) {
            var cat = [], keys, i, l;
            keys = Object.keys($j.types.propertiesCategories);
            l = keys.length;
            for (i = 0; i < l; i++) {
                if ($j.types.propertiesCategories.hasOwnProperty(keys[i])) {
                    if ($j.propertiesCategories[keys[i]].indexOf(prop) > -1) cat.push($j.types.propertiesCategories[keys[i]]);
                }
            }
            cat.push($j.types.propertiesCategories.MISCELLANEOUS);
            return cat;
        },
        getTemplate: function (className) {
            if ($j.templates[className]) return $j.templates[className];
            else return String.EMPTY;
        },
        createComponent: function (Class, owner, name, props, withTpl, internalId) {
            var obj = null, tpl, container;
            if (this.checkClassAndOwnerClass(Class, owner)) {
                if (!name) name = String.EMPTY;
                if (name !== String.EMPTY) {
                    if (props) props.name = name;
                    else props = { name: name };
                }
                obj = new Class(owner, props);
                if (obj instanceof $j.classes.Component) {
                    if (typeof withTpl !== _const.BOOLEAN && !withTpl) withTpl = true;
                    if (!props) props = {};
                    if (!internalId) obj._internalId = String.uniqueId();
                    else obj._internalId = internalId;
                    if (withTpl) {
                        tpl = obj.getTemplate();
                        if (!props.parentHTML) {
                            owner.insertTemplate(tpl);
                        } else {
                            container = $j.doc.createElement($j.types.HTMLElements.DIV);
                            container.innerHTML = tpl;
                            props.parentHTML.appendChild(container.firstElementChild);
                        }
                    }
                    if (!(obj instanceof $j.classes.Window)) {
                        obj.getHTMLElement(obj._internalId);
                        if (obj._HTMLElement) {
                            obj.getChildsHTMLElement(obj._HTMLElement);
                            //if (obj instanceof $j.classes.CaptionControl) obj.setCaption(obj.name);
                            obj.updateFromHTML();
                            if (!obj.form._loading) obj.loaded();
                        }
                    } else obj.formCreated(obj._internalId);
                }
            }
            return obj;
        },
        checkClassAndOwnerClass: function (Class, owner) {
            var result = true;
            if (Class.name === "ToolButtonSep" && (!(owner instanceof $j.classes.ToolBar))) result = false;
            if (Class.name === "ToolButton" && (!(owner instanceof $j.classes.ToolBar))) result = false;
            if (Class.name === "SplitToolButton" && (!(owner instanceof $j.classes.ToolBar))) result = false;
            return result;
        },
        newCollection: function (obj, owner, itemsClass, propName) {
            if (!propName) propName = "items";
            obj[propName] = [];
            obj[propName].convertToCollection(owner, itemsClass);
        },
        getClassName: function (Class) {
            if (Class.name !== undefined) return Class.name;
            else return Class.toString().match(/^function\s*([^\s(]+)/)[1];
        },
        registerPropertyEditor: function (propertyType, editorPath) {
            if (!$j.classes.propertiesEditors) $j.classes.propertiesEditors = {};
            $j.classes.propertiesEditors[propertyType] = editorPath;
        },
        registerCollectionEditor: function (collectionItemsClass, editorPath) {
            if (!$j.classes.collectionsEditors) $j.classes.collectionsEditors = {};
            $j.classes.collectionsEditors[this.getClassName(collectionItemsClass)] = editorPath;
        },
        registerComponentEditor: function (componentClass, editorPath) {
            if (!$j.classes.componentsEditors) $j.classes.componentsEditors = {};
            $j.classes.componentsEditors[this.getClassName(componentClass)] = editorPath;
        }
        //#endregion Methods
    };
    //#endregion Classes
    //#region Exception
    /*var Exception={
      //#region Methods
      createFmt: function() {
        alert(arguments[0].format(arguments[1]));
      }
      //#endregion Methods
    };*/
    //#endregion Exception
    //#region Apps
    $j.apps = {
        applications: {},
        activeApplication: null,
        capslock: "UNKNOWN",
        //#region Methods
        createApp: function (appName, path) {
            var icon;
            if ($j.isHTMLRenderer()) {
                icon = $j.doc.getElementById(appName + "_Icon");
                if (icon) {
                    //$j.CSS.addClass(icon,"noDisplay");
                    icon = $j.doc.getElementById($j.tools.currentProgress);
                    if (!icon) {
                        $j.doc.body.appendChild($j.doc.createElement("span"));
                        $j.doc.body.lastElementChild.className = $j.doc.body.className + " Control loading_text";
                        $j.doc.body.lastElementChild.id = "loading_msg";
                        $j.doc.body.lastElementChild.innerHTML = "Loading " + appName + " application<br />Please wait...";
                    }
                }
            }
            if (!path) path = $j.folders["{APPS}"];
            else if (!path.endsWith("/")) path += "/";
            $j.tools.scripts.length = 0;
            $j.tools.scripts.idx = 0;
            if ($j.isHTMLRenderer()) $j.tools.currentProgress = "progressInner";
            $j.tools.uses(path + appName + "/" + appName);
            $j.tools.loadScript();

        },
        killApp: function () {
            $j.apps.activeApplication.terminate();
        },
        keyDown: function (keyBoardEventArgs) {
            var form, list = [], obj, found = false, curIdx, l, obj, dealEvent = true;
            if ($j.apps.activeApplication) form = $j.apps.activeApplication.activeWindow;
            $j.keyboard.getKeyboardInfos(event);
            obj = event.target;
            if (obj !== $j.doc.body) {
                if (obj.jsObj) {
                    dealEvent = obj.jsObj._stopEvent;
                }
            }
            dealEvent = dealEvent || $j.keyboard.keyCode === $j.types.VKeysCodes.VK_ALT || $j.keyboard.keyCode === $j.types.VKeysCodes.VK_TAB || (form.mainMenu) && form.mainMenu.getActiveItem();
            if (dealEvent) {
                switch ($j.keyboard.keyCode) {
                    case $j.types.VKeysCodes.VK_SPACE:
                    case $j.types.VKeysCodes.VK_RETURN:
                        if (form) {
                            if (form._focusedControl) form._focusedControl.keyDown();
                            else form.keyDown();
                        }
                        //$j.keyboard.stopEvent();
                        break;
                    case $j.types.VKeysCodes.VK_TAB:
                        form.closePopups();
                        form._content.getTabOrderList(list, true);
                        if ($j.keyboard.shift) {
                            // second search in first part of list
                            if (form._focusedControl) curIdx = list.indexOf(form._focusedControl) - 1;
                            else curIdx = list.length - 1;
                            if (curIdx >= 0) {
                                for (i = curIdx; i >= 0; i--) {
                                    obj = list[i];
                                    if (obj.canFocused && obj.visible && obj.isEnabled()) {
                                        obj.setFocus();
                                        found = true;
                                        break;
                                    }
                                }
                            }
                            // first search in last part of list
                            if (!found) {
                                if ((list.length > 2) && (curIdx < list.length)) {
                                    for (i = list.length - 1; i > curIdx; i--) {
                                        obj = list[i];
                                        if (obj.canFocused && obj.visible && obj.isEnabled()) {
                                            obj.setFocus();
                                            break;
                                        }
                                    }
                                }
                            }
                        } else {
                            if (form._focusedControl) curIdx = list.indexOf(form._focusedControl) + 1;
                            else curIdx = 0;
                            // first search in last part of list
                            l = list.length;
                            if ((list.length > 2) && (curIdx < l)) {
                                for (i = curIdx; i < l; i++) {
                                    obj = list[i];
                                    if (obj.canFocused && obj.visible && obj.isEnabled()) {
                                        obj.setFocus();
                                        found = true;
                                        break;
                                    }
                                }
                            }
                            // second search in first part of list
                            if (!found) {
                                if (curIdx > 0) {
                                    for (i = 0; i < curIdx; i++) {
                                        obj = list[i];
                                        if (obj.canFocused && obj.visible && obj.isEnabled()) {
                                            obj.setFocus();
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        list.clear();
                        //$j.keyboard.stopEvent();
                        break;
                    default:
                        if (form.mainMenu) {
                            if (form.mainMenu.getActiveItem()) {
                                form.mainMenu.keyDown();
                                break;
                            }
                            if ($j.keyboard.ctrl || $j.keyboard.alt || $j.keyboard.shift) {
                                if (form.mainMenu) form.mainMenu.keyDown();
                            }
                        }
                        if (!form._popups.isEmpty()) {
                            if (form._popups.last() instanceof $j.classes.PopupMenu) {
                                form._popups.last().keyDown();
                                break;
                            }
                        }
                        if (form._focusedControl) form._focusedControl.keyDown();
                        else form.keyDown();
                        //$j.keyboard.stopEvent();
                        break;
                }
                $j.keyboard.stopEvent();
            } else if (form._focusedControl) form._focusedControl.keyDown();
        },
        keyUp: function (keyBoardEventArgs) {
            var form, owner;
            if ($j.keyboard === undefined) return;
            if ($j.apps.activeApplication) form = $j.apps.activeApplication.activeWindow;
            if (!form) return;
            $j.keyboard.getKeyboardInfos(event);
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_ALT:
                    if (form.mainMenu) {
                        if (!$j.types.VKeysCodes.ctrl && !$j.types.VKeysCodes.shift && !$j.types.VKeysCodes.meta) form.mainMenu.keyUp();
                    }
                    $j.keyboard.stopEvent();
                    break;
                case $j.types.VKeysCodes.VK_ESCAPE:
                    // à exporter dans window.js
                    if (form) {
                        if (!form._popups.isEmpty()) {
                            owner = form._popups.last()._owner._control;
                            if (owner.closeSubMenu) {
                                owner.closeSubMenu();
                                owner.setActive(true);
                            } else form.closePopups();
                        } else {
                            if (form.mainMenu) {
                                if (form.mainMenu.getActiveItem()) {
                                    form.mainMenu.getActiveItem().setActive(false);
                                    $j.CSS.removeClass(form.mainMenu._HTMLElement, "isactive");
                                } else form.close();
                            } else form.close();
                        }
                    }
                    break;
                case $j.types.VKeysCodes.VK_SPACE:
                case $j.types.VKeysCodes.VK_RETURN:
                    if (form) {
                        if (!form._popups.isEmpty()) form._popups.last().keyUp();
                        else if (form._focusedControl) form._focusedControl.keyUp();
                    }
                    break;
                case $j.types.VKeysCodes.VK_TAB:
                    $j.keyboard.stopEvent();
                    break;
                default:
                    if (form._focusedControl) form._focusedControl.keyUp();
                    else form.keyUp();
                    break;
            }
        },
        keyPress: function (keyBoardEventArgs) {
            var form, shifton = false;
            if ($j.apps.activeApplication) form = $j.apps.activeApplication.activeWindow;
            if (!form) return;
            $j.keyboard.getKeyboardInfos(event);
            // test CapsLock
            $j.apps.capslock = "OFF";
            if ($j.keyboard.shift) shifton = $j.keyboard.shift;
            else if (keyBoardEventArgs.modifiers) shifton = !!(keyBoardEventArgs.modifiers & 4);
            if (($j.keyboard.keyCode >= 97 && $j.keyboard.keyCode <= 122 && shifton) || ($j.keyboard.keyCode >= 65 && $j.keyboard.keyCode <= 90 && !shifton)) $j.apps.capslock = "ON";

            if (form._focusedControl) form._focusedControl.keyPress();
            else form.keyPress();
        }
        //#endregion Methods
    };
    //#endregion Apps
    //#region Tools
    $j.tools = {
        HTMLParentElement: null,
        afterLoadScripts: null,
        scripts: [],
        loadedScripts: [],
        windowsHTML: [],
        idx: 0,
        currentProgress: "progressOuter",
        step: 0,
        Debugger: { debug: false, useFragment: false, log: function (arg, obj, t) { if ($j.tools.Debugger.debug && !obj._loading/*&&!obj.form._loading*/) console.log(arg.callee.name + String.SPACE + (new Date().getTime() - t) + "ms"); } },
        //#region Methods
        include: function (object, property, value) {
            if (!$j.tools.bitTest(object[property], value)) object[property].push(value);
        },
        bitTest: function (flags, value) {
            return (flags.indexOf(value) !== -1);
        },
        exclude: function (object, property, value) {
            if ($j.tools.bitTest(object[property], value)) {
                var idx = object[property].indexOf(value);
                if (idx > -1) object[property].splice(idx, 1);
            }
        },
        isValidIdent: function (ident, allowDots) {
            var alphaChars = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,_';
            var alpha = alphaChars.split(",");
            var alphaNumeric = (alpha.join(",") + ',0,1,2,3,4,5,6,7,8,9').split(",");
            var alphaNumericDot = (alphaNumeric.join(",") + ',.').split(","), i, l;
            if (typeof ident !== _const.STRING) return false;
            if (typeof allowDots !== _const.BOOLEAN) allowDots = false;
            if ((ident.length === 0) || (alpha.indexOf(ident[0])) === -1) return false;
            if (allowDots) {
                for (i = 1, l = ident.length; i < l; i++)
                    if (alphaNumericDot.indexOf(ident[i]) === -1) return false;
            } else {
                for (i = 1, l = ident.length; i < l; i++)
                    if (alphaNumeric.indexOf(ident[i]) === -1) return false;
            }
            return true;
        },
        valueInSet: function (value, set) {
            var founded = false;
            if (typeof set !== _const.OBJECT) return;
            var names = Object.getOwnPropertyNames(set);
            for (var i = 0, l = names.length; i < l; i++) {
                if (set[names[i]] === value) {
                    founded = true;
                    break;
                }
            }
            return founded;
        },
        emptyFunc: function () { },
        loadNextScript: function () {
            $j.tools.idx++;
            if ($j.tools.idx >= $j.tools.scripts.length) {
                $j.tools.scripts.length = 0;
                $j.tools.idx = 0;
                if (typeof $j.tools.afterLoadScripts === "function") $j.tools.afterLoadScripts();
                $j.tools.afterLoadScripts = null;
            } else $j.tools.loadScript();
        },
        loadScript: function () {
            var html_doc, node, fileText, scriptName;
            if ($j.tools.scripts[$j.tools.idx] === "") $j.tools.loadNextScript();
            //scriptName=$j.tools.uri.split($j.tools.scripts[$j.tools.idx],true);
            scriptName = $j.tools.scripts[$j.tools.idx];
            if ($j.tools.loadedScripts.indexOf(scriptName) === -1) {
                html_doc = document.getElementsByTagName("head")[0];
                node = document.createElement("script");
                node.setAttribute("type", "text/javascript");
                node.addEventListener("load", function () {
                    var p, isComponent = false, splitedPath, t, i, l;
                    if ($j.isHTMLRenderer()) {
                        p = $j.doc.getElementById($j.tools.currentProgress);
                        if (p) {
                            if ($j.tools.currentProgress === "progressInner" && $j.tools.idx === 0) {
                                $j.tools.step = (180 / ($j.tools.scripts.length - 2));
                                p.style.width = 0;
                            }
                            p.style.width = (p.offsetWidth + $j.tools.step) + "px";
                        }
                    }
                    if ($j.types.categories) {
                        splitedPath = $j.tools.uri.split($j.tools.scripts[$j.tools.idx]);
                        p = splitedPath[splitedPath.length - 2];
                        t = [$j.types.internalCategories.COMPONENTS,
                        $j.types.categories.COMMON,
                        $j.types.categories.ACTIONS,
                        $j.types.categories.CONTAINERS,
                        $j.types.categories.NONVISUAL,
                        $j.types.categories.EXTENDED,
                        $j.types.categories.TOOLBARS,
                        $j.types.categories.MENUS,
                        $j.types.categories.DIALOGS,
                        $j.types.categories.EXTRAS,
                        $j.types.categories.COLOR,
                        $j.types.categories.DATA].indexOf(p);
                        isComponent = t > -1 ? true : false;
                        if (isComponent) {
                            t = $j.tools.uri.extractFileName($j.tools.scripts[$j.tools.idx]);
                            $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + t);
                            if ([$j.types.categories.NONVISUAL, $j.types.categories.DIALOGS, $j.types.categories.ACTIONS, $j.types.categories.DATA].indexOf(p) === -1) {
                                $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/" + t);
                            }
                            $j.apps.activeApplication.themeManifest.loadComponentTheme(t);
                        }
                    }
                    $j.tools.loadNextScript();
                }, false);
                node.addEventListener("error", function () {
                    if ($j.tools.Debugger.debug) console.log($j.tools.scripts[$j.tools.idx] + " not loaded");
                    $j.tools.loadedScripts.remove($j.tools.scripts[$j.tools.idx]);
                    $j.tools.loadNextScript();
                }, false);
                node.setAttribute("src", $j.tools.uri.base() + $j.tools.scripts[$j.tools.idx] + ".js");//?rnd="+new Date().getTime());
                if ($j.isHTMLRenderer()) {
                    fileText = $j.doc.getElementById("file_text");
                    if (fileText) {
                        fileText.innerHTML = $j.tools.scripts[$j.tools.idx] + ".js";
                    }
                }
                $j.tools.loadedScripts.push(scriptName);
                html_doc.appendChild(node);
            } else $j.tools.loadNextScript();
            node = null;
            html_doc = null;
        },
        uses: function () {
            for (var i = 0, l = arguments.length; i < l; i++) {
                if (arguments[i] === '') continue;
                if (($j.tools.loadedScripts.indexOf(arguments[i]) === -1) && $j.tools.scripts.indexOf(arguments[i]) === -1) $j.tools.scripts.push(arguments[i]);
            }
            if ($j.isHTMLRenderer()) {
                if ($j.tools.currentProgress === "progressInner") {
                    var p = $j.doc.getElementById($j.tools.currentProgress);
                    if (p) {
                        p.style.width = "0px";
                        $j.tools.step = ~~(180 / $j.tools.scripts.length + 1);
                    }
                }
            }
        },
        loadFormRes: function (resName, object) {
            var fileText, p, style;
            if ($j.isHTMLRenderer()) {
                fileText = $j.doc.getElementById("file_text");
                if (fileText) {
                    fileText.innerHTML = "Creating window & objects\nPlease wait...";
                }
                p = $j.doc.getElementById($j.tools.currentProgress);
                if (p) {
                    if ($j.tools.currentProgress === "progressInner") p.style.width = "99%";
                }
                //if ($j.tools.loadedScripts.indexOf(resName)===-1) {
                style = $j.doc.createElement("link");
                style.setAttribute("rel", "stylesheet");
                style.setAttribute("href", $j.tools.uri.base() + resName + ".css?rnd=" + new Date().getTime());
                style.setAttribute("media", "screen");
                style.addEventListener("error", function () { });
                $j.doc.getElementsByTagName("head")[0].appendChild(style);
                //}
                // tester si le css 'animate' est déjà présent
                //if ($j.tools.loadedScripts.indexOf("animate")===-1) {
                style = $j.doc.createElement("link");
                style.setAttribute("rel", "stylesheet");
                style.setAttribute("href", $j.tools.uri.base() + "css/animate.css");
                style.setAttribute("media", "screen");
                style.addEventListener("error", function () { });
                $j.doc.getElementsByTagName("head")[0].appendChild(style);
                //}
            }
            //$j.tools.xhr.load(true,$j.tools.uri.base()+resName+".html?rnd="+new Date().getTime(),function(dx) {
            //  $j.doc.body.innerHTML+=dx;
            //},false);
            $j.tools.windowsHTML.push($j.tools.uri.base() + resName + ".html?rnd=" + new Date().getTime());
            $j.apps.activeApplication._loadedWindowsHTML++;
        },
        getObjectFromString: function (_object, stringProp) {
            var tab = stringProp.split("."), obj = _object[tab[0]];
            if (typeof obj === _const.OBJECT && obj) {
                for (var i = 1, l = tab.length - 1; i < l; i++) {
                    obj = obj[tab[i]];
                }
                return { object: obj, property: tab.last() };
            }
            return { object: _object, property: stringProp };
        },
        execFunc: function (object, func, param, timeToWait) {
            setTimeout(function () { object[func](param); }, timeToWait) ? timeToWait : 0;
        },
        getPath: function (subfolder) {
            var path = "{" + subfolder.toUpperCase() + "}";
            path = $j.folders[path];
            return path;
        },
        loadTheme: function (themeName) {
            //vérification que le thème n'a pas déjà été chargé
            for (var i = 0, l = document.styleSheets.length; i < l; i++) {
                if (document.styleSheets[i].id === themeName) return;
            }
            var style = $j.doc.createElement("link");
            style.setAttribute("rel", "stylesheet");
            style.setAttribute("href", $j.tools.uri.base() + this.getPath("THEMESCSSCOMPONENTS") + themeName + "/" + themeName.toLowerCase() + ".css?rnd=" + new Date().getTime());
            style.setAttribute("media", "screen");
            style.addEventListener("error", function () { });
            document.getElementsByTagName("head")[0].appendChild(style);
            $j.themes[themeName] = {};
        },
        loadCssFile: function (fileName) {
            var style = $j.doc.createElement("link");
            style.setAttribute("rel", "stylesheet");
            style.setAttribute("href", $j.tools.uri.base() + fileName + ".css?rnd=" + new Date().getTime());
            style.setAttribute("media", "screen");
            style.addEventListener("error", function () { });
            document.getElementsByTagName("head")[0].appendChild(style);
        },
        loadJsFile: function (fileName) {
            var node = $j.doc.createElement("script");
            node.setAttribute("type", "text/javascript");
            node.setAttribute("src", fileName + "?rnd=" + new Date().getTime());
            node.addEventListener("load", function () { }, false);
            node.addEventListener("error", function () { });
            document.getElementsByTagName("head")[0].appendChild(node);
        },
        clone: function (object) {
            //answer a new instance of target's type
            if (typeof object === _const.OBJECT) {
                var Clone = function () { object.constructor.apply(this); };
                Clone.prototype = object;
                return new Clone();
            } else return object;
        },
        copy: function (object) {
            //answer a shallow copy of target
            var value, c, property, names, i, l;

            if (typeof object !== _const.OBJECT) {
                return object;
            } else {
                value = object.valueOf();
                if (object !== value) {
                    return new object.constructor(value);
                } else {
                    if (object instanceof object.constructor &&
                        object.constructor !== Object) {
                        c = $j.clone(object.constructor.prototype);
                        names = Object.getOwnPropertyNames(object);
                        for (i = 0, l = names; i < l; i++) {
                            if (object.hasOwnProperty(names[i])) {
                                c[names[i]] = object[names[i]];
                            }
                        }
                    } else {
                        c = {};
                        names = Object.getOwnPropertyNames(object);
                        for (i = 0, l = names; i < l; i++) {
                            if (!c[names[i]]) {
                                c[names[i]] = object[names[i]];
                            }
                        }
                    }
                    return c;
                }
            }
        },
        getLocale: function () {
            if ($j.apps.activeApplication.locale) {
                if ($j.locales[$j.apps.activeApplication.locale]) return $j.locales[$j.apps.activeApplication.locale];
                else $j.locales[$j.currentLocale];
            } else return $j.locales[$j.currentLocale];
        },
        getDefaultLocale: function () {
            return $j.locales[$j.currentLocale];
        },
        localeExist: function (locale) {
            return $j.locales[$j.currentLocale];
        },
        isNull: function (obj) {
            return (obj === undefined) || (obj === null);
        },
        getFuncName: function (func) {
            if (func.name !== undefined) return func.name;
            else return func.toString().match(/^function\s*([^\s(]+)/)[1];
        },
        addResizeListener: function (obj) {
            obj._hasResizeEvent = true;
            //obj._resizeDatas.width=obj._HTMLElement.offsetWidth;
            //obj._resizeDatas.height=obj._HTMLElement.offsetHeight;
            $j.looper.addListener(obj, "resized");
        },
        removeResizeListeners: function (form) {
            var i = $j.looper.listeners.length - 1;
            $j.looper.stop();
            while (i >= 0) {
                if ($j.looper.listeners[i].form === form) $j.looper.removeListener($j.looper.listeners[i]);
                i--;
            }
            if ($j.looper.listeners.length > 0) $j.looper.start();
        },
        addPropertyFromSet: function (obj, prop, set, value) {
            //if (!obj._props) obj._props={};
            obj._props[prop] = set;
            obj[prop] = value;
        },
        getPropertiesFromObject: function (obj) {
            var props = [], keys, i, propName;
            keys = Object.keys(obj);
            for (i = 0; i < keys.length; i++) {
                propName = keys[i];
                if (propName === "rotateAngle") continue;
                if (propName === "rotateCenter") continue;
                if (obj.hasOwnProperty(propName)) {
                    if (!propName.startsWith('_') && !propName.startsWith('on') && (typeof obj[propName] !== _const.FUNCTION) && (propName !== "form") && (propName !== "app")) {
                        props.push({ "property": propName, "value": obj[propName], "categories": $j.classes.getPropertyCategories(propName) });
                    }
                }
            }
            return props;
        },
        getLeftTopFromTranslation: function (HTMLElement) {
            var mat = getComputedStyle(HTMLElement).transform;
            mat = mat.match(/-?[\d\.]+/g);
            return { left: ~~mat[4], top: ~~mat[5] };
        },
        getNextValueFromEnum: function (_enum, currentValue) {
            var curIndex, values = [], keys;
            if (!_enum) return currentValue;
            if (!currentValue) return currentValue;
            keys = Object.keys(_enum);
            for (curIndex = 0; curIndex < keys.length; curIndex++) {
                values.push(_enum[keys[curIndex]]);
            }
            curIndex = values.indexOf(currentValue);
            if (curIndex === -1) return currentValue;
            curIndex++;
            if (curIndex > keys.length) curIndex = keys.length - 1;
            return values[curIndex];
        },
        getPreviousValueFromEnum: function (_enum, currentValue) {
            var curIndex, values = [], keys;
            if (!_enum) return currentValue;
            if (!currentValue) return currentValue;
            keys = Object.keys(_enum);
            for (curIndex = 0; curIndex < keys.length; curIndex++) {
                values.push(_enum[keys[curIndex]]);
            }
            curIndex = values.indexOf(currentValue);
            if (curIndex === -1) return currentValue;
            curIndex--;
            if (curIndex < 0) curIndex = 0;
            return values[curIndex];
        },
        getValueIndexFromEnum: function (_enum, currentValue) {
            var curIndex, values = [], keys;
            if (!_enum) return currentValue;
            if (!currentValue) return currentValue;
            keys = Object.keys(_enum);
            for (curIndex = 0; curIndex < keys.length; curIndex++) {
                values.push(_enum[keys[curIndex]]);
            }
            curIndex = values.indexOf(currentValue);
            return curIndex;
        },
        getEnumNameFromValue: function (_enum, currentValue) {
            var enumName = "";
            if (!_enum) return currentValue;
            if (!currentValue) return currentValue;
            keys = Object.keys(_enum);
            for (curIndex = 0; curIndex < keys.length; curIndex++) {
                if (_enum[keys[curIndex]] === currentValue) {
                    enumName = keys[curIndex];
                    break;
                }
            }
            return enumName;
        }
        //setData:function(HTMLObj,name,value) {
        //  if (HTMLObj.dataset!==null) HTMLObj.dataset[name]=value;
        //  else if (HTMLObj.getAttribute(name)!==null) HTMLObj.setAttribute(name,value);
        //},
        //getData:function(HTMLObj,name) {
        //  if (HTMLObj.dataset!==null) return HTMLObj.dataset[name];
        //  else if (HTMLObj.getAttribute("data-"+name)!==null) return HTMLObj.getAttribute("data-"+name);
        //  else return null;
        //}
        //#endregion Methods
    };
    //#endregion Tools
    //#region Canvas
    $j.tools.canvas = {
        newCanvas: function () {
            var c = $j.doc.createElement("canvas"), ctx = c.getContext("2d");
            ctx.useNativeDash = ctx.setLineDash ? "setLineDash" : ($j.browser.ff ? "mozDash" : null);
            //ctx.useNativeDash=null;
            if (!ctx.useNativeDash) ctx.dashOffset = 0;
            //$j.CSS.addClass(c,"basecss");
            return c;
        },
        checkEndian: function () {
            var c = $j.tools.canvas.newCanvas(), ctx = c.getContext("2d"), imageData, buf, buf8, data, isLittleEndian;
            ctx.resize(10, 10);
            imageData = ctx.getImageData(0, 0, c.width, c.height);
            buf = new ArrayBuffer(imageData.data.length);
            buf8 = new Uint8ClampedArray(buf);
            data = new Uint32Array(buf);
            // Determine whether Uint32 is little- or big-endian.
            data[1] = 0x0a0b0c0d;
            isLittleEndian = true;
            if (buf[4] === 0x0a && buf[5] === 0x0b && buf[6] === 0x0c &&
                buf[7] === 0x0d) {
                isLittleEndian = false;
            }
            return isLittleEndian;
        },
        setPixel: function (x, y, w, d, v, isLittleEndian) {
            if (isLittleEndian) {
                d[y * w + x] =
                    (255 << 24) |    // alpha
                    (v << 16) |    // blue
                    (v << 8) |    // green
                    v;            // red
            } else {
                d[y * w + x] =
                    (v << 24) |    // red
                    (v << 16) |    // green
                    (v << 8) |    // blue
                    255;              // alpha
            }
        },
        getPixel: function (x, y, w, d) {
            return d[y * w + x];
        }
    };
    //#endregion
    //#region Event
    $j.tools.events = {
        //#region Methods
        bind: function (object, eventName, callBack) {
            if (typeof callBack !== _const.FUNCTION) return;
            if (!object) return;
            if (typeof eventName !== _const.STRING) return;
            object.addEventListener(eventName, callBack, false);
        },
        unBind: function (object, eventName, callBack) {
            var args = arguments;
            if (typeof callBack !== _const.FUNCTION) return;
            if (!object) return;
            if (typeof eventName !== _const.STRING) return;
            object.removeEventListener(eventName, callBack, false);
        },
        stop: function (eventArg) {
            eventArg.cancelBubble = true;
            eventArg.stopPropagation();
            eventArg.preventDefault();
        },
        whichTransitionEvent: function () {
            var t, el = $j.doc.createElement('fakeelement'), transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            }, props;
            props = Object.keys(transitions);
            for (i = 0; i < props.length; i++) {
                if (el.style[props[i]]) return transitions[props[i]];
            }
        },
        whichAnimationEvent: function () {
            var t, el = $j.doc.createElement('fakeelement'), transitions = {
                'animation': 'animationend',
                'OAnimation': 'oAnimationEnd',
                'MozAnimation': 'animationend',
                'WebkitAnimation': 'webkitAnimationEnd'
            }, props;
            props = Object.keys(transitions);
            for (i = 0; i < props.length; i++) {
                if (el.style[props[i]]) return transitions[props[i]];
            }
        }
        //#endregion Methods
    };
    //#endregion Event
    //#region Cookie
    $j.tools.cookie = {
        //#region Methods
        _new: function (name, value, days) {
            var date, expires;
            if (days) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            else expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        read: function (name) {
            var nameEQ = name + "=", ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === String.SPACE) c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        erase: function (name) {
            $j.createCookie(name, String.EMPTY, -1);
        }
        //#endregion Methods
    };
    //#endregion Cookie
    //#region Sorter
    $j.tools.sorter = {
        //#region Methods
        compareListItem: function (item1, item2) {
            if ((item1 instanceof $j.listBoxItem) && (item2 instanceof $j.listBoxItem)) {
                if (item1.ListBox() && (typeof item1.ListBox().onCompare === _const.FUNCTION)) return item1.ListBox().onCompare(item1, item2);
                else return item1.text.compareTo(item2.text);
            } else return 0;
        },
        compareTreeItem: function (item1, item2) {
            if ((item1 instanceof $j.treeViewItem) && (item2 instanceof $j.treeViewItem)) {
                if (item1.TreeView() && (typeof item1.TreeView().onCompare === _const.FUNCTION)) return item1.TreeView().onCompare(item1, item2);
                else return item1.text.compareTo(item2.text);
            } else return 0;
        }
        //#endregion Methods
    };
    //#endregion Sorter
    //#region Text
    $j.tools.text = {
        //#region Methods
        wrapText: function (text, withSpace) {
            if (typeof text !== _const.STRING) return [];
            if (text === String.EMPTY) return text.split();
            if (typeof withSpace === _const.UNDEFINED) withSpace = false;
            if (withSpace) text = text.replace(/ /g, " [|]");
            text = text.replace(/\\n/g, "[|]¤[|]");
            text = text.replace(/\n/g, "[|]¤[|]");
            text = text.replace(/<br \/>/g, "[|]¤[|]");
            text = text.replace(/<br>/g, "[|]¤[|]");
            text = text.replace(/<br\/>/g, "[|]¤[|]");
            text = text.split("[|]");
            return text;
        },
        wordWrapText: function (ctx, text, maxWidth) {
            var words, line = '', testLine, testWidth, lines = [];
            words = $j.tools.text.replace(text, ' ', '\f ');
            words = words.split(' ');
            for (var n = 0; n < words.length; n++) {
                testLine = line + words[n];
                testWidth = ctx.measureText(testLine.replace('\f', ' ')).width;
                if (testWidth > maxWidth - 5 && n > 0) {
                    line = $j.tools.text.replace(line, '\f', ' ');
                    lines.push(line);
                    line = words[n];
                }
                else {
                    line = testLine;
                }
            }
            line = $j.tools.text.replace(line, '\f', ' ');
            lines.push(line);
            return lines;
        },
        findWordBreak: function (text, col, step) {
            if (step < 0) col += step;
            var d = this.isWordSeparator(text[col]);
            if (d && step > 0) return col + step;
            for (col = col; col >= 0 && col < text.length; col += step)
                if (this.isWordSeparator(text[col]) !== d) return step < 0 ? col -= step : col + step;
            return step < 0 ? 0 : text.length;
        },
        isWordSeparator: function (c) {
            return " \t'\",;.!~@#$%^&*?=<>()[]:\\+-".indexOf(c) !== -1;
        },
        getTok: function (string, position) {
            if (typeof string !== _const.STRING) return;
            var result = String.EMPTY, len = string.length;
            if (position > len) return;
            while ((position <= len) && (string.charAt(position) === String.SPACE)) position++;
            for (var i = position; i < len; i++) {
                if ('zmlchvsqtaZMLCHVSQTA'.indexOf(string.charAt(i)) === -1) break;
                result += string.charAt(i);
            }
            return { s: result, pos: i };
        },
        getNum: function (string, position) {
            if (typeof string !== _const.STRING) return;
            var result = String.EMPTY, len = string.length;
            if (position > len) return;
            while ((position <= len) && (string.charAt(position) === String.SPACE)) position++;
            for (var i = position; i < len; i++) {
                if (string.charAt(i) === 'e') {
                    result += string.charAt(i);
                    continue;
                }
                if ((string.charAt(i) === '-') && (len > 0) && (result.charAt(result.length - 1) === 'e')) {
                    result += string.charAt(i);
                    continue;
                }
                if (('0123456789.'.indexOf(string.charAt(i)) === -1) && !((i === position) && string.charAt(i) === '-')) break;
                result += string.charAt(i);
            }
            while (string.charAt(position) === String.SPACE) position++;
            return { Result: result, Pos: i };
        },
        getPoint: function (string, position) {
            if (typeof string !== _const.STRING) return;
            position = position;
            var x, y, result, len = string.length, _pos, o;
            if (position > len) return;
            while ((position <= len) && ([',', String.SPACE].indexOf(string.charAt(position)) !== -1)) position++;
            o = $j.tools.text.getNum(string, position);
            x = o.Result;
            position = o.Pos;
            while ((position <= len) && ([',', String.SPACE].indexOf(string.charAt(position)) !== -1)) position++;
            o = $j.tools.text.getNum(string, position);
            y = o.Result;
            position = o.Pos;
            while ((position <= len) && ([',', String.SPACE].indexOf(string.charAt(position)) !== -1)) position++;
            return { Point: new $j.classes.Point($j.convert.strToFloat(x), $j.convert.strToFloat(y)), Pos: position };
        },
        getTextSizes: function (text, _class, htmlObj) {
            var d, H = 0, W = 0;
            if (typeof text !== _const.STRING) return;
            //if (font!==null) {
            //  if (!(font instanceof $j.classes.Font)) return;
            //}
            d = $j.doc.createElement($j.types.HTMLElements.SPAN);
            if (_class) $j.CSS.addClass(d, _class);
            else if (htmlObj) {
                d.style.fontFamily = getComputedStyle(htmlObj).fontFamily;
                d.style.fontSize = parseInt(getComputedStyle(htmlObj).fontsize, 10);
                d.style.fontStretch = getComputedStyle(htmlObj).fontStretch;
                d.style.fontStyle = getComputedStyle(htmlObj).fontStyle;
                d.style.fontWeight = getComputedStyle(htmlObj).fontWeight;
                //d.style.font=getComputedStyle(htmlObj).getPropertyValue("font");
            }
            //d.style.position="absolute";
            //if (font) font.toCss(d);
            d.innerHTML = text;
            $j.doc.documentElement.appendChild(d);
            H = d.offsetHeight;
            W = d.offsetWidth;
            $j.doc.documentElement.removeChild(d);
            return { w: W, h: H };
        },
        replace: function (s, f, r) {
            return s.replace(new RegExp(f, 'g'), r);
        },
        getLastNumber: function (str) {
            return str.match(/\d+$/)[0];
        },
        setTextNode: function (node, text) {
            var i = 0, l, childs;
            childs = node.childNodes;
            l = childs.length;
            if (l > 0) {
                while (i < l) {
                    if (childs[i].nodeType === $j.types.xmlNodeTypes.TEXT_NODE) {
                        childs[i].nodeValue = text;
                        i = l + 1;
                    }
                    i++;
                }
            } else node.innerHTML = text;
        },
        formatHTML: function (code, stripWhiteSpaces, stripEmptyLines, indentSize) {
            var whitespace = String.SPACE.repeat((indentSize) ? ~~indentSize : 4); // Default indenting 4 whitespaces
            var currentIndent = 0;
            var char = String.EMPTY;
            var nextChar = String.EMPTY;
            var lastOpenedTag = String.EMPTY;
            var currentCode = String.EMPTY;
            var nextSpace = String.EMPTY;
            var currentClosedTag = String.EMPTY;

            var result = String.EMPTY;
            for (var pos = 0; pos <= code.length; pos++) {
                char = code.substr(pos, 1);
                nextChar = code.substr(pos + 1, 1);
                // If opening tag, add newline character and indention
                if (char === '<' && nextChar !== '/') {
                    if (result !== '') result += '\n';
                    result += whitespace.repeat(currentIndent);
                    currentIndent++;
                    currentCode = code.substr(pos, code.length);
                    nextSpace = currentCode.indexOf(String.SPACE);
                    if (nextSpace === -1) nextSpace = currentCode.indexOf(">");
                    lastOpenedTag = code.substr(pos + 1, nextSpace - 1);
                }
                    // if Closing tag, add newline and indention
                else if (char === '<' && nextChar === '/') {
                    // If there're more closing tags than opening
                    if (--currentIndent < 0) currentIndent = 0;
                    currentCode = code.substr(pos + 1, code.length);
                    nextSpace = currentCode.indexOf(">");
                    currentClosedTag = code.substr(pos + 2, nextSpace - 1);
                    if (lastOpenedTag !== currentClosedTag) result += '\n' + whitespace.repeat(currentIndent);
                    lastOpenedTag = String.EMPTY;
                }
                    // remove multiple whitespaces
                else if (stripWhiteSpaces === true && char === String.SPACE && nextChar === String.SPACE) char = String.EMPTY;
                    // remove empty lines
                else if (stripEmptyLines === true && char === '\n') {
                    //debugger;
                    if (code.substr(pos, code.substr(pos).indexOf("<")).trim() === String.EMPTY) char = String.EMPTY;
                }
                result += char;
            }
            console.log(result);
            return result;
        }
        //#endregion Methods
    };
    //#endregion Text
    //#region Uri
    $j.tools.uri = {
        //#region Methods
        clean: function (uri) {
            return uri.replace("url(", String.EMPTY).replace(")", String.EMPTY).replace(/"/g, String.EMPTY);
        },
        split: function (path, returnLast) {
            var splited = path.split("/");
            if (!returnLast) returnLast = false;
            if (returnLast) return splited[splited.length - 1];
            else return splited;
        },
        base: function () {
            var uri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + "/";
            if (location.href.toLowerCase().indexOf($j.tools.getPath("base").toLowerCase()) > -1) uri += $j.tools.getPath("base") + "/";
            return uri;
        },
        extractFileName: function (url) {
            return $j.tools.uri.split(url, true);
        },
        extractFileExt: function (url) {
            return url.split(".").last();
        },
        getParamValue: function (param, url) {
            var u = !url ? document.location.href : url, reg = new RegExp('(\\?|&|^)' + param + '=(.*?)(&|$)'), matches = u.match(reg);
            return (matches && matches[2]) ? decodeURIComponent(matches[2]).replace(/\+/g, ' ') : '';
        },
        convertToRealURI: function (uri) {
            var newUri, props;
            props = Object.keys($j.folders);
            for (var i = 0; i < props.length; i++) {
                newUri = uri.split(props[i]);
                if (newUri.length > 1) uri = newUri.join($j.folders[props[i]]);
            }
            return uri;
        }
        //#endregion Methods
    };
    //#endregion Uri
    //#region Xhr
    $j.tools.xhr = {
        //#region Methods
        load: function (async, url, callback, xml, params) {
            if (typeof async !== _const.BOOLEAN) async = false;
            if (typeof xml !== _const.BOOLEAN) xml = false;
            if (!callback) callback = null;
            var xmlHTTPR = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            xmlHTTPR.onreadystatechange = function () {
                if ((this.readyState === 4) && (this.status === 200)) {
                    if (typeof callback === _const.FUNCTION) {
                        if (async) {
                            if (!xml) callback(this.responseText, params);
                            else callback(this.responseXML, params);
                        }
                    }
                }
            };
            xmlHTTPR.open("GET", url, async);
            xmlHTTPR.send(null);
            if (!async) {
                if (typeof callback === _const.FUNCTION) {
                    if (!xml) callback(xmlHTTPR.responseText, params);
                    else callback(xmlHTTPR.responseXML, params);
                }
            }
        }
        //#endregion Methods
    };
    //#endregion Xhr
    //#region Xml
    $j.tools.xml = {
        //#region Methods
        newDocument: function (encoding, version, standalone, rootName) {
            if (!encoding) encoding = 'ISO-8859-1';
            if (!version) version = '1.0';
            if (!standalone) standalone = 'false';
            if (!rootName) rootName = 'root';
            var xmlDoc = '<?xml version="' + version + '" encoding="' + encoding + '" ?><' + rootName + '></' + rootName + '>';
            if (window.ActiveXObject) { // IE
                var doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = false;
                doc.loadXML(xmlDoc);
                return doc;
            } else {// Mozilla, Firefox, Opera, etc.
                return (new DOMParser()).parseFromString(xmlDoc, 'text/xml');
            }
        },
        findNodes: function (xml, xpath) {
            var nodes, arr = [], i, obj, j;
            if (window.ActiveXObject) {
                nodes = xml.selectNodes(xpath);
                for (i = 0; i < nodes.length; i++) arr.push(nodes[i]);
            } else {
                nodes = xml.evaluate(xpath, xml, null, XPathResult.ANY_TYPE, null);
                var result = nodes.iterateNext();
                while (result) {
                    arr.push(result);
                    result = nodes.iterateNext();
                }
            }
            return arr;
        },
        addNode: function (xml, parentNode, name) {
            var newNode;
            newNode = xml.createElement(name);
            parentNode.appendChild(newNode);
            return newNode;
        },
        delNode: function (node) {
            node.parentNode.removeChild(node);
        }
        //#endregion Methods
    };
    //#endregion Xml
    //#region BezierUtils
    $j.tools.bezierUtils = {
        error: 0.1,
        //#region Methods
        distance: function (x1, y1, x2, y2) {
            return $j.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        },
        arcAsBezier: function (alpha) {
            var cosa = $j.cos(alpha), sina = $j.sin(alpha), p2 = new $j.classes.Point(cosa + (4 / 3) * (1 - cosa), sina - (4 / 3) * cosa * (1 - cosa) / sina);
            return {
                s: new $j.classes.Point(cosa, -sina),
                c1: new $j.classes.Point(p2.x, -p2.y),
                c2: p2,
                e: new $j.classes.Point(cosa, sina)
            };
        },
        splitToDashedBezier: function (points, dashArray, newPoints, lineWidth, prevResult) {
            var result = 0, t = 0, dash, i = 0;
            if (prevResult) {
                dash = prevResult.l;
                i = prevResult.i;
            } else {
                dash = dashArray[0] * lineWidth;
            }
            while (t < 1) {
                // get the 't' corresponding to the given dash value.
                t = $j.tools.bezierUtils.tAtLength(points, dash);
                if (t === 1) {
                    var rl = $j.tools.bezierUtils.computeLength(points);
                    result = { l: dash - rl, i: i };
                }
                // split bezier at t: left part is the "dash" curve, right part is the remaining bezier points
                var curves = $j.tools.bezierUtils.splitBezierAtT(points, t);
                if (!(i % 2)) {
                    // only keep the "dash" curve
                    newPoints.push(curves[0]);
                }
                points = curves[1];
                ++i;
                dash = dashArray[i % dashArray.length] * lineWidth;
            }
            return result;
        },
        tAtLength: function (points, length) {
            var t = 0, quadratic = points.length === 6, currentLen = 0, splitCount = 0, bu = $j.tools.bezierUtils, splitFunc = quadratic ? bu.splitQBezierAtT : bu.splitBezierAtT;
            var _compute = function (p, error) {
                // control points polygon length
                var pLen = 0, chord, newbezier;
                for (var i = 0; i < p.length - 2; i += 2)
                    pLen += bu.distance(p[i], p[i + 1], p[i + 2], p[i + 3]);
                // chord length
                chord = quadratic ? bu.distance(points[0], points[1], points[4], points[5]) : bu.distance(points[0], points[1], points[6], points[7]);
                // if needs more approx. or if currentLen is greater than the target length,
                // split the curve one more time
                if (pLen - chord > error || currentLen + pLen > length + error) {
                    ++splitCount;
                    newbezier = splitFunc(p, 0.5);
                    // check 1st subpath
                    _compute(newbezier[0], error);
                    // the 1st subcurve was the good one, we stop
                    if ($j.abs(currentLen - length) <= error) return;
                    // need to continue with the 2nde subcurve
                    _compute(newbezier[1], error);
                    return;
                }
                currentLen += pLen;
                t += 1.0 / (1 << splitCount);
            };
            if (length) _compute(points, 0.5);
            return t;
        },
        splitCBezierAtT: function (points, t) {
            var r = 1 - t, r2 = r * r, r3 = r2 * r, t2 = t * t, t3 = t2 * t, p1x = points[0], p1y = points[1], c1x = points[2], c1y = points[3], c2x = points[4],
                c2y = points[5], p2x = points[6], p2y = points[7], ax = r * p1x + t * c1x, ay = r * p1y + t * c1y, cx = r * c2x + t * p2x, cy = r * c2y + t * p2y,
                mx = r2 * p1x + 2 * r * t * c1x + t2 * c2x, my = r2 * p1y + 2 * r * t * c1y + t2 * c2y, nx = r2 * c1x + 2 * r * t * c2x + t2 * p2x, ny = r2 * c1y + 2 * r * t * c2y + t2 * p2y,
                px = r3 * p1x + 3 * r2 * t * c1x + 3 * r * t2 * c2x + t3 * p2x, py = r3 * p1y + 3 * r2 * t * c1y + 3 * r * t2 * c2y + t3 * p2y;
            return [[p1x, p1y, ax, ay, mx, my, px, py],
            [px, py, nx, ny, cx, cy, p2x, p2y]];
        },
        splitQBezierAtT: function (points, t) {
            var r = 1 - t, r2 = r * r, t2 = t * t, p1x = points[0], p1y = points[1], cx = points[2], cy = points[3], p2x = points[4], p2y = points[5],
                ax = r * p1x + t * cx, ay = r * p1y + t * cy, bx = r * cx + t * p2x, by = r * cy + t * p2y, px = r2 * p1x + 2 * r * t * cx + t2 * p2x, py = r2 * p1y + 2 * r * t * cy + t2 * p2y;
            return [[p1x, p1y, ax, ay, px, py],
            [px, py, bx, by, p2x, p2y]];
        },
        computeLength: function (points) {
            var quadratic = points.length === 6, pLen = 0, chord, newBeziers, length, bu = $j.tools.bezierUtils;
            // control points polygon length
            for (var i = 0; i < points.length - 2; i += 2)
                pLen += bu.distance(points[i], points[i + 1], points[i + 2], points[i + 3]);
            // chord length
            chord = quadratic ? bu.distance(points[0], points[1], points[4], points[5]) : bu.distance(points[0], points[1], points[6], points[7]);
            // split polygons until the polygon and the chord are "the same"
            if (pLen - chord > bu.error) {
                newBeziers = quadratic ? bu.splitQBezierAtT(points, 0.5) : bu.splitCBezierAtT(points, 0.5);
                length = bu.computeLength(newBeziers[0], quadratic);
                length += bu.computeLength(newBeziers[1], quadratic);
                return length;
            }
            // pLen is close enough, done.
            return pLen;
        },
        splitBezierAtT: function (points, t) {
            var bu = $j.tools.bezierUtils;
            return points.length === 6 ? bu.splitQBezierAtT(points, t) : bu.splitCBezierAtT(points, t);
        }
        //#endregion Methods
    };
    //#endregion BezierUtils
    //#region Font
    $j.tools.font = {
        fontsInfos: {},
        //#region Methods
        getTextHeight: function (text, font) {
            var d, H = 0;
            if (typeof text !== _const.STRING) return;
            if (font) {
                if (!(font instanceof $j.classes.Font)) return;
            }
            d = $j.doc.createElement("div");
            //$j.CSS.addClass(d,"basecss");
            //d.style.position="absolute";
            if (font) font.toCss(d);
            d.innerHTML = text;
            $j.doc.documentElement.appendChild(d);
            H = d.offsetHeight - 1;
            $j.doc.documentElement.removeChild(d);
            return H;
        },
        getCharWidth: function (font, char) {
            return $j.tools.font.fontsInfos[font.family].sizes[font.size].chars[char.charCodeAt(0)];
        }
        //#endregion Methods
    };
    //#endregion Font
    //#region CSS2JSON
    /*var CSS2JSON=Class.extend({
      _ClassName: "CSS2JSON",
      init: function() {
        this.css={};
        var isCSSRule,strObj,styleSheets=document.styleSheets,jsonStrObj,selector,p,lp;
        for(var i=0,li=styleSheets.length;i<li;i++) {
          var rules=[];
          try {
            if(styleSheets[i].rules) rules=styleSheets[i].rules
            else if(styleSheets[i].cssRules) rules=styleSheets[i].cssRules;
          } catch(e) {
          }
          for(var j=0,lj=rules.length;j<lj;j++) {
            if($j.browser.opera) isCSSRule=(rules[j].toString().contains("CSSStyleRule"));
            else isCSSRule=(rules[j] instanceof CSSStyleRule);
            if(isCSSRule) {
              var selectors=String.EMPTY;
              if(rules[j].selectorText.indexOf(",")) selectors=rules[j].selectorText.split(",");
              strObj={};
              var style=rules[j].style,names;
              for(var l=0,ll=style.length;l<ll;l++) {
                strObj[this.CSSName2JS(style[l])]=style[this.CSSName2JS(style[l])];
              }
              jsonStrObj=JSON.stringify(strObj);
              if(typeof selectors!=="string") {
                for(var k=0,lk=selectors.length;k<lk;k++) {
                  selector=selectors[k].trim();
                  selector=selector.replace(".",String.EMPTY);
                  if(!this.css[selector]) {
                    this.css[selector]=JSON.parse(jsonStrObj);
                  } else {
                    names=Object.getOwnPropertyNames(strObj);
                    for(p=0,lp=names.length;p<lp;p++) {
                      //if(strObj.hasOwnProperty(names[p])) {
                        this.css[selector][this.CSSName2JS(names[p])]=strObj[this.CSSName2JS(names[p])];
                      //}
                    }
                  }
                }
              } else {
                selector=selectors.trim();
                selector=selector.replace(".",String.EMPTY);
                if(!this.css[selector]) {
                  this.css[selector]=JSON.parse(jsonStrObj);
                } else {
                  names=Object.getOwnPropertyNames(strObj);
                  for(p=0,lp=names.length;p<lp;p++) {
                    if(strObj.hasOwnProperty(names[p])) {
                      this.css[selector][this.CSSName2JS(names[p])]=strObj[this.CSSName2JS(names[p])];
                    }
                  }
                  //for (var prop in strObj){
                  //  if (strObj.hasOwnProperty(prop)){
                  //    this.css[selector][this.CSSName2JS(prop)]=strObj[this.CSSName2JS(prop)];
                  //  }
                  //}
                }
              }
            }
          }
        }
      },
      //#region Methods
      CSSName2JS: function(cssName) {
        var words;
        if(cssName.indexOf("-")) {
          cssName=cssName.replace(/-value/g,String.EMPTY);
          words=cssName.split("-");
          for(var i=0,l=words.length;i<l;i++) {
            if(i>0) words[i]=words[i].firstCharUpper();
            else if(words[i]==='moz'||words[i]==='o'||words[i]==='ms'||words[i]==='webkit') words[i]='-'+words[i];
          }
          return words.join(String.EMPTY);
        } else return cssName;
      }
      //#endregion
    });*/
    //#endregion CSS2JSON
    //#region Looper
    $j.looper = {
        listeners: [],
        functions: [],
        fps: 60,
        handle: null,
        paused: false,
        rAF: null,
        isBusy: false,
        //#region Getter/Setter
        setFPS: function (fps) {
            if (typeof fps !== "number") return;
            if (this.fps !== fps) {
                this.stop();
                this.fps = fps;
                this.rAF = window.requestAnimationFrameRate(this.fps);
                this.start();
            }
        },
        //#endregion
        start: function () {
            this.handle = this.rAF(this.loop);
        },
        stop: function () {
            if (this.handle !== null) window.cancelAnimationFrameRate(this.handle);
            this.handle = null;
        },
        pause: function () {
        },
        //#region Methods
        loop: function (elapsedTime) {
            if ($j.looper.paused || $j.looper.isBusy) return;
            if (!$j.looper.handle) return;
            $j.looper.isBusy = true;
            for (var i = 0, l = ($j.looper.listeners ? $j.looper.listeners.length : 0) ; i < l; i++) {
                var listener = $j.looper.listeners[i], func = $j.looper.functions[i];
                if (listener) {
                    listener[func](elapsedTime);
                }
            }
            $j.looper.isBusy = false;
            $j.looper.rAF($j.looper.loop);
            //console.log('loop');
        },
        addListener: function (obj, func) {
            if (!obj) return;
            if (this.listeners.indexOf(obj) > -1) return;
            this.removeListener(obj);
            this.listeners.push(obj);
            if (!func) func = "processTick";
            this.functions.push(func);
        },
        removeListener: function (obj) {
            var index = this.listeners.indexOf(obj);
            if (index !== -1) {
                this.listeners.splice(index, 1);
                this.functions.splice(index, 1);
            }
        },
        removeAllListeners: function () {
            this.listeners.length = 0;
            //this.functions.length=0;
        }
        //#endregion
    };
    //#endregion
    var scripts = document.getElementsByTagName("script");
    var curScript = scripts[scripts.length - 1];
    //if ( curScript.executed ) return;
    var url = curScript.src.split("?");
    if (url.length === 1) $j.start();
    else $j.doc = document;
})();
//http://www.codeproject.com/Tips/1095458/Pretty-Print-JavaScript-Object-Array
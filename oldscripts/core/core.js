define(['require', 'looper', 'apps'], function (require, Looper, Apps) {
    //#region requestAnimationFrameRate
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
                    else
                    {
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
    //#endregion
    //#region Class
    var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_inherited\b/ : /.*/;
    // The base Class implementation (does nothing)
    var Class = function () { this.tag = null; this._props = {}; };

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
        for (var name in prop)
        {
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
            for (var k in this)
            {
                if (this.hasOwnProperty(k))
                {
                    dest[k] = this[k];
                }
            }
        };
        return F;
    };
    //#endregion
    //#region Core
    var _Core = {
        apps: Apps,
        looper: Looper,
        Class: Class,
        renderer: (document.documentElement.dataset.renderer !== undefined) ? document.documentElement.dataset.renderer : "html",
        propertiesCategories: {},
        bindableProperties: [],
        isHTMLRenderer: function () {
            var Types = require('types');
            return this.renderer === Types.RENDERERS.HTML;
        },
        isCANVASRenderer: function () {
            var Types = require('types');
            return this.renderer === Types.RENDERERS.CANVAS;
        },
        isWEBGLRenderer: function () {
            var Types = require('types');
            return this.renderer === Types.RENDERERS.WEBGL;
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
        rtStyle: null,
        dragWindow: null,
        resizeWindow: null,
        templates: {},
        start: function () {
            var language = window.navigator.userLanguage || window.navigator.language;
            if (language.indexOf("-") === -1) language = language + "-" + language.toUpperCase();
            this.currentLocale = language;
            if (this.isHTMLRenderer()) this.looper.setFPS(25);
            this.doc = document;
            this.doc.oncontextmenu = function () { return false; };
            this.doc.addEventListener("keydown", this.apps.keyDown, true);
            this.doc.addEventListener("keyup", this.apps.keyUp, true);
            this.doc.addEventListener("keypress", this.apps.keyPress, true);
            this.doc.addEventListener("DOMContentLoaded",
                function () {
                    require(['core', 'tools', 'classes'], function (Core, Tools, Classes) {
                        //var logo, waiting, progressOuter, progressInner, text, ie = false;
                        //var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
                        //if (match) ie = match.length > 0;
                        // on charge le theme par défaut
                        if (Core.isHTMLRenderer())
                        {
                            Tools.loadTheme(Core.defaultTheme);
                            Core.clipboard = Core.doc.createElement("textarea");
                            Core.clipboard.id = "jaguiClipboard";
                            Core.clipboard.value = ".";
                            Core.doc.body.appendChild(Core.clipboard);
                        }// else this.themes[this.defaultTheme]={};
                        if (!Tools.HTMLParentElement)
                        {
                            //$j.doc.documentElement.ClassName=$j.defaultTheme+"_body "+$j.defaultTheme+"_default";
                            //if (ie) $j.doc.body.setAttribute("data-theme",$j.defaultTheme);
                            //else $j.doc.body.dataset.theme=$j.defaultTheme;
                            Core.doc.body.className += " " + Core.defaultTheme;
                        }
                        Core.doc.body.className = Core.defaultTheme;
                        //logo = $j.doc.createElement("span");
                        //logo.className = "JAGUI";
                        //logo.innerHTML="D";
                        //if (!$j.tools.HTMLParentElement) $j.doc.body.appendChild(logo);
                        //else $j.tools.HTMLParentElement.appendChild(logo);
                        //if ($j.isHTMLRenderer())
                        //{
                        //    waiting = $j.doc.createElement("div");
                        //    waiting.className = "Control loading " + $j.defaultTheme;
                        //    waiting.id = "waiting";
                        //    logo = $j.doc.createElement("div");
                        //    logo.id = "loading_logo";
                        //    logo.className = "Control loading_logo rotateAnimation";
                        //    waiting.appendChild(logo);
                        //    progressOuter = $j.doc.createElement("div");
                        //    progressOuter.className = "Control loading_progressOuter " + $j.defaultTheme;
                        //    progressOuter.id = "progressOuter";
                        //    progressInner = $j.doc.createElement("div");
                        //    progressInner.id = "progressInner";
                        //    progressInner.className = "Control loading_progressInner " + $j.defaultTheme;
                        //    progressOuter.appendChild(progressInner);
                        //    waiting.appendChild(progressOuter);
                        //    text = $j.doc.createElement("div");
                        //    text.className = "Control loading_text " + $j.defaultTheme;
                        //    text.id = "file_text";
                        //    text.value = ".";
                        //    waiting.appendChild(text);
                        //    if (!$j.tools.HTMLParentElement) $j.doc.body.appendChild(waiting);
                        //    else $j.tools.HTMLParentElement.appendChild(waiting);
                        //    $j.tools.step = ~~(180 / ($j.tools.scripts.length - 1));
                        //}
                        //if($j.HTMLParentElement) $j.HTMLParentElement.ClassName=$j.defaultTheme+"_body";
                        if (Tools.HTMLParentElement)
                        {
                            //if (ie) $j.HTMLParentElement.setAttribute("data-theme",$j.defaultTheme);
                            //else $j.HTMLParentElement.dataset.theme=$j.defaultTheme;
                            Tools.HTMLParentElement.className += " " + Core.defaultTheme
                        }
                        Tools.loadScript();
                        Tools.afterLoadScripts = function () {
                            Tools.xhr.load(true, Tools.uri.base() + Core.folders["{LOCALES}"] + Core.currentLocale + ".json", function (dx, localeName) {
                                Core.locales[$j.types.languages[localeName.replace("-", "_")]] = JSON.parse(dx);
                            }, false, Core.currentLocale);
                            Core.animatedCursor = new Classes.AnimatedCursor();
                            Classes.registerPropertiesInCategory("ACTION", ["action", "caption", "enabled", "helpContext", "toolTip", "visible"]);
                            Classes.registerPropertiesInCategory("HELPHINTS", ["helpContext", "helpFile", "helpKeyWord", "helpType", "toolTip", "showToolTip", "ownerShowToolTip"]);
                            Classes.registerPropertiesInCategory("LAYOUT", ["align", "anchors", "autosize", "constraints", "height", "left", "margins", "padding", "top", "width", "tabOrder"]);
                            Classes.registerPropertiesInCategory("MISCELLANEOUS", []);
                            Classes.registerPropertiesInCategory("INPUT", ["enabled"]);
                            Classes.registerPropertiesInCategory("DRAGDROPDOCKING", []);
                            Classes.registerPropertiesInCategory("LEGACY", []);
                            Classes.registerPropertiesInCategory("LINKAGE", ["action", "popupMenu"]);
                            Classes.registerPropertiesInCategory("LOCALE", []);
                            Classes.registerPropertiesInCategory("LOCALIZABLE", ["caption", "constraints", "font", "height", "toolTip", "icon", "left", "top", "width"]);
                            Classes.registerPropertiesInCategory("VISUAL", ["align", "cursor", "enabled", "caption", "visible", "width", "top", "left", "height"]);
                            Classes.registerPropertiesInCategory("DATABASE", []);
                            if (typeof Core.ready === "function") Core.ready();
                        };
                    });
                }, false
            );
        }
    };
    //var scripts = document.getElementsByTagName("script");
    //var curScript = scripts[scripts.length - 1];
    ////if ( curScript.executed ) return;
    //var url = curScript.src.split("?");
    //if (url.length === 1) Core.start();
    //else Core.doc = document;
    //#endregion
    return _Core
});
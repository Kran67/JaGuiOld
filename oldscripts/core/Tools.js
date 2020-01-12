define(['require', 'core'], function (require, Core)
{
    var tools = {
        HTMLParentElement: null,
        afterLoadScripts: null,
        scripts: [],
        loadedScripts: [],
        windowsHTML: [],
        idx: 0,
        currentProgress: "progressOuter",
        step: 0,
        Debugger: {
            debug: false,
            useFragment: false,
            log: function (arg, obj, t) {
                var Tools = require("tools");
                if (Tools.Debugger.debug && !obj._loading/*&&!obj.form._loading*/) console.log(arg.callee.name + String.SPACE + (new Date().getTime() - t) + "ms");
            }
        },
        //#region Methods
        include: function (object, property, value) {
            if (!bitTest(object[property], value)) object[property].push(value);
        },
        bitTest: function (flags, value) {
            return (flags.indexOf(value) !== -1);
        },
        exclude: function (object, property, value) {
            if (bitTest(object[property], value)) {
                var idx = object[property].indexOf(value);
                if (idx > -1) object[property].splice(idx, 1);
            }
        },
        isValidIdent: function (ident, allowDots) {
            var alphaChars = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,_';
            var alpha = alphaChars.split(",");
            var alphaNumeric = (alpha.join(",") + ',0,1,2,3,4,5,6,7,8,9').split(",");
            var alphaNumericDot = (alphaNumeric.join(",") + ',.').split(","), i, l;
            var Types = require("types");
            if (typeof ident !== Types.CONSTANTS.STRING) return false;
            if (typeof allowDots !== Types.CONSTANTS.BOOLEAN) allowDots = false;
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
            var Types = require("types");
            if (typeof set !== Types.CONSTANTS.OBJECT) return;
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
        //loadNextScript: function () {
        //    $j.tools.idx++;
        //    if ($j.tools.idx >= $j.tools.scripts.length) {
        //        $j.tools.scripts.length = 0;
        //        $j.tools.idx = 0;
        //        if (typeof $j.tools.afterLoadScripts === "function") $j.tools.afterLoadScripts();
        //        $j.tools.afterLoadScripts = null;
        //    } else $j.tools.loadScript();
        //},
        loadScript: function () {
            var html_doc, node, fileText, scriptName;
            //if ($j.tools.scripts[$j.tools.idx] === "") $j.tools.loadNextScript();
            //scriptName=$j.tools.uri.split($j.tools.scripts[$j.tools.idx],true);
            var Tools = require("tools");
            var Types = require("types");
            scriptName = Tools.scripts[Tools.idx];
            if (Tools.loadedScripts.indexOf(scriptName) === -1) {
                html_doc = document.getElementsByTagName("head")[0];
                node = document.createElement("script");
                node.setAttribute("type", "text/javascript");
                node.addEventListener("load", function () {
                    var p, isComponent = false, splitedPath, t, i, l;
                    //if ($j.isHTMLRenderer()) {
                    //    p = $j.doc.getElementById($j.tools.currentProgress);
                    //    if (p) {
                    //        if ($j.tools.currentProgress === "progressInner" && $j.tools.idx === 0) {
                    //            $j.tools.step = (180 / ($j.tools.scripts.length - 2));
                    //            p.style.width = 0;
                    //        }
                    //        p.style.width = (p.offsetWidth + $j.tools.step) + "px";
                    //    }
                    //}
                    if (Types.CATEGORIES) {
                        splitedPath = Tools.uri.split(Tools.scripts[Tools.idx]);
                        p = splitedPath[splitedPath.length - 2];
                        t = [Types.INTERNALCATEGORIES.COMPONENTS,
                            Types.CATEGORIES.COMMON,
                            Types.CATEGORIES.ACTIONS,
                            Types.CATEGORIES.CONTAINERS,
                            Types.CATEGORIES.NONVISUAL,
                            Types.CATEGORIES.EXTENDED,
                            Types.CATEGORIES.TOOLBARS,
                            Types.CATEGORIES.MENUS,
                            Types.CATEGORIES.DIALOGS,
                            Types.CATEGORIES.EXTRAS,
                            Types.CATEGORIES.COLOR,
                            Types.CATEGORIES.DATA].indexOf(p);
                        isComponent = t > -1 ? true : false;
                        if (isComponent) {
                            t = Tools.uri.extractFileName(Tools.scripts[Tools.idx]);
                            Tools.loadCssFile(Tools.getPath(Types.CATEGORIES.BASECSSCOMPONENTS) + t);
                            if ([Types.CATEGORIES.NONVISUAL, Types.CATEGORIES.DIALOGS, Types.CATEGORIES.ACTIONS, Types.CATEGORIES.DATA].indexOf(p) === -1) {
                                Tools.loadCssFile(Tools.getPath(Types.CATEGORIES.THEMESCSSCOMPONENTS) + Core.defaultTheme + "/" + t);
                            }
                            Core.apps.activeApplication.themeManifest.loadComponentTheme(t);
                        }
                    }
                    //$j.tools.loadNextScript();
                }, false);
                node.addEventListener("error", function () {
                    if (Tools.Debugger.debug) console.log(Tools.scripts[Tools.idx] + " not loaded");
                    Tools.loadedScripts.remove(Tools.scripts[Tools.idx]);
                    Tools.loadNextScript();
                }, false);
                node.setAttribute("src", Tools.uri.base() + Tools.scripts[Tools.idx] + ".js");//?rnd="+new Date().getTime());
                if (Core.isHTMLRenderer()) {
                    fileText = Core.doc.getElementById("file_text");
                    if (fileText) {
                        fileText.innerHTML = Tools.scripts[Tools.idx] + ".js";
                    }
                }
                Tools.loadedScripts.push(scriptName);
                html_doc.appendChild(node);
            } else Tools.loadNextScript();
            node = null;
            html_doc = null;
        },
        uses: function () {
            var Tools = require("tools");
            for (var i = 0, l = arguments.length; i < l; i++) {
                if (arguments[i] === '') continue;
                if ((Tools.loadedScripts.indexOf(arguments[i]) === -1) && Tools.scripts.indexOf(arguments[i]) === -1) Tools.scripts.push(arguments[i]);
            }
            //if (Core.isHTMLRenderer()) {
            //    if ($j.tools.currentProgress === "progressInner") {
            //        var p = $j.doc.getElementById($j.tools.currentProgress);
            //        if (p) {
            //            p.style.width = "0px";
            //            $j.tools.step = ~~(180 / $j.tools.scripts.length + 1);
            //        }
            //    }
            //}
        },
        loadFormRes: function (resName, object) {
            var fileText, p, style;
            var Tools = require("tools");
            if (Core.isHTMLRenderer()) {
                fileText = Core.doc.getElementById("file_text");
                if (fileText) {
                    fileText.innerHTML = "Creating window & objects\nPlease wait...";
                }
                //p = Core.doc.getElementById($j.tools.currentProgress);
                //if (p) {
                //    if ($j.tools.currentProgress === "progressInner") p.style.width = "99%";
                //}
                //if ($j.tools.loadedScripts.indexOf(resName)===-1) {
                style = Core.doc.createElement("link");
                style.setAttribute("rel", "stylesheet");
                style.setAttribute("href", Tools.uri.base() + resName + ".css?rnd=" + new Date().getTime());
                style.setAttribute("media", "screen");
                style.addEventListener("error", function () { });
                Core.doc.getElementsByTagName("head")[0].appendChild(style);
                //}
                // tester si le css 'animate' est déjà présent
                //if ($j.tools.loadedScripts.indexOf("animate")===-1) {
                style = Core.doc.createElement("link");
                style.setAttribute("rel", "stylesheet");
                style.setAttribute("href", Tools.uri.base() + "css/animate.css");
                style.setAttribute("media", "screen");
                style.addEventListener("error", function () { });
                Core.doc.getElementsByTagName("head")[0].appendChild(style);
                //}
            }
            //$j.tools.xhr.load(true,$j.tools.uri.base()+resName+".html?rnd="+new Date().getTime(),function(dx) {
            //  $j.doc.body.innerHTML+=dx;
            //},false);
            Tools.windowsHTML.push(Tools.uri.base() + resName + ".html?rnd=" + new Date().getTime());
            Core.apps.activeApplication._loadedWindowsHTML++;
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
            path = Core.folders[path];
            return path;
        },
        loadTheme: function (themeName) {
            var Tools = require("tools");
            //vérification que le thème n'a pas déjà été chargé
            for (var i = 0, l = Core.doc.styleSheets.length; i < l; i++) {
                if (document.styleSheets[i].id === themeName) return;
            }
            var style = Core.doc.createElement("link");
            style.setAttribute("rel", "stylesheet");
            style.setAttribute("href", Tools.uri.base() + this.getPath("THEMESCSSCOMPONENTS") + themeName + "/" + themeName.toLowerCase() + ".css?rnd=" + new Date().getTime());
            style.setAttribute("media", "screen");
            style.addEventListener("error", function () { });
            Core.doc.getElementsByTagName("head")[0].appendChild(style);
            Core.themes[themeName] = {};
        },
        loadCssFile: function (fileName) {
            var Tools = require("tools");
            var style = Core.doc.createElement("link");
            style.setAttribute("rel", "stylesheet");
            style.setAttribute("href", Tools.uri.base() + fileName + ".css?rnd=" + new Date().getTime());
            style.setAttribute("media", "screen");
            style.addEventListener("error", function () { });
            Core.doc.getElementsByTagName("head")[0].appendChild(style);
        },
        loadJsFile: function (fileName) {
            var node = Core.doc.createElement("script");
            node.setAttribute("type", "text/javascript");
            node.setAttribute("src", fileName + "?rnd=" + new Date().getTime());
            node.addEventListener("load", function () { }, false);
            node.addEventListener("error", function () { });
            Core.doc.getElementsByTagName("head")[0].appendChild(node);
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
            var Types = require("types");
            //answer a shallow copy of target
            var value, c, property, names, i, l;

            if (typeof object !== Types.CONSTANTS.OBJECT) {
                return object;
            } else {
                value = object.valueOf();
                if (object !== value) {
                    return new object.constructor(value);
                } else {
                    if (object instanceof object.constructor &&
                        object.constructor !== Object) {
                        c = Core.clone(object.constructor.prototype);
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
            if (Core.apps.activeApplication.locale) {
                if (Core.locales[Core.apps.activeApplication.locale]) return Core.locales[Core.apps.activeApplication.locale];
                else Core.locales[Core.currentLocale];
            } else return Core.locales[Core.currentLocale];
        },
        getDefaultLocale: function () {
            return Core.locales[Core.currentLocale];
        },
        localeExist: function (locale) {
            return Core.locales[Core.currentLocale];
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
            Core.looper.addListener(obj, "resized");
        },
        removeResizeListeners: function (form) {
            var i = Core.looper.listeners.length - 1;
            Core.looper.stop();
            while (i >= 0) {
                if (Core.looper.listeners[i].form === form) Core.looper.removeListener(Core.looper.listeners[i]);
                i--;
            }
            if (Core.looper.listeners.length > 0) Core.looper.start();
        },
        addPropertyFromSet: function (obj, prop, set, value) {
            //if (!obj._props) obj._props={};
            obj._props[prop] = set;
            obj[prop] = value;
        },
        getPropertiesFromObject: function (obj) {
            var props = [], keys, i, propName;
            var Types = require("types");
            keys = Object.keys(obj);
            for (i = 0; i < keys.length; i++) {
                propName = keys[i];
                if (propName === "rotateAngle") continue;
                if (propName === "rotateCenter") continue;
                if (obj.hasOwnProperty(propName)) {
                    if (!propName.startsWith('_') && !propName.startsWith('on') && (typeof obj[propName] !== Types.CONSTANTS.FUNCTION) && (propName !== "form") && (propName !== "app")) {
                        props.push({ "property": propName, "value": obj[propName], "categories": Core.Classes.getPropertyCategories(propName) });
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
    return tools;
});
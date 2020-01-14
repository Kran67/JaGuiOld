class Tools {
    /*constructor() {
        this.HTMLParentElement = null;
        //afterLoadScripts: null,
        //scripts: [],
        //loadedScripts: [],
        this.windowsHTML = [];
        //idx: 0,
        //currentProgress: "progressOuter",
        //step: 0,
    }*/
    //#region Methods
    static isNumber(value) {
        return typeof value === Types.CONSTANTS.NUMBER;
    }
    static isString(value) {
        return typeof value === Types.CONSTANTS.STRING;
    }
    static isBool(value) {
        return typeof value === Types.CONSTANTS.BOOLEAN;
    }
    static isObject(value) {
        return typeof value === Types.CONSTANTS.OBJECT;
    }
    static isFunc(value) {
        return typeof value === Types.CONSTANTS.FUNCTION;
    }
    static isArray(value) {
        return typeof value === Types.CONSTANTS.ARRAY;
    }
    static isDate(value) {
        return typeof value === Types.CONSTANTS.DATE;
    }
    static include(object, property, value) {
        if (!bitTest(object[property], value)) {
            object[property].push(value);
        }
    }
    static bitTest(flags, value) {
        return flags.indexOf(value) !== -1;
    }
    static exclude(object, property, value) {
        if (bitTest(object[property], value)) {
            const idx = object[property].indexOf(value);
            if (idx > -1) {
                object[property].splice(idx, 1);
            }
        }
    }
    static isValidIdent(ident, allowDots) {
        const CONSTANTS = Types.CONSTANTS;
        const alphaChars = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,_";
        const alpha = alphaChars.split(",");
        const alphaNumeric = (`${alpha.join(",")},0,1,2,3,4,5,6,7,8,9`).split(",");
        const alphaNumericDot = (alphaNumeric.join(",") + ",.").split(",");
        if (typeof ident === CONSTANTS.STRING) {
            if (typeof allowDots !== CONSTANTS.BOOLEAN) {
                allowDots = false;
            }
            if (ident.length === 0 || alpha.indexOf(ident[0]) === -1) {
                return false;
            }
            if (allowDots) {
                ident.forEach(id => {
                    if (alphaNumericDot.indexOf(id) === -1) {
                        return false;
                    }
                });
            } else {
                ident.forEach(id => {
                    if (alphaNumeric.indexOf(id) === -1) {
                        return false;
                    }
                });
            }
            return true;
        }
        return false;
    }
    static valueInSet(value, set) {
        if (typeof set === Types.CONSTANTS.OBJECT) {
            const names = Object.getOwnPropertyNames(set);
            let founded = false;
            founded = names.some(name => {
                return set[name] === value;
            });
            return founded;
        }
        return false;
    }
    static emptyFunc() { }
    //loadNextScript () {
    //    $j.tools.idx++;
    //    if ($j.tools.idx >= $j.tools.scripts.length) {
    //        $j.tools.scripts.length = 0;
    //        $j.tools.idx = 0;
    //        if (typeof $j.tools.afterLoadScripts === "function") $j.tools.afterLoadScripts();
    //        $j.tools.afterLoadScripts = null;
    //    } else $j.tools.loadScript();
    //}
    /*loadScript () {
        let html_doc, node, fileText, scriptName;
        //if ($j.tools.scripts[$j.tools.idx] === "") $j.tools.loadNextScript();
        //scriptName=$j.tools.uri.split($j.tools.scripts[$j.tools.idx],true);
        let Tools = require("tools");
        let Types = require("types");
        scriptName = Tools.scripts[Tools.idx];
        if (Tools.loadedScripts.indexOf(scriptName) === -1) {
            html_doc = document.getElementsByTagName("head")[0];
            node = document.createElement("script");
            node.setAttribute("type", "text/javascript");
            node.addEventListener("load", function () {
                let p, isComponent = false, splitedPath, t, i, l;
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
            } false);
            node.addEventListener("error", function () {
                if (Tools.debug) console.log(Tools.scripts[Tools.idx] + " not loaded");
                Tools.loadedScripts.remove(Tools.scripts[Tools.idx]);
                Tools.loadNextScript();
            } false);
            node.setAttribute("src", Tools.uri.base() + Tools.scripts[Tools.idx] + ".js");//?rnd="+new Date().getTime());
            if (Core.isHTMLRenderer()) {
                fileText = document.getElementById("file_text");
                if (fileText) {
                    fileText.innerHTML = Tools.scripts[Tools.idx] + ".js";
                }
            }
            Tools.loadedScripts.push(scriptName);
            html_doc.appendChild(node);
        } else Tools.loadNextScript();
        node = null;
        html_doc = null;
    }
    uses () {
        let Tools = require("tools");
        for (let i = 0, l = arguments.length; i < l; i++) {
            if (arguments[i] === '') continue;
            if ((Tools.loadedScripts.indexOf(arguments[i]) === -1) && Tools.scripts.indexOf(arguments[i]) === -1) Tools.scripts.push(arguments[i]);
        }
        //if (Core.isHTMLRenderer()) {
        //    if ($j.tools.currentProgress === "progressInner") {
        //        let p = $j.doc.getElementById($j.tools.currentProgress);
        //        if (p) {
        //            p.style.width = "0px";
        //            $j.tools.step = ~~(180 / $j.tools.scripts.length + 1);
        //        }
        //    }
        //}
    }*/
    static loadFormRes(resName) {
        //let fileText, p, style;
        if (Core.isHTMLRenderer) {
            const fileText = document.getElementById("file_text");
            if (fileText) {
                fileText.innerHTML = "Creating window & objects\nPlease wait...";
            }
            //p = document.getElementById($j.tools.currentProgress);
            //if (p) {
            //    if ($j.tools.currentProgress === "progressInner") p.style.width = "99%";
            //}
            //if ($j.tools.loadedScripts.indexOf(resName)===-1) {
            //style = document.createElement("link");
            //style.setAttribute("rel", "stylesheet");
            //style.setAttribute("href", Tools.uri.base() + resName + ".css?rnd=" + new Date().getTime());
            //style.setAttribute("media", "screen");
            //style.addEventListener("error", function () { });
            //document.getElementsByTagName("head")[0].appendChild(style);
            //}
            // tester si le css 'animate' est déjà présent
            //if ($j.tools.loadedScripts.indexOf("animate")===-1) {
            //style = document.createElement("link");
            //style.setAttribute("rel", "stylesheet");
            //style.setAttribute("href", Tools.uri.base() + "css/animate.css");
            //style.setAttribute("media", "screen");
            //style.addEventListener("error", function () { });
            //document.getElementsByTagName("head")[0].appendChild(style);
            //}
        }
        //$j.tools.xhr.load(true,$j.tools.uri.base()+resName+".html?rnd="+new Date().getTime(),function(dx) {
        //  $j.doc.body.innerHTML+=dx;
        //}false);
        //Tools.windowsHTML.push(Tools.uri.base() + resName + ".html?rnd=" + new Date().getTime());
        Core.apps.activeApplication.loadedWindowsHTML++;
    }
    static getObjectFromString(_object, stringProp) {
        const tabs = stringProp.split(".").shift();
        let obj = _object.first;
        if (typeof obj === Types.CONSTANTS.OBJECT && obj) {
            tabs.forEach(tab => {
                obj = obj[tab];
            });
            return { object: obj, property: tab.last };
        }
        return { object: _object, property: stringProp };
    }
    static execFunc(object, func, param, timeToWait) {
        setTimeout(() => { object[func](param); }, timeToWait ? timeToWait : 0);
    }
    //getPath (subfolder) {
    //    let path = subfolder.toUpperCase();
    //    path = Core.folders[path];
    //    return path;
    //}
    //loadTheme (themeName) {
    //    let Tools = require("tools");
    //    //vérification que le thème n'a pas déjà été chargé
    //    for (let i = 0, l = document.styleSheets.length; i < l; i++) {
    //        if (document.styleSheets[i].id === themeName) return;
    //    }
    //    let style = document.createElement("link");
    //    style.setAttribute("rel", "stylesheet");
    //    style.setAttribute("href", Tools.uri.base() + this.getPath("THEMESCSSCOMPONENTS") + themeName + "/" + themeName.toLowerCase() + ".css?rnd=" + new Date().getTime());
    //    style.setAttribute("media", "screen");
    //    style.addEventListener("error", function () { });
    //    document.getElementsByTagName("head")[0].appendChild(style);
    //    Core.themes[themeName] = {};
    //}
    //loadCssFile (fileName) {
    //    let Tools = require("tools");
    //    let style = document.createElement("link");
    //    style.setAttribute("rel", "stylesheet");
    //    style.setAttribute("href", Tools.uri.base() + fileName + ".css?rnd=" + new Date().getTime());
    //    style.setAttribute("media", "screen");
    //    style.addEventListener("error", function () { });
    //    document.getElementsByTagName("head")[0].appendChild(style);
    //}
    //loadJsFile (fileName) {
    //    let node = document.createElement("script");
    //    node.setAttribute("type", "text/javascript");
    //    node.setAttribute("src", fileName + "?rnd=" + new Date().getTime());
    //    node.addEventListener("load", function () { } false);
    //    node.addEventListener("error", function () { });
    //    document.getElementsByTagName("head")[0].appendChild(node);
    //}
    static clone(object) {
        //answer a new instance of target's type
        if (typeof object === Types.CONSTANTS.OBJECT) {
            const Clone = () => { object.constructor.apply(this); };
            Clone.prototype = object;
            return new Clone();
        } else {
            return object;
        }
    }
    static copy(object) {
        //let Types = require("types");
        //answer a shallow copy of target
        if (typeof object === Types.CONSTANTS.OBJECT) {
            const value = object.valueOf();
            if (object !== value) {
                return new object.constructor(value);
            } else {
                if (object instanceof object.constructor &&
                    object.constructor !== Object) {
                    const c = Core.clone(object.constructor.prototype);
                    const names = Object.getOwnPropertyNames(object);
                    names.forEach(name => {
                        if (object.hasOwnProperty(name)) {
                            c[names[name]] = object[name];
                        }
                    });
                } else {
                    const c = {};
                    const names = Object.getOwnPropertyNames(object);
                    names.forEach(name => {
                        if (!c[name]) {
                            c[name] = object[name];
                        }
                    });
                }
                return c;
            }
        }
        return object;
    }
    static getLocale() {
        if (Core.apps.activeApplication.locale) {
            if (Core.locales[Core.apps.activeApplication.locale]) {
                return Core.locales[Core.apps.activeApplication.locale];
            } else {
                return Core.locales[Core.currentLocale];
            }
        } else {
            return Core.locales[Core.currentLocale];
        }
    }
    static getDefaultLocale() {
        return Core.locales[Core.currentLocale];
    }
    static localeExist(locale) {
        return Core.locales[Core.currentLocale];
    }
    static getFuncName(func) {
        if (func.name) {
            return func.name;
        } else {
            return func.toString().match(/^function\s*([^\s(]+)/)[1];
        }
    }
    static addResizeListener(obj) {
        obj._hasResizeEvent = true;
        //obj._resizeDatas.width=obj.HTMLElement.offsetWidth;
        //obj._resizeDatas.height=obj.HTMLElement.offsetHeight;
        Core.looper.addListener(obj, "resized");
    }
    static removeResizeListeners(form) {
        let i = Core.looper.listeners.length - 1;
        Core.looper.stop();
        while (i >= 0) {
            if (Core.looper.listeners[i].form === form) {
                Core.looper.removeListener(Core.looper.listeners[i]);
            }
            i--;
        }
        if (Core.looper.listeners.length > 0) Core.looper.start();
    }
    /**
     * Add a property whose value is contained in a set
     * @method addPropertyFromEnum
     * @param {Any}         params
     * @param {Component}   params.obj
     * @param {String}      params.propName
     * @param {Oject}       params.set
     * @param {Any}         params.value
     * @param {Boolean}     params.forceUpdate
     * @param {Function}    params.setter
     * @param {Boolean}     params.enumerable
     * @param {Any}         params.variable
     */
    static addPropertyFromEnum(params) {
        //obj._props[prop] = set;
        //obj[prop] = value;
        params.component.addPropertyEnum(params.propName, params.enum);
        if (params.hasOwnProperty("value")) {
            params.variable[params.propName] = params.value;
        }
        if (params.forceUpdate === undefined) {
            params.forceUpdate = false;
        }
        if (params.enumerable === undefined) {
            params.enumerable = true;
        }
        const setter = params.setter ? params.setter : (newValue) => {
            if (!Tools.valueInSet(newValue, params.enum)) {
                return null;
            }
            if (params.variable[params.propName] !== newValue) {
                params.variable[params.propName] = newValue;
                if (params.forceUpdate && params.component.update && !params.component.loading &&
                    !params.component.form.creating && !params.component.form.loading) {
                    params.component.update();
                }
            }
        };
        //params.component[params.propName] = params.value;
        //params.variable = params.value;
        Object.defineProperty(params.component, params.propName, {
            get: () => { return params.variable[params.propName]; },
            set: setter,
            enumerable: params.enumerable
        });
    }
    static getPropertiesFromObject(obj) {
        const props = [];
        const keys = Object.keys(obj);
        keys.forEach(propName => {
            if (propName !== "rotateAngle" && propName !== "rotateCenter") {
                if (obj.hasOwnProperty(propName)) {
                    if (!propName.startsWith("on") &&
                        typeof obj[propName] !== Types.CONSTANTS.FUNCTION &&
                        propName !== "form" && propName !== "app") {
                        props.push({
                            property: propName,
                            value: obj[propName],
                            categories: Core.classes.getPropertyCategories(propName)
                        });
                    }
                }
            }
        });
        return props;
    }
    static getLeftTopFromTranslation(htmlElement) {
        let mat = getComputedStyle(htmlElement).transform;
        mat = mat.match(/-?[\d\.]+/g);
        return {
            left: ~~mat[4],
            top: ~~mat[5]
        };
    }
    static getNextValueFromEnum(_enum, currentValue) {
        const values = [];
        if (!_enum) {
            return currentValue;
        }
        if (!currentValue) { // à voir
            return currentValue;
        }
        const keys = Object.keys(_enum);
        keys.forEach(key => {
            values.push(_enum[key]);
        });
        let curIndex = values.indexOf(currentValue);
        if (curIndex === -1) {
            return currentValue;
        }
        curIndex++;
        if (curIndex > keys.length) {
            curIndex = keys.length - 1;
        }
        return values[curIndex];
    }
    static getPreviousValueFromEnum(_enum, currentValue) {
        const values = [];
        if (!_enum) {
            return currentValue;
        }
        if (!currentValue) { // à voir
            return currentValue;
        }
        const keys = Object.keys(_enum);
        keys.forEach(key => {
            values.push(_enum[key]);
        });
        let curIndex = values.indexOf(currentValue);
        if (curIndex === -1) {
            return currentValue;
        }
        curIndex--;
        if (curIndex < 0) {
            curIndex = 0;
        }
        return values[curIndex];
    }
    static getValueIndexFromEnum(_enum, currentValue) {
        const values = [];
        if (!_enum) {
            return currentValue;
        }
        if (!currentValue) { // à voir
            return currentValue;
        }
        const keys = Object.keys(_enum);
        keys.forEach(key => {
            values.push(_enum[key]);
        });
        const curIndex = values.indexOf(currentValue);
        return curIndex;
    }
    static getEnumNameFromValue(_enum, currentValue) {
        if (!_enum) {
            return currentValue;
        }
        if (!currentValue) { // à voir
            return currentValue;
        }
        const keys = Object.keys(_enum);
        const enumName = keys.some(key => {
            return _enum[key] === currentValue;
        });
        return enumName;
    }
    //setData:function(HTMLObj,name,value) {
    //  if (HTMLObj.dataset!==null) HTMLObj.dataset[name]=value;
    //  else if (HTMLObj.getAttribute(name)!==null) HTMLObj.setAttribute(name,value);
    //}
    //getData:function(HTMLObj,name) {
    //  if (HTMLObj.dataset!==null) return HTMLObj.dataset[name];
    //  else if (HTMLObj.getAttribute("data-"+name)!==null) return HTMLObj.getAttribute("data-"+name);
    //  else return null;
    //}
    //#endregion Methods
    static checkTrigger(instance, obj) {
        let trigger = true;
        let value = null;
        if (obj.triggers) {
            obj.triggers.forEach((trig, i) => {
                if (trig.ref !== undefined) {
                    instance = instance[trig.ref];
                }
                if (instance[trig.prop]!==undefined) {
                    if (i>0)  {
                        trigger = Tools[trig.bExp](trigger, Tools[trig.op](instance[trig.prop], trig.value));
                    } else {
                        trigger = Tools[trig.op](instance[trig.prop], trig.value);
                    }
                }
            });
            value = trigger ? obj.trueValue : obj.falseValue ? obj.falseValue : value;
        }
        return {
            isOK: trigger,
            value: value
        };
    }
    static storeValue(dic, name, value) {
        dic[name] = value;
    }
    static processRadius(instance, dic, radius) {
        let trigger=false;
        let params = {};
        if (radius.triggers) {
            trigger = Tools.checkTrigger(instance, radius);
            if (trigger.isOK) {
                if (trigger.value) {
                    params = trigger.value;
                    Tools.storeValue(dic, radius.storedName, trigger.value);
                }
            }
        } else if (radius.hasOwnProperty("tl") && radius.hasOwnProperty("tr") && radius.hasOwnProperty("br") && 
            radius.hasOwnProperty("bl")) {
            const keys = Object.keys(radius);
            keys.forEach(key => {
                if (radius[key].triggers) {
                    trigger = Tools.checkTrigger(instance, radius[key]);
                    if (trigger.isOK) {
                        if (trigger.value) {
                            if (typeof trigger.value === Types.CONSTANTS.STRING) {
                                params[key] = dic[trigger.value];
                            } else {
                                params[key] = trigger.value;
                            }
                            if (radius[key].storedName && trigger.value) {
                                Tools.storeValue(dic, radius[key].storedName, trigger.value);
                            }
                        }
                    }
                } else if (typeof radius[key] === Types.CONSTANTS.STRING) {
                    params[key] = dic[radius[key]];
                } else {
                    params[key] = radius[key];
                }
            });
        } else {
            params = radius;
        }
        return params;
    }
    static processShadow(instance, shadow, ctx) {
        if (shadow.triggers) {
            const trigger = Tools.checkTrigger(instance, shadow);
            if (trigger.isOK) {
                if (trigger.value) {
                    const value = trigger.value;
                    ctx.shadowBlur = value.blur;
                    ctx.shadowColor = value.color;
                    ctx.shadowOffsetX = value.offsetX?value.offsetX:0;
                    ctx.shadowOffsetY = value.offsetY?value.offsetY:0;
                }
            }
        } else {
            ctx.shadowBlur = shadow.blur;
            ctx.shadowColor = shadow.color;
            ctx.shadowOffsetX = shadow.offsetX?shadow.offsetX:0;
            ctx.shadowOffsetY = shadow.offsetY?shadow.offsetY:0;
        }
    }
    static processStyle(instance, shape, state, suffixFunc, params) {
        const ctx = Core.ctx;
        const GRADDIRS = Types.GRADIENTDIRECTIONS;
        const changingTheme = document.body.classList.contains("changingTheme");
        const themeName = changingTheme?instance.app.themeManifest.lastThemeName:instance.themeName;
        if (!suffixFunc) {
            suffixFunc = String.EMPTY;
        }
        params = params || [];
        ["fill", "stroke"].forEach(prop => {
            let _state = state;
            ctx.clearShadow();
            const style = shape[`${prop}Style`];
            if (style) {
                let color = style[_state];
                const to = style.iteration != undefined?style.iteration:1;
                if (!color || !instance.enabled) {
                    _state = "normal";
                    color = style[_state];
                    if (!color) {
                        color = Core.themes[themeName].DEFAULTTEXTCOLOR;
                    }
                }
                if (color) {
                    if (Array.isArray(color)) {
                        const grad = ctx.createLinearGradient(0, 0, 
                            [GRADDIRS.TORIGHT, GRADDIRS.TOBOTTOMRIGHT].indexOf(style.gradientDir)>-1?shape.width?shape.width:instance.width:0, 
                            [GRADDIRS.TOBOTTOM, GRADDIRS.TOBOTTOMRIGHT].indexOf(style.gradientDir)>-1?shape.height?shape.height:instance.height:0);
                        color.forEach(cs => {
                            grad.addColorStop(cs.offset, cs.color);
                        });
                        ctx[`${prop}Style`] = grad;
                    } else {
                        ctx[`${prop}Style`] = color;
                    }
                    // Shadow
                    if (style.shadow) {
                        const shadow = Tools.processShadow(instance, style.shadow, ctx);
                    }
                    // lineWidth
                    if (style.lineWidth && style.lineWidth>0) {
                        ctx.lineWidth = style.lineWidth;
                    }
                    // Clip
                    if (style.clipped != undefined && style.clipped) {
                        ctx.clip();
                    }
                    let idx = 0;
                    for (; idx<to; idx++) {
                        ctx[`${prop}${suffixFunc}`](...params);
                    }
                }
            }
        });
        ctx.clearShadow();
    }
    static processBorders(instance, borders) {
        if (borders.triggers) {
            const trigger = Tools.checkTrigger(instance, borders);
            if (trigger.value) {
                return trigger.value;
            } else {
                return null;
            }
        } else {
            return borders;
        }
    }
    static equal(left, right) {
        return left === right;
    }
    static notEqual(left, right) {
        return left !== right;
    }
    static lessThan(left, right) {
        return left < right;
    }
    static greaterThan(left, right) {
        return left > right;
    }
    static lessThanOrEqual(left, right) {
        return left <= right;
    }
    static greaterThanOrEqual(left, right) {
        return left >= right;
    }
    static isFalse(value) {
        return typeof value === Types.CONSTANTS.BOOLEAN && !value;
    }
    static isTrue(value) {
        return typeof value === Types.CONSTANTS.BOOLEAN && value;
    }
    static or(left, right) {
        return left || right;
    }
    static and(left, right) {
        return left && right;
    }
    static indexOf(left, right) {
        return right.indexOf(left)>-1;
    }
}
export { Tools };
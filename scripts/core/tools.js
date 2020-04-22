//#region Tools
class Tools {
    //#region Methods
    //#region isUndefined
    static isUndefined(value) {
        return typeof value === core.types.CONSTANTS.UNDEFINED;
    }
    //#endregion isUndefined
    //#region isNumber
    static isNumber(value) {
        const reg = /^-?\d+\.?\d*$/;
        const regEx = new RegExp(reg);
        return typeof value === core.types.CONSTANTS.NUMBER || regEx.test(value);
    }
    //#endregion isNumber
    //#region isString
    static isString(value) {
        return typeof value === core.types.CONSTANTS.STRING;
    }
    //#endregion isString
    //#region isBool
    static isBool(value) {
        return typeof value === core.types.CONSTANTS.BOOLEAN;
    }
    //#endregion isBool
    //#region isObject
    static isObject(value) {
        return typeof value === core.types.CONSTANTS.OBJECT;
    }
    //#endregion isObject
    //#region isFunc
    static isFunc(value) {
        return typeof value === core.types.CONSTANTS.FUNCTION;
    }
    //#endregion isFunc
    //#region isArray
    static isArray(value) {
        return value.constructor.name.toLowerCase() === core.types.CONSTANTS.ARRAY;
    }
    //#endregion isArray
    //#region isDate
    static isDate(value) {
        return typeof value === core.types.CONSTANTS.DATE;
    }
    //#endregion isDate
    //#region include
    static include(object, property, value) {
        !bitTest(object[property], value) ? object[property].push(value) : 1;
    }
    //#endregion include
    //#region bitTest
    static bitTest(flags, value) {
        return flags.indexOf(value) !== -1;
    }
    //#endregion bitTest
    //#region exclude
    static exclude(object, property, value) {
        if (bitTest(object[property], value)) {
            const idx = object[property].indexOf(value);
            idx > -1 ? object[property].splice(idx, 1) : 1;
        }
    }
    //#endregion exclude
    //#region isValidIdent
    static isValidIdent(ident, allowDots) {
        //#region Variables déclaration
        const CONSTANTS = core.types.CONSTANTS;
        const alphaChars = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,_';
        const alpha = alphaChars.split(',');
        const alphaNumeric = (`${alpha.join(',')},0,1,2,3,4,5,6,7,8,9`).split(',');
        const alphaNumericDot = (alphaNumeric.join(',') + ',.').split(',');
        //#endregion Variables déclaration
        if (typeof ident === CONSTANTS.STRING) {
            typeof allowDots !== CONSTANTS.BOOLEAN ? allowDots = !1 : 1;
            return ident.length === 0 || alpha.indexOf(ident[0]) === -1 ? !1 : !0;
            if (allowDots) {
                ident.forEach(id => {
                    return alphaNumericDot.indexOf(id) === -1 ? !1 : !0;
                });
            } else {
                ident.forEach(id => {
                    return alphaNumeric.indexOf(id) === -1 ? !1 : !0;
                });
            }
            return !0;
        }
        return !1;
    }
    //#endregion isValidIdent
    //#region valueInSet
    static valueInSet(value, set) {
        if (typeof set === core.types.CONSTANTS.OBJECT) {
            const names = Object.getOwnPropertyNames(set);
            let founded = !1;
            founded = names.some(name => {
                return set[name] === value;
            });
            return founded;
        }
        return !1;
    }
    //#endregion valueInSet
    //#region emptyFunc
    static emptyFunc() { }
    //#endregion emptyFunc
    //#region loadFormRes
    static loadFormRes(resName) {
        //let fileText, p, style;
        if (Core.isHTMLRenderer) {
            const fileText = document.getElementById('file_text');
            fileText ? fileText.innerHTML = 'Creating window & objects\nPlease wait...' : 1;
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
        //$j.tools.xhr.load(!0,$j.tools.uri.base()+resName+".html?rnd="+new Date().getTime(),function(dx) {
        //  $j.doc.body.innerHTML+=dx;
        //}!1);
        //Tools.windowsHTML.push(Tools.uri.base() + resName + ".html?rnd=" + new Date().getTime());
        Core.apps.activeApplication.loadedWindowsHTML++;
    }
    //#endregion loadFormRes
    //#region getObjectFromString
    static getObjectFromString(_object, stringProp) {
        //#region Variables déclaration
        const tabs = stringProp.split('.').shift();
        let obj = _object.first;
        //#endregion Variables déclaration
        if (typeof obj === core.types.CONSTANTS.OBJECT && obj) {
            tabs.forEach(tab => {
                obj = obj[tab];
            });
            return { object: obj, property: tab.last };
        }
        return { object: _object, property: stringProp };
    }
    //#endregion getObjectFromString
    //#region execFunc
    static execFunc(object, func, param, timeToWait) {
        setTimeout(() => { object[func](param); }, timeToWait ? timeToWait : 0);
    }
    //#endregion execFunc
    //#region clone
    static clone(object) {
        //answer a new instance of target's type
        if (typeof object === core.types.CONSTANTS.OBJECT) {
            const Clone = () => { object.constructor.apply(this); };
            Clone.prototype = object;
            return new Clone();
        } else {
            return object;
        }
    }
    //#endregion clone
    //#region copy
    static copy(object) {
        //answer a shallow copy of target
        if (typeof object === core.types.CONSTANTS.OBJECT) {
            const value = object.valueOf();
            if (object !== value) {
                return new object.constructor(value);
            } else {
                if (object instanceof object.constructor &&
                    object.constructor !== Object) {
                    const c = Core.clone(object.constructor.prototype);
                    const names = Object.getOwnPropertyNames(object);
                    names.forEach(name => {
                        object.hasOwnProperty(name) ? c[names[name]] = object[name] : 1;
                    });
                } else {
                    const c = {};
                    const names = Object.getOwnPropertyNames(object);
                    names.forEach(name => {
                        !c[name] ? c[name] = object[name] : 1;
                    });
                }
                return c;
            }
        }
        return object;
    }
    //#endregion copy
    //#region getLocale
    static getLocale() {
        if (Core.apps.activeApplication.locale) {
            return Core.locales[Core.apps.activeApplication.locale] ? Core.locales[Core.apps.activeApplication.locale] : Core.locales[Core.currentLocale];
        } else {
            return Core.locales[Core.currentLocale];
        }
    }
    //#endregion getLocale
    //#region getDefaultLocale
    static getDefaultLocale() {
        return Core.locales[Core.currentLocale];
    }
    //#endregion getDefaultLocale
    //#region localeExist
    static localeExist(locale) {
        return Core.locales[Core.currentLocale];
    }
    //#endregion localeExist
    //#region getFuncName
    static getFuncName(func) {
        return func.name ? func.name : func.toString().match(/^function\s*([^\s(]+)/)[1];
    }
    //#endregion getFuncName
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
    //#region addPropertyFromEnum
    static addPropertyFromEnum(params) {
        params.component.propsEnums[params.propName] = params.enum;
        params.hasOwnProperty('value') ? params.variable[params.propName] = params.value : 1;
        params.forceUpdate === undefined ? params.forceUpdate = !1 : 1;
        params.enumerable === undefined ? params.enumerable = !0 : 1;
        const setter = params.setter ? params.setter : (newValue) => {
            if (!core.tools.valueInSet(newValue, params.enum)) {
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
        Object.defineProperty(params.component, params.propName, {
            get: () => { return params.variable[params.propName]; },
            set: setter,
            enumerable: params.enumerable
        });
    }
    //#endregion addPropertyFromEnum
    //#region getPropertiesFromObject
    static getPropertiesFromObject(obj) {
        //#region Variables déclaration
        const props = [];
        const keys = Object.keys(obj);
        //#endregion Variables déclaration
        keys.forEach(propName => {
            if (propName !== 'rotateAngle' && propName !== 'rotateCenter') {
                if (/*obj.hasOwnProperty(propName) && */obj.propertyIsEnumerable(propName)) {
                    if (!propName.startsWith('on') &&
                        !core.tools.isFunc(obj[propName]) /*&& 
                        propName !== 'form' && propName !== 'app'*/) {
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
    //#endregion getPropertiesFromObject
    //#region getLeftTopFromTranslation
    static getLeftTopFromTranslation(htmlElement) {
        //#region Variables déclaration
        let mat = getComputedStyle(htmlElement).transform;
        //#endregion Variables déclaration
        mat = mat.match(/-?[\d\.]+/g);
        return {
            left: ~~mat[4],
            top: ~~mat[5]
        };
    }
    //#endregion getLeftTopFromTranslation
    //#region getNextValueFromEnum
    static getNextValueFromEnum(_enum, currentValue) {
        //#region Variables déclaration
        const values = [];
        //#endregion Variables déclaration
        if (!_enum || !currentValue) { // à voir
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
        curIndex = math.min(curIndex, keys.length - 1);
        return values[curIndex];
    }
    //#endregion getNextValueFromEnum
    //#region getPreviousValueFromEnum
    static getPreviousValueFromEnum(_enum, currentValue) {
        //#region Variables déclaration
        const values = [];
        //#endregion Variables déclaration
        if (!_enum || !currentValue) { // à voir
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
        curIndex = Math.max(curIndex, 0);
        return values[curIndex];
    }
    //#endregion getPreviousValueFromEnum
    //#region getValueIndexFromEnum
    static getValueIndexFromEnum(_enum, currentValue) {
        //#region Variables déclaration
        const values = [];
        //#endregion Variables déclaration
        if (!_enum || !currentValue) { // à voir
            return currentValue;
        }
        const keys = Object.keys(_enum);
        keys.forEach(key => {
            values.push(_enum[key]);
        });
        return values.indexOf(currentValue);
    }
    //#endregion getValueIndexFromEnum
    //#region getEnumNameFromValue
    static getEnumNameFromValue(_enum, currentValue) {
        if (!_enum || !currentValue) { // à voir
            return currentValue;
        }
        const keys = Object.keys(_enum);
        const enumName = keys.some(key => {
            return _enum[key] === currentValue;
        });
        return enumName;
    }
    //#endregion getEnumNameFromValue

    //setData:function(HTMLObj,name,value) {
    //  if (HTMLObj.dataset!==null) HTMLObj.dataset[name]=value;
    //  else if (HTMLObj.getAttribute(name)!==null) HTMLObj.setAttribute(name,value);
    //}
    //getData:function(HTMLObj,name) {
    //  if (HTMLObj.dataset!==null) return HTMLObj.dataset[name];
    //  else if (HTMLObj.getAttribute("data-"+name)!==null) return HTMLObj.getAttribute("data-"+name);
    //  else return null;
    //}
    //#region checkTrigger
    static checkTrigger(instance, obj) {
        //#region Variables déclaration
        let trigger = !0;
        let value = null;
        const tools = core.tools;
        //#endregion Variables déclaration
        if (obj.triggers) {
            obj.triggers.forEach((trig, i) => {
                trig.ref !== undefined ? instance = instance[trig.ref] : 1;
                if (instance[trig.prop] !== undefined) {
                    trigger = i > 0 ? tools[trig.bExp](trigger, tools[trig.op](instance[trig.prop], trig.value)) :
                        tools[trig.op](instance[trig.prop], trig.value);
                }
            });
            value = trigger ? obj.trueValue : obj.falseValue ? obj.falseValue : value;
        }
        return {
            isOK: trigger,
            value: value
        };
    }
    //#endregion checkTrigger
    //#region storeValue
    static storeValue(dic, name, value) {
        dic[name] = value;
    }
    //#endregion storeValue
    //#region processRadius
    static processRadius(instance, dic, radius) {
        //#region Variables déclaration
        let trigger = !1;
        let params = {};
        const CONSTANTS = core.types.CONSTANTS;
        const tools = core.tools;
        //#endregion Variables déclaration
        if (radius.triggers) {
            trigger = tools.checkTrigger(instance, radius);
            if (trigger.isOK && trigger.value) {
                params = trigger.value;
                tools.storeValue(dic, radius.storedName, trigger.value);
            }
        } else if (radius.hasOwnProperty('tl') && radius.hasOwnProperty('tr') && radius.hasOwnProperty('br') &&
            radius.hasOwnProperty('bl')) {
            const keys = Object.keys(radius);
            keys.forEach(key => {
                if (radius[key].triggers) {
                    trigger = tools.checkTrigger(instance, radius[key]);
                    if (trigger.isOK && trigger.value) {
                        params[key] = typeof trigger.value === CONSTANTS.STRING ? dic[trigger.value] : trigger.value;
                        radius[key].storedName && trigger.value ? tools.storeValue(dic, radius[key].storedName, trigger.value) : 1;
                    }
                } else if (typeof radius[key] === CONSTANTS.STRING) {
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
    //#endregion processRadius
    //#region processShadow
    static processShadow(instance, shadow, ctx) {
        if (shadow.triggers) {
            const trigger = core.tools.checkTrigger(instance, shadow);
            if (trigger.isOK && trigger.value) {
                const value = trigger.value;
                ctx.shadowBlur = value.blur;
                ctx.shadowColor = value.color;
                ctx.shadowOffsetX = value.offsetX ? value.offsetX : 0;
                ctx.shadowOffsetY = value.offsetY ? value.offsetY : 0;
            }
        } else {
            ctx.shadowBlur = shadow.blur;
            ctx.shadowColor = shadow.color;
            ctx.shadowOffsetX = shadow.offsetX ? shadow.offsetX : 0;
            ctx.shadowOffsetY = shadow.offsetY ? shadow.offsetY : 0;
        }
    }
    //#endregion processShadow
    //#region processStyle
    static processStyle(instance, shape, state, suffixFunc, params) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const GRADDIRS = core.types.GRADIENTDIRECTIONS;
        const changingTheme = document.body.classList.contains('changingTheme');
        const themeName = changingTheme ? instance.app.themeManifest.lastThemeName : instance.themeName;
        //#endregion Variables déclaration
        !suffixFunc ? suffixFunc = String.EMPTY : 1;
        params = params || [];
        ['fill', 'stroke'].forEach(prop => {
            let _state = state;
            ctx.clearShadow();
            const style = shape[`${prop}Style`];
            if (style) {
                let color = style[_state];
                const to = style.iteration != undefined ? style.iteration : 1;
                if (!color || !instance.enabled) {
                    _state = 'normal';
                    color = style[_state];
                    !color ? color = Core.themes[themeName].DEFAULTTEXTCOLOR : 1;
                }
                if (color) {
                    if (Array.isArray(color)) {
                        const grad = ctx.createLinearGradient(0, 0,
                            [GRADDIRS.TORIGHT, GRADDIRS.TOBOTTOMRIGHT].indexOf(style.gradientDir) > -1 ? shape.width ? shape.width : instance.width : 0,
                            [GRADDIRS.TOBOTTOM, GRADDIRS.TOBOTTOMRIGHT].indexOf(style.gradientDir) > -1 ? shape.height ? shape.height : instance.height : 0);
                        color.forEach(cs => {
                            grad.addColorStop(cs.offset, cs.color);
                        });
                        ctx[`${prop}Style`] = grad;
                    } else {
                        ctx[`${prop}Style`] = color;
                    }
                    // Shadow
                    if (style.shadow) {
                        const shadow = core.tools.processShadow(instance, style.shadow, ctx);
                    }
                    // lineWidth
                    style.lineWidth && style.lineWidth > 0 ? ctx.lineWidth = style.lineWidth : 1;
                    // Clip
                    style.clipped != undefined && style.clipped ? ctx.clip() : 1;
                    let idx = 0;
                    for (; idx < to; idx++) {
                        ctx[`${prop}${suffixFunc}`](...params);
                    }
                }
            }
        });
        ctx.clearShadow();
    }
    //#endregion processStyle
    //#region processBorders
    static processBorders(instance, borders) {
        if (borders.triggers) {
            const trigger = core.tools.checkTrigger(instance, borders);
            return trigger.value ? trigger.value : null;
        } else {
            return borders;
        }
    }
    //#endregion processBorders
    //#region equal
    static equal(left, right) {
        return left === right;
    }
    //#endregion equal
    //#region notEqual
    static notEqual(left, right) {
        return left !== right;
    }
    //#endregion notEqual
    //#region lessThan
    static lessThan(left, right) {
        return left < right;
    }
    //#endregion lessThan
    //#region greaterThan
    static greaterThan(left, right) {
        return left > right;
    }
    //#endregion greaterThan
    //#region lessThanOrEqual
    static lessThanOrEqual(left, right) {
        return left <= right;
    }
    //#endregion lessThanOrEqual
    //#region greaterThanOrEqual
    static greaterThanOrEqual(left, right) {
        return left >= right;
    }
    //#endregion greaterThanOrEqual
    //#region is!1
    static isTrue(value) {
        return typeof value === core.types.CONSTANTS.BOOLEAN && !value;
    }
    //#endregion is!1
    //#region is!0
    static isFalse(value) {
        return typeof value === core.types.CONSTANTS.BOOLEAN && value;
    }
    //#endregion is!0
    //#region or
    static or(left, right) {
        return left || right;
    }
    //#endregion or
    //#region and
    static and(left, right) {
        return left && right;
    }
    //#endregion and
    //#region indexOf
    static indexOf(left, right) {
        return right.indexOf(left) > -1;
    }
    //#endregion indexOf
    //#region
    static getPropertyName() {
        return new Error('dummy')
            .stack
            .match(/(?:as )(?:[^\]]*)/gm).first
            .split(" ")
            .last;
    }
    //#endregion
    //#endregion Methods
}
core.tools = Tools;
Object.seal(Object.freeze(Tools));
export { Tools };
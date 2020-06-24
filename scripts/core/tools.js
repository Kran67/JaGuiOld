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
        !bitTest(object[property], value) && object[property].push(value);
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
            idx > -1 && object[property].splice(idx, 1);
        }
    }
    //#endregion exclude
    //#region isValidIdent
    static isValidIdent(ident, allowDots) {
        //#region Variables déclaration
        const CONSTANTS = core.types.CONSTANTS;
        const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'.split(String.EMPTY);
        const alphaNumeric = [...alpha, '0123456789'.split(String.EMPTY)];
        const alphaNumericDot = [...alphaNumeric, '.'];
        //#endregion Variables déclaration
        if (typeof ident === CONSTANTS.STRING) {
            !core.tools.isBool(allowDots) && (allowDots = !1);
            if (ident.length === 0 || alpha.indexOf(ident[0]) === -1) {
                return !1;
            }
            if (allowDots) {
                ident.forEach(id => {
                    if (alphaNumericDot.indexOf(id) === -1) {
                        return !1;
                    }
                });
            } else {
                ident.forEach(id => {
                    if (alphaNumeric.indexOf(id) === -1) {
                        return !1;
                    }
                });
            }
            return !0;
        }
        return !1;
    }
    //#endregion isValidIdent
    //#region valueInSet
    static valueInSet(value, set) {
        if (core.tools.isObject(set)) {
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
        if (core.isHTMLRenderer) {
            const fileText = document.getElementById('file_text');
            fileText && (fileText.innerHTML = 'Creating window & objects\nPlease wait...');
        }
        core.apps.activeApplication.loadedWindowsHTML++;
    }
    //#endregion loadFormRes
    //#region getObjectFromString
    static getObjectFromString(object, stringProp) {
        //#region Variables déclaration
        const tabs = stringProp.split('.').shift();
        let obj = object.first;
        //#endregion Variables déclaration
        if (core.tools.isObject(obj) && obj) {
            tabs.forEach(tab => {
                obj = obj[tab];
            });
            return { object: obj, property: tab.last };
        }
        return { object, property: stringProp };
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
        if (core.tools.isObject(object)) {
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
        if (core.tools.isObject(object)) {
            const value = object.valueOf();
            if (object !== value) {
                return new object.constructor(value);
            } else {
                if (object instanceof object.constructor &&
                    object.constructor !== Object) {
                    const c = core.clone(object.constructor.prototype);
                    const names = Object.getOwnPropertyNames(object);
                    names.forEach(name => {
                        object.hasOwnProperty(name) && (c[names[name]] = object[name]);
                    });
                } else {
                    const c = {};
                    const names = Object.getOwnPropertyNames(object);
                    names.forEach(name => {
                        !c[name] && (c[name] = object[name]);
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
        if (core.apps.activeApplication && core.apps.activeApplication.locale) {
            return core.locales[core.apps.activeApplication.locale]
                ? core.locales[core.apps.activeApplication.locale]
                : core.locales[core.currentLocale];
        } else {
            return core.locales[core.currentLocale];
        }
    }
    //#endregion getLocale
    //#region getDefaultLocale
    static getDefaultLocale() {
        return core.locales[core.currentLocale];
    }
    //#endregion getDefaultLocale
    //#region localeExist
    static localeExist(locale) {
        return core.locales[locale];
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
        params.component.addPropertyEnum(params.propName, params.enum);
        params.hasOwnProperty('value') && (core.private(params.component, { [params.propName]: params.value }));
        params.forceUpdate === undefined && (params.forceUpdate = !1);
        params.enumerable === undefined && (params.enumerable = !0);
        const setter = params.setter ? params.setter : (newValue) => {
            if (core.tools.valueInSet(newValue, params.enum)) {
                if (core.private(params.component)[params.propName] !== newValue) {
                    core.private(params.component, { [params.propName]: newValue });
                    params.forceUpdate && params.component.update && !params.component.loading &&
                        !params.component.form.creating && !params.component.form.loading
                        && params.component.update();
                }
            }
        };
        Object.defineProperty(params.component, params.propName, {
            get: () => { return core.private(params.component)[params.propName]; },
            set: setter,
            enumerable: params.enumerable,
            configurable: !0
        });
    }
    //#endregion addPropertyFromEnum
    //#region getPropertiesFromObject
    static getPropertiesFromObject(obj) {
        //#region Variables déclaration
        let props = [];
        const keys = Object.keys(obj);
        //#endregion Variables déclaration
        keys.forEach(propName => {
            if (propName !== 'rotateAngle' && propName !== 'rotateCenter' && obj.hasOwnProperty(propName)
                && !propName.startsWith('on') && !core.tools.isFunc(obj[propName])
                && propName !== 'form' && propName !== 'app') {
                props = [...props, {
                    property: propName,
                    value: obj[propName],
                    categories: core.classes.getPropertyCategories(propName)
                }];
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
            left: int(mat[4]),
            top: int(mat[5])
        };
    }
    //#endregion getLeftTopFromTranslation
    //#region getNextValueFromEnum
    static getNextValueFromEnum(_enum, currentValue) {
        //#region Variables déclaration
        let values = [];
        //#endregion Variables déclaration
        if (!_enum) {
            return currentValue;
        }
        if (!currentValue) { // à voir
            return currentValue;
        }
        const keys = Object.keys(_enum);
        keys.forEach(key => {
            values = [...values, _enum[key]];
        });
        let curIndex = values.indexOf(currentValue);
        if (curIndex === -1) {
            return currentValue;
        }
        curIndex++;
        curIndex = Math.min(curIndex, keys.length - 1);
        return values[curIndex];
    }
    //#endregion getNextValueFromEnum
    //#region getPreviousValueFromEnum
    static getPreviousValueFromEnum(_enum, currentValue) {
        //#region Variables déclaration
        let values = [];
        //#endregion Variables déclaration
        if (!_enum) {
            return currentValue;
        }
        if (!currentValue) { // à voir
            return currentValue;
        }
        const keys = Object.keys(_enum);
        keys.forEach(key => {
            values = [...values, _enum[key]];
        });
        let curIndex = values.indexOf(currentValue);
        if (curIndex === -1) {
            return currentValue;
        }
        curIndex--;
        curIndex = Math.max(0, curIndex);
        return values[curIndex];
    }
    //#endregion getPreviousValueFromEnum
    //#region getValueIndexFromEnum
    static getValueIndexFromEnum(_enum, currentValue) {
        //#region Variables déclaration
        let values = [];
        //#endregion Variables déclaration
        if (!_enum) {
            return currentValue;
        }
        if (!currentValue) { // à voir
            return currentValue;
        }
        const keys = Object.keys(_enum);
        keys.forEach(key => {
            values = [...values, _enum[key]];
        });
        const curIndex = values.indexOf(currentValue);
        return curIndex;
    }
    //#endregion getValueIndexFromEnum
    //#region getEnumNameFromValue
    static getEnumNameFromValue(_enum, currentValue) {
        if (!_enum) {
            return currentValue;
        }
        if (!currentValue) { // à voir
            return currentValue;
        }
        const keys = Object.keys(_enum);
        const enumName = keys.find(key => {
            return _enum[key] === currentValue;
        });
        return enumName;
    }
    //#endregion getEnumNameFromValue
    //#region checkTrigger
    static checkTrigger(instance, obj) {
        //#region Variables déclaration
        let trigger = !0;
        let value = null;
        //#endregion Variables déclaration
        if (obj.triggers) {
            obj.triggers.forEach((trig, i) => {
                trig.ref !== undefined && (instance = instance[trig.ref]);
                instance[trig.prop] !== undefined &&
                    (trigger = i > 0
                        ? core.tools[trig.bExp](trigger, core.tools[trig.op](instance[trig.prop], trig.value))
                        : core.tools[trig.op](instance[trig.prop], trig.value));
            });
            value = trigger ? obj.trueValue : obj.falseValue ? obj.falseValue : value;
        }
        return {
            isOK: trigger,
            value
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
        //#endregion Variables déclaration
        if (radius.triggers) {
            trigger = core.tools.checkTrigger(instance, radius);
            trigger.isOK && trigger.value
                ? params = trigger.value
                : core.tools.storeValue(dic, radius.storedName, trigger.value);
        } else if (radius.hasOwnProperty('tl') && radius.hasOwnProperty('tr') && radius.hasOwnProperty('br') &&
            radius.hasOwnProperty('bl')) {
            const keys = Object.keys(radius);
            keys.forEach(key => {
                if (radius[key].triggers) {
                    trigger = core.tools.checkTrigger(instance, radius[key]);
                    if (trigger.isOK && trigger.value) {
                        params[key] = core.tools.isString(trigger.value) ? dic[trigger.value] : trigger.value;
                        radius[key].storedName && trigger.value
                            && core.tools.storeValue(dic, radius[key].storedName, trigger.value);
                    }
                } else if (core.tools.isString(radius[key])) {
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
            const trigger = Tools.checkTrigger(instance, shadow);
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
        const ctx = core.ctx;
        const GRADDIRS = core.types.GRADIENTDIRECTIONS;
        const changingTheme = document.body.classList.contains('changingTheme');
        const themeName = changingTheme ? instance.app.themeManifest.lastThemeName : instance.themeName;
        //#endregion Variables déclaration
        suffixFunc = suffixFunc || String.EMPTY;
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
                    color = color || core.themes[themeName].DEFAULTTEXTCOLOR;
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
                    style.lineWidth && style.lineWidth > 0 && (ctx.lineWidth = style.lineWidth);
                    // Clip
                    style.clipped != undefined && style.clipped && ctx.clip();
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
    //#region isTrue
    static isTrue(value) {
        return core.tools.isBool(value) && value;
    }
    //#endregion isTrue
    //#region isFalse
    static isFalse(value) {
        return core.tools.isBool(value) && !value;
    }
    //#endregion isFalse
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
    //#region IfAll
    static IfAll(...args) {
        return !args.isEmpty && args.every(e => core.tools.isBool(e) && e);
    }
    //#endregion IfAll
    //#region IfAny
    static IfAny(...args) {
        return !args.isEmpty && args.some(e => core.tools.isBool(e) && e);
    }
    //#endregion IfAny
    //#region IfThen
    static IfThen(...params) {
        return params.cond ? params.trueValue : params.falseValue;
    }
    //#endregion IfThen
    //#region not
    static not(value) {
        return !value;
    }
    //#endregion not
    //#region getPropertyName
    static getPropertyName() {
        return new Error('dummy')
            .stack
            .match(/(?:as )(?:[^\]]*)/gm).first
            .split(" ")
            .last;
    }
    //#endregion getPropertyName
    //#region loadStyle
    static loadStyle(url) {
        return new Promise((resolve, reject) => {
            let link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.onload = () => { resolve(); console.log('style has loaded'); };
            link.onerror = () => { resolve(); console.log('style has not loaded'); };
            link.href = url;

            let head = document.querySelector('head');
            try {
                head.appendChild(link);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    //#endregion loadStyle
    //#region getMonthList
    static getMonthList(locale, format = 'long', lower = !1) {
        const year = new Date().getFullYear(); // 20xx
        const monthList = [...Array(12).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        const formatter = new Intl.DateTimeFormat(locale, {
            month: format
        });
        const getMonthName = (monthIndex) =>
            formatter.format(new Date(year, monthIndex))[lower ? 'toLowerCase' : 'toString']();
        return monthList.map(getMonthName);
    }
    //#endregion getMonthList
    //#region getWeekDayList
    static getWeekDayList(locale, format = 'long', numberOfChar = 0, lower = !1) {
        let day = new Date().getDay();
        let date = new Date();
        date = date.addDays(-day);
        const dayList = [];
        for (let i = 0; i < 7; i++) {
            dayList.push(date);
            date = date.addDays(1);
        }
        const formatter = new Intl.DateTimeFormat(locale, {
            weekday: format
        });
        const getDayName = (_date) => {
            let retValue = formatter.format(_date)[lower ? 'toLowerCase' : 'toString']();
            numberOfChar > 0 && (retValue = retValue.substring(0, numberOfChar));
            return retValue;
        };
        return dayList.map(getDayName);
    }
    //#endregion getWeekDayList
    //#region defineLayout
    static defineLayout(control, props) {
        if (control.update) {
            control.oldUpdate = control.update;
            control.update = function () {
                //#region Variables déclaration
                const priv = core.private(this);
                const htmlElementStyle = this.HTMLElementStyle;
                const PX = core.types.CSSUNITS.PX;
                //#endregion Variables déclaration
                control.oldUpdate();
                switch (priv.layoutMode) {
                    case core.types.LAYOUTMODES.NORMAL:
                        htmlElementStyle.display = core.types.DISPLAYS.BLOCK;
                        break;
                    case core.types.LAYOUTMODES.FLEX:
                        htmlElementStyle.display = core.types.DISPLAYS.FLEX;
                        htmlElementStyle.flexDirection = priv.flexDirection;
                        htmlElementStyle.justifyContent = priv.justifyContent;
                        htmlElementStyle.alignItems = priv.alignItems;
                        break;
                    case core.types.LAYOUTMODES.GRID:
                        htmlElementStyle.display = core.types.DISPLAYS.GRID;
                        htmlElementStyle.gridTemplateColumns = !String.isNullOrEmpty(priv.templateColumns)
                            ? priv.templateColumns : `repeat(${priv.columns}, 1fr [col-start])`;
                        htmlElementStyle.gridTemplateRows = !String.isNullOrEmpty(priv.templateRows)
                            ? priv.templateRows : `repeat(${priv.rows}, 1fr [row-start])`;
                        htmlElementStyle.columnGap = `${priv.columnGap}${PX}`;
                        htmlElementStyle.rowGap = `${priv.rowGap}${PX}`;
                        break;
                }
            };
        }
        core.tools.addPropertyFromEnum({
            component: control,
            propName: 'layoutMode',
            enum: core.types.LAYOUTMODES,
            setter: function (newValue) {
                //#region Variables déclaration
                const priv = core.private(this);
                const layoutMode = priv.layoutMode;
                //#endregion Variables déclaration
                if (core.tools.valueInSet(newValue, core.types.LAYOUTMODES) && layoutMode !== newValue) {
                    priv.layoutMode = newValue;
                    isHtmlRenderer && this.update();
                }
            },
            value: props.layoutMode ? props.layoutMode : core.types.LAYOUTMODES.NORMAL
        });
        core.tools.addPropertyFromEnum({
            component: control,
            propName: 'justifyContent',
            enum: core.types.JUSTIFYCONTENT,
            setter: function (newValue) {
                //#region Variables déclaration
                const priv = core.private(this);
                const justifyContent = priv.justifyContent;
                //#endregion Variables déclaration
                if (core.tools.valueInSet(newValue, core.types.JUSTIFYCONTENT) && justifyContent !== newValue) {
                    priv.justifyContent = newValue;
                    isHtmlRenderer && this.update();
                }
            },
            value: props.justifyContent ? props.justifyContent : core.types.JUSTIFYCONTENT.FLEXSTART
        });
        core.tools.addPropertyFromEnum({
            component: control,
            propName: 'alignItems',
            enum: core.types.ALIGNITEMS,
            setter: function (newValue) {
                //#region Variables déclaration
                const priv = core.private(this);
                const alignItems = priv.alignItems;
                //#endregion Variables déclaration
                if (core.tools.valueInSet(newValue, core.types.ALIGNITEMS) && alignItems !== newValue) {
                    priv.alignItems = newValue;
                    isHtmlRenderer && this.update();
                }
            },
            value: props.alignItems ? props.alignItems : core.types.ALIGNITEMS.FLEXSTART
        });
        core.tools.addPropertyFromEnum({
            component: control,
            propName: 'flexDirection',
            enum: core.types.FLEXDIRECTIONS,
            setter: function (newValue) {
                //#region Variables déclaration
                const priv = core.private(this);
                const flexDirection = priv.flexDirection;
                //#endregion Variables déclaration
                if (core.tools.valueInSet(newValue, core.types.FLEXDIRECTIONS) && flexDirection !== newValue) {
                    priv.flexDirection = newValue;
                    isHtmlRenderer && this.update();
                }
            },
            value: props.flexDirection ? props.flexDirection : core.types.FLEXDIRECTIONS.ROW
        });
        core.private(control).columnGap = props.columnGap ? props.columnGap : 5;
        Object.defineProperty(control, 'columnGap', {
            get: () => { return core.private(control).columnGap; },
            set: function () {
                //#region Variables déclaration
                const priv = core.private(this);
                //#endregion Variables déclaration
                if (core.tools.isNumber(newValue) && priv.columnGap !== newValue) {
                    priv.columnGap = newValue;
                    this.update();
                }
            },
            enumerable: !0,
            configurable: !0
        });
        core.private(control).rowGap = props.rowGap ? props.rowGap : 5;
        Object.defineProperty(control, 'rowGap', {
            get: () => { return core.private(control).rowGap; },
            set: function () {
                //#region Variables déclaration
                const priv = core.private(this);
                //#endregion Variables déclaration
                if (core.tools.isNumber(newValue) && priv.rowGap !== newValue) {
                    priv.rowGap = newValue;
                    this.update();
                }
            },
            enumerable: !0,
            configurable: !0
        });
        core.private(control).columns = props.columns ? props.columns : 5;
        Object.defineProperty(control, 'columns', {
            get: () => { return core.private(control).columns; },
            set: function () {
                //#region Variables déclaration
                const priv = core.private(this);
                //#endregion Variables déclaration
                if (core.tools.isNumber(newValue) && priv.columns !== newValue) {
                    priv.columns = newValue;
                    this.update();
                }
            },
            enumerable: !0,
            configurable: !0
        });
        core.private(control).rows = props.rows ? props.rows : 5;
        Object.defineProperty(control, 'rows', {
            get: () => { return core.private(control).rows; },
            set: function () {
                //#region Variables déclaration
                const priv = core.private(this);
                //#endregion Variables déclaration
                if (core.tools.isNumber(newValue) && priv.rows !== newValue) {
                    priv.rows = newValue;
                    this.update();
                }
            },
            enumerable: !0,
            configurable: !0
        });
        core.private(control).templateColumns = props.templateColumns ? props.templateColumns : String.EMPTY;
        Object.defineProperty(control, 'templateColumns', {
            get: () => { return core.private(control).templateColumns; },
            set: function () {
                //#region Variables déclaration
                const priv = core.private(this);
                //#endregion Variables déclaration
                if (core.tools.isNumber(newValue) && priv.templateColumns !== newValue) {
                    priv.templateColumns = newValue;
                    this.update();
                }
            },
            enumerable: !0,
            configurable: !0
        });
        core.private(control).templateRows = props.templateRows ? props.templateRows : String.EMPTY;
        Object.defineProperty(control, 'templateRows', {
            get: () => { return core.private(control).templateRows; },
            set: function () {
                //#region Variables déclaration
                const priv = core.private(this);
                //#endregion Variables déclaration
                if (core.tools.isNumber(newValue) && priv.templateRows !== newValue) {
                    priv.templateRows = newValue;
                    this.update();
                }
            },
            enumerable: !0,
            configurable: !0
        });
    }
    //#endregion defineLayout
    //#endregion Methods
}
Object.seal(Object.freeze(Tools));
//#endregion Tools
window.core.tools = Tools;
export { Tools }; // à supprimer
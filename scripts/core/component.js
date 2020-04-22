//#region Imports
import { Bindable } from '/scripts/core/bindable.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Imports
//#region Component
const Component = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class Component
    class Component extends Bindable {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            super(props);
            //#region Properties
            //#region Private Properties
            const classes = core.classes;
            const tools = core.tools;
            const priv = internal(this);
            priv.owner = owner;
            priv.owners = [];
            priv.app = null;
            priv.form = null;
            priv.loading = !0;
            priv.destroying = !1;
            priv.HTMLElement = null;
            priv.HTMLElementStyle = null;
            priv.designing = !1;
            priv.internalId = String.uniqueId();
            priv.updating = !1;
            priv.designInstance = !1;
            priv.component = !0;
            priv.cssBorder = new Rect;
            priv.inForm = this instanceof classes.BaseWindow
                ? !1
                : props.hasOwnProperty('inForm') && tools.isBool(props.inForm)
                    ? props.inForm
                    : !0;
            priv.visible = props.hasOwnProperty('visible') && tools.isBool(props.visible) ? props.visible : !0;
            priv.left = props.hasOwnProperty('left') && tools.isNumber(props.left) ? props.left : 0;
            priv.top = props.hasOwnProperty('top') && tools.isNumber(props.top) ? props.top : 0;
            priv.app = owner instanceof classes.Application ? owner : priv.owner.app;
            priv.destroyComponents = function () {
                //#region Variables déclaration
                const priv = internal(this);
                //#endregion Variables déclaration
                const components = priv.components;
                if (components) {
                    while (components.length > 0) {
                        let instance = components.last;
                        this.remove(instance);
                        instance.destroy();
                        instance = null;
                    }
                }
            };
            priv.insert = function (component) {
                //#region Variables déclaration
                //const priv = internal(this);
                const self = this.HTMLElement.jsObj;
                const components = self.components;
                const form = this.form;
                const controls = form.controls;
                //#endregion Variables déclaration
                if (components.indexOf(component) === -1) {
                    components.push(component);
                    component.app = this.app;
                    component.owner = self;
                    if (form !== component) {
                        if (component.inForm && controls.indexOf(component) === -1) {
                            controls.push(component);
                            if (!form[component.name]) {
                                Object.defineProperty(form, component.name, {
                                    enumerable: !1,
                                    configurable: !0,
                                    writable: !0,
                                    value: component
                                });
                            }
                        }
                    }
                }
            };
            priv.positioning = function () {
                //#region Variables déclaration
                const self = this.HTMLElement.jsObj;
                //#endregion Variables déclaration
                if (this.form !== self) {
                    if (core.isHTMLRenderer && this.HTMLElement) {
                        const position = getComputedStyle(this.HTMLElement).position;
                        position === 'absolute' ? self.moveTo(this.left, this.top) : 1;
                    }
                }
            };
            //#endregion Private Properties
            //#region Public Properties
            classes.newCollection(this, this, classes.Component, 'components');
            Object.defineProperties(this, {
                'owner': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).owner;
                    },
                    set: function (newValue) {
                        internal(this).owner = newValue;
                    }
                },
                'componentIndex': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        //#region Variables déclaration
                        const owner = internal(this).owner;
                        //#endregion Variables déclaration
                        return owner && owner.components.length > 0 ? owner.components.indexOf(this) : -1;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const owner = internal(this).owner;
                        //#endregion Variables déclaration
                        if (core.tools.isNumber(newValue)) {
                            if (owner) {
                                const i = owner.components.indexOf(this);
                                if (i >= 0) {
                                    const count = owner.components.length;
                                    newValue = math.Max(math.Min(newValue, count - 1), 0);
                                    if (newValue !== i) {
                                        owner.components.splice(i, 1);
                                        owner.components.insert(newValue, this);
                                    }
                                }
                            }
                        }
                    }
                },
                'owners': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).owners;
                    }
                },
                'app': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).app;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        newValue instanceof core.classes.Application && priv.app !== newValue ? priv.app = newValue : 1;
                    }
                },
                'form': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).form;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        newValue instanceof core.classes.Window && priv.form !== newValue ? priv.form = newValue : 1;
                    }
                },
                'loading': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).loading;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        priv.loading !== newValue ? priv.loading = newValue : 1;
                    }
                },
                'destroying': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).destroying;
                    }
                },
                'HTMLElement': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).HTMLElement;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        newValue instanceof HTMLElement && priv.HTMLElement !== newValue ? priv.HTMLElement = newValue : 1;
                    }
                },
                'HTMLElementStyle': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).HTMLElementStyle;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        newValue instanceof CSSStyleDeclaration && priv.HTMLElementStyle !== newValue
                            ? priv.HTMLElementStyle = newValue
                            : 1;
                    }
                },
                'designing': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).designing;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isBool(newValue) && priv.designing !== newValue ? priv.designing = newValue : 1;
                    }
                },
                'internalId': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).internalId;
                    },
                    set: function (newValue) {
                        internal(this).internalId = newValue;
                    }
                },
                'updating': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).updating;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isBool(newValue) && priv.updating !== newValue ? priv.updating = newValue : 1;
                    }
                },
                'designInstance': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).designInstance;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isBool(newValue) && priv.designInstance !== newValue ? priv.designInstance = newValue : 1;
                    }
                },
                'component': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).component;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isBool(newValue) && priv.component !== newValue ? priv.component = newValue : 1;
                    }
                },
                'inForm': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).inForm;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isBool(newValue) && priv.inForm !== newValue ? priv.inForm = newValue : 1;
                    }
                },
                'visible': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).visible;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isBool(newValue) && priv.visible !== newValue ? priv.visible = newValue : 1;
                    }
                },
                'template': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        //#region Variables déclaration
                        const priv = internal(this);
                        let html = core.classes.getTemplate(this.constructor.name);
                        let a = html.split('{name}');
                        //#endregion Variables déclaration
                        html = a.join(priv.name);
                        a = html.split('{internalId}');
                        html = a.join(priv.internalId);
                        return html;
                    }
                },
                'properties': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        //#region Variables déclaration
                        const priv = internal(this);
                        let prop = null;
                        const htmlElement = priv.HTMLElement;
                        const props = core.tools.getPropertiesFromObject(this);
                        const classes = core.classes;
                        //#endregion Variables déclaration
                        if (!priv.component) {
                            prop = 'width';
                            props.push({ property: prop, value: htmlElement.offsetWidth, categories: classes.getPropertyCategories(prop) });
                            prop = 'height';
                            props.push({ property: prop, value: htmlElement.offsetHeight, categories: classes.getPropertyCategories(prop) });
                        }
                        prop = 'left';
                        props.push({ property: prop, value: htmlElement.offsetLeft, categories: classes.getPropertyCategories(prop) });
                        prop = 'top';
                        props.push({ property: prop, value: htmlElement.offsetTop, categories: classes.getPropertyCategories(prop) });
                        return props;
                    }
                },
                'events': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        //#region Variables déclaration
                        const props = [];
                        //#endregion Variables déclaration
                        for (let prop in this) {
                            if (this.hasOwnProperty(prop)) {
                                prop.startsWith('on') && this[prop] instanceof core.classes.NotifyEvent
                                    ? props.push({ event: prop, value: this[prop] })
                                    : 1;
                            }
                        }
                        return props;
                    }
                },
                'isVisible': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        //#region Variables déclaration
                        const priv = internal(this);
                        let visible = priv.visible;
                        const htmlElement = priv.HTMLElement;
                        const owner = priv.owner;
                        const left = priv.left;
                        const top = priv.top;
                        const owners = priv.owners;
                        const oHtmlElement = owner.HTMLElement;
                        //#endregion Variables déclaration
                        // si le composant dépasse de son parent
                        if (core.isHTMLRenderer) {
                            if (htmlElement.offsetLeft + htmlElement.offsetWidth < 0 || htmlElement.offsetLeft > oHtmlElement.offsetWidth ||
                                htmlElement.offsetTop + htmlElement.offsetHeight < 0 || htmlElement.offsetTop > oHtmlElement.offsetHeight) {
                                visible = !1;
                            }
                        } else if (core.isCanvasRenderer) {
                            if (left + priv.width < 0 || left > owner.width ||
                                top + priv.height < 0 || top > owner.height) {
                                visible = !1;
                            }
                        }
                        if (visible) {
                            owners.forEach(o => {
                                visible = visible && o.visible;
                            });
                        }
                        return visible;
                    }
                },
                'zOrder': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const owner = priv.owner;
                        //#endregion Variables déclaration
                        return owner && priv.HTMLElement ? owner.components.length + 1 : -1;
                    }
                },
                'contentLeft': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        //#region Variables déclaration
                        const priv = internal(this);
                        let left = priv.left;
                        const margin = this.margin;
                        const padding = this.padding;
                        const right = this.right;
                        //#endregion Variables déclaration
                        left += margin.left + padding.left;
                        right !== null ? left = priv.owner.contentWidth - this.width - right - padding.right - margin.right : 1;
                        return left;
                    }
                },
                'left': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        //#region Variables déclaration
                        const priv = internal(this);
                        let left = priv.left;
                        const margin = this.margin;
                        const padding = this.padding;
                        const right = this.right;
                        //#endregion Variables déclaration
                        right !== null ? left = priv.owner.contentWidth - this.width - right - padding.right - margin.right : 1;
                        return left;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const htmlElement = priv.HTMLElement;
                        const cStyle = getComputedStyle(htmlElement);
                        const isHTMLRenderer = core.isHTMLRenderer;
                        //#endregion Variables déclaration
                        if (core.tools.isNumber(newValue)) {
                            if (cStyle.position === 'absolute') {
                                const lastLeft = isHTMLRenderer ? htmlElement.offsetLeft : priv.left;
                                if (lastLeft !== newValue && !priv.loading) {
                                    this.propertyChanged(Types.BINDABLEPROPERTIES.LEFT);
                                    isHTMLRenderer
                                        ? priv.HTMLElementStyle.left = `${newValue}${Types.CSSUNITS.PX}`
                                        : priv.left = newValue;
                                }
                            }
                        }
                    }
                },
                'contentTop': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const top = priv.top;
                        const margin = this.margin;
                        const padding = this.padding;
                        //#endregion Variables déclaration
                        return top + margin.top + padding.top;
                    }
                },
                'top': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        //#region Variables déclaration
                        const priv = internal(this);
                        let top = priv.top;
                        const bottom = this.bottom;
                        //#endregion Variables déclaration
                        bottom !== null ? top = priv.owner.height - this.height - bottom - this.margin.bottom : 1;
                        return top;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const htmlElement = priv.HTMLElement;
                        const cStyle = getComputedStyle(htmlElement);
                        const isHTMLRenderer = core.isHTMLRenderer;
                        //#endregion Variables déclaration
                        if (core.tools.isNumber(newValue)) {
                            if (cStyle.position === 'absolute') {
                                const lastTop = (isHTMLRenderer ? htmlElement.offsetTop : priv.top);
                                if (lastTop !== newValue && !priv.loading) {
                                    this.propertyChanged(Types.BINDABLEPROPERTIES.TOP);
                                    isHTMLRenderer
                                        ? priv.HTMLElementStyle.top = `${newValue}${Types.CSSUNITS.PX}`
                                        : priv.top = newValue;
                                }
                            }
                        }
                    }
                },
                'boundingClientRect': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const margin = this.margin;
                        //#endregion Variables déclaration
                        if (core.isHTMLRenderer) {
                            return priv.HTMLElement.boundingClientRect;
                        } else {
                            const boundingClientRect = new Rect(priv.left + margin.left, priv.top + margin.top, 0, 0);
                            priv.owners.forEach(owner => {
                                const oMargin = owner.margin;
                                boundingClientRect.left += owner.left + oMargin.left;
                                boundingClientRect.top += owner.top + oMargin.top;
                            });
                            boundingClientRect.right = boundingClientRect.left + this.width;
                            boundingClientRect.bottom = boundingClientRect.top + this.height;
                            return boundingClientRect;
                        }
                    }
                }
            });
            //#endregion Public Properties
            //#endregion Properties
            if (owner instanceof classes.Component) {
                priv.form = priv.owner.form;
                priv.owner.insertComponent(this);
            } else {
                priv.form = this;
            }
            if (priv.owner instanceof classes.Component) {
                priv.owners.addRange(priv.owner.owners);
                priv.owners.push(priv.owner);
            }
        }
        //#endregion constructor
        //#region Methods
        //#region moveTo
        moveTo(x, y) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = priv.HTMLElement;
            const htmlElementStyle = priv.HTMLElementStyle;
            const PX = Types.CSSUNITS.PX;
            const cStyle = getComputedStyle(this.HTMLElement);
            const tools = core.tools;
            //#endregion Variables déclaration
            if (tools.isNumber(x) && tools.isNumber(y) || this instanceof core.classes.Control) {
                if (cStyle.position === 'absolute') {
                    priv.left = x;
                    priv.top = y;
                    if (core.isHTMLRenderer && htmlElement && priv.inForm) {
                        htmlElementStyle.left = `${x}${PX}`;
                        htmlElementStyle.top = `${y}${PX}`;
                    }
                }
            }
        }
        //#endregion moveTo
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            let htmlElement = priv.HTMLElement;
            let owner = priv.owner;
            let owners = priv.owners;
            //#endregion Variables déclaration
            //this.destroying();
            priv.destroyComponents();
            htmlElement ? htmlElement.parentNode.removeChild(htmlElement) : 1;
            owner && !(owner instanceof core.classes.Application) ? owner.remove(this) : 1;
            owners ? owners.destroy() : 1;
            this.unBindAndDestroyEvents();
            this.owner = null;
            this.componentIndex = null;
            this.owners = null;
            this.app = null;
            this.form = null;
            this.loading = null;
            this.destroying = null;
            this.HTMLElement = null;
            this.HTMLElementStyle = null;
            this.designing = null;
            this.internalId = null;
            this.updating = null;
            this.designInstance = null;
            this.component = null;
            this.inForm = null;
            this.visible = null;
            this.template = null;
            this.properties = null;
            this.events = null;
            this.isVisible = null;
            this.zOrder = null;
            this.contentLeft = null;
            this.left = null;
            this.contentTop = null;
            this.top = null;
            super.destroy();
        }
        //#endregion destroy
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = priv.HTMLElement;
            const form = priv.form;
            //#endregion Variables déclaration
            priv.loading = !1;
            if (core.isHTMLRenderer) {
                if (htmlElement) {
                    const properties = htmlElement.querySelector(`[id='${priv.internalId}'] > properties:first-child`);
                    properties ? htmlElement.removeChild(properties) : 1;
                }
            }
            if (this.hasOwnProperty('action')) {
                if (form[this.action]) {
                    this.action = form[this.action];
                } else if (!String.isNullOrEmpty(this.action)) {
                    const action = this.action;
                    const app = priv.app;
                    if (action.includes(".")) {
                        let data = action.split(".");
                        if (app[data.first]) {
                            data = app[data.first][data.last];
                            data ? this.action = data : 1;
                        }
                    }
                }
            }
            priv.positioning();
            this.components.forEach(comp => {
                comp.loaded && comp.loading ? comp.loaded() : 1;
            });
        }
        //#endregion loaded
        //#region remove
        remove(component) {
            //#region Variables déclaration
            const priv = internal(this);
            const components = this.components;
            const form = priv.form;
            const controls = form.controls;
            //#endregion Variables déclaration
            if (components.indexOf(component) > -1) {
                let idx = components.indexOf(component);
                idx > -1 ? components.removeAt(idx) : 1;
                if (form[component.name]) {
                    form[component.name] = null;
                    delete form[component.name];
                }
                idx = controls.indexOf(component);
                idx > -1 ? controls.removeAt(idx) : 1;
            }
        }
        //#endregion remove
        //#region insertComponent
        insertComponent(component) {
            const priv = internal(this);
            component.owner !== component.app ? component.owner.remove(component) : 1;
            priv.insert(component);
        }
        //#endregion insertComponent
        //#region findComponent
        findComponent(name) {
            //#region Variables déclaration
            const priv = internal(this);
            const components = priv.components;
            //#endregion Variables déclaration
            if (!String.isNullOrEmpty(name)) {
                if (components) {
                    const ret = components.find(comp => {
                        return comp.name === name;
                    });
                    return ret ? ret : null;
                }
            }
            return null;
        }
        //#endregion findComponent
        //#region validateRename
        validateRename(component, curName, newName) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = priv.owner;
            //#endregion Variables déclaration
            priv.designing && owner && !(owner instanceof core.classes.App) 
                ? owner.validateRename(component, curName, newName) 
                : 1;
        }
        //#endregion validateRename
        //#region beginUpdate
        beginUpdate() { }
        //#endregion beginUpdate
        //#region endUpdate
        endUpdate() { }
        //#endregion endUpdate
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            const internalId = priv.internalId;
            const htmlElement = priv.HTMLElement = document.getElementById(id);
            //#endregion Variables déclaration
            if (htmlElement) {
                priv.HTMLElementStyle = htmlElement.style;
                !htmlElement.jsObj ? htmlElement.jsObj = this : 1;
                const data = htmlElement.name;
                data ? priv.name = data : 1;
            }
            !internalId || internalId !== id ? priv.internalId = id : 1;
        }
        //#endregion getHTMLElement
        //#region getChilds
        getChilds() { }
        //#endregion getChilds
        //#region clientToDocument // TODO : changer en get
        clientToDocument() {
            //#region Variables déclaration
            const result = new core.classes.Point;
            const bRect = this.boundingClientRect;
            //#endregion Variables déclaration
            result.setValues(bRect.left, bRect.top);
            return result;
        }
        //#endregion clientToDocument
        //#region createEventsAndBind
        createEventsAndBind(eventsName, props) {
            //#region Variables déclaration
            const priv = internal(this);
            const tools = core.tools;
            //#endregion Variables déclaration
            const form = priv.form;
            if (Array.isArray(eventsName)) {
                eventsName.forEach(eventName => {
                    const eventValue = props[eventName];
                    this[eventName] = new core.classes.NotifyEvent(this);
                    if (props.hasOwnProperty(eventName)) {
                        if (tools.isFunc(form[eventValue])) {
                            this[eventName].addListener(form[eventValue]);
                        } else if (tools.isString(eventValue)) {
                            !String.isNullOrEmpty(eventValue) ? this[eventName].addListener(new Function(eventValue)) : 1;
                        } else if (tools.isFunc(eventValue)) {
                            this[eventName].addListener(eventValue);
                        }
                    }
                });
            }
        }
        //#endregion createEventsAndBind
        //#region unBindAndDestroyEvents
        unBindAndDestroyEvents(eventsName) {
            if (Array.isArray(eventsName)) {
                eventsName.forEach(eventName => {
                    console.log(eventName);
                    this[eventName].destroy();
                    this[eventName] = null;
                    delete this[eventName];
                });
            }
        }
        //#endregion unBindAndDestroyEvents
        //#endregion
    }
    return Component;
})();
//#endregion Component
//#endregion
core.classes.register(core.types.CATEGORIES.COMMON, Component);
export { Component };
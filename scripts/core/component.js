﻿//#region Imports
import { Bindable } from '/scripts/core/bindable.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Imports
//#region Component
const Component = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
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
            if (this instanceof core.classes.BaseWindow) {
                priv.inForm = !1;
            } else if (props.hasOwnProperty('inForm') && core.tools.isBool(props.inForm)) {
                priv.inForm = props.inForm;
            } else {
                priv.inForm = !0
            }
            priv.visible = props.hasOwnProperty('visible') && core.tools.isBool(props.visible) ? props.visible : !0;
            priv.left = props.hasOwnProperty('left') && core.tools.isNumber(props.left) ? props.left : 0;
            priv.top = props.hasOwnProperty('top') && core.tools.isNumber(props.top) ? props.top : 0;

            priv.app = owner instanceof core.classes.Application ? owner : priv.owner.app;
            if (owner instanceof core.classes.Component) {
                priv.form = priv.owner.form;
                priv.owner.insertComponent(this);
            } else {
                priv.form = this;
            }
            core.classes.newCollection(this, this, core.classes.Component, 'components');
            if (priv.owner instanceof core.classes.Component) {
                priv.owners.addRange(priv.owner.owners);
                priv.owners.push(priv.owner);
            }
        }
        //#endregion constructor
        //#region Getter / Setters
        //#region owner
        get owner() {
            return internal(this).owner;
        }
        set owner(newValue) {
            internal(this).owner = newValue;
        }
        //#endregion owner
        //#region componentIndex
        get componentIndex() {
            //#region Variables déclaration
            const owner = internal(this).owner;
            //#endregion Variables déclaration
            return owner && owner.components.length > 0 ? owner.components.indexOf(this) : -1;
        }
        set componentIndex(newValue) {
            //#region Variables déclaration
            const owner = internal(this).owner;
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue)) {
                newValue = Math.max(newValue, 0);
                if (owner) {
                    const i = owner.components.indexOf(this);
                    if (i >= 0) {
                        const count = owner.components.length - 1;
                        newValue = Math.min(newValue, count);
                        if (newValue !== i) {
                            owner.components.splice(i, 1);
                            owner.components.insert(newValue, this);
                        }
                    }
                }
            }
        }
        //#endregion componentIndex
        //#region owners
        get owners() {
            return internal(this).owners;
        }
        //#endregion owners
        //#region app
        get app() {
            return internal(this).app;
        }
        set app(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof core.classes.Application && priv.app !== newValue && (priv.app = newValue);
        }
        //#endregion app
        //#region form
        get form() {
            return internal(this).form;
        }
        set form(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof core.classes.Window && priv.form !== newValue && (priv.form = newValue);
        }
        //#endregion form
        //#region loading
        get loading() {
            return internal(this).loading;
        }
        set loading(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.loading !== newValue && (priv.loading = newValue);
        }
        //#endregion loading
        //#region destroying
        get destroying() {
            return internal(this).destroying;
        }
        //#endregion destroying
        //#region HTMLElement
        get HTMLElement() {
            return internal(this).HTMLElement;
        }
        set HTMLElement(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof HTMLElement && priv.HTMLElement !== newValue
                && (priv.HTMLElement = newValue);
        }
        //#endregion HTMLElement
        //#region HTMLElementStyle
        get HTMLElementStyle() {
            return internal(this).HTMLElementStyle;
        }
        set HTMLElementStyle(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof CSSStyleDeclaration && priv.HTMLElementStyle !== newValue
                && (priv.HTMLElementStyle = newValue);
        }
        //#endregion HTMLElementStyle
        //#region designing
        get designing() {
            return internal(this).designing;
        }
        set designing(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.designing !== newValue
                && (priv.designing = newValue);
        }
        //#endregion designing
        //#region internalId
        get internalId() {
            return internal(this).internalId;
        }
        set internalId(newValue) {
            internal(this).internalId = newValue;
        }
        //#endregion internalId
        //#region updating
        get updating() {
            return internal(this).updating;
        }
        set updating(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.updating !== newValue
                && (priv.updating = newValue);
        }
        //#endregion updating
        //#region designInstance
        get designInstance() {
            return internal(this).designInstance;
        }
        set designInstance(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.designInstance !== newValue
                && (priv.designInstance = newValue);
        }
        //#endregion designInstance
        //#region component
        get component() {
            return internal(this).component;
        }
        set component(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.component !== newValue && (priv.component = newValue);
        }
        //#endregion component
        //#region inForm
        get inForm() {
            return internal(this).inForm;
        }
        set inForm(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.inForm !== newValue && (priv.inForm = newValue);
        }
        //#endregion inForm
        //#region visible
        get visible() {
            return internal(this).visible;
        }
        set visible(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.visible !== newValue && (priv.visible = newValue);
        }
        //#endregion visible
        //#region template
        get template() {
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
        //#endregion template
        //#region properties
        get properties() {
            //#region Variables déclaration
            const priv = internal(this);
            let prop = null;
            const htmlElement = priv.HTMLElement;
            let props = core.tools.getPropertiesFromObject(this);
            //#endregion Variables déclaration
            if (!priv.component) {
                prop = 'width';
                props = [...props, {
                    property: prop,
                    value: htmlElement.offsetWidth,
                    categories: core.classes.getPropertyCategories(prop)
                }];
                prop = 'height';
                props = [...props, {
                    property: prop,
                    value: htmlElement.offsetHeight,
                    categories: core.classes.getPropertyCategories(prop)
                }];
            }
            prop = 'left';
            props = [...props, {
                property: prop,
                value: htmlElement.offsetLeft,
                categories: core.classes.getPropertyCategories(prop)
            }];
            prop = 'top';
            props = [...props, {
                property: prop,
                value: htmlElement.offsetTop,
                categories: core.classes.getPropertyCategories(prop)
            }];
            return props;
        }
        //#endregion properties
        //#region events
        get events() {
            //#region Variables déclaration
            let props = [];
            //#endregion Variables déclaration
            for (let prop in this) {
                if (this.hasOwnProperty(prop)) {
                    props = prop.startsWith('on') && this[prop] instanceof core.classes.NotifyEvent
                        && ([...props, { event: prop, value: this[prop] }]);
                }
            }
            return props;
        }
        //#endregion events
        //#region isVisible
        get isVisible() {
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
                left + priv.width < 0 || left > owner.width ||
                    top + priv.height < 0 || top > owner.height && (visible = !1);
            }
            visible && owners.forEach(o => {
                visible = visible && o.visible;
            });
            return visible;
        }
        //#endregion isVisible
        //#region zOrder
        get zOrder() {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = priv.owner;
            //#endregion Variables déclaration
            return owner && priv.HTMLElement
                ? owner.components.length + 1 : -1;
        }
        //#endregion zOrder
        //#region contentLeft
        get contentLeft() {
            //#region Variables déclaration
            const priv = internal(this);
            let left = priv.left;
            const margin = this.margin;
            const padding = this.padding;
            const right = this.right;
            //#endregion Variables déclaration
            left += margin.left + padding.left;
            right != null
                && (left = priv.owner.contentWidth - this.width - right - padding.right - margin.right);
            return left;
        }
        //#endregion contentLeft
        //#region left
        get left() {
            //#region Variables déclaration
            const priv = internal(this);
            let left = priv.left;
            const margin = this.margin;
            const padding = this.padding;
            const right = this.right;
            //#endregion Variables déclaration
            right != null
                && (left = priv.owner.contentWidth - this.width - right - padding.right - margin.right);
            return left;
        }
        set left(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const cStyle = getComputedStyle(this.HTMLElement);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && cStyle.position === 'absolute') {
                const lastLeft = core.isHTMLRenderer ? priv.HTMLElement.offsetLeft : priv.left;
                if (lastLeft !== newValue && !priv.loading) {
                    this.propertyChanged(core.tools.getPropertyName());
                    core.isHTMLRenderer
                        ? priv.HTMLElementStyle.left = `${newValue}${core.types.CSSUNITS.PX}`
                        : priv.left = newValue;
                }
            }
        }
        //#endregion left
        //#region contentTop
        get contentTop() {
            //#region Variables déclaration
            const priv = internal(this);
            const top = priv.top;
            const margin = this.margin;
            const padding = this.padding;
            //#endregion Variables déclaration
            return top + margin.top + padding.top;
        }
        //#endregion contentTop
        //#region top
        get top() {
            //#region Variables déclaration
            const priv = internal(this);
            let top = priv.top;
            const bottom = this.bottom;
            //#endregion Variables déclaration
            bottom != null
                && (top = priv.owner.height - this.height - bottom - this.margin.bottom);
            return top;
        }
        set top(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const cStyle = getComputedStyle(this.HTMLElement);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && cStyle.position === 'absolute') {
                const lastTop = (core.isHTMLRenderer ? priv.HTMLElement.offsetTop : priv.top);
                if (lastTop !== newValue && !priv.loading) {
                    this.propertyChanged(core.tools.getPropertyName());
                    core.isHTMLRenderer
                        ? priv.HTMLElementStyle.top = `${newValue}${core.types.CSSUNITS.PX}`
                        : priv.top = newValue;
                }
            }
        }
        //#endregion top
        //#endregion Getter / Setters
        //#region Methods
        //#region moveTo
        moveTo(x, y) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = priv.HTMLElement;
            const htmlElementStyle = priv.HTMLElementStyle;
            const PX = core.types.CSSUNITS.PX;
            const cStyle = getComputedStyle(this.HTMLElement);
            //#endregion Variables déclaration
            if ((core.tools.isNumber(x) && core.tools.isNumber(y) || this instanceof core.classes.Control)
                && cStyle.position === 'absolute') {
                priv.left = x;
                priv.top = y;
                if (core.isHTMLRenderer && htmlElement && priv.inForm) {
                    htmlElementStyle.left = `${x}${PX}`;
                    htmlElementStyle.top = `${y}${PX}`;
                }
            }
        }
        //#endregion moveTo
        //#region getBoundingClientRect
        getBoundingClientRect() {
            //#region Variables déclaration
            const priv = internal(this);
            const margin = this.margin;
            //#endregion Variables déclaration
            if (core.isHTMLRenderer) {
                return priv.HTMLElement.getBoundingClientRect();
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
        //#endregion getBoundingClientRect
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            let htmlElement = priv.HTMLElement;
            let owner = priv.owner;
            let owners = priv.owners;
            //#endregion Variables déclaration
            //this.destroying();
            this.destroyComponents();
            htmlElement && htmlElement.parentNode.removeChild(htmlElement);
            owner && !(owner instanceof core.classes.Application) && owner.remove(this);
            owners && owners.destroy();
            this.unBindAndDestroyEvents();
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
            if (core.isHTMLRenderer && htmlElement) {
                const properties = htmlElement.querySelector(`[id='${priv.internalId}'] > properties:first-child`);
                properties && htmlElement.removeChild(properties);
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
                            app[data.first][data.last] && (this.action = data);
                        }
                    }
                }
            }
            this.positioning();
            this.components.forEach(comp => {
                comp.loaded && comp.loading && comp.loaded();
            });
        }
        //#endregion loaded
        //#region positioning
        positioning() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.form !== this && core.isHTMLRenderer && priv.HTMLElement) {
                const position = getComputedStyle(priv.HTMLElement).position;
                position === 'absolute' && this.moveTo(priv.left, priv.top);
            }
        }
        //#endregion positioning
        //#region insert
        insert(component) {
            //#region Variables déclaration
            const priv = internal(this);
            const components = this.components;
            const form = priv.form;
            const controls = form.controls;
            //#endregion Variables déclaration
            if (components.indexOf(component) === -1) {
                components.push(component);
                component.app = priv.app;
                component.owner = this;
                if (form !== component && component.inForm && controls.indexOf(component) === -1) {
                    controls.push(component);
                    !form[component.name] && (form[component.name] = component);
                }
            }
        }
        //#endregion insert
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
                idx > -1 && components.removeAt(idx);
                if (form[component.name]) {
                    form[component.name] = null;
                    delete form[component.name];
                }
                idx = controls.indexOf(component);
                idx > -1 && controls.removeAt(idx);
            }
        }
        //#endregion remove
        //#region insertComponent
        insertComponent(component) {
            component.owner !== component.app && component.owner.remove(component);
            this.insert(component);
        }
        //#endregion insertComponent
        //#region getComponent
        getComponent(index) {
            //#region Variables déclaration
            const priv = internal(this);
            const components = priv.components;
            //#endregion Variables déclaration
            if (components.length === 0 || index >= components.length) {
                throw core.errMsg.LISTINDEXERROR.format(index);
            }
            return components[index];
        }
        //#endregion getComponent
        //#region beforeDestruction
        beforeDestruction() {
            !priv.destroying && this._destroying();
        }
        //#endregion beforeDestruction
        //#region destroyComponents
        destroyComponents() {
            //#region Variables déclaration
            const priv = internal(this);
            let instance;
            //#endregion Variables déclaration
            const components = priv.components;
            if (components) {
                while (components.length > 0) {
                    instance = components.last;
                    this.remove(instance);
                    instance.destroy();
                    instance = null;
                }
            }
            //core.tools.Debugger.log(arguments, this, t);
        }
        //#endregion destroyComponents
        //#region _destroying
        _destroying() {
            //#region Variables déclaration
            const components = priv.components;
            //#endregion Variables déclaration
            if (!priv.destroying) {
                priv.destroying = !0;
                components && components.forEach(comp => {
                    comp._destroying();
                });
            }
            //core.tools.Debugger.log(arguments, this, t);
        }
        //#endregion _destroying
        //#region findComponent
        findComponent(name) {
            //#region Variables déclaration
            const priv = internal(this);
            const components = priv.components;
            //#endregion Variables déclaration
            if (!String.isNullOrEmpty(name) && components) {
                const ret = components.find(comp => {
                    return comp.name === name;
                });
                return ret ? ret : null;
            }
            return null;
        }
        //#endregion findComponent
        //#region _updating
        _updating() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.updating = !0;
        }
        //#endregion _updating
        //#region updated
        updated() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.updating = !1;
        }
        //#endregion updated
        //#region validateRename
        validateRename(component, curName, newName) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = priv.owner;
            //#endregion Variables déclaration
            priv.designing && owner && !(owner instanceof core.classes.App)
                && owner.validateRename(component, curName, newName);
        }
        //#endregion validateRename
        //#region setChildOrder
        setChildOrder(child, order) { }
        //#endregion setChildOrder
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
                !htmlElement.jsObj && (htmlElement.jsObj = this);
                const data = htmlElement.name;
                data && (priv.name = data);
            }
            !internalId || internalId !== id && (priv.internalId = id);
        }
        //#endregion getHTMLElement
        //#region getChilds
        getChilds() { }
        //#endregion getChilds
        /*updateFromHTML() {
            let properties = this.HTMLElement.querySelector("properties"), props;
            if (!properties) return;
            if (properties.parentNode !== this.HTMLElement) return;
            props = JSON.parse(properties.innerHTML);
            // à modifier avec getOwnPropertyNames
            for (let prop in props) {
                if (this[prop] !== null && this[prop] !== undefined) {
                    //if (prop === "name") internal(this).name = props[prop];
                    this[prop] = props[prop];
                }
            }
            this.HTMLElement.removeChild(properties);
        }*/
        //#region clientToDocument // TODO : changer en get
        clientToDocument() {
            //#region Variables déclaration
            const result = new core.classes.Point;
            const bRect = this.getBoundingClientRect();
            //#endregion Variables déclaration
            result.setValues(bRect.left, bRect.top);
            return result;
        }
        //#endregion clientToDocument
        //#region createEventsAndBind
        createEventsAndBind(eventsName, props) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            const form = priv.form;
            if (Array.isArray(eventsName)) {
                eventsName.forEach(eventName => {
                    const eventValue = props[eventName];
                    this[eventName] = new core.classes.NotifyEvent(this);
                    if (props.hasOwnProperty(eventName)) {
                        if (core.tools.isFunc(form[eventValue])) {
                            this[eventName].addListener(form[eventValue]);
                        } else if (core.tools.isString(eventValue)) {
                            !String.isNullOrEmpty(eventValue)
                                && this[eventName].addListener(new Function(eventValue));
                        } else if (core.tools.isFunc(eventValue)) {
                            this[eventName].addListener(eventValue);
                        }
                    }
                });
            }
        }
        //#endregion createEventsAndBind
        //#region unBindAndDestroyEvents
        unBindAndDestroyEvents(eventsName) {
            Array.isArray(eventsName)
                && eventsName.forEach(eventName => {
                    console.log(eventName);
                    this[eventName].destroy();
                    this[eventName] = null;
                    delete this[eventName];
                });
        }
        //#endregion unBindAndDestroyEvents
        //#endregion
    }
    return Component;
    //#endregion Component
})();
core.classes.register(core.types.CATEGORIES.COMMON, Component);
//#endregion Component
export { Component };
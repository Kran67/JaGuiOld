//#region Imports
import { Bindable } from "/scripts/core/bindable.js";
import { Tools } from "/scripts/core/tools.js";
import { Rect } from "/scripts/core/geometry.js";
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
            super(owner);
            const priv = internal(this);
            priv.owner = owner;
            priv.owners = [];
            priv.app = null;
            priv.form = null;
            priv.loading = true;
            priv.destroying = false;
            priv.HTMLElement = null;
            priv.HTMLElementStyle = null;
            priv.designing = false;
            priv.internalId = String.uniqueId();
            priv.updating = false;
            priv.designInstance = false;
            priv.component = true;
            priv.name = props.hasOwnProperty("name") ? props.name : String.EMPTY;
            priv.cssBorder = new Rect;
            priv.inForm = this instanceof Core.classes.BaseWindow ? false : props.hasOwnProperty("inForm") ? props.inForm : true;
            priv.visible = props.hasOwnProperty("visible") && Tools.isBool(props.visible) ? props.visible : true;
            priv.left = props.hasOwnProperty("left") && Tools.isNumber(props.left) ? props.left : 0;
            priv.top = props.hasOwnProperty("top") && Tools.isNumber(props.top) ? props.top : 0;
            if (owner instanceof Core.classes.Application) {
                priv.app = owner;
            } else {
                priv.app = priv.owner.app;
            }
            if (owner instanceof Core.classes.Component) {
                priv.form = priv.owner.form;
                priv.owner.insertComponent(this);
            } else {
                priv.form = this;
            }
            Core.classes.newCollection(this, this, Core.classes.Component, "components");
            if (priv.owner instanceof Core.classes.Component) {
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
            if (owner && owner.components.length > 0) {
                return owner.components.indexOf(this);
            } else {
                return -1;
            }
        }
        set componentIndex(newValue) {
            //#region Variables déclaration
            const owner = internal(this).owner;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue < 0) {
                    newValue = 0;
                }
                if (owner) {
                    const i = owner.components.indexOf(this);
                    if (i >= 0) {
                        const count = owner.components.length;
                        if (newValue < 0) newValue = 0;
                        if (newValue >= count) newValue = count - 1;
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
            if (newValue instanceof Core.classes.Application) {
                if (priv.app !== newValue) {
                    priv.app = newValue;
                }
            }
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
            if (newValue instanceof Core.classes.Window) {
                if (priv.form !== newValue) {
                    priv.form = newValue;
                }
            }
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
            if (priv.loading !== newValue) {
                priv.loading = newValue;
            }
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
            if (newValue instanceof HTMLElement) {
                if (priv.HTMLElement !== newValue) {
                    priv.HTMLElement = newValue;
                }
            }
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
            if (newValue instanceof CSSStyleDeclaration) {
                if (priv.HTMLElementStyle !== newValue) {
                    priv.HTMLElementStyle = newValue;
                }
            }
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
            if (Tools.isBool(newValue)) {
                if (priv.designing !== newValue) {
                    priv.designing = newValue;
                }
            }
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
            if (Tools.isBool(newValue)) {
                if (priv.updating !== newValue) {
                    priv.updating = newValue;
                }
            }
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
            if (Tools.isBool(newValue)) {
                if (priv.designInstance !== newValue) {
                    priv.designInstance = newValue;
                }
            }
        }
        //#endregion designInstance
        //#region name
        get name() {
            return internal(this).name;
        }
        set name(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = priv.form;
            let name = priv.name;
            //#endregion Variables déclaration
            if (String.isNullOrEmpty(newValue) && newValue.trim() !== String.EMPTY) {
                if (priv.name !== newValue) {
                    if (form !== this && form && form[name]) {
                        delete form[name];
                    }
                    name = priv.name = newValue;
                    if (form !== this && this !== form.layout && this !== form.content) {
                        if (form) {
                            if (!form[name]) form[name] = this;
                        }
                    }
                }
            }
        }
        //#endregion name
        //#region component
        get component() {
            return internal(this).component;
        }
        set component(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.component !== newValue) {
                    priv.component = newValue;
                }
            }
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
            if (Tools.isBool(newValue)) {
                if (priv.inForm !== newValue) {
                    priv.inForm = newValue;
                }
            }
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
            if (Tools.isBool(newValue)) {
                if (priv.visible !== newValue) {
                    priv.visible = newValue;
                }
            }
        }
        //#endregion visible
        //#region template
        get template() {
            //#region Variables déclaration
            const priv = internal(this);
            let html = Core.classes.getTemplate(this.constructor.name);
            let a = html.split("{name}");
            //#endregion Variables déclaration
            html = a.join(priv.name);
            a = html.split("{internalId}");
            html = a.join(priv.internalId);
            return html;
        }
        //#region template
        //#region properties
        get properties() {
            //#region Variables déclaration
            const priv = internal(this);
            let prop = null;
            const htmlElement = priv.HTMLElement;
            const props = Tools.getPropertiesFromObject(this);
            //#endregion Variables déclaration
            if (!priv.component) {
                prop = "width";
                props.push({ property: prop, value: htmlElement.offsetWidth, categories: Core.classes.getPropertyCategories(prop) });
                prop = "height";
                props.push({ property: prop, value: htmlElement.offsetHeight, categories: Core.classes.getPropertyCategories(prop) });
            }
            prop = "left";
            props.push({ property: prop, value: htmlElement.offsetLeft, categories: Core.classes.getPropertyCategories(prop) });
            prop = "top";
            props.push({ property: prop, value: htmlElement.offsetTop, categories: Core.classes.getPropertyCategories(prop) });
            return props;
        }
        //#endregion properties
        //#region events
        get events() {
            //#region Variables déclaration
            const props = [];
            //#endregion Variables déclaration
            for (let prop in this) {
                if (this.hasOwnProperty(prop)) {
                    if (prop.startsWith('on') && this[prop] instanceof Core.classes.NotifyEvent) {
                        props.push({ event: prop, value: this[prop] });
                    }
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
            if (Core.isHTMLRenderer) {
                if (htmlElement.offsetLeft + htmlElement.offsetWidth < 0 || htmlElement.offsetLeft > oHtmlElement.offsetWidth ||
                    htmlElement.offsetTop + htmlElement.offsetHeight < 0 || htmlElement.offsetTop > oHtmlElement.offsetHeight) {
                    visible = false;
                }
            } else if (Core.isCanvasRenderer) {
                if (left + priv.width < 0 || left > owner.width ||
                    top + priv.height < 0 || top > owner.height) {
                    visible = false;
                }
            }
            if (visible) {
                owners.forEach(o => {
                    visible = visible && o.visible;
                });
            }
            return visible;
        }
        //#endregion isVisible
        //#region zOrder
        get zOrder() {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = priv.owner;
            //#endregion Variables déclaration
            if (owner && priv.HTMLElement) {
                return owner.components.length + 1;
            }
            return -1;
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
            if (right != null) {
                left = priv.owner.contentWidth - this.width - right - padding.right - margin.right;
            }
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
            if (right != null) {
                left = priv.owner.contentWidth - this.width - right - padding.right - margin.right;
            }
            return left;
        }
        set left(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                const lastLeft = Core.isHTMLRenderer ? priv.HTMLElement.offsetLeft : priv.left;
                if (lastLeft !== newValue) {
                    if (!priv.loading) {
                        this.propertyChanged(Types.BINDABLEPROPERTIES.LEFT);
                        if (Core.isHTMLRenderer) {
                            priv.HTMLElementStyle.left = `${newValue}${Types.CSSUNITS.PX}`;
                        } else {
                            priv.left = newValue;
                        }
                    }
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
            if (bottom != null) {
                top = priv.owner.height - this.height - bottom - this.margin.bottom;
            }
            return top;
        }
        set top(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                const lastTop = (Core.isHTMLRenderer ? priv.HTMLElement.offsetTop : priv.top);
                if (lastTop !== newValue) {
                    if (!priv.loading) {
                        this.propertyChanged(Types.BINDABLEPROPERTIES.TOP);
                        if (Core.isHTMLRenderer) {
                            priv.HTMLElementStyle.top = `${newValue}${Types.CSSUNITS.PX}`;
                        } else {
                            priv.top = newValue;
                        }
                    }
                }
            }
        }
        //#endregion top
        //#region Methods
        //#region moveTo
        moveTo(x, y) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = priv.HTMLElement;
            const htmlElementStyle = priv.HTMLElementStyle;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (Tools.isNumber(x) && Tools.isNumber(y) || this instanceof Core.classes.Control) {
                priv.left = x;
                priv.top = y;
                if (isHtmlRenderer && htmlElement && priv.inForm) {
                    htmlElementStyle.left = `${x}${PX}`;
                    htmlElementStyle.top = `${y}${PX}`;
                }
            }
        }
        //#endregion moveTo
        //#region getBoundingClientRect
        getBoundingClientRect() {
            //#region Variables déclaration
            const margin = this.margin;
            //#endregion Variables déclaration
            if (Core.isHTMLRenderer) {
                return this.HTMLElement.getBoundingClientRect();
            } else {
                const boundingClientRect = new Rect(this.left + margin.left, this.top + margin.top, 0, 0);
                this.owners.forEach(owner => {
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
            const htmlElement = this.HTMLElement;
            const owner = this.owner;
            const owners = this.owners;
            //#endregion Variables déclaration
            this.destroying();
            this.destroyComponents();
            if (htmlElement) {
                htmlElement.parentNode.removeChild(htmlElement);
            }
            if (owner) {
                if (!(owner instanceof Core.classes.Application)) {
                    owner.remove(this);
                }
            }
            if (owners) {
                owners.destroy();
            }
            super.destroy();
        }
        //#endregion destroy
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            const form = this.form;
            //#endregion Variables déclaration
            this.loading = false;
            this.components.forEach(comp => {
                if (comp.loaded) {
                    if (comp.loading) {
                        comp.loaded();
                    }
                }
            });
            if (Core.isHTMLRenderer) {
                this.bindEvents();
                if (htmlElement) {
                    const properties = htmlElement.querySelector(`[id='${this.internalId}']> properties:first-child`);
                    if (properties) {
                        htmlElement.removeChild(properties);
                    }
                }
            }
            if (this.hasOwnProperty("action")) {
                if (form[this._action]) {
                    this.action = form[this.action];
                } else if (!String.isNullOrEmpty(this.action)) {
                    const action = this.action;
                    const app = this.app;
                    if (action.includes(".")) {
                        let data = action.split(".");
                        if (app[data.first]) {
                            data = app[data.first][data.last];
                            if (data) {
                                this.action = data;
                            }
                        }
                    }
                }
            }
            this.moveTo(this.left, this.top);
        }
        //#endregion loaded
        //#region insert
        insert(component) {
            //#region Variables déclaration
            const components = this.components;
            const form = this.form;
            const controls = form.controls;
            //#endregion Variables déclaration
            if (components.indexOf(component) === -1) {
                components.push(component);
                component.app = this.app;
                component.owner = this;
                if (form !== component) {
                    if (component.inForm && controls.indexOf(component) === -1) {
                        controls.push(component);
                        if (!form[component.name]) {
                            form[component.name] = component;
                        }
                    }
                }
            }
        }
        //#endregion insert
        //#region remove
        remove(component) {
            //#region Variables déclaration
            const components = this.components;
            const form = this.form;
            const controls = form.controls;
            //#endregion Variables déclaration
            if (components.indexOf(component) > -1) {
                let idx = components.indexOf(component);
                if (idx > -1) {
                    components.removeAt(idx);
                }
                if (form[component.name]) {
                    form[component.name] = null;
                    delete form[component.name];
                }
                idx = controls.indexOf(component);
                if (idx > -1) {
                    controls.removeAt(idx);
                }
            }
        }
        //#endregion remove
        //#region insertComponent
        insertComponent(component) {
            if (component.owner !== component.app) {
                component.owner.remove(component);
            }
            this.insert(component);
        }
        //#endregion insertComponent
        //#region getComponent
        getComponent(index) {
            //#region Variables déclaration
            const components = this.components;
            //#endregion Variables déclaration
            if (components.length === 0 || index >= components.length) {
                throw Core.errMsg.LISTINDEXERROR.format(index);
            }
            return components[index];
        }
        //#endregion getComponent
        //#region beforeDestruction
        beforeDestruction() {
            if (!this.destroying) {
                this._destroying();
            }
        }
        //#endregion beforeDestruction
        //#region destroyComponents
        destroyComponents() {
            //#region Variables déclaration
            let instance;
            //#endregion Variables déclaration
            const components = this.components;
            if (components) {
                while (components.length > 0) {
                    instance = components.last;
                    this.remove(instance);
                    instance.destroy();
                }
            }
            //Tools.Debugger.log(arguments, this, t);
        }
        //#endregion destroyComponents
        //#region _destroying
        _destroying() {
            //#region Variables déclaration
            const components = this.components;
            //#endregion Variables déclaration
            if (!this.destroying) {
                this.destroying = true;
                if (components) {
                    components.forEach(comp => {
                        comp._destroying();
                    });
                }
            }
            //Tools.Debugger.log(arguments, this, t);
        }
        //#endregion _destroying
        //#region findComponent
        findComponent(name) {
            //#region Variables déclaration
            const components = this.components;
            //#endregion Variables déclaration
            if (!String.isNullOrEmpty(name)) {
                if (components) {
                    const ret = components.find(comp => {
                        return comp.name === name;
                    });
                    return ret?ret:null;
                }
            }
            return null;
        }
        //#endregion findComponent
        //#region _updating
        _updating() {
            this.updating = true;
        }
        //#endregion _updating
        //#region updated
        updated() {
            this.updating = false;
        }
        //#endregion updated
        //#region validateRename
        validateRename(component, curName, newName) {
            //#region Variables déclaration
            const owner = this.owner;
            //#endregion Variables déclaration
            if (this.designing && owner) {
                if (!(owner instanceof Core.classes.App)) {
                    owner.validateRename(component, curName, newName);
                }
            }
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
            const internalId = this.internalId;
            const htmlElement = this.HTMLElement = document.getElementById(id);
            //#endregion Variables déclaration
            if (htmlElement) {
                this.HTMLElementStyle = htmlElement.style;
                if (!htmlElement.jsObj) {
                    htmlElement.jsObj = this;
                }
                const data = htmlElement.name;
                if (data) {
                    this.name = data;
                }
            }
            if (!internalId || internalId !== id) {
                this.internalId = id;
            }
        }
        //#endregion getHTMLElement
        //#region getChilds
        getChilds() { }
        //#endregion getChilds
        //#region bindEvents
        bindEvents() {}
        //#endregion bindEvents
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
        //#region clientToDocument
        clientToDocument() {
            //#region Variables déclaration
            const result = new Core.classes.Point;
            const bRect = this.getBoundingClientRect();
            //#endregion Variables déclaration
            result.setValues(bRect.left, bRect.top);
            return result;
        }
        //#endregion clientToDocument
        //#region bindEventToHTML
        bindEventToHTML(eventName) { // à vérifier
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            const form = this.form;
            if (Tools.isString(eventName) && htmlElement) {
                const data = htmlElement.dataset[eventName.toLowerCase()];
                if (data) {
                    if (Tools.isFunc(form[data])) {
                        this[eventName].addListener(form[data]);
                    } else if (Tools.isString(data)) {
                        if (!String.isNullOrEmpty(data)) {
                            this[eventName].addListener(new Function(data));
                        }
                    }
                }
            }
        }
        //#endregion bindEventToHTML
        //#endregion
    }
    return Component;
})();
//#endregion Component
//#region Component defineProperties
Object.defineProperties(Component, {
    "name": {
        enumerable: true
    }
});
//#endregion Component defineProperties
//#endregion
Core.classes.register(Types.CATEGORIES.COMMON, Component);
export { Component };
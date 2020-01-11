import { Bindable } from "/scripts/core/bindable.js";
import { Tools } from "/scripts/core/tools.js";
import { Rect } from "/scripts/core/geometry.js";
//#region Component
const Component = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Component extends Bindable {
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
            priv.name = props.name ? props.name : String.EMPTY;
            priv.cssBorder = new Rect;
            priv.inForm = this instanceof Core.classes.BaseWindow ? false : props.hasOwnProperty("inForm") ? props.inForm : true;
            priv.visible = props.hasOwnProperty("visible") && typeof props.visible === Types.CONSTANTS.BOOLEAN ? props.visible : true;
            priv.left = props.hasOwnProperty("left") && typeof props.left === Types.CONSTANTS.NUMBER ? props.left : 0;
            priv.top = props.hasOwnProperty("top") && typeof props.top === Types.CONSTANTS.NUMBER ? props.top : 0;
            //#region Private
            if (owner instanceof Core.classes.Application) {
                priv.app = owner;
                //priv.app.windows.push(this);
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
            //#endregion
            //this._tag=null;
            if (priv.owner instanceof Core.classes.Component) {
                priv.owners.addRange(priv.owner.owners);
                priv.owners.push(priv.owner);
            }
            //Tools.Debugger.log(arguments, this, t);
        }
        //#region Getter / Setters
        get owner() {
            return internal(this).owner;
        }
        set owner(newValue) {
            internal(this).owner = newValue;
        }
        get componentIndex() {
            const owner = internal(this).owner;
            if (owner && owner.components.length > 0) {
                return owner.components.indexOf(this);
            } else {
                return -1;
            }
        }
        set componentIndex(newValue) {
            const owner = internal(this).owner;
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
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
        get owners() {
            return internal(this).owners;
        }
        get app() {
            return internal(this).app;
        }
        set app(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Application) {
                if (priv.app !== newValue) {
                    priv.app = newValue;
                }
            }
        }
        get form() {
            return internal(this).form;
        }
        set form(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Window) {
                if (priv.form !== newValue) {
                    priv.form = newValue;
                }
            }
        }
        get loading() {
            return internal(this).loading;
        }
        set loading(newValue) {
            const priv = internal(this);
            if (priv.loading !== newValue) {
                priv.loading = newValue;
            }
        }
        get destroying() {
            return internal(this).destroying;
        }
        get HTMLElement() {
            return internal(this).HTMLElement;
        }
        set HTMLElement(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.HTMLElement !== newValue) {
                    priv.HTMLElement = newValue;
                }
            }
        }
        get HTMLElementStyle() {
            return internal(this).HTMLElementStyle;
        }
        set HTMLElementStyle(newValue) {
            const priv = internal(this);
            if (newValue instanceof CSSStyleDeclaration) {
                if (priv.HTMLElementStyle !== newValue) {
                    priv.HTMLElementStyle = newValue;
                }
            }
        }
        get designing() {
            return internal(this).designing;
        }
        set designing(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.designing !== newValue) {
                    priv.designing = newValue;
                }
            }
        }
        get internalId() {
            return internal(this).internalId;
        }
        set internalId(newValue) {
            internal(this).internalId = newValue;
        }
        get updating() {
            return internal(this).updating;
        }
        set updating(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.updating !== newValue) {
                    priv.updating = newValue;
                }
            }
        }
        get designInstance() {
            return internal(this).designInstance;
        }
        set designInstance(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.designInstance !== newValue) {
                    priv.designInstance = newValue;
                }
            }
        }
        get name() {
            return internal(this).name;
        }
        set name(newValue) {
            const priv = internal(this);
            const form = priv.form;
            let name = priv.name;
            if (typeof newValue === Types.CONSTANTS.STRING && newValue.trim() !== String.EMPTY) {
                if (priv.name !== newValue) {
                    //if ((newValue!==String.EMPTY) && !Tools.isValidIdent(newValue)) throw $j.errMsg.INVALIDNAME.format(newValue);
                    //if (this.owner instanceof Component) this.owner.validateRename(this,this._name,newValue);
                    //else this.validateRename(null,this._name,newValue);
                    if (form !== this && form && form[name]) {
                        delete form[name];
                    }
                    ////if ((this.owner instanceof Control)&&(this instanceof Control)){
                    ////  if (this.owner.controlsName.indexOf(this._name)>-1) this.owner.controlsName.remove(this._name);
                    ////}
                    //this._app.removeName(this);
                    name = priv.name = newValue;
                    //this._app.addName(this);
                    //if (this instanceof Control) this.objName=newValue;
                    if (form !== this && this !== form.layout && this !== form.content) {
                        if (form) {
                            if (!form[name]) form[name] = this;
                        }
                    }
                    //if ((this.owner instanceof Control)&&(this instanceof Control)){
                    //  if (this.owner.controlsName.indexOf(this._name)===-1) this.owner.controlsName.push(this._name);
                    //}
                }
            }
        }
        get component() {
            return internal(this).component;
        }
        set component(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.component !== newValue) {
                    priv.component = newValue;
                }
            }
        }
        get inForm() {
            return internal(this).inForm;
        }
        set inForm(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.inForm !== newValue) {
                    priv.inForm = newValue;
                }
            }
        }
        get visible() {
            return internal(this).visible;
        }
        set visible(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.visible !== newValue) {
                    priv.visible = newValue;
                }
            }
        }
        get template() {
            const priv = internal(this);
            let html = Core.classes.getTemplate(this.constructor.name);
            let a = html.split("{name}");
            html = a.join(priv.name);
            a = html.split("{internalId}");
            html = a.join(priv.internalId);
            return html;
        }
        get _properties() {
            const priv = internal(this);
            let prop = null;
            const htmlElement = priv.HTMLElement;
            const props = Tools.getPropertiesFromObject(this);
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
        get events() {
            const props = [];
            for (let prop in this) {
                if (this.hasOwnProperty(prop)) {
                    if (prop.startsWith('on') && this[prop] instanceof Core.classes.NotifyEvent) {
                        props.push({ event: prop, value: this[prop] });
                    }
                }
            }
            return props;
        }
        get isVisible() {
            const priv = internal(this);
            let visible = priv.visible;
            const htmlElement = priv.HTMLElement;
            const owner = priv.owner;
            const left = priv.left;
            const top = priv.top;
            const owners = priv.owners;
            // si le composant dépasse de son parent
            if (Core.isHTMLRenderer) {
                if (htmlElement.offsetLeft + htmlElement.offsetWidth < 0 || htmlElement.offsetLeft > owner.HTMLElement.offsetWidth ||
                    htmlElement.offsetTop + htmlElement.offsetHeight < 0 || htmlElement.offsetTop > owner.HTMLElement.offsetHeight) {
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
        get zOrder() {
            const priv = internal(this);
            const owner = priv.owner;
            if (owner && priv.HTMLElement) {
                return owner.components.length + 1;
            }
            return -1;
        }
        get contentLeft() {
            const priv = internal(this);
            let left = priv.left;
            const margin = this.margin;
            const padding = this.padding;
            const right = this.right;
            left += margin.left + padding.left;
            if (right != null) {
                left = priv.owner.contentWidth - this.width - right - padding.right - margin.right;
            }
            return left;
        }
        get left() {
            const priv = internal(this);
            let left = priv.left;
            const margin = this.margin;
            const padding = this.padding;
            const right = this.right;
            if (right != null) {
                left = priv.owner.contentWidth - this.width - right - padding.right - margin.right;
            }
            return left;
        }
        set left(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
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
        get contentTop() {
            const priv = internal(this);
            const top = priv.top;
            const margin = this.margin;
            const padding = this.padding;
            return top + margin.top + padding.top;
        }
        get top() {
            const priv = internal(this);
            let top = priv.top;// + (priv.owner.padding?priv.owner.padding.top:0);
            const bottom = this.bottom;
            if (bottom != null) {
                top = priv.owner.height - this.height - bottom - this.margin.bottom;
            }
            return top;
        }
        set top(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
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
        //get cssBorder() {
        //    return internal(this).cssBorder;
        //}
        //getCSSBorder() {
        //    let HTMLElement = this.HTMLElement;
        //    let cssBorder = this.cssBorder;
        //    if (HTMLElement) {
        //        cssBorder.left = ~~parseFloat(getComputedStyle(HTMLElement).borderLeftWidth);
        //        cssBorder.top = ~~parseFloat(getComputedStyle(HTMLElement).borderTopWidth);
        //        cssBorder.right = ~~parseFloat(getComputedStyle(HTMLElement).borderRightWidth);
        //        cssBorder.bottom = ~~parseFloat(getComputedStyle(HTMLElement).borderBottomWidth);
        //    }
        //    return this.cssBorder;
        //}
        //#endregion
        //#region Methods
        //#region moveTo
        moveTo(x, y) {
            //#region Variables déclaration
            const priv = internal(this);
            const NUMBER = Types.CONSTANTS.NUMBER;
            const htmlElement = priv.HTMLElement;
            const htmlElementStyle = priv.HTMLElementStyle;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (typeof x === NUMBER && typeof y === NUMBER || this instanceof Core.classes.Control) {
                priv.left = x;
                priv.top = y;
                if (isHtmlRenderer && htmlElement && priv.inForm) {
                    htmlElementStyle.left = `${x}${PX}`;
                    htmlElementStyle.top = `${y}${PX}`;
                }
            }
        }
        //#endregion moveTo
        getBoundingClientRect() {
            const margin = this.margin;
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
        destroy() {
            const htmlElement = this.HTMLElement;
            const owner = this.owner;
            const owners = this.owners;
            this.destroying();
            this.destroyComponents();
            //if (this instanceof Control) {
            if (htmlElement) {
                htmlElement.parentNode.removeChild(htmlElement);
            }
            //if (Core.isHTMLRenderer) {
            //    this.HTMLElement = null;
            //    this.HTMLElementStyle = null;
            //}
            //}
            if (owner) {
                if (!(owner instanceof Core.classes.Application)) {
                    owner.remove(this);
                }
            }
            //Tools.Debugger.log(arguments, this, t);
            //this.app = null;
            //this.form = null;
            //this._name = null;
            //this._left = null;
            //this._top = null;
            //this._tag = null;
            //this._componentIndex = null;
            //this._owner = null;
            if (owners) {
                owners.destroy();
            }
            //this._owners = null;
            //this.components = null;
            //this.loading = null;
            //this.destroying = null;
            //this._designing = null;
            //this._updating = null;
            //this._designInstance = null;
            //if (Core.isHTMLRenderer) {
            //    if (this.cssBorder) this.cssBorder.destroy();
            //    //this.cssBorder = null;
            //}
            //this._internalId = null;
            super.destroy();
        }
        loaded() {
            const htmlElement = this.HTMLElement;
            const form = this.form;
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
                    //data = this.HTMLElement.dataset.popupmenu;
                    //if (data) {
                    //    if (this.form[data]) {
                    //        if (this.form[data] instanceof Core.classes.PopupMenu) {
                    //            this.popupMenu = this.form[data];
                    //            this.popupMenu.control = this;
                    //        }
                    //    }
                    //}
                }
                //this.getCSSBorder();
            }
            if (this.hasOwnProperty("action")) {
                if (form[this._action]) {
                    this.action = form[this.action];
                } else if (typeof this.action === Types.CONSTANTS.STRING) {
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
            //if (this._inForm&&this.form!==this) {
            //  this.form._controls.remove(this);
            //  this.form._controls.push(this);
            //}
            this.moveTo(this.left, this.top);
        }
        insert(component) {
            const components = this.components;
            const form = this.form;
            const controls = form.controls;
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
                //Tools.Debugger.log(arguments, this, t);
            }
        }
        remove(component) {
            const components = this.components;
            const form = this.form;
            const controls = form.controls;
            if (components.indexOf(component) > -1) {
                let idx = components.indexOf(component);
                if (idx > -1) {
                    components.removeAt(idx);
                }
                if (form[component.name]) {
                    //if (component.xmlNode) Xml.delNode(component.xmlNode);
                    form[component.name] = null;
                    delete form[component.name];
                }
                idx = controls.indexOf(component);
                if (idx > -1) {
                    controls.removeAt(idx);
                }
                //Tools.Debugger.log(arguments, this, t);
            }
        }
        insertComponent(component) {
            if (component.owner !== component.app) {
                component.owner.remove(component);
            }
            this.insert(component);
            //Tools.Debugger.log(arguments, this, t);
        }
        getComponent(index) {
            const components = this.components;
            if (components.length === 0 || index >= components.length) {
                throw Core.errMsg.LISTINDEXERROR.format(index);
            }
            return components[index];
            //Tools.Debugger.log(arguments, this, t);
        }
        beforeDestruction() {
            if (!this.destroying) {
                this._destroying();
            }
            //Tools.Debugger.log(arguments, this, t);
        }
        destroyComponents() {
            let instance;
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
        _destroying() {
            const components = this.components;
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
        findComponent(name) {
            const components = this.components;
            if (name !== String.EMPTY) {
                if (components) {
                    const ret = components.find(comp => {
                        return comp.name === name;
                    });
                    return ret?ret:null;
                }
            }
            //Tools.Debugger.log(arguments, this, t);
            return null;
        }
        _updating() {
            this.updating = true;
            //Tools.Debugger.log(arguments, this, t);
        }
        updated() {
            this.updating = false;
            //Tools.Debugger.log(arguments, this, t);
        }
        validateRename(component, curName, newName) {
            const owner = this.owner;
            if (this.designing && owner) {
                if (!(owner instanceof Core.classes.App)) {
                    owner.validateRename(component, curName, newName);
                }
            }
            //Tools.Debugger.log(arguments, this, t);
        }
        setChildOrder(child, order) { }
        beginUpdate() { }
        endUpdate() { }
        getHTMLElement(id) {
            const internalId = this.internalId;
            const htmlElement = this.HTMLElement = document.getElementById(id);

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
        getChilds() { }
        bindEvents() {}
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
        clientToDocument() {
            const result = new Core.classes.Point;
            const bRect = this.getBoundingClientRect();
            result.setValues(bRect.left, bRect.top);
            return result;
        }
        bindEventToHTML(eventName) {
            const _const = Types.CONSTANTS;
            const form = this.form;
            if (typeof eventName === _const.STRING && this.HTMLElement) {
                const data = this.HTMLElement.dataset[eventName.toLowerCase()];
                if (data) {
                    if (typeof form[data] === _const.FUNCTION) {
                        this[eventName].addListener(form[data]);
                    } else if (typeof data === _const.STRING) {
                        if (data !== String.EMPTY) {
                            this[eventName].addListener(new Function(data));
                        }
                    }
                }
            }
        }
        //#endregion
    }
    return Component;
})();
Object.defineProperties(Component, {
    "name": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.COMMON, Component);
export { Component };
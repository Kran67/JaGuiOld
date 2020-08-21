//#region Imports
import { Bindable } from '/scripts/core/bindable.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Imports
//#region Class Component
class Component extends Bindable {
    //#region Private fields
    #owners = [];
    #app= null;
    #form= null;
    #loading= !0;
    #destroying= !1;
    #HTMLElement= null;
    #HTMLElementStyle= null;
    #designing= !1;
    #internalId= String.uniqueId();
    #updating= !1;
    #designInstance= !1;
    #component= !0;
    #cssBorder= new Rect;
    #inForm = !0;
    #visible;
    #left;
    #top;
    #owner;
    #components = [];
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(props);
        if (this instanceof core.classes.BaseWindow) {
            this.#inForm = !1;
        } else if (props.hasOwnProperty('inForm') && core.tools.isBool(props.inForm)) {
            this.#inForm = props.inForm;
        } else {
            this.#inForm = !0;
        }
        this.#visible= props.hasOwnProperty('visible') && core.tools.isBool(props.visible) ? props.visible : !0,
        this.#left= props.hasOwnProperty('left') && core.tools.isNumber(props.left) ? props.left : 0,
        this.#top= props.hasOwnProperty('top') && core.tools.isNumber(props.top) ? props.top : 0,
        this.#owner = owner;
        this.#app = owner instanceof core.classes.Application ? owner : owner.app;
        if (owner instanceof core.classes.Component) {
            this.#form = owner.form;
            owner.insertComponent(this);
        } else {
            this.#form = this;
        }
        this.#components.convertToCollection(owner, core.classes.Component);
        if (owner instanceof core.classes.Component) {
            this.#owners.addRange(owner.owners);
            this.#owners.push(owner);
        }
    }
    //#endregion constructor
    //#region Getter / Setters
    //#region components
    get components() {
        return this.#components;
    }
    //#endregion components
    //#region owner
    get owner() {
        return this.#owner;
    }
    set owner(newValue) {
        this.#owner = newValue;
    }
    //#endregion owner
    //#region componentIndex
    get componentIndex() {
        return this.#owner && this.#owner.components.length > 0 ? this.#owner.components.indexOf(this) : -1;
    }
    set componentIndex(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(newValue, 0);
            if (this.#owner) {
                const i = this.#owner.components.indexOf(this);
                if (i >= 0) {
                    const count = this.#owner.components.length - 1;
                    newValue = Math.min(newValue, count);
                    if (newValue !== i) {
                        this.#owner.components.splice(i, 1);
                        this.#owner.components.insert(newValue, this);
                    }
                }
            }
        }
    }
    //#endregion componentIndex
    //#region owners
    get owners() {
        return this.#owners;
    }
    //#endregion owners
    //#region app
    get app() {
        return this.#app;
    }
    set app(newValue) {
        newValue instanceof core.classes.Application && this.#app !== newValue && (this.#app = newValue);
    }
    //#endregion app
    //#region form
    get form() {
        return this.#form;
    }
    set form(newValue) {
        newValue instanceof core.classes.Window && this.#form !== newValue && (this.#form = newValue);
    }
    //#endregion form
    //#region loading
    get loading() {
        return this.#loading;
    }
    set loading(newValue) {
        this.#loading !== newValue && (this.#loading = newValue);
    }
    //#endregion loading
    //#region destroying
    get destroying() {
        return this.#destroying;
    }
    //#endregion destroying
    //#region HTMLElement
    get HTMLElement() {
        return this.#HTMLElement;
    }
    set HTMLElement(newValue) {
        newValue instanceof HTMLElement && this.#HTMLElement !== newValue
            && (this.#HTMLElement = newValue);
    }
    //#endregion HTMLElement
    //#region HTMLElementStyle
    get HTMLElementStyle() {
        return this.#HTMLElementStyle;
    }
    set HTMLElementStyle(newValue) {
        newValue instanceof CSSStyleDeclaration && this.#HTMLElementStyle !== newValue
            && (this.#HTMLElementStyle = newValue);
    }
    //#endregion HTMLElementStyle
    //#region designing
    get designing() {
        return this.#designing;
    }
    set designing(newValue) {
        core.tools.isBool(newValue) && this.#designing !== newValue
            && (this.#designing = newValue);
    }
    //#endregion designing
    //#region internalId
    get internalId() {
        return this.#internalId;
    }
    set internalId(newValue) {
        this.#internalId = newValue;
    }
    //#endregion internalId
    //#region updating
    get updating() {
        return this.#updating;
    }
    set updating(newValue) {
        core.tools.isBool(newValue) && this.#updating !== newValue
            && (this.#updating = newValue);
    }
    //#endregion updating
    //#region designInstance
    get designInstance() {
        return this.#designInstance;
    }
    set designInstance(newValue) {
        core.tools.isBool(newValue) && this.#designInstance !== newValue
            && (this.#designInstance = newValue);
    }
    //#endregion designInstance
    //#region component
    get component() {
        return this.#component;
    }
    set component(newValue) {
        core.tools.isBool(newValue) && this.#component !== newValue && (this.#component = newValue);
    }
    //#endregion component
    //#region inForm
    get inForm() {
        return this.#inForm;
    }
    set inForm(newValue) {
        core.tools.isBool(newValue) && this.#inForm !== newValue && (this.#inForm = newValue);
    }
    //#endregion inForm
    //#region visible
    get visible() {
        return this.#visible;
    }
    set visible(newValue) {
        core.tools.isBool(newValue) && this.#visible !== newValue && (this.#visible = newValue);
    }
    //#endregion visible
    //#region template
    get template() {
        //#region Variables déclaration
        let html = core.classes.getTemplate(this.constructor.name);
        let a = html.split('{name}');
        //#endregion Variables déclaration
        html = a.join(this.name ? this.name : String.EMPTY);
        return html;
    }
    //#endregion template
    //#region properties
    get properties() {
        return core.tools.getPropertiesFromObject(this);
    }
    //#endregion properties
    //#region events
    get events() { // TODO à revoir
        return core.tools.getPropertiesFromObject(this, !0);
    }
    //#endregion events
    //#region isVisible
    get isVisible() {
        //#region Variables déclaration
        let visible = this.#visible;
        const htmlElement = this.#HTMLElement;
        const owner = this.#owner;
        const left = this.#left;
        const top = this.#top;
        const owners = this.#owners;
        const oHtmlElement = owner.HTMLElement;
        //#endregion Variables déclaration
        // si le composant dépasse de son parent
        if (core.isHTMLRenderer) {
            if (htmlElement.offsetLeft + htmlElement.offsetWidth < 0 || htmlElement.offsetLeft > oHtmlElement.offsetWidth ||
                htmlElement.offsetTop + htmlElement.offsetHeight < 0 || htmlElement.offsetTop > oHtmlElement.offsetHeight) {
                visible = !1;
            }
        } else if (core.isCanvasRenderer) {
            left + this.width < 0 || left > owner.width ||
                top + this.height < 0 || top > owner.height && (visible = !1);
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
        const owner = this.#owner;
        //#endregion Variables déclaration
        return owner && this.#HTMLElement
            ? owner.components.length + 1 : -1;
    }
    //#endregion zOrder
    //#region contentLeft
    get contentLeft() {
        //#region Variables déclaration
        let left = this.#left;
        const margin = this.margin;
        const padding = this.padding;
        const right = this.right;
        //#endregion Variables déclaration
        left += margin.left + padding.left;
        right != null
            && (left = this.#owner.contentWidth - this.width - right - padding.right - margin.right);
        return left;
    }
    //#endregion contentLeft
    //#region left
    get left() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        let left = htmlElement.offsetLeft > 0 ? htmlElement.offsetLeft : parseInt(getComputedStyle(this.HTMLElement).left, 10);
        const margin = this.margin;
        const padding = this.padding;
        const right = this.right;
        //#endregion Variables déclaration
        right != null
            && (left = this.#owner.contentWidth - this.width - right - padding.right - margin.right);
        return this.#left !== left && left > 0 ? left: this.#left;
    }
    set left(newValue) {
        //#region Variables déclaration
        const cStyle = getComputedStyle(this.HTMLElement);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && cStyle.position === 'absolute') {
            const lastLeft = core.isHTMLRenderer ? this.#HTMLElement.offsetLeft : this.#left;
            if (lastLeft !== newValue && !this.#loading) {
                this.propertyChanged('left');
                core.isHTMLRenderer
                    ? this.#HTMLElementStyle.left = `${newValue}${core.types.CSSUNITS.PX}`
                    : this.#left = newValue;
            }
        }
    }
    //#endregion left
    //#region contentTop
    get contentTop() {
        //#region Variables déclaration
        const top = this.#top;
        const margin = this.margin;
        const padding = this.padding;
        //#endregion Variables déclaration
        return top + margin.top + padding.top;
    }
    //#endregion contentTop
    //#region top
    get top() {
        //#region Variables déclaration
        let top = this.#top;
        const bottom = this.bottom;
        //#endregion Variables déclaration
        bottom != null
            && (this.#top = this.#owner.height - this.height - bottom - this.margin.bottom);
        return top;
    }
    set top(newValue) {
        //#region Variables déclaration
        const cStyle = getComputedStyle(this.HTMLElement);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && cStyle.position === 'absolute') {
            const lastTop = (core.isHTMLRenderer ? this.#HTMLElement.offsetTop : this.#top);
            if (lastTop !== newValue && !this.#loading) {
                this.propertyChanged('top');
                core.isHTMLRenderer
                    ? this.#HTMLElementStyle.top = `${newValue}${core.types.CSSUNITS.PX}`
                    : this.#top = newValue;
            }
        }
    }
    //#endregion top
    //#endregion Getter / Setters
    //#region Methods
    //#region moveTo
    moveTo(x, y) {
        //#region Variables déclaration
        const htmlElement = this.#HTMLElement;
        const htmlElementStyle = this.#HTMLElementStyle;
        const PX = core.types.CSSUNITS.PX;
        const cStyle = getComputedStyle(this.HTMLElement);
        //#endregion Variables déclaration
        if ((core.tools.isNumber(x) && core.tools.isNumber(y) || this instanceof core.classes.Control)
            && cStyle.position === 'absolute') {
            this.#left = x;
            this.#top = y;
            if (core.isHTMLRenderer && htmlElement && this.#inForm) {
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
        if (core.isHTMLRenderer) {
            return this.#HTMLElement.getBoundingClientRect();
        } else {
            const boundingClientRect = new Rect(this.#left + margin.left, this.#top + margin.top, 0, 0);
            this.#owners.forEach(owner => {
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
        let htmlElement = this.#HTMLElement;
        let owner = this.#owner;
        let owners = this.#owners;
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
        const htmlElement = this.#HTMLElement;
        const form = this.#form;
        //#endregion Variables déclaration
        this.#loading = !1;
        if (core.isHTMLRenderer && htmlElement) {
            const properties = htmlElement.querySelector(`[id='${this.#internalId}'] > properties:first-child`);
            properties && htmlElement.removeChild(properties);
        }
        if (this.hasOwnProperty('action')) {
            if (form[this.action]) {
                this.action = form[this.action];
            } else if (!String.isNullOrEmpty(this.action)) {
                const action = this.action;
                const app = this.#app;
                if (action.includes(".")) {
                    let data = action.split(".");
                    if (app[data.first]) {
                        app[data.first][data.last] && (this.action = data);
                    }
                }
            }
        }
        this.positioning();
        this.#components.forEach(comp => {
            comp.loaded && comp.loading && comp.loaded();
        });
    }
    //#endregion loaded
    //#region positioning
    positioning() {
        if (this.#form !== this && core.isHTMLRenderer && this.#HTMLElement) {
            const position = getComputedStyle(this.#HTMLElement).position;
            position === 'absolute' && this.moveTo(this.#left, this.#top);
        }
    }
    //#endregion positioning
    //#region insert
    insert(component) {
        //#region Variables déclaration
        const components = this.#components;
        const form = this.#form;
        const controls = form.controls;
        //#endregion Variables déclaration
        if (components.indexOf(component) === -1) {
            components.push(component);
            component.app = this.#app;
            component.owner = this;
            if (form !== component && component.inForm && controls.indexOf(component) === -1) {
                controls.push(component);
                if (!form[component.name]) {
                    form[component.name] = component;
                    Object.defineProperty(form, component.name, {
                        enumerable: !1
                    });
                }
            }
        }
    }
    //#endregion insert
    //#region remove
    remove(component) {
        //#region Variables déclaration
        const components = this.#components;
        const form = this.#form;
        const controls = form.controls;
        //#endregion Variables déclaration
        if (components.indexOf(component) > -1) {
            let idx = components.indexOf(component);
            idx > -1 && components.removeAt(idx);
            if (form[component.name]) {
                form[component.name] = null;
                delete form[component.name];
            }
            if (controls) {
                idx = controls.indexOf(component);
                idx > -1 && controls.removeAt(idx);
            }
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
        const components = this.#components;
        //#endregion Variables déclaration
        if (components.length === 0 || index >= components.length) {
            throw core.errMsg.LISTINDEXERROR.format(index);
        }
        return components[index];
    }
    //#endregion getComponent
    //#region beforeDestruction
    beforeDestruction() {
        !this.#destroying && this._destroying();
    }
    //#endregion beforeDestruction
    //#region destroyComponents
    destroyComponents() {
        //#region Variables déclaration
        let instance;
        //#endregion Variables déclaration
        const components = this.#components;
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
        const components = this.#components;
        //#endregion Variables déclaration
        if (!this.#destroying) {
            this.#destroying = !0;
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
        const components = this.#components;
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
    //#region updating
    _updating() {
        this.#updating = !0;
    }
    //#endregion updating
    //#region updated
    updated() {
        this.#updating = !1;
    }
    //#endregion updated
    //#region validateRename
    validateRename(component, curName, newName) {
        //#region Variables déclaration
        const owner = this.#owner;
        //#endregion Variables déclaration
        this.#designing && owner && !(owner instanceof core.classes.App)
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
        const internalId = this.#internalId;
        const htmlElement = this.#HTMLElement = document.getElementById(id);
        //#endregion Variables déclaration
        if (htmlElement) {
            this.#HTMLElementStyle = htmlElement.style;
            !htmlElement.jsObj && (htmlElement.jsObj = this);
            const data = htmlElement.name;
            data && (this.name = data);
        }
        !internalId || internalId !== id && (this.#internalId = id);
    }
    //#endregion getHTMLElement
    //#region getChilds
    getChilds() { }
    //#endregion getChilds
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
    //#endregion
}
Object.defineProperties(Component.prototype, {
    'visible': {
        enumerable: !0
    },
    'left': {
        enumerable: !0
    },
    'top': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.COMMON, Component);
//#endregion Component
export { Component };
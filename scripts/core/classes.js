//#region import
//import { ToolBar } from '/scripts/components/toolbars/toolbar.js';
//import { Component } from '/scripts/core/component.js';
//import { Window } from '/scripts/components/containers/window.js';
//#endregion import
//#region Classes
class Classes {
    //#region nameSpace
    static nameSpace(namespace) {
        core.classes[namespace] = {};
    }
    //#endregion nameSpace
    //#region register
    static register() {
        //#region Variables déclaration
        const category = arguments[0];
        //#endregion Variables déclaration
        if (core.tools.valueInSet(category, core.types.CATEGORIES) || core.tools.valueInSet(category, core.types.INTERNALCATEGORIES)) {
            !core.classes[category] ? core.classes.nameSpace(category) : 1;
            Array.from(arguments).forEach((arg, i) => {
                if (i > 0) {
                    const className = core.tools.getFuncName(arg);
                    core.classes[category][className] = arg;
                    core.classes[className] = arg;
                }
            });
        }
    }
    //#endregion register
    //#region registerTemplates
    static registerTemplates(arrayOfTemplate) {
        if (Array.isArray(arrayOfTemplate)) {
            arrayOfTemplate.forEach(tpl => {
                let className = tpl.Class;
                className = !core.tools.isString(className) ? core.tools.getFuncName(className) : className;
                core.templates[className] = tpl.template.replace(new RegExp('{className}', 'g'), className);
            });
        }
    }
    //#endregion registerTemplates
    //#region registerPropertiesInCategory
    static registerPropertiesInCategory(category, properties) {
        //#region Variables déclaration
        const propertiesCategories = core.types.PROPERTIESCATEGORIES;
        //#endregion Variables déclaration
        propertiesCategories[category] && Array.isArray(properties) ?
            properties.forEach(prop => {
                propertiesCategories[category].properties.push(prop);
            }) : propertiesCategories[category].properties.push(properties);
    }
    //#endregion registerPropertiesInCategory
    //#region getPropertyCategories
    static getPropertyCategories(prop) {
        //#region Variables déclaration
        const cat = [];
        const propertiesCategories = core.types.PROPERTIESCATEGORIES;
        const keys = Object.keys(propertiesCategories);
        //#endregion Variables déclaration
        keys.forEach(key => {
            propertiesCategories[key].properties.indexOf(prop) > -1 ? cat.push(propertiesCategories[key].properties) : 1;
        });
        cat.push(propertiesCategories.MISCELLANEOUS);
        return cat;
    }
    //#endregion getPropertyCategories
    //#region getTemplate
    static getTemplate(className) {
        return core.templates[className] ? core.templates[className] : String.EMPTY;
    }
    //#endregion getTemplate
    //#region createComponent
    /**
     *
     * @param {Object}      params
     * @param {Object}      params.class
     * @param {Object}      params.owner
     * @param {Object}      params.name
     * @param {Object}      params.props
     * @param {Object}      params.withTpl
     * @param {Object}      params.internalId
     */
    static createComponent(params) {
        //#region Variables déclaration
        let obj = null;
        const isHTMLRenderer = core.isHTMLRenderer;
        //#endregion Variables déclaration
        if (this.checkClassAndOwnerClass(params.class, params.owner)) {
            !params.name ? params.name = String.EMPTY : 1;
            if (params.name !== String.EMPTY) {
                params.props ? params.props.name = params.name : params.props = { name: params.name };
            }
            obj = new params.class(params.owner, params.props);
            if (obj instanceof core.classes.Component) {
                !core.tools.isBool(params.withTpl) && !params.withTpl ? params.withTpl = !0 : 1;
                !params.props ? params.props = {} : 1;
                !params.internalId ? obj.internalId = String.uniqueId() : obj.internalId = params.internalId;
                if (params.withTpl && isHTMLRenderer) {
                    const tpl = obj.template;
                    if (!params.props.parentHTML) {
                        params.owner.insertTemplate(tpl);
                    } else {
                        const container = document.createElement(core.types.HTMLELEMENTS.DIV);
                        container.innerHTML = tpl;
                        params.props.parentHTML.appendChild(container.firstElementChild);
                    }
                }
                if (!(obj instanceof core.classes.Window)) {
                    isHTMLRenderer ? obj.getHTMLElement(obj.internalId) : 1;
                    if (obj.HTMLElement) {
                        obj.getChilds(obj.HTMLElement);
                        //if (obj instanceof $j.classes.CaptionControl) obj.caption = obj.name;
                        //obj.updateFromHTML();
                        !obj.form.loading ? obj.loaded() : 1;
                    }
                } else {
                    obj.formCreated(obj.internalId);
                }
            }
        }
        return obj;
    }
    //#endregion createComponent
    //#region checkClassAndOwnerClass
    static checkClassAndOwnerClass(Class, owner) {
        //#region Variables déclaration
        let result = !0;
        //#endregion Variables déclaration
        if (core.classes.ToolBar) {
            ['ToolButtonSep', 'ToolButton', 'ToolButtonSepSplit'].indexOf(Class.name) > -1 && 
                !(owner instanceof core.classes.ToolBar) ? result = !1 : 1;
        }
        return result;
    }
    //#endregion checkClassAndOwnerClass
    //#region newCollection
    static newCollection(obj, owner, itemsClass, propName) {
        !propName ? propName = 'items' : 1;
        Object.defineProperty(obj, propName, {
            enumerable: !1,
            configurable: !0,
            value: []
        });
        obj[propName].convertToCollection(owner, itemsClass);
    }
    //#endregion newCollection
    //#region getClassName
    static getClassName(Class) {
        //if (Class.name !== undefined) return Class.name;
        //else return Class.toString().match(/^function\s*([^\s(]+)/)[1];
    }
    //#endregion getClassName
    //#region registerPropertyEditor
    static registerPropertyEditor(propertyType, editorPath) {
        !core.classes.propertiesEditors ? core.classes.propertiesEditors = {} : 1;
        core.classes.propertiesEditors[propertyType] = editorPath;
    }
    //#endregion registerPropertyEditor
    //#region registerCollectionEditor
    static registerCollectionEditor(collectionItemsClass, editorPath) {
        !core.classes.collectionsEditors ? core.classes.collectionsEditors = {} : 1;
        core.classes.collectionsEditors[this.getClassName(collectionItemsClass)] = editorPath;
    }
    //#endregion registerCollectionEditor
    //#region registerComponentEditor
    static registerComponentEditor(componentClass, editorPath) {
        !core.classes.componentsEditors ? core.classes.componentsEditors = {} : 1;
        core.classes.componentsEditors[this.getClassName(componentClass)] = editorPath;
    }
    //#endregion registerComponentEditor
}
core.classes = Classes;
//#endregion Classes
export { Classes };
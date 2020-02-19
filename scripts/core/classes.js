//#region import
import { Tools } from '/scripts/core/tools.js';
//import { ToolBar } from '/scripts/components/toolbars/toolbar.js';
//import { Component } from '/scripts/core/component.js';
//import { Window } from '/scripts/components/containers/window.js';
//#endregion import
//#region Classes
class Classes {
    //#region nameSpace
    static nameSpace(namespace) {
        Core.classes[namespace] = {};
    }
    //#endregion nameSpace
    //#region register
    static register() {
        //#region Variables déclaration
        const category = arguments[0];
        //#endregion Variables déclaration
        if (Tools.valueInSet(category, Types.CATEGORIES) || Tools.valueInSet(category, Types.INTERNALCATEGORIES)) {
            if (!Core.classes[category]) {
                Core.classes.nameSpace(category);
            }
            Array.from(arguments).forEach((arg, i) => {
                if (i > 0) {
                    const className = Tools.getFuncName(arg);
                    Core.classes[category][className] = arg;
                    Core.classes[className] = arg;
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
                className = !String.isNullOrEmpty(className) ? Tools.getFuncName(className) : className;
                Core.templates[className] = tpl.template.replace(new RegExp('{className}', 'g'), className);
            });
        }
    }
    //#endregion registerTemplates
    //#region registerPropertiesInCategory
    static registerPropertiesInCategory(category, properties) {
        //#region Variables déclaration
        const propertiesCategories = Types.PROPERTIESCATEGORIES;
        //#endregion Variables déclaration
        if (propertiesCategories[category]) {
            if (Array.isArray(properties)) {
                properties.forEach(prop => {
                    propertiesCategories[category].properties.push(prop);
                });
            } else {
                propertiesCategories[category].properties.push(properties);
            }
        }
    }
    //#endregion registerPropertiesInCategory
    //#region getPropertyCategories
    static getPropertyCategories(prop) {
        //#region Variables déclaration
        const cat = [];
        const propertiesCategories = Types.PROPERTIESCATEGORIES;
        const keys = Object.keys(propertiesCategories);
        //#endregion Variables déclaration
        keys.forEach(key => {
            if (propertiesCategories[key].indexOf(prop) > -1) {
                cat.push(propertiesCategories[key]);
            }
        });
        cat.push(propertiesCategories.MISCELLANEOUS);
        return cat;
    }
    //#endregion getPropertyCategories
    //#region getTemplate
    static getTemplate(className) {
        if (Core.templates[className]) {
            return Core.templates[className];
        } else {
            return String.EMPTY;
        }
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
        const isHTMLRenderer = Core.isHTMLRenderer;
        //#endregion Variables déclaration
        if (this.checkClassAndOwnerClass(params.class, params.owner)) {
            if (!params.name) {
                params.name = String.EMPTY;
            }
            if (params.name !== String.EMPTY) {
                if (params.props) {
                    params.props.name = params.name;
                } else {
                    params.props = { name: params.name };
                }
            }
            obj = new params.class(params.owner, params.props);
            if (obj instanceof Core.classes.Component) {
                if (!Tools.isBool(params.withTpl) && !params.withTpl) {
                    params.withTpl = true;
                }
                if (!params.props) {
                    params.props = {};
                }
                if (!params.internalId) {
                    obj.internalId = String.uniqueId();
                } else {
                    obj.internalId = params.internalId;
                }
                if (params.withTpl && isHTMLRenderer) {
                    const tpl = obj.template;
                    if (!params.props.parentHTML) {
                        params.owner.insertTemplate(tpl);
                    } else {
                        const container = document.createElement(Types.HTMLELEMENTS.DIV);
                        container.innerHTML = tpl;
                        params.props.parentHTML.appendChild(container.firstElementChild);
                    }
                }
                if (!(obj instanceof Core.classes.Window)) {
                    if (isHTMLRenderer) {
                        obj.getHTMLElement(obj.internalId);
                    }
                    if (obj.HTMLElement) {
                        obj.getChilds(obj.HTMLElement);
                        //if (obj instanceof $j.classes.CaptionControl) obj.caption = obj.name;
                        //obj.updateFromHTML();
                        if (!obj.form.loading) {
                            obj.loaded();
                        }
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
        let result = true;
        //#endregion Variables déclaration
        if (Core.classes.ToolBar) {
            if (['ToolButtonSep', 'ToolButton', 'ToolButtonSepSplit'].indexOf(Class.name)>-1 && !(owner instanceof Core.classes.ToolBar)) {
                result = false;
            }
        }
        return result;
    }
    //#endregion checkClassAndOwnerClass
    //#region newCollection
    static newCollection(obj, owner, itemsClass, propName) {
        if (!propName) {
            propName = 'items';
        }
        //obj[propName] = [];
        //obj[propName].convertToCollection(owner, itemsClass);
        Object.defineProperty(obj, propName, {
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
        if (!Core.classes.propertiesEditors) {
            Core.classes.propertiesEditors = {};
        }
        Core.classes.propertiesEditors[propertyType] = editorPath;
    }
    //#endregion registerPropertyEditor
    //#region registerCollectionEditor
    static registerCollectionEditor(collectionItemsClass, editorPath) {
        if (!Core.classes.collectionsEditors) {
            Core.classes.collectionsEditors = {};
        }
        Core.classes.collectionsEditors[this.getClassName(collectionItemsClass)] = editorPath;
    }
    //#endregion registerCollectionEditor
    //#region registerComponentEditor
    static registerComponentEditor(componentClass, editorPath) {
        if (!Core.classes.componentsEditors) {
            Core.classes.componentsEditors = {};
        }
        Core.classes.componentsEditors[this.getClassName(componentClass)] = editorPath;
    }
    //#endregion registerComponentEditor
}
//#endregion Classes
Core.classes = Classes;
export { Classes };
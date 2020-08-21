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
            !core.classes[category] && core.classes.nameSpace(category);
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
        Array.isArray(arrayOfTemplate)
            && arrayOfTemplate.forEach(tpl => {
                let className = tpl.Class;
                className = !core.tools.isString(className) ? core.tools.getFuncName(className) : className;
                core.templates[className] = tpl.template.replace(new RegExp('{className}', 'g'), className);
            });
    }
    //#endregion registerTemplates
    //#region registerPropertiesInCategory
    static registerPropertiesInCategory(category, properties) {
        //#region Variables déclaration
        const propertiesCategories = core.types.PROPERTIESCATEGORIES;
        //#endregion Variables déclaration
        propertiesCategories[category] && Array.isArray(properties)
            ? properties.forEach(prop => {
                propertiesCategories[category].properties.push(prop);
            })
            : propertiesCategories[category].properties.push(properties);
    }
    //#endregion registerPropertiesInCategory
    //#region getPropertyCategories
    static getPropertyCategories(prop) {
        //#region Variables déclaration
        let cat = [];
        const propertiesCategories = core.types.PROPERTIESCATEGORIES;
        const keys = Object.keys(propertiesCategories);
        //#endregion Variables déclaration
        keys.forEach(key => {
            propertiesCategories[key].properties.indexOf(prop) > -1 && (cat = [...cat, propertiesCategories[key]]);
        });
        cat = [...cat, propertiesCategories.MISCELLANEOUS];
        return cat;
    }
    //#endregion getPropertyCategories
    //#region getTemplate
    static getTemplate(className) {
        let template = core.templates[className] ? core.templates[className] : String.EMPTY;
        while (template.includes('{internalId}')) {
            template = template.replace('{internalId}', String.uniqueId());
        }
        return template;
        //return core.templates[className] ? core.templates[className] : String.EMPTY;
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
            params.name = params.name || String.EMPTY;
            !params.props && (params.props = {});
            params.props.name = params.name;
            obj = new params.class(params.owner, params.props);
            if (obj instanceof core.classes.Component) {
                !core.tools.isBool(params.withTpl) && !params.withTpl && (params.withTpl = !0);
                params.props = params.props || {};
                obj.internalId = !params.internalId ? String.uniqueId() : params.internalId;
                if (params.withTpl && isHTMLRenderer) {
                    const tpl = obj.template;
                    if (!params.props.parentHTML) {
                        params.owner.insertTemplate(tpl);
                        obj.internalId = params.owner.HTMLElement.lastElementChild.id;
                    } else {
                        const container = document.createElement(core.types.HTMLELEMENTS.DIV);
                        container.innerHTML = tpl;
                        obj.internalId = container.firstElementChild.id;
                        params.props.parentHTML.appendChild(container.firstElementChild);
                    }
                }
                if (!(obj instanceof core.classes.Window)) {
                    isHTMLRenderer && obj.getHTMLElement(obj.internalId);
                    if (obj.HTMLElement) {
                        obj.getChilds(obj.HTMLElement);
                        //if (obj instanceof $j.classes.CaptionControl) obj.caption = obj.name;
                        //obj.updateFromHTML();
                        !obj.form.loading && obj.loaded();
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
        return core.classes.ToolBar &&
            ['ToolButtonSep', 'ToolButton', 'ToolButtonSepSplit'].indexOf(Class.name) > -1
            && !(owner instanceof core.classes.ToolBar)
            ? !1 : !0;
    }
    //#endregion checkClassAndOwnerClass
    //#region newCollection
    static newCollection(obj, owner, itemsClass, propName = 'items') {
        if (!Array.isArray(propName)) {
            obj[propName] = [];
            obj[propName].convertToCollection(owner, itemsClass);
        } else {
            propName.convertToCollection(owner, itemsClass);
        }
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
        !core.classes.propertiesEditors && (core.classes.propertiesEditors = {});
        core.classes.propertiesEditors[propertyType] = editorPath;
    }
    //#endregion registerPropertyEditor
    //#region registerCollectionEditor
    static registerCollectionEditor(collectionItemsClass, editorPath) {
        !core.classes.collectionsEditors && (core.classes.collectionsEditors = {});
        core.classes.collectionsEditors[this.getClassName(collectionItemsClass)] = editorPath;
    }
    //#endregion registerCollectionEditor
    //#region registerComponentEditor
    static registerComponentEditor(componentClass, editorPath) {
        !core.classes.componentsEditors && (core.classes.componentsEditors = {});
        core.classes.componentsEditors[this.getClassName(componentClass)] = editorPath;
    }
    //#endregion registerComponentEditor
}
core.classes = Classes;
//#endregion Classes
export { Classes };
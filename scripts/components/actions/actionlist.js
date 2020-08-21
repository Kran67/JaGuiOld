//#region Imports
import { Component } from '/scripts/core/component.js';
import { Action } from '/scripts/components/actions/action.js';
//#endregion
//#region Action
class ActionList extends Component {
    //#region Private fields
    #actions = [];
    #imageList = null;
    //#endregion Private fields
    /**
     * Create a new instance of Action.
     * @param    {object}    owner  Owner of the Action.
     * @param    {object}    props  Properties to initialize the Action.
     */
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#actions.convertToCollection(owner, Action);
            this.createEventsAndBind(['onChange', 'onExecute', 'onUpdate'], props);
            props.actions && props.actions.length > 0 && props.actions.forEach(actionProps =>  {
                //#region Variables déclaration
                const form = this.form;
                let act = new core.classes[actionProps.class](this, actionProps);
                //#endregion Variables déclaration
                form[actionProps.name] = act;
                Object.defineProperty(form, actionProps.name, {
                    enumerable: !1
                });
                this.#actions.push(act);
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region imageList
    get imageList() {
        return this.#imageList;
    }
    set imageList(newValue) {
        if (newValue instanceof core.classes.ImageList && this.#imageList !== newValue) {
            this.#imageList = newValue;
            this.updateActions();
        }
    }
    //#endregion imageList
    //#endregion Getters / Setters
    //#region Methods
    //#region changeAction
    changeAction(index, newValue) {
        if (index > 0 && index < this.#actions.length - 1 && newValue instanceof Action && this.#actions[index]) {
            this.#actions[index].destroy();
            this.#actions[index] = newValue;
        }
    }
    //#endregion changeAction
    //#region getAction
    getAction(index) {
        if (index > 0 && index < this.#actions.length - 1) {
            return this.#actions[index];
        }
    }
    //#endregion getAction
    //#region getAction
    addAction(action) {
        action instanceof Action && this.#actions.indexOf(action) === -1 && this.#actions.push(action);
    }
    //#endregion getAction
    //#region removeAction
    removeAction(action) {
        action instanceof Action && this.#actions.indexOf(action) > -1 && this.#actions.remove(action);
    }
    //#endregion removeAction
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const form = this.form;
        let imageList = this.props.imageList;
        let actions = this.#actions;
        //#endregion Variables déclaration
        super.loaded();
        if (imageList) {
            if (form[imageList]) {
                this.#imageList = form[datas];
            } else if (core.tools.isString(imageList)) {
                if (imageList.contains('.')) {
                    imageList = imageList.split('.');
                    if (this.app[imageList.first]) {
                        imageList = this.app[imageList.first][imageList.last];
                        imageList && (this.#imageList = imageList);
                    }
                }
            }
        }
        actions.forEach(action => {
            action.loaded();
        });
    }
    //#endregion loaded
    //#region executeAction
    executeAction(action) {
        action instanceof Action && action.execute();
    }
    //#endregion executeAction
    //#region destroy
    destroy() {
        while (this.#actions.length > 0) {
            const act = this.#actions.pop();
            act.destroy();
        }
        this.#imageList.destroy();
        this.#imageList = null;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(ActionList);
Object.defineProperties(ActionList.prototype, {
    'imageList': {
        enumerable: !0
    }
});
//#endregion Action
core.classes.register(core.types.CATEGORIES.COMMON, ActionList);
//#region Templates
if (core.isHTMLRenderer) {
    const ActionListTpl = '<jagui-actionlist id="{internalId}" data-class="ActionList" class="Control ShortCutIcon ActionList"><properties>{ "name": "{name}" }</properties></jagui-actionlist>';
    core.classes.registerTemplates([{ Class: ActionList, template: ActionListTpl }]);
}
//#endregion
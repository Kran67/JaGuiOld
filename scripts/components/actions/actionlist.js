//#region Imports
import { Component } from '/scripts/core/component.js';
import { Action } from '/scripts/components/actions/action.js';
//#endregion
//#region Action
class ActionList extends Component {
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
            const priv = core.private(this, {
                imageList: null
            });
            core.classes.newCollection(this, this, Action, "actions");
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
                priv.actions.push(act);
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region imageList
    get imageList() {
        return core.private(this).imageList;
    }
    set imageList(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.ImageList && priv.imageList !== newValue) {
            priv.imageList = newValue;
            this.updateActions();
        }
    }
    //#endregion imageList
    //#endregion Getters / Setters
    //#region Methods
    //#region changeAction
    changeAction(index, newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (index > 0 && index < priv.actions.length - 1 && newValue instanceof Action && priv.actions[index]) {
            priv.actions[index].destroy();
            priv.actions[index] = newValue;
        }
    }
    //#endregion changeAction
    //#region getAction
    getAction(index) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (index > 0 && index < priv.actions.length - 1) {
            return priv.actions[index];
        }
    }
    //#endregion getAction
    //#region getAction
    addAction(action) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        action instanceof Action && priv.actions.indexOf(action) === -1 && priv.actions.push(action);
    }
    //#endregion getAction
    //#region removeAction
    removeAction(action) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        action instanceof Action && priv.actions.indexOf(action) > -1 && priv.actions.remove(action);
    }
    //#endregion removeAction
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const form = this.form;
        let imageList = priv.props.imageList;
        let actions = priv.props.actions;
        //#endregion Variables déclaration
        super.loaded();
        if (imageList) {
            if (form[imageList]) {
                priv.imageList = form[datas];
            } else if (core.tools.isString(imageList)) {
                if (imageList.contains('.')) {
                    imageList = imageList.split('.');
                    if (this.app[imageList.first]) {
                        imageList = this.app[imageList.first][imageList.last];
                        imageList && (priv.imageList = imageList);
                    }
                }
            }
        }
    }
    //#endregion loaded
    //#region executeAction
    executeAction(action) {
        action instanceof Action && action.execute();
    }
    //#endregion executeAction
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        while (priv.actions.length > 0) {
            const act = priv.actions.pop();
            act.destroy();
        }
        priv.imageList.destroy();
        priv.imageList = null;
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
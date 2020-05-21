//#region Import
import { Component } from '/scripts/core/component.js';
//#endregion Import
//#region Class CommonDialog
class CommonDialog extends Component {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.createEventsAndBind(['onClose', 'onShow'], props);
        }
    }
    //#endregion constructor
    //#region Methods
    //#region destroy
    destroy() {
        this.unBindAndDestroyEvents(['onClose', 'onShow']);
        super.destroy();
    }
    //#endregion destroy
    //#region execute
    execute() {
        this.onShow.invoke();
    }
    //#endregion execute
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, CommonDialog);
//#endregion Class CommonDialog
export { CommonDialog };
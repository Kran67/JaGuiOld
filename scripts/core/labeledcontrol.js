//#region Imports
import { FlexLayout } from '/scripts/components/containers/flexlayout.js';
//#endregion Imports
//#region LabeledControl
class LabeledControl extends FlexLayout {
    //#region Private fields
    #label;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.width = props.hasOwnProperty('width') && core.tools.isNumber(props.width) ? props.width : 200;
            props.height = props.hasOwnProperty('height') && core.tools.isNumber(props.height) ? props.height : 22;
            props.alignItems = core.types.ALIGNITEMS.STRETCH;
            super(owner, props);
            this.createEventsAndBind(['onChange'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region height
    get height() {
        return super.height;
    }
    set height(newValue) {
        if (core.tools.isNumber(newValue) && super.height !== newValue) {
            super.height = newValue;
            this.update();
        }
    }
    //#endregion height
    //#endregion Getters / Setters
    //#region Methods
    //#region destroy
    destroy() {
        this.unBindAndDestroyEvents(['onChange']);
        this.#label.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        super.loaded();
        this.#label = core.classes.createComponent({
            class: core.classes.Label,
            owner: this,
            name: `${this.name}.label`,
            props: {
                ...this.props.label,
                inForm: !1,
                mouseEvents: { mousedown: !0 },
                onMouseDown: function () {
                    const components = this.owner.components.filter(comp => { return comp.canFocused; });
                    components.length > 0 && components.first.setFocus();
                },
                margin: { right: 5 }
            }
        });
    }
    //#endregion loaded
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabeledControl);
//#endregion LabeledControl
export { LabeledControl };
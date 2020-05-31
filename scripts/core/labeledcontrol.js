//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#endregion Imports
//#region LabeledControl
class LabeledControl extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.width = props.hasOwnProperty('width') && core.tools.isNumber(props.width) ? props.width : 200;
            props.height = props.hasOwnProperty('height') && core.tools.isNumber(props.height) ? props.height : 20;
            super(owner, props);
            this.createEventsAndBind(['onChange'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region caption
    get caption() {
        return core.private(this).caption;
    }
    set caption(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = 'caption';
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.label[propName] !== newValue) {
            priv.label[propName] = newValue;
        }
    }
    //#endregion caption
    //#region height
    get height() {
        return super.height;
    }
    set height(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = 'height';
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv[propName] !== newValue) {
            super[propName] = newValue;
            this.update();
        }
    }
    //#endregion height
    //#endregion Getters / Setters
    //#region Methods
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.unBindAndDestroyEvents(['onChange']);
        priv.label.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
        //#endregion Variables déclaration
        super.loaded();
        core.private(this, {
            label: core.classes.createComponent({
                class: core.classes.Label,
                owner: this,
                props: {
                    inForm: !1,
                    caption: props.hasOwnProperty('caption') ? props.caption : this.name,
                    hitTest: { mouseDown: !0 },
                    onMouseDown: function () {
                        const components = this.owner.components.filter(comp => { return comp.canFocused; });
                        components.length > 0 && components.first.setFocus();
                    }
                }
            })
        });
    }
    //#endregion loaded
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.label && (priv.label.HTMLElementStyle.lineHeight = `${this.height}${core.types.CSSUNITS.PX}`);
    }
    //#endregion update
    //#endregion
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabeledControl);
//#endregion LabeledControl
export { LabeledControl };
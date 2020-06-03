//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#endregion Imports
//#region LABELPOSITIONS
/**
 * @type    {Object}        LABELPOSITIONS
 */
const LABELPOSITIONS = Object.freeze(Object.seal({
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom'
}));
//#endregion LABELPOSITIONS
//#region LabeledControl
class LabeledControl extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.width = props.hasOwnProperty('width') && core.tools.isNumber(props.width) ? props.width : 200;
            props.height = props.hasOwnProperty('height') && core.tools.isNumber(props.height) ? props.height : 20;
            super(owner, props);
            core.private(this, {
                labelPosition: props.hasOwnProperty('labelPosition') 
                    && core.tools.valueInSet(props.labelPosition, LABELPOSITIONS) ? props.labelPosition : String.EMPTY
            });
            this.createEventsAndBind(['onChange'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region static
    //#region LABELPOSITIONS
    /**
     * @type    {Object}        LABELPOSITIONS
     */
    static get LABELPOSITIONS() {
        return LABELPOSITIONS;
    }
    //#endregion static
    //#region labelPosition
    get labelPosition() {
        return core.private(this).labelPosition;
    }
    set labelPosition(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, LABELPOSITIONS) && priv.labelPosition !== newValue) {
            priv.labelPosition = newValue;
            this.update();
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
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.height !== newValue) {
            super.height = newValue;
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        core.private(this, {
            label: core.classes.createComponent({
                class: core.classes.Label,
                owner: this,
                props: {
                    ...priv.props.label,
                    inForm: !1,
                    mouseEvents: { mousedown: !0 },
                    onMouseDown: function () {
                        const components = this.owner.components.filter(comp => { return comp.canFocused; });
                        components.length > 0 && components.first.setFocus();
                    }
                }
            })
        });
        this.update();
    }
    //#endregion loaded
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        //priv.label && (priv.label.HTMLElementStyle.lineHeight = `${this.height}${core.types.CSSUNITS.PX}`);
        Object.keys(LABELPOSITIONS).forEach(key => {
            htmlElement.classList.remove(`label${LABELPOSITIONS[key].firstCharUpper}`);
        });
        !String.isNullOrEmpty(priv.labelPosition) && htmlElement.classList.add(`label${priv.labelPosition.firstCharUpper}`);
    }
    //#endregion update
    //#endregion
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabeledControl);
//#endregion LabeledControl
export { LabeledControl };
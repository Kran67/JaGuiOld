//#region Import
import { Layout } from '/scripts/components/containers/layout.js';
//#endregion Import
//#region JUSTIFYCONTENT
const JUSTIFYCONTENT = Object.freeze(Object.seal({
    CENTER: 'center',
    START: 'start',
    END: 'end',
    FLEXSTART: 'flex-start',
    FLEXEND: 'flex-end',
    LEFT: 'left',
    RIGHT: 'right',
    NORMAL: 'normal',
    SPACEBETWEEN: 'space-between',
    SPACEAROUND: 'space-around',
    SPACEEVENLY: 'space-evenly',
    STRETCH: 'stretch',
    SAFECENTER: 'safe center',
    UNSAFECENTER: 'unsafe center'
}));
//#endregion JUSTIFYCONTENT
//#region ALIGNITEMS
const ALIGNITEMS = Object.freeze(Object.seal({
    CENTER: 'center',
    START: 'start',
    END: 'end',
    FLEXSTART: 'flex-start',
    FLEXEND: 'flex-end',
    NORMAL: 'normal',
    STRETCH: 'stretch',
    SAFECENTER: 'safe center',
    UNSAFECENTER: 'unsafe center',
    SELFSTART: 'self-start',
    SELFEND: 'self-end',
    FIRST: 'first',
    FIRSTBASELINE: 'first baseline',
    LASTBASELINE: 'last baseline'
}));
//#endregion ALIGNITEMS
//#region Class FlexLayout
class FlexLayout extends Layout {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'justifyContent',
                enum: JUSTIFYCONTENT,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    const justifyContent = priv.justifyContent;
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, JUSTIFYCONTENT) && justifyContent !== newValue) {
                        priv.justifyContent = newValue;
                        isHtmlRenderer && this.update();
                    }
                },
                value: props.justifyContent ? props.justifyContent : JUSTIFYCONTENT.FLEXSTART
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'alignItems',
                enum: ALIGNITEMS,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    const alignItems = priv.alignItems;
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, ALIGNITEMS) && alignItems !== newValue) {
                        priv.alignItems = newValue;
                        isHtmlRenderer && this.update();
                    }
                },
                value: props.alignItems ? props.alignItems : ALIGNITEMS.FLEXSTART
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region JUSTIFYCONTENT
    static get JUSTIFYCONTENT() {
        return JUSTIFYCONTENT;
    }
    //#endregion JUSTIFYCONTENT
    //#region ALIGNITEMS
    static get ALIGNITEMS() {
        return ALIGNITEMS;
    }
    //#endregion ALIGNITEMS
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        htmlElementStyle.justifyContent = priv.justifyContent;
        htmlElementStyle.alignItems = priv.alignItems;
    }
    //#endregion update
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.justifyContent = null;
        priv.alignItems = null;
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        super.loaded();
        this.update();
    }
    //#endregion loaded
    //#endregion Methods
}
Object.seal(FlexLayout);
core.classes.register(core.types.CATEGORIES.CONTAINERS, FlexLayout);
//#endregion FlexLayout
//#region Templates
if (core.isHTMLRenderer) {
    const FlexLayoutTpl = ['<jagui-flexlayout id="{internalId}" data-class="FlexLayout" class="Control FlexLayout"><properties>',
        '{ "name": "{name}" }</properties></jagui-flexlayout>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: FlexLayout, template: FlexLayoutTpl }]);
}
//#endregion
export { FlexLayout };
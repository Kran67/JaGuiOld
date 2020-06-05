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
//#region FLEXDIRECTIONS
const FLEXDIRECTIONS = Object.freeze(Object.seal({
    COLUMN: 'column',
    ROW: 'row',
    COLUMNREVERSE: 'column-reverse',
    ROWREVERSE: 'row-reverse'
}));
//#endregion FLEXDIRECTIONS
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
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'flexDirection',
                enum: FLEXDIRECTIONS,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    const flexDirection = priv.flexDirection;
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, FLEXDIRECTIONS) && flexDirection !== newValue) {
                        priv.flexDirection = newValue;
                        isHtmlRenderer && this.update();
                    }
                },
                value: props.flexDirection ? props.flexDirection : FLEXDIRECTIONS.ROW
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
        htmlElementStyle.flexDirection = priv.flexDirection;
    }
    //#endregion update
    //#region loaded
    loaded() {
        super.loaded();
        this.HTMLElement.classList.add('FlexLayout');
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
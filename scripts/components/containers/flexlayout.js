//#region Import
import { Layout } from '/scripts/components/containers/layout.js';
//#endregion Import
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
                enum: core.types.JUSTIFYCONTENT,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    const justifyContent = priv.justifyContent;
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, core.types.JUSTIFYCONTENT) && justifyContent !== newValue) {
                        priv.justifyContent = newValue;
                        isHtmlRenderer && this.update();
                    }
                },
                value: props.justifyContent ? props.justifyContent : core.types.JUSTIFYCONTENT.FLEXSTART
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'alignItems',
                enum: core.types.ALIGNITEMS,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    const alignItems = priv.alignItems;
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, core.types.ALIGNITEMS) && alignItems !== newValue) {
                        priv.alignItems = newValue;
                        isHtmlRenderer && this.update();
                    }
                },
                value: props.alignItems ? props.alignItems : core.types.ALIGNITEMS.FLEXSTART
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'flexDirection',
                enum: core.types.FLEXDIRECTIONS,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    const flexDirection = priv.flexDirection;
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, core.types.FLEXDIRECTIONS) && flexDirection !== newValue) {
                        priv.flexDirection = newValue;
                        isHtmlRenderer && this.update();
                    }
                },
                value: props.flexDirection ? props.flexDirection : core.types.FLEXDIRECTIONS.ROW
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
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
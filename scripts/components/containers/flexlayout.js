//#region Import
import { Layout } from '/scripts/components/containers/layout.js';
//#endregion Import
//#region Class FlexLayout
class FlexLayout extends Layout {
    //#region Private fields
    #justifyContent;
    #alignItems;
    #flexDirection;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.addPropertyEnum('justifyContent', core.types.JUSTIFYCONTENT);
            this.#justifyContent = props.justifyContent ? props.justifyContent : core.types.JUSTIFYCONTENT.FLEXSTART;
            this.addPropertyEnum('alignItems', core.types.ALIGNITEMS);
            this.#alignItems = props.alignItems ? props.alignItems : core.types.ALIGNITEMS.FLEXSTART;
            this.addPropertyEnum('flexDirection', core.types.FLEXDIRECTIONS);
            this.#flexDirection = props.flexDirection ? props.flexDirection : core.types.FLEXDIRECTIONS.ROW;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region flexDirection
    get flexDirection() {
        return this.#flexDirection;
    }
    set flexDirection(newValue) {
        //#region Variables déclaration
        const flexDirection = this.#flexDirection;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.FLEXDIRECTIONS) && flexDirection !== newValue) {
            this.#flexDirection = newValue;
            isHtmlRenderer && this.update();
        }
    }
    //#endregion flexDirection
    //#region alignItems
    get alignItems() {
        return this.#alignItems;
    }
    set alignItems(newValue) {
        //#region Variables déclaration
        const alignItems = this.#alignItems;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.ALIGNITEMS) && alignItems !== newValue) {
            this.#alignItems = newValue;
            isHtmlRenderer && this.update();
        }
    }
    //#endregion alignItems
    //#region justifyContent
    get justifyContent() {
        return this.#justifyContent;
    }
    set justifyContent(newValue) {
        //#region Variables déclaration
        const justifyContent = this.#justifyContent;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.JUSTIFYCONTENT) && justifyContent !== newValue) {
            this.#justifyContent = newValue;
            isHtmlRenderer && this.update();
        }
    }
    //#endregion justifyContent
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        htmlElementStyle.justifyContent = this.#justifyContent;
        htmlElementStyle.alignItems = this.#alignItems;
        htmlElementStyle.flexDirection = this.#flexDirection;
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
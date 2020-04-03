//#region Import
import { Layout } from '/scripts/components/containers/layout.js';
import { Tools } from '/scripts/core/tools.js';
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
//#region FlexLayout
const FlexLayout = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class FlexLayout
    class FlexLayout extends Layout {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'justifyContent',
                    enum: JUSTIFYCONTENT,
                    setter: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const justifyContent = priv.justifyContent;
                        //#endregion Variables déclaration
                        if (Tools.valueInSet(newValue, JUSTIFYCONTENT)) {
                            if (justifyContent !== newValue) {
                                priv.justifyContent = newValue;
                                if (isHtmlRenderer) {
                                    this.update();
                                }
                            }
                        }
                    },
                    variable: priv,
                    value: props.justifyContent ? props.justifyContent : JUSTIFYCONTENT.FLEXSTART
                });

                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'alignItems',
                    enum: ALIGNITEMS,
                    setter: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const alignItems = priv.alignItems;
                        //#endregion Variables déclaration
                        if (Tools.valueInSet(newValue, ALIGNITEMS)) {
                            if (alignItems !== newValue) {
                                priv.alignItems = newValue;
                                if (isHtmlRenderer) {
                                    this.update();
                                }
                            }
                        }
                    },
                    variable: priv,
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
            const priv = internal(this);
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            htmlElementStyle.justifyContent = priv.justifyContent;
            htmlElementStyle.alignItems = priv.alignItems;
        }
        //#endregion update
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.justifyContent = null;
            priv.alignItems = null;
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
    return FlexLayout;
    //#endregion FlexLayout
})();
Object.seal(FlexLayout);
//#endregion FlexLayout
Core.classes.register(Types.CATEGORIES.CONTAINERS, FlexLayout);
export { FlexLayout };
//#region Templates
if (Core.isHTMLRenderer) {
    const FlexLayoutTpl = ['<jagui-flexlayout id="{internalId}" data-class="FlexLayout" class="Control FlexLayout"><properties>',
        '{ "name": "{name}" }</properties></jagui-flexlayout>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: FlexLayout, template: FlexLayoutTpl }]);
}
//#endregion
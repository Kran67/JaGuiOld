﻿//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#endregion Imports
//#region LabeledControl
const LabeledControl = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
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
            return internal(this).label.caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isString(newValue) && priv.label.caption !== newValue) {
                priv.label.caption = newValue;
                priv.label.caption = priv.caption;
            }
        }
        //#endregion caption
        //#region height
        get height() {
            return super.height;
        }
        set height(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
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
            const priv = internal(this);
            //#endregion Variables déclaration
            this.unBindAndDestroyEvents(['onChange']);
            priv.label.destroy();
            priv.label = null;
            super.destroy();
        }
        //#endregion destroy
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
            //#endregion Variables déclaration
            super.loaded();
            priv.label = core.classes.createComponent({
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
            });
        }
        //#endregion loaded
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.label && (priv.label.HTMLElementStyle.lineHeight = `${this.height}${core.types.CSSUNITS.PX}`);
        }
        //#endregion update
        //#endregion
    }
    return LabeledControl;
    //#endregion LabeledControl
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, LabeledControl);
//#endregion LabeledControl
export { LabeledControl };
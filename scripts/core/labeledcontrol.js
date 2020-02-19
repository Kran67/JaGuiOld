//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Imports
//#region LabeledControl
const LabeledControl = (() => {
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
    //#region LabeledControl
    class LabeledControl extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                this.onChange = new Core.classes.NotifyEvent(this);
                this.width = 200;
                this.height = 20;
            }
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region caption
        get caption() {
            return internal(this).label.caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.label.caption !== newValue) {
                    priv.label.caption = newValue;
                    priv.label.caption = priv.caption;
                }
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
            if (Tools.isNumber(newValue)) {
                if (priv.height !== newValue) {
                    super.height = newValue;
                    this.update();
                }
            }
        }
        //#endregion height
        //#endregion Getter / Setter
        //#region Methods
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.onChange.destroy();
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
            priv.label = Core.classes.createComponent({
                class: Core.classes.Label,
                owner: this,
                props: {
                    inForm: false,
                    caption: props.hasOwnProperty('caption')?props.caption:this.name
                },
                withTpl: true
            });
        }
        //#endregion loaded
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.label) {
                priv.label.HTMLElementStyle.lineHeight = `${this.height}${Types.CSSUNITS.PX}`;
            }
        }
        //#endregion update
        //#endregion
    }
    return LabeledControl;
    //#endregion LabeledControl
})();
//#region BaseWindow defineProperties
Object.defineProperties(LabeledControl, {
    'label': {
        enumerable: true
    }
});
//#endregion BaseWindow defineProperties
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, LabeledControl);
export { LabeledControl };
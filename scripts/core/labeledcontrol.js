//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Tools } from '/scripts/core/tools.js';
//import { Classes } from "/scripts/core/classes.js";
//import { NotifyEvent } from "/scripts/core/events.js";
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
                priv.label = Core.classes.createComponent({
                    class: Core.classes.Label,
                    owner: this,
                    props: {
                        inForm: false
                    },
                    withTpl: false
                });

                this.onChange = new Core.classes.NotifyEvent(this);
                this.width = 200;
                this.height = 20;
            }
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region label
        get label() {
            return internal(this).label;
        }
        //#endregion label
        //#region caption
        get caption() {
            return internal(this).label.caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.caption !== newValue) {
                    priv.caption = newValue;
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
                    if (priv.label) {
                        priv.label.HTMLElementStyle.lineHeight = `${this.height}${Types.CSSUNITS.PX}`;
                    }
                }
            }
        }
        //#endregion height
        //#region template
        get template() {
            //#region Variables déclaration
            const priv = internal(this);
            let html = super.template;
            const a = html.split('{label}');
            const tpl = priv.label.template;
            //#endregion Variables déclaration
            html = a.join(tpl);
            return html;
        }
        //#endregion template
        //#endregion Getter / Setter
        //#region Methods
        //#region destroy
        destroy() {
            this.onChange.destroy();
            this.label.destroy();
            super.destroy();
        }
        //#endregion destroy
        //#region getChildsHTMLElement
        getChildsHTMLElement() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (htmlElement) {
                priv.label.getHTMLElement(htmlElement.firstElementChild.id);
            }
        }
        //#endregion getChildsHTMLElement
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
        //getChildsHTMLElement:function() {
        //  let nextId;
        //  this._label=new Label(this);
        //  this._label.getHTMLElement(this.HTMLElement.firstElementChild.id);
        //  this._label.updateFromHTML();
        //}
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
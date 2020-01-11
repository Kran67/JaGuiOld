import { ThemedControl } from "/scripts/core/themedcontrol.js";
//import { Classes } from "/scripts/core/classes.js";
//import { NotifyEvent } from "/scripts/core/events.js";
//#region LabeledControl
const LabeledControl = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class LabeledControl extends ThemedControl {
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
        get label() {
            return internal(this).label;
        }
        get caption() {
            return internal(this).label.caption;
        }
        set caption(newValue) {
            const label = this.label;
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (label.caption !== newValue) {
                    label.caption = newValue;
                }
            }
        }
        get height() {
            return super.height;
        }
        set height(newValue) {
            const priv = internal(this);
            const label = this.label;
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.height !== newValue) {
                    super.height = newValue;
                    if (label) {
                        label.HTMLElementStyle.lineHeight = `${priv.height}${Types.CSSUNITS.PX}`;
                    }
                }
            }
        }
        //#region Methods
        destroy() {
            this.onChange.destroy();
            this.label.destroy();
            super.destroy();
        }
        get template() {
            let html = super.template;
            const a = html.split("{label}");
            const tpl = this.label.template;
            html = a.join(tpl);
            return html;
        }
        getChildsHTMLElement() {
            const htmlElement = this.HTMLElement;
            if (htmlElement) {
                this.label.getHTMLElement(htmlElement.firstElementChild.id);
            }
        }
        update() {
            const label = this.label;
            if (label) {
                label.HTMLElementStyle.lineHeight = `${this.height}${Types.CSSUNITS.PX}`;
            }
        }
        //getChildsHTMLElement:function() {
        //  let nextId;
        //  this._label=new Label(this);
        //  this._label.getHTMLElement(this.HTMLElement.firstElementChild.id);
        //  this._label.updateFromHTML();
        //}
        //#endregion
    }
    return LabeledControl;
})();
Object.defineProperties(LabeledControl, {
    "label": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, LabeledControl);
export { LabeledControl };
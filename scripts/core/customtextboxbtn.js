//import { Classes } from "/scripts/core/classes.js";
import { Css } from "/scripts/core/css.js";
//#region CustomTextBoxBtn
const CustomTextBoxBtn = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class CustomTextBoxBtn extends CustomTextControl {
        constructor(owner, props) {
            if (!props) props = {};
            if (!props.btns) props.btns = 1;
            if (owner) {
                super(owner, props);
                const priv =  internal(this);
                priv.btnClass = null;
                priv.btns = [];
                //#region Private
                priv.btnClass = props.btnClass ? props.btnClass : Core.classes.Button;
                props.btns.forEach(btn => {
                });
                for (let i = 0; i < props.btns; i++) {
                    const btn = Core.classes.createComponent({
                        class: priv.btnClass,
                        owner: this,
                        props: {
                            inForm: false
                        },
                        withTpl: false
                    });
                    btn.name = `btn${i}`;
                    btn.canFocused = false;
                    priv.btns.add(btn);
                }
                //#endregion
            }
        }
        get btnClass() {
            return internal(this).btnClass;
        }
        set btnClass(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.btnClass !== newValue) {
                    priv.btnClass = newValue;
                }
            }
        }
        get btns() {
            return internal(this).btns;
        }
        //#region Setter
        //#endregion
        //#region Methods
        get template() {
            let html = null;
            html = super.template;
            const a = html.split("{buttons}");
            if (a.length > 1) {
                this.btns.forEach(btn => {
                    const tpl = btn.template;
                    a.insert(a.length - 1, tpl);
                });
            }
            html = a.join(String.EMPTY);
            return html;
        }
        getChildsHTMLElement() {
            const btns = this.btns;
            const htmlElement = this.HTMLElement;
            super.getChildsHTMLElement();
            if (htmlElement) {
                const _btns = htmlElement.querySelectorAll("button");
                if (_btns.length === btns.length) {
                    btns.forEach(btn => {
                        btn.getHTMLElement(btn.id);
                        btn.getChildsHTMLElement();
                        btn.updateFromHTML();
                        btn.caption = String.EMPTY;
                        Css.addClass(btn.HTMLElement, "TextBoxBtnButton");
                    });
                }
            }
        }
        destroy() {
            const btns = this.btns;
            btns.forEach(btn => {
                btn.destroy();
            });
            btns.clear();
            super.destroy();
        }
        //#endregion
    }
    return CustomTextBoxBtn;
})();
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, CustomTextBoxBtn);
export { CustomTextBoxBtn };
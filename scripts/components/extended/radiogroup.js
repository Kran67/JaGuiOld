//#region Import
import { GroupBox } from '/scripts/components/containers/groupbox.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Import
//#region RadioGroup
const RadioGroup = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class RadioGroup
    class RadioGroup extends GroupBox {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.allowUpdateOnResize = !0;
                super(owner, props);
                const priv = internal(this);
                core.classes.newCollection(this, this, core.classes.RadioButton);
                priv.itemIndex = -1;
                priv.columns = 1;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region itemIndex
        get itemIndex() {
            return internal(this).itemIndex;
        }
        set itemIndex(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.itemIndex !== newValue) {
                priv.itemIndex = newValue;
                this.items.forEach((item, i) => {
                    item.isChecked = i === priv.itemIndex ? !0 : !1;
                });
            }
        }
        //#endregion itemIndex
        //#endregion Getters / Setters
        //#region Methods
        //#region getRadio
        getRadio(index) {
            if (index >= 0 && index < this.items.length) {
                return this.items[index];
            }
            return null;
        }
        //#region arrangeButtons
        arrangeButtons() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading && this.items.length >= 0 && htmlElement) {
                const buttonsPerCol = int((this.items.length + priv.columns - 1) / priv.columns);
                const buttonWidth = int((this.width - 10) / priv.columns);
                const h = this.height - this.legend.offsetHeight - 10;
                const buttonHeight = int(h / buttonsPerCol);
                const topMargin = 16 + int(h % buttonsPerCol) / 2;
                this.items.forEach((item, i) => {
                    const l = int(int(i / buttonsPerCol) * buttonWidth + 8);
                    const t = int(i % buttonsPerCol * buttonHeight + topMargin);
                    item.bounds = new Rect(l, t, l + buttonWidth, t + buttonHeight);
                });
            }
        }
        //#endregion arrangeButtons
        //#region changeItemIndex
        changeItemIndex() {
            //#region Variables déclaration
            const owner = this.owner;
            //#endregion Variables déclaration
            owner.itemIndex = owner.items.indexOf(this);
        }
        //#endregion changeItemIndex
        //#region beginUpdate
        beginUpdate() {
            this.allowUpdate = !1;
            this.items.beginUpdate();
        }
        //#endregion beginUpdate
        //#region endUpdate
        endUpdate() {
            this.allowUpdate = !0;
            this.items.endUpdate();
        }
        //#endregion endUpdate
        //#region update
        update() {
            super.update();
            this.arrangeButtons();
        }
        //#endregion update
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            let radios;
            //#endregion Variables déclaration
            const htmlElement = this.HTMLElement;
            const properties = htmlElement.querySelector('properties');
            properties && (radios = JSON.parse(properties.innerText).items);
            if (radios) {
                this.beginUpdate();
                radios.forEach((obj, i) => {
                    const item = core.classes.createComponent({
                        class: this.items.itemClass, 
                        owner: this, 
                        props: {
                            caption: obj.caption,
                            enabled: obj.enabled,
                            checked: priv.itemIndex === i || obj.isChecked,
                            autoWidth: !1
                        }
                    });
                    item.onClick.addListener(this.changeItemIndex);
                    this.items.push(item);
                });
                this.endUpdate();
            }
            htmlElement.removeChild(properties);
            this.items.onChange.addListener(this.arrangeButtons);
            super.loaded();
        }
        //#endregion loaded
        //#endregion Methods
    }
    return RadioGroup;
    //#endregion RadioGroup
})();
Object.seal(RadioGroup);
core.classes.register(core.types.CATEGORIES.EXTENDED, RadioGroup);
//#endregion RadioGroup
//#region Templates
if (core.isHTMLRenderer) {
    const RadioGroupTpl = ['<fieldset id="{internalId}" data-class="RadioGroup" class=Control RadioGroup {theme}">',
        '<properties>{ "name": "{name}", "width": 185, "height": 105 }</properties></fieldset>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: RadioGroup, template: RadioGroupTpl }]);
}
//#endregion
export { RadioGroup };
//#region Import
import { GroupBox } from "/scripts/components/containers/groupbox.js";
import { Rect } from "/scripts/core/geometry.js";
import { RadioButton } from "/scripts/components/common/radiobutton.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region RadioGroup
const RadioGroup = (() => {
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
    //#region Class RadioGroup
    class RadioGroup extends GroupBox {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                Core.classes.newCollection(this, this, Core.classes.RadioButton);
                priv.itemIndex = -1;
                priv.columns = 1;
                priv.legendObj = null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        get itemIndex() {
            return internal(this).itemIndex;
        }
        set itemIndex(newValue) {
            const priv = internal(this);
            if (Tools.isNumber(newValue)) {
                if (priv.itemIndex !== newValue) {
                    priv.itemIndex = newValue;
                    this.items.forEach((item, i) => {
                        if (i === priv.itemIndex) {
                            item.isChecked = true;
                        } else {
                            item.isChecked = false;
                        }
                    });
                }
            }
        }
        //#endregion Getters / Setters
        getRadio(index) {
            if (index >= 0 && index < this.items.length) {
                return this.items[index];
            }
        }
        arrangeButtons() {
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            var buttonsPerCol, buttonWidth, buttonHeight, topMargin, item;
            if (!this.loading && !this.form.loading && this.items.length >= 0) {
                if (htmlElement) {
                    buttonsPerCol = ~~((this.items.length + priv.columns - 1) / priv.columns);
                    buttonWidth = ~~((htmlElement.offsetWidth - 10) / priv.columns);
                    const h = htmlElement.offsetHeight - this.legendObj.offsetHeight - 10;
                    buttonHeight = ~~(h / buttonsPerCol);
                    topMargin = 16 + ~~(h % buttonsPerCol) / 2;
                    this.items.forEach((item, i) => {
                        const l = ~~(~~(i / buttonsPerCol) * buttonWidth + 8);
                        const t = ~~(i % buttonsPerCol * buttonHeight + topMargin);
                        item.bounds = new Rect(l, t, l + buttonWidth, t + buttonHeight);
                    });
                }
            }
        }
        getHTMLElement(id) {
            const priv = internal(this);
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            const items = htmlElement.lastElementChild;
            let radios;
            if (items) {
                radios = JSON.parse(items.innerText);
            }
            if (radios) {
                radios.forEach((obj, i) => {
                    const item = Core.classes.createComponent({ class:this.items.itemClass, owner: this, props: {}, withTpl: true });
                    if (obj.hasOwnProperty("caption")) {
                        item.caption = obj.caption;
                    }
                    if (obj.hasOwnProperty("enabled")) {
                        item.enabled = obj.enabled;
                    }
                    if (priv.itemIndex === i) {
                        item.isChecked = true;
                    } else if (obj.hasOwnProperty("isChecked")) {
                        item.isChecked = obj.isChecked;
                    }
                    item.onClick.addListener(this.changeItemIndex);
                    this.items.push(item);
                });
            }
            htmlElement.removeChild(items);
            this.items.onChange.addListener(this.arrangeButtons);
        }
        changeItemIndex() {
            const owner = this.owner;
            owner.itemIndex = owner.items.indexOf(this);
        }
        beginUpdate() {
            this.allowUpdate = false;
            this.items.beginUpdate();
        }
        endUpdate() {
            this.allowUpdate = true;
            this.items.endUpdate();
        }
        loaded() {
            super.loaded();
            this.arrangeButtons();
        }
        //#region Methods
        //#endregion Methods
    }
    return RadioGroup;
    //#endregion RadioGroup
})();
//#endregion RadioGroup
Object.seal(RadioGroup);
Core.classes.register(Types.CATEGORIES.EXTENDED, RadioGroup);
//#region Templates
if (Core.isHTMLRenderer) {
    const RadioGroupTpl = ["<fieldset id='{internalId}' data-class='RadioGroup' class='Control RadioGroup {theme}' style='width:185px;height:105px;'><properties>{ \"name\": \"{name}\", \"width\": 185, \"height\": 105 }</properties>",
                   "<legend class='RadioGroupLegend carbon'>RadioGroup1</legend>",
                   "</fieldset>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: RadioGroup, template: RadioGroupTpl }]);
}
//endregion
export { RadioGroup };
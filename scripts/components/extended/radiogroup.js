//#region Import
import { GroupBox } from '/scripts/components/containers/groupbox.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Import
//#region Class RadioGroup
class RadioGroup extends GroupBox {
    //#region Private fields
    #itemIndex = -1;
    #columns = 1;
    #items = [];
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.allowUpdateOnResize = !0;
            super(owner, props);
            this.#items.convertToCollection(owner, core.classes.RadioButton);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region items
    get items() {
        return this.#items;
    }
    //#endregion items
    //#region itemIndex
    get itemIndex() {
        return this.#itemIndex;
    }
    set itemIndex(newValue) {
        if (core.tools.isNumber(newValue) && this.#itemIndex !== newValue) {
            this.#itemIndex = newValue;
            this.items.forEach((item, i) => {
                item.checked = i === this.#itemIndex ? !0 : !1;
            });
        }
    }
    //#endregion itemIndex
    //#endregion Getters / Setters
    //#region Methods
    //#region getRadio
    getRadio(index) {
        if (index >= 0 && index < this.#items.length) {
            return this.#items[index];
        }
        return null;
    }
    //#endregion getRadio
    //#region arrangeButtons
    arrangeButtons() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading && this.#items.length >= 0 && htmlElement) {
            const buttonsPerCol = int((this.#items.length + this.#columns - 1) / this.#columns);
            const buttonWidth = int((this.width - 10) / this.#columns);
            const h = this.height - this.legend.offsetHeight - 10;
            const buttonHeight = int(h / buttonsPerCol);
            const topMargin = 16 + int(h % buttonsPerCol) / 2;
            this.#items.forEach((item, i) => {
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
        owner.itemIndex = owner.#items.indexOf(this);
    }
    //#endregion changeItemIndex
    //#region beginUpdate
    beginUpdate() {
        this.allowUpdate = !1;
        this.#items.beginUpdate();
    }
    //#endregion beginUpdate
    //#region endUpdate
    endUpdate() {
        this.allowUpdate = !0;
        this.#items.endUpdate();
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
        let radios;
        const htmlElement = this.HTMLElement;
        const properties = htmlElement.querySelector('properties');
        //#endregion Variables déclaration
        properties && (radios = JSON.parse(properties.innerText).items);
        if (radios) {
            this.beginUpdate();
            radios.forEach((obj, i) => {
                const item = core.classes.createComponent({
                    class: this.#items.itemClass,
                    owner: this,
                    name: `${this.name}_radio${i+1}`,
                    props: {
                        caption: obj.caption,
                        enabled: obj.enabled,
                        checked: this.#itemIndex === i || obj.checked,
                        autoWidth: !1
                    }
                });
                item.onClick.addListener(this.changeItemIndex);
                this.#items.push(item);
            });
            this.endUpdate();
        }
        htmlElement.removeChild(properties);
        this.#items.onChange.addListener(this.arrangeButtons);
        super.loaded();
    }
    //#endregion loaded
    //#endregion Methods
}
Object.defineProperties(RadioGroup.prototype, {
    'itemIndex': {
        enumerable: !0
    },
    'columns': {
        enumerable: !0
    }
});
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
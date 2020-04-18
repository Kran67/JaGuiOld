//#region Import
import { ListBox, ListBoxItem } from '/scripts/components/common/listbox.js';
import { DropDownListBox } from '/scripts/components/common/dropdownlistbox.js';
import { Tools } from '/scripts/core/tools.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Colors } from '/scripts/core/color.js';
//#endregion Import
//#region ListBoxItemColorPopup
const ListBoxItemColorPopup = (() => {
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
    //#region ListBoxItemPopup
    class ListBoxItemColorPopup extends ListBoxItem {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                props.closePopups = !1;
                super(owner, props);
                const priv = internal(this);
                this.forceMouseWheel = !0;
                priv.color = props.hasOwnProperty('color') ? props.color : Colors.BLACK;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region color
        get color() {
            return internal(this).color;
        }
        set color(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Color) {
                if (!priv.color.equals(newValue)) {
                    priv.color.assign(newValue);
                    this.owner.draw();
                }
            }
        }
        //#endregion color
        //#endregion Getters / Setters
        //#region Methods
        //#region mouseLeave
        mouseLeave() {
            this.html.classList.remove('selected');
        }
        //#endregion mouseLeave
        //#region mouseEnter
        mouseEnter() {
            //#region Variables déclaration
            const owner = this.owner;
            const items = owner.items;
            const itemIndex = owner.itemIndex;
            //#endregion Variables déclaration
            if (itemIndex > -1) {
                if (items[itemIndex].html) {
                    items[itemIndex].html.classList.remove('selected');
                }
                items[itemIndex].selected = !1;
                owner.itemIndex = -1;
            }
        }
        //#endregion mouseEnter
        //#region draw
        draw() {
            //#region Variables déclaration
            const priv = internal(this);
            let colorDiv;
            let html;
            const TAG = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            //#endregion Variables déclaration
            super.draw();
            html = this.html;
            if (html.childElementCount === 1) {
                colorDiv = document.createElement(`${TAG}color`);
                colorDiv.classList.add('Color', this.owner.themeName);
                html.insertBefore(colorDiv, null);
            } else {
                colorDiv = html.lastElementChild;
            }
            colorDiv.style.backgroundColor = priv.color.toRGBAString();
            html.classList.add('ListBoxItemPopup');
        }
        //#endregion draw
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.color.destroy();
            priv.color = null;
            super.destroy();
        }
        //#endregion destroy
        //#region clone
        clone() {
            //#region Variables déclaration
            const clone = super.clone();
            //#endregion Variables déclaration
            clone.color.assign(priv.color);
            return clone;
        }
        //#endregion clone
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            let colorDiv;
            const html = this.html;
            //#endregion Variables déclaration
            super.update();
            if (html) {
                if (html.childElementCount > 1) {
                    colorDiv = html.lastElementChild;
                    colorDiv.style.backgroundColor = priv.color.toRGBAString();
                }
            }
        }
        //#endregion update
        //#endregion Methods
    }
    return ListBoxItemColorPopup;
    //#endregion ListBoxItemColorPopup
})();
Object.seal(ListBoxItemColorPopup);
//#endregion ListBoxItemColorPopup
//#region ListBoxColorPopup
class ListBoxColorPopup extends ListBox {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.closePopups = !1;
            props.itemsClass = 'ListBoxItemColorPopup';
            super(owner, props);
            this.forceMouseWheel = !0;
            this.canFocused = !1;
        }
    }
    //#endregion constructor
    //#region Methods
    //#region refreshInnerHeight
    refreshInnerHeight() {
        const items = this.items;
        if (this.owner) {
            items.forEach(item => {
                item.removeToHTML();
                item.selected = !1;
            });
            super.refreshInnerHeight();
        }
    }
    //#endregion refreshInnerHeight
    //#region _selectItem
    _selectItem(item) {
        const dropDownListBoxColor = item.owner.dropDownListBox;
        if (item.enabled) {
            dropDownListBoxColor.colorIndex = item.index;
            dropDownListBoxColor.itemIndex = item.index;
            dropDownListBoxColor.color.assign(item.color);
            if (!dropDownListBoxColor.updating) {
                dropDownListBoxColor.onChange.invoke();
            }
            item.form.closePopups();
        }
    }
    //#endregion _selectItem
    //#region keyUp
    keyUp() {
        const VKEYSCODES = Keyboard.VKEYSCODES;
        super.keyUp();
        switch (Core.keyboard.keyCode) {
            case VKEYSCODES.VK_RETURN:
            case VKEYSCODES.VK_ENTER:
                this._selectItem(this.items[this.itemIndex]);
                break;
        }
    }
    //#endregion keyUp
    //#endregion Methods
}
Object.seal(ListBoxColorPopup);
//#endregion ListBoxColorPopup
//#region DropDownListBoxColor
const DropDownListBoxColor = (() => {
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
    //#region Class DropDownListBoxColor
    class DropDownListBoxColor extends DropDownListBox {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.listBoxPopupClass = ListBoxColorPopup;
                props.items = [];
                const colors = Object.keys(Colors);
                colors.forEach(color => {
                    const item = {
                        caption: color.firstCharUpper,
                        color: Colors[color]
                    };
                    props.items.push(item);
                });
                super(owner, props);
                const priv = internal(this);
                priv.color = Colors.BLACK;
                priv.colorIndex = -1;
                priv.items = props.items;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region colorIndex
        get colorIndex() {
            return internal(this).colorIndex;
        }
        set colorIndex(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const feChild = this.HTMLElement.firstElementChild;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue) && newValue >= 0 && newValue < priv.items.length) {
                const item = priv.items[newValue];
                this.text = item.caption;
                feChild.style.backgroundColor = item.color.toRGBAString();
                feChild.firstElementChild.style.color = item.color.getForeColorHex();
                priv.color.assign(item.color);
            }
        }
        //#endregion colorIndex
        //#region color
        get color() {
            return internal(this).color;
        }
        set color(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color) {
                const item = priv.items.filter(item => item.color.equals(newValue));
                if (item.length > 0) {
                    this.text = item.first.caption;
                    priv.color.assign(newValue);
                }
            }
        }
        //#endregion color
        //#endregion Getters / Setters
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            priv.colorIndex = priv.itemIndex;
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.selectedColor = null;
            priv.color.destroy();
            priv.color = null;
            priv.colorIndex = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return DropDownListBoxColor;
    //#endregion DropDownListBoxColor
})();
Object.seal(DropDownListBoxColor);
//#endregion DropDownListBoxColor
Core.classes.register(Types.CATEGORIES.INTERNAL, ListBoxColorPopup, ListBoxItemColorPopup);
Core.classes.register(Types.CATEGORIES.COMMON, DropDownListBoxColor);
//#region Templates
if (Core.isHTMLRenderer) {
    const DropDownListBoxColorTpl = '<jagui-dropdownlistboxcolor id="{internalId}" data-class="DropDownListBoxColor" class="Control DropDownListBoxColor {theme}"><properties>{ "name": "{name}", "editable": !1, "width": 100 }</properties></jagui-dropdownlistboxcolor>';
    Core.classes.registerTemplates([
        { Class: DropDownListBoxColor, template: DropDownListBoxColorTpl },
        { Class: ListBoxColorPopup, template: Core.templates['ListBoxPopup'] }
    ]);
}
//#endregion Templates
//#region Import
import { ListBox, ListBoxItem } from '/scripts/components/common/listbox.js';
import { DropDownListBox } from '/scripts/components/common/dropdownlistbox.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Colors, Color } from '/scripts/core/color.js';
import '/scripts/components/dialogs/colordialog.js';
import { Window } from '/scripts/components/containers/window.js';
//#endregion Import
//#region ListBoxItemPopup
class ListBoxItemColorPopup extends ListBoxItem {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.closePopups = !1;
            props.forceMouseWheel = !0;
            super(owner, props);
            core.private(this, {
                color: props.hasOwnProperty('color') ? props.color : Colors.BLACK
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region color
    get color() {
        return core.private(this).color;
    }
    set color(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Color && !priv.color.equals(newValue)) {
            priv.color.assign(newValue);
            this.owner.draw();
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
            items[itemIndex].html && items[itemIndex].html.classList.remove('selected');
            items[itemIndex].selected = !1;
            owner.itemIndex = -1;
        }
    }
    //#endregion mouseEnter
    //#region draw
    draw() {
        //#region Variables déclaration
        const priv = core.private(this);
        let colorDiv;
        let html;
        const TAG = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.color.destroy();
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
        const priv = core.private(this);
        let colorDiv;
        const html = this.html;
        //#endregion Variables déclaration
        super.update();
        if (html && html.childElementCount > 1) {
            colorDiv = html.lastElementChild;
            colorDiv.style.backgroundColor = priv.color.toRGBAString();
        }
    }
    //#endregion update
    //#endregion Methods
}
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
            props.forceMouseWheel = !0;
            props.canFocused = !1;
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Methods
    //#region refreshInnerHeight
    refreshInnerHeight() {
        //#region Variables déclaration
        const priv = core.private(this);
        const items = priv.items;
        //#endregion Variables déclaration
        if (this.owner) {
            items.forEach(item => {
                item.removeToHTML();
                item.selected = !1;
            });
            super.refreshInnerHeight();
        }
    }
    //#endregion refreshInnerHeight
    //#region selectItem
    selectItem(item) {
        //#region Variables déclaration
        const dropDownListBoxColor = item.owner.dropDownListBox;
        //#endregion Variables déclaration
        if (item.enabled) {
            dropDownListBoxColor.colorIndex = item.index;
            dropDownListBoxColor.itemIndex = item.index;
            dropDownListBoxColor.color.assign(item.color);
            !dropDownListBoxColor.updating && dropDownListBoxColor.onChange.invoke();
            dropDownListBoxColor.form.closePopups();
        }
    }
    //#endregion selectItem
    //#region keyUp
    keyUp() {
        //#region Variables déclaration
        const VKEYSCODES = Keyboard.VKEYSCODES;
        //#endregion Variables déclaration
        super.keyUp();
        switch (core.keyboard.key) {
            case VKEYSCODES.VK_RETURN:
            case VKEYSCODES.VK_ENTER:
                this.selectItem(this.items[this.itemIndex]);
                break;
        }
    }
    //#endregion keyUp
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.items = null;
        super.destroy();
    }
    //#endregion Methods
}
Object.seal(ListBoxColorPopup);
//#endregion ListBoxColorPopup
//#region Class DropDownListBoxColor
class DropDownListBoxColor extends DropDownListBox {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.listBoxPopupClass = ListBoxColorPopup;
            props.items = [];
            props.dropDownWidth = 130;
            super(owner, props);
            core.private(this, {
                color: Colors.TRANSPARENT,
                colorIndex: -1
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region colorIndex
    get colorIndex() {
        return core.private(this).colorIndex;
    }
    set colorIndex(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        let colorDlg;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && newValue >= 0 && newValue < priv.items.length) {
            priv.colorIndex = newValue;
            if (newValue === 0) {
                colorDlg = core.classes.createComponent({
                    class: core.classes.ColorDlg,
                    owner: activeApp,
                    props: {
                        parentHTML: document.body,
                        control: this
                    }
                });
                colorDlg.obj = this;
                colorDlg.onClose.addListener(this.updateColor);
                colorDlg.showModal();
            } else {
                this.updateTextAndColor();
            }
        }
    }
    //#endregion colorIndex
    //#region color
    get color() {
        return core.private(this).color;
    }
    set color(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof Color) {
            const index = priv.items.findIndex(item => item.color.equals(newValue));
            if (index > 0) {
                priv.colorIndex = index;
            } else {
                priv.items.first.color.assign(newValue);
                priv.colorIndex = 0;
            }
            this.updateTextAndColor();
        }
    }
    //#endregion color
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    updateTextAndColor() {
        //#region Variables déclaration
        const priv = core.private(this);
        const fElChild = this.HTMLElement.firstElementChild;
        const item = priv.items[priv.colorIndex];
        //#endregion Variables déclaration
        if (item) {
            this.text = priv.colorIndex > 0 ? item.caption : item.color.toRGBAString();
            fElChild.style.backgroundColor = item.color.toRGBAString();
            fElChild.firstElementChild.style.color = item.color.getForeColorHex();
            priv.color.assign(item.color);
        }
    }
    //#endregion update
    //#region updateColor
    updateColor() {
        this.modalResult === Window.MODALRESULTS.OK && (this.obj.color = this.clrBoxNewColor.fillColor);
        this.obj.colorDlg = null;
    }
    //#endregion updateColor
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const colors = Object.keys(Colors);
        let items = [{
            caption: core.locales.translateConstant(core.currentLocale, 'colorBoxCustomCaption'),
            color: Colors.TRANSPARENT
        }];
        //#endregion Variables déclaration
        super.loaded();
        colors.forEach(color => {
            const item = {
                caption: color.firstCharUpper,
                color: Colors[color]
            };
            items = [...items, item];
        });
        priv.items.addRange(items);
        priv.colorIndex = priv.itemIndex;
    }
    //#endregion loaded
    //#region showPopup
    showPopup() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.items.first.color.assign(Colors.TRANSPARENT);
        super.showPopup();
    }
    //#endregion showPopup
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.color.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(DropDownListBoxColor);
core.classes.register(core.types.CATEGORIES.INTERNAL, ListBoxColorPopup, ListBoxItemColorPopup);
core.classes.register(core.types.CATEGORIES.COMMON, DropDownListBoxColor);
//#endregion DropDownListBoxColor
//#region Templates
if (core.isHTMLRenderer) {
    const DropDownListBoxColorTpl = '<jagui-dropdownlistboxcolor id="{internalId}" data-class="DropDownListBoxColor" class="Control DropDownListBox DropDownListBoxColor {theme}"><properties>{ "name": "{name}", "editable": !1, "width": 100 }</properties></jagui-dropdownlistboxcolor>';
    core.classes.registerTemplates([
        { Class: DropDownListBoxColor, template: DropDownListBoxColorTpl },
        { Class: ListBoxColorPopup, template: core.templates['ListBoxPopup'] }
    ]);
}
//#endregion Templates
export { DropDownListBoxColor };
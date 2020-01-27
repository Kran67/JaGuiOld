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
                    buttonWidth = ~~(~~(htmlElement.offsetWidth - 10) / this._columns);
                    const i = htmlElement.offsetHeight - this.legendObj.offsetHeight - 10;
                    buttonHeight = ~~(i / buttonsPerCol);
                    topMargin = 16 + (~~(i % buttonsPerCol) / 2);
                    this.items.forEach(item => {
                        item.bounds = new Rect(~~(~~(i / buttonsPerCol) * buttonWidth + 8), ~~(i % buttonsPerCol * buttonHeight + topMargin), buttonWidth, buttonHeight);
                    });
                }
            }
        }
        getHTMLElement(id) {
            super.getHTMLElement(id);
            let items = this.HTMLElement.lastElementChild;
            if (items) {
                items = JSON.parse(items.innerText);
            }
            if (items) {
                items.forEach(obj => {
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
                    const tpl = item.getTemplate();
                    this.insertTemplate(tpl);
                    item.getHTMLElement(item.internalId);
                    item.onClick.addListener(this.changeItemIndex);
                    this.items.push(item);
                });
            }
            this.HTMLElement.removeChild(items);
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

/*(function () {
    var RadioGroup = $j.classes.GroupBox.extend("RadioGroup", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                $j.classes.newCollection(this, this, $j.classes.RadioButton);
                this._itemIndex = -1;
                this._columns = 1;
                //#endregion
            }
        },
        //#region Setters
        setItemIndex: function (newValue) {
            var i, l;
            if (typeof newValue !== _const.NUMBER) return;
            if (this.itemIndex !== newValue) {
                this.itemIndex = newValue;
                for (i = 0, l = this.items.length; i < l; i++) {
                    if (i === this.itemIndex) this.items[i].setIsChecked(true);
                    else this.items[i].setIsChecked(false);
                }
            }
        },
        //#endregion
        //#region Methods
        getRadio: function (index) {
            if (index < 0) return null;
            if (index > this.items.length) return null;
            return this.items[index];
        },
        arrangeButtons: function () {
            var i, l, buttonsPerCol, buttonWidth, buttonHeight, topMargin, item;
            if (this._loading || this.form._loading) return;
            if (this.items.length === 0) return;
            if (!this._HTMLElement) return;
            buttonsPerCol = ~~((this.items.length + this._columns - 1) / this._columns);
            buttonWidth = ~~(~~(this._HTMLElement.offsetWidth - 10) / this._columns);
            i = this._HTMLElement.offsetHeight - this._legendObj.offsetHeight - 10;
            buttonHeight = ~~(i / buttonsPerCol);
            topMargin = 16 + (~~(i % buttonsPerCol) / 2);
            for (i = 0, l = this.items.length; i < l; i++) {
                item = this.items[i];
                item.setBounds(~~(~~(i / buttonsPerCol) * buttonWidth + 8), ~~((i % buttonsPerCol) * buttonHeight + topMargin), buttonWidth, buttonHeight);
            }
        },
        getChildsHTMLElement: function () {
            var items, item, tpl;
            this._inherited();
            // on va chercher les items dans le CDATA
            var cdata = this._legendObj.nextSibling;
            while (cdata && cdata.nodeType !== $j.types.xmlNodeTypes.COMMENT_NODE) {
                cdata = cdata.nextSibling;
            }
            if (cdata && cdata.nodeValue !== String.EMPTY && cdata.nodeValue) items = JSON.parse(cdata.nodeValue);
            if (items) {
                for (var i = 0, l = items.length; i < l; i++) {
                    item = $j.classes.createComponent(this.items._itemClass, this, String.EMPTY, {}, false);
                    if (items[i].caption) item.caption = items[i].caption;
                    if (items[i].enabled) item.enabled = items[i].enabled;
                    if (this.itemIndex === i) item.isChecked = true;
                    else if (items[i].isChecked) item.isChecked = items[i].isChecked;
                    tpl = item.getTemplate();
                    this.insertTemplate(tpl);
                    item.getHTMLElement(item._internalId);
                    item.getChildsHTMLElement(item._HTMLElement);
                    item.onClick.addListener(this.changeItemIndex);
                    this.items.push(item);
                }
            }
            this.items.onChange.addListener(this.arrangeButtons);
        },
        changeItemIndex: function () {
            this._owner.itemIndex = this._owner.items.indexOf(this);
        },
        beginUpdate: function () {
            this._allowUpdate = false;
            this.items.beginUpdate();
        },
        endUpdate: function () {
            this._allowUpdate = true;
            this.items.endUpdate();
        },
        loaded: function () {
            this._inherited();
            this.arrangeButtons();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.itemindex;
            if (data) this.itemIndex = ~~data;
        }
        //#endregion
    });
    Object.seal(RadioGroup);
    $j.classes.register($j.types.categories.EXTENDED, RadioGroup);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var RadioGroupTpl = "<fieldset id='{internalId}' data-name='{name}' data-class='RadioGroup' class='Control RadioGroup {theme}' style='width:185px;height:105px;'>\
                       <legend class='Control RadioGroupLegend carbon'>RadioGroup1</legend>\
                       </fieldset>";
        $j.classes.registerTemplates([{ Class: RadioGroup, template: RadioGroupTpl }]);
    }
    //endregion
})();*/
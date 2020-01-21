//#region Imports
import { Button } from "/script/components/common/button.js";
import { Tools } from "/scripts/core/tools.js";
import { Color, Colors } from "/scripts/core/color.js";
//#endregion Imports
//#region ColorButton
const ColorButton = (() => {
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
    //#region Class CustomButton
    class ColorButton extends CaptionControl {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.color = props.hasOwnProperty("color")?color.parse(props.color):Colors.TRANSPARENT;
                this.caption = priv.color.toARGBString();
                this.onChange = new $j.classes.NotifyEvent(this);
                priv.colorDlg = null;
            }
        }
        //#endregion Constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return ColorButton;
    //#endregion ColorButton
})();
//#endregion ColorButton
Core.classes.register(Types.CATEGORIES.COLOR, ColorButton);
/*(function () {
    "use strict";
    var ColorButton = $j.classes.Button.extend("ColorButton", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._colorObj = null;
                //#endregion
                this.color = new $j.classes.Color(_colors.TRANSPARENT);
                this.caption = this.color.toARGBString();
                this.onChange = new $j.classes.NotifyEvent(this);
                this.colorDlg = null;
            }
        },
        //#region Setter
        setColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (!this.color.equals(newValue)) {
                this.color.assign(newValue);
                this.caption = this.color.toARGBString();
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.update();
                } else {
                }
                if (!this._updating) this.onChange.invoke();
            }
        },
        setColorDlg: function (newValue) {
            if (!(newValue instanceof $j.classes.ColorDialog)) return;
            if (this.colorDlg !== newValue) {
                this.colorDlg = newValue;
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            if (this._textObj) {
                this._textObj.innerHTML = String.EMPTY;
            }
            if (this._colorObj) {
                this._colorObj.style.backgroundColor = this.color.toARGBString();
            }
        },
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._colorObj = this._HTMLElement.lastElementChild;
                this._colorObj.jsObj = this;
            }
        },
        updateFromHTML: function () {
            this._inherited();
            var data = this._HTMLElement.dataset.color;
            if (data) {
                this.color.assign(_colors.parse(data));
                this.update();
            }
            this.bindEventToHTML("onChange");
        },
        click: function () {
            var colorDlg = $j.classes.createComponent($j.classes.ColorDlg, $j.apps.activeApplication, null, { "parentHTML": $j.doc.body });
            colorDlg.loaded();
            colorDlg._obj = this;
            colorDlg.setCaption("Couleurs");
            colorDlg.setColor(this.color);
            colorDlg.lblOpacity.setVisible(false);
            colorDlg.slrOpacity.setVisible(false);
            colorDlg.txtbOpacity.setVisible(false);
            colorDlg.lblOpacityPer.setVisible(false);
            colorDlg.onClose.addListener(this.updateColor);
            colorDlg.center();
            colorDlg.showModal();
            this._inherited();
        },
        updateColor: function () {
            if (this.modalResult === $j.types.modalResults.OK) {
                this._obj.setColor(this.clrBoxNewColor.fillColor);
            }
            this._obj.colorDlg = null;
        },
        destroy: function () {
            this._inherited();
            this._colorObj = null;
            this.color.destroy();
            this.color = null;
            this.caption = null;
            this.onChange.destroy();
            this.onChange = null;
            //this.colorDlg=null;
        }
        //#endregion
    });
    Object.seal(ColorButton);
    $j.classes.register($j.types.categories.COLOR, ColorButton);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ColorButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='ColorButton' class='Control ColorButton {theme} csr_default' data-color='red' style='width:75px;height:21px;'>\
                        <span class='Control ButtonCaption'></span>\
                        <div class='Control ColorButtonColor {theme}'></div>\
                        </button>";
        $j.classes.registerTemplates([{ Class: ColorButton, template: ColorButtonTpl }]);
    }
    //endregion
})();*/
//#region Import
import { CaptionControl } from "/scripts/core/captioncontrol.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region GroupBox
const GroupBox = (() => {
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
    //#region Class GroupBox
    class GroupBox extends CaptionControl {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.legendObj = null;
                this.autoTranslate = true;
                this.canFocused = false;
                if (!Core.isHTMLRenderer) {
                    this.width = 120;
                    this.height = 100;
                }
                this.padding.setValues(5, 15, 5, 5);
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "horizAlign",
                    enum: Types.TEXTALIGNS,
                    variable: priv,
                    value: props.hasOwnProperty("horizAlign")? props.horizAlign : Types.TEXTALIGNS.LEFT
                });
            }
        }
        //#endregion Constructor
        //#region Methods
        doBitmapLoaded() {
            if (!Core.isHTMLRenderer) {
                if (this.owner.allowUpdate) {
                    this.owner.update();
                }
                this.redraw();
            } else {
                this.update();
            }
        }
        doBitmapNotLoaded() { throw "Bitmap error"; }
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                if (priv.legendObj) {
                    priv.legendObj.setAttribute("align", priv.horizAlign);
                }
            }
        }
        updateCaption() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.legendObj.innerHTML = this.caption;
        }
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            if (htmlElement) {
                priv.legendObj = htmlElement.querySelector(".GroupBoxLegend");
                priv.legendObj.jsObj = this;
            }
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.legendObj = null;
            priv.horizAlign = null;
        }
        //#endregion
    }
    return GroupBox;
    //#endregion Class GroupBox
})();
//#endregion
Object.seal(GroupBox);
Core.classes.register(Types.CATEGORIES.CONTAINERS, GroupBox);
/*
(function () {
    var GroupBox = $j.classes.CaptionControl.extend("GroupBox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._legendObj = null;
                //#endregion
                this._autoTranslate = true;
                this.canFocused = false;
                if (!$j.isHTMLRenderer()) {
                    this.width = 120;
                    this.height = 100;
                }
                this.padding.setValues(5, 15, 5, 5);
                $j.tools.addPropertyFromSet(this, "horizAlign", $j.types.textAligns, $j.types.textAligns.LEFT);
            }
        },
        //#region Methods
        doBitmapLoaded: function () {
            if (!$j.isHTMLRenderer) {
                if (this._owner._allowUpdate) this._owner.update();
                this.redraw();
            } else this.update();
        },
        doBitmapNotLoaded: function () { throw "Bitmap error"; },
        update: function () {
            if (this._loading || this.form._loading) return;
            if (this._legendObj) this._legendObj.setAttribute("align", this.horizAlign);
        },
        updateCaption: function () {
            this._legendObj.innerHTML = this.caption;
        },
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._legendObj = this._HTMLElement.firstElementChild;
                this._legendObj.jsObj = this;
            }
        },
        updateFromHTML: function () {
            this._inherited();
            this.caption = this._legendObj.innerHTML;
        },
        destroy: function () {
            this._inherited();
            this._legendObj = null;
            this.horizAlign = null;
        }
        //#endregion
    });
    Object.seal(GroupBox);
    $j.classes.register($j.types.categories.CONTAINERS, GroupBox);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var GroupBoxTpl = "<fieldset id='{internalId}' data-name='{name}' data-class='GroupBox' class='Control GroupBox {theme}' style='width:185px;height:105px;'>\
                     <legend class='Control GroupBoxLegend carbon'>GroupBox1</legend>\
                     </fieldset>";
        $j.classes.registerTemplates([{ Class: GroupBox, template: GroupBoxTpl }]);
    }
    //endregion
})();
*/
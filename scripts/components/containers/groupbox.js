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
        //#region doBitmapLoaded
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
        //#endregion doBitmapLoaded
        //#region doBitmapNotLoaded
        doBitmapNotLoaded() { throw "Bitmap error"; }
        //#endregion doBitmapNotLoaded
        //#region update
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
        //#endregion update
        //#region updateCaption
        updateCaption() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.legendObj.innerHTML = this.caption;
        }
        //#endregion updateCaption
        //#region getHTMLElement
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
        //#endregion getHTMLElement
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.legendObj = null;
            priv.horizAlign = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return GroupBox;
    //#endregion Class GroupBox
})();
//#endregion
Object.seal(GroupBox);
Core.classes.register(Types.CATEGORIES.CONTAINERS, GroupBox);
export { GroupBox };
/*
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
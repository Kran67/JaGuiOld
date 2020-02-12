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
                //priv.legend = null;
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
                this.autoSize = false;
                this.allowRealignChildsOnResize = true;
            }
        }
        //#endregion Constructor
        //#region Getters / Setters
        //#region legend
        get legend() {
            return internal(this).legend;
        }
        //#endregion legend
        //#endregion Getters / Setters
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
            super.update();
            if (!this.loading && !this.form.loading) {
                if (priv.legend) {
                    priv.legend.setAttribute("align", priv.horizAlign);
                }
            }
        }
        //#endregion update
        //#region updateCaption
        updateCaption() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.legend.innerHTML = this.caption;
        }
        //#endregion updateCaption
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.legend = null;
            priv.horizAlign = null;
        }
        //#endregion destroy
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.legend = document.createElement(Types.HTMLELEMENTS.LEGEND);
            priv.legend.classList.add("GroupBoxLegend", this.themeName);
            this.HTMLElement.appendChild(priv.legend);
            this.updateCaption();
            super.loaded();
        }
        //#endregion loaded
        //#endregion Methods
    }
    return GroupBox;
    //#endregion Class GroupBox
})();
//#endregion
Object.seal(GroupBox);
Core.classes.register(Types.CATEGORIES.CONTAINERS, GroupBox);
export { GroupBox };
//#region Templates
if (Core.isHTMLRenderer) {
    var GroupBoxTpl = "<fieldset id=\"{internalId}\" data-class=\"GroupBox\" class=\"Control GroupBox {theme}\"><properties>{ \"name\": \"{name}\", \"caption\": \"{caption}\" }</properties></fieldset>";
    Core.classes.registerTemplates([{ Class: GroupBox, template: GroupBoxTpl }]);
}
//endregion
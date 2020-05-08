//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
//#endregion Import
//#region GroupBox
const GroupBox = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
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
                props.autoTranslate = !0;
                props.canFocused = !1;
                props.padding = { left: 5, top: 15, right: 5, bottom: 5 };
                props.autoSize = !1;
                props.allowRealignChildsOnResize = !0;
                if (!core.isHTMLRenderer) {
                    props.width = 120;
                    props.height = 100;
                }
                super(owner, props);
                const priv = internal(this);
                //priv.legend = null;
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'horizAlign',
                    enum: core.types.TEXTALIGNS,
                    variable: priv,
                    value: props.hasOwnProperty('horizAlign') ? props.horizAlign : core.types.TEXTALIGNS.LEFT
                });
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
            if (!core.isHTMLRenderer) {
                this.owner.allowUpdate && this.owner.update();
                this.redraw();
            } else {
                this.update();
            }
        }
        //#endregion doBitmapLoaded
        //#region doBitmapNotLoaded
        doBitmapNotLoaded() { throw 'Bitmap error'; }
        //#endregion doBitmapNotLoaded
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.update();
            !this.loading && !this.form.loading && priv.legend && priv.legend.setAttribute('align', priv.horizAlign);
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
            priv.legend = null;
            priv.horizAlign = null;
            super.destroy();
        }
        //#endregion destroy
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.legend = document.createElement(core.types.HTMLELEMENTS.LEGEND);
            priv.legend.classList.add('GroupBoxLegend', this.themeName);
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
Object.seal(GroupBox);
core.classes.register(core.types.CATEGORIES.CONTAINERS, GroupBox);
//#endregion GroupBox
//#region Templates
if (core.isHTMLRenderer) {
    const GroupBoxTpl = ['<fieldset id="{internalId}" data-class="GroupBox" class="Control GroupBox {theme}"><properties>',
        '{ "name": "{name}", "caption": "{caption}" }</properties></fieldset>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: GroupBox, template: GroupBoxTpl }]);
}
//#endregion
export { GroupBox };
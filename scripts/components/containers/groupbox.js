//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
import { CustomLayout } from '/scripts/core/customlayout.js';
//#endregion Import
//#region Class GroupBox
class GroupBox extends CaptionControl {
    //#region Private fields
    #horizAlign;
    #legend;
    #layout;
    //#endregion Private fields
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
            //core.tools.defineLayout(this, props);
            this.addPropertyEnum('horizAlign', core.types.TEXTALIGNS);
            this.#horizAlign = props.hasOwnProperty('horizAlign') ? props.horizAlign : core.types.TEXTALIGNS.LEFT;
            this.#layout = new CustomLayout(this, props.hasOwnProperty('layout') ? props.layout : null);
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region horizAlign
    get horizAlign() {
        return this.#horizAlign;
    }
    set horizAlign(newValue) {
        if (core.tools.valueInSet(newValue, core.types.TEXTALIGNS) && this.#horizAlign !== newValue) {
            this.#horizAlign = newValue;
            core.isHTMLRenderer && this.update();
        }
    }
    //#endregion horizAlign
    //#region legend
    get legend() {
        return this.#legend;
    }
    //#endregion legend
    //#region legend
    get layout() {
        return this.#layout;
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
        !this.loading && !this.form.loading && this.#legend && this.#legend.setAttribute('align', this.#horizAlign);
    }
    //#endregion update
    //#region updateCaption
    updateCaption() {
        this.#legend.innerHTML = this.caption;
    }
    //#endregion updateCaption
    //#region loaded
    loaded() {
        this.#legend = document.createElement(core.types.HTMLELEMENTS.LEGEND);
        this.#legend.classList.add('GroupBoxLegend', this.themeName);
        this.HTMLElement.appendChild(this.#legend);
        this.updateCaption();
        super.loaded();
    }
    //#endregion loaded
    //#endregion Methods
}
Object.seal(GroupBox);
Object.defineProperties(CustomLayout.prototype, {
    'horizAlign': {
        enumerable: !0
    },
    'layout': {
        enumerable: !0
    }
});
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
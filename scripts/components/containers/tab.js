﻿//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
import { CustomTabControl } from "/scripts/core/customtabcontrol.js";
import { Mouse } from "/scripts/core/mouse.js";
//#endregion Import
//#region Class Tab
class Tab extends CaptionControl {
    //#region Private fields
    #imageIndex = -1;
    #showCaption;
    #tabControl;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        String.isNullOrEmpty(props.caption) && (props.caption = `${this.constructor.name}${num}`);
        if (owner) {
            super(owner, props);
            this.#showCaption = props.hasOwnProperty('showCaption') ? props.showCaption : !0;
            this.#tabControl = owner;
            let num = 1;
            owner instanceof CustomTabControl && (num = owner.tabs.length + 1);
            this.createEventsAndBind(['onClose'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region tabControl
    get tabControl() {
        return this.#tabControl;
    }
    //#endregion tabControl
    //#region imageIndex
    get imageIndex() {
        return this.#imageIndex;
    }
    set imageIndex(newValue) {
        //#region Variables déclaration
        const tabControl = this.#tabControl;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(newValue, -1);
            if (tabControl.images && newValue < tabControl.images.length) {
                this.#imageIndex = newValue;
                this.update();
            }
        }
    }
    //#endregion imageIndex
    //#region showCaption
    get showCaption() {
        return this.#showCaption;
    }
    set showCaption(newValue) {
        if (core.tools.isBool(newValue) && this.#showCaption !== newValue) {
            this.#showCaption = newValue;
            this.update();
        }
    }
    //#endregion showCaption
    //#endregion Getters / Setters
    //#region Methods
    //#region show
    show() {
        if (tabControl.activeTab !== this) {
            tabControl.activeTab && tabControl.activeTab.hide();
            if (this.enabled) {
                tabControl.activeTab = this;
                this.HTMLElement.classList.add('selected');
                // on bouge pour mettre le tab bien visible
                tabControl.scrollToTab(this);
                tabControl.change();
            }
        }
    }
    //#endregion show
    //#region hide
    hide() {
        this.HTMLElement.classList.remove('selected');
    }
    //#endregion hide
    //#region mouseUp
    mouseUp() {
        //#region Variables déclaration
        const owner = this.owner;
        //#endregion Variables déclaration
        super.mouseUp();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
            if (owner.showTabsCloseBtn) {
                core.mouse.target.x < this.HTMLElement.offsetWidth - 20 ? this.show() : owner.closeTab(this);
            } else {
                this.show();
            }
        }
    }
    //#endregion mouseUp
    //#region update
    update() {
        super.update();
        if (this.imageIndex > -1) {
            // todo
        }
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.unBindAndDestroyEvents(['onClose']);
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(Tab.prototype, {
    'imageIndex': {
        enumerable: !0
    },
    'showCaption': {
        enumerable: !0
    }
});
Object.seal(Tab);
core.classes.register(core.types.CATEGORIES.CONTAINERS, Tab);
//#endregion Tab
//#region Template
if (core.isHTMLRenderer) {
    const TabTpl = ['<jagui-tab id="{internalId}" data-class="TabSheet" data-name="{name}" class="Control Tab csr_default {theme}">',
        '{caption}</jagui-tab>'].join(String.EMPTY);
    core.classes.registerTemplates([
        { Class: Tab, template: TabTpl }
    ]);
}
//#endregion
export { Tab };
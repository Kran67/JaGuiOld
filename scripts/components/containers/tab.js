//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
import { CustomTabControl } from "/scripts/core/customtabcontrol.js";
import { Mouse } from "/scripts/core/mouse.js";
//#endregion Import
//#region Class Tab
class Tab extends CaptionControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                imageIndex: -1,
                showCaption: props.hasOwnProperty('showCaption') ? props.showCaption : !0,
                tabControl: owner,
                caption: props.hasOwnProperty('caption') ? props.caption : `${this.constructor.name}${num}`
            });
            let num = 1;
            owner instanceof CustomTabControl && (num = owner.tabs.length + 1);
            this.createEventsAndBind(['onClose'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region tabControl
    get tabControl() {
        return core.private(this).tabControl;
    }
    //#endregion tabControl
    //#region imageIndex
    get imageIndex() {
        return core.private(this).imageIndex;
    }
    set imageIndex(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const tabControl = priv.tabControl;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(newValue, -1);
            if (tabControl.images && newValue < tabControl.images.length) {
                priv.imageIndex = newValue;
                this.update();
            }
        }
    }
    //#endregion imageIndex
    //#region showCaption
    get showCaption() {
        return core.private(this).showCaption;
    }
    set showCaption(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.showCaption !== newValue) {
            priv.showCaption = newValue;
            this.update();
        }
    }
    //#endregion showCaption
    //#endregion Getters / Setters
    //#region Methods
    //#region show
    show() {
        //#region Variables déclaration
        const tabControl = this.tabControl;
        //#endregion Variables déclaration
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
    },
    'caption': {
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
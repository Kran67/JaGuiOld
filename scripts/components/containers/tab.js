//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
import { CustomTabControl } from "/scripts/core/customtabcontrol.js";
import { Mouse } from "/scripts/core/mouse.js";
//#endregion Import
//#region Tab
const Tab = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class Tab
    class Tab extends CaptionControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.imageIndex = -1;
                priv.showCaption = props.hasOwnProperty('showCaption') ? props.showCaption : !0;
                priv.tabControl = owner;
                let num = 1;
                owner instanceof CustomTabControl && (num = owner.tabs.length + 1);
                priv.caption = props.hasOwnProperty('caption') ? props.caption : `${this.constructor.name}${num}`;
                this.createEventsAndBind(['onClose'], props);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region tabControl
        get tabControl() {
            return internal(this).tabControl;
        }
        //#endregion tabControl
        //#region imageIndex
        get imageIndex() {
            return internal(this).imageIndex;
        }
        set imageIndex(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
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
            return internal(this).showCaption;
        }
        set showCaption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.imageIndex = null;
            priv.showCaption = null;
            priv.tabControl = null;
            priv.caption = null;
            this.unBindAndDestroyEvents(['onClose']);
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return Tab;
    //#endregion Class Tab
})();
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
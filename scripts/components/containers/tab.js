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
        if (!_private.has(key)) {
            _private.set(key, {});
        }
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
                priv.showCaption = props.hasOwnProperty('showCaption')?props.showCaption:true;
                priv.tabControl = owner;
                this.addBindableProperties(['showCaption', 'imageIndex']);
                let num = 1;
                if (owner instanceof CustomTabControl) {
                    num = owner.tabs.length + 1;
                }
                priv.caption = props.hasOwnProperty('caption')?props.caption : `${this.constructor.name}${num}`;
                this.hitTest.mouseDown = true;
                this.hitTest.mouseUp = true;
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
            if (Tools.isNumber(newValue)) {
                if (newValue < -1) newValue = -1;
                if (tabControl.images) {
                    if (newValue < tabControl.images.length) {
                        priv.imageIndex = newValue;
                        this.update();
                    }
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
            if (Tools.isBool(newValue)) {
                if (priv.showCaption !== newValue) {
                    priv.showCaption = newValue;
                    this.update();
                }
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
                if (tabControl.activeTab) {
                    tabControl.activeTab.hide();
                }
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
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                if (owner.showTabsCloseBtn) {
                    if (Core.mouse.target.x < this.HTMLElement.offsetWidth - 20) {
                        this.show();
                    } else {
                        owner.closeTab(this);
                    }
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
        //#endregion Methods
    }
    return Tab;
    //#endregion Class Tab
})();
//#region defineProperties
Object.defineProperties(Tab, {
    'imageIndex': {
        enumerable: true
    },
    'showCaption': {
        enumerable: true
    }
});
//#endregion defineProperties
Object.seal(Tab);
Core.classes.register(Types.CATEGORIES.CONTAINERS, Tab);
//#region Template
if (Core.isHTMLRenderer) {
    const TabTpl = ['<jagui-tab id="{internalId}" data-class="TabSheet" data-name="{name}" class="Control Tab csr_default {theme}">',
        '{caption}</jagui-tab>'].join(String.EMPTY);
    Core.classes.registerTemplates([
        { Class: Tab, template: TabTpl }
    ]);
}
//#endregion
//#endregion Class Tab
export { Tab };
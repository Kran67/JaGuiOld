import { CaptionControl } from '/scripts/core/captioncontrol.js';
//import { CustomTabControl } from "/scripts/core/customtabcontrol.js";
//import { NotifyEvent } from "/scripts/core/events.js";
//#region Tab
const Tab = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Tab extends CaptionControl {
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.imageIndex = -1;
                priv.showCaption = true;
                priv.tabControl = owner;
                this.addBindableProperties(['showCaption', 'imageIndex']);
                let num = 1;
                if (owner instanceof Core.classes.CustomTabControl) {
                    num = owner.tabs.length + 1;
                }
                priv.caption = props.caption ? props.caption : `${this.constructor.name}${num}`;
                priv.hitTest = true;
                this.onClose = new Core.classes.NotifyEvent(this);
            }
        }
        //#region Setter
        get tabControl() {
            return internal(this).tabControl;
        }
        get imageIndex() {
            return internal(this).imageIndex;
        }
        set imageIndex(newValue) {
            const priv = internal(this);
            const tabControl = priv.tabControl;
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue < -1) newValue = -1;
                if (tabControl.images) {
                    if (newValue < tabControl.images.length) {
                        priv.imageIndex = newValue;
                        this.update();
                    }
                }
            }
        }
        get showCaption() {
            return internal(this).showCaption;
        }
        set showCaption(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.showCaption !== newValue) {
                    priv.showCaption = newValue;
                    this.update();
                }
            }
        }
        //#endregion
        //#region Methods
        show() {
            const tabControl = this.tabControl;
            if (tabControl.activeTab !== this) {
                if (tabControl.activeTab) {
                    tabControl.activeTab.hide();
                }
                if (!this.enabled) {
                    return;
                }
                tabControl.activeTab = this;
                this.HTMLElement.classList.add('selected');
                // on bouge pour mettre le tab bien visible
                tabControl.scrollToTab(this);
                tabControl.change();
            }
        }
        hide() {
            this.HTMLElement.classList.remove('selected');
        }
        mouseUp() {
            const owner = this.owner;
            super.mouseUp();
            if (Core.mouse.button === Core.mouse.MOUSEBUTTONS.LEFT) {
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
        //updateFromHTML() {
        //    let data;
        //    super.updateFromHTML();
        //    this.caption = this.HTMLElement.innerHTML;
        //}
        update() {
            super.update();
            if (this.imageIndex > -1) {
            } else {
            }
        }
        //#endregion
    }
    return Tab;
})();
Object.defineProperties(Tab, {
    'imageIndex': {
        enumerable: true
    },
    'showCaption': {
        enumerable: true
    }
});
Object.seal(Tab);
//#endregion
Core.classes.register(Types.CATEGORIES.CONTAINERS, Tab);
export { Tab };
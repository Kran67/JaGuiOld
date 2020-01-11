//#region Import
import { Button } from "/scripts/components/common/button.js";
import { Window } from "/scripts/components/containers/window.js";
//#endregion Import
//#region WindowButton
const WindowButton = (() => {
    //#region Class WindowButton
    class WindowButton extends Button {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                this.canFocused = false;
                this.forceDisplayVisibility = true;
                this.fontFamily = Types.CONSTANTS.BTNGLYPHFONTFACE;
                this.fontSizeUnit = Types.CSSUNITS.PT;
            }
        }
        //#endregion Constructor
        //#region getters / setters
        //#region visible
        get visible() {
            return super.visible;
        }
        set visible(newValue) {
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (this.visible !== newValue) {
                    super.visible = newValue;
                    if (!Core.isHTMLRenderer) {
                        this.form.alignButtons();
                    }
                    this.owner.calcVisibleBtns();
                }
            }
        }
        //#endregion visible
        //#region caption
        get caption() {
            return String.EMPTY;
        }
        set caption(newValue) {
            return;
        }
        //#endregion caption
        //#endregion getters / setters
    }
    return WindowButton;
    //#endregion Class WindowButton
})();
//#endregion
//#region WindowCloseButton
const WindowCloseButton = (() => {
    //#region Class WindowCloseButton
    class WindowCloseButton extends WindowButton {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                this.modalResult = Window.MODALRESULTS.CANCEL;
                this.toolTip = "Fermer"; // � voir pour mettre en locale
                this.showToolTip = true;
            }
        }
        //#endregion Constructor
        //#region getters / setters
        //#region visible
        get visible() {
            return super.visible;
        }
        set visible(newValue) {
            return;
        }
        //#endregion visible
        //#endregion getters / setters
    }
    return WindowCloseButton;
    //#endregion Class WindowCloseButton
})();
//#endregion
//#region WindowMinimizeButton
const WindowMinimizeButton = (() => {
    //#region Class WindowMinimizeButton
    class WindowMinimizeButton extends WindowButton {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                this.toolTip = "Réduire"; // à voir pour mettre en locale
                this.showToolTip = true;
            }
        }
        //#endregion Constructor
        //#region Methods
        //#region click
        click() {
            this.form.toogleMinRestore();
        }
        //#endregion click
        //#region render
        render(className) {
            //#region Variables declaration
            const form = this.form;
            //#endregion Variables declaration
            if (!form.isBorderDialog) {
                super.render(className);
            }
        }
        //#endregion render
        //#endregion Methods
    }
    return WindowMinimizeButton;
    //#endregion Class WindowMinimizeButton
})();
//#endregion
//#region WindowMaximizeButton
const WindowMaxRestoreButton = (() => {
    //#region Class WindowMaxRestoreButton
    class WindowMaxRestoreButton extends WindowButton {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                this.toolTip = "Agrandir"; // à voir pour mettre en locale
                this.showToolTip = true;
            }
        }
        //#endregion Constructor
        //#region Methods
        //#region click
        click() {
            this.form.toogleMaxRestore();
        }
        //#endregion click
        //#region render
        render(className) {
            //#region Variables déclaration
            const form = this.form;
            //#endregion Variables déclaration
            if (!form.isBorderDialog) {
                super.render(className);
            }
        }
        //#endregion render
        //#endregion Methods
    }
    return WindowMaxRestoreButton;
    //#endregion Class WindowMaxRestoreButton
})();
//#endregion
//#region WindowHelpButton
const WindowHelpButton = (() => {
    //#region Class WindowHelpButton
    class WindowHelpButton extends WindowButton {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                this.toolTip = "Aide"; // à voir pour mettre en locale
                this.showToolTip = true;
                this.onClick.addListener(this.form.showHelp);
            }
        }
        //#endregion Constructor
    }
    return WindowHelpButton;
    //#endregion Class WindowHelpButton
})();
//#endregion
//#region WindowRollUpButton
const WindowRollUpDownButton = (() => {
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
    //#region Class WindowRollUpDownButton
    class WindowRollUpDownButton extends WindowButton {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                //#region Variables déclaration
                //#endregion Variables déclaration
                super(owner, props);
                const priv = internal(this);
                priv.isRolledUp = false;
                this.toolTip = "Taille minimale"; // à voir pour mettre en locale
                this.showToolTip = true;
            }
        }
        //#endregion Constructor
        //#region getters / setters
        //#region isRolledUp
        get isRolledUp() {
            return internal(this).isRolledUp;
        }
        set isRolledUp(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const isRolledUp = priv.isRolledUp;
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (isRolledUp !== newValue) {
                    priv.isRolledUp = newValue;
                }
                if (newValue) {
                    this.toolTip = "Taille précédente"; // à voir pour mettre en locale
                } else {
                    this.toolTip = "Taille minimale"; // à voir pour mettre en locale
                }
            }
        }
        //#endregion isRolledUp
        //#endregion getters / setters
        //#region Methods
        //#region click
        click() {
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                this.form.toogleRollUpDown();
            }
        }
        //#endregion click
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.isRolledUp = null;
        }
        //#endregion destroy
        //#region render
        render(className) {
            //#region Variables déclaration
            const form = this.form;
            //#endregion Variables déclaration
            if (!form.isBorderDialog) {
                super.render(className);
            }
        }
        //#endregion render
        //#endregion Methods
    }
    return WindowRollUpDownButton;
    //#endregion Class WindowRollUpDownButton
})();
//#endregion
//#region WindowStayOnButton
const WindowStayOnOffButton = (() => {
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
    //#region Class WindowStayOnOffButton
    class WindowStayOnOffButton extends WindowButton {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                //#region Variables déclaration
                //#endregion Variables déclaration
                super(owner, props);
                const priv = internal(this);
                priv.isStayOn = false;
                this.toolTip = "Epingler au dessus"; // à voir pour mettre en locale
                this.showToolTip = true;
            }
        }
        //#endregion Constructor
        //#region getters / setters
        //#region isStayOn
        get isStayOn() {
            return internal(this).isStayOn;
        }
        set isStayOn(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const isStayOn = priv.isStayOn;
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (isStayOn !== newValue) {
                    priv.isStayOn = newValue;
                }
                if (newValue) {
                    this.toolTip = "Ne pas épingler"; // à voir pour mettre en locale
                } else {
                    this.toolTip = "Epingler au dessus"; // à voir pour mettre en locale
                }
            }
        }
        //#endregion isStayOn
        //#endregion getters / setters
        //#region Methods
        //#region click
        click() {
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                this.form.toggleStay();
            }
        }
        //#endregion click
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.isStayOn = null;
        }
        //#endregion destroy
        //#region render
        render(className) {
            //#region Variables déclaration
            const form = this.form;
            //#endregion Variables déclaration
            if (!form.isBorderDialog) {
                super.render(className);
            }
        }
        //#endregion render
        //#endregion Methods
    }
    return WindowStayOnOffButton;
    //#endregion Class WindowStayOnOffButton
})();
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, WindowButton, WindowCloseButton, WindowMinimizeButton,
    WindowMaxRestoreButton, WindowHelpButton, WindowRollUpDownButton, WindowStayOnOffButton);
export {
    WindowButton, WindowCloseButton, WindowMinimizeButton, WindowMaxRestoreButton, WindowHelpButton,
    WindowRollUpDownButton, WindowStayOnOffButton
};
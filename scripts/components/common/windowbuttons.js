//#region Import
import { Button } from '/scripts/components/common/button.js';
import { Window } from '/scripts/components/containers/window.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region WindowButton
const WindowButton = (() => {
    //#region Class WindowButton
    class WindowButton extends Button {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.caption = String.EMPTY;
                props.canFocused = !1;
                props.forceDisplayVisibility = !0;
                props.fontFamily = core.types.CONSTANTS.BTNGLYPHFONTFACE;
                props.fontSizeUnit = core.types.CSSUNITS.PT;
                super(owner, props);
            }
        }
        //#endregion Constructor
        //#region Getters / Setters
        //#region visible
        get visible() {
            return super.visible;
        }
        set visible(newValue) {
            if (core.tools.isBool(newValue) && this.visible !== newValue) {
                super.visible = newValue;
                !core.isHTMLRenderer && this.form.alignButtons();
                this.owner.calcVisibleBtns();
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
        //#endregion Getters / Setters
    }
    return WindowButton;
    //#endregion Class WindowButton
})();
//#endregion WindowButton
//#region WindowCloseButton
const WindowCloseButton = (() => {
    //#region Class WindowCloseButton
    class WindowCloseButton extends WindowButton {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.modalResult = Window.MODALRESULTS.CANCEL;
                props.toolTip = 'Fermer'; // � voir pour mettre en locale
                props.showToolTip = !0;
                super(owner, props);
            }
        }
        //#endregion Constructor
        //#region Getters / Setters
        //#region visible
        get visible() {
            return super.visible;
        }
        set visible(newValue) {
            return;
        }
        //#endregion visible
        //#endregion Getters / Setters
    }
    return WindowCloseButton;
    //#endregion Class WindowCloseButton
})();
//#endregion WindowCloseButton
//#region WindowMinimizeButton
const WindowMinimizeButton = (() => {
    //#region Class WindowMinimizeButton
    class WindowMinimizeButton extends WindowButton {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.toolTip = 'Réduire'; // à voir pour mettre en locale
                props.showToolTip = !0;
                super(owner, props);
            }
        }
        //#endregion Constructor
        //#region Methods
        //#region click
        click() {
            this.form.toggleMinRestore();
        }
        //#endregion click
        //#region render
        render(className) {
            //#region Variables declaration
            const form = this.form;
            //#endregion Variables declaration
            !form.isBorderDialog && super.render(className);
        }
        //#endregion render
        //#endregion Methods
    }
    return WindowMinimizeButton;
    //#endregion Class WindowMinimizeButton
})();
//#endregion WindowMinimizeButton
//#region WindowMaximizeButton
const WindowMaxRestoreButton = (() => {
    //#region Class WindowMaxRestoreButton
    class WindowMaxRestoreButton extends WindowButton {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.toolTip = 'Agrandir'; // à voir pour mettre en locale
                props.showToolTip = !0;
                super(owner, props);
            }
        }
        //#endregion Constructor
        //#region Methods
        //#region click
        click() {
            this.form.toggleMaxRestore();
        }
        //#endregion click
        //#region render
        render(className) {
            //#region Variables déclaration
            const form = this.form;
            //#endregion Variables déclaration
            !form.isBorderDialog && super.render(className);
        }
        //#endregion render
        //#endregion Methods
    }
    return WindowMaxRestoreButton;
    //#endregion Class WindowMaxRestoreButton
})();
//#endregion WindowMaxRestoreButton
//#region WindowHelpButton
const WindowHelpButton = (() => {
    //#region Class WindowHelpButton
    class WindowHelpButton extends WindowButton {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.toolTip = 'Aide'; // à voir pour mettre en locale
                props.showToolTip = !0;
                super(owner, props);
                this.onClick.addListener(this.form.showHelp);
            }
        }
        //#endregion Constructor
    }
    return WindowHelpButton;
    //#endregion Class WindowHelpButton
})();
//#endregion WindowHelpButton
//#region Class WindowRollUpDownButton
class WindowRollUpDownButton extends WindowButton {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.toolTip = 'Taille minimale'; // à voir pour mettre en locale
            props.showToolTip = !0;
            super(owner, props);
            core.private(this, {
                isRolledUp: !1
            });
        }
    }
    //#endregion Constructor
    //#region getters / setters
    //#region isRolledUp
    get isRolledUp() {
        return core.private(this).isRolledUp;
    }
    set isRolledUp(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const isRolledUp = priv.isRolledUp;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue)) {
            isRolledUp !== newValue && (priv.isRolledUp = newValue);
            this.toolTip = newValue
                ? 'Taille précédente' // à voir pour mettre en locale
                : 'Taille minimale'; // à voir pour mettre en locale
        }
    }
    //#endregion isRolledUp
    //#endregion Getters / Setters
    //#region Methods
    //#region click
    click() {
        core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.form.toggleRollUpDown();
    }
    //#endregion click
    //#region render
    render(className) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        !form.isBorderDialog && super.render(className);
    }
    //#endregion render
    //#endregion Methods
}
//#endregion WindowRollUpDownButton
//#region Class WindowStayOnOffButton
class WindowStayOnOffButton extends WindowButton {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.toolTip = 'Epingler au dessus'; // à voir pour mettre en locale
            props.showToolTip = !0;
            super(owner, props);
            core.private(this, {
                isStayOn: !1
            });
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region isStayOn
    get isStayOn() {
        return core.private(this).isStayOn;
    }
    set isStayOn(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const isStayOn = priv.isStayOn;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue)) {
            isStayOn !== newValue && (priv.isStayOn = newValue);
            this.toolTip = newValue
                ? 'Ne pas épingler' // à voir pour mettre en locale
                : 'Epingler au dessus'; // à voir pour mettre en locale
        }
    }
    //#endregion isStayOn
    //#endregion Getters / Setters
    //#region Methods
    //#region click
    click() {
        core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.form.toggleStay();
    }
    //#endregion click
    //#region render
    render(className) {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        !form.isBorderDialog && super.render(className);
    }
    //#endregion render
    //#endregion Methods
}
//#endregion WindowStayOnOffButton
core.classes.register(core.types.CATEGORIES.INTERNAL, WindowButton, WindowCloseButton, WindowMinimizeButton,
    WindowMaxRestoreButton, WindowHelpButton, WindowRollUpDownButton, WindowStayOnOffButton);
export { WindowButton, WindowCloseButton, WindowMinimizeButton, WindowMaxRestoreButton, WindowHelpButton, WindowRollUpDownButton, WindowStayOnOffButton };
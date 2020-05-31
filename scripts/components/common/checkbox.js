//#region Imports
import { CaptionControl } from '/scripts/core/captioncontrol.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Imports
//#region CHECKBOXSTATES
/**
 * @type    {Object}        CHECKBOXSTATES
 */
const CHECKBOXSTATES = Object.seal(Object.freeze({
    UNCHECKED: 'unchecked',
    GRAYED: 'grayed',
    CHECKED: 'checked'
}));
//#endregion CHECKBOXSTATES
//#region Class Checkbox
class Checkbox extends CaptionControl {
    //#region CHECKBOXSTATES
    /**
     * @type    {Object}        CHECKBOXSTATES
     */
    static get CHECKBOXSTATES() {
        return CHECKBOXSTATES;
    }
    //#endregion
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        const htmlElements = core.types.HTMLELEMENTS;
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.autoCapture = props.hasOwnProperty('autoCapture') && core.tools.isBool(props.autoCapture)
                ? props.autoCapture : !0;
            props.canFocused = props.hasOwnProperty('canFocused') && core.tools.isBool(props.canFocused) ? props.canFocused : !0;
            props.hitTest = { mouseDown: !0, mouseUp: !0 };
            props.autoSize = props.hasOwnProperty('autoSize') && core.tools.isBool(props.autoSize) ? props.autoSize : !1;
            props.clipped = props.hasOwnProperty('clipped') && core.tools.isBool(props.clipped) ? props.clipped : !1;
            if (!core.isHTMLRenderer) {
                props.width = props.hasOwnProperty('width') && core.tools.isNumber(props.width) ? props.width : 120;
                props.height = props.hasOwnProperty('height') && core.tools.isNumber(props.height) ? props.height : 19;
            }
            super(owner, props);
            this.createEventsAndBind(['onChange'], props);
            core.private(this, {
                isChecked : props.hasOwnProperty('isChecked') ? props.isChecked : !1,
                autoWidth : props.hasOwnProperty('autoWidth') ? props.autoWidth : !0,
                allowGrayed : props.hasOwnProperty('allowGrayed') ? props.allowGrayed : !1,
                action : props.hasOwnProperty('action') ? props.action : null, // à voir
                check : document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}check`),
                input : document.createElement(htmlElements.INPUT)
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'state',
                enum: CHECKBOXSTATES,
                value: props.hasOwnProperty('state') ? props.state : CHECKBOXSTATES.UNCHECKED
            });
        }
    }
    //#endregion constructor
    //#region Getter / Setter
    //#region check
    get check() {
        return core.private(this).check;
    }
    //#endregion check
    //#region isChecked
    get isChecked() {
        return core.private(this).isChecked;
    }
    set isChecked(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue)) {
            if (priv.allowGrayed) {
                switch (priv.state) {
                    case CHECKBOXSTATES.UNCHECKED:
                        priv.state = CHECKBOXSTATES.GRAYED;
                        newValue = !1;
                        break;
                    case CHECKBOXSTATES.GRAYED:
                        priv.state = CHECKBOXSTATES.CHECKED;
                        newValue = !0;
                        break;
                    case CHECKBOXSTATES.CHECKED:
                        priv.state = CHECKBOXSTATES.UNCHECKED;
                        newValue = !1;
                        break;
                }
            }
            else if (newValue) {
                priv.state = CHECKBOXSTATES.CHECKED;
            }
            else {
                priv.state = CHECKBOXSTATES.UNCHECKED;
            }
            if (priv.isChecked !== newValue) {
                priv.isChecked = newValue;
                if (!this.loading && !this.form.loading) {
                    if (!core.isHTMLRenderer) {
                        this.allowUpdate && this.update();
                        this.redraw();
                    } else {
                        this.update();
                    }
                    !this.updating && this.onChange.invoke();
                }
            }
        }
    }
    //#endregion isChecked
    //#region allowGrayed
    get allowGrayed() {
        return core.private(this).allowGrayed;
    }
    set allowGrayed(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.allowGrayed !== newValue
            && (priv.allowGrayed = newValue);
    }
    //#endregion allowGrayed
    //#region action
    get action() {
        return core.private(this).action;
    }
    set action(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof Action && priv.action !== newValue) {
            priv.action instanceof Action && priv.action.unRegisterChanges(this);
            priv.action = newValue;
            priv.action.registerChanges(this);
            priv.action.updateTarget(this);
        }
    }
    //#endregion action
    //#region autoWidth
    get autoWidth() {
        return core.private(this).autoWidth;
    }
    set autoWidth(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.autoWidth !== newValue) {
            priv.autoWidth = newValue;
            this.update();
        }
    }
    //#endregion autoWidth
    //#endregion Getter / Setter
    //#region Methods
    //#region mouseDown
    mouseDown() {
        super.mouseDown();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
            this.pressing = !0;
            this.isPressed = !0;
        }
    }
    //#endregion mouseDown
    //#region mouseUp
    mouseUp() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.mouseUp();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.pressing) {
            this.pressing = !1;
            this.isPressed = !1;
            this.isChecked = !priv.isChecked;
            this.update();
        }
    }
    //#endregion mouseUp
    //#region keyUp
    keyUp() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.keyUp();
        if (core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_RETURN
            || core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE) {
            this.isChecked = !priv.isChecked;
            this.update();
        }
    }
    //#endregion keyUp
    //#region realign
    realign() { }
    //#endregion realign
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading) {
            super.update();
            if (priv.check) {
                priv.check.classList.remove('checked', 'grayed');
                if (priv.isChecked) {
                    priv.check.classList.add('checked');
                } else if (priv.allowGrayed && priv.state === CHECKBOXSTATES.GRAYED) {
                    priv.check.classList.add('grayed');
                }
            }
            if (priv.input) {
                if (priv.state) {
                    priv.state !== CHECKBOXSTATES.UNCHECKED
                        ? priv.input.setAttribute('checked', 'checked')
                        : priv.input.removeAttribute('checked');
                } else if (priv.isChecked) {
                    priv.input.setAttribute('checked', 'checked');
                } else {
                    priv.input.removeAttribute('checked');
                }
            }
            priv.autoWidth && this.HTMLElementStyle
                && (this.HTMLElementStyle.width = 'auto');
        }
    }
    //#endregion update
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.action && priv.action.removeTarget(this);
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!htmlElement.querySelector('input')) {
            priv.input.type = this instanceof core.classes.RadioButton ? 'radio' : 'checkbox';
            priv.input.classList.add('Control', `${this.constructor.name}Input`);
            priv.input.checked = priv.isChecked;
            priv.check.classList.add('Control', this.themeName, `${this.constructor.name}Check`);
            priv.isChecked && priv.check.classList.add('checked');
            priv.allowGrayed && priv.check.classList.add('grayed');
            htmlElement.appendChild(priv.input);
            htmlElement.appendChild(priv.check);
        }
        super.loaded();
    }
    //#endregion
    //#endregion Checkbox
}
core.classes.register(core.types.CATEGORIES.COMMON, Checkbox);
//#endregion Checkbox
//#region Templates
if (core.isHTMLRenderer) {
    const CheckboxTpl = ['<jagui-checkbox id="{internalId}" data-class="Checkbox" class="Control Checkbox {theme}">',
        '<properties>{ "name": "{name}", "height": 15 }</properties>{caption}</jagui-checkbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Checkbox, template: CheckboxTpl }]);
}
//#endregion
export { Checkbox };
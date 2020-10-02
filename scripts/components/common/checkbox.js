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
    //#region Private fields
    #checked;
    #autoWidth;
    #allowGrayed;
    #action;
    #check;
    #input;
    #state;
    //#endregion Private fields
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
            this.#checked = props.hasOwnProperty('checked') ? props.checked : !1;
            this.#autoWidth = props.hasOwnProperty('autoWidth') ? props.autoWidth : !0;
            this.#allowGrayed = props.hasOwnProperty('allowGrayed') ? props.allowGrayed : !1;
            this.#action = props.hasOwnProperty('action') ? props.action : null; // à voir
            this.#check = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}check`);
            this.#input = document.createElement(htmlElements.INPUT);
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'state',
                enum: CHECKBOXSTATES,
                value: props.hasOwnProperty('state') ? props.state : CHECKBOXSTATES.UNCHECKED
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region check
    get check() {
        return this.#check;
    }
    //#endregion check
    //#region checked
    get checked() {
        return this.#checked;
    }
    set checked(newValue) {
        if (core.tools.isBool(newValue)) {
            if (this.#allowGrayed) {
                switch (this.#state) {
                    case CHECKBOXSTATES.UNCHECKED:
                        this.#state = CHECKBOXSTATES.GRAYED;
                        newValue = !1;
                        break;
                    case CHECKBOXSTATES.GRAYED:
                        this.#state = CHECKBOXSTATES.CHECKED;
                        newValue = !0;
                        break;
                    case CHECKBOXSTATES.CHECKED:
                        this.#state = CHECKBOXSTATES.UNCHECKED;
                        newValue = !1;
                        break;
                }
            }
            else if (newValue) {
                this.#state = CHECKBOXSTATES.CHECKED;
            }
            else {
                this.#state = CHECKBOXSTATES.UNCHECKED;
            }
            if (this.#checked !== newValue) {
                this.#checked = newValue;
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
    //#endregion checked
    //#region allowGrayed
    get allowGrayed() {
        return this.#allowGrayed;
    }
    set allowGrayed(newValue) {
        core.tools.isBool(newValue) && this.#allowGrayed !== newValue
            && (this.#allowGrayed = newValue);
    }
    //#endregion allowGrayed
    //#region action
    get action() {
        return this.#action;
    }
    set action(newValue) {
        if (newValue instanceof Action && this.#action !== newValue) {
            this.#action instanceof Action && this.#action.unRegisterChanges(this);
            this.#action = newValue;
            this.#action.registerChanges(this);
            this.#action.updateTarget(this);
        }
    }
    //#endregion action
    //#region autoWidth
    get autoWidth() {
        return this.#autoWidth;
    }
    set autoWidth(newValue) {
        if (core.tools.isBool(newValue) && this.#autoWidth !== newValue) {
            this.#autoWidth = newValue;
            this.update();
        }
    }
    //#endregion autoWidth
    //#endregion Getters / Setters
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
        super.mouseUp();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.pressing) {
            this.pressing = !1;
            this.isPressed = !1;
            this.checked = !this.#checked;
            this.update();
        }
    }
    //#endregion mouseUp
    //#region keyUp
    keyUp() {
        super.keyUp();
        if (core.keyboard.key === Keyboard.VKEYSCODES.VK_ENTER
            || core.keyboard.key === Keyboard.VKEYSCODES.VK_SPACE) {
            this.checked = !this.#checked;
            this.update();
        }
    }
    //#endregion keyUp
    //#region realign
    realign() { }
    //#endregion realign
    //#region update
    update() {
        if (!this.loading && !this.form.loading) {
            super.update();
            if (this.#check) {
                this.#check.classList.remove('checked', 'grayed');
                if (this.#checked) {
                    this.#check.classList.add('checked');
                } else if (this.#allowGrayed && this.#state === CHECKBOXSTATES.GRAYED) {
                    this.#check.classList.add('grayed');
                }
            }
            if (this.#input) {
                if (this.#state) {
                    this.#state !== CHECKBOXSTATES.UNCHECKED
                        ? this.#input.setAttribute('checked', 'checked')
                        : this.#input.removeAttribute('checked');
                } else if (this.#checked) {
                    this.#input.setAttribute('checked', 'checked');
                } else {
                    this.#input.removeAttribute('checked');
                }
            }
            this.#autoWidth && this.HTMLElementStyle
                && (this.HTMLElementStyle.width = 'auto');
        }
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.#action && this.#action.removeTarget(this);
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.loaded();
        if (!htmlElement.querySelector('input')) {
            this.#input.type = this instanceof core.classes.RadioButton ? 'radio' : 'checkbox';
            this.#input.classList.add(`${this.constructor.name}Input`);
            this.#input.checked = this.#checked;
            this.#check.classList.add(this.themeName, `${this.constructor.name}Check`);
            this.#checked && this.#check.classList.add('checked');
            this.#allowGrayed && this.#check.classList.add('grayed');
            htmlElement.insertBefore(this.#check, htmlElement.firstChild);
            htmlElement.insertBefore(this.#input, htmlElement.firstChild);
        }
    }
    //#endregion
    //#endregion Checkbox
}
Object.defineProperties(Checkbox.prototype, {
    'checked': {
        enumerable: !0
    },
    'autoWidth': {
        enumerable: !0
    },
    'allowGrayed': {
        enumerable: !0
    },
    'action': {
        enumerable: !0
    }
});
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
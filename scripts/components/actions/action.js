//#region Imports
import { Bindable } from '/scripts/core/bindable.js';
//#endregion
//#region COMMANDS
const COMMANDS = {
    NONE: 'none',
    BACKCOLOR: 'backColor',
    BOLD: 'bold',
    CONTENTREADONLY: 'contentReadOnly',
    COPY: 'copy',
    CREATELINK: 'createLink',
    CUT: 'cut',
    DECREASEFONTSIZE: 'decreaseFontSize',
    DELETE: 'delete',
    ENABLEINLINETABLEEDITING: 'enableInlineTableEditing',
    ENABLEOBJECTRESIZING: 'enableObjectResizing',
    FONTNAME: 'fontName',
    FONTSIZE: 'fontSize',
    FORECOLOR: 'foreColor',
    FORMATBLOCK: 'formatBlock',
    FORWARDDELETE: 'forwardDelete',
    HEADING: 'heading',
    HILITECOLOR: 'hiliteColor',
    INCREASEFONTSIZE: 'increaseFontSize',
    INDENT: 'indent',
    INSERTBRONRETURN: 'insertBrOnReturn',
    INSERTHORIZONTALRULE: 'insertHorizontalRule',
    INSERTHTML: 'insertHTML',
    INSERTIMAGE: 'insertImage',
    INSERTORDEREDLIST: 'insertOrderedList',
    INSERTUNORDEREDLIST: 'insertUnorderedList',
    INSERTPARAGRAPH: 'insertParagraph',
    INSERTTEXT: 'insertText',
    ITALIC: 'italic',
    JUSTIFYCENTER: 'justifyCenter',
    JUSTIFYFULL: 'justifyFull',
    JUSTIFYLEFT: 'justifyLeft',
    JUSTIFYRIGHT: 'justifyRight',
    OUTDENT: 'outdent',
    PASTE: 'paste',
    REDO: 'redo',
    REMOVEFORMAT: 'removeFormat',
    SELECTALL: 'selectAll',
    STRIKETHROUGH: 'strikeThrough',
    SUBSCRIPT: 'subscript',
    SUPERSCRIPT: 'superscript',
    UNDERLINE: 'underline',
    UNDO: 'undo',
    UNLINK: 'unlink',
    USECSS: 'useCSS',
    STYLEWITHCSS: 'styleWithCSS'
}
Object.seal(Object.freeze(COMMANDS));
//#endregion COMMANDS
//#region Action
class Action extends Bindable {
    //#region Private fields
    #propertiesToUpdate = ['caption', 'checked', 'enabled', 'groupIndex', 'toolTip', 'imageIndex', 'shortCut', 'visible', 'autoCheck'];
    #caption;
    #checked;
    #enabled;
    #groupIndex;
    #toolTip;
    #imageIndex;
    #shortCut;
    #autoCheck;
    #targets = [];
    #visible;
    #form;
    #command;
    //#endregion Private fields
    /**
     * Create a new instance of Action.
     * @param    {object}    owner  Owner of the Action.
     * @param    {object}    props  Properties to initialize the Action.
     */
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            const form = owner.form;
            this.#caption = props.hasOwnProperty('caption') ? props.caption : String.EMPTY;
            this.#checked = props.hasOwnProperty('checked') && core.tools.isBool(props.checked) ? props.checked : !1;
            this.#enabled = props.hasOwnProperty('enabled') && core.tools.isBool(props.enabled) ? props.enabled : !0;
            this.#groupIndex = props.hasOwnProperty('groupIndex') && core.tools.isNumber(props.groupIndex) ? props.groupIndex : 0;
            this.#toolTip = props.hasOwnProperty('toolTip') ? props.toolTip : String.EMPTY;
            this.#imageIndex = props.hasOwnProperty('imageIndex') && core.tools.isNumber(props.imageIndex) ? props.imageIndex : -1;
            this.#shortCut = props.hasOwnProperty('shortCut') ? props.shortCut : String.EMPTY;
            this.#autoCheck = props.hasOwnProperty('autoCheck') && core.tools.isBool(props.autoCheck) ? props.autoCheck : !1;
            this.#visible = props.hasOwnProperty('visible') && core.tools.isBool(props.visible) ? props.visible : !0;
            this.#form = form;
            this.addPropertyEnum('command', COMMANDS);
            this.#command = props.hasOwnProperty('command') ? props.command : COMMANDS.NONE;
            this.createEventsAndBind(['onHint', 'onChange', 'onExecute', 'onUpdate'], props);
            if (props.hasOwnProperty('onExecute')) {
                if (form[props.onExecute]) {
                    this.onExecute.addListener(form[props.onExecute]);
                } else if (core.tools.isString(props.onExecute)) {
                    this.onExecute.addListener(new Function(props.onExecute));
                } else if (core.tools.isFunc(props.onExecute)) {
                    this.onExecute.addListener(props.onExecute);
                }
            }
        }
    }
    //#endregion constructor
    //#region Getter / Setters
    //#region command
    get command() {
        return this.#command;
    }
    set command(newValue) {
        core.tools.valueInSet(newValue, COMMANDS) && this.#command !== newValue && (this.#command = newValue);
    }
    //#endregion command
    //#region COMMANDS
    static get COMMANDS() {
        return COMMANDS;
    }
    //#endregion COMMANDS
    //#region targets
    get targets() {
        return this.#targets;
    }
    //#endregion targets
    //#region propertiesToUpdate
    get propertiesToUpdate() {
        return this.#propertiesToUpdate;
    }
    //#endregion propertiesToUpdate
    /**
     * @return  {String}    the caption property
     */
    //#region caption
    get caption() {
        return this.#caption;
    }
    /**
     * Set the caption property
     * @param   {String}    newValue    the new value
     */
    set caption(newValue) {
        if (core.tools.isString(newValue) && this.#caption !== newValue) {
            this.#caption = newValue;
            this.change();
        }
    }
    //#endregion caption
    /**
     * @return  {Boolean}   the checked property
     */
    //#region checked
    get checked() {
        return this.#checked;
    }
    /**
     * Set the checked property
     * @param   {String}    newValue    the new value
     */
    set checked(newValue) {
        if (core.tools.isBool(newValue) && this.#checked !== newValue) {
            this.#checked = newValue;
            this.change();
        }
    }
    //#endregion checked
    /**
     * @return  {Boolean}   the enabled property
     */
    //#region enabled
    get enabled() {
        return this.#enabled;
    }
    /**
     * Set the enabled property
     * @param   {String}    newValue    the new value
     */
    set enabled(newValue) {
        if (core.tools.isBool(newValue) && this.#enabled !== newValue) {
            this.#enabled = newValue;
            this.change();
        }
    }
    //#endregion enabled
    /**
     * @return  {Number}    the groupIndex property
     */
    //#region groupIndex
    get groupIndex() {
        return this.#groupIndex;
    }
    /**
     * Set the groupIndex property
     * @param   {String}    newValue    the new value
     */
    set groupIndex(newValue) {
        if (core.tools.isNumber(newValue) && this.#groupIndex !== newValue) {
            this.#groupIndex = newValue;
            this.change();
        }
    }
    //#endregion groupIndex
    /**
     * @return  {String}    the toolTip property
     */
    //#region toolTip
    get toolTip() {
        return this.#toolTip;
    }
    /**
     * Set the toolTip property
     * @param   {String}    newValue    the new value
     */
    set toolTip(newValue) {
        if (core.tools.isString(newValue) && this.#toolTip !== newValue) {
            this.#toolTip = newValue;
            this.change();
        }
    }
    //#endregion toolTip
    /**
     * @return  {Number}    the imageIndex property
     */
    //#region imageIndex
    get imageIndex() {
        return this.#imageIndex;
    }
    /**
     * Set the imageIndex property
     * @param   {String}    newValue    the new value
     */
    set imageIndex(newValue) {
        if (core.tools.isNumber(newValue) && this.#imageIndex !== newValue) {
            this.#imageIndex = newValue;
            this.change();
        }
    }
    //#endregion imageIndex
    /**
     * @return  {String}    the shortCut property
     */
    //#region shortCut
    get shortCut() {
        return this.#shortCut;
    }
    /**
     * Set the shortCut property
     * @param   {String}    newValue    the new value
     */
    set shortCut(newValue) {
        if (core.tools.isString(newValue) && this.#shortCut !== newValue) {
            this.#shortCut = newValue;
            this.change();
        }
    }
    //#endregion shortCut
    /**
     * @return  {Boolean}   the autoCheck property
     */
    //#region autoCheck
    get autoCheck() {
        return this.#autoCheck;
    }
    /**
     * Set the autoCheck property
     * @param   {String}    newValue    the new value
     */
    set autoCheck(newValue) {
        if (core.tools.isBool(newValue) && this.#autoCheck !== newValue) {
            this.#autoCheck = newValue;
            this.change();
        }
    }
    //#endregion autoCheck
    /**
     * @return  {Boolean}   the visible property
     */
    //#region visible
    get visible() {
        return this.#visible;
    }
    /**
     * Set the visible property
     * @param   {String}    newValue    the new value
     */
    set visible(newValue) {
        if (core.tools.isBool(newValue) && this.#visible !== newValue) {
            this.#visible = newValue;
            this.change();
        }
    }
    //#endregion visible
    //#region form
    get form() {
        return this.#form;
    }
    //#endregion
    //#endregion Getter / Setter
    //#region Methods
    /**
     * Execute all events associated with the Action
     */
    //#region execute
    execute() {
        this.onExecute.invoke();
    }
    //#endregion execute
    /**
     * Register a component to update when Action is updated
     * @param   {Component} component   the component to register
     */
    //#region registerChanges
    registerChanges(component) {
        //#region Variables déclaration
        const targets = this.#targets;
        //#endregion Variables déclaration
        if (targets.indexOf(component) === -1) {
            targets.push(component);
            this.updateTarget(component);
        }
    }
    //#endregion registerChanges
    /**
     * Unregister a component
     * @param   {Component} component   the component to unregister
     */
    //#region unRegisterChanges
    unRegisterChanges(component) {
        //#region Variables déclaration
        const targets = this.#targets;
        //#endregion Variables déclaration
        targets.indexOf(component) > -1 && targets.remove(component);
    }
    //#endregion unRegisterChanges
    /**
     * Update all components registered
     * @param   {HTMLElement}   target  the HTMLElement to update
     */
    //#region updateTarget
    updateTarget(target) {
        this.#propertiesToUpdate.forEach(prop => {
            target.properties.some(e => e.property === prop) && (target[prop] = this[prop]);
        });
    }
    //#endregion updateTarget
    /**
     * A property has changed, call updateTarget
     */
    //#region change
    change() {
        this.#targets.forEach(target => {
            this.updateTarget(target);
        });
    }
    //#endregion change
    /**
     * Destroy all properties of the instance
     * @override
     */
    //#region destroy
    destroy() {
        this.#targets.forEach(target => {
            target.action = null;
        });
        targets.clear();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
//#endregion Action
Object.defineProperties(Action.prototype, {
    'caption': {
        enumerable: !0
    },
    'checked': {
        enumerable: !0
    },
    'enabled': {
        enumerable: !0
    },
    'groupIndex': {
        enumerable: !0
    },
    'toolTip': {
        enumerable: !0
    },
    'imageIndex': {
        enumerable: !0
    },
    'shortCut': {
        enumerable: !0
    },
    'autoCheck': {
        enumerable: !0
    },
    'visible': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.ACTIONS, Action);
export { Action };
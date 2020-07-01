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
            core.private(this, {
                propertiesToUpdate: ['caption', 'checked', 'enabled', 'groupIndex', 'hint', 'imageIndex', 'shortCut', 'visible', 'autoCheck'],
                caption: props.hasOwnProperty('caption') ? props.caption : String.EMPTY,
                checked: props.hasOwnProperty('checked') && core.tools.isBool(props.checked) ? props.checked : !1,
                enabled: props.hasOwnProperty('enabled') && core.tools.isBool(props.enabled) ? props.enabled : !0,
                groupIndex: props.hasOwnProperty('groupIndex') && core.tools.isNumber(props.groupIndex) ? props.groupIndex : 0,
                hint: props.hasOwnProperty('hint') ? props.hint : String.EMPTY,
                imageIndex: props.hasOwnProperty('imageIndex') && core.tools.isNumber(props.imageIndex) ? props.imageIndex : -1,
                shortCut: props.hasOwnProperty('shortCut') ? props.shortCut : String.EMPTY,
                autoCheck: props.hasOwnProperty('autoCheck') && core.tools.isBool(props.autoCheck) ? props.autoCheck : !1,
                targets: [],
                visible: props.hasOwnProperty('visible') && core.tools.isBool(props.visible) ? props.visible : !0
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'command',
                enum: COMMANDS,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, COMMANDS) && priv.command !== newValue) {
                        priv.command = newValue;
                    }
                },
                value: props.hasOwnProperty('command') ? props.command : COMMANDS.NONE
            });
            const form = owner.form;
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
    static get COMMANDS() {
        return COMMANDS;
    }
    //#region targets
    get targets() {
        return core.private(this).targets;
    }
    //#endregion targets
    //#region propertiesToUpdate
    get propertiesToUpdate() {
        return core.private(this).propertiesToUpdate;
    }
    //#endregion propertiesToUpdate
    /**
     * @return  {String}    the caption property
     */
    //#region caption
    get caption() {
        return core.private(this).caption;
    }
    /**
     * Set the caption property
     * @param   {String}    newValue    the new value
     */
    set caption(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue)) {
            if (priv.caption !== newValue) {
                priv.caption = newValue;
                this.change();
            }
        }
    }
    //#endregion caption
    /**
     * @return  {Boolean}   the checked property
     */
    //#region checked
    get checked() {
        return core.private(this).checked;
    }
    /**
     * Set the checked property
     * @param   {String}    newValue    the new value
     */
    set checked(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue)) {
            if (priv.checked !== newValue) {
                priv.checked = newValue;
                this.change();
            }
        }
    }
    //#endregion checked
    /**
     * @return  {Boolean}   the enabled property
     */
    //#region enabled
    get enabled() {
        return core.private(this).enabled;
    }
    /**
     * Set the enabled property
     * @param   {String}    newValue    the new value
     */
    set enabled(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue)) {
            if (priv.enabled !== newValue) {
                priv.enabled = newValue;
                this.change();
            }
        }
    }
    //#endregion enabled
    /**
     * @return  {Number}    the groupIndex property
     */
    //#region groupIndex
    get groupIndex() {
        return core.private(this).groupIndex;
    }
    /**
     * Set the groupIndex property
     * @param   {String}    newValue    the new value
     */
    set groupIndex(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue)) {
            if (priv.groupIndex !== newValue) {
                priv.groupIndex = newValue;
                this.change();
            }
        }
    }
    //#endregion groupIndex
    /**
     * @return  {String}    the hint property
     */
    //#region hint
    get hint() {
        return core.private(this).hint;
    }
    /**
     * Set the hint property
     * @param   {String}    newValue    the new value
     */
    set hint(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue)) {
            if (priv.hint !== newValue) {
                priv.hint = newValue;
                this.change();
            }
        }
    }
    //#endregion hint
    /**
     * @return  {Number}    the imageIndex property
     */
    //#region imageIndex
    get imageIndex() {
        return core.private(this).imageIndex;
    }
    /**
     * Set the imageIndex property
     * @param   {String}    newValue    the new value
     */
    set imageIndex(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue)) {
            if (priv.imageIndex !== newValue) {
                priv.imageIndex = newValue;
                this.change();
            }
        }
    }
    //#endregion imageIndex
    /**
     * @return  {String}    the shortCut property
     */
    //#region shortCut
    get shortCut() {
        return core.private(this).shortCut;
    }
    /**
     * Set the shortCut property
     * @param   {String}    newValue    the new value
     */
    set shortCut(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue)) {
            if (priv.shortCut !== newValue) {
                priv.shortCut = newValue;
                this.change();
            }
        }
    }
    //#endregion shortCut
    /**
     * @return  {Boolean}   the autoCheck property
     */
    //#region autoCheck
    get autoCheck() {
        return core.private(this).autoCheck;
    }
    /**
     * Set the autoCheck property
     * @param   {String}    newValue    the new value
     */
    set autoCheck(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue)) {
            if (priv.autoCheck !== newValue) {
                priv.autoCheck = newValue;
                this.change();
            }
        }
    }
    //#endregion autoCheck
    /**
     * @return  {Boolean}   the visible property
     */
    //#region visible
    get visible() {
        return core.private(this).visible;
    }
    /**
     * Set the visible property
     * @param   {String}    newValue    the new value
     */
    set visible(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue)) {
            if (priv.visible !== newValue) {
                priv.visible = newValue;
                this.change();
            }
        }
    }
    //#endregion visible
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
        const targets = this.targets;
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
        const targets = this.targets;
        //#endregion Variables déclaration
        if (targets.indexOf(component) > -1) {
            targets.remove(component);
        }
    }
    //#endregion unRegisterChanges
    /**
     * Update all components registered
     * @param   {HTMLElement}   target  the HTMLElement to update
     */
    //#region updateTarget
    updateTarget(target) {
        this.propertiesToUpdate.forEach(prop => {
            if (target.hasOwnProperty(prop)) {
                target[prop.firstCharUpper()] = this[prop];
            }
        });
    }
    //#endregion updateTarget
    /**
     * A property has changed, call updateTarget
     */
    //#region change
    change() {
        this.targets.forEach(target => {
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
        this.targets.forEach(target => {
            target.action = null;
        });
        targets.clear();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
//#endregion Action
core.classes.register(core.types.CATEGORIES.ACTIONS, Action);
export { Action };
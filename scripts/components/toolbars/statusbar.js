//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion Import
//#region BEVELS
/**
 * @type    {Object}        BEVELS
 */
const BEVELS = Object.freeze(Object.seal({
    LOWERED: 'lowered',
    NONE: 'none',
    RAISED: 'raised',
    SINGLE: 'single'
}));
//#endregion BEVELS
//#region Class StatusBarPanel
class StatusBarPanel extends BaseClass {
    //#region Private fields
    #html;
    #owner;
    #text;
    #width;
    #autoToolTip;
    #alignment;
    #bevel;
    //#endregion Private fields
    //#region BEVELS
    /**
     * @type    {Object}        BEVELS
     */
    static get BEVELS() {
        return BEVELS;
    }
    //#endregion BEVELS
    //#region constructor
    constructor(owner, props) {
        super(owner, props);
        props = !props ? {} : props;
        if (owner) {
            this.#html = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`);
            this.#owner = owner;
            this.#text = props.hasOwnProperty('text') ? props.text : String.EMPTY;
            this.#width = props.hasOwnProperty('width') && core.tools.isNumber(props.width) ? props.width : 50;
            this.#autoToolTip = props.hasOwnProperty('autoToolTip') && core.tools.isBool(props.autoToolTip) ? props.autoToolTip : !0;
            this.#html.classList.add('StatusBarPanel', owner.app.themeManifest.themeName);
            owner.HTMLElement.appendChild(this.#html);
            this.#alignment = props.hasOwnProperty('alignment') ? props.alignment : core.types.TEXTALIGNS.LEFT;
            this.addPropertyEnum('alignment', core.types.TEXTALIGNS);
            this.#bevel = props.hasOwnProperty('bevel') ? props.bevel : BEVELS.LOWERED;
            this.addPropertyEnum('bevel', BEVELS);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region alignment
    get alignment() {
        return this.#alignment;
    }
    set alignment(newValue) {
        if (core.tools.valueInSet(newValue, core.types.TEXTALIGNS) && this.#alignment !== newValue) {
            this.#alignment = newValue;
            this.update();
            this.#owner.panels.onChange.hasListener && this.#owner.panels.onChange.invoke();
        }
    }
    //#endregion alignment
    //#region bevel
    get bevel() {
        return this.#bevel;
    }
    set bevel(newValue) {
        if (core.core.tools.valueInSet(newValue, BEVELS) && this.#bevel !== newValue) {
            this.#bevel = newValue;
            this.update();
            this.#owner.panels.onChange.hasListener && this.#owner.panels.onChange.invoke();
        }
    }
    //#endregion bevel
    //#region html
    get html() {
        return this.#html;
    }
    //#endregion html
    //#region text
    get text() {
        return this.#text;
    }
    set text(newValue) {
        if (core.tools.isString(newValue) && this.#text !== newValue) {
            this.#text = newValue;
            this.update();
            this.#owner.panels.onChange.hasListener && this.#owner.panels.onChange.invoke();
        }
    }
    //#endregion text
    //#region autoToolTip
    get autoToolTip() {
        return this.#autoToolTip;
    }
    set autoToolTip(newValue) {
        core.tools.isBool(newValue) && this.#autoToolTip !== newValue && (this.#autoToolTip = newValue);
    }
    //#endregion width
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const html = this.#html;
        //#endregion Variables déclaration
        if (html) {
            const style = html.style;
            style.textAlign = this.#alignment;
            html.innerHTML = this.#text;
            this.#owner.panels.last !== this && (style.width = `${this.#width}${core.types.CSSUNITS.PX}`);
            this.#html.classList.remove('none', 'lowered', 'raised', 'single');
            this.#html.classList.add(this.#bevel);
        }
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.#alignment = null;
        this.#bevel = null;
        this.#text = null;
        this.#width = null;
        this.#html && this.#html.parentNode.remove(this.#html);
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(StatusBarPanel.prototype, {
    'text': {
        enumerable: !0
    },
    'width': {
        enumerable: !0
    }
});
//#endregion StatusBarPanel
//#region Class StatusBar
class StatusBar extends ThemedControl {
    //#region Private fields
    #panels = [];
    #autoHint;
    #simplePanel;
    #simpleText;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            owner === owner.form.content && (owner = owner.form.layout);
            !core.isHTMLRenderer && (props.height = 19);
            super(owner, props);
            this.#autoHint = props.hasOwnProperty('autoHint') && core.tools.isBool(props.autoHint) ? props.autoHint : !1;
            this.#simplePanel = props.hasOwnProperty('simplePanel') && core.tools.isBool(props.simplePanel) ? props.simplePanel : !1;
            this.#simpleText = props.hasOwnProperty('simpleText') ? props.simpleText : String.EMPTY;
            this.align = props.hasOwnProperty('align') ? props.alignment : core.types.ALIGNS.MOSTBOTTOM;
            this.#panels.convertToCollection(owner, StatusBarPanel);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region panels
    get panels() {
        return this.#panels;
    }
    //#endregion panels
    //#region autoHint
    get autoHint() {
        return this.#autoHint;
    }
    set autoHint(newValue) {
        core.tools.isBool(newValue) && this.#autoHint !== newValue && (this.#autoHint = newValue);
    }
    //#endregion autoHint
    //#region simplePanel
    get simplePanel() {
        return this.#simplePanel;
    }
    set simplePanel(newValue) {
        //#region Variables déclaration
        const DISPLAYS = core.types.DISPLAYS;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#simplePanel !== newValue) {
            this.#simplePanel = newValue;
            this.#simplePanel.style.display = DISPLAYS.NONE;
            this.#simplePanel && (this.#simplePanel.style.display = DISPLAYS.BLOCK);
            this.#panels.forEach(panel => {
                const style = panel.html.style;
                style.display = this.#simplePanel ? DISPLAYS.NONE : DISPLAYS.BLOCK;
            });
        }
    }
    //#endregion simplePanel
    //#region simpleText
    get simpleText() {
        return this.#simplePanel;
    }
    set simpleText(newValue) {
        if (core.tools.isString(newValue) && this.#simpleText !== newValue) {
            this.#simpleText = newValue;
            this.#simplePanel.innerHTML = this.#simpleText;
        }
    }
    //#endregion simpleText
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const resizer = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}resizer`);
        //#endregion Variables déclaration
        if (!htmlElement.querySelector('.StatusBarSimplePanel')) {
            this.#simplePanel = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}simplepanel`);
            this.#simplePanel.classList.add('Control', 'StatusBarSimplePanel', this.themeName, 'hidden');
            htmlElement.appendChild(this.#simplePanel);
            resizer.classList.add('StatusBarSizer', this.themeName, 'csr_nwResize');
            htmlElement.appendChild(resizer);
            let props = htmlElement.querySelector('properties');
            props && (props = JSON.parse(props.innerText));
            if (props.hasOwnProperty('panels') && Array.isArray(props.panels)) {
                props.panels.forEach(panel => {
                    this.#panels.push(new StatusBarPanel(this, panel));
                    this.#panels.last.update();
                });
            }
        }
        super.loaded();
        this.#panels.onChange.addListener(this.alignPanels);
        !this.form.statusBar && this.owner === this.form.layout && this.form.statusBars.indexOf(this) === -1
            && this.form.statusBars.push(this);
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        while (this.#panels.length > 0) {
            const panel = this.#panels.pop();
            panel.destroy();
        }
        this.#simplePanel && this.#simplePanel.parentNode.remove(this.#simplePanel);
        this.#panels.clear();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(StatusBar.prototype, {
    'autoHint': {
        enumerable: !0
    },
    'simplePanel': {
        enumerable: !0
    },
    'simpleText': {
        enumerable: !0
    }
});
Object.seal(StatusBar);
core.classes.register(core.types.CATEGORIES.INTERNAL, StatusBarPanel);
core.classes.register(core.types.CATEGORIES.TOOLBARS, StatusBar);
//#endregion StatusBar
//#region Templates
if (core.isHTMLRenderer) {
    const StatusBarTpl = ['<jagui-statusbar id="{internalId}" data-class="StatusBar" class="Control StatusBar {theme}">',
        '<properties>{ "name": "{name}" }</properties></jagui-statusbar>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: StatusBar, template: StatusBarTpl }]);
}
//#endregion
export { StatusBarPanel, StatusBar };
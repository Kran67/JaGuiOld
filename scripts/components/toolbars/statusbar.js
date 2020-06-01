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
            const priv = core.private(this, {
                html: document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`),
                owner,
                text: props.hasOwnProperty('text') ? props.text : String.EMPTY,
                width: props.hasOwnProperty('width') ? props.width : 50
            });
            priv.html.classList.add('StatusBarPanel', owner.app.themeManifest.themeName);
            owner.HTMLElement.appendChild(priv.html);
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'alignment',
                enum: core.types.TEXTALIGNS,
                value: props.hasOwnProperty('alignment') ? props.alignment : core.types.TEXTALIGNS.LEFT,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, core.types.TEXTALIGNS) && priv.alignment !== newValue) {
                        priv.alignment = newValue;
                        this.update();
                        priv.owner.panels.onChange.hasListener && priv.owner.panels.onChange.invoke();
                    }
                }
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'bevel',
                enum: BEVELS,
                value: props.hasOwnProperty('bevel') ? props.bevel : BEVELS.LOWERED,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    //#endregion Variables déclaration
                    if (core.core.tools.valueInSet(newValue, BEVELS) && priv.bevel !== newValue) {
                        priv.bevel = newValue;
                        this.update();
                        priv.owner.panels.onChange.hasListener && priv.owner.panels.onChange.invoke();
                    }
                }
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region html
    get html() {
        return core.private(this).html;
    }
    //#endregion html
    //#region text
    get text() {
        return core.private(this).text;
    }
    set text(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.text !== newValue) {
            priv.text = newValue;
            this.update();
            priv.owner.panels.onChange.hasListener && priv.owner.panels.onChange.invoke();
        }
    }
    //#endregion text
    //#region width
    get width() {
        return core.private(this).width;
    }
    set width(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.width !== newValue) {
            priv.width = newValue;
            this.update();
            priv.owner.panels.onChange.hasListener && priv.owner.panels.onChange.invoke();
        }
    }
    //#endregion width
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const html = priv.html;
        //#endregion Variables déclaration
        if (html) {
            const style = html.style;
            style.textAlign = priv.alignment;
            html.innerHTML = priv.text;
            priv.owner.panels.last !== this && (style.width = `${priv.width}${core.types.CSSUNITS.PX}`);
            priv.html.classList.remove('none', 'lowered', 'raised', 'single');
            priv.html.classList.add(priv.bevel);
        }
    }
    //#endregion update
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.alignment = null;
        priv.bevel = null;
        priv.text = null;
        priv.width = null;
        priv.html && priv.html.parentNode.remove(priv.html);
    }
    //#endregion destroy
    //#endregion Methods
}
//#endregion StatusBarPanel
//#region Class StatusBar
class StatusBar extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            owner === owner.form.content && (owner = owner.form.layout);
            !core.isHTMLRenderer && (props.height = 19);
            super(owner, props);
            core.private(this, {
                simplePanel: null,
                autoHint: props.hasOwnProperty('autoHint') ? props.autoHint : !1,
                simplePanel: props.hasOwnProperty('simplePanel') ? props.simplePanel : !1,
                simpleText: props.hasOwnProperty('simpleText') ? props.simpleText : String.EMPTY
            });
            this.align = props.hasOwnProperty('align') ? props.alignment : core.types.ALIGNS.MOSTBOTTOM;
            core.classes.newCollection(this, this, StatusBarPanel, 'panels');
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region autoHint
    get autoHint() {
        return core.private(this).autoHint;
    }
    set autoHint(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.autoHint !== newValue && (priv.autoHint = newValue);
    }
    //#endregion autoHint
    //#region simplePanel
    get simplePanel() {
        return core.private(this).simplePanel;
    }
    set simplePanel(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const DISPLAYS = core.types.DISPLAYS;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.simplePanel !== newValue) {
            priv.simplePanel = newValue;
            priv.simplePanel.style.display = DISPLAYS.NONE;
            priv.simplePanel && (priv.simplePanel.style.display = DISPLAYS.BLOCK);
            priv.panels.forEach(panel => {
                const style = panel.html.style;
                style.display = priv.simplePanel ? DISPLAYS.NONE : DISPLAYS.BLOCK;
            });
        }
    }
    //#endregion simplePanel
    //#region simpleText
    get simpleText() {
        return core.private(this).simplePanel;
    }
    set simpleText(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.simpleText !== newValue) {
            priv.simpleText = newValue;
            priv.simplePanel.innerHTML = priv.simpleText;
        }
    }
    //#endregion simpleText
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const resizer = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}resizer`);
        //#endregion Variables déclaration
        if (!htmlElement.querySelector('.StatusBarSimplePanel')) {
            priv.simplePanel = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}simplepanel`);
            priv.simplePanel.classList.add('Control', 'StatusBarSimplePanel', this.themeName, 'hidden');
            htmlElement.appendChild(priv.simplePanel);
            resizer.classList.add('Control', 'StatusBarSizer', this.themeName, 'csr_nwResize');
            htmlElement.appendChild(resizer);
            let props = htmlElement.querySelector('properties');
            props && (props = JSON.parse(props.innerText));
            if (props.hasOwnProperty('panels') && Array.isArray(props.panels)) {
                props.panels.forEach(panel => {
                    this.panels.push(new StatusBarPanel(this, panel));
                    this.panels.last.update();
                });
            }
        }
        super.loaded();
        this.panels.onChange.addListener(this.alignPanels);
        !this.form.statusBar && this.owner === this.form.layout && this.form.statusBars.indexOf(this) === -1
            && this.form.statusBars.push(this);
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        while (this.panels.length > 0) {
            const panel = this.panels.pop();
            panel.destroy();
        }
        priv.simplePanel && priv.simplePanel.parentNode.remove(priv.simplePanel);
        this.panels.clear();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
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
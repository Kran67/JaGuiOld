﻿//#region Imports
import { Checkbox } from '/scripts/components/common/checkbox.js';
//#endregion Imports
//#region Class PathCheckbox
class PathCheckbox extends Checkbox {
    //#region Private fields
    #checkSvg;
    #svgViewBox;
    //#endregion Private fields
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            if (!core.isHTMLRenderer) {
                props.height = 17;
                props.width = 100;
            }
            props.canFocused = !1;
            super(owner, props);
            this.#checkSvg = props.hasOwnProperty('checkSvg')
                    ? atob(props.checkSvg) : 'm49.568024,19.824736l-31.863983,29.73797l-17.705017,-16.521305l0,-19.824999l17.705017,16.469412l31.863983,-29.686078l0,19.825z';
            this.#svgViewBox = props.hasOwnProperty('svgViewBox') ? props.svgViewBox : '0 0 50 50';
            delete this.tabOrder;
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region svgViewBox
    get svgViewBox() {
        return this.#svgViewBox;
    }
    set svgViewBox(newValue) {
        if (core.tools.isString(newValue) && this.#svgViewBox !== newValue) {
            this.#svgViewBox = newValue;
            this.updateCSSProperties();
        }
    }
    //#endregion svgViewBox
    //#region checkSvg
    get checkSvg() {
        return this.#checkSvg;
    }
    set checkSvg(newValue) {
        if (core.tools.isString(newValue) && newValue !== this.#checkSvg) {
            this.#checkSvg = newValue;
            core.isHTMLRenderer && this.addCheckedRule();
        }
    }
    //#endregion checkSvg
    //#region allowGrayed
    get allowGrayed() {
        return super.allowGrayed;
    }
    set allowGrayed(newValue) {
        super.allowGrayed = !1;
    }
    //#endregion allowGrayed
    //#endregion Getters / Setters
    //#region Methods
    //#region updateCSSProperties
    update() {
        if (!this.loading && !this.form.loading) {
            super.update();
            this.check.innerHTML = [`<svg width="100%" height="100%" viewBox="${this.#svgViewBox}"`,
                ' xmlns="http://www.w3.org/2000/svg">',
            `<path d="${this.#checkSvg}" /></svg>`].join(String.EMPTY);
            this.check.style.opacity = 0.2;
            this.checked && (this.check.style.opacity = 1);
        }
    }
    //#endregion updateCSSProperties
    //#endregion Methods
}
Object.defineProperties(PathCheckbox.prototype, {
    'checkSvg': {
        enumerable: !0
    },
    'svgViewBox': {
        enumerable: !0
    }
});
Object.seal(PathCheckbox);
core.classes.register(core.types.CATEGORIES.EXTENDED, PathCheckbox);
//#endregion PathCheckbox
//#region Template
if (core.isHTMLRenderer) {
    const PathCheckboxTpl = ['<jagui-pathcheckbox id="{internalId}" data-class="PathCheckbox" class="Control PathCheckbox {theme}"><properties>',
        '{ "name": "{name}", "caption": "{caption}" }</properties></jagui-pathcheckbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: PathCheckbox, template: PathCheckboxTpl }]);
}
//#endregion
export { PathCheckbox };
//#region Imports
import { Checkbox } from "/scripts/components/common/checkbox.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Imports
//#region PathCheckbox
const PathCheckbox = (() => {
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
    //#region Class PathCheckbox
    class PathCheckbox extends Checkbox {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                if (!Core.isHTMLRenderer) {
                    this.height = 17;
                    this.width = 100;
                }
                priv.checkSvg = props.hasOwnProperty("checkSvg") ? atob(props.checkSvg) : "m49.568024,19.824736l-31.863983,29.73797l-17.705017,-16.521305l0,-19.824999l17.705017,16.469412l31.863983,-29.686078l0,19.825z";
                priv.svgViewBox = props.hasOwnProperty("svgViewBox") ? props.svgViewBox : "0 0 50 50";
                this.canFocused = false;
                delete this.tabOrder;
            }
        }
        //#endregion Constructor
        //#region Getters / Setters
        //#region svgViewBox
        get svgViewBox() {
            return internal(this).svgViewBox;
        }
        set svgViewBox(newValue) {
            if (Tools.isString(newValue)) {
                if (priv.svgViewBox !== newValue) {
                    priv.svgViewBox = newValue;
                    this.updateCSSProperties();
                }
            }
        }
        //#endregion svgViewBox
        //#region checkSvg
        get checkSvg() {
            return internal(this).checkSvg;
        }
        set checkSvg(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (newValue !== priv.checkSvg) {
                    priv.checkSvg = newValue;
                    if (Core.isHTMLRenderer) {
                        this.addCheckedRule();
                    }
                }
            }
        }
        //#endregion checkSvg
        //#region allowGrayed
        get allowGrayed() {
            return super.allowGrayed;
        }
        set allowGrayed(newValue) {
            super.allowGrayed = false;
        }
        //#endregion allowGrayed
        //#endregion Getters / Setters
        //#region Methods
        //#region updateCSSProperties
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                super.update();
                this.check.innerHTML = `<svg width='100%' height='100%' viewBox='${priv.svgViewBox}' xmlns='http://www.w3.org/2000/svg'><path d='${priv.checkSvg}' /></svg>`;
                this.check.style.opacity = 0.2;
                if (this.isChecked) {
                    this.check.style.opacity = 1;
                }
            }
        }
        //#endregion updateCSSProperties
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.checkSvg = null;
            priv.svgViewBox = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return PathCheckbox;
    //#endregion
})();
//#endregion PathCheckbox
Core.classes.register(Types.CATEGORIES.EXTENDED, PathCheckbox);
export { PathCheckbox };
//#region Template
if (Core.isHTMLRenderer) {
    var PathCheckboxTpl = ["<jagui-pathcheckbox id=\"{internalId}\" data-class=\"PathCheckbox\" class=\"Control PathCheckbox {theme}\"><properties>",
        "{ \"name\": \"{name}\", \"caption\": \"{caption}\" }</properties></jagui-pathcheckbox>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: PathCheckbox, template: PathCheckboxTpl }]);
}
//#endregion
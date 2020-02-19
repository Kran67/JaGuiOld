//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region ToolBar
const ToolBar = (() => {
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
    //#region Class ToolBar
    class ToolBar extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                if (owner === owner.form.content) {
                    owner = owner.form.layout;
                }
                const priv = internal(this);
                this.align = Types.ALIGNS.MOSTTOP;
                if (!Core.isHTMLRenderer) {
                    this.height = 29;
                }
                priv.images = props.hasOwnProperty('images') && this.form.hasOwnProperty(props.images) ? this.form[props.images] : null;
                priv.showCaption = props.hasOwnProperty('showCaption') && Tools.isBool(props.showCaption) ? props.showCaption : true;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region showCaption
        get showCaption() {
            return internal(this).showCaption;
        }
        set showCaption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.showCaption !== newValue) {
                    priv.showCaption = newValue;
                    htmlElement.classList.remove('nocaption');
                    if (!priv.showCaption) {
                        htmlElement.classList.add('nocaption');
                    }
                    this.updateToolButtons();
                }
            }
        }
        //#endregion showCaption
        //#region images
        get images() {
            return internal(this).images;
        }
        set images(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.ImageList) {
                if (priv.images !== newValue) {
                    priv.images = newValue;
                    this.updateToolButtons();
                }
            }
        }
        //#endregion images
        //#endregion Getters / Setters
        //#region Methods
        loaded() {
            this.getImages();
            super.loaded();
            this.updateToolButtons();
            if (this.owner === this.form.layout) {
                if (this.form.toolBars.indexOf(this) === -1) {
                    this.form.toolBars.push(this);
                }
            }
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.images = null;
        }
        getImages() {
            //var data = htmlElement.dataset.images;
            //if (data) {
            //    if (this.form[data]) {
            //        this.images = this.form[data];
            //    }
            //}
        }
        updateToolButtons() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.components.forEach(comp => {
                if (!comp.HTMLElementStyle) {
                    comp.HTMLElementStyle.backgroundImage = priv.images[comp.imageIndex];
                }
                if (comp instanceof Core.classes.ToolButton) {
                    comp.showCaption = priv.showCaption;
                }
            });
        }
        //#endregion Methods
    }
    return ToolBar;
    //#endregion ToolBar
})();
//#endregion CustomButton
Core.classes.register(Types.CATEGORIES.TOOLBARS, ToolBar);
export { ToolBar };
//#region Templates
if (Core.isHTMLRenderer) {
    const ToolBarTpl = ['<jagui-toolbar id="{internalId}" data-class="ToolBar" class="Control ToolBar {theme} csr_default">',
        '<properties>{ "name": "{name}" }</properties></jagui-toolbar>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: ToolBar, template: ToolBarTpl }]);
}
//#endregion
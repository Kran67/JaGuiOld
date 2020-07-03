//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#endregion Import
//#region Class ToolBar
class ToolBar extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            if (!core.isHTMLRenderer) {
                props.height = 29;
            }
            props.align = core.types.ALIGNS.MOSTTOP;
            owner === owner.form.content && (owner = owner.form.layout);
            super(owner, props);
            core.private(this, {
                images: props.hasOwnProperty('images') && this.form.hasOwnProperty(props.images) ? this.form[props.images] : null,
                showCaption: props.hasOwnProperty('showCaption') && core.tools.isBool(props.showCaption) ? props.showCaption : !0
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region showCaption
    get showCaption() {
        return core.private(this).showCaption;
    }
    set showCaption(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.showCaption !== newValue) {
            priv.showCaption = newValue;
            htmlElement.classList.remove('nocaption');
            !priv.showCaption && htmlElement.classList.add('nocaption');
            this.updateToolButtons();
        }
    }
    //#endregion showCaption
    //#region images
    get images() {
        return core.private(this).images;
    }
    set images(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.ImageList && priv.images !== newValue) {
            priv.images = newValue;
            this.updateToolButtons();
        }
    }
    //#endregion images
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        this.getImages();
        super.loaded();
        this.updateToolButtons();
        this.owner === this.form.layout && this.form.toolBars.indexOf(this) === -1 && this.form.toolBars.push(this);
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.images = null;
        priv.showCaption = null;
        super.destroy();
    }
    //#endregion destroy
    //#region getImages
    getImages() {
        //var data = htmlElement.dataset.images;
        //if (data) {
        //    if (this.form[data]) {
        //        this.images = this.form[data];
        //    }
        //}
    }
    //#endregion getImages
    //#region updateToolButtons
    updateToolButtons() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.components.forEach(comp => {
            !comp.HTMLElementStyle && (comp.HTMLElementStyle.backgroundImage = priv.images[comp.imageIndex]);
            comp instanceof core.classes.ToolButton && (comp.showCaption = priv.showCaption);
        });
    }
    //#endregion updateToolButtons
    //#endregion Methods
}
Object.defineProperties(ToolBar.prototype, {
    'images': {
        enumerable: !0
    },
    'showCaption': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.TOOLBARS, ToolBar);
//#endregion ToolBar
//#region Templates
if (core.isHTMLRenderer) {
    const ToolBarTpl = ['<jagui-toolbar id="{internalId}" data-class="ToolBar" class="Control ToolBar {theme} csr_default">',
        '<properties>{ "name": "{name}" }</properties></jagui-toolbar>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ToolBar, template: ToolBarTpl }]);
}
//#endregion
export { ToolBar };
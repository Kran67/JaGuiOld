//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { ImageControl } from '/scripts/components/extended/imagecontrol.js';
//#endregion Import
//#region Class CustomButton
class LabeledImage extends LabeledControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                src: props.hasOwnProperty('src') ? props.src : core.types.CONSTANTS.PIX
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region src
    get src() {
        return priv.src;
    }
    set src(newValue) {
        if (core.tools.isString(newValue) && priv.src !== newValue) {
            priv.src = newValue;
            priv.imgCtrl.load(priv.src);
        }
    }
    //#endregion src
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        priv.imgCtrl = core.classes.createComponent({
            class: ImageControl,
            owner: this,
            props: {
                inForm: !1
            }
        });
        priv.imgCtrl.load(priv.src);
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.imgCtrl.destroy();
        priv.imgCtrl = null;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(LabeledImage);
core.classes.register(core.types.CATEGORIES.EXTENDED, LabeledImage);
//#endregion LabeledImage
//#region Template
if (core.isHTMLRenderer) {
    const LabeledImageTpl = "<div id='{internalId}' data-name='{name}' data-class='LabeledImage' class='Control LabeledImage' style='width:205px;height:60px;'>\
                         {label}\
                         {imageControl}\
                         </div>";
    core.classes.registerTemplates([{ Class: LabeledImage, template: LabeledImageTpl }]);
}
//#endregion
export { LabeledImage };
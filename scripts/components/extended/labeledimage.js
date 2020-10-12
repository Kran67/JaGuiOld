//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { ImageControl } from '/scripts/components/extended/imagecontrol.js';
//#endregion Import
//#region Class CustomButton
class LabeledImage extends LabeledControl {
    //#region Private fields
    #imgCtrl;
    //#endregion Private fields
    //#region Getters / Setters
    //#region imageControl
    get imageControl() {
        return this.#imgCtrl;
    }
    //#endregion imageControl
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        this.#imgCtrl = core.classes.createComponent({
            class: ImageControl,
            owner: this,
            props: {
                src: this.props.imageControl.src,
                inForm: !1
            }
        });
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        this.#imgCtrl.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(LabeledImage.prototype, {
    'imgCtrl': {
        enumerable: !0
    }
});
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
//#region Imports
import { ShortCutIcon } from '/scripts/components/common/shortcuticon.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Imports
//#region ImageList
const ImageList = (() => {
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
    //#region ImageList
    class ImageList extends ShortCutIcon {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            props.className = 'imageList';
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.imageHeight = props.hasOwnProperty('imageHeight') && Tools.isNumber(props.imageHeight) ? props.imageHeight : 16;
                priv.imageWidth = props.hasOwnProperty('imageWidth') && Tools.isNumber(props.imageWidth) ? props.imageWidth : 16;
                priv.images = props.hasOwnProperty('images') && Array.isArray(props.images) ? props.images : [];
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region imageWidth
        get imageWidth() {
            return internal(this).imageWidth;
        }
        set imageWidth(newValue) {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            if (Tools.isNumber(newValue)) {
                if (priv.imageWidth !== newValue) {
                    priv.imageWidth = newValue;
                }
            }
        }
        //#endregion imageWidth
        //#region imageHeight
        get imageHeight() {
            return internal(this).imageHeight;
        }
        set imageHeight(newValue) {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            if (Tools.isNumber(newValue)) {
                if (priv.imageHeight !== newValue) {
                    priv.imageHeight = newValue;
                }
            }
        }
        //#endregion imageHeight
        //#endregion Getters / Setters
        //#region Methods
        //#region getImage
        getImage(idx) {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            return idx > 0 && idx < priv.images.length ? priv.images[idx] : String.EMPTY;
        }
        //#endregion getImage
        //#region addImage
        addImage(image) {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            if (Tools.isString(image)) {
                if (!priv.images.contains(image)) {
                    priv.images.push(image);
                    priv.images.push(image);
                }
            }
        }
        //#endregion addImage
        //#region InsertImage
        InsertImage(index, image) {
        }
        //#endregion InsertImage
        //#region removeImage
        removeImage(index) {
        }
        //#endregion removeImage
        //#region clear
        clear() {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            for (let i = 0, l = priv.images.length; i < l; i++) {
                priv.images[i] = null;
            }
            priv.images.clear();
        }
        //#endregion clear
        //#region replaceImage
        replaceImage(index, image) {
        }
        //#endregion replaceImage
        //#region destroy
        destroy() {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            super.destroy();
            priv.images.destroy();
            priv.images = null;
            priv.imageHeight = null;
            priv.imageWidth = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return ImageList;
    //#endregion ImageList
})();
//#region ImageList defineProperties
Object.defineProperties(ImageList, {
    'imageWidth': {
        enumerable: !0
    },
    'imageHeight': {
        enumerable: !0
    }
});
//#endregion ImageList defineProperties
Object.seal(ImageList);
Core.classes.register(Types.CATEGORIES.NONVISUAL, ImageList);
//#endregion ImageList
//#region Templates
if (Core.isHTMLRenderer) {
    const ImageListTpl = '<jagui-icon id="{internalId}" data-class="ImageList" class="Control ShortCutIcon"><properties>{ "name": "{name}",  }</properties></jagui-icon>';
    Core.classes.registerTemplates([{ Class: ImageList, template: ImageListTpl }]);
}
//#endregion
export { ImageList };
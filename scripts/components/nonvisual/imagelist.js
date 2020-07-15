﻿//#region Import
import { Component } from '/scripts/core/component.js';
//#endregion Import
//#region Class ImageList
class ImageList extends Component {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                images: [],
                controls: [],
                imageHeight: props.hasOwnProperty('imageHeight') && core.tools.isNumber(imageHeight) ? props.imageHeight : 16,
                imageWidth: props.hasOwnProperty('imageWidth') && core.tools.isNumber(imageWidth) ? props.imageWidth : 16
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region imageWidth
    get imageWidth() {
        return core.private(this).imageWidth;
    }
    set imageWidth(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.imageWidth !== newValue && (priv.imageWidth = newValue);
    }
    //#endregion imageWidth
    //#region imageHeight
    get imageHeight() {
        return core.private(this).imageHeight;
    }
    set imageHeight(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.imageHeight !== newValue && (priv.imageHeight = newValue);
    }
    //#endregion imageHeight
    //#endregion Getters / Setters
    //#region Methods
    //#region getImage
    getImage(idx) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return idx > -1 && idx < priv.images.length ? priv.images[idx] : String.EMPTY;
    }
    //#endregion getImage
    //#region addImage
    addImage(image) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isStirng(image) && !priv.images.contains(image) && priv.images.push(image);
        // refresh all components with a reference to this
        priv.controls.forEach(ctrl => {
            ctrl.update();
        });
    }
    //#endregion addImage
    //#region insertImage
    insertImage(index, image) {
    }
    //#endregion insertImage
    //#region removeImage
    removeImage(index) {
    }
    //#endregion removeImage
    //#region addReference
    addReference(control) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.controls.indexOf(priv.controls) === -1 && priv.controls.push(control);
    }
    //#endregion addReference
    //#region clear
    clear() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.images.clear();
        // refresh all components with a reference to this
        priv.controls.forEach(ctrl => {
            ctrl.update();
        });
    }
    //#endregion clear
    //#region replaceImage
    replaceImage(index, image) {
    }
    //#endregion replaceImage
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        priv.props.hasOwnProperty('images') && (priv.images = [...priv.props.images]);
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.controls.clear();
        priv.images.clear();
        priv.images.destroy();
        super.destroy();
    }
    //#endregion Methods
}
Object.defineProperties(ImageList.prototype, {
    'images': {
        enumerable: !0
    },
    'imageWidth': {
        enumerable: !0
    },
    'imageHeight': {
        enumerable: !0
    }
});
//#endregion ImageList
Object.seal(ImageList);
core.classes.register(core.types.CATEGORIES.NONVISUAL, ImageList);
//#region Templates
if (core.isHTMLRenderer) {
    const ImageListTpl = ['<jagui-imagelist id="{internalId}" data-class="ImageList" class="Control ShortCutIcon">',
                      //'<div class="Control ShortCutIconImg imagelist"></div>',
                      //'<div class="Control ShortCutIconCaption">{name}</div>',
                      '</jagui-imagelist>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ImageList, template: ImageListTpl }]);
}
//#endregion

/*(function () {
    //#region ImageList
    var ImageList = $j.classes.Component.extend("ImageList", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._images = [];
                //#endregion
                this.imageHeight = 16;
                this.imageWidth = 16;
            }
        },
        //#region Setters
        setImageWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.imageWidth !== newValue) {
                this.imageWidth = newValue;
            }
        },
        setImageHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.imageHeight !== newValue) {
                this.imageHeight = newValue;
            }
        },
        //#endregion
        //#region Methods
        getImage: function (idx) {
            if (idx < 0) return String.EMPTY;
            if (idx > this._images.length) return String.EMPTY;
            return this._images[idx];
        },
        addImage: function (image) {
            if (typeof image !== _const.STRING) return;
            if (!this._images.contains(image)) {
                this._images.push(image);
            }
        },
        InsertImage: function (index, image) {
        },
        removeImage: function (index) {
        },
        clear: function () {
            var i, l;
            for (i = 0, l = this._images.length; i < l; i++) {
                this._images[i] = null;
            }
            this._images.clear();
        },
        replaceImage: function (index, image) {
        },
        getChildsHTMLElement: function () {
            // on va chercher les items dans le CDATA
            var cdata = this._HTMLElement.childNodes;
            for (var i = 0, l = cdata.length; i < l; i++) {
                if (cdata[i].nodeType === $j.types.xmlNodeTypes.COMMENT_NODE) {
                    if (cdata[i].nodeValue !== String.EMPTY && cdata[i].nodeValue) this._images = JSON.parse(cdata[i].nodeValue);
                }
            }
        },
        destroy: function () {
            this._inherited();
            this._images.destroy();
            this._images = null;
            this.imageHeight = null;
            this.imageWidth = null;
        }
        //#endregion
    });
    //#endregion
    Object.seal(ImageList);
    $j.classes.register($j.types.categories.NONVISUAL, ImageList);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ImageListTpl = "<div id='{internalId}' data-name='{name}' data-class='ImageList' class='Control ShortCutIcon'>\
                      <div class='Control ShortCutIconImg imagelist'></div>\
                      <div class='Control ShortCutIconCaption'>{name}</div>\
                      </div>";
        $j.classes.registerTemplates([{ Class: ImageList, template: ImageListTpl }]);
        //$j..registerDesignerMenuItem();
    }
    //#endregion
})();*/
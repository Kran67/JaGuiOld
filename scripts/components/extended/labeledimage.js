(function () {
    var LabeledImage = $j.classes.LabeledControl.extend("LabeledImage", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.imgCtrl = $j.classes.createComponent($j.classes.ImageControl, this, null, { _inForm: false }, false);
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._inherited();
                this.imgCtrl.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this.imgCtrl.getChildsHTMLElement();
                this.imgCtrl.updateFromHTML();
            }
        },
        destroy: function () {
            this._inherited();
            //this.imgCtrl.destroy();
            this.imgCtrl = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{imageControl}"), tpl;
            tpl = this.imgCtrl.getTemplate();
            html = a.join(tpl);
            return html;
        }
        //#endregion
    });
    Object.seal(LabeledImage);
    $j.classes.register($j.types.categories.EXTENDED, LabeledImage);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var LabeledImageTpl = "<div id='{internalId}' data-name='{name}' data-class='LabeledImage' class='Control LabeledImage' style='width:205px;height:60px;'>\
                         {label}\
                         {imageControl}\
                         </div>";
        $j.classes.registerTemplates([{ Class: LabeledImage, template: LabeledImageTpl }]);
    }
    //#endregion
})();
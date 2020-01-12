(function () {
    var GroupBox = $j.classes.CaptionControl.extend("GroupBox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._legendObj = null;
                //#endregion
                this._autoTranslate = true;
                this.canFocused = false;
                if (!$j.isHTMLRenderer()) {
                    this.width = 120;
                    this.height = 100;
                }
                this.padding.setValues(5, 15, 5, 5);
                $j.tools.addPropertyFromSet(this, "horizAlign", $j.types.textAligns, $j.types.textAligns.LEFT);
            }
        },
        //#region Methods
        doBitmapLoaded: function () {
            if (!$j.isHTMLRenderer) {
                if (this._owner._allowUpdate) this._owner.update();
                this.redraw();
            } else this.update();
        },
        doBitmapNotLoaded: function () { throw "Bitmap error"; },
        update: function () {
            if (this._loading || this.form._loading) return;
            if (this._legendObj) this._legendObj.setAttribute("align", this.horizAlign);
        },
        updateCaption: function () {
            this._legendObj.innerHTML = this.caption;
        },
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._legendObj = this._HTMLElement.firstElementChild;
                this._legendObj.jsObj = this;
            }
        },
        updateFromHTML: function () {
            this._inherited();
            this.caption = this._legendObj.innerHTML;
        },
        destroy: function () {
            this._inherited();
            this._legendObj = null;
            this.horizAlign = null;
        }
        //#endregion
    });
    Object.seal(GroupBox);
    $j.classes.register($j.types.categories.CONTAINERS, GroupBox);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var GroupBoxTpl = "<fieldset id='{internalId}' data-name='{name}' data-class='GroupBox' class='Control GroupBox {theme}' style='width:185px;height:105px;'>\
                     <legend class='Control GroupBoxLegend carbon'>GroupBox1</legend>\
                     </fieldset>";
        $j.classes.registerTemplates([{ Class: GroupBox, template: GroupBoxTpl }]);
    }
    //endregion
})();
(function () {
    $j.types.LabelEffects = {
        NONE: 0,
        BASICSHADOW: "basicshadow",
        QUICKDIRTY: "quickdirty",
        HARDSHADOW: "hardshadow",
        CLOSEHEAVY: "closeheavy",
        _3DTEXT: "_3dtext",
        GLOW: "glow",
        FIRE: "fire",
        LEGO: "lego",
        BUMPY: "bumpy",
        DIG: "dig"
    };
    var Label = $j.classes.CaptionControl.extend('Label', {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                $j.tools.addPropertyFromSet(this, 'horizAlign', $j.types.textAligns, $j.types.textAligns.LEFT);
                if (!$j.isHTMLRenderer()) {
                    this.width = 65;
                    this.height = 170;
                }
                this._inherited(owner, props);
                this.autoSize = true;
                this.effect = $j.types.LabelEffects.NONE;
                this.effectColor = _colors.BLACK;
                $j.tools.addPropertyFromSet(this, 'vertAlign', $j.types.vertTextAligns, $j.types.vertTextAligns.TOP);
                delete this.tabOrder;
            }
        },
        //#region setters
        setEffet: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.LabelEffects)) return;
            if (this.effect !== newValue) {
                $j.CSS.removeClass(this._HTMLElement, this.effect);
                this.effect = newValue;
                $j.CSS.addClass(this._HTMLElement, this.effect);
            }
        },
        setEffectColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (!this.effectColor.equals(newValue)) {
                this.effectColor.assign(newValue);
                if ([$j.types.LabelEffects.FIRE, $j.types.LabelEffects._3DTEXT, $j.types.LabelEffects.LEGO].indexOf(this.effect) === -1) {
                    var shadow = getComputedStyle(this._HTMLElement).textShadow;
                    shadow = shadow.replace("rgba(0, 0, 0, ", this.effectColor.toARGBString().replace(this.effectColor.alpha + ")", String.EMPTY));
                    this._HTMLElementStyle.textShadow = shadow;
                }
            }
        },
        setAutoSize: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (newValue !== this.autoSize) {
                this.autoSize = newValue;
                if (!this._loading && !this.form._loading) this.update();
            }
        },
        setVertAlign: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.vertTextAligns)) return;
            if (newValue !== this.vertAlign) {
                this.vertAlign = newValue;
                if (!this._loading && !this.form._loading) this.update();
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            this._inherited();
            if (this.autoSize) {
                this._HTMLElementStyle.width = String.EMPTY;
                this._HTMLElementStyle.height = String.EMPTY;
            } else {
                this._HTMLElementStyle.width = this.width;
                this._HTMLElementStyle.height = this.height;
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.vertalign;
            if (data) this.vertAlign = data;
            data = this._HTMLElement.dataset.autosize;
            if (data) this.autoSize = _conv.strToBool(data);
        },
        destroy: function () {
            this._inherited();
            this.autoSize = null;
            this.vertAlign = null;
        }
        //#endregion
    });
    Object.seal(Label);
    $j.classes.register($j.types.categories.COMMON, Label);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var LabelTpl = "<label id='{internalId}' data-name='{name}' data-class='Label' class='Control csr_default Label {theme}'>{caption}</label>";
        $j.classes.registerTemplates([{ Class: Label, template: LabelTpl }]);
    }
    //endregion
})();
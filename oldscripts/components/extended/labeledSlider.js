(function () {
    var LabeledSlider = $j.classes.LabeledControl.extend("LabeledSlider", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.slider = $j.classes.createComponent($j.classes.Slider, this, null, { _inForm: false }, false);
                this.valueLabel = $j.classes.createComponent($j.classes.ValueLabel, this, null, { _inForm: false }, false);
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            var nextId;
            if (this._HTMLElement) {
                this._inherited();
                this.slider.getHTMLElement(this._HTMLElement.querySelector(".Slider").id);
                this.slider.getChildsHTMLElement();
                this.slider.updateFromHTML();
                this.valueLabel.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this.valueLabel.updateFromHTML();
                this.slider.onChange.addListener(this.valueChange);
            }
        },
        valueChange: function () {
            var lab = this._owner;
            lab.valueLabel.setCaption(lab.slider.getFirstValue().toFixed(lab.slider.decimalPrecision));
        },
        destroy: function () {
            this._inherited();
            //this.slider.destroy();
            this.slider = null;
            //this.valueLabel.destroy();
            this.valueLabel = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{slider}"), tpl;
            tpl = this.slider.getTemplate();
            html = a.join(tpl);
            a = html.split("{valueLabel}"), tpl;
            tpl = this.valueLabel.getTemplate();
            html = a.join(tpl);
            return html;
        },
        loaded: function () {
            this._inherited();
            this.valueLabel.setCaption(this.slider.getFirstValue().toFixed(this.slider.decimalPrecision));
        }
        //#endregion
    });
    Object.seal(LabeledSlider);
    $j.classes.register($j.types.categories.EXTENDED, LabeledSlider);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var LabeledSliderTpl = "<div id='{internalId}' data-name='{name}' data-class='LabeledSlider' class='Control LabeledSlider' style='width:205px;height:21px;'>\
                          {label}\
                          {slider}\
                          {valueLabel}\
                          </div>";
        $j.classes.registerTemplates([{ Class: LabeledSlider, template: LabeledSliderTpl }]);
    }
    //#endregion
})();
(function () {
    var LabeledAngleBar = $j.classes.LabeledControl.extend("LabeledAngleBar", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.onChanged = new $j.classes.NotifyEvent(this);
                this.angleButton = $j.classes.createComponent($j.classes.AngleButton, this, null, { _inForm: false }, false);
                this.angleButton.onChanged.addListener(this.valueChanged);
                this.valueLabel = $j.classes.createComponent($j.classes.ValueLabel, this, null, { _inForm: false }, false);
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._inherited();
                this.angleButton.getHTMLElement(this._HTMLElement.querySelector(".AngleButton").id);
                this.angleButton.getChildsHTMLElement();
                this.angleButton.updateFromHTML();
                this.valueLabel.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this.valueLabel.updateFromHTML();
            }
        },
        loaded: function () {
            this._inherited();
            this.angleButton._HTMLElementStyle.width = this._HTMLElement.offsetHeight + $j.types.CSSUnits.PX;
            this.angleButton._HTMLElementStyle.height = "21px";
            this.angleButton.setShowValue(false);
            this.valueLabel.setCaption(this.angleButton.value + "°");
        },
        valueChanged: function () {
            var lab = this._owner;
            lab.valueLabel.setCaption(this.value + "°");
            lab.onChanged.invoke();
        },
        destroy: function () {
            this._inherited();
            this.angleButton = null;
            this.valueLabel = null;
            this.onChanged.destroy();
            this.onChanged = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{angleButton}"), tpl;
            tpl = this.angleButton.getTemplate();
            html = a.join(tpl);
            a = html.split("{valueLabel}"), tpl;
            tpl = this.valueLabel.getTemplate();
            html = a.join(tpl);
            return html;
        }
        //#endregion
    });
    Object.seal(LabeledAngleBar);
    $j.classes.register($j.types.categories.EXTENDED, LabeledAngleBar);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var LabeledAngleBarTpl = "<div id='{internalId}' data-name='{name}' data-class='LabeledAngleBar' class='Control LabeledAngleBar' style='width:205px;height:21px;'>\
                            {label}\
                            {angleButton}\
                            {valueLabel}\
                            </div>";
        $j.classes.registerTemplates([{ Class: LabeledAngleBar, template: LabeledAngleBarTpl }]);
    }
    //#endregion
})();
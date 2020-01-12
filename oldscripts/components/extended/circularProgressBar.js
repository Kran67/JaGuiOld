(function () {
    var CircularProgressBar = $j.classes.ThemedControl.extend("CircularProgressBar", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                if (!$j.isHTMLRenderer()) {
                    this.height = 50;
                    this.width = 50;
                }
                this.value = 0;
                this.hitTest = false;
                this._svg = null;
                this._backCircle = null;
                this._progress = null;
                delete this.tabOrder;
            }
        },
        //#region setter
        setValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.value) {
                this.value = newValue;
                if (this.value > 100) this.value = 100;
                if (this.value < 0) this.value = 0;
                if (!$j.isHTMLRenderer()) {
                    var lastRect = this.screenRect();
                    if (this._allowUpdate) this.update();
                    this.redraw(lastRect);
                } else this.update();
            }
        },
        setWidth: function (newValue) {
            this._inherited(newValue);
            this.update($j.types.jsCSSProperties.WIDTH);
        },
        setHeight: function (newValue) {
            this._inherited(newValue);
            this.update($j.types.jsCSSProperties.HEIGHT);
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function (id) {
            var cirlces;
            if (this._HTMLElement) {
                this._svg = this._HTMLElement.firstElementChild;
                this._svg.jsObj = this;
                cirlces = this._svg.querySelectorAll("circle");
                this._backCircle = cirlces[0];
                this._progress = this._svg.lastElementChild;

            }
        },
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.value;
            if (data) this.value = parseFloat(data);
            this._inherited();
            this._calcProgress();
        },
        update: function (source) {
            if (source) {
                switch (source) {
                    case $j.types.jsCSSProperties.WIDTH:
                        this._HTMLElementStyle.height = this._HTMLElement.offsetWidth + $j.types.CSSUnits.PX;
                        break;
                    case $j.types.jsCSSProperties.HEIGHT:
                        this._HTMLElementStyle.width = this._HTMLElement.offsetHeight + $j.types.CSSUnits.PX;
                        break;
                }
            } else {
                if (this._HTMLElement.offsetWidth > this._HTMLElement.offsetHeight) {
                    this._HTMLElementStyle.height = this._HTMLElement.offsetWidth + $j.types.CSSUnits.PX;
                } else {
                    this._HTMLElementStyle.width = this._HTMLElement.offsetHeight + $j.types.CSSUnits.PX;
                }
            }
            if (this._svg) {
                this._backCircle.setAttribute("r", ~~(this._HTMLElement.offsetWidth / 2) - 5);
                this._progress.setAttribute("r", ~~(this._HTMLElement.offsetWidth / 2) - 5);
                this._calcProgress();
            }
        },
        _calcProgress: function () {
            var r, c, pct;
            r = ~~this._progress.getAttribute('r');
            c = Math.PI * (r * 2);
            pct = ((100 - this.value) / 100) * c;
            this._progress.setAttribute("stroke-dasharray", c);
            this._progress.style.strokeDashoffset = pct;
            this._HTMLElement.dataset.value = this.value;
        },
        destroy: function () {
            this._svg = null;
            this._backCircle = null;
            this._progress = null;
            this._inherited();
        }
        //#endregion
    });
    Object.seal(CircularProgressBar);
    $j.classes.register($j.types.categories.EXTENDED, CircularProgressBar);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var CircularProgressBarTpl = "<div id='{internalId}' data-name='{name}' data-class='CircularProgressBar' class='Control CircularProgressBar {theme}' data-value='0' style='width:50px;height:50px;'>\
                                        <svg width='100%' height='100%'>\
                                            <defs></defs>\
                                            <circle class='Control CircularProgressBar_backborder' cx='50%' cy='50%' r='20' />\
                                            <circle class='Control CircularProgressBar_progress' cx='50%' cy='50%' r='20' />\
                                        </svg>\
                                      </div>";
        $j.classes.registerTemplates([{ Class: CircularProgressBar, template: CircularProgressBarTpl }]);
    }
    //#endregion
})();
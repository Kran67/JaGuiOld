(function () {
    var NumberWheel = $j.classes.ItemsWheel.extend("NumberWheel", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.min = 0;
                this.max = 100;
                this.numberDigits = 2;
            }
        },
        //#region Setters
        setMin: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.min) {
                this.min = newValue;
                this.recreateItems();
            }
        },
        setMax: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.max) {
                this.max = newValue;
                this.recreateItems();
            }
        },
        setNumberDigits: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.numberDigits) {
                this.numberDigits = newValue;
                this.recreateItems();
            }
        },
        //#endregion
        //#region Methods
        updateFromHTML: function () {
            var data;
            data = this._HTMLElement.dataset.min;
            this.min = parseFloat(data);
            data = this._HTMLElement.dataset.max;
            this.max = parseFloat(data);
            this._inherited();
        },
        recreateItems: function () {
            var str;
            this.items.clear();
            for (var i = this.min; i <= this.max; i++) {
                str = i.toString();
                if (str.length < this.numberDigits) str = String.dupeString("0", this.numberDigits - str.length) + str;
                this.items.push(str);
            }
            this._inherited();
        },
        destroy: function () {
            this._inherited();
            this.min = null;
            this.max = null;
            this.numberDigits = null;
        }
        //#endregion
    });
    Object.seal(NumberWheel);
    $j.classes.register($j.types.categories.COMMON, NumberWheel);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var NumberWheelTpl = "<div id='{internalId}' data-name='{name}' data-class='NumberWheel' class='Control ItemsWheel NumberWheel {theme}' style='width:20px;height:40px;'>\
                        <div class='Control ItemsWheelTopGradient {theme}'></div>\
                        <div class='Control ItemsWheelSep {theme}'></div>\
                        <div class='Control ItemsWheelContent {theme}'></div>\
                        <div class='Control ItemsWheelBottomGradient {theme}'></div>\
                        </div>";
        $j.classes.registerTemplates([{ Class: NumberWheel, template: $j.templates["ItemsWheel"] }]);
    }
    //endregion
})();
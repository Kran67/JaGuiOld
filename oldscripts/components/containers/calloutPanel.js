(function () {
    var CalloutPanel = $j.classes.Panel.extend("CalloutPanel", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                $j.tools.addPropertyFromSet(this, "calloutPosition", $j.types.calloutPositions, $j.types.calloutPositions.TOP);
                this.calloutOffset = 0;
                this.calloutLength = 11;
                this.calloutWidth = 23;
                this._inherited(owner, props);
                this.clipChilds = false;
                //#region Private
                this._content = null
                this._arrow = null;
                //#endregion
            }
        },
        //#region Setter
        setCalloutPosition: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.calloutPositions)) return;
            if (this.calloutPosition !== newValue) {
                this.calloutPosition = newValue;
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) {
                        this.update();
                    }
                } else {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                }
            }
        },
        setCalloutOffset: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.calloutOffset !== newValue) {
                this.calloutOffset = newValue;
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.update();
                } else {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                }
            }
        },
        setCalloutLength: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 0) newValue = 0;
            if (this.calloutLength !== newValue) {
                this.calloutLength = newValue;
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.update();
                } else {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                }
            }
        },
        setCalloutWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 0) newValue = 0;
            if (this.calloutWidth !== newValue) {
                this.properties.calloutWidth = newValue;
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.update();
                } else {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                }
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            var cssRuleValuesB = String.EMPTY, pos = 0, cssRuleValuesA = String.EMPTY, cw, arrowStyle;
            if (this._loading || this.form._loading) return;
            cw = ~~(this.calloutWidth / 2);
            arrowStyle = this._arrow.style;
            $j.CSS.removeClassFromSet(this._arrow, $j.types.calloutPositions, "calloutposition");
            switch (this.calloutPosition) {
                case $j.types.calloutPositions.TOP:
                    pos = (~~((this._HTMLElement.offsetWidth - this.calloutWidth) / 2) - this.calloutOffset);
                    if (pos < 0) pos = 0;
                    else if (pos >= this._HTMLElement.offsetWidth - this.calloutWidth) pos = this._HTMLElement.offsetWidth - this.calloutWidth;
                    arrowStyle.top = -this.calloutLength + $j.types.CSSUnits.PX;
                    arrowStyle.left = pos + $j.types.CSSUnits.PX
                    arrowStyle.borderTopWidth = 0;
                    arrowStyle.borderLeftWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.borderRightWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.borderBottomWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.bottom = "auto";
                    arrowStyle.right = "auto";
                    break;
                case $j.types.calloutPositions.RIGHT:
                    pos = (~~((this._HTMLElement.offsetHeight - this.calloutWidth) / 2) - this.calloutOffset);
                    if (pos < 0) pos = 0;
                    else if (pos >= this._HTMLElement.offsetHeight - this.calloutWidth) pos = this._HTMLElement.offsetHeight - this.calloutWidth;
                    arrowStyle.right = -this.calloutLength + $j.types.CSSUnits.PX;
                    arrowStyle.top = pos + $j.types.CSSUnits.PX;
                    arrowStyle.borderRightWidth = 0;
                    arrowStyle.borderTopWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.borderBottomWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.borderLeftWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.bottom = "auto";
                    arrowStyle.left = "auto";
                    break;
                case $j.types.calloutPositions.BOTTOM:
                    pos = (~~((this._HTMLElement.offsetWidth - this.calloutWidth) / 2) - this.calloutOffset);
                    if (pos < 0) pos = 0;
                    else if (pos >= this._HTMLElement.offsetWidth - this.calloutWidth) pos = this._HTMLElement.offsetWidth - this.calloutWidth;
                    arrowStyle.bottom = -this.calloutLength + $j.types.CSSUnits.PX;
                    arrowStyle.left = pos + $j.types.CSSUnits.PX;
                    arrowStyle.top = "auto";
                    arrowStyle.borderLeftWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.borderRightWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.borderBottomWidth = 0;
                    arrowStyle.borderTopWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.right = "auto";
                    break;
                case $j.types.calloutPositions.LEFT:
                    pos = (~~((this._HTMLElement.offsetHeight - this.calloutWidth) / 2) - this.calloutOffset);
                    if (pos < 0) pos = 0;
                    else if (pos >= this._HTMLElement.offsetHeight - this.calloutWidth) pos = this._HTMLElement.offsetHeight - this.calloutWidth;
                    arrowStyle.left = -this.calloutLength + $j.types.CSSUnits.PX;
                    arrowStyle.top = pos + $j.types.CSSUnits.PX;
                    arrowStyle.borderLeftWidth = 0;
                    arrowStyle.borderTopWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.borderBottomWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.borderRightWidth = cw + $j.types.CSSUnits.PX;
                    arrowStyle.bottom = "auto";
                    arrowStyle.right = "auto";
                    break;
            }
            $j.CSS.addClass(this._arrow, "calloutposition-" + this.calloutPosition);
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.calloutwidth;
            if (data) this.calloutWidth = ~~data;
            data = this._HTMLElement.dataset.calloutlength;
            if (data) this.calloutLength = ~~data;
            data = this._HTMLElement.dataset.calloutoffset;
            if (data) this.calloutOffset = ~~data;
            data = this._HTMLElement.dataset.position;
            if (data) this.position = data;
        },
        getChildsHTMLElement: function (id) {
            this._inherited(id);
            this._content = this._HTMLElement.firstElementChild;
            this._content.jsObj = this;
            this._arrow = this._HTMLElement.lastElementChild;
        },
        destroy: function () {
            this._inherited();
            this.calloutPosition = null;
            this.calloutOffset = null;
            this.calloutLength = null;
            this.calloutWidth = null;
            this._arrow = null;
        },
        loaded: function () {
            this._inherited();
            this.update();
        }
        //#endregion
    });
    Object.seal(CalloutPanel);
    $j.classes.register($j.types.categories.CONTAINERS, CalloutPanel);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var CalloutPanelTpl = "<div id='{internalId}' data-name='{name}' data-class='CalloutPanel' class='Control CalloutPanel {theme}' data-calloutposition='top' data-calloutoffset='0' data-calloutlength='11' data-calloutwidth='23' style='width:185px;height:41px;'>\
                         <div class='Control CalloutPanelViewport {theme}'></div>\
                         <div class='Control CalloutPanelArrow {theme} calloutposition-top'></div>\
                         </div>";
        $j.classes.registerTemplates([{ Class: CalloutPanel, template: CalloutPanelTpl }]);
    }
    //endregion
})();
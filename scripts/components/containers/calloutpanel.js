//#region Import
import { Panel } from "/scripts/components/containers/panel.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region CalloutPanel
const CalloutPanel = (() => {
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
    //#region CalloutPanel
    class CalloutPanel extends Panel {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const calloutPositions = Types.CALLOUTPOSITIONS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.calloutOffset = props.hasOwnProperty("calloutOffset")?props.calloutOffset:0;
                priv.calloutLength = props.hasOwnProperty("calloutLength")?props.calloutLength:11;
                priv.calloutWidth = props.hasOwnProperty("calloutWidth")?props.calloutWidth:23;
                priv.clipChilds = false;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "calloutPosition",
                    enum: calloutPositions,
                    variable: priv,
                    forceUpdate: true,
                    value:props.hasOwnProperty("calloutPosition") ? props.calloutPosition : calloutPositions.TOP
                });
                priv.content = null;
                priv.arrow = null;
            }
        }
        //#endregion
        //#region Getter / Setter
        //#region calloutPosition
        get calloutPosition() {
            return internal(this).calloutPosition;
        }
        set calloutPosition(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, Types.CALLOUTPOSITIONS)) {
                if (priv.calloutPosition !== newValue) {
                    priv.calloutPosition = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                    } else {
                        if (this.allowUpdate) {
                            this.update();
                        }
                        this.redraw();
                    }
                }
            }
        }
        //#endregion calloutPosition
        //#region calloutOffset
        get calloutOffset() {
            return internal(this).calloutOffset;
        }
        set calloutOffset(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONTAINERS.NUMBER) {
                if (priv.calloutOffset !== newValue) {
                    priv.calloutOffset = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                    } else {
                        if (this.allowUpdate) {
                            this.update();
                        }
                        this.redraw();
                    }
                }
            }
        }
        //#endregion calloutOffset
        //#region calloutLength
        get calloutLength() {
            return internal(this).calloutLength;
        }
        set calloutLength(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue < 0) {
                    newValue = 0;
                }
                if (priv.calloutLength !== newValue) {
                    priv.calloutLength = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                    } else {
                        if (this.allowUpdate) {
                            this.update();
                        }
                        this.redraw();
                    }
                }
            }
        }
        //#endregion calloutLength
        //#region calloutWidth
        get calloutWidth() {
            return internal(this).calloutWidth;
        }
        set calloutWidth(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue < 0) {
                    newValue = 0;
                }
                if (priv.calloutWidth !== newValue) {
                    priv.calloutWidth = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                    } else {
                        if (this.allowUpdate) {
                            this.update();
                        }
                        this.redraw();
                    }
                }
            }
        }
        //#endregion calloutWidth
        //#endregion Getter / Setter
        //#region Methods
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const cw = ~~(priv.calloutWidth / 2);
            let pos = 0;
            const arrowStyle = priv.arrow.style;
            const calloutPositions = Types.CALLOUTPOSITIONS;
            const htmlElement = this.HTMLElement;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                //CSS.removeClassFromSet(priv.arrow, Types.CALLOUTPOSITIONS, "calloutposition");
                switch (priv.calloutPosition) {
                    case calloutPositions.TOP:
                        pos = ~~((htmlElement.offsetWidth - priv.calloutWidth) / 2) - priv.calloutOffset;
                        if (pos < 0) {
                            pos = 0;
                        } else if (pos >= htmlElement.offsetWidth - priv.calloutWidth) {
                            pos = htmlElement.offsetWidth - priv.calloutWidth;
                        }
                        arrowStyle.top = `${-priv.calloutLength}${PX}`;
                        arrowStyle.left = `${pos}${PX}`;
                        arrowStyle.borderTopWidth = 0;
                        arrowStyle.borderLeftWidth = `${cw}${PX}`;
                        arrowStyle.borderRightWidth = `${cw}${PX}`;
                        arrowStyle.borderBottomWidth = `${cw}${PX}`;
                        arrowStyle.bottom = "auto";
                        arrowStyle.right = "auto";
                        break;
                    case calloutPositions.RIGHT:
                        pos = ~~((htmlElement.offsetHeight - priv.calloutWidth) / 2) - priv.calloutOffset;
                        if (pos < 0) {
                            pos = 0;
                        } else if (pos >= htmlElement.offsetHeight - priv.calloutWidth) {
                            pos = htmlElement.offsetHeight - priv.calloutWidth;
                        }
                        arrowStyle.right = `${-priv.calloutLength}${PX}`;
                        arrowStyle.top = `${pos}${PX}`;
                        arrowStyle.borderRightWidth = 0;
                        arrowStyle.borderTopWidth = `${cw}${PX}`;
                        arrowStyle.borderBottomWidth = `${cw}${PX}`;
                        arrowStyle.borderLeftWidth = `${cw}${PX}`;
                        arrowStyle.bottom = "auto";
                        arrowStyle.left = "auto";
                        break;
                    case calloutPositions.BOTTOM:
                        pos = ~~((htmlElement.offsetWidth - priv.calloutWidth) / 2) - priv.calloutOffset;
                        if (pos < 0) {
                            pos = 0;
                        } else if (pos >= htmlElement.offsetWidth - priv.calloutWidth) {
                            pos = htmlElement.offsetWidth - priv.calloutWidth;
                        }
                        arrowStyle.bottom = `${-priv.calloutLength}${PX}`;
                        arrowStyle.left = `${pos}${PX}`;
                        arrowStyle.top = "auto";
                        arrowStyle.borderLeftWidth = `${cw}${PX}`;
                        arrowStyle.borderRightWidth = `${cw}${PX}`;
                        arrowStyle.borderBottomWidth = 0;
                        arrowStyle.borderTopWidth = `${cw}${PX}`;
                        arrowStyle.right = "auto";
                        break;
                    case calloutPositions.LEFT:
                        pos = ~~((htmlElement.offsetHeight - priv.calloutWidth) / 2) - priv.calloutOffset;
                        if (pos < 0) {
                            pos = 0;
                        } else if (pos >= htmlElement.offsetHeight - priv.calloutWidth) {
                            pos = htmlElement.offsetHeight - priv.calloutWidth;
                        }
                        arrowStyle.left = `${-priv.calloutLength}${PX}`;
                        arrowStyle.top = `${pos}${PX}`;
                        arrowStyle.borderLeftWidth = 0;
                        arrowStyle.borderTopWidth = `${cw}${PX}`;
                        arrowStyle.borderBottomWidth = `${cw}${PX}`;
                        arrowStyle.borderRightWidth = `${cw}${PX}`;
                        arrowStyle.bottom = "auto";
                        arrowStyle.right = "auto";
                        break;
                }
                priv.arrow.classList.add(`calloutposition-${priv.calloutPosition}`);
            }
        }
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            priv.content = htmlElement.querySelector(".CalloutPanelViewport");
            priv.content.jsObj = this;
            priv.arrow = htmlElement.querySelector(".CalloutPanelArrow");
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.calloutPosition = null;
            priv.calloutOffset = null;
            priv.calloutLength = null;
            priv.calloutWidth = null;
            priv.arrow = null;
        }
        loaded() {
            super.loaded();
            this.update();
        }
        //#endregion Methods
    }
    return CalloutPanel;
    //#endregion
})();
//#endregion
Core.classes.register(Types.CATEGORIES.CONTAINERS, CalloutPanel);
export { CalloutPanel };

/*
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
*/
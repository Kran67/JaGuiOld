//#region Import
import { Panel } from "/scripts/components/containers/panel.js";
import { Tools } from "/scripts/core/tools.js";
import { Css } from "/scripts/core/css.js";
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
                this.allowUpdateOnResize = true;
                this.allowRealignChildsOnResize = true;
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
            if (Tools.isNumber(newValue)) {
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
            if (Tools.isNumber(newValue)) {
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
            if (Tools.isNumber(newValue)) {
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
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const cw = ~~(priv.calloutWidth / 2);
            let pos = 0;
            const calloutPositions = Types.CALLOUTPOSITIONS;
            const htmlElement = this.HTMLElement;
            const PX = Types.CSSUNITS.PX;
            let top;
            let left;
            let right;
            let bottom;
            let borderTopWidth;
            let borderLeftWidth;
            let borderRightWidth;
            let borderBottomWidth;
            let path = String.EMPTY;
            const pseudoCssClass = Types.PSEUDOCSSCLASS;
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                Object.entries(calloutPositions).forEach(entry => {
                    htmlElement.classList.remove(`calloutposition-${calloutPositions[entry.first]}`);
                });
                // remove all CSS rules for this component
                this.removeCssRules();
                switch (priv.calloutPosition) {
                    case calloutPositions.TOP:
                        pos = ~~((htmlElement.offsetWidth - priv.calloutWidth) / 2) - priv.calloutOffset;
                        if (pos < 0) {
                            pos = 0;
                        } else if (pos >= htmlElement.offsetWidth - priv.calloutWidth) {
                            pos = htmlElement.offsetWidth - priv.calloutWidth;
                        }
                        top = `${-priv.calloutLength}${PX}`;
                        left = `${pos}${PX}`;
                        borderTopWidth = 0;
                        borderLeftWidth = `${cw}${PX}`;
                        borderRightWidth = `${cw}${PX}`;
                        borderBottomWidth = `${cw}${PX}`;
                        bottom = "auto";
                        right = "auto";
                        path = `0 0, ${left} 0, ${pos + cw}${PX} ${top}, ${pos + cw + 1}${PX} ${top}, ${pos + 1 + cw * 2}${PX} 0, 100% 0, 100% 100%, 0 100%`;
                        break;
                    case calloutPositions.RIGHT:
                        pos = ~~((htmlElement.offsetHeight - priv.calloutWidth) / 2) - priv.calloutOffset;
                        if (pos < 0) {
                            pos = 0;
                        } else if (pos >= htmlElement.offsetHeight - priv.calloutWidth) {
                            pos = htmlElement.offsetHeight - priv.calloutWidth;
                        }
                        right = `${-priv.calloutLength}${PX}`;
                        top = `${pos}${PX}`;
                        borderRightWidth = 0;
                        borderTopWidth = `${cw}${PX}`;
                        borderBottomWidth = `${cw}${PX}`;
                        borderLeftWidth = `${cw}${PX}`;
                        bottom = "auto";
                        left = "auto";
                        path = `0 0, 100% 0, 100% ${top}, ${htmlElement.offsetWidth + priv.calloutLength} ${pos + cw}${PX}, ${htmlElement.offsetWidth + priv.calloutLength} ${pos + cw + 1}${PX}, 100% ${pos + 1 + cw * 2}${PX}, 100% 100%, 0 100%`;
                        break;
                    case calloutPositions.BOTTOM:
                        pos = ~~((htmlElement.offsetWidth - priv.calloutWidth) / 2) - priv.calloutOffset;
                        if (pos < 0) {
                            pos = 0;
                        } else if (pos >= htmlElement.offsetWidth - priv.calloutWidth) {
                            pos = htmlElement.offsetWidth - priv.calloutWidth;
                        }
                        bottom = `${-priv.calloutLength}${PX}`;
                        left = `${pos}${PX}`;
                        top = "auto";
                        borderLeftWidth = `${cw}${PX}`;
                        borderRightWidth = `${cw}${PX}`;
                        borderBottomWidth = 0;
                        borderTopWidth = `${cw}${PX}`;
                        right = "auto";
                        path = `0 0, 100% 0, 100% 100%, ${pos + 1 + cw * 2}${PX} 100%, ${pos + cw + 1}${PX} ${htmlElement.offsetHeight + priv.calloutLength}, ${pos + cw}${PX} ${htmlElement.offsetHeight + priv.calloutLength}, ${left} 100%, 0 100%`;
                        break;
                    case calloutPositions.LEFT:
                        pos = ~~((htmlElement.offsetHeight - priv.calloutWidth) / 2) - priv.calloutOffset;
                        if (pos < 0) {
                            pos = 0;
                        } else if (pos >= htmlElement.offsetHeight - priv.calloutWidth) {
                            pos = htmlElement.offsetHeight - priv.calloutWidth;
                        }
                        left = `${-priv.calloutLength}${PX}`;
                        top = `${pos}${PX}`;
                        borderLeftWidth = 0;
                        borderTopWidth = `${cw}${PX}`;
                        borderBottomWidth = `${cw}${PX}`;
                        borderRightWidth = `${cw}${PX}`;
                        bottom = "auto";
                        right = "auto";
                        path = `0 0, 100% 0, 100% 100%, 0 100%, 0 ${pos + 1 + cw * 2}${PX}, ${left} ${pos + cw + 1}${PX}, ${left} ${pos + cw}${PX}, 0 ${top}`;
                        break;
                }
                Css.addCSSRule(`#${this.internalId}.calloutposition-${priv.calloutPosition}${pseudoCssClass.BEFORE}`, `left: ${left}; top: ${top}; right: ${right};
                    bottom: ${bottom};
                    border-left-width: ${borderLeftWidth};
                    border-top-width: ${borderTopWidth};
                    border-right-width: ${borderRightWidth};
                    border-bottom-width: ${borderBottomWidth}`);
                htmlElement.classList.add(`calloutposition-${priv.calloutPosition}`);
                this.HTMLElementStyle.clipPath = `polygon(${path})`;
            }
        }
        //#endregion update
        //#region removeCssRules
        removeCssRules() {
            const calloutPositions = Types.CALLOUTPOSITIONS;
            const styleRule = Types.CSSRULETYPES.STYLE_RULE;
            const pseudoCssClass = Types.PSEUDOCSSCLASS;
            Object.entries(calloutPositions).forEach(entry => {
                Css.removeCSSRule(`#${this.internalId}.calloutposition-${calloutPositions[entry.first]}${pseudoCssClass.BEFORE}`, styleRule);
            });
        }
        //#endregion removeCssRules
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.calloutPosition = null;
            priv.calloutOffset = null;
            priv.calloutLength = null;
            priv.calloutWidth = null;
            removeCssRules();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return CalloutPanel;
    //#endregion CalloutPanel
})();
//#endregion
Core.classes.register(Types.CATEGORIES.CONTAINERS, CalloutPanel);
export { CalloutPanel };
//#region Templates
if (Core.isHTMLRenderer) {
    const CalloutPanelTpl = ["<jagui-calloutpanel id=\"{internalId}\" data-class=\"CalloutPanel\" class=\"Control CalloutPanel {theme} csr_default",
        " calloutposition-top\"><properties>{ \"name\": \"{name}\", \"calloutPosition\": \"top\" }</properties></jagui-calloutpanel>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: CalloutPanel, template: CalloutPanelTpl }]);
}
//endregion
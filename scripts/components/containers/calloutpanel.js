//#region Import
import { Panel } from '/scripts/components/containers/panel.js';
import { Css } from '/scripts/core/css.js';
//#endregion Import
//#region CALLOUTPOSITIONS
const CALLOUTPOSITIONS = Object.seal(Object.freeze({
    LEFT: 'left',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom'
}));
//#endregion CALLOUTPOSITIONS
//#region CalloutPanel
class CalloutPanel extends Panel {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.allowUpdateOnResize = !0;
            props.allowRealignChildsOnResize = !0;
            props.clipChilds = !1;
            super(owner, props);
            core.private(this, {
                calloutOffset: props.hasOwnProperty('calloutOffset') ? props.calloutOffset : 0,
                calloutLength: props.hasOwnProperty('calloutLength') ? props.calloutLength : 11,
                calloutWidth: props.hasOwnProperty('calloutWidth') ? props.calloutWidth : 23
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'calloutPosition',
                enum: CALLOUTPOSITIONS,
                forceUpdate: !0,
                value: props.hasOwnProperty('calloutPosition') ? props.calloutPosition : CALLOUTPOSITIONS.TOP
            });
        }
    }
    //#endregion
    //#region Getters / Setters
    //#region CALLOUTPOSITIONS
    static get CALLOUTPOSITIONS() {
        return CALLOUTPOSITIONS;
    }
    //#endregion CALLOUTPOSITIONS
    //#region calloutPosition
    get calloutPosition() {
        return core.private(this).calloutPosition;
    }
    set calloutPosition(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, CALLOUTPOSITIONS) && priv.calloutPosition !== newValue) {
            priv.calloutPosition = newValue;
            if (core.isHTMLRenderer) {
                !this.loading && !this.form.loading && this.update();
            } else {
                this.allowUpdate && this.update();
                this.redraw();
            }
        }
    }
    //#endregion calloutPosition
    //#region calloutOffset
    get calloutOffset() {
        return core.private(this).calloutOffset;
    }
    set calloutOffset(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.calloutOffset !== newValue) {
            priv.calloutOffset = newValue;
            if (core.isHTMLRenderer) {
                !this.loading && !this.form.loading && this.update();
            } else {
                this.allowUpdate && this.update();
                this.redraw();
            }
        }
    }
    //#endregion calloutOffset
    //#region calloutLength
    get calloutLength() {
        return core.private(this).calloutLength;
    }
    set calloutLength(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(newValue, 0);
            if (priv.calloutLength !== newValue) {
                priv.calloutLength = newValue;
                if (core.isHTMLRenderer) {
                    !this.loading && !this.form.loading && this.update();
                } else {
                    this.allowUpdate && this.update();
                    this.redraw();
                }
            }
        }
    }
    //#endregion calloutLength
    //#region calloutWidth
    get calloutWidth() {
        return core.private(this).calloutWidth;
    }
    set calloutWidth(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(newValue, 0);
            if (priv.calloutWidth !== newValue) {
                priv.calloutWidth = newValue;
                if (core.isHTMLRenderer) {
                    !this.loading && !this.form.loading && this.update();
                } else {
                    this.allowUpdate && this.update();
                    this.redraw();
                }
            }
        }
    }
    //#endregion calloutWidth
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const cw = int(priv.calloutWidth / 2);
        let pos = 0;
        const htmlElement = this.HTMLElement;
        const PX = core.types.CSSUNITS.PX;
        let top;
        let left;
        let right;
        let bottom;
        let borderTopWidth;
        let borderLeftWidth;
        let borderRightWidth;
        let borderBottomWidth;
        let path = String.EMPTY;
        const pseudoCssClass = core.types.PSEUDOCSSCLASS;
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading) {
            Object.entries(CALLOUTPOSITIONS).forEach(entry => {
                htmlElement.classList.remove(`calloutposition-${CALLOUTPOSITIONS[entry.first]}`);
            });
            // remove all CSS rules for this component
            this.removeCssRules();
            switch (priv.calloutPosition) {
                case CALLOUTPOSITIONS.TOP:
                    pos = int((htmlElement.offsetWidth - priv.calloutWidth) / 2) - priv.calloutOffset;
                    pos = Math.max(Math.min(pos, htmlElement.offsetWidth - priv.calloutWidth), 0);
                    top = `${-priv.calloutLength}${PX}`;
                    left = `${pos}${PX}`;
                    borderTopWidth = 0;
                    borderLeftWidth = `${cw}${PX}`;
                    borderRightWidth = `${cw}${PX}`;
                    borderBottomWidth = `${cw}${PX}`;
                    bottom = 'auto';
                    right = 'auto';
                    path = `0 0, ${left} 0, ${pos + cw}${PX} ${top}, ${pos + cw + 1}${PX} ${top}, ${pos + 1 + cw * 2}${PX} 0, 100% 0, 100% 100%, 0 100%`;
                    break;
                case CALLOUTPOSITIONS.RIGHT:
                    pos = int((htmlElement.offsetHeight - priv.calloutWidth) / 2) - priv.calloutOffset;
                    pos = Math.max(Math.min(pos, htmlElement.offsetHeight - priv.calloutWidth), 0);
                    right = `${-priv.calloutLength}${PX}`;
                    top = `${pos}${PX}`;
                    borderRightWidth = 0;
                    borderTopWidth = `${cw}${PX}`;
                    borderBottomWidth = `${cw}${PX}`;
                    borderLeftWidth = `${cw}${PX}`;
                    bottom = 'auto';
                    left = 'auto';
                    path = `0 0, 100% 0, 100% ${top}, ${htmlElement.offsetWidth + priv.calloutLength} ${pos + cw}${PX}, ${htmlElement.offsetWidth + priv.calloutLength} ${pos + cw + 1}${PX}, 100% ${pos + 1 + cw * 2}${PX}, 100% 100%, 0 100%`;
                    break;
                case CALLOUTPOSITIONS.BOTTOM:
                    pos = int((htmlElement.offsetWidth - priv.calloutWidth) / 2) - priv.calloutOffset;
                    pos = Math.max(Math.min(pos, htmlElement.offsetWidth - priv.calloutWidth), 0);
                    bottom = `${-priv.calloutLength}${PX}`;
                    left = `${pos}${PX}`;
                    top = 'auto';
                    borderLeftWidth = `${cw}${PX}`;
                    borderRightWidth = `${cw}${PX}`;
                    borderBottomWidth = 0;
                    borderTopWidth = `${cw}${PX}`;
                    right = 'auto';
                    path = `0 0, 100% 0, 100% 100%, ${pos + 1 + cw * 2}${PX} 100%, ${pos + cw + 1}${PX} ${htmlElement.offsetHeight + priv.calloutLength}, ${pos + cw}${PX} ${htmlElement.offsetHeight + priv.calloutLength}, ${left} 100%, 0 100%`;
                    break;
                case CALLOUTPOSITIONS.LEFT:
                    pos = int((htmlElement.offsetHeight - priv.calloutWidth) / 2) - priv.calloutOffset;
                    pos = Math.max(Math.min(pos, htmlElement.offsetHeight - priv.calloutWidth), 0);
                    left = `${-priv.calloutLength}${PX}`;
                    top = `${pos}${PX}`;
                    borderLeftWidth = 0;
                    borderTopWidth = `${cw}${PX}`;
                    borderBottomWidth = `${cw}${PX}`;
                    borderRightWidth = `${cw}${PX}`;
                    bottom = 'auto';
                    right = 'auto';
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
        const styleRule = core.types.CSSRULETYPES.STYLE_RULE;
        const pseudoCssClass = core.types.PSEUDOCSSCLASS;
        Object.entries(CALLOUTPOSITIONS).forEach(entry => {
            Css.removeCSSRule(`#${this.internalId}.calloutposition-${CALLOUTPOSITIONS[entry.first]}${pseudoCssClass.BEFORE}`, styleRule);
        });
    }
    //#endregion removeCssRules
    //#region loaded
    loaded() {
        super.loaded();
        this.update();
    }
    //#endregion loaded
    //#endregion Methods
}
Object.defineProperties(CalloutPanel.prototype, {
    'calloutOffset': {
        enumerable: !0
    },
    'calloutLength': {
        enumerable: !0
    },
    'calloutWidth': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.CONTAINERS, CalloutPanel);
//#endregion CalloutPanel
//#region Templates
if (core.isHTMLRenderer) {
    const CalloutPanelTpl = ['<jagui-calloutpanel id="{internalId}" data-class="CalloutPanel" class="Control CalloutPanel {theme} csr_default',
        ' calloutposition-top"><properties>{ "name": "{name}", "calloutPosition": "top" }</properties></jagui-calloutpanel>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: CalloutPanel, template: CalloutPanelTpl }]);
}
//#endregion
export { CalloutPanel };
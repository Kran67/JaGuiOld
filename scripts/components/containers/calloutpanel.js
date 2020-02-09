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
            const arrowStyle = priv.arrow.style;
            const calloutPositions = Types.CALLOUTPOSITIONS;
            const htmlElement = this.HTMLElement;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            //super.update();
            if (!this.loading && !this.form.loading) {
                //CSS.removeClassFromSet(priv.arrow, Types.CALLOUTPOSITIONS, "calloutposition");
                Object.entries(Types.CALLOUTPOSITIONS).forEach(entry => {
                    priv.arrow.classList.remove(`calloutposition-${Types.CALLOUTPOSITIONS[entry.first]}`);
                });
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
        //#endregion update
        //#region getHTMLElement
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
        //#endregion getHTMLElement
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
            priv.arrow = null;
        }
        //#endregion destroy
        //#region loaded
        loaded() {
            super.loaded();
            this.update();
        }
        //#endregion loaded
        //#endregion Methods
    }
    return CalloutPanel;
    //#endregion CalloutPanel
})();
//#endregion
Core.classes.register(Types.CATEGORIES.CONTAINERS, CalloutPanel);
export { CalloutPanel };

/*
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
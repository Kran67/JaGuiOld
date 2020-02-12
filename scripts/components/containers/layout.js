//#region Imports
import { Control } from "/scripts/components/control.js";
import { Window } from "/scripts/components/containers/window.js";
import { Color, Colors } from "/scripts/core/color.js";
//#endregion Imports
//#region Layout
class Layout extends Control {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            delete this.tabOrder;
            this.allowRealignChildsOnResize = true;
        }
    }
    //#endregion constructor
    //#region Methods
    //#region render
    render() {
        Core.ctx.save();
        //Core.ctx.beginPath();
        //Core.ctx.fillStyle = "#F00";
        //Core.ctx.globalAlpha = 0.5;
        //Core.ctx.fillRect(this.contentLeft,this.contentTop,this.contentWidth,this.contentHeight);
        super.render();
        Core.ctx.restore();
    }
    //#endregion render
    //#endregion Methods
}
//#endregion Layout
Core.classes.register(Types.CATEGORIES.CONTAINERS, Layout);
export { Layout };
//#region Template
if (Core.isHTMLRenderer) {
    const LayoutTpl = "<jagui-layout data-class=\"Layout\" class=\"Control Layout\"><properties>{ \"name\": \"{name}\" }</properties></jagui-layout>";
    Core.classes.registerTemplates([{ Class: Layout, template: LayoutTpl }]);
}
//#endregion Template
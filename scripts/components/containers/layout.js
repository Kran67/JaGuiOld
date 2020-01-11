import { Control } from "/scripts/components/control.js";
import { Window } from "/scripts/components/containers/window.js";
import { Color, Colors } from "/scripts/core/color.js";
//#region Layout final
class Layout extends Control {
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            delete this.tabOrder;
        }
    }
    //#region Methods
    render() {
        Core.ctx.save();
        //Core.ctx.beginPath();
        //Core.ctx.fillStyle = "#F00";
        //Core.ctx.globalAlpha = 0.5;
        //Core.ctx.fillRect(this.contentLeft,this.contentTop,this.contentWidth,this.contentHeight);
        super.render();
        Core.ctx.restore();
    }
    //#endregion
}
//#endregion
Core.classes.register(Types.CATEGORIES.CONTAINERS, Layout);
export { Layout };
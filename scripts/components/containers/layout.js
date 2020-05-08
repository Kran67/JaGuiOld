//#region Imports
import { Control } from '/scripts/components/control.js';
//#endregion Imports
//#region Layout
class Layout extends Control {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.allowRealignChildsOnResize = !0;
            super(owner, props);
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Methods
    //#region render
    render() {
        core.ctx.save();
        //core.ctx.beginPath();
        //core.ctx.fillStyle = "#F00";
        //core.ctx.globalAlpha = 0.5;
        //core.ctx.fillRect(this.contentLeft,this.contentTop,this.contentWidth,this.contentHeight);
        super.render();
        core.ctx.restore();
    }
    //#endregion render
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.CONTAINERS, Layout);
//#endregion Layout
//#region Template
if (core.isHTMLRenderer) {
    const LayoutTpl = '<jagui-layout id="{internalId}" data-class="Layout" class="Control Layout"><properties>{ "name": "{name}" }</properties></jagui-layout>';
    core.classes.registerTemplates([{ Class: Layout, template: LayoutTpl }]);
}
//#endregion Template
export { Layout };
//#region Imports
import "./captioncontrol.js";
import "./labeleffects.js";
//#endregion Imports
//#region Label
Core.themes.Label = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let caption;
        //#endregion Variables déclaration
        ctx.save();
        caption = Core.themes.CaptionControl.render(obj, obj.effect);
        ctx.restore();
    }
    //#endregion render
};
//#endregion Label
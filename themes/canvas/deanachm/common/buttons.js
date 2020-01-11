//#region Imports
//#endregion Imports
//#region Button
Core.themes.deanachm.SpeedButton.render =
Core.themes.deanachm.Button.render = function (obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const width = obj.width;
    const height = obj.height;
    let grad = ctx.createLinearGradient(0,0,0,height);
    const themeName = obj.app.themeName;
    const buttonTheme = Core.themes[themeName].Button;
    const pressed = obj.isPressed?"PRESSED":String.EMPTY;
    const SHADOWBACK = buttonTheme[`${pressed}SHADOWBACK`];
    let BORDERCOLOR = buttonTheme[`${pressed}BORDERCOLOR`];

    //#endregion Variables déclaration
    ctx.save();
    if (!obj.enabled) {
        ctx.globalAlpha = 0.5;
    }
    ctx.beginPath();
    buttonTheme.BACKCOLOR.forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.fillStyle = grad;
    ctx.roundRect(0, 0, width, height, buttonTheme.borderRadius);
    ctx.shadowOffsetX = SHADOWBACK.offset.x;
    ctx.shadowOffsetY = SHADOWBACK.offset.y;
    ctx.shadowBlur = ~~(SHADOWBACK.blur/(obj instanceof Core.classes.SpeedButton && !obj.isPressed?3:1));
    ctx.shadowColor = SHADOWBACK.color;
    if (obj.isFocused) {
        BORDERCOLOR = buttonTheme[`PRESSEDBORDERCOLOR`];
    }
    ctx.fill();
    ctx.clearShadow();
    if (!(obj instanceof Core.classes.SpeedButton)) {
        grad = ctx.createLinearGradient(0,0,0,height);
        BORDERCOLOR.forEach(bc => {
            grad.addColorStop(bc.offset, bc.color);
        });
        ctx.strokeStyle = grad;
        ctx.stroke();
    }

    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion Button
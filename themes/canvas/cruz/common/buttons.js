//#region Imports
//#endregion Imports
//#region Button / SpeedButton
Core.themes.cruz.SpeedButton.render = 
Core.themes.cruz.Button.render = function (obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const width = obj.width;
    const height = obj.height;
    const grad = ctx.createLinearGradient(0,0,0,height);
    const themeName = obj.app.themeName;
    const buttonTheme = Core.themes[themeName].Button;
    const pressedHovered = obj.isPressed?"PRESSED":obj.isMouseOver?"HOVERED":String.EMPTY;
    let BORDERCOLOR;
    //#endregion Variables déclaration
    ctx.save();
    if (!obj.enabled) {
        ctx.globalAlpha = 0.5;
    }
    ctx.beginPath();
    buttonTheme[`${pressedHovered}BACKCOLOR`].forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.fillStyle = grad;
    ctx.roundRect(0.5, 0.5, width-1, height-1, buttonTheme.borderRadius);
    ctx.fill();
    buttonTheme[`${pressedHovered}INSETCOLOR`].forEach(ic => {
        ctx.save();
        ctx.clipRect(0,0,width-1,height-1);
        ctx.translate(ic.offset,ic.offset);
        ctx.beginPath();
        ctx.roundRect(0.5, 0.5, width-1, height-1, buttonTheme.borderRadius - 1);
        ctx.strokeStyle = ic.color;
        ctx.stroke();
        ctx.restore();
    });
    BORDERCOLOR = buttonTheme[`${obj.isFocused && !obj.isPressed && !obj.isMouseOver?"FOCUSED":pressedHovered}BORDERCOLOR`];
    if (obj instanceof Core.classes.SpeedButton && !obj.isPressed) {
        BORDERCOLOR = Core.themes[themeName].SpeedButton.BORDERCOLOR;
    }
    ctx.beginPath();
    ctx.roundRect(0.5, 0.5, width-1, height-1, buttonTheme.borderRadius);
    ctx.strokeStyle = BORDERCOLOR;
    ctx.stroke();

    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion Button / SpeedButton
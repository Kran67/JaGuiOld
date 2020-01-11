//#region Imports
//#endregion Imports
//#region Button
Core.themes.corona12.Button.render = function (obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const width = obj.width;
    const height = obj.height;
    const grad = ctx.createLinearGradient(0,0,0,height);
    const themeName = obj.app.themeName;
    const buttonTheme = Core.themes[themeName][obj.constructor.name];
    const pressedHovered = obj.isPressed?"PRESSED":obj.isMouseOver?"HOVERED":String.EMPTY;
    //#endregion Variables déclaration
    ctx.save();
    if (!obj.enabled) {
        ctx.globalAlpha = 0.5;
    }
    ctx.beginPath();
    if (obj.isFocused) {
    } else {
        buttonTheme[`${pressedHovered}BACKCOLOR`].forEach(cs => {
            grad.addColorStop(cs.offset, cs.color);
        });
        ctx.fillStyle = grad;
        ctx.roundRect(0.5, 0.5, width-1, height-1, buttonTheme.borderRadius);
        ctx.fill();
        ctx.strokeStyle = buttonTheme.BORDERCOLOR;
        ctx.stroke();
    }

    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion Button
//#region SpeedButton
Core.themes.corona12.SpeedButton.render = function (obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const width = obj.width;
    const height = obj.height;
    const grad = ctx.createLinearGradient(0,0,0,height);
    const themeName = obj.app.themeName;
    const buttonTheme = Core.themes[themeName][obj.constructor.name];
    const pressedHovered = obj.isPressed?"PRESSED":obj.isMouseOver?"HOVERED":String.EMPTY;
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
    ctx.clearShadow();
    ctx.strokeStyle = buttonTheme.BORDERCOLOR;
    ctx.stroke();

    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion SpeedButton
//#region Imports
//#endregion Imports
//#region Button
Core.themes.macos.Button.render = function (obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const width = obj.width;
    const height = obj.height;
    let grad, p;
    const themeName = obj.app.themeName;
    const buttonTheme = Core.themes[themeName][obj.constructor.name];
    const pressedHovered = obj.isPressed?"PRESSED":obj.isMouseOver?"HOVERED":String.EMPTY;
    const background = buttonTheme[`${pressedHovered}BACKGROUND`];
    const halo = background.HALO;
    //#endregion Variables déclaration
    ctx.save();
    if (!obj.enabled) {
        ctx.globalAlpha = 0.5;
    }
    ctx.beginPath();
    ctx.fillStyle = background.color;
    ctx.roundRect(0, 0, width, height, buttonTheme.borderRadius);
    ctx.shadowColor = buttonTheme.SHADOWCOLOR;
    ctx.shadowBlur = buttonTheme.SHADOWBLUR;
    ctx.shadowOffsetX = buttonTheme.SHADOWOFFSET.x;
    ctx.shadowOffsetY = buttonTheme.SHADOWOFFSET.y;
    ctx.fill();
    ctx.clearShadow();
    background.image.forEach(img => {
        switch (img.direction) {
            case "bottom":
            case "top":
                grad = ctx.createLinearGradient(0,1,0,height-2)
                break;
            case "right":
            case "left":
                grad = ctx.createLinearGradient(1,0,width-2,0)
                break;
        }
        img.colorstops.forEach(cs => {
            p = Math.abs(cs.offset);
            if (cs.offset>1 || cs.offset<0) {
                switch (img.direction) {
                    case "bottom":
                    case "top":
                        if (p>10) {
                            p = p / 10;
                        }
                        p = (p * 100 / (height-2)) / 100;
                        break;
                    case "right":
                    case "left":
                        if (p>10) {
                            p = p / 10;
                        }
                        p = (p * 100 / (width-2)) / 100;
                        break;
                }
                if (cs.offset<0) {
                    p = 1 - p;
                }
            }
            grad.addColorStop(p, cs.color);
        });
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, buttonTheme.borderRadius);
        ctx.fillStyle = grad;
        ctx.fill();
    });
    // The Halo
    ctx.beginPath();
    grad = ctx.createLinearGradient(0,halo.top,0,halo.height);
    halo.image.forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.roundRect(halo.left, halo.top, width - halo.left - halo.right, halo.height, halo.borderRadius);
    ctx.fillStyle = grad;
    ctx.fill();


    ctx.beginPath();
    ctx.roundRect(0.5, 0.5, width-1, height-1, buttonTheme.borderRadius);
    ctx.strokeStyle = buttonTheme.BORDERCOLOR;
    ctx.stroke();

    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion Button
//#region SpeedButton
Core.themes.macos.SpeedButton.render = function (obj) {
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
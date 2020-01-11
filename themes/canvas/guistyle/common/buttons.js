//#region Imports
//#endregion Imports
//#region Button
Core.themes.guistyle.Button.render = function (obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const width = obj.width;
    const height = obj.height;
    let grad = ctx.createLinearGradient(0,0,0,height);
    const themeName = obj.app.themeName;
    const buttonTheme = Core.themes[themeName][obj.constructor.name];
    const pressedHovered = obj.isPressed?"PRESSED":obj.isMouseOver?"HOVERED":String.EMPTY;
    const topEdgeColor = obj.isPressed?"#C04B31":obj.isMouseOver?"#FFC251":"#FFA891";
    const bottomEdgeColor = obj.isPressed?"#8D0B01":obj.isMouseOver?"#CF5E00":"#B20C00";
    const topColor = obj.isFocused && !obj.isPressed && !obj.isMouseOver?"#FFC351":"#FBFBFB";
    const bottomColor = obj.isFocused && !obj.isPressed && !obj.isMouseOver?"#CF5E00":"#AAA";
    //#endregion Variables déclaration
    ctx.save();
    if (!obj.enabled) {
        ctx.globalAlpha = 0.5;
    }
    ctx.beginPath();
    buttonTheme[`${pressedHovered!==String.EMPTY?pressedHovered:obj.isFocused?"FOCUSED":String.EMPTY}BACKCOLOR`].forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.fillStyle = grad;
    ctx.rect(0.5, 0.5, width-1, height-1);
    ctx.fill();
    if (obj.isMouseOver && !obj.isPressed) {
        grad = ctx.createLinearGradient(0,0,width,0);
        ctx.beginPath();
        buttonTheme.EFFECTBACKCOLOR.forEach(cs => {
            grad.addColorStop(cs.offset, cs.color);
        });
        ctx.fillStyle = grad;
        ctx.rect(0.5, 0.5, width-1, height-1);
        ctx.fill();
    }
    ctx.strokeStyle = buttonTheme.BORDERCOLOR;
    ctx.stroke();
    // edges
    ctx.beginPath();
    ctx.rect(4.5,0.5,width - 9,height-1);
    ctx.stroke();
    // edge background
    grad = ctx.createLinearGradient(0,0,0,height);
    buttonTheme[`${pressedHovered}EDGEBACKCOLOR`].forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.rect(1,1,3,height-2);
    ctx.rect(width - 4,1,3,height-2);
    ctx.fill();
    // 
    ctx.beginPath();
    ctx.moveTo(1,1.5);
    ctx.lineTo(4,1.5);
    ctx.moveTo(width-4,1.5);
    ctx.lineTo(width-1,1.5);
    ctx.strokeStyle = topEdgeColor;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1,height-1.5);
    ctx.lineTo(4,height-1.5);
    ctx.moveTo(width-4,height-1.5);
    ctx.lineTo(width-1,height-1.5);
    ctx.strokeStyle = bottomEdgeColor;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(5,1.5);
    ctx.lineTo(width-5,1.5);
    ctx.strokeStyle = topColor;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(5,height-1.5);
    ctx.lineTo(width-5,height-1.5);
    ctx.strokeStyle = bottomColor;
    ctx.stroke();

    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion Button
//#region SpeedButton
Core.themes.guistyle.SpeedButton.render = function (obj) {
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
    ctx.strokeStyle = buttonTheme[`${pressedHovered}BORDERCOLOR`];
    ctx.rect(0.5, 0.5, width-1, height-1);
    ctx.fill();
    ctx.stroke();

    if (pressedHovered !== String.EMPTY) {
        buttonTheme.INSETCOLOR.forEach(ic => {
            const h = ic.offsetY<0?height+ic.offsetY-1:ic.offsetY;
            ctx.beginPath();
            ctx.strokeStyle = ic.color;
            ctx.moveTo(1, h + 0.5);
            ctx.lineTo(width-1,h + 0.5);
            ctx.stroke();
        });
    }
    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion SpeedButton
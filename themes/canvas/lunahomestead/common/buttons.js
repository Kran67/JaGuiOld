//#region Imports
import { Color } from "../../../../scripts/core/color.js";
//#endregion Imports
//#region Button
Core.themes.lunahomestead.Button.render = function (obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const width = obj.width;
    const height = obj.height;
    let grad = ctx.createLinearGradient(0,0,0,height);
    const themeName = obj.app.themeName;
    const buttonTheme = Core.themes[themeName][obj.constructor.name];
    let pressedHovered;
    //#endregion Variables déclaration
    ctx.save();
    if (!obj.enabled) {
        ctx.globalAlpha = 0.5;
    }
    ctx.beginPath();
    ctx.fillStyle = "#FFF";
    ctx.roundRect(0.5, 0.5, width-1, height-1, buttonTheme.borderRadius);
    ctx.fill();
    ctx.clearShadow();
    ctx.strokeStyle = buttonTheme.BORDERCOLOR;
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = buttonTheme.SHADOWCOLOR;
    ctx.roundRect(0.5 - buttonTheme.SHADOWBLUR, 0.5 - buttonTheme.SHADOWBLUR, width + buttonTheme.SHADOWBLUR, height + buttonTheme.SHADOWBLUR, buttonTheme.borderRadius);
    ctx.stroke();

    // INNER BORDER
    if (obj.isMouseOver&&!obj.isPressed) {
        pressedHovered = "HOVERED";
    }
    else if ((obj.isPressed||obj.isFocused)) {
        pressedHovered = "FOCUSED";
    }
    if (buttonTheme[`${pressedHovered}INNERBORDER`]) {
        grad = ctx.createLinearGradient(0,0,0,height);
        ctx.beginPath();
        buttonTheme[`${pressedHovered}INNERBORDER`].forEach(cs => {
            grad.addColorStop(cs.offset, cs.color);
        });
        ctx.fillStyle = grad;
        ctx.roundRect(1, 1, width-2, height-2, buttonTheme.borderRadius);
        ctx.fill();
    }
    pressedHovered = obj.isPressed?"PRESSED":obj.isMouseOver?"HOVERED":String.EMPTY;
    if (obj.isMouseOver&&!obj.isPressed)  {
        pressedHovered = String.EMPTY;
    }
    if (buttonTheme[`${pressedHovered}BACKCOLOR`]) {
        grad = ctx.createLinearGradient(0,0,0,height);
        ctx.beginPath();
        buttonTheme[`${obj.isMouseOver&&!obj.isPressed?String.EMPTY:pressedHovered}BACKCOLOR`].forEach(cs => {
            grad.addColorStop(cs.offset, cs.color);
        });
        ctx.fillStyle = grad;
        ctx.fillRect(buttonTheme.innerBorderSize+1, buttonTheme.innerBorderSize+1, width-2-(buttonTheme.innerBorderSize * 2), 
            height-2-(buttonTheme.innerBorderSize * 2));
    }

    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion Button
//#region SpeedButton
Core.themes.lunahomestead.SpeedButton.render = function (obj) {
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
    if (buttonTheme[`${pressedHovered}BACKCOLOR`]) {
        ctx.beginPath();
        buttonTheme[`${pressedHovered}BACKCOLOR`].forEach(cs => {
            grad.addColorStop(cs.offset, cs.color);
        });
        ctx.fillStyle = grad;
        ctx.roundRect(0.5, 0.5, width-1, height-1, buttonTheme.borderRadius);
        ctx.fill();
    }
    if (buttonTheme[`${pressedHovered}BORDERCOLOR`]) {
        ctx.strokeStyle = buttonTheme[`${pressedHovered}BORDERCOLOR`];
        ctx.stroke();
    }
    if (obj.isPressed && buttonTheme.PRESSEDTEXTCOLOR) {
        obj.color = Color.parse(buttonTheme.PRESSEDTEXTCOLOR);
    } else {
        obj.color = Color.parse(Core.themes[themeName].DEFAULTTEXTCOLOR);
    }
    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion SpeedButton
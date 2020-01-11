//#region Imports
import { Color } from "../../../../scripts/core/color.js";
//#endregion Imports
//#region Button
Core.themes.haiku.Button.render = function (obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const width = obj.width;
    const height = obj.height;
    let grad = ctx.createLinearGradient(0,0,0,height);
    const themeName = obj.app.themeName;
    const buttonTheme = Core.themes[themeName][obj.constructor.name];
    const pressedHovered = obj.isPressed?"PRESSED":obj.isMouseOver?String.EMPTY:String.EMPTY;
    //#endregion Variables déclaration
    ctx.save();
    if (!obj.enabled) {
        ctx.globalAlpha = 0.5;
    }
    // OUTER COLORS
    ctx.rectWithBordersColor(-1,-1,width+1,height+1, buttonTheme.OUTERCOLORS);

    ctx.beginPath();
    buttonTheme[`${pressedHovered}BACKCOLOR`].forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.fillStyle = grad;
    ctx.rect(0.5, 0.5, width-1, height-1);
    ctx.fill();
    ctx.clearShadow();
    // INNER COLORS
    if (buttonTheme[`${pressedHovered}INNERCOLORS`]) {
        for (let i=0,l=obj.isPressed?2:1;i<l;i++) {
            ctx.rectWithBordersColor(1+i,1+i,width-3-i,height-3-i, buttonTheme[`${pressedHovered}INNERCOLORS`]);
        }
    }

    ctx.beginPath();
    ctx.rect(0.5, 0.5, width-1, height-1);
    ctx.strokeStyle = buttonTheme.BORDERCOLOR;
    if (obj.isFocused && !obj.isPressed) {
        ctx.strokeStyle = buttonTheme.FOCUSEDCOLOR;
    }
    ctx.stroke();

    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion Button
//#region SpeedButton
Core.themes.haiku.SpeedButton.render = function (obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const width = obj.width;
    const height = obj.height;
    const grad = ctx.createLinearGradient(0,0,0,height);
    const themeName = obj.app.themeName;
    const buttonTheme = Core.themes[themeName][obj.constructor.name];
    const pressedHovered = obj.isPressed?"PRESSED":obj.isMouseOver?String.EMPTY:String.EMPTY;
    //#endregion Variables déclaration
    ctx.save();
    if (!obj.enabled) {
        ctx.globalAlpha = 0.5;
    }
    // OUTER COLORS
    if (buttonTheme[`${pressedHovered}OUTERCOLORS`]) {
        ctx.rectWithBordersColor(-1,-1,width+1,height+1, buttonTheme[`${pressedHovered}OUTERCOLORS`]);
    }

    ctx.beginPath();
    buttonTheme[`${pressedHovered}BACKCOLOR`].forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.fillStyle = grad;
    ctx.rect(0.5, 0.5, width-1, height-1);
    ctx.fill();
    if (obj.isPressed) {
        obj.color = Color.parse(buttonTheme.PRESSEDTEXTCOLOR);
        // INNER COLORS
        if (buttonTheme[`${pressedHovered}INNERCOLORS`]) {
            for (let i=0,l=obj.isPressed?2:1;i<l;i++) {
                ctx.rectWithBordersColor(1+i,1+i,width-3-i,height-3-i, buttonTheme[`${pressedHovered}INNERCOLORS`]);
            }
        }
    } else {
        obj.color = Color.parse(buttonTheme.TEXTCOLOR);
    }
    ctx.beginPath();
    if (buttonTheme[`${pressedHovered}BORDERCOLOR`]) {
        ctx.rect(0.5, 0.5, width-1, height-1);
        ctx.strokeStyle = buttonTheme[`${pressedHovered}BORDERCOLOR`];
        ctx.stroke();
    }
    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion SpeedButton
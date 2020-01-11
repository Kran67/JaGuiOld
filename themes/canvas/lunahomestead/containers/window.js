//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.lunahomestead.Window.render = function (obj) {
    //#region Variables déclaration
    const borderStyle = obj.borderStyle;
    const windowState = obj.windowState;
    const width = obj.contentWidth;
    const height = obj.contentHeight;
    const WINDOWSTATES = Window.WINDOWSTATES;
    const BORDERSTYLES = Window.BORDERSTYLES;
    const cornerRadius = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 10 : 0;
    const themeName = obj.app.themeName;
    const titlebarImg = Core.themes[themeName].images.titlebar;
    const windowTheme = Core.themes[themeName].Window;
    const ctx = Core.ctx;
    const isActiveWindow = obj.activeWindow;
    //#endregion Variables déclaration
    ctx.save();
    ctx.clipRect(0, 0, width, height);

    ctx.beginPath();
    ctx.roundRect(0.5, 0.5, width - 1, height - 1, cornerRadius, cornerRadius, 0, 0);
    ctx.fillStyle = windowTheme.BACKCOLOR;
    ctx.fill();
    if (borderStyle !== BORDERSTYLES.NONE) {
        ctx.strokeStyle = `#${(isActiveWindow?"8BA169":"D7DBBD")}`;
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `#${(isActiveWindow?"758D5E":"C8D0B7")}`;
        ctx.moveTo(0.5, 8);
        ctx.lineTo(0.5, obj.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `#${(isActiveWindow?"5E764F":"B7BDAB")}`;
        ctx.moveTo(1, obj.height - 0.5);
        ctx.lineTo(obj.width, obj.height - 0.5);
        ctx.moveTo(obj.width - 0.5, 8);
        ctx.lineTo(obj.width - 0.5, obj.height);
        ctx.stroke();
        // left
        ctx.beginPath();
        ctx.moveTo(1.5, 6);
        ctx.lineTo(1.5, obj.height - 1);
        ctx.strokeStyle = `#${(isActiveWindow?"8BA169":"D0D6BD")}`;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(2.5, 4);
        ctx.lineTo(2.5, obj.height - 3);
        ctx.strokeStyle = `#${(isActiveWindow?"ABBD85":"ABBD85")}`;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(3.5, 29);
        ctx.lineTo(3.5, obj.height - 3);
        ctx.strokeStyle = `#${(isActiveWindow?"A4B27F":"E0E2C8")}`;
        ctx.stroke();
        // right
        ctx.beginPath();
        ctx.moveTo(obj.width - 1.5, 6);
        ctx.lineTo(obj.width - 1.5, obj.height - 1);
        ctx.strokeStyle = `#${(isActiveWindow?"899B6D":"BFC3B0")}`;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(obj.width - 2.5, 4);
        ctx.lineTo(obj.width - 2.5, obj.height - 2);
        ctx.strokeStyle = `#${(isActiveWindow?"BAC891":"CACFB9")}`;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(obj.width - 3.5, 29);
        ctx.lineTo(obj.width - 3.5, obj.height - 3);
        ctx.strokeStyle = `#${(isActiveWindow?"CBD798":"D6DCC2")}`;
        ctx.stroke();
        // bottom
        ctx.beginPath();
        ctx.moveTo(2, obj.height - 1.5);
        ctx.lineTo(obj.width - 2, obj.height - 1.5);
        ctx.strokeStyle = `#${(isActiveWindow?"899B6D":"BFC3B0")}`;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(2, obj.height - 2.5);
        ctx.lineTo(obj.width - 3, obj.height - 2.5);
        ctx.strokeStyle = `#${(isActiveWindow?"BBC691":"CBCFB9")}`;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(3, obj.height - 3.5);
        ctx.lineTo(obj.width - 3, obj.height - 3.5);
        ctx.strokeStyle = `#${(isActiveWindow?"CBD798":"D6DCC2")}`;
        ctx.stroke();
        // top
        ctx.beginPath();
        ctx.moveTo(6, 1.5);
        ctx.lineTo(obj.width - 6, 1.5);
        ctx.strokeStyle = `#${(isActiveWindow?"E9F2C7":"F1F2DB")}`;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(5, 2.5);
        ctx.lineTo(obj.width - 5, 2.5);
        ctx.strokeStyle = `#${(isActiveWindow?"E0E7B8":"EDEBD3")}`;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(4, 29.5);
        ctx.lineTo(obj.width - 4, 29.5);
        ctx.strokeStyle = `#${(isActiveWindow?"96A867":"CBCEB6")}`;
        ctx.stroke();
        // gradients
        if (titlebarImg) {
            ctx.clipRect(3, 3, obj.width-6, 26);
            ctx.drawImage(titlebarImg, 3, isActiveWindow?3:-23, obj.width - 6, 52);
        }
    }
    ctx.restore();
};
//#endregion Window
//#region WindowTitleBar
Core.themes.lunahomestead.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        let offsetX = 2;
        let offsetY = 2;
        const logoImg = Core.themes.images.logo;
        const caption = form.caption;
        const isActiveWindow = form.activeWindow;
        const themeName = obj.app.themeName;
        const titleBarTheme = Core.themes[themeName].Window.WindowTitleBar;
        const PT = Types.CSSUNITS.PT;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, obj.contentWidth, obj.contentHeight);
        if ([BORDERSTYLES.SINGLE, BORDERSTYLES.SIZEABLE].indexOf(borderStyle) > -1) {
            if (logoImg) {
                ctx.drawImage(logoImg, offsetX, offsetY, 16, 16);
            }
        } else {
            offsetX = -20;
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        if (isActiveWindow) {
            ctx.shadowBlur = 1;
            ctx.shadowColor = titleBarTheme.TEXTSHADOWCOLOR;
            ctx.shadowOffsetX = ctx.shadowOffsetY = titleBarTheme.TEXTSHADOWOFFSET;
        }
        ctx.fillStyle = titleBarTheme[`${inactive}ACTIVECAPTIONTEXTCOLOR`];
        ctx.fillText(caption, 22 + offsetX, 12);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButtons
Core.themes.lunahomestead.WindowCloseButton =
    Core.themes.lunahomestead.WindowMaxRestoreButton =
    Core.themes.lunahomestead.WindowMinimizeButton =
    Core.themes.lunahomestead.WindowHelpButton =
    Core.themes.lunahomestead.WindowRollUpDownButton =
    Core.themes.lunahomestead.WindowStayOnOffButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let caption = String.EMPTY;
        const PX = Types.CSSUNITS.PX;
        let offsetX = 0;
        let offsetY = 0;
        const classes = Core.classes;
        const form = obj.form;
        const width = obj.width;
        const height = obj.height;
        const isActiveWindow = form.activeWindow;
        const themeName = obj.app.themeName;
        const windowbtnsImg = Core.themes[themeName].images.windowbtns;
        const buttonsTheme = Core.themes[themeName].Window.WindowTitleBar.WindowButton;
        const pressed = obj.isPressed?"PRESSES":String.EMPTY;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        let glyphColor = buttonsTheme[`${inactive}ACTIVE${pressed}TEXTCOLOR`];
        const CONSTANTS = Types.CONSTANTS;
        let metrics;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        if (windowbtnsImg) {
            if (obj.enabled && isActiveWindow) {
                if (obj.isPressed) {
                    offsetX += 21 * 2;
                } else if (obj.isMouseOver && obj.enabled) {
                    offsetX += 21;
                }
            }
            if (!isActiveWindow) {
                offsetX = 63;
            }
            if (obj instanceof classes.WindowCloseButton) {
                offsetY += 21;
            }
            ctx.drawImage(windowbtnsImg, -offsetX, -offsetY, 84, 42);
        }
        if (obj instanceof classes.WindowCloseButton && obj.isPressed) {
            glyphColor = buttonsTheme.close[`${inactive}ACTIVE${pressed}TEXTCOLOR`];
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `${buttonsTheme.FONTSIZE}${PX} ${CONSTANTS.BTNGLYPHFONTFACE}`;
        ctx.fillStyle = glyphColor;
        caption = obj.owner.getCaptionButton(obj);
        metrics = ctx.measureText(caption);
        ctx.fillText(caption, (width - metrics.width - 1) / 2, (height - metrics.height) / 2);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButtons
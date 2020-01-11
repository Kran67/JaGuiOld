//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.guistyle.Window.render = function (obj) {
    //#region Variables déclaration
    const borderStyle = obj.borderStyle;
    const windowState = obj.windowState;
    const width = obj.contentWidth;
    const height = obj.contentHeight;
    const WINDOWSTATES = Window.WINDOWSTATES;
    const BORDERSTYLES = Window.BORDERSTYLES;
    const themeName = obj.app.themeName;
    const windowTheme = Core.themes[themeName].Window;
    const ctx = Core.ctx;
    const isActiveWindow = obj.activeWindow;
    const offsetY = Window.WINDOWSIZEABLEBORDERSIZE;
    let gradient;
    const inactive = !isActiveWindow?"IN":String.EMPTY;
    //#endregion Variables déclaration
    ctx.save();
    // Drop shadow
    if (windowState !== WINDOWSTATES.MAXIMIZED && obj.enabledShadow) {
        ctx.shadowBlur = windowTheme.SHADOWBLUR;
        ctx.shadowOffsetX = ctx.shadowOffsetY = windowTheme.SHADOWOFFSET;
        ctx.shadowColor = windowTheme.SHADOWCOLOR;
    }
    ctx.beginPath();
    ctx.rect(0.5, 0.5, width - 1, height - 1);
    ctx.fillStyle = windowTheme.BACKCOLOR;
    ctx.fill();
    ctx.clearShadow();
    ctx.strokeStyle = windowTheme[`${inactive}ACTIVEEDGECOLOR`];
    ctx.stroke();
    if (borderStyle !== BORDERSTYLES.NONE) {
        ctx.beginPath();
        ctx.strokeStyle = `#${isActiveWindow?"FFA891":"E1E1E1"}`;
        ctx.moveTo(1,1.5);
        ctx.lineTo(width - 1, 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(0, 0, width, 25 + offsetY);
        gradient = ctx.createLinearGradient(0, 2, 0, 18);
        windowTheme.WindowTitleBar[`${inactive}ACTIVEBACKCOLOR`].forEach(cs => {
            gradient.addColorStop(cs.offset, cs.color);
        });
        ctx.fillStyle = gradient;
        ctx.fillRect(1,2,width - 2, 18);
        ctx.beginPath();
        ctx.strokeStyle = `#${isActiveWindow?"CA1405":"B9B9B9"}`;
        ctx.moveTo(1,19.5);
        ctx.lineTo(width - 1, 19.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `#${isActiveWindow?"B30B00":"B9B9B9"}`;
        ctx.moveTo(1,20.5);
        ctx.lineTo(width - 1, 20.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `#${isActiveWindow?"9A0100":"A1A1A1"}`;
        ctx.moveTo(1,21.5);
        ctx.lineTo(width - 1, 21.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `#${isActiveWindow?"D91902":"BCBCBC"}`;
        ctx.moveTo(1, height - 1.5);
        ctx.lineTo(width - 1, height - 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `#${isActiveWindow?"FF977A":"E1E1E1"}`;
        ctx.moveTo(1, height - 2.5);
        ctx.lineTo(width - 1, height - 2.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `#${isActiveWindow?"9B0103":"A2A2A2"}`;
        ctx.moveTo(1, height - 3.5);
        ctx.lineTo(width - 1, height - 3.5);
        ctx.stroke();
    }
    ctx.restore();
};
//#endregion Window
//#region WindowTitleBar
Core.themes.guistyle.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        let offsetX = 2;
        let offsetY = 0;
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
        ctx.fillStyle = titleBarTheme[`${inactive}ACTIVECAPTIONTEXTCOLOR`];
        if (titleBarTheme.ACTIVESHADOWCOLOR) {
            ctx.shadowOffsetX = ctx.shadowOffsetY = titleBarTheme.SHADOWOFFSET;
            ctx.shadowColor = titleBarTheme[`${inactive}ACTIVESHADOWCOLOR`];
        }
        ctx.fillText(caption, 22 + offsetX, 10);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButtons
Core.themes.guistyle.WindowCloseButton =
Core.themes.guistyle.WindowMaxRestoreButton =
Core.themes.guistyle.WindowMinimizeButton =
Core.themes.guistyle.WindowHelpButton =
Core.themes.guistyle.WindowRollUpDownButton =
Core.themes.guistyle.WindowStayOnOffButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let caption = String.EMPTY;
        const PX = Types.CSSUNITS.PX;
        const form = obj.form;
        const width = obj.width;
        const height = obj.height;
        const isActiveWindow = form.activeWindow;
        const themeName = obj.app.themeName;
        const buttonsTheme = Core.themes[themeName].Window.WindowTitleBar.WindowButton;
        const CONSTANTS = Types.CONSTANTS;
        let textColor = Core.themes[themeName].DEFAULTTEXTCOLOR;
        const w2 = width / 2;
        let metrics;
        let bg, sk;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        let pressedHovered = obj.isPressed?"PRESSED":obj.isMouseOver?"HOVERED":String.EMPTY;
        //#endregion Variables déclaration
        ctx.save();
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        bg = ctx.createLinearGradient(0, 0, 0, height);
        if (obj.isMouseOver && !obj.enabled) {
            pressedHovered = String.EMPTY;
        }
        buttonsTheme[`${pressedHovered}BACKCOLOR`].forEach(cs => {
            bg.addColorStop(cs.offset, cs.color);
        });
        textColor = buttonsTheme[`${!isActiveWindow?inactive:pressedHovered}ACTIVETEXTCOLOR`];
        sk = ctx.createLinearGradient(0, 0, 0, height);
        buttonsTheme[`${inactive}ACTIVEBORDERCOLOR`].forEach(cs => {
            sk.addColorStop(cs.offset, cs.color);
        });
        ctx.beginPath();
        ctx.ellipse(w2 + 1, w2, w2 - 1, w2 - 1, 0, 0, CONSTANTS._2PI);
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = sk;
        ctx.stroke();
        ctx.clipRect(0, 0, width, height);
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `${buttonsTheme.FONTSIZE}${PX} ${CONSTANTS.BTNGLYPHFONTFACE}`;
        ctx.fillStyle = textColor;
        caption = obj.owner.getCaptionButton(obj);
        metrics = ctx.measureText(caption);
        ctx.fillText(caption, (width - metrics.width + 1) / 2, ((height - metrics.height) / 2) + 1);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButtons
//#region WindowContent
Core.themes.guistyle.WindowContent = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const themeName = obj.app.themeName;
        const contentTheme = Core.themes[themeName].Window.WindowContent;
        const ctx = Core.ctx;
        const width = obj.contentWidth;
        const height = obj.contentHeight;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        ctx.beginPath();
        ctx.fillStyle = contentTheme.BACKCOLOR;
        ctx.fillRect(0,0,width, height);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowContent
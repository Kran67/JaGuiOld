//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.watercolor.Window = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const borderStyle = obj.borderStyle;
        const windowState = obj.windowState;
        const width = obj.contentWidth;
        const height = obj.contentHeight;
        const WINDOWSTATES = Window.WINDOWSTATES;
        const BORDERSTYLES = Window.BORDERSTYLES;
        const themeName = obj.app.themeName;
        const windowTheme = Core.themes[themeName].window;
        const ctx = Core.ctx;
        const isActiveWindow = obj.activeWindow;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        const isRolledUp = windowState === WINDOWSTATES.ROLLEDUP;
        let offsetX = 160;
        let back;
        const images = Core.themes.watercolor.images;
        const titlebar = images.titlebar;
        const visibleButtons = obj.visibleButtons;
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
        ctx.fillStyle = windowTheme[`${inactive}ACTIVEBACKCOLOR`];
        ctx.fill();
        ctx.clearShadow();
        ctx.strokeStyle = windowTheme[`${inactive}ACTIVEEDGECOLOR`];
        ctx.stroke();
        if (borderStyle !== BORDERSTYLES.NONE) {
            if (isActiveWindow) {
                ctx.beginPath();
                ctx.fillStyle = windowTheme.titlebar.ACTIVEBACKCOLOR;
                ctx.fillRect(1, 1, width - 2, 21);
                back = ctx.createLinearGradient(0, 21, 0, height - 20);
                back.addColorStop(0, "#5297F9");
                back.addColorStop(1, "#3573D6");
                ctx.beginPath();
                ctx.fillStyle = back;
                ctx.fillRect(1, 21, 2, height - 22);
            }
            if (!isRolledUp && !obj.isMinimized) {
                ctx.beginPath();
                ctx.strokeStyle = "#336FCE";
                ctx.strokeRect(4.5, 23.5, width - 9, height - 28);
                if (!isActiveWindow) {
                    ctx.beginPath();
                    ctx.strokeStyle = "#3573D6";
                    ctx.strokeRect(3.5, 22.5, width - 7, height - 26);
                }
            }
            // titlebar
            if (titlebar && isActiveWindow) {
                offsetX = 160 - (6 - visibleButtons) * 18;
                ctx.clipRect(0, 0, width - 1, height);
                ctx.drawImage(titlebar, width - offsetX - 1, 1, 160, 21);
            }
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion Window
//#region WindowTitleBar
Core.themes.watercolor.WindowTitleBar = {
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
        const titleBarTheme = Core.themes[themeName].window.titlebar;
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
        ctx.fillStyle = titleBarTheme[`${inactive}CAPTIONTEXTCOLOR`];
        ctx.fillText(caption, 22 + offsetX, 8);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButton
Core.themes.watercolor.WindowButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let caption = String.EMPTY;
        const PX = Types.CSSUNITS.PX;
        const width = obj.contentWidth;
        const height = obj.contentHeight;
        const themeName = obj.app.themeName;
        const buttonsTheme = Core.themes[themeName].window.titlebar.buttons;
        const pressedHovered = obj.enabled?obj.isPressed?"PRESSED":obj.isMouseOver?"HOVERED":String.EMPTY:String.EMPTY;
        const CONSTANTS = Types.CONSTANTS;
        let textColor = Core.themes[themeName].DEFAULTTEXTCOLOR;
        let metrics;
        let bg, borderColor;
        const isActiveWindow = obj.form.activeWindow;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        //#endregion Variables déclaration
        ctx.save();
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        textColor = buttonsTheme[`${pressedHovered}${inactive}ACTIVETEXTCOLOR`];
        borderColor = buttonsTheme[`${pressedHovered}${inactive}ACTIVEBORDERCOLOR`];
        bg = buttonsTheme[`${pressedHovered}${inactive}ACTIVEBACKCOLOR`];
        ctx.strokeStyle = borderColor;
        ctx.beginPath();
        ctx.fillStyle = bg;
        ctx.rect(0.5, 0.5, width - 1, height - 1);
        ctx.fill();
        ctx.stroke();
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `${buttonsTheme.FONTSIZE}${PX} ${CONSTANTS.BTNGLYPHFONTFACE}`;
        ctx.fillStyle = textColor;
        caption = obj.owner.getCaptionButton(obj);
        metrics = ctx.measureText(caption);
        ctx.fillText(caption, (width - metrics.width - 1) / 2, (height - metrics.height) / 2 + 1);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButton
//#region WindowCloseButton
Core.themes.watercolor.WindowCloseButton =
    Core.themes.watercolor.WindowMaxRestoreButton =
    Core.themes.watercolor.WindowMinimizeButton =
    Core.themes.watercolor.WindowHelpButton =
    Core.themes.watercolor.WindowRollUpDownButton =
    Core.themes.watercolor.WindowStayOnOffButton = {
        //#region render
        render: function (obj) {
            Core.themes.watercolor.WindowButton.render(obj);
        }
        //#endregion render
    };
//#endregion WindowCloseButton
//#region WindowContent
Core.themes.watercolor.WindowContent = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const themeName = obj.app.themeName;
        const contentTheme = Core.themes[themeName].window.content;
        //#endregion Variables déclaration
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = contentTheme.BACKCOLOR;
        ctx.rect(0, 0, obj.contentWidth, obj.contentHeight);
        ctx.fill();
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowContent
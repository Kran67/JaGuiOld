//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.windows8.Window = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const width = obj.contentWidth;
        const height = obj.contentHeight;
        const themeName = obj.app.themeName;
        const windowTheme = Core.themes[themeName].window;
        const ctx = Core.ctx;
        const isActiveWindow = obj.activeWindow;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        //#endregion Variables déclaration
        ctx.save();
        ctx.beginPath();
        ctx.rect(0.5, 0.5, width - 1, height - 1);
        ctx.fillStyle = windowTheme[`${inactive}ACTIVEBACKCOLOR`];
        ctx.fill();
        ctx.strokeStyle = windowTheme[`${inactive}ACTIVEEDGECOLOR`];
        ctx.stroke();
        ctx.restore();
    }
    //#endregion render
};
//#endregion Window
//#region WindowTitleBar
Core.themes.windows8.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        const logoImg = Core.themes.images.logo;
        const caption = form.caption;
        const themeName = obj.app.themeName;
        const titleBarTheme = Core.themes[themeName].window.titlebar;
        const buttonsTheme = titleBarTheme.buttons;
        const PT = Types.CSSUNITS.PT;
        const visibleButtons = form.visibleButtons;
        let offsetX = 0;
        let metrics;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, obj.contentWidth, obj.contentHeight);
        if ([BORDERSTYLES.SINGLE, BORDERSTYLES.SIZEABLE].indexOf(borderStyle) > -1) {
            if (logoImg) {
                ctx.drawImage(logoImg, 0, 0, 16, 16);
            }
        } else {
            offsetX = -22;
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        metrics = ctx.measureText(caption);
        ctx.fillStyle = titleBarTheme.CAPTIONTEXTCOLOR;
        ctx.fillText(caption, 23 + offsetX + (obj.contentWidth - (borderStyle !== BORDERSTYLES.DIALOG?24:2) - visibleButtons * buttonsTheme.offset - metrics.width) / 2, 9);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButton
Core.themes.windows8.WindowButton = {
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
        const closeButtonTheme = buttonsTheme.close;
        const pressedHovered = obj.enabled?obj.isPressed?"PRESSED":obj.isMouseOver?"HOVERED":String.EMPTY:String.EMPTY;
        const isActiveWindow = obj.form.activeWindow;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        const CONSTANTS = Types.CONSTANTS;
        let textColor = Core.themes[themeName].DEFAULTTEXTCOLOR;
        let metrics;
        let bg;
        const classes = Core.classes;
        //#endregion Variables déclaration
        ctx.save();
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        bg = (obj instanceof classes.WindowCloseButton ? closeButtonTheme:buttonsTheme)[`${pressedHovered}${inactive}ACTIVEBACKCOLOR`];
        ctx.beginPath();
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
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
Core.themes.windows8.WindowCloseButton =
    Core.themes.windows8.WindowMaxRestoreButton =
    Core.themes.windows8.WindowMinimizeButton =
    Core.themes.windows8.WindowHelpButton =
    Core.themes.windows8.WindowRollUpDownButton =
    Core.themes.windows8.WindowStayOnOffButton = {
        //#region render
        render: function (obj) {
            Core.themes.windows8.WindowButton.render(obj);
        }
        //#endregion render
    };
//#endregion WindowCloseButton
//#region WindowContent
Core.themes.windows8.WindowContent = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const form = obj.form;
        const windowState = form.windowState;
        const WINDOWSTATES = Window.WINDOWSTATES;
        //#endregion Variables déclaration
        if (windowState !== WINDOWSTATES.MINIMIZED) {
            ctx.beginPath();
            ctx.rect(0, 0, obj.contentWidth, obj.contentHeight);
            ctx.fillStyle = "#F0F0F0";
            ctx.fill();
        }
    }
    //#endregion render
};
//#endregion WindowContent
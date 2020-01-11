//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.prolcd.Window = {
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
        const cornerRadius = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 9 : 0;
        let bg;
        //#endregion Variables déclaration
        ctx.save();
        if (borderStyle !== BORDERSTYLES.NONE) {
            ctx.beginPath();
            ctx.roundRect(0.5, 0.5, width - 1, height - 1, { tl:cornerRadius, tr:cornerRadius, br:0, bl:0});
            ctx.fillStyle = windowTheme.BACKCOLOR;
            ctx.fill();
            ctx.strokeStyle = windowTheme.EDGECOLOR;
            ctx.stroke();
            // Content
            ctx.beginPath();
            ctx.fillStyle = "#D6D6D5";
            ctx.fillRect(5, 27, width - 10, height - 32);
            ctx.beginPath();
            ctx.fillStyle = "#D1D2D1";
            ctx.fillRect(3, 27, 2, height - 32);
            ctx.fillRect(width - 5, 27, 2, height - 32);
            ctx.beginPath();
            ctx.fillStyle = "#C9C8C8";
            ctx.fillRect(5, height - 5, width - 10, 2);
            // TitleBar
            bg = ctx.createLinearGradient(0, 2, 0, 25);
            windowTheme.titlebar.BACKCOLOR.forEach(cs => {
                bg.addColorStop(cs.offset, cs.color);
            });
            ctx.beginPath();
            ctx.roundRect(2, 2, width - 4, 25, { tl:cornerRadius+2, tr:cornerRadius+2, br:17, bl:17});
            ctx.fillStyle = bg;
            ctx.fill();
            ctx.beginPath();
            ctx.roundRect(3, 2.5, width - 6, 20, cornerRadius);
            bg = ctx.createLinearGradient(0, 4, 0, 20);
            bg.addColorStop(0, "#E5E4E5");
            bg.addColorStop(0.25, "#E5E4E5");
            bg.addColorStop(1, "rgba(229,228,229,0)");
            ctx.strokeStyle = bg;
            ctx.stroke();
            ctx.beginPath();
            ctx.roundRect(3, 3.5, width - 6, 20, cornerRadius);
            bg = ctx.createLinearGradient(0, 5, 0, 20);
            bg.addColorStop(0, "#EBEAEB");
            bg.addColorStop(0.25, "#EBEAEB");
            bg.addColorStop(1, "rgba(235,234,235,0)");
            ctx.strokeStyle = bg;
            ctx.stroke();
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion Window
//#region WindowTitleBar
Core.themes.prolcd.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        let offsetX = 2;
        let offsetY = 1;
        const logoImg = Core.themes.images.logo;
        const caption = form.caption;
        const isActiveWindow = form.activeWindow;
        const themeName = obj.app.themeName;
        const titleBarTheme = Core.themes[themeName].window.titlebar;
        const buttonsTheme = titleBarTheme.buttons;
        const PT = Types.CSSUNITS.PT;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        let w = obj.visibleButtons * 18;
        let left = 113.5;
        let metrics
        const visibleButtons = form.visibleButtons;
        const btnsSpace = visibleButtons * buttonsTheme.offset;
        const width = obj.contentWidth;
        const height = obj.contentHeight;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        if ([BORDERSTYLES.SINGLE, BORDERSTYLES.SIZEABLE].indexOf(borderStyle) > -1) {
            if (logoImg) {
                ctx.drawImage(logoImg, offsetX, offsetY, 16, 16);
            }
        }
        if (obj.visibleButtons < 6) {
            left -= (6 - obj.visibleButtons) * 18;
        }
        if (obj.visibleButtons === 5) {
            w--;
            left--;
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        ctx.fillStyle = titleBarTheme[`${inactive}ACTIVECAPTIONTEXTCOLOR`];
        metrics = ctx.measureText(caption);
        if ([BORDERSTYLES.SINGLE, BORDERSTYLES.SIZEABLE].indexOf(borderStyle) > -1) {
            ctx.fillText(caption, 24 + (obj.contentWidth - 23 - btnsSpace - metrics.width) / 2, 11);
        } else if (borderStyle === BORDERSTYLES.DIALOG) {
            ctx.fillText(caption, 1 + (obj.contentWidth - btnsSpace - metrics.width) / 2, 11);
        }
        ctx.beginPath();
        ctx.strokeStyle = "#555655";
        ctx.fillStyle = "#CFD5B3";
        ctx.roundRect(width - left + 1, 1.5, w, 16, 7);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.clipRect(width - left + 2, 1.5, w - 4, 16);
        ctx.roundRect(width - left - 1, 1.5, w + 2, 20, 7);
        ctx.shadowBlur = 2.5;
        ctx.shadowOffsetY = 1;
        ctx.shadowColor = "#000";
        ctx.stroke();
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButton
Core.themes.prolcd.WindowButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let caption = String.EMPTY;
        const PX = Types.CSSUNITS.PX;
        let offsetX = 0;
        let offsetY = 0;
        const width = obj.width;
        const height = obj.height;
        const themeName = obj.app.themeName;
        const buttonsTheme = Core.themes[themeName].window.titlebar.buttons;
        const pressedHovered = obj.isPressed?"PRESSED":obj.isMouseOver?"HOVERED":String.EMPTY;
        const CONSTANTS = Types.CONSTANTS;
        let backColor = ctx.createLinearGradient(0,0,0,height);
        let textColor = Core.themes[themeName].DEFAULTTEXTCOLOR;
        let metrics;
        const windowBtns = Core.themes.prolcd.images.windowbtns;
        const classes = Core.classes;
        const isActiveWindow = obj.form.activeWindow;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, obj.contentWidth, obj.contentHeight);
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        if (obj.isPressed && isActiveWindow) {
            offsetX = 9;
        } else if (!isActiveWindow) {
            offsetX = 18;
        }
        if (obj instanceof classes.WindowCloseButton) {
            offsetY = 0;
        } else if (obj instanceof classes.WindowMaxRestoreButton) {
            offsetY = 10;
        } else if (obj instanceof classes.WindowMinimizeButton) {
            offsetY = 20;
        } else if (obj instanceof classes.WindowHelpButton) {
            offsetY = 30;
        } else if (obj instanceof classes.WindowRollUpDownButton) {
            offsetY = obj.isRolledUp ? 50 : 40;
        } else if (obj instanceof classes.WindowStayOnOffButton) {
            offsetY = obj.isStayOn ? 70 : 60;
        }
        if (windowBtns) {
            ctx.drawImage(windowBtns, -offsetX, -offsetY, 27, 80);
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButton
//#region WindowCloseButton
Core.themes.prolcd.WindowCloseButton =
    Core.themes.prolcd.WindowMaxRestoreButton =
    Core.themes.prolcd.WindowMinimizeButton =
    Core.themes.prolcd.WindowHelpButton =
    Core.themes.prolcd.WindowRollUpDownButton =
    Core.themes.prolcd.WindowStayOnOffButton = {
        //#region render
        render: function (obj) {
            Core.themes.prolcd.WindowButton.render(obj);
        }
        //#endregion render
    };
//#endregion WindowCloseButton
//#region WindowContent
Core.themes.prolcd.WindowContent = {
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
        ctx.fillRect(0,0,obj.width, obj.height);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowContent
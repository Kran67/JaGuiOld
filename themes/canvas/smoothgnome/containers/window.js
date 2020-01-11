//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.smoothgnome.Window = {
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
        const offsetY = Window.WINDOWSIZEABLEBORDERSIZE;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        const cornerRadiusTop = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 10 : 0;
        const cornerRadiusBottom = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 6 : 0;
        const isRolledUp = windowState === WINDOWSTATES.ROLLEDUP;
        const isMaximized = obj.form.isMaximized;
        let back;
        //#endregion Variables déclaration
        ctx.save();
        // Drop shadow
        if (windowState !== WINDOWSTATES.MAXIMIZED && obj.enabledShadow) {
            ctx.shadowBlur = windowTheme.SHADOWBLUR;
            ctx.shadowOffsetX = ctx.shadowOffsetY = windowTheme.SHADOWOFFSET;
            ctx.shadowColor = windowTheme.SHADOWCOLOR;
        }
        ctx.beginPath();
        ctx.roundRect(0.5, 0.5, width-1, height-1, { tl:cornerRadiusTop, tr:cornerRadiusTop, br:cornerRadiusBottom, bl:cornerRadiusBottom});
        ctx.fillStyle = windowTheme.BACKCOLOR;
        ctx.fill();
        ctx.clearShadow();
            ctx.strokeStyle = windowTheme.EDGECOLOR;
            ctx.stroke();
        if (borderStyle !== BORDERSTYLES.NONE) {
            ctx.beginPath();
            back = ctx.createLinearGradient(1, 1, 1, 22);
            windowTheme.titlebar.BACKCOLOR.forEach(cs => {
                back.addColorStop(cs.offset, cs.color);
            });
            ctx.roundRect(1.5, 1.5, width - 3, 22, isMaximized?0:{ tl:cornerRadiusTop, tr:cornerRadiusTop, br:0, bl:0});
            ctx.fillStyle = back;
            ctx.fill();
            ctx.beginPath();
            ctx.roundRect(1.5, 1.5, width - 3, height - 3, isMaximized?0:{tl:cornerRadiusTop - 2,tr: cornerRadiusTop - 2, br:cornerRadiusBottom - 2, bl:cornerRadiusBottom - 2});
            ctx.strokeStyle = "#506984";
            ctx.stroke();
            ctx.beginPath();
            if (!isMaximized) {
                back = ctx.createLinearGradient(1, 1, 1, 10);
                back.addColorStop(0, "#DEE4EB");
                back.addColorStop(0.25, "#DEE4EB");
                back.addColorStop(1, "transparent");
                ctx.roundRect(1.5, 1.5, width - 3, 22, {tl:cornerRadiusTop - 2, tr:cornerRadiusTop - 2, br:0, bl:0});
                ctx.strokeStyle = back;
            } else {
                ctx.moveTo(1, 1.5);
                ctx.lineTo(width - 2, 1.5);
                ctx.strokeStyle = "#DEE4EB";
            }
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(3, 22.5 + (!isActiveWindow?1:0));
            ctx.lineTo(width - 3, 22.5 + (!isActiveWindow?1:0));
            ctx.strokeStyle = `#${isActiveWindow?"6683A3":"7F7A6F"}`;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(3, 23.5);
            ctx.lineTo(width - 3, 23.5);
            ctx.strokeStyle = `#${isActiveWindow?"506984":"7F7A6F"}`;
            ctx.stroke();
            ctx.lineWidth = isActiveWindow?2:1;
            ctx.beginPath();
            ctx.moveTo(3 + (!isActiveWindow?0.5:0), 23);
            ctx.lineTo(3 + (!isActiveWindow?0.5:0), height - (!isActiveWindow?3.5:3));
            ctx.lineTo(width - (!isActiveWindow?3.5:3), height - (!isActiveWindow?3.5:3));
            ctx.lineTo(width - (!isActiveWindow?3.5:3), 23);
            ctx.strokeStyle = `#${isActiveWindow?"6683A3":"7F7A6F"}`;
            ctx.stroke();
        }

        ctx.restore();
    }
    //#endregion render
};
//#endregion Window
//#region WindowTitleBar
Core.themes.smoothgnome.WindowTitleBar = {
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
        if (isActiveWindow) {
            ctx.shadowBlur = titleBarTheme.SHADOWBLUR;
            ctx.shadowColor = titleBarTheme.SHADOWCOLOR;
        }
        ctx.fillText(caption, 23 + offsetX, 10);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButton
Core.themes.smoothgnome.WindowButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let offsetX = 0;
        let offsetY = 0;
        const width = obj.width;
        const height = obj.height;
        let bg, color;
        const form = obj.form;
        const windowBtns = Core.themes.smoothgnome.images.windowbtns;
        const classes = Core.classes;
        const isActiveWindow = obj.form.activeWindow;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        if (obj.isPressed && isActiveWindow) {
            bg = ctx.createLinearGradient(0, offsetY, 0, height);
            bg.addColorStop(0, "#EDEBE7");
            bg.addColorStop(1, "#FFF");
        } else {
            bg = ctx.createLinearGradient(0, offsetY, 0, height);
            bg.addColorStop(0, "#FFF");
            bg.addColorStop(1, "#EEEDE9");
        }
        ctx.beginPath();
        ctx.strokeStyle = `#${isActiveWindow?"556B83":"9A9A91"}`;
        ctx.roundRect(0.5, 0.5, width - 1, height - 1, 3);
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `#${isActiveWindow?"526881":"989890"}`;
        ctx.moveTo(0.5, 2);
        ctx.lineTo(0.5, height - 2);
        ctx.moveTo(width - 0.5, 2);
        ctx.lineTo(width - 0.5, height - 2);
        ctx.stroke();
        if (obj.isPressed && isActiveWindow) {
            ctx.beginPath();
            color = "#B8B6AD";
            ctx.moveTo(2, 1.5);
            ctx.lineTo(width - 2, 1.5);
            ctx.strokeStyle = color;
            ctx.stroke();
        } else {
            ctx.beginPath();
            color = "#D8D6D2";
            ctx.moveTo(width - 1.5, 2);
            ctx.lineTo(width - 1.5, height - 2);
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.beginPath();
            color = "#BFBDB5";
            ctx.moveTo(2, width - 1.5);
            ctx.lineTo(width - 2, height - 1.5);
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        if (obj instanceof classes.WindowCloseButton) {
            offsetY = 0;
        } else if (obj instanceof classes.WindowMaxRestoreButton) {
            offsetY = form.isMaximized ? 24 : 12;
        } else if (obj instanceof classes.WindowMinimizeButton) {
            offsetY = form.isMinimized ? 24 : 36;
        } else if (obj instanceof classes.WindowHelpButton) {
            offsetY = 48;
        } else if (obj instanceof classes.WindowRollUpDownButton) {
            offsetY = obj.isRolledUp ? 12 : 60;
        } else if (obj instanceof classes.WindowStayOnOffButton) {
            offsetY = obj.isStayOn ? 84 : 72;
        }
        if (windowBtns) {
            ctx.translate(1, 1);
            ctx.drawImage(windowBtns, -offsetX, -offsetY, 36, 96);
        }

        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButton
//#region WindowCloseButton
Core.themes.smoothgnome.WindowCloseButton =
    Core.themes.smoothgnome.WindowMaxRestoreButton =
    Core.themes.smoothgnome.WindowMinimizeButton =
    Core.themes.smoothgnome.WindowHelpButton =
    Core.themes.smoothgnome.WindowRollUpDownButton =
    Core.themes.smoothgnome.WindowStayOnOffButton = {
        //#region render
        render: function (obj) {
            Core.themes.smoothgnome.WindowButton.render(obj);
        }
        //#endregion render
    };
//#endregion WindowCloseButton
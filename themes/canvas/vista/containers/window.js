//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { CANVAS } from "../../../../scripts/core/canvas.js";
//#endregion Imports
//#region Window
Core.themes.vista.Window = {
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
        const cornerRadius = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 6 : 0;
        const isRolledUp = windowState === WINDOWSTATES.ROLLEDUP;
        const images = Core.themes.vista.images;
        const titlebar = images.titlebar;
        const visibleButtons = obj.visibleButtons;
        let offsetX = 176;
        let grad;
        //#endregion Variables déclaration
        ctx.save();
        if (borderStyle !== BORDERSTYLES.NONE) {
            // Drop shadow
            if (windowState !== WINDOWSTATES.MAXIMIZED && obj.enabledShadow) {
                ctx.save();
                ctx.shadowBlur = windowTheme.SHADOWBLUR;
                ctx.shadowColor = windowTheme.SHADOWCOLOR;
                ctx.beginPath();
                ctx.roundRect(0, 0, width, height, cornerRadius);
                ctx.fillStyle = "#FFF";
                ctx.fill();
                ctx.shadowBlur = 5;
                ctx.fill();
                ctx.globalCompositeOperation = CANVAS.GLOBALCOMPOSITEOPERATIONS.DESTINATIONOUT;
                ctx.fill();
                ctx.restore();
            }
            
            ctx.save();
            ctx.beginPath();
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = windowTheme.BACKCOLOR;
            ctx.roundRect(0, 0, width, height, cornerRadius);
            ctx.fill();
            ctx.restore();
            if (windowState !== WINDOWSTATES.ROLLEDUP && windowState !== WINDOWSTATES.MINIMIZED) {
                grad = ctx.createLinearGradient(0, 0, 0, height);
                grad.addColorStop(0.00, `rgba(0, 74, 127, ${isActiveWindow?0.2:0.025})`);
                grad.addColorStop(0.33, `rgba(255, 255, 255, ${isActiveWindow?1:0.25})`);
                grad.addColorStop(0.34, `rgba(0, 74, 127, ${isActiveWindow?0.6:0.15})`);
                grad.addColorStop(1.00, `rgba(0, 74, 127, ${isActiveWindow?0.4:0.1})`);
                ctx.fillStyle = grad;
                ctx.roundRect(0, 0, width, height, cornerRadius);
                ctx.fill();
            }
            if (titlebar) {
                ctx.save();
                ctx.fillStyle = ctx.createPattern(titlebar, "repeat-x");
                ctx.fillRect(0, 1, obj.width, 30);
                ctx.restore();
            }
            if (!isRolledUp && !obj.isMinimized) {
                ctx.beginPath();
                ctx.strokeStyle = `#${isActiveWindow?"343434":"4D4D4D"}`;
                ctx.strokeRect(7.5, 33.5, obj.width - 15, obj.height - 41);
                ctx.beginPath();
                ctx.strokeStyle = "#FFF";
                ctx.strokeRect(6.5, 32.5, obj.width - 13, obj.height - 39);
            }
            ctx.save();
            ctx.clipRect(0, 0, width - 3, height - 3);
            ctx.beginPath();
            ctx.strokeStyle = "#FFF";
            ctx.roundRect(1.5, 1.5, obj.width - 3, obj.height - 3, cornerRadius);
            ctx.stroke();
            ctx.restore();
            ctx.save();
            ctx.clipRect(3, 3, width, height);
            ctx.beginPath();
            ctx.strokeStyle = `#${isActiveWindow?"2CD3FE":"E9ECF3"}`;
            ctx.roundRect(1.5, 1.5, obj.width - 3, obj.height - 3, cornerRadius);
            ctx.stroke();
            ctx.restore();
            // border of buttons
            ctx.beginPath();
            ctx.strokeStyle = "#FFF";
            offsetX = 176 - (6 - visibleButtons) * 25;
            ctx.roundRect(obj.width - offsetX + 0.5, 1.5, offsetX - 7, 17, { tl:0, tr:0, br:3, bl:2});
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.roundRect(0.5, 0.5, width - 1, height - 1, cornerRadius);
        ctx.strokeStyle = windowTheme.EDGECOLOR;
        ctx.stroke();

        ctx.restore();
    }
    //#endregion render
};
//#endregion Window
//#region WindowTitleBar
Core.themes.vista.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        let offsetX = 1;
        let offsetY = 1;
        const logoImg = Core.themes.images.logo;
        const caption = form.caption;
        const isActiveWindow = form.activeWindow;
        const themeName = obj.app.themeName;
        const titleBarTheme = Core.themes[themeName].window.titlebar;
        const PT = Types.CSSUNITS.PT;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        const shadows = [{x:3, y:3}, {x:-3, y:-3}, {x:3, y:-3}, {x:-3, y:3}];
        //#endregion Variables déclaration
        ctx.save();
        if ([BORDERSTYLES.SINGLE, BORDERSTYLES.SIZEABLE].indexOf(borderStyle) > -1) {
            if (logoImg) {
                ctx.drawImage(logoImg, offsetX, offsetY, 16, 16);
            }
            offsetX = 0;
        } else {
            offsetX = -22;
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        ctx.shadowBlur = 1;
        ctx.shadowColor = titleBarTheme.SHADOWCOLOR;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10009;
        ctx.fillStyle = titleBarTheme.SHADOWCOLOR;
        ctx.fillText(caption, 23 + offsetX, -10000);
        ctx.shadowBlur = 5;
        shadows.forEach(sh => {
            ctx.shadowOffsetX = sh.x;
            ctx.shadowOffsetY = 10009 + sh.y;
            ctx.fillText(caption, 23 + offsetX, -10000);
        });
        ctx.fillStyle = titleBarTheme[`${inactive}ACTIVECAPTIONTEXTCOLOR`];
        ctx.fillText(caption, 23 + offsetX, 9);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButton
Core.themes.vista.WindowButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let offsetX = 0;
        let offsetY = 0;
        const width = obj.width;
        const height = obj.height;
        const themeName = obj.app.themeName;
        const buttonsTheme = Core.themes[themeName].window.titlebar.buttons;
        let offsetYb = 0;
        let offsetXb = 16;
        const images = Core.themes.vista.images;
        const backGradientImg = images.windowbackbtns;
        const windowBtns = images.windowbtns;
        const form = obj.form;
        let color = buttonsTheme.close.SHADOWCOLOR;
        const classes = Core.classes;
        const isActiveWindow = obj.form.activeWindow;
        //#endregion Variables déclaration
        ctx.save();
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        if (!isActiveWindow) {
            if (obj instanceof classes.WindowCloseButton) {
                offsetX = 129;
            } else {
                offsetX = 78;
            }
        }
        if (!(obj instanceof classes.WindowCloseButton)) {
            offsetY = 17;
            offsetXb = 7;
            color = buttonsTheme.SHADOWCOLOR;
        }
        if (isActiveWindow && obj.enabled) {
            if (obj.isPressed) {
                if (obj instanceof classes.WindowCloseButton) {
                    offsetX = 86;
                } else {
                    offsetX = 52;
                }
            } else if (obj.isMouseOver) {
                if (obj instanceof classes.WindowCloseButton) {
                    offsetX = 43;
                } else {
                    offsetX = 26;
                }
            }
        }
        if (obj instanceof classes.WindowMaxRestoreButton) {
            offsetYb = form.isMaximized || form.snapArea === Window.SNAPAREAS.TOP ? 22 : 11;
        } else if (obj instanceof classes.WindowMinimizeButton) {
            offsetYb = form.isMinimized ? 22 : 33;
        } else if (obj instanceof classes.WindowHelpButton) {
            offsetYb = 44;
        } else if (obj instanceof classes.WindowRollUpDownButton) {
            offsetYb = obj.isRolledUp ? 11 : 55;
        } else if (obj instanceof classes.WindowStayOnOffButton) {
            offsetYb = obj.isStayOn ? 77 : 66;
        }
        // blur
        if (obj.isPressed || obj.isMouseOver && obj.enabled) {
            ctx.save();
            ctx.shadowBlur = 9;
            ctx.shadowColor = color;
            ctx.beginPath();
            ctx.fillStyle = "#FFF";
            ctx.rect(0, 1, width, height-1);
            ctx.fill();
            ctx.fill();
            ctx.fill();
            ctx.restore();
        }
        ctx.save();
        ctx.clipRect(0, 1, width, height-1);
        ctx.translate(0, 1);
        if (backGradientImg) {
            ctx.drawImage(backGradientImg, -offsetX, -offsetY, 172, 34);
        }
        ctx.restore();
        if (windowBtns) {
            ctx.save();
            ctx.clipRect(offsetXb, 4, 12, 11);
            ctx.translate(0, 4);
            ctx.drawImage(windowBtns, offsetXb, -offsetYb, 12, 88);
            ctx.restore();
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButton
//#region WindowCloseButton
Core.themes.vista.WindowCloseButton =
    Core.themes.vista.WindowMaxRestoreButton =
    Core.themes.vista.WindowMinimizeButton =
    Core.themes.vista.WindowHelpButton =
    Core.themes.vista.WindowRollUpDownButton =
    Core.themes.vista.WindowStayOnOffButton = {
        //#region render
        render: function (obj) {
            Core.themes.vista.WindowButton.render(obj);
        }
        //#endregion render
    };
//#endregion WindowCloseButton
//#region WindowContent
Core.themes.vista.WindowContent = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        //#endregion Variables déclaration
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#F1F1F1";
        ctx.fillRect(0, 0, obj.width, obj.height);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowContent
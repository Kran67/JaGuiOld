//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.deanachm.Window.render = function (obj) {
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
    const inactive = !isActiveWindow?"IN":String.EMPTY;
    const isRolledUp = windowState === WINDOWSTATES.ROLLEDUP;
    const topRight = Core.themes.deanachm.images.top_right;
    const bottomRight = Core.themes.deanachm.images.bottom_right;
    let offsetW, back;
    //#endregion Variables déclaration
    ctx.save();
    // Drop shadow
    if (windowState !== WINDOWSTATES.MAXIMIZED && obj.enabledShadow) {
        ctx.shadowBlur = windowTheme.SHADOWBLUR;
        ctx.shadowOffsetX = ctx.shadowOffsetY = windowTheme.SHADOWOFFSET;
        ctx.shadowColor = windowTheme.SHADOWCOLOR;
    }
    ctx.beginPath();
    ctx.fillStyle = windowTheme.BACKCOLOR;
    ctx.rect(0.5, 0.5, width - 1, height - 1);
    ctx.fill();
    ctx.clearShadow();
    if (borderStyle !== BORDERSTYLES.NONE) {
        ctx.strokeStyle = windowTheme.ACTIVEEDGECOLOR;
        ctx.stroke();
        // Bottom lines
        ctx.beginPath();
        ctx.strokeStyle = "#244B9B";
        ctx.moveTo(1, height - 1.5);
        ctx.lineTo(width - 1, height - 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#2955AE";
        ctx.moveTo(1, height - 2.5);
        ctx.lineTo(width - 1, height - 2.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#21458E";
        ctx.moveTo(1, height - 3.5);
        ctx.lineTo(width - 1, height - 3.5);
        ctx.stroke();
        // right
        ctx.beginPath();
        ctx.strokeStyle = "#4B78D3";
        ctx.moveTo(width - 1.5, 1);
        ctx.lineTo(width - 1.5, height - 1);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#386AD0";
        ctx.moveTo(width - 2.5, 1);
        ctx.lineTo(width - 2.5, height - 1);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#2B59B6";
        ctx.moveTo(width - 3.5, 1);
        ctx.lineTo(width - 3.5, height - 1);
        ctx.stroke();
        // left
        ctx.beginPath();
        ctx.strokeStyle = "#2955AE";
        ctx.moveTo(1.5, 1);
        ctx.lineTo(1.5, height - 1);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#234A98";
        ctx.moveTo(2.5, 1);
        ctx.lineTo(2.5, height - 1);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#244B9B";
        ctx.moveTo(3.5, 1);
        ctx.lineTo(3.5, height - 1);
        ctx.stroke();
        // top
        ctx.beginPath();
        ctx.strokeStyle = "#2D5DBF";
        ctx.moveTo(2, 1.5);
        ctx.lineTo(width - 4, 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#1F4083";
        ctx.moveTo(3, 2.5);
        ctx.lineTo(width - 6, 2.5);
        ctx.stroke();

        back = ctx.createLinearGradient(0, 4, 0, 8);
        back.addColorStop(0, "#204186");
        back.addColorStop(1, "#234893");
        ctx.beginPath();
        ctx.fillStyle = back;
        ctx.fillRect(4, 3, width - 7, 8);
        back = ctx.createLinearGradient(0, 12, 0, 8);
        back.addColorStop(0, "#244A97");
        back.addColorStop(1, "#244B9B");
        ctx.beginPath();
        ctx.fillStyle = back;
        ctx.fillRect(4, 11, width - 7, 7);

        ctx.beginPath();
        ctx.strokeStyle = "#2B51A1";
        ctx.moveTo(4, 18.5);
        ctx.lineTo(width - 8, 18.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#244B9B";
        ctx.moveTo(4, 19.5);
        ctx.lineTo(width - 8, 19.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#1B3874";
        ctx.moveTo(3, 20.5);
        ctx.lineTo(width - 8, 20.5);
        ctx.stroke();
        // image
        ctx.clipRect(0,0,width-3, height);
        if (topRight) {
            switch (obj.visibleButtons) {
                case 1:
                    offsetW = 60;
                    break;
                case 2:
                    offsetW = 78;
                    break;
                case 3:
                    offsetW = 96;
                    break;
                case 4:
                    offsetW = 114;
                    break;
                case 5:
                    offsetW = 132;
                    break;
                default:
                    offsetW = 150;
            }
            ctx.drawImage(topRight, width - offsetW - 3, 1, 150, 20);
        }
        if (bottomRight) {
            ctx.drawImage(bottomRight, width - 84, height - 4, 83, 3);
        }
    }
    ctx.restore();
};
//#endregion Window
//#region WindowTitleBar
Core.themes.deanachm.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        let offsetX = 2;
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
                ctx.drawImage(logoImg, offsetX, 0, 16, 16);
            }
        } else {
            offsetX = -20;
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        if (titleBarTheme.SHADOWCOLOR) {
            ctx.shadowColor = titleBarTheme[`${inactive}ACTIVESHADOWCOLOR`];
            ctx.shadowBlur = titleBarTheme.SHADOWBLUR;
        }
        ctx.fillStyle = titleBarTheme[`${inactive}ACTIVECAPTIONTEXTCOLOR`];
        ctx.fillText(caption, 22 + offsetX, 9);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButtons
Core.themes.deanachm.WindowCloseButton =
Core.themes.deanachm.WindowMaxRestoreButton =
Core.themes.deanachm.WindowMinimizeButton =
Core.themes.deanachm.WindowHelpButton =
Core.themes.deanachm.WindowRollUpDownButton =
Core.themes.deanachm.WindowStayOnOffButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let offsetX = 0;
        let offsetY = 0;
        const width = obj.width;
        const height = obj.height;
        const themeName = obj.app.themeName;
        const images = Core.themes[themeName].images;
        const backButtons = images.back_buttons;
        const windowBtns = images.windowbtns;
        const form = obj.form;
        const classes = Core.classes;
        const isActiveWindow = form.activeWindow;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        if (backButtons) {
            ctx.drawImage(backButtons, 0, 0, 15, 15);
        }
        // inactive
        offsetX = 0;
        offsetY = 0;
        if (obj.enabled) {
            if (isActiveWindow) {
                if (obj instanceof classes.WindowCloseButton) {
                    offsetY = 9;
                } else if (obj instanceof classes.WindowMaxRestoreButton) {
                    offsetY = 18;
                } else {
                    offsetY = 36;
                }
                if (obj.isPressed) {
                    offsetX = 18;
                } else if (obj.isMouseOver) {
                    offsetX = 9;
                }
            }
            if ((obj.isPressed || obj.isMouseOver) && isActiveWindow) {
                if (obj instanceof classes.WindowMaxRestoreButton && form.isMaximized) {
                    offsetY = 27;
                } else if (obj instanceof classes.WindowMinimizeButton && form.isMinimized) {
                    offsetY = 72;
                } else if (obj instanceof classes.WindowHelpButton) {
                    offsetY = 54;
                } else if (obj instanceof classes.WindowRollUpDownButton) {
                    offsetY = obj.isRolledUp ? 72 : 63;
                } else if (obj instanceof classes.WindowStayOnOffButton) {
                    offsetY = obj.isStayOn ? 90 : 81;
                }
            }
        }
        ctx.clipRect(3, 3, width - 6, height - 6);
        if (windowBtns) {
            ctx.drawImage(windowBtns, -offsetX + 3, -offsetY + 3, 27, 99);
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButtons
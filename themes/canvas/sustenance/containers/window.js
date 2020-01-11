//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.sustenance.Window = {
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
        const cornerRadius = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 10 : 0;
        let offsetX = 0;
        let back, bg;
        const images = Core.themes.sustenance.images;
        const closebackbutton = images.closebackbutton;
        const leftbackbuttons = images.leftbackbuttons;
        const rightbackbuttons = images.rightbackbuttons;
        const visibleButtons = obj.visibleButtons;
        let i, l;
        //#endregion Variables déclaration
        ctx.save();
        // Drop shadow
        if (windowState !== WINDOWSTATES.MAXIMIZED && obj.enabledShadow) {
            ctx.shadowBlur = windowTheme.SHADOWBLUR;
            ctx.shadowOffsetX = ctx.shadowOffsetY = windowTheme.SHADOWOFFSET;
            ctx.shadowColor = windowTheme.SHADOWCOLOR;
        }
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, {tl:cornerRadius, tr:cornerRadius, br:0, bl:0});
        ctx.fillStyle = windowTheme.BACKCOLOR;
        ctx.fill();
        ctx.clearShadow();
        if (borderStyle !== BORDERSTYLES.NONE) {
            ctx.beginPath();
            back = ctx.createLinearGradient(0, 1, 0, 27);
            windowTheme.titlebar.BACKCOLOR.forEach(cs => {
                back.addColorStop(cs.offset, cs.color);
            });
            ctx.roundRect(1, 1, width - 2, 27, { tl:cornerRadius, tr:cornerRadius, br:0, bl:0});
            ctx.fillStyle = back;
            ctx.fill();
            ctx.beginPath();
            back = ctx.createLinearGradient(0, 2, 0, 5);
            back.addColorStop(0, "#67A1E9");
            back.addColorStop(0.1, "#67A1E9");
            back.addColorStop(1, "transparent");
            ctx.roundRect(1.5, 1.5, width - 3, 20, cornerRadius);
            ctx.strokeStyle = back;
            ctx.stroke();
            // images
            if (leftbackbuttons && visibleButtons > 1) {
                offsetX = 51;
                for (i = 0, l = visibleButtons - 1; i < l; i++) {
                    ctx.drawImage(leftbackbuttons, width - offsetX, 5, 26, 19);
                    offsetX += 21;
                }
            }
            if (visibleButtons === 1 && closebackbutton) {
                ctx.drawImage(closebackbutton, width - 37, 2, 31, 25);
            } else if (rightbackbuttons) {
                ctx.drawImage(rightbackbuttons, width - 37, 2, 31, 25);
            }
            ctx.beginPath();
            ctx.strokeStyle = "#245EDE";
            ctx.moveTo(1.5, 28);
            ctx.lineTo(1.5, height - 1.5);
            ctx.lineTo(width - 1.5, height - 1.5);
            ctx.lineTo(width - 1.5, 28);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = "#5E98E8";
            ctx.moveTo(2.5, 28);
            ctx.lineTo(2.5, height - 2.5);
            ctx.lineTo(width - 2.5, height - 2.5);
            ctx.lineTo(width - 2.5, 28);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = "#2C53A6";
            ctx.moveTo(3.5, 28.5);
            ctx.lineTo(3.5, height - 3.5);
            ctx.lineTo(width - 3.5, height - 3.5);
            ctx.lineTo(width - 3.5, 28.5);
            ctx.closePath();
            ctx.stroke();
            // backbar
            offsetX = obj.width - 55 - (21 * visibleButtons);
            ctx.beginPath();
            back = ctx.createLinearGradient(0, 7, 0, 15);
            back.addColorStop(0, "#2254C4");
            back.addColorStop(1, "rgba(34,84,196,0)");
            ctx.strokeStyle = back;
            ctx.roundRect(31.5,5.5,offsetX+1,19, 11);
            ctx.stroke();
            ctx.beginPath();
            back = ctx.createLinearGradient(0, 7, 0, 20);
            back.addColorStop(0, "rgba(95,151,227,0)");
            back.addColorStop(1, "#5F97E3");
            ctx.strokeStyle = back;
            ctx.roundRect(31.5,5.5,offsetX+1,19, 11);
            ctx.stroke();
            ctx.beginPath();
            back = ctx.createLinearGradient(0, 7, 0, 24);
            back.addColorStop(0, "#3F71C7");
            back.addColorStop(0.5, "#234FAE");
            back.addColorStop(1, "#234FAE");
            bg = ctx.createLinearGradient(0, 7, 0, 24);
            bg.addColorStop(0, "#5A93E2");
            bg.addColorStop(1, "#1B4FC1");
            ctx.roundRect(31.5,6.5,offsetX,17, 10);
            ctx.fillStyle = bg;
            ctx.strokeStyle = back;
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.roundRect(0.5, 0.5, width - 1, height - 1, {tl:cornerRadius, tr:cornerRadius, br:0, bl:0});
            ctx.strokeStyle = windowTheme.EDGECOLOR;
            ctx.stroke();
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion Window
//#region WindowTitleBar
Core.themes.sustenance.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        let offsetX = 3;
        let offsetY = 3;
        const logoImg = Core.themes.images.logo;
        const caption = form.caption;
        const isActiveWindow = form.activeWindow;
        const themeName = obj.app.themeName;
        const titleBarTheme = Core.themes[themeName].window.titlebar;
        const buttonsTheme = titleBarTheme.buttons;
        const PT = Types.CSSUNITS.PT;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        const visibleButtons = obj.visibleButtons;
        let offsetW = (borderStyle !== BORDERSTYLES.DIALOG?32:21) + (form.width - 51 - (21 * visibleButtons)) / 2;
        let metrics;
        let btnsSpace;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, obj.contentWidth, obj.contentHeight);
        if ([BORDERSTYLES.SINGLE, BORDERSTYLES.SIZEABLE].indexOf(borderStyle) > -1) {
            if (logoImg) {
                ctx.drawImage(logoImg, offsetX, offsetY, 16, 16);
            }
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        metrics = ctx.measureText(caption);
        btnsSpace = (obj.contentWidth - visibleButtons * buttonsTheme.offset - metrics.width - buttonsTheme.right);
        ctx.fillStyle = titleBarTheme[`${inactive}ACTIVECAPTIONTEXTCOLOR`];
        ctx.shadowOffsetX = ctx.shadowOffsetY = titleBarTheme.SHADOWOFFSET;
        ctx.shadowColor = titleBarTheme.SHADOWCOLOR;
        ctx.fillText(caption, offsetW - (metrics.width / 2), 13); // 4 is layout margin left
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButton
Core.themes.sustenance.WindowButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let offsetX = 0;
        let offsetY = 0;
        const form = obj.form;
        const windowBtns = Core.themes.sustenance.images.windowbtns;
        const classes = Core.classes;
        const isActiveWindow = form.activeWindow;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, obj.contentWidth, obj.contentHeight);
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        offsetX = 0;
        if (obj.isPressed) {
            offsetX = obj instanceof classes.WindowCloseButton ? 20 : 13;
        }
        if (obj instanceof classes.WindowMaxRestoreButton) {
            offsetY = 20;
            if (form.isMaximized && offsetX === 0) {
                offsetX += 13;
            }
        } else if (obj instanceof classes.WindowMinimizeButton) {
            offsetY = 33;
            if (form.isMinimized && offsetX === 0) {
                offsetX += 13;
            }
        } else if (obj instanceof classes.WindowHelpButton) {
            offsetY = 46;
        } else if (obj instanceof classes.WindowRollUpDownButton) {
            offsetY = 59;
            if (obj.isRolledUp && offsetX === 0) {
                offsetX += 13;
            }
        } else if (obj instanceof classes.WindowStayOnOffButton) {
            offsetY = 72;
            if (obj.isStayOn && offsetX === 0) {
                offsetX += 13;
            }
        }
        if (!isActiveWindow)  {
            offsetY = 20;
            if (obj instanceof classes.WindowCloseButton) {
                offsetX = 40;
                offsetY = 0;
            }
        }
        if (windowBtns) {
            ctx.drawImage(windowBtns, -offsetX, -offsetY, 60, 85);
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButton
//#region WindowCloseButton
Core.themes.sustenance.WindowCloseButton =
    Core.themes.sustenance.WindowMaxRestoreButton =
    Core.themes.sustenance.WindowMinimizeButton =
    Core.themes.sustenance.WindowHelpButton =
    Core.themes.sustenance.WindowRollUpDownButton =
    Core.themes.sustenance.WindowStayOnOffButton = {
        //#region render
        render: function (obj) {
            Core.themes.sustenance.WindowButton.render(obj);
        }
        //#endregion render
    };
//#endregion WindowCloseButton
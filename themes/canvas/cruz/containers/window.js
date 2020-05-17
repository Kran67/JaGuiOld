//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.cruz.Window.render = function (obj) {
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
    const offsetY = Window.WINDOWSIZEABLEBORDERSIZE;
    const cornerRadiusTop = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 10 : 0;
    const cornerRadiusBottom = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 3 : 0;
    const isRolledUp = windowState === WINDOWSTATES.ROLLEDUP;
    let offsetW = 233;
    let offsetW2 = 127;
    const visibleButtons = obj.visibleButtons;
    let back;
    //#endregion Variables déclaration
    ctx.save();
    // Drop shadow
    if (windowState !== WINDOWSTATES.MAXIMIZED && obj.enabledShadow) {
        ctx.shadowBlur = windowTheme.SHADOWBLUR;
        ctx.shadowOffsetX = ctx.shadowOffsetY = windowTheme.SHADOWOFFSET;
        ctx.shadowColor = windowTheme.SHADOWCOLOR;
    }

    if (borderStyle !== BORDERSTYLES.NONE) {
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, {tl:cornerRadiusTop, tr:cornerRadiusTop, br:cornerRadiusBottom, bl:cornerRadiusBottom});
        ctx.fillStyle = windowTheme.BACKCOLOR;
        ctx.fill();
        ctx.clearShadow();
        ctx.beginPath();
        back = ctx.createLinearGradient(0, 0, 0, 19);
        windowTheme.WindowTitleBar.ACTIVEBACKCOLOR.forEach(cs => {
            back.addColorStop(cs.offset, cs.color);
        });
        ctx.fillStyle = back;
        ctx.roundRect(0, 0, width, 24, {tl:cornerRadiusTop, tr:cornerRadiusTop, br:0, bl:0});
        ctx.fill();
        ctx.beginPath();
        back = ctx.createLinearGradient(0, 1, 0, 15);
        back.addColorStop(0, windowTheme.ACTIVEEDGECOLOR);
        back.addColorStop(0.3, "transparent");
        back.addColorStop(1, "transparent");
        ctx.roundRect(0, 0.5, width, 25, {tl:cornerRadiusTop, tr:cornerRadiusTop, br:0, bl:0});
        ctx.strokeStyle = back;
        ctx.stroke();
        ctx.beginPath();
        back = ctx.createLinearGradient(1, 0, 0, 10);
        back.addColorStop(0, "#C8C8C8");
        back.addColorStop(1, "#C8C8C8");
        ctx.roundRect(0.5, 1.5, width - 1, height - 2, {tl:cornerRadiusTop, tr:cornerRadiusTop, br:cornerRadiusBottom, bl:cornerRadiusBottom});
        ctx.strokeStyle = back;
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#E2E2E2";
        ctx.moveTo(1.5, 10);
        ctx.lineTo(1.5, height - 1);
        ctx.moveTo(width - 1.5, 10);
        ctx.lineTo(width - 1.5, height - 1);
        ctx.moveTo(3, height - 2.5);
        ctx.lineTo(width - 3, height - 2.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#E5E5E5";
        ctx.moveTo(2.5, 10);
        ctx.lineTo(2.5, height - 1);
        ctx.moveTo(width - 2.5, 10);
        ctx.lineTo(width - 2.5, height - 1);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#C8C8C8";
        ctx.moveTo(width - 0.5, 10);
        ctx.lineTo(width - 0.5, height - 1);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#DEDEDE";
        ctx.moveTo(2, height - 1.5);
        ctx.lineTo(width - 2, height - 1.5);
        ctx.stroke();

        offsetW = 241 - ((6 - visibleButtons) * 21);
        offsetW2 = 133 - ((6 - visibleButtons) * 21);

        ctx.beginPath();
        back = ctx.createLinearGradient(0, 5, 0, 18);
        back.addColorStop(0, "#E5E5E5");
        back.addColorStop(1, "#F2F2F2");
        ctx.lineWidth = 2;
        ctx.roundRect(54, 4, width - offsetW, 16, 7);
        ctx.strokeStyle = back;
        ctx.stroke();

        ctx.beginPath();
        back = ctx.createLinearGradient(0, 5, 0, 18);
        back.addColorStop(0, "#DFDFDF");
        back.addColorStop(1, "#F5F5F5");
        ctx.roundRect(width - offsetW2, 3, offsetW2 - 6, 18, 9);
        ctx.fillStyle = back;
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.fillStyle = "#E0E0E0";
        ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();
};
//#endregion Window
//#region WindowTitleBar
Core.themes.cruz.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        let offsetX = 2;
        let offsetY = 3;
        const logoImg = Core.themes.images.logo;
        const caption = form.caption;
        const themeName = obj.app.themeName;
        const titleBarTheme = Core.themes[themeName].Window.WindowTitleBar;
        const buttonsTheme = titleBarTheme.WindowButton;
        const PT = Types.CSSUNITS.PT;
        const visibleButtons = form.visibleButtons;
        const offsetW = 241 - (6 - visibleButtons) * 21;
        const width = obj.contentWidth;
        const height = obj.contentHeight;
        const w2 = int((width - offsetW) / 2);
        let metrics
        const btnsSpace = visibleButtons * buttonsTheme.offset;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);

        if ([BORDERSTYLES.SINGLE, BORDERSTYLES.SIZEABLE].indexOf(borderStyle) > -1) {
            if (logoImg) {
                ctx.drawImage(logoImg, offsetX, offsetY, 16, 16);
            }
            offsetX = 23;
        } else {
            offsetX = 0;
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        ctx.fillStyle = titleBarTheme.CAPTIONTEXTCOLOR;
        ctx.shadowOffsetX = ctx.shadowOffsetY = titleBarTheme.SHADOWOFFSET;
        ctx.shadowColor = titleBarTheme.SHADOWCOLOR;
        metrics = ctx.measureText(caption);
        ctx.fillText(caption, offsetX + (obj.contentWidth - offsetX - btnsSpace - metrics.width) / 2, 9);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButtons
Core.themes.cruz.WindowCloseButton =
Core.themes.cruz.WindowMaxRestoreButton =
Core.themes.cruz.WindowMinimizeButton =
Core.themes.cruz.WindowHelpButton =
Core.themes.cruz.WindowRollUpDownButton =
Core.themes.cruz.WindowStayOnOffButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        let form = obj.form;
        const ctx = Core.ctx;
        let offsetX = 0;
        let offsetY = 0;
        const width = obj.width;
        const height = obj.height;
        let windowBtns = Core.themes.cruz.images.windowbtns;
        const classes = Core.classes;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        offsetX = 0;
        if (obj instanceof classes.WindowCloseButton) {
            offsetY = 0;
        } else if (obj instanceof classes.WindowMaxRestoreButton) {
            offsetY = form.isMaximized ? -38 : -19;
        } else if (obj instanceof classes.WindowMinimizeButton) {
            offsetY = form.isMinimized ? -38 : -57;
        } else if (obj instanceof classes.WindowHelpButton) {
            offsetY = -76;
        } else if (obj instanceof classes.WindowRollUpDownButton) {
            offsetY = obj.isRolledUp ? -19 : -95;
        } else if (obj instanceof classes.WindowStayOnOffButton) {
            offsetY = obj.isStayOn ? -133 : -114;
        }
        if (obj.isMouseOver) {
            offsetX -= 19;
        }
        if (windowBtns) {
            ctx.drawImage(windowBtns, offsetX, offsetY, 38, 152);
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButtons
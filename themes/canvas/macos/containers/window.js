//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.macos.Window.render = function (obj) {
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
    const cornerRadius = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 8 : 0;
    const isRolledUp = windowState === WINDOWSTATES.ROLLEDUP;
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
    ctx.roundRect(0.5, 0.5, width - 1, height - 1, { tl:cornerRadius, tr:cornerRadius, br:0, bl:0 });
    ctx.fillStyle = windowTheme.BACKCOLOR;
    ctx.fill();
    ctx.clearShadow();
    ctx.strokeStyle = windowTheme.EDGECOLOR;
    ctx.stroke();
    if (borderStyle !== BORDERSTYLES.NONE) {
        ctx.beginPath();
        back = ctx.createLinearGradient(0, 0, 0, 26);
        windowTheme.WindowTitleBar[`${inactive}ACTIVEBACKCOLOR`].forEach(cs => {
            back.addColorStop(cs.offset, cs.color);
        });
        //back.addColorStop(0, `#${isActiveWindow?"D0D0D0":"BDC1C5"}`);
        //back.addColorStop(1, `#${isActiveWindow?"BFBFBF":"ADB0B4"}`);
        ctx.roundRect(0, 0, width, 26, { tl:cornerRadius, tr:cornerRadius, br:0, bl:0 });
        ctx.fillStyle = back;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(3, 1.5);
        ctx.lineTo(obj.width - 3, 1.5);
        ctx.strokeStyle = `#${isActiveWindow?"DFE5DD":"D8DDE1"}`;
        ctx.stroke();
    }
    ctx.restore();
};
//#endregion Window
//#region WindowTitleBar
Core.themes.macos.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const caption = form.caption;
        const isActiveWindow = form.activeWindow;
        const themeName = obj.app.themeName;
        const titleBarTheme = Core.themes[themeName].Window.WindowTitleBar;
        const buttonsTheme = titleBarTheme.WindowButton;
        const PT = Types.CSSUNITS.PT;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        let metrics
        const visibleButtons = form.visibleButtons;
        const btnsSpace = visibleButtons * buttonsTheme.offset;
        //#endregion Variables déclaration
        ctx.save();
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        ctx.fillStyle = titleBarTheme[`${inactive}ACTIVECAPTIONTEXTCOLOR`];
        if (titleBarTheme.SHADOWCOLOR) {
            ctx.shadowOffsetX = ctx.shadowOffsetY = titleBarTheme.SHADOWOFFSET;
            ctx.shadowColor = titleBarTheme.SHADOWCOLOR;
        }
        metrics = ctx.measureText(caption);
        ctx.fillText(caption, btnsSpace - 1 + (obj.contentWidth - btnsSpace - metrics.width) / 2, 11);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowContent
Core.themes.macos.WindowContent = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const width = obj.contentWidth;
        const height = obj.contentHeight;
        const themeName = obj.app.themeName;
        const contentTheme = Core.themes[themeName].Window.WindowContent;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        ctx.beginPath();
        ctx.fillStyle = contentTheme.BACKCOLOR;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowContent
//#region WindowButtons
Core.themes.macos.WindowCloseButton =
    Core.themes.macos.WindowMaxRestoreButton =
    Core.themes.macos.WindowMinimizeButton =
    Core.themes.macos.WindowHelpButton =
    Core.themes.macos.WindowRollUpDownButton =
    Core.themes.macos.WindowStayOnOffButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let offsetX = 0;
        let offsetY = 0;
        let windowBtns = Core.themes.macos.images.windowbtns;
        const classes = Core.classes;
        const isActiveWindow = obj.form.activeWindow;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, obj.contentWidth, obj.contentHeight);
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        offsetX = 0;
        if (obj instanceof classes.WindowCloseButton) {
            offsetY = 0;
        } else if (obj instanceof classes.WindowMaxRestoreButton) {
            offsetY = 15;
        } else if (obj instanceof classes.WindowMinimizeButton) {
            offsetY = 30;
        } else if (obj instanceof classes.WindowHelpButton) {
            offsetY = 45;
        } else if (obj instanceof classes.WindowRollUpDownButton) {
            offsetY = obj.isRolledUp ? 75 : 60;
        } else if (obj instanceof classes.WindowStayOnOffButton) {
            offsetY = obj.isStayOn ? 105 : 90;
        }
        if (obj.isPressed && isActiveWindow) {
            offsetX = 28;
        } else if (obj.isMouseOver && isActiveWindow) {
            offsetX = 14;
        }
        if (!isActiveWindow) {
            offsetY = 120;
        }
        if (windowBtns) {
            ctx.drawImage(windowBtns, -offsetX, -offsetY, 42, 135);
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButtons
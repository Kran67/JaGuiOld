//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.corona12.Window.render = function (obj) {
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
    const cornerRadius = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 9 : 0;
    const images = Core.themes[themeName].images;
    let offsetW = 0;
    let gradient;
    //#endregion Variables déclaration
    ctx.save();
    // Drop shadow
    if (windowState !== WINDOWSTATES.MAXIMIZED && obj.enabledShadow) {
        ctx.shadowBlur = windowTheme.SHADOWBLUR;
        ctx.shadowOffsetX = ctx.shadowOffsetY = windowTheme.SHADOWOFFSET;
        ctx.shadowColor = windowTheme.SHADOWCOLOR;
    }
    if (borderStyle !== BORDERSTYLES.NONE) {
        // Background
        ctx.beginPath();
        ctx.fillStyle = "#9AB7EF";
        ctx.roundRect(0, 0, width, height, { tl:cornerRadius, tr:cornerRadius, br:0, bl:0});
        ctx.fill();
        ctx.clearShadow();
        ctx.beginPath();
        ctx.fillStyle = windowTheme.BACKCOLOR;
        ctx.roundRect(1, 1, width - 2, height - 2, { tl:cornerRadius, tr:cornerRadius, br:0, bl:0});
        ctx.fill();

        // Left borders
        ctx.beginPath();
        ctx.strokeStyle = "#788FCF";
        ctx.moveTo(0.5, 9);
        ctx.lineTo(0.5, obj.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#798FD1";
        ctx.moveTo(1.5, 9);
        ctx.lineTo(1.5, obj.height - 1);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#6E83C4";
        ctx.moveTo(2.5, 9);
        ctx.lineTo(2.5, obj.height - 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#425FA2";
        ctx.moveTo(3.5, 9);
        ctx.lineTo(3.5, obj.height - 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#EFF5FA";
        ctx.moveTo(4.5, 9);
        ctx.lineTo(4.5, obj.height - 4);
        ctx.stroke();
        // Top borders
        gradient = ctx.createLinearGradient(0, 1, 0, 3);
        gradient.addColorStop(0, "#99B5EE");
        gradient.addColorStop(1, "#A2C0F5");
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.fillRect(4, 1, width - 8, 3);

        gradient = ctx.createLinearGradient(0, 3, 0, 22);
        gradient.addColorStop(0, "#8FA9E6");
        gradient.addColorStop(1, "#5A69AB");
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.fillRect(3, 3, width - 6, 22);

        ctx.beginPath();
        ctx.strokeStyle = "#3A448A";
        ctx.moveTo(12, 23.5);
        ctx.lineTo(width - 2, 23.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "#EFF5FA";
        ctx.moveTo(12, 24.5);
        ctx.lineTo(width - 2, 24.5);
        ctx.stroke();

        // Right borders
        ctx.beginPath();
        ctx.strokeStyle = "#8192B6";
        ctx.moveTo(width - 0.5, 10);
        ctx.lineTo(width - 0.5, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "#D5DFF1";
        ctx.moveTo(width - 1.5, 10);
        ctx.lineTo(width - 1.5, height - 1);
        ctx.stroke();

        // Bottom borders
        ctx.beginPath();
        ctx.strokeStyle = "#8192B6";
        ctx.moveTo(1, height - 0.5);
        ctx.lineTo(width - 1, height - 0.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#C0D1EA";
        ctx.moveTo(2, height - 1.5);
        ctx.lineTo(width - 1, height - 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#DCE3F5";
        ctx.moveTo(3, height - 2.5);
        ctx.lineTo(width - 2, height - 2.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#E6ECF7";
        ctx.moveTo(4, height - 3.5);
        ctx.lineTo(width - 2, height - 3.5);
        ctx.stroke();
        ctx.clipRect(0,0,width-2, height);
        // Images
        offsetW = ((obj.visibleButtons - 1) * 20) + 25;
        if (images.left_titlebar) {
            ctx.drawImage(images.left_titlebar, 0, 0, 12, 29);
        }
        if (images.wave_titlebar) {
            ctx.drawImage(images.wave_titlebar, width - (offsetW + 37), 2, 155, 23);
        }
        if (images.titlebar) {
            ctx.drawImage(images.titlebar, width - offsetW, 2, offsetW - 5, 23);
        }
        if (images.right_titlebar) {
            ctx.drawImage(images.right_titlebar, width - 7, 2, 7, 23);
        }
    } else {
        ctx.fillStyle = windowTheme.BACKCOLOR;
        ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();
};
//#endregion Window
//#region WindowTitleBar
Core.themes.corona12.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        let offsetX = 2;
        let offsetY = 5;
        const logoImg = Core.themes.images.logo;
        const caption = form.caption;
        const isActiveWindow = form.activeWindow;
        const themeName = obj.app.themeName;
        const titleBarTheme = Core.themes[themeName].Window.WindowTitleBar;
        const buttonsTheme = titleBarTheme.WindowButton;
        const PT = Types.CSSUNITS.PT;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        const width = obj.contentWidth;
        const height = obj.contentHeight;
        let metrics;
        const visibleButtons = form.visibleButtons;
        const btnsSpace = visibleButtons * buttonsTheme.offset;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        if ([BORDERSTYLES.SINGLE, BORDERSTYLES.SIZEABLE].indexOf(borderStyle) > -1) {
            if (logoImg) {
                ctx.drawImage(logoImg, offsetX, offsetY - 4, 16, 16);
            }
            offsetX = 24;
        } else {
            offsetX = 0;
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        ctx.fillStyle = titleBarTheme[`${inactive}ACTIVECAPTIONTEXTCOLOR`];
        if (titleBarTheme.SHADOWCOLOR) {
            ctx.shadowOffsetX = ctx.shadowOffsetY = titleBarTheme.SHADOWOFFSET;
            ctx.shadowColor = titleBarTheme.SHADOWCOLOR;
        }
        metrics = ctx.measureText(caption);
        ctx.fillText(caption, offsetX + (obj.contentWidth - offsetX - btnsSpace - metrics.width) / 2, 11);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButtons
Core.themes.corona12.WindowCloseButton =
Core.themes.corona12.WindowMaxRestoreButton =
Core.themes.corona12.WindowMinimizeButton =
Core.themes.corona12.WindowHelpButton =
Core.themes.corona12.WindowRollUpDownButton =
Core.themes.corona12.WindowStayOnOffButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let caption = String.EMPTY;
        const PX = Types.CSSUNITS.PX;
        const width = obj.width;
        const height = obj.height;
        const themeName = obj.app.themeName;
        const buttonsTheme = Core.themes[themeName].Window.WindowTitleBar.WindowButton;
        const CONSTANTS = Types.CONSTANTS;
        let textColor = buttonsTheme.ACTIVETEXTCOLOR;
        let metrics;
        let bg, stroke;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        if (obj.isPressed || obj.isMouseOver) {
            ctx.beginPath();
            if (obj.isPressed) {
                ctx.fillStyle = buttonsTheme.PRESSEDBACKCOLOR;
                ctx.roundRect(0.5, 0.5, width-1, height-1, 4);
                ctx.fill();
                stroke = ctx.createLinearGradient(0, 0, 0, height);
                stroke.addColorStop(0, "#90A2CE");
                stroke.addColorStop(0.1, "#90A2CE");
                stroke.addColorStop(0.1, "transparent");
                stroke.addColorStop(0.9, "transparent");
                stroke.addColorStop(0.9, "#F8FAFD");
                stroke.addColorStop(1, "#F8FAFD");
                ctx.strokeStyle = stroke;
                ctx.stroke();
                ctx.beginPath();
                stroke = ctx.createLinearGradient(0, 0, width, 0);
                stroke.addColorStop(0, "#D9DBF0");
                stroke.addColorStop(0.1, "#D9DBF0");
                stroke.addColorStop(0.1, "transparent");
                stroke.addColorStop(0.9, "transparent");
                stroke.addColorStop(0.9, "#B7CAE5");
                stroke.addColorStop(1, "#B7CAE5");
                ctx.strokeStyle = stroke;
                ctx.roundRect(0.5, 0.5, width-1, height-1, 4);
            } else if (obj.isMouseOver) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                buttonsTheme.HOVEREDBACKCOLOR.forEach(cs => {
                    bg.addColorStop(cs.offset, cs.color);
                });
                ctx.roundRect(0.5, 0.5, width-1, height-1, 4);
                ctx.fillStyle = bg;
                ctx.fill();
                stroke = ctx.createLinearGradient(0, 0, 0, height);
                stroke.addColorStop(0, "#FFFFFE");
                stroke.addColorStop(0.1, "#FFFFFE");
                stroke.addColorStop(0.1, "transparent");
                stroke.addColorStop(0.9, "transparent");
                stroke.addColorStop(0.9, "#8D9CCD");
                stroke.addColorStop(1, "#8D9CCD");
                ctx.strokeStyle = stroke;
            }
            ctx.stroke();
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `${buttonsTheme.FONTSIZE}${PX} ${CONSTANTS.BTNGLYPHFONTFACE}`;
        ctx.fillStyle = textColor;
        caption = obj.owner.getCaptionButton(obj);
        metrics = ctx.measureText(caption);
        ctx.fillText(caption, (width - metrics.width + 1) / 2, (height - metrics.height) / 2);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButtons
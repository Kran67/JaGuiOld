//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.haiku.Window.render = function (obj) {
    //#region Variables déclaration
    const borderStyle = obj.borderStyle;
    const width = obj.contentWidth;
    const height = obj.contentHeight;
    const BORDERSTYLES = Window.BORDERSTYLES;
    const themeName = obj.app.themeName;
    const windowTheme = Core.themes[themeName].Window;
    const titleBarTheme = windowTheme.WindowTitleBar;
    const ctx = Core.ctx;
    const isActiveWindow = obj.activeWindow;
    let offsetY = 0;
    const inactive = !isActiveWindow?"IN":String.EMPTY;
    let bg;
    let textW;
    const PT = Types.CSSUNITS.PT;
    //#endregion Variables déclaration
    ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
    textW = 72 + int(ctx.measureText(obj.caption).width);
    ctx.save();
    ctx.clipRect(0, 0, width, height);
    if (borderStyle !== BORDERSTYLES.NONE) {
        ctx.beginPath();
        ctx.fillStyle = windowTheme.BACKCOLOR;
        ctx.fillRect(0, 21, width, height);

        if (borderStyle !== BORDERSTYLES.NONE) {
            offsetY = 21;
        }
        ctx.beginPath();
        ctx.strokeStyle = windowTheme.ACTIVEEDGECOLOR;
        ctx.moveTo(0, offsetY + 0.5);
        ctx.lineTo(width, offsetY + 0.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "#F0F0F0";
        ctx.moveTo(width, offsetY + 1.5);
        ctx.lineTo(1.5, offsetY + 1.5);
        ctx.lineTo(1.5, height + 1);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "#E0E0E0";
        ctx.moveTo(width, offsetY + 2.5);
        ctx.lineTo(2.5, offsetY + 2.5);
        ctx.lineTo(2.5, height - 1);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "#989898";
        ctx.moveTo(textW + 0.5, 0.5);
        ctx.lineTo(0.5, 0.5);
        ctx.lineTo(0.5, height - 0.5);
        ctx.lineTo(width - 0.5, height - 0.5);
        ctx.lineTo(width - 0.5, 21.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `#${isActiveWindow?"ECBC00":"D6D6D6"}`;
        ctx.moveTo(textW - 0.5, 2);
        ctx.lineTo(textW - 0.5, 21);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "#6C6C6C";
        ctx.moveTo(textW + 0.5, 0.5);
        ctx.lineTo(textW + 0.5, 21);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `#${isActiveWindow?"FFF4CD":"F8F8F8"}`;
        ctx.moveTo(textW, 1.5);
        ctx.lineTo(1.5, 1.5);
        ctx.lineTo(1.5, 21);
        ctx.stroke();

        bg = ctx.createLinearGradient(0, 3, 0, 19);
        titleBarTheme[`${inactive}ACTIVEBACKCOLOR`].forEach(cs => {
            bg.addColorStop(cs.offset, cs.color);
        });
        ctx.beginPath();
        ctx.fillStyle = bg;
        ctx.fillRect(2, 2, textW - 3, 19);

        ctx.beginPath();
        ctx.strokeStyle = "#9D9D9D";
        ctx.strokeRect(4.5, 25.5, width - 9, height - 30);

    }
    ctx.restore();
    //#endregion render
};
//#endregion Window
//#region WindowTitleBar
Core.themes.haiku.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const caption = form.caption;
        const themeName = obj.app.themeName;
        const titleBarTheme = Core.themes[themeName].Window.WindowTitleBar;
        const PT = Types.CSSUNITS.PT;
        //#endregion Variables déclaration
        ctx.save();
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        ctx.fillStyle = titleBarTheme.CAPTIONTEXTCOLOR;
        ctx.fillText(caption, 31, 9);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButtons
Core.themes.haiku.WindowCloseButton =
Core.themes.haiku.WindowMaxRestoreButton =
Core.themes.haiku.WindowMinimizeButton =
Core.themes.haiku.WindowHelpButton =
Core.themes.haiku.WindowRollUpDownButton =
Core.themes.haiku.WindowStayOnOffButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const width = obj.width;
        const height = obj.height;
        const isActiveWindow = obj.form.activeWindow;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        const themeName = obj.app.themeName;
        const buttonsTheme = Core.themes[themeName].Window.WindowTitleBar.WindowButton;
        let bg;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, obj.contentWidth, obj.contentHeight);
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        if (obj.isPressed && isActiveWindow) {
            bg = ctx.createLinearGradient(0, 0, 0, height);
            buttonsTheme.PRESSEDBACKCOLOR.forEach(cs => {
                bg.addColorStop(cs.offset, cs.color);
            });
        } else {
            bg = ctx.createLinearGradient(0, 0, width, height);
            buttonsTheme[`${inactive}ACTIVEBACKCOLOR`].forEach(cs => {
                bg.addColorStop(cs.offset, cs.color);
            });
        }
        ctx.strokeStyle = buttonsTheme[`${inactive}ACTIVEBORDERCOLOR`];
        ctx.beginPath();
        ctx.rect(0.5, 0.5, width - 1, height - 1);
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButtons
//#region WindowContent
Core.themes.haiku.WindowContent = {
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
        ctx.fillStyle = contentTheme.BACKCOLOR;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowContent
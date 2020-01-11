//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.ubuntu.Window = {
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
        const isRolledUp = windowState === WINDOWSTATES.ROLLEDUP;
        let back, bg;
        const images = Core.themes.ubuntu.images;
        const leftImg = images.left;
        const rightImg = images.right;
        const visibleButtons = obj.visibleButtons;
        let left;
        let w;
        const isMaximized = obj.form.isMaximized;
        //#endregion Variables déclaration
        ctx.save();
        // Drop shadow
        if (windowState !== WINDOWSTATES.MAXIMIZED && obj.enabledShadow) {
            ctx.shadowBlur = windowTheme.SHADOWBLUR;
            ctx.shadowOffsetX = ctx.shadowOffsetY = windowTheme.SHADOWOFFSET;
            ctx.shadowColor = windowTheme.SHADOWCOLOR;
        }
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, { tl:cornerRadius, tr:cornerRadius, br:0, bl:0});
        ctx.fillStyle = windowTheme.BACKCOLOR;
        ctx.fill();
        ctx.clearShadow();
        if (borderStyle !== BORDERSTYLES.NONE) {
            ctx.beginPath();
            ctx.roundRect(0.5, 0.5, width - 1, height - 1, { tl:cornerRadius - 1, tr:cornerRadius - 1, br:0, bl:0});
            ctx.strokeStyle = `#${isActiveWindow?"484741":"46443F"}`;
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = `#${isActiveWindow?"A1998E":"C2B9B1"}`;
            ctx.moveTo(0.5, 27);
            ctx.lineTo(0.5, height - 0.5);
            ctx.lineTo(width - 0.5, height - 0.5);
            ctx.lineTo(width - 0.5, 27);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = `#${isActiveWindow?"3E3D39":"3F3E3A"}`;
            ctx.moveTo(0.5, 27);
            ctx.lineTo(0.5, 39);
            ctx.moveTo(width - 0.5, 27);
            ctx.lineTo(width - 0.5, 39);
            ctx.stroke();
            ctx.beginPath();
            back = ctx.createLinearGradient(0, 39, 0, 108);
            windowTheme.titlebar[`${inactive}ACTIVEBACKCOLOR`].forEach(cs => {
                back.addColorStop(cs.offset, cs.color);
            });
            ctx.moveTo(0.5, 39);
            ctx.lineTo(0.5, 109);
            ctx.moveTo(width - 0.5, 39);
            ctx.lineTo(width - 0.5, 109);
            ctx.fillStyle = back;
            ctx.stroke();
            ctx.save();
            ctx.clipRect(0, 0, width, 26);
            ctx.beginPath();
            back = ctx.createLinearGradient(0, 1, 0, 25);
            back.addColorStop(0, `#${isActiveWindow?"575651":"494844"}`);
            back.addColorStop(1, "#3C3B37");
            ctx.roundRect(1, 1, width - 2, 26, { tl:isMaximized?0:cornerRadius - 2, tr:isMaximized?0:cornerRadius - 2, br:0, bl:0});
            ctx.fillStyle = back;
            ctx.fill();
            ctx.restore();
            ctx.save();
            ctx.clipRect(0, 0, width, 6);
            ctx.beginPath();
            ctx.roundRect(1.5, 1.5, width - 3, isMaximized?0:height, { tl:isMaximized?0:cornerRadius - 1, tr:isMaximized?0:cornerRadius - 1, br:0, bl:0});
            ctx.strokeStyle = `#${isActiveWindow?"65645E":"53524D"}`;
            ctx.stroke();
            ctx.restore();
            ctx.beginPath();
            ctx.strokeStyle = `#${isActiveWindow?"403F3A":"3C3B37"}`;
            ctx.moveTo(1, 26.5);
            ctx.lineTo(width - 1, 26.5);
            ctx.stroke();
            if (leftImg) {
                ctx.drawImage(leftImg, 1, 27, 3, 44);
            }
            if (rightImg) {
                ctx.drawImage(rightImg, width - 4, 27, 3, 44);
            }
            // BackBar
            left = width - (visibleButtons * 20) - 10;
            w = 120 - (6 - visibleButtons) * 20;
            ctx.beginPath();
            ctx.roundRect(left + 0.5, 4.5, w - 1, 19, 9);
            bg = ctx.createLinearGradient(0, 5, 0, 18);
            bg.addColorStop(0, "#363632");
            bg.addColorStop(0.05, "#363632");
            bg.addColorStop(1, "rgba(54,54,50,0)");
            ctx.strokeStyle = bg;
            back = ctx.createLinearGradient(0, 5, 0, 18);
            back.addColorStop(0, "#3C3B37");
            back.addColorStop(1, "rgba(60,59,55,0)");
            ctx.fillStyle = back;
            ctx.fill();
            ctx.stroke();
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion Window
//#region WindowTitleBar
Core.themes.ubuntu.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        let offsetX = 2;
        let offsetY = 2;
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
        ctx.fillText(caption, 24 + offsetX, 9);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButton
Core.themes.ubuntu.WindowButton = {
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
        const w2 = width / 2;
        let metrics;
        let bg;
        const classes = Core.classes;
        const isActiveWindow = obj.form.activeWindow;
        let closeBtn = obj instanceof classes.WindowCloseButton && isActiveWindow?"CLOSE":String.EMPTY;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        bg = ctx.createLinearGradient(0, offsetY, 0, height);
        buttonsTheme[`${closeBtn}BACKCOLOR`].forEach(cs => {
            bg.addColorStop(cs.offset, cs.color);
        });
        //bg.addColorStop(0, "#" + (!isActiveWindow?"94938E":(isCloseBtn ? "F79674" : "94938E")));
        //bg.addColorStop(1, "#" + (!isActiveWindow?"5A5955":(isCloseBtn ? "DF5106" : "5A5955")));
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        } else {
            bg = ctx.createLinearGradient(0, offsetY, 0, height);
            buttonsTheme[`${closeBtn}${pressedHovered}BACKCOLOR`].forEach(cs => {
                bg.addColorStop(cs.offset, cs.color);
            });
            //if (obj.isPressed) {
            //    //bg.addColorStop(0, "#" + (isCloseBtn ? "EA6F3B" : "787770"));
            //    //bg.addColorStop(1, "#" + (isCloseBtn ? "ED7443" : "7E7D76"));
            //} else if (obj.isMouseOver) {
            //    bg.addColorStop(0, "#" + (isCloseBtn ? "FAA589" : "D8D9D9"));
            //    bg.addColorStop(1, "#" + (isCloseBtn ? "E45306" : "9E9E9E"));
            //}
        }
        ctx.beginPath();
        ctx.ellipse(w2 + offsetX, w2 + offsetY, w2, w2, 0, 0, CONSTANTS._2PI);
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.fillStyle = buttonsTheme.ACTIVETEXTCOLOR;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `${buttonsTheme.FONTSIZE}${PX} ${CONSTANTS.BTNGLYPHFONTFACE}`;
        caption = obj.owner.getCaptionButton(obj);
        metrics = ctx.measureText(caption);
        ctx.shadowOffsetY = buttonsTheme.SHADOWOFFSETY;
        ctx.shadowColor = buttonsTheme.SHADOWCOLOR;
        //ctx.globalAlpha = 1;
        ctx.fillText(caption, (width - metrics.width - 1) / 2, ((height - metrics.height) / 2) + 1);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButton
//#region WindowCloseButton
Core.themes.ubuntu.WindowCloseButton =
    Core.themes.ubuntu.WindowMaxRestoreButton =
    Core.themes.ubuntu.WindowMinimizeButton =
    Core.themes.ubuntu.WindowHelpButton =
    Core.themes.ubuntu.WindowRollUpDownButton =
    Core.themes.ubuntu.WindowStayOnOffButton = {
        //#region render
        render: function (obj) {
            Core.themes.ubuntu.WindowButton.render(obj);
        }
        //#endregion render
    };
//#endregion WindowCloseButton
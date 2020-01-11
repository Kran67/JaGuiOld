//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
//#endregion Imports
//#region Window
Core.themes.rainbow.Window = {
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
        const cornerRadiusTop = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 6 : 0;
        const cornerRadiusBottom = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 3 : 0;
        let grad;
        //#endregion Variables déclaration
        ctx.save();
        // Drop shadow
        if (windowState !== WINDOWSTATES.MAXIMIZED && obj.enabledShadow) {
            ctx.shadowBlur = windowTheme.SHADOWBLUR;
            ctx.shadowOffsetX = windowTheme.SHADOWOFFSET.x;
            ctx.shadowOffsetY = windowTheme.SHADOWOFFSET.y;
            ctx.shadowColor = windowTheme.SHADOWCOLOR;
        }
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, {tl:cornerRadiusTop, tr:cornerRadiusTop, br:cornerRadiusBottom, bl:cornerRadiusBottom});
        ctx.fillStyle = windowTheme.BACKCOLOR;
        ctx.fill();
        ctx.clearShadow();
        if (borderStyle !== BORDERSTYLES.NONE) {
            // Top
            grad = ctx.createLinearGradient(0,0, width, 0);
            windowTheme.titlebar.BACKCOLOR.forEach(cs => {
                grad.addColorStop(cs.offset, cs.color);
            });
            ctx.fillStyle = grad;
            ctx.roundRect(0,0,width,23, {tl:cornerRadiusTop, tr:cornerRadiusTop, br:0, bl:0});
            ctx.fill();
            grad = ctx.createLinearGradient(0, 0, 0, 5);
            grad.addColorStop(0, "#DCE4E6");
            grad.addColorStop(0.25, "#DCE4E6");
            grad.addColorStop(1, "transparent");
            ctx.roundRect(0,0.5,obj.width, 10, cornerRadiusTop);
            ctx.strokeStyle = grad;
            ctx.stroke();
            // Bottom
            grad = ctx.createLinearGradient(0, 0, width, 0);
            windowTheme.BOTTOMEDGE.forEach(cs => {
                grad.addColorStop(cs.offset, cs.color);
            });
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.fillRect(0,height - 4,width, 4);
            // Left
            Core.themes.rainbow.createLeft(obj);
            // Right
            Core.themes.rainbow.createRight(obj);
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion Window
//#region WindowTitleBar
Core.themes.rainbow.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        let offsetX = 2;
        let offsetY = 0;
        const logoImg = Core.themes.images.logo;
        const caption = form.caption;
        const isActiveWindow = form.activeWindow;
        const themeName = obj.app.themeName;
        const titleBarTheme = Core.themes[themeName].window.titlebar;
        const buttonsTheme = titleBarTheme.buttons;
        const PT = Types.CSSUNITS.PT;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        const w = obj.visibleButtons * 18;
        const left = w + 11.5;
        const width = obj.contentWidth;
        const height = obj.contentHeight;
        let metrics;
        const visibleButtons = form.visibleButtons;
        let btnsSpace;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        if ([BORDERSTYLES.SINGLE, BORDERSTYLES.SIZEABLE].indexOf(borderStyle) > -1) {
            if (logoImg) {
                ctx.drawImage(logoImg, offsetX, offsetY, 16, 16);
            }
            offsetX = 24;
        } else {
            offsetX = 0;
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        ctx.fillStyle = titleBarTheme[`${inactive}ACTIVECAPTIONTEXTCOLOR`];
        metrics = ctx.measureText(caption);
        btnsSpace = (obj.contentWidth - visibleButtons * buttonsTheme.offset - metrics.width - buttonsTheme.right);
        if ([BORDERSTYLES.SINGLE, BORDERSTYLES.SIZEABLE].indexOf(borderStyle) > -1) {
            ctx.fillText(caption, offsetX + (btnsSpace - 20) / 2, 9);
        } else if (borderStyle === BORDERSTYLES.DIALOG) {
            ctx.fillText(caption, offsetX + (btnsSpace + 5) / 2, 9);
        }
        // TitleBar
        ctx.beginPath();
        ctx.moveTo(width-left+2, 3.5);
        ctx.lineTo(width-left+w-2, 3.5);
        ctx.strokeStyle = "#64364B";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(width-left+2, 4.5);
        ctx.lineTo(width-left+w-2, 4.5);
        ctx.strokeStyle = "#743F58";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(width-left+2, 5.5);
        ctx.lineTo(width-left+w-2, 5.5);
        ctx.strokeStyle = "#814661";
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "#8A4B68";
        ctx.fillRect(width-left+2, 6, w-4, 2);
        ctx.beginPath();
        ctx.moveTo(width-left+2, 8.5);
        ctx.lineTo(width-left+w-2, 8.5);
        ctx.strokeStyle = "#814661";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(width-left+2, 9.5);
        ctx.lineTo(width-left+w-2, 9.5);
        ctx.strokeStyle = "#743F58";
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#4E2A3B";
        ctx.roundRect(width-left, 2.5, w - 1, 8, 4);
        ctx.stroke();
        ctx.clipRect(width-~~left, 10, w - 1, 12);
        ctx.beginPath();
        ctx.strokeStyle = "#F0D6E3";
        ctx.roundRect(width-left, 2.5, w - 1, 8, 4);
        ctx.stroke();
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButton
Core.themes.rainbow.WindowButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const width = obj.width;
        const height = obj.height;
        const form = obj.form;
        let bg, color;
        const classes = Core.classes;
        const isActiveWindow = form.activeWindow;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        if (obj instanceof classes.WindowCloseButton) {
            color = `#${isActiveWindow?"00213D":"1E2741"}`;
            if (obj.isPressed && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#161617");
                bg.addColorStop(1, "#43739A");
            } else if (obj.isMouseOver && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#FFF");
                bg.addColorStop(1, "#608EB3");
            } else {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, `#${isActiveWindow?"E6EDF3":"C4B9C5"}`);
                bg.addColorStop(1, `#${isActiveWindow?"5787AF":"66759A"}`);
            }
        } else if (obj instanceof classes.WindowMaxRestoreButton) {
            color = `#${isActiveWindow?"2F2C01":"3F2F17"}`;
            if ((obj.isPressed || form.isMaximized) && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#161614");
                bg.addColorStop(1, "#9C9540");
            } else if (obj.isMouseOver && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#FFF");
                bg.addColorStop(1, "#B6B060");
            } else {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, `#${isActiveWindow?"EEECD9":"CAB8B3"}`);
                bg.addColorStop(1, `#${isActiveWindow?"B0A952":"A58D59"}`);
            }
        } else if (obj instanceof classes.WindowMinimizeButton) {
            color = `#${isActiveWindow?"681117":"690101"}`;
            if ((obj.isPressed || form.isMinimized) && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#161614");
                bg.addColorStop(1, "#AF4343");
            } else if (obj.isMouseOver && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#FFF");
                bg.addColorStop(1, "#C35757");
            } else {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, `#${isActiveWindow?"F6E6E6":"CFB4BC"}`);
                bg.addColorStop(1, `#${isActiveWindow?"C35757":"B2535C"}`);
            }
        } else if (obj instanceof classes.WindowHelpButton) {
            color = `#${isActiveWindow?"013316":"2B3B2F"}`;
            if (obj.isPressed && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#141615");
                bg.addColorStop(1, "#408B60");
            } else if (obj.isMouseOver && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#FFF");
                bg.addColorStop(1, "#60A67E");
            } else {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, `#${isActiveWindow?"D9EAE0":"C3BBBD"}`);
                bg.addColorStop(1, `#${isActiveWindow?"529F73":"6E977E"}`);
            }
        } else if (obj instanceof classes.WindowRollUpDownButton) {
            color = `#${isActiveWindow?"580169":"260037"}`;
            if ((obj.isPressed || obj.isRolledUp) && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#171617");
                bg.addColorStop(1, "#9D43AF");
            } else if (obj.isMouseOver && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#FFF");
                bg.addColorStop(1, "#B560C6");
            } else {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, `#${isActiveWindow?"F3E6F6":"C1B4C4"}`);
                bg.addColorStop(1, `#${isActiveWindow?"B157C3":"7F2591"}`);
            }
        } else if (obj instanceof classes.WindowStayOnOffButton) {
            color = `#${isActiveWindow?"016969":"003737"}`;
            if ((obj.isPressed || obj.isStayOn) && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#161717");
                bg.addColorStop(1, "#43AFAF");
            } else if (obj.isMouseOver && isActiveWindow && obj.enabled) {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, "#FFF");
                bg.addColorStop(1, "#60C6C6");
            } else {
                bg = ctx.createLinearGradient(0, 0, 0, height);
                bg.addColorStop(0, `#${isActiveWindow?"E6F6F6":"B4C4C4"}`);
                bg.addColorStop(1, `#${isActiveWindow?"57C3C3":"259191"}`);
            }
        }
        ctx.beginPath();
        ctx.roundRect(0.5,0.5,width-1, height-1,3);
        ctx.fillStyle = bg;
        ctx.strokeStyle = color;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButton
//#region WindowCloseButton
Core.themes.rainbow.WindowCloseButton =
    Core.themes.rainbow.WindowMaxRestoreButton =
    Core.themes.rainbow.WindowMinimizeButton =
    Core.themes.rainbow.WindowHelpButton =
    Core.themes.rainbow.WindowRollUpDownButton =
    Core.themes.rainbow.WindowStayOnOffButton = {
        //#region render
        render: function (obj) {
            Core.themes.rainbow.WindowButton.render(obj);
        }
        //#endregion render
    };
//#endregion WindowCloseButton
//#region createLeft
Core.themes.rainbow.createLeft = function(obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const height = obj.contentHeight;
    let grad;
    const themeName = obj.app.themeName;
    const leftEdgeTheme = Core.themes[themeName].window.LEFTEDGE;
    //#endregion Variables déclaration
    grad = ctx.createLinearGradient(0, 5, 0, height - 1);
    leftEdgeTheme[0].colorStops.forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0.5,5);
    ctx.lineTo(0.5, height - 1);
    ctx.stroke();
    grad = ctx.createLinearGradient(0, 4, 0, height);
    leftEdgeTheme[1].colorStops.forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(1.5,4);
    ctx.lineTo(1.5, height);
    ctx.stroke();
    grad = ctx.createLinearGradient(0, 3, 0, height);
    leftEdgeTheme[2].colorStops.forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(2.5,3);
    ctx.lineTo(2.5, height);
    ctx.stroke();
    grad = ctx.createLinearGradient(0, 2, 0, height);
    leftEdgeTheme[3].colorStops.forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(3.5,2);
    ctx.lineTo(3.5, height);
    ctx.stroke();
};
//#endregion createLeft
//#region createRight
Core.themes.rainbow.createRight = function(obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const width = obj.contentWidth;
    const height = obj.contentHeight;
    let grad;
    const themeName = obj.app.themeName;
    const rightEdgeTheme = Core.themes[themeName].window.RIGHTEDGE;
    //#endregion Variables déclaration
    grad = ctx.createLinearGradient(0, 5, 0, height - 1);
    rightEdgeTheme[0].colorStops.forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(width - 0.5,5);
    ctx.lineTo(width - 0.5, height - 1);
    ctx.stroke();
    grad = ctx.createLinearGradient(0, 4, 0, height);
    rightEdgeTheme[1].colorStops.forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(width - 1.5,4);
    ctx.lineTo(width - 1.5, height);
    ctx.stroke();
    grad = ctx.createLinearGradient(0, 3, 0, height);
    rightEdgeTheme[2].colorStops.forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(width - 2.5,3);
    ctx.lineTo(width - 2.5, height);
    ctx.stroke();
    grad = ctx.createLinearGradient(0, 2, 0, height);
    rightEdgeTheme[3].colorStops.forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(width - 3.5,2);
    ctx.lineTo(width - 3.5, height);
    ctx.stroke();
};
//#endregion createRight
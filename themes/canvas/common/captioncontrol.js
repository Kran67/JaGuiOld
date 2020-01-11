//#region Imports
import { Colors } from "../../../scripts/core/color.js";
//#endregion Imports
//#region CaptionControl
Core.themes.CaptionControl = {
    //#region render
    render: function (obj, effect) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const themeName = obj.app.themeName;
        const DEFAULTFONTFACE = Core.themes[themeName].DEFAULTFONTFACE;
        const TEXTTRANSFORMS = Types.TEXTTRANSFORMS;
        const FONTSTYLES = Types.FONTSTYLES;
        const bold = obj.fontBold;
        const italic = obj.fontStyle !== FONTSTYLES.NORMAL;
        const boldItalic = bold && italic;
        const fontFaceStyle = boldItalic ? "italic bold" : bold ? "bold" : italic ? "italic" : String.EMPTY;
        let textM, lsText;
        const width = obj.width;
        const height = obj.height;
        const lineWidth = (parseFloat(obj.fontSize) / 10) + 0.5;
        const ellipsis = String.fromCharCode(8230);
        let clipped = obj.clipped;
        const autoSize = obj.autoSize;
        let color;
        const TEXTALIGNS = Types.TEXTALIGNS;
        const VERTTEXTALIGNS = Types.VERTTEXTALIGNS;
        let offsetX = 0, offsetY = 0, fontFace;
        const classes = Core.classes;
        const isWindowButton = obj instanceof classes.WindowButton;
        let caption = isWindowButton?obj.owner.getCaptionButton(obj):obj.caption;
        const theme = Core.themes[themeName];
        let className = obj.constructor.name;
        let objTheme = theme[className];
        let _obj = obj;
        //#endregion Variables déclaration
        while (!objTheme && _obj instanceof classes.ThemedControl) {
            _obj = Object.getPrototypeOf(_obj);
            className = _obj.__proto__.constructor.name;
            objTheme = theme[className];
        }
        if (objTheme && 
            objTheme.hasOwnProperty("drawCaption") && 
            !objTheme.drawCaption) {
            return;
        }
        //#region Effect
        if (effect) {
            effect.prepare();
        }
        //#endregion Effect
        color = obj.color.toRGBAString();
        if (objTheme) {
            if (objTheme.normalTextColor) {
                color = objTheme.normalTextColor;
            }
            if (obj.enabled) {
                if (obj.isPressed && objTheme.pressedTextColor) {
                    color = objTheme.pressedTextColor;
                } else if (obj.isMouseOver && objTheme.hoveredTextColor) {
                    color = objTheme.hoveredTextColor;
                }
            }
        }
        //#region fontFace
        fontFace = obj.fontFamily ? obj.fontFamily : DEFAULTFONTFACE;
        if (!theme.fonts[fontFace] || theme.fonts[fontFace].status !== "loaded") {
            if (!Core.themes.fonts[fontFace] || Core.themes.fonts[fontFace].status !== "loaded") {
                return;
            }
        }
        //#endregion fontFace
        //#region Text transform
        if (obj.textTransform !== TEXTTRANSFORMS.NONE) {
            switch (obj.textTransform) {
                case TEXTTRANSFORMS.CAPITALIZE:
                    caption = caption.capitaliseWords;
                    break;
                case TEXTTRANSFORMS.UPPERCASE:
                    caption = caption.toUpperCase();
                    break;
                case TEXTTRANSFORMS.LOWERCASE:
                    caption = caption.toLowerCase();
                    break;
            }
        }
        //#endregion Text transform
        //#region Font size
        ctx.font = `${fontFaceStyle} ${obj.fontSize}${obj.fontSizeUnit} ${fontFace}`;
        //#endregion Font size
        //#region Font family
        textM = ctx.measureText(caption);
        //#endregion Font family
        //#region BackgroundColor
        ctx.save();
        ctx.fillStyle = obj.backColor.toRGBAString();
        ctx.fillRect(0,0,textM.width,textM.height);
        ctx.restore();
        //#endregion BackgroundColor
        //#region Alignment
        ctx.textAlign = "left";
        if (!autoSize) {
            //ctx.textAlign = obj.horizAlign;
            switch (obj.horizAlign) {
                case TEXTALIGNS.LEFT:
                    offsetX = 0;
                    break;
                case TEXTALIGNS.CENTER:
                    offsetX = (width - textM.width) * 0.5;
                    break;
                case TEXTALIGNS.RIGHT:
                    offsetX = width - textM.width;
                    break;
            }
            switch (obj.vertAlign) {
                case VERTTEXTALIGNS.TOP:
                    offsetY = textM.fontBoundingBoxAscent?textM.fontBoundingBoxAscent:textM._actualBoundingBoxAscent;
                    break;
                case VERTTEXTALIGNS.MIDDLE:
                    offsetY = (height - textM.height) * 0.5 + (textM.fontBoundingBoxAscent?textM.fontBoundingBoxAscent:textM._actualBoundingBoxAscent) + (obj instanceof Core.classes.WindowButton?1:0);
                    break;
                case VERTTEXTALIGNS.BOTTOM:
                    offsetY = height - (textM.fontBoundingBoxDescent?textM.fontBoundingBoxDescent:textM._actualBoundingBoxDescent);
                    break;
            }
        } else {
            offsetY = (textM.fontBoundingBoxAscent?textM.fontBoundingBoxAscent:textM._actualBoundingBoxAscent);
        }
        //#region Alignment
        //#region Text overflow
        if (obj.textOverflow === Types.TEXTOVERFLOWS.ELLIPSIS && !autoSize) {
            clipped = true;
            if (textM.width>width) {
                lsText = caption;
                if (ctx.measureText(ellipsis).width<=width) {
                    do {
                        lsText = lsText.substr(0, lsText.length-1);
                        caption = lsText + ellipsis;
                        textM = ctx.measureText(caption);
                    } while (textM.width >= width);
                    if (caption.endsWith(ellipsis)) {
                        textM = ctx.measureText(caption.substr(0, caption.length-1));
                    }
                }
            }
        }
        //#endregion Text overflow
        //#region Clipping
        if (clipped) {
            if (!autoSize) {
                ctx.clipRect(0, 0, width, height);
            } else {
                ctx.clipRect(0, 0, textM.width, textM.height);
            }
        }
        //#endregion Clipping
        ctx.save();
        //#region PressedCaptionOffset
        if (obj.isPressed) {
            const PressedCaptionOffset = (objTheme && objTheme.pressedCaptionOffset?objTheme.pressedCaptionOffset:false);
            if (PressedCaptionOffset) {
                if (typeof PressedCaptionOffset === Types.CONSTANTS.OBJECT) {
                    offsetX += PressedCaptionOffset.x;
                    offsetY += PressedCaptionOffset.y;
                } else {
                    offsetX += PressedCaptionOffset;
                    offsetY += PressedCaptionOffset;
                }
            }
        }
        //#region PressedCaptionOffset
        ctx.translate(offsetX, offsetY);
        //#region textShadow
        if (obj.textShadows) {
            ctx.save();
            ctx.clipRect(-1000, -1000, textM.width + 2000, textM.height + 2000);
            obj.textShadows.items.reverse().forEach(ts => {
                ctx.shadowBlur = ts.blur;
                if (ts.color) {
                    ctx.shadowColor = ts.color.toRGBHexString();
                } else {
                    ctx.shadowColor = color;
                }
                ctx.shadowOffsetX = 10000 + ts.offset.x;
                ctx.shadowOffsetY = ts.offset.y;
                ctx.fillText(caption, -10000, 0);
            });
            ctx.restore();
        }
        //#endregion textShadow
        ctx.strokeStyle = "transparent";
        ctx.fillStyle = color;
        if (effect && effect.drawBefore && !(obj instanceof Core.classes.Label && !obj.wrapText)) {
            Core.themes[`Label${effect.cssName.firstCharUpper}Effect`].render(obj, caption, offsetX, offsetY, textM);
        }
        ctx.strokeText(caption, 0, 0);
        ctx.fillText(caption, 0, 0);
        if (effect && !effect.drawBefore && !(obj instanceof Core.classes.Label && !obj.wrapText)) {
            Core.themes[`Label${effect.cssName.firstCharUpper}Effect`].render(obj, caption, offsetX, offsetY, textM);
        }
        ctx.translate(0, -(textM.fontBoundingBoxAscent?textM.fontBoundingBoxAscent:textM._actualBoundingBoxAscent));
        //#region Text decoration
        if (caption !== ellipsis && obj.textDecoration.style !== Types.TEXTDECORATIONSTYLES.NONE) {
            ctx.strokeStyle = color;
            Core.themes.CaptionControl.drawTextDecoration(obj.textDecoration, obj.textShadows, textM, lineWidth);
        }
        //#endregion Text decoration
        ctx.restore();
        return caption;
    },
    //#endregion render
    //#region drawTextDecoration
    drawTextDecoration(textDecoration, textShadows, textM, lineWidth) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const txtColor = textDecoration.color?textDecoration.color:Colors.BLACK;
        const textH2 = ~~(textM.height - (textM.fontBoundingBoxAscent?textM.fontBoundingBoxAscent:textM._actualBoundingBoxAscent) * 0.5);
        let tops = [];
        const TEXTDECORATIONSTYLES = Types.TEXTDECORATIONSTYLES;
        const style = textDecoration.style;
        const sinKern = 39 * textM.width / 270;
        //#endregion Variables déclaration
        if (!textDecoration.underline && !textDecoration.overline && !textDecoration.lineThrough) {
            return;
        }
        if (textDecoration.underline) {
            tops.push(textM.height - lineWidth + (style === TEXTDECORATIONSTYLES.WAVY?lineWidth:0));
            if (style === TEXTDECORATIONSTYLES.DOUBLE) {
                tops.push(textM.height + 1);
            }
        }
        if (textDecoration.overline) {
            tops.push(~~(lineWidth / 2) - (style === TEXTDECORATIONSTYLES.WAVY?lineWidth+2:0));
            if (style === TEXTDECORATIONSTYLES.DOUBLE) {
                tops.push(-~~(lineWidth / 2) - 1);
            }
        }
        if (textDecoration.lineThrough) {
            tops.push(textH2 - 1);
            if (style === TEXTDECORATIONSTYLES.DOUBLE) {
                tops.push(textH2 + (lineWidth + 1));
            }
        }
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = txtColor;
        ctx.clipRect(-1000, -1000, textM.width + 2000, textM.height + 2000);
        switch (style) {
            case TEXTDECORATIONSTYLES.DOTTED:
                ctx.setLineDash([lineWidth, lineWidth]);
                break;
            case TEXTDECORATIONSTYLES.DASHED:
                ctx.setLineDash([lineWidth * 2, lineWidth]);
                break;
        }
        if (textShadows.items.length>0) {
            textShadows.items.reverse().forEach(ts => {
                if (ts.color) {
                    ctx.shadowColor = ts.color.toRGBHexString();
                } else {
                    ctx.shadowColor = txtColor.toRGBHexString();
                }
                ctx.shadowOffsetX = 10000 + ts.offset.x;
                ctx.shadowOffsetY = ts.offset.y;
                ctx.shadowBlur = ts.blur;
                ctx.beginPath();
                tops.forEach(top => {
                    if (style === TEXTDECORATIONSTYLES.WAVY) {
                        ctx.wavy({ x:-10000, y:top + 0.5}, { x:-10000 + textM.width, y:top + 0.5}, sinKern, 3, 1, true);
                    } else {
                        ctx.moveTo(-10000, top + 0.5);
                        ctx.lineTo(-10000 + textM.width, top + 0.5);
                    }
                });
                ctx.stroke();
            });
        }
        tops.forEach(top => {
            ctx.beginPath();
            if (style === TEXTDECORATIONSTYLES.WAVY) {
                ctx.wavy({ x:0, y:top + 0.5}, { x:textM.width, y:top + 0.5}, sinKern, 3, 1, true);
            } else {
                ctx.moveTo(0, top + 0.5);
                ctx.lineTo(textM.width, top + 0.5);
            }
            ctx.stroke();
        });
        ctx.restore();
    }
    //#endregion drawTextDecoration
};
//#endregion CaptionControl
﻿//#region Imports
import { Convert } from '/scripts/core/convert.js';
//#endregion Imports
//#region Text
class Text {
    //#region Methods
    //#region wrapText
    static wrapText(text, withSpace) {
        if (!core.tools.isString(text)) {
            return [];
        }
        if (text === String.EMPTY) {
            return text.split();
        }
        !core.tools.isBool(withSpace) && (withSpace = !1);
        withSpace && (text = text.replace(/ /g, ' [|]'));
        text = text.replace(/\\n/g, '[|]¤[|]');
        text = text.replace(/\n/g, '[|]¤[|]');
        text = text.replace(/<br \/>/g, '[|]¤[|]');
        text = text.replace(/<br>/g, '[|]¤[|]');
        text = text.replace(/<br\/>/g, '[|]¤[|]');
        text = text.split('[|]');
        return text;
    }
    //#endregion wrapText
    //#region wordWrapText
    static wordWrapText(ctx, text, maxWidth) {
        //#region Variables déclaration
        let line = String.EMPTY;
        const lines = [];
        let words = text.replace(text, String.SPACE, '\f ');
        //#endregion Variables déclaration
        words = words.split(String.SPACE);
        words.forEach(word => {
            const testLine = line + word;
            const testWidth = ctx.measureText(testLine.replace('\f', String.SPACE)).width;
            if (testWidth > maxWidth - 5 && n > 0) {
                line = text.replace(line, '\f', String.SPACE);
                lines.push(line);
                line = word;
            }
            else {
                line = testLine;
            }
        });
        line = text.replace(line, '\f', String.SPACE);
        lines.push(line);
        return lines;
    }
    //#endregion wordWrapText
    //#region findWordBreak
    static findWordBreak(text, col, step) {
        step < 0 && (col += step);
        const d = isWordSeparator(text[col]);
        if (d && step > 0) {
            return col + step;
        }
        for (; col >= 0 && col < text.length; col += step) {
            if (isWordSeparator(text[col]) !== d) {
                return step < 0 ? col -= step : col + step;
            }
        }
        return step < 0 ? 0 : text.length;
    }
    //#endregion findWordBreak
    //#region isWordSeparator
    static isWordSeparator(c) {
        return ' \t\'",;.!~@#$%^&*?=<>()[]:\\+-'.indexOf(c) !== -1;
    }
    //#endregion isWordSeparator
    //#region getTok
    static getTok(string, position) {
        //#region Variables déclaration
        let i = 0;
        //#endregion Variables déclaration
        if (core.tools.isString(string)) {
            let result = String.EMPTY;
            const len = string.length;
            if (position > len) {
                return null;
            }
            while (position <= len && string.charAt(position) === String.SPACE) {
                position++;
            }
            for (i = position; i < len; i++) {
                if ('zmlchvsqtaZMLCHVSQTA'.indexOf(string.charAt(i)) === -1) {
                    break;
                }
                result += string.charAt(i);
            }
            return { s: result, pos: i };
        }
    }
    //#endregion getTok
    //#region getNum
    static getNum(string, position) {
        //#region Variables déclaration
        let i = 0;
        //#endregion Variables déclaration
        if (core.tools.isString(string)) {
            let Result = String.EMPTY;
            const len = string.length;
            if (position > len) {
                return null;
            }
            while (position <= len && string.charAt(position) === String.SPACE) {
                position++;
            }
            for (i = position; i < len; i++) {
                if (string.charAt(i) === 'e') {
                    Result += string.charAt(i);
                    continue;
                }
                if (string.charAt(i) === '-' && len > 0 && Result.charAt(Result.length - 1) === 'e') {
                    Result += string.charAt(i);
                    continue;
                }
                if ('0123456789.'.indexOf(string.charAt(i)) === -1 && !((i === position) && string.charAt(i) === '-')) {
                    break;
                }
                Result += string.charAt(i);
            }
            while (string.charAt(position) === String.SPACE) {
                position++;
            }
            return { Result, Pos: i };
        }
    }
    //#endregion getNum
    //#region getPoint
    static getPoint(string, position) {
        if (core.tools.isString(string)) {
            const len = string.length;
            if (position > len) {
                return null;
            }
            while (position <= len && [',', String.SPACE].indexOf(string.charAt(position)) !== -1) {
                position++;
            }
            let o = Text.getNum(string, position);
            const x = o.Result;
            position = o.Pos;
            while (position <= len && [',', String.SPACE].indexOf(string.charAt(position)) !== -1) {
                position++;
            }
            o = Text.getNum(string, position);
            const y = o.Result;
            position = o.Pos;
            while (position <= len && [',', String.SPACE].indexOf(string.charAt(position)) !== -1) {
                position++;
            }
            return { Point: new core.classes.Point(Convert.strToFloat(x), Convert.strToFloat(y)), Pos: position };
        }
    }
    //#endregion getPoint
    //#region getTextSizes
    static getTextSizes(text, _class, htmlObj) {
        if (core.tools.isString(text)) {
            //if (font!==null) {
            //  if (!(font instanceof $j.classes.Font)) return;
            //}
            const d = document.createElement(core.types.HTMLELEMENTS.SPAN);
            if (_class) {
                d.classList.add(_class);
            } else if (htmlObj) {
                d.style.fontFamily = getComputedStyle(htmlObj).fontFamily;
                d.style.fontSize = int(getComputedStyle(htmlObj).fontsize);
                d.style.fontStretch = getComputedStyle(htmlObj).fontStretch;
                d.style.fontStyle = getComputedStyle(htmlObj).fontStyle;
                d.style.fontWeight = getComputedStyle(htmlObj).fontWeight;
                //d.style.font=getComputedStyle(htmlObj).getPropertyValue("font");
            }
            //d.style.position="absolute";
            //if (font) font.toCss(d);
            d.innerHTML = text;
            document.documentElement.appendChild(d);
            const height = d.offsetHeight;
            const width = d.offsetWidth;
            document.documentElement.removeChild(d);
            return { w: width, h: height };
        }
    }
    //#endregion getTextSizes
    //#region replace
    static replace(s, f, r) {
        return s.replace(new RegExp(f, 'g'), r);
    }
    //#endregion replace
    //#region getLastNumber
    static getLastNumber(str) {
        return str.match(/\d+$/)[0];
    }
    //#endregion getLastNumber
    //#region setTextNode
    static setTextNode(element, text) {
        //#region Variables déclaration
        const includeCaption = element.querySelector('.includeCaption');
        //#endregion Variables déclaration
        includeCaption && (element = includeCaption);
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            !1
        );

        let node = walker.nextNode();
        if (!node) {
            node = document.createTextNode(text);
            element.appendChild(node);
        } else {
            while (node) {
                node.parentNode === element && (node.nodeValue = text);
                node = null;
            }
        }
    }
    //#endregion setTextNode
    //#region formatHTML
    static formatHTML(code, stripWhiteSpaces, stripEmptyLines, indentSize) {
        //#region Variables déclaration
        const whitespace = String.SPACE.repeat(indentSize ? int(indentSize) : 4); // Default indenting 4 whitespaces
        let pos = 0;
        let result = [];
        //#endregion Variables déclaration
        for (; pos <= code.length; pos++) {
            let nextSpace = String.EMPTY;
            let currentCode = String.EMPTY;
            let lastOpenedTag = String.EMPTY;
            let currentIndent = 0;
            let char = code.substr(pos, 1);
            const nextChar = code.substr(pos + 1, 1);
            // If opening tag, add newline character and indention
            if (char === '<' && nextChar !== '/') {
                result.length > 0 && (result = [...result, '\n']);
                result = [...result, whitespace.repeat(currentIndent)];
                currentIndent++;
                currentCode = code.substr(pos, code.length);
                nextSpace = currentCode.indexOf(String.SPACE);
                nextSpace === -1 && (nextSpace = currentCode.indexOf('>'));
                lastOpenedTag = code.substr(pos + 1, nextSpace - 1);
            }
            // if Closing tag, add newline and indention
            else if (char === '<' && nextChar === '/') {
                // If there're more closing tags than opening
                --currentIndent < 0 && (currentIndent = 0);
                currentCode = code.substr(pos + 1, code.length);
                nextSpace = currentCode.indexOf('>');
                const currentClosedTag = code.substr(pos + 2, nextSpace - 1);
                lastOpenedTag !== currentClosedTag && (result = [...result, `\n${whitespace.repeat(currentIndent)}`]);
                lastOpenedTag = String.EMPTY;
            }
            // remove multiple whitespaces
            else if (stripWhiteSpaces && char === String.SPACE && nextChar === String.SPACE) {
                char = String.EMPTY;
                // remove empty lines
            } else if (stripEmptyLines && char === '\n') {
                //debugger;
                String.isNullOrEmpty(code.substr(pos, code.substr(pos).indexOf('<')).trim()) && (char = String.EMPTY);
            }
            result = [...result, char]
        }
        return result.join(String.EMPTY);
    }
    //#endregion formatHTML
    //#endregion Methods
}
//#endregion Text
export { Text };
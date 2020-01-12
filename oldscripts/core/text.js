define(['require'], function (require) {
    //#region Methods
    function wrapText(text, withSpace) {
        var Types = require("types");
        if (typeof text !== Types.CONSTANTS.STRING) return [];
        if (text === String.EMPTY) return text.split();
        if (typeof withSpace === Types.CONSTANTS.UNDEFINED) withSpace = false;
        if (withSpace) text = text.replace(/ /g, " [|]");
        text = text.replace(/\\n/g, "[|]¤[|]");
        text = text.replace(/\n/g, "[|]¤[|]");
        text = text.replace(/<br \/>/g, "[|]¤[|]");
        text = text.replace(/<br>/g, "[|]¤[|]");
        text = text.replace(/<br\/>/g, "[|]¤[|]");
        text = text.split("[|]");
        return text;
    };
    function wordWrapText(ctx, text, maxWidth) {
        var Tools = require("tools");
        var words, line = '', testLine, testWidth, lines = [];
        words = Tools.text.replace(text, ' ', '\f ');
        words = words.split(' ');
        for (var n = 0; n < words.length; n++) {
            testLine = line + words[n];
            testWidth = ctx.measureText(testLine.replace('\f', ' ')).width;
            if (testWidth > maxWidth - 5 && n > 0) {
                line = Tools.text.replace(line, '\f', ' ');
                lines.push(line);
                line = words[n];
            }
            else {
                line = testLine;
            }
        }
        line = Tools.text.replace(line, '\f', ' ');
        lines.push(line);
        return lines;
    };
    function findWordBreak(text, col, step) {
        var Text = require("text");
        if (step < 0) col += step;
        var d = Text.isWordSeparator(text[col]);
        if (d && step > 0) return col + step;
        for (col = col; col >= 0 && col < text.length; col += step)
            if (Text.isWordSeparator(text[col]) !== d) return step < 0 ? col -= step : col + step;
        return step < 0 ? 0 : text.length;
    };
    function isWordSeparator(c) {
        return " \t'\",;.!~@#$%^&*?=<>()[]:\\+-".indexOf(c) !== -1;
    };
    function getTok(string, position) {
        var Types = require("types");
        if (typeof string !== Types.CONSTANTS.STRING) return;
        var result = String.EMPTY, len = string.length;
        if (position > len) return;
        while ((position <= len) && (string.charAt(position) === String.SPACE)) position++;
        for (var i = position; i < len; i++) {
            if ('zmlchvsqtaZMLCHVSQTA'.indexOf(string.charAt(i)) === -1) break;
            result += string.charAt(i);
        }
        return { s: result, pos: i };
    };
    function getNum(string, position) {
        var Types = require("types");
        if (typeof string !== Types.CONSTANTS.STRING) return;
        var result = String.EMPTY, len = string.length;
        if (position > len) return;
        while ((position <= len) && (string.charAt(position) === String.SPACE)) position++;
        for (var i = position; i < len; i++) {
            if (string.charAt(i) === 'e') {
                result += string.charAt(i);
                continue;
            }
            if ((string.charAt(i) === '-') && (len > 0) && (result.charAt(result.length - 1) === 'e')) {
                result += string.charAt(i);
                continue;
            }
            if (('0123456789.'.indexOf(string.charAt(i)) === -1) && !((i === position) && string.charAt(i) === '-')) break;
            result += string.charAt(i);
        }
        while (string.charAt(position) === String.SPACE) position++;
        return { Result: result, Pos: i };
    };
    function getPoint(string, position) {
        var Types = require("types");
        var Conversion = require("conversion");
        var Geometry = require("geometry");
        if (typeof string !== Types.CONSTANTS.STRING) return;
        position = position;
        var x, y, result, len = string.length, _pos, o;
        if (position > len) return;
        while ((position <= len) && ([',', String.SPACE].indexOf(string.charAt(position)) !== -1)) position++;
        o = getNum(string, position);
        x = o.Result;
        position = o.Pos;
        while ((position <= len) && ([',', String.SPACE].indexOf(string.charAt(position)) !== -1)) position++;
        o = getNum(string, position);
        y = o.Result;
        position = o.Pos;
        while ((position <= len) && ([',', String.SPACE].indexOf(string.charAt(position)) !== -1)) position++;
        return { Point: new Geometry.Point(Conversion.strToFloat(x), Conversion.strToFloat(y)), Pos: position };
    };
    function getTextSizes(text, _class, htmlObj) {
        var Core = require("core");
        var Types = require("types");
        var CSS = require("css");
        var d, H = 0, W = 0;
        if (typeof text !== Types.CONSTANTS.STRING) return;
        //if (font!==null) {
        //  if (!(font instanceof $j.classes.Font)) return;
        //}
        d = Core.doc.createElement($j.types.HTMLElements.SPAN);
        if (_class) CSS.addClass(d, _class);
        else if (htmlObj) {
            d.style.fontFamily = getComputedStyle(htmlObj).fontFamily;
            d.style.fontSize = parseInt(getComputedStyle(htmlObj).fontsize, 10);
            d.style.fontStretch = getComputedStyle(htmlObj).fontStretch;
            d.style.fontStyle = getComputedStyle(htmlObj).fontStyle;
            d.style.fontWeight = getComputedStyle(htmlObj).fontWeight;
            //d.style.font=getComputedStyle(htmlObj).getPropertyValue("font");
        }
        //d.style.position="absolute";
        //if (font) font.toCss(d);
        d.innerHTML = text;
        Core.doc.documentElement.appendChild(d);
        H = d.offsetHeight;
        W = d.offsetWidth;
        Core.doc.documentElement.removeChild(d);
        return { w: W, h: H };
    };
    function replace(s, f, r) {
        return s.replace(new RegExp(f, 'g'), r);
    };
    function getLastNumber(str) {
        return str.match(/\d+$/)[0];
    };
    function setTextNode(node, text) {
        var Types = require("types");
        var i = 0, l, childs;
        childs = node.childNodes;
        l = childs.length;
        if (l > 0) {
            while (i < l) {
                if (childs[i].nodeType === Types.XMLNODETYPES.TEXT_NODE) {
                    childs[i].nodeValue = text;
                    i = l + 1;
                }
                i++;
            }
        } else node.innerHTML = text;
    };
    function formatHTML(code, stripWhiteSpaces, stripEmptyLines, indentSize) {
        var whitespace = String.SPACE.repeat((indentSize) ? ~~indentSize : 4); // Default indenting 4 whitespaces
        var currentIndent = 0;
        var char = String.EMPTY;
        var nextChar = String.EMPTY;
        var lastOpenedTag = String.EMPTY;
        var currentCode = String.EMPTY;
        var nextSpace = String.EMPTY;
        var currentClosedTag = String.EMPTY;

        var result = String.EMPTY;
        for (var pos = 0; pos <= code.length; pos++) {
            char = code.substr(pos, 1);
            nextChar = code.substr(pos + 1, 1);
            // If opening tag, add newline character and indention
            if (char === '<' && nextChar !== '/') {
                if (result !== '') result += '\n';
                result += whitespace.repeat(currentIndent);
                currentIndent++;
                currentCode = code.substr(pos, code.length);
                nextSpace = currentCode.indexOf(String.SPACE);
                if (nextSpace === -1) nextSpace = currentCode.indexOf(">");
                lastOpenedTag = code.substr(pos + 1, nextSpace - 1);
            }
                // if Closing tag, add newline and indention
            else if (char === '<' && nextChar === '/') {
                // If there're more closing tags than opening
                if (--currentIndent < 0) currentIndent = 0;
                currentCode = code.substr(pos + 1, code.length);
                nextSpace = currentCode.indexOf(">");
                currentClosedTag = code.substr(pos + 2, nextSpace - 1);
                if (lastOpenedTag !== currentClosedTag) result += '\n' + whitespace.repeat(currentIndent);
                lastOpenedTag = String.EMPTY;
            }
                // remove multiple whitespaces
            else if (stripWhiteSpaces === true && char === String.SPACE && nextChar === String.SPACE) char = String.EMPTY;
                // remove empty lines
            else if (stripEmptyLines === true && char === '\n') {
                //debugger;
                if (code.substr(pos, code.substr(pos).indexOf("<")).trim() === String.EMPTY) char = String.EMPTY;
            }
            result += char;
        }
        console.log(result);
        return result;
    }
    //#endregion Methods
    return {
        wrapText: wrapText,
        wordWrapText: wordWrapText,
        findWordBreak: findWordBreak,
        isWordSeparator: isWordSeparator,
        getTok: getTok,
        getNum: getNum,
        getPoint: getPoint,
        getTextSizes: getTextSizes,
        replace: replace,
        getLastNumber: getLastNumber,
        setTextNode: setTextNode,
        formatHTML: formatHTML
    }
});
//#region Imports
import { Color, Colors } from '/scripts/core/color.js';
import { Point/*, Rect, Matrix*/ } from '/scripts/core/geometry.js';
import { Text } from '/scripts/core/text.js';
import { BezierTools } from '/scripts/core/beziertools.js';
//#endregion
//#region Constantes CANVAS
/**
 * Canvas Contants
 */
export const CANVAS = {
    CURVEKAPPA: 0.2761423749153967,
    CURVEKAPPAINV: 0.7238576250846033,
    CURVE2KAPPA: 0.5522847498307934,
    CURVE2KAPPAINV: 1 - 0.5522847498307934,
    LINECAPS: Object.freeze(Object.seal({ BUTT: 'butt', ROUND: 'round', SQUARE: 'square' })),
    LINEJOINS: Object.freeze(Object.seal({ MITER: 'miter', ROUND: 'round', BEVEL: 'bevel' })),
    GLOBALCOMPOSITEOPERATIONS: Object.freeze(Object.seal({
        SOURCEOVER: 'source-over',
        SOURCEIN: 'source-in',
        SOURCEOUT: 'source-out',
        SOURCEATOP: 'source-atop',
        DESTINATIONOVER: 'destination-over',
        DESTINATIONIN: 'destination-in',
        DESTINATIONOUT: 'destination-out',
        DESTINATIONATOP: 'destination-atop',
        LIGHTER: 'lighter',
        COPY: 'copy',
        XOR: 'xor',
        MULTIPLY: 'multiply',
        SCREEN: 'screen',
        OVERLAY: 'overlay',
        DARKEN: 'darken',
        LIGHTEN: 'lighten',
        COLORDODGE: 'color-dodge',
        COLORBURN: 'color-burn',
        HARDLIGHT: 'hard-light',
        SOFTLIGHT: 'soft-light',
        DIFFERENCE: 'difference',
        EXCLUSION: 'exclusion',
        HUE: 'hue',
        SATURATION: 'saturation',
        COLOR: 'color',
        LUMINOSITY: 'luminosity'
    })),
    PATHOPERATIONS: Object.freeze(Object.seal({ MOVE: 0x234, LINE: 0x235 })),
    SPARKTYPES: Object.freeze(Object.seal({ LINE: 'line', BAR: 'bar', PIE: 'pie', BOXPLOT: 'boxPlot' })),
    PATTERNREPEATS: Object.freeze(Object.seal({
        REPEAT: 'repeat',
        REPEATX: 'repeat-x',
        REPEATY: 'repeat-y',
        NOREPEAT: 'no-repeat'
    })),
    LINEPOSITIONS: Object.freeze(Object.seal({
        LEFTTORIGHT: 0x239,
        RIGHTTOLEFT: 0x23A,
        NEAR: 0x23B,
        MIDDLE: 0x23C,
        FAR: 0x23D
    })),
    STROKEDASHS: Object.freeze(Object.seal({
        SOLID: [],
        SHORTDASH: [4, 1],
        SHORTDOT: [1, 1],
        SHORTDASHDOT: [4, 1, 1, 1],
        SHORTDASHDOTDOT: [4, 1, 1, 1, 1, 1],
        DOT: [1, 3],
        DASH: [4, 3],
        LONGDASH: [8, 3],
        DASHDOT: [4, 3, 1, 3],
        LONGDASHDOT: [8, 3, 1, 3],
        LONGDASHDOTDOT: [8, 3, 1, 3, 1, 3]
    })),
    COMPOSITEOPERATORS: Object.freeze(Object.seal({
        OVER: 'source-over',
        IN: 'source-in',
        OUT: 'source-out',
        ATOP: 'source-atop',
        XOR: 'xor',
        ARITHMETIC: 'arithmetic'
    })),
    EDGEMODES: Object.freeze(Object.seal({ DUPLICATE: 'duplicate', WRAP: 'wrap', NONE: 'none' })),
    COLORMATRIXTYPES: Object.freeze(Object.seal({
        MATRIX: 'matrix',
        SATURATE: 'saturate',
        HUEROTATE: 'hueRotate',
        LUMINANCETOALPHA: 'luminanceToAlpha'
    })),
    COMPONENTTRANSFERTYPES: Object.freeze(Object.seal({
        IDENTITY: 'identity',
        TABLE: 'table',
        DISCRETE: 'discrete',
        LINEAR: 'linear',
        GAMMA: 'gamma'
    })),
    MORPHOLOGYOPERATORS: Object.freeze(Object.seal({ ERODE: 'erode', DILATE: 'dilate' })),
    CONVOLVEMATRIXEDGEMODES: Object.freeze(Object.seal({ DUPLICATE: 'duplicate', WRAP: 'wrap', NONE: 'none' })),
    CHANNELSELECTORTYPES: Object.freeze(Object.seal({ A: 'A', R: 'R', G: 'G', B: 'B' })),
    TURBULENCETYPES: Object.freeze(Object.seal({
        TRANSLATE: 'translate',
        SCALE: 'scale',
        ROTATE: 'rotate',
        SKEWX: 'skewX',
        SKEWY: 'skewY'
    })),
    TURBULENCESTITCHTILES: Object.freeze(Object.seal({ NOSTITCH: 'noStitch', STITCH: 'stitch' })),
    LIGTHTYPES: Object.freeze(Object.seal({ POINT: 'point', SPOT: 'spot', DISTANT: 'distant' }))
};
Object.freeze(Object.seal(CANVAS));
//#endregion
//#region Extended CanvasRenderingContext2D
/**
 * Resize the canvas with new size
 * @param   {Number}    newWidth    the new width
 * @param   {Number}    newHeight   the new height
 */
CanvasRenderingContext2D.prototype.resize = function (newWidth, newHeight) {
    //#region Variables déclaration
    const PX = core.types.CSSUNITS.PX;
    //#endregion Variables déclaration
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
    this.canvas.style.width = `${newWidth}${PX}`;
    this.canvas.style.height = `${newHeight}${PX}`;
};
/**
 * Clear the canvas
 */
CanvasRenderingContext2D.prototype.clear = function () {
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.clearShadow();
};
/**
 * Clear the shadow configuration of the canvas
 */
CanvasRenderingContext2D.prototype.clearShadow = function () {
    this.shadowBlur = 0;
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.shadowColor = Colors.TRANSPARENT.toRGBAString();
};

CanvasRenderingContext2D.prototype.drawImg = function (instance, img, params) {
    //#region Variables déclaration
    let left = params.x;
    let top = params.y;
    //#endregion Variables déclaration
    if (params.align) {
        switch (params.align) {
            case core.types.TEXTALIGNS.RIGHT:
                left = instance.width - params.width - left;
                break;
        }
    }
    if (instance instanceof core.classes.WindowButton) {
        String.isNullOrEmpty(left) && (left = -eval(eval(left)));
        String.isNullOrEmpty(top) && (top = -eval(eval(top)));
        if (instance.isPressed && params.hasOwnProperty('pressedOffset')) {
            left -= params.pressedOffset;
        } else if (instance.isMouseOver && params.hasOwnProperty('hoveredOffset')) {
            left -= params.hoveredOffset;
        }
    }
    params && params.sx && params.sy && params.sWidth && params.sHeight
        ? this.drawImage(img, params.sx, params.sy, params.sWidth, params.sHeight, left, top, params.width, params.height)
        : this.drawImage(img, left, top, params.width, params.height);
}
/**
 * Draw a path on the canvas
 * @param   {PathData}      path        the path object
 */
CanvasRenderingContext2D.prototype.drawPath = function (comp, path, clip) {
    //#region Variables déclaration
    let cp = null;
    const sp = new Point();
    const KINDS = core.classes.PathPoint.KINDS;
    //#endregion Variables déclaration
    if (path instanceof core.classes.PathData) {
        //if (!comp.borderDash) comp.borderDash=$j.core.types.canvas.strokeDashs.SOLID;
        //if (!$j.core.tools.isNull(this.useNativeDash&&comp.borderDash)) this.setDash(comp.borderDash);
        if (!path.isEmpty) {
            const b = path.bounds;
            const w = b.width;
            const h = b.height;
            if (w * h > 0) {
                let i = 0;
                const pathData = path.data;
                this.beginPath();
                const l = pathData.length;
                while (i < l) {
                    if (pathData[i].kind === KINDS.MOVETO) {
                        cp = pathData[i].point;
                        this.moveTo(cp.x, cp.y);
                        sp.assign(cp);
                    } else if (pathData[i].kind === KINDS.LINETO) {
                        cp = pathData[i].point;
                        this.lineTo(cp.x, cp.y);
                    } else if (pathData[i].kind === KINDS.CURVETO) {
                        const cp1 = pathData[i].point;
                        i++;
                        const cp2 = pathData[i].point;
                        i++;
                        this.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, pathData[i].point.x, pathData[i].point.y);
                        cp = pathData[i].point;
                    } else if (pathData[i].kind === KINDS.CLOSE) {
                        this.closePath();
                    }
                    i++;
                }
                if (!clip) {
                    this.fill();
                    //if (!this.useNativeDash&&comp.borderDash.length>0){
                    //    this.beginPath();
                    //    let i=0;
                    //    while (i<l){
                    //        if (pathData[i].kind===core.classes.PathPoint.KINDS.MOVETO){
                    //            cp=pathData[i].point;
                    //            sp.assign(cp);
                    //            lastX=cp.x;
                    //            lastY=cp.y;
                    //        }else if (pathData[i].kind===core.classes.PathPoint.KINDS.LINETO){
                    //            cp=pathData[i].point;
                    //            result=this.dashedLineTo(comp.borderDash,lastX,lastY,cp.x,cp.y,result);
                    //            lastX=cp.x;
                    //            lastY=cp.y;
                    //        }else if (pathData[i].kind===core.classes.PathPoint.KINDS.CURVETO){
                    //            const cp1=pathData[i].point;
                    //            i++;
                    //            const cp2=pathData[i].point;
                    //            i++;
                    //            const pts = [];
                    //            pts.length=0;
                    //            const points = [];
                    //            points.length=0;
                    //            pts.push([lastX,lastY]);
                    //            pts.push([cp1.x,cp1.y,cp2.x,cp2.y,pathData[i].point.x,pathData[i].point.y]);
                    //            result=this.generateDasdedCurves(pts,points,bw,comp.borderDash,result);
                    //            this.drawDashedCurve(points);
                    //            cp=pathData[i].point;
                    //            lastX=cp.x;
                    //            lastY=cp.y;
                    //        }else if (pathData[i].kind===core.classes.PathPoint.KINDS.CLOSE) {
                    //            this.closePath();
                    //        }
                    //        i++;
                    //    }
                    //}
                    this.stroke();
                } else {
                    this.clip();
                }
            }
        }
    }
};
/**
 * Draw a shape on the canvas
 * @param   {Rect}          rect        the shape rect
 */
CanvasRenderingContext2D.prototype.drawShape = function (rect) {
};
/**
 * Return a byteArray of one line of the canvas
 * @return  {byteArray}     the byte array of the line
 */
CanvasRenderingContext2D.prototype.beginScanlines = function () {
    this.scanLines = this.getImageData(0, 0, this.canvas.width, this.canvas.height);
};
/**
 * Return a byteArray of one line of the canvas
 * @return  {byteArray}     the byte array of the line
 */
CanvasRenderingContext2D.prototype.getScanlines = function (row) {
    if (row > 0 && row < this.canvas.height) {
        const size = this.canvas.width * 4;
        const start = size * row;
        const end = start + size;
        return this.currentScanLine = this.scanLines.data.slice(start, end);
    }
};
/**
 * Return a byteArray of one line of the canvas
 * @return  {byteArray}     the byte array of the line
 */
CanvasRenderingContext2D.prototype.putScanlines = function (row, scanline) {
    if (row > 0 && row < this.canvas.height) {
        const size = this.canvas.width * 4;
        const start = size * row;
        scanline = scanline ? scanline : this.currentScanLine;
        this.scanLines.data.set(scanline, start);
    }
};
/**
 * Put a byte array line to the canvas
 * @param   {byteArray}     data        the byte array of the line to put on the canvas
 */
CanvasRenderingContext2D.prototype.endScanlines = function () {
    this.putImageData(this.scanLines, 0, 0);
    this.scanLines = this.currentScanLine = null;
};
/**
 * Return a byteArray of one line of the canvas
 * @return  {byteArray}     the byte array of the line
 */
CanvasRenderingContext2D.prototype.getPixelFromScanline = function (x, scanline) {
    if (x > 0 && x < this.canvas.width) {
        scanline = scanline ? scanline : this.currentScanLine;
        return {
            red: scanline[x + 0],
            green: scanline[x + 1],
            blue: scanline[x + 2],
            alpha: scanline[x + 3] / 255
        };
    }
};
/**
 * Return a byteArray of one line of the canvas
 * @return  {byteArray}     the byte array of the line
 */
CanvasRenderingContext2D.prototype.putPixelToScanline = function (x, color, scanline) {
    if (x > 0 && x < this.canvas.width && color) {
        x *= 4;
        scanline = scanline ? scanline : this.currentScanLine;
        scanline[x + 0] = color.red;
        scanline[x + 1] = color.green;
        scanline[x + 2] = color.blue;
        scanline[x + 3] = color.alpha * 255;
    }
};
/**
 * prepare text informations
 * @param   {Rect}          rect            the rect of the text
 * @param   {Boolean}       calcRect        indicate if the fonction prepare or calculte the rect of the text
 */
CanvasRenderingContext2D.prototype.prepareText = function (rect, calcRect) {
};
/**
 * Draw a text on the canvas
 * @param   {Rect}          rect        the rect of the text
 */
CanvasRenderingContext2D.prototype.drawText = function (instance, shape, params, state) {
    //#region Variables déclaration
    let offsetX = 0;
    let caption = null;
    const TEXTALIGNS = core.types.TEXTALIGNS;
    //#endregion Variables déclaration
    shape.ref != undefined && (caption = instance[shape.ref].caption);
    shape.font && (this.font = shape.font);
    const textM = this.measureText(caption);
    if (shape.textAlign) {
        this.textAlign = shape.textAlign;
        let logoShape = null;
        switch (shape.textAlign) {
            case TEXTALIGNS.CENTER:
                offsetX = instance.width;
                if (shape.alignWithButtonsAndIcon != undefined && shape.alignWithButtonsAndIcon) {
                    offsetX -= (instance.visibleButtons * core.themes[instance.themeName].WindowButton.width);
                    logoShape = core.themes[instance.themeName].WindowTitleBar.shapes.filter(e => { return e.type === 'drawImg' }).first;
                    offsetX -= logoShape.width;
                }
                offsetX = (offsetX - textM.width) * 0.5;
                if (params.hasOwnProperty('isDialog') && !params.isDialog) {
                    core.themes[instance.themeName].WindowButton.left != null
                        ? offsetX += (instance.visibleButtons * core.themes[instance.themeName].WindowButton.width)
                        : logoShape && (offsetX += logoShape.width);
                }
                break;
            case TEXTALIGNS.RIGHT:
                offsetX = instance.width - textM.width;
                break;
        }
    }
    shape.textBaseline && (this.textBaseline = shape.textBaseline);
    if (state) {
        this.translate(offsetX, 0);
        core.tools.processStyle(instance, shape, state, 'Text', [caption, shape.x, shape.y]);
    }
};
/**
 * Draw a ploygon on the canvas
 * @param       {Array}         a          the ploygon points
 */
CanvasRenderingContext2D.prototype.drawPolygon = function (a) {
    if (Array.isArray(a)) {
        this.beginPath();
        a.forEach((w, i) => {
            i === 0 ? this.moveTo(w.x, w.y) : this.lineTo(w.x, w.y);
        });
        this.closePath();
        this.fill();
        this.stroke();
    }
};
/**
 * Draw a polyline on the canvas
 * @param       {Array}         a          the polyline points
 */
CanvasRenderingContext2D.prototype.drawPolyline = function (a) {
    if (Array.isArray(a)) {
        this.beginPath();
        a.forEach((w, i) => {
            i === 0 ? this.moveTo(w.x, w.y) : this.lineTo(w.x, w.y);
        });
        this.stroke();
    }
};
/**
 * Draw a number with digit segments
 * @param   {Object}        params                 parameters of the function
 * @param   {String}        params.value           the number to draw
 * @param   {Number}        params.x               the x coordinate of the start point
 * @param   {Number}        params.y               the y coordinate of the start point
 * @param   {Number}        params.height          the height of the digit
 * @param   {Color}         params.outlineColor    the outline color
 * @param   {Color}         params.fillColor       the fill color
 */
CanvasRenderingContext2D.prototype.drawDigit = function (params) {
    //#region Variables déclaration
    const width = 10 * params.height / 13;
    const segmentA = [];
    const segmentB = [];
    const segmentC = [];
    const segmentD = [];
    const segmentE = [];
    const segmentF = [];
    const segmentG = [];
    const getX = (x, width) => { return x * width / 12; };
    const getY = (y, height) => { return y * height / 15; };
    //#endregion Variables déclaration
    params.outlineColor.alpha = ((40 * 100) / 255) / 100;
    //Segment A
    segmentA[0] = segmentA[4] = new core.classes.Point(params.x + getX(2.8, width), params.y + getY(1, params.height));
    segmentA[1] = new core.classes.Point(params.x + getX(10, width), params.y + getY(1, params.height));
    segmentA[2] = new core.classes.Point(params.x + getX(8.8, width), params.y + getY(2, params.height));
    segmentA[3] = new core.classes.Point(params.x + getX(3.8, width), params.y + getY(2, params.height));
    //Segment B
    segmentB[0] = segmentB[4] = new core.classes.Point(params.x + getX(10, width), params.y + getY(1.4, params.height));
    segmentB[1] = new core.classes.Point(params.x + getX(9.3, width), params.y + getY(6.8, params.height));
    segmentB[2] = new core.classes.Point(params.x + getX(8.4, width), params.y + getY(6.4, params.height));
    segmentB[3] = new core.classes.Point(params.x + getX(9, width), params.y + getY(2.2, params.height));
    //Segment C
    segmentC[0] = segmentC[4] = new core.classes.Point(params.x + getX(9.2, width), params.y + getY(7.2, params.height));
    segmentC[1] = new core.classes.Point(params.x + getX(8.7, width), params.y + getY(12.7, params.height));
    segmentC[2] = new core.classes.Point(params.x + getX(7.6, width), params.y + getY(11.9, params.height));
    segmentC[3] = new core.classes.Point(params.x + getX(8.2, width), params.y + getY(7.7, params.height));
    //Segment D
    segmentD[0] = segmentD[4] = new core.classes.Point(params.x + getX(7.4, width), params.y + getY(12.1, params.height));
    segmentD[1] = new core.classes.Point(params.x + getX(8.4, width), params.y + getY(13, params.height));
    segmentD[2] = new core.classes.Point(params.x + getX(1.3, width), params.y + getY(13, params.height));
    segmentD[3] = new core.classes.Point(params.x + getX(2.2, width), params.y + getY(12.1, params.height));
    //Segment E
    segmentE[0] = segmentE[4] = new core.classes.Point(params.x + getX(2.2, width), params.y + getY(11.8, params.height));
    segmentE[1] = new core.classes.Point(params.x + getX(1, width), params.y + getY(12.7, params.height));
    segmentE[2] = new core.classes.Point(params.x + getX(1.7, width), params.y + getY(7.2, params.height));
    segmentE[3] = new core.classes.Point(params.x + getX(2.8, width), params.y + getY(7.7, params.height));
    //Segment F
    segmentF[0] = segmentF[4] = new core.classes.Point(params.x + getX(3, width), params.y + getY(6.4, params.height));
    segmentF[1] = new core.classes.Point(params.x + getX(1.8, width), params.y + getY(6.8, params.height));
    segmentF[2] = new core.classes.Point(params.x + getX(2.6, width), params.y + getY(1.3, params.height));
    segmentF[3] = new core.classes.Point(params.x + getX(3.6, width), params.y + getY(2.2, params.height));
    //Segment G
    segmentG[0] = segmentG[6] = new core.classes.Point(params.x + getX(2, width), params.y + getY(7, params.height));
    segmentG[1] = new core.classes.Point(params.x + getX(3.1, width), params.y + getY(6.5, params.height));
    segmentG[2] = new core.classes.Point(params.x + getX(8.3, width), params.y + getY(6.5, params.height));
    segmentG[3] = new core.classes.Point(params.x + getX(9, width), params.y + getY(7, params.height));
    segmentG[4] = new core.classes.Point(params.x + getX(8.2, width), params.y + getY(7.5, params.height));
    segmentG[5] = new core.classes.Point(params.x + getX(2.9, width), params.y + getY(7.5, params.height));
    //Segment DP
    // Draw Segments Outline
    this.fillStyle = params.outlineColor.toRGBAString();
    this.strokeStyle = params.outlineColor.toRGBAString();
    this.drawPolygon(segmentA);
    this.drawPolygon(segmentB);
    this.drawPolygon(segmentC);
    this.drawPolygon(segmentD);
    this.drawPolygon(segmentE);
    this.drawPolygon(segmentF);
    this.drawPolygon(segmentG);
    // Fill Segments
    this.fillStyle = params.fillColor.toRGBAString();
    this.strokeStyle = params.fillColor.toRGBAString();
    //Fill SegmentA
    [0, 2, 3, 5, 6, 7, 8, 9].indexOf(params.value) > -1 && this.drawPolygon(segmentA);
    //Fill SegmentB
    [0, 1, 2, 3, 4, 7, 8, 9].indexOf(params.value) > -1 && this.drawPolygon(segmentB);
    //Fill SegmentC
    [0, 1, 3, 4, 5, 6, 7, 8, 9].indexOf(params.value) > -1 && this.drawPolygon(segmentC);
    //Fill SegmentD
    [0, 2, 3, 5, 6, 8, 9].indexOf(params.value) > -1 && this.drawPolygon(segmentD);
    //Fill SegmentE
    [0, 2, 6, 8].indexOf(params.value) > -1 && this.drawPolygon(segmentE);
    //Fill SegmentF
    [0, 4, 5, 6, 7, 8, 9].indexOf(params.value) > -1 && this.drawPolygon(segmentF);
    //Fill SegmentG
    [2, 3, 4, 5, 6, 8, 9, -1].indexOf(params.value) > -1 && this.drawPolygon(segmentG);
};
/**
 * Draw a reflexion of an canvas on the canvas
 * @param   {CanvasElement}     canvas      the canvas to be reflected
 * @param   {Control}           object      the control for properties
 */
CanvasRenderingContext2D.prototype.drawReflection = function (canvas, object) {
    //#region Variables déclaration
    const h = (object.owner.height * object.length);
    const c = newCanvas;
    //#endregion Variables déclaration
    c.width = object.owner.width;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.save();
    ctx.translate(0, object.owner.height - 1);
    ctx.scale(1, -1);
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
    ctx.globalCompositeOperation = CANVAS.GLOBALCOMPOSITEOPERATIONS.DESTINATIONOUT;
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(1, '#FFF');
    gradient.addColorStop(0, `rgba(255,255,255,${object.opacity})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, object.owner.width, h * 2);
    this.drawImage(c, 0, object.owner.height + object.offset);
};
/**
 * Set the transformation matrix of the canvas
 * @param   {Matrix}        mat     then new transformation matrix
 */
CanvasRenderingContext2D.prototype.setMatrix = function (mat) {
    mat instanceof core.classes.Matrix && this.setTransform(mat.m11, mat.m12, mat.m21, mat.m22, mat.m31, mat.m32);
};
/**
 * Flood fill from a x/y coordinate with a color
 * @param   {Number}        x       the x coordiante of the point
 * @param   {Number}        y       the y coordiante of the point
 * @param   {Color}         color   the color of flood fill
 * @returns {Boolean}       !0 if succed otherwise !1
 */
CanvasRenderingContext2D.prototype.floodFill = function (x, y, color, borderColor) {
    // if values are not set just exit
    if (x && y && color) {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const image = this.getImageData(0, 0, width, height);
        const imageData = image.data;
        const stack = [[x, y]];
        let pixel;
        let point = 0;
        while (stack.length > 0)
        {   
            pixel = stack.pop();
            if ((pixel[0] < 0 || pixel[0] >= width) || (pixel[1] < 0 || pixel[1] >= height)) {
                continue;
            }
        
            // Alpha
            point = pixel[1] * 4 * width + pixel[0] * 4 + 3;
        
            // Если это не рамка и ещё не закрасили
            if (imageData.data[point] !== borderColor && imageData.data[point] != color)
            {
                // Закрашиваем
                imageData.data[point] = color;
            
                // Ставим соседей в стек на проверку
                stack.push([
                    pixel[0] - 1,
                    pixel[1]
                ]);
                stack.push([
                    pixel[0] + 1,
                    pixel[1]
                ]);
                stack.push([
                    pixel[0],
                    pixel[1] - 1
                ]);
                stack.push([
                    pixel[0],
                    pixel[1] + 1
                ]);
            }
        }
        this.putImageData(image, 0, 0);
        return !0;
    }
    return !1;
};
/**
 * Draw a star
 * @param   {Rect}      r       the rectangle that contain the star
 * @param   {Component}     comp    the component that contain all properties of the star
 * @param   {Boolean}       clip    clip the star or not
 */
CanvasRenderingContext2D.prototype.drawStar = function (r, comp, clip) {
    !comp.borderDash && (comp.borderDash = CANVAS.STROKEDASHS.SOLID);
    this.useNativeDash && comp.borderDash && (this.setDash(comp.borderDash));
    const w2 = r.width / 2;
    this.beginPath();
    this.moveTo(w2, 0);
    this.lineTo(r.width * 0.375, r.height * 0.4);
    this.lineTo(r.left, r.height * 0.4);
    this.lineTo(r.width * 0.3, r.height * 0.625);
    this.lineTo(r.width * 0.2, r.height);
    this.lineTo(r.width * 0.5, r.height * 0.725);
    this.lineTo(r.width * 0.8, r.height);
    this.lineTo(r.width * 0.7, r.height * 0.625);
    this.lineTo(r.width, r.height * 0.4);
    this.lineTo(r.width * 0.625, r.height * 0.4);
    this.lineTo(r.width * 0.5, r.top);
    this.closePath();
    if (!clip) {
        this.fill();
        this.stroke();
    } else {
        this.clip();
    }
};
/**
 * Draw a trapezoid
 * @param   {Rect}      r       the rectangle that contain the trapezoid
 * @param   {Component}     comp    the component that contain all properties of the trapezoid
 * @param   {Boolean}       clip    clip the trapezoid or not
 */
CanvasRenderingContext2D.prototype.drawTrapezoid = function (r, comp, clip) {
    !comp.borderDash && (comp.borderDash = CANVAS.STROKEDASHS.SOLID);
    this.useNativeDash && comp.borderDash && this.setDash(comp.borderDash);
    this.beginPath();
    this.moveTo(r.width * 0.2, r.top);
    this.lineTo(r.top, r.height);
    this.lineTo(r.width, r.height);
    this.lineTo(r.width * 0.8, r.top);
    this.lineTo(r.width * 0.3, r.top);
    this.closePath();
    if (!clip) {
        this.fill();
        this.stroke();
    } else {
        this.clip();
    }
};
/**
 * Draw a parallelogram
 * @param   {Rect}      r       the rectangle that contain the parallelogram
 * @param   {Component}     comp    the component that contain all properties of the parallelogram
 * @param   {Boolean}       clip    clip the parallelogram or not
 */
CanvasRenderingContext2D.prototype.drawParallelogram = function (r, comp, clip) {
    !comp.borderDash && (comp.borderDash = CANVAS.STROKEDASHS.SOLID);
    this.useNativeDash && comp.borderDash && this.setDash(comp.borderDash);
    this.beginPath();
    this.moveTo(r.width * 0.3, r.top);
    this.lineTo(r.left, r.height);
    this.lineTo(r.width * 0.7, r.height);
    this.lineTo(r.width, r.top);
    this.lineTo(r.width * 0.3, r.top);
    this.closePath();
    if (!clip) {
        this.fill();
        this.stroke();
    } else {
        this.clip();
    }
};
/**
 * Draw a ninja star
 * @param   {Rect}      r       the rectangle that contain the ninja star
 * @param   {Component}     comp    the component that contain all properties of the ninja star
 * @param   {Boolean}       clip    clip the ninja star or not
 */
CanvasRenderingContext2D.prototype.drawNinjaStar = function (r, comp, clip) {
    !comp.borderDash && (comp.borderDash = CANVAS.STROKEDASHS.SOLID);
    this.useNativeDash && comp.borderDash && this.setDash(comp.borderDash);
    this.beginPath();
    this.moveTo(r.width * 0.5, r.top);
    this.lineTo(r.width * 0.35, r.height * 0.35);
    this.lineTo(r.left, r.height * 0.5);
    this.lineTo(r.width * 0.35, r.height * 0.65);
    this.lineTo(r.width * 0.5, r.height);
    this.lineTo(r.width * 0.65, r.height * 0.65);
    this.lineTo(r.width, r.height * 0.5);
    this.lineTo(r.width * 0.65, r.height * 0.35);
    this.lineTo(r.width * 0.5, r.top);
    this.closePath();
    if (!clip) {
        this.fill();
        this.stroke();
    } else {
        this.clip();
    }
};
/**
 * Draw a regular polygon
 * @param   {Rect}          r       the rectangle that contain the polygon
 * @param   {Component}     comp    the component that contain all properties of the polygon
 * @param   {Boolean}       clip    clip the polygon or not
 */
CanvasRenderingContext2D.prototype.drawRegularPolygon = function (r, comp, clip) {
    !comp.borderDash && (comp.borderDash = CANVAS.STROKEDASHS.SOLID);
    this.useNativeDash && comp.borderDash && this.setDash(comp.borderDash);
    const w2 = r.width / 2;
    const h2 = r.height / 2;
    const size = (comp.width > comp.height ? comp.height : comp.width) / 2;
    this.beginPath();
    this.moveTo(w2 + size * Math.cos(0), h2 + size * Math.sin(0));
    for (let i = 1; i <= comp.numberOfSides; i++) {
        this.lineTo(w2 + size * Math.cos(i * 2 * Math.PI / comp.numberOfSides), h2 + size * Math.sin(i * 2 * Math.PI / comp.numberOfSides));
    }
    if (!clip) {
        this.fill();
        this.stroke();
    } else {
        this.clip();
    }
};
/**
 * Draw a spark graph
 * @param   {Array}     data        the data to draw
 */
CanvasRenderingContext2D.prototype.drawSpark = function (data) {
    //#region Variables déclaration
    const SPARKTYPES = CANVAS.SPARKTYPES;
    //#endregion Variables déclaration
    if (data && data.values.length > 0) {
        let type = data.type;
        !type && (type = SPARKTYPES.LINE);
        this.save();
        this.translate(0.5, 0.5);
        switch (type) {
            case SPARKTYPES.LINE:
                this.drawSparkLine(data);
                break;
            case SPARKTYPES.BAR:
                this.translate(-0.5, -0.5);
                this.drawSparkBar(data);
                break;
            case SPARKTYPES.PIE:
                this.drawSparkPie(data);
                break;
            case SPARKTYPES.BOXPLOT:
                this.drawSparkBoxPlot(data);
                break;
        }
        this.restore();
    }
};
/**
 * Draw a spark line graph
 * @param   {Array}     data        the data to draw
 */
CanvasRenderingContext2D.prototype.drawSparkLine = function (data) {
    //#region Variables déclaration
    let color = data.color;
    let minColor = data.minColor;
    let maxColor = data.maxColor;
    const filledColor = data.filledColor;
    let height = this.canvas.height;
    const width = this.canvas.width;
    let i = 0;
    const xValues = [];
    const yValues = [];
    let path = [];
    //#endregion Variables déclaration
    !color && (color = 'black');
    !minColor && (minColor = 'black');
    !maxColor && (maxColor = 'black');
    let l = data.values.length;
    for (; i < l; i++) {
        xValues.push(i);
        yValues.push(int(data.values[i]));
    }
    const maxY = Math.max.apply(Math, yValues);
    const minY = Math.min.apply(Math, yValues);
    const maxX = Math.max.apply(Math, xValues);
    const minX = Math.min.apply(Math, xValues);
    const rangeX = maxX - minX === 0 ? 1 : maxX - minX;
    const rangeY = maxY - minY === 0 ? 1 : maxY - minY;
    height -= 3;
    for (i = 0; i < l; i++) {
        const x = xValues[i];
        let y = yValues[i];
        const xPos = 2 + Math.round((x - minX) * (width / rangeX));
        y = Math.max(Math.min(y, maxY), minY);
        path.length === 0 && (path = [...path, { x: xPos, y: height + 2 }]);
        path = [...path, { x: xPos, y: 2 + Math.round(height - (height * ((y - minY) / rangeY))) }];
    }
    path.length > 2 && (path[0] = { x: path[0].x, y: path[1].y });
    l = path.length;
    if (filledColor) {
        this.fillStyle = filledColor;
        this.beginPath();
        this.moveTo(path[path.length - 1].x, path[path.length - 1].y);
        this.lineTo(path[path.length - 1].x, height + 2);
        this.lineTo(0, height + 2);
        this.lineTo(0, path[0].y);
        for (i = 0; i < l; i++) {
            this.lineTo(path[i].x, path[i].y);
        }
        this.fill();
    }
    this.strokeStyle = color;
    this.beginPath();
    this.moveTo(path[0].x, path[0].y);
    for (i = 1; i < l; i++) {
        this.lineTo(path[i].x, path[i].y);
    }
    this.stroke();
};
/**
 * Draw a spark bar graph
 * @param   {Array}     data        the data to draw
 */
CanvasRenderingContext2D.prototype.drawSparkBar = function (data) {
    //#region Variables déclaration
    const height = this.canvas.height;
    const width = this.canvas.width;
    const l = data.values.length;
    const max = Math.max.apply(Math, data.values);
    const min = Math.min.apply(Math, data.values);
    let yOrg = null;
    const barWidth = int((width - l) / l);
    const minColor = data.minColor;
    const maxColor = data.maxColor;
    const offset = int((width - (barWidth * l) - (l - 1)) / 2);
    const rangeHeight = height / (max - min);
    //#endregion Variables déclaration
    yOrg = min < 0 ? int(max * rangeHeight) : height;
    let i = 0;
    let x = 0;
    this.translate(offset, 0);
    for (; i < l; i++) {
        this.fillStyle = data.values[i] >= 0 ? maxColor : minColor;
        y = int(data.values[i] * rangeHeight);
        yOrg < height
            ? data.values[i] < 0
                ? this.fillRect(x, yOrg, barWidth, Math.abs(y))
                : this.fillRect(x, yOrg - y, barWidth, y)
            : this.fillRect(x, height - y, barWidth, y);
        x += barWidth + 1;
    }
};
/**
 * Draw a spark pie graph
 * @param   {Array}     data        the data to draw
 */
CanvasRenderingContext2D.prototype.drawSparkPie = function (data) {
    //#region Variables déclaration
    const height = this.canvas.height;
    const width = this.canvas.width;
    const l = data.values.length;
    const circle = 2 * Math.PI;
    const radius = Math.floor(Math.min(width, height - 1) / 2);
    let total = 0;
    const colors = data.colors.split(',');
    let i = 0;
    //#endregion Variables déclaration
    for (; i < l; i++) {
        total += data.values[i];
    }
    this.translate(int((width - radius) / 2), 0);
    for (i = l; i--;) {
        let next = 0;
        if (data.values[i] !== 0) {
            for (x = 0; x < l; x++) {
                let start = next;
                let end = next;
                total > 0 && (end = next + (circle * (data.values[x] / total)));
                if (x === i) {
                    this.fillStyle = colors[x % colors.length];
                    this.beginPath();
                    this.moveTo(radius, radius);
                    this.arc(radius, radius, radius, start, end, !1);
                    this.lineTo(radius, radius);
                    this.closePath();
                    this.fill();
                }
                next = end;
            }
        }
    }
};
/**
 * Draw a spark box plot graph
 * @param   {Array}     data        the data to draw
 */
CanvasRenderingContext2D.prototype.drawSparkBoxPlot = function (data) {
    //#region Variables déclaration
    const height = this.canvas.height;
    let width = this.canvas.width;
    let l = 0;
    let lOutlier = 0;
    let lWhisker = 0;
    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let rWhisker = 0;
    let rOutlier = 0;
    let iqr = 0;
    let left = 0;
    let unitSize = 0;
    let size = 0;
    const minValue = !data.chartRangeMin ? Math.min.apply(Math, data.values) : data.chartRangeMin;
    const maxValue = !data.chartRangeMax ? Math.max.apply(Math, data.values) : data.chartRangeMax;
    const quartile = (values, q) => {
        let vl;
        if (q === 2) {
            vl = Math.floor(values.length / 2);
            return values.length % 2 ? values[vl] : (values[vl - 1] + values[vl]) / 2;
        } else {
            if (values.length % 2) { // odd
                vl = (values.length * q + q) / 4;
                return vl % 1 ? (values[Math.floor(vl)] + values[Math.floor(vl) - 1]) / 2 : values[vl - 1];
            } else { //even
                vl = (values.length * q + 2) / 4;
                return vl % 1 ? (values[Math.floor(vl)] + values[Math.floor(vl) - 1]) / 2 : values[vl - 1];
            }
        }
    };
    //#endregion Variables déclaration
    !data.boxLineColor && (data.boxLineColor = '#000');
    !data.boxFillColor && (data.boxFillColor = '#C0D0F0');
    !data.whiskerColor && (data.whiskerColor = '#000');
    !data.outlierLineColor && (data.outlierLineColor = '#303030');
    !data.outlierFillColor && (data.outlierFillColor = '#F0F0F0');
    !data.medianColor && (data.medianColor = 'red');
    !data.targetColor && (data.targetColor = '#40A020');
    !data.spotRadius && (data.spotRadius = 1.5);
    !data.outlierIQR && (data.outlierIQR = 1.5);
    !data.raw && (data.raw = !1);
    !data.showOutliers && (data.showOutliers = !1);
    //l = data.values.length;
    if (data.raw) {
        if (data.showOutliers && data.values.length > 5) {
            lOutlier = data.values[0];
            lWhisker = data.values[1];
            q1 = data.values[2];
            q2 = data.values[3];
            q3 = data.values[4];
            rWhisker = data.values[5];
            rOutlier = data.values[6];
        } else {
            lWhisker = data.values[0];
            q1 = data.values[1];
            q2 = data.values[2];
            q3 = data.values[3];
            rWhisker = data.values[4];
        }
    } else {
        data.values.sort((a, b) => { return a - b; });
        q1 = quartile(data.values, 1);
        q2 = quartile(data.values, 2);
        q3 = quartile(data.values, 3);
        iqr = q3 - q1;
        if (data.showOutliers) {
            lWhisker = rWhisker = null;
            data.values.forEach(val => {
                !lWhisker && val > q1 - (iqr * data.outlierIQR) && (lWhisker = val);
                val < q3 + (iqr * data.outlierIQR) && (rWhisker = val);
            });
            lOutlier = data.values[0];
            rOutlier = data.values[l - 1];
        } else {
            lWhisker = data.values[0];
            rWhisker = data.values[l - 1];
        }
    }
    unitSize = width / (maxValue - minValue + 1);
    if (data.showOutliers) {
        left = Math.ceil(data.spotRadius);
        width -= 2 * Math.ceil(data.spotRadius);
        unitSize = width / (maxValue - minValue + 1);
        if (lOutlier < lWhisker) {
            this.strokeStyle = data.outlierLineColor;
            this.fillStyle = data.outlierFillColor;
            this.beginPath();
            this.arc((lOutlier - minValue) * unitSize + left, height / 2, data.spotRadius, 0, Math.PI * 2, !0);
            this.fill();
            this.stroke();
        }
        if (rOutlier > rWhisker) {
            this.strokeStyle = data.outlierLineColor;
            this.fillStyle = data.outlierFillColor;
            this.beginPath();
            this.arc((rOutlier - minValue) * unitSize + left, height / 2, data.spotRadius, 0, Math.PI * 2, !0);
            this.fill();
            this.stroke();
        }
    }

    // box
    this.strokeStyle = data.boxLineColor;
    this.fillStyle = data.boxFillColor;
    this.fillRect(Math.round((q1 - minValue) * unitSize + left), Math.round(height * 0.1), Math.round((q3 - q1) * unitSize), Math.round(height * 0.8));
    this.strokeRect(Math.round((q1 - minValue) * unitSize + left), Math.round(height * 0.1), Math.round((q3 - q1) * unitSize), Math.round(height * 0.8));
    // left whisker
    this.strokeStyle = data.lineColor;
    this.beginPath();
    this.moveTo(int((lWhisker - minValue) * unitSize + left), int(height / 2));
    this.lineTo(int((q1 - minValue) * unitSize + left), int(height / 2));
    this.stroke();
    this.strokeStyle = data.whiskerColor;
    this.beginPath();
    this.moveTo(int((lWhisker - minValue) * unitSize + left), int(height / 4));
    this.lineTo(int((lWhisker - minValue) * unitSize + left), int(height - height / 4));
    this.stroke();
    // right whisker
    this.strokeStyle = data.lineColor;
    this.beginPath();
    this.moveTo(int((rWhisker - minValue) * unitSize + left), int(height / 2));
    this.lineTo(int((q3 - minValue) * unitSize + left), int(height / 2));
    this.stroke();
    this.strokeStyle = data.whiskerColor;
    this.beginPath();
    this.moveTo(int((rWhisker - minValue) * unitSize + left), int(height / 4));
    this.lineTo(int((rWhisker - minValue) * unitSize + left), int(height - height / 4));
    this.stroke();
    // median line
    this.strokeStyle = data.medianColor;
    this.beginPath();
    this.moveTo(int((q2 - minValue) * unitSize + left), int(height * 0.1));
    this.lineTo(int((q2 - minValue) * unitSize + left), int(height * 0.9));
    this.stroke();
    if (data.target) {
        size = Math.ceil(data.spotRadius);
        this.strokeStyle = data.targetColor;
        this.beginPath();
        this.moveTo(int((data.target - minValue) * unitSize + left), int((height / 2) - size));
        this.lineTo(int((data.target - minValue) * unitSize + left), int((height / 2) + size));
        this.stroke();
        this.strokeStyle = data.targetColor;
        this.beginPath();
        this.moveTo(int((data.target - minValue) * unitSize + left - size), int(height / 2));
        this.lineTo(int((data.target - minValue) * unitSize + left + size), int(height / 2));
        this.stroke();
    }
};
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 */
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, bordersColor) {
    //#region Variables déclaration
    const r = x + width;
    const b = y + height;
    //#endregion Variables déclaration
    radius = radius || 5;
    if (typeof radius === 'number') {
        radius > int(height / 2) && (radius = int(height / 2));
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (let side in defaultRadius) {
            defaultRadius.hasOwnProperty(side) && (radius[side] = radius[side] || defaultRadius[side]);
        }
    }
    if (bordersColor) {
        this.save();
        radius.tl + radius.tr + radius.br + radius.bl !== 0 && this.translate(0.5, 0.5);
        core.tools.isString(bordersColor)
            && (bordersColor = { left: bordersColor, top: bordersColor, right: bordersColor, bottom: bordersColor });
    }
    if (radius.tl + radius.tr + radius.bl + radius.br <= 0) {
        bordersColor
            ? this.rectWithBordersColor(x, y, width, height, bordersColor)
            : this.rect(x, y, width, height);
    } else {
        this.beginPath();
        this.moveTo(x + radius.tl - 0.5, y);
        this.lineTo(r - radius.tr, y);
        this.quadraticCurveTo(r, y, r, y + radius.tr);
        if (bordersColor) {
            this.strokeStyle = bordersColor.top;
            this.stroke();
            this.beginPath();
            this.moveTo(r, y + radius.tr);
        }
        this.lineTo(r, b - radius.br + 0.5);
        if (bordersColor) {
            this.strokeStyle = bordersColor.right;
            this.stroke();
            this.beginPath();
            this.moveTo(r, b - radius.br + 0.5);
        }
        this.quadraticCurveTo(r, b, r - radius.br, b);
        this.lineTo(x + radius.bl - 0.5, b);
        this.quadraticCurveTo(x, b, x, b - radius.bl - 0.5);
        if (bordersColor) {
            this.strokeStyle = bordersColor.bottom;
            this.stroke();
            this.beginPath();
            this.moveTo(x, b - radius.bl + 0.5);
        }
        this.lineTo(x, y + radius.tl);
        if (bordersColor) {
            this.strokeStyle = bordersColor.left;
            this.stroke();
            this.beginPath();
            this.moveTo(x, y + radius.tl);
        }
        this.quadraticCurveTo(x, y, x + radius.tl, y);
        if (bordersColor) {
            this.strokeStyle = bordersColor.top;
            this.stroke();
        } else {
            this.stroke();
        }
    }
    bordersColor && this.restore();
};
/**
 * Clip the canvas to a rectangle
 * @param   {Numver}     x    the component rect to be clipped
 * @param   {Numver}     y    the component rect to be clipped
 * @param   {Numver}     w    the component rect to be clipped
 * @param   {Numver}     h    the component rect to be clipped
 */
CanvasRenderingContext2D.prototype.clipRect = function (x, y, w, h) {
    this.beginPath();
    this.rect(x, y, w, h);
    this.clip();
};
/**
 * Save the old measureText
 */
CanvasRenderingContext2D.prototype._measureText = CanvasRenderingContext2D.prototype.measureText;
/*
 * Get the text metrics
 * @param   {String}    text    the text to get metrics
 */
CanvasRenderingContext2D.prototype.measureText = function (text) {
    //#region Variables déclaration
    const metrics = this._measureText(text);
    let block;
    const isInDoc = document.querySelector('.textSizer');
    const textSpan = isInDoc ? isInDoc : document.createElement('span');
    //#endregion Variables déclaration
    textSpan.innerHTML = text;
    textSpan.style.font = this.font;
    textSpan.className = 'textSizer';

    if (!isInDoc) {
        block = document.createElement('div');
        block.style.display = 'inline-block';
        block.style.width = '1px';
        block.style.height = '0px';

        const div = document.createElement('div');
        div.style.visibility = 'hidden';
        div.appendChild(textSpan);
        div.appendChild(block);
        const body = document.body;
        body.appendChild(div);
    } else {
        block = textSpan.nextSibling;
    }

    let ascent = -1;
    let descent = -1;
    let height = -1;

    block.style['vertical-align'] = 'baseline';
    ascent = block.offsetTop - textSpan.offsetTop;
    block.style['vertical-align'] = 'bottom';
    height = block.offsetTop - textSpan.offsetTop;
    descent = height - ascent;

    const newMetrics = {};

    // TODO This doesn't account for locale, and is guaranteed broken for those that read right-to-left
    switch (this.textAlign) {
        case 'start':
        case 'left':
            newMetrics._actualBoundingBoxLeft = 0;
            newMetrics._actualBoundingBoxRight = metrics.width;
            break;

        case 'end':
        case 'right':
            newMetrics._actualBoundingBoxLeft = -metrics.width;
            newMetrics._actualBoundingBoxRight = 0;
            break;

        case 'center':
            // TODO This is probably just an approximation.
            newMetrics._actualBoundingBoxLeft = -metrics.width / 2.0;
            newMetrics._actualBoundingBoxRight = metrics.width / 2.0;
            break;
    }
    newMetrics._actualBoundingBoxAscent = ascent;
    newMetrics._actualBoundingBoxDescent = descent;
    newMetrics.height = height;

    // Copy the new metrics over, if and only if the CanvasRenderingContext2D API doesn't provide them
    for (let key in newMetrics) {
        newMetrics.hasOwnProperty(key) && !(key in metrics) && (metrics[key] = newMetrics[key]);
    }

    return metrics;
};

CanvasRenderingContext2D.prototype.wavy = function (from, to, frequency, amplitude, step, negative) {
    //#region Variables déclaration
    const fx = from.x;
    const fy = from.y;
    const tx = to.x;
    const ty = to.y;
    let i = 0;
    const ang = Math.atan2(ty - fy, tx - fx);
    const distance = Math.sqrt((fx - tx) * (fx - tx) + (fy - ty) * (fy - ty));
    const a = amplitude * (!negative ? 1 : -1);
    const f = Math.PI * frequency;
    //#endregion Variables déclaration
    for (; i <= distance; i += step) {
        const waveOffsetLength = Math.sin((i / distance) * f) * a;
        const cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI / 2) * waveOffsetLength;
        const cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI / 2) * waveOffsetLength;
        i > 0 ? this.lineTo(cx, cy) : this.moveTo(cx, cy);
    }
}

CanvasRenderingContext2D.prototype.rectWithBordersColor = function (x, y, width, height, bordersColor) {
    core.tools.isString(bordersColor)
        && (bordersColor = { left: bordersColor, top: bordersColor, right: bordersColor, bottom: bordersColor });
    this.beginPath();
    this.moveTo(x, y + 0.5);
    this.lineTo(x + width, y + 0.5);
    this.strokeStyle = bordersColor.top;
    this.stroke();
    this.beginPath();
    this.moveTo(x + width - 0.5, y);
    this.lineTo(x + width - 0.5, y + height);
    this.strokeStyle = bordersColor.right;
    this.stroke();
    this.beginPath();
    this.moveTo(x + width, y + height - 0.5);
    this.lineTo(x, y + height - 0.5);
    this.strokeStyle = bordersColor.bottom;
    this.stroke();
    this.beginPath();
    this.moveTo(x + 0.5, y + height);
    this.lineTo(x + 0.5, y);
    this.strokeStyle = bordersColor.left;
    this.stroke();
}

CanvasRenderingContext2D.prototype.clipRegion = function (clippingData, left, top, width, height) {
    //#region Variables déclaration
    const clip = [clippingData.left, clippingData.top];
    //#endregion Variables déclaration
    this.save();
    clippingData.hasOwnProperty('right') ? clip.push(width - left - clippingData.right) : clip.push(clippingData.width);
    clippingData.hasOwnProperty('bottom') ? clip.push(height - top - clippingData.bottom) : clip.push(clippingData.height);
    this.beginPath();
    this[clippingData.shape] && this[clippingData.shape](...clip);
    this.clip();
}

/**
 * Create a new canvas element
 * @return  {CanvasElement}     the new canvas element
 */
export function newCanvas() {
    return document.createElement('canvas');
}

//#endregion

/*
var canvas = document.getElementById("canV");
var ctx = canvas.getContext("2d");

// copies an image adding the 2d context
function copyImage(img){
    var image = document.createElement("canvas");
    image.width = img.width;
    image.height = img.height;
    image.ctx = image.getContext("2d");
    image.ctx.drawImage(img,0,0);
    return image;
}

// creates a blank image with 2d context
var createImage = function(w,h){
    var image = document.createElement("canvas");
    image.width = w;
    image.height =h;
    image.ctx = image.getContext("2d");
    return image;
}

// load an image from URL. Create a editable copy and then
// call the function ready
var loadImage = function(url,ready){
    function onload(){
        this.removeEventListener("load",onload);
        image = copyImage(this);
        ready(image);
    }
    var image = new Image();
    image.src = url;
    image.addEventListener("load",onload);
}


function innerShadow(image,shadowCol,offX,offY,blur){
    var mx, my, img1;
    // create a mask image, with pixel alpha the invers of original
    // Needs to be bigger so that the shadow is consistant at edges
    img1 = createImage(image.width+Math.abs(offX)+blur,image.height+Math.abs(offY)+blur);
    // set the shadow colur to requiered but only for alising the edge
    img1.ctx.fillStyle = shadowCol;
    img1.ctx.fillRect(0,0,img1.width,img1.height);  // fill the mask
    img1.ctx.globalCompositeOperation = "destination-out";  // remove dest pixels
    mx = img1.width/2- image.width/2;  // recalculate offsets
    my = img1.height/2- image.height/2;
   // draw it 3 times to remove the slight alpha edge bleading
    img1.ctx.drawImage(image,mx,my);  // cut out the images shape from mask
    img1.ctx.drawImage(image,mx,my);  // cut out the images shape from mask
    img1.ctx.drawImage(image,mx,my);  // cut out the images shape from mask

    // set up shadow settings
    image.ctx.shadowColor = shadowCol;
    image.ctx.shadowOffsetX = offX;
    image.ctx.shadowOffsetY = offY;
    image.ctx.shadowBlur = blur;
    // draw the mask with the shadow on original image
    image.ctx.globalCompositeOperation = "source-atop"; // only visible pixels
    image.ctx.drawImage(img1,-mx,-my);  // draw the shadow
}


// clear the canvas
ctx.clearRect(0,0,canvas.width,canvas.height)
// load and add shadow.
var imageWithInnerShadow;
var shadowOffX = 10;
var shadowOffY = 10;
var shadowBlur = 10;
var shadowCol = "Black";
// load the image
loadImage("http://i.stack.imgur.com/Jafta.png",function(img){
    // add the shadow
    innerShadow(img,shadowCol,shadowOffX,shadowOffY,shadowBlur);
    ctx.drawImage(img,20,20); // show that it worked
    imageWithInnerShadow = img; // hold the image for use
})
*/

/*
Draw + FloodFill
var ClickMode = {
    Paint: 0,
    Fill: 1
};
var mouseDown = false;
var currentMode = ClickMode.Paint;
var ctx = $('#canvas').get(0).getContext('2d');
ctx.lineWidth = 3;
var lastPoint = {x: 0, y: 0};

$('#canvas').mousedown(function(event){
    if (currentMode == ClickMode.Paint)
    {
        mouseDown = true;
        lastPoint.x = event.offsetX;
        lastPoint.y = event.offsetY;
    }
    else
        floodFill(event.offsetX, event.offsetY, 255, 1);
    return false;
}).mousemove(function(event){
    if (mouseDown)
    {
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        
        lastPoint.x = event.offsetX;
        lastPoint.y = event.offsetY;
    }
}).mouseup(function(){
    mouseDown = false;
    return false
});

$('a').click(function(){
    var mode = $(this).attr('href').slice(1);
    switch(mode)
    {
        case "fill":
            currentMode = ClickMode.Fill;
            break;
       case "clear":
            ctx.clearRect(0, 0, 300, 300);
       case "paint":
            currentMode = ClickMode.Paint;
            break;
    }
    return false;
});
function floodFill(x, y, color, borderColor){
    var imageData = ctx.getImageData(0, 0, 300, 300);
    var width = imageData.width;
    var height = imageData.height;
    var stack = [[x, y]];
    var pixel;
    var point = 0;
    while (stack.length > 0)
    {   
        pixel = stack.pop();
        if (pixel[0] < 0 || pixel[0] >= width)
            continue;
        if (pixel[1] < 0 || pixel[1] >= height)
            continue;
        
        // Alpha
        point = pixel[1] * 4 * width + pixel[0] * 4 + 3;
        
        // Если это не рамка и ещё не закрасили
        if (imageData.data[point] != borderColor && imageData.data[point] != color)
        {
            // Закрашиваем
            imageData.data[point] = color;
            
            // Ставим соседей в стек на проверку
            stack.push([
                pixel[0] - 1,
                pixel[1]
            ]);
            stack.push([
                pixel[0] + 1,
                pixel[1]
            ]);
            stack.push([
                pixel[0],
                pixel[1] - 1
            ]);
            stack.push([
                pixel[0],
                pixel[1] + 1
            ]);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}
 * 
 **/
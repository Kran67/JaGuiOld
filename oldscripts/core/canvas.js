﻿define(['require', 'types'], function (require, Types)
{
    //#region Types.CANVAS
    Types.CANVAS = {
        CURVEKAPPA: 0.2761423749153967,CURVEKAPPAINV: 0.7238576250846033,CURVE2KAPPA: 0.5522847498307934,CURVE2KAPPAINV: 1 - 0.5522847498307934,
        LINECAPS: { BUTT: "butt",ROUND: "round",SQUARE: "square" },
        LINEJOINS: { MITER: "miter",ROUND: "round",BEVEL: "bevel" },
        GLOBALCOMPOSITEOPERATIONS: {
            SOURCEOVER: "source-over",SOURCEIN: "source-in",SOURCEOUT: "source-out",SOURCEATOP: "source-atop",DESTINATIONOVER: "destination-over",
            DESTINATIONIN: "destination-in",DESTINATIONOUT: "destination-out",DESTINATIONATOP: "destination-atop",LIGHTER: "lighter",COPY: "copy",XOR: "xor",
            MULTIPLY: "multiply",SCREEN: "screen",OVERLAY: "overlay",DARKEN: "darken",LIGHTEN: "lighten",COLORDODGE: "color-dodge",COLORBURN: "color-burn",
            HARDLIGHT: "hard-light",SOFTLIGHT: "soft-light",DIFFERENCE: "difference",EXCLUSION: "exclusion",HUE: "hue",SATURATION: "saturation",COLOR: "color",
            LUMINOSITY: "luminosity"
        },
        PATHOPERATIONS: { MOVE: 0x234,LINE: 0x235 },
        SPARKTYPES: { LINE: "line",BAR: "bar",PIE: "pie",BOXPLOT: "boxPlot" },
        PATTERNREPEATS: { REPEAT: "repeat",REPEATX: "repeat-x",REPEATY: "repeat-y",NOREPEAT: "no-repeat" },
        LINEPOSITIONS: { LEFTTORIGHT: 0x239,RIGHTTOLEFT: 0x23A,NEAR: 0x23B,MIDDLE: 0x23C,FAR: 0x23D },
        STROKEDASHS: { SOLID: [],SHORTDASH: [4,1],SHORTDOT: [1,1],SHORTDASHDOT: [4,1,1,1],SHORTDASHDOTDOT: [4,1,1,1,1,1],DOT: [1,3],DASH: [4,3],LONGDASH: [8,3],DASHDOT: [4,3,1,3],LONGDASHDOT: [8,3,1,3],LONGDASHDOTDOT: [8,3,1,3,1,3] },
        COMPOSITEOPERATORS: { OVER: "source-over",IN: "source-in",OUT: "source-out",ATOP: "source-atop",XOR: "xor",ARITHMETIC: "arithmetic" },
        EDGEMODES: { DUPLICATE: "duplicate",WRAP: "wrap",NONE: "none" },
        COLORMATRIXTYPES: { MATRIX: "matrix",SATURATE: "saturate",HUEROTATE: "hueRotate",LUMINANCETOALPHA: "luminanceToAlpha" },
        COMPONENTTRANSFERTYPES: { IDENTITY: "identity",TABLE: "table",DISCRETE: "discrete",LINEAR: "linear",GAMMA: "gamma" },
        MORPHOLOGYOPERATORS: { ERODE: "erode",DILATE: "dilate" },
        CONVOLVEMATRIXEDGEMODES: { DUPLICATE: "duplicate",WRAP: "wrap",NONE: "none" },
        CHANNELSELECTORTYPES: { A: "A",R: "R",G: "G",B: "B" },
        TURBULENCETYPES: { TRANSLATE: "translate",SCALE: "scale",ROTATE: "rotate",SKEWX: "skewX",SKEWY: "skewY" },
        TURBULENCESTITCHTILES: { NOSTITCH: "noStitch",STITCH: "stitch" },
        LIGTHTYPES: { POINT: "point",SPOT: "spot",DISTANT: "distant" }
    };
    Object.freeze(Types.CANVAS);
    //#endregion
    //#region Extended CanvasRenderingContext2D
    CanvasRenderingContext2D.prototype._fill = CanvasRenderingContext2D.prototype.fill;
    CanvasRenderingContext2D.prototype.fill = function() {
        this._fill();
    };
    CanvasRenderingContext2D.prototype.borderWidth = 1;
    CanvasRenderingContext2D.prototype.setDash = function(dashArray) {
        var dashses = [];
        for(var i = 0,l = dashArray.length;i < l;i++) {
            dashses.push(dashArray[i] * this.borderWidth);
        }
        if (typeof this[this.useNativeDash] === Types.CONSTANTS.FUNCTION) this[this.useNativeDash](dashses);
        else this[this.useNativeDash] = dashses;
    };
    CanvasRenderingContext2D.prototype.resize = function(newWidth,newHeight) {
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        this.canvas.style.width = newWidth + Types.CSSUNITS.PX;
        this.canvas.style.height = newHeight + Types.CSSUNITS.PX;
    };
    CanvasRenderingContext2D.prototype.clear = function() {
        this.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.clearShadow();
    };
    CanvasRenderingContext2D.prototype.clearShadow = function () {
        var Colors = require("colors");
        this.shadowBlur = 0;
        this.shadowOffsetX = 0;
        this.shadowOffsetY = 0;
        this.shadowColor = Colors.TRANSPARENT.toARGBString();
    };
    CanvasRenderingContext2D.prototype.drawPath = function (comp, path, clip) {
        var Geometry = require("geometry");
        var Classes = require("classes");
        var Canvas = require("canvas");
        var b, i, w, h, cp1, cp2, cp, sp = new Geometry.Point(), pathData, result, lastX, lastY, pts = [], points = [];
        if(!(path instanceof Classes.PathData)) return;
        if(!comp.borderDash) comp.borderDash = Canvas.STROKEDASHS.SOLID;
        if(this.useNativeDash && comp.borderDash) this.setDash(comp.borderDash);
        if(!path.isEmpty()) {
            b = path.bounds();
            w = b.width();
            h = b.height();
            if(w * h === 0) return;
            i = 0;
            pathData = path.data;
            this.beginPath();
            var l = pathData.length;
            while(i < l) {
                if(pathData[i].kind === Core.types.pathPointKinds.MOVETO) {
                    cp = pathData[i].point;
                    this.moveTo(cp.x,cp.y);
                    sp.assign(cp);
                } else if(pathData[i].kind === Core.types.pathPointKinds.LINETO) {
                    cp = pathData[i].point;
                    this.lineTo(cp.x,cp.y);
                } else if(pathData[i].kind === Core.types.pathPointKinds.CURVETO) {
                    cp1 = pathData[i].point;
                    i++;
                    cp2 = pathData[i].point;
                    i++;
                    this.bezierCurveTo(cp1.x,cp1.y,cp2.x,cp2.y,pathData[i].point.x,pathData[i].point.y);
                    cp = pathData[i].point;
                } else if(pathData[i].kind === Core.types.pathPointKinds.CLOSE) this.closePath();
                i++;
            }
            if(!clip) {
                this.fill();
                if(!this.useNativeDash && comp.borderDash.length > 0) {
                    this.beginPath();
                    i = 0;
                    while(i < l) {
                        if(pathData[i].kind === Core.types.pathPointKinds.MOVETO) {
                            cp = pathData[i].point;
                            sp.assign(cp);
                            lastX = cp.x;
                            lastY = cp.y;
                        } else if(pathData[i].kind === Core.types.pathPointKinds.LINETO) {
                            cp = pathData[i].point;
                            result = this.dashedLineTo(comp.borderDash,lastX,lastY,cp.x,cp.y,result);
                            lastX = cp.x;
                            lastY = cp.y;
                        } else if(pathData[i].kind === Core.types.pathPointKinds.CURVETO) {
                            cp1 = pathData[i].point;
                            i++;
                            cp2 = pathData[i].point;
                            i++;
                            pts.length = 0;
                            points.length = 0;
                            pts.push([lastX,lastY]);
                            pts.push([cp1.x,cp1.y,cp2.x,cp2.y,pathData[i].point.x,pathData[i].point.y]);
                            result = this.generateDasdedCurves(pts,points,bw,comp.borderDash,result);
                            this.drawDashedCurve(points);
                            cp = pathData[i].point;
                            lastX = cp.x;
                            lastY = cp.y;
                        } else if(pathData[i].kind === Core.types.pathPointKinds.CLOSE) this.closePath();
                        i++;
                    }
                }
                this.stroke();
            } else this.clip();
        }
    };
    CanvasRenderingContext2D.prototype.drawShape = function(comp,style,rect,clip) {
        var r = comp.localRect, bw = style.borderWidth, tShapes = Types.SHAPES, br = style.bordersRadius ? style.bordersRadius : { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 }, radius;
        var Geometry = require("goemetry");
        if (rect instanceof Geometry.Rect) r.assign(rect);
        /*if (!clip&&!r.empty())*/ r.reduce(1,1);
        switch(comp.shape) {
            case tShapes.RECTANGLE:
            case tShapes.ROUNDRECT:
                if(comp.shape === tShapes.ROUNDRECT) {
                    if(comp.width > comp.height) {
                        radius = ~~(comp.height / 2);
                    } else {
                        radius = ~~(comp.width / 2);
                    }
                    br.topLeft.setValues(radius,radius);
                    br.topRight.setValues(radius,radius);
                    br.bottomLeft.setValues(radius,radius);
                    br.bottomRight.setValues(radius,radius);
                }
                this.drawRect(r,br,comp,clip);
                break;
            case tShapes.ELLIPSE:
            case tShapes.CIRCLE:
                this.drawEllipse(r,comp,clip);
                break;
            case tShapes.CALLOUT:
                this.drawCallout(r,br,comp,clip);
                break;
            case tShapes.PATH:
                this.drawPath(comp,comp.path,clip);
                break;
            case tShapes.LINE:
                this.drawLine(r,comp);
                break;
            case tShapes.STAR:
                this.drawStar(r,comp,clip);
                break;
            case tShapes.TRAPEZOID:
                this.drawTrapezoid(r,comp,clip);
                break;
            case tShapes.PARALLELOGRAM:
                this.drawParallelogram(r,comp,clip);
                break;
            case tShapes.NINJASTAR:
                this.drawNinjaStar(r,comp,clip);
                break;
            case tShapes.REGULARPOLYGON:
                this.drawRegularPolygon(r,comp,clip);
                break;
        }
    };
    //CanvasRenderingContext2D.prototype.myMeasureText=function(text,onlyWidth,font){
    //  var d,H=0;
    //  if (typeof onlyWidth!==_const.BOOLEAN) onlyWidth=true;
    //  if (typeof text!==_const.STRING) return;
    //  if (!(font instanceof Core.classes.Font)) return;
    //  if (!onlyWidth){
    //    d=Core.doc.createElement("div");
    //    d.style.position="absolute";
    //    if (font) font.toCss(d);
    //    d.innerHTML=text;
    //    Core.doc.body.appendChild(d);
    //    H=d.offsetHeight-1;
    //    Core.doc.body.removeChild(d);
    //  }
    //  return { w: this.measureText(text).width,h:H };
    //};
    CanvasRenderingContext2D.prototype.applyStyle = function (object, type, gradientRect) {
        var Colors = require("colors");
        if(object[type].style === Types.BRUSHSTYLES.NONE) this[((type === "background") ? "fill" : "stroke") + "Style"] = Colors.TRANSPARENT.toARGBString();
        else if(object[type].style === Types.BRUSHSTYLES.SOLID) this[((type === "background") ? "fill" : "stroke") + "Style"] = object[type].color.toARGBString();
        else if(object[type].style === Types.BRUSHSTYLES.GRADIENT) this.gradientFromRect(gradientRect,object,type);
        else if(object[type].style === Types.BRUSHSTYLES.BITMAP) {
            if(object[type].bitmap.complete) this[((type === "background") ? "fill" : "stroke") + "Style"] = this.createPattern(object[type].bitmap,object[type].bitmapRepeatMode);
        }
    };
    CanvasRenderingContext2D.prototype.applyBrush = function(brush,gradientRect,radius) {
        var Colors = require("colors");
        if (brush.style === Types.BRUSHSTYLES.NONE) this.fillStyle = Colors.TRANSPARENT.toARGBString();
        else if(brush.style === Types.BRUSHSTYLES.SOLID) this.fillStyle = brush.color.toARGBString();
        else if(brush.style === Types.BRUSHSTYLES.GRADIENT) this.gradientFromRectAndBrush(gradientRect,brush,radius);
        else if(brush.style === Types.BRUSHSTYLES.BITMAP) {
            if(brush.bitmap.complete) this.fillStyle = this.createPattern(brush.bitmap,brush.bitmapRepeatMode);
        }
    };
    CanvasRenderingContext2D.prototype.applyStyleAndDraw = function(styleType,object,rect) {
        var Geometry = require("geometry");
        var Colors = require("colors");
        var back, middle, front, form = null, r = new Geometry.Rect;
        if(object.form) form = object.form;
        else if(object._owner) form = object._owner.form;
        switch(styleType) {
            case Types.STYLES.NONE:
                back = object;
                break;
            case Types.STYLES.NORMAL:
                back = object.getStyle(Types.STYLES.NORMAL,Types.STYLEOBJECTS.BACK);
                if(!object.style.customNormal.back.isEmpty()) back = object.style.customNormal.back;
                middle = object.getStyle(Types.STYLES.NORMAL,Types.STYLEOBJECTS.MIDDLE);
                if(!object.style.customNormal.middle.isEmpty()) middle = object.style.customNormal.middle;
                front = object.getStyle(Types.STYLES.NORMAL,Types.STYLEOBJECTS.FRONT);
                if(!object.style.customNormal.front.isEmpty()) front = object.style.customNormal.front;
                break;
            case Types.STYLES.HOVERED:
                back = object.getStyle(Types.STYLES.HOVERED,Types.STYLEOBJECTS.BACK);
                if(!object.style.customHovered.back.isEmpty()) back = object.style.customHovered.back;
                middle = object.getStyle(Types.STYLES.HOVERED,Types.STYLEOBJECTS.MIDDLE);
                if(!object.style.customHovered.middle.isEmpty()) backmiddle = object.style.customHovered.middle;
                front = object.getStyle(Types.STYLES.HOVERED,Types.STYLEOBJECTS.FRONT);
                if(!object.style.customHovered.front.isEmpty()) front = object.style.customHovered.front;
                break;
            case Types.STYLES.PRESSED:
                back = object.getStyle(Types.STYLES.PRESSED,Types.STYLEOBJECTS.BACK);
                if(!object.style.customPressed.back.isEmpty()) back = object.style.customPressed.back;
                middle = object.getStyle(Types.STYLES.PRESSED,Types.STYLEOBJECTS.MIDDLE);
                if(!object.style.customPressed.middle.isEmpty()) middle = object.style.customPressed.middle;
                front = object.getStyle(Types.STYLES.PRESSED,Types.STYLEOBJECTS.FRONT);
                if(!object.style.customPressed.front.isEmpty()) front = object.style.customPressed.front;
                break;
        }
        r.assign(rect);
        // back
        //if (!back.margins.empty()) {
        //  r.assign(back.margins.marginRect(r));
        //}
        this.applyStyle(back,"background",r);
        if(back.borderWidth > 0) {
            this.applyStyle(back,"border",r);
            this.lineWidth = back.borderWidth;
            this.borderWidth = back.borderWidth;
        } else {
            this.strokeStyle = Colors.TRANSPARENT.toARGBString();
            this.borderWidth = 0;
        }
        this.drawShape(object,back,r);
        //r.assign(rect);
        // middle
        if(middle) {
            if(middle.visible) {
                if(middle.position === "absolute") {
                    if(middle.left > 0 || middle.top > 0 || middle.right > 0 || middle.bottom > 0) {
                        r.left += middle.left;
                        r.top += middle.top;
                        r.right -= middle.right;
                        r.bottom -= middle.bottom;
                    }
                    if(middle.width > 0 || middle.height > 0) {
                        r.right = r.left + middle.width;
                        r.bottom = r.top + middle.height;
                    }
                }
                if(!middle.margin.isEmpty()) {
                    r.assign(middle.margin.marginRect(r));
                }
                if(middle.outline.width > 0 && !middle.outline.color.equals(Colors.TRANSPARENT)) {
                    r.inflate(-middle.outline.width,-middle.outline.width);
                }
                this.applyStyle(middle,"background",r);
                if(middle.borderWidth > 0) {
                    this.applyStyle(middle,"border",r);
                    this.lineWidth = middle.borderWidth;
                    this.borderWidth = middle.borderWidth;
                } else {
                    this.strokeStyle = Colors.TRANSPARENT.toARGBString();
                    this.borderWidth = 0;
                }
                this.drawShape(object,middle,r);
                if(middle.outline.width > 0 && !middle.outline.color.equals(Colors.TRANSPARENT)) {
                    r.inflate(middle.outline.width,middle.outline.width);
                    this.strokeStyle = middle.outline.color.toARGBString();
                    this.borderWidth = middle.outline.width;
                    this.fillStyle = Colors.TRANSPARENT.toARGBString();
                    this.drawShape(object,middle,r);
                }
            }
        }
        //r.assign(rect);
        // front
        if(front) {
            if(front.visible) {
                if(front.position === "absolute") {
                    if(front.left > 0 || front.top > 0 || front.right > 0 || front.bottom > 0) {
                        r.left += front.left;
                        r.top += front.top;
                        r.right -= front.right;
                        r.bottom -= front.bottom;
                    }
                    if(front.width > 0 || front.height > 0) {
                        r.right = r.left + front.width;
                        r.bottom = r.top + front.height;
                    }
                }
                if(!front.margin.isEmpty()) {
                    r.assign(front.margin.marginRect(r));
                }
                if(front.outline.width > 0 && !front.outline.color.equals(Colors.TRANSPARENT)) {
                    r.inflate(-front.outline.width,-front.outline.width);
                }
                this.applyStyle(front,"background",r);
                if(front.borderWidth > 0) {
                    this.applyStyle(front,"border",r);
                    this.lineWidth = front.borderWidth;
                    this.borderWidth = front.borderWidth;
                } else {
                    this.strokeStyle = Colors.TRANSPARENT.toARGBString();
                    this.borderWidth = 0;
                }
                this.drawShape(object,front,r);
                if(front.outline.width > 0 && !front.outline.color.equals(Colors.TRANSPARENT)) {
                    r.inflate(front.outline.width,front.outline.width);
                    this.strokeStyle = front.outline.color.toARGBString();
                    this.borderWidth = front.outline.width;
                    this.fillStyle = Colors.TRANSPARENT.toARGBString();
                    this.drawShape(object,front,r);
                }
            }
        }
        //if (object._isFocused&&form!==null)
        //{
        //  var canvas=Core.tools.newCanvas(),ctx;
        //  canvas.width=rect.width+(form.focusEffect.shadowBlur*2);
        //  canvas.height=rect.height+(form.focusEffect.shadowBlur*2);
        //  ctx=canvas.getContext("2d");
        //  ctx.fillStyle=ctx.strokeStyle=Core.tools.colors.BLACK.toARGBString();
        //  if ((style.background.style!==Types.BRUSHSTYLES.NONE)||(style.borderWidth>0)) {
        //    if (form.focusEffect.borderWidth>0) {
        //      this.lineWidth=form.focusEffect.borderWidth;
        //      this.borderWidth=form.focusEffect.borderWidth;
        //      this.strokeStyle=form.focusEffect.borderColor;
        //    } else if (form.focusEffect.shadowColor!==String.EMPTY) {
        //      ctx.shadowOffsetX=form.focusEffect.shadowOffsetX;
        //      ctx.shadowOffsetY=form.focusEffect.shadowOffsetY;
        //      ctx.shadowBlur=form.focusEffect.shadowBlur;
        //      ctx.shadowColor=form.focusEffect.shadowColor;
        //      ctx.translate(form.focusEffect.shadowBlur,form.focusEffect.shadowBlur);
        //      ctx.drawShape(object,style,rect);
        //      ctx.clearShadow();
        //      ctx.globalCompositeOperation=Types.CANVAS.globalCompositeOperations.DESTINATIONOUT;
        //      ctx.drawShape(object,style,rect);
        //      this.drawImage(canvas,-form.focusEffect.shadowBlur,-form.focusEffect.shadowBlur);
        //    }
        //  }
        //}
    };
    CanvasRenderingContext2D.prototype.gradientFromRectAndBrush = function(rect,brush,radius) {
        var gradient,colorstops,gradientRect;
        if(brush.style !== Types.BRUSHSTYLES.GRADIENT) return;
        gradientRect = rect;
        gradient = null;
        if(brush.gradient.style === Types.GRADIENTSTYLES.LINEAR)
            gradient = this.createLinearGradient(gradientRect.left + brush.gradient.startPosition.x * gradientRect.width,
                                                gradientRect.top + brush.gradient.startPosition.y * gradientRect.height,
                                                gradientRect.left + brush.gradient.stopPosition.x * gradientRect.width,
                                                gradientRect.top + brush.gradient.stopPosition.y * gradientRect.height);
        else gradient = this.createRadialGradient(~~(gradientRect.width / 2),~~(gradientRect.height / 2),0,~~(gradientRect.width / 2),~~(gradientRect.height / 2),radius);
        colorstops = brush.gradient.items;
        for(var i = 0,l = colorstops.length;i < l;i++) gradient.addColorStop(colorstops[i].offset,colorstops[i].color.toARGBString());
        this.fillStyle = gradient;
    };
    CanvasRenderingContext2D.prototype.gradientFromRect = function(rect,object,type) {
        var gradient,colorstops,gradientRect;
        if(object[type].style !== Types.BRUSHSTYLES.GRADIENT) return;
        gradientRect = rect;
        gradient = null;
        if(object[type].gradient.style === Types.GRADIENTSTYLES.LINEAR)
            gradient = this.createLinearGradient(gradientRect.left + object[type].gradient.startPosition.x * gradientRect.width,
                                                gradientRect.top + object[type].gradient.startPosition.y * gradientRect.height,
                                                gradientRect.left + object[type].gradient.stopPosition.x * gradientRect.width,
                                                gradientRect.top + object[type].gradient.stopPosition.y * gradientRect.height);
        else gradient = this.createRadialGradient(gradientRect.left,gradientRect.top,gradientRect.width,gradientRect.height,0,0);
        colorstops = object[type].gradient.items;
        for(var i = 0,l = colorstops.length;i < l;i++) gradient.addColorStop(colorstops[i].offset,colorstops[i].color.toARGBString());
        //this[((type==="background")?"fill":"stroke")+"Style"]=gradient;
        if(type === "background" || type === "brush") type = "fill";
        else type = "stroke";
        this[type + "Style"] = gradient;
    };
    CanvasRenderingContext2D.prototype.beginScanlines = function() { return this.getImageData(0,0,this.canvas.width,this.canvas.height); };
    CanvasRenderingContext2D.prototype.endScanlines = function(datas) { this.putImageData(datas,0,0); };
    CanvasRenderingContext2D.prototype.prepareText = function(object,rect,calcRect) {
        var Text = require("text");
        var font,/*self=this,*/txtHeight, words, txt = String.EMPTY, fw = 0, maxW = rect.width, maxWidth = 0, lines = [], addLine = function (ctx, txt) {
            var fx = 0,lw = 0;
            lw = ctx.measureText(txt).width;
            if(object.horizAlign === Types.TEXTALIGNS.LEFT) fx = (!calcRect) ? object.padding.left + rect.left : rect.left;
            else if(object.horizAlign === Types.TEXTALIGNS.CENTER) fx = (rect.width >= lw) ? (rect.width - lw) * 0.5 : 0;
            if(object.horizAlign === Types.TEXTALIGNS.RIGHT) fx = (!calcRect) ? rect.width - lw - object.padding.right : rect.width - lw;
            lines.add({ text: txt,w: lw,x: fx,h: txtHeight });
            if(maxWidth < lw) maxWidth = lw;
        };
        if(typeof calcRect === _const.UNDEFINED) calcRect = false;
        this.save();
        this.textAlign = "left";//object.horizAlign;
        this.textBaseline = "middle";
        if(object.style) {
            if(object.style.customNormal.back.isEmpty()) {
                //this.font=object.style.normal.font.string;
                //font=Core.themes[object.getThemeName()][object.ClassName()].normal.font;
                font = object.getStyle(Types.STYLES.NORMAL,Types.STYLEOBJECTS.FONT);
                this.font = font.string;
                //txtHeight=this.myMeasureText("°_",false,font).h;
                txtHeight = font.height;
            } else {
                this.font = object.style.customNormal.font.string;
                //txtHeight=this.myMeasureText("°_",false,object.style.customNormal.font).h;
                txtHeight = font.height;
            }
        } //else txtHeight=this.myMeasureText("°_",false,this.font).h;
        lines.length = 0;
        words = Text.wrapText(object.caption,object.wordWrap);
        for(var i = 0,l = words.length;i < l;i++) {
            if(words[i] === "¤") {
                if(txt !== String.EMPTY) addLine(this,txt);
                txt = String.EMPTY;
                continue;
            }
            var testLine = txt + words[i];
            fw = this.measureText(testLine).width;
            if(fw > maxW) {
                if(txt !== String.EMPTY) addLine(this,txt);
                txt = words[i];
            } else txt = testLine;
        }
        addLine(this,txt);
        object.lines = lines;
        if(calcRect) {
            rect.setRight(rect.left + maxWidth);
            rect.setBottom(rect.top + txtHeight);
        }
        this.restore();
    };
    CanvasRenderingContext2D.prototype.drawText = function (object, rect) {
        var Core = require("core");
        var txtHeight,y = 0,text = String.EMPTY,boffset = 1,font;
        if(typeof object.caption !== _const.STRING) return;
        if(object.caption === String.EMPTY) return;
        if(!object.lines) return;
        if(object.lines.length === 0) return;
        this.save();
        if(!object.enabled) this.globalAlpha *= 0.5;
        this.textAlign = "left";
        this.textBaseline = "middle";
        if(object.style) {
            if(object.style.customNormal.font.isEmpty()) {
                font = object.getStyle(Types.STYLES.NORMAL,Types.STYLEOBJECTS.FONT);
                this.font = font.string;
                boffset = ~~((7 * font.size) / 100);
            } else {
                this.font = object.style.customNormal.font.string;
                boffset = ~~((7 * object.style.customNormal.font.size) / 100);
            }
        }// else boffset=~~((7*object.style.customNormal.font.size)/100);
        txtHeight = object.lines[0].h;
        y = object.padding.top;
        if(boffset < 1) boffset = 1;
        if(object.lines.length > 1) y = (rect.height - (object.lines.length * txtHeight)) / 2;
        else y = Core.ceil((rect.height - txtHeight) / 2);
        if(y < 0) y = 0;
        for(var i = 0,l = object.lines.length;i < l;i++) {
            text = object.lines[i].text;
            if(i > 0) y += txtHeight;
            //if (object.style!==null) {
            //  if (object.style.customNormal.empty())this.fillStyle=object.style.normal.color.toARGBString();
            //  else this.fillStyle=object.style.customNormal.color.toARGBString();
            //}
            //var txtw=object.lines[i].w;
            this.fillText(text,object.lines[i].x + rect.left,Core.ceil(y + (txtHeight / 2)) + rect.top);
            if(this.borderWidth > 0) this.strokeText(text,object.lines[i].x + rect.left,Core.ceil(y + (txtHeight / 2)) + rect.top);
        }
        this.restore();
    };
    CanvasRenderingContext2D.prototype.generateDasdedCurves = function CanvasRenderingContext2D_generateDasdedCurves(pts, points, borderWidth, dashArray, result) {
        var BezierUtils = require("bezierUtils");
        var bu = BezierUtils,p1;
        p1 = pts[0];
        for(var i = 1;i < pts.length;++i) {
            var curves = [];
            result = bu.splitToDashedBezier(p1.concat(pts[i]),dashArray,curves,borderWidth,result);
            p1 = [pts[i][4],pts[i][5]];
            points.push(curves);
        }
        return result;
    };
    CanvasRenderingContext2D.prototype.drawDashedCurve = function(points) {
        for(var i = 0,l = points.length;i < l;++i) {
            var curves = points[i];
            for(var j = 0;j < curves.length;++j) {
                var curve = curves[j];
                this.moveTo(curve[0],curve[1]);
                this.bezierCurveTo(curve[2],curve[3],curve[4],curve[5],curve[6],curve[7]);
            }
        }
    };
    CanvasRenderingContext2D.prototype.drawEllipse = function(r,comp,clip) {
        var pts = [],ox,oy,xe,ye,xm,ym,points = [],x,y,rH,rW;
        if(!comp.borderDash) comp.borderDash = Types.CANVAS.STROKEDASHS.SOLID;
        if(this.useNativeDash && comp.borderDash) this.setDash(comp.borderDash);
        x = r.left + 0.5;
        y = r.top + 0.5;
        rW = x + r.width;
        rH = y + r.height;
        ox = (r.width * 0.5) * Types.CANVAS.CURVE2KAPPA;// control point offset horizontal
        oy = (r.height * 0.5) * Types.CANVAS.CURVE2KAPPA;// control point offset vertical
        xe = rW;          // x-end
        ye = rH;          // y-end
        xm = x + r.width * 0.5;      // x-middle
        ym = y + r.height * 0.5;       // y-middle
        this.beginPath();
        this.moveTo(x,ym);
        this.bezierCurveTo(x,ym - oy,xm - ox,y,xm,y);
        this.bezierCurveTo(xm + ox,y,xe,ym - oy,xe,ym);
        this.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
        this.bezierCurveTo(xm - ox,ye,x,ym + oy,x,ym);
        this.closePath();
        if(!this.useNativeDash && comp.borderDash.length > 0) {
            pts.push([r.left,ym]);
            pts.push([r.left,ym - oy,xm - ox,r.top,xm,r.top]);
            pts.push([xm + ox,r.top,xe,ym - oy,xe,ym]);
            pts.push([xe,ym + oy,xm + ox,ye,xm,ye]);
            pts.push([xm - ox,ye,r.left,ym + oy,r.left,ym]);
            this.generateDasdedCurves(pts,points,this.borderWidth,comp.borderDash);
            if(!clip) {
                this.fill();
                this.beginPath();
                this.drawDashedCurve(points);
                this.closePath();
            }
        } else if(!clip) {
            this.fill();
            this.stroke();
        } else this.clip();
    };
    CanvasRenderingContext2D.prototype.dashedLineTo = function (dashArray, x1, y1, x2, y2, prevResult) {
        var BezierUtils = require("bezierUtils");
        var result = 0,r = 0,dal = 0,tlength = BezierUtils.distance(x1,y1,x2,y2),i = 0,
            prevx = x1,prevy = y1,x,y;
        if(dashArray.length === 0) {
            this.moveTo(x1,y1);
            this.lineTo(x2,y2);
            return;
        }
        if(prevResult) {
            dal = prevResult.l;
            i = prevResult.i;
        } else {
            dal += dashArray[0] * this.borderWidth;
        }
        while(Core.abs(1 - r) > 0.01) {
            if(dal > tlength) {
                result = { l: dal - tlength,i: i };
                dal = tlength;
            }
            r = dal / tlength;
            x = x1 + (x2 - x1) * r;
            y = y1 + (y2 - y1) * r;
            if(!(i++ % 2)) {
                this.moveTo(prevx,prevy);
                this.lineTo(x,y);
            }
            prevx = x;
            prevy = y;
            dal += dashArray[i % dashArray.length] * this.borderWidth;
        }
        return result;
    };
    CanvasRenderingContext2D.prototype.drawLine = function(r,comp) {
        var xl = r.left,yt = r.top,rW = r.width + 1,rH = r.height + 1,xr = xl + rW,yb = yt + rH,t;
        if(!comp.borderDash) comp.borderDash = Types.CANVAS.STROKEDASHS.SOLID;
        if(this.useNativeDash && comp.borderDash) this.setDash(comp.borderDash);
        this.beginPath();
        switch(comp.lineType) {
            case Types.CANVAS.LINETYPES.NORMAL:
                if(linePosition === Types.CANVAS.LINEPOSITIONS.RIGHTTOLEFT) {
                    t = xl;
                    xl = xr;
                    xr = t;
                }
                break;
            case Types.CANVAS.LINETYPES.HORIZONTAL:
                switch(comp.linePosition) {
                    case Types.CANVAS.LINEPOSITIONS.NEAR:
                        yb = yt;
                        break;
                    case Types.CANVAS.LINEPOSITIONS.MIDDLE:
                        yt = yb = yt + (rH / 2);
                        break;
                    case Types.CANVAS.LINEPOSITIONS.FAR:
                        yt = yb;
                        break;
                }
                break;
            case Types.CANVAS.LINETYPES.VERTICAL:
                switch(comp.linePosition) {
                    case Types.CANVAS.LINEPOSITIONS.NEAR:
                        xr = xl;
                        break;
                    case Types.CANVAS.LINEPOSITIONS.MIDDLE:
                        xl = xr = xl + (rW / 2);
                        break;
                    case Types.CANVAS.LINEPOSITIONS.FAR:
                        xl = xr;
                        break;
                }
                break;
        }
        if(!this.useNativeDash && comp.borderDash.length === 0) this.dashedLineTo(comp.borderDash,xl,yt,xr,yb);
        else {
            this.moveTo(xl,yt);
            this.lineTo(xr,yb);
        }
        this.stroke();
    };
    CanvasRenderingContext2D.prototype.drawRect = function(r,bordersRadius,comp,clip) {
        var xw,yh,x1,x2,y1,y2,x3,x4,y3,y4,radiiX,radiiY,x,y,rW,rH,ratioX = 0,ratioY = 0,result,points = [],pts = [],
            tl = bordersRadius.topLeft,tr = bordersRadius.topRight,bl = bordersRadius.bottomLeft,br = bordersRadius.bottomRight,result;
        if(!comp.borderDash) comp.borderDash = Types.CANVAS.STROKEDASHS.SOLID;
        if(this.useNativeDash && comp.borderDash) this.setDash(comp.borderDash);
        // rectangle non arrondi
        x = r.left + 0.5;
        y = r.top + 0.5;
        rW = r.width;
        rH = r.height;
        if(rW < 0 || rH < 0) return;
        xw = x + rW;
        yh = y + rH;
        if(tl.x + tr.x + br.x + bl.x + tl.y + tr.y + br.y + bl.y === 0) {
            if(!clip) {
                this.beginPath();
                this.rect(x,y,rW,rH);
                this.fill();
                if(this.borderWidth > 0) {
                    if(!this.useNativeDash && comp.borderDash.length > 0) {
                        this.beginPath();
                        if((comp.sides & Types.SIDES.LEFT) === Types.SIDES.LEFT) result = this.dashedLineTo(comp.borderDash,x,y,x,yh,result);
                        if((comp.sides & Types.SIDES.TOP) === Types.SIDES.TOP) result = this.dashedLineTo(comp.borderDash,x,y,xw,y,result);
                        if((comp.sides & Types.SIDES.RIGHT) === Types.SIDES.RIGHT) result = this.dashedLineTo(comp.borderDash,xw,y,xw,yh,result);
                        if((comp.sides & Types.SIDES.BOTTOM) === Types.SIDES.BOTTOM) result = this.dashedLineTo(comp.borderDash,x,yh,xw,yh,result);
                    } else {
                        this.beginPath();
                        this.moveTo(x,y);
                        if((comp.sides & Types.SIDES.TOP) === Types.SIDES.TOP) {
                            this.lineTo(xw,y);
                        } else this.moveTo(xw,y);
                        if((comp.sides & Types.SIDES.RIGHT) === Types.SIDES.RIGHT) {
                            this.lineTo(xw,yh);
                        } else this.moveTo(xw,yh);
                        if((comp.sides & Types.SIDES.BOTTOM) === Types.SIDES.BOTTOM) {
                            this.lineTo(x,yh);
                        } else this.moveTo(xw,yh);
                        if((comp.sides & Types.SIDES.LEFT) === Types.SIDES.LEFT) {
                            this.lineTo(x,y);
                        }
                        if(comp.sides === Types.SIDES.ALL) this.closePath();
                    }
                    this.stroke();
                } else this.fillRect(x,y,rW,rH);
            } else {
                this.beginPath();
                this.rect(x,y,rW + 1,rH + 1);
                this.clip();
            }
        } else {
            if((comp.corners & Types.CORNERS.TOPLEFT) !== Types.CORNERS.TOPLEFT) tl.setValues(0,0);
            if((comp.corners & Types.CORNERS.TOPRIGHT) !== Types.CORNERS.TOPRIGHT) tr.setValues(0,0);
            if((comp.corners & Types.CORNERS.BOTTOMLEFT) !== Types.CORNERS.BOTTOMLEFT) bl.setValues(0,0);
            if((comp.corners & Types.CORNERS.BOTTOMRIGHT) !== Types.CORNERS.BOTTOMRIGHT) br.setValues(0,0);
            ratioX = Core.min(rW / (tl.x + tr.x),rW / (br.x + bl.x));
            if((ratioX > 0) && (ratioX < 1)) {
                tl.x *= ratioX;
                tr.x *= ratioX;
                bl.x *= ratioX;
                br.x *= ratioX;
            };
            ratioY = Core.min(rH / (tl.y + tr.y),rH / (br.y + bl.y));
            if((ratioY > 0) && (ratioY < 1)) {
                tl.y *= ratioY;
                tr.y *= ratioY;
                bl.y *= ratioY;
                br.y *= ratioY;
            };
            x1 = x + tl.x;
            x2 = xw - tr.x;
            x3 = xw - br.x;
            x4 = x + bl.x;
            y1 = y + tr.y;
            y2 = yh - br.y;
            y3 = yh - bl.y;
            y4 = y + tl.y;
            this.beginPath();
            this.moveTo(x1,y);
            this.lineTo(x2,y);
            if((comp.corners & Types.CORNERS.TOPRIGHT) === Types.CORNERS.TOPRIGHT) {
                radiiX = Types.CANVAS.CURVE2KAPPA * tr.x;
                radiiY = Types.CANVAS.CURVE2KAPPA * tr.y;
                this.bezierCurveTo(x2 + radiiX,y,xw,y1 - radiiY,xw,y1);
            }
            this.lineTo(xw,y2);
            if((comp.corners & Types.CORNERS.BOTTOMRIGHT) === Types.CORNERS.BOTTOMRIGHT) {
                radiiX = Types.CANVAS.CURVE2KAPPA * br.x;
                radiiY = Types.CANVAS.CURVE2KAPPA * br.y;
                this.bezierCurveTo(xw,y2 + radiiY,x3 + radiiX,yh,x3,yh);
            }
            this.lineTo(x4,yh);
            if((comp.corners & Types.CORNERS.BOTTOMLEFT) === Types.CORNERS.BOTTOMLEFT) {
                radiiX = Types.CANVAS.CURVE2KAPPA * bl.x;
                radiiY = Types.CANVAS.CURVE2KAPPA * bl.y;
                this.bezierCurveTo(x4 - radiiX,yh,x,y3 + radiiY,x,y3);
            }
            this.lineTo(x,y4);
            if((comp.corners & Types.CORNERS.TOPLEFT) === Types.CORNERS.TOPLEFT) {
                radiiX = Types.CANVAS.CURVE2KAPPA * tl.x;
                radiiY = Types.CANVAS.CURVE2KAPPA * tl.y;
                this.bezierCurveTo(x,y4 - radiiY,x1 - radiiX,y,x1,y);
            }
            if(!clip) {
                if(comp.sides === Types.SIDES.ALL) this.closePath();
                this.fill();
                //var ss=this.strokeStyle;
                //this.strokeStyle="rgba(0,0,255,0.5)";
                //this.stroke();
                //this.strokeStyle="rgba(255,0,0,0.5)";
            } else {
                this.clip();
                return;
            }
            if(this.borderWidth > 0) {
                this.beginPath();
                if((comp.sides & Types.SIDES.TOP) === Types.SIDES.TOP) {
                    if(!this.useNativeDash && comp.borderDash.length > 0) result = this.dashedLineTo(comp.borderDash,x1,y,x2,y,result);
                    else {
                        this.moveTo(x1,y);
                        this.lineTo(x2,y);
                    }
                } else this.moveTo(x2,y);
                if((comp.corners & Types.CORNERS.TOPRIGHT) === Types.CORNERS.TOPRIGHT) {
                    radiiX = Types.CANVAS.CURVE2KAPPA * tr.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * tr.y;
                    if(!this.useNativeDash && comp.borderDash.length > 0) {
                        pts.length = 0;
                        points.length = 0;
                        pts.push([x2,y]);
                        pts.push([x2 + radiiX,y,xw,y1 - radiiY,xw,y1]);
                        result = this.generateDasdedCurves(pts,points,this.borderWidth,comp.borderDash,result);
                    } else this.bezierCurveTo(x2 + radiiX,y,xw,y1 - radiiY,xw,y1);
                }
                if((comp.sides & Types.SIDES.RIGHT) === Types.SIDES.RIGHT) {
                    if(!this.useNativeDash && comp.borderDash.length > 0) result = this.dashedLineTo(comp.borderDash,xw,y1,xw,y2,result);
                    else this.lineTo(xw,y2);
                } else this.moveTo(xw,y2);
                if((comp.corners & Types.CORNERS.BOTTOMRIGHT) === Types.CORNERS.BOTTOMRIGHT) {
                    radiiX = Types.CANVAS.CURVE2KAPPA * br.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * br.y;
                    if(!this.useNativeDash && comp.borderDash.length > 0) {
                        pts.length = 0;
                        points.length = 0;
                        pts.push([xw,y2]);
                        pts.push([xw,y2 + radiiY,x3 + radiiX,yh,x3,yh]);
                        result = this.generateDasdedCurves(pts,points,this.borderWidth,comp.borderDash,result);
                    } else this.bezierCurveTo(xw,y2 + radiiY,x3 + radiiX,yh,x3,yh);
                }
                if((comp.sides & Types.SIDES.BOTTOM) === Types.SIDES.BOTTOM) {
                    if(!this.useNativeDash && comp.borderDash.length > 0) result = this.dashedLineTo(comp.borderDash,x3,yh,x4,yh,result);
                    else this.lineTo(x4,yh);
                } else this.moveTo(x4,yh);
                if((comp.corners & Types.CORNERS.BOTTOMLEFT) === Types.CORNERS.BOTTOMLEFT) {
                    radiiX = Types.CANVAS.CURVE2KAPPA * bl.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * bl.y;
                    if(!this.useNativeDash && comp.borderDash.length > 0) {
                        pts.length = 0;
                        points.length = 0;
                        pts.push([x4,yh]);
                        pts.push([x4 - radiiX,yh,x,y3 + radiiY,x,y3]);
                        result = this.generateDasdedCurves(pts,points,this.borderWidth,comp.borderDash,result);
                    } else this.bezierCurveTo(x4 - radiiX,yh,x,y3 + radiiY,x,y3);
                }
                if((comp.sides & Types.SIDES.LEFT) === Types.SIDES.LEFT) {
                    if(!this.useNativeDash && comp.borderDash.length > 0) result = this.dashedLineTo(comp.borderDash,x,y3,x,y4,result);
                    else this.lineTo(x,y4);
                } else this.moveTo(x,y4);
                if((comp.corners & Types.CORNERS.TOPLEFT) === Types.CORNERS.TOPLEFT) {
                    radiiX = Types.CANVAS.CURVE2KAPPA * tl.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * tl.y;
                    if(!this.useNativeDash && comp.borderDash.length > 0) {
                        pts.length = 0;
                        points.length = 0;
                        pts.push([x,y4]);
                        pts.push([x,y4 - radiiY,x1 - radiiX,y,x1,y]);
                        result = this.generateDasdedCurves(pts,points,this.borderWidth,comp.borderDash,result);
                    } else this.bezierCurveTo(x,y4 - radiiY,x1 - radiiX,y,x1,y);
                }
            }
            if(!clip) {
                if(comp.sides === Types.SIDES.ALL) this.lineTo(x1,y);
                //if (comp.sides===Types.SIDES.ALL) this.closePath();
                //if (ulr+urr+llr+lrr>0) this.fill();
                //else this.fillRect(x,y,xw,yh);
                this.stroke();

            }
        }
    };
    CanvasRenderingContext2D.prototype.drawRoundRect = function(r,radius) {
        var x = r.left + 0.5,y = r.top + 0.5,w = r.width - 0.5,h = r.height - 0.5;
        this.beginPath();
        this.moveTo(x,y + radius);
        this.lineTo(x,y + h - radius); // gauche
        this.quadraticCurveTo(x,y + h,x + radius,y + h - 0.5); // arrondi gauche-bas
        this.lineTo(x + w - radius - 1,y + h - 0.5); // bas
        this.quadraticCurveTo(x + w,y + h,x + w - 0.5,y + h - radius); // arrondi bas-droit
        this.lineTo(x + w - 0.5,y + radius); // droit
        this.quadraticCurveTo(x + w,y,x + w - radius,y); // arrondi droit-haut
        this.lineTo(x + radius - 0.5,y); // haut
        this.quadraticCurveTo(x,y,x,y + radius); // arrondi haut-gauche
        this.fill();
        this.stroke();
        this.closePath();
    };
    CanvasRenderingContext2D.prototype.drawCallout = function(r,bordersRadius,comp,clip) {
        var xw,yh,x1,x2,y1,y2,x3,x4,y3,y4,radiiX,radiiY,x,y,rW,rH,ratioX = 0,ratioY = 0,result,points = [],pts = [],xc1,xc2,xc3,yc1,yc2,yc3,
            tl = bordersRadius.topLeft,tr = bordersRadius.topRight,bl = bordersRadius.bottomLeft,br = bordersRadius.bottomRight,w2,h2,yt,yb,xl,xr;
        if(!comp.borderDash) comp.borderDash = Types.CANVAS.STROKEDASHS.SOLID;
        if(this.useNativeDash && comp.borderDash) this.setDash(comp.borderDash);
        // rectangle non arrondi
        xl = x = r.left + 0.5;
        yt = y = r.top + 0.5;
        rW = r.width;
        rH = r.height;
        xr = xw = x + rW;
        yb = yh = y + rH;
        if((comp.corners & Types.CORNERS.TOPLEFT) !== Types.CORNERS.TOPLEFT) tl.setValues(0,0);
        if((comp.corners & Types.CORNERS.TOPRIGHT) !== Types.CORNERS.TOPRIGHT) tr.setValues(0,0);
        if((comp.corners & Types.CORNERS.BOTTOMLEFT) !== Types.CORNERS.BOTTOMLEFT) bl.setValues(0,0);
        if((comp.corners & Types.CORNERS.BOTTOMRIGHT) !== Types.CORNERS.BOTTOMRIGHT) br.setValues(0,0);
        ratioX = Core.min(rW / (tl.x + tr.x),rW / (br.x + bl.x));
        if((ratioX > 0) && (ratioX < 1)) {
            tl.x *= ratioX;
            tr.x *= ratioX;
            bl.x *= ratioX;
            br.x *= ratioX;
        };
        ratioY = Core.min(rH / (tl.y + tr.y),rH / (br.y + bl.y));
        if((ratioY > 0) && (ratioY < 1)) {
            tl.y *= ratioY;
            tr.y *= ratioY;
            bl.y *= ratioY;
            br.y *= ratioY;
        };
        x1 = x + tl.x;
        x2 = xw - tr.x;
        x3 = xw - br.x;
        x4 = x + bl.x;
        y1 = y + tr.y;
        y2 = yh - br.y;
        y3 = yh - bl.y;
        y4 = y + tl.y;
        w2 = r.width / 2;
        h2 = r.height / 2;
        switch(comp.calloutPosition) {
            case Types.CALLOUTPOSITIONS.TOP:
                if(comp.calloutOffset < 0) {
                    xc1 = w2 + comp.calloutOffset - ~~(comp.calloutWidth / 2);
                    if(xc1 < tl.x) xc1 = tl.x + ~~(this.borderWidth / 2);
                    xc2 = xc1 + ~~(comp.calloutWidth / 2);
                    xc3 = xc2 + ~~(comp.calloutWidth / 2);
                } else {
                    xc3 = w2 + comp.calloutOffset + ~~(comp.calloutWidth / 2);
                    if(xc3 > xw - tr.x) xc3 = xw - tr.x - ~~(this.borderWidth / 2);
                    xc2 = xc3 - ~~(comp.calloutWidth / 2);
                    xc1 = xc2 - ~~(comp.calloutWidth / 2);
                }
                if(comp.calloutLength >= r.height) comp.calloutLength = 11;
                y += comp.calloutLength;
                y1 += comp.calloutLength;
                y4 += comp.calloutLength;
                break;
            case Types.CALLOUTPOSITIONS.RIGHT:
                if(comp.calloutOffset < 0) {
                    yc1 = h2 + comp.calloutOffset - ~~(comp.calloutWidth / 2);
                    if(yc1 < tr.y) yc1 = tr.y + ~~(this.borderWidth / 2);
                    yc2 = yc1 + ~~(comp.calloutWidth / 2);
                    yc3 = yc2 + ~~(comp.calloutWidth / 2);
                } else {
                    yc3 = h2 + comp.calloutOffset + ~~(comp.calloutWidth / 2);
                    if(yc3 > yh - br.y) yc3 = yh - br.y - ~~(this.borderWidth / 2);
                    yc2 = yc3 - ~~(comp.calloutWidth / 2);
                    yc1 = yc2 - ~~(comp.calloutWidth / 2);
                }
                if(comp.calloutLength >= r.width) comp.calloutLength = 11;
                xr -= comp.calloutLength;
                x2 -= comp.calloutLength;
                x3 -= comp.calloutLength;
                break;
            case Types.CALLOUTPOSITIONS.BOTTOM:
                if(comp.calloutOffset < 0) {
                    xc1 = w2 + comp.calloutOffset - ~~(comp.calloutWidth / 2);
                    if(xc1 < bl.x) xc1 = bl.x + ~~(this.borderWidth / 2);
                    xc2 = xc1 + ~~(comp.calloutWidth / 2);
                    xc3 = xc2 + ~~(comp.calloutWidth / 2);
                } else {
                    xc3 = w2 + comp.calloutOffset + ~~(comp.calloutWidth / 2);
                    if(xc3 > xw - br.x) xc3 = xw - br.x - ~~(this.borderWidth / 2);
                    xc2 = xc3 - ~~(comp.calloutWidth / 2);
                    xc1 = xc2 - ~~(comp.calloutWidth / 2);
                }
                if(comp.calloutLength >= r.height) comp.calloutLength = 11;
                yb -= comp.calloutLength;
                y2 -= comp.calloutLength;
                y3 -= comp.calloutLength;
                break;
            case Types.CALLOUTPOSITIONS.LEFT:
                if(comp.calloutOffset < 0) {
                    yc1 = h2 + comp.calloutOffset - ~~(comp.calloutWidth / 2);
                    if(yc1 < tl.y) yc1 = tl.y + ~~(this.borderWidth / 2);
                    yc2 = yc1 + ~~(comp.calloutWidth / 2);
                    yc3 = yc2 + ~~(comp.calloutWidth / 2);
                } else {
                    yc3 = h2 + comp.calloutOffset + ~~(comp.calloutWidth / 2);
                    if(yc3 > yh - bl.y) yc3 = yh - bl.y - ~~(this.borderWidth / 2);
                    yc2 = yc3 - ~~(comp.calloutWidth / 2);
                    yc1 = yc2 - ~~(comp.calloutWidth / 2);
                }
                if(comp.calloutLength >= r.width) comp.calloutLength = 11;
                xl += comp.calloutLength;
                x1 += comp.calloutLength;
                x4 += comp.calloutLength;
                break;
        }
        if(!clip) {
            this.beginPath();
            switch(comp.calloutPosition) {
                case Types.CALLOUTPOSITIONS.TOP:
                    this.moveTo(x,y);
                    if(!this.useNativeDash && comp.borderDash.length > 0) {
                        result = this.dashedLineTo(comp.borderDash,x,y,xc1,y,result);
                        result = this.dashedLineTo(comp.borderDash,xc1,y,xc2,yt,result);
                        result = this.dashedLineTo(comp.borderDash,xc2,yt,xc3,y,result);
                        result = this.dashedLineTo(comp.borderDash,xc3,y,xw,y,result);
                        result = this.dashedLineTo(comp.borderDash,xw,y,xw,yh,result);
                        result = this.dashedLineTo(comp.borderDash,xw,yh,x,yh,result);
                        result = this.dashedLineTo(comp.borderDash,x,yh,x,y,result);
                    } else {
                        this.lineTo(xc1,y);
                        this.lineTo(xc2,yt);
                        this.lineTo(xc3,y);
                        this.lineTo(x2,y);
                        radiiX = Types.CANVAS.CURVE2KAPPA * tr.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * tr.y;
                        this.bezierCurveTo(x2 + radiiX,y,xw,y1 - radiiY,xw,y1);
                        this.lineTo(xw,y2);
                        radiiX = Types.CANVAS.CURVE2KAPPA * br.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * br.y;
                        this.bezierCurveTo(xw,y2 + radiiY,x3 + radiiX,yh,x3,yh);
                        this.lineTo(x4,yh);
                        radiiX = Types.CANVAS.CURVE2KAPPA * bl.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * bl.y;
                        this.bezierCurveTo(x4 - radiiX,yh,x,y3 + radiiY,x,y3);
                        this.lineTo(x,y4);
                        radiiX = Types.CANVAS.CURVE2KAPPA * tl.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * tl.y;
                        this.bezierCurveTo(x,y4 - radiiY,x1 - radiiX,y,x1,y);
                    }
                    break;
                case Types.CALLOUTPOSITIONS.RIGHT:
                    this.moveTo(x1,y);
                    this.lineTo(x2,y);
                    radiiX = Types.CANVAS.CURVE2KAPPA * tr.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * tr.y;
                    this.bezierCurveTo(x2 + radiiX,y,xr,y1 - radiiY,xr,y1);
                    this.lineTo(xr,yc1);
                    this.lineTo(xw,yc2);
                    this.lineTo(xr,yc3);
                    this.lineTo(xr,y2);
                    radiiX = Types.CANVAS.CURVE2KAPPA * br.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * br.y;
                    this.bezierCurveTo(xr,y2 + radiiY,x3 + radiiX,yh,x3,yh);
                    this.lineTo(x4,yh);
                    radiiX = Types.CANVAS.CURVE2KAPPA * bl.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * bl.y;
                    this.bezierCurveTo(x4 - radiiX,yh,x,y3 + radiiY,x,y3);
                    this.lineTo(x,y4);
                    radiiX = Types.CANVAS.CURVE2KAPPA * tl.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * tl.y;
                    this.bezierCurveTo(x,y4 - radiiY,x1 - radiiX,y,x1,y);
                    break;
                case Types.CALLOUTPOSITIONS.BOTTOM:
                    this.moveTo(x,y);
                    this.lineTo(x2,y);
                    radiiX = Types.CANVAS.CURVE2KAPPA * tr.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * tr.y;
                    this.bezierCurveTo(x2 + radiiX,y,xw,y1 - radiiY,xw,y1);
                    this.lineTo(xw,y2);
                    radiiX = Types.CANVAS.CURVE2KAPPA * br.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * br.y;
                    this.bezierCurveTo(xw,y2 + radiiY,x3 + radiiX,yb,x3,yb);
                    this.lineTo(xc1,yb);
                    this.lineTo(xc2,yh);
                    this.lineTo(xc3,yb);
                    this.lineTo(x4,yb);
                    radiiX = Types.CANVAS.CURVE2KAPPA * bl.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * bl.y;
                    this.bezierCurveTo(x4 - radiiX,yb,x,y3 + radiiY,x,y3);
                    this.lineTo(x,y4);
                    radiiX = Types.CANVAS.CURVE2KAPPA * tl.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * tl.y;
                    this.bezierCurveTo(x,y4 - radiiY,x1 - radiiX,y,x1,y);
                    break;
                case Types.CALLOUTPOSITIONS.LEFT:
                    this.moveTo(x1,y);
                    this.lineTo(x2,y);
                    radiiX = Types.CANVAS.CURVE2KAPPA * tr.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * tr.y;
                    this.bezierCurveTo(x2 + radiiX,y,xr,y1 - radiiY,xr,y1);
                    this.lineTo(xw,y2);
                    radiiX = Types.CANVAS.CURVE2KAPPA * br.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * br.y;
                    this.bezierCurveTo(xr,y2 + radiiY,x3 + radiiX,yh,x3,yh);
                    this.lineTo(x4,yh);
                    radiiX = Types.CANVAS.CURVE2KAPPA * bl.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * bl.y;
                    this.bezierCurveTo(x4 - radiiX,yh,xl,y3 + radiiY,xl,y3);
                    this.lineTo(xl,y3);
                    this.lineTo(xl,yc3);
                    this.lineTo(x,yc2);
                    this.lineTo(xl,yc1);
                    this.lineTo(xl,y4);
                    radiiX = Types.CANVAS.CURVE2KAPPA * tl.x;
                    radiiY = Types.CANVAS.CURVE2KAPPA * tl.y;
                    this.bezierCurveTo(xl,y4 - radiiY,x1 - radiiX,y,x1,y);
                    break;
            }
            this.fill();
            if(this.borderWidth > 0) {
                this.beginPath();
                switch(comp.calloutPosition) {
                    case Types.CALLOUTPOSITIONS.TOP:
                        this.moveTo(x1,y);
                        this.lineTo(xc1,y);
                        this.lineTo(xc2,yt);
                        this.lineTo(xc3,y);
                        this.lineTo(x2,y);
                        radiiX = Types.CANVAS.CURVE2KAPPA * tr.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * tr.y;
                        this.bezierCurveTo(x2 + radiiX,y,xw,y1 - radiiY,xw,y1);
                        this.lineTo(xw,y2);
                        radiiX = Types.CANVAS.CURVE2KAPPA * br.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * br.y;
                        this.bezierCurveTo(xw,y2 + radiiY,x3 + radiiX,yh,x3,yh);
                        this.lineTo(x4,yh);
                        radiiX = Types.CANVAS.CURVE2KAPPA * bl.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * bl.y;
                        this.bezierCurveTo(x4 - radiiX,yh,x,y3 + radiiY,x,y3);
                        this.lineTo(x,y4);
                        radiiX = Types.CANVAS.CURVE2KAPPA * tl.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * tl.y;
                        this.bezierCurveTo(x,y4 - radiiY,x1 - radiiX,y,x1,y);
                        break;
                    case Types.CALLOUTPOSITIONS.RIGHT:
                        this.moveTo(x1,y);
                        this.lineTo(x2,y);
                        radiiX = Types.CANVAS.CURVE2KAPPA * tr.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * tr.y;
                        this.bezierCurveTo(x2 + radiiX,y,xr,y1 - radiiY,xr,y1);
                        this.lineTo(xr,yc1);
                        this.lineTo(xw,yc2);
                        this.lineTo(xr,yc3);
                        this.lineTo(xr,y2);
                        radiiX = Types.CANVAS.CURVE2KAPPA * br.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * br.y;
                        this.bezierCurveTo(xr,y2 + radiiY,x3 + radiiX,yh,x3,yh);
                        this.lineTo(x4,yh);
                        radiiX = Types.CANVAS.CURVE2KAPPA * bl.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * bl.y;
                        this.bezierCurveTo(x4 - radiiX,yh,x,y3 + radiiY,x,y3);
                        this.lineTo(x,y4);
                        radiiX = Types.CANVAS.CURVE2KAPPA * tl.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * tl.y;
                        this.bezierCurveTo(x,y4 - radiiY,x1 - radiiX,y,x1,y);
                        break;
                    case Types.CALLOUTPOSITIONS.BOTTOM:
                        this.moveTo(x1,y);
                        this.lineTo(x2,y);
                        radiiX = Types.CANVAS.CURVE2KAPPA * tr.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * tr.y;
                        this.bezierCurveTo(x2 + radiiX,y,xw,y1 - radiiY,xw,y1);
                        this.lineTo(xw,y2);
                        radiiX = Types.CANVAS.CURVE2KAPPA * br.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * br.y;
                        this.bezierCurveTo(xw,y2 + radiiY,x3 + radiiX,yb,x3,yb);
                        this.lineTo(xc3,yb);
                        this.lineTo(xc2,yh);
                        this.lineTo(xc1,yb);
                        this.lineTo(x4,yb);
                        radiiX = Types.CANVAS.CURVE2KAPPA * bl.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * bl.y;
                        this.bezierCurveTo(x4 - radiiX,yb,x,y3 + radiiY,x,y3);
                        this.lineTo(x,y4);
                        radiiX = Types.CANVAS.CURVE2KAPPA * tl.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * tl.y;
                        this.bezierCurveTo(x,y4 - radiiY,x1 - radiiX,y,x1,y);
                        break;
                    case Types.CALLOUTPOSITIONS.LEFT:
                        this.moveTo(x1,y);
                        this.lineTo(x2,y);
                        radiiX = Types.CANVAS.CURVE2KAPPA * tr.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * tr.y;
                        this.bezierCurveTo(x2 + radiiX,y,xr,y1 - radiiY,xr,y1);
                        this.lineTo(xw,y2);
                        radiiX = Types.CANVAS.CURVE2KAPPA * br.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * br.y;
                        this.bezierCurveTo(xr,y2 + radiiY,x3 + radiiX,yh,x3,yh);
                        this.lineTo(x4,yh);
                        radiiX = Types.CANVAS.CURVE2KAPPA * bl.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * bl.y;
                        this.bezierCurveTo(x4 - radiiX,yh,xl,y3 + radiiY,xl,y3);
                        this.lineTo(xl,y3);
                        this.lineTo(xl,yc3);
                        this.lineTo(x,yc2);
                        this.lineTo(xl,yc1);
                        this.lineTo(xl,y4);
                        radiiX = Types.CANVAS.CURVE2KAPPA * tl.x;
                        radiiY = Types.CANVAS.CURVE2KAPPA * tl.y;
                        this.bezierCurveTo(xl,y4 - radiiY,x1 - radiiX,y,x1,y);
                        break;
                }
                if(comp.sides === Types.SIDES.ALL) this.closePath();
                this.stroke();
            } else this.fillRect(r.left + 0.5,r.top + 0.5,r.width,r.height);
        }
    };
    CanvasRenderingContext2D.prototype.drawPolygon = function(a) {
        if(!Array.isArray(a)) return;
        this.beginPath();
        for(var i = 0,l = a.length;i < l;i++) {
            if(i === 0) this.moveTo(a[i].x,a[i].y);
            else this.lineTo(a[i].x,a[i].y);
        }
        this.closePath();
        this.fill();
        this.stroke();
    };
    CanvasRenderingContext2D.prototype.drawPolyline = function(a) {
        if(!Array.isArray(a)) return;
        this.beginPath();
        for(var i = 0,l = a.length;i < l;i++) {
            if(i === 0) this.moveTo(a[i].x,a[i].y);
            else this.lineTo(a[i].x,a[i].y);
        }
        this.stroke();
    };
    CanvasRenderingContext2D.prototype.clipRect = function(comp) {
        var r = comp.localRect;
        this.beginPath();
        this.rect(r.left,r.top,r.width,r.height);
        this.clip();
    };
    CanvasRenderingContext2D.prototype.drawDigit = function(value,x,y,/*dp,*/height,outlineColor,fillColor) {
        var Geometry = require("geometry");
        var width = 10 * height / 13, segmentA = [], segmentB = [], segmentC = [], segmentD = [], segmentE = [], segmentF = [], segmentG = [],
            getX = function(x,width) { return x * width / 12; },getY = function(y,height) { return y * height / 15; };
        outlineColor.alpha = ((40 * 100) / 255) / 100;
        //Segment A
        segmentA[0] = segmentA[4] = new Geometry.Point(x + getX(2.8, width), y + getY(1, height));
        segmentA[1] = new Geometry.Point(x + getX(10, width), y + getY(1, height));
        segmentA[2] = new Geometry.Point(x + getX(8.8, width), y + getY(2, height));
        segmentA[3] = new Geometry.Point(x + getX(3.8, width), y + getY(2, height));
        //Segment B
        segmentB[0] = segmentB[4] = new Geometry.Point(x + getX(10, width), y + getY(1.4, height));
        segmentB[1] = new Geometry.Point(x + getX(9.3, width), y + getY(6.8, height));
        segmentB[2] = new Geometry.Point(x + getX(8.4, width), y + getY(6.4, height));
        segmentB[3] = new Geometry.Point(x + getX(9, width), y + getY(2.2, height));
        //Segment C
        segmentC[0] = segmentC[4] = new Geometry.Point(x + getX(9.2, width), y + getY(7.2, height));
        segmentC[1] = new Geometry.Point(x + getX(8.7, width), y + getY(12.7, height));
        segmentC[2] = new Geometry.Point(x + getX(7.6, width), y + getY(11.9, height));
        segmentC[3] = new Geometry.Point(x + getX(8.2, width), y + getY(7.7, height));
        //Segment D
        segmentD[0] = segmentD[4] = new Geometry.Point(x + getX(7.4, width), y + getY(12.1, height));
        segmentD[1] = new Geometry.Point(x + getX(8.4, width), y + getY(13, height));
        segmentD[2] = new Geometry.Point(x + getX(1.3, width), y + getY(13, height));
        segmentD[3] = new Geometry.Point(x + getX(2.2, width), y + getY(12.1, height));
        //Segment E
        segmentE[0] = segmentE[4] = new Geometry.Point(x + getX(2.2, width), y + getY(11.8, height));
        segmentE[1] = new Geometry.Point(x + getX(1, width), y + getY(12.7, height));
        segmentE[2] = new Geometry.Point(x + getX(1.7, width), y + getY(7.2, height));
        segmentE[3] = new Geometry.Point(x + getX(2.8, width), y + getY(7.7, height));
        //Segment F
        segmentF[0] = segmentF[4] = new Geometry.Point(x + getX(3, width), y + getY(6.4, height));
        segmentF[1] = new Geometry.Point(x + getX(1.8, width), y + getY(6.8, height));
        segmentF[2] = new Geometry.Point(x + getX(2.6, width), y + getY(1.3, height));
        segmentF[3] = new Geometry.Point(x + getX(3.6, width), y + getY(2.2, height));
        //Segment G
        segmentG[0] = segmentG[6] = new Geometry.Point(x + getX(2, width), y + getY(7, height));
        segmentG[1] = new Geometry.Point(x + getX(3.1, width), y + getY(6.5, height));
        segmentG[2] = new Geometry.Point(x + getX(8.3, width), y + getY(6.5, height));
        segmentG[3] = new Geometry.Point(x + getX(9, width), y + getY(7, height));
        segmentG[4] = new Geometry.Point(x + getX(8.2, width), y + getY(7.5, height));
        segmentG[5] = new Geometry.Point(x + getX(2.9, width), y + getY(7.5, height));
        //Segment DP
        // Draw Segments Outline
        this.fillStyle = outlineColor.toARGBString();
        this.strokeStyle = outlineColor.toARGBString();
        this.drawPolygon(segmentA);
        this.drawPolygon(segmentB);
        this.drawPolygon(segmentC);
        this.drawPolygon(segmentD);
        this.drawPolygon(segmentE);
        this.drawPolygon(segmentF);
        this.drawPolygon(segmentG);
        // Fill Segments
        this.fillStyle = fillColor.toARGBString();
        this.strokeStyle = fillColor.toARGBString();
        //Fill SegmentA
        if([0,2,3,5,6,7,8,9].indexOf(value) > -1) this.drawPolygon(segmentA);
        //Fill SegmentB
        if([0,1,2,3,4,7,8,9].indexOf(value) > -1) this.drawPolygon(segmentB);
        //Fill SegmentC
        if([0,1,3,4,5,6,7,8,9].indexOf(value) > -1) this.drawPolygon(segmentC);
        //Fill SegmentD
        if([0,2,3,5,6,8,9].indexOf(value) > -1) this.drawPolygon(segmentD);
        //Fill SegmentE
        if([0,2,6,8].indexOf(value) > -1) this.drawPolygon(segmentE);
        //Fill SegmentF
        if([0,4,5,6,7,8,9].indexOf(value) > -1) this.drawPolygon(segmentF);
        //Fill SegmentG
        if([2,3,4,5,6,8,9,-1].indexOf(value) > -1) this.drawPolygon(segmentG);
    };
    CanvasRenderingContext2D.prototype.drawReflection = function(canvas,object) {
        var h = (object._owner.height * object.length), c, ctx;
        var Tools = require("tools");
        c = Tools.newCanvas();
        c.width = object._owner.width;
        c.height = h;
        ctx = c.getContext("2d");
        ctx.save();
        ctx.translate(0,object._owner.height - 1);
        ctx.scale(1,-1);
        ctx.drawImage(canvas,0,0);
        ctx.restore();
        ctx.globalCompositeOperation = Types.CANVAS.GLOBALCOMPOSITEOPERATIONS.DESTINATIONOUT;
        var gradient = ctx.createLinearGradient(0,0,0,h);
        gradient.addColorStop(1,"white");
        gradient.addColorStop(0,"rgba(255,255,255," + object.opacity + ")");
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,object._owner.width,h * 2);
        this.drawImage(c,0,object._owner.height + object.offset);
    };
    CanvasRenderingContext2D.prototype.setMatrix = function (mat) {
        var Geometry = require("geometry");
        if (!(mat instanceof Geometry.Matrix)) return;
        this.setTransform(mat.m11,mat.m12,mat.m21,mat.m22,mat.m31,mat.m32);
    };
    CanvasRenderingContext2D.prototype._restore = CanvasRenderingContext2D.prototype.restore;
    CanvasRenderingContext2D.prototype.restore = function() {
        Core.numRestore++;
        this._restore();
        this.borderWidth = this.lineWidth;
    };
    CanvasRenderingContext2D.prototype._save = CanvasRenderingContext2D.prototype.save;
    CanvasRenderingContext2D.prototype.save = function() {
        Core.numSave++;
        this._save();
    };
    CanvasRenderingContext2D.prototype.floodFill = function(x,y,color) {
        // if values are not set just exit
        if(!x || !y || !color) { return true; }

        var width = this.canvas.width,
            height = this.canvas.height,
            image = this.getImageData(0,0,width,height),
            imageData = image.data,
            pixelStack = [[x,y]],
            px1,newPos,pixelPos,reachLeft,reachRight,colorTemp;

        function _getPixel(pixelPos) {
            return { r: imageData[pixelPos],g: imageData[pixelPos + 1],b: imageData[pixelPos + 2],a: imageData[pixelPos + 3] };
        }

        function _setPixel(pixelPos) {
            imageData[pixelPos] = color.r;
            imageData[pixelPos + 1] = color.g;
            imageData[pixelPos + 2] = color.b;
            imageData[pixelPos + 3] = color.a;
        }

        function _comparePixel(px2) {
            return (px1.r === px2.r && px1.g === px2.g && px1.b === px2.b && px1.a === px2.a);
        }

        // get pixel at x/y position
        px1 = _getPixel(((y * width) + x) * 4);

        // quick way to get formatted rgba color
        colorTemp = this.canvas.style.color;
        this.canvas.style.color = color;
        color = this.canvas.style.color.match(/^rgba?\((.*)\);?$/)[1].split(",");
        this.canvas.style.color = colorTemp;

        color = {
            r: parseInt(color[0],10),
            g: parseInt(color[1],10),
            b: parseInt(color[2],10),
            a: parseInt(color[3] || 255,10)
        };

        // if pixel and color the same do nothing
        if(_comparePixel(color)) { return true; }

        while(pixelStack.length) {
            newPos = pixelStack.pop();

            pixelPos = (newPos[1] * width + newPos[0]) * 4;
            while(newPos[1]-- >= 0 && _comparePixel(_getPixel(pixelPos))) {
                pixelPos -= width * 4;
            }

            pixelPos += width * 4;
            ++newPos[1];
            reachLeft = false;
            reachRight = false;

            while(newPos[1]++ < height - 1 && _comparePixel(_getPixel(pixelPos))) {
                _setPixel(pixelPos);

                if(newPos[0] > 0) {
                    if(_comparePixel(_getPixel(pixelPos - 4))) {
                        if(!reachLeft) {
                            pixelStack.push([newPos[0] - 1,newPos[1]]);
                            reachLeft = true;
                        }
                    }
                    else if(reachLeft) {
                        reachLeft = false;
                    }
                }

                if(newPos[0] < width - 1) {
                    if(_comparePixel(_getPixel(pixelPos + 4))) {
                        if(!reachRight) {
                            pixelStack.push([newPos[0] + 1,newPos[1]]);
                            reachRight = true;
                        }
                    }
                    else if(reachRight) {
                        reachRight = false;
                    }
                }

                pixelPos += width * 4;
            }
        }

        this.putImageData(image,0,0);
    };
    CanvasRenderingContext2D.prototype.drawStar = function(r,comp,clip) {
        var w2,h2;
        if(!comp.borderDash) comp.borderDash = Types.CANVAS.STROKEDASHS.SOLID;
        if(this.useNativeDash && comp.borderDash) this.setDash(comp.borderDash);
        w2 = r.width / 2;
        h2 = r.height / 2;
        this.beginPath();
        this.moveTo(w2,0);
        this.lineTo(r.width * 0.375,r.height * 0.4);
        this.lineTo(r.left,r.height * 0.4);
        this.lineTo(r.width * 0.3,r.height * 0.625);
        this.lineTo(r.width * 0.2,r.height);
        this.lineTo(r.width * 0.5,r.height * 0.725);
        this.lineTo(r.width * 0.8,r.height);
        this.lineTo(r.width * 0.7,r.height * 0.625);
        this.lineTo(r.width,r.height * 0.4);
        this.lineTo(r.width * 0.625,r.height * 0.4);
        this.lineTo(r.width * 0.5,r.top);
        this.closePath();
        if(!clip) {
            this.fill();
            this.stroke();
        } else this.clip();
    };
    CanvasRenderingContext2D.prototype.drawTrapezoid = function(r,comp,clip) {
        if(!comp.borderDash) comp.borderDash = Types.CANVAS.STROKEDASHS.SOLID;
        if(this.useNativeDash && comp.borderDash) this.setDash(comp.borderDash);
        this.beginPath();
        this.moveTo(r.width * 0.2,r.top);
        this.lineTo(r.top,r.height);
        this.lineTo(r.width,r.height);
        this.lineTo(r.width * 0.8,r.top);
        this.lineTo(r.width * 0.3,r.top);
        this.closePath();
        if(!clip) {
            this.fill();
            this.stroke();
        } else this.clip();
    };
    CanvasRenderingContext2D.prototype.drawParallelogram = function(r,comp,clip) {
        if(!comp.borderDash) comp.borderDash = Types.CANVAS.STROKEDASHS.SOLID;
        if(this.useNativeDash && comp.borderDash) this.setDash(comp.borderDash);
        this.beginPath();
        this.moveTo(r.width * 0.3,r.top);
        this.lineTo(r.left,r.height);
        this.lineTo(r.width * 0.7,r.height);
        this.lineTo(r.width,r.top);
        this.lineTo(r.width * 0.3,r.top);
        this.closePath();
        if(!clip) {
            this.fill();
            this.stroke();
        } else this.clip();
    };
    CanvasRenderingContext2D.prototype.drawNinjaStar = function(r,comp,clip) {
        if(!comp.borderDash) comp.borderDash = Types.CANVAS.STROKEDASHS.SOLID;
        if(this.useNativeDash && comp.borderDash) this.setDash(comp.borderDash);
        this.beginPath();
        this.moveTo(r.width * 0.5,r.top);
        this.lineTo(r.width * 0.35,r.height * 0.35);
        this.lineTo(r.left,r.height * 0.5);
        this.lineTo(r.width * 0.35,r.height * 0.65);
        this.lineTo(r.width * 0.5,r.height);
        this.lineTo(r.width * 0.65,r.height * 0.65);
        this.lineTo(r.width,r.height * 0.5);
        this.lineTo(r.width * 0.65,r.height * 0.35);
        this.lineTo(r.width * 0.5,r.top);
        this.closePath();
        if(!clip) {
            this.fill();
            this.stroke();
        } else this.clip();
    };
    CanvasRenderingContext2D.prototype.drawRegularPolygon = function(r,comp,clip) {
        var w2,h2,size,i;
        if(!comp.borderDash) comp.borderDash = Types.CANVAS.STROKEDASHS.SOLID;
        if(this.useNativeDash && comp.borderDash) this.setDash(comp.borderDash);
        w2 = r.width / 2;
        h2 = r.height / 2;
        size = (comp.width > comp.height ? comp.height : comp.width) / 2;
        this.beginPath();
        this.moveTo(w2 + size * Core.cos(0),h2 + size * Core.sin(0));
        for(i = 1;i <= comp.numberOfSides;i++) {
            this.lineTo(w2 + size * Core.cos(i * 2 * Math.PI / comp.numberOfSides),h2 + size * Core.sin(i * 2 * Math.PI / comp.numberOfSides));
        }
        if(!clip) {
            this.fill();
            this.stroke();
        } else this.clip();
    };
    CanvasRenderingContext2D.prototype.drawSpark = function(data) {
        var type;
        if(!data) return;
        if(data.values.length === 0) return;
        type = data.type;
        if(!type) type = Types.CANVAS.SPARKLINESTYPES.LINE;
        this.save();
        this.translate(0.5,0.5);
        switch(type) {
            case Types.CANVAS.SPARKTYPES.LINE:
                this.drawSparkLine(data);
                break;
            case Types.CANVAS.SPARKTYPES.BAR:
                this.translate(-0.5,-0.5);
                this.drawSparkBar(data);
                break;
            case Types.CANVAS.SPARKTYPES.PIE:
                this.drawSparkPie(data);
                break;
            case Types.CANVAS.SPARKTYPES.BOXPLOT:
                this.drawSparkBoxPlot(data);
                break;
        }
        this.restore();
    };
    CanvasRenderingContext2D.prototype.drawSparkLine = function(data) {
        var color,minColor,maxColor,height,width,i = 0,l,maxy,miny,maxx,minx,y,x,rangex,rangey,xvalues = [],yvalues = [],path = [],filledColor;
        color = data.color;
        minColor = data.minColor;
        maxColor = data.maxColor;
        filledColor = data.filledColor;
        if(!color) color = "black";
        if(!minColor) minColor = "black";
        if(!maxColor) maxColor = "black";
        height = this.canvas.height;
        width = this.canvas.width;
        l = data.values.length;
        for(;i < l;i++) {
            xvalues.push(i);
            yvalues.push(~~data.values[i]);
        }
        maxy = Math.max.apply(Math,yvalues);
        miny = Math.min.apply(Math,yvalues);
        maxx = Math.max.apply(Math,xvalues);
        minx = Math.min.apply(Math,xvalues);
        rangex = maxx - minx === 0 ? 1 : maxx - minx;
        rangey = maxy - miny === 0 ? 1 : maxy - miny;
        yvallast = yvalues.length - 1;
        height -= 3;
        for(i = 0;i < l;i++) {
            x = xvalues[i];
            y = yvalues[i];
            xpos = 2 + Core.round((x - minx) * (width / rangex));
            if(y < miny) y = miny;
            if(y > maxy) y = maxy;
            if(path.length === 0) {
                path.push({ "x": xpos,"y": height + 2 });
            }
            path.push({ "x": xpos,"y": 2 + Core.round(height - (height * ((y - miny) / rangey))) });
        }
        if(path.length > 2) {
            path[0] = { "x": path[0].x,"y": path[1].y };
        }
        l = path.length;
        if(filledColor) {
            this.fillStyle = filledColor;
            this.beginPath();
            this.moveTo(path[path.length - 1].x,path[path.length - 1].y);
            this.lineTo(path[path.length - 1].x,height + 2);
            this.lineTo(0,height + 2);
            this.lineTo(0,path[0].y);
            for(i = 0;i < l;i++) {
                this.lineTo(path[i].x,path[i].y);
            }
            this.fill();
        }
        this.strokeStyle = color;
        this.beginPath();
        this.moveTo(path[0].x,path[0].y);
        for(i = 1;i < l;i++) {
            this.lineTo(path[i].x,path[i].y);
        }
        this.stroke();
    };
    CanvasRenderingContext2D.prototype.drawSparkBar = function(data) {
        var height,width,l,max,min,yOrg,barWidth,minColor,maxColor,offset = 0;
        minColor = data.minColor;
        maxColor = data.maxColor;
        height = this.canvas.height;
        width = this.canvas.width;
        l = data.values.length;
        max = Math.max.apply(Math,data.values);
        min = Math.min.apply(Math,data.values);
        barWidth = ~~((width - l) / l);
        offset = ~~((width - (barWidth * l) - (l - 1)) / 2)
        rangeHeight = height / (max - min);
        if(min < 0) {
            yOrg = ~~(max * rangeHeight);
        } else yOrg = height;
        i = 0;
        x = 0;
        this.translate(offset,0);
        for(;i < l;i++) {
            if(data.values[i] >= 0) this.fillStyle = maxColor;
            else this.fillStyle = minColor;
            y = ~~(data.values[i] * rangeHeight);
            if(yOrg < height) {
                if(data.values[i] < 0) this.fillRect(x,yOrg,barWidth,Core.abs(y));
                else this.fillRect(x,yOrg - y,barWidth,y);
            } else {
                this.fillRect(x,height - y,barWidth,y);
            }
            x += barWidth + 1;
        }
    };
    CanvasRenderingContext2D.prototype.drawSparkPie = function(data) {
        var height,width,l,circle,radius,next,total,end,start,colors;
        colors = data.colors;
        colors = colors.split(",");
        height = this.canvas.height;
        width = this.canvas.width;
        l = data.values.length;
        radius = Math.floor(Math.min(width,height - 1) / 2);
        circle = 2 * Math.PI;
        next = 0;
        total = i = 0;
        for(;i < l;i++) total += data.values[i];
        this.translate(~~((width - radius) / 2),0);
        for(i = l;i--;) {
            if(data.values[i] !== 0) {
                for(x = 0;x < l;x++) {
                    start = next;
                    end = next;
                    if(total > 0) {
                        end = next + (circle * (data.values[x] / total));
                    }
                    if(x === i) {
                        this.fillStyle = colors[x % colors.length];
                        this.beginPath();
                        this.moveTo(radius,radius);
                        this.arc(radius,radius,radius,start,end,false);
                        this.lineTo(radius,radius);
                        this.closePath();
                        this.fill();
                    }
                    next = end;
                }
            }
        }
    };
    CanvasRenderingContext2D.prototype.drawSparkBoxPlot = function(data) {
        var height,width,l,loutlier,lwhisker,q1,q2,q3,rwhisker,routlier,iqr,left = 0,unitSize,size,minValue,maxValue,quartile = function(values,q) {
            var vl;
            if(q === 2) {
                vl = Core.floor(values.length / 2);
                return values.length % 2 ? values[vl] : (values[vl - 1] + values[vl]) / 2;
            } else {
                if(values.length % 2) { // odd
                    vl = (values.length * q + q) / 4;
                    return vl % 1 ? (values[Core.floor(vl)] + values[Core.floor(vl) - 1]) / 2 : values[vl - 1];
                } else { //even
                    vl = (values.length * q + 2) / 4;
                    return vl % 1 ? (values[Core.floor(vl)] + values[Core.floor(vl) - 1]) / 2 : values[vl - 1];
                }
            }
        };
        minValue = !data.chartRangeMin ? Math.min.apply(Math,data.values) : data.chartRangeMin;
        maxValue = !data.chartRangeMax ? Math.max.apply(Math,data.values) : data.chartRangeMax;
        if(!data.boxLineColor) data.boxLineColor = "black";
        if(!data.boxFillColor) data.boxFillColor = "#C0D0F0";
        if(!data.whiskerColor) data.whiskerColor = "black";
        if(!data.outlierLineColor) data.outlierLineColor = "#303030";
        if(!data.outlierFillColor) data.outlierFillColor = "#F0F0F0";
        if(!data.medianColor) data.medianColor = "red";
        if(!data.targetColor) data.targetColor = "#40A020";
        if(!data.spotRadius) data.spotRadius = 1.5;
        if(!data.outlierIQR) data.outlierIQR = 1.5;
        if(!data.raw) data.raw = false;
        if(!data.showOutliers) data.showOutliers = false;
        height = this.canvas.height;
        width = this.canvas.width;
        l = data.values.length;
        if(data.raw) {
            if(data.showOutliers && data.values.length > 5) {
                loutlier = data.values[0];
                lwhisker = data.values[1];
                q1 = data.values[2];
                q2 = data.values[3];
                q3 = data.values[4];
                rwhisker = data.values[5];
                routlier = data.values[6];
            } else {
                lwhisker = data.values[0];
                q1 = data.values[1];
                q2 = data.values[2];
                q3 = data.values[3];
                rwhisker = data.values[4];
            }
        } else {
            data.values.sort(function(a,b) { return a - b; });
            q1 = quartile(data.values,1);
            q2 = quartile(data.values,2);
            q3 = quartile(data.values,3);
            iqr = q3 - q1;
            if(data.showOutliers) {
                lwhisker = rwhisker = null;
                for(i = 0;i < l;i++) {
                    if(!lwhisker && data.values[i] > q1 - (iqr * data.outlierIQR)) {
                        lwhisker = data.values[i];
                    }
                    if(data.values[i] < q3 + (iqr * data.outlierIQR)) {
                        rwhisker = data.values[i];
                    }
                }
                loutlier = data.values[0];
                routlier = data.values[l - 1];
            } else {
                lwhisker = data.values[0];
                rwhisker = data.values[l - 1];
            }
        }
        unitSize = width / (maxValue - minValue + 1);
        if(data.showOutliers) {
            left = Core.ceil(data.spotRadius);
            width -= 2 * Core.ceil(data.spotRadius);
            unitSize = width / (maxValue - minValue + 1);
            if(loutlier < lwhisker) {
                this.strokeStyle = data.outlierLineColor;
                this.fillStyle = data.outlierFillColor;
                this.beginPath();
                this.arc((loutlier - minValue) * unitSize + left,height / 2,data.spotRadius,0,Math.PI * 2,true);
                this.fill();
                this.stroke();
            }
            if(routlier > rwhisker) {
                this.strokeStyle = data.outlierLineColor;
                this.fillStyle = data.outlierFillColor;
                this.beginPath();
                this.arc((routlier - minValue) * unitSize + left,height / 2,data.spotRadius,0,Math.PI * 2,true);
                this.fill();
                this.stroke();
            }
        }

        // box
        this.strokeStyle = data.boxLineColor;
        this.fillStyle = data.boxFillColor;
        this.fillRect(Core.round((q1 - minValue) * unitSize + left),Core.round(height * 0.1),Core.round((q3 - q1) * unitSize),Core.round(height * 0.8));
        this.strokeRect(Core.round((q1 - minValue) * unitSize + left),Core.round(height * 0.1),Core.round((q3 - q1) * unitSize),Core.round(height * 0.8));
        // left whisker
        this.strokeStyle = data.lineColor;
        this.beginPath();
        this.moveTo(~~((lwhisker - minValue) * unitSize + left),~~(height / 2));
        this.lineTo(~~((q1 - minValue) * unitSize + left),~~(height / 2));
        this.stroke();
        this.strokeStyle = data.whiskerColor;
        this.beginPath();
        this.moveTo(~~((lwhisker - minValue) * unitSize + left),~~(height / 4));
        this.lineTo(~~((lwhisker - minValue) * unitSize + left),~~(height - height / 4));
        this.stroke();
        // right whisker
        this.strokeStyle = data.lineColor;
        this.beginPath();
        this.moveTo(~~((rwhisker - minValue) * unitSize + left),~~(height / 2));
        this.lineTo(~~((q3 - minValue) * unitSize + left),~~(height / 2));
        this.stroke();
        this.strokeStyle = data.whiskerColor;
        this.beginPath();
        this.moveTo(~~((rwhisker - minValue) * unitSize + left),~~(height / 4));
        this.lineTo(~~((rwhisker - minValue) * unitSize + left),~~(height - height / 4));
        this.stroke();
        // median line
        this.strokeStyle = data.medianColor;
        this.beginPath();
        this.moveTo(~~((q2 - minValue) * unitSize + left),~~(height * 0.1));
        this.lineTo(~~((q2 - minValue) * unitSize + left),~~(height * 0.9));
        this.stroke();
        if(data.target) {
            size = Math.ceil(data.spotRadius);
            this.strokeStyle = data.targetColor;
            this.beginPath();
            this.moveTo(~~((data.target - minValue) * unitSize + left),~~((height / 2) - size));
            this.lineTo(~~((data.target - minValue) * unitSize + left),~~((height / 2) + size));
            this.stroke();
            this.strokeStyle = data.targetColor;
            this.beginPath();
            this.moveTo(~~((data.target - minValue) * unitSize + left - size),~~(height / 2));
            this.lineTo(~~((data.target - minValue) * unitSize + left + size),~~(height / 2));
            this.stroke();
        }
    };
    //CanvasRenderingContext2D.prototype.filtersStack = [];
    //CanvasRenderingContext2D.prototype.filters = {};
    /*
     * dst,x,y,width,height,filterUnits,primitiveUnits
     */
    var filter = function(options) {
        // Blend => ok
        // colorMatrix => ok
        // componentTransfer => ok
        // composite => ok
        // convolveMatrix => nok
        // diffuseLighting => nok
        // displacementMap => ok
        // flood => ok
        // gaussianBlur => ok
        // image => ok
        // merge => nok
        // mergeNode => nok
        // morphology => ok
        // offset => ok
        // specularLighting => nok
        // tile => ok
        // turbulence => nok
        if(!options.dst) return;
        if(!(options.dst instanceof HTMLCanvasElement)) {
            throw "The source must be a HTMLCanvasElement";
        }
        this.filtersStack = [];
        this.destination = { source: options.dst };
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width;
        this.height = options.height;
        this.results = [];
        if(!this.width || !this.height) {
            if(options.dst instanceof HTMLImageElement) {
                this.width = options.dst.naturalWidth;
                this.height = options.dst.naturalHeight;
            } else if(options.dst instanceof HTMLCanvasElement) {
                this.width = options.dst.width;
                this.height = options.dst.height;
            }
        }
        this.filterUnits = options.filterUnits;
        this.primitiveUnits = options.primitiveUnits;
        this.buffer = document.createElement("canvas");
        this.ctx = this.buffer.getContext("2d");
        this.ctx.resize(this.width,this.height);
        this.getSource = function(sourceName) {
            var a = this.results.filter(function(el,idx,array) {
                return el.name === sourceName;
            });
            if(a.length > 0) {
                return a.first();
            } else return null;
        }
        this._apply = function(buffer) {
            var ctxDst = this.destination.source.getContext("2d");
            ctxDst.save();
            ctxDst.beginPath();
            ctxDst.rect(this.x,this.y,this.width,this.height);
            ctxDst.clip();
            ctxDst.drawImage(buffer,this.x,this.y);
            ctxDst.restore();
        };
        this.moveTo = function(x,y) {
            x = x | 0;
            y = y | 0;
            this.x = x;
            this.y = y;
        };
        this.translate = function(x,y) {
            x = x | 0;
            y = y | 0;
            this.x += x;
            this.y += y;
        };
        this.unPremultiply = function(imgDatas) {
            var i = 0,len,datas,a,r,g,b;
            datas = imgDatas.data;
            len = datas.length;
            while(i < len) {
                a = datas[i + _const.channelMap.A];
                datas[i + _const.channelMap.R] = datas[i + _const.channelMap.R] * 255 / a;
                datas[i + _const.channelMap.G] = datas[i + _const.channelMap.G] * 255 / a;
                datas[i + _const.channelMap.B] = datas[i + _const.channelMap.B] * 255 / a;
                i += 4;
            }
        }
        this.premultiply = function(imgDatas) {
            var i = 0,len,datas,a,r,g,b;
            datas = imgDatas.data;
            len = datas.length;
            while(i < len) {
                a = datas[i + _const.channelMap.A];
                datas[i + _const.channelMap.R] = datas[i + _const.channelMap.R] * a / 255;
                datas[i + _const.channelMap.G] = datas[i + _const.channelMap.G] * a / 255;
                datas[i + _const.channelMap.B] = datas[i + _const.channelMap.B] * a / 255;
                i += 4;
            }
        }
        this.lighting = function(options,isDiffuseLighting) {
            const cPixelSize = 4;
            const cAlphaChannelOffset = _const.channelMap.A;
            const cOpaqueAlpha = 255;
            const cFactor1div2 = -1 / 2;
            const cFactor1div3 = -1 / 3;
            const cFactor1div4 = -1 / 4;
            const cFactor2div3 = -2 / 3;
            var // variables for PointLigth/DistantLight and SpotLight
                m_position,m_direction,m_limitingConeAngle,m_azimuth,m_elevation,
                data = {},buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d"),
                srcImgDatas,srcDatas,
                initPaintingData = function(options,paintingData) {
                    var antiAliasTreshold = 0.016,limitingConeAngle;
                    switch(options.type) {
                        case Types.CANVAS.ligthTypes.SPOT:
                            if(!options.x) options.x = 0;
                            if(!options.y) options.y = 0;
                            if(!options.z) options.z = 0;
                            if(!options.pointsAtX) options.pointsAtX = 0;
                            if(!options.pointsAtY) options.pointsAtY = 0;
                            if(!options.pointsAtZ) options.pointsAtZ = 0;
                            if(!options.specularExponent) options.specularExponent = 0;
                            if(!options.limitingConeAngle) options.limitingConeAngle = 0;
                            m_position.setValues(options.x,options.y,options.z);
                            m_direction.setValues(options.pointsAtX,options.pointsAtY,options.pointsAtZ);
                            m_limitingConeAngle = options.limitingConeAngle;
                            paintingData.privateColorVector = paintingData.colorVector;
                            paintingData.directionVector.setValues(
                                pointsAtX - x,
                                pointsAtY - y,
                                pointsAtZ - z);
                            paintingData.directionVector.normalize();
                            if(options.limitingConeAngle === 0) {
                                paintingData.coneCutOffLimit = 0;
                                paintingData.coneFullLight = -antiAliasTreshold;
                            } else {
                                limitingConeAngle = options.limitingConeAngle;
                                if(limitingConeAngle < 0.0) limitingConeAngle = -limitingConeAngle;
                                if(limitingConeAngle > 90.0) limitingConeAngle = 90.0;
                                paintingData.coneCutOffLimit = Core.cos(_conv.deg2Rad(180 - limitingConeAngle));
                                paintingData.coneFullLight = paintingData.coneCutOffLimit - antiAliasTreshold;
                            }
                            // Optimization for common specularExponent values
                            if(options.specularExponent == 1.0) paintingData.specularExponent = 1;
                            else // It is neither 0.0f nor 1.0f
                                paintingData.specularExponent = 2;
                            break;
                        case Types.CANVAS.ligthTypes.DISTANT:
                            if(!options.azimuth) options.azimuth = 0;
                            if(!options.elevation) options.elevation = 0;
                            paintingData.lightVector.setValues(
                                Core.cos(options.azimuth) * Core.cos(options.elevation),
                                Core.sin(options.azimuth) * Core.cos(options.elevation),
                                Core.sin(elevation));
                            paintingData.lightVectorLength = 1;
                            m_azimuth = options.azimuth;
                            m_elevation = options.elevation;
                            break;
                    }
                },
                updatePaintingData = function(paintingData,x,y,z) {
                    var cosineOfAngle,lightStrength;
                    switch(options.lightSource.type) {
                        case Types.CANVAS.ligthTypes.SPOT:
                            paintingData.lightVector.setValues(m_position.x - x,m_position.y - y,m_position.z - z);
                            paintingData.lightVectorLength = paintingData.lightVector.length();

                            cosineOfAngle = (paintingData.lightVector * paintingData.directionVector) / paintingData.lightVectorLength;
                            if(cosineOfAngle > paintingData.coneCutOffLimit) {
                                // No light is produced, scanlines are not updated
                                paintingData.colorVector.setValues(0,0,0);
                                return;
                            }
                            // Set the color of the pixel
                            switch(options.specularExponent) {
                                case 0:
                                    lightStrength = 1; // -cosineOfAngle ^ 0 == 1
                                    break;
                                case 1:
                                    lightStrength = -cosineOfAngle; // -cosineOfAngle ^ 1 == -cosineOfAngle
                                    break;
                                default:
                                    lightStrength = Core.pow(-cosineOfAngle,options.specularExponent);
                                    break;
                            }

                            if(cosineOfAngle > paintingData.coneFullLight)
                                lightStrength *= (paintingData.coneCutOffLimit - cosineOfAngle) / (paintingData.coneCutOffLimit - paintingData.coneFullLight);

                            if(lightStrength > 1) lightStrength = 1;

                            paintingData.colorVector.setValues(paintingData.privateColorVector.x * lightStrength,
                                paintingData.privateColorVector.y * lightStrength,
                                paintingData.privateColorVector.z * lightStrength);

                            break;
                        case Types.CANVAS.ligthTypes.POINT:
                            paintingData.lightVector.setValues(m_position.x - x,m_position.y - y,m_position.z - z);
                            paintingData.lightVectorLength = paintingData.lightVector.length();
                            break;
                        case Types.CANVAS.ligthTypes.DISTANT:
                            break;
                    }
                },
                topLeft = function(offset,normalVector,data) {
                    var center = data.pixels[offset + cAlphaChannelOffset];
                    var right = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    offset += data.widthMultipliedByPixelSize;
                    var bottom = data.pixels[offset + cAlphaChannelOffset];
                    var bottomRight = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    normalVector.x = -(center << 1) + (right << 1) - bottom + bottomRight;
                    normalVector.y = -(center << 1) - right + (bottom << 1) + bottomRight;
                },
                topRow = function(offset,normalVector,data) {
                    var left = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var center = data.pixels[offset + cAlphaChannelOffset];
                    var right = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    offset += data.widthMultipliedByPixelSize;
                    var bottomLeft = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var bottom = data.pixels[offset + cAlphaChannelOffset];
                    var bottomRight = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    normalVector.x = -(left << 1) + (right << 1) - bottomLeft + bottomRight;
                    normalVector.y = -left - (center << 1) - right + bottomLeft + (bottom << 1) + bottomRight;
                },
                topRight = function(offset,normalVector,data) {
                    var left = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var center = data.pixels[offset + cAlphaChannelOffset];
                    offset += data.widthMultipliedByPixelSize;
                    var bottomLeft = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var bottom = data.pixels[offset + cAlphaChannelOffset];
                    normalVector.x = -(left << 1) + (center << 1) - bottomLeft + bottom;
                    normalVector.y = -left - (center << 1) + bottomLeft + (bottom << 1);
                },
                leftColumn = function(offset,normalVector,data) {
                    var center = data.pixels[offset + cAlphaChannelOffset];
                    var right = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    offset -= data.widthMultipliedByPixelSize;
                    var top = data.pixels[offset + cAlphaChannelOffset];
                    var topRight = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    offset += data.widthMultipliedByPixelSize << 1;
                    var bottom = data.pixels[offset + cAlphaChannelOffset];
                    var bottomRight = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    normalVector.x = -top + topRight - (center << 1) + (right << 1) - bottom + bottomRight;
                    normalVector.y = -(top << 1) - topRight + (bottom << 1) + bottomRight;
                },
                interior = function(offset,normalVector,data) {
                    var left = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var right = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    offset -= data.widthMultipliedByPixelSize;
                    var topLeft = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var top = data.pixels[offset + cAlphaChannelOffset];
                    var topRight = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    offset += data.widthMultipliedByPixelSize << 1;
                    var bottomLeft = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var bottom = data.pixels[offset + cAlphaChannelOffset];
                    var bottomRight = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    normalVector.x = -topLeft + topRight - (left << 1) + (right << 1) - bottomLeft + bottomRight;
                    normalVector.y = -topLeft - (top << 1) - topRight + bottomLeft + (bottom << 1) + bottomRight;
                },
                rightColumn = function(offset,normalVector,data) {
                    var left = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var center = data.pixels[offset + cAlphaChannelOffset];
                    offset -= data.widthMultipliedByPixelSize;
                    var topLeft = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var top = data.pixels[offset + cAlphaChannelOffset];
                    offset += data.widthMultipliedByPixelSize << 1;
                    var bottomLeft = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var bottom = data.pixels[offset + cAlphaChannelOffset];
                    normalVector.x = -topLeft + top - (left << 1) + (center << 1) - bottomLeft + bottom;
                    normalVector.y = -topLeft - (top << 1) + bottomLeft + (bottom << 1);
                },
                bottomLeft = function(offset,normalVector,data) {
                    var center = data.pixels[offset + cAlphaChannelOffset];
                    var right = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    offset -= data.widthMultipliedByPixelSize;
                    var top = data.pixels[offset + cAlphaChannelOffset];
                    var topRight = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    normalVector.x = -top + topRight - (center << 1) + (right << 1);
                    normalVector.y = -(top << 1) - topRight + (center << 1) + right;
                },
                bottomRow = function(offset,normalVector,data) {
                    var left = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var center = data.pixels[offset + cAlphaChannelOffset];
                    var right = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    offset -= data.widthMultipliedByPixelSize;
                    var topLeft = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var top = data.pixels[offset + cAlphaChannelOffset];
                    var topRight = data.pixels[offset + cPixelSize + cAlphaChannelOffset];
                    normalVector.x = -topLeft + topRight - (left << 1) + (right << 1);
                    normalVector.y = -topLeft - (top << 1) - topRight + left + (center << 1) + right;
                },
                bottomRight = function(offset,normalVector,data) {
                    var left = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var center = data.pixels[offset + cAlphaChannelOffset];
                    offset -= data.widthMultipliedByPixelSize;
                    var topLeft = data.pixels[offset - cPixelSize + cAlphaChannelOffset];
                    var top = data.pixels[offset + cAlphaChannelOffset];
                    normalVector.x = -topLeft + top - (left << 1) + (center << 1);
                    normalVector.y = -topLeft - (top << 1) + left + (center << 1);
                },
                drawLighting = function(pixels,width,height) {
                    var paintingData,normalVector,offset = 0,x,y,lastPixel,i,r,g,b;

                    if(!options.lightSource) return false;
                    if(!options.surfaceScale) options.surfaceScale = 1;
                    if(!options.diffuseConstant) options.diffuseConstant = 1;
                    if(!options.specularConstant) options.specularConstant = 1;
                    if(!options.specularExponent) options.specularExponent = 1;
                    if(!options.kernelUnitLength) options.kernelUnitLength = [1,1];
                    else {
                        if(typeof options.kernelUnitLength === _const.STRING) {
                            if(options.kernelUnitLength.indexOf(String.SPACE) > -1) options.kernelUnitLength = options.kernelUnitLength.split(String.SPACE);
                            else if(options.kernelUnitLength.indexOf(String.COMMA) > -1) options.kernelUnitLength = options.kernelUnitLength.split(String.COMMA);
                        } else options.kernelUnitLength = [options.kernelUnitLength,options.kernelUnitLength];
                    }
                    //
                    //// FIXME: do something if width or height (or both) is 1 pixel.
                    //// The W3 spec does not define this case. Now the filter just returns.
                    if(width <= 2 || height <= 2) return false;

                    paintingData = {
                        // SVGFELighting also use them
                        lightVector: new Core.classes.Vector(),
                        colorVector: new Core.classes.Vector(),
                        lightVectorLength: 0,
                        // Private members
                        directionVector: new Core.classes.Vector(),
                        privateColorVector: new Core.classes.Vector(),
                        coneCutOffLimit: 0,
                        coneFullLight: 0
                    };
                    //
                    data.pixels = pixels;
                    data.surfaceScale = options.surfaceScale / 255;
                    data.widthMultipliedByPixelSize = width * cPixelSize;
                    data.widthDecreasedByOne = width - 1;
                    data.heightDecreasedByOne = height - 1;
                    paintingData.colorVector.setValues(options.lightingColor.red,options.lightingColor.green,options.lightingColor.blue);
                    initPaintingData(options.lightSource,paintingData);

                    normalVector = new Core.classes.Vector();

                    // Top/Left corner.
                    topLeft(offset,normalVector,data);
                    setPixel(offset,data,paintingData,0,0,cFactor2div3,cFactor2div3,normalVector);

                    // Top/Right pixel.
                    offset = data.widthMultipliedByPixelSize - cPixelSize;
                    topRight(offset,normalVector,data);
                    setPixel(offset,data,paintingData,data.widthDecreasedByOne,0,cFactor2div3,cFactor2div3,normalVector);

                    // Bottom/Left pixel.
                    offset = data.heightDecreasedByOne * data.widthMultipliedByPixelSize;
                    bottomLeft(offset,normalVector,data);
                    setPixel(offset,data,paintingData,0,data.heightDecreasedByOne,cFactor2div3,cFactor2div3,normalVector);

                    // Bottom/Right pixel.
                    offset = height * data.widthMultipliedByPixelSize - cPixelSize;
                    bottomRight(offset,normalVector,data);
                    setPixel(offset,data,paintingData,data.widthDecreasedByOne,data.heightDecreasedByOne,cFactor2div3,cFactor2div3,normalVector);

                    if(width >= 3) {
                        // Top row.
                        offset = cPixelSize;
                        for(x = 1;x < data.widthDecreasedByOne;++x,offset += cPixelSize) {
                            topRow(offset,normalVector,data);
                            setPixel(offset,data,paintingData,x,0,cFactor1div3,cFactor1div2,normalVector);
                        }
                        // Bottom row.
                        offset = data.heightDecreasedByOne * data.widthMultipliedByPixelSize + cPixelSize;
                        for(x = 1;x < data.widthDecreasedByOne;++x,offset += cPixelSize) {
                            bottomRow(offset,normalVector,data);
                            setPixel(offset,data,paintingData,x,data.heightDecreasedByOne,cFactor1div3,cFactor1div2,normalVector);
                        }
                    }

                    if(height >= 3) {
                        // Left column.
                        offset = data.widthMultipliedByPixelSize;
                        for(y = 1;y < data.heightDecreasedByOne;++y,offset += data.widthMultipliedByPixelSize) {
                            leftColumn(offset,normalVector,data);
                            setPixel(offset,data,paintingData,0,y,cFactor1div2,cFactor1div3,normalVector);
                        }
                        // Right column.
                        offset = (data.widthMultipliedByPixelSize << 1) - cPixelSize;
                        for(y = 1;y < data.heightDecreasedByOne;++y,offset += data.widthMultipliedByPixelSize) {
                            rightColumn(offset,normalVector,data);
                            setPixel(offset,data,paintingData,data.widthDecreasedByOne,y,cFactor1div2,cFactor1div3,normalVector);
                        }
                    }

                    if(width >= 3 && height >= 3) {
                        // Interior pixels.
                        platformApplyGenericPaint(data,paintingData,1,data.heightDecreasedByOne);
                    }

                    lastPixel = data.widthMultipliedByPixelSize * height;
                    if(isDiffuseLighting) {
                        for(i = cAlphaChannelOffset;i < lastPixel;i += cPixelSize)
                            pixels[i] = cOpaqueAlpha;
                    } else {
                        for(i = 0;i < lastPixel;i += cPixelSize) {
                            r = pixels[i + _const.channelMap.R];
                            g = pixels[i + _const.channelMap.G];
                            b = pixels[i + _const.channelMap.B];
                            // alpha set to set to max(a1, a2, a3)
                            pixels[i + _const.channelMap.A] = r >= g ? (r >= b ? r : b) : (g >= b ? g : b);
                        }
                    }

                    return true;
                },
                setPixel = function(offset,data,paintingData,lightX,lightY,factorX,factorY,normal2DVector) {
                    var lightStrength,halfwayVectorLength,halfwayVector,normalVector,halfwayVector,normalVectorLength,halfwayVector;
                    updatePaintingData(paintingData,lightX,lightY,data.pixels[offset + cAlphaChannelOffset] * data.surfaceScale);

                    if(normal2DVector.x === 0 && normal2DVector.y === 0) {
                        // Normal vector is (0, 0, 1). This is a quite frequent case.
                        if(isDiffuseLighting)
                            lightStrength = options.diffuseConstant * paintingData.lightVector.z / paintingData.lightVectorLength;
                        else {
                            halfwayVector = paintingData.lightVector;
                            halfwayVector.z = halfwayVector.z + paintingData.lightVectorLength;
                            halfwayVectorLength = halfwayVector.length();
                            if(options.specularExponent === 1)
                                lightStrength = options.specularConstant * halfwayVector.z / halfwayVectorLength;
                            else
                                lightStrength = options.specularConstant * Core.pow(halfwayVector.z / halfwayVectorLength,options.specularExponent);
                        }
                    } else {
                        normalVector = new Core.classes.Vector(
                            factorX * normal2DVector.x * data.surfaceScale,
                            factorY * normal2DVector.y * data.surfaceScale,
                            1);
                        normalVectorLength = normalVector.length();

                        if(isDiffuseLighting)
                            lightStrength = options.diffuseConstant * (normalVector.dot(paintingData.lightVector)) / (normalVectorLength * paintingData.lightVectorLength);
                        else {
                            halfwayVector = paintingData.lightVector;
                            halfwayVector.setZ(halfwayVector.z + paintingData.lightVectorLength);
                            halfwayVectorLength = halfwayVector.length();
                            if(options.specularExponent === 1)
                                lightStrength = options.specularConstant * (normalVector.dot(halfwayVector)) / (normalVectorLength * halfwayVectorLength);
                            else
                                lightStrength = options.specularConstant * Core.pow((normalVector.dot(halfwayVector)) / (normalVectorLength * halfwayVectorLength),options.specularExponent);
                        }
                    }

                    if(lightStrength > 1) lightStrength = 1;
                    if(lightStrength < 0) lightStrength = 0;

                    data.pixels[offset + _const.channelMap.R] = lightStrength * paintingData.colorVector.x;
                    data.pixels[offset + _const.channelMap.G] = lightStrength * paintingData.colorVector.y;
                    data.pixels[offset + _const.channelMap.B] = lightStrength * paintingData.colorVector.z;
                },
                platformApplyGenericPaint = function(data,paintingData,startY,endY) {
                    var normalVector,offset = 0,x,y;
                    normalVector = new Core.classes.Vector();
                    for(y = startY;y < endY;++y) {
                        offset = y * data.widthMultipliedByPixelSize + cPixelSize;
                        for(x = 1;x < data.widthDecreasedByOne;++x,offset += cPixelSize) {
                            interior(offset,normalVector,data);
                            setPixel(offset,data,paintingData,x,y,cFactor1div4,cFactor1div4,normalVector);
                        }
                    }
                },
                buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d"),imgDatas,
                srcBuffer = Core.tools.canvas.newCanvas(),srcCtx = srcBuffer.getContext("2d"),srcImgDatas,srcDatas;

            options.in = this.getSource(options.in);
            switch(options.lightSource.type) {
                case Types.CANVAS.ligthTypes.SPOT:
                    if(!options.lightSource.x) options.lightSource.x = 0;
                    if(!options.lightSource.y) options.lightSource.y = 0;
                    if(!options.lightSource.z) options.lightSource.z = 0;
                    if(!options.lightSource.pointsAtX) options.lightSource.pointsAtX = 0;
                    if(!options.lightSource.pointsAtY) options.lightSource.pointsAtY = 0;
                    if(!options.lightSource.pointsAtZ) options.lightSource.pointsAtZ = 0;
                    if(!options.lightSource.specularExponent) options.lightSource.specularExponent = 0;
                    if(!options.lightSource.limitingConeAngle) options.lightSource.limitingConeAngle = 0;
                    break;
                case Types.CANVAS.ligthTypes.POINT:
                    if(!options.lightSource.x) options.lightSource.x = 0;
                    else options.lightSource.x -= options.in.props.x;
                    if(!options.lightSource.y) options.lightSource.y = 0;
                    else options.lightSource.y -= options.in.props.y;
                    if(!options.lightSource.z) options.lightSource.z = 0;
                    break;
                case Types.CANVAS.ligthTypes.DISTANT:
                    if(!options.lightSource.azimuth) options.lightSource.azimuth = 0;
                    if(!options.lightSource.elevation) options.lightSource.elevation = 0;
                    break;
            }


            m_position = new Core.classes.Vector(options.lightSource.x,options.lightSource.y,options.lightSource.z);
            m_direction = new Core.classes.Vector();

            if(!options.lightSource) return false;
            if(!options.surfaceScale) options.surfaceScale = 1;
            if(!options.diffuseConstant) options.diffuseConstant = 1;
            if(!options.specularConstant) options.specularConstant = 1;
            if(!options.specularExponent) options.specularExponent = 1;
            if(options.specularExponent < 1 || options.specularExponent > 128) throw "Error in lighting";

            if(!options.kernelUnitLength) options.kernelUnitLength = [0,0];
            else {
                if(typeof options.kernelUnitLength === _const.STRING) {
                    if(options.kernelUnitLength.indexOf(String.SPACE) > -1) options.kernelUnitLength = options.kernelUnitLength.split(String.SPACE);
                    else if(options.kernelUnitLength.indexOf(String.COMMA) > -1) options.kernelUnitLength = options.kernelUnitLength.split(String.COMMA);
                } else options.kernelUnitLength = [options.kernelUnitLength,options.kernelUnitLength];
            }
            if(!options.lightingColor) options.lightingColor = Colors.WHITE;

            srcCtx.resize(this.width,this.height);
            srcCtx.fillStyle = "white";
            srcCtx.fillRect(0,0,this.width,this.height);
            srcCtx.drawImage(options.in.source,options.in.props.x + 10,options.in.props.y + 10,options.in.props.width,options.in.props.height);
            window.open(srcBuffer.toDataURL());
            srcImgDatas = srcCtx.getImageData(options.in.props.x,options.in.props.y,options.in.props.width + 20,options.in.props.height + 20);
            //this.unPremultiply(srcImgDatas);
            srcDatas = srcImgDatas.data;

            drawLighting(srcDatas,options.in.props.width + 20,options.in.props.height + 20);
            ctx.putImageData(srcImgDatas,options.in.props.x,options.in.props.y);
            if(options.result) this.results.push({ name: options.result,source: buffer,props: options });
            else this._apply(buffer);
        }
        /*
         * in, in2, mode, result, x, y, width, height
         */
        this.blend = function(options) {
            this.filtersStack.add("blend");
            var buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d");
            if(!options) {
                options = {};
            }
            if(!options.in || !options.in2) return;
            if(!options.mode || !Core.tools.valueInSet(options.mode,Types.CANVAS.globalCompositeOperations))
                options.mode = Types.CANVAS.globalCompositeOperations.NORMAL;
            options.in = this.getSource(options.in);
            options.in2 = this.getSource(options.in2);
            ctx.resize(this.width,this.height);
            ctx.save();
            ctx.drawImage(options.in.source,options.in.props.x,options.in.props.y,options.in.props.width,options.in.props.height);
            ctx.globalCompositeOperation = options.mode;
            ctx.drawImage(options.in2.source,options.in2.props.x,options.in2.props.y,options.in2.props.width,options.in2.props.height);
            ctx.restore();
            if(options.result) this.results[result] = { name: options.result,source: buffer,props: options };
            else this._apply(buffer);
        }
        /*
         * in, type, values, result, x, y, width, height
         */
        this.colorMatrix = function(options) {
            this.filtersStack.add("colorMatrix");
            var cmt = Types.CANVAS.colorMatrixTypes,buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d"),
                NUM_ENTRIES_IN_4x5_MATRIX = 20,
                identityMatrix = [1,0,0,0,0,
                                  0,1,0,0,0,
                                  0,0,1,0,0,
                                  0,0,0,1,0],
                luminanceToAlphaMatrix = [0,0,0,0,0,
                                          0,0,0,0,0,
                                          0,0,0,0,0,
                                          0.2125,0.7154,0.0721,0,0],
                colorMatrix,i = 0,j = 0,hueRotateValue,srcDatas,sourceCanvas,sourceCtx,
                len,col = [],a,r,g,b,row = 0,imgDatas;
            if(!options) {
                options = {};
            }
            if(!options.in) return;
            if(!options.type) options.type = Types.CANVAS.colorMatrixTypes.MATRIX;
            options.in = this.getSource(options.in);
            ctx.resize(this.width,this.height);
            if([cmt.MATRIX,cmt.SATURATE,cmt.HUEROTATE].indexOf(options.type) > -1 && !options.values) {
                ctx.drawImage(options.in.source,options.in.props.x,options.in.props.y,options.in.props.width,options.in.props.height);
            } else {
                switch(options.type) {
                    case cmt.MATRIX:
                        if(options.values.length !== NUM_ENTRIES_IN_4x5_MATRIX) throw "Error";
                        colorMatrix = options.values.slice(0);
                        break;
                    case cmt.SATURATE:
                        if(!options.values) throw "Error";
                        s = options.values;
                        if(s > 1 || s < 0) throw "Error";
                        colorMatrix = identityMatrix.slice(0);
                        colorMatrix[0] = 0.213 + 0.787 * s;
                        colorMatrix[1] = 0.715 - 0.715 * s;
                        colorMatrix[2] = 0.072 - 0.072 * s;

                        colorMatrix[5] = 0.213 - 0.213 * s;
                        colorMatrix[6] = 0.715 + 0.285 * s;
                        colorMatrix[7] = 0.072 - 0.072 * s;

                        colorMatrix[10] = 0.213 - 0.213 * s;
                        colorMatrix[11] = 0.715 - 0.715 * s;
                        colorMatrix[12] = 0.072 + 0.928 * s;
                        break;
                    case cmt.HUEROTATE:
                        colorMatrix = identityMatrix.slice(0);
                        if(!options.values) throw "Error";
                        hueRotateValue = options.values
                        c = Core.cos(hueRotateValue * Math.PI / 180);
                        s = Core.sin(hueRotateValue * Math.PI / 180);
                        colorMatrix[0] = 0.213 + 0.787 * c - 0.213 * s;
                        colorMatrix[1] = 0.715 - 0.715 * c - 0.715 * s;
                        colorMatrix[2] = 0.072 - 0.072 * c + 0.928 * s;

                        colorMatrix[5] = 0.213 - 0.213 * c + 0.143 * s;
                        colorMatrix[6] = 0.715 + 0.285 * c + 0.140 * s;
                        colorMatrix[7] = 0.072 - 0.072 * c - 0.283 * s;

                        colorMatrix[10] = 0.213 - 0.213 * c - 0.787 * s;
                        colorMatrix[11] = 0.715 - 0.715 * c + 0.715 * s;
                        colorMatrix[12] = 0.072 + 0.928 * c + 0.072 * s;
                        break;
                    case cmt.LUMINANCETOALPHA:
                        colorMatrix = luminanceToAlphaMatrix.slice(0);
                        break;
                    default:
                        throw "Error";
                }
                sourceCanvas = Core.tools.canvas.newCanvas();
                sourceCtx = sourceCanvas.getContext("2d");
                sourceCtx.resize(options.in.props.width,options.in.props.height);
                sourceCtx.drawImage(options.in.source,0,0,options.in.props.width,options.in.props.height);
                imgDatas = sourceCtx.getImageData(0,0,options.in.props.width,options.in.props.height);
                srcDatas = imgDatas.data
                len = srcDatas.length;

                for(;i < len;i += 4) {
                    r = srcDatas[i + _const.channelMap.R];
                    g = srcDatas[i + _const.channelMap.G];
                    b = srcDatas[i + _const.channelMap.B];
                    a = srcDatas[i + _const.channelMap.A];
                    j = row = 0;
                    for(;j < 4;j++,row += 5) {
                        col[j] =
                            r * colorMatrix[row + _const.channelMap.R] +
                            g * colorMatrix[row + _const.channelMap.G] +
                            b * colorMatrix[row + _const.channelMap.B] +
                            a * colorMatrix[row + _const.channelMap.A] +
                            255 * colorMatrix[row + 4];
                        col[j] = Core.min(Core.max(0,col[j]),255);
                        srcDatas[i + _const.channelMap.R] = col[_const.channelMap.R];
                        srcDatas[i + _const.channelMap.G] = col[_const.channelMap.G];
                        srcDatas[i + _const.channelMap.B] = col[_const.channelMap.B];
                        srcDatas[i + _const.channelMap.A] = col[_const.channelMap.A];
                    }
                }
                sourceCtx.putImageData(imgDatas,0,0);
                ctx.drawImage(sourceCanvas,options.in.props.x,options.in.props.y);
            }
            if(options.result) this.results.push({ name: options.result,source: buffer,props: options });
            else this._apply(buffer);
        }
        /*
         * in, result, x, y, width, height
         */
        this.componentTransfer = function(options) {
            var tableR = new Array(256),tableG = new Array(256),tableB = new Array(256),tableA = new Array(256),tables = [],
                buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d"),
                sourceCanvas,sourceCtx,imgDatas,srcDatas,len,i,funcs = ["funcR","funcG","funcB","funcA"],
                generateLookupTable = function(options,aTable) {
                    var type,slope,intercept,amplitude,exponent,offset,tableValues,tvLength,i,k,v1,v2,val,cmt;
                    ctt = Types.CANVAS.componentTransferTypes;
                    type = options.type;
                    slope = options.slope;
                    intercept = options.intercept;
                    amplitude = options.amplitude;
                    exponent = options.exponent;
                    offset = options.offset;
                    if(options.tableValues) {
                        tableValues = options.tableValues;
                        tvLength = tableValues.length;
                    }
                    switch(type) {
                        case Types.CANVAS.componentTransferTypes.TABLE:
                            if(tvLength <= 1) break;
                            for(i = 0;i < 256;i++) {
                                k = ~~((i * (tvLength - 1)) / 255);
                                v1 = tableValues[k];
                                v2 = tableValues[Core.min(k + 1,tvLength - 1)];
                                val = ~~(255 * (v1 + (i / 255 - k / (tvLength - 1)) * (tvLength - 1) * (v2 - v1)));
                                val = Core.min(255,val);
                                val = Core.max(0,val);
                                aTable[i] = val;
                            }
                            break;
                        case Types.CANVAS.componentTransferTypes.DISCRETE:
                            if(tvLength <= 1) break;
                            for(i = 0;i < 256;i++) {
                                k = ~~(i * tvLength) / 255;
                                k = Core.min(k,tvLength - 1);
                                v = tableValues[k];
                                val = ~~(255 * v);
                                //val = int32[0];
                                val = Core.min(255,val);
                                val = Core.max(0,val);
                                aTable[i] = val;
                            }
                            break;
                        case Types.CANVAS.componentTransferTypes.LINEAR:
                            for(i = 0;i < 256;i++) {
                                val = ~~(slope * i + 255 * intercept);
                                val = Core.min(255,val);
                                val = Core.max(0,val);
                                aTable[i] = val;
                            }
                            break;
                        case Types.CANVAS.componentTransferTypes.GAMMA:
                            for(i = 0;i < 256;i++) {
                                val = ~~(255 * (amplitude * Core.pow(i / 255,exponent) + offset));
                                val = Core.min(255,val);
                                val = Core.max(0,val);
                                aTable[i] = val;
                            }
                            break;
                        default:
                    }
                };
            this.filtersStack.add("componentTransfer");
            if(!options) {
                options = {};
            }
            if(!options.in) return;
            if(!options.funcR) {
                options.funcR = {
                    type: Types.CANVAS.componentTransferTypes.IDENTITY,
                    slope: 0,
                    intercept: 0,
                    tableValues: [0,0,0,0],
                    amplitude: 0,
                    exponent: 0,
                    offset: 0
                };
            }
            if(!options.funcG) {
                options.funcG = {
                    type: Types.CANVAS.componentTransferTypes.IDENTITY,
                    slope: 0,
                    intercept: 0,
                    tableValues: [0,0,0,0],
                    amplitude: 0,
                    exponent: 0,
                    offset: 0
                };
            }
            if(!options.funcB) {
                options.funcB = {
                    type: Types.CANVAS.componentTransferTypes.IDENTITY,
                    slope: 0,
                    intercept: 0,
                    tableValues: [0,0,0,0],
                    amplitude: 0,
                    exponent: 0,
                    offset: 0
                };
            }
            if(!options.funcA) {
                options.funcA = {
                    type: Types.CANVAS.componentTransferTypes.IDENTITY,
                    slope: 0,
                    intercept: 0,
                    tableValues: [0,0,0,0],
                    amplitude: 0,
                    exponent: 0,
                    offset: 0
                };
            }
            i = 0;
            for(;i < 256;i++) {
                tableR[i] = tableG[i] = tableB[i] = tableA[i] = i;
            }
            tables.push(tableR);
            tables.push(tableG);
            tables.push(tableB);
            tables.push(tableA);
            i = 0;
            for(;i < tables.length;i++) {
                generateLookupTable(options[funcs[i]],tables[i]);
            }
            options.in = this.getSource(options.in);
            ctx.resize(this.width,this.height);
            sourceCanvas = Core.tools.canvas.newCanvas();
            sourceCtx = sourceCanvas.getContext("2d");
            sourceCtx.resize(options.in.props.width,options.in.props.height);
            sourceCtx.drawImage(options.in.source,0,0,options.in.props.width,options.in.props.height);
            imgDatas = sourceCtx.getImageData(0,0,options.in.props.width,options.in.props.height);
            srcDatas = imgDatas.data;
            len = srcDatas.length;
            i = 0;
            for(;i < len;i += 4) {
                r = srcDatas[i + _const.channelMap.R];
                g = srcDatas[i + _const.channelMap.G];
                b = srcDatas[i + _const.channelMap.B];
                a = srcDatas[i + _const.channelMap.A];
                srcDatas[i + _const.channelMap.R] = tableR[r];
                srcDatas[i + _const.channelMap.G] = tableG[g];
                srcDatas[i + _const.channelMap.B] = tableB[b];
                srcDatas[i + _const.channelMap.A] = tableA[a];
            }
            sourceCtx.putImageData(imgDatas,0,0);
            ctx.drawImage(sourceCanvas,options.in.props.x,options.in.props.y,options.in.props.width,options.in.props.height);
            if(options.result) this.results.push({ name: options.result,source: buffer,props: options });
            else this._apply(buffer);
        }
        /*
         * in, in2, operator, k1, k2, k3, k4, result, x, y, width, height
         */
        this.composite = function(options) {
            var buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d"),ctxDst,b1,b2,ctxB1,ctxB2,w,h,x,y,v,
                imgDatas,datas,buf,buf8,imgDatasB1,datasB1,bufB1,buf8B1,imgDatasB2,datasB2,bufB2,buf8B2,ctxt = this,
                _arithmetic = function(options,ctx) {
                    var b1,ctxB1,w,h,x,y,v,imgDatas,datas,imgDatasB1,datasB1,b2,ctxB2,imgDatasB2,datasB2;
                    b1 = document.createElement("canvas");
                    ctxB1 = b1.getContext("2d");
                    ctxB1.resize(ctxt.width,ctxt.height);
                    ctxB1.drawImage(options.in.source,options.in.props.x,options.in.props.y,options.in.props.width,options.in.props.height);
                    imgDatasB1 = ctxB1.getImageData(0,0,ctxt.width,ctxt.height);
                    ctxt.premultiply(imgDatasB1);
                    datasB1 = imgDatasB1.data;

                    b2 = document.createElement("canvas");
                    ctxB2 = b2.getContext("2d");
                    ctxB2.resize(ctxt.width,ctxt.height);
                    ctxB2.drawImage(options.in2.source,options.in2.props.x,options.in2.props.y,options.in2.props.width,options.in2.props.height);
                    ctx.resize(ctxt.width,ctxt.height);
                    ctx.drawImage(b2,0,0);
                    imgDatas = ctx.getImageData(0,0,ctxt.width,ctxt.height);
                    ctxt.premultiply(imgDatas);
                    datas = imgDatas.data;

                    var k1Scaled = options.k1 / 255;
                    var k4Scaled = options.k4 * 255;
                    var vR,vG,vB,vA,r,g,b,a,r1,g1,b1,a1;
                    for(v = 0;v < datas.length;v += 4) {
                        r = datasB1[v + _const.channelMap.R];
                        g = datasB1[v + _const.channelMap.G];
                        b = datasB1[v + _const.channelMap.B];
                        a = datasB1[v + _const.channelMap.A];

                        r1 = datas[v + _const.channelMap.R];
                        g1 = datas[v + _const.channelMap.G];
                        b1 = datas[v + _const.channelMap.B];
                        a1 = datas[v + _const.channelMap.A];

                        vR = k1Scaled * r1 * r + options.k2 * r + options.k3 * r1 + k4Scaled;
                        vG = k1Scaled * g1 * g + options.k2 * g + options.k3 * g1 + k4Scaled;
                        vB = k1Scaled * b1 * b + options.k2 * b + options.k3 * b1 + k4Scaled;
                        vA = k1Scaled * a1 * a + options.k2 * a + options.k3 * a1 + k4Scaled;

                        vR = vR < 0 ? 0 : vR > 255 ? 255 : vR;
                        vG = vG < 0 ? 0 : vG > 255 ? 255 : vG;
                        vB = vB < 0 ? 0 : vB > 255 ? 255 : vB;
                        vA = vA < 0 ? 0 : vA > 255 ? 255 : vA;

                        datas[v + _const.channelMap.R] = vR;
                        datas[v + _const.channelMap.G] = vG;
                        datas[v + _const.channelMap.B] = vB;
                        datas[v + _const.channelMap.A] = vA;
                    }
                    ctxt.unPremultiply(imgDatas);
                    ctx.putImageData(imgDatas,0,0);
                };
            if(!options) {
                options = {};
            }
            if(!Core.tools.valueInSet(options.operator,Types.CANVAS.compositeOperators)) {
                options.operator = Types.CANVAS.compositeOperators.OVER;
            };
            if(!options.in || !options.in2) return;
            if(options.result) {
                ctx.drawImage(options.in2.source,options.in2.props.x,options.in2.props.y,options.in2.props.width,options.in2.props.height);
                ctx.save();
                ctx.globalCompositeOperation = options.operator;
                ctx.drawImage(options.in.source,options.in.props.x,options.in.props.y,options.in.props.width,options.in.props.height);
                ctx.restore();
                this.results[result] = { name: options.result,source: buffer,props: options };
            } else {
                ctx.resize(this.width,this.height);
                options.in2 = this.getSource(options.in2);
                options.in = this.getSource(options.in);
                if(!options.in || !options.in2) return;
                if(options.operator !== Types.CANVAS.compositeOperators.ARITHMETIC) {
                    ctx.drawImage(options.in2.source,options.in2.props.x,options.in2.props.y,options.in2.props.width,options.in2.props.height);
                    ctx.save();
                    ctx.globalCompositeOperation = options.operator;
                    ctx.drawImage(options.in.source,options.in.props.x,options.in.props.y,options.in.props.width,options.in.props.height);
                    ctx.restore();
                } else {
                    options.k1 = options.k1 || 0;
                    options.k2 = options.k2 || 0;
                    options.k3 = options.k3 || 0;
                    options.k4 = options.k4 || 0;
                    _arithmetic(options,ctx);
                }
                //} else {
                //    ctx.drawImage(options.in2.source,options.in2.props.x,options.in2.props.y,options.in2.props.width,options.in2.props.height);
                //    ctxDst.globalCompositeOperation = options.operator;
                //}
                //ctxDst = this.destination.source.getContext("2d");
                //ctxDst.save();
                this._apply(buffer);
            }
            this.filtersStack.add("composite");
        }
        /*
         * in, order, kernelMatrix, divisor, bias, targetX, targetY, edgeMode, kernelUnitLength, preserveAlpha, result, x, y, width, height
         */
        this.convolveMatrix = function(options) {
            this.filtersStack.add("convolveMatrix");
            var buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d"),srcBuffer,srcCtx,srcImgDatas,srcDatas,paintingData = {},paintSize,
                dstImgDatas,dstDatas
            /*,i,x,y,
                SetupScalingFilter = function(aSource, aTarget, aDataRect, aKernelUnitLength) {
                    var result = {};
                    result.mRescaling = aKernelUnitLength;
                    if (!result.mRescaling) {
                        result.mSource = aSource;
                        result.mTarget = aTarget;
                        result.mDataRect = aDataRect;
                        return result;
                    }
                },
                ConvolvePixel = function() {
                },
                ConvolvePixel = function() {
                }*/
            ,clipRight,clipBottom,i,
                setInteriorPixels = function(paintingData,clipRight,clipBottom,yStart,yEnd) {
                    // Must be implemented here, since it refers another ALWAYS_INLINE
                    // function, which defined in this C++ source file as well
                    //if (options.preserveAlpha)
                    fastSetInteriorPixels(paintingData,clipRight,clipBottom,yStart,yEnd);
                    //else
                    //    fastSetInteriorPixels<false>(paintingData, clipRight, clipBottom, yStart, yEnd);
                },
                setOuterPixels = function(paintingData,x1,y1,x2,y2) {
                    fastSetOuterPixels(paintingData,x1,y1,x2,y2);
                },
                fastSetOuterPixels = function(paintingData,x1,y1,x2,y2) {
                    var pixel = (y1 * paintingData.width + x1) * 4;
                    var height = y2 - y1;
                    var width = x2 - x1;
                    var beginKernelPixelX = x1 - options.targetX;
                    var startKernelPixelX = beginKernelPixelX;
                    var startKernelPixelY = y1 - options.targetY;
                    var xIncrease = (paintingData.width - width) * 4;
                    // Contains the sum of rgb(a) components
                    var totals = new Array(3 + (options.preserveAlpha ? 0 : 1));

                    for(var y = height;y > 0;--y) {
                        for(var x = width;x > 0;--x) {
                            var kernelValue = options.kernelMatrix.length - 1;
                            var kernelPixelX = startKernelPixelX;
                            var kernelPixelY = startKernelPixelY;
                            var width = options.order[0];

                            totals[0] = 0;
                            totals[1] = 0;
                            totals[2] = 0;
                            if(!options.preserveAlpha)
                                totals[3] = 0;

                            while(kernelValue >= 0) {
                                var pixelIndex = getPixelValue(paintingData,kernelPixelX,kernelPixelY);
                                if(pixelIndex >= 0) {
                                    totals[0] += options.kernelMatrix[kernelValue] * paintingData.srcPixelArray[pixelIndex + _const.channelMap.R];
                                    totals[1] += options.kernelMatrix[kernelValue] * paintingData.srcPixelArray[pixelIndex + _const.channelMap.G];
                                    totals[2] += options.kernelMatrix[kernelValue] * paintingData.srcPixelArray[pixelIndex + _const.channelMap.B];
                                }
                                if(!options.preserveAlpha && pixelIndex >= 0)
                                    totals[3] += options.kernelMatrix[kernelValue] * paintingData.srcPixelArray[pixelIndex + _const.channelMap.A];
                                ++kernelPixelX;
                                --kernelValue;
                                if(!--width) {
                                    kernelPixelX = startKernelPixelX;
                                    ++kernelPixelY;
                                    width = options.order[0];
                                }
                            }

                            setDestinationPixels(paintingData.dstPixelArray,pixel,totals,options.divisor,paintingData.bias,paintingData.srcPixelArray);
                            ++startKernelPixelX;
                        }
                        pixel += xIncrease;
                        startKernelPixelX = beginKernelPixelX;
                        ++startKernelPixelY;
                    }
                },
                getPixelValue = function(paintingData,x,y) {
                    if(x >= 0 && x < paintingData.width && y >= 0 && y < paintingData.height)
                        return (y * paintingData.width + x) << 2;

                    switch(options.edgeMode) {
                        default: // EDGEMODE_NONE
                            return -1;
                        case Types.CANVAS.EDGEMODE_DUPLICATE:
                            if(x < 0)
                                x = 0;
                            else if(x >= paintingData.width)
                                x = paintingData.width - 1;
                            if(y < 0)
                                y = 0;
                            else if(y >= paintingData.height)
                                y = paintingData.height - 1;
                            return (y * paintingData.width + x) << 2;
                        case Types.CANVAS.EDGEMODE_WRAP:
                            while(x < 0)
                                x += paintingData.width;
                            x %= paintingData.width;
                            while(y < 0)
                                y += paintingData.height;
                            y %= paintingData.height;
                            return (y * paintingData.width + x) << 2;
                    }
                },
                fastSetInteriorPixels = function(paintingData,clipRight,clipBottom,yStart,yEnd) {
                    var pixel,kernelIncrease,xIncrease,totals = [],startKernelPixel,kernelValue,kernelPixel,width,x,y;
                    // edge mode does not affect these pixels
                    pixel = (options.targetY * paintingData.width + options.targetX) * 4;
                    kernelIncrease = clipRight * 4;
                    xIncrease = (options.order[0] - 1) * 4;
                    // Contains the sum of rgb(a) components
                    totals = new Array(3 + (options.preserveAlpha ? 0 : 1));

                    // Skip the first '(clipBottom - yEnd)' lines
                    pixel += (clipBottom - yEnd) * (xIncrease + (clipRight + 1) * 4);
                    startKernelPixel = (clipBottom - yEnd) * (xIncrease + (clipRight + 1) * 4);

                    for(y = yEnd + 1;y > yStart;--y) {
                        for(x = clipRight + 1;x > 0;--x) {
                            kernelValue = options.kernelMatrix.length - 1;
                            kernelPixel = startKernelPixel;
                            width = options.order[0];

                            totals[0] = 0;
                            totals[1] = 0;
                            totals[2] = 0;
                            if(!options.preserveAlpha)
                                totals[3] = 0;

                            while(kernelValue >= 0) {
                                totals[0] += options.kernelMatrix[kernelValue] * (paintingData.srcPixelArray[kernelPixel++]);
                                totals[1] += options.kernelMatrix[kernelValue] * (paintingData.srcPixelArray[kernelPixel++]);
                                totals[2] += options.kernelMatrix[kernelValue] * (paintingData.srcPixelArray[kernelPixel++]);
                                if(!options.preserveAlpha)
                                    totals[3] += options.kernelMatrix[kernelValue] * (paintingData.srcPixelArray[kernelPixel]);
                                ++kernelPixel;
                                --kernelValue;
                                if(!--width) {
                                    kernelPixel += kernelIncrease;
                                    width = options.order[0];
                                }
                            }

                            setDestinationPixels(paintingData.dstPixelArray,pixel,totals,options.divisor,paintingData.bias,paintingData.srcPixelArray);
                            startKernelPixel += 4;
                        }
                        pixel += xIncrease;
                        startKernelPixel += xIncrease;
                    }
                },
                setDestinationPixels = function(image,pixel,totals,divisor,bias,src) {
                    var maxAlpha = options.preserveAlpha ? 255 : clampRGBAValue(totals[3] / options.divisor + options.bias);
                    for(var i = 0;i < 3;++i)
                        image[pixel++] = clampRGBAValue(totals[i] / options.divisor + options.bias,maxAlpha);
                    //image->set(pixel++, clampRGBAValue(totals[i] / divisor + bias, maxAlpha));

                    if(options.preserveAlpha) {
                        image[pixel] = src[pixel];
                        //image->set(pixel, src->get(pixel));
                        ++pixel;
                    } else
                        image[pixel++] = maxAlpha;
                    //image->set(pixel++, maxAlpha);
                },
                clampRGBAValue = function(channel,max) {
                    if(!max) max = 255;
                    if(channel <= 0) return 0;
                    if(channel >= max) return max;
                    return channel;
                };
            if(!options) {
                options = {};
            }
            if(!options.in) return;
            if(!options.order) options.order = [3,3];
            else {
                if(typeof options.order === _const.STRING) {
                    if(options.order.indexOf(String.SPACE) > -1) options.order = options.order.split(String.SPACE);
                    else if(options.order.indexOf(String.COMMA) > -1) options.order = options.order.split(String.COMMA);
                    options.order[0] = ~~options.order.first();
                    options.order[1] = ~~options.order.last();
                } else options.order = [options.order,options.order];
            }
            if(!options.kernelMatrix) options.kernelMatrix = Core.types.constants.IDENTITYMATRIX.toArray();
            if(!options.bias) options.bias = 0;
            if(!options.targetX) options.targetX = Core.floor(options.order[0] / 2);
            if(!options.targetY) options.targetY = Core.floor(options.order[1] / 2);
            if(!options.edgeMode) Types.CANVAS.convolveMatrixEdgeModes.DUPLICATE;
            if(!options.kernelUnitLength) options.kernelUnitLength = [3,3];
            else {
                if(typeof options.kernelUnitLength === _const.STRING) {
                    if(options.kernelUnitLength.indexOf(String.SPACE) > -1) options.kernelUnitLength = options.kernelUnitLength.split(String.SPACE);
                    else if(options.kernelUnitLength.indexOf(String.COMMA) > -1) options.kernelUnitLength = options.kernelUnitLength.split(String.COMMA);
                    options.kernelUnitLength[0] = ~~options.kernelUnitLength.first();
                    options.kernelUnitLength[1] = ~~options.kernelUnitLength.last();
                } else options.kernelUnitLength = [options.kernelUnitLength,options.kernelUnitLength];
            }
            if(!options.preserveAlpha) options.preserveAlpha = false;
            if(options.order[0] <= 0 || options.order[1] <= 0 || (options.order[0] * options.order[1] !== options.kernelMatrix.length)) throw "Error in convolveMatrix : order not equal kernelMatrix length";
            if(options.targetX < 0 || options.targetX >= options.order[0]) throw "Error in convolveMatrix : targetX";
            if(options.targetY < 0 || options.targetY >= options.order[1]) throw "Error in convolveMatrix : targetY";
            if(!options.divisor) {
                options.divisor = options.kernelMatrix[0];
                for(i = 1;i < options.kernelMatrix.length;i++)
                    options.divisor += options.kernelMatrix[i];
                if(options.divisor === 0) options.divisor = 1;
            } else if(options.divisor === 0) throw "Error in convolveMatrix: divisor can't be set to zero";
            if(!options.filterSubregion) {
                options.filterSubregion = {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };
            }
            options.in = this.getSource(options.in);
            srcBuffer = Core.tools.canvas.newCanvas();
            srcCtx = srcBuffer.getContext("2d");
            srcCtx.resize(this.width,this.height);
            //srcCtx.drawImage(options.in.source,options.in.props.x,options.in.props.y,options.in.props.width,options.in.props.height);
            srcCtx.drawImage(options.in.source,options.filterSubregion.x,options.filterSubregion.y,options.filterSubregion.width,options.filterSubregion.height);
            //srcImgDatas = srcCtx.getImageData(0,0,this.width,this.height);
            srcImgDatas = srcCtx.getImageData(options.filterSubregion.x,options.filterSubregion.y,options.filterSubregion.width,options.filterSubregion.height);
            this.unPremultiply(srcImgDatas);
            srcDatas = srcImgDatas.data;

            ctx.resize(this.width,this.height);
            //dstImgDatas = ctx.getImageData(0,0,this.width,this.height);
            dstImgDatas = ctx.getImageData(options.filterSubregion.x,options.filterSubregion.y,options.filterSubregion.width,options.filterSubregion.height);
            dstDatas = dstImgDatas.data;

            /*var kmLength = options.kernelMatrix.length;
            var kernel;
            for (i = 0; i < kmLength; i++) {
                kernel[kmLength - 1 - i] = options.kernelMatrix[i];
            }
            var info = SetupScalingFilter(srcDatas, dstDatas, options.filterSubregion, options.kernelUnitLength);

            for (y = options.filterSubregion.y; y < options.filterSubregion.height; y++) {
                for (x = options.filterSubregion.x; x < options.filterSubregion.width; x++) {
                    ConvolvePixel(srcDatas, dstDatas,
                                srcImgDatas.width, srcImgDatas.height, x, y,
                                options.edgeMode, kernel, options.divisor, options.bias, options.preserveAlpha,
                                options.order[0], options.order[1], options.targetX, options.targetY);
                }
            }

            FinishScalingFilter(info);*/

            paintingData.srcPixelArray = srcDatas;
            paintingData.dstPixelArray = dstDatas;
            //paintingData.width = this.width;
            //paintingData.height = this.height;
            paintingData.width = options.filterSubregion.width;
            paintingData.height = options.filterSubregion.height;
            paintingData.bias = options.bias * 255;

            // Drawing fully covered pixels
            clipRight = options.filterSubregion.width - options.order[0];
            clipBottom = options.filterSubregion.height - options.order[1];

            if(clipRight >= 0 && clipBottom >= 0) {
                setInteriorPixels(paintingData,clipRight,clipBottom,0,clipBottom);

                clipRight += options.targetX + 1;
                clipBottom += options.targetY + 1;
                if(options.targetY > 0)
                    //setOuterPixels(paintingData, 0, 0, this.width, options.targetY);
                    setOuterPixels(paintingData,options.filterSubregion.x,options.filterSubregion.y,options.filterSubregion.width,options.targetY);
                if(clipBottom < options.filterSubregion.height)
                    //setOuterPixels(paintingData, 0, clipBottom, this.width, this.height);
                    setOuterPixels(paintingData,options.filterSubregion.x,clipBottom,options.filterSubregion.width,options.filterSubregion.height);
                if(options.targetX > 0)
                    //setOuterPixels(paintingData, 0, options.targetY, options.targetX, clipBottom);
                    setOuterPixels(paintingData,options.filterSubregion.x,options.targetY,options.targetX,clipBottom);
                if(clipRight < options.filterSubregion.width)
                    //setOuterPixels(paintingData, clipRight, options.targetY, this.width, clipBottom);
                    setOuterPixels(paintingData,clipRight,options.targetY,options.filterSubregion.width,clipBottom);
            } else {
                // Rare situation, not optimizied for speed
                //setOuterPixels(paintingData, 0, 0, this.width, this.height);
                setOuterPixels(paintingData,options.filterSubregion.x,options.filterSubregion.y,options.filterSubregion.width,options.filterSubregion.height);
            }
            //ctx.putImageData(srcImgDatas,0,0);
            ctx.putImageData(dstImgDatas,options.filterSubregion.x,options.filterSubregion.y);

            if(options.result) this.results.push({ name: options.result,source: buffer,props: options });
            else this._apply(buffer);
        }
        /*
         * in, surfaceScale, diffuseConstant, kernelUnitLength, result, x, y, width, height
         */
        this.diffuseLighting = function(options) {
            this.filtersStack.add("diffuseLighting");
            this.lighting(options,true);
        }
        /*
         * in, in2, scale, xChannelSelector, yChannelSelector, result, x, y, width, height
         */
        this.displacementMap = function(options) {
            var cst = Types.CANVAS.channelSelectorTypes,buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d"),trgImgDatas,
                trgDatas,srcBuffer = Core.tools.canvas.newCanvas(),srcCtx = srcBuffer.getContext("2d"),srcImgDatas,srcDatas,scaleOver255,
                dpltBuffer = Core.tools.canvas.newCanvas(),dpltCtx = dpltBuffer.getContext("2d"),dpltImgDatas,dpltDatas,targIndex,
                scaleAdjustment,x,y,xChannel,yChannel;
            this.filtersStack.add("displacementMap");
            if(!options) {
                options = {};
            }
            if(!options.in || !options.in2) return;
            if(!options.scale) options.scale = 0;

            if(!options.xChannelSelector) options.xChannelSelector = cst.A;
            if(!options.yChannelSelector) options.yChannelSelector = cst.A;
            xChannel = _const.channelMap[options.xChannelSelector];
            yChannel = _const.channelMap[options.yChannelSelector];
            options.in = this.getSource(options.in);
            options.in2 = this.getSource(options.in2);
            if(options.scale !== 0) {
                srcCtx.resize(options.in.props.width,options.in.props.height);
                srcCtx.drawImage(options.in.source,0,0);
                srcImgDatas = srcCtx.getImageData(0,0,options.in.props.width,options.in.props.height);
                this.premultiply(srcImgDatas);
                srcDatas = srcImgDatas.data;
                dpltCtx.resize(options.in2.props.width,options.in2.props.height);
                dpltCtx.drawImage(options.in2.source,0,0,options.in2.props.width,options.in2.props.height);
                dpltImgDatas = dpltCtx.getImageData(0,0,options.in2.props.width,options.in2.props.height);
                this.unPremultiply(dpltImgDatas);
                dpltDatas = dpltImgDatas.data;
                ctx.resize(this.width,this.height);
                trgImgDatas = ctx.getImageData(0,0,this.width,this.height);
                trgDatas = trgImgDatas.data;
                scaleOver255 = options.scale / 255;
                scaleAdjustment = 0.5 - 0.5 * options.scale;
                targIndex = 0;
                for(y = 0;y < this.height;y++) {
                    for(x = 0;x < this.width;x++) {
                        targIndex = (x + y * this.width) * 4;
                        var sourceX = x + Core.intFloor(scaleOver255 * dpltDatas[targIndex + xChannel] + scaleAdjustment);
                        var sourceY = y + Core.intFloor(scaleOver255 * dpltDatas[targIndex + yChannel] + scaleAdjustment);
                        if(sourceX < 0 || sourceX >= this.width || sourceY < 0 || sourceY >= this.height) {
                            trgDatas[targIndex + _const.channelMap.R] = 0;
                            trgDatas[targIndex + _const.channelMap.G] = 0;
                            trgDatas[targIndex + _const.channelMap.B] = 0;
                            trgDatas[targIndex + _const.channelMap.A] = 0;
                        } else {
                            var idx = (sourceX + sourceY * this.width) * 4;
                            trgDatas[targIndex + _const.channelMap.R] = srcDatas[idx + _const.channelMap.R];
                            trgDatas[targIndex + _const.channelMap.G] = srcDatas[idx + _const.channelMap.G];
                            trgDatas[targIndex + _const.channelMap.B] = srcDatas[idx + _const.channelMap.B];
                            trgDatas[targIndex + _const.channelMap.A] = srcDatas[idx + _const.channelMap.A];
                        }
                    }
                }
                ctx.putImageData(trgImgDatas,0,0);
            } else {
                ctx.drawImage(options.in.source,options.in.props.x,options.in.props.y,options.in.props.width,options.in.props.height);
            }
            if(options.result) this.results.push({ name: options.result,source: buffer,props: options });
            else this._apply(buffer);
        }
        /*
         * in, floodColor, floodOpacity, result, x, y, width, height
         */
        this.flood = function(options) {
            var buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d");
            this.filtersStack.add("flood");
            if(!options) {
                options = {};
            }
            if(!options.floodColor) options.floodColor = Colors.BLACK;
            if(!options.floodOpacity) options.floodOpacity = 1;
            if(!options.x) options.x = this.x;
            if(!options.y) options.y = this.y;
            if(!options.width) options.width = this.width;
            if(!options.height) options.height = this.height;
            if(options.floodOpacity > 1) options.floodOpacity = 1;
            if(options.floodOpacity < 0) options.floodOpacity = 0;
            ctx.resize(options.width,options.height);
            ctx.save();
            ctx.globalAlpha = options.floodOpacity;
            ctx.fillStyle = options.floodColor.toRGBHexString();
            ctx.fillRect(options.x,options.y,options.width,options.height);
            ctx.restore();
            if(options.result) this.results.push({ name: options.result,source: buffer,props: options });
            else this._apply(buffer);
        }
        /*
         *  in, stdDeviation, edgeMode, result, x, y, width, height
         */
        this.gaussianBlur = function(options) {
            var radiusX,radiusY,iterations,
            MUL_TABLE = [1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1],
            SHG_TABLE = [0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9],
            buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d"),
            srcBuffer = Core.tools.canvas.newCanvas(),srcCtx = srcBuffer.getContext("2d"),
            srcImgData,px,x = 0,y = 0,i = 0,p = 0,yp = 0,yi = 0,yw = 0,r = 0,g = 0,b = 0,a = 0,pr = 0,pg = 0,pb = 0,pa = 0,
            divx,divy,w,h,w1,h1,rxp1,ryp1,ssx,sx,ssy,sy,si,mtx,stx,mty,sty,ms,ss;
            this.filtersStack.add("gaussianBlur");
            if(!options) {
                options = {};
            }
            if(!options.in) return;
            if(!options.stdDeviation) options.stdDeviation = [1,1];
            else {
                if(typeof options.stdDeviation === _const.STRING) {
                    if(options.stdDeviation.indexOf(String.SPACE) > -1) options.stdDeviation = options.stdDeviation.split(String.SPACE);
                    else if(options.stdDeviation.indexOf(String.COMMA) > -1) options.stdDeviation = options.stdDeviation.split(String.COMMA);
                    options.stdDeviation[0] = ~~options.stdDeviation.first();
                    options.stdDeviation[1] = ~~options.stdDeviation.last();
                } else options.stdDeviation = [options.stdDeviation,options.stdDeviation];
            }
            if(!options.edgeMode) options.edgeMode = Types.CANVAS.edgeModes.DUPLICATE;
            options.in = this.getSource(options.in);
            ctx.resize(this.width,this.height);
            srcCtx.resize(options.in.props.width,options.in.props.height);
            srcCtx.drawImage(options.in.source,0,0);
            srcImgData = srcCtx.getImageData(0,0,options.in.props.width,options.in.props.height);
            radiusX = options.stdDeviation.first();
            radiusY = options.stdDeviation.last();
            if(radiusX !== 0 || radiusY !== 0) {
                if(isNaN(iterations) || iterations < 1) iterations = 1;
                iterations |= 0;
                if(iterations > 3) iterations = 3;
                if(iterations < 1) iterations = 1;
                px = srcImgData.data;
                divx = (radiusX + radiusX + 1) | 0;
                divy = (radiusY + radiusY + 1) | 0;
                w = srcImgData.width | 0;
                h = srcImgData.height | 0;
                w1 = (w - 1) | 0;
                h1 = (h - 1) | 0;
                rxp1 = (radiusX + 1) | 0;
                ryp1 = (radiusY + 1) | 0;
                ssx = { r: 0,b: 0,g: 0,a: 0 };
                sx = ssx;
                for(i = 1;i < divx;i++) {
                    sx = sx.n = { r: 0,b: 0,g: 0,a: 0 };
                }
                sx.n = ssx;
                ssy = { r: 0,b: 0,g: 0,a: 0 };
                sy = ssy;
                for(i = 1;i < divy;i++) {
                    sy = sy.n = { r: 0,b: 0,g: 0,a: 0 };
                }
                sy.n = ssy;
                si = null;
                mtx = MUL_TABLE[radiusX] | 0;
                stx = SHG_TABLE[radiusX] | 0;
                mty = MUL_TABLE[radiusY] | 0;
                sty = SHG_TABLE[radiusY] | 0;
                while(iterations-- > 0) {
                    yw = yi = 0;
                    ms = mtx;
                    ss = stx;
                    for(y = h;--y > -1;) {
                        r = rxp1 * (pr = px[(yi + _const.channelMap.R) | 0]);
                        g = rxp1 * (pg = px[(yi + _const.channelMap.G) | 0]);
                        b = rxp1 * (pb = px[(yi + _const.channelMap.B) | 0]);
                        a = rxp1 * (pa = px[(yi + _const.channelMap.A) | 0]);
                        sx = ssx;
                        for(i = rxp1;--i > -1;) {
                            sx.r = pr;
                            sx.g = pg;
                            sx.b = pb;
                            sx.a = pa;
                            sx = sx.n;
                        }
                        for(i = 1;i < rxp1;i++) {
                            p = (yi + ((w1 < i ? w1 : i) << 2)) | 0;
                            r += (sx.r = px[p + _const.channelMap.R]);
                            g += (sx.g = px[p + _const.channelMap.G]);
                            b += (sx.b = px[p + _const.channelMap.B]);
                            a += (sx.a = px[p + _const.channelMap.A]);
                            sx = sx.n;
                        }
                        si = ssx;
                        for(x = 0;x < w;x++) {
                            px[yi++] = (r * ms) >>> ss;
                            px[yi++] = (g * ms) >>> ss;
                            px[yi++] = (b * ms) >>> ss;
                            px[yi++] = (a * ms) >>> ss;
                            p = ((yw + ((p = x + radiusX + 1) < w1 ? p : w1)) << 2);
                            r -= si.r - (si.r = px[p + _const.channelMap.R]);
                            g -= si.g - (si.g = px[p + _const.channelMap.G]);
                            b -= si.b - (si.b = px[p + _const.channelMap.B]);
                            a -= si.a - (si.a = px[p + _const.channelMap.A]);
                            si = si.n;
                        }
                        yw += w;
                    }
                    ms = mty;
                    ss = sty;
                    for(x = 0;x < w;x++) {
                        yi = (x << 2) | 0;
                        r = (ryp1 * (pr = px[(yi + _const.channelMap.R) | 0])) | 0;
                        g = (ryp1 * (pg = px[(yi + _const.channelMap.G) | 0])) | 0;
                        b = (ryp1 * (pb = px[(yi + _const.channelMap.B) | 0])) | 0;
                        a = (ryp1 * (pa = px[(yi + _const.channelMap.A) | 0])) | 0;
                        sy = ssy;
                        for(i = 0;i < ryp1;i++) {
                            sy.r = pr;
                            sy.g = pg;
                            sy.b = pb;
                            sy.a = pa;
                            sy = sy.n;
                        }
                        yp = w;
                        for(i = 1;i <= radiusY;i++) {
                            yi = (yp + x) << 2;
                            r += (sy.r = px[yi + _const.channelMap.R]);
                            g += (sy.g = px[yi + _const.channelMap.G]);
                            b += (sy.b = px[yi + _const.channelMap.B]);
                            a += (sy.a = px[yi + _const.channelMap.A]);
                            sy = sy.n;
                            if(i < h1) yp += w;
                        }
                        yi = x;
                        si = ssy;
                        if(iterations > 0) {
                            for(y = 0;y < h;y++) {
                                p = yi << 2;
                                px[p + 3] = pa = (a * ms) >>> ss;
                                if(pa > 0) {
                                    px[p + 0] = ((r * ms) >>> ss);
                                    px[p + 1] = ((g * ms) >>> ss);
                                    px[p + 2] = ((b * ms) >>> ss);
                                } else {
                                    px[p] = px[p + 1] = px[p + 2] = 0;
                                }
                                p = (x + (((p = y + ryp1) < h1 ? p : h1) * w)) << 2;
                                r -= si.r - (si.r = px[p + _const.channelMap.R]);
                                g -= si.g - (si.g = px[p + _const.channelMap.G]);
                                b -= si.b - (si.b = px[p + _const.channelMap.B]);
                                a -= si.a - (si.a = px[p + _const.channelMap.A]);
                                si = si.n;
                                yi += w;
                            }
                        } else {
                            for(y = 0;y < h;y++) {
                                p = yi << 2;
                                px[p + 3] = pa = (a * ms) >>> ss;
                                if(pa > 0) {
                                    pa = 255 / pa;
                                    px[p + 0] = ((r * ms) >>> ss) * pa;
                                    px[p + 1] = ((g * ms) >>> ss) * pa;
                                    px[p + 2] = ((b * ms) >>> ss) * pa;
                                } else {
                                    px[p] = px[p + 1] = px[p + 2] = 0
                                }
                                p = (x + (((p = y + ryp1) < h1 ? p : h1) * w)) << 2;
                                r -= si.r - (si.r = px[p + _const.channelMap.R]);
                                g -= si.g - (si.g = px[p + _const.channelMap.G]);
                                b -= si.b - (si.b = px[p + _const.channelMap.B]);
                                a -= si.a - (si.a = px[p + _const.channelMap.A]);
                                si = si.n;
                                yi += w;
                            }
                        }
                    }

                }
            }
            ctx.putImageData(srcImgData,0,0);
            if(options.result) this.results.push({ name: options.result,source: buffer,props: options });
            else this._apply(buffer);
        }
        /*
         * x, y, width, height, preserveAspectRatio, href, result, x, y, width, height
         */
        this.image = function(options) {
            var buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d");
            if(!options) return;
            if(!options.href) return;
            if(typeof options.href === _const.STRING) return;
            options.x = options.x || 0;
            options.y = options.y || 0;
            if(options.href instanceof HTMLCanvasElement) {
                options.width = options.width || options.href.width;
                options.height = options.height || options.href.height;
            } else if(options.href instanceof HTMLImageElement) {
                options.width = options.width || options.href.naturalWidth;
                options.height = options.height || options.href.naturalHeight;
            }
            options.preserveAspectRatio = options.preserveAspectRatio || true;
            this.filtersStack.add("image");
            if(options.result) {
                this.results.push({ name: options.result,source: options.href,props: options });
            } else {
                ctx = this.destination.source.getContext("2d");
                ctx.save();
                ctx.beginPath();
                ctx.rect(this.x,this.y,this.width,this.height);
                ctx.clip();
                ctx.drawImage(options.href,options.x,options.y,options.width,options.height);
                ctx.restore();
            }
        }
        /*
         *
         */
        this.merge = function() {
            var i,l;
            l = this.filtersStack.length;
            for(i = 0;i < l;i++) {
                console.log("merging " + this.filtersStack[i]);
            }
            this.filtersStack.clear();
        }
        /*
         * in, result, x, y, width, height
         */
        this.mergeNode = function(options) {
            this.filtersStack.add("mergeNode");
        }
        /*
         * in, operator, radius, result, x, y, width, height
         */
        this.morphology = function(options) {
            this.filtersStack.add("morphology");
            const MORPHOLOGY_EPSILON = 0.0001;
            var buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d"),rx,ry,op,xExt,yExt,extrema,y1,x1,startY,startX,endY,endX,
                sourceCanvas,sourceCtx,srcImgDatas,srcDatas,y,x,targIndex,targetCanvas,targetCtx,targetDatas,trgDatas,pixel,i;
            if(!options) {
                options = {};
            }
            if(!options.in) return;
            if(!options.operator) options.operator = Types.CANVAS.morphologyOperators.ERODE;
            if(!options.radius) options.radius = [0,0];
            else {
                if(typeof options.radius === _const.STRING) {
                    if(options.radius.indexOf(String.SPACE) > -1) options.radius = options.radius.split(String.SPACE);
                    else if(options.radius.indexOf(String.COMMA) > -1) options.radius = options.radius.split(String.COMMA);
                    options.radius[0] = ~~options.radius.first();
                    options.radius[1] = ~~options.radius.last();
                } else options.radius = [options.radius,options.radius];
            }
            rx = Core.ceil(~~options.radius.first() - MORPHOLOGY_EPSILON);
            ry = Core.ceil(~~options.radius.last() - MORPHOLOGY_EPSILON);
            options.in = this.getSource(options.in);
            if(rx < 0 || ry < 0) return;
            if(rx == 0 && ry == 0) return;
            xExt = new Uint32Array(4);
            yExt = new Uint32Array(4);      // X, Y indices of RGBA extrema
            extrema = new Uint8Array(4);    // RGBA magnitude of extrema
            op = options.operator;
            sourceCanvas = Core.tools.canvas.newCanvas();
            sourceCtx = sourceCanvas.getContext("2d");
            sourceCtx.resize(options.in.props.width,options.in.props.height);
            sourceCtx.drawImage(options.in.source,0,0);
            srcImgDatas = sourceCtx.getImageData(0,0,options.in.props.width,options.in.props.height);
            srcDatas = srcImgDatas.data;
            targetCanvas = Core.tools.canvas.newCanvas();
            targetCtx = targetCanvas.getContext("2d");
            targetCtx.resize(options.in.props.width,options.in.props.height);
            targetDatas = targetCtx.getImageData(0,0,options.in.props.width,options.in.props.height);
            trgDatas = targetDatas.data;
            targIndex = 0;
            for(y = 0;y < srcImgDatas.height;y++) {
                startY = Core.max(0,y - ry);
                endY = Core.min(y + ry,srcImgDatas.height - 1);
                for(x = 0;x < srcImgDatas.width;x++) {
                    targIndex = (x + y * srcImgDatas.width) * 4;
                    startX = Core.max(0,x - rx);
                    endX = Core.min(x + rx,srcImgDatas.width - 1);
                    if(x === 0 || xExt[0] <= startX || xExt[1] <= startX || xExt[2] <= startX || xExt[3] <= startX) {
                        for(i = 0;i < 4;i++) {
                            extrema[i] = srcDatas[targIndex + i];
                        }
                        for(y1 = startY;y1 <= endY;y1++) {
                            for(x1 = startX;x1 <= endX;x1++) {
                                for(i = 0;i < 4;i++) {
                                    pixel = srcDatas[(x1 + y1 * srcImgDatas.width) * 4 + i];
                                    if((extrema[i] >= pixel && op === Types.CANVAS.morphologyOperators.ERODE) || (extrema[i] <= pixel && op === Types.CANVAS.morphologyOperators.DILATE)) {
                                        extrema[i] = pixel;
                                        xExt[i] = x1;
                                        yExt[i] = y1;
                                    }
                                }
                            }
                        }
                    } else {
                        for(y1 = startY;y1 <= endY;y1++) {
                            for(i = 0;i < 4;i++) {
                                pixel = srcDatas[(endX + y1 * srcImgDatas.width) * 4 + i];
                                if((extrema[i] >= pixel && op === Types.CANVAS.morphologyOperators.ERODE) || (extrema[i] <= pixel && op === Types.CANVAS.morphologyOperators.DILATE)) {
                                    extrema[i] = pixel;
                                    xExt[i] = endX;
                                    yExt[i] = y1;
                                }
                            }
                        }
                    }
                    trgDatas[targIndex + _const.channelMap.R] = extrema[_const.channelMap.R];
                    trgDatas[targIndex + _const.channelMap.G] = extrema[_const.channelMap.G];
                    trgDatas[targIndex + _const.channelMap.B] = extrema[_const.channelMap.B];
                    trgDatas[targIndex + _const.channelMap.A] = extrema[_const.channelMap.A];
                }
            }
            targetCtx.putImageData(targetDatas,0,0);
            ctx.drawImage(targetCanvas,options.in.props.x,options.in.props.y,options.in.props.width,options.in.props.height);
            if(options.result) this.results.push({ name: options.result,source: buffer,props: options });
            else this._apply(buffer);
        }
        /*
         *  in, dx, dy, result, x, y, width, height
         */
        this.offset = function(options) {
            var buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d");
            if(!options) {
                options = {};
            }
            if(!options.in) return;
            if(!options.dx) options.dx = 0;
            if(!options.dy) options.dy = 0;
            if(!options.x) options.x = 0;
            if(!options.y) options.y = 0;
            options.in = this.getSource(options.in);
            if(options.dx !== 0) options.in.props.dx += options.dx;
            else if(options.x !== 0) options.in.props.dx = options.x;
            if(options.dy !== 0) options.in.props.dy += options.dy;
            else if(options.y !== 0) options.in.props.dy = options.y;
            if(options.result) {
                this.results.push({ name: options.result,source: options.in.source,props: options.in.props });
            } else {
                options.in = this.getSource(options.in);
                ctx = this.destination.source.getContext("2d");
                ctx.save();
                ctx.beginPath();
                ctx.rect(this.x,this.y,this.width,this.height);
                ctx.clip();
                ctx.translate(options.in.props.dx,options.in.props.dy);
                ctx.drawImage(options.in.source,options.in.props.x,options.in.props.y,options.in.props.width,options.in.props.height);
                ctx.restore();
            }
            this.filtersStack.add("offset");
        }
        /*
         *  x, y, z, result, x, y, width, height
         */
        //this.pointLight = function(options) {
        //    this.filtersStack.add("pointLight");
        //}
        /*
         *  in, surfaceScale, specularConstant, specularExponent, kernelUnitLength, x, y, width, height
         */
        this.specularLighting = function(options) {
            this.filtersStack.add("specularLighting");
            this.lighting(options,false);
        }
        /*
         *  x, y, z, pointsAtX, pointsAtY, pointsAtZ, specularExponent, limitingConeAngle, result
         */
        //this.spotLight = function(options) {
        //    this.filtersStack.add("spotLight");
        //}
        /*
         * in, result, x, y, width, height
         */
        this.tile = function(options) {
            var buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d"),pattern,sourceCanvas;
            this.filtersStack.add("tile");
            if(!options) {
                options = {};
            }
            if(!options.in) {
                if(this.results.length > 0) options.in = this.results.last();
                else return;
            };
            ctx.resize(this.width,this.height);
            pattern = ctx.createPattern(options.in.source,Types.CANVAS.patternRepeats.REPEAT);
            ctx.save();
            ctx.fillStyle = pattern;
            ctx.translate(options.in.props.dx,options.in.props.dy);
            ctx.fillRect(-options.in.props.dx + options.in.props.x,-options.in.props.dy + options.in.props.y,options.in.props.width,options.in.props.height);
            ctx.restore();
            if(options.result) this.results.push({ name: options.result,source: buffer,props: options });
            else this._apply(buffer);
        }
        /*
         * baseFrequency, numOctaves, seed, stitchTiles, type, result, x, y, width, height
         */
        this.turbulence = function(options) {
            const sBSize = 0x100;
            const sBM = 0xff;
            const sPerlinN = 0x1000;
            const sNP = 12;
            const sNM = 0xfff;
            var buffer = Core.tools.canvas.newCanvas(),ctx = buffer.getContext("2d"),
                dstBuffer = Core.tools.canvas.newCanvas(),dstCtx = dstBuffer.getContext("2d"),
                dstBufferData,dstDatas,
                RAND_M = 2147483647,
                RAND_A = 16807,
                RAND_Q = 127773,
                RAND_R = 2836,
                mLatticeSelector = new Array(sBSize + sBSize + 2),
                mGradient = Array(4).fill().map(a => {
                    return Array(sBSize + sBSize + 2).fill().map(a => {
                        return Array(2)
                    })
                }),
                fX,fY,seed,octaves,type,stitch,filterX,filterY,filterWidth,filterHeight,doStitch,lowFreq,hiFreq,y,x,targIndex,point = new Array(2),point = new Array(2),
                col = new Array(4),i,r,g,b,a,
                StitchInfo = {
                    mWidth: null,
                    mHeight: null,
                    mWrapX: null,
                    mWrapY: null
                },
                SetupSeed = function(aSeed) {
                    if(aSeed <= 0)
                        aSeed = -(aSeed % (RAND_M - 1)) + 1;
                    if(aSeed > RAND_M - 1)
                        aSeed = RAND_M - 1;
                    return aSeed;
                },
                Random = function(aSeed) {
                    var result = RAND_A * (aSeed % RAND_Q) - RAND_R * (aSeed / RAND_Q);
                    if(result <= 0)
                        result += RAND_M;
                    return result;
                },
                InitSeed = function(aSeed) {
                    var s,i,j,k;
                    aSeed = SetupSeed(aSeed);
                    for(k = 0;k < 4;k++) {
                        for(i = 0;i < sBSize;i++) {
                            mLatticeSelector[i] = i;
                            for(j = 0;j < 2;j++) {
                                mGradient[k][i][j] = (((aSeed = Random(aSeed)) % (sBSize + sBSize)) - sBSize) / sBSize;
                            }
                            s = (Math.sqrt(mGradient[k][i][0] * mGradient[k][i][0] + mGradient[k][i][1] * mGradient[k][i][1]));
                            mGradient[k][i][0] /= s;
                            mGradient[k][i][1] /= s;
                        }
                    }
                    while(--i) {
                        k = mLatticeSelector[i];
                        mLatticeSelector[i] = mLatticeSelector[j = ~~(aSeed = Random(aSeed) % sBSize)];
                        mLatticeSelector[j] = k;
                    }
                    for(i = 0;i < sBSize + 2;i++) {
                        mLatticeSelector[sBSize + i] = mLatticeSelector[i];
                        for(k = 0;k < 4;k++)
                            for(j = 0;j < 2;j++)
                                mGradient[k][sBSize + i][j] = mGradient[k][i][j];
                    }
                },
                S_CURVE = function(t) { return t * t * (3. - 2. * t); },
                LERP = function(t,a,b) { return a + t * (b - a); },
                Noise2 = function(aColorChannel,aVec,aStitchInfo) {
                    var bx0,bx1,by0,by1,b00,b10,b01,b11;
                    var rx0,rx1,ry0,ry1,q,sx,sy,a,b,t,u,v;
                    var i,j;
                    t = aVec[0] + sPerlinN;
                    bx0 = ~~t;
                    bx1 = bx0 + 1;
                    rx0 = t - ~~t;
                    rx1 = rx0 - 1.0;
                    t = aVec[1] + sPerlinN;
                    by0 = ~~t;
                    by1 = by0 + 1;
                    ry0 = t - ~~t;
                    ry1 = ry0 - 1.0;
                    // If stitching, adjust lattice points accordingly.
                    if(aStitchInfo) {
                        if(bx0 >= aStitchInfo.mWrapX)
                            bx0 -= aStitchInfo.mWidth;
                        if(bx1 >= aStitchInfo.mWrapX)
                            bx1 -= aStitchInfo.mWidth;
                        if(by0 >= aStitchInfo.mWrapY)
                            by0 -= aStitchInfo.mHeight;
                        if(by1 >= aStitchInfo.mWrapY)
                            by1 -= aStitchInfo.mHeight;
                    }
                    bx0 &= sBM;
                    bx1 &= sBM;
                    by0 &= sBM;
                    by1 &= sBM;
                    i = mLatticeSelector[bx0];
                    j = mLatticeSelector[bx1];
                    b00 = mLatticeSelector[i + by0];
                    b10 = mLatticeSelector[j + by0];
                    b01 = mLatticeSelector[i + by1];
                    b11 = mLatticeSelector[j + by1];
                    sx = S_CURVE(rx0);
                    sy = S_CURVE(ry0);
                    q = mGradient[aColorChannel][b00];
                    u = rx0 * q[0] + ry0 * q[1];
                    q = mGradient[aColorChannel][b10];
                    v = rx1 * q[0] + ry0 * q[1];
                    a = LERP(sx,u,v);
                    q = mGradient[aColorChannel][b01];
                    u = rx0 * q[0] + ry1 * q[1];
                    q = mGradient[aColorChannel][b11];
                    v = rx1 * q[0] + ry1 * q[1];
                    b = LERP(sx,u,v);
                    return LERP(sy,a,b);
                },
                Turbulence = function(aColorChannel,aPoint,aBaseFreqX,aBaseFreqY,aNumOctaves,aFractalSum,aDoStitching,aTileX,aTileY,aTileWidth,aTileHeight) {
                    var loFreq,hiFreq,sum,vec = new Array(2),ratio,octave,stitchInfo = null;
                    if(aDoStitching) {
                        // When stitching tiled turbulence, the frequencies must be adjusted
                        // so that the tile borders will be continuous.
                        if(aBaseFreqX != 0.0) {
                            loFreq = Core.floor(aTileWidth * aBaseFreqX) / aTileWidth;
                            hiFreq = Core.ceil(aTileWidth * aBaseFreqX) / aTileWidth;
                            if(aBaseFreqX / loFreq < hiFreq / aBaseFreqX)
                                aBaseFreqX = loFreq;
                            else
                                aBaseFreqX = hiFreq;
                        }
                        if(aBaseFreqY != 0.0) {
                            loFreq = Core.floor(aTileHeight * aBaseFreqY) / aTileHeight;
                            hiFreq = Core.ceil(aTileHeight * aBaseFreqY) / aTileHeight;
                            if(aBaseFreqY / loFreq < hiFreq / aBaseFreqY)
                                aBaseFreqY = loFreq;
                            else
                                aBaseFreqY = hiFreq;
                        }
                        // Set up initial stitch values.
                        stitchInfo = JSON.parse(JSON.stringify(StitchInfo));
                        stitchInfo.mWidth = ~~(aTileWidth * aBaseFreqX + 0.5);
                        stitchInfo.mWrapX = ~~(aTileX * aBaseFreqX + sPerlinN + stitchInfo.mWidth);
                        stitchInfo.mHeight = ~~(aTileHeight * aBaseFreqY + 0.5);
                        stitchInfo.mWrapY = ~~(aTileY * aBaseFreqY + sPerlinN + stitchInfo.mHeight);
                    }
                    sum = 0.0;
                    vec[0] = aPoint[0] * aBaseFreqX;
                    vec[1] = aPoint[1] * aBaseFreqY;
                    ratio = 1;
                    for(octave = 0;octave < aNumOctaves;octave++) {
                        if(aFractalSum)
                            sum += Noise2(aColorChannel,vec,stitchInfo) / ratio;
                        else
                            sum += Math.abs(Noise2(aColorChannel,vec,stitchInfo)) / ratio;
                        vec[0] *= 2;
                        vec[1] *= 2;
                        ratio *= 2;
                        if(stitchInfo != null) {
                            // Update stitch values. Subtracting sPerlinN before the multiplication
                            // and adding it afterward simplifies to subtracting it once.
                            stitchInfo.mWidth *= 2;
                            stitchInfo.mWrapX = 2 * stitchInfo.mWrapX - sPerlinN;
                            stitchInfo.mHeight *= 2;
                            stitchInfo.mWrapY = 2 * stitchInfo.mWrapY - sPerlinN;
                        }
                    }
                    return sum;
                },
                FAST_DIVIDE_BY_255 = function(v) {
                    var tmp_ = v;
                    return ((tmp_ << 8) + tmp_ + 255) >> 16;
                };
            this.filtersStack.add("turbulence");
            if(!options.filterSubregion) {
                options.filterSubregion = {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };
            }
            filterX = options.filterSubregion.x;
            filterY = options.filterSubregion.y;
            filterWidth = options.filterSubregion.width;
            filterHeight = options.filterSubregion.height;
            dstCtx.resize(filterWidth,filterHeight);
            dstBufferData = dstCtx.getImageData(0,0,filterWidth,filterHeight);
            dstDatas = dstBufferData.data;
            if(!options.baseFrequency) {
                options.baseFrequency = [0,0];
            } else if(typeof options.baseFrequency === _const.STRING) {
                if(options.baseFrequency.indexOf(String.SPACE) > -1) options.baseFrequency = options.baseFrequency.split(String.SPACE);
                else if(options.baseFrequency.indexOf(String.COMMA) > -1) options.baseFrequency = options.baseFrequency.split(String.COMMA);
                options.baseFrequency[0] = parseFloat(options.baseFrequency.first());
                options.baseFrequency[1] = parseFloat(options.baseFrequency.last());
            } else if(!Array.isArray(options.baseFrequency)) options.baseFrequency = [options.baseFrequency,options.baseFrequency];
            if(!options.numOctaves) options.numOctaves = 1;
            if(!options.seed) options.seed = 0;
            if(!options.stitchTiles) options.stitchTiles = Types.CANVAS.turbulenceStitchTiles.NOSTITCH;
            else if(!Core.tools.valueInSet(options.stitchTiles,Types.CANVAS.turbulenceStitchTiles)) options.stitchTiles = Types.CANVAS.turbulenceStitchTiles.NOSTITCH;
            if(!options.type) options.type = Types.CANVAS.turbulenceTypes.TRANSLATE;
            else if(!Core.tools.valueInSet(options.type,Types.CANVAS.turbulenceTypes)) options.type = Types.CANVAS.turbulenceTypes.TRANSLATE;

            fX = options.baseFrequency.first();
            fY = options.baseFrequency.last();
            seed = options.seed;
            octaves = ~~options.numOctaves;
            type = options.type;
            stitch = options.stitchTiles;

            InitSeed(~~seed);

            doStitch = false;
            if(stitch === Types.CANVAS.turbulenceStitchTiles.STITCH) {
                doStitch = true;
                lowFreq = Core.floor(filterWidth * fX) / filterWidth;
                hiFreq = Core.ceil(filterWidth * fX) / filterWidth;
                if(fX / lowFreq < hiFreq / fX)
                    fX = lowFreq;
                else
                    fX = hiFreq;

                lowFreq = Core.floor(filterHeight * fY) / filterHeight;
                hiFreq = Core.ceil(filterHeight * fY) / filterHeight;
                if(fY / lowFreq < hiFreq / fY)
                    fY = lowFreq;
                else
                    fY = hiFreq;
            }
            for(y = 0;y < dstBufferData.height ;y++) {
                for(x = 0;x < dstBufferData.width ;x++) {
                    targIndex = (x + y * dstBufferData.width) * 4;
                    point[0] = filterX + (filterWidth * (x + this.x)) / (filterWidth - 1);
                    point[1] = filterY + (filterHeight * (y + this.y)) / (filterHeight - 1);
                    if(type === Types.CANVAS.turbulenceTypes.TURBULENCE) {
                        for(i = 0;i < 4;i++)
                            col[i] = Turbulence(i,point,fX,fY,octaves,false,doStitch,filterX,filterY,filterWidth,filterHeight) * 255;
                    } else {
                        for(i = 0;i < 4;i++)
                            col[i] = (Turbulence(i,point,fX,fY,octaves,true,doStitch,filterX,filterY,filterWidth,filterHeight) * 255 + 255) / 2;
                    }
                    for(i = 0;i < 4;i++) {
                        col[i] = Core.min(col[i],255);
                        col[i] = Core.max(col[i],0);
                    }
                    a = ~~col[_const.channelMap.A];
                    r = FAST_DIVIDE_BY_255(~~col[_const.channelMap.R] * a);
                    g = FAST_DIVIDE_BY_255(~~col[_const.channelMap.G] * a);
                    b = FAST_DIVIDE_BY_255(~~col[_const.channelMap.B] * a);

                    dstDatas[targIndex + _const.channelMap.R] = b;
                    dstDatas[targIndex + _const.channelMap.G] = g;
                    dstDatas[targIndex + _const.channelMap.B] = r;
                    dstDatas[targIndex + _const.channelMap.A] = a;
                }
            }
            ctx.resize(this.width,this.height);
            dstCtx.putImageData(dstBufferData,0,0);
            ctx.drawImage(dstBuffer,options.filterSubregion.x,options.filterSubregion.y);

            if(options.result) this.results.push({ name: options.result,source: buffer,props: options });
            else this._apply(buffer);
        }
        /*
         * in, dx, dy, stdDeviation, result
         */
        this.dropShadow = function(option) {

        }
    };
    /*
    function getPixelColor(img, x, y) {
        var data = img.data;
        var offset = ((y * (img.width * 4)) + (x * 4));
        var result = data[offset + 0] << 24; // r
        result |= data[offset + 1] << 16; // g
        result |= data[offset + 2] << 8; // b
        return result;
    }

    function setPixelColor(img, x, y, color) {
        var data = img.data;
        var offset = ((y * (img.width * 4)) + (x * 4));
        data[offset + 0] = (color >> 24) & 0xFF;
        data[offset + 1] = (color >> 16) & 0xFF;
        data[offset + 2] = (color >>  8) & 0xFF;
    }
     */
    function newCanvas() {
        var Core = require("core");
        var c = Core.doc.createElement("canvas"), ctx = c.getContext("2d");
        ctx.useNativeDash = ctx.setLineDash ? "setLineDash" : ($j.browser.ff ? "mozDash" : null);
        //ctx.useNativeDash=null;
        if (!ctx.useNativeDash) ctx.dashOffset = 0;
        //$j.CSS.addClass(c,"basecss");
        return c;
    };
    function checkEndian() {
        var Canvas = require("canvas");
        var c = Canvas.newCanvas(), ctx = c.getContext("2d"), imageData, buf, buf8, data, isLittleEndian;
        ctx.resize(10, 10);
        imageData = ctx.getImageData(0, 0, c.width, c.height);
        buf = new ArrayBuffer(imageData.data.length);
        buf8 = new Uint8ClampedArray(buf);
        data = new Uint32Array(buf);
        // Determine whether Uint32 is little- or big-endian.
        data[1] = 0x0a0b0c0d;
        isLittleEndian = true;
        if (buf[4] === 0x0a && buf[5] === 0x0b && buf[6] === 0x0c &&
            buf[7] === 0x0d) {
            isLittleEndian = false;
        }
        return isLittleEndian;
    };
    function setPixel(x, y, w, d, v, isLittleEndian) {
        if (isLittleEndian) {
            d[y * w + x] =
                (255 << 24) |    // alpha
                (v << 16) |    // blue
                (v << 8) |    // green
                v;            // red
        } else {
            d[y * w + x] =
                (v << 24) |    // red
                (v << 16) |    // green
                (v << 8) |    // blue
                255;              // alpha
        }
    };
    function getPixel(x, y, w, d) {
        return d[y * w + x];
    }
    //#endregion
    return {
        filter: filter,
        newCanvas: newCanvas,
        checkEndian: checkEndian,
        setPixel: setPixel,
        getPixel: getPixel
    };
});
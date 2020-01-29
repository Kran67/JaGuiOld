//#region Import
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region CSS
/**
 * Class representing a Css.
 */
class Css {
    //    getStyles: function (cssClass, complement) {
    //        var classes, classTitle = cssClass.split("_")[0].replace(".", ""), isCSSRule = false;
    //        if ((cssClass === "*") || !cssClass.includes("_")) classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
    //        else {
    //            if (cssClass !== "*") {
    //                if (!cssClass.startsWith(".")) cssClass = "." + cssClass;
    //            }
    //            for (var i = 0, l = document.styleSheets.length; i < l; i++) {
    //                if (document.styleSheets[i].title === classTitle) {
    //                    classes = document.styleSheets[i].rules || document.styleSheets[i].cssRules;
    //                    break;
    //                }
    //            }
    //        }
    //        var className = cssClass + complement, styles = [];
    //        for (var x = classes.length - 1; x > 0; x--) {
    //            if ($j.browser.opera) isCSSRule = (classes[x].className === "CSSRule");
    //            else isCSSRule = (classes[x] instanceof CSSStyleRule);
    //            if (isCSSRule) {
    //                if (classes[x].selectorText.includes(className)) styles.push(classes[x].style);
    //            }
    //        }
    //        return styles;
    //    },
    //    getBackground: function (className, object) {
    //        var /*gradientRect=object.path.bounds(),*/css = $j.css[className];
    //        if (!css) return;
    //        var backColor = css.backgroundColor;
    //        if (typeof backColor === _const.STRING) {
    //            if (backColor.toLowerCase() === "transparent") backColor = null;
    //        }
    //        if (backColor) {
    //            //if(hovered){
    //            //  object.style.hovered.background.style=$j.types.brushStyles.SOLID;
    //            //  object.style.hovered.background.color.assign(_colors.parse(css.backgroundColor));
    //            //} else if (pressed){
    //            //  object.style.pressed.background.style=$j.types.brushStyles.SOLID;
    //            //  object.style.pressed.background.color.assign(_colors.parse(css.backgroundColor));
    //            //} else {
    //            if (object instanceof $j.classes.Control) {
    //                object.style.normal.background.style = $j.types.brushStyles.SOLID;
    //                object.style.normal.background.color.assign(_colors.parse(css.backgroundColor));
    //            } else if (object instanceof $j.classes.DrawingInfo) {
    //                object.background.style = $j.types.brushStyles.SOLID;
    //                object.background.color.assign(_colors.parse(css.backgroundColor));
    //            }
    //            //if (firstPass){
    //            //  if (!hovered&&!pressed){
    //            //    if(object.style.hovered){
    //            //      object.style.hovered.background.style=$j.types.brushStyles.SOLID;
    //            //      object.style.hovered.background.color.assign(_colors.parse(css.backgroundColor));
    //            //    }
    //            //    if (object.style.pressed){
    //            //      object.style.pressed.background.style=$j.types.brushStyles.SOLID;
    //            //      object.style.pressed.background.color.assign(_colors.parse(css.backgroundColor));
    //            //    }
    //            //  }
    //            //}
    //            //}
    //        } else if (css.backgroundImage) {
    //            if (css.backgroundImage.indexOf("gradient") !== -1) {
    //                var gradient = css.backgroundImage;
    //                gradient = gradient.replace("-o-", String.EMPTY);
    //                gradient = gradient.replace("-moz-", String.EMPTY);
    //                gradient = gradient.replace("-ms-", String.EMPTY);
    //                gradient = gradient.replace("-webkit-", String.EMPTY);
    //                //if(hovered) object.style.hovered.background.style=$j.types.brushStyles.GRADIENT;
    //                //else if (pressed) object.style.pressed.background.style=$j.types.brushStyles.GRADIENT;
    //                //else {
    //                if (object instanceof $j.classes.DrawingInfo) object.background.style = $j.types.brushStyles.GRADIENT;
    //                else object.style.normal.background.style = $j.types.brushStyles.GRADIENT;
    //                //if (firstPass){
    //                //  if(!hovered&&!pressed){
    //                //    if (object.style.hovered) object.style.hovered.background.style=$j.types.brushStyles.GRADIENT;
    //                //    if (object.style.pressed) object.style.pressed.background.style=$j.types.brushStyles.GRADIENT;
    //                //  }
    //                //}
    //                //}
    //                if (gradient.indexOf("linear") !== -1) { // linear gradient
    //                    //if(hovered) object.style.hovered.background.gradient.style=$j.types.gradientStyles.LINEAR;
    //                    //else if (pressed) object.style.pressed.background.gradient.style=$j.types.gradientStyles.LINEAR;
    //                    //else {
    //                    if (object instanceof $j.classes.DrawingInfo) object.background.gradient.style = $j.types.gradientStyles.LINEAR;
    //                    else object.style.normal.background.gradient.style = $j.types.gradientStyles.LINEAR;
    //                    //if (firstPass){
    //                    //  if(!hovered&&!pressed){
    //                    //    if (object.style.hovered) object.style.hovered.background.gradient.style=$j.types.gradientStyles.LINEAR;
    //                    //    if (object.style.pressed) object.style.pressed.background.gradient.style=$j.types.gradientStyles.LINEAR;
    //                    //  }
    //                    //}
    //                    //}
    //                    gradient = gradient.replace("linear-gradient(", String.EMPTY);
    //                    gradient = gradient.replace("%)", $j.types.CSSUnits.PO);
    //                    gradient = $j.tools.text.replace(gradient, "transparent", "rgba(0,0,0,0)");
    //                    gradient = $j.tools.text.replace(gradient, ", rgb", "|rgb");
    //                    var gradValues = gradient.split("|");
    //                    //if(hovered) object.style.hovered.background.gradient.startPosition.assign($j.classes.Point.create());
    //                    //else if (pressed) object.style.pressed.background.gradient.startPosition.assign($j.classes.Point.create());
    //                    //else {
    //                    if (object instanceof $j.classes.DrawingInfo) object.background.gradient.startPosition.assign(new $j.classes.Point());
    //                    else object.style.normal.background.gradient.startPosition.assign(new $j.classes.Point());
    //                    //if (firstPass){
    //                    //  if(!hovered&&!pressed){
    //                    //    if (object.style.hovered) object.style.hovered.background.gradient.startPosition.assign($j.classes.Point.create());
    //                    //    if (object.style.pressed) object.style.pressed.background.gradient.startPosition.assign($j.classes.Point.create());
    //                    //  }
    //                    //}
    //                    //}
    //                    if (gradValues[0].indexOf("top") !== -1) {
    //                        //if(hovered) object.style.hovered.background.gradient.stopPosition.assign($j.classes.Point.create(0,1));
    //                        //else if(pressed) object.style.pressed.background.gradient.stopPosition.assign($j.classes.Point.create(0,1));
    //                        //else {
    //                        if (object instanceof $j.classes.DrawingInfo) object.background.gradient.stopPosition = new $j.classes.Point(0, 1);
    //                        else object.style.normal.background.gradient.stopPosition = new $j.classes.Point(0, 1);
    //                        //if (firstPass){
    //                        //  if(!hovered&&!pressed){
    //                        //    if (object.style.hovered) object.style.hovered.background.gradient.stopPosition.assign($j.classes.Point.create(0,1));
    //                        //    if (object.style.pressed) object.style.pressed.background.gradient.stopPosition.assign($j.classes.Point.create(0,1));
    //                        //  }
    //                        //}
    //                        //}
    //                    } else if (gradValues[0].indexOf("left") !== -1) {
    //                        //if(hovered) object.style.hovered.background.gradient.stopPosition.assign($j.classes.Point.create(1,0));
    //                        //else if(pressed) object.style.pressed.background.gradient.stopPosition.assign($j.classes.Point.create(1,0));
    //                        //else {
    //                        if (object instanceof $j.classes.DrawingInfo) object.background.gradient.stopPosition.assign(new $j.classes.Point(1, 0));
    //                        else object.style.normal.background.gradient.stopPosition.assign(new $j.classes.Point(1, 0));
    //                        //if (firstPass){
    //                        //  if(!hovered&&!pressed){
    //                        //    if (object.style.hovered) object.style.hovered.background.gradient.stopPosition.assign($j.classes.Point.create(1,0));
    //                        //    if (object.style.pressed) object.style.pressed.background.gradient.stopPosition.assign($j.classes.Point.create(1,0));
    //                        //  }
    //                        //}
    //                        //}
    //                    }
    //                    //if(hovered) object.style.hovered.background.gradient.items.length=0;
    //                    //else if(pressed) object.style.pressed.background.gradient.items.length=0;
    //                    //else {
    //                    if (object instanceof $j.classes.DrawingInfo) object.background.gradient.items.clear();
    //                    else object.style.normal.background.gradient.items.clear();
    //                    //if (firstPass){
    //                    //  if(!hovered&&!pressed){
    //                    //    if (object.style.hovered) object.style.hovered.background.gradient.items.length=0;
    //                    //    if (object.style.pressed) object.style.pressed.background.gradient.items.length=0;
    //                    //  }
    //                    //}
    //                    //}
    //                    for (var i = 1, l = gradValues.length; i < l; i++) {
    //                        var colorOffset = gradValues[i].replace(") ", ")|"), color = colorOffset.split("|")[0], offset = +(colorOffset.split("|")[1].replace($j.types.CSSUnits.PO, String.EMPTY));
    //                        //if(hovered) object.style.hovered.background.gradient.items.push($j.classes.GradientPoint.create(offset/100,_colors.parse(color)));
    //                        //else if(pressed) object.style.pressed.background.gradient.items.push($j.classes.GradientPoint.create(offset/100,_colors.parse(color)));
    //                        //else {
    //                        if (object instanceof $j.classes.DrawingInfo) object.background.gradient.items.push(new $j.classes.GradientPoint(offset / 100, _colors.parse(color)));
    //                        else object.style.normal.background.gradient.items.push(new $j.classes.GradientPoint(offset / 100, _colors.parse(color)));
    //                        //if (firstPass){
    //                        //  if(!hovered&&!pressed){
    //                        //    if (object.style.hovered) object.style.hovered.background.gradient.items.push($j.classes.GradientPoint.create(offset/100,_colors.parse(color)));
    //                        //    if (object.style.pressed) object.style.pressed.background.gradient.items.push($j.classes.GradientPoint.create(offset/100,_colors.parse(color)));
    //                        //  }
    //                        //}
    //                        //}
    //                    }
    //                } else if (gradient.indexOf("radial") !== -1) { // radial gradient
    //                    //if(hovered) object.style.hovered.background.gradient.setStyle($j.types.gradientStyles.RADIAL);
    //                    //else if(pressed) object.style.pressed.background.gradient.setStyle($j.types.gradientStyles.RADIAL);
    //                    //else {
    //                    if (object instanceof $j.classes.DrawingInfo) object.background.gradient.style = $j.types.gradientStyles.RADIAL;
    //                    else object.style.normal.background.gradient.style = $j.types.gradientStyles.RADIAL;
    //                    //if (firstPass){
    //                    //  if(!hovered&&!pressed){
    //                    //    if (object.style.hovered) object.style.hovered.background.gradient.setStyle($j.types.gradientStyles.RADIAL);
    //                    //    if (object.style.pressed) object.style.pressed.background.gradient.setStyle($j.types.gradientStyles.RADIAL);
    //                    //  }
    //                    //}
    //                    //}
    //                }
    //            } else if (css.backgroundImage.indexOf("image/svg+xml") !== -1) { // svg gradient
    //            } else if (css.backgroundImage.indexOf("image/") !== -1) { // image base64
    //                var back, i;
    //                if (object instanceof $j.classes.DrawingInfo) back = object.background;
    //                else back = object.style.normal.background;
    //                back.style = $j.types.brushStyles.BITMAP;
    //                back.bitmapRepeatMode = $j.types.bitmapRepeatModes.REPEAT;
    //                back.bitmap.src = $j.tools.uri.clean(css.backgroundImage);
    //                if (css.backgroundRepeat) back.bitmapRepeatMode = css.backgroundRepeat;
    //            }
    //        }
    //    },
    //    getBorderRadius: function (className) {
    //        var css = $j.css[className], ret, radius;
    //        if (!css) return;
    //        if (css.borderRadius) {
    //            if (css.borderRadius !== String.EMPTY) {
    //                if (css.borderRadius.includes("/")) {
    //                } else {
    //
    //                }
    //                //ret=[0,0,0,0];
    //                //if(css.borderTopLeftRadius) ret[0]=+css.borderTopLeftRadius.replace("px",String.EMPTY).replace("%",String.EMPTY);
    //                //if(css.borderTopRightRadius) ret[1]=+css.borderTopRightRadius.replace("px",String.EMPTY).replace("%",String.EMPTY);
    //                //if(css.borderBottomLeftRadius) ret[2]=+css.borderBottomLeftRadius.replace("px",String.EMPTY).replace("%",String.EMPTY);
    //                //if(css.borderBottomRightRadius) ret[3]=+css.borderBottomRightRadius.replace("px",String.EMPTY).replace("%",String.EMPTY);
    //                //return ret;
    //            }
    //        } else if (css.borderTopLeftRadius || css.borderTopRightRadius || css.borderBottomLeftRadius || css.borderBottomRightRadius) {
    //            ret = [[0, 0], [0, 0], [0, 0], [0, 0]];
    //            if (css.borderTopLeftRadius && css.borderTopLeftRadius !== String.EMPTY) {
    //                if (css.borderTopLeftRadius.includes(String.SPACE)) {
    //                    radius = css.borderTopLeftRadius.split(String.SPACE);
    //                    ret[0][0] = +radius[0].replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                    ret[0][1] = +radius[1].replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                } else {
    //                    radius = +css.borderTopLeftRadius.replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                    ret[0][0] = radius;
    //                    ret[0][1] = radius;
    //                }
    //            }
    //            if (css.borderTopRightRadius && css.borderTopRightRadius !== String.EMPTY) {
    //                if (css.borderTopRightRadius.includes(String.SPACE)) {
    //                    radius = css.borderTopRightRadius.split(String.SPACE);
    //                    ret[1][0] = +radius[0].replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                    ret[1][1] = +radius[1].replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                } else {
    //                    radius = +css.borderTopRightRadius.replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                    ret[1][0] = radius;
    //                    ret[1][1] = radius;
    //                }
    //            }
    //            if (css.borderBottomLeftRadius && css.borderBottomLeftRadius !== String.EMPTY) {
    //                if (css.borderBottomLeftRadius.includes(String.SPACE)) {
    //                    radius = css.borderBottomLeftRadius.split(String.SPACE);
    //                    ret[2][0] = +radius[0].replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                    ret[2][1] = +radius[1].replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                } else {
    //                    radius = +css.borderBottomLeftRadius.replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                    ret[2][0] = radius;
    //                    ret[2][1] = radius;
    //                }
    //            }
    //            if (css.borderBottomRightRadius && css.borderBottomRightRadius !== String.EMPTY) {
    //                if (css.borderBottomRightRadius.includes(String.SPACE)) {
    //                    radius = css.borderBottomRightRadius.split(String.SPACE);
    //                    ret[3][0] = +radius[0].replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                    ret[3][1] = +radius[1].replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                } else {
    //                    radius = +css.borderBottomRightRadius.replace($j.types.CSSUnits.PX, String.EMPTY).replace($j.types.CSSUnits.PO, String.EMPTY);
    //                    ret[3][0] = radius;
    //                    ret[3][1] = radius;
    //                }
    //            }
    //            //ret=[0,0,0,0];
    //            //if(css.borderTopLeftRadius) ret[0]=+css.borderTopLeftRadius.replace("px",String.EMPTY).replace("%",String.EMPTY);
    //            //if(css.borderTopRightRadius) ret[1]=+css.borderTopRightRadius.replace("px",String.EMPTY).replace("%",String.EMPTY);
    //            //if(css.borderBottomLeftRadius) ret[2]=+css.borderBottomLeftRadius.replace("px",String.EMPTY).replace("%",String.EMPTY);
    //            //if(css.borderBottomRightRadius) ret[3]=+css.borderBottomRightRadius.replace("px",String.EMPTY).replace("%",String.EMPTY);
    //            return ret;
    //        }
    //    },
    //    getBorder: function (className, object) {
    //        var css = $j.css[className], c, w = 0;;
    //        if (!css) return;
    //        if (css.borderLeftColor || css.borderTopColor || css.borderRightColor || css.borderBottomColor) {
    //            if (css.borderLeftColor) c = css.borderLeftColor;
    //            else if (css.borderTopColor) c = css.borderTopColor;
    //            else if (css.borderRightColor) c = css.borderRightColor;
    //            else if (css.borderBottomColor) c = css.borderBottomColor;
    //            //if (hovered) {
    //            //  object.style.hovered.border.color.assign(_colors.parse(c));
    //            //  object.style.hovered.border.style=$j.types.brushStyles.SOLID;
    //            //} else if (pressed) {
    //            //  object.style.pressed.border.color.assign(_colors.parse(c));
    //            //  object.style.pressed.border.style=$j.types.brushStyles.SOLID;
    //            //} else {
    //            //if (firstPass){
    //            //  if(object.style.hovered) {
    //            //    object.style.hovered.border.color.assign(_colors.parse(c));
    //            //    object.style.hovered.border.style=$j.types.brushStyles.SOLID;
    //            //  }
    //            //  if(object.style.pressed) {
    //            //    object.style.pressed.border.color.assign(_colors.parse(c));
    //            //    object.style.pressed.border.style=$j.types.brushStyles.SOLID;
    //            //  }
    //            //}
    //            if (!(object instanceof $j.classes.DrawingInfo)) object = object.style.normal;
    //            object.border.color.assign(_colors.parse(c));
    //            object.border.style = $j.types.brushStyles.SOLID;
    //            //}
    //        }
    //        if (css.borderLeftWidth || css.borderTopWidth || css.borderRightWidth || css.borderBottomWidth) {
    //            if (css.borderLeftWidth) w = +css.borderLeftWidth.replace($j.types.CSSUnits.PX, String.EMPTY);
    //            else if (css.borderTopWidth) w = +css.borderTopWidth.replace($j.types.CSSUnits.PX, String.EMPTY);
    //            else if (css.borderRightWidth) w = +css.borderRightWidth.replace($j.types.CSSUnits.PX, String.EMPTY);
    //            else if (css.borderBottomWidth) w = +css.borderBottomWidth.replace($j.types.CSSUnits.PX, String.EMPTY);
    //            object.sides = $j.types.sides.NONE;
    //            if (css.borderLeftWidth) object.sides |= $j.types.sides.LEFT;
    //            if (css.borderTopWidth) object.sides |= $j.types.sides.TOP;
    //            if (css.borderRightWidth) object.sides |= $j.types.sides.RIGHT;
    //            if (css.borderBottomWidth) object.sides |= $j.types.sides.BOTTOM;
    //            if (isNaN(w)) w = 0;
    //            //if (hovered) object.style.hovered.borderWidth=w;
    //            //else if (pressed) object.style.pressed.borderWidth=w;
    //            //else {
    //            //if (firstPass){
    //            //  if (object.style.hovered) object.style.hovered.borderWidth=w;
    //            //  if (object.style.pressed) object.style.pressed.borderWidth=w;
    //            //}
    //            if (object instanceof $j.classes.ThemedControl) object.style.normal.borderWidth = w;
    //            else if (object instanceof $j.classes.DrawingInfo) object.borderWidth = w;
    //            //}
    //        }
    //    },
    //    getOutline: function (className, object) {
    //        var css = $j.css[className], c, w = 0;;
    //        if (!css) return;
    //        if (css.outlineColor) {
    //            c = css.outlineColor;
    //            if (!(object instanceof $j.classes.DrawingInfo)) object = object.style.normal;
    //            object.outline.color.assign(_colors.parse(c));
    //        }
    //        if (css.outlineWidth) {
    //            w = +css.outlineWidth.replace($j.types.CSSUnits.PX, String.EMPTY);
    //            if (isNaN(w)) w = 0;
    //            if (object instanceof $j.classes.ThemedControl) object.style.normal.outline.width = w;
    //            else if (object instanceof $j.classes.DrawingInfo) object.outline.width = w;
    //        }
    //    },
    //    getShadow: function (className, object) {
    //        var css = $j.css[className];
    //        if (!css) return;
    //        if (css.boxShadow) {
    //            if (css.boxShadow !== String.EMPTY) {
    //                var shadow = css.boxShadow.replace(/, /g, ",").split(String.SPACE);
    //                //if (hovered){
    //                //  object.style.hovered.shadowOffsetX=+shadow[0].replace("px",String.EMPTY);
    //                //  object.style.hovered.shadowOffsetY=+shadow[1].replace("px",String.EMPTY);
    //                //  object.style.hovered.shadowBlur=+shadow[2].replace("px",String.EMPTY);
    //                //  object.style.hovered.shadowColor.assign(_colors.parse(shadow[3]));
    //                //} else if (pressed){
    //                //  object.style.pressed.shadowOffsetX=+shadow[0].replace("px",String.EMPTY);
    //                //  object.style.pressed.shadowOffsetY=+shadow[1].replace("px",String.EMPTY);
    //                //  object.style.pressed.shadowBlur=+shadow[2].replace("px",String.EMPTY);
    //                //  object.style.pressed.shadowColor.assign(_colors.parse(shadow[3]));
    //                //} else {
    //                object.shadowOffsetX = +shadow[0].replace($j.types.CSSUnits.PX, String.EMPTY);
    //                object.shadowOffsetY = +shadow[1].replace($j.types.CSSUnits.PX, String.EMPTY);
    //                object.shadowBlur = +shadow[2].replace($j.types.CSSUnits.PX, String.EMPTY);
    //                object.shadowColor.assign(_colors.parse(shadow[3]));
    //                //if (firstPass){
    //                //  if (!hovered){
    //                //    if (object.style.hovered){
    //                //      object.style.hovered.shadowOffsetX=object.shadowOffsetX;
    //                //      object.style.hovered.shadowOffsetY=object.shadowOffsetY;
    //                //      object.style.hovered.shadowBlur=object.shadowBlur;
    //                //      object.style.hovered.shadowColor.assign(_colors.parse(shadow[3]));
    //                //    }
    //                //  }
    //                //  if (!pressed){
    //                //    if (object.style.pressed){
    //                //      object.style.pressed.shadowOffsetX=object.shadowOffsetX;
    //                //      object.style.pressed.shadowOffsetY=object.shadowOffsetY;
    //                //      object.style.pressed.shadowBlur=object.shadowBlur;
    //                //      object.style.pressed.shadowColor.assign(_colors.parse(shadow[3]));
    //                //    }
    //                //  }
    //                //}
    //                //}
    //            }
    //        }
    //    },
    //    getTextShadow: function (className, object) {
    //        var css = $j.css[className];
    //        if (!css) return;
    //        if (css.textShadow) {
    //            if (css.textShadow !== String.EMPTY) {
    //                var shadow = $j.tools.replace(css.textShadow, ", ", ",").split(String.SPACE);
    //                object.shadowOffsetX = +shadow[0].replace($j.types.CSSUnits.PX, String.EMPTY);
    //                object.shadowOffsetY = +shadow[1].replace($j.types.CSSUnits.PX, String.EMPTY);
    //                object.shadowBlur = +shadow[2].replace($j.types.CSSUnits.PX, String.EMPTY);
    //                object.shadowColor.assign(_colors.parse(shadow[3]));
    //            }
    //            else {
    //                object.shadowOffsetX = 0;
    //                object.shadowOffsetY = 0;
    //                object.shadowBlur = 0;
    //                object.shadowColor.assign(_colors.TRANSPARENT);
    //            }
    //        }
    //    },
    //    CSSBorderRadius2Canvas: function (className, object) {
    //        // border radius
    //        var r = this.getBorderRadius(className), style;
    //        if (object instanceof $j.classes.ThemedControl) style = object.style.normal;
    //        else if (object instanceof $j.classes.DrawingInfo) style = object;
    //        if (r) {
    //            //if (hovered){
    //            //  object.style.hovered.bordersRadius.topLeft.setValues(r[0][0],r[0][1]);
    //            //  object.style.hovered.bordersRadius.topRight.setValues(r[1][0],r[1][1]);
    //            //  object.style.hovered.bordersRadius.bottomLeft.setValues(r[2][0],r[2][1]);
    //            //  object.style.hovered.bordersRadius.bottomRight.setValues(r[3][0],r[3][1]);
    //            //} else if (pressed){
    //            //  object.style.pressed.bordersRadius.topLeft.setValues(r[0][0],r[0][1]);
    //            //  object.style.pressed.bordersRadius.topRight.setValues(r[1][0],r[1][1]);
    //            //  object.style.pressed.bordersRadius.bottomLeft.setValues(r[2][0],r[2][1]);
    //            //  object.style.pressed.bordersRadius.bottomRight.setValues(r[3][0],r[3][1]);
    //            //} else {
    //            style.bordersRadius.topLeft.setValues(r[0][0], r[0][1]);
    //            style.bordersRadius.topRight.setValues(r[1][0], r[1][1]);
    //            style.bordersRadius.bottomLeft.setValues(r[2][0], r[2][1]);
    //            style.bordersRadius.bottomRight.setValues(r[3][0], r[3][1]);
    //            //if (firstPass){
    //            //  if (!hovered){
    //            //    if (object.style.hovered){
    //            //      object.style.hovered.bordersRadius.topLeft.assign(style.bordersRadius.topLeft);
    //            //      object.style.hovered.bordersRadius.topRight.assign(style.bordersRadius.topRight);
    //            //      object.style.hovered.bordersRadius.bottomLeft.assign(style.bordersRadius.bottomLeft);
    //            //      object.style.hovered.bordersRadius.bottomRight.assign(style.bordersRadius.bottomRight);
    //            //    }
    //            //  }
    //            //  if (!pressed){
    //            //    if (object.style.pressed){
    //            //      object.style.pressed.bordersRadius.topLeft.assign(style.bordersRadius.topLeft);
    //            //      object.style.pressed.bordersRadius.topRight.assign(style.bordersRadius.topRight);
    //            //      object.style.pressed.bordersRadius.bottomLeft.assign(style.bordersRadius.bottomLeft);
    //            //      object.style.pressed.bordersRadius.bottomRight.assign(style.bordersRadius.bottomRight);
    //            //    }
    //            //  }
    //            //}
    //            //}
    //        }
    //    },
    //    getPadding: function (className, object) {
    //        var css = $j.css[className];
    //        if (!css) return;
    //        if (!object.padding) return;
    //        if (css.paddingLeft) object.padding.rect.left = +css.paddingLeft.replace($j.types.CSSUnits.PX, String.EMPTY);
    //        if (css.paddingTop) object.padding.rect.top = +css.paddingTop.replace($j.types.CSSUnits.PX, String.EMPTY);
    //        if (css.paddingRight) object.padding.rect.right = +css.paddingRight.replace($j.types.CSSUnits.PX, String.EMPTY);
    //        if (css.paddingBottom) object.padding.rect.bottom = +css.paddingBottom.replace($j.types.CSSUnits.PX, String.EMPTY);
    //    },
    //    getMargins: function (className, object) {
    //        var css = $j.css[className];
    //        if (!css) return;
    //        if (!object.margin) return;
    //        if (css.marginLeft) object.margin.rect.left = +css.marginLeft.replace($j.types.CSSUnits.PX, String.EMPTY);
    //        if (css.marginTop) object.margin.rect.top = +css.marginTop.replace($j.types.CSSUnits.PX, String.EMPTY);
    //        if (css.marginRight) object.margin.rect.right = +css.marginRight.replace($j.types.CSSUnits.PX, String.EMPTY);
    //        if (css.marginBottom) object.margin.rect.bottom = +css.marginBottom.replace($j.types.CSSUnits.PX, String.EMPTY);
    //    },
    //    getSize: function (className, object) {
    //        var css = $j.css[className], w = null, h = null, l = null, t = null, r = null, b = null, style;
    //        if (object instanceof $j.classes.ThemedControl) style = object.style.normal;
    //        else if (object instanceof $j.classes.DrawingInfo) style = object;
    //        if (!css) return;
    //        if (css.width && css.width !== String.EMPTY) w = ~~css.width.replace($j.types.CSSUnits.PX, String.EMPTY) + (style ? style.borderWidth * 2 : 0);
    //        if (css.height && css.height !== String.EMPTY) h = ~~css.height.replace($j.types.CSSUnits.PX, String.EMPTY) + (style ? style.borderWidth * 2 : 0);
    //        if (css.left && css.left !== String.EMPTY) l = ~~css.left.replace($j.types.CSSUnits.PX, String.EMPTY);
    //        if (css.top && css.top !== String.EMPTY) t = ~~css.top.replace($j.types.CSSUnits.PX, String.EMPTY);
    //        if (css.right && css.right !== String.EMPTY) r = ~~css.right.replace($j.types.CSSUnits.PX, String.EMPTY);
    //        if (css.bottom && css.bottom !== String.EMPTY) b = ~~css.bottom.replace($j.types.CSSUnits.PX, String.EMPTY);
    //        if (w) object.width = w;
    //        if (h) object.height = h;
    //        if (l) object.left = l;
    //        if (t) object.top = t;
    //        if (r) object.right = r;
    //        if (b) object.bottom = b;
    //        if (css.position) object.position = css.position;
    //    },
    //    getOpacity: function (className, object) {
    //        var css = $j.css[className];
    //        if (!css) return;
    //        if (css.opacity) object.opacity = +css.opacity;
    //    },
    //    getVisibility: function (className, object) {
    //        var css = $j.css[className];
    //        if (!css) return;
    //        if (css.visibility) {
    //        }
    //    },
    //    getDisplay: function (className, object) {
    //        var css = $j.css[className];
    //        if (!css) return;
    //        if (css.display) {
    //            if (css.display === "none") object.visible = false;
    //        }
    //    },
    //    CSS2Canvas: function (className, object) {
    //        // border radius
    //        this.CSSBorderRadius2Canvas(className, object);
    //        // borders
    //        //this.getBorderColor(className,object);
    //        //this.getBorderWidth(className,object);
    //        this.getBorder(className, object);
    //        // shadow
    //        this.getShadow(className, object);
    //        // background
    //        this.getBackground(className, object);
    //        // outline
    //        this.getOutline(className, object);
    //        // padding
    //        this.getPadding(className, object);
    //        // margin
    //        this.getMargins(className, object);
    //        // size
    //        this.getSize(className, object);
    //        // opacity
    //        this.getOpacity(className, object);
    //        // content
    //        this.getDefaultText(className, object);
    //        // display
    //        this.getDisplay(className, object);
    //    },
    //    CSSFont2Canvas: function (className, font) {
    //        var css = $j.css[className];
    //        if (!css) return;
    //        if (css.fontFamily) font.family = css.fontFamily.replace(/"/g, String.EMPTY);
    //        if (css.fontSize) {
    //            if (css.fontSize.endsWith($j.types.CSSUnits.PO) || css.fontSize.endsWith($j.types.CSSUnits.REM)) {
    //                font.size = parseFloat(css.fontSize);
    //                if (css.fontSize.endsWith($j.types.CSSUnits.PO)) font.sizeUnit = $j.types.CSSUnits.PO;
    //                else font.sizeUnit = $j.types.CSSUnits.REM;
    //            } else {
    //                font.size = parseFloat(css.fontSize);
    //                font.sizeUnit = css.fontSize.substr(css.fontSize.length - 2, 2).toLowerCase();
    //            }
    //        }
    //        if (css.textDecoration) {
    //            if (css.textDecoration === "line-through") font.strikeout = true;
    //            if (css.textDecoration === "underline") font.underline = true;
    //        }
    //        if (css.color) {
    //            font.brush.color.assign(_colors.parse(css.color));
    //            font.brush.style = $j.types.brushStyles.SOLID;
    //        }
    //    },
    //    getDefaultText: function (className, object) {
    //        var css = $j.css[className];
    //        if (!css) return;
    //        if (css.content) {
    //            if (object.caption) object.caption = css.content.replace(/"/g, String.EMPTY);
    //            else if (object.content) object.content = css.content.replace(/"/g, String.EMPTY);
    //        }
    //        if (object.colorContent) {
    //            object.colorContent = css.color;
    //        }
    //    },
    //    getPath: function (css) {
    //        var result = { pathStr: null, fill: null, stroke: null };
    //        if (css.backgroundImage) {
    //            if (css.backgroundImage.includes("base64,")) {
    //                var svg = css.backgroundImage.split(",")[1];
    //                svg = svg.substring(0, svg.length - 2);
    //                svg = atob(svg);
    //                if (svg.includes("path")) {
    //                    var xml = new DOMParser();
    //                    var doc = xml.parseFromString(svg, 'text/xml');
    //                    if (doc.getElementsByTagName("path")[0]) {
    //                        result.pathStr = doc.getElementsByTagName("path")[0].getAttribute("d");
    //                        result.fill = doc.getElementsByTagName("path")[0].getAttribute("fill");
    //                        result.stroke = doc.getElementsByTagName("path")[0].getAttribute("stroke");
    //                    }
    //                }
    //                svg = null;
    //            }
    //        }
    //        return result;
    //    },
    //    generateCSSBorder: function (o) {
    //        var b, borderStyle = "solid";
    //        if (o.stroke.style === $j.brushStyle.NONE) b = "none";
    //        else if (o.stroke.style === $j.brushStyle.SOLID) b = [o.strokeThickness, "px ", borderStyle, String.SPACE, o.stroke.color.toARGBString()].join(String.EMPTY);
    //        else if (o.stroke.style === $j.brushStyle.GRADIENT) {
    //            // NOT SUPPORTED BY ANY BROWSER
    //        } else if (o.stroke.style === $j.brushStyle.BITMAP) {
    //            // récupération des datas du canvas
    //            // ONLY SUPPORTED BY CHROME (border-image) & FIREFOX 15 (-moz-border-image)
    //        }
    //        o.oHtml.style.border = b;
    //        if (o.radius) {
    //            // AT THE MOMENT ONLY BORDER RADIUS ARE APPLIED
    //            o.oHtml.style.borderRadius = o.radius + $j.types.CSSUnits.PX;
    //        }
    //    },
    //    generateCSSBackground: function (o) {
    //        var i;
    //        if (o.fill.style === $j.brushStyle.NONE) {
    //            o.oHtml.style.backgroundImage = "none";
    //            o.oHtml.style.backgroundColor = "none";
    //        }
    //        else if (o.fill.style === $j.brushStyle.SOLID) {
    //            o.oHtml.style.backgroundColor = o.fill.color.toARGBString();
    //            o.oHtml.style.backgroundImage = "none";
    //        } else if (o.fill.style === $j.brushStyle.GRADIENT) {
    //            // TODO : à voir pour la direction du dégradé
    //            var colorstops = o.fill.gradient.items, b;
    //            b = "linear-gradient(top, ";
    //            for (i = 0, l = colorstops.length; i < l; i++) {
    //                if (i > 0) b += ", ";
    //                b += colorstops[i].color.toARGBString() + String.SPACE + (colorstops[i].offset * 100) + $j.types.CSSUnits.PO;
    //            }
    //            b += ")";
    //            if (o.oHtml.style.linearGradient) {
    //            } else if ($j.browser.webkit || $j.browser.chrome || $j.browser.safari) b = "-webkit-" + b;
    //            else if ($j.browser.opera) b = "-o-" + b;
    //            else if ($j.browser.ff) b = "-moz-" + b;
    //            else if ($j.browser.ie) {
    //                // convertion du dégradé en svg
    //                if ($j.browser.coreVersion === 9) {
    //                    b = "url(data:image/svg+xml;base64,";
    //                    // TODO : à voir pour la direction du dégradé
    //                    var svg = '<?xml version="1.0" ?><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none"><linearGradient id="grad" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="0%" y2="100%">';
    //                    for (i = 0, l = colorstops.length; i < l; i++) {
    //                        svg += '<stop offset="' + (colorstops[i].offset * 100) + '%" stop-color="' + colorstops[i].color.toRGBHexString() + '" stop-opacity="' + colorstops[i].color.a + '"/>';
    //                    }
    //                    svg += '</linearGradient><rect x="0" y="0" width="1" height="1" fill="url(#grad)" /></svg>';
    //                    b += btoa(svg) + ")";
    //                } else if ($j.browser.coreVersion > 9) {
    //                    b = "-ms-" + b;
    //                }
    //            }
    //            o.oHtml.style.backgroundImage = b;
    //        } else if (o.fill.style === $j.brushStyle.BITMAP) {
    //            // récupération des datas du canvas
    //            o.oHtml.style.backgroundImage = "url(" + o.fill.bitmap.bitmap.canvas.toDataURL() + ")";
    //            o.oHtml.style.backgroundPosition = "center center";
    //            o.oHtml.style.backgroundRepeat = "no-repeat";
    //        }
    //    },
    //    generateSVGFromPath: function (o, p) {
    //        var b = "url(data:image/svg+xml;base64,", bounds = p.Bounds();
    //        var svg = '<?xml version="1.0"?><svg width="' + bounds.Width() + '" height="' + bounds.Height() + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path ';
    //        if (o.fill.style === $j.brushStyle.SOLID) svg += ' fill="' + o.fill.color.toARGBString() + '"';
    //        else if (o.fill.style === $j.brushStyle.GRADIENT) {
    //        } else if (o.fill.style === $j.brushStyle.BITMAP) {
    //        }
    //        if (o.stroke.style === $j.brushStyle.SOLID) svg += ' stroke="' + o.stroke.color.toARGBString() + '"';
    //        else if (o.stroke.style === $j.brushStyle.GRADIENT) {
    //        } else if (o.stroke.style === $j.brushStyle.BITMAP) {
    //        }
    //        if (o.strokeDash !== $j.canvasProps.lineDahs.SOLID) svg += ' stroke-dasharray="' + o.strokeDash.join(String.SPACE) + '"';
    //        svg += ' d="' + p.PathString() + '" /></svg>';
    //        b += btoa(svg) + ")";
    //        o.oHtml.style.backgroundImage = b;
    //    },
    //    measureText: function (t, f) {
    //        var d, H = 0, W = 0;
    //        if (typeof t !== _const.STRING) return;
    //        if (!(f instanceof $j.font)) return;
    //        d = $j.doc.createElement("div");
    //        //$j.CSS.addClass(d,"basecss");
    //        d.style.position = "absolute";
    //        if (f) f.toCss(d);
    //        d.innerHTML = t;
    //        $j.doc.body.appendChild(d);
    //        H = d.offsetHeight;
    //        W = d.offsetWidth;
    //        $j.doc.body.removeChild(d);
    //        return { w: W, h: H };
    //    },
    //    getSVGStyle: function (o, type) {
    //        // TODO : gestion du dégradé radial & bitmap
    //        if (o[type].style === $j.brushStyle.NONE) return type + ":rgba(0,0,0,0)";
    //        else if (o[type].style === $j.brushStyle.SOLID) return type + ":" + o[type].color.toARGBString();
    //        else if (o[type].style === $j.brushStyle.GRADIENT) {
    //            var colorstops = o[type].gradient.items, g;
    //            g = document.createElementNS($j.SVG.xmlns, "linearGradient");
    //            g.setAttribute("id", "grad");
    //            g.setAttribute("x1", (o[type].gradient.startPosition.x * 100) + $j.types.CSSUnits.PO);
    //            g.setAttribute("y1", (o[type].gradient.startPosition.y * 100) + $j.types.CSSUnits.PO);
    //            g.setAttribute("x2", (o[type].gradient.stopPosition.x * 100) + $j.types.CSSUnits.PO);
    //            g.setAttribute("y2", (o[type].gradient.stopPosition.y * 100) + $j.types.CSSUnits.PO);
    //            for (var i = 0, l = colorstops.length; i < l; i++) {
    //                var stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    //                stop.setAttribute('offset', (colorstops[i].offset * 100) + $j.types.CSSUnits.PO);
    //                stop.setAttribute('stop-color', colorstops[i].color.toRGBHexString());
    //                g.appendChild(stop);
    //            }
    //            o.svg.appendChild(g);
    //            return type + ":url(#grad)";
    //        } else if (o[type].style === $j.brushStyle.BITMAP) {
    //        }
    //    },
    static isCSSRuleExist(selector, ruleType) {
        if (!ruleType) {
            ruleType = Types.CSSRULETYPES.STYLE_RULE;
        }
        for (let i = 0, l = Core.rtStyle.sheet.cssRules.length; i < l; i++) {
            if (Core.rtStyle.sheet.cssRules[i].type === ruleType) {
                if (ruleType === Types.CSSRULETYPES.STYLE_RULE) {
                    if (Core.rtStyle.sheet.cssRules[i].selectorText === selector) {
                        return true;
                    }
                } else if (ruleType === Types.CSSRULETYPES.KEYFRAMES_RULE) {
                    if (Core.rtStyle.sheet.cssRules[i].cssText.includes(selector)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    static addCSSRule(selector, style) {
        if (selector !== "#") {
            if (String.isNullOrEmpty(style)) {
                Core.rtStyle.sheet.insertRule([selector, "{}"].join(String.EMPTY), 0);
            } else {
                Core.rtStyle.sheet.insertRule([selector, " {", style, "}"].join(String.EMPTY), 0);
            }
        }
    }
    static removeCSSRule(selector, ruleType) {
        //#region Variables déclaration
        const rulesIndex = [];
        const CSSRULETYPES = Types.CSSRULETYPES;
        let i = 0;
        //#endregion Variables déclaration
        if (!ruleType) {
            ruleType = CSSRULETYPES.STYLE_RULE;
        }
        const l = Core.rtStyle.sheet.cssRules.length;
        for (; i < l; i++) {
            if (Core.rtStyle.sheet.cssRules[i].type === ruleType) {
                if (ruleType === CSSRULETYPES.STYLE_RULE) {
                    if (Core.rtStyle.sheet.cssRules[i].selectorText === selector) {
                        rulesIndex.push(i);
                    }
                } else if (ruleType === CSSRULETYPES.KEYFRAMES_RULE) {
                    if (Core.rtStyle.sheet.cssRules[i].cssText.includes(selector)) {
                        rulesIndex.push(i);
                    }
                }
            }
        }
        i = rulesIndex.length;
        while (i > 0) {
            Core.rtStyle.sheet.deleteRule(rulesIndex[0]);
            i--;
        }
    }
    //    getCSSValue: function (selector, cssProp, flags, title) {
    //        // on part du dernier stylesheet et on remonte jusqu'au premier ou lorsqu'on a trouvé
    //        var styles = document.styleSheets, selectorFounded = false, isCSSRule = false, styleName;
    //        if (selector !== "*") {
    //            if (!selector.startsWith(".")) selector = "." + selector;
    //        }
    //        if (!$j.tools.valueInSet(flags, $j.types.CSSSelectorsFlags)) flags = $j.types.CSSSelectorsFlags.START;
    //        for (var x = styles.length - 1; x > -1; x--) {
    //            if (title) {
    //                if (styles[x].href) {
    //                    styleName = $j.tools.uri.extractFileName(styles[x].href).split(".").first();
    //                    if (styleName !== String.EMPTY) {
    //                        if (styleName !== title) continue;
    //                    } else continue;
    //                } else continue;
    //            }
    //            var classes = styles[x].rules || styles[x].cssRules;
    //            if (!classes) continue;
    //            for (var i = 0, l = classes.length; i < l; i++) {
    //                if ($j.browser.opera) isCSSRule = (classes[i].className === "CSSRule");
    //                else isCSSRule = (classes[i] instanceof CSSStyleRule);
    //                if (isCSSRule) {
    //                    if (typeof classes[i].selectorText === _const.STRING) {
    //                        if (flags === $j.types.CSSSelectorsFlags.START) selectorFounded = classes[i].selectorText.startsWith(selector);
    //                        else if (flags === $j.types.CSSSelectorsFlags.CONTAINS) selectorFounded = classes[i].selectorText.indexOf(selector) > -1;
    //                        else if (flags === $j.types.CSSSelectorsFlags.ENDS) selectorFounded = classes[i].selectorText.endsWith(selector);
    //                        else selectorFounded = classes[i].selectorText === selector;
    //                        if (selectorFounded) {
    //                            return classes[i].style.getPropertyValue(cssProp);
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //        return String.EMPTY;
    //    },
    //    //CSS.prototype.initODomObject=function(o,s){
    //    //  var r=o.svg?o.AbsoluteRect():o.ClientRect(),svgStroke="",svgFill="";
    //    //  if (s===$j.shapes.CIRCLE){
    //    //    var w=r.Width()>r.Height()?r.Height():r.Width();
    //    //    r.setRight(r.left+w);
    //    //    r.setBottom(r.top+w);
    //    //  }
    //    //  o.oDom.style.MozTransform=o.oDom.style.WebkitTransform=o.oDom.style.OTransform=o.oDom.style.msTransform="rotate("+o.rotateAngle+"deg)";
    //    //  o.oDom.style.left=r.left+"px";
    //    //  o.oDom.style.top=r.top+"px";
    //    //  o.oDom.style.width=r.Width()+"px";
    //    //  o.oDom.style.height=r.Height()+"px";
    //    //  if (s===$j.shapes.ELLIPSE) o.oDom.style.borderRadius=((r.Width()*0.5)+o.strokeThickness)+"px / "+((r.Height()*0.5)+o.strokeThickness)+"px";
    //    //  if (o.svg!==null){
    //    //    svgStroke=this.getSVGStyle(o,"stroke");
    //    //    svgFill=this.getSVGStyle(o,"fill");
    //    //    o.svgElem.setAttributeNS(null,"style","stroke-linejoin:"+o.strokeJoin+";stroke-linecap:"+o.strokeCap+";stroke-width:"+o.strokeThickness+";"+svgStroke+";"+svgFill);
    //    //  }
    //    //};
    //    updateInlineCSS: function (obj, CSSProp, value) {
    //        /*if ((obj.form.loading||obj.loading||obj.HTMLElement===null)&&(CSSProp!==$j.types.jsCSSProperties.ANIMATION)) return;
    //        var r,w;
    //        if ((obj.HTMLElement===null)&&(CSSProp!==$j.types.jsCSSProperties.ANIMATION)) {
    //          obj.HTMLElement=$j.doc.getElementById(obj._internalId);
    //          obj.HTMLElement.jsObj=obj;
    //        }
    //        if (value===null) {
    //          switch (CSSProp) {
    //            case $j.types.jsCSSProperties.LEFT:
    //              if (obj.align===$j.types.aligns.MOSTRIGHT||
    //                  obj.align===$j.types.aligns.RIGHT||
    //                  obj.align===$j.types.aligns.TOPRIGHT||
    //                  obj.align===$j.types.aligns.BOTTOMRIGHT) return;
    //              if (obj.align===$j.types.aligns.HORZCENTER||
    //                  obj.align===$j.types.aligns.CENTER) value="50%";
    //              else value=obj.left+$j.types.CSSUnits.PX;
    //              break;
    //            case $j.types.jsCSSProperties.TOP:
    //              if (obj.align===$j.types.aligns.MOSTBOTTOM||
    //                  obj.align===$j.types.aligns.BOTTOM||
    //                  obj.align===$j.types.aligns.BOTTOMLEFT||
    //                  obj.align===$j.types.aligns.BOTTOMRIGHT) return;
    //              if (obj.align===$j.types.aligns.VERTCENTER||
    //                  obj.align===$j.types.aligns.CENTER) value="50"+$j.types.CSSUnits.PO;
    //              else value=obj.top+$j.types.CSSUnits.PX;
    //              break;
    //            case $j.types.jsCSSProperties.RIGHT:
    //              if (obj.align===$j.types.aligns.MOSTLEFT||
    //                  obj.align===$j.types.aligns.LEFT||
    //                  obj.right===-0xFFFF) return;
    //              value=obj.right+$j.types.CSSUnits.PX;
    //              break;
    //            case $j.types.jsCSSProperties.BOTTOM:
    //              if (obj.bottom===-0xFFFF) return;
    //              value=obj.bottom+$j.types.CSSUnits.PX;
    //              break;
    //            case $j.types.jsCSSProperties.DISPLAY:
    //              if (obj.visible) value="block";
    //              else value="none";
    //              break;
    //            case $j.types.jsCSSProperties.WIDTH:
    //              if (obj.align===$j.types.aligns.MOSTTOP||
    //                  obj.align===$j.types.aligns.TOP||
    //                  obj.align===$j.types.aligns.MOSTBOTTOM||
    //                  obj.align===$j.types.aligns.BOTTOM||
    //                  obj.align===$j.types.aligns.CLIENT||
    //                  obj.align===$j.types.aligns.VERTCENTER) value="auto";
    //              else if (obj instanceof $j.classes.GraphicControl) value=(obj.width-obj.borderWidth*2)+$j.types.CSSUnits.PX;
    //              else if (obj instanceof $j.classes.ThemedControl) {
    //                r=this.getCSSValue(obj.themeAndClassName,"border-left");
    //                if (r!==null) w=~~(r.replace($j.types.CSSUnits.PX,String.EMPTY));
    //                r=this.getCSSValue(obj.themeAndClassName,"border-right");
    //                if (r!==null) w+=~~(r.replace($j.types.CSSUnits.PX,String.EMPTY));
    //                value=(obj.width+w)+$j.types.CSSUnits.PX;
    //              } else value=obj.width+$j.types.CSSUnits.PX;
    //              break;
    //            case $j.types.jsCSSProperties.HEIGHT:
    //              if (obj.align===$j.types.aligns.MOSTLEFT||
    //                  obj.align===$j.types.aligns.LEFT||
    //                  obj.align===$j.types.aligns.MOSTRIGHT||
    //                  obj.align===$j.types.aligns.RIGHT||
    //                  obj.align===$j.types.aligns.CLIENT||
    //                  obj.align===$j.types.aligns.HORZCENTER) value="auto";
    //              else if (obj instanceof $j.classes.GraphicControl) value=(obj.height-obj.borderWidth*2)+$j.types.CSSUnits.PX;
    //              else if (obj instanceof $j.classes.ThemedControl) {
    //                r=this.getCSSValue(obj.themeAndClassName,"border-top");
    //                if (r!==null) w=~~(r.replace($j.types.CSSUnits.PX,String.EMPTY));
    //                r=this.getCSSValue(obj.themeAndClassName,"border-bottom");
    //                if (r!==null) w+=~~(r.replace($j.types.CSSUnits.PX,String.EMPTY));
    //                value=(obj.height+w)+$j.types.CSSUnits.PX;
    //              } else value=obj.height+$j.types.CSSUnits.PX;
    //              break;
    //            case $j.types.jsCSSProperties.TRANSFORM:
    //              value=String.EMPTY;
    //              if (obj.rotateAngle!==0) value+=" rotate("+obj.rotateAngle+"deg)";
    //              if (obj.scale.x!==1||obj.scale.y!==1) value+=" scale("+obj.scale.x+","+obj.scale.y+")";
    //              break;
    //            case $j.types.jsCSSProperties.TRANSFORMORIGIN:
    //              value=obj.rotateCenter.x+$j.types.CSSUnits.PO+String.SPACE+obj.rotateCenter.y+$j.types.CSSUnits.PO;
    //              break;
    //            case $j.types.jsCSSProperties.PADDING:
    //              if (!obj.padding.empty) value=obj.padding.toCSS();
    //              else value=String.EMPTY;
    //              break;
    //            case $j.types.jsCSSProperties.MARGIN:
    //              var offset=0;
    //              if (obj instanceof $j.classes.GraphicControl) offset=obj.borderWidth;
    //              if (obj.align===$j.types.aligns.CENTER) {
    //                value="-"+(~~(obj.height/2)+obj.margin.top+offset)+$j.types.CSSUnits.PX+String.SPACE+obj.margin.right+$j.types.CSSUnits.PX+String.SPACE+
    //                      obj.margin.bottom+$j.types.CSSUnits.PX+" -"+(~~(obj.width/2)+obj.margin.left+offset)+$j.types.CSSUnits.PX;
    //              } else if (obj.align===$j.types.aligns.HORZCENTER) {
    //                value=obj.margin.top+$j.types.CSSUnits.PX+String.SPACE+obj.margin.right+$j.types.CSSUnits.PX+String.SPACE+obj.margin.bottom+
    //                      $j.types.CSSUnits.PX+" -"+(~~(obj.width/2)+obj.margin.left+offset)+$j.types.CSSUnits.PX;
    //              } else if (obj.align===$j.types.aligns.VERTCENTER) {
    //                value="-"+(~~(obj.height/2)+obj.margin.top+offset)+$j.types.CSSUnits.PX+String.SPACE+obj.margin.right+$j.types.CSSUnits.PX+String.SPACE+
    //                      obj.margin.bottom+$j.types.CSSUnits.PX+String.SPACE+obj.margin.left+$j.types.CSSUnits.PX;
    //              }
    //              else if (!obj.margin.empty) value=obj.margin.toCSS();
    //              else value=String.EMPTY;
    //              break;
    //            case $j.types.jsCSSProperties.FONT:
    //              if (obj instanceof $j.classes.ThemedControl) {
    //                //if (!obj.style.customNormal.font.empty) {
    //                //  CSSProp=String.EMPTY;
    //                //  obj.style.customNormal.font.toCss(obj.HTMLElement);
    //                //}
    //              }
    //              break;
    //            case $j.types.jsCSSProperties.COLOR:
    //              if (obj.DOMElement===$j.types.HTMLElements.CANVAS) return;
    //              if (obj instanceof $j.classes.ThemedControl) {
    //                //if (!obj.style.customNormal.font.empty) {
    //                //  value=obj.style.customNormal.font.brush.color.toARGBString();
    //                //}
    //              }
    //              break;
    //            case $j.types.jsCSSProperties.BACKGROUND:
    //              if (obj.DOMElement===$j.types.HTMLElements.CANVAS) return;
    //              if (obj instanceof $j.classes.GraphicControl) {
    //                if (obj.background.style===$j.types.brushStyles.GRADIENT) {
    //                  if (obj.background.gradient.style===$j.types.gradientStyles.LINEAR) {
    //                    value=$j.browser.getVendorPrefix("linear-gradient")+"linear-gradient(";
    //                    // top
    //                    if (obj.background.gradient.stopPosition.x===0&&obj.background.gradient.stopPosition.y===1) {
    //                      value+="top, ";
    //                    } else if (obj.background.gradient.stopPosition.x===1&&obj.background.gradient.stopPosition.y===0) {
    //                      value+="left, ";
    //                    }
    //                    for (var i=0,l=obj.background.gradient.items.length;i<l;i++) {
    //                      value+=obj.background.gradient.items[i].color.toARGBString()+String.SPACE+(obj.background.gradient.items[i].offset*100)+"%";
    //                      if (i<l-1) value+=", ";
    //                    }
    //                    value+=")";
    //                  } else {
    //                  }
    //                } else if (obj.background.style===$j.types.brushStyles.BITMAP) {
    //                }
    //              } else {
    //              }
    //              break;
    //            case $j.types.jsCSSProperties.BACKGROUNDCOLOR:
    //              if (obj.DOMElement===$j.types.HTMLElements.CANVAS) return;
    //              if (obj instanceof $j.classes.GraphicControl) {
    //                switch (obj.background.style) {
    //                  case $j.types.brushStyles.SOLID:
    //                    value=obj.background.color.toARGBString();
    //                    break;
    //                  //case $j.types.brushStyles.GRADIENT:
    //                  //  value=$j.browser.("linear-gradient")+"linear-gradient("
    //                  //  break;
    //                  //case $j.types.brushStyles.BITMAP:
    //                  //  break;
    //                }
    //              } else {
    //              }
    //              //value=
    //              break;
    //            case $j.types.jsCSSProperties.BACKGROUNDREPEAT:
    //              if (obj.DOMElement===$j.types.HTMLElements.CANVAS) return;
    //              break;
    //            case $j.types.jsCSSProperties.BACKGROUNDATTACHMENT:
    //              if (obj.DOMElement===$j.types.HTMLElements.CANVAS) return;
    //              break;
    //            case $j.types.jsCSSProperties.BACKGROUNDIMAGE:
    //              if (obj.DOMElement===$j.types.HTMLElements.CANVAS) return;
    //              if  (obj instanceof $j.classes.Image) {
    //                if (obj.bitmap.src!==String.EMPTY) {
    //                  value="url('"+obj.bitmap.src+"')";
    //                } else return;
    //              }
    //              break;
    //            case $j.types.jsCSSProperties.BACKGROUNDSIZE:
    //              if (obj.DOMElement===$j.types.HTMLElements.CANVAS) return;
    //              break;
    //            case $j.types.jsCSSProperties.BORDER:
    //              if (obj.DOMElement===$j.types.HTMLElements.CANVAS) return;
    //              if (obj instanceof $j.classes.GraphicControl) {
    //                if (obj.border.style!==$j.types.brushStyles.NONE) {
    //                  value=obj.borderWidth+$j.types.CSSUnits.PX+String.SPACE;
    //                  switch (obj.border.style) {
    //                    case $j.types.brushStyles.SOLID:
    //                      value+=" solid "+obj.border.color.toARGBString();
    //                      break;
    //                    case $j.types.brushStyles.GRADIENT:
    //
    //                      break;
    //                    case $j.types.brushStyles.BITMAP:
    //
    //                      break;
    //                  }
    //                }
    //              } else {
    //              }
    //              break;
    //            case $j.types.jsCSSProperties.BORDERRADIUS:
    //              if (obj.DOMElement===$j.types.HTMLElements.CANVAS) return;
    //              if (obj instanceof $j.classes.GraphicControl||obj.bordersRadius!==null) {
    //                value=obj.bordersRadius.topLeft.x+obj.bordersRadius.cssUnit+String.SPACE+obj.bordersRadius.topRight.x+obj.bordersRadius.cssUnit+String.SPACE+
    //                      obj.bordersRadius.bottomRight.x+obj.bordersRadius.cssUnit+String.SPACE+obj.bordersRadius.bottomLeft.x+obj.bordersRadius.cssUnit;
    //                value+=" / "+obj.bordersRadius.topLeft.y+obj.bordersRadius.cssUnit+String.SPACE+obj.bordersRadius.topRight.y+obj.bordersRadius.cssUnit+
    //                      String.SPACE+obj.bordersRadius.bottomRight.y+obj.bordersRadius.cssUnit+String.SPACE+obj.bordersRadius.bottomLeft.y+obj.bordersRadius.cssUnit;
    //              }
    //              break;
    //            case $j.types.jsCSSProperties.MINWIDTH:
    //              break;
    //            case $j.types.jsCSSProperties.MAXWIDTH:
    //              break;
    //            case $j.types.jsCSSProperties.MINHEIGHT:
    //              break;
    //            case $j.types.jsCSSProperties.MAXHEIGHT:
    //              break;
    //            case $j.types.jsCSSProperties.BOXSHADOW:
    //              if (obj instanceof $j.classes.ThemedControl) {
    //                //if (!obj.style.customNormal.back.empty) {
    //                //  r=obj.style.customNormal.back;
    //                //  if (!r.shadowColor.equals(_colors.TRANSPARENT)||r.shadowBlur!==0) {
    //                //    value=r.shadowOffsetX+$j.types.CSSUnits.PX+String.SPACE+r.shadowOffsetY+$j.types.CSSUnits.PX+String.SPACE+r.shadowBlur+$j.types.CSSUnits.PX+String.SPACE+r.shadowColor.toARGBString();
    //                //  }
    //                //  if (obj.DOMElement===$j.types.HTMLElements.LABEL) {
    //                //    CSSProp=$j.types.jsCSSProperties.TEXTSHADOW;
    //                //  } else {
    //                //    CSSProp=$j.types.jsCSSProperties.BOXSHADOW;
    //                //  }
    //                //}
    //              } else if (obj instanceof $j.classes.GraphicControl) {
    //                if (!obj.shadowColor.equals(_colors.TRANSPARENT)||obj.shadowBlur!==0) {
    //                  value=obj.shadowOffsetX+$j.types.CSSUnits.PX+String.SPACE+obj.shadowOffsetY+$j.types.CSSUnits.PX+String.SPACE+obj.shadowBlur+$j.types.CSSUnits.PX+String.SPACE+obj.shadowColor.toARGBString();
    //                }
    //                CSSProp=$j.types.jsCSSProperties.BOXSHADOW;
    //              }
    //              break;
    //            case $j.types.jsCSSProperties.OPACITY:
    //              if (obj.opacity<=1) value=obj.opacity;
    //              break;
    //            case $j.types.jsCSSProperties.ZINDEX:
    //              break;
    //            //case $j.types.jsCSSProperties.CURSOR:
    //            //  value=obj.form.getThemeName()+"_"+obj.cursor;
    //            //  break;
    //            case $j.types.jsCSSProperties.TEXTALIGN:
    //              if (!(obj instanceof $j.classes.CaptionControl)) return;
    //              value=obj.horizAlign;
    //              //switch (obj.horizAlign) {
    //              //  case $j.types.textAligns.LEFT:
    //              //    value="left";
    //              //    break;
    //              //  case $j.types.textAligns.CENTER:
    //              //    value="center";
    //              //    break;
    //              //  case $j.types.textAligns.RIGHT:
    //              //    value="right";
    //              //    break;
    //              //};
    //              break;
    //            case $j.types.jsCSSProperties.LINEHEIGHT:
    //              if (!(obj instanceof $j.classes.CaptionControl)) return;
    //              switch (obj.vertAlign) {
    //                case $j.types.vertTextAligns.TOP:
    //                  value=String.EMPTY;
    //                  break;
    //                case $j.types.vertTextAligns.MIDDLE:
    //                  value=obj.height+$j.types.CSSUnits.PX;
    //                  break;
    //                case $j.types.vertTextAligns.BOTTOM:
    //                  value=((obj.height*2)-$j.tools.font.getTextHeight("°_").H)+$j.types.CSSUnits.PX;
    //                  break;
    //              };
    //              break;
    //            case $j.types.jsCSSProperties.OVERFLOW:
    //              if (obj.clipChilds) value="hidden";
    //              break;
    //            case $j.types.jsCSSProperties.ANIMATION:
    //              if ($j.classes.Animation===null) return;
    //              if (obj instanceof $j.classes.Animation) {
    //                value=obj.toCSS();
    //                obj=obj.owner;
    //              } else return;
    //              break;
    //            case $j.types.jsCSSProperties.ANIMATIONSTATE:
    //              if (obj.pause) value="paused";
    //              else value=String.EMPTY;
    //              obj=obj.owner;
    //              break;
    //          }
    //        }
    //        obj.HTMLElement.style[$j.browser.getVendorPrefix(CSSProp)+CSSProp]=value;
    //        // for scaled object only
    //        //if (CSSProp===$j.types.CSSProperties.TRANSFORM) {
    //        //  if (obj.scale.x!==1||obj.scale.y!==1) {
    //        //    r=obj.HTMLElement.getBoundingClientRect();
    //        //    obj.HTMLElement.style.left=obj.left+~~((r.width-obj.HTMLElement.offsetWidth)/2)+"px";
    //        //    obj.HTMLElement.style.top=obj.top+~~((r.height-obj.HTMLElement.offsetHeight)/2)+"px";
    //        //  }
    //        //}*/
    //    },
    //    /*CSS.prototype.generateCSSProperties=function CSS_generateCSSProperties(obj) {
    //      var r,w=0,offset,cssRule={},cssValue;
    //      if (obj.align!==$j.types.aligns.MOSTRIGHT&&
    //          obj.align!==$j.types.aligns.RIGHT&&
    //          obj.align!==$j.types.aligns.TOPRIGHT&&
    //          obj.align!==$j.types.aligns.BOTTOMRIGHT) {
    //        if (obj.align===$j.types.aligns.HORZCENTER||obj.align===$j.types.aligns.CENTER) cssValue="50"+$j.types.CSSUnits.PO+";";
    //        else cssValue=obj.left+$j.types.CSSUnits.PX+";";
    //        cssRule[$j.types.CSSProperties.LEFT]=cssValue;
    //      }
    //      // top
    //      if (obj.align!==$j.types.aligns.MOSTBOTTOM&&
    //          obj.align!==$j.types.aligns.BOTTOM&&
    //          obj.align!==$j.types.aligns.BOTTOMLEFT&&
    //          obj.align!==$j.types.aligns.BOTTOMRIGHT) {
    //        if (obj.align===$j.types.aligns.VERTCENTER||obj.align===$j.types.aligns.CENTER) cssValue="50"+$j.types.CSSUnits.PO+";";
    //        else cssValue=obj.top+$j.types.CSSUnits.PX+";";
    //        cssRule[$j.types.CSSProperties.TOP]=cssValue;
    //      }
    //      // right
    //      if (obj.align!==$j.types.aligns.MOSTLEFT&&
    //          obj.align!==$j.types.aligns.LEFT&&
    //          obj.right!==-0xFFFF) {
    //        cssRule[$j.types.CSSProperties.RIGHT]=obj.right+$j.types.CSSUnits.PX+";";
    //      }
    //      // bottom
    //      if (obj.bottom!==-0xFFFF) {
    //        cssRule[$j.types.CSSProperties.BOTTOM]=obj.bottom+$j.types.CSSUnits.PX+";";
    //      }
    //      // display
    //      if (obj.visible&&!obj.loading) cssValue="block;";
    //      else cssValue="none;";
    //      cssRule[$j.types.CSSProperties.DISPLAY]=cssValue;
    //      // width
    //      if (obj.align===$j.types.aligns.MOSTTOP||
    //          obj.align===$j.types.aligns.TOP||
    //          obj.align===$j.types.aligns.MOSTBOTTOM||
    //          obj.align===$j.types.aligns.BOTTOM||
    //          obj.align===$j.types.aligns.CLIENT||
    //          obj.align===$j.types.aligns.VERTCENTER) cssValue="auto;";
    //      else if (obj instanceof $j.classes.GraphicControl) cssValue=(obj.width-obj.borderWidth*2)+$j.types.CSSUnits.PX+";";
    //      else if (obj instanceof $j.classes.ThemedControl) {
    //        r=this.getCSSValue(obj.themeAndClassName,$j.types.CSSProperties.BORDERLEFTWIDTH,$j.types.CSSSelectorsFlags.CONTAINS);
    //        if (r!==null) w=~~(r.replace($j.types.CSSUnits.PX,String.EMPTY));
    //        r=this.getCSSValue(obj.themeAndClassName,$j.types.CSSProperties.BORDERRIGHTWIDTH,$j.types.CSSSelectorsFlags.CONTAINS);
    //        if (r!==null) w+=~~(r.replace($j.types.CSSUnits.PX,String.EMPTY));
    //        cssValue=(obj.width-w)+$j.types.CSSUnits.PX+";";
    //      } else cssValue=obj.width+$j.types.CSSUnits.PX+";";
    //      cssRule[$j.types.CSSProperties.WIDTH]=cssValue;
    //      // height
    //      if (obj.align===$j.types.aligns.MOSTLEFT||
    //          obj.align===$j.types.aligns.LEFT||
    //          obj.align===$j.types.aligns.MOSTRIGHT||
    //          obj.align===$j.types.aligns.RIGHT||
    //          obj.align===$j.types.aligns.CLIENT||
    //          obj.align===$j.types.aligns.HORZCENTER) cssValue="auto;";
    //      else if (obj instanceof $j.classes.GraphicControl) cssValue=(obj.height-obj.borderWidth*2)+$j.types.CSSUnits.PX+";";
    //      else if (obj instanceof $j.classes.ThemedControl) {
    //        r=this.getCSSValue(obj.themeAndClassName,$j.types.CSSProperties.BORDERTOPWIDTH,$j.types.CSSSelectorsFlags.CONTAINS);
    //        if (r!==null) w=~~(r.replace($j.types.CSSUnits.PX,String.EMPTY));
    //        r=this.getCSSValue(obj.themeAndClassName,$j.types.CSSProperties.BORDERBOTTOMWIDTH,$j.types.CSSSelectorsFlags.CONTAINS);
    //        if (r!==null) w+=~~(r.replace($j.types.CSSUnits.PX,String.EMPTY));
    //        cssValue=(obj.height-w)+$j.types.CSSUnits.PX+";";
    //      } else cssValue=obj.height+$j.types.CSSUnits.PX+";";
    //      cssRule[$j.types.CSSProperties.HEIGHT]=cssValue;
    //      // transform
    //      cssValue=String.EMPTY;
    //      if (obj.rotateAngle!==0) cssValue=$j.types.CSSProperties.ROTATE+"("+obj.rotateAngle+"deg)";
    //      if (obj.scale.x!==1||obj.scale.y!==1) cssValue+=String.SPACE+$j.types.CSSProperties.SCALE+"("+obj.scale.x+","+obj.scale.y+")";
    //      if (cssValue!==String.EMPTY) cssRule[$j.browser.getVendorPrefix($j.types.CSSProperties.TRANSFORM)+$j.types.CSSProperties.TRANSFORM]=cssValue+";";
    //      // transformorigin
    //      if (obj.rotateCenter.x!==0||obj.rotateCenter.y!==0) {
    //        cssValue=obj.rotateCenter.x+$j.types.CSSUnits.PO+String.SPACE+obj.rotateCenter.y+$j.types.CSSUnits.PO+";";
    //        cssRule[$j.browser.getVendorPrefix($j.types.CSSProperties.TRANSFORMORIGIN)+$j.types.CSSProperties.TRANSFORMORIGIN]=cssValue;
    //      }
    //      // padding
    //      if (!obj.padding.empty) cssRule[$j.types.CSSProperties.PADDING]=obj.padding.toCSS()+";";
    //      // margin
    //      cssValue=String.EMPTY;
    //      offset=0;
    //      //if (obj instanceof $j.classes.GraphicControl) value=obj.borderWidth;
    //      if (obj.align===$j.types.aligns.CENTER) {
    //        cssValue="-"+(~~(obj.height/2)+obj.margin.top+offset)+$j.types.CSSUnits.PX+String.SPACE+obj.margin.right+$j.types.CSSUnits.PX+
    //              String.SPACE+obj.margin.bottom+$j.types.CSSUnits.PX+" -"+(~~(obj.width/2)+obj.margin.left+offset)+$j.types.CSSUnits.PX+";";
    //      } else if (obj.align===$j.types.aligns.HORZCENTER) {
    //        cssValue=obj.margin.top+$j.types.CSSUnits.PX+String.SPACE+obj.margin.right+$j.types.CSSUnits.PX+String.SPACE+obj.margin.bottom+
    //              $j.types.CSSUnits.PX+" -"+(~~(obj.width/2)+obj.margin.left+offset)+$j.types.CSSUnits.PX+";";
    //      } else if (obj.align===$j.types.aligns.VERTCENTER) {
    //        cssValue=(~~(obj.height/2)+obj.margin.top+offset)+$j.types.CSSUnits.PX+String.SPACE+obj.margin.right+$j.types.CSSUnits.PX+
    //              String.SPACE+obj.margin.bottom+$j.types.CSSUnits.PX+String.SPACE+obj.margin.left+$j.types.CSSUnits.PX+";";
    //      }
    //      else if (!obj.margin.empty) cssValue=obj.margin.toCSS()+";";
    //      if (cssValue!==String.EMPTY) cssRule[$j.types.CSSProperties.MARGIN]=cssValue;
    //      // font
    //      if (obj instanceof $j.classes.ThemedControl) {
    //        //if (!obj.style.customNormal.font.empty) {
    //        //  cssValue=obj.style.customNormal.font.toCssString();
    //        //  cssRule[$j.types.CSSProperties.FONT]=cssValue;
    //        //}
    //      }
    //      // color
    //      if (obj.DOMElement!==$j.types.HTMLElements.CANVAS) {
    //        if (obj instanceof $j.classes.ThemedControl) {
    //          //if (!obj.style.customNormal.font.empty) {
    //          //  cssValue=obj.style.customNormal.font.brush.color.toARGBString()+";";
    //          //  cssRule[$j.types.CSSProperties.COLOR]=cssValue;
    //          //}
    //        }
    //      }
    //      // background
    //      cssValue=String.EMPTY;
    //      if (obj.DOMElement!==$j.types.HTMLElements.CANVAS) {
    //        if (obj instanceof $j.classes.GraphicControl) {
    //          if (obj.background.style===$j.types.brushStyles.GRADIENT) {
    //            if (obj.background.gradient.style===$j.types.gradientStyles.LINEAR) {
    //              cssValue=$j.browser.getVendorPrefix($j.types.CSSProperties.LINEARGRADIENT)+$j.types.CSSProperties.LINEARGRADIENT+"(";
    //              // top
    //              if (obj.background.gradient.stopPosition.x===0&&obj.background.gradient.stopPosition.y===1) {
    //                cssValue+=$j.types.CSSProperties.TOP+", ";
    //              } else if (obj.background.gradient.stopPosition.x===1&&obj.background.gradient.stopPosition.y===0) {
    //                cssValue+=$j.types.CSSProperties.LEFT+", ";
    //              } else {
    //                // calculate the angle from points
    //                var dx=obj.background.gradient.stopPosition.x-obj.background.gradient.startPosition.x;
    //                var dy=obj.background.gradient.stopPosition.y-obj.background.gradient.startPosition.y;
    //                var angle=-$j.convert.rad2Deg($j.atan2(dy,dx));
    //                cssValue+=~~angle+"deg, ";
    //              }
    //              for (var i=0,l=obj.background.gradient.items.length;i<l;i++) {
    //                cssValue+=obj.background.gradient.items[i].color.toARGBString()+String.SPACE+(obj.background.gradient.items[i].offset*100)+$j.types.CSSUnits.PO;
    //                if (i<l-1) cssValue+=", ";
    //              }
    //              cssValue+=");";
    //            } else {
    //            }
    //          } else if (obj.background.style===$j.types.brushStyles.BITMAP) {
    //          }
    //        } else {
    //        }
    //
    //        if (cssValue!==String.EMPTY) cssRule[$j.types.CSSProperties.BACKGROUND]=cssValue;
    //      }
    //      // backgroundcolor
    //      cssValue=String.EMPTY;
    //      if (obj.DOMElement!==$j.types.HTMLElements.CANVAS) {
    //        if (obj instanceof $j.classes.GraphicControl) {
    //          switch (obj.background.style) {
    //            case $j.types.brushStyles.SOLID:
    //              cssValue=obj.background.color.toARGBString()+";";
    //              break;
    //            //case $j.types.brushStyles.GRADIENT:
    //            //  value=$j.browser.("linear-gradient")+"linear-gradient("
    //            //  break;
    //            //case $j.types.brushStyles.BITMAP:
    //            //  break;
    //          }
    //        } else {
    //        }
    //        if (cssValue!==String.EMPTY) cssRule[$j.types.CSSProperties.BACKGROUNDCOLOR]=cssValue;
    //      }
    //      // backgroundrepeat
    //      if (obj.DOMElement!==$j.types.HTMLElements.CANVAS) {
    //      }
    //      // backgroundattachment
    //      if (obj.DOMElement!==$j.types.HTMLElements.CANVAS) {
    //      }
    //      // backgroundimage
    //      if (obj.DOMElement!==$j.types.HTMLElements.CANVAS) {
    //        if  (obj instanceof $j.classes.Image) {
    //          if (obj.bitmap.src!==String.EMPTY) {
    //            cssValue='url("'+obj.bitmap.src+'");';
    //            cssRule[$j.types.CSSProperties.BACKGROUNDIMAGE]=cssValue;
    //          } else return;
    //        }
    //      }
    //      // backgroundsize
    //      if (obj.DOMElement!==$j.types.HTMLElements.CANVAS) {
    //      }
    //      // border
    //      if (obj.DOMElement!==$j.types.HTMLElements.CANVAS) {
    //        if (obj instanceof $j.classes.GraphicControl) {
    //          if (obj.border.style!==$j.types.brushStyles.NONE) {
    //            cssValue=obj.borderWidth+$j.types.CSSUnits.PX+String.SPACE;
    //            switch (obj.border.style) {
    //              case $j.types.brushStyles.SOLID:
    //                cssValue+=" solid "+obj.border.color.toARGBString();
    //                break;
    //              case $j.types.brushStyles.GRADIENT:
    //
    //                break;
    //              case $j.types.brushStyles.BITMAP:
    //
    //                break;
    //            }
    //            cssValue+=";";
    //          }
    //          cssRule[$j.types.CSSProperties.BORDER]=cssValue;
    //        } else {
    //        }
    //      }
    //      // borderradius
    //      if (obj.DOMElement!==$j.types.HTMLElements.CANVAS) {
    //        if (obj instanceof $j.classes.GraphicControl||obj.bordersRadius!==null) {
    //          cssValue=obj.bordersRadius.topLeft.x+obj.bordersRadius.cssUnit+String.SPACE+obj.bordersRadius.topRight.x+obj.bordersRadius.cssUnit+
    //                String.SPACE+obj.bordersRadius.bottomRight.x+obj.bordersRadius.cssUnit+String.SPACE+obj.bordersRadius.bottomLeft.x+obj.bordersRadius.cssUnit;
    //          cssValue+=" / "+obj.bordersRadius.topLeft.y+obj.bordersRadius.cssUnit+String.SPACE+obj.bordersRadius.topRight.y+obj.bordersRadius.cssUnit+
    //                String.SPACE+obj.bordersRadius.bottomRight.y+obj.bordersRadius.cssUnit+String.SPACE+obj.bordersRadius.bottomLeft.y+obj.bordersRadius.cssUnit;
    //          cssValue+=";";
    //          cssRule[$j.types.CSSProperties.BORDERRADIUS]=cssValue;
    //        } else {
    //        }
    //      }
    //      // minwidth
    //      // maxwidth
    //      // minheight
    //      // maxheight
    //      // shadow
    //      if (obj instanceof $j.classes.ThemedControl) {
    //        //if (!obj.style.customNormal.back.empty) {
    //        //  r=obj.style.customNormal.back;
    //        //  if (!r.shadowColor.equals(_colors.TRANSPARENT)||r.shadowBlur!==0) {
    //        //    cssValue=r.shadowOffsetX+$j.types.CSSUnits.PX+String.SPACE+r.shadowOffsetY+$j.types.CSSUnits.PX+String.SPACE+r.shadowBlur+$j.types.CSSUnits.PX+
    //        //          String.SPACE+r.shadowColor.toARGBString()+";";
    //        //    if (obj.DOMElement===$j.types.HTMLElements.LABEL) {
    //        //      cssRule[$j.types.CSSProperties.TEXTSHADOW]=cssValue;
    //        //    } else {
    //        //      cssRule[$j.types.CSSProperties.BOXSHADOW]=cssValue;
    //        //    }
    //        //  }
    //        //}
    //      } else if (obj instanceof $j.classes.GraphicControl) {
    //        if (!obj.shadowColor.equals(_colors.TRANSPARENT)||obj.shadowBlur!==0) {
    //          cssValue=obj.shadowOffsetX+$j.types.CSSUnits.PX+String.SPACE+obj.shadowOffsetY+$j.types.CSSUnits.PX+String.SPACE+obj.shadowBlur+
    //                $j.types.CSSUnits.PX+String.SPACE+obj.shadowColor.toARGBString()+";";
    //          cssRule[$j.types.CSSProperties.BOXSHADOW]=cssValue;
    //        }
    //      }
    //      // opacity
    //      if (obj.opacity<1) cssRule[$j.types.CSSProperties.OPACITY]=obj.opacity+";";
    //      // zindex
    //      // textalign
    //      if (obj instanceof $j.classes.CaptionControl) {
    //        //switch (obj.horizAlign) {
    //        //  case $j.types.textAligns.LEFT:
    //        //    cssValue=$j.types.CSSProperties.LEFT+";";
    //        //    break;
    //        //  case $j.types.textAligns.CENTER:
    //        //    style+="center;";
    //        //    break;
    //        //  case $j.types.textAligns.RIGHT:
    //        //    style+="right;";
    //        //    break;
    //        //};
    //        cssRule[$j.types.CSSProperties.TEXTALIGN]=obj.horizAlign+";";
    //      }
    //      // lineheight
    //      if (obj.vertAlign!==null) {
    //        cssValue=String.EMPTY;
    //        switch (obj.vertAlign) {
    //          case $j.types.vertTextAligns.TOP:
    //            //style+=String.EMPTY;
    //            break;
    //          case $j.types.vertTextAligns.MIDDLE:
    //            cssValue=obj.height+$j.types.CSSUnits.PX+";";
    //            break;
    //          case $j.types.vertTextAligns.BOTTOM:
    //            cssValue=~~((obj.height-$j.tools.text.getTextSizes(obj.caption,null,obj.HTMLElement).h)/2)+$j.types.CSSUnits.PX+";";
    //            break;
    //        }
    //        cssRule[$j.types.CSSProperties.LINEHEIGHT]=cssValue;
    //      }
    //      // overflow
    //      if (obj.clipChilds) cssRule[$j.types.CSSProperties.OVERFLOW]="hidden;";
    //      // animation
    //      //if (obj instanceof $j.classes.Animation) {
    //      //  value=obj.toCSS();
    //      //  obj=obj.owner;
    //      //}
    //      //// animationstate
    //      //if (obj.pause) value="paused";
    //      //else value=String.EMPTY;
    //      //obj=obj.owner;
    //
    //      //this.addCSSRule("#"+obj.name,style);
    //      return cssRule;
    //    };*/
    //    updateAllInlineCSS: function (obj) {
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.LEFT);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.TOP);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.RIGHT);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.BOTTOM);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.DISPLAY);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.WIDTH);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.HEIGHT);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.TRANSFORM);
    //        //this.updateInlineCSS(obj,$j.types.CSSProperties.TRANSFORMORIGIN);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.PADDING);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.MARGIN);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.FONT);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.COLOR);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.BACKGROUND);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.BACKGROUNDCOLOR);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.BACKGROUNDREPEAT);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.BACKGROUNDATTACHMENT);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.BACKGROUNDIMAGE);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.BACKGROUNDPOSITION);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.BACKGROUNDSIZE);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.TEXTALIGN);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.BORDER);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.BORDERRADIUS);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.MINWIDTH);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.MAXWIDTH);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.MINHEIGHT);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.MAXHEIGHT);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.SHADOW);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.OPACITY);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.ZINDEX);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.LINEHEIGHT);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.OVERFLOW);
    //        this.updateInlineCSS(obj, $j.types.CSSProperties.ANIMATION);
    //    },
    //    /*CSS.prototype.generateCSSText=function CSS_generateCSSText(cssRule) {
    //      var cssText=String.EMPTY;
    //      for (var p in cssRule) {
    //        if (cssRule.hasOwnProperty(p)) {
    //          if (cssRule[p]!==String.EMPTY) cssText+=p+":"+cssRule[p];
    //        }
    //      }
    //      return cssText;
    //    };*/
    //    removeClassFromSet: function (obj, set, prop) {
    //        var names, _class = String.EMPTY;
    //        if (!obj) return;
    //        if (!set) return;
    //        if (!prop) return;
    //        names = Object.getOwnPropertyNames(set);
    //        for (var i = 0, l = names.length; i < l; i++) {
    //            _class += prop + "-" + set[names[i]] + String.SPACE;
    //        }
    //        if (_class !== String.EMPTY) $j.CSS.removeClass(obj, _class);
    //    }
    //    //#endregion
    //}
    //Object.seal($j.CSS);
    //#endregion

    /*
    .button                       -> back
    .button:hover                 -> back
    .button:active                -> back

    .button:before                -> middle
    .button:hover:before          -> middle
    .button:active:before         -> middle

    .button:after                 -> front
    .button:hover:after           -> front
    .button:active:after          -> front

    .theme_button                 -> back
    .theme_button:hover           -> back
    .theme_button:active          -> back

    .theme_button:before          -> middle
    .theme_button:hover:before    -> middle
    .theme_button:active:before   -> middle

    .theme_button:after           -> front
    .theme_button:hover:after     -> front
    .theme_button:active:after    -> front
    */
}
export { Css };
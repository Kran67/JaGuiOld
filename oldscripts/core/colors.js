(function() {
    //#region Color
    $j.classes.Color = $j.classes.Bindable.extend("Color",{
        init: function() {
            this.red = 0;
            this.green = 0;
            this.blue = 0;
            this.alpha = 0;
            this.hue = 0;
            this.saturation = 0;
            this.value = 0;
            this.lightness = 0;
            this._owner = null;
            if(arguments.length > 0) {
                for(var i = 0,l = arguments.length;i < l;i++) {
                    var arg = arguments[i];
                    if(arg instanceof $j.classes.Color) this.assign(arg);
                    if($j.classes.Control) {
                        if(arg instanceof $j.classes.Control) this._owner = arg;
                    }
                }
            }
            this._updating = false;
        },
        //#region Setter
        setRed: function(newValue) {
            if(typeof newValue !== _const.NUMBER) return;
            if(newValue !== this.red) {
                newValue = _conv.toByte(newValue);
                this.red = newValue;
                if(!this._updating) {
                    this.RGBtoHSV();
                    this.RGBtoHSL();
                }
                this.propertyChanged("red");
                if(this._owner && !this._owner._loading) this._owner.update();
            }
        },
        setGreen: function(newValue) {
            if(typeof newValue !== _const.NUMBER) return;
            if(newValue !== this.green) {
                newValue = _conv.toByte(newValue);
                this.green = newValue;
                if(!this._updating) {
                    this.RGBtoHSV();
                    this.RGBtoHSL();
                }
                this.propertyChanged("green");
                if(this._owner && !this._owner._loading) this._owner.update();
            }
        },
        setBlue: function(newValue) {
            if(typeof newValue !== _const.NUMBER) return;
            if(newValue !== this.blue) {
                newValue = _conv.toByte(newValue);
                this.blue = newValue;
                if(!this._updating) {
                    this.RGBtoHSV();
                    this.RGBtoHSL();
                }
                this.propertyChanged("blue");
                if(this._owner && !this._owner._loading) this._owner.update();
            }
        },
        setAlpha: function(newValue) {
            if(typeof newValue !== _const.NUMBER) return;
            if(newValue !== this.alpha) {
                if(newValue > 1) newValue = 1;
                if(newValue < 0) newValue = 0;
                this.alpha = newValue;
                this.propertyChanged("alpha");
                if(this._owner && !this._owner._loading) this._owner.update();
            }
        },
        setHue: function(newValue) {
            if(typeof newValue !== _const.NUMBER) return;
            if(newValue !== this.hue) {
                //newValue=newValue%360;
                if(newValue < 0) newValue = 0;
                if(newValue > 360) newValue = 360;
                this.hue = newValue;
                if(!this._updating) this.HSVtoRGB();
                this.propertyChanged("hue");
                if(this._owner && !this._owner._loading) this._owner.update();
            }
        },
        setSaturation: function(newValue) {
            if(typeof newValue !== _const.NUMBER) return;
            if(newValue !== this.saturation) {
                if(newValue < 0) newValue = 0;
                if(newValue > 100) newValue = 100;
                this.saturation = newValue;
                if(!this._updating) this.HSVtoRGB();
                this.propertyChanged("saturation");
                if(this._owner && !this._owner._loading) this._owner.update();
            }
        },
        setValue: function(newValue) {
            if(typeof newValue !== _const.NUMBER) return;
            if(newValue !== this.value) {
                if(newValue < 0) newValue = 0;
                if(newValue > 100) newValue = 100;
                this.value = newValue;
                if(!this._updating) this.HSVtoRGB();
                this.propertyChanged("value");
                if(this._owner && !this._owner._loading) this._owner.update();
            }
        },
        setLightness: function(newValue) {
            if(typeof newValue !== _const.NUMBER) return;
            if(newValue !== this.lightness) {
                if(newValue < 0) newValue = 0;
                if(newValue > 100) newValue = 100;
                this.lightness = newValue;
                if(!this._updating) this.HSLtoRGB();
                this.propertyChanged("lightness");
                if(this._owner && !this._owner._loading) this._owner.update();
            }
        },
        setHSV: function(hue,saturation,value) {
            if(typeof hue !== _const.NUMBER) return;
            if(typeof saturation !== _const.NUMBER) return;
            if(typeof value !== _const.NUMBER) return;
            this.hue = hue;
            this.saturation = saturation;
            this.value = value;
            if(!this._updating) this.HSVtoRGB();
            if(this._owner && !this._owner._loading) this._owner.update();
        },
        setHSL: function(hue,saturation,lightness) {
            if(typeof hue !== _const.NUMBER) return;
            if(typeof saturation !== _const.NUMBER) return;
            if(typeof lightness !== _const.NUMBER) return;
            this.hue = hue;
            this.saturation = saturation;
            this.lightness = lightness;
            if(!this._updating) this.HSLtoRGB();
            if(this._owner && !this._owner._loading) this._owner.update();
        },
        //#endregion
        //#region Methods
        clone: function() {
            var c = new $j.classes.Color(this.red,this.green,this.blue,this.alpha);
            return c;
        },
        toRGBHexString: function() { return ("#" + _conv.dec2Hex(this.red).padLeft(2,'0') + _conv.dec2Hex(this.green).padLeft(2,'0') + _conv.dec2Hex(this.blue).padLeft(2,'0')).toUpperCase(); },
        toARGBHexString: function() { return ("#" + _conv.dec2Hex(this.alpha * 0xFF).padLeft(2,'0') + _conv.dec2Hex(this.red).padLeft(2,'0') + _conv.dec2Hex(this.green).padLeft(2,'0') + _conv.dec2Hex(this.blue).padLeft(2,'0')).toUpperCase(); },
        toRGBString: function() { return "rgb(" + this.red + "," + this.green + "," + this.blue + ")"; },
        toARGBString: function() { return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")"; },
        toHSLString: function() { return "hsl(" + this.hue + "," + this.saturation + "," + this.lightness + ")"; },
        toHSVString: function() { return "hsv(" + this.hue + "," + this.saturation + "," + this.value + ")"; },
        toBGRString: function() { return (_conv.dec2Hex(this.blue).padLeft(2,'0') + _conv.dec2Hex(this.green).padLeft(2,'0') + _conv.dec2Hex(this.red).padLeft(2,'0')).toUpperCase(); },
        toInt: function() { return "0x" + this.toBGRString(); },
        append: function(color) {
            if(!(color instanceof $j.classes.Color)) return;
            if(this.alpha + color.alpha < 1) this.alpha = color.alpha + s1.alpha;
            else this.alpha = 1;
            if(this.alpha > 1) this.alpha = 1;
            if(this.red + color.red < 0xFF) this.red = _conv.toByte(color.red + s1.red);
            else this.red = 0xFF;
            if(this.green + color.green < 0xFF) this.green = _conv.toByte(color.green + s1.green);
            else this.green = 0xFF;
            if(this.blue + color.blue < 0xFF) this.blue = _conv.toByte(color.blue + s1.blue);
            else this.blue = 0xFF;
            return this;
        },
        subtract: function(color) {
            if(!(color instanceof $j.classes.Color)) return;
            if(this.alpha - color.alpha < 1) this.alpha = color.alpha - s1.alpha;
            else this.alpha = 1;
            if(this.alpha < 0) this.alpha = 0;
            if(this.red - color.red < 0xFF) this.red = _conv.toByte(color.red - s1.red);
            else this.red = 0xFF;
            if(this.green - color.green < 0xFF) this.green = _conv.toByte(color.green - s1.green);
            else this.green = 0xFF;
            if(this.blue - color.blue < 0xFF) this.blue = _conv.toByte(color.blue - s1.blue);
            else this.blue = 0xFF;
            return this;
        },
        RGBtoBGR: function() {
            this.red = this.blue;
            this.blue = this.red;
            return this;
        },
        premultyAlpha: function() {
            if(this.alpha === 0) {
                this.red = 0;
                this.green = 0;
                this.blue = 0;
            }
            else if(this.a !== 1) {
                this.red = _conv.toByte($j.trunc(this.red * this.alpha));
                this.green = _conv.toByte($j.trunc(this.green * this.alpha));
                this.blue = _conv.toByte($j.trunc(this.blue * this.alpha));
            }
            return this;
        },
        unPremultyAlpha: function() {
            if(this.alpha === 0) {
                this.red = 0;
                this.green = 0;
                this.blue = 0;
            } else {
                this.red = $j.trunc(this.red / this.alpha);
                this.green = $j.trunc(this.green / this.alpha);
                this.blue = $j.trunc(this.blue / this.alpha);
            }
            return this;
        },
        opacity: function(opacity) {
            if(typeof opacity !== _const.NUMBER) return;
            if(opacity < 1) this.alpha = ((this.alpha * 0xFF) * opacity) / 0xFF;
            if(this.alpha > 1) this.alpha = 1;
            if(this.alpha < 0) this.alpha = 0;
            return this;
        },
        equals: function(color) {
            return this.red === color.red &&
                   this.green === color.green &&
                   this.blue === color.blue &&
                   this.alpha === color.alpha &&
                   this.hue === color.hue &&
                   this.saturation === color.saturation &&
                   this.value === color.value &&
                   this.lightness === color.lightness;
        },
        assign: function(source) {
            if(!(source instanceof $j.classes.Color)) return;
            this.alpha = source.alpha;
            this.red = source.red;
            this.green = source.green;
            this.blue = source.blue;
            this.hue = source.hue;
            this.saturation = source.saturation;
            this.value = source.value;
            this.lightness = source.lightness;
            if(this._owner && !this._owner._loading) this._owner.update();
        },
        inverse: function() {
            this.red = 255 - this.red;
            this.blue = 255 - this.blue;
            this.green = 255 - this.green;
            if(!this._updating) {
                this.RGBtoHSV();
                this.RGBtoHSL();
            }
        },
        beginUpdate: function() {
            this._updating = true;
        },
        endUpdate: function() {
            this._updating = false;
        },
        HSVtoRGB: function() {
            var sat = this.saturation / 100,
                value = this.value / 100,
                c = sat * value,
                h = this.hue / 60,
                x = c * (1 - $j.abs(h % 2 - 1)),
                m = value - c,
                precision = 255;
            c = (c + m) * precision | 0;
            x = (x + m) * precision | 0;
            m = m * precision | 0;
            if(h >= 0 && h < 1) { this.red = c; this.green = x; this.blue = m; return; }
            if(h >= 1 && h < 2) { this.red = x; this.green = c; this.blue = m; return; }
            if(h >= 2 && h < 3) { this.red = m; this.green = c; this.blue = x; return; }
            if(h >= 3 && h < 4) { this.red = m; this.green = x; this.blue = c; return; }
            if(h >= 4 && h < 5) { this.red = x; this.green = m; this.blue = c; return; }
            if(h >= 5 && h < 6) { this.red = c; this.green = m; this.blue = x; return; }
        },
        HSLtoRGB: function() {
            var sat = this.saturation / 100,
                light = this.lightness / 100,
                c = sat * (1 - $j.abs(2 * light - 1)),
                h = this.hue / 60,
                x = c * (1 - $j.abs(h % 2 - 1)),
                m = light - c / 2,
                precision = 255;
            c = (c + m) * precision | 0;
            x = (x + m) * precision | 0;
            m = m * precision | 0;
            if(h >= 0 && h < 1) { this.red = c; this.green = x; this.blue = m; return; }
            if(h >= 1 && h < 2) { this.red = x; this.green = c; this.blue = m; return; }
            if(h >= 2 && h < 3) { this.red = m; this.green = c; this.blue = x; return; }
            if(h >= 3 && h < 4) { this.red = m; this.green = x; this.blue = c; return; }
            if(h >= 4 && h < 5) { this.red = x; this.green = m; this.blue = c; return; }
            if(h >= 5 && h < 6) { this.red = c; this.green = m; this.blue = x; return; }
        },
        RGBtoHSV: function() {
            var red = this.red / 255,
                green = this.green / 255,
                blue = this.blue / 255,
            cMax = $j.max(red,green,blue),
            cMin = $j.min(red,green,blue),
                delta = cMax - cMin,
            hue = 0,
            saturation = 0;
            if(delta) {
                if(cMax === red) { hue = ((green - blue) / delta); }
                if(cMax === green) { hue = 2 + (blue - red) / delta; }
                if(cMax === blue) { hue = 4 + (red - green) / delta; }
                if(cMax) saturation = delta / cMax;
            }
            this.hue = 60 * hue | 0;
            if(this.hue < 0) this.hue += 360;
            this.saturation = (saturation * 100) | 0;
            this.value = (cMax * 100) | 0;
        },
        RGBtoHSL: function() {
            var red = this.red / 255,
                green = this.green / 255,
                blue = this.blue / 255,
            cMax = $j.max(red,green,blue),
            cMin = $j.min(red,green,blue),
                delta = cMax - cMin,
            hue = 0,
            saturation = 0,
            lightness = (cMax + cMin) / 2,
            X = (1 - $j.abs(2 * lightness - 1));
            if(delta) {
                if(cMax === red) { hue = ((green - blue) / delta); }
                if(cMax === green) { hue = 2 + (blue - red) / delta; }
                if(cMax === blue) { hue = 4 + (red - green) / delta; }
                if(cMax) saturation = delta / X;
            }
            this.hue = 60 * hue | 0;
            if(this.hue < 0) this.hue += 360;
            this.saturation = (saturation * 100) | 0;
            this.lightness = (lightness * 100) | 0;
        },
        getForeColorHex: function() {
            if((0.3 * this.red) + (0.59 * this.green) + (0.11 * this.blue) <= 128) return "#FFF";
            else return "#000";
        },
        destroy: function() {
            this.red = null;
            this.green = null;
            this.blue = null;
            this.alpha = null;
            this.hue = null;
            this.saturation = null;
            this.value = null;
            this.lightness = null;
            this._owner = null;
            this._updating = null;
        }
        //#endregion
    });
    // Public
    $j.tools.colors = {
        createFromRGBA: function(red,green,blue,alpha) {
            var c = new $j.classes.Color;
            if(typeof red !== _const.NUMBER) red = 0;
            if(typeof green !== _const.NUMBER) green = 0;
            if(typeof blue !== _const.NUMBER) blue = 0;
            if(typeof alpha !== _const.NUMBER) alpha = 0;
            c.beginUpdate();
            red = _conv.toByte(red);
            green = _conv.toByte(green);
            blue = _conv.toByte(blue);
            alpha = (alpha > 1) ? 1 : alpha;
            c.red = red;
            c.green = green;
            c.blue = blue;
            c.alpha = alpha;
            c.RGBtoHSL();
            c.RGBtoHSV();
            c.endUpdate();
            return c;
        },
        createFromHSL: function(hue,saturation,lightness) {
            var c = new $j.classes.Color;
            if(typeof hue !== _const.NUMBER) hue = 0;
            if(typeof saturation !== _const.NUMBER) saturation = 0;
            if(typeof lightness !== _const.NUMBER) lightness = 0;
            hue %= 360;
            saturation %= 100;
            lightness %= 100;
            c.beginUpdate();
            c.hue = hue;
            c.sat = saturation;
            c.light = lightness;
            c.HSLtoRGB();
            c.endUpdate();
            return c;
        },
        createFromHSV: function(hue,saturation,value) {
            var c = new $j.classes.Color;
            if(typeof hue !== _const.NUMBER) hue = 0;
            if(typeof saturation !== _const.NUMBER) saturation = 0;
            if(typeof value !== _const.NUMBER) value = 0;
            hue %= 360;
            saturation %= 100;
            value %= 100;
            c.beginUpdate();
            c.hue = hue;
            c.sat = saturation;
            c.value = value;
            c.HSVtoRGB();
            c.endUpdate();
            return c;
        },
        newColor: function(red,green,blue,alpha) {
            return new $j.classes.Color(red,green,blue,alpha);
        },
        parse: function(strColor) {
            var color_defs = [
              {
                  re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
                  example: ['rgb(123,234,45)','rgb(255,234,245)'],
                  process: function(b) {
                      return [
                        b[1] | 0,
                        b[2] | 0,
                        b[3] | 0
                      ];
                  }
              },
              {
                  re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/,
                  example: ['rgba(123,234,45,0.5)','rgba(255,234,245,0.5)'],
                  process: function(b) {
                      return [
                        b[1] | 0,
                        b[2] | 0,
                        b[3] | 0,
                        +b[4]
                      ];
                  }
              },
              {
                  re: /^(\w{2})(\w{2})(\w{2})$/,
                  example: ['#00ff00','336699'],
                  process: function(b) {
                      return [
                        parseInt(b[1],16),
                        parseInt(b[2],16),
                        parseInt(b[3],16)
                      ];
                  }
              },
              {
                  re: /^(\w{2})(\w{2})(\w{2})(\w{2})$/,
                  example: ['#0000ff00','00336699'],
                  process: function(b) {
                      return [
                        parseInt(b[2],16),
                        parseInt(b[3],16),
                        parseInt(b[4],16),
                        parseInt(b[1],16) / 0xFF
                      ];
                  }
              },
              {
                  re: /^(\w{1})(\w{1})(\w{1})$/,
                  example: ['#fb0','f0f'],
                  process: function(b) {
                      return [
                        parseInt(b[1] + b[1],16),
                        parseInt(b[2] + b[2],16),
                        parseInt(b[3] + b[3],16)
                      ];
                  }
              }
            ],result,i,re,processor,bits,channels,l;
            if(!(typeof strColor === _const.STRING)) strColor = String.EMPTY;
            if(strColor === String.EMPTY) return $j.tools.colors.TRANSPARENT;
            result = new $j.classes.Color();
            if((strColor.indexOf("#") === -1) && (strColor.indexOf("rgb") === -1)) {
                if(_colors[strColor.toUpperCase()]) result = _colors[strColor.toUpperCase()];
            } else {
                strColor = strColor.replace("#",String.EMPTY);
                // search through the definitions to find a match
                for(i = 0,l = color_defs.length;i < l;i++) {
                    re = color_defs[i].re;
                    processor = color_defs[i].process;
                    bits = re.exec(strColor);
                    if(bits) {
                        channels = processor(bits);
                        result.red = channels[0];
                        result.green = channels[1];
                        result.blue = channels[2];
                        result.alpha = !isNaN(channels[3]) ? channels[3] : 1;
                        break;
                    }
                }
            }
            result.beginUpdate();
            result.RGBtoHSL();
            result.RGBtoHSV();
            result.endUpdate();
            return result;
        },
        changeHSL: function(c,h,s,l) {
            if(typeof h !== _const.NUMBER) return;
            if(typeof s !== _const.NUMBER) return;
            if(typeof l !== _const.NUMBER) return;
            var a = c.alpha,hsl = c.RGB2HSL();
            hsl.h = hsl.h + h;
            if(hsl.h < 0) hsl.h = 0;
            if(hsl.h > 1) hsl.h = 1;
            hsl.s = hsl.s + s;
            if(s < 0) hsl.s = 0;
            if(s > 1) hsl.s = 1;
            hsl.l = hsl.l + l;
            if(hsl.l < 0) hsl.l = 0;
            if(hsl.l > 1) hsl.l = 1;
            result.beginUpdate();
            result.HSLRGB(hsl.h,hsl.s,hsl.l);
            result.alpha = a;
            result.endUpdate();
            return result;
        },
        getColorName: function(color) {
            var name = color.toRGBHexString(),colors,i,l;
            colors = Object.keys(this);
            i = 0;
            l = colors.length;
            for(;i < l;i++) {
                if(this[colors[i]] instanceof $j.classes.Color) {
                    if(this[colors[i]].equals(color)) {
                        name = colors[i].firstCharUpper();
                        break;
                    }
                }
            }
            return name;
        }
    };
    $j.tools.colors.ALICEBLUE = $j.tools.colors.createFromRGBA(240,248,255,1);
    $j.tools.colors.ANTIQUEWHITE = $j.tools.colors.createFromRGBA(250,235,215,1);
    $j.tools.colors.AQUA = $j.tools.colors.createFromRGBA(0,255,255,1);
    $j.tools.colors.AQUAMARINE = $j.tools.colors.createFromRGBA(127,255,212,1);
    $j.tools.colors.AZURE = $j.tools.colors.createFromRGBA(240,255,255,1);
    $j.tools.colors.BEIGE = $j.tools.colors.createFromRGBA(245,245,220,1);
    $j.tools.colors.BISQUE = $j.tools.colors.createFromRGBA(255,228,196,1);
    $j.tools.colors.BLACK = $j.tools.colors.createFromRGBA(0,0,0,1);
    $j.tools.colors.BLANCHEDALMOND = $j.tools.colors.createFromRGBA(255,235,205,1);
    $j.tools.colors.BLUE = $j.tools.colors.createFromRGBA(0,0,255,1);
    $j.tools.colors.BLUEVIOLET = $j.tools.colors.createFromRGBA(138,43,226,1);
    $j.tools.colors.BROWN = $j.tools.colors.createFromRGBA(165,42,42,1);
    $j.tools.colors.BURLYWOOD = $j.tools.colors.createFromRGBA(222,184,135,1);
    $j.tools.colors.CADETBLUE = $j.tools.colors.createFromRGBA(95,158,160,1);
    $j.tools.colors.CHARTREUSE = $j.tools.colors.createFromRGBA(127,255,0,1);
    $j.tools.colors.CHOCOLATE = $j.tools.colors.createFromRGBA(210,105,30,1);
    $j.tools.colors.CORAL = $j.tools.colors.createFromRGBA(255,127,80,1);
    $j.tools.colors.CORNFLOWERBLUE = $j.tools.colors.createFromRGBA(100,149,237,1);
    $j.tools.colors.CORNSILK = $j.tools.colors.createFromRGBA(255,248,220,1);
    $j.tools.colors.CRIMSON = $j.tools.colors.createFromRGBA(220,20,60,1);
    $j.tools.colors.CYAN = $j.tools.colors.createFromRGBA(0,255,255,1);
    $j.tools.colors.DARKBLUE = $j.tools.colors.createFromRGBA(0,0,139,1);
    $j.tools.colors.DARKCYAN = $j.tools.colors.createFromRGBA(0,139,139,1);
    $j.tools.colors.DARKGOLDENROD = $j.tools.colors.createFromRGBA(184,134,11,1);
    $j.tools.colors.DARKGRAY = $j.tools.colors.createFromRGBA(169,169,169,1);
    $j.tools.colors.DARKGREEN = $j.tools.colors.createFromRGBA(0,100,0,1);
    $j.tools.colors.DARKGREY = $j.tools.colors.createFromRGBA(169,169,169,1);
    $j.tools.colors.DARKKHAKI = $j.tools.colors.createFromRGBA(189,183,107,1);
    $j.tools.colors.DARKMAGENTA = $j.tools.colors.createFromRGBA(139,0,139,1);
    $j.tools.colors.DARKOLIVEGREEN = $j.tools.colors.createFromRGBA(85,107,47,1);
    $j.tools.colors.DARKORANGE = $j.tools.colors.createFromRGBA(255,140,0,1);
    $j.tools.colors.DARKORCHID = $j.tools.colors.createFromRGBA(153,50,204,1);
    $j.tools.colors.DARKRED = $j.tools.colors.createFromRGBA(139,0,0,1);
    $j.tools.colors.DARKSALMON = $j.tools.colors.createFromRGBA(233,150,122,1);
    $j.tools.colors.DARKSEAGREEN = $j.tools.colors.createFromRGBA(143,188,143,1);
    $j.tools.colors.DARKSLATEBLUE = $j.tools.colors.createFromRGBA(72,61,139,1);
    $j.tools.colors.DARKSLATEGRAY = $j.tools.colors.createFromRGBA(47,79,79,1);
    $j.tools.colors.DARKSLATEGREY = $j.tools.colors.createFromRGBA(47,79,79,1);
    $j.tools.colors.DARKTURQUOISE = $j.tools.colors.createFromRGBA(0,206,209,1);
    $j.tools.colors.DARKVIOLET = $j.tools.colors.createFromRGBA(148,0,211,1);
    $j.tools.colors.DEEPPINK = $j.tools.colors.createFromRGBA(255,20,147,1);
    $j.tools.colors.DEEPSKYBLUE = $j.tools.colors.createFromRGBA(0,191,255,1);
    $j.tools.colors.DIMGRAY = $j.tools.colors.createFromRGBA(105,105,105,1);
    $j.tools.colors.DIMGREY = $j.tools.colors.createFromRGBA(105,105,105,1);
    $j.tools.colors.DODGERBLUE = $j.tools.colors.createFromRGBA(30,144,255,1);
    $j.tools.colors.FIREBRICK = $j.tools.colors.createFromRGBA(178,34,34,1);
    $j.tools.colors.FLORALWHITE = $j.tools.colors.createFromRGBA(255,250,240,1);
    $j.tools.colors.FORESTGREEN = $j.tools.colors.createFromRGBA(34,139,34,1);
    $j.tools.colors.FUCHSIA = $j.tools.colors.createFromRGBA(255,0,255,1);
    $j.tools.colors.GAINSBORO = $j.tools.colors.createFromRGBA(220,220,220,1);
    $j.tools.colors.GHOSTWHITE = $j.tools.colors.createFromRGBA(248,248,255,1);
    $j.tools.colors.GOLD = $j.tools.colors.createFromRGBA(255,215,0,1);
    $j.tools.colors.GOLDENROD = $j.tools.colors.createFromRGBA(218,165,32,1);
    $j.tools.colors.GRAY = $j.tools.colors.createFromRGBA(128,128,128,1);
    $j.tools.colors.GREEN = $j.tools.colors.createFromRGBA(0,128,0,1);
    $j.tools.colors.GREENYELLOW = $j.tools.colors.createFromRGBA(173,255,47,1);
    $j.tools.colors.GREY = $j.tools.colors.createFromRGBA(128,128,128,1);
    $j.tools.colors.HONEYDEW = $j.tools.colors.createFromRGBA(240,255,240,1);
    $j.tools.colors.HOTPINK = $j.tools.colors.createFromRGBA(255,105,180,1);
    $j.tools.colors.INDIANRED = $j.tools.colors.createFromRGBA(205,92,92,1);
    $j.tools.colors.INDIGO = $j.tools.colors.createFromRGBA(75,0,130,1);
    $j.tools.colors.IVORY = $j.tools.colors.createFromRGBA(255,255,240,1);
    $j.tools.colors.KHAKI = $j.tools.colors.createFromRGBA(240,230,140,1);
    $j.tools.colors.LAVENDER = $j.tools.colors.createFromRGBA(230,230,250,1);
    $j.tools.colors.LAVENDERBLUSH = $j.tools.colors.createFromRGBA(255,240,245,1);
    $j.tools.colors.LAWNGREEN = $j.tools.colors.createFromRGBA(124,252,0,1);
    $j.tools.colors.LEMONCHIFFON = $j.tools.colors.createFromRGBA(255,250,205,1);
    $j.tools.colors.LIGHTBLUE = $j.tools.colors.createFromRGBA(173,216,230,1);
    $j.tools.colors.LIGHTCORAL = $j.tools.colors.createFromRGBA(240,128,128,1);
    $j.tools.colors.LIGHTCYAN = $j.tools.colors.createFromRGBA(224,255,255,1);
    $j.tools.colors.LIGHTGOLDENRODYELLOW = $j.tools.colors.createFromRGBA(250,250,210,1);
    $j.tools.colors.LIGHTGRAY = $j.tools.colors.createFromRGBA(211,211,211,1);
    $j.tools.colors.LIGHTGREEN = $j.tools.colors.createFromRGBA(144,238,144,1);
    $j.tools.colors.LIGHTGREY = $j.tools.colors.createFromRGBA(211,211,211,1);
    $j.tools.colors.LIGHTPINK = $j.tools.colors.createFromRGBA(255,182,193,1);
    $j.tools.colors.LIGHTSALMON = $j.tools.colors.createFromRGBA(255,160,122,1);
    $j.tools.colors.LIGHTSEAGREEN = $j.tools.colors.createFromRGBA(32,178,170,1);
    $j.tools.colors.LIGHTSKYBLUE = $j.tools.colors.createFromRGBA(135,206,250,1);
    $j.tools.colors.LIGHTSLATEGRAY = $j.tools.colors.createFromRGBA(119,136,153,1);
    $j.tools.colors.LIGHTSLATEGREY = $j.tools.colors.createFromRGBA(119,136,153,1);
    $j.tools.colors.LIGHTSTEELBLUE = $j.tools.colors.createFromRGBA(176,196,222,1);
    $j.tools.colors.LIGHTYELLOW = $j.tools.colors.createFromRGBA(255,255,224,1);
    $j.tools.colors.LIME = $j.tools.colors.createFromRGBA(0,255,0,1);
    $j.tools.colors.LIMEGREEN = $j.tools.colors.createFromRGBA(50,205,50,1);
    $j.tools.colors.LINEN = $j.tools.colors.createFromRGBA(250,240,230,1);
    $j.tools.colors.MAGENTA = $j.tools.colors.createFromRGBA(255,0,255,1);
    $j.tools.colors.MAROON = $j.tools.colors.createFromRGBA(128,0,0,1);
    $j.tools.colors.MEDIUMAQUAMARINE = $j.tools.colors.createFromRGBA(102,205,170,1);
    $j.tools.colors.MEDIUMBLUE = $j.tools.colors.createFromRGBA(0,0,205,1);
    $j.tools.colors.MEDIUMORCHID = $j.tools.colors.createFromRGBA(186,85,211,1);
    $j.tools.colors.MEDIUMPURPLE = $j.tools.colors.createFromRGBA(147,112,219,1);
    $j.tools.colors.MEDIUMSEAGREEN = $j.tools.colors.createFromRGBA(60,179,113,1);
    $j.tools.colors.MEDIUMSLATEBLUE = $j.tools.colors.createFromRGBA(123,104,238,1);
    $j.tools.colors.MEDIUMSPRINGGREEN = $j.tools.colors.createFromRGBA(0,250,154,1);
    $j.tools.colors.MEDIUMTURQUOISE = $j.tools.colors.createFromRGBA(72,209,204,1);
    $j.tools.colors.MEDIUMVIOLETRED = $j.tools.colors.createFromRGBA(199,21,133,1);
    $j.tools.colors.MIDNIGHTBLUE = $j.tools.colors.createFromRGBA(25,25,112,1);
    $j.tools.colors.MINTCREAM = $j.tools.colors.createFromRGBA(245,255,250,1);
    $j.tools.colors.MISTYROSE = $j.tools.colors.createFromRGBA(255,228,225,1);
    $j.tools.colors.MOCCASIN = $j.tools.colors.createFromRGBA(255,228,181,1);
    $j.tools.colors.NAVAJOWHITE = $j.tools.colors.createFromRGBA(255,222,173,1);
    $j.tools.colors.NAVY = $j.tools.colors.createFromRGBA(0,0,128,1);
    $j.tools.colors.OLDLACE = $j.tools.colors.createFromRGBA(253,245,230,1);
    $j.tools.colors.OLIVE = $j.tools.colors.createFromRGBA(128,128,0,1);
    $j.tools.colors.OLIVEDRAB = $j.tools.colors.createFromRGBA(107,142,35,1);
    $j.tools.colors.ORANGE = $j.tools.colors.createFromRGBA(255,165,0,1);
    $j.tools.colors.ORANGERED = $j.tools.colors.createFromRGBA(255,69,0,1);
    $j.tools.colors.ORCHID = $j.tools.colors.createFromRGBA(218,112,214,1);
    $j.tools.colors.PALEGOLDENROD = $j.tools.colors.createFromRGBA(238,232,170,1);
    $j.tools.colors.PALEGREEN = $j.tools.colors.createFromRGBA(152,251,152,1);
    $j.tools.colors.PALETURQUOISE = $j.tools.colors.createFromRGBA(175,238,238,1);
    $j.tools.colors.PALEVIOLETRED = $j.tools.colors.createFromRGBA(219,112,147,1);
    $j.tools.colors.PAPAYAWHIP = $j.tools.colors.createFromRGBA(255,239,213,1);
    $j.tools.colors.PEACHPUFF = $j.tools.colors.createFromRGBA(255,218,185,1);
    $j.tools.colors.PERU = $j.tools.colors.createFromRGBA(205,133,63,1);
    $j.tools.colors.PINK = $j.tools.colors.createFromRGBA(255,192,203,1);
    $j.tools.colors.PLUM = $j.tools.colors.createFromRGBA(221,160,221,1);
    $j.tools.colors.POWDERBLUE = $j.tools.colors.createFromRGBA(176,224,230,1);
    $j.tools.colors.PURPLE = $j.tools.colors.createFromRGBA(128,0,128,1);
    $j.tools.colors.RED = $j.tools.colors.createFromRGBA(255,0,0,1);
    $j.tools.colors.ROSYBROWN = $j.tools.colors.createFromRGBA(188,143,143,1);
    $j.tools.colors.ROYALBLUE = $j.tools.colors.createFromRGBA(65,105,225,1);
    $j.tools.colors.SADDLEBROWN = $j.tools.colors.createFromRGBA(139,69,19,1);
    $j.tools.colors.SALMON = $j.tools.colors.createFromRGBA(250,128,114,1);
    $j.tools.colors.SANDYBROWN = $j.tools.colors.createFromRGBA(244,164,96,1);
    $j.tools.colors.SEAGREEN = $j.tools.colors.createFromRGBA(46,139,87,1);
    $j.tools.colors.SEASHELL = $j.tools.colors.createFromRGBA(255,245,238,1);
    $j.tools.colors.SIENNA = $j.tools.colors.createFromRGBA(160,82,45,1);
    $j.tools.colors.SILVER = $j.tools.colors.createFromRGBA(192,192,192,1);
    $j.tools.colors.SKYBLUE = $j.tools.colors.createFromRGBA(135,206,235,1);
    $j.tools.colors.SLATEBLUE = $j.tools.colors.createFromRGBA(106,90,205,1);
    $j.tools.colors.SLATEGRAY = $j.tools.colors.createFromRGBA(112,128,144,1);
    $j.tools.colors.SLATEGREY = $j.tools.colors.createFromRGBA(112,128,144,1);
    $j.tools.colors.SNOW = $j.tools.colors.createFromRGBA(255,250,250,1);
    $j.tools.colors.SPRINGGREE = $j.tools.colors.createFromRGBA(0,255,127,1);
    $j.tools.colors.STEELBLUE = $j.tools.colors.createFromRGBA(70,130,180,1);
    $j.tools.colors.TAN = $j.tools.colors.createFromRGBA(210,180,140,1);
    $j.tools.colors.TEAL = $j.tools.colors.createFromRGBA(0,128,128,1);
    $j.tools.colors.THISTLE = $j.tools.colors.createFromRGBA(216,191,216,1);
    $j.tools.colors.TOMATO = $j.tools.colors.createFromRGBA(255,99,71,1);
    $j.tools.colors.TRANSPARENT = $j.tools.colors.createFromRGBA(0,0,0,0);
    $j.tools.colors.TURQUOISE = $j.tools.colors.createFromRGBA(64,224,208,1);
    $j.tools.colors.VIOLET = $j.tools.colors.createFromRGBA(238,130,238,1);
    $j.tools.colors.WHEAT = $j.tools.colors.createFromRGBA(245,222,179,1);
    $j.tools.colors.WHITE = $j.tools.colors.createFromRGBA(255,255,255,1);
    $j.tools.colors.WHITESMOKE = $j.tools.colors.createFromRGBA(245,245,245,1);
    $j.tools.colors.YELLOW = $j.tools.colors.createFromRGBA(255,255,0,1);
    $j.tools.colors.YELLOWGREEN = $j.tools.colors.createFromRGBA(154,205,50,1);
    //#endregion
    //#region alias
    window._colors = $j.tools.colors;
    //#endregion
})();
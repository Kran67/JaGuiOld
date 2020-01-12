(function() {
    //#region Animations
    var Animations = {
        interpolateSingle: function(s,s1,t) {
            if(typeof s !== _const.NUMBER) s = 0;
            if(typeof s1 !== _const.NUMBER) s1 = 0;
            if(typeof t !== _const.NUMBER) t = 0;
            return s + (s1 - s) * t;
        },
        interpolateRotation: function(s,s1,t) {
            if(typeof s !== _const.NUMBER) s = 0;
            if(typeof s1 !== _const.NUMBER) s1 = 0;
            if(typeof t !== _const.NUMBER) t = 0;
            return _anims.interpolateSingle(s,s1,t);
        },
        interpolateColor: function(c,c1,t) {
            if(!c instanceof $j.classes.Color) return new $j.classes.Color(_colors.TRANSPARENT);
            if(!c1 instanceof $j.classes.Color) return new $j.classes.Color(_colors.TRANSPARENT);
            if(typeof t !== _const.NUMBER) t = 0;
            var result = new $j.classes.Color();
            result.alpha = c.alpha + (c1.alpha - c.alpha) * t;
            result.red = _conv.toByte(c.red + $j.trunc((c1.red - c.red) * t));
            result.green = _conv.toByte(c.green + $j.trunc((c1.green - c.green) * t));
            result.blue = _conv.toByte(c.blue + $j.trunc((c1.blue - c.blue) * t));
            return result;
        },
        interpolateLinear: function(t,b,c,d) {
            if(typeof t !== _const.NUMBER) t = 0;
            if(typeof b !== _const.NUMBER) b = 0;
            if(typeof c !== _const.NUMBER) c = 0;
            if(typeof d !== _const.NUMBER) d = 1;
            return c * t / d + b;
        },
        interpolateSine: function(t,b,c,d,a) {
            if(typeof t !== _const.NUMBER) t = 0;
            if(typeof b !== _const.NUMBER) b = 0;
            if(typeof c !== _const.NUMBER) c = 0;
            if(typeof d !== _const.NUMBER) d = 0;
            //if (typeof a!==_const.NUMBER) a=_animt.IN;
            if(!$j.tools.valueInSet(a,_animt)) a = _animt.IN;
            if(a === _animt.IN) return -c * $j.cos(t / d * (Math.PI * 0.5)) + c + b;
            else if(a === _animt.OUT) return c * $j.sin(t / d * (Math.PI * 0.5)) + b;
            else if(a === _animt.INOUT) return -c / 2 * ($j.cos(Math.PI * t / d) - 1) + b;
        },
        interpolateQuint: function(t,b,c,d,a) {
            if(typeof t !== _const.NUMBER) t = 0;
            if(typeof b !== _const.NUMBER) b = 0;
            if(typeof c !== _const.NUMBER) c = 0;
            if(typeof d !== _const.NUMBER) d = 0;
            //if (typeof a!==_const.NUMBER) a=_animt.IN;
            if(!$j.tools.valueInSet(a,_animt)) a = _animt.IN;
            if(a === _animt.IN) {
                t = t / d;
                return c * t * t * t * t * t + b;
            } else if(a === _animt.OUT) {
                t = t / d - 1;
                return c * (t * t * t * t * t + 1) + b;
            } else if(a === _animt.INOUT) {
                t = t / (d * 0.5);
                if(t < 1) return c / 2 * t * t * t * t * t + b;
                else {
                    t = t - 2;
                    return c / 2 * (t * t * t * t * t + 2) + b;
                }
            }
        },
        interpolateQuart: function(t,b,c,d,a) {
            if(typeof t !== _const.NUMBER) t = 0;
            if(typeof b !== _const.NUMBER) b = 0;
            if(typeof c !== _const.NUMBER) c = 0;
            if(typeof d !== _const.NUMBER) d = 0;
            //if (typeof a!==_const.NUMBER) a=_animt.IN;
            if(!$j.tools.valueInSet(a,_animt)) a = _animt.IN;
            if(a === _animt.IN) {
                t = t / d;
                return c * t * t * t * t + b;
            } else if(a === _animt.OUT) {
                t = t / d - 1;
                return -c * (t * t * t * t - 1) + b;
            } else if(a === _animt.INOUT) {
                t = t / (d * 0.5);
                if(t < 1) return c / 2 * t * t * t * t + b;
                else {
                    t = t - 2;
                    return -c / 2 * (t * t * t * t - 2) + b;
                }
            }
        },
        interpolateQuad: function(t,b,c,d,a) {
            if(typeof t !== _const.NUMBER) t = 0;
            if(typeof b !== _const.NUMBER) b = 0;
            if(typeof c !== _const.NUMBER) c = 0;
            if(typeof d !== _const.NUMBER) d = 0;
            //if (typeof a!==_const.NUMBER) a=_animt.IN;
            if(!$j.tools.valueInSet(a,_animt)) a = _animt.IN;
            if(a === _animt.IN) {
                t = t / d;
                return c * t * t + b;
            } else if(a === _animt.OUT) {
                t = t / d;
                return -c * t * (t - 2) + b;
            } else if(a === _animt.INOUT) {
                t = t / (d * 0.5);
                if(t < 1) return c / 2 * t * t + b;
                else {
                    t = t - 1;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
            }
        },
        interpolateExpo: function(t,b,c,d,a) {
            if(typeof t !== _const.NUMBER) t = 0;
            if(typeof b !== _const.NUMBER) b = 0;
            if(typeof c !== _const.NUMBER) c = 0;
            if(typeof d !== _const.NUMBER) d = 0;
            //if (typeof a!==_const.NUMBER) a=_animt.IN;
            if(!$j.tools.valueInSet(a,_animt)) a = _animt.IN;
            if(a === _animt.IN) {
                if(t === 0) return b;
                else return c * $j.pow(2,10 * (t / d - 1)) + b;
            } else if(a === _animt.OUT) {
                if(t === d) return b + c;
                else return c * (-$j.pow(2,-10 * t / d) + 1) + b;
            } else if(a === _animt.INOUT) {
                if(t === 0) return b;
                if(t === d) return b + c;
                t = t / (d * 0.5);
                if(t < 1) return c / 2 * $j.pow(2,10 * (t - 1)) + b;
                else {
                    t = t - 1;
                    return c / 2 * (-$j.pow(2,-10 * t) + 2) + b;
                }
            }
        },
        interpolateElastic: function(t,b,c,d,a1,p,a) {
            var S;
            if(typeof t !== _const.NUMBER) t = 0;
            if(typeof b !== _const.NUMBER) b = 0;
            if(typeof c !== _const.NUMBER) c = 0;
            if(typeof d !== _const.NUMBER) d = 0;
            if(typeof a1 !== _const.NUMBER) a1 = 0;
            if(typeof p !== _const.NUMBER) p = 0;
            //if (typeof a!==_const.NUMBER) a=_animt.IN;
            if(!$j.tools.valueInSet(a,_animt)) a = _animt.IN;
            if(a === _animt.IN) {
                if(t === 0) return b;
                t = t / d;
                if(t === 1) return b + c;
                if(p === 0) p = d * 0.3;
                if((a1 === 0) || (a1 < $j.abs(c))) {
                    a1 = c;
                    S = p * 0.25;
                } else S = p / (2 * Math.PI) * $j.asin(c / a1);
                t = t - 1;
                return -(a1 * $j.pow(2,10 * t) * $j.sin((t * d - S) * (2 * Math.PI) / p)) + b;
            } else if(a === _animt.OUT) {
                if(t === 0) return b;
                t = t / d;
                if(t === 1) return b + c;
                if(p === 0) p = d * 0.3;
                if((a1 === 0) || (a1 < $j.abs(c))) {
                    a1 = c;
                    S = p * 0.25;
                } else S = p / (2 * Math.PI) * $j.asin(c / a1);
                return a1 * $j.pow(2,-10 * t) * $j.sin((t * d - S) * (2 * Math.PI) / p) + c + b;
            } else if(a === _animt.INOUT) {
                if(t === 0) return b;
                t = t / (d * 0.5);
                if(t === 2) return b + c;
                if(p === 0) p = d * (0.3 * 1.5);
                if((a1 === 0) || (a1 < $j.abs(c))) {
                    a1 = c;
                    S = p * 0.25;
                }
                else S = p / (2 * Math.PI) * $j.asin(c / a1);
                if(t < 1) {
                    t = t - 1;
                    return -0.5 * (a1 * $j.pow(2,10 * t) * $j.sin((t * d - S) * (2 * Math.PI) / p)) + b;
                } else {
                    t = t - 1;
                    return a1 * $j.pow(2,-10 * t) * $j.sin((t * d - S) * (2 * Math.PI) / p) * 0.5 + c + b;
                }
            }
        },
        interpolateCubic: function(t,b,c,d,a) {
            if(typeof t !== _const.NUMBER) t = 0;
            if(typeof b !== _const.NUMBER) b = 0;
            if(typeof c !== _const.NUMBER) c = 0;
            if(typeof d !== _const.NUMBER) d = 0;
            //if (typeof a!==_const.NUMBER) a=_animt.IN;
            if(!$j.tools.valueInSet(a,_animt)) a = _animt.IN;
            if(a === _animt.IN) {
                t = t / d;
                return c * t * t * t + b;
            } else if(a === _animt.OUT) {
                t = t / d - 1;
                return c * (t * t * t + 1) + b;
            } else if(a === _animt.INOUT) {
                t = t / (d * 0.5);
                if(t < 1) return c / 2 * t * t * t + b;
                else {
                    t = t - 2;
                    return c / 2 * (t * t * t + 2) + b;
                }
            }
        },
        interpolateCirc: function(t,b,c,d,a) {
            if(typeof t !== _const.NUMBER) t = 0;
            if(typeof b !== _const.NUMBER) b = 0;
            if(typeof c !== _const.NUMBER) c = 0;
            if(typeof d !== _const.NUMBER) d = 0;
            //if (typeof a!==_const.NUMBER) a=_animt.IN;
            if(!$j.tools.valueInSet(a,_animt)) a = _animt.IN;
            if(a === _animt.IN) {
                t = t / d;
                return -c * ($j.sqrt(1 - t * t) - 1) + b;
            } else if(a === _animt.OUT) {
                t = t / d - 1;
                return c * $j.sqrt(1 - t * t) + b;
            } else if(a === _animt.INOUT) {
                t = t / (d * 0.5);
                if(t < 1) return -c / 2 * ($j.sqrt(1 - t * t) - 1) + b;
                else {
                    t = t - 2;
                    return c / 2 * ($j.sqrt(1 - t * t) + 1) + b;
                }
            }
        },
        interpolateBounce: function(t,b,c,d,a) {
            if(typeof t !== _const.NUMBER) t = 0;
            if(typeof b !== _const.NUMBER) b = 0;
            if(typeof c !== _const.NUMBER) c = 0;
            if(typeof d !== _const.NUMBER) d = 0;
            //if (typeof a!==_const.NUMBER) a=_animt.IN;
            if(!$j.tools.valueInSet(a,_animt)) a = _animt.IN;
            function _easeOut(t1,b1,c1,d1) {
                //if (!t1 || !b1 || !c1 || !d1) return 0;
                if(typeof t1 !== _const.NUMBER) t1 = 0;
                if(typeof b1 !== _const.NUMBER) b1 = 0;
                if(typeof c1 !== _const.NUMBER) c1 = 0;
                if(typeof d1 !== _const.NUMBER) d1 = 0;
                t1 = t1 / d1;
                if(t1 < 0.3636363636363636) return c1 * (7.5625 * t1 * t1) + b1;
                else if(t1 < 0.7272727272727273) {
                    t1 = t1 - 0.5454545454545455;
                    return c1 * (7.5625 * t1 * t1 + 0.75) + b1;
                } else if(t1 < 0.9090909090909091) {
                    t1 = t1 - 0.8181818181818182;
                    return c1 * (7.5625 * t1 * t1 + 0.9375) + b1;
                } else {
                    t1 = t1 - 0.9545454545454545;
                    return c1 * (7.5625 * t1 * t1 + 0.984375) + b1;
                }
            }
            function _easeIn(t1,b1,c1,d1) {
                if(typeof t1 !== _const.NUMBER) t1 = 0;
                if(typeof b1 !== _const.NUMBER) b1 = 0;
                if(typeof c1 !== _const.NUMBER) c1 = 0;
                if(typeof d1 !== _const.NUMBER) d1 = 0;
                return c - _easeOut(d1 - t1,0,c1,d1) + b1;
            }
            if(a === _animt.IN) return _easeIn(t,b,c,d);
            else if(a === _animt.OUT) return _easeOut(t,b,c,d);
            else if(a === _animt.INOUT) {
                if(t < d * 0.5) return _easeIn(t * 2,0,c,d) * 0.5 + b;
                else return _easeOut(t * 2 - d,0,c,d) * 0.5 + c * 0.5 + b;
            }
        },
        interpolateBack: function(t,b,c,d,s,a) {
            if(typeof t !== _const.NUMBER) t = 0;
            if(typeof b !== _const.NUMBER) b = 0;
            if(typeof c !== _const.NUMBER) c = 0;
            if(typeof d !== _const.NUMBER) d = 0;
            if(typeof s !== _const.NUMBER) s = 0;
            //if (typeof a!==_const.NUMBER) a=_animt.IN;
            if(!$j.tools.valueInSet(a,_animt)) a = _animt.IN;
            if(a === _animt.IN) {
                if(s === 0) s = 1.70158;
                t = t / d;
                return c * t * t * ((s + 1) * t - s) + b;
            } else if(a === _animt.OUT) {
                if(s === 0) s = 1.70158;
                t = t / d - 1;
                return c * (t * t * ((s + 1) * t + s) + 1) + b;
            } else if(a === _animt.INOUT) {
                if(s === 0) s = 1.70158;
                t = t / (d * 0.5);
                if(t < 1) {
                    s = s * 1.525;
                    return c / 2 * (t * t * ((s + 1) * t - s)) + b;
                } else {
                    t = t - 2;
                    s = s * 1.525;
                    return c / 2 * (t * t * ((s + 1) * t + s) + 2) + b;
                }
            }
        },
        keys: function() {
            this._items = [];
            this.findKeys = function(t) {
                if(this._items.length < 2) return { result: false,key1: null,key2: null };
                for(var i = 0,l = this._items.length;i < l;i++) {
                    if((t >= this._items[i]) && (t <= this._items[i + 1])) {
                        return { result: true,key1: this._items[i],key2: this._items[i + 1] };
                    }
                }
            };
            this.destroy = function() {
                //this._items.clear();
                //destroy(this._items);
                //self.inherited("free");
                this._items.destroy();
                this._items = null;
            };
        },
        //#endregion
        //#region choleskyDecomposition
        choleskyDecomposition: function(b,c) {
            /// <summary>
            /// Calc Cholesky decomposition matrix
            /// </summary>
            /// <param name="b"></param>
            /// <param name="c"></param>
            /// <returns type="Array"></returns>
            var y,m1,m2,d,f,result = [],i,k;
            d = 0;
            f = c - 1;
            m1 = new Array(f + 1);
            m2 = new Array(f);
            m1[d] = $j.sqrt(2);
            m2[d] = 1.0 / m1[d];
            for(k = d + 1;k < f;k++) {
                m1[k] = $j.sqrt(4 - m2[k - 1] * m2[k - 1]);
                m2[k] = 1.0 / m1[k];
            }
            m1[f] = $j.sqrt(2 - m2[f - 1] * m2[f - 1]);
            y = new Array(c);
            y[d] = b[d] / m1[d];
            for(i = d + 1;i <= f;i++) y[i] = (b[i] - y[i - 1] * m2[i - 1]) / m1[i];
            result[f] = y[f] / m1[f];
            for(i = f - 1;i >= d;i--) result[i] = (y[i] - result[i + 1] * m2[i]) / m1[i];
            y = m1 = m2 = d = f = null;
            return result;
        },
        //#endregion
        //#region hermitInterpolate
        hermitInterpolate: function(s,x,c) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="s"></param>
            /// <param name="x"></param>
            /// <param name="c"></param>
            /// <returns type="numeric"></returns>
            var i;
            if(s.length > 0) {
                if(x <= 0) i = 0;
                else if(x > c - 1) i = c - 1;
                else i = $j.trunc(x);
                if(i === c - 1) i--;
                return ((s[i][0] * x + s[i][1]) * x + s[i][2]) * x + s[i][3];
            } else return 0;
        },
        //#endregion
        //#region calcHermiteFactors
        calcHermiteFactors: function(v) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="v"></param>
            /// <returns type="Array"></returns>
            var a,b,c,d,n,m1,m2,spline,i;
            if(v.length > 0) {
                n = v.length - 1;
                m1 = new Array(n + 1);
                m1[0] = 3 * (v[1] - v[0]);
                m1[n] = 3 * (v[n] - v[n - 1]);
                for(i = 1;i < n;i++) m1[i] = 3 * (v[i + 1] - v[i - 1]);
                m2 = new Array(n + 1);
                m2 = $j.animations.choleskyDecomposition(m1,n + 1);
                spline = [];
                for(i = 0;i < n;i++) spline[i] = new Array(3);
                for(i = 0;i < n;i++) {
                    //calc koeef
                    a = v[i];
                    b = m2[i];
                    c = 3 * (v[i + 1] - v[i]) - 2 * m2[i] - m2[i + 1];
                    d = -2 * (v[i + 1] - v[i]) + m2[i] + m2[i + 1];
                    //calc spline
                    spline[i][3] = a + i * (i * (c - i * d) - b);
                    spline[i][2] = b + i * (3 * i * d - 2 * c);
                    spline[i][1] = c - 3 * i * d;
                    spline[i][0] = d;
                }
            }
            return spline;
        }
        //#endregion
    };
    $j.animations = Animations;
    //#endregion
    //#region Alias
    window._anims = $j.animations;
    //#endregion
    //#region Spline
    var Spline = Class.extend("Spline",{
        init: function(a) {
            /// <summary>
            /// Constructor of Spline
            /// </summary>
            /// <param name="a">Points of Spline:Array</param>
            this.x = [];
            this.y = [];
            this.len = a.length;
            for(var i = 0,l = this.len;i < l;i++) {
                this.x[i] = a[i].x;
                this.y[i] = a[i].y;
            }
            this.matX = $j.animations.calcHermiteFactors(this.x);
            this.matY = $j.animations.calcHermiteFactors(this.y);
        },
        //#region Methods
        splineXY: function(t) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="t"></param>
            /// <returns type="Point"></returns>
            var x = 0,y = 0;
            x = $j.animations.hermitInterpolate(this.matX,t,this.len);
            y = $j.animations.hermitInterpolate(this.matY,t,this.len);
            return new $j.classes.Point(x,y);
        },
        destroy: function() {
            this.x.destroy();
            this.x = null;
            this.y.destroy();
            this.y = null;
            this.len = null;
            this.matX.destroy();
            this.matX = null;
            this.matY.destroy();
            this.matY = null;
        }
        //#endregion
    });
    //#endregion
    //#region Animation
    var Animation = $j.classes.Component.extend("Animation",{
        init: function(owner,props,autoStart) {
            props = !props ? {} : props;
            if(owner) {
                this._inherited(owner,props);
                //#region Private
                if(!$j.isHTMLRenderer() || this instanceof $j.classes.PathAnimation || owner.HTMLElement === $j.types.HTMLElements.CANVAS) {
                    this.delayTime = 0;
                    this._time = 0;
                    this._initialValue = 0;
                }
                //#endregion
                this.pause = false;
                this.animationType = _animt.IN;
                this.autoReverse = false;
                this.enabled = true;
                this.delay = 0;
                this.duration = 0.2;
                this.interpolation = $j.types.interpolationTypes.LINEAR;
                this.inverse = false;
                this.hideOnFinish = false;
                this.loop = false;
                this.trigger = String.EMPTY;
                this.triggerInverse = String.EMPTY;
                this.propertyName = String.EMPTY;
                this.control = null;
                this.onProcess = new $j.classes.NotifyEvent(this);
                this.onFinish = new $j.classes.NotifyEvent(this);
                this.startFromCurrent = false;
                this.startValue = null;
                this.stopValue = null;
                this.autoStart = $j.isUndefined(autoStart) ? true : autoStart;
                this.running = false;
                this.convertToCSS = $j.isHTMLRenderer();
                //this.owner.animations.push(this);
            }
        },
        //#region Getters/Setters
        setPause: function(newValue) {
            if(typeof newValue !== _const.BOOLEAN) return;
            if(newValue !== this.pause) {
                this.pause = newValue;
                if(this.pause) {
                    if(this.running) {
                        if(!$j.isHTMLRenderer() || this instanceof $j.classes.PathAnimation || this._owner.HTMLElement === $j.types.HTMLElements.CANVAS) this.stopAtCurrent();
                        else if(!this._loading && !this.form._loading) $j.CSS.updateInlineCSS(this,$j.types.jsCSSProperties.ANIMATIONSTATE);
                    }
                    else this.stop();
                } else if(!this._loading && !this.form._loading) $j.CSS.updateInlineCSS(this._owner,$j.types.jsCSSProperties.ANIMATIONSTATE,String.EMPTY);
            }
        },
        setAnimationType: function(newValue) {
            if(!$j.tools.valueInSet(newValue,_animt)) return;
            if(newValue !== this.animationType) this.animationType = newValue;
        },
        setAutoReverse: function(newValue) {
            if(typeof newValue !== _const.BOOLEAN) return;
            if(newValue !== this.autoReverse) this.autoReverse = newValue;
        },
        getEnabled: function(newValue) {
            if(typeof newValue !== _const.BOOLEAN) return;
            if(newValue !== this.enabled) {
                this.enabled = newValue;
                if(this.enabled) this.start();
                else this.stop();
            }
        },
        setDelay: function(newValue) {
            if(typeof newValue !== _const.NUMBER) return;
            if(newValue !== this.delay) this.delay = newValue;
        },
        setDuration: function(newValue) {
            if(typeof newValue !== _const.NUMBER) return;
            if(newValue !== this.duration) this.duration = newValue;
        },
        setInterpolation: function(newValue) {
            if(!$j.tools.valueInSet(newValue,$j.types.interpolationTypes)) return;
            if(newValue !== this.interpolation) this.interpolation = newValue;
        },
        setInverse: function(newValue) {
            if(typeof newValue !== _const.BOOLEAN) return;
            if(newValue !== this.inverse) this.inverse = newValue;
        },
        setHideOnFinish: function(newValue) {
            if(typeof newValue !== _const.BOOLEAN) return;
            if(newValue !== this.hideOnFinish) this.hideOnFinish = newValue;
        },
        setLoop: function(newValue) {
            if(typeof newValue !== _const.BOOLEAN) return;
            if(newValue !== this.loop) this.loop = newValue;
        },
        setTrigger: function(newValue) {
            if(typeof newValue !== _const.STRING) return;
            if(newValue !== this.trigger) this.trigger = newValue;
        },
        setTriggerInverse: function(newValue) {
            if(typeof newValue !== _const.NUMBER) return;
            if(newValue !== this.triggerInverse) this.triggerInverse = newValue;
        },
        setPropertyName: function(newValue) {
            if(typeof newValue !== _const.STRING) return;
            if(newValue !== this.propertyName) {
                this.propertyName = newValue;
                this.updateCSS();
            }
        },
        //#endregion
        //#region Methods
        start: function() {
            if(!this.control) return;
            if(!this.convertToCSS || this instanceof $j.classes.PathAnimation || this._owner.HTMLElement === $j.types.HTMLElements.CANVAS) {
                if($j.disableAnimation) this.duration = 0.001;
                if(($j.abs(this.duration) < 0.001)) {
                    this.delayTime = 0;
                    if(this.inverse) {
                        this._time = 0;
                        this.duration = 1;
                    } else {
                        this._time = 1;
                        this.duration = 1;
                    }
                    this.running = true;
                    this.processAnimation();
                    this.running = false;
                    this._time = 0;
                    this.duration = 0.00001;
                    this.onFinish.invoke();
                    this.enabled = false;
                } else {
                    this.delayTime = this.delay;
                    this.running = true;
                    if(this.inverse) this._time = this.duration;
                    else this._time = 0;
                    if(this.delay === 0) this.processAnimation();
                    this.enabled = true;
                }
                $j.looper.addListener(this,"animate");
            } else {
                this.running = true;
                $j.CSS.updateInlineCSS(this,$j.types.jsCSSProperties.ANIMATION);
            }
        },
        stop: function() {
            if(!this.running) return;
            if(!this.control) return;
            if(!this.convertToCSS || this instanceof $j.classes.PathAnimation || this.control.HTMLElement === $j.types.HTMLElements.CANVAS) {
                if(this.inverse) this._time = 0;
                else this._time = this.duration;
                this.processAnimation();
            }
            this.running = false;
            this.enabled = false;
            this.onFinish.invoke();
            if(!this.convertToCSS || this instanceof $j.classes.PathAnimation || this.control.HTMLElement === $j.types.HTMLElements.CANVAS) {
                $j.renderer.removeListener(this);
            } else if(!this._loading && !this.form._loading) $j.CSS.updateInlineCSS(this.control,$j.types.jsCSSProperties.ANIMATION,String.EMPTY);
        },
        loaded: function() {
            var cssProp = String.EMPTY;
            this._inherited();
            if(!$j.isHTMLRenderer() || this instanceof $j.classes.PathAnimation || ((this.control)) && (this.control.HTMLElement === $j.types.HTMLElements.CANVAS)) {
                if(this.startFromCurrent) this._initialValue = this.startValue;
            } else {
                this.updateCSS();
            }
            //if(this.enabled&&!this.running&&this.autoStart) this.start();
        },
        updateCSS: function() {
            $j.CSS.removeCSSRule("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes " + this.name,$j.types.CSSRuleTypes.KEYFRAMES_RULE);
            if(this.propertyName !== String.EMPTY) {
                cssProp = "0% { " + _conv.propertyToCssProperty(this) + " } ";
                cssProp += "100% { " + _conv.propertyToCssProperty(this,true) + " } ";
                $j.CSS.addCSSRule("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes " + this.name,cssProp);
            }
        },
        processAnimation: function() { },
        stopAtCurrent: function() {
            if(!this.running) return;
            if(this.inverse) this._time = 0;
            else this._time = this.duration;
            this.running = false;
            this.enabled = false;
            this.onFinish.invoke();
        },
        startTrigger: function(control,trigger) {
            var startValue = false,line,setter,prop,value;
            if(!control) return;
            if((this.triggerInverse !== String.EMPTY) && (this.triggerInverse.toLowerCase().indexOf(trigger.toLowerCase()) > -1)) {
                line = this.triggerInverse;
                setter = line.split(';');
                startValue = false;
                while(setter.length > 0) {
                    prop = setter[0].split('=')[0];
                    value = setter[0].split('=')[1];
                    if(control.hasOwnProperty(prop)) {
                        startValue = control[prop].toString().toLowerCase() === value.toLowerCase();
                        if(!startValue) break;
                    }
                    setter.removeAt(0);
                }
                if(startValue) {
                    this.inverse = true;
                    this.start();
                    startValue = line = setter = prop = value = null;
                    return;
                }
            }
            if((this.trigger !== String.EMPTY) && (this.trigger.toLowerCase().indexOf(trigger.toLowerCase()) > -1)) {
                line = this.trigger;
                setter = line.split(';');
                startValue = false;
                while(setter.length > 0) {
                    prop = setter[0].split('=')[0];
                    value = setter[0].split('=')[1];
                    if(control.hasOwnProperty(prop)) {
                        startValue = control[prop].toString().toLowerCase() === value.toLowerCase();
                        if(!startValue) break;
                    }
                    setter.removeAt(0);
                }
                if(startValue) {
                    if(this.triggerInverse !== String.EMPTY) this.inverse = false;
                    this.start();
                }
            }
            startValue = line = setter = prop = value = null;
        },
        normalizedTime: function() {
            if((this.duration > 0) && (this.delayTime <= 0)) {
                if(this.interpolation === _interpo.LINEAR) return _anims.interpolateLinear(this._time,0,1,this.duration);
                else if(this.interpolation === _interpo.QUADRATIC) return _anims.interpolateQuad(this._time,0,1,this.duration,this.animationType);
                else if(this.interpolation === _interpo.CUBIC) return _anims.interpolateCubic(this._time,0,1,this.duration,this.animationType);
                else if(this.interpolation === _interpo.QUARTIC) return _anims.interpolateQuart(this._time,0,1,this.duration,this.animationType);
                else if(this.interpolation === _interpo.QUINTIC) return _anims.interpolateQuint(this._time,0,1,this.duration,this.animationType);
                else if(this.interpolation === _interpo.SINUSOIDAL) return _anims.interpolateSine(this._time,0,1,this.duration,this.animationType);
                else if(this.interpolation === _interpo.EXPONENTIAL) return _anims.interpolateExpo(this._time,0,1,this.duration,this.animationType);
                else if(this.interpolation === _interpo.CIRCULAR) return _anims.interpolateCirc(this._time,0,1,this.duration,this.animationType);
                else if(this.interpolation === _interpo.ELASTIC) return _anims.interpolateElastic(this._time,0,1,this.duration,0,0,this.animationType);
                else if(this.interpolation === _interpo.BACK) return _anims.interpolateBack(this._time,0,1,this.duration,0,this.animationType);
                else if(this.interpolation === _interpo.BOUNCE) return _anims.interpolateBounce(this._time,0,1,this.duration,this.animationType);
            } else return 0;
        },
        animate: function(elapsedTime) {
            elapsedTime /= 1000;
            if(this._owner) {
                if(!$j.isHTMLRenderer()) {
                    if(!this._owner.visible || !this._owner.checkOwnerVisible()) this.pause = true;
                    else if(this.running) this.pause = false;
                } else {
                    if(!this._owner.visible) this.pause = true;
                    else if(this.running) this.pause = false;
                }
            }
            if(!this.running || this.pause) return;
            if((this.delay > 0) && (this.delayTime !== 0)) {
                if(this.delayTime > 0) {
                    this.delayTime = this.delayTime - elapsedTime;
                    if(this.delayTime <= 0) {
                        this.start();
                        this.delayTime = 0;
                    }
                }
                return;
            }
            if(this.inverse) this._time -= elapsedTime;
            else this._time += elapsedTime;
            if(this._time >= this.duration) {
                if(this.startFromCurrent) this.startValue = this.initialValue;
                this._time = this.duration;
                if(this.loop) {
                    if(this.autoReverse) {
                        this.inverse = true;
                        this._time = this.duration;
                    } else this._time = 0;
                } else this.running = false;
            } else if(this._time <= 0) {
                this._time = 0;
                if(this.loop) {
                    if(this.autoReverse) {
                        this.inverse = false;
                        this._time = 0;
                    } else this._time = this.duration;
                } else this.running = false;
            }
            this.processAnimation();
            this.onProcess.invoke();
            if(!this.running) {
                this.onFinish.invoke();
            }
        },
        toCSS: function(aniName) {
            var ani = String.EMPTY;
            if(!this.convertToCSS) return;
            if(this.interpolation === $j.types.interpolationTypes.BOUNCE || this.interpolation === $j.types.interpolationTypes.ELASTIC) return ani;
            // animation-name + animation-duration
            ani += (aniName ? aniName : this.name) + String.SPACE + this.duration + "s ";
            // animation-timing-function
            switch(this.interpolation) {
                case $j.types.interpolationTypes.BACK:
                    switch(this.animationType) {
                        case $j.types.animationTypes.IN:
                            ani += "cubic-bezier(0.6, -0.28, 0.735, 0.045)";
                            break;
                        case $j.types.animationTypes.OUT:
                            ani += "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                            break;
                        case $j.types.animationTypes.INOUT:
                            ani += "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                            break;
                    }
                    break;
                    //case $j.types.interpolationType.BOUNCE:
                    //  switch (this.animationType) {
                    //    case $j.types.animationType.IN:
                    //      ani+="";
                    //      break;
                    //    case $j.types.animationType.OUT:
                    //      ani+="";
                    //      break;
                    //    case $j.types.animationType.INOUT:
                    //      ani+="";
                    //      break;
                    //  }
                    //  break;
                case $j.types.interpolationTypes.CIRCULAR:
                    switch(this.animationType) {
                        case $j.types.animationTypes.IN:
                            ani += "cubic-bezier(0.6, 0.04, 0.98, 0.335)";
                            break;
                        case $j.types.animationTypes.OUT:
                            ani += "cubic-bezier(0.075, 0.82, 0.165, 1)";
                            break;
                        case $j.types.animationTypes.INOUT:
                            ani += "cubic-bezier(0.785, 0.135, 0.15, 0.86)";
                            break;
                    }
                    break;
                case $j.types.interpolationTypes.CUBIC:
                    switch(this.animationType) {
                        case $j.types.animationTypes.IN:
                            ani += "cubic-bezier(0.55, 0.055, 0.675, 0.19)";
                            break;
                        case $j.types.animationTypes.OUT:
                            ani += "cubic-bezier(0.215, 0.61, 0.355, 1)";
                            break;
                        case $j.types.animationTypes.INOUT:
                            ani += "cubic-bezier(0.645, 0.045, 0.355, 1)";
                            break;
                    }
                    break;
                    //case $j.types.interpolationType.ELASTIC:
                    //  switch (this.animationType) {
                    //    case $j.types.animationType.IN:
                    //      ani+="";
                    //      break;
                    //    case $j.types.animationType.OUT:
                    //      ani+="";
                    //      break;
                    //    case $j.types.animationType.INOUT:
                    //      ani+="";
                    //      break;
                    //  }
                    //  break;
                case $j.types.interpolationTypes.EXPONENTIAL:
                    switch(this.animationType) {
                        case $j.types.animationTypes.IN:
                            ani += "cubic-bezier(0.95, 0.05, 0.795, 0.035)";
                            break;
                        case $j.types.animationTypes.OUT:
                            ani += "cubic-bezier(0.19, 1, 0.22, 1)";
                            break;
                        case $j.types.animationTypes.INOUT:
                            ani += "cubic-bezier(1, 0, 0, 1)";
                            break;
                    }
                    break;
                case $j.types.interpolationTypes.LINEAR:
                    ani += "linear ";
                    break;
                case $j.types.interpolationTypes.QUADRATIC:
                    switch(this.animationType) {
                        case $j.types.animationTypes.IN:
                            ani += "cubic-bezier(0.55, 0.085, 0.68, 0.53)";
                            break;
                        case $j.types.animationTypes.OUT:
                            ani += "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                            break;
                        case $j.types.animationTypes.INOUT:
                            ani += "cubic-bezier(0.455, 0.03, 0.515, 0.955)";
                            break;
                    }
                    break;
                case $j.types.interpolationTypes.QUARTIC:
                    switch(this.animationType) {
                        case $j.types.animationTypes.IN:
                            ani += "cubic-bezier(0.895, 0.03, 0.685, 0.22)";
                            break;
                        case $j.types.animationTypes.OUT:
                            ani += "cubic-bezier(0.165, 0.84, 0.44, 1)";
                            break;
                        case $j.types.animationTypes.INOUT:
                            ani += "cubic-bezier(0.77, 0, 0.175, 1)";
                            break;
                    }
                    break;
                case $j.types.interpolationTypes.QUINTIC:
                    switch(this.animationType) {
                        case $j.types.animationTypes.IN:
                            ani += "cubic-bezier(0.755, 0.05, 0.855, 0.06)";
                            break;
                        case $j.types.animationTypes.OUT:
                            ani += "cubic-bezier(0.23, 1, 0.32, 1)";
                            break;
                        case $j.types.animationTypes.INOUT:
                            ani += "cubic-bezier(0.86, 0, 0.07, 1)";
                            break;
                    }
                    break;
                case $j.types.interpolationTypes.SINUSOIDAL:
                    switch(this.animationType) {
                        case $j.types.animationTypes.IN:
                            ani += "cubic-bezier(0.47, 0, 0.745, 0.715)";
                            break;
                        case $j.types.animationTypes.OUT:
                            ani += "cubic-bezier(0.39, 0.575, 0.565, 1)";
                            break;
                        case $j.types.animationTypes.INOUT:
                            ani += "cubic-bezier(0.445, 0.05, 0.55, 0.95)";
                            break;
                    }
                    break;
            }
            // animation-delay
            ani += this.delay + "s ";
            // animation-iteration-count
            if(this.loop) ani += "infinite ";
            else ani += "1 ";
            // animation-direction
            if(this.autoReverse && !this.inverse) ani += "alternate "
            else if(!this.autoReverse && this.inverse) ani += "reverse ";
            else if(this.autoReverse && this.inverse) ani += "alternate-reverse ";
            else ani += "normal ";
            // animation-fill-mode
            ani += "forwards ";
            return ani;
        },
        assign: function(source) {
            if(!(source instanceof $j.classes.Animation)) return;
            this.running = source.running;
            this.pause = source.pause;
            this.animationType = source.animationType;
            this.autoReverse = source.autoReverse;
            this.enabled = source.enabled;
            this.delay = source.delay;
            this.duration = source.duration;
            this.interpolation = source.interpolation;
            this.inverse = source.inverse;
            this.hideOnFinish = source.hideOnFinish;
            this.loop = source.loop;
            this.trigger = source.trigger;
            this.triggerInverse = source.triggerInverse;
            this.propertyName = source.propertyName;
        },
        destroy: function() {
            this.delayTime = null;
            this._time = null;
            this._initialValue = null;
            this.pause = null;
            this.animationType = null;
            this.autoReverse = null;
            this.enabled = null;
            this.delay = null;
            this.duration = null;
            this.interpolation = null;
            this.inverse = null;
            this.hideOnFinish = null;
            this.loop = null;
            this.trigger = null;
            this.triggerInverse = null;
            this.propertyName = null;
            this.control = null;
            this.onProcess.destroy();
            this.onProcess = null;
            this.onFinish.destroy();
            this.onFinish = null;
            this.startFromCurrent = null;
            if(this.startValue) {
                if(this.startValue.destroy) this.startValue.destroy();
            }
            this.startValue = null;
            if(this.stopValue) {
                if(this.stopValue.destroy) this.stopValue.destroy();
            }
            this.stopValue = null;
            this.autoStart = null;
            this.running = null;
            this.convertToCSS = null;
        }
        //#endregion
    });
    //#endregion
    //#region ColorAnimation
    var ColorAnimation = Animation.extend("ColorAnimation",{
        init: function(owner,props,autoStart) {
            props = !props ? {} : props;
            if(owner) {
                this._inherited(owner,props,autoStart);
                this.startValue = new $j.classes.Color(_colors.TRANSPARENT);
                this.startFromCurrent = false;
                this.stopValue = new $j.classes.Color(_colors.TRANSPARENT);
            }
        },
        //#region Methods
        start: function() {
            if(!this.control) return;
            if(!this.control[this.propertyName]) return;
            if(!$j.isHTMLRenderer() || this.control.HTMLElement === $j.types.HTMLElements.CANVAS) {
                if(this.startFromCurrent) {
                    if(this.control[this.propertyName] instanceof $j.Color) this.startValue.assign(this.control[this.propertyName]);
                }
            }
            this._inherited();
        },
        processAnimation: function() {
            if(!this._owner.checkOwnerVisible()) return;
            if(this.form._loading || this.form._creating) return;
            if(!this.control) return;
            this._inherited();
            if(this.control[this.propertyName]) {
                if(this.control[this.propertyName] instanceof $j.classes.Color) {
                    var newColor = _anims.interpolateColor(this.startValue,this.stopValue,this.normalizedTime());
                    this.control[this.propertyName].assign(newColor);
                    if(this.control._allowUpdate) {
                        if(typeof this.control.update === _const.FUNCTION) this.control.update();
                    }
                    //if (!this.form.useRequestAnim) this.owner.redraw();
                    //else this.form.needRedraw=true;
                }
            }
        },
        assign: function(source) {
            if(!(source instanceof $j.classes.ColorAnimation)) return;
            this._inherited(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        }
        //#endregion
    });
    //#endregion
    //#region GradientAnimation
    var GradientAnimation = Animation.extend("GradientAnimation",{
        init: function(owner,props,autoStart) {
            props = !props ? {} : props;
            if(owner) {
                this._inherited(owner,props,autoStart);
                this.startValue = new $j.classes.Gradient(this);
                this.startFromCurrent = false;
                this.stopValue = new $j.classes.Gradient(this);
            }
        },
        //#region Methods
        start: function() {
            if(!this.control) return;
            if(!$j.isHTMLRenderer() || this.control.HTMLElement === $j.types.HTMLElements.CANVAS) {
                if(this.startFromCurrent) {
                    if(this.control[this.propertyName]) {
                        if(this.control[this.propertyName] instanceof $j.classes.Gradient) this.startValue = this.control[this.propertyName];
                    }
                }
            }
            this._inherited();
        },
        processAnimation: function() {
            if(!this.control) return;
            if(!this.convertToCSS || this.control.HTMLElement === $j.types.HTMLElements.CANVAS) {
                var g;
                if(!$j.isHTMLRenderer()) {
                    if(!this.control.checkOwnerVisible()) return;
                    if(this.form._loading || this.form._creating) return;
                }
                this._inherited();
                if(this.control[this.propertyName]) {
                    if(this.control[this.propertyName] instanceof $j.classes.Gradient) {
                        g = this.control[this.propertyName];
                        for(var i = 0,l = g.items.length;i < l;i++) {
                            if((i < this.stopValue.items.length) || (i < this.startValue.items.length)) {
                                var newColor = _anims.interpolateColor(this.startValue.items[i].color,this.stopValue.items[i].color,this.normalizedTime());
                                g.items[i].color.assign(newColor);
                            }
                        }
                        if(!$j.isHTMLRenderer()) {
                            if(this.control._allowUpdate) this.control.update();
                            if(!this.form.useRequestAnim) this.control.redraw();
                            else this.form.needRedraw = true;
                        } else {
                            this.control.paint();
                        }
                    }
                }
            }
        },
        assign: function(source) {
            if(!(source instanceof $j.classes.GradientAnimation)) return;
            this._inherited(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        }
        //#endregion
    });
    //#endregion
    //#region FloatAnimation
    var FloatAnimation = Animation.extend("FloatAnimation",{
        init: function(owner,props,autoStart) {
            props = !props ? {} : props;
            if(owner) {
                this._inherited(owner,props,autoStart);
                this.startValue = 0;
                this.startFromCurrent = false;
                this.stopValue = 0;
            }
        },
        //#region Methods
        start: function() {
            if(!this.control) return;
            if(!this.convertToCSS || this.control.HTMLElement === $j.types.HTMLElements.CANVAS) {
                if(this.startFromCurrent) {
                    if(!isNaN(this.control[this.propertyName])) this.startValue = this.control[this.propertyName];
                }
            }
            this._inherited();
        },
        stop: function() {
            this._inherited();
            if(!this.convertToCSS || this.control.HTMLElement === $j.types.HTMLElements.CANVAS) {
                this.control = null;
            }
        },
        processAnimation: function() {
            if(!this.convertToCSS || this.control.HTMLElement === $j.types.HTMLElements.CANVAS) {
                var oldValue,newValue,r;
                if(!$j.isHTMLRenderer()) {
                    if(!this.control.checkOwnerVisible()) return;
                }
                if(this.form._loading || this.form._creating) return;
                if(!this.control) return;
                this._inherited();
                if(!isNaN(this.control[this.propertyName])) {
                    if(this.control._allowUpdate && !$j.isHTMLRenderer()) {
                        r = this.control.screenRect();
                    }
                    oldValue = this.control[this.propertyName];
                    newValue = _anims.interpolateSingle(this.startValue,this.stopValue,this.normalizedTime());
                    if(oldValue !== newValue) {
                        if(typeof this.control["set" + this.propertyName.firstCharUpper()] === _const.FUNCTION) this.control["set" + this.propertyName.firstCharUpper()](newValue);
                        else this.control[this.propertyName] = newValue;
                        if(this.control._allowUpdate && !$j.isHTMLRenderer()) {
                            this.control.update();
                            this.control.updateXML();
                        }
                        if(!$j.isHTMLRenderer()) {
                            if(!this.form.useRequestAnim) this.control.redraw(r);
                            else this.form.needRedraw = true;
                        } else {
                            if(typeof this.control.update === _const.FUNCTION) this.control.update();
                        }
                    }
                }
            }
        },
        assign: function(source) {
            if(!(source instanceof $j.classes.FloatAnimation)) return;
            this._inherited(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        }
        //#endregion
    });
    //#endregion
    //#region RectAnimation
    var RectAnimation = Animation.extend("RectAnimation",{
        init: function(owner,props,autoStart) {
            props = !props ? {} : props;
            if(owner) {
                this._inherited(owner,props,autoStart);
                this.startValue = new $j.classes.Bounds(new $j.classes.Rect,this);
                this.startFromCurrent = false;
                this.stopValue = new $j.classes.Bounds($j.classes.Rect,this);
                this._current = new $j.classes.Bounds(new $j.classes.Rect,this);
            }
        },
        //#region Methods
        start: function() {
            if(!this.control) return;
            if(!this.convertToCSS || this.control.HTMLElement === $j.types.HTMLElements.CANVAS) {
                if(this.startFromCurrent) {
                    if(this.control[this.propertyName]) {
                        if(this.control[this.propertyName] instanceof $j.classes.Bounds) this.startValue = this.control[this.propertyName];
                    }
                }
            }
            this._inherited();
        },
        processAnimation: function() {
            if(!this.control) return;
            if(!this.convertToCSS || this.control.HTMLElement === $j.types.HTMLElements.CANVAS) {
                if(!$j.isHTMLRenderer()) {
                    if(!this.control.checkOwnerVisible()) return;
                }
                if(this.form._loading || this.form._creating) return;
                this._inherited();
                if(this.instance) {
                    var nt = this.normalizedTime(),r;
                    this._current.rect.left = _anims.interpolateSingle(this.startValue.left,this.stopValue.left,nt);
                    this._current.rect.top = _anims.interpolateSingle(this.startValue.top,this.stopValue.top,nt);
                    this._current.rect.right = _anims.interpolateSingle(this.startValue.right,this.stopValue.right,nt);
                    this._current.rect.bottom = _anims.interpolateSingle(this.startValue.bottom,this.stopValue.bottom,nt);
                    if(this.control[this.propertyName]) {
                        if(this.control[this.propertyName] instanceof $j.classes.Bounds) {
                            if(this.control._allowUpdate && !$j.isHTMLRenderer()) {
                                r = this.control.screenRect();
                            }
                            this.control[this.propertyName].rect.assign(this._current.rect);
                            if(this.control._allowUpdate && !$j.isHTMLRenderer()) {
                                this.control.update();
                                this.control.updateXML();
                            }
                            if(!$j.isHTMLRenderer()) {
                                if(!this.form.useRequestAnim) this.control.redraw(r);
                                else this.form.needRedraw = true;
                            } else $j.CSS.updateInlineCSS(this.control,$j.types.jsCSSProperties.MARGIN); //this.owner.update();
                        }
                    }
                }
            }
        },
        assign: function(source) {
            if(!(source instanceof $j.classes.RectAnimation)) return;
            this._inherited(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        },
        destroy: function() {
            this._current.destroy();
            this._current = null;
            this._inherited();
        }
        //#endregion
    });
    //#endregion
    //#region BitmapAnimation
    var BitmapAnimation = Animation.extend("BitmapAnimation",{
        init: function(owner,props,autoStart) {
            props = !props ? {} : props;
            if(owner) {
                this._inherited(owner,props,autoStart);
                // Initialization
                if(!$j.isHTMLRenderer()) {
                    this._current = {};
                    this._current.canvas = $j.doc.createElement($j.types.HTMLElements.CANVAS);
                    this._current.canvas.width = 1;
                    this._current.canvas.height = 1;
                    this._current.ctx = this._current.canvas.getContext("2d");
                } else {
                    //this.before=$j.doc.createElement("div");
                    //this.before.setAttribute("style","left:0px;top:0px;width:100%;height:100%;");
                    //this.after=$j.doc.createElement("div");
                    //this.after.setAttribute("style","left:0px;top:0px;width:100%;height:100%;opacity:0;");
                }
                this.startValue = new Image();
                this.startFromCurrent = false;
                this.stopValue = new Image();
            }
        },
        //#region Methods
        processAnimation: function() {
            if(!this.control) return;
            if(!this.control.checkOwnerVisible()) return;
            if(this.form._loading || this.form._creating) return;
            this._inherited();
            var r;
            if(this.control[this.propertyName]) {
                if(this.control[this.propertyName] instanceof Image) {
                    if(this.control._allowUpdate) {
                        r = this.control.screenRect();
                        //this.owner.redraw(r);
                    }
                    if((this.stopValue.width === 0) || (this.stopValue.height === 0)) return;
                    if(this.inverse) {
                        this._current.ctx.resize(this.stopValue.width,this.stopValue.height);
                        this._current.ctx.save();
                        this._current.ctx.drawImage(this.stopValue,0,0);
                        this._current.ctx.globalAlpha = 1 - this.normalizedTime();
                        this._current.ctx.drawImage(this.startValue,0,0);
                        this._current.ctx.restore();
                    } else {
                        this._current.ctx.resize(this.startValue.width,this.startValue.height);
                        this._current.ctx.clear();
                        this._current.ctx.save();
                        this._current.ctx.drawImage(this.startValue,0,0);
                        this._current.ctx.globalAlpha = this.normalizedTime();
                        this._current.ctx.drawImage(this.stopValue,0,0);
                        this._current.ctx.restore();
                    }
                    if(this.control.imgCanvas) {
                        if(this.control.imgCanvas.ctx) {
                            this.control.imgCanvas.ctx.clear();
                            this.control.imgCanvas.ctx.drawImage(this._current.canvas,0,0);
                        }
                    }
                    if(this.control._allowUpdate) this.control.update();
                    if(!this.form.useRequestAnim) this.control.redraw(r);
                    else this.form.needRedraw = true;
                }
            }
        },
        loaded: function() {
            var style = String.EMPTY,back = String.EMPTY,cssProp;
            if(!this.control) return;
            this._inherited();
            cssProp = "0% { " + _conv.propertyToCssProperty(this,true) + " } ";
            cssProp += "100% { " + _conv.propertyToCssProperty(this) + " } ";
            $j.CSS.addCSSRule("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes " + this._internalId + "_hover",cssProp);
            this.control.bitmap.src = _const.PIX;
            switch(this.control.wrapMode) {
                case $j.types.imageWraps.ORIGINAL:
                    back = "background-size:auto auto;\
                background-position:auto auto;\
                background-repeat:no-repeat;";
                    break;
                case $j.types.imageWraps.FIT:
                    back = "background-size:contain;\
                background-position:center center;\
                background-repeat:no-repeat;";
                    break;
                case $j.types.imageWraps.STRETCH:
                    back = "background-size:100% 100%;\
                background-position:center center;\
                background-repeat:no-repeat;";
                    break;
                case $j.types.imageWraps.TILED:
                    back = "background-size:auto auto;\
                background-position:auto auto;\
                background-repeat:repeat;";
                    break;
            }
            style = "position:absolute;left:0;top:0;right:0;bottom:0;content:'';background-image:url('" + this.startValue.src + "');";
            $j.CSS.addCSSRule("#" + this.control._internalId + _const.PSEUDOCLASSBEFORE + ":before",style + back);
            $j.CSS.addCSSRule("#" + this.control._internalId + _const.PSEUDOCLASSBEFORE + ":before","animation:" + this.toCSS().replace(" none "," backwards ") + ";");
            $j.CSS.addCSSRule("#" + this.control._internalId + ":hover" + _const.PSEUDOCLASSBEFORE + ":before",$j.browser.getVendorPrefix("animation") + "animation:" + this.toCSS(this._internalId + "_hover").replace(" none "," forwards ") + ";");
            style = "position:absolute;left:0;top:0;right:0;bottom:0;content:'';opacity:0;background-image:url('" + this.stopValue.src + "');";
            $j.CSS.addCSSRule("#" + this.control._internalId + _const.PSEUDOCLASSBEFORE + ":after",style + back);
            $j.CSS.addCSSRule("#" + this.control._internalId + _const.PSEUDOCLASSBEFORE + ":after","animation:" + this.toCSS(this._internalId + "_hover") + ";");
            $j.CSS.addCSSRule("#" + this.control._internalId + ":hover" + _const.PSEUDOCLASSBEFORE + ":after",$j.browser.getVendorPrefix("animation") + "animation:" + this.toCSS().replace(" none "," forwards ") + ";");
        },
        assign: function(source) {
            if(!(source instanceof $j.classes.RectAnimation)) return;
            this._inherited(source);
            this.startValue = source.startValue;
            this.startFromCurrent = source.startFromCurrent;
            this.stopValue = source.stopValue;
        },
        destroy: function() {
            if(this._current) {
                this._current.canvas = null;
                this._current.ctx = null;
            }
            this._current = null;
            this._inherited();
        }
        //#endregion
    });
    //#endregion
    /*//#region BitmapListAnimation
    // Inheritance of BitmapListAnimation
    BitmapListAnimation.inherit($j.animation);
    function BitmapListAnimation(a,o) {
      // Private
      // Inheriting private vars
      $j.animation.call(this,a,o);
      // Initialization
      this.current=new $j.bitmap(0,0);
      this.lastAnimationStep=0;
      this.animationCount=1;
      this.animationBitmap=new $j.bitmap(0,0);
      this.propertyName=String.EMPTY;
    }
    BitmapListAnimation.prototype.processAnimation=function() {
      $j.animation.prototype.processAnimation.call(this);
      var value,leftpos,currentindex,nowvalue,persistent=String.EMPTY;
      if (this.owner) {
        if (this.propertyName!==String.EMPTY) {
          if (!this.instance) {
            this.instance=this.owner;
            this.path=this.propertyName;
            while (this.path.indexOf(".")>0) {
              persistent=this.path.split('.')[0].toLowerCase();
              this.path=this.path.split('.')[1];
              if (this.instance[Persistent]) this.instance=this.instance[Persistent];
            }
          }
        }
      }
      if (this.instance) {
        if (this.instance[this.path]) {
          if (this.instance[this.path] instanceof $j.bitmap) {
            nowvalue=_anims.interpolateSingle(0,this.animationCount-1,this.normalizedTime());
            this.current.setSize(value.height,value.width);
            currentindex=$j.trunc(nowvalue);
            leftpos=currentindex*(this.animationBitmap.width/this.animationCount|0)+currentindex;
            this.current.ctx.clear();
            this.current.ctx.drawBitmap(this.animationBitmap,
                                      leftpos,0,leftpos+current.width,current.height,
                                      0,0,(this.animationBitmap.width/this.animationCount|0),this.animationBitmap.height);
            this.instance[this.path]=current;
          }
        }
      }
    }
    BitmapListAnimation.prototype.assign=function(a) {
      if (!(a instanceof $j.bitmapListAnimation)) return;
      $j.animation.prototype.assign.call(this,a);
      this.animationCount=a.animationCount;
      this.animationBitmap=a.animationBitmap;
      this.propertyName=a.propertyName;
    }
    Object.seal(BitmapListAnimation);
    Object.seal(BitmapListAnimation.prototype);
    //#endregion*/
    /*//#region ColorKeyAnimation
    // Inheritance of ColorKeyAnimation
    ColorKeyAnimation.inherit($j.animation);
    function ColorKeyAnimation(a,o) {
      // Private
      // Inheriting private vars
      $j.animation.call(this,a,o);
      // Initialization
      this.keys=new _anims.keys;
      this.startFromCurrent=false;
      this.propertyName=String.EMPTY;
    }
    ColorKeyAnimation.prototype.start=function() {
      var persistent=String.EMPTY;
      if (this.owner) {
        if (this.propertyName!==String.EMPTY) {
          if (!this.instance) {
            this.instance=this.owner;
            this.path=this.propertyName;
            while (this.path.indexOf(".")>0) {
              persistent=this.path.split('.')[0].toLowerCase();
              this.path=this.path.split('.')[1];
              if (this.instance[persistent]) this.instance=this.instance[persistent];
            }
          }
        }
      }
      if (this.instance) {
        if (this.startFromCurrent) {
          if (this.instance[this.path]) {
            if (this.keys.length>0) {
              // is string prop
              if (typeof this.instance[this.path]==="String") this.keys[0].value=this.instance[this.path].toARGBString();
              // is color obj prop
              if (this.instance[this.path] instanceof $j.Color) this.keys[0].value=this.instance[this.path];
            }
          }
        }
      }
    }
    ColorKeyAnimation.prototype.processAnimation=function() {
      $j.animation.prototype.processAnimation.call(this);
      if (this.instance) {
        if (this.instance[this.path]) {
          var results=this.keys.findKeys(this.normalizedTime());
          if (results.result) {
            if (results.key2.key-results.key1.key===0) return;
            this.instance[this.path]=_anims.interpolateColor(results.key1.value,results.key2.value,(this.normalizedTime()-results.key1.key)/(results.key2.key-results.key1.key));
          }
        }
      }
    }
    ColorKeyAnimation.prototype.assign=function(a) {
      if (!(a instanceof $j.colorKeyAnimation)) return;
      $j.animation.prototype.assign.call(this,a);
      this.keys=a.keys;
      this.startFromCurrent=a.startFromCurrent;
      this.propertyName=a.propertyName;
    }
    Object.seal(ColorKeyAnimation);
    Object.seal(ColorKeyAnimation.prototype);
    //#endregion*/
    /*//#region FloatKeyAnimation
    // Inheritance of FloatKeyAnimation
    FloatKeyAnimation.inherit($j.animation);
    function FloatKeyAnimation(a,o) {
      // Private
      // Inheriting private vars
      $j.animation.call(this,a,o);
      // Initialization
      this.keys=new _anims.keys;
      this.startFromCurrent=false;
      this.propertyName=String.EMPTY;
    }
    FloatKeyAnimation.prototype.start=function() {
      var persistent=String.EMPTY;
      if (this.owner) {
        if (this.propertyName!==String.EMPTY) {
          if (!this.instance) {
            this.instance=this.owner;
            this.path=this.propertyName;
            while (this.path.indexOf(".")>0) {
              persistent=this.path.split('.')[0].toLowerCase();
              this.path=this.path.split('.')[1];
              if (this.instance[persistent]) this.instance=this.instance[persistent];
            }
          }
        }
      }
      if (this.instance) {
        if (this.startFromCurrent) {
          if (this.instance[this.path]) {
            if (this.keys.length>0) {
              if ($j.isNumber(this.instance[this.path])) this.keys[0]=this.instance[this.path];
            }
          }
        }
      }
    }
    FloatKeyAnimation.prototype.processAnimation=function() {
      $j.animation.prototype.processAnimation.call(this);
      if (this.instance) {
        if (this.instance[this.path]) {
          var results=this.keys.findKeys(this.normalizedTime());
          if (results.result) {
            if (results.key2.key-results.key1.key===0) return;
            this.instance[this.path]=_anims.interpolateSingle(results.key1.value,results.key2.value,(this.normalizedTime()-results.key1.key)/results.key2.key-Tvgself(Key1).Key);
          }
        }
      }
    }
    FloatKeyAnimation.prototype.assign=function(a) {
      if (!(a instanceof $j.floatKeyAnimation)) return;
      $j.animation.prototype.assign.call(this,a);
      this.keys=a.keys;
      this.startFromCurrent=a.startFromCurrent;
      this.propertyName=a.propertyName;
    }
    Object.seal(FloatKeyAnimation);
    Object.seal(FloatKeyAnimation.prototype);
    //#endregion*/
    //#region PathAnimation
    var PathAnimation = Animation.extend("PathAnimation",{
        init: function(owner,props,autoStart) {
            props = !props ? {} : props;
            if(owner) {
                this._inherited(owner,props,autoStart);
                // Initialization
                this.path = new $j.classes.PathData(this);
                this.rotate = false;
                this.startPt = new $j.classes.Point(1,1);
                this._obj = null;
                this._polygon = null;
                this._spline = null;
            }
        },
        //#region Methods
        start: function() {
            if(!this.control) return;
            if(this._spline) {
                this._spline = null;
            }
            if(this._polygon) {
                this._polygon = null;
            }
            var i = this.path.flattenToPolygon();
            this._polygon = i.Polygon;
            if(this._polygon.length > 1) {
                for(i = 1,l = this._polygon.length;i < l;i++) {
                    if((this._polygon[i].x === _const.CLOSEPOLYGON.x) && (this._polygon[i].y === _const.CLOSEPOLYGON.y)) this._polygon[i] = this._polygon[i - 1];
                }
            }
            this._spline = new $j.classes.Spline(this._polygon);
            if(this.control.visible) this.obj = this.control;
            else this._obj = null;
            if(this._obj) {
                this.startPt.x = this._obj._HTMLElement.offsetLeft;
                this.startPt.y = this._obj._HTMLElement.offsetTop;
            }
            this._inherited();
        },
        processAnimation: function() {
            if(!this.control) return;
            if(!$j.isHTMLRenderer()) {
                if(!this.control.checkOwnerVisible()) return;
            }
            if(this.form._loading || this.form._creating) return;
            this._inherited();
            var oldp,p1,v,c,a = 0,r,l,t;
            if(!this._polygon) return;
            if((this._polygon.length > 0) && this._obj) {
                if(!$j.isHTMLRenderer()) {
                    if(this.control._allowUpdate) r = this.control.screenRect();
                }
                var nt = this.normalizedTime();
                oldp = new $j.classes.Point(this._obj._HTMLElement.offsetLeft,this._obj._HTMLElement.offsetTop);
                p1 = this._spline.splineXY(nt * this._polygon.length);
                l = this.startPt.x + p1.x;
                t = this.startPt.y + p1.y;
                if(this.rotate && (nt !== 0) && (nt !== 1) && ((oldp.x !== l) && (oldp.y !== t))) {
                    v = new $j.classes.Vector(l - oldp.x,t - oldp.y);
                    c = v.crossProductZ(new $j.classes.Vector(0,1)) < 0;
                    if(this.inverse) {
                        if(c) a = 180 + _conv.rad2Deg($j.acos(v.angleCosine(new $j.classes.Vector(0,1))));
                        else a = 180 - _conv.rad2Deg($j.acos(v.angleCosine(new $j.classes.Vector(0,1))));
                    } else {
                        if(c) a = _conv.rad2Deg($j.acos(v.angleCosine(new $j.classes.Vector(0,1))));
                        else a = -_conv.rad2Deg($j.acos(v.angleCosine(new $j.classes.Vector(0,1))));
                    }
                }
                if(a !== 0) this._obj.rotateAngle = a;
                if(!$j.isHTMLRenderer()) {
                    if(this.control._allowUpdate) {
                        this.control.update();
                        this.control.updateXML();
                    }
                    if(!this.form.useRequestAnim) this.control.redraw(r);
                    else this.form.needRedraw = true;
                } else {
                    if(!this._loading && !this.form._loading) {
                        $j.CSS.updateInlineCSS(this._obj,$j.types.jsCSSProperties.TRANSFORM);
                        this._obj._HTMLElementStyle.left = l + $j.types.CSSUnits.PX;
                        this._obj._HTMLElementStyle.top = t + $j.types.CSSUnits.PX;
                        //$j.CSS.updateInlineCSS(this._obj,$j.types.jsCSSProperties.LEFT);
                        //$j.CSS.updateInlineCSS(this._obj,$j.types.jsCSSProperties.TOP);
                    }
                }
            }
        },
        assign: function(source) {
            if(!(source instanceof $j.classes.RectAnimation)) return;
            this._inherited(source);
            this.path = source.path;
            this.rotate = source.rotate;
        },
        destroy: function() {
            this.path.destroy();
            this.path = null;
            this.rotate = null;
            this.startPt.destroy();
            this.startPt = null;
            this._obj = null;
            if(this._polygon) this._polygon.destroy();
            this._polygon = null;
            if(this._spline) this._spline.destroy();
            this._spline = null;
            this._inherited();
        }
        //#endregion
    });
    //#endregion
    //#region PathSwitcher
    var PathSwitcher = Animation.extend("PathSwitcher",{
        init: function(owner,props,autoStart) {
            props = !props ? {} : props;
            if(owner) {
                this._inherited(owner,props,autoStart);
                this.duration = 0.001;
                this._pathTrue = null;
                this._pathFalse = null;
            }
        },
        //#region Methods
        assign: function(source) {
            if(!(source instanceof $j.classes.RectAnimation)) return;
            this._inherited(source);
            this._pathTrue = source._pathTrue;
            this._pathFalse = source._pathFalse;
        },
        destroy: function() {
            this._pathTrue = null;
            this._pathFalse = null;
            this._inherited();
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL,Spline,Animation,PathSwitcher);
    $j.classes.register($j.types.categories.ANIMATIONS,ColorAnimation,GradientAnimation,FloatAnimation,RectAnimation,BitmapAnimation,PathAnimation);
    //#region Templates
    var ColorAnimationTpl = "<div id='{internalId}' data-name='{name}' data-class='ColorAnimation' class='ColorAnimation ShortCutIcon'>\
                         <div class='ShortCutIconImg coloranimation'></div>\
                         <div class='ShortCutIconCaption'>{name}</div>\
                         </div>",
        GradientAnimationTpl = "<div id='{internalId}' data-name='{name}' data-class='GradientAnimation' class='GradientAnimation ShortCutIcon'>\
                            <div class='ShortCutIconImg gradientanimation'></div>\
                            <div class='ShortCutIconCaption'>{name}</div>\
                            </div>",
        FloatAnimationTpl = "<div id='{internalId}' data-name='{name}' data-class='FloatAnimation' class='FloatAnimation ShortCutIcon'>\
                         <div class='ShortCutIconImg floatanimation'></div>\
                         <div class='ShortCutIconCaption'>{name}</div>\
                         </div>",
        RectAnimationTpl = "<div id='{internalId}' data-name='{name}' data-class='RectAnimation' class='RectAnimation ShortCutIcon'>\
                        <div class='ShortCutIconImg rectanimation'></div>\
                        <div class='ShortCutIconCaption'>{name}</div>\
                        </div>",
        BitmapAnimationTpl = "<div id='{internalId}' data-name='{name}' data-class='BitmapAnimation' class='BitmapAnimation ShortCutIcon'>\
                          <div class='ShortCutIconImg bitmapanimation'></div>\
                          <div class='ShortCutIconCaption'>{name}</div>\
                          </div>",
        PathAnimationTpl = "<div id='{internalId}' data-name='{name}' data-class='PathAnimation' class='PathAnimation ShortCutIcon'>\
                        <div class='ShortCutIconImg pathanimation'></div>\
                        <div class='ShortCutIconCaption'>{name}</div>\
                        </div>",
        PathSwitcherTpl = "<div id='{internalId}' data-name='{name}' data-class='PathSwitcher' class='PathSwitcher ShortCutIcon'>\
                       <div class='ShortCutIconImg pathswitcher'></div>\
                       <div class='ShortCutIconCaption'>{name}</div>\
                       </div>";
    $j.classes.registerTemplates([{ Class: ColorAnimation,template: ColorAnimationTpl },{ Class: GradientAnimation,template: GradientAnimationTpl },{ Class: FloatAnimation,template: FloatAnimationTpl },
                                  { Class: RectAnimation,template: RectAnimationTpl },{ Class: BitmapAnimation,template: BitmapAnimationTpl },{ Class: PathAnimation,template: PathAnimationTpl },
                                  { Class: PathSwitcher,template: PathSwitcherTpl }]);
    //#endregion
})();
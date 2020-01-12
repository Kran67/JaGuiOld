define(['require', 'core'], function (require, Core)
{
    function normalizeAngle(a)
    {
        var Types = require('types');
        if (typeof a !== Types.CONSTANTS.NUMBER) a = 0;
        var result = a - (a * Types.CONSTANTS.INV360 | 0) * 360;
        if (result < -180) result = result + 360;
        return;
    };
    function createRotationMatrix(a)
    {
        var Types = require('types');
        if (typeof a !== Types.CONSTANTS.NUMBER) a = 0;
        var cosine = 0, sine = 0, x = Core.sinCos(a);
        cosine = x.cos;
        sine = x.sin;

        var result = Types.CONSTANTS.ZEROMATRIX.clone();
        result.m11 = cosine;
        result.m12 = sine;
        result.m13 = 0;

        result.m21 = -sine;
        result.m22 = cosine;
        result.m23 = 0;

        result.m31 = 0;
        result.m32 = 0;
        result.m33 = 1;
        cosine = sine = x = null;
        result;
    };
    function vectorLine(p, p1)
    {
        if (!(p instanceof Point)) return;
        if (!(p1 instanceof Point)) return;
        return p1.subtract(p);
    }
    //#region Point
    var Point = Core.Class.extend("Point", {
        init: function (x, y)
        {
            if (isNaN(x)) x = 0;
            if (isNaN(y)) y = 0;
            this.x = +x;
            this.y = +y;
            //this.setX=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_x) _x=newValue;
            //};
            //this.setY=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_y) _y=newValue;
            //};
        },
        //#region Setters
        setValues: function (x, y)
        {
            x = +x;
            if (isNaN(x)) x = 0;
            y = +y;
            if (isNaN(y)) y = 0;
            this.x = x;
            this.y = y;
        },
        //#endregion
        //#region Methods
        isEmpty: function () { return this.x + this.y === 0; },
        length: function () { return Core.sqrt(this.x * this.x + this.y * this.y); },
        clone: function ()
        {
            var p = new Point();
            p.assign(this);
            return p;
        },
        min: function (p)
        {
            if (!(p instanceof Point)) return this;
            if ((p.y < this.y) || ((p.y === this.y) && (p.x < this.x))) return p;
            else return this;
        },
        scale: function (x, y)
        {
            var Types = require('types');
            if (typeof x !== Types.CONSTANTS.NUMBER) x = 0;
            if (typeof y !== Types.CONSTANTS.NUMBER) y = 0;
            this.x *= x;
            this.y *= y;
            return this;
        },
        inRect: function (r)
        {
            if (!(r instanceof Rect)) return false;
            return ((this.x >= r.left) && (this.x <= r.right) && (this.y >= r.top) && (this.y <= r.bottom));
        },
        rotate: function (a, c)
        {
            if (!(c instanceof Point)) c = new Point(this.x, this.y);
            if (typeof a !== Types.CONSTANTS.NUMBER) a = 0;
            a = _conv.deg2Rad(a);
            var /*s=$j.sin(a),c1=$j.cos(a),*/dx, dy;
            dx = this.x - c.x;
            dy = this.y - c.y;
            // calculate angle and distance
            var a1 = Core.atan2(dy, dx);
            var dist = Core.sqrt(dx * dx + dy * dy);
            // calculate new angle
            var a2 = a1 + a;
            // calculate new coordinates
            this.x = Core.cos(a2) * dist + c.x;
            this.y = Core.sin(a2) * dist + c.y;
            return this;
        },
        multiply: function (v)
        {
            if (!v) return;
            var Types = require('types');
            if (v instanceof Point)
            {
                this.x *= v.x;
                this.y *= v.y;
            }
            else
            {
                if (typeof v !== Types.CONSTANTS.NUMBER) v = 1;
                this.x *= v;
                this.y *= v;
            }
            return this;
        },
        divide: function (v)
        {
            if (!v) return null;
            var Types = require('types');
            if (v instanceof Point)
            {
                this.x /= v.x;
                this.y /= v.y;
            } else
            {
                if (typeof v !== Types.CONSTANTS.NUMBER) v = 1;
                this.x /= v;
                this.y /= v;
            }
            return this;
        },
        subtract: function (v)
        {
            if (!v) return null;
            var Types = require('types');
            if (v instanceof Point)
            {
                this.x -= v.x;
                this.y -= v.y;
            } else
            {
                if (typeof v !== Types.CONSTANTS.NUMBER) v = 0;
                this.x -= v;
                this.y -= v;
            }
            return this;
        },
        add: function (v)
        {
            if (!v) return;
            var Types = require('types');
            if (v instanceof Point)
            {
                this.x += v.x;
                this.y += v.y;
            } else
            {
                if (typeof v !== Types.CONSTANTS.NUMBER) v = 0;
                this.x += v;
                this.y += v;
            }
            return this;
        },
        distance: function (p)
        {
            if (!(p instanceof Point)) return 0;
            var dx = p.x - this.x;
            var dy = p.y - this.y;
            return Core.sqrt(dx * dx + dy * dy);
        },
        directedAngle: function (p)
        {
            if (!(p instanceof Point)) return 0;
            return Core.atan2(this.cross(p), this.dot(p)) * 180 / Math.PI;
        },
        cross: function (p)
        {
            if (!(p instanceof Point)) return 0;
            return this.x * p.y - this.y * p.x;
        },
        dot: function (p)
        {
            if (!(this instanceof Point)) return 0;
            if (!(p instanceof Point)) return 0;
            return this.x * p.x + this.y * p.y;
        },
        assign: function (source)
        {
            if (!(source instanceof Point)) return;
            this.x = source.x;
            this.y = source.y;
        },
        inPolygon: function (pts)
        {
            var inside = false, c, j;
            if (!Array.isArray(pts)) return inside;
            if (pts.length < 3) return inside;
            c = 0;
            j = pts.length - 1;
            j1 = j;
            for (var i = 0; i <= j; i++)
            {
                if ((((pts[i].y <= this.y) && (this.y < pts[j1].y)) ||
                    ((pts[j1].y <= this.y) && (this.y < pts[i].y))) &&
                    (this.x < (pts[j1].x - pts[i].x) * (this.y - pts[i].y) / (pts[j1].y - pts[i].y) + pts[i].x))
                {
                    if (c === 0) c = 1;
                    else c = 0;
                }
                j1 = i;
            }
            if (c !== 0) inside = true;
            return inside;
        },
        inEllipse: function (r)
        {
            var x0 = (r.left + r.right) * 0.5;
            var y0 = (r.top + r.bottom) * 0.5;
            var a = (r.right - r.left) * 0.5;
            var b = (r.bottom - r.top) * 0.5;
            if (Core.sqr((this.x - x0) / a) + Core.sqr((this.y - y0) / b) <= 1.0) return true;
            else return false;
        },
        onLine: function () { },
        onPolyline: function () { },
        onBezier: function () { },
        onArc: function () { },
        equals: function (p)
        {
            return this.x === p.x && this.y === p.y;
        },
        destroy: function ()
        {
            this.x = null;
            this.y = null;
        },
        offset: function (x, y)
        {
            var Types = require('types');
            if (typeof x !== Types.CONSTANTS.NUMBER || typeof y !== Types.CONSTANTS.NUMBER) return;
            this.x += x;
            this.y += y;
        },
        getProperties: function ()
        {
            var Tools = require('tools');
            var props;
            props = Tools.getPropertiesFromObject(this);
            return props;
        },
        toArray: function ()
        {
            var a = [];
            a.push(this.x);
            a.push(this.y);
            return a;
        }
        //#endregion
    });
    //#endregion
    //#region Rect
    var Rect = Core.Class.extend("Rect", {
        init: function (l, t, r, b)
        {
            if (isNaN(l)) l = 0;
            if (isNaN(t)) t = 0;
            if (isNaN(r)) r = 0;
            if (isNaN(b)) b = 0;
            this.left = +l;
            this.top = +t;
            this.right = +r;
            this.bottom = +b;
            //this.setLeft=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_l) _left=newValue;
            //};
            //this.setTop=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_t) _t=newValue;
            //};
            //this.setRight=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_r) _r=newValue;
            //};
            //this.setBottom=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_b) _b=newValue;
            //};
        },
        //#region Setters
        setTopLeft: function (newValue)
        {
            if (!(newValue instanceof Point)) return;
            this.left = newValue.x;
            this.top = newValue.y;
        },
        setTopRight: function (newValue)
        {
            if (!(newValue instanceof Point)) return;
            this.top = newValue.y;
            this.right = newValue.x;
        },
        setBottomLeft: function (newValue)
        {
            if (!(newValue instanceof Point)) return;
            this.bottom = newValue.y;
            this.left = newValue.x;
        },
        setBottomRight: function (newValue)
        {
            if (!(newValue instanceof Point)) return;
            this.bottom = newValue.y;
            this.right = newValue.x;
        },
        setValues: function (l, t, r, b)
        {
            l = +l;
            t = +t;
            r = +r;
            b = +b;
            if (isNaN(l)) l = 0;
            if (isNaN(t)) t = 0;
            if (isNaN(r)) r = 0;
            if (isNaN(b)) b = 0;
            this.left = l;
            this.top = t;
            this.right = r;
            this.bottom = b;
        },
        //#endregion
        //#region Methods
        isEmpty: function () { return ((this.width() <= 0) || (this.height() <= 0)); },
        width: function ()
        {
            var w = this.right - this.left;
            return (w < 0) ? 0 : w;
        },
        height: function ()
        {
            var h = this.bottom - this.top;
            return (h < 0) ? 0 : h;
        },
        topLeft: function () { return new Point(this.left, this.top); },
        topRight: function () { return new Point(this.width() - Core.abs(this.left), this.top); },
        bottomLeft: function () { return new Point(this.left, this.height() - Core.abs(this.top)); },
        bottomRight: function () { return new Point(this.width() - Core.abs(this.left), this.height() - Core.abs(this.top)); },
        clone: function ()
        {
            var r = new Rect;
            r.assign(this);
            return r;
        },
        normalize: function (a)
        {
            if (!Array.isArray(a)) return;
            //a.add(this);
            var result = new Rect(0xF000, 0xF000, -0xF000, -0xF000);
            for (var i = 0, l = a.length; i < l; i++)
            {
                if (!(a[i] instanceof Point)) continue;
                if (a[i].x < result.left) result.left = a[i].x;
                if (a[i].y < result.top) result.top = a[i].y;
                if (a[i].x > result.right) result.right = a[i].x;
                if (a[i].y > result.bottom) result.bottom = a[i].y;
            }
            return result;
        },
        normalize2: function (a)
        {
            if (!(a instanceof Rect)) return;
            this.normalize([new Point(a.left, a.top), new Point(a.right, a.top), new Point(a.right, a.bottom), new Point(a.left, a.bottom)]);
            return this;
        },
        reduce: function (x, y)
        {
            var Types = require('types');
            if (typeof x !== Types.CONSTANTS.NUMBER) x = 0;
            if (typeof y !== Types.CONSTANTS.NUMBER) y = 0;
            this.right -= x;
            this.bottom -= y;
            return this;
        },
        extend: function (x, y)
        {
            var Types = require('types');
            if (typeof x !== Types.CONSTANTS.NUMBER) x = 0;
            if (typeof y !== Types.CONSTANTS.NUMBER) y = 0;
            this.right += x;
            this.bottom += y;
            return this;
        },
        center: function (b)
        {
            if (!(b instanceof Rect)) return;
            this.offset(-this.left, -this.top);
            this.offset(Core.round((b.width() - this.width()) / 2), Core.round((b.height() - this.height()) / 2));
            this.offset(b.left, b.top);
            return this;
        },
        fit: function (b)
        {
            if (!(b instanceof Rect)) return 0;
            var _ratio = 1;
            if (b.isEmpty()) return { rect: this, ratio: _ratio };
            if ((this.width() / b.width()) > (this.height() / b.height())) _ratio = this.width() / b.width();
            else _ratio = this.height() / b.height();
            if (_ratio < 1)
            {
                this.right = this.width();
                this.bottom = this.height();
                this.left = 0;
                this.top = 0;
            } else
            {
                this.right = Core.round(this.width() / _ratio);
                this.bottom = Core.round(this.height() / _ratio);
                this.left = 0;
                this.top = 0;
            }
            this.center(b);
            return { rect: this, ratio: _ratio };
        },
        offset: function (x, y)
        {
            var Types = require('types');
            if (typeof x !== Types.CONSTANTS.NUMBER) x = 0;
            if (typeof y !== Types.CONSTANTS.NUMBER) y = 0;
            this.left += x;
            this.right += x;
            this.top += y;
            this.bottom += y;
            return this;
        },
        multiply: function (x, y)
        {
            var Types = require('types');
            if (typeof x !== Types.CONSTANTS.NUMBER) x = 0;
            if (typeof y !== Types.CONSTANTS.NUMBER) y = 0;
            this.left *= x;
            this.right *= x;
            this.top *= y;
            this.bottom *= y;
            return this;
        },
        inflate: function (x, y)
        {
            var Types = require('types');
            if (typeof x !== Types.CONSTANTS.NUMBER) x = 0;
            if (typeof y !== Types.CONSTANTS.NUMBER) y = 0;
            this.left -= x;
            this.right += x;
            this.top -= y;
            this.bottom += y;
            return this;
        },
        intersect: function (r)
        {
            if (!(r instanceof Rect)) return false;
            return ((this.left <= r.right) && (this.right >= r.left) && (this.top <= r.bottom) && (this.bottom >= r.top));
        },
        intersectRectDS: function (r)
        {
            var result = (r.left < this.right)
                && (r.right > this.left)
                && (r.top < this.bottom)
                && (r.bottom > this.top);

            if (result)
            {
                this.left = Core.max(this.left, r.left);
                this.top = Core.max(this.top, r.top);
                this.right = Core.min(this.right, r.right);
                this.bottom = Core.min(this.bottom, r.bottom);
            } else
            {
                this.left = 0;
                this.top = 0;
                this.right = 0;
                this.bottom = 0;
            }
        },
        union: function (r)
        {
            if (!(r instanceof Rect)) return;
            var x1 = Core.min(this.left, r.left);
            var x2 = Core.max(this.left + this.width(), r.left + r.width());
            var y1 = Core.min(this.top, r.top);
            var y2 = Core.max(this.top + this.height(), r.top + r.height());
            this.left = x1;
            this.top = y1;
            this.right = x2;
            this.bottom = y2;
            return this;
        },
        includedRect: function (r)
        {
            if (!(r instanceof Rect)) return;
            if (this.left < r.left) this.left = r.left;
            if (this.top < r.top) this.top = r.top;
            if (this.right > r.right) this.right = r.right;
            if (this.bottom > r.bottom) this.bottom = r.bottom;
            return this;
        },
        equals: function (r)
        {
            if (!(r instanceof Rect)) return;
            return ((r.left === this.left) && (r.top === this.top) && (r.right === this.right) && (r.bottom === this.bottom));
        },
        rotate: function (angle)
        {
            //var m=Matrix.create(),tlp=Point.create(this.left,this.top),brp=Point.create(this.right,this.bottom);
            //m.assign(Types.CONSTANTS.IDENTITYMATRIX);
            //m.translate(this.left,this.top);
            //m.rotate(angle);
            //m.transformPoint(tlp);
            //m.transformPoint(trp);
            //m.transformPoint(blp);
            //m.transformPoint(brp);
            //this.left=tlp.x;
            //this.top=tlp.y;
            //this.right=brp.x;
            //this.bottom=brp.y;
            if (angle !== 0)
            {
                var w = this.width(), h = this.height(), x = this.left, y = this.top;
                this.left = x + (w / 2) * Core.cos(Conversion.deg2Rad(angle)) - (h / 2) * Core.sin(Conversion.deg2Rad(angle));
                this.top = y + (h / 2) * Core.cos(Conversion.deg2Rad(angle)) + (w / 2) * Core.sin(Conversion.deg2Rad(angle));
                this.right = this.left + w;
                this.bottom = this.top + h;
                //this.right=x-(w/2)*$j.cos(_conv.deg2Rad(angle))-(h/2)*$j.sin(_conv.deg2Rad(angle));
                //this.bottom=y-(h/2)*$j.cos(_conv.deg2Rad(angle))+(w/2)*$j.sin(_conv.deg2Rad(angle));
            }
        },
        assign: function (source)
        {
            if (!(source instanceof Rect)) return;
            this.left = source.left;
            this.top = source.top;
            this.right = source.right;
            this.bottom = source.bottom;
        },
        destroy: function ()
        {
            this.left = null;
            this.top = null;
            this.right = null;
            this.bottom = null;
        }
        //#endregion
    });
    //#endregion
    //#region Vector
    var Vector = Core.Class.extend("Vector", {
        init: function (x, y, z)
        {
            if (isNaN(x)) x = 0;
            if (isNaN(y)) y = 0;
            if (isNaN(z)) z = 1;
            this.x = +x;
            this.y = +y;
            this.z = +z;
            //this.setX=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_x) _x=newValue;
            //};
            //this.setY=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_y) _y=newValue;
            //};
            //this.setZ=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_z) _z=newValue;
            //};
        },
        //#region Setters
        setValues: function (x, y, z)
        {
            x = +x;
            y = +y;
            z = +z;
            if (isNaN(x)) x = 0;
            if (isNaN(y)) y = 0;
            if (isNaN(z)) z = 0;
            this.x = x;
            this.y = y;
            this.z = z;
        },
        //#endregion
        //#region Methods
        point: function () { return new Point(this.x, this.y); },
        length: function () { return Core.sqrt(this.dot(this)); },
        clone: function ()
        {
            var v = new Vector();
            v.assign(this);
            return v;
        },
        norm: function () { return this.x * this.x + this.y * this.y; },
        normalize: function ()
        {
            var invlen = Core.RSqrt(Core.abs(this.norm()));
            this.x *= invlen;
            this.y *= invlen;
            this.z = 0.0;
            return this;
        },
        transform: function (m)
        {
            if (!(m instanceof Matrix)) return;
            var x = this.x, y = this.y, z = this.z;
            this.x = x * m.m11 + y * m.m21 + z * m.m31;
            this.y = x * m.m12 + y * m.m22 + z * m.m32;
            this.z = 1.0;
            return this;
        },
        add: function (v, v1)
        {
            if (!(v instanceof Vector)) return;
            if (!(v1 instanceof Vector)) return;
            var result = new Vector();
            result.x = v.x + v1.x;
            result.y = v.y + v1.y;
            result.z = 1.0;
            return result;
        },
        subtract: function (v)
        {
            if (!(v instanceof Vector)) return;
            this.x -= v.x;
            this.y -= v.y;
            this.z = 1;
            return this;
        },
        scale: function (f)
        {
            var Types = require('types');
            if (typeof f !== Types.CONSTANTS.NUMBER) f = 0;
            this.x *= f;
            this.y *= f;
            this.z = 1;
            return this;
        },
        dot: function (v)
        {
            if (!(v instanceof Vector)) return;
            return this.x * v.x + this.y * v.y + this.z * v.z;
        },
        angleCosine: function (v)
        {
            var dot, len1, len2, result;
            len1 = Core.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
            len2 = Core.sqrt((v.x * v.x) + (v.y * v.y) + (v.z * v.z));
            dot = (this.x * v.x + this.y * v.y + this.z * v.z);
            result = len1 * len2;
            if (Core.abs(result) > 1e-40) result = dot / result;
            else result = 1;
            return result;
        },
        crossProductZ: function (v)
        {
            if (!(v instanceof Vector)) return;
            return this.x * v.y - this.y * v.x;
        },
        combine2: function (v, f, f1)
        {
            if (!(v instanceof Vector)) return;
            var Types = require('types');
            if (typeof f !== Types.CONSTANTS.NUMBER) f = 0;
            if (typeof f1 !== Types.CONSTANTS.NUMBER) f1 = 0;
            var x = this.x, y = this.y/*,z=this.z*/;
            this.x = (f * x) + (f1 * v.x);
            this.y = (f * y) + (f1 * v.y);
            this.z = 1;
            return this;
        },
        reflect: function (v)
        {
            if (!(v1 instanceof Vector)) return;
            return this.combine2(v, 1, -2 * this.dot(v));
        },
        angle: function (v)
        {
            if (!(v instanceof Vector)) return;
            var Conversion = require('conversion');
            if (this.crossProductZ(v) < 0) return Conversion.rad2Deg(Core.acos(this.angleCosine(v)));
            else return -Conversion.rad2Deg(Core.acos(this.angleCosine(v)));
        },
        assign: function (source)
        {
            if (!(source instanceof Vector)) return;
            this.x = source.x;
            this.y = source.y;
            this.z = source.z;
        },
        equals: function (vector)
        {
            return this.x === vector.x && this.y === vector.y && this.z === vector.z;
        },
        destroy: function ()
        {
            this.x = null;
            this.y = null;
            this.z = null;
        }
        //#endregion
    });
    //#endregion
    //#region Matrix
    var Matrix = Core.Class.extend("Matrix", {
        init: function (v, v1, v2)
        {
            if (!(v instanceof Vector)) v = new Vector();
            if (!(v1 instanceof Vector)) v1 = new Vector();
            if (!(v2 instanceof Vector)) v2 = new Vector();
            this.m11 = v.x;
            this.m12 = v.y;
            this.m13 = v.z;
            this.m21 = v1.x;
            this.m22 = v1.y;
            this.m23 = v1.z;
            this.m31 = v2.x;
            this.m32 = v2.y;
            this.m33 = v2.z;
            //this.setM11=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_m11) _m11=newValue;
            //};
            //this.setM12=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_m12) _m12=newValue;
            //};
            //this.setM13=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_m13) _m13=newValue;
            //};
            //this.setM21=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_m21) _m21=newValue;
            //};
            //this.setM22=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_m22) _m22=newValue;
            //};
            //this.setM23=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_m23) _m23=newValue;
            //};
            //this.setM31=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_m31) _m31=newValue;
            //};
            //this.setM32=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_m32) _m32=newValue;
            //};
            //this.setM33=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.NUMBER) return;
            //  if(newValue!==_m33) _m33=newValue;
            //};
        },
        //#region Setters
        setValues: function (m11, m12, m13, m21, m22, m23, m31, m32, m33)
        {
            m11 = +m11;
            m12 = +m12;
            m13 = +m13;
            m21 = +m21;
            m22 = +m22;
            m23 = +m23;
            m31 = +m31;
            m32 = +m32;
            m33 = +m33;
            if (isNaN(m11)) m11 = 0;
            if (isNaN(m12)) m12 = 0;
            if (isNaN(m13)) m13 = 0;
            if (isNaN(m21)) m21 = 0;
            if (isNaN(m22)) m22 = 0;
            if (isNaN(m23)) m23 = 0;
            if (isNaN(m31)) m31 = 0;
            if (isNaN(m32)) m32 = 0;
            if (isNaN(m33)) m33 = 0;
            this.m11 = m11;
            this.m12 = m12;
            this.m13 = m13;
            this.m21 = m21;
            this.m22 = m22;
            this.m23 = m23;
            this.m31 = m31;
            this.m32 = m32;
            this.m33 = m33;
        },
        //#endregion
        //#region Methods
        clone: function ()
        {
            var mat = new Matrix();
            mat.assign(this);
            return mat;
        },
        determinant: function ()
        {
            return this.m11 * (this.m22 * this.m33 - this.m32 * this.m23)
                    - this.m12 * (this.m21 * this.m33 - this.m31 * this.m23)
                    + this.m13 * (this.m21 * this.m32 - this.m31 * this.m22);
        },
        adjoint: function ()
        {
            var a1, a2, a3, b1, b2, b3, c1, c2, c3;
            a1 = this.m11; a2 = this.m12; a3 = this.m13;
            b1 = this.m21; b2 = this.m22; b3 = this.m23;
            c1 = this.m31; c2 = this.m32; c3 = this.m33;
            this.m11 = (b2 * c3 - c2 * b3);
            this.m12 = -(a2 * c3 - c2 * a3);
            this.m13 = (a2 * b3 - b2 * a3);
            this.m21 = -(b1 * c3 - c1 * b3);
            this.m22 = (a1 * c3 - c1 * a3);
            this.m23 = -(a1 * b3 - b1 * a3);
            this.m31 = (b1 * c2 - c1 * b2);
            this.m32 = -(a1 * c2 - c1 * a2);
            this.m33 = (a1 * b2 - b1 * a2);
            return this;
        },
        free: function ()
        {
            this.m11 = this.m12 = this.m13 = this.m21 = this.m22 = this.m23 = this.m31 = this.m32 = this.m33 = null;
            delete this.m11;
            delete this.m12;
            delete this.m13;
            delete this.m21;
            delete this.m22;
            delete this.m23;
            delete this.m31;
            delete this.m32;
            delete this.m33;
            this.multiply = null;
            delete this.multiply;
            this.determinant = null;
            delete this.determinant;
            this.adjoint = null;
            delete this.adjoint;
            this.assign = null;
            delete this.assign;
            this.createRotation = null;
            delete this.createRotation;
            this.rotate = null;
            delete this.rotate;
            this.translate = null;
            delete this.translate;
            this.transformPoint = null;
            delete this.transformPoint;
            this.scale = null;
            delete this.scale;
            this.invert = null;
            delete this.invert;
            this.equals = null;
            delete this.equals;
            this.free = null;
            delete this.free;
        },
        multiply: function (m1)
        {
            if (!(m1 instanceof Matrix)) return;
            var Types = require('types');
            var m = Types.CONSTANTS.ZEROMATRIX.clone();
            m.assign(this);
            this.m11 = m.m11 * m1.m11 + m.m12 * m1.m21 + m.m13 * m1.m31;
            this.m12 = m.m11 * m1.m12 + m.m12 * m1.m22 + m.m13 * m1.m32;
            this.m13 = m.m11 * m1.m13 + m.m12 * m1.m23 + m.m13 * m1.m33;
            this.m21 = m.m21 * m1.m11 + m.m22 * m1.m21 + m.m23 * m1.m31;
            this.m22 = m.m21 * m1.m12 + m.m22 * m1.m22 + m.m23 * m1.m32;
            this.m23 = m.m21 * m1.m13 + m.m22 * m1.m23 + m.m23 * m1.m33;
            this.m31 = m.m31 * m1.m11 + m.m32 * m1.m21 + m.m33 * m1.m31;
            this.m32 = m.m31 * m1.m12 + m.m32 * m1.m22 + m.m33 * m1.m32;
            this.m33 = m.m31 * m1.m13 + m.m32 * m1.m23 + m.m33 * m1.m33;
            m = null;
            return this;
        },
        assign: function (source)
        {
            if (!(source instanceof Matrix)) return;
            this.m11 = source.m11;
            this.m12 = source.m12;
            this.m13 = source.m13;
            this.m21 = source.m21;
            this.m22 = source.m22;
            this.m23 = source.m23;
            this.m31 = source.m31;
            this.m32 = source.m32;
            this.m33 = source.m33;
        },
        rotate: function (a)
        {
            var A = Conversion.deg2Rad(a), x = Core.sinCos(A);
            var Types = require('types');
            var m = Types.CONSTANTS.ZEROMATRIX.clone();
            m.assign(this);
            this.m11 = m.m11 * x.cos + m.m21 * x.sin;
            this.m12 = m.m12 * x.cos + m.m22 * x.sin;
            this.m21 = m.m11 * -x.sin + m.m21 * x.cos;
            this.m22 = m.m12 * -x.sin + m.m22 * x.cos;
            A = x = m = null;
        },
        translate: function (x, y)
        {
            var Types = require('types');
            var m = Types.CONSTANTS.ZEROMATRIX.clone();
            m.assign(this);
            this.m31 += m.m11 * x + m.m21 * y;
            this.m32 += m.m12 * x + m.m22 * y;
            m = null;
        },
        transformPoint: function (p)
        { // à voir
            var x = p.x, y = p.y;
            p.x = x * this.m11 + y * this.m21 + this.m31;
            p.y = x * this.m12 + y * this.m22 + this.m32;
            x = y = null;
            //return _geo.point(p.x,p.y);
        },
        scale: function (x, y)
        {
            this.m11 *= x;
            this.m12 *= x;
            this.m21 *= y;
            this.m22 *= y;
        },
        invert: function ()
        {
            var d = 1 / (this.m11 * this.m22 - this.m12 * this.m21);
            var m0 = this.m22 * d;
            var m1 = -this.m12 * d;
            var m2 = -this.m21 * d;
            var m3 = this.m11 * d;
            var m4 = d * (this.m21 * this.m32 - this.m22 * this.m31);
            var m5 = d * (this.m12 * this.m31 - this.m11 * this.m32);
            this.m11 = m0;
            this.m12 = m1;
            this.m21 = m2;
            this.m22 = m3;
            this.m31 = m4;
            this.m32 = m5;
            d = m0, m1, m2, m3, m4, m5 = null;
        },
        equals: function (m)
        {
            return this.m11 === m.m11 && this.m12 === m.m12 &&
                    this.m13 === m.m13 && this.m21 === m.m21 &&
                    this.m22 === m.m22 && this.m23 === m.m23 &&
                    this.m31 === m.m31 && this.m32 === m.m32 &&
                    this.m33 === m.m33;
        },
        destroy: function ()
        {
            this.m11 = null;
            this.m12 = null;
            this.m13 = null;
            this.m21 = null;
            this.m22 = null;
            this.m23 = null;
            this.m31 = null;
            this.m32 = null;
            this.m33 = null;
        },
        toString: function (sep, withBracket)
        {
            var Types = require('types');
            var result = "";
            if (!sep) sep = String.SPACE;
            if (typeof withBracket !== Types.CONSTANTS.BOOLEAN && !withBracket) withBracket = false;
            result += (withBracket ? "[" : String.SPACE);
            result += this.m11 + sep;
            result += this.m12 + sep;
            result += this.m13 + sep;
            result += this.m21 + sep;
            result += this.m22 + sep;
            result += this.m23 + sep;
            result += this.m31 + sep;
            result += this.m32 + sep;
            result += this.m33 + sep;
            result += (withBracket ? "]" : String.SPACE);
            return result;
        },
        toArray: function ()
        {
            var result = [];
            result.push(this.m11);
            result.push(this.m12);
            result.push(this.m13);
            result.push(this.m21);
            result.push(this.m22);
            result.push(this.m23);
            result.push(this.m31);
            result.push(this.m32);
            result.push(this.m33);
            return result;
        }
        //#endregion
    });
    //#endregion
    //#region Line
    var Line = Core.Class.extend("_Line", {
        init: function (p, p1, i)
        {
            var Types = require('types');
            if (!(p instanceof Point)) p = new Point;
            if (!(p1 instanceof Point)) p1 = new Point;
            if (!i) i = false;
            if (typeof i !== Types.CONSTANTS.BOOLEAN) i = false;
            this.point1 = p;
            this.point2 = p1;
            this.infinite = i;
            //this.setPoint1=function(newValue) {
            //  if(!(newValue instanceof Point)) return;
            //  if(newValue!==_point1) _point1.assign(newValue);
            //};
            //this.setPoint2=function(newValue) {
            //  if(!(newValue instanceof Point)) return;
            //  if(newValue!==_point2) _point2.assign(newValue);
            //};
            //this.setInfinite=function(newValue) {
            //  if(typeof newValue!==Types.CONSTANTS.BOOLEAN) return;
            //  if(newValue!==this.infinite) _i=newValue;
            //};
        },
        //#region Methods
        intersect: function (l) // Pas bon
        {
            var v = Core.clone(l), t1, t2;
            if (!(l instanceof Line)) return;
            var cross = this.vector.cross(l.vector);
            if (Core.abs(cross) <= 10e-6) return false;
            v.subtract(this.point);
            t1 = v.cross(this.vector) / cross;
            t2 = v.cross(l.vector) / cross;
            return (this.infinite || 0 <= t1 && t1 <= 1) && (l.infinite || 0 <= t2 && t2 <= 1) ? this.point.add(this.vector.multiply(t1)) : null;
        },
        side: function (p)
        {
            if (!(p instanceof Point)) return;
            var v1 = Core.clone(this.vector),
            v2 = p.subtract(this.point),
            ccw = v2.cross(v1);
            if (ccw === 0)
            {
                ccw = v2.dot(v1);
                if (ccw > 0)
                {
                    v2.subtract(v1);
                    ccw = v2.dot(v1);
                    if (ccw < 0) ccw = 0;
                }
            }
            return ccw < 0 ? -1 : ccw > 0 ? 1 : 0;
        },
        assign: function (source)
        {
            if (!(source instanceof line)) return;
            this.point1.assign(source.point1);
            this.point2.assign(source.point2);
        },
        destroy: function ()
        {
            this.point1.destroy();
            this.point1 = null;
            this.point2.destroy();
            this.point2 = null;
            this.infinite = null;
        }
        //#endregion
    });
    //#endregion
    return {
        normalizeAngle: normalizeAngle,
        createRotationMatrix: createRotationMatrix,
        vectorLine: vectorLine,
        Point: Point,
        Rect: Rect,
        Vector: Vector,
        Matrix: Matrix,
        Line: Line
    };
});
//#region Imports
import { BaseClass } from "/scripts/core/baseclass.js";
import { Tools } from "/scripts/core/tools.js";
import { Convert } from "/scripts/core/convert.js";
//#endregion
class Geometry {
    static normalizeAngle(a) {
        const CONSTANTS = Types.CONSTANTS;
        if (typeof a !== CONSTANTS.NUMBER) {
            a = 0;
        }
        a = a * 1;
        let result = a - (a * CONSTANTS.INV360 | 0) * 360;
        if (result < -180) {
            result = result + 360;
        }
        return;
    }
    static createRotationMatrix(a) {
        const CONSTANTS = Types.CONSTANTS;
        if (typeof a !== CONSTANTS.NUMBER) {
            a = 0;
        }
        a = a * 1;
        let x = Math.sinCos(a);
        let cosine = x.cos;
        let sine = x.sin;

        const result = CONSTANTS.ZEROMATRIX.clone();
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
        return result;
    }
    static vectorLine(p, p1) {
        if (p instanceof Core.classes.Point && p1 instanceof Core.classes.Point) {
            return p1.subtract(p);
        }
    }
}
//#region Point
const Point = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Point extends BaseClass {
        constructor(x, y) {
            const CONSTANTS = Types.CONSTANTS;
            super();
            if (typeof x !== CONSTANTS.NUMBER) {
                x = 0;
            }
            if (typeof y !== CONSTANTS.NUMBER) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;

            const priv = internal(this);
            priv.x = x;
            priv.y = y;
        }
        //#region Setters
        get x() {
            return internal(this).x;
        }
        set x(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.x = newValue;
            }
        }
        get y() {
            return internal(this).y;
        }
        set y(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.y = newValue;
            }
        }
        get isEmpty() {
            return internal(this).x + internal(this).y === 0;
        }
        get length() {
            const priv = internal(this);
            const x = priv.x;
            const y = priv.y;
            return Math.sqrt(x * x + y * y);
        }
        get properties() {
            const props = Tools.getPropertiesFromObject(this);
            return props;
        }
        get toArray() {
            const priv = internal(this);
            const a = [];
            a.push(priv.x);
            a.push(priv.y);
            return a;
        }
        get toSimpleObject() {
            const priv = internal(this);
            const a = {
                x: priv.x,
                y: priv.y
            };
            return a;
        }
        get clone() {
            const p = new Core.classes.Point;
            p.assign(this);
            return p;
        }
        setValues(x, y) {
            const CONSTANTS = Types.CONSTANTS;
            const priv = internal(this);
            if (typeof x !== CONSTANTS.NUMBER) {
                x = 0;
            }
            if (typeof y !== CONSTANTS.NUMBER) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;
            priv.x = x;
            priv.y = y;
        }
        //#endregion
        //#region Methods
        min(p) {
            if (p instanceof Core.classes.Point) {
                if (p.y < this.y || p.y === this.y && p.x < this.x) {
                    return p;
                } else {
                    return this;
                }
            }
        }
        scale(x, y) {
            const CONSTANTS = Types.CONSTANTS;
            if (typeof x !== CONSTANTS.NUMBER) {
                x = 0;
            }
            if (typeof y !== CONSTANTS.NUMBER) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;
            this.x *= x;
            this.y *= y;
            return this;
        }
        inRect(r) {
            if (r instanceof Core.classes.Rect) {
                return this.x >= r.left && this.x <= r.right && this.y >= r.top && this.y <= r.bottom;
            }
            return false;
        }
        rotate(a, c) {
            if (!(c instanceof Core.classes.Point)) {
                c = new Core.classes.Point(this.x, this.y);
            }
            if (typeof a !== Types.CONSTANTS.NUMBER) {
                a = 0;
            }
            a = a * 1;
            a = Convert.deg2Rad(a);
            const dx = this.x - c.x;
            const dy = this.y - c.y;
            // calculate angle and distance
            const a1 = Math.atan2(dy, dx);
            const dist = Math.sqrt(dx * dx + dy * dy);
            // calculate new angle
            const a2 = a1 + a;
            // calculate new coordinates
            this.x = Math.cos(a2) * dist + c.x;
            this.y = Math.sin(a2) * dist + c.y;
            return this;
        }
        multiply(v) {
            if (v) {
                if (v instanceof Core.classes.Point) {
                    this.x *= v.x;
                    this.y *= v.y;
                }
                else {
                    if (typeof v !== Types.CONSTANTS.NUMBER) {
                        v = 0;
                    }
                    v = v | 1;
                    this.x *= v;
                    this.y *= v;
                }
            }
            return this;
        }
        divide(v) {
            if (v) {
                if (v instanceof Core.classes.Point) {
                    this.x /= v.x;
                    this.y /= v.y;
                } else {
                    if (typeof v !== Types.CONSTANTS.NUMBER) {
                        v = 0;
                    }
                    v = v | 1;
                    this.x /= v;
                    this.y /= v;
                }
            }
            return this;
        }
        subtract(v) {
            if (v) {
                if (v instanceof Core.classes.Point) {
                    this.x -= v.x;
                    this.y -= v.y;
                } else {
                    if (typeof v !== Types.CONSTANTS.NUMBER) {
                        v = 0;
                    }
                    v = v | 0;
                    this.x -= v;
                    this.y -= v;
                }
            }
            return this;
        }
        add(v) {
            if (v) {
                if (v instanceof Core.classes.Point) {
                    this.x += v.x;
                    this.y += v.y;
                } else {
                    if (typeof v !== Types.CONSTANTS.NUMBER) {
                        v = 0;
                    }
                    v = v | 0;
                    this.x += v;
                    this.y += v;
                }
            }
            return this;
        }
        distance(p) {
            if (p instanceof Core.classes.Point) {
                const dx = p.x - this.x;
                const dy = p.y - this.y;
                return Math.sqrt(dx * dx + dy * dy);
            }
            return 0;
        }
        directedAngle(p) {
            if (p instanceof Core.classes.Point) {
                return Math.atan2(this.cross(p), this.dot(p)) * 180 / Math.PI;
            }
            return 0;
        }
        cross(p) {
            if (p instanceof Core.classes.Point) {
                return this.x * p.y - this.y * p.x;
            }
            return 0;
        }
        dot(p) {
            if (this instanceof Core.classes.Point && p instanceof Core.classes.Point) {
                return this.x * p.x + this.y * p.y;
            }
            return 0;
        }
        assign(source) {
            if (source instanceof Core.classes.Point) {
                this.x = source.x;
                this.y = source.y;
            }
        }
        inPolygon(pts) {
            if (Array.isArray(pts) && pts.length >= 3) {
                let c = 0;
                const j = pts.length - 1;
                let j1 = j;
                for (let i = 0; i <= j; i++) {
                    if ((pts[i].y <= this.y && this.y < pts[j1].y ||
                        pts[j1].y <= this.y && this.y < pts[i].y) &&
                        this.x < (pts[j1].x - pts[i].x) * (this.y - pts[i].y) / (pts[j1].y - pts[i].y) + pts[i].x) {
                        if (c === 0) {
                            c = 1;
                        } else {
                            c = 0;
                        }
                    }
                    j1 = i;
                }
                let inside = false;
                if (c !== 0) {
                    inside = true;
                }
                return inside;
            }
            return false;
        }
        inEllipse(r) {
            const x0 = (r.left + r.right) * 0.5;
            const y0 = (r.top + r.bottom) * 0.5;
            const a = (r.right - r.left) * 0.5;
            const b = (r.bottom - r.top) * 0.5;
            if (Math.sqr((this.x - x0) / a) + Math.sqr((this.y - y0) / b) <= 1.0) {
                return true;
            }
            return false;
        }
        onLine() { }
        onPolyline() { }
        onBezier() { }
        onArc() { }
        equals(p) {
            return this.x === p.x && this.y === p.y;
        }
        offset(x, y) {
            const NUMBER = Types.CONSTANTS.NUMBER;
            if (typeof x === NUMBER && typeof y === NUMBER) {
                this.x += x;
                this.y += y;
            }
        }
        //#endregion
    }
    return Point;
})();
Object.defineProperties(Point, {
    "x": {
        enumerable: true
    },
    "y": {
        enumerable: true
    }
});
//#endregion
//#region Rect
const Rect = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Rect extends BaseClass {
        constructor(l, t, r, b) {
            const CONSTANTS = Types.CONSTANTS;
            super();
            if (typeof l !== CONSTANTS.NUMBER) {
                l = 0;
            }
            if (typeof t !== CONSTANTS.NUMBER) {
                t = 0;
            }
            if (typeof r !== CONSTANTS.NUMBER) {
                r = 0;
            }
            if (typeof b !== CONSTANTS.NUMBER) {
                b = 0;
            }
            l = l * 1;
            t = t * 1;
            r = r * 1;
            b = b * 1;
            const priv = internal(this);
            priv.left = l;
            priv.top = t;
            priv.right = r;
            priv.bottom = b;
        }
        //#region Setters
        get left() {
            return internal(this).left;
        }
        set left(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.left = newValue;
            }
        }
        get top() {
            return internal(this).top;
        }
        set top(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.top = newValue;
            }
        }
        get right() {
            return internal(this).right;
        }
        set right(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.right = newValue;
            }
        }
        get bottom() {
            return internal(this).bottom;
        }
        set bottom(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.bottom = newValue;
            }
        }
        get isEmpty() {
            const priv = internal(this);
            return priv.width <= 0 || priv.height <= 0;
        }
        get width() {
            const priv = internal(this);
            const w = priv.right - priv.left;
            return w < 0 ? 0 : w;
        }
        get height() {
            const priv = internal(this);
            const h = priv.bottom - priv.top;
            return h < 0 ? 0 : h;
        }
        get topLeft() {
            const priv = internal(this);
            return new Core.classes.Point(priv.left, priv.top);
        }
        get topRight() {
            const priv = internal(this);
            return new Core.classes.Point(priv.width - Math.abs(priv.left), priv.top);
        }
        get bottomLeft() {
            const priv = internal(this);
            return new Core.classes.Point(priv.left, priv.height - Math.abs(priv.top));
        }
        get bottomRight() {
            const priv = internal(this);
            return new Core.classes.Point(priv.width - Math.abs(priv.left), priv.height - Math.abs(priv.top));
        }
        get clone() {
            const rect = new Core.classes.Rect;
            rect.assign(this);
            return rect;
        }
        setTopLeft(newValue) {
            if (newValue instanceof Core.classes.Point) {
                this.left = newValue.x;
                this.top = newValue.y;
            }
        }
        setTopRight(newValue) {
            if (newValue instanceof Core.classes.Point) {
                this.top = newValue.y;
                this.right = newValue.x;
            }
        }
        setBottomLeft(newValue) {
            if (newValue instanceof Core.classes.Point) {
                this.bottom = newValue.y;
                this.left = newValue.x;
            }
        }
        setBottomRight(newValue) {
            if (newValue instanceof Core.classes.Point) {
                this.bottom = newValue.y;
                this.right = newValue.x;
            }
        }
        setValues(l, t, r, b) {
            const CONSTANTS = Types.CONSTANTS;
            if (typeof l !== CONSTANTS.NUMBER) {
                l = 0;
            }
            if (typeof t !== CONSTANTS.NUMBER) {
                t = 0;
            }
            if (typeof r !== CONSTANTS.NUMBER) {
                r = 0;
            }
            if (typeof b !== CONSTANTS.NUMBER) {
                b = 0;
            }
            l = l * 1;
            t = t * 1;
            r = r * 1;
            b = b * 1;
            this.left = l;
            this.top = t;
            this.right = r;
            this.bottom = b;
        }
        //#endregion
        //#region Methods
        normalize(a) {
            if (Array.isArray(a)) {
                //a.add(this);
                const result = new Core.classes.Rect(0xF000, 0xF000, -0xF000, -0xF000);
                a.forEach(x => {
                    if ((x instanceof Core.classes.Point)) {
                        if (x.x < result.left) {
                            result.left = x.x;
                        }
                        if (x.y < result.top) {
                            result.top = x.y;
                        }
                        if (x.x > result.right) {
                            result.right = x.x;
                        }
                        if (x.y > result.bottom) {
                            result.bottom = x.y;
                        }
                    }
                });
                return result;
            }
            return null;
        }
        normalize2(a) {
            if (a instanceof Core.classes.Rect) {
                this.normalize([new Core.classes.Point(a.left, a.top), new Core.classes.Point(a.right, a.top), new Core.classes.Point(a.right, a.bottom), new Core.classes.Point(a.left, a.bottom)]);
            }
            return this;
        }
        reduce(x, y) {
            const CONSTANTS = Types.CONSTANTS;
            if (typeof x !== CONSTANTS.NUMBER) {
                x = 0;
            }
            if (typeof y !== CONSTANTS.NUMBER) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;
            this.right -= x;
            this.bottom -= y;
            return this;
        }
        extend(x, y) {
            const CONSTANTS = Types.CONSTANTS;
            if (typeof x !== CONSTANTS.NUMBER) {
                x = 0;
            }
            if (typeof y !== CONSTANTS.NUMBER) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;
            this.right += x;
            this.bottom += y;
            return this;
        }
        center(b) {
            if (b instanceof Core.classes.Rect) {
                this.offset(-this.left, -this.top);
                this.offset(Math.round((b.width - this.width) / 2), Math.round((b.height - this.height) / 2));
                this.offset(b.left, b.top);
            }
            return this;
        }
        fit(b) {
            if (b instanceof Core.classes.Rect) {
                let _ratio = 1;
                if (b.isEmpty) {
                    return { rect: this, ratio: _ratio };
                }
                if (this.width / b.width > this.height / b.height) {
                    _ratio = this.width / b.width;
                } else {
                    _ratio = this.height / b.height;
                }
                if (_ratio < 1) {
                    this.right = this.width;
                    this.bottom = this.height;
                    this.left = 0;
                    this.top = 0;
                } else {
                    this.right = Math.round(this.width / _ratio);
                    this.bottom = Math.round(this.height / _ratio);
                    this.left = 0;
                    this.top = 0;
                }
                this.center(b);
                return { rect: this, ratio: _ratio };
            }
            return 0;
        }
        offset(x, y) {
            const CONSTANTS = Types.CONSTANTS;
            if (typeof x !== CONSTANTS.NUMBER) {
                x = 0;
            }
            if (typeof y !== CONSTANTS.NUMBER) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;
            this.left += x;
            this.right += x;
            this.top += y;
            this.bottom += y;
            return this;
        }
        multiply(x, y) {
            const CONSTANTS = Types.CONSTANTS;
            if (typeof x !== CONSTANTS.NUMBER) {
                x = 0;
            }
            if (typeof y !== CONSTANTS.NUMBER) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;
            this.left *= x;
            this.right *= x;
            this.top *= y;
            this.bottom *= y;
            return this;
        }
        inflate(x, y) {
            const CONSTANTS = Types.CONSTANTS;
            if (typeof x !== CONSTANTS.NUMBER) {
                x = 0;
            }
            if (typeof y !== CONSTANTS.NUMBER) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;
            this.left -= x;
            this.right += x;
            this.top -= y;
            this.bottom += y;
            return this;
        }
        intersect(r) {
            if (r instanceof Core.classes.Rect) {
                return this.left <= r.right && this.right >= r.left && this.top <= r.bottom && this.bottom >= r.top;
            }
            return false;
        }
        intersectRectDS(r) {
            const result = r.left < this.right && r.right > this.left && r.top < this.bottom && r.bottom > this.top;

            if (result) {
                this.left = Math.max(this.left, r.left);
                this.top = Math.max(this.top, r.top);
                this.right = Math.min(this.right, r.right);
                this.bottom = Math.min(this.bottom, r.bottom);
            } else {
                this.left = 0;
                this.top = 0;
                this.right = 0;
                this.bottom = 0;
            }
        }
        union(r) {
            if (r instanceof Core.classes.Rect) {
                const x1 = Math.min(this.left, r.left);
                const x2 = Math.max(this.left + this.width, r.left + r.width());
                const y1 = Math.min(this.top, r.top);
                const y2 = Math.max(this.top + this.height, r.top + r.height());
                this.left = x1;
                this.top = y1;
                this.right = x2;
                this.bottom = y2;
            }
            return this;
        }
        includedRect(r) {
            if (r instanceof Core.classes.Rect) {
                if (this.left < r.left) {
                    this.left = r.left;
                }
                if (this.top < r.top) {
                    this.top = r.top;
                }
                if (this.right > r.right) {
                    this.right = r.right;
                }
                if (this.bottom > r.bottom) {
                    this.bottom = r.bottom;
                }
            }
            return this;
        }
        equals(r) {
            if (r instanceof Core.classes.Rect) {
                return r.left === this.left && r.top === this.top && r.right === this.right && r.bottom === this.bottom;
            }
            return false;
        }
        rotate(angle) {
            //let m=Matrix.create(),tlp=Point.create(this.left,this.top),brp=Point.create(this.right,this.bottom);
            //m.assign(_const.IDENTITYMATRIX);
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
            if (angle !== 0) {
                const w = this.width;
                const h = this.height;
                const x = this.left;
                const y = this.top;
                this.left = x + w / 2 * Math.cos(Convert.deg2Rad(angle)) - h / 2 * Math.sin(Convert.deg2Rad(angle));
                this.top = y + h / 2 * Math.cos(Convert.deg2Rad(angle)) + w / 2 * Math.sin(Convert.deg2Rad(angle));
                this.right = this.left + w;
                this.bottom = this.top + h;
                //this.right=x-(w/2)*$j.cos(_conv.deg2Rad(angle))-(h/2)*$j.sin(_conv.deg2Rad(angle));
                //this.bottom=y-(h/2)*$j.cos(_conv.deg2Rad(angle))+(w/2)*$j.sin(_conv.deg2Rad(angle));
            }
        }
        assign(source) {
            if (source instanceof Core.classes.Rect) {
                this.left = source.left;
                this.top = source.top;
                this.right = source.right;
                this.bottom = source.bottom;
            }
        }
        empty() {
            this.left = this.top = this.right = this.bottom = 0;
        }
        //#endregion
    }
    return Rect;
})();
Object.defineProperties(Rect, {
    "left": {
        enumerable: true
    },
    "top": {
        enumerable: true
    },
    "right": {
        enumerable: true
    },
    "bottom": {
        enumerable: true
    }
});
//#endregion
//#region Vector
const Vector = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Vector extends BaseClass {
        constructor(x, y, z) {
            const CONSTANTS = Types.CONSTANTS;
            super();
            if (typeof x !== CONSTANTS.NUMBER) {
                x = 0;
            }
            if (typeof y !== CONSTANTS.NUMBER) {
                y = 0;
            }
            if (typeof z !== CONSTANTS.NUMBER) {
                z = 0;
            }
            x = x * 1;
            y = y * 1;
            z = z * 1;

            const priv = internal(this);
            priv.x = x;
            priv.y = y;
            priv.z = z;
        }
        //#region Setters
        setValues(x, y, z) {
            const CONSTANTS = Types.CONSTANTS;
            if (typeof x !== CONSTANTS.NUMBER) {
                x = 0;
            }
            if (typeof y !== CONSTANTS.NUMBER) {
                y = 0;
            }
            if (typeof z !== CONSTANTS.NUMBER) {
                z = 0;
            }
            x = x * 1;
            y = y * 1;
            z = z * 1;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        get x() {
            return internal(this).x;
        }
        set x(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.x !== newValue) {
                    priv.x = newValue;
                }
            }
        }
        get y() {
            return internal(this).y;
        }
        set y(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.y !== newValue) {
                    priv.y = newValue;
                }
            }
        }
        get z() {
            return internal(this).z;
        }
        set z(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.z !== newValue) {
                    priv.z = newValue;
                }
            }
        }
        get point() {
            const priv = internal(this);
            return new Core.classes.Point(priv.x, priv.y);
        }
        get length() {
            return Math.sqrt(this.dot(this));
        }
        get clone() {
            const v = new Core.classes.Vector;
            v.assign(this);
            return v;
        }
        get norm() {
            const priv = internal(this);
            const x = priv.x;
            const y = priv.y;
            return x * x + y * y;
        }
        get normalize() {
            const priv = internal(this);
            const invLen = Math.RSqrt(Math.abs(this.norm()));
            priv.x *= invLen;
            priv.y *= invLen;
            priv.z = 0.0;
            return this;
        }
        //#endregion
        //#region Methods
        transform(m) {
            if (m instanceof Core.classes.Matrix) {
                const x = this.x, y = this.y, z = this.z;
                this.x = x * m.m11 + y * m.m21 + z * m.m31;
                this.y = x * m.m12 + y * m.m22 + z * m.m32;
                this.z = 1.0;
            }
            return this;
        }
        add(v, v1) {
            const classes = Core.classes;
            if (v instanceof classes.Vector && v1 instanceof classes.Vector) {
                const result = new classes.Vector;
                result.x = v.x + v1.x;
                result.y = v.y + v1.y;
                result.z = 1.0;
                return result;
            }
        }
        subtract(v) {
            if (v instanceof Core.classes.Vector) {
                this.x -= v.x;
                this.y -= v.y;
                this.z = 1;
            }
            return this;
        }
        scale(f) {
            if (typeof f !== Types.CONSTANTS.NUMBER) {
                f = 0;
            }
            this.x *= f;
            this.y *= f;
            this.z = 1;
            return this;
        }
        dot(v) {
            if (v instanceof Core.classes.Vector) {
                return this.x * v.x + this.y * v.y + this.z * v.z;
            }
        }
        angleCosine(v) {
            const len1 = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            const len2 = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
            const dot = this.x * v.x + this.y * v.y + this.z * v.z;
            let result = len1 * len2;
            if (Math.abs(result) > 1e-40) {
                result = dot / result;
            } else {
                result = 1;
            }
            return result;
        }
        crossProductZ(v) {
            if (v instanceof Core.classes.Vector) {
                return this.x * v.y - this.y * v.x;
            }
            return -1;
        }
        combine2(v, f, f1) {
            if (v instanceof Core.classes.Vector) {
                f = f * 1;
                f1 = f1 * 1;
                const x = this.x;
                const y = this.y;
                this.x = f * x + f1 * v.x;
                this.y = f * y + f1 * v.y;
                this.z = 1;
            }
            return this;
        }
        reflect(v) {
            if (v instanceof Core.classes.Vector) {
                return this.combine2(v, 1, -2 * this.dot(v));
            }
            return this;
        }
        angle(v) {
            if (v instanceof Core.classes.Vector) {
                if (this.crossProductZ(v) < 0) {
                    return Convert.rad2Deg(Math.acos(this.angleCosine(v)));
                } else {
                    return -Convert.rad2Deg(Math.acos(this.angleCosine(v)));
                }
            }
        }
        assign(source) {
            if (source instanceof Core.classes.Vector) {
                this.x = source.x;
                this.y = source.y;
                this.z = source.z;
            }
        }
        equals(vector) {
            return this.x === vector.x && this.y === vector.y && this.z === vector.z;
        }
        //#endregion
    }
    return Vector;
})();
Object.defineProperties(Vector.prototype, {
    "x": {
        enumerable: true
    },
    "y": {
        enumerable: true
    },
    "z": {
        enumerable: true
    }
});
//#endregion
//#region Matrix
const Matrix = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Matrix extends BaseClass {
        constructor(v, v1, v2) {
            super();
            if (!(v instanceof Core.classes.Vector)) {
                v = new Core.classes.Vector;
            }
            if (!(v1 instanceof Core.classes.Vector)) {
                v1 = new Core.classes.Vector;
            }
            if (!(v2 instanceof Core.classes.Vector)) {
                v2 = new Core.classes.Vector;
            }

            const priv = internal(this);
            priv.m11 = v.x;
            priv.m12 = v.y;
            priv.m13 = v.z;
            priv.m21 = v1.x;
            priv.m22 = v1.y;
            priv.m23 = v1.z;
            priv.m31 = v2.x;
            priv.m32 = v2.y;
            priv.m33 = v2.z;
        }
        //#region Setters
        get m11() {
            return _m11;
        }
        set m11(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.m11 = newValue;
            }
        }
        get m12() {
            return internal(this).m12;
        }
        set m12(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.m12 = newValue;
            }
        }
        get m13() {
            return internal(this).m13;
        }
        set m13(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.m13 = newValue;
            }
        }
        get m21() {
            return internal(this).m21;
        }
        set m21(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.m21 = newValue;
            }
        }
        get m22() {
            return internal(this).m22;
        }
        set m22(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.m22 = newValue;
            }
        }
        get m23() {
            return internal(this).m23;
        }
        set m23(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.m23 = newValue;
            }
        }
        get m31() {
            return internal(this).m31;
        }
        set m31(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.m31 = newValue;
            }
        }
        get m32() {
            return internal(this).m32;
        }
        set m32(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.m32 = newValue;
            }
        }
        get m33() {
            return internal(this).m33;
        }
        set m33(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                priv.m33 = newValue;
            }
        }
        get clone() {
            const mat = new Core.classes.Matrix;
            mat.assign(this);
            return mat;
        }
        get determinant() {
            const priv = internal(this);
            return priv.m11 * (priv.m22 * priv.m33 - priv.m32 * priv.m23) -
                priv.m12 * (priv.m21 * priv.m33 - priv.m31 * priv.m23) +
                priv.m13 * (priv.m21 * priv.m32 - priv.m31 * priv.m22);
        }
        get adjoint() {
            const priv = internal(this);
            const a1 = priv.m11;
            const a2 = priv.m12;
            const a3 = priv.m13;
            const b1 = priv.m21;
            const b2 = priv.m22;
            const b3 = priv.m23;
            const c1 = priv.m31;
            const c2 = priv.m32;
            const c3 = priv.m33;
            priv.m11 = b2 * c3 - c2 * b3;
            priv.m12 = -a2 * c3 - c2 * a3;
            priv.m13 = a2 * b3 - b2 * a3;
            priv.m21 = -b1 * c3 - c1 * b3;
            priv.m22 = a1 * c3 - c1 * a3;
            priv.m23 = -a1 * b3 - b1 * a3;
            priv.m31 = b1 * c2 - c1 * b2;
            priv.m32 = -a1 * c2 - c1 * a2;
            priv.m33 = a1 * b2 - b1 * a2;
            return this;
        }
        get invert() {
            const priv = internal(this);
            const m22 = priv.m22;
            const m11 = priv.m11;
            const m12 = priv.m12;
            const m21 = priv.m21;
            const m32 = priv.m32;
            const m31 = priv.m31;
            const d = 1 / (m11 * m22 - m12 * m21);
            const m0 = m22 * d;
            const m1 = -m12 * d;
            const m2 = -m21 * d;
            const m3 = m11 * d;
            const m4 = d * (m21 * m32 - m22 * m31);
            const m5 = d * (m12 * m31 - m11 * m32);
            priv.m11 = m0;
            priv.m12 = m1;
            priv.m21 = m2;
            priv.m22 = m3;
            priv.m31 = m4;
            priv.m32 = m5;
        }
        get toArray() {
            const priv = internal(this);
            const result = [];
            result.push(priv.m11);
            result.push(priv.m12);
            result.push(priv.m13);
            result.push(priv.m21);
            result.push(priv.m22);
            result.push(priv.m23);
            result.push(priv.m31);
            result.push(priv.m32);
            result.push(priv.m33);
            return result;
        }
        setValues(mat) {
            mat.m11 = +mat.m11;
            mat.m12 = +mat.m12;
            mat.m13 = +mat.m13;
            mat.m21 = +mat.m21;
            mat.m22 = +mat.m22;
            mat.m23 = +mat.m23;
            mat.m31 = +mat.m31;
            mat.m32 = +mat.m32;
            mat.m33 = +mat.m33;
            if (isNaN(mat.m11)) {
                mat.m11 = 0;
            }
            if (isNaN(mat.m12)) {
                mat.m12 = 0;
            }
            if (isNaN(mat.m13)) {
                mat.m13 = 0;
            }
            if (isNaN(mat.m21)) {
                mat.m21 = 0;
            }
            if (isNaN(mat.m22)) {
                mat.m22 = 0;
            }
            if (isNaN(mat.m23)) {
                mat.m23 = 0;
            }
            if (isNaN(mat.m31)) {
                mat.m31 = 0;
            }
            if (isNaN(mat.m32)) {
                mat.m32 = 0;
            }
            if (isNaN(mat.m33)) {
                mat.m33 = 0;
            }
            this.m11 = mat.m11;
            this.m12 = mat.m12;
            this.m13 = mat.m13;
            this.m21 = mat.m21;
            this.m22 = mat.m22;
            this.m23 = mat.m23;
            this.m31 = mat.m31;
            this.m32 = mat.m32;
            this.m33 = mat.m33;
        }
        //#endregion
        //#region Methods
        multiply(m1) {
            if (m1 instanceof Core.classes.Matrix) {
                const m = Types.CONSTANTS.ZEROMATRIX.clone();
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
            }
            return this;
        }
        assign(source) {
            if (source instanceof Core.classes.Matrix) {
                this.m11 = source.m11;
                this.m12 = source.m12;
                this.m13 = source.m13;
                this.m21 = source.m21;
                this.m22 = source.m22;
                this.m23 = source.m23;
                this.m31 = source.m31;
                this.m32 = source.m32;
                this.m33 = source.m33;
            }
        }
        rotate(a) {
            const A = Convert.deg2Rad(a), x = Math.sinCos(A);
            const m = Types.CONSTANTS.ZEROMATRIX.clone();
            m.assign(this);
            this.m11 = m.m11 * x.cos + m.m21 * x.sin;
            this.m12 = m.m12 * x.cos + m.m22 * x.sin;
            this.m21 = m.m11 * -x.sin + m.m21 * x.cos;
            this.m22 = m.m12 * -x.sin + m.m22 * x.cos;
        }
        translate(x, y) {
            const m = Types.CONSTANTS.ZEROMATRIX.clone();
            m.assign(this);
            this.m31 += m.m11 * x + m.m21 * y;
            this.m32 += m.m12 * x + m.m22 * y;
        }
        transformPoint(p) { // à voir
            const x = p.x;
            const y = p.y;
            p.x = x * this.m11 + y * this.m21 + this.m31;
            p.y = x * this.m12 + y * this.m22 + this.m32;
            //return _geo.point(p.x,p.y);
        }
        scale(x, y) {
            this.m11 *= x;
            this.m12 *= x;
            this.m21 *= y;
            this.m22 *= y;
        }
        equals(m) {
            return this.m11 === m.m11 && this.m12 === m.m12 &&
                this.m13 === m.m13 && this.m21 === m.m21 &&
                this.m22 === m.m22 && this.m23 === m.m23 &&
                this.m31 === m.m31 && this.m32 === m.m32 &&
                this.m33 === m.m33;
        }
        toString(sep, withBracket) {
            let result = String.EMPTY;
            if (!sep) {
                sep = String.SPACE;
            }
            if (typeof withBracket !== Types.CONSTANTS.BOOLEAN && !withBracket) withBracket = false;
            result += withBracket ? "[" : String.SPACE;
            result += this.m11 + sep;
            result += this.m12 + sep;
            result += this.m13 + sep;
            result += this.m21 + sep;
            result += this.m22 + sep;
            result += this.m23 + sep;
            result += this.m31 + sep;
            result += this.m32 + sep;
            result += this.m33 + sep;
            result += withBracket ? "]" : String.SPACE;
            return result;
        }
        //#endregion
    }
    return Matrix;
})();
Object.defineProperties(Matrix, {
    "m11": {
        enumerable: true
    },
    "m12": {
        enumerable: true
    },
    "m13": {
        enumerable: true
    },
    "m21": {
        enumerable: true
    },
    "m22": {
        enumerable: true
    },
    "m23": {
        enumerable: true
    },
    "m31": {
        enumerable: true
    },
    "m32": {
        enumerable: true
    },
    "m33": {
        enumerable: true
    }
});
//#endregion
//#region Line
const Line = (function () {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Line extends BaseClass {
        constructor(p, p1, i) {
            super();
            if (!(p instanceof Core.classes.Point)) {
                p = new Core.classes.Point;
            }
            if (!(p1 instanceof Core.classes.Point)) {
                p1 = new Core.classes.Point;
            }
            if (!i) {
                i = false;
            }
            if (typeof i !== Types.CONSTANTS.BOOLEAN) {
                i = false;
            }
            const priv = internal(this);
            priv.point1 = p;
            priv.point2 = p1;
            priv.infinite = i;
        }
        get point1() {
            return internal(this).point1;
        }
        get point2() {
            return internal(this).point2;
        }
        get infinite() {
            return internal(this).infinite;
        }
        //#region Methods
        intersect(l) // Pas bon
        {
            const v = Math.clone(l);
            if (!(l instanceof Core.classes.Line)) {
                return null;
            }
            const cross = this.vector.cross(l.vector);
            if (Math.abs(cross) <= 10e-6) {
                return false;
            }
            v.subtract(this.point);
            const t1 = v.cross(this.vector) / cross;
            const t2 = v.cross(l.vector) / cross;
            return (this.infinite || 0 <= t1 && t1 <= 1) && (l.infinite || 0 <= t2 && t2 <= 1) ? this.point.add(this.vector.multiply(t1)) : null;
        }
        side(p) // Pas bon
        {
            if (p instanceof Core.classes.Point) {
                const v1 = Math.clone(this.vector);
                const v2 = p.subtract(this.point);
                let ccw = v2.cross(v1);
                if (ccw === 0) {
                    ccw = v2.dot(v1);
                    if (ccw > 0) {
                        v2.subtract(v1);
                        ccw = v2.dot(v1);
                        if (ccw < 0) ccw = 0;
                    }
                }
                return ccw < 0 ? -1 : ccw > 0 ? 1 : 0;
            }
            return false;
        }
        assign(source) {
            if (source instanceof Core.classes.Line) {
                this.point1.assign(source.point1);
                this.point2.assign(source.point2);
            }
        }
        destroy() {
            this.point1.destroy();
            this.point2.destroy();
        }
        //#endregion
    }
    return Line;
})();
Object.defineProperties(Line, {
    "point1": {
        enumerable: true
    },
    "point2": {
        enumerable: true
    },
    "infinite": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Point, Rect, Vector, Matrix, Line);
export { Geometry, Point, Rect, Vector, Matrix, Line };
//#region Imports
import { BaseClass } from "/scripts/core/baseclass.js";
import { Tools } from "/scripts/core/tools.js";
import { Convert } from "/scripts/core/convert.js";
//#endregion
//#region Geometry
class Geometry {
    //#region Static
    static normalizeAngle(a) {
        //#region Variables déclaration
        const CONSTANTS = Types.CONSTANTS;
        //#endregion Variables déclaration
        if (Tools.isNumber(a)) {
            a = a * 1;
            let result = a - (a * CONSTANTS.INV360 | 0) * 360;
            if (result < -180) {
                result = result + 360;
            }
            return result;
        }
        return a;
    }
    static createRotationMatrix(a) {
        //#region Variables déclaration
        const CONSTANTS = Types.CONSTANTS;
        //#endregion Variables déclaration
        if (Tools.isNumber(a)) {
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
        return a;
    }
    static vectorLine(p, p1) {
        if (p instanceof Core.classes.Point && p1 instanceof Core.classes.Point) {
            return p1.subtract(p);
        }
        return p;
    }
    //#endregion Static
}
//#endregion Geometry
//#region Point
const Point = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Point
    class Point extends BaseClass {
        //#region constructor
        constructor(x, y) {
            super();
            if (!Tools.isNumber(x)) {
                x = 0;
            }
            if (!Tools.isNumber(y)) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;

            const priv = internal(this);
            priv.x = x;
            priv.y = y;
        }
        //#endregion constructor
        //#region Getter / Setters
        //#region x
        get x() {
            return internal(this).x;
        }
        set x(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.x = newValue;
            }
        }
        //#endregion x
        //#region y
        get y() {
            return internal(this).y;
        }
        set y(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.y = newValue;
            }
        }
        //#endregion y
        //#region isEmpty
        get isEmpty() {
            return internal(this).x + internal(this).y === 0;
        }
        //#endregion isEmpty
        //#region length
        get length() {
            //#region Variables déclaration
            const priv = internal(this);
            const x = priv.x;
            const y = priv.y;
            //#endregion Variables déclaration
            return Math.sqrt(x * x + y * y);
        }
        //#endregion length
        //#region properties
        get properties() {
            //#region Variables déclaration
            const props = Tools.getPropertiesFromObject(this);
            //#endregion Variables déclaration
            return props;
        }
        //#endregion properties
        //#region toArray
        get toArray() {
            //#region Variables déclaration
            const priv = internal(this);
            const a = [];
            //#endregion Variables déclaration
            a.push(priv.x);
            a.push(priv.y);
            return a;
        }
        //#endregion toArray
        //#region toSimpleObject
        get toSimpleObject() {
            //#region Variables déclaration
            const priv = internal(this);
            const a = {
                x: priv.x,
                y: priv.y
            };
            //#endregion Variables déclaration
            return a;
        }
        //#endregion toSimpleObject
        //#region clone
        get clone() {
            //#region Variables déclaration
            const p = new Core.classes.Point;
            //#endregion Variables déclaration
            p.assign(this);
            return p;
        }
        //#endregion clone
        //#endregion
        //#region Methods
        //#region setValues
        setValues(x, y) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!Tools.isNumber(x)) {
                x = 0;
            }
            if (!Tools.isNumber(y)) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;
            priv.x = x;
            priv.y = y;
        }
        //#endregion setValues
        //#region min
        min(p) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (p instanceof Core.classes.Point) {
                if (p.y < priv.y || p.y === priv.y && p.x < priv.x) {
                    return p;
                } else {
                    return this;
                }
            }
            return p;
        }
        //#endregion min
        //#region scale
        scale(x, y) {
            if (!Tools.isNumber(x)) {
                x = 0;
            }
            if (!Tools.isNumber(y)) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;
            this.x *= x;
            this.y *= y;
            return this;
        }
        //#endregion scale
        //#region inRect
        inRect(r) {
            if (r instanceof Core.classes.Rect) {
                return priv.x >= r.left && priv.x <= r.right && priv.y >= r.top && priv.y <= r.bottom;
            }
            return false;
        }
        //#endregion inRect
        //#region rotate
        rotate(a, c) {
            if (!(c instanceof Core.classes.Point)) {
                c = new Core.classes.Point(priv.x, priv.y);
            }
            if (!Tools.isNumber(a)) {
                a = 0;
            }
            a = a * 1;
            a = Convert.deg2Rad(a);
            const dx = priv.x - c.x;
            const dy = priv.y - c.y;
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
        //#endregion rotate
        //#region multiply
        multiply(v) {
            if (v) {
                if (v instanceof Core.classes.Point) {
                    this.x *= v.x;
                    this.y *= v.y;
                }
                else {
                    if (!Tools.isNumber(v)) {
                        v = 0;
                    }
                    v = v | 1;
                    this.x *= v;
                    this.y *= v;
                }
            }
            return this;
        }
        //#endregion multiply
        //#region divide
        divide(v) {
            if (v) {
                if (v instanceof Core.classes.Point) {
                    this.x /= v.x;
                    this.y /= v.y;
                } else {
                    if (!Tools.isNumber(v)) {
                        v = 0;
                    }
                    v = v | 1;
                    this.x /= v;
                    this.y /= v;
                }
            }
            return this;
        }
        //#endregion divide
        //#region subtract
        subtract(v) {
            if (v) {
                if (v instanceof Core.classes.Point) {
                    this.x -= v.x;
                    this.y -= v.y;
                } else {
                    if (!Tools.isNumber(v)) {
                        v = 0;
                    }
                    v = v | 0;
                    this.x -= v;
                    this.y -= v;
                }
            }
            return this;
        }
        //#endregion subtract
        //#region add
        add(v) {
            if (v) {
                if (v instanceof Core.classes.Point) {
                    this.x += v.x;
                    this.y += v.y;
                } else {
                    if (!Tools.isNumber(v)) {
                        v = 0;
                    }
                    v = v | 0;
                    this.x += v;
                    this.y += v;
                }
            }
            return this;
        }
        //#endregion add
        //#region distance
        distance(p) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (p instanceof Core.classes.Point) {
                const dx = p.x - priv.x;
                const dy = p.y - priv.y;
                return Math.sqrt(dx * dx + dy * dy);
            }
            return 0;
        }
        //#endregion distance
        //#region directedAngle
        directedAngle(p) {
            if (p instanceof Core.classes.Point) {
                return Math.atan2(this.cross(p), this.dot(p)) * 180 / Math.PI;
            }
            return 0;
        }
        //#endregion directedAngle
        //#region cross
        cross(p) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (p instanceof Core.classes.Point) {
                return priv.x * p.y - priv.y * p.x;
            }
            return 0;
        }
        //#endregion cross
        //#region dot
        dot(p) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (this instanceof Core.classes.Point && p instanceof Core.classes.Point) {
                return priv.x * p.x + priv.y * p.y;
            }
            return 0;
        }
        //#endregion dot
        //#region assign
        assign(source) {
            if (source instanceof Core.classes.Point) {
                this.x = source.x;
                this.y = source.y;
            }
        }
        //#endregion assign
        //#region inPolygon
        inPolygon(pts) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Array.isArray(pts) && pts.length >= 3) {
                let c = 0;
                const j = pts.length - 1;
                let j1 = j;
                for (let i = 0; i <= j; i++) {
                    if ((pts[i].y <= priv.y && priv.y < pts[j1].y ||
                        pts[j1].y <= priv.y && priv.y < pts[i].y) &&
                        priv.x < (pts[j1].x - pts[i].x) * (priv.y - pts[i].y) / (pts[j1].y - pts[i].y) + pts[i].x) {
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
        //#endregion inPolygon
        //#region inEllipse
        inEllipse(r) {
            //#region Variables déclaration
            const priv = internal(this);
            const x0 = (r.left + r.right) * 0.5;
            const y0 = (r.top + r.bottom) * 0.5;
            const a = (r.right - r.left) * 0.5;
            const b = (r.bottom - r.top) * 0.5;
            //#endregion Variables déclaration
            if (Math.sqr((priv.x - x0) / a) + Math.sqr((priv.y - y0) / b) <= 1.0) {
                return true;
            }
            return false;
        }
        //#endregion inEllipse
        //#region onLine
        onLine() { }
        //#endregion onLine
        //#region onPolyline
        onPolyline() { }
        //#endregion onPolyline
        //#region onBezier
        onBezier() { }
        //#endregion onBezier
        //#region onArc
        onArc() { }
        //#endregion onArc
        //#region equals
        equals(p) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.x === p.x && priv.y === p.y;
        }
        //#endregion equals
        //#region offset
        offset(x, y) {
            if (Tools.isNumber(x) && Tools.isNumber(y)) {
                this.x += x;
                this.y += y;
            }
        }
        //#endregion offset
        //#endregion
    }
    return Point;
    //#endregion Point
})();
//#region Point defineProperties
Object.defineProperties(Point, {
    "x": {
        enumerable: true
    },
    "y": {
        enumerable: true
    }
});
//#endregion Point defineProperties
//#endregion Point
//#region Rect
const Rect = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion
    //#region Rect
    class Rect extends BaseClass {
        //#region constructor
        constructor(l, t, r, b) {
            super();
            if (!Tools.isNumber(l)) {
                l = 0;
            }
            if (!Tools.isNumber(t)) {
                t = 0;
            }
            if (!Tools.isNumber(r)) {
                r = 0;
            }
            if (!Tools.isNumber(b)) {
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
        //#endregion
        //#region Getter / Setters
        //#region left
        get left() {
            return internal(this).left;
        }
        set left(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.left = newValue;
            }
        }
        //#endregion
        //#region top
        get top() {
            return internal(this).top;
        }
        set top(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.top = newValue;
            }
        }
        //#endregion
        //#region right
        get right() {
            return internal(this).right;
        }
        set right(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.right = newValue;
            }
        }
        //#endregion
        //#region bottom
        get bottom() {
            return internal(this).bottom;
        }
        set bottom(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.bottom = newValue;
            }
        }
        //#endregion
        //#region isEmpty
        get isEmpty() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.left === 0 && priv.top === 0 && priv.right === 0 && priv.bottom === 0;
        }
        //#endregion
        //#region width
        get width() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            const w = priv.right - priv.left;
            return w < 0 ? 0 : w;
        }
        //#endregion
        //#region height
        get height() {
            //#region Variables déclaration
            const priv = internal(this);
            const h = priv.bottom - priv.top;
            //#endregion Variables déclaration
            return h < 0 ? 0 : h;
        }
        //#endregion
        //#region topLeft
        get topLeft() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return new Core.classes.Point(priv.left, priv.top);
        }
        //#endregion
        //#region topRight
        get topRight() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return new Core.classes.Point(priv.width - Math.abs(priv.left), priv.top);
        }
        //#endregion topRight
        //#region bottomLeft
        get bottomLeft() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return new Core.classes.Point(priv.left, priv.height - Math.abs(priv.top));
        }
        //#endregion bottomLeft
        //#region bottomRight
        get bottomRight() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return new Core.classes.Point(priv.width - Math.abs(priv.left), priv.height - Math.abs(priv.top));
        }
        //#endregion bottomRight
        //#region clone
        get clone() {
            //#region Variables déclaration
            const rect = new Core.classes.Rect;
            //#endregion Variables déclaration
            rect.assign(this);
            return rect;
        }
        //#endregion clone
        //#endregion
        //#region Methods
        //#region setTopLeft
        setTopLeft(newValue) {
            if (newValue instanceof Core.classes.Point) {
                this.left = newValue.x;
                this.top = newValue.y;
            }
        }
        //#endregion setTopLeft
        //#region setTopRight
        setTopRight(newValue) {
            if (newValue instanceof Core.classes.Point) {
                this.top = newValue.y;
                this.right = newValue.x;
            }
        }
        //#endregion setTopRight
        //#region setBottomLeft
        setBottomLeft(newValue) {
            if (newValue instanceof Core.classes.Point) {
                this.bottom = newValue.y;
                this.left = newValue.x;
            }
        }
        //#endregion setBottomLeft
        //#region setBottomRight
        setBottomRight(newValue) {
            if (newValue instanceof Core.classes.Point) {
                this.bottom = newValue.y;
                this.right = newValue.x;
            }
        }
        //#endregion setBottomRight
        //#region setValues
        setValues(l, t, r, b) {
            if (!Tools.isNumber(l)) {
                l = 0;
            }
            if (!Tools.isNumber(t)) {
                t = 0;
            }
            if (!Tools.isNumber(r)) {
                r = 0;
            }
            if (!Tools.isNumber(b)) {
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
        //#endregion setValues
        //#region normalize
        normalize(a) {
            if (Array.isArray(a)) {
                //a.add(this);
                const result = new Core.classes.Rect(0xF000, 0xF000, -0xF000, -0xF000);
                a.forEach(x => {
                    if (x instanceof Core.classes.Point) {
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
        //#endregion normalize
        //#region normalize2
        normalize2(a) {
            if (a instanceof Core.classes.Rect) {
                this.normalize([new Core.classes.Point(a.left, a.top), new Core.classes.Point(a.right, a.top), new Core.classes.Point(a.right, a.bottom), new Core.classes.Point(a.left, a.bottom)]);
            }
            return this;
        }
        //#endregion normalize2
        //#region reduce
        reduce(x, y) {
            if (!Tools.isNumber(x)) {
                x = 0;
            }
            if (!Tools.isNumber(y)) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;
            this.right -= x;
            this.bottom -= y;
            return this;
        }
        //#endregion reduce
        //#region extend
        extend(x, y) {
            if (!Tools.isNumber(x)) {
                x = 0;
            }
            if (!Tools.isNumber(y)) {
                y = 0;
            }
            x = x * 1;
            y = y * 1;
            this.right += x;
            this.bottom += y;
            return this;
        }
        //#endregion extend
        //#region center
        center(b) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (b instanceof Core.classes.Rect) {
                this.offset(-priv.left, -priv.top);
                this.offset(Math.round((b.width - this.width) / 2), Math.round((b.height - this.height) / 2));
                this.offset(b.left, b.top);
            }
            return this;
        }
        //#endregion center
        //#region fit
        fit(b) {
            if (b instanceof Core.classes.Rect) {
                let ratio = 1;
                if (b.isEmpty) {
                    return { rect: this, ratio: ratio };
                }
                if (this.width / b.width > this.height / b.height) {
                    ratio = this.width / b.width;
                } else {
                    ratio = this.height / b.height;
                }
                if (ratio < 1) {
                    this.right = this.width;
                    this.bottom = this.height;
                    this.left = 0;
                    this.top = 0;
                } else {
                    this.right = Math.round(this.width / ratio);
                    this.bottom = Math.round(this.height / ratio);
                    this.left = 0;
                    this.top = 0;
                }
                this.center(b);
                return { rect: this, ratio: ratio };
            }
            return 0;
        }
        //#endregion fit
        //#region offset
        offset(x, y) {
            if (!Tools.isNumber(x)) {
                x = 0;
            }
            if (!Tools.isNumber(y)) {
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
        //#endregion offset
        //#region multiply
        multiply(x, y) {
            if (!Tools.isNumber(x)) {
                x = 0;
            }
            if (!Tools.isNumber(y)) {
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
        //#endregion multiply
        //#region inflate
        inflate(x, y) {
            if (!Tools.isNumber(x)) {
                x = 0;
            }
            if (!Tools.isNumber(y)) {
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
        //#endregion inflate
        //#region intersect
        intersect(r) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (r instanceof Core.classes.Rect) {
                return this.left <= r.right && priv.right >= r.left && priv.top <= r.bottom && priv.bottom >= r.top;
            }
            return false;
        }
        //#endregion intersect
        //#region intersectRectDS
        intersectRectDS(r) {
            //#region Variables déclaration
            const priv = internal(this);
            const result = r.left < priv.right && r.right > priv.left && r.top < priv.bottom && r.bottom > priv.top;
            //#endregion Variables déclaration
            if (result) {
                this.left = Math.max(priv.left, r.left);
                this.top = Math.max(priv.top, r.top);
                this.right = Math.min(priv.right, r.right);
                this.bottom = Math.min(priv.bottom, r.bottom);
            } else {
                this.left = 0;
                this.top = 0;
                this.right = 0;
                this.bottom = 0;
            }
        }
        //#endregion intersectRectDS
        //#region union
        union(r) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (r instanceof Core.classes.Rect) {
                const x1 = Math.min(priv.left, r.left);
                const x2 = Math.max(priv.left + this.width, r.left + r.width);
                const y1 = Math.min(priv.top, r.top);
                const y2 = Math.max(priv.top + this.height, r.top + r.height);
                this.left = x1;
                this.top = y1;
                this.right = x2;
                this.bottom = y2;
            }
            return this;
        }
        //#endregion union
        //#region includedRect
        includedRect(r) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (r instanceof Core.classes.Rect) {
                if (this.priv < r.left) {
                    this.left = r.left;
                }
                if (this.priv < r.top) {
                    this.top = r.top;
                }
                if (this.priv > r.right) {
                    this.right = r.right;
                }
                if (this.priv > r.bottom) {
                    this.bottom = r.bottom;
                }
            }
            return this;
        }
        //#endregion includedRect
        //#region equals
        equals(r) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (r instanceof Core.classes.Rect) {
                return r.left === priv.left && r.top === priv.top && r.right === priv.right && r.bottom === priv.bottom;
            }
            return false;
        }
        //#endregion equals
        //#region rotate
        rotate(angle) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (angle !== 0) {
                const w = priv.width;
                const h = priv.height;
                const x = priv.left;
                const y = priv.top;
                this.left = x + w / 2 * Math.cos(Convert.deg2Rad(angle)) - h / 2 * Math.sin(Convert.deg2Rad(angle));
                this.top = y + h / 2 * Math.cos(Convert.deg2Rad(angle)) + w / 2 * Math.sin(Convert.deg2Rad(angle));
                this.right = priv.left + w;
                this.bottom = priv.top + h;
            }
        }
        //#endregion rotate
        //#region assign
        assign(source) {
            if (source instanceof Core.classes.Rect) {
                this.left = source.left;
                this.top = source.top;
                this.right = source.right;
                this.bottom = source.bottom;
            }
        }
        //#endregion assign
        //#region empty
        empty() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.left = priv.top = priv.right = priv.bottom = 0;
        }
        //#endregion empty
        //#endregion
    }
    return Rect;
    //#endregion
})();
//#region Rect defineProperties
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
//#endregion Rect defineProperties
//#endregion Rect
//#region Vector
const Vector = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Vector
    class Vector extends BaseClass {
        //#region constructor
        constructor(x, y, z) {
            super();
            if (!Tools.isNumber(x)) {
                x = 0;
            }
            if (!Tools.isNumber(y)) {
                y = 0;
            }
            if (!Tools.isNumber(z)) {
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
        //#endregion
        //#region Getter / Setters
        //#region x
        get x() {
            return internal(this).x;
        }
        set x(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.x !== newValue) {
                    priv.x = newValue;
                }
            }
        }
        //#endregion x
        //#region y
        get y() {
            return internal(this).y;
        }
        set y(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.y !== newValue) {
                    priv.y = newValue;
                }
            }
        }
        //#endregion y
        //#region z
        get z() {
            return internal(this).z;
        }
        set z(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.z !== newValue) {
                    priv.z = newValue;
                }
            }
        }
        //#endregion z
        //#region point
        get point() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return new Core.classes.Point(priv.x, priv.y);
        }
        //#endregion point
        //#region length
        get length() {
            return Math.sqrt(this.dot(this));
        }
        //#endregion length
        //#region clone
        get clone() {
            //#region Variables déclaration
            const v = new Core.classes.Vector;
            //#endregion Variables déclaration
            v.assign(this);
            return v;
        }
        //#endregion clone
        //#region norm
        get norm() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            const x = priv.x;
            const y = priv.y;
            return x * x + y * y;
        }
        //#endregion norm
        //#region normalize
        get normalize() {
            //#region Variables déclaration
            const priv = internal(this);
            const invLen = Math.RSqrt(Math.abs(this.norm()));
            //#endregion Variables déclaration
            priv.x *= invLen;
            priv.y *= invLen;
            priv.z = 0.0;
            return this;
        }
        //#endregion normalize
        //#endregion
        //#region Methods
        //#region setValues
        setValues(x, y, z) {
            if (!Tools.isNumber(x)) {
                x = 0;
            }
            if (!Tools.isNumber(y)) {
                y = 0;
            }
            if (!Tools.isNumber(z)) {
                z = 0;
            }
            x = x * 1;
            y = y * 1;
            z = z * 1;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        //#endregion setValues
        //#region transform
        transform(m) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (m instanceof Core.classes.Matrix) {
                const x = priv.x, y = priv.y, z = priv.z;
                this.x = x * m.m11 + y * m.m21 + z * m.m31;
                this.y = x * m.m12 + y * m.m22 + z * m.m32;
                this.z = 1.0;
            }
            return this;
        }
        //#endregion transform
        //#region add
        add(v, v1) {
            //#region Variables déclaration
            const classes = Core.classes;
            //#endregion Variables déclaration
            if (v instanceof classes.Vector && v1 instanceof classes.Vector) {
                const result = new classes.Vector;
                result.x = v.x + v1.x;
                result.y = v.y + v1.y;
                result.z = 1.0;
                return result;
            }
            return v;
        }
        //#endregion add
        //#region subtract
        subtract(v) {
            if (v instanceof Core.classes.Vector) {
                this.x -= v.x;
                this.y -= v.y;
                this.z = 1;
            }
            return this;
        }
        //#endregion subtract
        //#region scale
        scale(f) {
            if (!Tools.isNumber(f)) {
                f = 0;
            }
            this.x *= f;
            this.y *= f;
            this.z = 1;
            return this;
        }
        //#endregion scale
        //#region dot
        dot(v) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (v instanceof Core.classes.Vector) {
                return priv.x * v.x + priv.y * v.y + priv.z * v.z;
            }
            return 0;
        }
        //#endregion dot
        //#region angleCosine
        angleCosine(v) {
            //#region Variables déclaration
            const priv = internal(this);
            const len1 = Math.sqrt(priv.x * priv.x + priv.y * priv.y + priv.z * priv.z);
            const len2 = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
            const dot = priv.x * v.x + priv.y * v.y + priv.z * v.z;
            let result = len1 * len2;
            //#endregion Variables déclaration
            if (Math.abs(result) > 1e-40) {
                result = dot / result;
            } else {
                result = 1;
            }
            return result;
        }
        //#endregion angleCosine
        //#region crossProductZ
        crossProductZ(v) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (v instanceof Core.classes.Vector) {
                return priv.x * v.y - priv.y * v.x;
            }
            return -1;
        }
        //#endregion crossProductZ
        //#region combine2
        combine2(v, f, f1) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (v instanceof Core.classes.Vector) {
                f = f * 1;
                f1 = f1 * 1;
                const x = priv.x;
                const y = priv.y;
                this.x = f * x + f1 * v.x;
                this.y = f * y + f1 * v.y;
                this.z = 1;
            }
            return this;
        }
        //#endregion combine2
        //#region reflect
        reflect(v) {
            if (v instanceof Core.classes.Vector) {
                return this.combine2(v, 1, -2 * this.dot(v));
            }
            return this;
        }
        //#endregion reflect
        //#region angle
        angle(v) {
            if (v instanceof Core.classes.Vector) {
                if (this.crossProductZ(v) < 0) {
                    return Convert.rad2Deg(Math.acos(this.angleCosine(v)));
                } else {
                    return -Convert.rad2Deg(Math.acos(this.angleCosine(v)));
                }
            }
            return v;
        }
        //#endregion angle
        //#region assign
        assign(source) {
            if (source instanceof Core.classes.Vector) {
                this.x = source.x;
                this.y = source.y;
                this.z = source.z;
            }
        }
        //#endregion assign
        //#region equals
        equals(vector) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.x === vector.x && priv.y === vector.y && priv.z === vector.z;
        }
        //#endregion equals
        //#endregion
    }
    return Vector;
    //#endregion Vector
})();
//#region Vector defineProperties
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
//#endregion Vector defineProperties
//#endregion
//#region Matrix
const Matrix = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Matrix
    class Matrix extends BaseClass {
        //#region constructor
        constructor(v, v1, v2) {
            super();
            const priv = internal(this);
            if (!(v instanceof Core.classes.Vector)) {
                v = new Core.classes.Vector;
            }
            if (!(v1 instanceof Core.classes.Vector)) {
                v1 = new Core.classes.Vector;
            }
            if (!(v2 instanceof Core.classes.Vector)) {
                v2 = new Core.classes.Vector;
            }

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
        //#endregion constructor
        //#region Getter / Setters
        //#region m11
        get m11() {
            return _m11;
        }
        set m11(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.m11 = newValue;
            }
        }
        //#endregion m11
        //#region m12
        get m12() {
            return internal(this).m12;
        }
        set m12(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.m12 = newValue;
            }
        }
        //#endregion m12
        //#region m13
        get m13() {
            return internal(this).m13;
        }
        set m13(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.m13 = newValue;
            }
        }
        //#endregion m13
        //#region m21
        get m21() {
            return internal(this).m21;
        }
        set m21(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.m21 = newValue;
            }
        }
        //#endregion m21
        //#region m22
        get m22() {
            return internal(this).m22;
        }
        set m22(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.m22 = newValue;
            }
        }
        //#endregion m22
        //#region m23
        get m23() {
            return internal(this).m23;
        }
        set m23(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.m23 = newValue;
            }
        }
        //#endregion m23
        //#region m31
        get m31() {
            return internal(this).m31;
        }
        set m31(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.m31 = newValue;
            }
        }
        //#endregion m31
        //#region m32
        get m32() {
            return internal(this).m32;
        }
        set m32(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.m32 = newValue;
            }
        }
        //#endregion m32
        //#region m33
        get m33() {
            return internal(this).m33;
        }
        set m33(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.m33 = newValue;
            }
        }
        //#endregion m33
        //#region clone
        get clone() {
            //#region Variables déclaration
            const mat = new Core.classes.Matrix;
            //#endregion Variables déclaration
            mat.assign(this);
            return mat;
        }
        //#endregion clone
        //#region determinant
        get determinant() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.m11 * (priv.m22 * priv.m33 - priv.m32 * priv.m23) -
                priv.m12 * (priv.m21 * priv.m33 - priv.m31 * priv.m23) +
                priv.m13 * (priv.m21 * priv.m32 - priv.m31 * priv.m22);
        }
        //#endregion determinant
        //#region adjoint
        get adjoint() {
            //#region Variables déclaration
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
            //#endregion Variables déclaration
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
        //#endregion adjoint
        //#region invert
        get invert() {
            //#region Variables déclaration
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
            //#endregion Variables déclaration
            priv.m11 = m0;
            priv.m12 = m1;
            priv.m21 = m2;
            priv.m22 = m3;
            priv.m31 = m4;
            priv.m32 = m5;
        }
        //#endregion invert
        //#region toArray
        get toArray() {
            //#region Variables déclaration
            const priv = internal(this);
            const result = [];
            //#endregion Variables déclaration
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
        //#endregion toArray
        //#endregion
        //#region Methods
        //#region setValues
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
        //#endregion setValues
        //#region multiply
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
        //#endregion multiply
        //#region assign
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
        //#endregion assign
        //#region rotate
        rotate(a) {
            //#region Variables déclaration
            const b = Convert.deg2Rad(a);
            const x = Math.sinCos(b);
            const m = Types.CONSTANTS.ZEROMATRIX.clone();
            //#endregion Variables déclaration
            m.assign(this);
            this.m11 = m.m11 * x.cos + m.m21 * x.sin;
            this.m12 = m.m12 * x.cos + m.m22 * x.sin;
            this.m21 = m.m11 * -x.sin + m.m21 * x.cos;
            this.m22 = m.m12 * -x.sin + m.m22 * x.cos;
        }
        //#endregion rotate
        //#region translate
        translate(x, y) {
            //#region Variables déclaration
            const m = Types.CONSTANTS.ZEROMATRIX.clone();
            //#endregion Variables déclaration
            m.assign(this);
            this.m31 += m.m11 * x + m.m21 * y;
            this.m32 += m.m12 * x + m.m22 * y;
        }
        //#endregion translate
        //#region transformPoint
        transformPoint(p) { // à voir
            //#region Variables déclaration
            const priv = internal(this);
            const x = p.x;
            const y = p.y;
            //#endregion Variables déclaration
            p.x = x * priv.m11 + y * priv.m21 + priv.m31;
            p.y = x * priv.m12 + y * priv.m22 + priv.m32;
            //return _geo.point(p.x,p.y);
        }
        //#endregion transformPoint
        //#region scale
        scale(x, y) {
            this.m11 *= x;
            this.m12 *= x;
            this.m21 *= y;
            this.m22 *= y;
        }
        //#endregion scale
        //#region equals
        equals(m) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.m11 === m.m11 && priv.m12 === m.m12 &&
                priv.m13 === m.m13 && priv.m21 === m.m21 &&
                priv.m22 === m.m22 && priv.m23 === m.m23 &&
                priv.m31 === m.m31 && priv.m32 === m.m32 &&
                priv.m33 === m.m33;
        }
        //#endregion equals
        //#region toString
        toString(sep, withBracket) {
            //#region Variables déclaration
            const priv = internal(this);
            let result = String.EMPTY;
            //#endregion Variables déclaration
            if (!sep) {
                sep = String.SPACE;
            }
            if (!Tools.isBool(withBracket) && !withBracket) {
                withBracket = false;
            }
            result += withBracket ? "[" : String.SPACE;
            result += priv.m11 + sep;
            result += priv.m12 + sep;
            result += priv.m13 + sep;
            result += priv.m21 + sep;
            result += priv.m22 + sep;
            result += priv.m23 + sep;
            result += priv.m31 + sep;
            result += priv.m32 + sep;
            result += priv.m33 + sep;
            result += withBracket ? "]" : String.SPACE;
            return result;
        }
        //#endregion toString
        //#endregion
    }
    return Matrix;
    //#endregion Matrix
})();
//#region Matrix defineProperties
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
//#endregion Matrix defineProperties
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, Point, Rect, Vector, Matrix);
export { Geometry, Point, Rect, Vector, Matrix };
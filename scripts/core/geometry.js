//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Convert } from '/scripts/core/convert.js';
//#endregion
//#region Geometry
class Geometry {
    //#region Static
    static normalizeAngle(a) {
        //#region Variables déclaration
        const CONSTANTS = core.types.CONSTANTS;
        //#endregion Variables déclaration
        if (core.tools.isNumber(a)) {
            let result = a - (a * CONSTANTS.INV360 | 0) * 360;
            result += result < -180 ? 360 : 0;
            return result;
        }
        return a;
    }
    static createRotationMatrix(a) {
        //#region Variables déclaration
        const CONSTANTS = core.types.CONSTANTS;
        //#endregion Variables déclaration
        if (core.tools.isNumber(a)) {
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
        return p instanceof core.classes.Point && p1 instanceof core.classes.Point
            ? p1.subtract(p) : p;
    }
    //#endregion Static
}
//#endregion Geometry
//#region Point
class Point extends BaseClass {
    //#region Private fields
    #x;
    #y;
    //#endregion Private fields
    //#region constructor
    constructor(x, y) {
        super();
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);

        this.#x = x;
        this.#y = y;
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region x
    get x() {
        return this.#x;
    }
    set x(newValue) {
        core.tools.isNumber(newValue) && this.#x !== newValue && (this.#x = newValue);
    }
    //#endregion x
    //#region y
    get y() {
        return this.#y;
    }
    set y(newValue) {
        core.tools.isNumber(newValue) && this.#y !== newValue && (this.#y = newValue);
    }
    //#endregion y
    //#region isEmpty
    get isEmpty() {
        return this.#x + this.#y === 0;
    }
    //#endregion isEmpty
    //#region length
    get length() {
        //#region Variables déclaration
        const x = this.#x;
        const y = this.#y;
        //#endregion Variables déclaration
        return Math.sqrt(x * x + y * y);
    }
    //#endregion length
    //#region properties
    get properties() {
        //#region Variables déclaration
        const props = core.tools.getPropertiesFromObject(this);
        //#endregion Variables déclaration
        return props;
    }
    //#endregion properties
    //#region toArray
    get toArray() {
        return [this.#x, this.#y];
    }
    //#endregion toArray
    //#region toSimpleObject
    get toSimpleObject() {
        return {
            x: this.#x,
            y: this.#y
        };
    }
    //#endregion toSimpleObject
    //#region clone
    get clone() {
        return new core.classes.Point(this);
    }
    //#endregion clone
    //#endregion Getters / Setters
    //#region Methods
    //#region setValues
    setValues(x, y) {
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
        this.#x = x;
        this.#y = y;
    }
    //#endregion setValues
    //#region min
    min(p) {
        if (p instanceof core.classes.Point) {
            return p.y < this.#y || p.y === this.#y && p.x < this.#x
                ? p : this;
        }
        return p;
    }
    //#endregion min
    //#region scale
    scale(x, y) {
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
        this.#x = this.#x * x;
        this.#y = this.#y * y;
        return this;
    }
    //#endregion scale
    //#region inRect
    inRect(r) {
        return r instanceof core.classes.Rect
            ? this.#x >= r.left && this.#x <= r.right && this.#y >= r.top && this.#y <= r.bottom
            : !1;
    }
    //#endregion inRect
    //#region rotate
    rotate(a, c) {
        !(c instanceof core.classes.Point) && (c = new core.classes.Point(this.#x, this.#y));
        !core.tools.isNumber(a) && (a = 0);
        a = a * 1;
        a = Convert.deg2Rad(a);
        const dx = this.#x - c.x;
        const dy = this.#y - c.y;
        // calculate angle and distance
        const a1 = Math.atan2(dy, dx);
        const dist = Math.sqrt(dx * dx + dy * dy);
        // calculate new angle
        const a2 = a1 + a;
        // calculate new coordinates
        core.private(this, {
            x: Math.cos(a2) * dist + c.x,
            y: Math.sin(a2) * dist + c.y
        });
        return this;
    }
    //#endregion rotate
    //#region multiply
    multiply(v) {
        if (v) {
            if (v instanceof core.classes.Point) {
                this.#x = this.#x * v.x;
                this.#y = this.#y * v.y;
            }
            else {
                !core.tools.isNumber(v) && (v = 0);
                this.#x = this.#x * v;
                this.#y = this.#y * v;
            }
        }
        return this;
    }
    //#endregion multiply
    //#region divide
    divide(v) {
        if (v) {
            if (v instanceof core.classes.Point) {
                this.#x = this.#x / v.x;
                this.#y = this.#y / v.y;
            } else {
                !core.tools.isNumber(v) && (v = 0);
                this.#x = this.#x / v;
                this.#y = this.#y / v;
            }
        }
        return this;
    }
    //#endregion divide
    //#region subtract
    subtract(v) {
        if (v) {
            if (v instanceof core.classes.Point) {
                this.#x = this.#x - v.x;
                this.#y = this.#y - v.y;
            } else {
                !core.tools.isNumber(v) && (v = 0);
                this.#x = this.#x - v;
                this.#y = this.#y - v;
            }
        }
        return this;
    }
    //#endregion subtract
    //#region add
    add(v) {
        if (v) {
            if (v instanceof core.classes.Point) {
                this.#x = this.#x + v.x;
                this.#y = this.#y + v.y;
            } else {
                !core.tools.isNumber(v) && (v = 0);
                this.#x = this.#x + v;
                this.#y = this.#y + v;
            }
        }
        return this;
    }
    //#endregion add
    //#region distance
    distance(p) {
        if (p instanceof core.classes.Point) {
            const dx = p.x - this.#x;
            const dy = p.y - this.#y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        return 0;
    }
    //#endregion distance
    //#region directedAngle
    directedAngle(p) {
        return p instanceof core.classes.Point
            ? Math.atan2(this.cross(p), this.dot(p)) * 180 / Math.PI
            : 0;
    }
    //#endregion directedAngle
    //#region cross
    cross(p) {
        return p instanceof core.classes.Point
            ? this.#x * p.y - this.#y * p.x
            : 0;
    }
    //#endregion cross
    //#region dot
    dot(p) {
        return this instanceof core.classes.Point && p instanceof core.classes.Point
            ? this.#x * p.x + this.#y * p.y
            : 0;
    }
    //#endregion dot
    //#region assign
    assign(source) {
        if (source instanceof core.classes.Point) {
            this.#x = source.x;
            this.#y = source.y;
        }
    }
    //#endregion assign
    //#region inPolygon
    inPolygon(pts) {
        if (Array.isArray(pts) && pts.length >= 3) {
            let c = 0;
            const j = pts.length - 1;
            let j1 = j;
            for (let i = 0; i <= j; i++) {
                if ((pts[i].y <= this.#y && this.#y < pts[j1].y ||
                    pts[j1].y <= this.#y && this.#y < pts[i].y) &&
                    this.#x < (pts[j1].x - pts[i].x) * (this.#y - pts[i].y) / (pts[j1].y - pts[i].y) + pts[i].x) {
                    c = c === 0 ? 1 : 0;
                }
                j1 = i;
            }
            let inside = !1;
            c !== 0 && (inside = !0);
            return inside;
        }
        return !1;
    }
    //#endregion inPolygon
    //#region inEllipse
    inEllipse(r) {
        //#region Variables déclaration
        const x0 = (r.left + r.right) * 0.5;
        const y0 = (r.top + r.bottom) * 0.5;
        const a = (r.right - r.left) * 0.5;
        const b = (r.bottom - r.top) * 0.5;
        //#endregion Variables déclaration
        return Math.sqr((this.#x - x0) / a) + Math.sqr((this.#y - y0) / b) <= 1.0 ? !0 : !1;
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
        return this.#x === p.x && this.#y === p.y;
    }
    //#endregion equals
    //#region offset
    offset(x, y) {
        if (core.tools.isNumber(x) && core.tools.isNumber(y)) {
            this.#x = this.#x + x;
            this.#y = this.#y + y;
        }
    }
    //#endregion offset
    //#endregion Methods
}
Object.defineProperties(Point.prototype, {
    'x': {
        enumerable: !0
    },
    'y': {
        enumerable: !0
    }
});
//#endregion Point
//#region Rect
class Rect extends BaseClass {
    //#region Private fields
    #left;
    #top;
    #right;
    #bottom;
    //#endregion Private fields
    //#region constructor
    constructor(l, t, r, b) {
        super();
        !core.tools.isNumber(l) && (l = 0);
        !core.tools.isNumber(t) && (t = 0);
        !core.tools.isNumber(r) && (r = 0);
        !core.tools.isNumber(b) && (b = 0);
        this.#left = l;
        this.#top = t;
        this.#right = r;
        this.#bottom = b;
    }
    //#endregion
    //#region Getters / Setters
    //#region left
    get left() {
        return this.#left;
    }
    set left(newValue) {
        core.tools.isNumber(newValue) && this.#left !== newValue && (this.#left = newValue);
    }
    //#endregion
    //#region top
    get top() {
        return this.#top;
    }
    set top(newValue) {
        core.tools.isNumber(newValue) && this.#top !== newValue && (this.#top = newValue);
    }
    //#endregion
    //#region right
    get right() {
        return this.#right;
    }
    set right(newValue) {
        core.tools.isNumber(newValue) && this.#right !== newValue && (this.#right = newValue);
    }
    //#endregion
    //#region bottom
    get bottom() {
        return this.#bottom;
    }
    set bottom(newValue) {
        core.tools.isNumber(newValue) && this.#bottom !== newValue && (this.#bottom = newValue);
    }
    //#endregion
    //#region isEmpty
    get isEmpty() {
        return this.#left === 0 && this.#top === 0 && this.#right === 0 && this.#bottom === 0;
    }
    //#endregion
    //#region width
    get width() {
        //#region Variables déclaration
        const w = this.#right - this.#left;
        //#endregion Variables déclaration
        return w < 0 ? 0 : w;
    }
    //#endregion
    //#region height
    get height() {
        //#region Variables déclaration
        const h = this.#bottom - this.#top;
        //#endregion Variables déclaration
        return h < 0 ? 0 : h;
    }
    //#endregion
    //#region topLeft
    get topLeft() {
        return new core.classes.Point(this.#left, this.#top);
    }
    //#endregion
    //#region topRight
    get topRight() {
        return new core.classes.Point(this.width - Math.abs(this.#left), this.#top);
    }
    //#endregion topRight
    //#region bottomLeft
    get bottomLeft() {
        return new core.classes.Point(this.#left, this.height - Math.abs(this.#top));
    }
    //#endregion bottomLeft
    //#region bottomRight
    get bottomRight() {
        return new core.classes.Point(this.width - Math.abs(this.#left), this.height - Math.abs(this.#top));
    }
    //#endregion bottomRight
    //#region clone
    get clone() {
        //#region Variables déclaration
        const rect = new core.classes.Rect;
        //#endregion Variables déclaration
        rect.assign(this);
        return rect;
    }
    //#endregion clone
    //#endregion Getters / Setters
    //#region Methods
    //#region setTopLeft
    setTopLeft(newValue) {
        if (newValue instanceof core.classes.Point) {
            this.#left = newValue.x;
            this.#top = newValue.y;
        }
    }
    //#endregion setTopLeft
    //#region setTopRight
    setTopRight(newValue) {
        if (newValue instanceof core.classes.Point) {
            this.#top = newValue.y;
            this.#right = newValue.x;
        }
    }
    //#endregion setTopRight
    //#region setBottomLeft
    setBottomLeft(newValue) {
        if (newValue instanceof core.classes.Point) {
            this.#bottom = newValue.y;
            this.#left = newValue.x;
        }
    }
    //#endregion setBottomLeft
    //#region setBottomRight
    setBottomRight(newValue) {
        if (newValue instanceof core.classes.Point) {
            this.#bottom = newValue.y;
            this.#right = newValue.x;
        }
    }
    //#endregion setBottomRight
    //#region setValues
    setValues(l, t, r, b) {
        !core.tools.isNumber(l) && (l = 0);
        !core.tools.isNumber(t) && (t = 0);
        !core.tools.isNumber(r) && (r = 0);
        !core.tools.isNumber(b) && (b = 0);
        this.#left = l;
        this.#top = t;
        this.#right = r;
        this.#bottom = b;
    }
    //#endregion setValues
    //#region normalize
    normalize(a) {
        if (Array.isArray(a)) {
            //a.add(this);
            const result = new core.classes.Rect(0xF000, 0xF000, -0xF000, -0xF000);
            a.forEach(x => {
                if (x instanceof core.classes.Point) {
                    x.x < result.left && (result.left = x.x);
                    x.y < result.top && (result.top = x.y);
                    x.x > result.right && (result.right = x.x);
                    x.y > result.bottom && (result.bottom = x.y);
                }
            });
            return result;
        }
        return null;
    }
    //#endregion normalize
    //#region normalize2
    normalize2(a) {
        if (a instanceof core.classes.Rect) {
            this.normalize([
                new core.classes.Point(a.left, a.top),
                new core.classes.Point(a.right, a.top),
                new core.classes.Point(a.right, a.bottom),
                new core.classes.Point(a.left, a.bottom)
            ]);
        }
        return this;
    }
    //#endregion normalize2
    //#region reduce
    reduce(x, y) {
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
        this.#right -= x;
        this.#bottom -= y;
        return this;
    }
    //#endregion reduce
    //#region extend
    extend(x, y) {
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
        this.#right += x;
        this.#bottom += y;
        return this;
    }
    //#endregion extend
    //#region center
    center(b) {
        if (b instanceof core.classes.Rect) {
            this.offset(-this.#left, -this.#top);
            this.offset(Math.round((b.width - this.width) / 2), Math.round((b.height - this.height) / 2));
            this.offset(b.left, b.top);
        }
        return this;
    }
    //#endregion center
    //#region fit
    fit(b) {
        if (b instanceof core.classes.Rect) {
            let ratio = 1;
            if (b.isEmpty) {
                return { rect: this, ratio: ratio };
            }
            ratio = this.width / b.width > this.height / b.height
                ? this.width / b.width
                : this.height / b.height;
            if (ratio < 1) {
                this.#right = this.width;
                this.#bottom = this.height;
                this.#left = 0;
                this.#top = 0;
            } else {
                this.#right = Math.round(this.width / ratio);
                this.#bottom = Math.round(this.height / ratio);
                this.#left = 0;
                this.#top = 0;
            }
            this.center(b);
            return { rect: this, ratio };
        }
        return 0;
    }
    //#endregion fit
    //#region offset
    offset(x, y) {
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
        this.#left += x;
        this.#right += x;
        this.#top += y;
        this.#bottom += y;
        return this;
    }
    //#endregion offset
    //#region multiply
    multiply(x, y) {
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
        this.#left *= x;
        this.#right *= x;
        this.#top *= y;
        this.#bottom *= y;
        return this;
    }
    //#endregion multiply
    //#region inflate
    inflate(x, y) {
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
        this.#left -= x;
        this.#right += x;
        this.#top -= y;
        this.#bottom += y;
        return this;
    }
    //#endregion inflate
    //#region intersect
    intersect(r) {
        return r instanceof core.classes.Rect
            ? this.#left <= r.right && this.#right >= r.left && this.#top <= r.bottom && this.#bottom >= r.top
            : !1;
    }
    //#endregion intersect
    //#region intersectRectDS
    intersectRectDS(r) {
        //#region Variables déclaration
        const result = r.left < this.#right && r.right > this.#left && r.top < this.#bottom && r.bottom > this.#top;
        //#endregion Variables déclaration
        if (result) {
            this.#left = Math.max(this.#left, r.left);
            this.#top = Math.max(this.#top, r.top);
            this.#right = Math.min(this.#right, r.right);
            this.#bottom = Math.min(this.#bottom, r.bottom);
        } else {
            this.#left = 0;
            this.#top = 0;
            this.#right = 0;
            this.#bottom = 0;
        }
    }
    //#endregion intersectRectDS
    //#region union
    union(r) {
        if (r instanceof core.classes.Rect) {
            const x1 = Math.min(this.#left, r.left);
            const x2 = Math.max(this.#left + this.width, r.left + r.width);
            const y1 = Math.min(this.#top, r.top);
            const y2 = Math.max(this.#top + this.height, r.top + r.height);
            this.#left = x1;
            this.#top = y1;
            this.#right = x2;
            this.#bottom = y2;
        }
        return this;
    }
    //#endregion union
    //#region includedRect
    includedRect(r) {
        if (r instanceof core.classes.Rect) {
            this.#left = Math.max(this.#left, r.left);
            this.#top = Math.max(this.#top, r.top);
            this.#right = Math.max(this.#right, r.right);
            this.#bottom = Math.max(this.#bottom, r.bottom);
        }
        return this;
    }
    //#endregion includedRect
    //#region equals
    equals(r) {
        return r instanceof core.classes.Rect
            ? r.left === this.#left && r.top === this.#top && r.right === this.#right && r.bottom === this.#bottom
            : !1;
    }
    //#endregion equals
    //#region rotate
    rotate(angle) {
        if (angle !== 0) {
            const w = this.width;
            const h = this.height;
            const x = this.#left;
            const y = this.#top;
            this.#left = x + w / 2 * Math.cos(Convert.deg2Rad(angle)) - h / 2 * Math.sin(Convert.deg2Rad(angle));
            this.#top = y + h / 2 * Math.cos(Convert.deg2Rad(angle)) + w / 2 * Math.sin(Convert.deg2Rad(angle));
            this.#right = this.#left + w;
            this.#bottom = this.#top + h;
        }
    }
    //#endregion rotate
    //#region assign
    assign(source) {
        if (source instanceof core.classes.Rect) {
            this.#left = source.left;
            this.#top = source.top;
            this.#right = source.right;
            this.#bottom = source.bottom;
        }
    }
    //#endregion assign
    //#region empty
    empty() {
        return this.#left = this.#top = this.#right = this.#bottom = 0;
    }
    //#endregion empty
    //#endregion Methods
}
Object.defineProperties(Rect.prototype, {
    'left': {
        enumerable: !0
    },
    'top': {
        enumerable: !0
    },
    'right': {
        enumerable: !0
    },
    'bottom': {
        enumerable: !0
    }
});
//#endregion Rect
//#region Vector
class Vector extends BaseClass {
    //#region Private fields
    #x;
    #y;
    #z;
    //#endregion Private fields
    //#region constructor
    constructor(x, y, z) {
        super();
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
        !core.tools.isNumber(z) && (z = 0);
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }
    //#endregion
    //#region Getters / Setters
    //#region x
    get x() {
        return this.#x;
    }
    set x(newValue) {
        core.tools.isNumber(newValue) && this.#x !== newValue && (this.#x = newValue);
    }
    //#endregion x
    //#region y
    get y() {
        return this.#y;
    }
    set y(newValue) {
        core.tools.isNumber(newValue) && this.#y !== newValue && (this.#y = newValue);
    }
    //#endregion y
    //#region z
    get z() {
        return this.#z;
    }
    set z(newValue) {
        core.tools.isNumber(newValue) && this.#z !== newValue && (this.#z = newValue);
    }
    //#endregion z
    //#region point
    get point() {
        return new core.classes.Point(this.#x, this.#y);
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
        const v = new core.classes.Vector;
        //#endregion Variables déclaration
        v.assign(this);
        return v;
    }
    //#endregion clone
    //#region norm
    get norm() {
        const x = this.#x;
        const y = this.#y;
        return x * x + y * y;
    }
    //#endregion norm
    //#region normalize
    get normalize() {
        //#region Variables déclaration
        const invLen = Math.RSqrt(Math.abs(this.norm()));
        //#endregion Variables déclaration
        this.#x = this.#x * invLen;
        this.#y = this.#y * invLen;
        this.#z = 0.0;
        return this;
    }
    //#endregion normalize
    //#endregion Getters / Setters
    //#region Methods
    //#region setValues
    setValues(x, y, z) {
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
        !core.tools.isNumber(z) && (z = 0);
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }
    //#endregion setValues
    //#region transform
    transform(m) {
        if (m instanceof core.classes.Matrix) {
            const x = this.#x, y = this.#y, z = this.#z;
            this.#x = x * m.m11 + y * m.m21 + z * m.m31;
            this.#y = x * m.m12 + y * m.m22 + z * m.m32;
            this.#z = 1.0;
        }
        return this;
    }
    //#endregion transform
    //#region add
    add(v, v1) {
        //#region Variables déclaration
        const classes = core.classes;
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
        if (v instanceof core.classes.Vector) {
            this.#x -= v.x;
            this.#y -= v.y;
            this.#z = 1;
        }
        return this;
    }
    //#endregion subtract
    //#region scale
    scale(f) {
        !core.tools.isNumber(f) && (f = 0);
        this.#x *= f;
        this.#y *= f;
        this.#z = 1;
        return this;
    }
    //#endregion scale
    //#region dot
    dot(v) {
        return v instanceof core.classes.Vector
            ? this.#x * v.x + this.#y * v.y + this.#z * v.z
            : 0;
    }
    //#endregion dot
    //#region angleCosine
    angleCosine(v) {
        //#region Variables déclaration
        const len1 = Math.sqrt(this.#x * this.#x + this.#y * this.#y + this.#z * this.#z);
        const len2 = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        const dot = this.#x * v.x + this.#y * v.y + this.#z * v.z;
        let result = len1 * len2;
        //#endregion Variables déclaration
        return Math.abs(result) > 1e-40 && (dot / result);
    }
    //#endregion angleCosine
    //#region crossProductZ
    crossProductZ(v) {
        return v instanceof core.classes.Vector ? this.#x * v.y - this.#y * v.x : -1;
    }
    //#endregion crossProductZ
    //#region combine2
    combine2(v, f, f1) {
        if (v instanceof core.classes.Vector) {
            f = f * 1;
            f1 = f1 * 1;
            const x = this.#x;
            const y = this.#y;
            this.#x = f * x + f1 * v.x;
            this.#y = f * y + f1 * v.y;
            this.#z = 1;
        }
        return this;
    }
    //#endregion combine2
    //#region reflect
    reflect(v) {
        return v instanceof core.classes.Vector ? this.combine2(v, 1, -2 * this.dot(v)) : this;
    }
    //#endregion reflect
    //#region angle
    angle(v) {
        if (v instanceof core.classes.Vector) {
            return this.crossProductZ(v) < 0
                ? Convert.rad2Deg(Math.acos(this.angleCosine(v)))
                : -Convert.rad2Deg(Math.acos(this.angleCosine(v)));
        }
        return v;
    }
    //#endregion angle
    //#region assign
    assign(source) {
        if (source instanceof core.classes.Vector) {
            this.#x = source.x;
            this.#y = source.y;
            this.#z = source.z;
        }
    }
    //#endregion assign
    //#region equals
    equals(vector) {
        return this.#x === vector.x && this.#y === vector.y && this.#z === vector.z;
    }
    //#endregion equals
    //#endregion Methods
}
Object.defineProperties(Vector.prototype, {
    'x': {
        enumerable: !0
    },
    'y': {
        enumerable: !0
    },
    'z': {
        enumerable: !0
    }
});
//#endregion Vector
//#region Matrix
//#region Matrix
class Matrix extends BaseClass {
    //#region Private fields
    #m11;
    #m12;
    #m13;
    #m21;
    #m22;
    #m23;
    #m31;
    #m32;
    #m33;
    //#endregion Private fields
    //#region constructor
    constructor(v, v1, v2) {
        super();
        !(v instanceof core.classes.Vector) && (v = new core.classes.Vector);
        !(v1 instanceof core.classes.Vector) && (v1 = new core.classes.Vector);
        !(v2 instanceof core.classes.Vector) && (v2 = new core.classes.Vector);
        this.#m11 = v.x;
        this.#m12 = v.y;
        this.#m13 = v.z;
        this.#m21 = v1.x;
        this.#m22 = v1.y;
        this.#m23 = v1.z;
        this.#m31 = v2.x;
        this.#m32 = v2.y;
        this.#m33 = v2.z;
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region m11
    get m11() {
        return this.#m11;
    }
    set m11(newValue) {
        core.tools.isNumber(newValue) && this.#m11 !== newValue && (this.#m11 = newValue);
    }
    //#endregion m11
    //#region m12
    get m12() {
        return this.#m12;
    }
    set m12(newValue) {
        core.tools.isNumber(newValue) && this.#m12 !== newValue && (this.#m12 = newValue);
    }
    //#endregion m12
    //#region m13
    get m13() {
        return this.#m13;
    }
    set m13(newValue) {
        core.tools.isNumber(newValue) && this.#m13 !== newValue && (this.#m13 = newValue);
    }
    //#endregion m13
    //#region m21
    get m21() {
        return this.#m21;
    }
    set m21(newValue) {
        core.tools.isNumber(newValue) && this.#m21 !== newValue && (this.#m21 = newValue);
    }
    //#endregion m21
    //#region m22
    get m22() {
        return this.#m22;
    }
    set m22(newValue) {
        core.tools.isNumber(newValue) && this.#m22 !== newValue && (this.#m22 = newValue);
    }
    //#endregion m22
    //#region m23
    get m23() {
        return this.#m23;
    }
    set m23(newValue) {
        core.tools.isNumber(newValue) && this.#m23 !== newValue && (this.#m23 = newValue);
    }
    //#endregion m23
    //#region m31
    get m31() {
        return this.#m31;
    }
    set m31(newValue) {
        core.tools.isNumber(newValue) && this.#m31 !== newValue && (this.#m31 = newValue);
    }
    //#endregion m31
    //#region m32
    get m32() {
        return this.#m32;
    }
    set m32(newValue) {
        core.tools.isNumber(newValue) && this.#m32 !== newValue && (this.#m32 = newValue);
    }
    //#endregion m32
    //#region m33
    get m33() {
        return this.#m33;
    }
    set m33(newValue) {
        core.tools.isNumber(newValue) && this.#m33 !== newValue && (this.#m33 = newValue);
    }
    //#endregion m33
    //#region clone
    get clone() {
        //#region Variables déclaration
        const mat = new core.classes.Matrix;
        //#endregion Variables déclaration
        mat.assign(this);
        return mat;
    }
    //#endregion clone
    //#region determinant
    get determinant() {
        return this.#m11 * (this.#m22 * this.#m33 - this.#m32 * this.#m23) -
            this.#m12 * (this.#m21 * this.#m33 - this.#m31 * this.#m23) +
            this.#m13 * (this.#m21 * this.#m32 - this.#m31 * this.#m22);
    }
    //#endregion determinant
    //#region adjoint
    get adjoint() {
        //#region Variables déclaration
        const a1 = this.#m11;
        const a2 = this.#m12;
        const a3 = this.#m13;
        const b1 = this.#m21;
        const b2 = this.#m22;
        const b3 = this.#m23;
        const c1 = this.#m31;
        const c2 = this.#m32;
        const c3 = this.#m33;
        //#endregion Variables déclaration
        this.#m11 = b2 * c3 - c2 * b3;
        this.#m12 = -a2 * c3 - c2 * a3;
        this.#m13 = a2 * b3 - b2 * a3;
        this.#m21 = -b1 * c3 - c1 * b3;
        this.#m22 = a1 * c3 - c1 * a3;
        this.#m23 = -a1 * b3 - b1 * a3;
        this.#m31 = b1 * c2 - c1 * b2;
        this.#m32 = -a1 * c2 - c1 * a2;
        this.#m33 = a1 * b2 - b1 * a2;
        return this;
    }
    //#endregion adjoint
    //#region invert
    get invert() {
        //#region Variables déclaration
        const m22 = this.#m22;
        const m11 = this.#m11;
        const m12 = this.#m12;
        const m21 = this.#m21;
        const m32 = this.#m32;
        const m31 = this.#m31;
        const d = 1 / (m11 * m22 - m12 * m21);
        const m0 = m22 * d;
        const m1 = -m12 * d;
        const m2 = -m21 * d;
        const m3 = m11 * d;
        const m4 = d * (m21 * m32 - m22 * m31);
        const m5 = d * (m12 * m31 - m11 * m32);
        //#endregion Variables déclaration
        this.#m11 = m0;
        this.#m12 = m1;
        this.#m21 = m2;
        this.#m22 = m3;
        this.#m31 = m4;
        this.#m32 = m5;
    }
    //#endregion invert
    //#region toArray
    get toArray() {
        //#region Variables déclaration
        const result = [];
        //#endregion Variables déclaration
        result.push(this.#m11);
        result.push(this.#m12);
        result.push(this.#m13);
        result.push(this.#m21);
        result.push(this.#m22);
        result.push(this.#m23);
        result.push(this.#m31);
        result.push(this.#m32);
        result.push(this.#m33);
        return result;
    }
    //#endregion toArray
    //#endregion Getters / Setters
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
        isNaN(mat.m11) && (mat.m11 = 0);
        isNaN(mat.m12) && (mat.m12 = 0);
        isNaN(mat.m13) && (mat.m13 = 0);
        isNaN(mat.m21) && (mat.m21 = 0);
        isNaN(mat.m22) && (mat.m22 = 0);
        isNaN(mat.m23) && (mat.m23 = 0);
        isNaN(mat.m31) && (mat.m31 = 0);
        isNaN(mat.m32) && (mat.m32 = 0);
        isNaN(mat.m33) && (mat.m33 = 0);
        this.#m11 = mat.m11;
        this.#m12 = mat.m12;
        this.#m13 = mat.m13;
        this.#m21 = mat.m21;
        this.#m22 = mat.m22;
        this.#m23 = mat.m23;
        this.#m31 = mat.m31;
        this.#m32 = mat.m32;
        this.#m33 = mat.m33;
    }
    //#endregion setValues
    //#region multiply
    multiply(m1) {
        if (m1 instanceof core.classes.Matrix) {
            const m = core.types.CONSTANTS.ZEROMATRIX.clone();
            m.assign(this);
            this.#m11 = m.m11 * m1.m11 + m.m12 * m1.m21 + m.m13 * m1.m31;
            this.#m12 = m.m11 * m1.m12 + m.m12 * m1.m22 + m.m13 * m1.m32;
            this.#m13 = m.m11 * m1.m13 + m.m12 * m1.m23 + m.m13 * m1.m33;
            this.#m21 = m.m21 * m1.m11 + m.m22 * m1.m21 + m.m23 * m1.m31;
            this.#m22 = m.m21 * m1.m12 + m.m22 * m1.m22 + m.m23 * m1.m32;
            this.#m23 = m.m21 * m1.m13 + m.m22 * m1.m23 + m.m23 * m1.m33;
            this.#m31 = m.m31 * m1.m11 + m.m32 * m1.m21 + m.m33 * m1.m31;
            this.#m32 = m.m31 * m1.m12 + m.m32 * m1.m22 + m.m33 * m1.m32;
            this.#m33 = m.m31 * m1.m13 + m.m32 * m1.m23 + m.m33 * m1.m33;
        }
        return this;
    }
    //#endregion multiply
    //#region assign
    assign(source) {
        if (source instanceof core.classes.Matrix) {
            this.#m11 = source.m11;
            this.#m12 = source.m12;
            this.#m13 = source.m13;
            this.#m21 = source.m21;
            this.#m22 = source.m22;
            this.#m23 = source.m23;
            this.#m31 = source.m31;
            this.#m32 = source.m32;
            this.#m33 = source.m33;
        }
    }
    //#endregion assign
    //#region rotate
    rotate(a) {
        //#region Variables déclaration
        const b = Convert.deg2Rad(a);
        const x = Math.sinCos(b);
        const m = core.types.CONSTANTS.ZEROMATRIX.clone();
        //#endregion Variables déclaration
        m.assign(this);
        this.#m11 = m.m11 * x.cos + m.m21 * x.sin;
        this.#m12 = m.m12 * x.cos + m.m22 * x.sin;
        this.#m21 = m.m11 * -x.sin + m.m21 * x.cos;
        this.#m22 = m.m12 * -x.sin + m.m22 * x.cos;
    }
    //#endregion rotate
    //#region translate
    translate(x, y) {
        //#region Variables déclaration
        const m = core.types.CONSTANTS.ZEROMATRIX.clone();
        //#endregion Variables déclaration
        m.assign(this);
        this.#m31 += m.m11 * x + m.m21 * y;
        this.#m32 += m.m12 * x + m.m22 * y;
    }
    //#endregion translate
    //#region transformPoint
    transformPoint(p) { // à voir
        //#region Variables déclaration
        const x = p.x;
        const y = p.y;
        //#endregion Variables déclaration
        p.x = x * this.#m11 + y * this.#m21 + this.#m31;
        p.y = x * this.#m12 + y * this.#m22 + this.#m32;
    }
    //#endregion transformPoint
    //#region scale
    scale(x, y) {
        this.#m11 *= x;
        this.#m12 *= x;
        this.#m21 *= y;
        this.#m22 *= y;
    }
    //#endregion scale
    //#region equals
    equals(m) {
        return this.#m11 === m.m11 && this.#m12 === m.m12 &&
            this.#m13 === m.m13 && this.#m21 === m.m21 &&
            this.#m22 === m.m22 && this.#m23 === m.m23 &&
            this.#m31 === m.m31 && this.#m32 === m.m32 &&
            this.#m33 === m.m33;
    }
    //#endregion equals
    //#region toString
    toString(sep, withBracket) {
        //#region Variables déclaration
        let result = String.EMPTY;
        //#endregion Variables déclaration
        !sep && (sep = String.SPACE);
        !core.tools.isBool(withBracket) && !withBracket && (withBracket = !1);
        result += withBracket ? '[' : String.SPACE;
        result += this.#m11 + sep;
        result += this.#m12 + sep;
        result += this.#m13 + sep;
        result += this.#m21 + sep;
        result += this.#m22 + sep;
        result += this.#m23 + sep;
        result += this.#m31 + sep;
        result += this.#m32 + sep;
        result += this.#m33 + sep;
        result += withBracket ? ']' : String.SPACE;
        return result;
    }
    //#endregion toString
    //#endregion Methods
}
Object.defineProperties(Matrix.prototype, {
    'm11': {
        enumerable: !0
    },
    'm12': {
        enumerable: !0
    },
    'm13': {
        enumerable: !0
    },
    'm21': {
        enumerable: !0
    },
    'm22': {
        enumerable: !0
    },
    'm23': {
        enumerable: !0
    },
    'm31': {
        enumerable: !0
    },
    'm32': {
        enumerable: !0
    },
    'm33': {
        enumerable: !0
    }
});
//#endregion Matrix
core.classes.register(core.types.CATEGORIES.INTERNAL, Point, Rect, Vector, Matrix);
export { Geometry, Point, Rect, Vector, Matrix };
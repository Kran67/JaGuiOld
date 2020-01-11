import { BaseClass } from "/scripts/core/baseclass.js";
import { Text } from "/scripts/core/text.js";
import { Tools } from "/scripts/core/tools.js";
import * as Canvas from "/scripts/core/canvas.js";
//#region PathPoint
const _KINDS = Object.freeze({
    MOVETO: "moveTo",
    LINETO: "lineTo",
    CURVETO: "curveTo",
    CLOSE: "close"
});
const PathPoint = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class PathPoint extends BaseClass {
        //#region KINDS
        /**
         * @type    {Object}
         */
        static get KINDS() {
            return _KINDS;
        }
        //#endregion
        constructor() {
            super();
            const priv = internal(this);
            priv.kind = PathPoint.KINDS.MOVETO;
            priv.point = new Core.classes.Point;
            priv.cp1 = new Core.classes.Point;
            priv.cp2 = new Core.classes.Point;
        }
        //#region Getter / Setter
        get kind() {
            return internal(this).kind;
        }
        set kind(newValue) {
            const priv = internal(this);
            if (Tools.valueInSet(newValue, PathPoint.KINDS)) {
                if (priv.kind !== newValue) {
                    priv.kind = newValue;
                }
            }
        }
        get point() {
            return internal(this).point;
        }
        set point(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Point) {
                if (priv.point !== newValue) {
                    priv.point.assign(newValue);
                }
            }
        }
        get cp1() {
            return internal(this).cp1;
        }
        set cp1(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Point) {
                if (priv.cp1 !== newValue) {
                    priv.cp1.assign(newValue);
                }
            }
        }
        get cp2() {
            return internal(this).cp2;
        }
        set cp2(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Point) {
                if (priv.cp2 !== newValue) {
                    priv.cp2.assign(newValue);
                }
            }
        }
        //#endregion
        //#region Methods
        destroy() {
            this.point.destroy();
            this.cp1.destroy();
            this.cp2.destroy();
        }
        //#endregion
    }
    return PathPoint;
})();
//#endregion
//#region PathData
const PathData = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class PathData extends BaseClass {
        constructor(owner) {
            super();
            const priv = internal(this);
            priv.startPoint = new Core.classes.Point;
            priv.data = [];
            priv.originalBounds = new Core.classes.Rect;
            priv.originalPathString = null;
            priv.owner = owner;
        }
        //#region getters/setters
        get startPoint() {
            return internal(this).startPoint;
        }
        set startPoint(newValue) {
            const startPoint = internal(this).startPoint;
            if (newValue instanceof Core.classes.Point) {
                if (!startPoint.equals(newValue)) {
                    startPoint.assign(newValue);
                    //this.onChange.invoke();
                    this.updateOwner();
                }
            }
        }
        get data() {
            return internal(this).data;
        }
        get originalBounds() {
            return internal(this).originalBounds;
        }
        get originalPathString() {
            return internal(this).originalPathString;
        }
        set originalPathString(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.originalPathString !== newValue) {
                    priv.originalPathString = newValue;
                }
            }
        }
        get owner() {
            return internal(this).owner;
        }
        get pathString() {
            let i = 0;
            const result = [];
            const KINDS = PathPoint.KINDS;
            const data = internal(this).data;
            while (i < data.length) {
                if (data[i].kind === KINDS.MOVETO) {
                    result.push(`M ${data[i].point.x},${data[i].point.y}${String.SPACE}`);
                }
                else if (data[i].kind === KINDS.LINETO) {
                    result.push(`L ${data[i].point.x},${data[i].point.y}${String.SPACE}`);
                }
                else if (data[i].kind === KINDS.CURVETO) {
                    result.push(`C ${data[i].point.x},${data[i].point.y}${String.SPACE}
                        ${data[i + 1].point.x},${data[i + 1].point.y}${String.SPACE}
                        ${data[i + 2].point.x},${data[i + 2].point.y}${String.SPACE}`);
                    i += 2;
                } else if (data[i].kind === KINDS.CLOSE) {
                    result.push("Z ");
                }
                i++;
            }
            return result.join(String.EMPTY);
        }
        set pathString(value) {
            const priv = internal(this);
            let s = String.EMPTY;
            let r = null;
            let cp1 = null;
            let cp2 = null;
            let angle = null;
            let large = null;
            let sweet = null;
            let o = null;
            const numbersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-"];
            const data = priv.data;
            if (typeof value === Types.CONSTANTS.STRING) {
                if (value.length > 0) {
                    value.split("").forEach((val, i) => {
                        if (["\t", "\r", "\n", '"', "'"].indexOf(val) === -1) {
                            s += val;
                        }
                    });
                }
                data.length = 0;
                let pos = 0;
                while (s !== String.EMPTY) {
                    const lastlen = pos;
                    let tok = Text.getTok(s, pos);
                    pos = tok.pos;
                    let toks = tok.s;
                    while (toks !== String.EMPTY) {
                        tok = toks.charAt(0);
                        toks = toks.remove(0, 1);
                        try {
                            if (["z", "Z"].indexOf(tok) > -1) {
                                this.closePath();
                            }
                            if (tok === "M") {
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.moveTo(o.Point);
                                while (s !== String.EMPTY && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                    //next points }
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    this.lineTo(o.Point);
                                }
                            }
                            if (tok === "m") {
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.moveToRel(o.Point);
                                while (s !== String.EMPTY && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                    //next points
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    this.lineToRel(o.Point);
                                }
                            }
                            if (tok === "L") {
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.lineTo(o.Point);
                                while (s !== String.EMPTY && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                    //next points
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    this.lineTo(o.Point);
                                }
                            }
                            if (tok === "l") {
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.lineToRel(o.Point);
                                while (s !== String.EMPTY && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                    //next points
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    this.lineToRel(o.Point);
                                }
                            }
                            if (tok === "C") {
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                cp1 = o.Point;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                cp2 = o.Point;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.curveTo(cp1, cp2, o.Point);
                                while (s !== String.EMPTY && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                    //next points
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    cp1 = o.Point;
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    cp2 = o.Point;
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    this.curveTo(cp1, cp2, o.Point);
                                }
                            }
                            if (tok === "c") {
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                cp1 = o.Point;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                cp2 = o.Point;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.curveToRel(cp1, cp2, o.Point);
                                while (s !== String.EMPTY && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                    //next points
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    cp1 = o.Point;
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    cp2 = o.Point;
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    this.curveToRel(cp1, cp2, o.Point);
                                }
                            }
                            if (tok === "S") {
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                cp2 = o.Point;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.smoothCurveTo(cp2, o.Point);
                                while (s !== String.EMPTY && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                    //next points
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    cp2 = o.Point;
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    this.smoothCurveTo(cp2, o.Point);
                                }
                            }
                            if (tok === "s") {
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                cp2 = o.Point;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.smoothCurveToRel(cp2, o.Point);
                                while (s !== String.EMPTY && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                    //next points }
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    cp2 = o.Point;
                                    o = Text.getPoint(s, pos);
                                    pos = o.Pos;
                                    this.smoothCurveToRel(cp2, o.Point);
                                }
                            }
                            if (tok === "H") {
                                //skip horizontal line
                                o = Text.getNum(s, pos);
                                pos = o.Pos;
                                this.hLineTo(+o.Result);
                            }
                            if (tok === "h") {
                                //skip horizontal line
                                o = Text.getNum(s, pos);
                                pos = o.Pos;
                                this.hLineToRel(+o.Result);
                            }
                            if (tok === "V") {
                                //skip vertical line
                                o = Text.getNum(s, pos);
                                pos = o.Pos;
                                this.vLineTo(+o.Result);
                            }
                            if (tok === "v") {
                                //skip vertical line
                                o = Text.getNum(s, pos);
                                pos = o.Pos;
                                this.vLineToRel(+o.Result);
                            }
                            if (tok === "Q") {
                                //skip quadratic bezier
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                            }
                            if (tok === "q") {
                                //skip quadratic bezier
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                            }
                            if (tok === "T") {
                                //skip show quadratic bezier
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                            }
                            if (tok === "t") {
                                //skip show quadratic bezier
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                            }
                            if (tok === "A") {
                                //arc
                                if (data.length > 0) {
                                    cp1 = data[data.length - 1].point;
                                }
                                else {
                                    cp1 = new Core.classes.Point;
                                }
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                r = o.Point;
                                o = Text.getNum(s, pos);
                                pos = o.Pos;
                                angle = +o.Result;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                large = o.Point.x === 1;
                                sweet = o.Point.y === 1;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                cp2 = o.Point;
                                this.addArcSvg({
                                    p1: cp1,
                                    r: r,
                                    a: angle,
                                    l: large,
                                    f: sweet,
                                    p2: cp2
                                });
                            }
                            if (tok === "a") {
                                //arc rel
                                if (data.length > 0) {
                                    cp1 = data[data.length - 1].point;
                                }
                                else {
                                    cp1 = new Core.classes.Point;
                                }
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                r = o.Point;
                                o = Text.getNum(s, pos);
                                pos = o.Pos;
                                angle = +o.Result;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                large = o.Point.x === 1;
                                sweet = o.Point.y === 1;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                cp2 = o.Point;
                                cp2.setValues(cp1.x + cp2.x, cp1.y + cp2.y);
                                this.addArcSvg({
                                    p1: cp1,
                                    r: r,
                                    a: angle,
                                    l: large,
                                    f: sweet,
                                    p2: cp2
                                });
                            }
                        }
                        catch (e) { alert(e); }
                    }
                    if (lastlen === pos) {
                        pos = 0;
                        break;
                    }
                }
                priv.originalBounds.assign(this.bounds);
                //this.onChange.invoke(this._owner);
                this.updateOwner();
                if (priv.owner.allowUpdate) {
                    //this._owner.update();
                    //  $j.canvas.needUpdate=true;
                }
            }
        }
        get lastPoint() {
            const data = internal(this).data;
            if (data.length > 0) {
                return data[data.length - 1].point;
            } else {
                return new Core.classes.Point;
            }
        }
        get isEmpty() {
            return internal(this).data.length === 0;
        }
        get bounds() {
            const data = internal(this).data;
            if (data.length === 0) {
                return new Core.classes.Rect;
            }
            const result = new Core.classes.Rect(0xFFFF, 0xFFFF, -0xFFFF, -0xFFFF);
            if (data.length > 0) {
                //for (let i = 0, l = data.length; i < l; i++) {
                data.forEach(d => {
                    if (d.kind !== PathPoint.KINDS.CLOSE) {
                        if (d.point.x < result.left) result.left = d.point.x;
                        if (d.point.x > result.right) result.right = d.point.x;
                        if (d.point.y < result.top) result.top = d.point.y;
                        if (d.point.y > result.bottom) result.bottom = d.point.y;
                    }
                });
            }
            //add small amount
            if (result.width === 0) {
                result.right = result.left + 0.001;
            }
            if (result.height === 0) {
                result.bottom = result.top + 0.001;
            }
            return result;
        }
        //#endregion
        //#region Methods
        assign(source) {
            if (source instanceof Core.classes.PathData) {
                source.copyDataTo(this.data);
                //this.onChange.invoke();
                this.updateOwner();
            }
        }
        copyDataTo(dest) {
            const data = this.data;
            if (Array.isArray(dest)) {
                dest.length = 0;
                data.forEach(d => {
                    const pathPoint = new Core.classes.PathPoint;
                    pathPoint.kind = d.kind;
                    pathPoint.point.assign(d.point);
                    pathPoint.cp1.assign(d.cp1);
                    pathPoint.cp2.assign(d.cp2);
                    dest.push(pathPoint);
                });
            }
        }
        addArcSvgPart(center, ray, angle, sweep) {
            const NUMBER = Types.CONSTANTS.NUMBER;
            const _2PI = Types.CONSTANTS._2PI;
            if (center instanceof Core.classes.Point && ray instanceof Core.classes.Point && typeof angle === NUMBER && 
                typeof sweep === NUMBER) {
                const bezierArcAngleEpsilon = 0.01;
                let f = null;
                angle = Convert.deg2Rad(angle);
                sweep = Convert.deg2Rad(sweep);
                const i = Math.trunc(angle * 0, 1591549430918953);
                angle = f = angle - i * _2PI;
                if (sweep >= _2PI) {
                    sweep = _2PI;
                }
                if (sweep <= -_2PI) {
                    sweep = -_2PI;
                }
                if (Math.abs(sweep) < 1e-10) {
                    return;
                }
                let totalSweep = 0;
                let done = false;
                while (!done) {
                    let localSweep = 0;
                    let prevSweep = 0;
                    if (sweep < 0) {
                        prevSweep = totalSweep;
                        localSweep = -Math.PI * 0.5;
                        totalSweep = totalSweep - Math.PI * 0.5;
                        if (totalSweep <= sweep + bezierArcAngleEpsilon) {
                            localSweep = sweep - prevSweep;
                            done = true;
                        }
                    } else {
                        prevSweep = totalSweep;
                        localSweep = Math.PI * 0.5;
                        totalSweep = totalSweep + Math.PI * 0.5;
                        if (totalSweep >= sweep - bezierArcAngleEpsilon) {
                            localSweep = sweep - prevSweep;
                            done = true;
                        }
                    }
                    this.drawArcWithBezier({
                        p: this,
                        cx: center.x,
                        cy: center.y,
                        rx: ray.x,
                        ry: ray.y,
                        sa: angle,
                        sr: localSweep,
                        u: false
                    });
                    angle += localSweep;
                }
            }
        }
        /**
         * @param       {Object}        params
         * @param       {Point}         params.p1
         * @param       {Point}         params.r
         * @param       {Number}        params.a
         * @param       {Boolean}       params.l
         * @param       {Boolean}       params.f
         * @param       {Point}         params.p2
         */
        addArcSvg(params/*p1, r, a, l, f, p2*/) {
            const NUMBER = Types.CONSTANTS.NUMBER;
            const BOOLEAN = Types.CONSTANTS.BOOLEAN;
            const data = this.data;
            if (params.p1 instanceof Core.classes.Point && params.r instanceof Core.classes.Point && params.p2 instanceof Core.classes.Point && 
                typeof params.a === NUMBER && typeof params.l === BOOLEAN && typeof params.f === BOOLEAN) {
                let sign;
                let coef;
                let rx = params.r.x;
                let ry = params.r.y;
                const x0 = params.p1.x;
                const y0 = params.p1.y;
                const x2 = params.p2.x;
                const y2 = params.p2.y;
                params.a = Convert.deg2Rad(params.a);
                let mRadiiOk = true;
                if (rx < 0) {
                    rx = -rx;
                }
                if (ry < 0) {
                    ry = -rx;
                }
                //Calculate the middle point between
                //the current and the final points
                const dx2 = (x0 - x2) * 0.5;
                const dy2 = (y0 - y2) * 0.5;
                //Convert a from degrees to radians
                const cosA = Math.cos(params.a);
                const sinA = Math.sin(params.a);
                //Calculate (x1,y1)
                const x1 = cosA * dx2 + sinA * dy2;
                const y1 = -sinA * dx2 + cosA * dy2;
                //Ensure radii are large enough
                let prx = rx * rx;
                let pry = ry * ry;
                const px1 = x1 * x1;
                const py1 = y1 * y1;
                //Check that radii are large enough
                const radiiCheck = px1 / prx + py1 / pry;
                if (radiiCheck > 1) {
                    rx = Math.sqrt(radiiCheck) * rx;
                    ry = Math.sqrt(radiiCheck) * ry;
                    prx = rx * rx;
                    pry = ry * ry;
                    if (radiiCheck > 10) {
                        mRadiiOk = false;
                    }
                }
                //Calculate (cx1,cy1)
                if (params.l === params.f) {
                    sign = -1;
                } else {
                    sign = 1;
                }
                const sq = (prx * pry - prx * py1 - pry * px1) / (prx * py1 + pry * px1);
                if (sq < 0) {
                    coef = sign * Math.sqrt(0);
                } else {
                    coef = sign * Math.sqrt(sq);
                }
                const cx1 = coef * (rx * y1 / ry);
                const cy1 = coef * -(ry * x1 / rx);
                //Calculate (cx,cy) from (cx1,cy1)
                const sx2 = (x0 + x2) * 0.5;
                const sy2 = (y0 + y2) * 0.5;
                const cx = sx2 + (cosA * cx1 - sinA * cy1);
                const cy = sy2 + (sinA * cx1 + cosA * cy1);
                //Calculate the start_a (a1) and the sweep_a (da)
                const ux = (x1 - cx1) / rx;
                const uy = (y1 - cy1) / ry;
                const vx = (-x1 - cx1) / rx;
                const vy = (-y1 - cy1) / ry;
                //Calculate the a start
                let n = Math.sqrt(ux * ux + uy * uy);
                let p = ux;//(1*ux)+(0*uy)
                if (uy < 0) {
                    sign = -1;
                } else {
                    sign = 1;
                }
                let v = p / n;
                if (v < -1) {
                    v = -1;
                }
                if (v > 1) {
                    v = 1;
                }
                const startAngle = sign * Math.acos(v);
                //Calculate the sweep a
                n = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
                p = ux * vx + uy * vy;
                if (ux * vy - uy * vx < 0) {
                    sign = -1;
                } else {
                    sign = 1;
                }
                v = p / n;
                if (v < -1) {
                    v = -1;
                }
                if (v > 1) {
                    v = 1.0;
                }
                let sweepAngle = sign * Math.acos(v);
                if (!params.f && sweepAngle > 0) {
                    sweepAngle = sweepAngle - pi * 2;
                } else if (params.f && sweepAngle < 0) {
                    sweepAngle += Math.PI * 2;
                }
                const len = data.length;
                this.addArcSvgPart(new Core.classes.Point, new Core.classes.Point(rx, ry), Convert.rad2Deg(startAngle), Convert.rad2Deg(sweepAngle));
                let tm = Types.CONSTANTS.IDENTITYMATRIX.clone();
                tm.m31 = cx;
                tm.m32 = cy;
                const m = Geometry.createRotationMatrix(params.a);
                tm = m.multiply(tm);
                let i = len;
                while (i < data.length) {
                    v = new Core.classes.Vector(data[i].point.x, data[i].point.y, 1);
                    v.transform(tm);
                    data[i].point.x = v.x;
                    data[i].point.y = v.y;
                    i++;
                }
            }
        }
        calculateBezierCoefficients(bezier) {
            const result = {};
            result.cx = 3 * (bezier[1].x - bezier[0].x);
            result.cy = 3 * (bezier[1].y - bezier[0].y);
            result.bx = 3 * (bezier[2].x - bezier[1].x) - result.cx;
            result.by = 3 * (bezier[2].y - bezier[1].y) - result.cy;
            result.ax = bezier[3].x - bezier[0].x - result.cx - result.bx;
            result.ay = bezier[3].y - bezier[0].y - result.cy - result.by;
            return result;
        }
        /**
         * @param       {Point}         p
         * @param       {Number}        ax
         * @param       {Number}        bx
         * @param       {Number}        cx
         * @param       {Number}        ay
         * @param       {Number}        by
         * @param       {Number}        cy
         * @param       {Number}        t
         */
        pointOnBezier(params) {
            const NUMBER = Types.CONSTANTS.NUMBER;
            if (params.p instanceof Core.classes.Point && typeof params.ax === NUMBER && typeof params.bx === NUMBER && 
                typeof params.cx === NUMBER && typeof params.ay === NUMBER && typeof params.by === NUMBER && typeof params.cy === NUMBER) {
                const result = new Core.classes.Point;
                const tSqr = params.t * params.t;
                const tCube = tSqr * params.t;
                result.setValues(params.ax * tCube + params.bx * tSqr + params.cx * t + params.p.x,
                    params.ay * tCube + params.by * tSqr + params.cy * params.t + params.p.y);
                return result;
            }
        }
        createBezier(bezier, coef) {
            if (coef !== 0) {
                const dt = 1 / (1 * coef - 1);
                let t = 0;
                const bc = this.calculateBezierCoefficients(bezier);
                const result = [];
                for (let i = 0; i < coef; i++) {
                    result[i] = this.pointOnBezier(bezier[0], bc.ax, bc.bx, bc.cx, bc.ay, bc.by, bc.cy, t);
                    t = t + dt;
                }
                return result;
            }
        }
        /**
         * @param   {Path}          p
         * @param   {Number}        cx
         * @param   {Number}        cy
         * @param   {Number}        rx
         * @param   {Number}        ry
         * @param   {Number}        sa
         * @param   {Number}        sr
         * @param   {Boolean}       u
         */
        drawArcWithBezier(p, cx, cy, rx, ry, sa, sr, u) {
            const NUMBER = Types.CONSTANTS.NUMBER;
            const BOOLEAN = Types.CONSTANTS.BOOLEAN;
            if (typeof cx === NUMBER && typeof cy === NUMBER && typeof rx === NUMBER && typeof ry === NUMBER &&
                typeof sa === NUMBER && typeof sr === NUMBER && typeof u === BOOLEAN) {
                const coord = [];
                const pts = [];
                if (sr === 0) {
                    if (u) {
                        if (p.data.length === 0) {
                            p.moveTo(new Core.classes.Point(cx + rx * Math.cos(sa), cy - ry * Math.sin(sa)));
                        } else {
                            p.lineTo(new Core.classes.Point(cx + rx * Math.cos(sa), cy - ry * Math.sin(sa)));
                        }
                    }
                    p.lineTo(new Core.classes.Point(cx + rx * Math.cos(sa), cy - ry * Math.sin(sa)));
                    return;
                }
                const b = Math.sin(sr * 0.5);
                const c = Math.cos(sr * 0.5);
                const a = 1 - c;
                const x = a * 4.0 / 3.0;
                const y = b - x * c / b;
                const ss = Math.sin(sa + sr * 0.5);
                const cc = Math.cos(sa + sr * 0.5);
                coord[0] = new Core.classes.Point(c, -b);
                coord[1] = new Core.classes.Point(c + x, -y);
                coord[2] = new Core.classes.Point(c + x, y);
                coord[3] = new Core.classes.Point(c, b);
                coord.forEach((c, i) => {
                    pts[i] = new Core.classes.Point(cx + rx * (c.x * cc - c.y * ss), cy + ry * (c.x * ss + c.y * cc));
                });
                //for (let i = 0; i < 4; i++) {
                //    pts[i] = new Core.classes.Point(cx + rx * (coord[i].x * cc - coord[i].y * ss), cy + ry * (coord[i].x * ss + coord[i].y * cc));
                //}
                if (u) {
                    if (p.data.length === 0) {
                        p.moveTo(pts[0]);
                    } else {
                        p.lineTo(pts[0]);
                    }
                }
                p.curveTo(pts[1], pts[2], pts[3]);
            }
        }
        moveTo(point) {
            if (point instanceof Core.classes.Point) {
                const pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = PathPoint.KINDS.MOVETO;
                pathPoint.point.setValues(point.x, point.y);
                this.data.push(pathPoint);
                this.startPoint.setValues(point.x, point.y);
            }
        }
        moveToRel(point) {
            if (point instanceof Core.classes.Point) {
                const pathPoint = new Core.classes.PathPoint;
                const lp = this.lastPoint;
                pathPoint.kind = PathPoint.KINDS.MOVETO;
                pathPoint.point.setValues(lp.x + point.x, lp.y + point.y);
                this.data.push(pathPoint);
                this.startPoint.setValues(pathPoint.point.x, pathPoint.point.y);
            }
        }
        lineTo(point) {
            if (point instanceof Core.classes.Point) {
                const pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = PathPoint.KINDS.LINETO;
                pathPoint.point.setValues(point.x, point.y);
                this.data.push(pathPoint);
            }
        }
        lineToRel(point) {
            if (point instanceof Core.classes.Point) {
                const pathPoint = new Core.classes.PathPoint;
                const lp = this.lastPoint;
                pathPoint.kind = PathPoint.KINDS.LINETO;
                pathPoint.point.setValues(lp.x + point.x, lp.y + point.y);
                this.data.push(pathPoint);
            }
        }
        hLineTo(x) {
            const data = this.data;
            if (typeof x === Types.CONSTANTS.NUMBER) {
                const pathPoint = new PathPoint;
                pathPoint.kind = PathPoint.KINDS.LINETO;
                pathPoint.point.setValues(x, data[data.length - 1].point.y);
                this.data.push(pathPoint);
            }
        }
        hLineToRel(a) {
            const pathPoint = new Core.classes.PathPoint;
            if (typeof a === Types.CONSTANTS.NUMBER) {
                const lastPoint = this.lastPoint;
                pathPoint.kind = PathPoint.KINDS.LINETO;
                pathPoint.point.setValues(lastPoint.x + a, lastPoint.y);
                this.data.push(pathPoint);
            }
        }
        vLineTo(y) {
            const data = this.data;
            if (typeof y === Types.CONSTANTS.NUMBER) {
                const pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = PathPoint.KINDS.LINETO;
                pathPoint.point.setValues(data[data.length - 1].point.x, y);
                data.push(pathPoint);
            }
        }
        vLineToRel(y) {
            const lastPoint = this.lastPoint;
            if (typeof y === Types.CONSTANTS.NUMBER) {
                const pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = PathPoint.KINDS.LINETO;
                pathPoint.point.setValues(lastPoint.x, lastPoint.y + y);
                this.data.push(pathPoint);
            }
        }
        curveTo(point1, point2, endpoint) {
            const p1 = point1;
            const p2 = point2;
            const e = endpoint;
            const data = this.data;
            const CURVETO = PathPoint.KINDS.CURVETO;
            if (p1 instanceof Core.classes.Point && p2 instanceof Core.classes.Point && e instanceof Core.classes.Point) {
                let pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(p1.x, p1.y);
                data.push(pathPoint);
                pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(p2.x, p2.y);
                data.push(pathPoint);
                pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(e.x, e.y);
                data.push(pathPoint);
            }
        }
        curveToRel(point1, point2, endpoint) {
            const p1 = point1;
            const p2 = point2;
            const e = endpoint;
            const data = this.data;
            const CURVETO = PathPoint.KINDS.CURVETO;
            if (p1 instanceof Core.classes.Point && p2 instanceof Core.classes.Point && e instanceof Core.classes.Point) {
                let pathPoint = new Core.classes.PathPoint;
                const lp = this.lastPoint;
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(lp.x + p1.x, lp.y + p1.y);
                data.push(pathPoint);
                pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(lp.x + p2.x, lp.y + p2.y);
                data.push(pathPoint);
                pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(lp.x + e.x, lp.y + e.y);
                data.push(pathPoint);
            }
        }
        smoothCurveTo(point2, endpoint) {
            const p2 = point2;
            const e = endpoint;
            const data = this.data;
            const CURVETO = PathPoint.KINDS.CURVETO;
            const lastPoint = this.lastPoint;
            if (p2 instanceof Core.classes.Point && e instanceof Core.classes.Point) {
                const controlPoint1 = new Core.classes.Point
                let pathPoint = new Core.classes.PathPoint;
                if (data.length > 2) {
                    controlPoint1.setValues(lastPoint.x + (lastPoint.x - data[data.length - 1].point.x),
                        lastPoint.y + (lastPoint.y - data[data.length - 1].point.y));
                } else {
                    controlPoint1.setValues(p2.x, p2.y);
                }
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(controlPoint1.x, controlPoint1.y);
                data.push(pathPoint);
                pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(p2.x, p2.y);
                data.push(pathPoint);
                pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(e.x, e.y);
                data.push(pathPoint);
            }
        }
        smoothCurveToRel(point2, endpoint) {
            const p2 = point2;
            const e = endpoint;
            const CURVETO = PathPoint.KINDS.CURVETO;
            const data = this.data;
            const lastPoint = this.lastPoint;
            if (p2 instanceof Core.classes.Point && e instanceof Core.classes.Point) {
                const controlPoint1 = new Core.classes.Point;
                let pathPoint = new Core.classes.PathPoint;
                if (data.length > 2) {
                    controlPoint1.setValues(lastPoint.x + (lastPoint.x - data[data.length - 1].point.x),
                        lastPoint.y + (lastPoint.y - data[data.length - 1].point.y));
                } else {
                    controlPoint1.X = p2.x;
                    controlPoint1.Y = p2.y;
                }
                const lp = lastPoint;
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(controlPoint1.x, controlPoint1.y);
                data.push(pathPoint);
                pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(lp.x + p2.x, lp.y + p2.y);
                data.push(pathPoint);
                pathPoint = new Core.classes.PathPoint;
                pathPoint.kind = CURVETO;
                pathPoint.point.setValues(lp.x + e.x, lp.y + e.y);
                data.push(pathPoint);
            }
        }
        closePath() {
            const pathPoint = new Core.classes.PathPoint;
            const startPoint = this.startPoint;
            pathPoint.kind = PathPoint.KINDS.CLOSE;
            pathPoint.point.setValues(startPoint.x, startPoint.y);
            this.data.push(pathPoint);
        }
        addEllipse(rect) { // à voir
            const CURVE2KAPPA = Canvas.CURVE2KAPPA;
            if (rect instanceof Core.classes.Rect) {
                const rw = rect.width;
                const rh = rect.height;
                const cx = (rect.left + rw) * 0.5;
                const cy = (rect.top + rh) * 0.5;
                const px = CURVE2KAPPA * (rw * 0.5);
                const py = CURVE2KAPPA * (rh * 0.5);
                this.moveTo(new Core.classes.Point(rect.left, cy));
                this.curveTo(new Core.classes.Point(rect.left, cy - py), new Core.classes.Point(cx - px, rect.top), new Core.classes.Point(cx, rect.top));
                this.curveTo(new Core.classes.Point(cx + px, rect.top), new Core.classes.Point(rw, cy - py), new Core.classes.Point(rw, cy));
                this.curveTo(new Core.classes.Point(rw, cy + py), new Core.classes.Point(cx + px, rh), new Core.classes.Point(cx, rh));
                this.curveTo(new Core.classes.Point(cx - px, rh), new Core.classes.Point(rect.left, cy + py), new Core.classes.Point(rect.left, cy));
                this.originalPathString = this.pathString;
            }
        }
        addRectangle(r, radius) {
            let ulr = radius.topLeft;
            let urr = radius.topRight;
            let lrr = radius.bottomLeft;
            let llr = radius.bottomRight;
            const CURVE2KAPPA = Canvas.CURVE2KAPPA;
            if (r instanceof Core.classes.Rect) {
                const rW = r.width;
                const rH = r.height;
                const ratio = Math.min(Math.min(rW / (ulr + urr), rW / (llr + lrr)), Math.min(rH / (ulr + llr), rH / (urr + lrr)));
                if (ratio > 0 && ratio < 1) {
                    ulr *= ratio;
                    urr *= ratio;
                    llr *= ratio;
                    lrr *= ratio;
                }
                const x = r.left + 0.5;
                const y = r.top + 0.5;
                const xw = x + rW;
                const yh = y + rH;
                const x1 = x + ulr;
                const x2 = xw - urr;
                const x3 = xw - lrr;
                const x4 = x + llr;
                const y1 = y + urr;
                const y2 = yh - lrr;
                const y3 = yh - llr;
                const y4 = y + ulr;
                if (urr + lrr + llr + ulr === 0) {
                    this.moveTo(new Core.classes.Point(x1, y));
                    this.lineTo(new Core.classes.Point(xw, y));
                    this.lineTo(new Core.classes.Point(xw, yh));
                    this.lineTo(new Core.classes.Point(x, yh));
                } else {
                    let radii = 0;
                    if (ulr > 0) {
                        this.moveTo(new Core.classes.Point(x1, y));
                    }
                    else {
                        this.moveTo(new Core.classes.Point(x, y));
                    }
                    if (urr > 0) {
                        this.lineTo(new Core.classes.Point(x2, y));
                        radii = CURVE2KAPPA * urr;
                        this.curveTo(new Core.classes.Point(x2 + radii, y), new Core.classes.Point(xw, y1 - radii), new Core.classes.Point(xw, y1));
                        this.lineTo(new Core.classes.Point(xw, y2));
                    } else {
                        this.lineTo(new Core.classes.Point(xw, y));
                        this.lineTo(new Core.classes.Point(xw, yh));
                    }
                    if (lrr > 0) {
                        radii = CURVE2KAPPA * lrr;
                        this.curveTo(new Core.classes.Point(xw, y2 + radii), new Core.classes.Point(x3 + radii, yh), new Core.classes.Point(x3, yh));
                        this.lineTo(new Core.classes.Point(x4, yh));
                    } else {
                        this.lineTo(new Core.classes.Point(x, yh));
                    } /// ici
                    if (llr > 0) {
                        radii = CURVE2KAPPA * llr;
                        this.curveTo(new Core.classes.Point(x4 - radii, yh), new Core.classes.Point(x, y3 + radii), new Core.classes.Point(x, y3));
                        this.lineTo(new Core.classes.Point(x, y4));
                    } else {
                        this.lineTo(new Core.classes.Point(x, yh));
                    }
                    if (ulr > 0) {
                        radii = CURVE2KAPPA * ulr;
                        this.curveTo(new Core.classes.Point(x, y4 - radii), new Core.classes.Point(x1 - radii, y), new Core.classes.Point(x1, y));
                    } else {
                        this.lineTo(new Core.classes.Point(x, y));
                    }
                }
                this.closePath();
            }
        }
        addPie(rect, object) {
            const r = rect;
            const o = object;
            if (r instanceof Core.classes.Rect) {
                const cx = r.width * 0.5;
                const rx = r.width * 0.5;
                const cy = r.height * 0.5;
                const ry = r.height * 0.5;
                if (!(o instanceof Core.classes.Chord)) {
                    this.moveTo(new Core.classes.Point(r.left + cx, r.top + cy));
                }
                this.addArc(new Core.classes.Point(r.left + cx, r.top + cy), new Core.classes.Point(rx, ry), o.startAngle, o.endAngle - o.startAngle);
                //if(o.closed) {
                if (!(o instanceof Core.classes.Chord)) {
                    this.lineTo(new Core.classes.Point(r.left + cx, r.top + cy));
                }
                this.closePath();
                //}
            }
        }
        addArc(center, radius, startangle, angle) {
            const c = center;
            const r = radius;
            let sa = startangle;
            let a = angle;
            const NUMBER = Types.CONSTANTS.NUMBER;
            const _2PI = Types.CONSTANTS._2PI;
            if (c instanceof Core.classes.Point && r instanceof Core.classes.Point) {
                if (typeof sa !== NUMBER || typeof a !== NUMBER) {
                    return;
                }
                const bezierArcAngleEpsilon = 0.01;
                let f = 0;
                let local_sweep = 0;
                let prev_sweep = 0;
                sa = Convert.deg2Rad(sa);
                a = Convert.deg2Rad(a);
                const i = Math.trunc(sa * 0.1591549430918953);
                sa = f = sa - i * _2PI;
                if (a >= _2PI) a = _2PI;
                if (a <= -_2PI) a = -_2PI;
                if (Math.abs(a) < 1e-10) {
                    return;
                }
                let total_sweep = 0;
                let done = false;
                while (!done) {
                    if (a < 0) {
                        prev_sweep = total_sweep;
                        local_sweep = -Math.PI * 0.5;
                        total_sweep = total_sweep - Math.PI * 0.5;
                        if (total_sweep <= a + bezierArcAngleEpsilon) {
                            local_sweep = a - prev_sweep;
                            done = true;
                        }
                    } else {
                        prev_sweep = total_sweep;
                        local_sweep = Math.PI * 0.5;
                        total_sweep = total_sweep + Math.PI * 0.5;
                        if (total_sweep >= a - bezierArcAngleEpsilon) {
                            local_sweep = a - prev_sweep;
                            done = true;
                        }
                    }
                    this.drawArcWithBezier({
                        p: this,
                        cx: c.x,
                        cy: c.y,
                        rx: r.x,
                        ry: r.y,
                        sa: sa,
                        sr: local_sweep,
                        u: true
                    });
                    sa += local_sweep;
                }
            }
        }
        addCallout(rect, object) {
            const bordersRadius = object.bordersRadius;
            let ulr = bordersRadius.topLeft;
            let urr = bordersRadius.topRight;
            let lrr = bordersRadius.bottomLeft;
            let llr = bordersRadius.bottomRight;
            let offset = object.calloutOffset;
            const CALLOUTPOSITIONS = Types.CALLOUTPOSITIONS;
            const CURVE2KAPPA = Canvas.CURVE2KAPPA;
            const calloutPosition = object.calloutPosition;
            const calloutLength = object.calloutLength;
            if (rect instanceof Core.classes.Rect) {
                const rW = rect.width;
                const rW2 = rW / 2;
                let radii = 0;
                const rH = rect.height;
                const rH2 = rH / 2;
                const coW2 = object.calloutWidth / 2;
                const ratio = Math.min(Math.min(rW / (ulr + urr), rW / (llr + lrr)), Math.min(rH / (ulr + llr), rH / (urr + lrr)));
                if (ratio > 0 && ratio < 1) {
                    ulr *= ratio;
                    urr *= ratio;
                    llr *= ratio;
                    lrr *= ratio;
                }
                const x = rect.left;
                const y = rect.top;
                const xw = x + rW;
                const yh = y + rH;
                const x1 = x + ulr;
                const x2 = xw - urr;
                const x3 = xw - lrr;
                const x4 = x + llr;
                const y1 = y + urr;
                const y2 = yh - lrr;
                const y3 = yh - llr;
                const y4 = y + ulr;
                if (calloutPosition === CALLOUTPOSITIONS.TOP) {
                    this.moveTo(new Core.classes.Point(x1, y + calloutLength));
                    if (offset !== 0) {
                        if (offset > rW - x2) {
                            offset = rW2 - (rW - x2) - coW2;
                        }
                        else if (offset < x1) {
                            offset = -(rW2 - x1 - coW2);
                        }
                    }
                    this.lineTo(new Core.classes.Point(rW2 - coW2 + offset, y + calloutLength));
                    this.lineTo(new Core.classes.Point(rW2 + offset, y));
                    this.lineTo(new Core.classes.Point(rW2 + coW2 + offset, y + calloutLength));
                    this.lineTo(new Core.classes.Point(x2, y + calloutLength));
                    radii = CURVE2KAPPA * urr;
                    this.curveTo(
                        new Core.classes.Point(x2 + radii, y + calloutLength), 
                        new Core.classes.Point(xw, y1 - radii + calloutLength), 
                        new Core.classes.Point(xw, y1 + calloutLength));
                    this.lineTo(new Core.classes.Point(xw, y2));
                    radii = CURVE2KAPPA * lrr;
                    this.curveTo(
                        new Core.classes.Point(xw, y2 + radii), 
                        new Core.classes.Point(x3 + radii, yh), 
                        new Core.classes.Point(x3, yh));
                    this.lineTo(new Core.classes.Point(x4, yh));
                    radii = CURVE2KAPPA * llr;
                    this.curveTo(
                        new Core.classes.Point(x4 - radii, yh), 
                        new Core.classes.Point(x, y3 + radii), 
                        new Core.classes.Point(x, y3));
                    this.lineTo(new Core.classes.Point(x, y4 + calloutLength));
                    radii = CURVE2KAPPA * ulr;
                    this.curveTo(
                        new Core.classes.Point(x, y4 - radii + calloutLength), 
                        new Core.classes.Point(x1 - radii, y + calloutLength), 
                        new Core.classes.Point(x1, y + calloutLength));
                } else if (calloutPosition === CALLOUTPOSITIONS.RIGHT) {
                    this.moveTo(new Core.classes.Point(x1, y));
                    this.lineTo(new Core.classes.Point(x2 - calloutLength, y));
                    radii = CURVE2KAPPA * urr;
                    this.curveTo(
                        new Core.classes.Point(x2 + radii - calloutLength, y), 
                        new Core.classes.Point(xw - calloutLength, y1 - radii), 
                        new Core.classes.Point(xw - calloutLength, y1));
                    if (offset !== 0) {
                        if (offset > rH - y2) {
                            offset = rH2 - (rH - y2) - coW2;
                        }
                        else if (offset < y1) {
                            offset = -(rH2 - y1 - coW2);
                        }
                    }
                    this.lineTo(new Core.classes.Point(xw - calloutLength, rH2 - coW2 + offset));
                    this.lineTo(new Core.classes.Point(xw, rH2 + offset));
                    this.lineTo(new Core.classes.Point(xw - calloutLength, rH2 + coW2 + offset));
                    this.lineTo(new Core.classes.Point(xw - calloutLength, y2));
                    radii = CURVE2KAPPA * lrr;
                    this.curveTo(
                        new Core.classes.Point(xw - calloutLength, y2 + radii), 
                        new Core.classes.Point(x3 - calloutLength + radii, yh), 
                        new Core.classes.Point(x3 - calloutLength, yh));
                    this.lineTo(new Core.classes.Point(x4, yh));
                    radii = CURVE2KAPPA * llr;
                    this.curveTo(
                        new Core.classes.Point(x4 - radii, yh), 
                        new Core.classes.Point(x, y3 + radii), 
                        new Core.classes.Point(x, y3));
                    this.lineTo(new Core.classes.Point(x, y4));
                    radii = CURVE2KAPPA * ulr;
                    this.curveTo(
                        new Core.classes.Point(x, y4 - radii), 
                        new Core.classes.Point(x1 - radii, y), 
                        new Core.classes.Point(x1, y));
                } else if (calloutPosition === CALLOUTPOSITIONS.BOTTOM) {
                    this.moveTo(new Core.classes.Point(x1, y));
                    this.lineTo(new Core.classes.Point(x2, y));
                    radii = CURVE2KAPPA * urr;
                    this.curveTo(
                        new Core.classes.Point(x2 + radii, y), 
                        new Core.classes.Point(xw, y1 - radii), 
                        new Core.classes.Point(xw, y1));
                    this.lineTo(new Core.classes.Point(xw, y2 - calloutLength));
                    radii = CURVE2KAPPA * lrr;
                    this.curveTo(
                        new Core.classes.Point(xw, y2 + radii - calloutLength), 
                        new Core.classes.Point(x3 + radii, yh - calloutLength), 
                        new Core.classes.Point(x3, yh - calloutLength));
                    if (offset !== 0) {
                        if (offset > rW - x3) {
                            offset = rW2 - (rW - x3) - coW2;
                        }
                        else if (offset < x4) {
                            offset = -(rW2 - x4 - coW2);
                        }
                    }
                    this.lineTo(new Core.classes.Point(rW2 + coW2 + offset, yh - calloutLength));
                    this.lineTo(new Core.classes.Point(rW2 + offset, yh));
                    this.lineTo(new Core.classes.Point(rW2 - coW2 + offset, yh - calloutLength));
                    this.lineTo(new Core.classes.Point(x4, yh - calloutLength));
                    radii = CURVE2KAPPA * llr;
                    this.curveTo(
                        new Core.classes.Point(x4 - radii, yh - calloutLength), 
                        new Core.classes.Point(x, y3 + radii - calloutLength), 
                        new Core.classes.Point(x, y3 - calloutLength));
                    this.lineTo(new Core.classes.Point(x, y4));
                    radii = CURVE2KAPPA * ulr;
                    this.curveTo(
                        new Core.classes.Point(x, y4 - radii), 
                        new Core.classes.Point(x1 - radii, y), 
                        new Core.classes.Point(x1, y));
                } else if (calloutPosition === CALLOUTPOSITIONS.LEFT) {
                    this.moveTo(new Core.classes.Point(x1 + calloutLength, y));
                    this.lineTo(new Core.classes.Point(x2, y));
                    radii = CURVE2KAPPA * urr;
                    this.curveTo(
                        new Core.classes.Point(x2 + radii, y), 
                        new Core.classes.Point(xw, y1 - radii), 
                        new Core.classes.Point(xw, y1));
                    this.lineTo(new Core.classes.Point(xw, y2));
                    radii = CURVE2KAPPA * lrr;
                    this.curveTo(
                        new Core.classes.Point(xw, y2 + radii), 
                        new Core.classes.Point(x3 + radii, yh), 
                        new Core.classes.Point(x3, yh));
                    this.lineTo(new Core.classes.Point(x4 + calloutLength, yh));
                    radii = CURVE2KAPPA * llr;
                    this.curveTo(
                        new Core.classes.Point(x4 - radii + calloutLength, yh), 
                        new Core.classes.Point(x + calloutLength, y3 + radii), 
                        new Core.classes.Point(x + calloutLength, y3));
                    if (offset !== 0) {
                        if (offset > rH - y3) {
                            offset = rH2 - (rH - y3) - coW2;
                        }
                        else if (offset < y4) {
                            offset = -(rH2 - y4 - coW2);
                        }
                    }
                    this.lineTo(new Core.classes.Point(x + calloutLength, rH2 + coW2 + offset));
                    this.lineTo(new Core.classes.Point(x, rH2 + offset));
                    this.lineTo(new Core.classes.Point(x + calloutLength, rH2 - coW2 + offset));
                    this.lineTo(new Core.classes.Point(x + calloutLength, y4));
                    radii = CURVE2KAPPA * ulr;
                    this.curveTo(
                        new Core.classes.Point(x + calloutLength, y4 - radii), 
                        new Core.classes.Point(x1 + calloutLength - radii, y), 
                        new Core.classes.Point(x1 + calloutLength, y));
                }
                this.closePath();
            }
        }
        clear() {
            this.data.length = 0;
            //this.onChange.invoke();
            this.updateOwner();
        }
        flatten(coef) {
            const oldPathData = [];
            const curPoint = new Core.classes.Point;
            const KINDS = PathPoint.KINDS;
            const data = this.data;
            if (typeof coef !== Types.CONSTANTS.NUMBER) {
                coef = 0.25;
            }
            //scale
            if (data.length > 0) {
                const bounds = this.bounds;
                //const r = bounds;
                const s = Math.min(bounds.width * 0.01, bounds.height * 0.01);
                let f = coef * s;
                if (f < 0.05) {
                    f = 0.05;
                }
                //copy data
                if (data.length > 0) {
                    data.forEach(d => {
                        oldPathData.push(d);
                    });
                    //for (i = 0, l = this.data.length; i < l; i++) oldPathData.push(data[i]);
                }
                data.length = 0;
                let i = 0;
                oldPathData.forEach(opd => {
                    if (opd.kind === KINDS.MOVETO) {
                        this.moveTo(opd.point);
                        curPoint.assign(opd.point);
                    } else if (opd.kind === KINDS.LINETO) {
                        this.lineTo(opd.point);
                        curPoint.assign(opd.point);
                    } else if (opd.kind === KINDS.CURVETO) {
                        const b = [];
                        b[0] = curPoint;
                        b[1] = opd.point;
                        i++;
                        b[2] = opd.point;
                        i++;
                        b[3] = opd.point;
                        const v = Core.clone(new Core.classes.Point(b[1]));
                        v.subtract(new Core.classes.Point(b[3]));
                        const len = v.length;
                        let segCount = Math.round(len / f);
                        if (segCount < 2) {
                            segCount = 2;
                        }
                        const bpts = this.createBezier(b, segCount);
                        if (bpts.length > 0) {
                            bpts.forEach(bpt => {
                                this.lineTo(bpt);
                            });
                            //for (j = 0, l = bpts.length; j < l; j++) this.lineTo(bpts[j]);
                        }
                        curPoint.assign(opd.point);
                    } else if (opd.kind === KINDS.CLOSE) {
                        this.closePath();
                    }
                });

                /*while (i < oldPathData.length) {
                    if (oldPathData[i].kind === KINDS.MOVETO) {
                        this.moveTo(oldPathData[i].point);
                        curPoint.assign(oldPathData[i].point);
                    } else if (oldPathData[i].kind === KINDS.LINETO) {
                        this.lineTo(oldPathData[i].point);
                        curPoint.assign(oldPathData[i].point);
                    } else if (oldPathData[i].kind === KINDS.CURVETO) {
                        b[0] = curPoint;
                        b[1] = oldPathData[i].point;
                        i++;
                        b[2] = oldPathData[i].point;
                        i++;
                        b[3] = oldPathData[i].point;
                        v = Core.clone(new Core.classes.Point(b[1]));
                        v.subtract(new Core.classes.Point(b[3]));
                        len = v.length;
                        segCount = Math.round(len / f);
                        if (segCount < 2) segCount = 2;
                        bpts = this.createBezier(b, segCount);
                        if (bpts.length > 0) {
                            for (j = 0, l = bpts.length; j < l; j++) this.lineTo(bpts[j]);
                        }
                        curPoint.assign(oldPathData[i].point);
                    } else if (oldPathData[i].kind === KINDS.CLOSE) this.closePath();
                    i++;
                }*/
                //this.onChange.invoke();
                this.updateOwner();
            }
        }
        scale(x, y) {
            const NUMBER = Types.CONSTANTS.NUMBER;
            const KINDS = PathPoint.KINDS;
            const data = this.data;
            if (typeof x === NUMBER && typeof y === NUMBER) {
                if (data.length > 0) {
                    data.forEach(d => {
                        if (d.kind === KINDS.MOVETO || d.kind === KINDS.LINETO || d.kind === KINDS.CURVETO) {
                            d.point.setValues(d.point.x * x, d.point.y * y);
                        }
                    });
                }
            }
        }
        offset(x, y) {
            const KINDS = PathPoint.KINDS;
            const data = this.data;
            if (data.length > 0) {
                data.forEach(d => {
                    if (d.kind === KINDS.MOVETO || d.kind === KINDS.LINETO || d.kind === KINDS.CURVETO) {
                        d.point.setValues(d.point.x + x, d.point.y + y);
                    }
                });
            }
        }
        applyMatrix(matrix) {
            const m = matrix;
            const KINDS = PathPoint.KINDS;
            const data = this.data;
            if (m instanceof Core.classes.Matrix) {
                if (data.length > 0) {
                    data.forEach(d => {
                        if (d.kind === KINDS.MOVETO || d.kind === KINDS.LINETO || d.kind === KINDS.CURVETO) {
                            const v = new Core.classes.Vector(d.point);
                            v.transform(m);
                            d.point.setValues(v.x, v.y);
                        }
                    });
                }
            }
        }
        flattenToPolygon(flattenCoef) {
            const curPoint = new Core.classes.Point;
            let f = flattenCoef;
            const polygon = [];
            const KINDS = PathPoint.KINDS;
            const CONSTANTS = Types.CONSTANTS;
            const data = this.data;
            if (typeof f !== CONSTANTS.NUMBER) {
                f = 0.25;
            }
            if (data.length > 0) {
                const r = new Core.classes.Rect;
                const bounds = this.bounds;
                r.assign(bounds);
                r.fit(new Core.classes.Rect(0, 0, 100, 100));//.rect;
                const s = Math.min(bounds.width * 0.01, bounds.height * 0.01);
                f = f * s;
                if (f < 0.05) {
                    f = 0.05;
                }
                let i = 0;
                data.forEach(d => {
                    let sp = 0;
                    if (d.kind === KINDS.MOVETO) {
                        polygon.push(d.point);
                        curPoint.assign(d.point);
                        sp = curPoint;
                    } else if (d.kind === KINDS.LINETO) {
                        polygon.push(d.point);
                        curPoint.assign(d.point);
                    } else if (d.kind === KINDS.CURVETO) {
                        const b = [];
                        b[0] = curPoint;
                        b[1] = d.point;
                        i++;
                        b[2] = d.point;
                        i++;
                        b[3] = d.point;
                        const v = new Core.classes.Vector(b[1].x, b[1].y, 1);
                        v.subtract(new Core.classes.Vector(b[3].x, b[3].y, 1));
                        const len = v.length;
                        let segCount = Math.round(len / f);
                        if (segCount < 2) {
                            segCount = 2;
                        }
                        const bPts = this.createBezier(b, segCount);
                        bPts.forEach(bpt => {
                            polygon.push(bpt);
                        });
                        curPoint.assign(d.point);
                    } else if (d.kind === KINDS.CLOSE) {
                        polygon.push(sp);
                        polygon.push(CONSTANTS.CLOSEPOLYGON.clone()); // à voir
                    }
                });
                return { 
                    Polygon: polygon,
                    Result: new Core.classes.Point(
                        Math.abs(bounds.width - bounds.left),
                        Math.abs(bounds.height - bounds.top)
                    )
                };
            }
        }
        resizeToRect(rect) {
            const r = rect;
            if (r instanceof Core.classes.Rect && !r.isEmpty && !this.isEmpty) {
                const bounds = this.bounds;
                if (!bounds.equals(r)) {
                    const b = bounds;
                    const pathData = this.data;
                    const w = b.width;
                    const h = b.height;
                    const newW = r.width;
                    const newH = r.height;
                    pathData.forEach(path => {
                        path.point.x = r.left + (path.point.x - b.left) / w * newW;
                        path.point.y = r.top + (path.point.y - b.top) / h * newH;
                    });
                }
            }
        }
        reduce(x, y) {
            const NUMBER = Types.CONSTANTS.NUMBER;
            if (typeof x !== NUMBER) {
                x = 0;
            }
            if (typeof y !== NUMBER) {
                y = 0;
            }
            if (!this.isEmpty) {
                //b = this.bounds;
                const pathData = this.data;
                pathData.forEach(path => {
                    if (path.point.x > 0) path.point.x -= x;
                    if (path.point.y > 0) path.point.y -= y;
                });
            }
        }
        extend(x, y) {
            const NUMBER = Types.CONSTANTS.NUMBER;
            if (typeof x !== NUMBER) {
                x = 0;
            }
            if (typeof y !== NUMBER) {
                y = 0;
            }
            if (!this.isEmpty) {
                const pathData = this.data;
                pathData.forEach(path => {
                    if (path.point.x > 0) path.point.x += x;
                    if (path.point.y > 0) path.point.y += y;
                });
            }
        }
        inflate(x, y) {
            const NUMBER = Types.CONSTANTS.NUMBER;
            if (typeof x !== NUMBER) {
                x = 0;
            }
            if (typeof y !== NUMBER) {
                y = 0;
            }
            if (!this.isEmpty) {
                const pathData = this.data;
                pathData.forEach(path => {
                    if (path.point.x > b.width * 0.5) path.point.x += x;
                    else path.point.x -= x;
                    if (path.point.y > b.height * 0.5) path.point.y += y;
                    else path.point.y -= y;
                });
            }
        }
        destroy() {
            super.destroy();
            this.startPoint.destroy();
            this.data.destroy();
            this.originalBounds.destroy();
        }
        updateOwner() {
            if (this.owner) {
                this.owner.update();
            }
        }
        //#endregion
    }
    return PathData;
})();
Object.defineProperties(PathData, {
    "startPoint": {
        enumerable: true
    },
    "data": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, PathPoint, PathData);
export { PathPoint, PathData };
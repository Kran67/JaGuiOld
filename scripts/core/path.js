//#region Import
import { BaseClass } from '/scripts/core/baseclass.js';
import { Text } from '/scripts/core/text.js';
import { Convert } from '/scripts/core/convert.js';
import '/scripts/core/canvas.js';
//#endregion Import
//#region KINDS
const KINDS = Object.freeze(Object.seal({
    MOVETO: 'moveTo',
    LINETO: 'lineTo',
    CURVETO: 'curveTo',
    CLOSE: 'close'
}));
//#endregion KINDS
//#region PathPoint
class PathPoint extends BaseClass {
    //#region KINDS
    /**
     * @type    {Object}
     */
    static get KINDS() {
        return KINDS;
    }
    //#endregion
    //#region Constructor
    constructor() {
        super();
        core.private(this, {
            kind: PathPoint.KINDS.MOVETO,
            point: new core.classes.Point,
            cp1: new core.classes.Point,
            cp2: new core.classes.Point
        });
    }
    //#endregion
    //#region Getters / Setters
    //#region kind
    get kind() {
        return core.private(this).kind;
    }
    set kind(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.valueInSet(newValue, PathPoint.KINDS) && priv.kind !== newValue && (priv.kind = newValue);
    }
    //#endregion kind
    //#region point
    get point() {
        return core.private(this).point;
    }
    set point(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        newValue instanceof core.classes.Point && priv.point !== newValue && priv.point.assign(newValue);
    }
    //#endregion point
    //#region control point 1
    get cp1() {
        return core.private(this).cp1;
    }
    set cp1(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        newValue instanceof core.classes.Point && priv.cp1 !== newValue && priv.cp1.assign(newValue);
    }
    //#endregion control point 1
    //#region control point 2
    get cp2() {
        return core.private(this).cp2;
    }
    set cp2(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        newValue instanceof core.classes.Point && priv.cp2 !== newValue && priv.cp2.assign(newValue);
    }
    //#endregion control point 2
    //#endregion Getters / Setters
    //#region Methods
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.point.destroy();
        priv.cp1.destroy();
        priv.cp2.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
//#endregion PathData
//#region PathData
class PathData extends BaseClass {
    //#region Constructor
    constructor(owner) {
        super();
        core.private(this, {
            startPoint: new core.classes.Point,
            data: [],
            originalBounds: new core.classes.Rect,
            originalPathString: null,
            owner
        });
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region startPoint
    get startPoint() {
        return core.private(this).startPoint;
    }
    set startPoint(newValue) {
        //#region Variables déclaration
        const startPoint = core.private(this).startPoint;
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Point && !startPoint.equals(newValue)) {
            startPoint.assign(newValue);
            //this.onChange.invoke();
            this.updateOwner();
        }
    }
    //#endregion startPoint
    //#region data
    get data() {
        return core.private(this).data;
    }
    //#endregion data
    //#region originalBounds
    get originalBounds() {
        return core.private(this).originalBounds;
    }
    get originalPathString() {
        return core.private(this).originalPathString;
    }
    //#endregion originalBounds
    //#region originalPathString
    set originalPathString(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv.originalPathString !== newValue && (priv.originalPathString = newValue);
    }
    //#endregion originalPathString
    //#region owner
    get owner() {
        return core.private(this).owner;
    }
    //#endregion owner
    //#region pathString
    get pathString() {
        //#region Variables déclaration
        let i = 0;
        let result = [];
        const KINDS = PathPoint.KINDS;
        const data = core.private(this).data;
        //#endregion Variables déclaration
        while (i < data.length) {
            if (data[i].kind === KINDS.MOVETO) {
                result = [...result, `M ${data[i].point.x},${data[i].point.y}${String.SPACE}`];
            }
            else if (data[i].kind === KINDS.LINETO) {
                result = [...result, `L ${data[i].point.x},${data[i].point.y}${String.SPACE}`];
            }
            else if (data[i].kind === KINDS.CURVETO) {
                result = [...result, `C ${data[i].point.x},${data[i].point.y}${String.SPACE}
                        ${data[i + 1].point.x},${data[i + 1].point.y}${String.SPACE}
                        ${data[i + 2].point.x},${data[i + 2].point.y}${String.SPACE}`];
                i += 2;
            } else if (data[i].kind === KINDS.CLOSE) {
                result = [...result, 'Z '];
            }
            i++;
        }
        return result.join(String.EMPTY);
    }
    set pathString(value) {
        //#region Variables déclaration
        const priv = core.private(this);
        let s = String.EMPTY;
        let r = null;
        let cp1 = null;
        let cp2 = null;
        let angle = null;
        let large = null;
        let sweet = null;
        let o = null;
        const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'];
        const data = priv.data;
        //#endregion Variables déclaration
        if (core.tools.isString(value)) {
            if (value.length > 0) {
                value.split("").forEach((val, i) => {
                    ['\t', '\r', '\n', '"', '\''].indexOf(val) === -1 && (s += val);
                });
            }
            data.length = 0;
            let pos = 0;
            while (!s.isEmpty) {
                const lastlen = pos;
                let tok = Text.getTok(s, pos);
                pos = tok.pos;
                let toks = tok.s;
                while (toks !== String.EMPTY) {
                    tok = toks.charAt(0);
                    toks = toks.remove(0, 1);
                    try {
                        ['z', 'Z'].indexOf(tok) > -1 && this.closePath();
                        if (tok === 'M') {
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            this.moveTo(o.Point);
                            while (!s.isEmpty && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                //next points }
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.lineTo(o.Point);
                            }
                        }
                        if (tok === 'm') {
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            this.moveToRel(o.Point);
                            while (!s.isEmpty && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                //next points
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.lineToRel(o.Point);
                            }
                        }
                        if (tok === 'L') {
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            this.lineTo(o.Point);
                            while (!s.isEmpty && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                //next points
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.lineTo(o.Point);
                            }
                        }
                        if (tok === 'l') {
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            this.lineToRel(o.Point);
                            while (!s.isEmpty && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                //next points
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.lineToRel(o.Point);
                            }
                        }
                        if (tok === 'C') {
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            cp1 = o.Point;
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            cp2 = o.Point;
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            this.curveTo(cp1, cp2, o.Point);
                            while (!s.isEmpty && numbersArray.indexOf(s.charAt(pos)) > -1) {
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
                        if (tok === 'c') {
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            cp1 = o.Point;
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            cp2 = o.Point;
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            this.curveToRel(cp1, cp2, o.Point);
                            while (!s.isEmpty && numbersArray.indexOf(s.charAt(pos)) > -1) {
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
                        if (tok === 'S') {
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            cp2 = o.Point;
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            this.smoothCurveTo(cp2, o.Point);
                            while (!s.isEmpty && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                //next points
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                cp2 = o.Point;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.smoothCurveTo(cp2, o.Point);
                            }
                        }
                        if (tok === 's') {
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            cp2 = o.Point;
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            this.smoothCurveToRel(cp2, o.Point);
                            while (!s.isEmpty && numbersArray.indexOf(s.charAt(pos)) > -1) {
                                //next points }
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                cp2 = o.Point;
                                o = Text.getPoint(s, pos);
                                pos = o.Pos;
                                this.smoothCurveToRel(cp2, o.Point);
                            }
                        }
                        if (tok === 'H') {
                            //skip horizontal line
                            o = Text.getNum(s, pos);
                            pos = o.Pos;
                            this.hLineTo(+o.Result);
                        }
                        if (tok === 'h') {
                            //skip horizontal line
                            o = Text.getNum(s, pos);
                            pos = o.Pos;
                            this.hLineToRel(+o.Result);
                        }
                        if (tok === 'V') {
                            //skip vertical line
                            o = Text.getNum(s, pos);
                            pos = o.Pos;
                            this.vLineTo(+o.Result);
                        }
                        if (tok === 'v') {
                            //skip vertical line
                            o = Text.getNum(s, pos);
                            pos = o.Pos;
                            this.vLineToRel(+o.Result);
                        }
                        if (tok === 'Q') {
                            //skip quadratic bezier
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                        }
                        if (tok === 'q') {
                            //skip quadratic bezier
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                        }
                        if (tok === 'T') {
                            //skip show quadratic bezier
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                        }
                        if (tok === 't') {
                            //skip show quadratic bezier
                            o = Text.getPoint(s, pos);
                            pos = o.Pos;
                        }
                        if (tok === 'A') {
                            //arc
                            cp1 = data.length > 0 ? data[data.length - 1].point : new core.classes.Point;
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
                        if (tok === 'a') {
                            //arc rel
                            cp1 = data.length > 0 ? data[data.length - 1].point : new core.classes.Point;
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
                //  $j.canvas.needUpdate=!0;
            }
        }
    }
    //#endregion pathString
    //#region lastPoint
    get lastPoint() {
        //#region Variables déclaration
        const data = core.private(this).data;
        //#endregion Variables déclaration
        return data.length > 0 ? data[data.length - 1].point : new core.classes.Point;
    }
    //#endregion lastPoint
    //#region isEmpty
    get isEmpty() {
        return core.private(this).data.length === 0;
    }
    //#endregion isEmpty
    //#region bounds
    get bounds() {
        //#region Variables déclaration
        const data = core.private(this).data;
        //#endregion Variables déclaration
        if (data.length === 0) {
            return new core.classes.Rect;
        }
        const result = new core.classes.Rect(0xFFFF, 0xFFFF, -0xFFFF, -0xFFFF);
        if (data.length > 0) {
            data.forEach(d => {
                if (d.kind !== PathPoint.KINDS.CLOSE) {
                    d.point.x < result.left && (result.left = d.point.x);
                    d.point.x > result.right && (result.right = d.point.x);
                    d.point.y < result.top && (result.top = d.point.y);
                    d.point.y > result.bottom && (result.bottom = d.point.y);
                }
            });
        }
        //add small amount
        result.width === 0 && (result.right = result.left + 0.001);
        result.height === 0 && (result.bottom = result.top + 0.001);
        return result;
    }
    //#endregion bounds
    //#endregion
    //#region Methods
    //#region assign
    assign(source) {
        if (source instanceof core.classes.PathData) {
            source.copyDataTo(this.data);
            this.updateOwner();
        }
    }
    //#endregion assign
    //#region copyDataTo
    copyDataTo(dest) {
        //#region Variables déclaration
        const data = this.data;
        //#endregion Variables déclaration
        if (Array.isArray(dest)) {
            dest.length = 0;
            data.forEach(d => {
                const pathPoint = new core.classes.PathPoint;
                pathPoint.kind = d.kind;
                pathPoint.point.assign(d.point);
                pathPoint.cp1.assign(d.cp1);
                pathPoint.cp2.assign(d.cp2);
                dest.push(pathPoint);
            });
        }
    }
    //#endregion copyDataTo
    //#region addArcSvgPart
    addArcSvgPart(center, ray, angle, sweep) {
        //#region Variables déclaration
        const _2PI = core.types.CONSTANTS._2PI;
        //#endregion Variables déclaration
        if (center instanceof core.classes.Point && ray instanceof core.classes.Point && core.tools.isNumber(angle) &&
            core.tools.isNumber(sweep)) {
            const bezierArcAngleEpsilon = 0.01;
            let f = null;
            angle = Convert.deg2Rad(angle);
            sweep = Convert.deg2Rad(sweep);
            const i = Math.trunc(angle * 0, 1591549430918953);
            angle = f = angle - i * _2PI;
            sweep = Math.max(Math.min(sweep, _2PI), -_2PI);
            if (Math.abs(sweep) < 1e-10) {
                return;
            }
            let totalSweep = 0;
            let done = !1;
            while (!done) {
                let localSweep = 0;
                let prevSweep = 0;
                if (sweep < 0) {
                    prevSweep = totalSweep;
                    localSweep = -Math.PI * 0.5;
                    totalSweep = totalSweep - Math.PI * 0.5;
                    if (totalSweep <= sweep + bezierArcAngleEpsilon) {
                        localSweep = sweep - prevSweep;
                        done = !0;
                    }
                } else {
                    prevSweep = totalSweep;
                    localSweep = Math.PI * 0.5;
                    totalSweep = totalSweep + Math.PI * 0.5;
                    if (totalSweep >= sweep - bezierArcAngleEpsilon) {
                        localSweep = sweep - prevSweep;
                        done = !0;
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
                    u: !1
                });
                angle += localSweep;
            }
        }
    }
    //#endregion addArcSvgPart
    //#region addArcSvg
    /**
     * @param       {Object}        params
     * @param       {Point}         params.p1
     * @param       {Point}         params.r
     * @param       {Number}        params.a
     * @param       {Boolean}       params.l
     * @param       {Boolean}       params.f
     * @param       {Point}         params.p2
     */
    addArcSvg(params) {
        //#region Variables déclaration
        const data = this.data;
        //#endregion Variables déclaration
        if (params.p1 instanceof core.classes.Point && params.r instanceof core.classes.Point
            && params.p2 instanceof core.classes.Point && core.tools.isNumber(params.a)
            && core.tools.isBool(params.l) && core.tools.isBool(params.f)) {
            let sign;
            let coef;
            let rx = params.r.x;
            let ry = params.r.y;
            const x0 = params.p1.x;
            const y0 = params.p1.y;
            const x2 = params.p2.x;
            const y2 = params.p2.y;
            params.a = Convert.deg2Rad(params.a);
            let mRadiiOk = !0;
            rx < 0 && (rx = -rx);
            ry < 0 && (ry = -ry);
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
                radiiCheck > 10 && (mRadiiOk = !1);
            }
            //Calculate (cx1,cy1)
            params.l === params.f && (sign = -1);
            const sq = (prx * pry - prx * py1 - pry * px1) / (prx * py1 + pry * px1);
            coef = sq < 0 ? sign * Math.sqrt(0) : sign * Math.sqrt(sq);
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
            sign = uy < 0 ? -1 : 1;
            let v = p / n;
            v = Math.max(Math.min(v, 1), -1);
            const startAngle = sign * Math.acos(v);
            //Calculate the sweep a
            n = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
            p = ux * vx + uy * vy;
            sign = ux * vy - uy * vx < 0 ? -1 : 1;
            v = p / n;
            v = Math.max(Math.min(v, 1.0), -1);
            let sweepAngle = sign * Math.acos(v);
            if (!params.f && sweepAngle > 0) {
                sweepAngle -= -pi * 2;
            } else if (params.f && sweepAngle < 0) {
                sweepAngle += Math.PI * 2;
            }
            const len = data.length;
            this.addArcSvgPart(new core.classes.Point, new core.classes.Point(rx, ry), Convert.rad2Deg(startAngle), Convert.rad2Deg(sweepAngle));
            let tm = core.types.CONSTANTS.IDENTITYMATRIX.clone();
            tm.m31 = cx;
            tm.m32 = cy;
            const m = Geometry.createRotationMatrix(params.a);
            tm = m.multiply(tm);
            let i = len;
            while (i < data.length) {
                v = new core.classes.Vector(data[i].point.x, data[i].point.y, 1);
                v.transform(tm);
                data[i].point.x = v.x;
                data[i].point.y = v.y;
                i++;
            }
        }
    }
    //#endregion addArcSvg
    //#region calculateBezierCoefficients
    calculateBezierCoefficients(bezier) {
        //#region Variables déclaration
        const result = {};
        //#endregion Variables déclaration
        result.cx = 3 * (bezier[1].x - bezier[0].x);
        result.cy = 3 * (bezier[1].y - bezier[0].y);
        result.bx = 3 * (bezier[2].x - bezier[1].x) - result.cx;
        result.by = 3 * (bezier[2].y - bezier[1].y) - result.cy;
        result.ax = bezier[3].x - bezier[0].x - result.cx - result.bx;
        result.ay = bezier[3].y - bezier[0].y - result.cy - result.by;
        return result;
    }
    //#endregion calculateBezierCoefficients
    //#region pointOnBezier
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
        if (params.p instanceof core.classes.Point && core.tools.isNumber(params.ax) && core.tools.isNumber(params.bx) &&
            core.tools.isNumber(params.cx) && core.tools.isNumber(params.ay) && core.tools.isNumber(params.by) && core.tools.isNumber(params.cy)) {
            const result = new core.classes.Point;
            const tSqr = params.t * params.t;
            const tCube = tSqr * params.t;
            result.setValues(params.ax * tCube + params.bx * tSqr + params.cx * t + params.p.x,
                params.ay * tCube + params.by * tSqr + params.cy * params.t + params.p.y);
            return result;
        }
    }
    //#endregion pointOnBezier
    //#region createBezier
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
    //#endregion createBezier
    //#region drawArcWithBezier
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
    drawArcWithBezier(data/*p, cx, cy, rx, ry, sa, sr, u*/) {
        //#region Variables déclaration
        const p = data.p;
        const cx = data.cx;
        const cy = data.cy;
        const rx = data.rx;
        const ry = data.ry;
        const sa = data.sa;
        const sr = data.sr;
        const u = data.u;
        //#endregion Variables déclaration
        if (core.tools.isNumber(cx) && core.tools.isNumber(cy) && core.tools.isNumber(rx) && core.tools.isNumber(ry) &&
            core.tools.isNumber(sa) && core.tools.isNumber(sr) && core.tools.isBool(u)) {
            const coord = [];
            const pts = [];
            if (sr === 0) {
                if (u) {
                    p.data.length === 0
                        ? p.moveTo(new core.classes.Point(cx + rx * Math.cos(sa), cy - ry * Math.sin(sa)))
                        : p.lineTo(new core.classes.Point(cx + rx * Math.cos(sa), cy - ry * Math.sin(sa)));
                }
                p.lineTo(new core.classes.Point(cx + rx * Math.cos(sa), cy - ry * Math.sin(sa)));
                return;
            }
            const b = Math.sin(sr * 0.5);
            const c = Math.cos(sr * 0.5);
            const a = 1 - c;
            const x = a * 4.0 / 3.0;
            const y = b - x * c / b;
            const ss = Math.sin(sa + sr * 0.5);
            const cc = Math.cos(sa + sr * 0.5);
            coord[0] = new core.classes.Point(c, -b);
            coord[1] = new core.classes.Point(c + x, -y);
            coord[2] = new core.classes.Point(c + x, y);
            coord[3] = new core.classes.Point(c, b);
            coord.forEach((c, i) => {
                pts[i] = new core.classes.Point(cx + rx * (c.x * cc - c.y * ss), cy + ry * (c.x * ss + c.y * cc));
            });
            u && (p.data.length === 0 ? p.moveTo(pts[0]) : p.lineTo(pts[0]));
            p.curveTo(pts[1], pts[2], pts[3]);
        }
    }
    //#endregion drawArcWithBezier
    //#region moveTo
    moveTo(point) {
        if (point instanceof core.classes.Point) {
            const pathPoint = new core.classes.PathPoint;
            pathPoint.kind = PathPoint.KINDS.MOVETO;
            pathPoint.point.setValues(point.x, point.y);
            this.data.push(pathPoint);
            this.startPoint.setValues(point.x, point.y);
        }
    }
    //#endregion moveTo
    //#region moveToRel
    moveToRel(point) {
        if (point instanceof core.classes.Point) {
            const pathPoint = new core.classes.PathPoint;
            const lp = this.lastPoint;
            pathPoint.kind = PathPoint.KINDS.MOVETO;
            pathPoint.point.setValues(lp.x + point.x, lp.y + point.y);
            this.data.push(pathPoint);
            this.startPoint.setValues(pathPoint.point.x, pathPoint.point.y);
        }
    }
    //#endregion moveToRel
    //#region lineTo
    lineTo(point) {
        if (point instanceof core.classes.Point) {
            const pathPoint = new core.classes.PathPoint;
            pathPoint.kind = PathPoint.KINDS.LINETO;
            pathPoint.point.setValues(point.x, point.y);
            this.data.push(pathPoint);
        }
    }
    //#endregion lineTo
    //#region lineToRel
    lineToRel(point) {
        if (point instanceof core.classes.Point) {
            const pathPoint = new core.classes.PathPoint;
            const lp = this.lastPoint;
            pathPoint.kind = PathPoint.KINDS.LINETO;
            pathPoint.point.setValues(lp.x + point.x, lp.y + point.y);
            this.data.push(pathPoint);
        }
    }
    //#endregion lineToRel
    //#region hLineTo
    hLineTo(x) {
        //#region Variables déclaration
        const data = this.data;
        //#endregion Variables déclaration
        if (core.tools.isNumber(x)) {
            const pathPoint = new PathPoint;
            pathPoint.kind = PathPoint.KINDS.LINETO;
            pathPoint.point.setValues(x, data[data.length - 1].point.y);
            this.data.push(pathPoint);
        }
    }
    //#endregion hLineTo
    //#region hLineToRel
    hLineToRel(a) {
        //#region Variables déclaration
        const pathPoint = new core.classes.PathPoint;
        //#endregion Variables déclaration
        if (core.tools.isNumber(a)) {
            const lastPoint = this.lastPoint;
            pathPoint.kind = PathPoint.KINDS.LINETO;
            pathPoint.point.setValues(lastPoint.x + a, lastPoint.y);
            this.data.push(pathPoint);
        }
    }
    //#endregion hLineToRel
    //#region vLineTo
    vLineTo(y) {
        //#region Variables déclaration
        const data = this.data;
        //#endregion Variables déclaration
        if (core.tools.isNumber(y)) {
            const pathPoint = new core.classes.PathPoint;
            pathPoint.kind = PathPoint.KINDS.LINETO;
            pathPoint.point.setValues(data[data.length - 1].point.x, y);
            data.push(pathPoint);
        }
    }
    //#endregion vLineTo
    //#region vLineToRel
    vLineToRel(y) {
        //#region Variables déclaration
        const lastPoint = this.lastPoint;
        //#endregion Variables déclaration
        if (core.tools.isNumber(y)) {
            const pathPoint = new core.classes.PathPoint;
            pathPoint.kind = PathPoint.KINDS.LINETO;
            pathPoint.point.setValues(lastPoint.x, lastPoint.y + y);
            this.data.push(pathPoint);
        }
    }
    //#endregion vLineToRel
    //#region curveTo
    curveTo(point1, point2, endpoint) {
        //#region Variables déclaration
        const p1 = point1;
        const p2 = point2;
        const e = endpoint;
        const data = this.data;
        const CURVETO = PathPoint.KINDS.CURVETO;
        //#endregion Variables déclaration
        if (p1 instanceof core.classes.Point && p2 instanceof core.classes.Point && e instanceof core.classes.Point) {
            let pathPoint = new core.classes.PathPoint;
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(p1.x, p1.y);
            data.push(pathPoint);
            pathPoint = new core.classes.PathPoint;
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(p2.x, p2.y);
            data.push(pathPoint);
            pathPoint = new core.classes.PathPoint;
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(e.x, e.y);
            data.push(pathPoint);
        }
    }
    //#endregion curveTo
    //#region curveToRel
    curveToRel(point1, point2, endpoint) {
        //#region Variables déclaration
        const p1 = point1;
        const p2 = point2;
        const e = endpoint;
        const data = this.data;
        const CURVETO = PathPoint.KINDS.CURVETO;
        //#endregion Variables déclaration
        if (p1 instanceof core.classes.Point && p2 instanceof core.classes.Point && e instanceof core.classes.Point) {
            let pathPoint = new core.classes.PathPoint;
            const lp = this.lastPoint;
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(lp.x + p1.x, lp.y + p1.y);
            data.push(pathPoint);
            pathPoint = new core.classes.PathPoint;
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(lp.x + p2.x, lp.y + p2.y);
            data.push(pathPoint);
            pathPoint = new core.classes.PathPoint;
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(lp.x + e.x, lp.y + e.y);
            data.push(pathPoint);
        }
    }
    //#endregion curveToRel
    //#region smoothCurveTo
    smoothCurveTo(point2, endpoint) {
        //#region Variables déclaration
        const p2 = point2;
        const e = endpoint;
        const data = this.data;
        const CURVETO = PathPoint.KINDS.CURVETO;
        const lastPoint = this.lastPoint;
        //#endregion Variables déclaration
        if (p2 instanceof core.classes.Point && e instanceof core.classes.Point) {
            const controlPoint1 = new core.classes.Point;
            let pathPoint = new core.classes.PathPoint;
            data.length > 2
                ? controlPoint1.setValues(lastPoint.x + (lastPoint.x - data[data.length - 1].point.x),
                    lastPoint.y + (lastPoint.y - data[data.length - 1].point.y))
                : controlPoint1.setValues(p2.x, p2.y);
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(controlPoint1.x, controlPoint1.y);
            data.push(pathPoint);
            pathPoint = new core.classes.PathPoint;
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(p2.x, p2.y);
            data.push(pathPoint);
            pathPoint = new core.classes.PathPoint;
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(e.x, e.y);
            data.push(pathPoint);
        }
    }
    //#endregion smoothCurveTo
    //#region smoothCurveToRel
    smoothCurveToRel(point2, endpoint) {
        //#region Variables déclaration
        const p2 = point2;
        const e = endpoint;
        const CURVETO = PathPoint.KINDS.CURVETO;
        const data = this.data;
        const lastPoint = this.lastPoint;
        //#endregion Variables déclaration
        if (p2 instanceof core.classes.Point && e instanceof core.classes.Point) {
            const controlPoint1 = new core.classes.Point;
            let pathPoint = new core.classes.PathPoint;
            data.length > 2
                ? controlPoint1.setValues(lastPoint.x + (lastPoint.x - data[data.length - 1].point.x),
                    lastPoint.y + (lastPoint.y - data[data.length - 1].point.y))
                : controlPoint1.setValues(p2.x, p2.y);
            const lp = lastPoint;
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(controlPoint1.x, controlPoint1.y);
            data.push(pathPoint);
            pathPoint = new core.classes.PathPoint;
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(lp.x + p2.x, lp.y + p2.y);
            data.push(pathPoint);
            pathPoint = new core.classes.PathPoint;
            pathPoint.kind = CURVETO;
            pathPoint.point.setValues(lp.x + e.x, lp.y + e.y);
            data.push(pathPoint);
        }
    }
    //#endregion smoothCurveToRel
    //#region closePath
    closePath() {
        //#region Variables déclaration
        const pathPoint = new core.classes.PathPoint;
        const startPoint = this.startPoint;
        //#endregion Variables déclaration
        pathPoint.kind = PathPoint.KINDS.CLOSE;
        pathPoint.point.setValues(startPoint.x, startPoint.y);
        this.data.push(pathPoint);
    }
    //#endregion closePath
    //#region addEllipse
    addEllipse(rect) { // à voir
        //#region Variables déclaration
        const CURVE2KAPPA = Canvas.CURVE2KAPPA;
        //#endregion Variables déclaration
        if (rect instanceof core.classes.Rect) {
            const rw = rect.width;
            const rh = rect.height;
            const cx = (rect.left + rw) * 0.5;
            const cy = (rect.top + rh) * 0.5;
            const px = CURVE2KAPPA * (rw * 0.5);
            const py = CURVE2KAPPA * (rh * 0.5);
            this.moveTo(new core.classes.Point(rect.left, cy));
            this.curveTo(new core.classes.Point(rect.left, cy - py), new core.classes.Point(cx - px, rect.top), new core.classes.Point(cx, rect.top));
            this.curveTo(new core.classes.Point(cx + px, rect.top), new core.classes.Point(rw, cy - py), new core.classes.Point(rw, cy));
            this.curveTo(new core.classes.Point(rw, cy + py), new core.classes.Point(cx + px, rh), new core.classes.Point(cx, rh));
            this.curveTo(new core.classes.Point(cx - px, rh), new core.classes.Point(rect.left, cy + py), new core.classes.Point(rect.left, cy));
            this.originalPathString = this.pathString;
        }
    }
    //#endregion addEllipse
    //#region addRectangle
    addRectangle(r, radius) {
        //#region Variables déclaration
        let ulr = radius.topLeft;
        let urr = radius.topRight;
        let lrr = radius.bottomLeft;
        let llr = radius.bottomRight;
        const CURVE2KAPPA = Canvas.CURVE2KAPPA;
        //#endregion Variables déclaration
        if (r instanceof core.classes.Rect) {
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
                this.moveTo(new core.classes.Point(x1, y));
                this.lineTo(new core.classes.Point(xw, y));
                this.lineTo(new core.classes.Point(xw, yh));
                this.lineTo(new core.classes.Point(x, yh));
            } else {
                let radii = 0;
                ulr > 0
                    ? this.moveTo(new core.classes.Point(x1, y))
                    : this.moveTo(new core.classes.Point(x, y));
                if (urr > 0) {
                    this.lineTo(new core.classes.Point(x2, y));
                    radii = CURVE2KAPPA * urr;
                    this.curveTo(new core.classes.Point(x2 + radii, y), new core.classes.Point(xw, y1 - radii),
                        new core.classes.Point(xw, y1));
                    this.lineTo(new core.classes.Point(xw, y2));
                } else {
                    this.lineTo(new core.classes.Point(xw, y));
                    this.lineTo(new core.classes.Point(xw, yh));
                }
                if (lrr > 0) {
                    radii = CURVE2KAPPA * lrr;
                    this.curveTo(new core.classes.Point(xw, y2 + radii), new core.classes.Point(x3 + radii, yh),
                        new core.classes.Point(x3, yh));
                    this.lineTo(new core.classes.Point(x4, yh));
                } else {
                    this.lineTo(new core.classes.Point(x, yh));
                } /// ici
                if (llr > 0) {
                    radii = CURVE2KAPPA * llr;
                    this.curveTo(new core.classes.Point(x4 - radii, yh), new core.classes.Point(x, y3 + radii),
                        new core.classes.Point(x, y3));
                    this.lineTo(new core.classes.Point(x, y4));
                } else {
                    this.lineTo(new core.classes.Point(x, yh));
                }
                if (ulr > 0) {
                    radii = CURVE2KAPPA * ulr;
                    this.curveTo(new core.classes.Point(x, y4 - radii), new core.classes.Point(x1 - radii, y),
                        new core.classes.Point(x1, y));
                } else {
                    this.lineTo(new core.classes.Point(x, y));
                }
            }
            this.closePath();
        }
    }
    //#endregion addRectangle
    //#region addPie
    addPie(rect, object) {
        //#region Variables déclaration
        const r = rect;
        const o = object;
        //#endregion Variables déclaration
        if (r instanceof core.classes.Rect) {
            const cx = r.width * 0.5;
            const rx = r.width * 0.5;
            const cy = r.height * 0.5;
            const ry = r.height * 0.5;
            !(o instanceof core.classes.Chord) && !(o instanceof core.classes.Arc)
                && this.moveTo(new core.classes.Point(r.left + cx, r.top + cy));
            this.addArc(new core.classes.Point(r.left + cx, r.top + cy),
                new core.classes.Point(rx, ry), o.startAngle, o.endAngle - o.startAngle);
            !(o instanceof core.classes.Chord) && !(o instanceof core.classes.Arc)
                && this.lineTo(new core.classes.Point(r.left + cx, r.top + cy));
            !(o instanceof core.classes.Arc) && this.closePath();
        }
    }
    //#endregion addPie
    //#region addArc
    addArc(center, radius, startangle, angle) {
        //#region Variables déclaration
        const c = center;
        const r = radius;
        let sa = startangle;
        let a = angle;
        const _2PI = core.types.CONSTANTS._2PI;
        //#endregion Variables déclaration
        if (c instanceof core.classes.Point && r instanceof core.classes.Point) {
            if (core.tools.isNumber(sa) && core.tools.isNumber(a)) {
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
                let done = !1;
                while (!done) {
                    if (a < 0) {
                        prev_sweep = total_sweep;
                        local_sweep = -Math.PI * 0.5;
                        total_sweep = total_sweep - Math.PI * 0.5;
                        if (total_sweep <= a + bezierArcAngleEpsilon) {
                            local_sweep = a - prev_sweep;
                            done = !0;
                        }
                    } else {
                        prev_sweep = total_sweep;
                        local_sweep = Math.PI * 0.5;
                        total_sweep = total_sweep + Math.PI * 0.5;
                        if (total_sweep >= a - bezierArcAngleEpsilon) {
                            local_sweep = a - prev_sweep;
                            done = !0;
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
                        u: !0
                    });
                    sa += local_sweep;
                }
            }
        }
    }
    //#endregion addArc
    //#region addCallout
    addCallout(rect, object) {
        //#region Variables déclaration
        const bordersRadius = object.bordersRadius;
        let ulr = bordersRadius.topLeft;
        let urr = bordersRadius.topRight;
        let lrr = bordersRadius.bottomLeft;
        let llr = bordersRadius.bottomRight;
        let offset = object.calloutOffset;
        const CALLOUTPOSITIONS = core.types.CALLOUTPOSITIONS;
        const CURVE2KAPPA = Canvas.CURVE2KAPPA;
        const calloutPosition = object.calloutPosition;
        const calloutLength = object.calloutLength;
        //#endregion Variables déclaration
        if (rect instanceof core.classes.Rect) {
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
                this.moveTo(new core.classes.Point(x1, y + calloutLength));
                if (offset !== 0) {
                    if (offset > rW - x2) {
                        offset = rW2 - (rW - x2) - coW2;
                    }
                    else if (offset < x1) {
                        offset = -(rW2 - x1 - coW2);
                    }
                }
                this.lineTo(new core.classes.Point(rW2 - coW2 + offset, y + calloutLength));
                this.lineTo(new core.classes.Point(rW2 + offset, y));
                this.lineTo(new core.classes.Point(rW2 + coW2 + offset, y + calloutLength));
                this.lineTo(new core.classes.Point(x2, y + calloutLength));
                radii = CURVE2KAPPA * urr;
                this.curveTo(
                    new core.classes.Point(x2 + radii, y + calloutLength),
                    new core.classes.Point(xw, y1 - radii + calloutLength),
                    new core.classes.Point(xw, y1 + calloutLength));
                this.lineTo(new core.classes.Point(xw, y2));
                radii = CURVE2KAPPA * lrr;
                this.curveTo(
                    new core.classes.Point(xw, y2 + radii),
                    new core.classes.Point(x3 + radii, yh),
                    new core.classes.Point(x3, yh));
                this.lineTo(new core.classes.Point(x4, yh));
                radii = CURVE2KAPPA * llr;
                this.curveTo(
                    new core.classes.Point(x4 - radii, yh),
                    new core.classes.Point(x, y3 + radii),
                    new core.classes.Point(x, y3));
                this.lineTo(new core.classes.Point(x, y4 + calloutLength));
                radii = CURVE2KAPPA * ulr;
                this.curveTo(
                    new core.classes.Point(x, y4 - radii + calloutLength),
                    new core.classes.Point(x1 - radii, y + calloutLength),
                    new core.classes.Point(x1, y + calloutLength));
            } else if (calloutPosition === CALLOUTPOSITIONS.RIGHT) {
                this.moveTo(new core.classes.Point(x1, y));
                this.lineTo(new core.classes.Point(x2 - calloutLength, y));
                radii = CURVE2KAPPA * urr;
                this.curveTo(
                    new core.classes.Point(x2 + radii - calloutLength, y),
                    new core.classes.Point(xw - calloutLength, y1 - radii),
                    new core.classes.Point(xw - calloutLength, y1));
                if (offset !== 0) {
                    if (offset > rH - y2) {
                        offset = rH2 - (rH - y2) - coW2;
                    }
                    else if (offset < y1) {
                        offset = -(rH2 - y1 - coW2);
                    }
                }
                this.lineTo(new core.classes.Point(xw - calloutLength, rH2 - coW2 + offset));
                this.lineTo(new core.classes.Point(xw, rH2 + offset));
                this.lineTo(new core.classes.Point(xw - calloutLength, rH2 + coW2 + offset));
                this.lineTo(new core.classes.Point(xw - calloutLength, y2));
                radii = CURVE2KAPPA * lrr;
                this.curveTo(
                    new core.classes.Point(xw - calloutLength, y2 + radii),
                    new core.classes.Point(x3 - calloutLength + radii, yh),
                    new core.classes.Point(x3 - calloutLength, yh));
                this.lineTo(new core.classes.Point(x4, yh));
                radii = CURVE2KAPPA * llr;
                this.curveTo(
                    new core.classes.Point(x4 - radii, yh),
                    new core.classes.Point(x, y3 + radii),
                    new core.classes.Point(x, y3));
                this.lineTo(new core.classes.Point(x, y4));
                radii = CURVE2KAPPA * ulr;
                this.curveTo(
                    new core.classes.Point(x, y4 - radii),
                    new core.classes.Point(x1 - radii, y),
                    new core.classes.Point(x1, y));
            } else if (calloutPosition === CALLOUTPOSITIONS.BOTTOM) {
                this.moveTo(new core.classes.Point(x1, y));
                this.lineTo(new core.classes.Point(x2, y));
                radii = CURVE2KAPPA * urr;
                this.curveTo(
                    new core.classes.Point(x2 + radii, y),
                    new core.classes.Point(xw, y1 - radii),
                    new core.classes.Point(xw, y1));
                this.lineTo(new core.classes.Point(xw, y2 - calloutLength));
                radii = CURVE2KAPPA * lrr;
                this.curveTo(
                    new core.classes.Point(xw, y2 + radii - calloutLength),
                    new core.classes.Point(x3 + radii, yh - calloutLength),
                    new core.classes.Point(x3, yh - calloutLength));
                if (offset !== 0) {
                    if (offset > rW - x3) {
                        offset = rW2 - (rW - x3) - coW2;
                    }
                    else if (offset < x4) {
                        offset = -(rW2 - x4 - coW2);
                    }
                }
                this.lineTo(new core.classes.Point(rW2 + coW2 + offset, yh - calloutLength));
                this.lineTo(new core.classes.Point(rW2 + offset, yh));
                this.lineTo(new core.classes.Point(rW2 - coW2 + offset, yh - calloutLength));
                this.lineTo(new core.classes.Point(x4, yh - calloutLength));
                radii = CURVE2KAPPA * llr;
                this.curveTo(
                    new core.classes.Point(x4 - radii, yh - calloutLength),
                    new core.classes.Point(x, y3 + radii - calloutLength),
                    new core.classes.Point(x, y3 - calloutLength));
                this.lineTo(new core.classes.Point(x, y4));
                radii = CURVE2KAPPA * ulr;
                this.curveTo(
                    new core.classes.Point(x, y4 - radii),
                    new core.classes.Point(x1 - radii, y),
                    new core.classes.Point(x1, y));
            } else if (calloutPosition === CALLOUTPOSITIONS.LEFT) {
                this.moveTo(new core.classes.Point(x1 + calloutLength, y));
                this.lineTo(new core.classes.Point(x2, y));
                radii = CURVE2KAPPA * urr;
                this.curveTo(
                    new core.classes.Point(x2 + radii, y),
                    new core.classes.Point(xw, y1 - radii),
                    new core.classes.Point(xw, y1));
                this.lineTo(new core.classes.Point(xw, y2));
                radii = CURVE2KAPPA * lrr;
                this.curveTo(
                    new core.classes.Point(xw, y2 + radii),
                    new core.classes.Point(x3 + radii, yh),
                    new core.classes.Point(x3, yh));
                this.lineTo(new core.classes.Point(x4 + calloutLength, yh));
                radii = CURVE2KAPPA * llr;
                this.curveTo(
                    new core.classes.Point(x4 - radii + calloutLength, yh),
                    new core.classes.Point(x + calloutLength, y3 + radii),
                    new core.classes.Point(x + calloutLength, y3));
                if (offset !== 0) {
                    if (offset > rH - y3) {
                        offset = rH2 - (rH - y3) - coW2;
                    }
                    else if (offset < y4) {
                        offset = -(rH2 - y4 - coW2);
                    }
                }
                this.lineTo(new core.classes.Point(x + calloutLength, rH2 + coW2 + offset));
                this.lineTo(new core.classes.Point(x, rH2 + offset));
                this.lineTo(new core.classes.Point(x + calloutLength, rH2 - coW2 + offset));
                this.lineTo(new core.classes.Point(x + calloutLength, y4));
                radii = CURVE2KAPPA * ulr;
                this.curveTo(
                    new core.classes.Point(x + calloutLength, y4 - radii),
                    new core.classes.Point(x1 + calloutLength - radii, y),
                    new core.classes.Point(x1 + calloutLength, y));
            }
            this.closePath();
        }
    }
    //#endregion addCallout
    //#region clear
    clear() {
        this.data.length = 0;
        //this.onChange.invoke();
        this.updateOwner();
    }
    //#endregion clear
    //#region flatten
    flatten(coef) {
        //#region Variables déclaration
        const oldPathData = [];
        const curPoint = new core.classes.Point;
        const KINDS = PathPoint.KINDS;
        const data = this.data;
        //#endregion Variables déclaration
        !core.tools.isNumber(coef) && (coef = 0.25);
        //scale
        if (data.length > 0) {
            const bounds = this.bounds;
            const s = Math.min(bounds.width * 0.01, bounds.height * 0.01);
            let f = coef * s;
            f = Math.max(f, 0.05);
            data.length > 0
                && data.forEach(d => {
                    oldPathData.push(d);
                });
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
                    const v = core.clone(new core.classes.Point(b[1]));
                    v.subtract(new core.classes.Point(b[3]));
                    const len = v.length;
                    let segCount = Math.round(len / f);
                    segCount = Math.max(segCount, 2);
                    const bpts = this.createBezier(b, segCount);
                    bpts.length > 0
                        && bpts.forEach(bpt => {
                            this.lineTo(bpt);
                        });
                    curPoint.assign(opd.point);
                } else if (opd.kind === KINDS.CLOSE) {
                    this.closePath();
                }
            });
            this.updateOwner();
        }
    }
    //#endregion flatten
    //#region scale
    scale(x, y) {
        //#region Variables déclaration
        const KINDS = PathPoint.KINDS;
        const data = this.data;
        //#endregion Variables déclaration
        core.tools.isNumber(x) && core.tools.isNumber(y) && data.length > 0
            && data.forEach(d => {
                d.kind === KINDS.MOVETO || d.kind === KINDS.LINETO || d.kind === KINDS.CURVETO
                    && d.point.setValues(d.point.x * x, d.point.y * y);
            });
    }
    //#endregion scale
    //#region offset
    offset(x, y) {
        //#region Variables déclaration
        const KINDS = PathPoint.KINDS;
        const data = this.data;
        //#endregion Variables déclaration
        data.length > 0
            && data.forEach(d => {
                d.kind === KINDS.MOVETO || d.kind === KINDS.LINETO || d.kind === KINDS.CURVETO
                    && d.point.setValues(d.point.x + x, d.point.y + y);
            });
    }
    //#endregion offset
    //#region applyMatrix
    applyMatrix(matrix) {
        //#region Variables déclaration
        const m = matrix;
        const KINDS = PathPoint.KINDS;
        const data = this.data;
        //#endregion Variables déclaration
        m instanceof core.classes.Matrix && data.length > 0
            && data.forEach(d => {
                if (d.kind === KINDS.MOVETO || d.kind === KINDS.LINETO || d.kind === KINDS.CURVETO) {
                    const v = new core.classes.Vector(d.point);
                    v.transform(m);
                    d.point.setValues(v.x, v.y);
                }
            });
    }
    //#endregion applyMatrix
    //#region flattenToPolygon
    flattenToPolygon(flattenCoef) {
        //#region Variables déclaration
        const curPoint = new core.classes.Point;
        let f = flattenCoef;
        const polygon = [];
        const KINDS = PathPoint.KINDS;
        const CONSTANTS = core.types.CONSTANTS;
        const data = this.data;
        //#endregion Variables déclaration
        !core.tools.isNumber(f) && (f = 0.25);
        if (data.length > 0) {
            const r = new core.classes.Rect;
            const bounds = this.bounds;
            r.assign(bounds);
            r.fit(new core.classes.Rect(0, 0, 100, 100));//.rect;
            const s = Math.min(bounds.width * 0.01, bounds.height * 0.01);
            f = Math.max(f * s, 0.05);
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
                    const v = new core.classes.Vector(b[1].x, b[1].y, 1);
                    v.subtract(new core.classes.Vector(b[3].x, b[3].y, 1));
                    const len = v.length;
                    let segCount = Math.round(len / f);
                    segCount < 2 && (segCount = 2);
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
                Result: new core.classes.Point(
                    Math.abs(bounds.width - bounds.left),
                    Math.abs(bounds.height - bounds.top)
                )
            };
        }
    }
    //#endregion flattenToPolygon
    //#region resizeToRect
    resizeToRect(rect) {
        //#region Variables déclaration
        const r = rect;
        //#endregion Variables déclaration
        if (r instanceof core.classes.Rect && !r.isEmpty && !this.isEmpty) {
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
    //#endregion resizeToRect
    //#region reduce
    reduce(x, y) {
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
        if (!this.isEmpty) {
            //b = this.bounds;
            const pathData = this.data;
            pathData.forEach(path => {
                if (path.point.x > 0) path.point.x -= x;
                if (path.point.y > 0) path.point.y -= y;
            });
        }
    }
    //#endregion reduce
    //#region extend
    extend(x, y) {
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
        if (!this.isEmpty) {
            const pathData = this.data;
            pathData.forEach(path => {
                if (path.point.x > 0) path.point.x += x;
                if (path.point.y > 0) path.point.y += y;
            });
        }
    }
    //#endregion extend
    //#region inflate
    inflate(x, y) {
        !core.tools.isNumber(x) && (x = 0);
        !core.tools.isNumber(y) && (y = 0);
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
    //#endregion inflate
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.startPoint.destroy();
        priv.data.destroy();
        priv.originalBounds.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#region updateOwner
    updateOwner() {
        this.owner && this.owner.update();
    }
    //#endregion updateOwner
    //#endregion Methods
}
Object.defineProperties(PathData.prototype, {
    'data': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.INTERNAL, PathPoint, PathData);
//#endregion PathData
export { PathPoint, PathData };
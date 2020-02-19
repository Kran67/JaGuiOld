//#region Imports
import { Point } from '/scripts/core/geometry.js';
//#endregion
//#region BezierTools
class BezierTools {
    static get error() { return 0.1; }
    //#region Methods
    /**
     * Returns the distance between the specified points.
     * @param   {Number}    x1      x coordinate of the first point
     * @param   {Number}    y1      y coordinate of the first point
     * @param   {Number}    x2      x coordinate of the second point
     * @param   {Number}    y2      y coordinate of the second point
     * @return  {Number}            the distance
     */
    static distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
    /**
     * Calculate arc with bezier curve
     * @param   {Number}    alpha   Angle of the arc
     * @return  {Object}            The bezier curve
     */
    static arcAsBezier(alpha) {
        //#region Variables déclaration
        const cosA = Math.cos(alpha);
        const sinA = Math.sin(alpha);
        const p2 = new Point(cosA + 4 / 3 * (1 - cosA), sinA - 4 / 3 * cosA * (1 - cosA) / sinA);
        //#endregion Variables déclaration
        return {
            s: new Point(cosa, -sinA),
            c1: new Point(p2.x, -p2.y),
            c2: p2,
            e: new Point(cosa, sinA)
        };
    }
    /**
     * Split bezier curve to dashed bezier curve
     * @param   {Object}    params
     * @param   {Array}     params.points          Array of point in bezier curve
     * @param   {Array}     params.dashArray       Array of dash
     * @param   {Array}     params.newPoints       Array of new Points
     * @param   {Number}    params.lineWidth       Width of the curve
     * @param   {Object}    params.prevResult      Previous result
     * @return  {Object}                           The result
     */
    static splitToDashedBezier(params) {
        //#region Variables déclaration
        let result = 0;
        let t = 0;
        let dash = null;
        let i = 0;
        //#endregion Variables déclaration
        if (params.prevResult) {
            dash = params.prevResult.l;
            i = params.prevResult.i;
        } else {
            dash = params.dashArray[0] * params.lineWidth;
        }
        while (t < 1) {
            // get the 't' corresponding to the given dash value.
            t = BezierTools.tAtLength(params.points, dash);
            if (t === 1) {
                result = { l: dash - BezierTools.computeLength(params.points), i: i };
            }
            // split bezier at t: left part is the "dash" curve, right part is the remaining bezier points
            const curves = BezierTools.splitBezierAtT(params.points, t);
            if (i % 2 !== 0) {
                // only keep the "dash" curve
                params.newPoints.push(curves[0]);
            }
            params.points = curves[1];
            ++i;
            dash = params.dashArray[i % params.dashArray.length] * params.lineWidth;
        }
        return result;
    }
    /**
     * Returns the t corresponding to the given length for the specified bezier curve.
     * @param   {Array}     points      The bezier points. Should be [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y] for a cubic
     *                                  bezier curve or [p1x, p1y, cx, cy, p2x, p2y] for a quadratic bezier curve.
     * @param   {Number}    length      The length.
     * @return  {Number}                The t
     */
    static tAtLength(points, length) {
        //#region Variables déclaration
        let t = 0;
        const quadratic = points.length === 6;
        let currentLen = 0;
        let splitCount = 0;
        const splitFunc = quadratic ? BezierTools.splitQBezierAtT : BezierTools.splitBezierAtT;
        const _compute = (p, error) => {
            // control points polygon length
            let pLen = 0;
            for (let i = 0; i < p.length - 2; i += 2) {
                pLen += BezierTools.distance(p[i], p[i + 1], p[i + 2], p[i + 3]);
            }
            // chord length
            const chord = quadratic ? BezierTools.distance(points[0], points[1], points[4], points[5]) : BezierTools.distance(points[0], points[1], points[6], points[7]);
            // if needs more approx. or if currentLen is greater than the target length,
            // split the curve one more time
            if (pLen - chord > error || currentLen + pLen > length + error) {
                ++splitCount;
                const newbezier = splitFunc(p, 0.5);
                // check 1st subpath
                _compute(newbezier[0], error);
                // the 1st subcurve was the good one, we stop
                if (Math.abs(currentLen - length) <= error) {
                    return;
                }
                // need to continue with the 2nde subcurve
                _compute(newbezier[1], error);
                return;
            }
            currentLen += pLen;
            t += 1.0 / (1 << splitCount);
        };
        //#endregion Variables déclaration
        if (length) {
            _compute(points, 0.5);
        }
        return t;
    }
    /**
     * Split a cubic bezier curve into 2 sub-cubic beziers at the specified t.
     * @param   {Array}     points      cubic bezier curve points
     * @param   {Number}    t           -
     * @return  {Array}                 two cubic bezier curves
     */
    static splitCBezierAtT(points, t) {
        //#region Variables déclaration
        const r = 1 - t;
        const r2 = r * r;
        const r3 = r2 * r;
        const t2 = t * t;
        const t3 = t2 * t;
        const px = r3 * points[0] + 3 * r2 * t * points[2] + 3 * r * t2 * points[4] + t3 * points[6];
        const py = r3 * points[1] + 3 * r2 * t * points[3] + 3 * r * t2 * points[5] + t3 * points[7];
        //#endregion Variables déclaration
        return [
            [
                points[0],
                points[1],
                r * points[0] + t * points[2],
                r * points[1] + t * points[3],
                r2 * points[0] + 2 * r * t * points[2] + t2 * points[4],
                r2 * points[1] + 2 * r * t * points[3] + t2 * points[5],
                px,
                py
            ], [
                px,
                py,
                r2 * points[2] + 2 * r * t * points[4] + t2 * points[6],
                r2 * points[3] + 2 * r * t * points[5] + t2 * points[7],
                r * points[4] + t * points[6],
                r * points[5] + t * points[7],
                points[6],
                points[7]
            ]
        ];
    }
    /**
     * Split a quadratic bezier curve into 2 sub-quadratic beziers at the specified t.
     * de Casteljau
     * @param   {Array}     points      quadratic bezier curve points
     * @param   {Number}    t           -
     * @return  {Array}                 two quadratric bezier curves
     */
    static splitQBezierAtT(points, t) {
        //#region Variables déclaration
        const r = 1 - t;
        const r2 = r * r;
        const t2 = t * t;
        //#endregion Variables déclaration
        return [
            [
                points[0],
                points[1],
                r * points[0] + t * points[2],
                r * points[1] + t * points[3],
                r2 * points[0] + 2 * r * t * points[2] + t2 * points[4],
                r2 * points[1] + 2 * r * t * points[3] + t2 * points[5]
            ], [
                r2 * points[0] + 2 * r * t * points[2] + t2 * points[4],
                r2 * points[1] + 2 * r * t * points[3] + t2 * points[5],
                r * points[2] + t * points[4],
                r * points[3] + t * points[5],
                points[4],
                points[5]
            ]
        ];
    }
    /**
     * Returns the length of the given bezier curve.
     * @param   {Array}     points      The bezier points. Should be [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y] for a cubic
     *                                  bezier curve or [p1x, p1y, cx, cy, p2x, p2y] for a quadratic bezier curve.
     * @return  {Number}                The length
     */
    static computeLength(points) {
        //#region Variables déclaration
        const quadratic = points.length === 6;
        let pLen = 0;
        //#endregion Variables déclaration
        // control points polygon length
        for (let i = 0; i < points.length - 2; i += 2) {
            pLen += BezierTools.distance(points[i], points[i + 1], points[i + 2], points[i + 3]);
        }
        // chord length
        const chord = quadratic ? BezierTools.distance(points[0], points[1], points[4], points[5]) : BezierTools.distance(points[0], points[1], points[6], points[7]);
        // split polygons until the polygon and the chord are "the same"
        if (pLen - chord > error) {
            const newBeziers = quadratic ? BezierTools.splitQBezierAtT(points, 0.5) : BezierTools.splitCBezierAtT(points, 0.5);
            let length = null;
            length = BezierTools.computeLength(newBeziers[0], quadratic);
            length += BezierTools.computeLength(newBeziers[1], quadratic);
            return length;
        }
        // pLen is close enough, done.
        return pLen;
    }
    /**
     * Split a bezier curve into 2 sub-beziers curves at the specified t.
     * @param   {Array}     points      quadratic bezier curve points
     * @param   {Number}    t           -
     * @return  {Array}                 two bezier curves
     */
    static splitBezierAtT(points, t) {
        return points.length === 6 ? BezierTools.splitQBezierAtT(points, t) : BezierTools.splitCBezierAtT(points, t);
    }
    //#endregion Methods
}
//#endregion BezierTools
export { BezierTools };
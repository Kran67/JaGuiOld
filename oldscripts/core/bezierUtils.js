define(['require', 'core', 'geometry'], function (require, Core, Geometry) {
    const error= 0.1;
    //#region Methods
    function distance(x1, y1, x2, y2) {
        return Core.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    };
    function arcAsBezier(alpha) {
        var cosa = Core.cos(alpha), sina = Core.sin(alpha), p2 = new Geometry.Point(cosa + (4 / 3) * (1 - cosa), sina - (4 / 3) * cosa * (1 - cosa) / sina);
        return {
            s: new Geometry.Point(cosa, -sina),
            c1: new Geometry.Point(p2.x, -p2.y),
            c2: p2,
            e: new Geometry.Point(cosa, sina)
        };
    };
    function splitToDashedBezier(points, dashArray, newPoints, lineWidth, prevResult) {
        var result = 0, t = 0, dash, i = 0;
        var BezierUtils = require("bezierUtils");
        if (prevResult) {
            dash = prevResult.l;
            i = prevResult.i;
        } else {
            dash = dashArray[0] * lineWidth;
        }
        while (t < 1) {
            // get the 't' corresponding to the given dash value.
            t = BezierUtils.tAtLength(points, dash);
            if (t === 1) {
                var rl = BezierUtils.computeLength(points);
                result = { l: dash - rl, i: i };
            }
            // split bezier at t: left part is the "dash" curve, right part is the remaining bezier points
            var curves = BezierUtils.splitBezierAtT(points, t);
            if (!(i % 2)) {
                // only keep the "dash" curve
                newPoints.push(curves[0]);
            }
            points = curves[1];
            ++i;
            dash = dashArray[i % dashArray.length] * lineWidth;
        }
        return result;
    };
    function tAtLength(points, length) {
        var t = 0, quadratic = points.length === 6, currentLen = 0, splitCount = 0, bu = require("bezierUtils"), splitFunc = quadratic ? bu.splitQBezierAtT : bu.splitBezierAtT;
        var _compute = function (p, error) {
            // control points polygon length
            var pLen = 0, chord, newbezier;
            for (var i = 0; i < p.length - 2; i += 2)
                pLen += bu.distance(p[i], p[i + 1], p[i + 2], p[i + 3]);
            // chord length
            chord = quadratic ? bu.distance(points[0], points[1], points[4], points[5]) : bu.distance(points[0], points[1], points[6], points[7]);
            // if needs more approx. or if currentLen is greater than the target length,
            // split the curve one more time
            if (pLen - chord > error || currentLen + pLen > length + error) {
                ++splitCount;
                newbezier = splitFunc(p, 0.5);
                // check 1st subpath
                _compute(newbezier[0], error);
                // the 1st subcurve was the good one, we stop
                if ($j.abs(currentLen - length) <= error) return;
                // need to continue with the 2nde subcurve
                _compute(newbezier[1], error);
                return;
            }
            currentLen += pLen;
            t += 1.0 / (1 << splitCount);
        };
        if (length) _compute(points, 0.5);
        return t;
    };
    function splitCBezierAtT(points, t) {
        var r = 1 - t, r2 = r * r, r3 = r2 * r, t2 = t * t, t3 = t2 * t, p1x = points[0], p1y = points[1], c1x = points[2], c1y = points[3], c2x = points[4],
            c2y = points[5], p2x = points[6], p2y = points[7], ax = r * p1x + t * c1x, ay = r * p1y + t * c1y, cx = r * c2x + t * p2x, cy = r * c2y + t * p2y,
            mx = r2 * p1x + 2 * r * t * c1x + t2 * c2x, my = r2 * p1y + 2 * r * t * c1y + t2 * c2y, nx = r2 * c1x + 2 * r * t * c2x + t2 * p2x, ny = r2 * c1y + 2 * r * t * c2y + t2 * p2y,
            px = r3 * p1x + 3 * r2 * t * c1x + 3 * r * t2 * c2x + t3 * p2x, py = r3 * p1y + 3 * r2 * t * c1y + 3 * r * t2 * c2y + t3 * p2y;
        return [[p1x, p1y, ax, ay, mx, my, px, py],
        [px, py, nx, ny, cx, cy, p2x, p2y]];
    };
    function splitQBezierAtT(points, t) {
        var r = 1 - t, r2 = r * r, t2 = t * t, p1x = points[0], p1y = points[1], cx = points[2], cy = points[3], p2x = points[4], p2y = points[5],
            ax = r * p1x + t * cx, ay = r * p1y + t * cy, bx = r * cx + t * p2x, by = r * cy + t * p2y, px = r2 * p1x + 2 * r * t * cx + t2 * p2x, py = r2 * p1y + 2 * r * t * cy + t2 * p2y;
        return [[p1x, p1y, ax, ay, px, py],
        [px, py, bx, by, p2x, p2y]];
    };
    function computeLength(points) {
        var quadratic = points.length === 6, pLen = 0, chord, newBeziers, length, bu = require("bezierUtils");
        // control points polygon length
        for (var i = 0; i < points.length - 2; i += 2)
            pLen += bu.distance(points[i], points[i + 1], points[i + 2], points[i + 3]);
        // chord length
        chord = quadratic ? bu.distance(points[0], points[1], points[4], points[5]) : bu.distance(points[0], points[1], points[6], points[7]);
        // split polygons until the polygon and the chord are "the same"
        if (pLen - chord > bu.error) {
            newBeziers = quadratic ? bu.splitQBezierAtT(points, 0.5) : bu.splitCBezierAtT(points, 0.5);
            length = bu.computeLength(newBeziers[0], quadratic);
            length += bu.computeLength(newBeziers[1], quadratic);
            return length;
        }
        // pLen is close enough, done.
        return pLen;
    };
    function splitBezierAtT(points, t) {
        var bu = require("bezierUtils");
        return points.length === 6 ? bu.splitQBezierAtT(points, t) : bu.splitCBezierAtT(points, t);
    };
    //#endregion Methods
    return {
        distance: distance,
        arcAsBezier: arcAsBezier,
        splitToDashedBezier: splitToDashedBezier,
        tAtLength: tAtLength,
        splitQBezierAtT: splitQBezierAtT,
        computeLength: computeLength,
        splitBezierAtT: splitBezierAtT
    }
});
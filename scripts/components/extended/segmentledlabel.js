//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Tools } from "/scripts/core/tools.js";
import { Color, Colors } from "/scripts/core/color.js";
import { Convert } from "/scripts/core/convert.js";
//#endregion Import
//#region SEGMENTTYPES
/**
 * @type    {Object}        SEGMENTTYPES
 */
const SEGMENTTYPES = {
    SEVEN: 7,
    FOURTEEN: 14,
    SIXTEEN: 16
};
//#endregion SEGMENTTYPES
//#region SEGMENTSCROLLTYPES
/**
 * @type    {Object}        SEGMENTSCROLLTYPES
 */
const SEGMENTSCROLLTYPES = {
    RESTART: "restart",
    REVERSE: "reverse",
    CYCLE: "cycle"
};
//#endregion SEGMENTSCROLLTYPES
//#region SEGMENTSCROLLDIRECTIONS
/**
 * @type    {Object}        SEGMENTSCROLLDIRECTIONS
 */
const SEGMENTSCROLLDIRECTIONS = {
    RIGHT2LEFT: "right2left",
    LEFT2RIGHT: "left2right"
};
//#endregion SEGMENTSCROLLDIRECTIONS
//#region SEGMENTSIZES
/**
 * @type    {Object}        SEGMENTSIZES
 */
const SEGMENTSIZES = {
    SMALL: 0.5,
    NORMAL: 1,
    MEDIUM: 1.5,
    LARGE: 2
};
//#endregion SEGMENTSIZES
//#region SegmentLedLabel
const SegmentLedLabel = (() => {
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
    //#region Class SegmentLedLabel
    class SegmentLedLabel extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                delete this.tabOrder;
                priv.maxLength = props.hasOwnProperty("maxLength") && Tools.isNumber(props.maxLength)?props.maxLength:10;
                priv.autoScroll = props.hasOwnProperty("autoScroll") && Tools.isBool(props.autoScroll)?props.autoScroll:false;
                priv.scrollSpeed = props.hasOwnProperty("scrollSpeed") && Tools.isNumber(props.scrollSpeed)?props.scrollSpeed:1;
                priv.color = props.hasOwnProperty("color")?Color.parse(props.color):Colors.LIME;
                priv.segmentSize = props.hasOwnProperty("segmentSize") && Tools.valueInSet(props.segmentSize, SEGMENTSIZES)?
                    props.segmentSize:SEGMENTSIZES.NORMAL;
                priv.segmentType = props.hasOwnProperty("segmentType") && Tools.valueInSet(props.segmentType, SEGMENTTYPES)?
                    props.segmentType:SEGMENTTYPES.SEVEN;
                priv.caption = props.hasOwnProperty("caption") && Tools.isString(props.caption)?props.caption:this.name;
                //#region segmentChars
                priv.segmentChars = [];
                //#region !
                priv.segmentChars[33] = {
                    "7": "14",
                    "14": "3A",
                    "16": "4B"
                };
                //#endregion !
                //#region "
                priv.segmentChars[34] = {
                    "7": "12",
                    "14": "13",
                    "16": "46"
                };
                //#endregion "
                //#region #
                priv.segmentChars[35] = {
                    "7": String.EMPTY,
                    "14": "3567ACD",
                    "16": "4678BDEF"
                };
                //#endregion #
                //#region $
                priv.segmentChars[36] = {
                    "7": String.EMPTY,
                    "14": "01367ACD",
                    "16": "012478BDEF"
                };
                //#endregion $
                //#region %
                priv.segmentChars[37] = {
                    "7": String.EMPTY,
                    "14": "0134679ACD",
                    "16": "23578ACD"
                };
                //#endregion %
                //#region &
                priv.segmentChars[38] = {
                    "7": String.EMPTY,
                    "14": "02368BCD",
                    "16": "013579CDEF"
                };
                //#endregion &
                //#region '
                priv.segmentChars[39] = {
                    "7": "1",
                    "14": "4",
                    "16": "4"
                };
                //#endregion '
                //#region (
                priv.segmentChars[40] = {
                    "7": "0146",
                    "14": "4B",
                    "16": "5C"
                };
                //#endregion (
                //#region )
                priv.segmentChars[41] = {
                    "7": "0256",
                    "14": "29",
                    "16": "3A"
                };
                //#endregion )
                //#region *
                priv.segmentChars[42] = {
                    "7": "12345",
                    "14": "234679AB",
                    "16": "34578ABC"
                };
                //#endregion *
                //#region +
                priv.segmentChars[43] = {
                    "7": "134",
                    "14": "367A",
                    "16": "478B"
                };
                //#endregion +
                //#region ,
                priv.segmentChars[44] = {
                    "7": "5",
                    "14": "9",
                    "16": "A"
                };
                //#endregion ,
                //#region -
                priv.segmentChars[45] = {
                    "7": "3",
                    "14": "67",
                    "16": "78"
                };
                //#endregion -
                //#region .
                priv.segmentChars[46] = {
                    "7": String.EMPTY,
                    "14": "7",
                    "16": "B"
                };
                //#endregion .
                //#region /
                priv.segmentChars[47] = {
                    "7": "24",
                    "14": "49",
                    "16": "5A"
                };
                //#endregion /
                //#region 0
                priv.segmentChars[48] = {
                    "7": "012456",
                    "14": "014589CD",
                    "16": "012569ADEF"
                };
                //#endregion 0
                //#region 1
                priv.segmentChars[49] = {
                    "7": "25",
                    "14": "3A",
                    "16": "6D"
                };
                //#endregion 1
                //#region 2
                priv.segmentChars[50] = {
                    "7": "02346",
                    "14": "05678D",
                    "16": "016789EF"
                };
                //#endregion 2
                //#region 3
                priv.segmentChars[51] = {
                    "7": "02356",
                    "14": "0567CD",
                    "16": "01678DEF"
                };
                //#endregion 3
                //#region 4
                priv.segmentChars[52] = {
                    "7": "1235",
                    "14": "1567C",
                    "16": "2678D"
                };
                //#endregion 4
                //#region 5
                priv.segmentChars[53] = {
                    "7": "01356",
                    "14": "0167CD",
                    "16": "01278DEF"
                };
                //#endregion 5
                //#region 6
                priv.segmentChars[54] = {
                    "7": "013456",
                    "14": "01678CD",
                    "16": "012789DEF"
                };
                //#endregion 6
                //#region 7
                priv.segmentChars[55] = {
                    "7": "025",
                    "14": "05C",
                    "16": "0126D"
                };
                //#endregion 7
                //#region 8
                priv.segmentChars[56] = {
                    "7": "0123456",
                    "14": "015678CD",
                    "16": "0126789DEF"
                };
                //#endregion 8
                //#region 9
                priv.segmentChars[57] = {
                    "7": "012350",
                    "14": "01567CD",
                    "16": "012678DEF"
                };
                //#endregion 9
                //#region :
                priv.segmentChars[58] = {
                    "7": String.EMPTY,
                    "14": "0",
                    "16": "4B"
                };
                //#endregion :
                //#region ;
                priv.segmentChars[59] = {
                    "7": String.EMPTY,
                    "14": "09",
                    "16": "4A"
                };
                //#endregion ;
                //#region <
                priv.segmentChars[60] = {
                    "7": String.EMPTY,
                    "14": "49D",
                    "16": "5AEF"
                };
                //#endregion <
                //#region =
                priv.segmentChars[61] = {
                    "7": "36",
                    "14": "67D",
                    "16": "78EF"
                };
                //#endregion =
                //#region >
                priv.segmentChars[62] = {
                    "7": String.EMPTY,
                    "14": "2BD",
                    "16": "3CEF"
                };
                //#endregion >
                //#region ?
                priv.segmentChars[63] = {
                    "7": "0234",
                    "14": "057A",
                    "16": "01268B"
                };
                //#endregion ?
                //#region @
                priv.segmentChars[64] = {
                    "7": "013456",
                    "14": "0568ACD",
                    "16": "012689BDF"
                };
                //#endregion @
                //#region A
                priv.segmentChars[65] = {
                    "7": "012345",
                    "14": "015678C",
                    "16": "0126789D"
                };
                //#endregion A
                //#region B
                priv.segmentChars[66] = {
                    "7": "0123456",
                    "14": "0357ACD",
                    "16": "0125789DEF"
                };
                //#endregion B
                //#region C
                priv.segmentChars[67] = {
                    "7": "0146",
                    "14": "018D",
                    "16": "0129EF"
                };
                //#endregion C
                //#region D
                priv.segmentChars[68] = {
                    "7": "02456",
                    "14": "035ACD",
                    "16": "0146BDEF"
                };
                //#endregion D
                //#region E
                priv.segmentChars[69] = {
                    "7": "01346",
                    "14": "0168D",
                    "16": "012789EF"
                };
                //#endregion E
                //#region F
                priv.segmentChars[70] = {
                    "7": "0134",
                    "14": "0168",
                    "16": "012789"
                };
                //#endregion F
                //#region G
                priv.segmentChars[71] = {
                    "7": "01456",
                    "14": "0178CD",
                    "16": "01289DEF"
                };
                //#endregion G
                //#region H
                priv.segmentChars[72] = {
                    "7": "12345",
                    "14": "15678C",
                    "16": "26789D"
                };
                //#endregion H
                //#region I
                priv.segmentChars[73] = {
                    "7": "25",
                    "14": "03AD",
                    "16": "014BEF"
                };
                //#endregion I
                //#region J
                priv.segmentChars[74] = {
                    "7": "2456",
                    "14": "58CD",
                    "16": "69DEF"
                };
                //#endregion J
                //#region K
                priv.segmentChars[75] = {
                    "7": "12346",
                    "14": "1468B",
                    "16": "2579C"
                };
                //#endregion K
                //#region L
                priv.segmentChars[76] = {
                    "7": "146",
                    "14": "18D",
                    "16": "29EF"
                };
                //#endregion L
                //#region M
                priv.segmentChars[77] = {
                    "7": "045",
                    "14": "12458C",
                    "16": "23569BD"
                };
                //#endregion M
                //#region N
                priv.segmentChars[78] = {
                    "7": "01245",
                    "14": "1258BC",
                    "16": "2369CD"
                };
                //#endregion N
                //#region O
                priv.segmentChars[79] = {
                    "7": "012456",
                    "14": "0158CD",
                    "16": "01269DEF"
                };
                //#endregion O
                //#region P
                priv.segmentChars[80] = {
                    "7": "01234",
                    "14": "015678",
                    "16": "0126789"
                };
                //#endregion P
                //#region Q
                priv.segmentChars[81] = {
                    "7": "01236",
                    "14": "0158BCD",
                    "16": "01269CDEF"
                };
                //#endregion Q
                //#region R
                priv.segmentChars[82] = {
                    "7": "0124",
                    "14": "015678B",
                    "16": "0126789C"
                };
                //#endregion R
                //#region S
                priv.segmentChars[83] = {
                    "7": "01356",
                    "14": "0167CD",
                    "16": "0138DEF"
                };
                //#endregion S
                //#region T
                priv.segmentChars[84] = {
                    "7": "025",
                    "14": "03A",
                    "16": "014B"
                };
                //#endregion T
                //#region U
                priv.segmentChars[85] = {
                    "7": "12456",
                    "14": "158CD",
                    "16": "269DEF"
                };
                //#endregion U
                //#region V
                priv.segmentChars[86] = {
                    "7": "1234",
                    "14": "1489",
                    "16": "259A"
                };
                //#endregion V
                //#region W
                priv.segmentChars[87] = {
                    "7": "123456",
                    "14": "1589BC",
                    "16": "2469ACD"
                };
                //#endregion W
                //#region X
                priv.segmentChars[88] = {
                    "7": "135",
                    "14": "249B",
                    "16": "35AC"
                };
                //#endregion X
                //#region Y
                priv.segmentChars[89] = {
                    "7": "12356",
                    "14": "24A",
                    "16": "35B"
                };
                //#endregion Y
                //#region Z
                priv.segmentChars[90] = {
                    "7": "02346",
                    "14": "049D",
                    "16": "015AEF"
                };
                //#endregion Z
                //#region [
                priv.segmentChars[91] = {
                    "7": "0146",
                    "14": "018D",
                    "16": "14BF"
                };
                //#endregion [
                //#region \
                priv.segmentChars[92] = {
                    "7": String.EMPTY,
                    "14": "2B",
                    "16": "3C"
                };
                //#endregion \
                //#region ]
                priv.segmentChars[93] = {
                    "7": "0256",
                    "14": "05CD",
                    "16": "04BE"
                };
                //#endregion ]
                //#region ^
                priv.segmentChars[94] = {
                    "7": String.EMPTY,
                    "14": "9B",
                    "16": "23"
                };
                //#endregion ^
                //#region _
                priv.segmentChars[95] = {
                    "7": "6",
                    "14": "D",
                    "16": "EF"
                };
                //#endregion _
                //#region `
                priv.segmentChars[96] = {
                    "7": "1",
                    "14": "2",
                    "16": "3"
                };
                //#endregion `
                //#region a
                priv.segmentChars[97] = {
                    "7": "023456",
                    "14": "68AD",
                    "16": "016789DEF"
                };
                //#endregion a
                //#region b
                priv.segmentChars[98] = {
                    "7": "13456",
                    "14": "168BD",
                    "16": "2789DEF"
                };
                //#endregion b
                //#region c
                priv.segmentChars[99] = {
                    "7": "346",
                    "14": "678D",
                    "16": "789EF"
                };
                //#endregion c
                //#region d
                priv.segmentChars[100] = {
                    "7": "23456",
                    "14": "579CD",
                    "16": "6789DEF"
                };
                //#endregion d
                //#region e
                priv.segmentChars[101] = {
                    "7": "012346",
                    "14": "689D",
                    "16": "79AEF"
                };
                //#endregion e
                //#region f
                priv.segmentChars[102] = {
                    "7": "0134",
                    "14": "0168",
                    "16": "1478B"
                };
                //#endregion f
                //#region g
                priv.segmentChars[103] = {
                    "7": "012356",
                    "14": "457CD",
                    "16": "012678DF"
                };
                //#endregion g
                //#region h
                priv.segmentChars[104] = {
                    "7": "1345",
                    "14": "168A",
                    "16": "2789D"
                };
                //#endregion h
                //#region i
                priv.segmentChars[105] = {
                    "7": "5",
                    "14": "0AD",
                    "16": "0B"
                };
                //#endregion i
                //#region j
                priv.segmentChars[106] = {
                    "7": "256",
                    "14": "0CD",
                    "16": "6DF"
                };
                //#endregion j
                //#region k
                priv.segmentChars[107] = {
                    "7": "01345",
                    "14": "34AB",
                    "16": "2789C"
                };
                //#endregion k
                //#region l
                priv.segmentChars[108] = {
                    "7": "14",
                    "14": "3AD",
                    "16": "4BF"
                };
                //#endregion l
                //#region m
                priv.segmentChars[109] = {
                    "7": "45",
                    "14": "678AC",
                    "16": "789BD"
                };
                //#endregion m
                //#region n
                priv.segmentChars[110] = {
                    "7": "345",
                    "14": "68A",
                    "16": "789D"
                };
                //#endregion n
                //#region o
                priv.segmentChars[111] = {
                    "7": "3456",
                    "14": "678CD",
                    "16": "789DEF"
                };
                //#endregion o
                //#region p
                priv.segmentChars[112] = {
                    "7": "01234",
                    "14": "1268",
                    "16": "012579"
                };
                //#endregion p
                //#region q
                priv.segmentChars[113] = {
                    "7": "01235",
                    "14": "457C",
                    "16": "01368D"
                };
                //#endregion q
                //#region r
                priv.segmentChars[114] = {
                    "7": "34",
                    "14": "68",
                    "16": "789"
                };
                //#endregion r
                //#region s
                priv.segmentChars[115] = {
                    "7": "01356",
                    "14": "7BD",
                    "16": "8CEF"
                };
                //#endregion s
                //#region t
                priv.segmentChars[116] = {
                    "7": "1346",
                    "14": "168D",
                    "16": "478BF"
                };
                //#endregion t
                //#region u
                priv.segmentChars[117] = {
                    "7": "456",
                    "14": "8CD",
                    "16": "9DEF"
                };
                //#endregion u
                //#region v
                priv.segmentChars[118] = {
                    "7": "123",
                    "14": "BC",
                    "16": "CD"
                };
                //#endregion v
                //#region w
                priv.segmentChars[119] = {
                    "7": "126",
                    "14": "89BC",
                    "16": "9ACD"
                };
                //#endregion w
                //#region x
                priv.segmentChars[120] = {
                    "7": String.EMPTY,
                    "14": "679B",
                    "16": "3578AC"
                };
                //#endregion x
                //#region y
                priv.segmentChars[121] = {
                    "7": "12356",
                    "14": "BCD",
                    "16": "2678DEF"
                };
                //#endregion y
                //#region z
                priv.segmentChars[122] = {
                    "7": "02345",
                    "14": "69D",
                    "16": "7AEF"
                };
                //#endregion z
                //#region {
                priv.segmentChars[123] = {
                    "7": String.EMPTY,
                    "14": "0269D",
                    "16": "147BF"
                };
                //#endregion {
                //#region |
                priv.segmentChars[124] = {
                    "7": "14",
                    "14": "3A",
                    "16": "29"
                };
                //#endregion |
                //#region }
                priv.segmentChars[125] = {
                    "7": String.EMPTY,
                    "14": "047BD",
                    "16": "048BE"
                };
                //#endregion }
                //#region ~
                priv.segmentChars[126] = {
                    "7": "3",
                    "14": "124",
                    "16": "79CD"
                };
                //#endregion ~
                //#endregion
                priv.conts = [];
                priv.lastTime = new Date().getTime();
                priv.startIndex = 0;
                priv.scrollType = props.hasOwnProperty("scrollType") && Tools.valueInSet(props.scrollType, SEGMENTSCROLLTYPES)?
                    props.scrollType:SEGMENTSCROLLTYPES.CYCLE;
                priv.scrollDir = props.hasOwnProperty("scrollDir") && Tools.valueInSet(props.scrollDir, SEGMENTSCROLLDIRECTIONS)?
                    props.scrollDir:SEGMENTSCROLLDIRECTIONS.LEFT2RIGHT;
                priv.text = priv.caption;
                priv.autoAdjustTextLengthWithSpace = props.hasOwnProperty("autoAdjustTextLengthWithSpace") && 
                    Tools.isBool(props.autoAdjustTextLengthWithSpace)?props.autoAdjustTextLengthWithSpace:true;
                this.normalizeCaption();
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region SEGMENTTYPES
        /**
         * @type    {Object}        SEGMENTTYPES
         */
        static get SEGMENTTYPES() {
            return SEGMENTTYPES;
        }
        //#endregion SEGMENTTYPES
        //#region SEGMENTSCROLLTYPES
        /**
         * @type    {Object}        SEGMENTSCROLLTYPES
         */
        static get SEGMENTSCROLLTYPES() {
            return SEGMENTSCROLLTYPES;
        }
        //#endregion SEGMENTSCROLLTYPES
        //#region SEGMENTSCROLLDIRECTIONS
        /**
         * @type    {Object}        SEGMENTSCROLLDIRECTIONS
         */
        static get SEGMENTSCROLLDIRECTIONS() {
            return SEGMENTSCROLLDIRECTIONS;
        }
        //#endregion SEGMENTSCROLLDIRECTIONS
        //#region SEGMENTSIZES
        /**
         * @type    {Object}        SEGMENTSIZES
         */
        static get SEGMENTSIZES() {
            return SEGMENTSIZES;
        }
        //#endregion SEGMENTSIZES
        //#region maxLength
        get maxLength() {
            return internal(this).maxLength;
        }
        set maxLength(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.maxLength !== newValue) {
                    priv.maxLength = newValue;
                    this.changeSegmentSize();
                }
            }
        }
        //#endregion maxLength
        //#region autoScroll
        get autoScroll() {
            return internal(this).autoScroll;
        }
        set autoScroll(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.autoScroll !== newValue) {
                    priv.autoScroll = newValue;
                    this.update();
                }
            }
        }
        //#endregion autoScroll
        //#region caption
        get caption() {
            return internal(this).caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.caption !== newValue) {
                    priv.caption = newValue;
                    priv.text = priv.caption;
                    this.normalizeCaption();
                    this.update();
                }
            }
        }
        //#endregion caption
        //#region color
        get color() {
            return internal(this).color;
        }
        set color(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Color) {
                if (!priv.color.equals(newValue)) {
                    priv.color.assign(newValue);
                    this.update();
                }
            }
        }
        //#endregion color
        //#region segmentSize
        get segmentSize() {
            return internal(this).segmentSize;
        }
        set segmentSize(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, SEGMENTSIZES)) {
                if (priv.segmentSize !== newValue) {
                    priv.segmentSize = newValue;
                    this.changeSegmentSize();
                }
            }
        }
        //#endregion segmentSize
        //#region segmentType
        get segmentType() {
            return internal(this).segmentType;
        }
        set segmentType(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, SEGMENTTYPES)) {
                if (priv.segmentType !== newValue) {
                    priv.segmentType = newValue;
                    htmlElement.classList.remove("seven", "fourteen", "sixteen");
                    switch (priv.segmentType) {
                        case SEGMENTTYPES.SEVEN:
                            htmlElement.classList.add("seven");
                            break;
                        case SEGMENTTYPES.FOURTEEN:
                            htmlElement.classList.add("fourteen");
                            break;
                        case SEGMENTTYPES.SIXTEEN:
                            htmlElement.classList.add("sixteen");
                            break;
                    }
                    this.createSegments();
                }
            }
        }
        //#endregion segmentType
        //#region caption
        get caption() {
            return internal(this).caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.caption !== newValue) {
                    priv.caption = newValue;
                    this.update();
                }
            }
        }
        //#endregion caption
        //#region scrollSpeed
        get scrollSpeed() {
            return internal(this).scrollSpeed;
        }
        set scrollSpeed(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.scrollSpeed !== newValue) {
                    priv.scrollSpeed = newValue;
                    this.update();
                }
            }
        }
        //#endregion scrollSpeed
        //#region scrollType
        get scrollType() {
            return internal(this).scrollType;
        }
        set scrollType(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, SEGMENTSCROLLTYPES)) {
                if (priv.scrollType !== newValue) {
                    priv.scrollType = newValue;
                }
            }
        }
        //#endregion scrollType
        //#region scrollDirection
        get scrollDirection() {
            return internal(this).scrollDirection;
        }
        set scrollDirection(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, SEGMENTSCROLLDIRECTIONS)) {
                if (priv.scrollDir !== newValue) {
                    priv.scrollDir = newValue;
                }
            }
        }
        //#endregion scrollDirection
        //#endregion Getters / Setters
        //#region Methods
        //#region normalizeCaption
        normalizeCaption() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.autoAdjustTextLengthWithSpace) {
                if (priv.text.length < priv.maxLength) {
                    priv.text = priv.text.padEnd(priv.maxLength, String.SPACE);
                } else {
                    const ratio = Math.round(priv.text.length / priv.maxLength);
                    priv.text = priv.text.padEnd(ratio * priv.maxLength + (priv.text.length - priv.maxLength), String.SPACE);
                }
            } else if (priv.text.length < priv.maxLength && priv.scrollType !== SEGMENTSCROLLTYPES.RESTART && priv.autoScroll) {
                priv.text = priv.text.padEnd(priv.maxLength, String.SPACE);
            }
        }
        //#endregion normalizeCaption
        //#region createSegments
        createSegments() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            priv.conts.clear();
            htmlElement.innerHTML = String.EMPTY;
            for (let i = 0; i < priv.maxLength; i++) {
                const div = document.createElement(Types.HTMLELEMENTS.DIV);
                div.className = "segmentContainer";
                priv.conts.push(div);
                for (let j = 0; j < priv.segmentType; j++) {
                    const seg = document.createElement(Types.HTMLELEMENTS.DIV);
                    seg.className = `segment seg${j}`;
                    div.appendChild(seg);
                }
                htmlElement.appendChild(div);
            }
        }
        //#endregion createSegments
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (this.HTMLElement) {
                super.update();
                // on allume les segments
                this.HTMLElementStyle.setProperty("--aligth-color", priv.color.toRGBAString());
                if (!priv.conts.isEmpty) {
                    this.clearAllSegments();
                    const txt = priv.text.substr(priv.startIndex, priv.maxLength);
                    for (let i = 0, l = txt.length; i < l; i++) {
                        if (priv.segmentChars[txt[i].charCodeAt(0)]) {
                            let charNum;
                            let segements = priv.segmentChars[txt[i].charCodeAt(0)][Convert.intToStr(priv.segmentType)];
                            segements = segements.split(String.EMPTY);
                            const segs = priv.conts[i].querySelectorAll("div");
                            for (let j = 0, m = segements.length; j < m; j++) {
                                if (["A", "B", "C", "D", "E", "F"].indexOf(segements[j]) > -1) {
                                    charNum = segements[j].charCodeAt(0) - 55;
                                }
                                else {
                                    charNum = ~~segements[j];
                                }
                                segs[charNum].classList.add("alight");
                            }
                        }
                    }
                }
            }
        }
        //#endregion update
        //#region clearAllSegments
        clearAllSegments() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.conts.forEach(cont => {
                this.clearSegment(cont);
            });
        }
        //#endregion clearAllSegments
        //#region clearSegment
        clearSegment(segCont) {
            //#region Variables déclaration
            const segs = Convert.nodeListToArray(segCont.querySelectorAll("div"));
            //#endregion Variables déclaration
            segs.forEach(seg => {
                seg.classList.remove("alight");
            });
            return segs;
        }
        //#endregion clearSegment
        //#region changeSegmentSize
        changeSegmentSize() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.HTMLElementStyle.transform = `scale(${priv.segmentSize})`;
        }
        //#endregion changeSegmentSize
        //#region loaded
        loaded() {
            this.createSegments();
            super.loaded();
            Core.looper.addListener(this);
        }
        //#endregion loaded
        //#region processTick
        processTick() {
            //#region Variables déclaration
            const priv = internal(this);
            const now = new Date().getTime();
            //#endregion Variables déclaration
            if (priv.autoScroll) {
                if (priv.text.length <= priv.maxLength && priv.scrollType !== SEGMENTSCROLLTYPES.CYCLE) {
                    return;
                }
                if (now - priv.lastTime >= priv.scrollSpeed * 1000) {
                    if (priv.scrollDir === SEGMENTSCROLLDIRECTIONS.RIGHT2LEFT) {
                        if (priv.scrollType === SEGMENTSCROLLTYPES.CYCLE) {
                            priv.text = `${priv.text.substring(1)}${priv.text.substring(0, 1)}`;
                        }
                        else {
                            priv.startIndex++;
                        }
                    } else {
                        if (priv.scrollType === SEGMENTSCROLLTYPES.CYCLE) {
                            priv.text = `${priv.text.substring(priv.maxLength - 1, priv.maxLength)}${priv.text.substring(0, priv.maxLength - 1)}`;
                        }
                        else {
                            priv.startIndex--;
                        }
                    }
                    if (priv.startIndex > priv.text.length - priv.maxLength) {
                        switch (priv.scrollType) {
                            case SEGMENTSCROLLTYPES.RESTART:
                                priv.startIndex = 0;
                                break;
                            case SEGMENTSCROLLTYPES.REVERSE:
                                if (priv.scrollDir === SEGMENTSCROLLDIRECTIONS.RIGHT2LEFT) {
                                    priv.scrollDir = SEGMENTSCROLLDIRECTIONS.LEFT2RIGHT;
                                    priv.startIndex -= 2;
                                }
                                break;
                        }
                    }
                    if (priv.startIndex < 0) {
                        switch (priv.scrollType) {
                            case SEGMENTSCROLLTYPES.RESTART:
                                if (priv.scrollDir === SEGMENTSCROLLDIRECTIONS.RIGHT2LEFT) {
                                    priv.startIndex = 0;
                                }
                                else {
                                    priv.startIndex = 0;
                                }
                                break;
                            case SEGMENTSCROLLTYPES.REVERSE:
                                if (priv.scrollDir === SEGMENTSCROLLDIRECTIONS.LEFT2RIGHT) {
                                    priv.scrollDir = SEGMENTSCROLLDIRECTIONS.RIGHT2LEFT;
                                    priv._startIndex += 2;
                                }
                                break;
                        }
                    }
                    this.update();
                    priv.lastTime = now;
                }
            }
        }
        //#endregion processTick
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.color.destroy();
            priv.color = null;
            priv.segmentType = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return SegmentLedLabel;
    //#endregion SegmentLedLabel
})();
Object.seal(SegmentLedLabel);
Core.classes.register(Types.CATEGORIES.EXTENDED, SegmentLedLabel);
//#endregion SegmentLedLabel
//#region Templates
if (Core.isHTMLRenderer) {
    const SegmentLedLabelTpl = ["<jagiu-segmentledlabel id=\"{internalId}\" data-class=\"SegmentLedLabel\" class=\"Control SegmentLedLabel csr_default ",
        "sixteen \"><properties>{ \"name\": \"{name}\", \"caption\": \"{name}\" }</properties></jagiu-segmentledlabel>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: SegmentLedLabel, template: SegmentLedLabelTpl }]);
}
//endregion
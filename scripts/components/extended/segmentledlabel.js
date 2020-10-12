//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Color, Colors } from '/scripts/core/color.js';
import { Convert } from '/scripts/core/convert.js';
import { Css } from '/scripts/core/css.js';
//#endregion Import
//#region SEGMENTTYPES
/**
 * @type    {Object}        SEGMENTTYPES
 */
const SEGMENTTYPES = Object.freeze(Object.seal({
    SEVEN: 7,
    FOURTEEN: 14,
    SIXTEEN: 16
}));
//#endregion SEGMENTTYPES
//#region SEGMENTSCROLLTYPES
/**
 * @type    {Object}        SEGMENTSCROLLTYPES
 */
const SEGMENTSCROLLTYPES = Object.freeze(Object.seal({
    RESTART: 'restart',
    REVERSE: 'reverse',
    CYCLE: 'cycle'
}));
//#endregion SEGMENTSCROLLTYPES
//#region SEGMENTSCROLLDIRECTIONS
/**
 * @type    {Object}        SEGMENTSCROLLDIRECTIONS
 */
const SEGMENTSCROLLDIRECTIONS = Object.freeze(Object.seal({
    RIGHT2LEFT: 'right2left',
    LEFT2RIGHT: 'left2right'
}));
//#endregion SEGMENTSCROLLDIRECTIONS
//#region SEGMENTSIZES
/**
 * @type    {Object}        SEGMENTSIZES
 */
const SEGMENTSIZES = Object.freeze(Object.seal({
    SMALL: 0.5,
    NORMAL: 1,
    MEDIUM: 1.5,
    LARGE: 2
}));
//#endregion SEGMENTSIZES
//#region Class SegmentLedLabel
class SegmentLedLabel extends ThemedControl {
    //#region Private fields
    #maxLength;
    #autoScroll;
    #scrollSpeed;
    #color;
    #segmentSize;
    #segmentType;
    #caption;
    #segmentChars = [];
    #conts = [];
    #lastTime;
    #startIndex = 0;
    #scrollType;
    #scrollDir;
    #autoAdjustTextLengthWithSpace;
    #text;
    #scrollDirection;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#maxLength = props.hasOwnProperty('maxLength') && core.tools.isNumber(props.maxLength)
                    ? props.maxLength : 10;
            this.#autoScroll = props.hasOwnProperty('autoScroll') && core.tools.isBool(props.autoScroll)
                ? props.autoScroll : !1;
            this.#scrollSpeed = props.hasOwnProperty('scrollSpeed')
                && core.tools.isNumber(props.scrollSpeed)
                ? props.scrollSpeed : 1;
            this.#color = props.hasOwnProperty('color') ? Color.parse(props.color) : Colors.LIME;
            this.#segmentSize = props.hasOwnProperty('segmentSize')
                && core.tools.valueInSet(props.segmentSize, SEGMENTSIZES)
                ? props.segmentSize : SEGMENTSIZES.NORMAL;
            this.#segmentType = props.hasOwnProperty('segmentType')
                && core.tools.valueInSet(props.segmentType, SEGMENTTYPES)
                ? props.segmentType : SEGMENTTYPES.SEVEN;
            this.#caption = props.hasOwnProperty('caption') && core.tools.isString(props.caption)
                ? props.caption : this.name;
            this.#lastTime = new Date().getTime();
            this.#scrollType = props.hasOwnProperty('scrollType')
                && core.tools.valueInSet(props.scrollType, SEGMENTSCROLLTYPES)
                ? props.scrollType : SEGMENTSCROLLTYPES.CYCLE;
            this.#scrollDir = props.hasOwnProperty('scrollDir')
                && core.tools.valueInSet(props.scrollDir, SEGMENTSCROLLDIRECTIONS)
                ? props.scrollDir : SEGMENTSCROLLDIRECTIONS.LEFT2RIGHT;
            this.#autoAdjustTextLengthWithSpace = props.hasOwnProperty('autoAdjustTextLengthWithSpace')
                && core.tools.isBool(props.autoAdjustTextLengthWithSpace)
                ? props.autoAdjustTextLengthWithSpace : !0;
            this.#text = this.#caption;
            //#region segmentChars
            //#region !
            this.#segmentChars[33] = {
                '7': '14',
                '14': '3A',
                '16': '4B'
            };
            //#endregion !
            //#region '
            this.#segmentChars[34] = {
                '7': '12',
                '14': '13',
                '16': '46'
            };
            //#endregion '
            //#region #
            this.#segmentChars[35] = {
                '7': String.EMPTY,
                '14': '3567ACD',
                '16': '4678BDEF'
            };
            //#endregion #
            //#region $
            this.#segmentChars[36] = {
                '7': String.EMPTY,
                '14': '01367ACD',
                '16': '012478BDEF'
            };
            //#endregion $
            //#region %
            this.#segmentChars[37] = {
                '7': String.EMPTY,
                '14': '0134679ACD',
                '16': '23578ACD'
            };
            //#endregion %
            //#region &
            this.#segmentChars[38] = {
                '7': String.EMPTY,
                '14': '02368BCD',
                '16': '013579CDEF'
            };
            //#endregion &
            //#region '
            this.#segmentChars[39] = {
                '7': '1',
                '14': '4',
                '16': '4'
            };
            //#endregion '
            //#region (
            this.#segmentChars[40] = {
                '7': '0146',
                '14': '4B',
                '16': '5C'
            };
            //#endregion (
            //#region )
            this.#segmentChars[41] = {
                '7': '0256',
                '14': '29',
                '16': '3A'
            };
            //#endregion )
            //#region *
            this.#segmentChars[42] = {
                '7': '12345',
                '14': '234679AB',
                '16': '34578ABC'
            };
            //#endregion *
            //#region +
            this.#segmentChars[43] = {
                '7': '134',
                '14': '367A',
                '16': '478B'
            };
            //#endregion +
            //#region ,
            this.#segmentChars[44] = {
                '7': '5',
                '14': '9',
                '16': 'A'
            };
            //#endregion ,
            //#region -
            this.#segmentChars[45] = {
                '7': '3',
                '14': '67',
                '16': '78'
            };
            //#endregion -
            //#region .
            this.#segmentChars[46] = {
                '7': String.EMPTY,
                '14': '7',
                '16': 'B'
            };
            //#endregion .
            //#region /
            this.#segmentChars[47] = {
                '7': '24',
                '14': '49',
                '16': '5A'
            };
            //#endregion /
            //#region 0
            this.#segmentChars[48] = {
                '7': '012456',
                '14': '014589CD',
                '16': '012569ADEF'
            };
            //#endregion 0
            //#region 1
            this.#segmentChars[49] = {
                '7': '25',
                '14': '3A',
                '16': '6D'
            };
            //#endregion 1
            //#region 2
            this.#segmentChars[50] = {
                '7': '02346',
                '14': '05678D',
                '16': '016789EF'
            };
            //#endregion 2
            //#region 3
            this.#segmentChars[51] = {
                '7': '02356',
                '14': '0567CD',
                '16': '01678DEF'
            };
            //#endregion 3
            //#region 4
            this.#segmentChars[52] = {
                '7': '1235',
                '14': '1567C',
                '16': '2678D'
            };
            //#endregion 4
            //#region 5
            this.#segmentChars[53] = {
                '7': '01356',
                '14': '0167CD',
                '16': '01278DEF'
            };
            //#endregion 5
            //#region 6
            this.#segmentChars[54] = {
                '7': '013456',
                '14': '01678CD',
                '16': '012789DEF'
            };
            //#endregion 6
            //#region 7
            this.#segmentChars[55] = {
                '7': '025',
                '14': '05C',
                '16': '0126D'
            };
            //#endregion 7
            //#region 8
            this.#segmentChars[56] = {
                '7': '0123456',
                '14': '015678CD',
                '16': '0126789DEF'
            };
            //#endregion 8
            //#region 9
            this.#segmentChars[57] = {
                '7': '012350',
                '14': '01567CD',
                '16': '012678DEF'
            };
            //#endregion 9
            //#region :
            this.#segmentChars[58] = {
                '7': String.EMPTY,
                '14': '0',
                '16': '4B'
            };
            //#endregion :
            //#region ;
            this.#segmentChars[59] = {
                '7': String.EMPTY,
                '14': '09',
                '16': '4A'
            };
            //#endregion ;
            //#region <
            this.#segmentChars[60] = {
                '7': String.EMPTY,
                '14': '49D',
                '16': '5AEF'
            };
            //#endregion <
            //#region =
            this.#segmentChars[61] = {
                '7': '36',
                '14': '67D',
                '16': '78EF'
            };
            //#endregion =
            //#region >
            this.#segmentChars[62] = {
                '7': String.EMPTY,
                '14': '2BD',
                '16': '3CEF'
            };
            //#endregion >
            //#region ?
            this.#segmentChars[63] = {
                '7': '0234',
                '14': '057A',
                '16': '01268B'
            };
            //#endregion ?
            //#region @
            this.#segmentChars[64] = {
                '7': '013456',
                '14': '0568ACD',
                '16': '012689BDF'
            };
            //#endregion @
            //#region A
            this.#segmentChars[65] = {
                '7': '012345',
                '14': '015678C',
                '16': '0126789D'
            };
            //#endregion A
            //#region B
            this.#segmentChars[66] = {
                '7': '0123456',
                '14': '0357ACD',
                '16': '0125789DEF'
            };
            //#endregion B
            //#region C
            this.#segmentChars[67] = {
                '7': '0146',
                '14': '018D',
                '16': '0129EF'
            };
            //#endregion C
            //#region D
            this.#segmentChars[68] = {
                '7': '02456',
                '14': '035ACD',
                '16': '0146BDEF'
            };
            //#endregion D
            //#region E
            this.#segmentChars[69] = {
                '7': '01346',
                '14': '0168D',
                '16': '012789EF'
            };
            //#endregion E
            //#region F
            this.#segmentChars[70] = {
                '7': '0134',
                '14': '0168',
                '16': '012789'
            };
            //#endregion F
            //#region G
            this.#segmentChars[71] = {
                '7': '01456',
                '14': '0178CD',
                '16': '01289DEF'
            };
            //#endregion G
            //#region H
            this.#segmentChars[72] = {
                '7': '12345',
                '14': '15678C',
                '16': '26789D'
            };
            //#endregion H
            //#region I
            this.#segmentChars[73] = {
                '7': '25',
                '14': '03AD',
                '16': '014BEF'
            };
            //#endregion I
            //#region J
            this.#segmentChars[74] = {
                '7': '2456',
                '14': '58CD',
                '16': '69DEF'
            };
            //#endregion J
            //#region K
            this.#segmentChars[75] = {
                '7': '12346',
                '14': '1468B',
                '16': '2579C'
            };
            //#endregion K
            //#region L
            this.#segmentChars[76] = {
                '7': '146',
                '14': '18D',
                '16': '29EF'
            };
            //#endregion L
            //#region M
            this.#segmentChars[77] = {
                '7': '045',
                '14': '12458C',
                '16': '23569BD'
            };
            //#endregion M
            //#region N
            this.#segmentChars[78] = {
                '7': '01245',
                '14': '1258BC',
                '16': '2369CD'
            };
            //#endregion N
            //#region O
            this.#segmentChars[79] = {
                '7': '012456',
                '14': '0158CD',
                '16': '01269DEF'
            };
            //#endregion O
            //#region P
            this.#segmentChars[80] = {
                '7': '01234',
                '14': '015678',
                '16': '0126789'
            };
            //#endregion P
            //#region Q
            this.#segmentChars[81] = {
                '7': '01236',
                '14': '0158BCD',
                '16': '01269CDEF'
            };
            //#endregion Q
            //#region R
            this.#segmentChars[82] = {
                '7': '0124',
                '14': '015678B',
                '16': '0126789C'
            };
            //#endregion R
            //#region S
            this.#segmentChars[83] = {
                '7': '01356',
                '14': '0167CD',
                '16': '0138DEF'
            };
            //#endregion S
            //#region T
            this.#segmentChars[84] = {
                '7': '025',
                '14': '03A',
                '16': '014B'
            };
            //#endregion T
            //#region U
            this.#segmentChars[85] = {
                '7': '12456',
                '14': '158CD',
                '16': '269DEF'
            };
            //#endregion U
            //#region V
            this.#segmentChars[86] = {
                '7': '1234',
                '14': '1489',
                '16': '259A'
            };
            //#endregion V
            //#region W
            this.#segmentChars[87] = {
                '7': '123456',
                '14': '1589BC',
                '16': '2469ACD'
            };
            //#endregion W
            //#region X
            this.#segmentChars[88] = {
                '7': '135',
                '14': '249B',
                '16': '35AC'
            };
            //#endregion X
            //#region Y
            this.#segmentChars[89] = {
                '7': '12356',
                '14': '24A',
                '16': '35B'
            };
            //#endregion Y
            //#region Z
            this.#segmentChars[90] = {
                '7': '02346',
                '14': '049D',
                '16': '015AEF'
            };
            //#endregion Z
            //#region [
            this.#segmentChars[91] = {
                '7': '0146',
                '14': '018D',
                '16': '14BF'
            };
            //#endregion [
            //#region \
            this.#segmentChars[92] = {
                '7': String.EMPTY,
                '14': '2B',
                '16': '3C'
            };
            //#endregion \
            //#region ]
            this.#segmentChars[93] = {
                '7': '0256',
                '14': '05CD',
                '16': '04BE'
            };
            //#endregion ]
            //#region ^
            this.#segmentChars[94] = {
                '7': String.EMPTY,
                '14': '9B',
                '16': '23'
            };
            //#endregion ^
            //#region _
            this.#segmentChars[95] = {
                '7': '6',
                '14': 'D',
                '16': 'EF'
            };
            //#endregion _
            //#region `
            this.#segmentChars[96] = {
                '7': '1',
                '14': '2',
                '16': '3'
            };
            //#endregion `
            //#region a
            this.#segmentChars[97] = {
                '7': '023456',
                '14': '68AD',
                '16': '016789DEF'
            };
            //#endregion a
            //#region b
            this.#segmentChars[98] = {
                '7': '13456',
                '14': '168BD',
                '16': '2789DEF'
            };
            //#endregion b
            //#region c
            this.#segmentChars[99] = {
                '7': '346',
                '14': '678D',
                '16': '789EF'
            };
            //#endregion c
            //#region d
            this.#segmentChars[100] = {
                '7': '23456',
                '14': '579CD',
                '16': '6789DEF'
            };
            //#endregion d
            //#region e
            this.#segmentChars[101] = {
                '7': '012346',
                '14': '689D',
                '16': '79AEF'
            };
            //#endregion e
            //#region f
            this.#segmentChars[102] = {
                '7': '0134',
                '14': '0168',
                '16': '1478B'
            };
            //#endregion f
            //#region g
            this.#segmentChars[103] = {
                '7': '012356',
                '14': '457CD',
                '16': '012678DF'
            };
            //#endregion g
            //#region h
            this.#segmentChars[104] = {
                '7': '1345',
                '14': '168A',
                '16': '2789D'
            };
            //#endregion h
            //#region i
            this.#segmentChars[105] = {
                '7': '5',
                '14': '0AD',
                '16': '0B'
            };
            //#endregion i
            //#region j
            this.#segmentChars[106] = {
                '7': '256',
                '14': '0CD',
                '16': '6DF'
            };
            //#endregion j
            //#region k
            this.#segmentChars[107] = {
                '7': '01345',
                '14': '34AB',
                '16': '2789C'
            };
            //#endregion k
            //#region l
            this.#segmentChars[108] = {
                '7': '14',
                '14': '3AD',
                '16': '4BF'
            };
            //#endregion l
            //#region m
            this.#segmentChars[109] = {
                '7': '45',
                '14': '678AC',
                '16': '789BD'
            };
            //#endregion m
            //#region n
            this.#segmentChars[110] = {
                '7': '345',
                '14': '68A',
                '16': '789D'
            };
            //#endregion n
            //#region o
            this.#segmentChars[111] = {
                '7': '3456',
                '14': '678CD',
                '16': '789DEF'
            };
            //#endregion o
            //#region p
            this.#segmentChars[112] = {
                '7': '01234',
                '14': '1268',
                '16': '012579'
            };
            //#endregion p
            //#region q
            this.#segmentChars[113] = {
                '7': '01235',
                '14': '457C',
                '16': '01368D'
            };
            //#endregion q
            //#region r
            this.#segmentChars[114] = {
                '7': '34',
                '14': '68',
                '16': '789'
            };
            //#endregion r
            //#region s
            this.#segmentChars[115] = {
                '7': '01356',
                '14': '7BD',
                '16': '8CEF'
            };
            //#endregion s
            //#region t
            this.#segmentChars[116] = {
                '7': '1346',
                '14': '168D',
                '16': '478BF'
            };
            //#endregion t
            //#region u
            this.#segmentChars[117] = {
                '7': '456',
                '14': '8CD',
                '16': '9DEF'
            };
            //#endregion u
            //#region v
            this.#segmentChars[118] = {
                '7': '123',
                '14': 'BC',
                '16': 'CD'
            };
            //#endregion v
            //#region w
            this.#segmentChars[119] = {
                '7': '126',
                '14': '89BC',
                '16': '9ACD'
            };
            //#endregion w
            //#region x
            this.#segmentChars[120] = {
                '7': String.EMPTY,
                '14': '679B',
                '16': '3578AC'
            };
            //#endregion x
            //#region y
            this.#segmentChars[121] = {
                '7': '12356',
                '14': 'BCD',
                '16': '2678DEF'
            };
            //#endregion y
            //#region z
            this.#segmentChars[122] = {
                '7': '02345',
                '14': '69D',
                '16': '7AEF'
            };
            //#endregion z
            //#region {
            this.#segmentChars[123] = {
                '7': String.EMPTY,
                '14': '0269D',
                '16': '147BF'
            };
            //#endregion {
            //#region |
            this.#segmentChars[124] = {
                '7': '14',
                '14': '3A',
                '16': '29'
            };
            //#endregion |
            //#region }
            this.#segmentChars[125] = {
                '7': String.EMPTY,
                '14': '047BD',
                '16': '048BE'
            };
            //#endregion }
            //#region ~
            this.#segmentChars[126] = {
                '7': '3',
                '14': '124',
                '16': '79CD'
            };
            //#endregion ~
            //#endregion
            this.normalizeCaption();
            delete this.tabOrder;
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
        return this.#maxLength;
    }
    set maxLength(newValue) {
        if (core.tools.isNumber(newValue) && this.#maxLength !== newValue) {
            this.#maxLength = newValue;
            this.changeSegmentSize();
        }
    }
    //#endregion maxLength
    //#region autoScroll
    get autoScroll() {
        return this.#autoScroll;
    }
    set autoScroll(newValue) {
        if (core.tools.isBool(newValue) && this.#autoScroll !== newValue) {
            this.#autoScroll = newValue;
            this.update();
        }
    }
    //#endregion autoScroll
    //#region caption
    get caption() {
        return this.#caption;
    }
    set caption(newValue) {
        if (core.tools.isString(newValue) && this.#caption !== newValue) {
            this.#caption = newValue;
            this.#text = this.#caption;
            this.normalizeCaption();
            this.update();
        }
    }
    //#endregion caption
    //#region color
    get color() {
        return this.#color;
    }
    set color(newValue) {
        if (newValue instanceof core.classes.Color && !this.#color.equals(newValue)) {
            this.#color.assign(newValue);
            this.update();
        }
    }
    //#endregion color
    //#region segmentSize
    get segmentSize() {
        return this.#segmentSize;
    }
    set segmentSize(newValue) {
        if (core.tools.valueInSet(newValue, SEGMENTSIZES) && this.#segmentSize !== newValue) {
            this.#segmentSize = newValue;
            this.changeSegmentSize();
        }
    }
    //#endregion segmentSize
    //#region segmentType
    get segmentType() {
        return this.#segmentType;
    }
    set segmentType(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, SEGMENTTYPES) && this.#segmentType !== newValue) {
            this.#segmentType = newValue;
            htmlElement.classList.remove('seven', 'fourteen', 'sixteen');
            switch (this.#segmentType) {
                case SEGMENTTYPES.SEVEN:
                    htmlElement.classList.add('seven');
                    break;
                case SEGMENTTYPES.FOURTEEN:
                    htmlElement.classList.add('fourteen');
                    break;
                case SEGMENTTYPES.SIXTEEN:
                    htmlElement.classList.add('sixteen');
                    break;
            }
            this.createSegments();
        }
    }
    //#endregion segmentType
    //#region caption
    get caption() {
        return this.#caption;
    }
    set caption(newValue) {
        if (core.tools.isString(newValue) && this.#caption !== newValue) {
            this.#caption = newValue;
            this.update();
        }
    }
    //#endregion caption
    //#region scrollSpeed
    get scrollSpeed() {
        return this.#scrollSpeed;
    }
    set scrollSpeed(newValue) {
        if (core.tools.isNumber(newValue) && this.#scrollSpeed !== newValue) {
            this.#scrollSpeed = newValue;
            this.update();
        }
    }
    //#endregion scrollSpeed
    //#region scrollType
    get scrollType() {
        return this.#scrollType;
    }
    set scrollType(newValue) {
        core.tools.valueInSet(newValue, SEGMENTSCROLLTYPES) && this.#scrollType !== newValue && (this.#scrollType = newValue);
    }
    //#endregion scrollType
    //#region scrollDirection
    get scrollDirection() {
        return this.#scrollDirection;
    }
    set scrollDirection(newValue) {
        core.tools.valueInSet(newValue, SEGMENTSCROLLDIRECTIONS) && this.#scrollDir !== newValue
            && (this.#scrollDir = newValue);
    }
    //#endregion scrollDirection
    //#endregion Getters / Setters
    //#region Methods
    //#region normalizeCaption
    normalizeCaption() {
        if (this.#autoAdjustTextLengthWithSpace) {
            if (this.#text.length < this.#maxLength) {
                this.#text = this.#text.padEnd(this.#maxLength, String.SPACE);
            } else {
                const ratio = Math.round(this.#text.length / this.#maxLength);
                this.#text = this.#text.padEnd(ratio * this.#maxLength +
                    (this.#text.length - this.#maxLength), String.SPACE);
            }
        } else if (this.#text.length < this.#maxLength && this.#scrollType !== SEGMENTSCROLLTYPES.RESTART
            && this.#autoScroll) {
            this.#text = this.#text.padEnd(this.#maxLength, String.SPACE);
        }
    }
    //#endregion normalizeCaption
    //#region createSegments
    createSegments() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        const pseudoCssClass = core.types.PSEUDOCSSCLASS;
        const tag = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        //#endregion Variables déclaration
        this.#conts.clear();
        htmlElement.innerHTML = String.EMPTY;
        for (let i = 0; i < this.#maxLength; i++) {
            const div = document.createElement(`${tag}segmentcontainer`);
            div.className = 'segmentContainer';
            this.#conts.push(div);
            for (let j = 0; j < this.#segmentType; j++) {
                const seg = document.createElement(`${tag}segment`);
                seg.className = `segment seg${j}`;
                div.appendChild(seg);
            }
            htmlElement.appendChild(div);
        }
        htmlElementStyle.setProperty(`--${this.internalId}-aligth-color`, this.#color.toRGBAString());
        htmlElementStyle.setProperty(`--${this.internalId}-unaligth-color`, this.#color.toRGBAString());
        // add alight for before/after
        Css.addCSSRule(`#${this.internalId} .segment.alight`, `background-color: var(--${this.internalId}-aligth-color)`);
        Css.addCSSRule(`#${this.internalId} .segment.alight${pseudoCssClass.BEFORE}`,
            `border-bottom-color: var(--${this.internalId}-aligth-color)`);
        Css.addCSSRule(`#${this.internalId} .segment.alight${pseudoCssClass.AFTER}`,
            `border-top-color: var(--${this.internalId}-aligth-color)`);
    }
    //#endregion createSegments
    //#region update
    update() {
        //#region Variables déclaration
        const segmentsTag = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}segment`;
        //#endregion Variables déclaration
        if (this.HTMLElement) {
            // on allume les segments
            this.HTMLElementStyle.setProperty(`--${this.internalId}-aligth-color`,
                this.#color.toRGBAString());
            if (!this.#conts.isEmpty) {
                this.clearAllSegments();
                const txt = this.#text.substr(this.#startIndex, this.#maxLength);
                for (let i = 0, l = txt.length; i < l; i++) {
                    if (this.#segmentChars[txt[i].charCodeAt(0)]) {
                        let charNum;
                        let segements =
                            this.#segmentChars[txt[i].charCodeAt(0)][Convert.intToStr(this.#segmentType)];
                        segements = segements.split(String.EMPTY);
                        const segs = this.#conts[i].querySelectorAll(segmentsTag);
                        for (let j = 0, m = segements.length; j < m; j++) {
                            charNum = ['A', 'B', 'C', 'D', 'E', 'F'].indexOf(segements[j]) > -1
                                ? segements[j].charCodeAt(0) - 55
                                : charNum = int(segements[j]);
                            segs[charNum].classList.add('alight');
                        }
                    }
                }
            }
        }
    }
    //#endregion update
    //#region clearAllSegments
    clearAllSegments() {
        this.#conts.forEach(cont => {
            this.clearSegment(cont);
        });
    }
    //#endregion clearAllSegments
    //#region clearSegment
    clearSegment(segCont) {
        //#region Variables déclaration
        const segmentsTag = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}segment`;
        const segs = Convert.nodeListToArray(segCont.querySelectorAll(segmentsTag));
        //#endregion Variables déclaration
        segs.forEach(seg => {
            seg.classList.remove('alight');
        });
        return segs;
    }
    //#endregion clearSegment
    //#region changeSegmentSize
    changeSegmentSize() {
        this.HTMLElementStyle.transform = `scale(${this.#segmentSize})`;
    }
    //#endregion changeSegmentSize
    //#region loaded
    loaded() {
        this.createSegments();
        super.loaded();
        core.looper.addListener(this);
    }
    //#endregion loaded
    //#region processTick
    processTick() {
        //#region Variables déclaration
        const now = new Date().getTime();
        //#endregion Variables déclaration
        if (this.#autoScroll) {
            if (this.#text.length <= this.#maxLength && this.#scrollType !== SEGMENTSCROLLTYPES.CYCLE) {
                return;
            }
            if (now - this.#lastTime >= this.#scrollSpeed * 1000) {
                if (this.#scrollDir === SEGMENTSCROLLDIRECTIONS.RIGHT2LEFT) {
                    this.#scrollType === SEGMENTSCROLLTYPES.CYCLE
                        ? this.#text = `${this.#text.substring(1)}${this.#text.substring(0, 1)}`
                        : this.#startIndex++;
                } else {
                    this.#scrollType === SEGMENTSCROLLTYPES.CYCLE
                        ? this.#text = `${this.#text.substring(this.#maxLength - 1, this.#maxLength)}${this.#text.substring(0, this.#maxLength - 1)}`
                        : this.#startIndex--;
                }
                if (this.#startIndex > this.#text.length - this.#maxLength) {
                    switch (this.#scrollType) {
                        case SEGMENTSCROLLTYPES.RESTART:
                            this.#startIndex = 0;
                            break;
                        case SEGMENTSCROLLTYPES.REVERSE:
                            if (this.#scrollDir === SEGMENTSCROLLDIRECTIONS.RIGHT2LEFT) {
                                this.#scrollDir = SEGMENTSCROLLDIRECTIONS.LEFT2RIGHT;
                                this.#startIndex -= 2;
                            }
                            break;
                    }
                }
                if (this.#startIndex < 0) {
                    switch (this.#scrollType) {
                        case SEGMENTSCROLLTYPES.RESTART:
                            this.#scrollDir === SEGMENTSCROLLDIRECTIONS.RIGHT2LEFT && (this.#startIndex = 0);
                            //else {
                            //    this.#startIndex = 0;
                            //}
                            break;
                        case SEGMENTSCROLLTYPES.REVERSE:
                            if (this.#scrollDir === SEGMENTSCROLLDIRECTIONS.LEFT2RIGHT) {
                                this.#scrollDir = SEGMENTSCROLLDIRECTIONS.RIGHT2LEFT;
                                this.#startIndex += 2;
                            }
                            break;
                    }
                }
                this.update();
                this.#lastTime = now;
            }
        }
    }
    //#endregion processTick
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const styleRule = core.types.CSSRULEcore.types.STYLE_RULE;
        const pseudoCssClass = core.types.PSEUDOCSSCLASS;
        //#endregion Variables déclaration
        this.#color.destroy();
        Css.removeCSSRule(`#${this.internalId} .segment.alight`, styleRule);
        Css.removeCSSRule(`#${this.internalId} .segment.alight${pseudoCssClass.BEFORE}`, styleRule);
        Css.removeCSSRule(`#${this.internalId} .segment.alight${pseudoCssClass.AFTER}`, styleRule);
        this.#segmentChars.clear();
        this.#segmentChars.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(SegmentLedLabel.prototype, {
    'maxLength': {
        enumerable: !0
    },
    'autoScroll': {
        enumerable: !0
    },
    'scrollSpeed': {
        enumerable: !0
    },
    'color': {
        enumerable: !0
    },
    'segmentSize': {
        enumerable: !0
    },
    'caption': {
        enumerable: !0
    },
    'scrollType': {
        enumerable: !0
    },
    'scrollDir': {
        enumerable: !0
    },
    'autoAdjustTextLengthWithSpace': {
        enumerable: !0
    }
});
Object.seal(SegmentLedLabel);
core.classes.register(core.types.CATEGORIES.EXTENDED, SegmentLedLabel);
//#endregion SegmentLedLabel
//#region Templates
if (core.isHTMLRenderer) {
    const SegmentLedLabelTpl = ['<jagiu-segmentledlabel id="{internalId}" data-class="SegmentLedLabel" class="Control SegmentLedLabel csr_default ',
        'sixteen "><properties>{ "name": "{name}", "caption": "{name}" }</properties></jagiu-segmentledlabel>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: SegmentLedLabel, template: SegmentLedLabelTpl }]);
}
//#endregion
export { SegmentLedLabel };
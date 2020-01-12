(function () {
    $j.types.segmentTypes = {
        SEVEN: 7,
        FOURTEEN: 14,
        SIXTEEN: 16
    };
    $j.types.segmentScrollTypes = {
        RESTART: "restart",
        REVERSE: "reverse",
        CYCLE: "cycle"
    };
    $j.types.segmentScrollDirections = {
        RIGHT2LEFT: "right2left",
        LEFT2RIGHT: "left2right"
    };
    $j.types.segmentSizes = {
        SMALL: 0.5,
        NORMAL: 1,
        MEDIUM: 1.5,
        LARGE: 2
    };
    var SegmentLedLabel = $j.classes.ThemedControl.extend('SegmentLedLabel', {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                delete this.tabOrder;
                this.maxLength = 10;
                this.autoScroll = false;
                this.scrollSpeed = 1;
                this.color = _colors.LIME;
                this.segmentSize = $j.types.segmentSizes.NORMAL;
                this.segmentType = $j.types.segmentTypes.SEVEN;
                this.caption = this.name;
                //#region _segmentChars
                this._segmentChars = [];
                // !
                this._segmentChars[33] = {
                    "7": "14",
                    "14": "3A",
                    "16": "4B"
                };
                // "
                this._segmentChars[34] = {
                    "7": "12",
                    "14": "13",
                    "16": "46"
                };
                // #
                this._segmentChars[35] = {
                    "7": String.EMPTY,
                    "14": "3567ACD",
                    "16": "4678BDEF"
                };
                // $
                this._segmentChars[36] = {
                    "7": String.EMPTY,
                    "14": "01367ACD",
                    "16": "012478BDEF"
                };
                // %
                this._segmentChars[37] = {
                    "7": String.EMPTY,
                    "14": "0134679ACD",
                    "16": "23578ACD"
                };
                // &
                this._segmentChars[38] = {
                    "7": String.EMPTY,
                    "14": "02368BCD",
                    "16": "013579CDEF"
                };
                // '
                this._segmentChars[39] = {
                    "7": "1",
                    "14": "4",
                    "16": "4"
                };
                // (
                this._segmentChars[40] = {
                    "7": "0146",
                    "14": "4B",
                    "16": "5C"
                };
                // )
                this._segmentChars[41] = {
                    "7": "0256",
                    "14": "29",
                    "16": "3A"
                };
                // *
                this._segmentChars[42] = {
                    "7": "12345",

                    "14": "234679AB",
                    "16": "34578ABC"
                };
                // +
                this._segmentChars[43] = {
                    "7": "134",
                    "14": "367A",
                    "16": "478B"
                };
                // ,
                this._segmentChars[44] = {
                    "7": "5",
                    "14": "9",
                    "16": "A"
                };
                // -
                this._segmentChars[45] = {
                    "7": "3",
                    "14": "67",
                    "16": "78"
                };
                // .
                this._segmentChars[46] = {
                    "7": String.EMPTY,
                    "14": "7",
                    "16": "B"
                };
                // /
                this._segmentChars[47] = {
                    "7": "24",
                    "14": "49",
                    "16": "5A"
                };
                // 0
                this._segmentChars[48] = {
                    "7": "012456",
                    "14": "014589CD",
                    "16": "012569ADEF"
                };
                // 1
                this._segmentChars[49] = {
                    "7": "25",
                    "14": "3A",
                    "16": "6D"
                };
                // 2
                this._segmentChars[50] = {
                    "7": "02346",
                    "14": "05678D",
                    "16": "016789EF"
                };
                // 3
                this._segmentChars[51] = {
                    "7": "02356",
                    "14": "0567CD",
                    "16": "01678DEF"
                };
                // 4
                this._segmentChars[52] = {
                    "7": "1235",
                    "14": "1567C",
                    "16": "2678D"
                };
                // 5
                this._segmentChars[53] = {
                    "7": "01356",
                    "14": "0167CD",
                    "16": "01278DEF"
                };
                // 6
                this._segmentChars[54] = {
                    "7": "013456",
                    "14": "01678CD",
                    "16": "012789DEF"
                };
                // 7
                this._segmentChars[55] = {
                    "7": "025",
                    "14": "05C",
                    "16": "0126D"
                };
                // 8
                this._segmentChars[56] = {
                    "7": "0123456",
                    "14": "015678CD",
                    "16": "0126789DEF"
                };
                // 9
                this._segmentChars[57] = {
                    "7": "012350",
                    "14": "01567CD",
                    "16": "012678DEF"
                };
                // :
                this._segmentChars[58] = {
                    "7": String.EMPTY,
                    "14": "0",
                    "16": "4B"
                };
                // ;
                this._segmentChars[59] = {
                    "7": String.EMPTY,
                    "14": "09",
                    "16": "4A"
                };
                // <
                this._segmentChars[60] = {
                    "7": String.EMPTY,
                    "14": "49D",
                    "16": "5AEF"
                };
                // =
                this._segmentChars[61] = {
                    "7": "36",
                    "14": "67D",
                    "16": "78EF"
                };
                // >
                this._segmentChars[62] = {
                    "7": String.EMPTY,
                    "14": "2BD",
                    "16": "3CEF"
                };
                // ?
                this._segmentChars[63] = {
                    "7": "0234",
                    "14": "057A",
                    "16": "01268B"
                };
                // @
                this._segmentChars[64] = {
                    "7": "013456",
                    "14": "0568ACD",
                    "16": "012689BDF"
                };
                // A
                this._segmentChars[65] = {
                    "7": "012345",
                    "14": "015678C",
                    "16": "0126789D"
                };
                // B
                this._segmentChars[66] = {
                    "7": "0123456",
                    "14": "0357ACD",
                    "16": "0125789DEF"
                };
                // C
                this._segmentChars[67] = {
                    "7": "0146",
                    "14": "018D",
                    "16": "0129EF"
                };
                // D
                this._segmentChars[68] = {
                    "7": "02456",
                    "14": "035ACD",
                    "16": "0146BDEF"
                };
                // E
                this._segmentChars[69] = {
                    "7": "01346",
                    "14": "0168D",
                    "16": "012789EF"
                };
                // F
                this._segmentChars[70] = {
                    "7": "0134",
                    "14": "0168",
                    "16": "012789"
                };
                // G
                this._segmentChars[71] = {
                    "7": "01456",
                    "14": "0178CD",
                    "16": "01289DEF"
                };
                // H
                this._segmentChars[72] = {
                    "7": "12345",
                    "14": "15678C",
                    "16": "26789D"
                };
                // I
                this._segmentChars[73] = {
                    "7": "25",
                    "14": "03AD",
                    "16": "014BEF"
                };
                // J
                this._segmentChars[74] = {
                    "7": "2456",
                    "14": "58CD",
                    "16": "69DEF"
                };
                // K
                this._segmentChars[75] = {
                    "7": "12346",
                    "14": "1468B",
                    "16": "2579C"
                };
                // L
                this._segmentChars[76] = {
                    "7": "146",
                    "14": "18D",
                    "16": "29EF"
                };
                // M
                this._segmentChars[77] = {
                    "7": "045",
                    "14": "12458C",
                    "16": "23569BD"
                };
                // N
                this._segmentChars[78] = {
                    "7": "01245",
                    "14": "1258BC",
                    "16": "2369CD"
                };
                // O
                this._segmentChars[79] = {
                    "7": "012456",
                    "14": "0158CD",
                    "16": "01269DEF"
                };
                // P
                this._segmentChars[80] = {
                    "7": "01234",
                    "14": "015678",
                    "16": "0126789"
                };
                // Q
                this._segmentChars[81] = {
                    "7": "01236",
                    "14": "0158BCD",
                    "16": "01269CDEF"
                };
                // R
                this._segmentChars[82] = {
                    "7": "0124",
                    "14": "015678B",
                    "16": "0126789C"
                };
                // S
                this._segmentChars[83] = {
                    "7": "01356",
                    "14": "0167CD",
                    "16": "0138DEF"
                };
                // T
                this._segmentChars[84] = {
                    "7": "025",
                    "14": "03A",
                    "16": "014B"
                };
                // U
                this._segmentChars[85] = {
                    "7": "12456",
                    "14": "158CD",
                    "16": "269DEF"
                };
                // V
                this._segmentChars[86] = {
                    "7": "1234",
                    "14": "1489",
                    "16": "259A"
                };
                // W
                this._segmentChars[87] = {
                    "7": "123456",
                    "14": "1589BC",
                    "16": "2469ACD"
                };
                // X
                this._segmentChars[88] = {
                    "7": "135",
                    "14": "249B",
                    "16": "35AC"
                };
                // Y
                this._segmentChars[89] = {
                    "7": "12356",
                    "14": "24A",
                    "16": "35B"
                };
                // Z
                this._segmentChars[90] = {
                    "7": "02346",
                    "14": "049D",
                    "16": "015AEF"
                };
                // [
                this._segmentChars[91] = {
                    "7": "0146",
                    "14": "018D",
                    "16": "14BF"
                };
                // \
                this._segmentChars[92] = {
                    "7": String.EMPTY,
                    "14": "2B",
                    "16": "3C"
                };
                // ]
                this._segmentChars[93] = {
                    "7": "0256",
                    "14": "05CD",
                    "16": "04BE"
                };
                // ^
                this._segmentChars[94] = {
                    "7": String.EMPTY,
                    "14": "9B",
                    "16": "23"
                };
                // _
                this._segmentChars[95] = {
                    "7": "6",
                    "14": "D",
                    "16": "EF"
                };
                // `
                this._segmentChars[96] = {
                    "7": "1",
                    "14": "2",
                    "16": "3"
                };
                // a
                this._segmentChars[97] = {
                    "7": "023456",
                    "14": "68AD",
                    "16": "016789DEF"
                };
                // b
                this._segmentChars[98] = {
                    "7": "13456",
                    "14": "168BD",
                    "16": "2789DEF"
                };
                // c
                this._segmentChars[99] = {
                    "7": "346",
                    "14": "678D",
                    "16": "789EF"
                };
                // d
                this._segmentChars[100] = {
                    "7": "23456",
                    "14": "579CD",
                    "16": "6789DEF"
                };
                // e
                this._segmentChars[101] = {
                    "7": "012346",
                    "14": "689D",
                    "16": "79AEF"
                };
                // f
                this._segmentChars[102] = {
                    "7": "0134",
                    "14": "0168",
                    "16": "1478B"
                };
                // g
                this._segmentChars[103] = {
                    "7": "012356",
                    "14": "457CD",
                    "16": "012678DF"
                };
                // h
                this._segmentChars[104] = {
                    "7": "1345",
                    "14": "168A",
                    "16": "2789D"
                };
                // i
                this._segmentChars[105] = {
                    "7": "5",
                    "14": "0AD",
                    "16": "0B"
                };
                // j
                this._segmentChars[106] = {
                    "7": "256",
                    "14": "0CD",
                    "16": "6DF"
                };
                // k
                this._segmentChars[107] = {
                    "7": "01345",
                    "14": "34AB",
                    "16": "2789C"
                };
                // l
                this._segmentChars[108] = {
                    "7": "14",
                    "14": "3AD",
                    "16": "4BF"
                };
                // m
                this._segmentChars[109] = {
                    "7": "45",
                    "14": "678AC",
                    "16": "789BD"
                };
                // n
                this._segmentChars[110] = {
                    "7": "345",
                    "14": "68A",
                    "16": "789D"
                };
                // o
                this._segmentChars[111] = {
                    "7": "3456",
                    "14": "678CD",
                    "16": "789DEF"
                };
                // p
                this._segmentChars[112] = {
                    "7": "01234",
                    "14": "1268",
                    "16": "012579"
                };
                // q
                this._segmentChars[113] = {
                    "7": "01235",
                    "14": "457C",
                    "16": "01368D"
                };
                // r
                this._segmentChars[114] = {
                    "7": "34",
                    "14": "68",
                    "16": "789"
                };
                // s
                this._segmentChars[115] = {
                    "7": "01356",
                    "14": "7BD",
                    "16": "8CEF"
                };
                // t
                this._segmentChars[116] = {
                    "7": "1346",
                    "14": "168D",
                    "16": "478BF"
                };
                // u
                this._segmentChars[117] = {
                    "7": "456",
                    "14": "8CD",
                    "16": "9DEF"
                };
                // v
                this._segmentChars[118] = {
                    "7": "123",
                    "14": "BC",
                    "16": "CD"
                };
                // w
                this._segmentChars[119] = {
                    "7": "126",
                    "14": "89BC",
                    "16": "9ACD"
                };
                // x
                this._segmentChars[120] = {
                    "7": String.EMPTY,
                    "14": "679B",
                    "16": "3578AC"
                };
                // y
                this._segmentChars[121] = {
                    "7": "12356",
                    "14": "BCD",
                    "16": "2678DEF"
                };
                // z
                this._segmentChars[122] = {
                    "7": "02345",
                    "14": "69D",
                    "16": "7AEF"
                };
                // {
                this._segmentChars[123] = {
                    "7": String.EMPTY,
                    "14": "0269D",
                    "16": "147BF"
                };
                // |
                this._segmentChars[124] = {
                    "7": "14",
                    "14": "3A",
                    "16": "29"
                };
                // }
                this._segmentChars[125] = {
                    "7": String.EMPTY,
                    "14": "047BD",
                    "16": "048BE"
                };
                // ~
                this._segmentChars[126] = {
                    "7": "3",
                    "14": "124",
                    "16": "79CD"
                };
                //#endregion
                this._conts = [];
                this._lastTime = new Date().getTime();
                this._startIndex = 0;
                this.scrollType = $j.types.segmentScrollTypes.CYCLE;
                this.scrollDir = $j.types.segmentScrollDirections.LEFT2RIGHT;
                this._text = this.caption;
            }
        },
        //#region setters
        setMaxLength: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.maxLength !== newValue) {
                this.maxLength = newValue;
                this.changeSegmentSize();
            }
        },
        setAutoScroll: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.autoScroll !== newValue) {
                this.autoScroll = newValue;
                this.update();
            }
        },
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.caption !== newValue) {
                this.caption = newValue;
                this._text = this.caption;
                if (this._text.length < this.maxLength && this.scrollType !== $j.types.segmentScrollTypes.RESTART) this._text = this._text.padRight(this.maxLength, String.SPACE);
                this.update();
            }
        },
        setColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (!this.color.equals(newValue)) {
                this.color.assign(newValue);
                this.update();
            }
        },
        setSegmentSize: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.segmentSizes)) return;
            if (this.segmentSize !== newValue) {
                this.segmentSize = newValue;
                this.changeSegmentSize();
            }
        },
        setSegmentType: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.segmentTypes)) return;
            if (this.segmentType !== newValue) {
                this.segmentType = newValue;
                $j.CSS.removeClass(this._HTMLElement, "seven fourteen sixteen");
                switch (this.segmentType) {
                    case $j.types.segmentTypes.SEVEN:
                        $j.CSS.addClass(this._HTMLElement, "seven");
                        break;
                    case $j.types.segmentTypes.FOURTEEN:
                        $j.CSS.addClass(this._HTMLElement, "fourteen");
                        break;
                    case $j.types.segmentTypes.SIXTEEN:
                        $j.CSS.addClass(this._HTMLElement, "sixteen");
                        break;
                }
                this.createSegments();
            }
        },
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.caption !== newValue) {
                this.caption = newValue;
                this.update();
            }
        },
        setScrollSpeed: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.scrollSpeed !== newValue) {
                this.scrollSpeed = newValue;
                this.update();
            }
        },
        setScrollType: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.segmentScrollTypes)) return;
            if (this.scrollType !== newValue) {
                this.scrollType = newValue;
            }
        },
        setScrollDirection: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.segmentScrollDirections)) return;
            if (this.scrollDir !== newValue) {
                this.scrollDir = newValue;
            }
        },
        //#endregion
        //#region Methods
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.maxlength;
            if (data) this.maxLength = ~~data;
            data = this._HTMLElement.dataset.caption;
            if (data) {
                this.caption = data;
                this._text = this.caption;
                if (this._text.length < this.maxLength && this.scrollType !== $j.types.segmentScrollTypes.RESTART) this._text = this._text.padRight(this.maxLength, String.SPACE);
            }
            data = this._HTMLElement.dataset.autoscroll;
            if (data) this.autoScroll = _conv.strToBool(data);
            data = this._HTMLElement.dataset.scrollspeed;
            if (data) this.scrollSpeed = ~~data;
            data = this._HTMLElement.dataset.segmenttype;
            if (data) this.segmentType = ~~data;
            data = this._HTMLElement.dataset.segmentsize;
            if (data) this.segmentSize = ~~data;
            data = this._HTMLElement.dataset.color;
            if (data) this.color.assign(_colors.parse(data));
            data = this._HTMLElement.dataset.scrolltype;
            if (data) this.scrollType = data;
            data = this._HTMLElement.dataset.scrolldir;
            if (data) this.scrollDir = data;
        },
        createSegments: function () {
            var i, div, seg, j;
            this._conts.clear();
            this._HTMLElement.innerHTML = String.EMPTY;
            for (i = 0; i < this.maxLength; i++) {
                div = $j.doc.createElement($j.types.HTMLElements.DIV);
                div.className = "segmentContainer";
                this._conts.push(div);
                for (j = 0; j < this.segmentType; j++) {
                    seg = $j.doc.createElement($j.types.HTMLElements.DIV);
                    seg.className = "segment seg" + j;
                    div.appendChild(seg);
                }
                this._HTMLElement.appendChild(div);
            }
        },
        update: function () {
            var txt = this._text, segements, i, l, j, m, segs, charNum;
            if (!this._HTMLElement) return;
            // on allume les segments
            this._HTMLElementStyle.setProperty("--aligth-color", this.color.toARGBString());
            if (!this._conts.isEmpty()) {
                this.clearAllSegments();
                txt = this._text.substr(this._startIndex, this.maxLength);
                for (i = 0, l = txt.length; i < l; i++) {
                    if (this._segmentChars[txt[i].charCodeAt(0)]) {
                        segements = this._segmentChars[txt[i].charCodeAt(0)][_conv.intToStr(this.segmentType)];
                        segements = segements.split(String.EMPTY);
                        segs = this._conts[i].querySelectorAll("div");
                        for (j = 0, m = segements.length; j < m; j++) {
                            if (["A", "B", "C", "D", "E", "F"].indexOf(segements[j]) > -1) charNum = segements[j].charCodeAt(0) - 55;
                            else charNum = ~~segements[j];
                            $j.CSS.addClass(segs[charNum], "alight");
                        }
                    }
                }
            }
        },
        clearAllSegments: function () {
            var i, l, segs;
            for (i = 0, l = this._conts.length; i < l; i++) this.clearSegment(this._conts[i]);
        },
        clearSegment: function (segCont) {
            var i, l, segs;
            segs = segCont.querySelectorAll("div");
            for (i = 0, l = segs.length; i < l; i++) $j.CSS.removeClass(segs[i], "alight");
            return segs;
        },
        changeSegmentSize: function () {
            this._HTMLElementStyle.transform = "scale(" + this.segmentSize + ")";
        },
        loaded: function () {
            this._inherited();
            this.createSegments();
            this.update();
            $j.looper.addListener(this);
        },
        processTick: function () {
            var now = new Date().getTime();
            if (!this.autoScroll) return;
            if (this._text.length <= this.maxLength && this.scrollType !== $j.types.segmentScrollTypes.CYCLE) return;
            if (now - this._lastTime >= this.scrollSpeed * 1000) {
                if (this.scrollDir === $j.types.segmentScrollDirections.RIGHT2LEFT) {
                    if (this.scrollType === $j.types.segmentScrollTypes.CYCLE) this._text = this._text.substring(1) + this._text.substring(0, 1);
                    else this._startIndex++;
                } else {
                    if (this.scrollType === $j.types.segmentScrollTypes.CYCLE) this._text = this._text.substring(this.maxLength - 1, this.maxLength) + this._text.substring(0, this.maxLength - 1);
                    else this._startIndex--;
                }
                if (this._startIndex > this._text.length - this.maxLength) {
                    switch (this.scrollType) {
                        case $j.types.segmentScrollTypes.RESTART:
                            this._startIndex = 0;
                            break;
                        case $j.types.segmentScrollTypes.REVERSE:
                            if (this.scrollDir === $j.types.segmentScrollDirections.RIGHT2LEFT) {
                                this.scrollDir = $j.types.segmentScrollDirections.LEFT2RIGHT;
                                this._startIndex -= 2;
                            }
                            break;
                    }
                }
                if (this._startIndex < 0) {
                    switch (this.scrollType) {
                        case $j.types.segmentScrollTypes.RESTART:
                            if (this.scrollDir === $j.types.segmentScrollDirections.RIGHT2LEFT) this._startIndex = 0;
                            else this._startIndex = 0;
                            break;
                        case $j.types.segmentScrollTypes.REVERSE:
                            if (this.scrollDir === $j.types.segmentScrollDirections.LEFT2RIGHT) {
                                this.scrollDir = $j.types.segmentScrollDirections.RIGHT2LEFT;
                                this._startIndex += 2;
                            }
                            break;
                    }
                }
                this.update();
                this._lastTime = now;
            }
        },
        destroy: function () {
            this.color.destroy();
            this.color = null;
            this.segmentType = null;
            this._inherited();
        }
        //#endregion
    });
    Object.seal(SegmentLedLabel);
    $j.classes.register($j.types.categories.EXTENDED, SegmentLedLabel);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var SegmentLedLabelTpl = "<div id='{internalId}' data-name='{name}' data-class='SegmentLedLabel' class='Control csr_default SegmentLedLabel {theme}'>{caption}</div>";
        $j.classes.registerTemplates([{ Class: SegmentLedLabel, template: SegmentLedLabelTpl }]);
    }
    //endregion
})();
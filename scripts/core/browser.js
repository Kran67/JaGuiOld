//#region browser
/**
 * Class representing a browser.
 */
class Browser {
    /**
     * Create a new instance of Browser.
     */
    constructor() {
        //#region Properties
        //#region Private Properties
        const _n = navigator;
        const _av = _n.appVersion;
        let _ie = !1;
        let _ff = !1;
        let _opera = window.opera !== undefined;
        let _mac = _av.indexOf('Macintosh') !== -1;
        let _safari = !1;
        let _chrome = window.chrome !== undefined;
        let _khtml = _av.indexOf('Konqueror') !== -1;
        let _iphone = navigator.platform.indexOf('iPhone') !== -1 || navigator.platform.indexOf('iPod') !== -1;
        let _webkit = _av.indexOf('WebKit') !== -1;
        let _coreVersion = float(_av);
        let _vendorPrefix = null;
        //#endregion Private Properties
        //#endregion Properties
        _chrome && (_coreVersion = +_av.split('Chrome/')[1]);
        if (_webkit && !_chrome) {
            _safari = _av.indexOf('Safari') !== -1;
            _safari && (coreVersion = +_av.split('Version/')[1]);
        }
        if (!_ie && !_opera && !_webkit && !_khtml && !_chrome && !_safari && !_iphone) {
            _n.appCodeName === 'Mozilla' && (_ff = !0);
        }
        if (!_ie) {
            const match = _n.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
            if (match) {
                _ie = match.length > 0;
                _coreVersion = match ? int(match[1]) : 0;
            }
        }
        if (_ie) {
            _vendorPrefix = '-ms-';
        } else if (_ff) {
            _vendorPrefix = '-moz-';
        } else if (_opera && _coreVersion < 15) {
            _vendorPrefix = '-o-';
        } else if (_safari || _chrome || _khtml) {
            _vendorPrefix = '-webkit-';
        }
        //#region Public Properties
        Object.defineProperties(this, {
            'ie': {
                enumerable: !1,
                configurable: !0,
                value: _ie
            },
            'ff': {
                enumerable: !1,
                configurable: !0,
                value: _ff
            },
            'opera': {
                enumerable: !1,
                configurable: !0,
                value: _opera
            },
            'mac': {
                enumerable: !1,
                configurable: !0,
                value: _mac
            },
            'safari': {
                enumerable: !1,
                configurable: !0,
                value: _safari
            },
            'chrome': {
                enumerable: !1,
                configurable: !0,
                value: _chrome
            },
            'khtml': {
                enumerable: !1,
                configurable: !0,
                value: _khtml
            },
            'iphone': {
                enumerable: !1,
                configurable: !0,
                value: _iphone
            },
            'webkit': {
                enumerable: !1,
                configurable: !0,
                value: _webkit
            },
            'coreVersion': {
                enumerable: !1,
                configurable: !0,
                value: _coreVersion
            },
            'vendorPrefix': {
                enumerable: !1,
                configurable: !0,
                value: _vendorPrefix
            },
            'webkitCSSPrefix': {
                enumerable: !1,
                configurable: !0,
                value: ['animation', 'animation-delay', 'animation-direction', 'animation-duration',
                    'animation-fill-mode', 'animation-iteration-count', 'animation-name',
                    'animation-play-state', 'animation-timing-function', 'backface-visibility',
                    'border-image', 'column-count', 'column-gap', 'column-rule', 'column-rule-color',
                    'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns',
                    'keyframes', 'linear-gradient', 'perspective', 'perspective-origin', 'transform-origin',
                    'transform', 'transform-style', 'transition', 'transition-delay', 'transition-duration',
                    'transition-property', 'transition-timing-function']
            },
            'mozillaCSSPrefix': {
                enumerable: !1,
                configurable: !0,
                value: ['box-sizing', 'column-count', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style',
                    'column-rule-width', 'column-width', 'columns', 'linear-gradient', 'tab-size', 'text-align-last',
                    'text-decoration-color', 'text-decoration-line', 'transition-property']
            },
            'msCSSPrefix': {
                enumerable: !1,
                configurable: !0,
                value: ['keyframes', 'linear-gradient', 'transform-origin', 'transform']
            },
            'operaCSSPrefix': {
                enumerable: !1,
                configurable: !0,
                value: ['keyframes', 'linear-gradient', 'tabSize', 'transition-property']
            }
        });
        //#endregion Public Properties
    }
    //#region Methods
    /**
     * Add properties can be binded
     * @return      {String}            Return all browser information in a string
     */
    toString() {
        //#region Variables déclaration
        let info = 'Browser : ';
        //#endregion Variables déclaration
        if (this.ie) {
            info += 'Internet Explorer';
        } else if (this.khtml) {
            info += 'Konqueror';
        } else if (this.opera) {
            info += 'Opera';
        } else if (this.ff) {
            info += 'FireFox';
        } else if (this.safari) {
            info += 'Safari';
        } else if (this.chrome) {
            info += 'Chrome';
        } else if (this.webkit) {
            info += 'WebKit';
        } else if (this.iphone) {
            info += 'IPhone';
            info += `<br />Core version : ${this.coreVersion}`;
            return info;
        }
    }
    /**
     * Add properties can be binded
     * @param       {String}        cssProperty     The css property
     * @return      {String}                        Return the vendor prefix of css property
     */
    getVendorPrefix(cssProperty) {
        //#region Variables déclaration
        let ret = !1;
        //#endregion Variables déclaration
        if (this.ie && this.msCSSPrefix.indexOf(cssProperty) > -1) {
            ret = !0;
        } else if (this.ff && this.mozillaCSSPrefix.indexOf(cssProperty) > -1) {
            ret = !0;
        } else if ((this.chrome || this.safari || this.webkit) && this.webkitCSSPrefix.indexOf(cssProperty) > -1) {
            ret = !0;
        } else if (this.opera) {
            this.coreVersion < 15 && this.operaCSSPrefix.indexOf(cssProperty) > -1 && (ret = !0);
        }
        return ret ? this.vendorPrefix : String.EMPTY;
    }
    /**
     * Add properties can be binded
     * @param       {String}        cssProperty     The css property
     * @return      {String}                        Return the css property with the vendor prefixes
     */
    getVendorPrefixedCssProperty(cssProperty) {
        return this.getVendorPrefix(cssProperty) + cssProperty;
    }
    //#endregion browser
}
Core.browser = new Browser;
//#endregion browser
export { Browser };
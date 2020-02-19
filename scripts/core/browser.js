//#region browser
/**
 * Class representing a browser.
 */
class Browser {
    /**
     * Create a new instance of Browser.
     */
    constructor() {
        //#region Variables déclaration
        const _n = navigator;
        const _av = _n.appVersion;
        let _ie = false;
        let _ff = false;
        let _opera = false;
        let _mac = false;
        let _safari = false;
        let _chrome = false;
        let _khtml = false;
        let _iphone = false;
        let _webkit = false;
        let _coreVersion = ~~parseFloat(_av);
        let _vendorPrefix = null;
        //#endregion Variables déclaration
        _opera = window.opera !== undefined;
        _khtml = _av.indexOf('Konqueror') !== -1;
        _webkit = _av.indexOf('WebKit') !== -1;
        _chrome = window.chrome !== undefined;
        if (_chrome) {
            _coreVersion = +_av.split('Chrome/')[1];
        }
        _mac = _av.indexOf('Macintosh') !== -1;
        if (_webkit && !_chrome) {
            _safari = _av.indexOf('Safari') !== -1;
            if (_safari) {
                _coreVersion = +_av.split('Version/')[1];
            }
        }
        _iphone = navigator.platform.indexOf('iPhone') !== -1 || navigator.platform.indexOf('iPod') !== -1;
        if (!_ie && !_opera && !_webkit && !_khtml && !_chrome && !_safari && !_iphone) {
            if (_n.appCodeName === 'Mozilla') {
                _ff = true;
            }
        }
        if (!_ie) {
            const match = _n.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
            if (match) {
                _ie = match.length > 0;
                _coreVersion = match ? ~~match[1] : 0;
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
        Object.defineProperties(this, {
            'ie': {
                get: () => {
                    return _ie;
                }
            },
            'ff': {
                get: () => {
                    return _ff;
                }
            },
            'opera': {
                get: () => {
                    return _opera;
                }
            },
            'mac': {
                get: () => {
                    return _mac;
                }
            },
            'safari': {
                get: () => {
                    return _safari;
                }
            },
            'chrome': {
                get: () => {
                    return _chrome;
                }
            },
            'khtml': {
                get: () => {
                    return _khtml;
                }
            },
            'iphone': {
                get: () => {
                    return _iphone;
                }
            },
            'webkit': {
                get: () => {
                    return _webkit;
                }
            },
            'coreVersion': {
                get: () => {
                    return _coreVersion;
                }
            },
            'vendorPrefix': {
                get: () => {
                    return _vendorPrefix;
                }
            },
            'webkitCSSPrefix': {
                get: () => {
                    return ['animation', 'animation-delay', 'animation-direction', 'animation-duration',
                        'animation-fill-mode', 'animation-iteration-count', 'animation-name',
                        'animation-play-state', 'animation-timing-function', 'backface-visibility',
                        'border-image', 'column-count', 'column-gap', 'column-rule', 'column-rule-color',
                        'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns',
                        'keyframes', 'linear-gradient', 'perspective', 'perspective-origin', 'transform-origin',
                        'transform', 'transform-style', 'transition', 'transition-delay', 'transition-duration',
                        'transition-property', 'transition-timing-function'];
                }
            },
            'mozillaCSSPrefix': {
                get: () => {
                    return ['box-sizing', 'column-count', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style',
                        'column-rule-width', 'column-width', 'columns', 'linear-gradient', 'tab-size', 'text-align-last',
                        'text-decoration-color', 'text-decoration-line', 'transition-property'];
                }
            },
            'msCSSPrefix': {
                get: () => {
                    return ['keyframes', 'linear-gradient', 'transform-origin', 'transform'];
                }
            },
            'operaCSSPrefix': {
                get: () => {
                    return ['keyframes', 'linear-gradient', 'tabSize', 'transition-property'];
                }
            }
        });
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
        let ret = false;
        //#endregion Variables déclaration
        if (this.ie && this.msCSSPrefix.indexOf(cssProperty) > -1) {
            ret = true;
        } else if (this.ff && this.mozillaCSSPrefix.indexOf(cssProperty) > -1) {
            ret = true;
        } else if ((this.chrome || this.safari || this.webkit) && this.webkitCSSPrefix.indexOf(cssProperty) > -1) {
            ret = true;
        } else if (this.opera) {
            if (this.coreVersion < 15 && this.operaCSSPrefix.indexOf(cssProperty) > -1) {
                ret = true;
            }
        }
        if (ret) {
            return this.vendorPrefix;
        } else {
            return String.EMPTY;
        }
    }
    /**
     * Add properties can be binded
     * @param       {String}        cssProperty     The css property
     * @return      {String}                        Return the css property with the vendor prefixes
     */
    getVendorPrefixedCssProperty(cssProperty) {
        return this.getVendorPrefix(cssProperty) + cssProperty;
    }
    //#endregion
}
Core.browser = new Browser;
//#endregion
export { Browser };
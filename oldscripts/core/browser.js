define(['core'], function (Core) {
    //#region BrowserInfo
    var Browser = Core.Class.extend("BrowserInfo", {
        init: function () {
            var _n = navigator, _av = _n.appVersion, _ie = false, _ff = false, _opera = false, _mac = false, _safari = false, _chrome = false, _khtml = false, _iphone = false, _webkit = false, _coreVersion = parseInt(_av, 10), _vendorPrefix;
            _opera = window.opera !== undefined;
            _khtml = _av.indexOf("Konqueror") !== -1;
            _webkit = _av.indexOf("WebKit") !== -1;
            _chrome = window.chrome !== undefined;
            if (_chrome) _coreVersion = +_av.split("Chrome/")[1];
            _mac = _av.indexOf("Macintosh") !== -1;
            if (_webkit && !_chrome)
            {
                _safari = _av.indexOf("Safari") !== -1;
                if (_safari) _coreVersion = +_av.split("Version/")[1];
            }
            _iphone = (navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPod") !== -1);
            if (!_ie && !_opera && !_webkit && !_khtml && !_chrome && !_safari && !_iphone)
            {
                if (_n.appCodeName === "Mozilla") _ff = true;
            }
            if (!_ie)
            {
                var match = _n.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
                if (match)
                {
                    _ie = match.length > 0;
                    _coreVersion = match ? parseInt(match[1]) : 0;
                }
            }
            if (_ie) _vendorPrefix = "-ms-";
            else if (_ff) _vendorPrefix = "-moz-";
            else if (_opera && _coreVersion < 15) _vendorPrefix = "-o-";
            else if (_safari || _chrome || _khtml) _vendorPrefix = "-webkit-";
            this.ie = _ie;
            this.ff = _ff;
            this.opera = _opera;
            this.mac = _mac;
            this.safari = _safari;
            this.chrome = _chrome;
            this.khtml = _khtml;
            this.iphone = _iphone;
            this.webkit = _webkit;
            this.coreVersion = _coreVersion;
            this.vendorPrefix = _vendorPrefix;
            this.webkitCSSPrefix = ["animation", "animation-delay", "animation-direction", "animation-duration",
                                  "animation-fill-mode", "animation-iteration-count", "animation-name",
                                  "animation-play-state", "animation-timing-function", "backface-visibility",
                                  "border-image", "column-count", "column-gap", "column-rule", "column-rule-color",
                                  "column-rule-style", "column-rule-width", "column-span", "column-width", "columns",
                                  "keyframes", "linear-gradient", "perspective", "perspective-origin", "transform-origin",
                                  "transform", "transform-style", "transition", "transition-delay", "transition-duration",
                                  "transition-property", "transition-timing-function"];
            this.mozillaCSSPrefix = ["box-sizing", "column-count", "column-gap", "column-rule", "column-rule-color", "column-rule-style",
                                  "column-rule-width", "column-width", "columns", "linear-gradient", "tab-size", "text-align-last",
                                  "text-decoration-color", "text-decoration-line", "transition-property"];
            this.msCSSPrefix = ["keyframes", "linear-gradient", "transform-origin", "transform"];
            this.operaCSSPrefix = ["keyframes", "linear-gradient", "tabSize", "transition-property"];
        },
        //#region Methods
        toString: function () {
            /// <summary>
            /// Return the information of the browser
            /// </summary>
            /// <returns type="String"></returns>
            var info = "Browser : ";
            if (this.ie) info += "Internet Explorer";
            else if (this.khtml) info += "Konqueror";
            else if (this.opera) info += "Opera";
            else if (this.ff) info += "FireFox";
            else if (this.safari) info += "Safari";
            else if (this.chrome) info += "Chrome";
            else if (this.webkit) info += "WebKit";
            else if (this.iphone) info += "IPhone";
            info += "<br>Core version : " + this.coreVersion;
            return info;
        },
        getVendorPrefix: function (cssProperty) {
            var ret = false;
            if (this.ie && this.msCSSPrefix.indexOf(cssProperty) > -1) ret = true;
            else if (this.ff && this.mozillaCSSPrefix.indexOf(cssProperty) > -1) ret = true;
            else if ((this.chrome || this.safari || this.webkit) && this.webkitCSSPrefix.indexOf(cssProperty) > -1) ret = true;
            else if (this.opera)
            {
                if (this.coreVersion < 15 && this.operaCSSPrefix.indexOf(cssProperty) > -1) ret = true;
            }
            if (ret) return this.vendorPrefix;
            else return String.EMPTY;
        },
        getVendorPrefixedCssProperty: function (cssProperty) {
            return this.getVendorPrefix(cssProperty) + cssProperty;
        }
        //#endregion
    });
    //#endregion
    return {
        Browser: new Browser
    }
});
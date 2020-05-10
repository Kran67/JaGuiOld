/**********************************************************************************/
/*                                                                                */
/* string.js cette partie définit les fonctions supplémentaires de l'objet String */
/*                                                                                */
/**********************************************************************************/
Object.defineProperties(String, {
    'EMPTY': {
        get: function () {
            return '';
        }
    },
    'SPACE': {
        get: function () {
            return ' ';
        }
    },
    //'isEmpty': {
    //    get: function () {
    //        return this.trim().length < 1;
    //    }
    //},
    'uuid': {
        get: function () {
            const _p8 = (s) => {
                const p = (`${Math.random().toString(16)}000000000`).substr(2, 8);
                return s ? `-${p.substr(0, 4)}-${p.substr(4, 4)}` : p;
            };
            return _p8() + _p8(!0) + _p8(!0) + _p8();
        }
    }
});
Object.defineProperties(String.prototype, {
    'reverse': {
        get: function () {
            //#region Variables déclaration
            let temp = String.EMPTY;
            let z = this.length - 1;
            //#endregion Variables déclaration
            while (z >= 0) {
                temp += this.charAt(z);
                z--;
            }
            return temp;
        }
    },
    // Méthode capitalise ->
    // Retourne la nouvelle chaine
    'capitaliseWords': {
        get: function () {
            return this.replace(/\w+/g, function (a) {
                return [a.charAt(0).toUpperCase(), a.substr(1).toLowerCase()].join(String.EMPTY);
            });
        }
    },
    'firstCharUpper': {
        get: function () {
            return [this.charAt(0).toUpperCase(), this.substr(1).toLowerCase()].join(String.EMPTY);
        }
    },
    // Méthode isNumeric ->
    // Retourne vrai ou faux
    'isNumeric': {
        get: function () {
            return +this === this;
        }
    },
    // Méthode isBoolean ->
    // Retourne vrai ou faux
    'isBoolean': {
        get: function () {
            return this && ('true' === this.trim() || 'false' === this.trim());
        }
    },
    // Méthode isEmpty ->
    // Retourne vrai ou faux
    'isEmpty': {
        get: function () {
            return this === String.EMPTY;
        }
    }
});
// Méthode _replace ->on sauvegarde l'ancienne méthode
//String.prototype._replace=String.prototype.replace;
// Méthode replace ->remplace une portion de texte par une autre
// Paramètre strFind : texte à chercher
// Paramètre strReplace : texte de remplacement
// Retourne la nouvelle chaine
/*String.prototype.replace=function(f,r) {
  if(!f) return this;
  if(!r) r=String.EMPTY;
  f+=String.EMPTY;
  f=f._replace(/(\^|\|\[|\]|\(|\)|\||\*|\+|\.|\?|\{|\}|\\)/gi,"\\1");
  return (this._replace(new RegExp(f,"g"),r));
}*/
// Méthode insert ->insère une chaine à la position pos
// Paramètre str : chaine à insérer
// Paramètre pos : position à laquelle on insère la chaine
// Retourne la nouvelle chaine
// ~~~ à compléter : si la chaîne où insérer est vide,mettre des espaces à gauche
if (!String.prototype.insert) {
    String.prototype.insert = function (s, p) {
        const thisOk = this.length > 0,
            strok = s.length > 0;
        if (!strok) {
            s = thisOk ? this.toString() : String.EMPTY;
        } else {
            if (thisOk) {
                if (p >= 0 && p < this.length) {
                    s = [this.substr(0, p), s, this.substr(p)].join(String.EMPTY);
                } else if (p < 0) {
                    s += this.toString();
                } else {
                    s = [this.toString(), s].join(String.EMPTY);
                }
            } else {
                s = s;
            }
        }
        return s;
    };
}
// Méthode remove ->supprime une portion de chaine
// Paramètre pos : position du premier caractère
// Paramètre len : nombre de caractères
// Retourne la nouvelle chaine
if (!String.prototype.remove) {
    String.prototype.remove = function (p, l) {
        //#region Variables déclaration
        let s = this.substr(0, p);
        //#endregion Variables déclaration
        s += this.substr(p + l);
        return s;
    };
}
// Méthode remove ->supprime une portion de chaine
// Paramètre pos : position du premier caractère
// Paramètre len : nombre de caractères
// Retourne la nouvelle chaine
if (!String.prototype.removeTxt) {
    String.prototype.removeTxt = function (t) { return this.replace(t, String.EMPTY); };
}
// Méthode compareTo ->
// Retourne la nouvelle chaine
if (!String.prototype.compareTo) {
    String.prototype.compareTo = function (s) {
        //#region Variables déclaration
        const a = this.toString();
        const b = s.toString();
        let i = 0;
        const n = Math.max(a.length, b.length);
        //#endregion Variables déclaration
        for (; i < n && a.charAt(i) === b.charAt(i); ++i);
        if (i === n) {
            return 0;
        }
        return a.charAt(i) > b.charAt(i) ? -1 : 1;
    };
}
// Méthode dupeString ->créé une séquence de len caractères contenant _char
// Paramètre _char : caractère à dupliquer
// Paramètre len : nombre de caractères
// Retourne la nouvelle chaine
String.dupeString = function (c, l) {
    if (l <= 0 || !c) {
        return String.EMPTY;
    }
    return Array(l + 1).join(c);
};
if (!String.prototype.mul) {
    // Repeat a string <l> times ("asdf".mul(4) == "asdfasdfasdfasdf")
    String.prototype.mul = function (l) {
        if (l <= 0) {
            return String.EMPTY;
        }
        const a = new Array(l + 1);
        return a.join(this);
    };
}
if (!String.prototype.format) {
    //tools.formatSpecifier = function (s) {
    //    s = s.match(/%(\(\w+\)){0,1}([ 0-]){0,1}(\+){0,1}(\d+){0,1}(\.\d+){0,1}(.)/);
    //    if (s[1])
    //    {
    //        this.key = s[1].slice(1, -1);
    //    } else
    //    {
    //        this.key = null;
    //    }
    //    this.paddingFlag = s[2];
    //    if (this.paddingFlag === "")
    //    {
    //        this.paddingFlag = String.SPACE;
    //    }
    //    this.signed = (s[3] === "+");
    //    this.minLength = ~~s[4];
    //    if (isNaN(this.minLength))
    //    {
    //        this.minLength = 0;
    //    }
    //    if (s[5])
    //    {
    //        this.percision = ~~(s[5].slice(1, s[5].length));
    //    } else
    //    {
    //        this.percision = -1;
    //    }
    //    this.type = s[6];
    //};
    //tools.pad = function (s, flag, len) {
    //    let c, rslt;
    //    if (flag === "-") c = String.SPACE;
    //    else c = String(flag) || String.EMPTY;
    //    rslt = c.mul(len - s.length);
    //    if (flag === "-") rslt = s + rslt;
    //    else rslt += s;
    //    return rslt;
    //};
    /**
     *  Formats a string replacing formatting specifiers with values provided as arguments
     *  which are formatted according to the specifier.
     *  This is an implementation of python's % operator for strings and is similar to sprintf from C.
     *  Usage:
     *  resultString = formatString.format(value1, v2, ...);
     *
     *  Each formatString can contain any number of formatting specifiers which are
     *  replaced with the formated values.
     *
     *  specifier([...]-items are optional):
     *  "%[(key)][flag][sign][min][percision]typeOfValue"
     *
     *  (key) If specified the 1st argument is treated as an object/associative array and the formating values
     *  are retrieved from that object using the key.
     *
     *  flag:
     *  0 Use 0s for padding.
     *  - Left justify result, padding it with spaces.
     *  Use spaces for padding.
     *  sign:
     *  + Numeric values will contain a +|- infront of the number.
     *  min:
     *  l The string will be padded with the padding character until it has a minimum length of l.
     *  percision:
     *  .x Where x is the percision for floating point numbers and the lenght for 0 padding for integers.
     *  typeOfValue:
     *  d Signed integer decimal.
     *  i Signed integer decimal.
     *  b Unsigned binary. //This does not exist in python!
     *  o Unsigned octal.
     *  u Unsigned decimal.
     *  x Unsigned hexidecimal (lowercase).
     *  X Unsigned hexidecimal (uppercase).
     *  e Floating point exponential format (lowercase).
     *  E Floating point exponential format (uppercase).
     *  f Floating point decimal format.
     *  F Floating point decimal format.
     *  c Single character (accepts byte or single character string).
     *  s String (converts any object using object.toString()).
     *  Examples:
     *  "%02d".format(8) == "08"
     *  "%05.2f".format(1.234) == "01.23"
     *  "123 in binary is: %08b".format(123) == "123 in binary is: 01111011"
     *
     *  @param * Each parameter is treated as a formating value.
     *  @return The formated String.
     */
    String.prototype.format = function () {
        const sf = this.match(/(%(\(\w+\)){0,1}[ 0-]{0,1}(\+){0,1}(\d+){0,1}(\.\d+){0,1}[dibouxXeEfFgGcrs%])|([^%]+)/g);
        if (sf) {
            if (sf.join(String.EMPTY) !== this.toString()) {
                throw 'Unsupported formating string.';
            }
        } else {
            throw 'Unsupported formating string.';
        }
        let rslt = String.EMPTY;
        let obj = null;
        let cnt = 0;
        let sign = String.EMPTY;
        sf.forEach(s => {
            if (s === '%%') {
                s = '%';
            } else if (s === '%s') { //making %s faster
                if (cnt >= arguments.length) {
                    throw 'Not enough arguments for format string.';
                } else {
                    obj = arguments[cnt];
                    cnt++;
                }
                if (!obj) {
                    obj = 'null';
                } else if (obj === undefined) {
                    obj = 'undefined';
                }
                s = obj.toString();
            } else if (s.slice(0, 1) === '%') {
                const frmt = new core.tools.formatSpecifier(s);//get the formating object
                if (frmt.key) {//an object was given as formating value
                    if (core.tools.isObject(arguments[0]) && arguments.length === 1) {
                        obj = arguments[0][frmt.key];
                    } else {
                        throw 'Object or associative array expected as formating value.';
                    }
                } else {//get the current value
                    if (cnt >= arguments.length) {
                        throw 'Not enough arguments for format string.';
                    } else {
                        obj = arguments[cnt];
                        cnt++;
                    }
                }
                if (frmt.type === 's') {//String
                    if (!obj) {
                        obj = 'null';
                    } else if (obj === undefined) {
                        obj = 'undefined';
                    }
                    s = obj.toString();
                    s = core.tools.pad(s, frmt.paddingFlag, frmt.minLength);
                } else if (frmt.type === 'c') {//Character
                    frmt.paddingFlag === '0' && (frmt.paddingFlag = String.SPACE);//padding only spaces
                    if (core.tools.isNumber(obj)) {//get the character code
                        s = String.fromCharCode(obj);
                        s = core.tools.pad(s, frmt.paddingFlag, frmt.minLength);
                    } else if (core.tools.isString(obj)) {
                        if (obj.length === 1) {//make sure it's a single character
                            s = obj;
                            s = core.tools.pad(s, frmt.paddingFlag, frmt.minLength);
                        } else {
                            throw 'Character of length 1 required.';
                        }
                    } else {
                        throw 'Character or Byte required.';
                    }
                } else if (core.tools.isNumber(obj)) {
                    //get sign of the number
                    if (obj < 0) {
                        obj = -obj;
                        sign = '-'; //negative signs are always needed
                    } else if (frmt.signed) {
                        sign = '+'; // if sign is always wanted add it
                    } else {
                        sign = String.EMPTY;
                    }
                    //do percision padding and number conversions
                    switch (frmt.type) {
                        case 'f': //floats
                        case 'F':
                            s = frmt.percision > -1 ? obj.toFixed(frmt.percision).toString() : obj.toString();
                            break;
                        case 'E': //exponential
                        case 'e':
                            s = frmt.percision > -1 ? obj.toExponential(frmt.percision) : obj.toExponential();
                            s = s.replace('e', frmt.type);
                            break;
                        case 'b': //binary
                            s = obj.toString(2);
                            s = core.tools.pad(s, '0', frmt.percision);
                            break;
                        case 'o': //octal
                            s = obj.toString(8);
                            s = core.tools.pad(s, '0', frmt.percision);
                            break;
                        case 'x': //hexadecimal
                            s = obj.toString(16).toLowerCase();
                            s = core.tools.pad(s, '0', frmt.percision);
                            break;
                        case 'X': //hexadecimal
                            s = obj.toString(16).toUpperCase();
                            s = core.tools.pad(s, '0', frmt.percision);
                            break;
                        default: //integers
                            s = ~~obj;
                            s = s.toString();
                            s = core.tools.pad(s, '0', frmt.percision);
                            break;
                    }
                    //make sure that the length of the possible sign is not ignored
                    frmt.paddingFlag === '0' && (s = core.tools.pad(s, '0', frmt.minLength - sign.length));
                    s = sign + s;//add sign
                    s = core.tools.pad(s, frmt.paddingFlag, frmt.minLength);//do padding and justifiing
                } else {
                    throw 'Number required.';
                }
            }
            rslt += s;
        });
        return rslt;
    };
}
String.uniqueId = function (size) {
    size > 2 && size < 8 || (size = 7);
    return `_${Math.random().toString(36).split(".")[1].substring(0, size)}`;
};
String.isNullOrEmpty = function (str) {
    return !(str && core.tools.isString(str));
};
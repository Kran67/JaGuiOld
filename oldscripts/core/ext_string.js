/**********************************************************************************/
/*                                                                                */
/* string.js cette partie définit les fonctions supplémentaires de l'objet String */
/*                                                                                */
/**********************************************************************************/
define(['tools'], function (Tools) {
    String.EMPTY = "";
    String.SPACE = " ";
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
    // Méthode trimStart ->supprime les espaces en début de la chaine
    // Retourne la nouvelle chaine
    if (!String.prototype.trimStart)
    {
        String.prototype.trimStart = function () { return this.replace(/^\s*/, String.EMPTY); };
    }
    // Méthode trimEnd ->supprime les espaces en fin de la chaine
    // Retourne la nouvelle chaine
    if (!String.prototype.trimEnd)
    {
        String.prototype.trimEnd = function () { return this.replace(/\s*/, String.EMPTY); };
    }
    // Méthode trim ->supprime les espaces en début et fin de la chaine
    // Retourne la nouvelle chaine
    if (!String.prototype.trim)
    {
        String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, String.EMPTY); };
    }
    // Méthode endsWith ->teste si la chaine finie par texte
    // Paramètre texte : chaine à vérifier
    // Retourne vrai si la chaine finie bien par str sinon faux
    if (!String.prototype.endsWith)
    {
        String.prototype.endsWith = function (t) {
            return this.indexOf(t, this.length - t.length) !== -1;
        };
    }
    // Méthode startsWith ->teste si la chaine commence par texte
    // Paramètre str : chaine à vérifier
    // Retourne vrai si la chaine finie bien par str sinon faux
    if (!String.prototype.startsWith)
    {
        String.prototype.startsWith = function (t) { return this.lastIndexOf(t, 0) === 0; };
    }
    // Méthode isEmpty ->teste si la chaine est vide
    // Retourne vrai si la chaine est vide sinon faux
    if (!String.prototype.isEmpty)
    {
        String.prototype.isEmpty = function () { return this.trim().length < 1; };
    }
    // Méthode reverse ->inverse le contenu de la chaine
    // Retourne la nouvelle chaine
    if (!String.prototype.reverse)
    {
        String.prototype.reverse = function () {
            var temp = String.EMPTY, z = this.length - 1;
            while (z >= 0)
            {
                temp += this.charAt(z);
                z--;
            }
            return temp;
        };
    }
    // Méthode padLeft ->ajoute le complément de chr à gauche si la chaine est plus petite que size
    // Paramètre size : taille que la chaine doit faire au minimum
    // Paramètre chr : caratère pour faire le complément
    // Retourne la nouvelle chaine
    if (!String.prototype.padLeft)
    {
        String.prototype.padLeft = function (l, c) {
            var s = unescape(this);
            if (s.length < l) s = String.dupeString(c, l - s.length) + s;
            return s;
        };
    }
    // Méthode padRight ->ajoute le complément de chr à droite si la chaine est plus petite que size
    // Paramètre size : taille que la chaine doit faire au minimum
    // Paramètre chr : caratère pour faire le complément
    // Retourne la nouvelle chaine
    if (!String.prototype.padRight)
    {
        String.prototype.padRight = function (l, c) {
            var s = unescape(this);
            if (s.length < l) s += String.dupeString(c, l - s.length);
            return s;
        };
    }
    // Méthode contains ->texte si la chaine contient str
    // Paramètre str : chaine à tester
    // Retourne vrai si str est contenu dans la chaine sinon faux
    if (!String.prototype.contains)
    {
        String.prototype.contains = function (s) { return (this.indexOf(s) >= 0); };
    }
    // Méthode insert ->insère une chaine à la position pos
    // Paramètre str : chaine à insérer
    // Paramètre pos : position à laquelle on insère la chaine
    // Retourne la nouvelle chaine
    // ~~~ à compléter : si la chaîne où insérer est vide,mettre des espaces à gauche
    if (!String.prototype.insert)
    {
        String.prototype.insert = function (s, p) {
            var s1 = String.EMPTY, thisok = (this.length > 0),
                strok = (s.length > 0);
            if (!strok)
            {
                if (thisok) s = this.toString();
                else s = String.EMPTY;
            } else
            {
                if (thisok)
                {
                    if ((p >= 0) && (p < this.length))
                    {
                        s = [this.substr(0, p), s, this.substr(p)].join("");
                    } else if (p < 0) s += this.toString();
                    else s = [this.toString(), s].join("");
                } else s = s;
            }
            return s;
        };
    }
    // Méthode remove ->supprime une portion de chaine
    // Paramètre pos : position du premier caractère
    // Paramètre len : nombre de caractères
    // Retourne la nouvelle chaine
    if (!String.prototype.remove)
    {
        String.prototype.remove = function (p, l) {
            var s = this.substr(0, p);
            s += this.substr(p + l);
            return s;
        };
    }
    // Méthode remove ->supprime une portion de chaine
    // Paramètre pos : position du premier caractère
    // Paramètre len : nombre de caractères
    // Retourne la nouvelle chaine
    if (!String.prototype.removeTxt)
    {
        String.prototype.removeTxt = function (t) { return this.replace(t, String.EMPTY); };
    }
    // Méthode capitalise ->
    // Retourne la nouvelle chaine
    if (!String.prototype.capitalise)
    {
        String.prototype.capitalise = function () {
            return this.replace(/\w+/g, function (a) {
                return [a.charAt(0).toUpperCase(), a.substr(1).toLowerCase()].join("");
            });
        };
    }
    if (!String.prototype.firstCharUpper)
    {
        String.prototype.firstCharUpper = function () {
            return [this.charAt(0).toUpperCase(), this.substr(1)].join("");
        };
    }
    // Méthode compareTo ->
    // Retourne la nouvelle chaine
    if (!String.prototype.compareTo)
    {
        String.prototype.compareTo = function (s) {
            var a = this.toString(), b = s.toString();
            for (var i = 0, n = Math.max(a.length, b.length) ; i < n && a.charAt(i) === b.charAt(i) ; ++i);
            if (i === n) return 0;
            return a.charAt(i) > b.charAt(i) ? -1 : 1;
        };
    }
    // Méthode isNumeric ->
    // Retourne vrai ou faux
    if (!String.prototype.isNumeric)
    {
        String.prototype.isNumeric = function () { return +this === this; };
    }
    // Méthode isBoolean ->
    // Retourne vrai ou faux
    if (!String.prototype.isBoolean)
    {
        String.prototype.isBoolean = function () { return (this) && ("true" === this.trim() || "false" === this.trim()); };
    }
    if (!String.prototype.repeat)
    {
        String.prototype.repeat = function (n) {
            if (n <= 0) return String.EMPTY;
            return new Array(1 + n).join(this);
        };
    }
    // Méthode dupeString ->créé une séquence de len caractères contenant _char
    // Paramètre _char : caractère à dupliquer
    // Paramètre len : nombre de caractères
    // Retourne la nouvelle chaine
    String.dupeString = function (c, l) {
        if ((l <= 0) || !c) return String.EMPTY;
        return Array(l + 1).join(c);
    };
    if (!String.prototype.mul)
    {
        // Repeat a string <l> times ("asdf".mul(4) == "asdfasdfasdfasdf")
        String.prototype.mul = function (l) {
            if (l <= 0) return String.EMPTY;
            var a = new Array(l + 1);
            return a.join(this);
        };
    };
    if (!String.prototype.format)
    {
        Tools.formatSpecifier = function (s) {
            s = s.match(/%(\(\w+\)){0,1}([ 0-]){0,1}(\+){0,1}(\d+){0,1}(\.\d+){0,1}(.)/);
            if (s[1])
            {
                this.key = s[1].slice(1, -1);
            } else
            {
                this.key = null;
            }
            this.paddingFlag = s[2];
            if (this.paddingFlag === "")
            {
                this.paddingFlag = String.SPACE;
            }
            this.signed = (s[3] === "+");
            this.minLength = ~~s[4];
            if (isNaN(this.minLength))
            {
                this.minLength = 0;
            }
            if (s[5])
            {
                this.percision = ~~(s[5].slice(1, s[5].length));
            } else
            {
                this.percision = -1;
            }
            this.type = s[6];
        };
        Tools.pad = function (s, flag, len) {
            var c, rslt;
            if (flag === "-") c = String.SPACE;
            else c = String(flag) || String.EMPTY;
            rslt = c.mul(len - s.length);
            if (flag === "-") rslt = s + rslt;
            else rslt += s;
            return rslt;
        };
        /**
          Formats a string replacing formatting specifiers with values provided as arguments
          which are formatted according to the specifier.
          This is an implementation of python's % operator for strings and is similar to sprintf from C.
          Usage:
          resultString = formatString.format(value1, v2, ...);

          Each formatString can contain any number of formatting specifiers which are
          replaced with the formated values.

          specifier([...]-items are optional):
          "%[(key)][flag][sign][min][percision]typeOfValue"

          (key) If specified the 1st argument is treated as an object/associative array and the formating values
          are retrieved from that object using the key.

          flag:
          0 Use 0s for padding.
          - Left justify result, padding it with spaces.
          Use spaces for padding.
          sign:
          + Numeric values will contain a +|- infront of the number.
          min:
          l The string will be padded with the padding character until it has a minimum length of l.
          percision:
          .x Where x is the percision for floating point numbers and the lenght for 0 padding for integers.
          typeOfValue:
          d Signed integer decimal.
          i Signed integer decimal.
          b Unsigned binary. //This does not exist in python!
          o Unsigned octal.
          u Unsigned decimal.
          x Unsigned hexidecimal (lowercase).
          X Unsigned hexidecimal (uppercase).
          e Floating point exponential format (lowercase).
          E Floating point exponential format (uppercase).
          f Floating point decimal format.
          F Floating point decimal format.
          c Single character (accepts byte or single character string).
          s String (converts any object using object.toString()).
          Examples:
          "%02d".format(8) == "08"
          "%05.2f".format(1.234) == "01.23"
          "123 in binary is: %08b".format(123) == "123 in binary is: 01111011"

          @param * Each parameter is treated as a formating value.
          @return The formated String.
        **/
        String.prototype.format = function () {
            var sf = this.match(/(%(\(\w+\)){0,1}[ 0-]{0,1}(\+){0,1}(\d+){0,1}(\.\d+){0,1}[dibouxXeEfFgGcrs%])|([^%]+)/g);
            if (sf)
            {
                if (sf.join("") !== this.toString())
                {
                    throw "Unsupported formating string.";
                }
            } else
            {
                throw "Unsupported formating string.";
            }
            var rslt = "", s, obj, cnt = 0, frmt, sign = "";
            for (var i = 0; i < sf.length; i++)
            {
                s = sf[i];
                if (s === "%%")
                {
                    s = "%";
                } else if (s === "%s")
                { //making %s faster
                    if (cnt >= arguments.length)
                    {
                        throw "Not enough arguments for format string.";
                    } else
                    {
                        obj = arguments[cnt];
                        cnt++;
                    }
                    if (!obj)
                    {
                        obj = "null";
                    } else if (obj === undefined)
                    {
                        obj = "undefined";
                    }
                    s = obj.toString();
                } else if (s.slice(0, 1) === "%")
                {
                    frmt = new Tools.formatSpecifier(s);//get the formating object
                    if (frmt.key)
                    {//an object was given as formating value
                        if ((typeof arguments[0]) === "object" && arguments.length === 1)
                        {
                            obj = arguments[0][frmt.key];
                        } else
                        {
                            throw "Object or associative array expected as formating value.";
                        }
                    } else
                    {//get the current value
                        if (cnt >= arguments.length)
                        {
                            throw "Not enough arguments for format string.";
                        } else
                        {
                            obj = arguments[cnt];
                            cnt++;
                        }
                    }
                    if (frmt.type === "s")
                    {//String
                        if (!obj)
                        {
                            obj = "null";
                        } else if (obj === undefined)
                        {
                            obj = "undefined";
                        }
                        s = obj.toString();
                        s = Tools.pad(s, frmt.paddingFlag, frmt.minLength);
                    } else if (frmt.type === "c")
                    {//Character
                        if (frmt.paddingFlag === "0")
                        {
                            frmt.paddingFlag = String.SPACE;//padding only spaces
                        }
                        if (typeof obj === "number")
                        {//get the character code
                            s = String.fromCharCode(obj);
                            s = Tools.pad(s, frmt.paddingFlag, frmt.minLength);
                        } else if (typeof obj === "string")
                        {
                            if (obj.length === 1)
                            {//make sure it's a single character
                                s = obj;
                                s = Tools.pad(s, frmt.paddingFlag, frmt.minLength);
                            } else
                            {
                                throw "Character of length 1 required.";
                            }
                        } else
                        {
                            throw "Character or Byte required.";
                        }
                    } else if (typeof obj === "number")
                    {
                        //get sign of the number
                        if (obj < 0)
                        {
                            obj = -obj;
                            sign = "-"; //negative signs are always needed
                        } else if (frmt.signed)
                        {
                            sign = "+"; // if sign is always wanted add it
                        } else
                        {
                            sign = "";
                        }
                        //do percision padding and number conversions
                        switch (frmt.type)
                        {
                            case "f": //floats
                            case "F":
                                if (frmt.percision > -1)
                                {
                                    s = obj.toFixed(frmt.percision).toString();
                                } else
                                {
                                    s = obj.toString();
                                }
                                break;
                            case "E": //exponential
                            case "e":
                                if (frmt.percision > -1)
                                {
                                    s = obj.toExponential(frmt.percision);
                                } else
                                {
                                    s = obj.toExponential();
                                }
                                s = s.replace("e", frmt.type);
                                break;
                            case "b": //binary
                                s = obj.toString(2);
                                s = Tools.pad(s, "0", frmt.percision);
                                break;
                            case "o": //octal
                                s = obj.toString(8);
                                s = Tools.pad(s, "0", frmt.percision);
                                break;
                            case "x": //hexadecimal
                                s = obj.toString(16).toLowerCase();
                                s = Tools.pad(s, "0", frmt.percision);
                                break;
                            case "X": //hexadecimal
                                s = obj.toString(16).toUpperCase();
                                s = Tools.pad(s, "0", frmt.percision);
                                break;
                            default: //integers
                                s = ~~(obj)
                                s = s.toString();
                                s = Tools.pad(s, "0", frmt.percision);
                                break;
                        }
                        if (frmt.paddingFlag === "0")
                        {//do 0-padding
                            //make sure that the length of the possible sign is not ignored
                            s = Tools.pad(s, "0", frmt.minLength - sign.length);
                        }
                        s = sign + s;//add sign
                        s = Tools.pad(s, frmt.paddingFlag, frmt.minLength);//do padding and justifiing
                    } else
                    {
                        throw "Number required.";
                    }
                }
                rslt += s;
            }
            frmt = null;
            return rslt;
        };
    }
    String.uuid = function () {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };
    String.uniqueId = function (size) {
        //var uid=0,base62symbols="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(String.EMPTY),
        //    lastTimeStamp=0,currentTimeStamp=new Date().getTime(),
        //    maxTimeStamp=size===3?230000:
        //        size===4?14000000:
        //        size===5?910000000:
        //        size===6?56000000000:
        //        3500000000000;
        size > 2 && size < 8 || (size = 7);//,
        //    toBase=function(number) {
        //      var output=String.EMPTY,nextNumber;
        //      while (number>0) {
        //        nextNumber=Math.floor(number/62);
        //        output=base62symbols[(number-(62*nextNumber))]+output;
        //        number=nextNumber;
        //      }
        //      return output||'0';
        //    },
        //    leftZeroFill=function(input,targetLength) {
        //      while (input.length<targetLength) {
        //        input='0'+input;
        //      }
        //      return input;
        //    };
        //if (lastTimeStamp===currentTimeStamp) uid++;
        //else {
        //  uid=0;
        //  lastTimeStamp=currentTimeStamp;
        //}
        //return leftZeroFill(toBase(currentTimeStamp%maxTimeStamp),size)+toBase(uid);
        return "_" + Math.random().toString(36).split(".")[1].substring(0, size);
    };
});
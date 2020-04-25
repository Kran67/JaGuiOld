/***********************/
/*                     */
/* date.js extend Date */
/*                     */
/***********************/
Object.defineProperty(Date.prototype, 'day', {
    /**
     * Get the day of the current date
     * @returns     {Number}        the day of the date
     */
    get: function () {
        return this.getDate();
    }
});
Object.defineProperty(Date.prototype, 'dayName', {
    /**
     * Get the day name of the current date in the current locale
     * @returns     {String}        the day name of the date
     */
    get: function () {
        return core.tools.getLocale().date.dayNames[this.getDay()];
    }
});
Object.defineProperty(Date.prototype, 'shortDayName', {
    /**
     * Get the short day name of the current date in the current locale
     * @returns     {String}        the short day name of the date
     */
    get: function () {
        return core.tools.getLocale().date.dayNames[this.getDay()].substr(0, 3);
    }
});
Object.defineProperty(Date.prototype, 'month', {
    /**
     * Get the month of the current date
     * @returns     {Number}        the month of the current date
     */
    get: function () {
        return this.getMonth() + 1;
    }
});
Object.defineProperty(Date.prototype, 'monthName', {
    /**
     * Get the name of the month of the current date in the current locale
     * @returns     {String}        the month name of the date
     */
    get: function () {
        return core.tools.getLocale().date.monthNames[this.getMonth()];
    }
});
Object.defineProperty(Date.prototype, 'shortMonthName', {
    /**
     * Get the short name of the month of the current date in the current locale
     * @returns     {String}        the short month name of the date
     */
    get: function () {
        //#region Variables déclaration
        let cMonth = String.EMPTY;
        const nMonth = this.getMonth();
        //#endregion Variables déclaration
        cMonth = core.tools.getLocale().date.monthNames[nMonth];
        nMonth === 5 || nMonth === 6 ? cMonth.remove(2, 1) : 1;
        return cMonth.substr(0, 3);
    }
});
Object.defineProperty(Date.prototype, 'year', {
    /**
     * Get the year of the current date
     * @returns     {Number}        the year of the date
     */
    get: function () {
        return this.getFullYear();
    }
});
Object.defineProperty(Date.prototype, 'hours', {
    /**
     * Get the hours of the current date
     * @returns     {Number}        the hours of the date
     */
    get: function () {
        return this.getHours();
    }
});
Object.defineProperty(Date.prototype, 'minutes', {
    /**
     * Get the minutes of the current date
     * @returns     {Number}        the minutes of the date
     */
    get: function () {
        return this.getMinutes();
    }
});
Object.defineProperty(Date.prototype, 'seconds', {
    /**
     * Get the seconds of the current date
     * @returns     {Number}        the seconds of the date
     */
    get: function () {
        return this.getSeconds();
    }
});
Object.defineProperty(Date.prototype, 'milliseconds', {
    /**
     * Get the milliseconds of the current date
     * @returns     {Number}        the milliseconds of the date
     */
    get: function () {
        return this.getMilliseconds();
    }
});
if (!Date.prototype.addDays) {
    /**
     * Add days on the current date
     * @param       {Number}        d       the number of days to add
     * @returns     {Date}          the new date
     */
    Date.prototype.addDays = function (d) {
        if (core.tools.isNumber(d)) {
            const a = new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
            a.setDate(this.getDate() + d);
            return a;
        }
        return this;
    };
}
if (!Date.prototype.addMonths) {
    /**
     * Add months on the current date
     * @param       {Number}        m       the number of months to add
     * @returns     {Date}          the new date
     */
    Date.prototype.addMonths = function (m) {
        if (core.tools.isNumber(m)) {
            const a = new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
            if (a.getMonth() + m > 11) {
                a.setMonth(0);
                a.setFullYear(a.getFullYear() + 1);
            } else {
                a.setMonth(a.getMonth() + m);
            }
            return a;
        }
        return this;
    };
}
if (!Date.prototype.addYears) {
    /**
     * Add years on the current date
     * @param       {Number}        y       the number of years to add
     * @returns     {Date}          the new date
     */
    Date.prototype.addYears = function (y) {
        if (core.tools.isNumber(y)) {
            const a = new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
            a.setFullYear(a.getFullYear() + y);
            return a;
        }
        return this;
    };
}
if (!Date.prototype.addHours) {
    /**
     * Add hours on the current date
     * @param       {Number}        a       the number of hours to add
     * @returns     {Date}          the new date
     */
    Date.prototype.addHours = function (a) {
        return core.tools.isNumber(a)
            ? this.addMilliseconds(a * 3600000)
            : this;
    };
}
if (!Date.prototype.addMinutes) {
    /**
     * Add minutes on the current date
     * @param       {Number}        a       the number of minutes to add
     * @returns     {Date}          the new date
     */
    Date.prototype.addMinutes = function (a) {
        return core.tools.isNumber(a)
            ? this.addMilliseconds(a * 60000)
            : this;
    };
}
if (!Date.prototype.addSeconds) {
    /**
     * Add seconds on the current date
     * @param       {Number}        a       the number of seconds to add
     * @returns     {Date}          the new date
     */
    Date.prototype.addSeconds = function (a) {
        return core.tools.isNumber(a)
            ? this.addMilliseconds(a * 1000)
            : this;
    };
}
if (!Date.prototype.addMilliseconds) {
    /**
     * Add millieconds on the current date
     * @param       {Number}        m       the number of millieconds to add
     * @returns     {Date}          the new date
     */
    Date.prototype.addMilliseconds = function (m) {
        if (core.tools.isNumber(m)) {
            const a = new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
            a.setMilliseconds(a.getMilliseconds() + m);
            return a;
        }
        return this;
    };
}
if (!Date.prototype.compareTo) {
    /**
     * Compare a date to the current date
     * @param       {Date}          a       the date to compare
     * @returns     {Number}        if the current date is greatter return 1
     *                              if the current date is lower return -1
     *                              if both date are equals return 0
     */
    Date.prototype.compareTo = function (a) {
        if (a == undefined) {
            return !1;
        }
        if (a instanceof Date) {
            return this > a ? 1 : this < a ? -1 : 0;
        } else {
            alert('Invalide Date (Date-compareTo)');
        }
    };
}
if (!Date.prototype.clearTime) {
    /**
     * Clear the time of the current date
     * @returns     {Date}          the current date
     */
    Date.prototype.clearTime = function () {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        return this;
    };
}
Object.defineProperty(Date.prototype, 'isLeapYear', {
    /**
     * Check if the current date is a leap year
     * @returns     {Boolean}       true if the current date is a leap year otherwise false
     */
    get: function () {
        //#region Variables déclaration
        const y = this.getFullYear();
        //#endregion Variables déclaration
        return Math.mod(y, 4) === 0 && Math.mod(y, 100) !== 0 || Math.mod(y, 400) === 0;
    }
});
/**
 * Determines if a date is a LeapYear.
 * @param       {Number}        a       The year (0-9999).
 * @returns     {Boolean}       true if date is within a LeapYear, otherwise false.
*/
Date.isLeapYear = function (a) {
    if (core.tools.isNumber(a)) {
        return Math.mod(a, 4) === 0 && Math.mod(a, 100) !== 0 || Math.mod(a, 400) === 0;
    }
};
/**
 * Get the number of days in the month, given a year and month value. Automatically corrects for LeapYear.
 * @param       {Number}        y       The year (0-9999).
 * @param       {Number}        m       The month (0-11).
 * @returns     {Number}        The number of days in the month.
 */
Date.getDaysInMonth = function (y, m) {
    return core.tools.isNumber(y) && core.tools.isNumber(m)
        ? [31, Date.isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m]
        : 0;
};
Object.defineProperty(Date.prototype, 'daysInMonth', {
    /**
     * Get the number of days in the current month, adjusted for leap year.
     * @returns     {Number}        The number of days in the month
     */
    get: function () {
        return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
    }
});
if (!Date.prototype.equals) {
    /**
     * Check if a date is equals to the current date
     * @param       {Date}          a       the date to compare
     * @returns     {Boolean}       True if equals otherwise false
     */
    Date.prototype.equals = function (a) { return this.compareTo(a) === 0; };
}
if (!Date.prototype.between) {
    /**
     * Check if the current date is between two date
     * @param       {Date}          s       the lower date
     * @param       {Date}          e       the upper date
     * @returns     {Boolean}       true if the date is between the two date otherwise false
     */
    Date.prototype.between = function (s, e) {
        if (s != undefined && e != undefined) {
            if (!(s instanceof Date) || !(e instanceof Date)) {
                return false;
            }
            const t = this.getTime();
            return t >= s.getTime() && t <= e.getTime();
        }
    };
}
if (!Date.prototype.addWeeks) {
    /**
     * Add weeks to the current date
     * @param       {Number}        a       the number of week to add
     * @returns     {Date}          the new date
     */
    Date.prototype.addWeeks = function (a) {
        return core.tools.isNumber(a)
            ? this.addMilliseconds(a * 604800000)
            : this;
    };
}
if (!Date.prototype.JJMMAAAA) {
    /**
     * Convert the current date in french string format
     * @param       {String}        a       String separator
     * @returns     {String}        the string date
     */
    Date.prototype.JJMMAAAA = function (a) {
        !core.tools.isString(a) ? a = '/' : 1;
        return String(this.day).padStart(2, '0') + a + String(this.month).padStart(2, '0') + a + this.year;
    };
}
if (!Date.prototype.HHMMSS) {
    /**
     * Convert the current date in hours minutes seconds format
     * @param       {String}        a       String separator
     * @returns     {String}        the string date
     */
    Date.prototype.HHMMSS = function (a) {
        !core.tools.isString(a) ? a = ':' : 1;
        return String(this.hours).padStart(2, '0') + a + String(this.minutes).padStart(2, '0') + a + String(this.seconds).padStart(2, '0');
    };
}
Object.defineProperty(Date.prototype, 'firstDayOfMonth', {
    /**
     * Get the first day of the month of the current date
     * @returns     {Date}      the new date with the first day
     */
    get: function () {
        return new Date(this.getFullYear(), this.getMonth(), 1, 0, 0, 0, 0);
    }
});
/**
 * Get the current date
 * @returns     {Date}          the current date
 */
Date.toDay = function () {
    return new Date().clearTime();
};
// private
Date.prototype._toString = Date.prototype.toString;
if (!Date.prototype.clone) {
    /**
     * Clone the current date
     * @returns     {Date}      the new date
     */
    Date.prototype.clone = function () {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
    };
}

Object.defineProperty(Date.prototype, 'firstDayOfWeek', {
    /**
     * Get the first day of the week of the current date
     * @returns     {Date}      the new date
     */
    get: function () {
        //#region Variables déclaration
        const w = this.week;
        let d = this.clone();
        let w1 = d.week;
        //#endregion Variables déclaration
        while (w === w1) {
            d = d.addDays(-1);
            w1 = d.week;
        }
        d = d.addDays(1);
        return d;
    }
});

/**
 * Converts the value of the current Date object to its equivalent string representation.
 * Format Specifiers
    <pre>
        Format  Description                                                                  Example
        ------  ---------------------------------------------------------------------------  -----------------------
        s      The seconds of the minute between 1-59.                                      "1" to "59"
        ss     The seconds of the minute with leading zero if required.                     "01" to "59"

        m      The minute of the hour between 0-59.                                         "1"  or "59"
        mm     The minute of the hour with leading zero if required.                        "01" or "59"

        h      The hour of the day between 1-12.                                            "1"  to "12"
        hh     The hour of the day with leading zero if required.                           "01" to "12"

        H      The hour of the day between 1-23.                                            "1"  to "23"
        HH     The hour of the day with leading zero if required.                           "01" to "23"

        d      The day of the month between 1 and 31.                                       "1"  to "31"
        dd     The day of the month with leading zero if required.                          "01" to "31"
        ddd    Abbreviated day name. Date.CultureInfo.abbreviatedDayNames.                  "Mon" to "Sun"
        dddd   The full day name. Date.CultureInfo.dayNames.                                "Monday" to "Sunday"

        M      The month of the year between 1-12.                                          "1" to "12"
        MM     The month of the year with leading zero if required.                         "01" to "12"
        MMM    Abbreviated month name. Date.CultureInfo.abbreviatedMonthNames.              "Jan" to "Dec"
        MMMM   The full month name. Date.CultureInfo.monthNames.                            "January" to "December"

        yy     Displays the year as a maximum two-digit number.                             "99" or "07"
        yyyy   Displays the full four digit year.                                           "1999" or "2007"

        t      Displays the first character of the A.M./P.M. designator.                    "A" or "P"
        Date.CultureInfo.amDesignator or Date.CultureInfo.pmDesignator
        tt     Displays the A.M./P.M. designator.                                           "AM" or "PM"
        Date.CultureInfo.amDesignator or Date.CultureInfo.pmDesignator
    </pre>
 * @param {String}   A format string consisting of one or more format spcifiers [Optional].
 * @return {String}  A string representation of the current Date object.
 */
Date.prototype.toString = function (local, format) {
    format = format || {
        hour12: true,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return new Intl.DateTimeFormat(local).format(this);
    //format = format || String.EMPTY;
    ////#region Variables déclaration
    //const p = (s) => {
    //    return s.toString().length === 1 ? '0' + s : s;
    //};
    //const self = this;
    ////#endregion Variables déclaration
    //return format ? format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g,
    //    (f) => {
    //        if (f === 'hh') {
    //            return p(self.hours < 13 ? self.hours : self.hours - 12);
    //        } else if (f === 'h') {
    //            return self.hours < 13 ? self.hours : self.hours - 12;
    //        } else if (f === 'HH') {
    //            return p(self.hours);
    //        } else if (f === 'H') {
    //            return self.hours;
    //        } else if (f === 'mm') {
    //            return p(self.minutes);
    //        } else if (f === 'm') {
    //            return self.minutes;
    //        } else if (f === 'ss') {
    //            return p(self.seconds);
    //        } else if (f === 's') {
    //            return self.seconds;
    //        } else if (f === 'yyyy') {
    //            return self.year;
    //        } else if (f === 'yy') {
    //            return self.year.toString().substring(2, 4);
    //        } else if (f === 'dddd') {
    //            return self.dayName;
    //        } else if (f === 'ddd') {
    //            return self.shortDayName;
    //        } else if (f === 'dd') {
    //            return p(self.day);
    //        } else if (f === 'd') {
    //            return self.day.toString();
    //        } else if (f === 'MMMM') {
    //            return self.monthName;
    //        } else if (f === 'MMM') {
    //            return self.shortMonthName;
    //        } else if (f === 'MM') {
    //            return p(self.month + 1);
    //        } else if (f === 'M') {
    //            return self.month + 1;
    //        } else if (f === 't') {
    //            return self.hours < 12 ? Core.currentLocale.am.substring(0, 1) : Core.currentLocale.pm.substring(0, 1);
    //        } else if (f === 'tt') {
    //            return self.hours < 12 ? Core.currentLocale.am : Core.currentLocale.pm;
    //        } else if (f === 'zzz' || f === 'zz' || f === 'z') {
    //            return String.EMPTY;
    //        }
    //    }
    //) : this._toString();
};

Object.defineProperty(Date.prototype, 'yearDay', {
    /**
     * Get the day of the year of the current date
     * @returns     {Number}        the day of the year
     */
    get: function () {
        //#region Variables déclaration
        const month = this.getMonth(), day = this.getDate(), offset = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        //#endregion Variables déclaration
        //l'année bissextile n'est utile qu'à partir de mars
        return day + offset[month] + this.isLeapYear | 0;
    }
});
Object.defineProperty(Date.prototype, 'yearDay2', {
    /**
     * Get the day of the year of the current date
     * @returns     {Number}        the day of the year
     */
    get: function () {
        //#region Variables déclaration
        const here = new Date(this.getTime());
        //#endregion Variables déclaration
        here.setMonth(0, 1);
        return Math.round((this - here) / (60 * 60 * 24 * 1000));
    }
});

Object.defineProperty(Date.prototype, 'week', {
    /**
     * Get the week of the current date
     * @returns     {Number}        the week number
     */
    get: function () {
        //#region Variables déclaration
        const tempDate = new Date(this);
        //#endregion Variables déclaration
        tempDate.setDate(tempDate.getDate() - (tempDate.getDay() + 6) % 7 + 3);
        const dms = tempDate.valueOf();
        tempDate.setMonth(0);
        tempDate.setDate(4);
        return Math.round((dms - tempDate.valueOf()) / 604800000);
    }
});
/**
 * Check if a string date is a real french date
 * @param       {String}        a       The string date
 * @returns     {Boolean}       true if the string is a french date otherwise false
 */
Date.isDate = function (a) {
    if (a != undefined) {
        // Cette fonction permet de vérifier la validité d'une date au format jj/mm/aa ou jj/mm/aaaa
        // Par Romuald

        // si la variable est vide on retourne faux
        if (a === String.EMPTY) {
            return !1;
        }

        const e = new RegExp('^[0-9]{1,2}\/[0-9]{1,2}\/([0-9]{2}|[0-9]{4})');

        // On teste l'expression régulière pour valider la forme de la date
        if (!e.test(a)) {
            return !1; // Si pas bon,retourne faux
        }

        // On sépare la date en 3 variables pour vérification,parseInt() converti du texte en entier
        d = [];
        d[0] = a.split('/')[0] || 0; // jour
        d[1] = a.split('/')[1] || 0; // mois
        d[2] = a.split('/')[2] || 0; // année

        // Si l'année n'est composée que de 2 chiffres on complète automatiquement
        if (d[2] < 1000) {
            d[2] < 89
                ? d[2] += 2000 // Si a<89 alors on ajoute 2000 sinon on ajoute 1900
                : d[2] += 1900;
        }

        // Définition du dernier jour de février
        // Année bissextile si annnée divisible par 4 et que ce n'est pas un siècle,ou bien si divisible par 400
        Math.mod(d[2], 4) === 0 && Math.mod(d[2], 100) !== 0 || Math.mod(d[2], 400) === 0
            ? d[3] = 29
            : d[3] = 28;

        // Nombre de jours pour chaque mois
        d[4] = new Array(31, d[3], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        // Enfin,retourne vrai si le jour est bien entre 1 et le bon nombre de jours,idem pour les mois,sinon retourn faux
        return d[1] >= 1 && d[1] <= 12 && d[0] >= 1 && d[0] <= d[4][d[1] - 1];
    }
    return !1;
};
/**
 * Check if a string date is a real french date
 * @param       {String}        a       The string date
 * @returns     {Boolean}       true if the string is a french date otherwise false
 */
Date.dateExists = function (a) {
    if (a != undefined && core.tools.isString(a)) {
        const d = a.split('/'), c = d[0] + d[1] + d[2];
        if (a.length !== 10 || a.charAt(2) !== '/' || a.charAt(5) !== '/') {
            return !1;
        }
        d.forEach(x => {
            if (c.charAt(x) < '0' || c.charAt(x) > '9') {
                return !1;
            }
        });
        return d[1] > 12 || d[0] > new Date(d[2], d[1], 0).getDate() ? !1 : !0;
    }
    return !1;
};
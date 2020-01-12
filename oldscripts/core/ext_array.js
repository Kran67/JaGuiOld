/************************************************************************/
/*                                                                      */
/* array.js cette partie définie les fonctions ajoutées à l'objet Array */
/*                                                                      */
/************************************************************************/
define(['types', 'notifyEvent'], function (Types, NotifyEvent) {
    if (!Array.prototype.convertToCollection)
    {
        Array.prototype.convertToCollection = function (owner, itemClass) {
            this.updating = false;
            this._owner = owner;
            this._itemClass = itemClass;
            this._push = this.push;
            this._sort = this.sort;
            this.isCollection = true;
            this.push = function (a) {
                var canPush = false;
                if (typeof this._itemClass === typeof a) canPush = true;
                if (!canPush && a instanceof this._itemClass) canPush = true;
                if (canPush)
                {
                    this._push(a);
                    if (!this.updating) this.onChange.invoke(Types.OPERATIONS.INSERT, a);
                } else
                {

                }
            };
            this.onChange = new NotifyEvent(owner);
            this.beginUpdate = function () {
                this.updating = true;
            };
            this.endUpdate = function () {
                this.updating = false;
                this.onChange.invoke();
            };
            this.sort = function (callback) {
                return this._sort(callback);
                this.onChange.invoke(Types.OPERATIONS.SORT);
            };
        }
    }
    if (!Array.prototype.destroy)
    {
        Array.prototype.destroy = function () {
            this.clear();
            if (this.isCollection)
            {
                this.updating = null;
                this._owner = null;
                this._itemClass = null;
                this.isCollection = null;
                this.onChange.destroy();
                this.onChange = null;
            }
        }
    }
    // Méthode add -> Alias sur la méthode push
    // Paramètre item : élement à ajouter au tableau
    // Retourne la longueur du tableau
    if (!Array.prototype.add)
    {
        Array.prototype.add = function (a) {
            if (!a) return;
            this.push(a);
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
            return this.length;
        };
    }
    // Méthode addRange -> ajoute plusieurs items au tableau
    // Paramètre items : élements à ajouter au tableau
    if (!Array.prototype.addRange)
    {
        Array.prototype.addRange = function (a) {
            if (!a) return;
            if (!Array.isArray(a)) return;
            var length = a.length;
            if (length !== 0)
            {
                //for (var index=0;index<length;index++) this.push(a[index]);
                if (this.isCollection) this.beginUpdate();
                Array.prototype.push.apply(this, a);
                if (this.isCollection) this.endUpdate();
                index = null;
            }
            length = null;
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
            return this.length;
        };
    }
    // Méthode clear -> supprime tout les items du tableau
    if (!Array.prototype.clear)
    {
        Array.prototype.clear = function () {
            if (this.length > 0) this.splice(0, this.length);
            this.length = 0;
            if (this.isCollection) this.onChange.invoke(Types.OPERATIONS.REMOVE);
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
        };
    }
    // Méthode clone -> duplique le tableau
    // Retourne un nouveau tableau qui est la copie conforme
    if (!Array.prototype.clone)
    {
        Array.prototype.clone = function () {
            var clonedArray = []/*,length=this.length*/;
            //for (var index=0;index<length;index++) clonedArray[index]=this[index];
            clonedArray.addRange(this);
            //index=null;
            //length=null;
            return clonedArray;
        };
    }
    // Méthode contains -> détermine si un item existe déjà dans le tableau
    // Paramètre item : item à chercher dans le tableau
    // Retourne vrai si l'item existe sinon faux
    if (!Array.prototype.contains)
    {
        Array.prototype.contains = function (a) {
            if (!a) return false;
            return (this.indexOf(a) > -1);
        };
    }
    // Méthode queue -> détermine si un item existe déjà dans le tableau
    // Paramètre item : item à ajouter au tableau
    if (!Array.prototype.queue)
    {
        Array.prototype.queue = function (a) {
            if (!a) return;
            this.push(a);
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
            //if (this.isCollection) this.onChange.invoke($j.types.operations.);
        };
    }
    // Méthode dequeue -> enléve le premier item du tableau
    // Retourne l'élement enlevé
    if (!Array.prototype.dequeue)
    {
        Array.prototype.dequeue = function () {
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
            var a = this.shift();
            if (this.isCollection) this.onChange.invoke(Types.OPERATIONS.REMOVE, a);
            return a;
        };
    }
    // Méthode insert -> insert un item au tableau
    // Paramètre index : position de l'item à inserer
    // paramètre item : item à inserer
    if (!Array.prototype.insert)
    {
        Array.prototype.insert = function (a, i) {
            if (!i) return;
            a = a | 0;
            this.splice(a, 0, i);
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
            if (this.isCollection) this.onChange.invoke(Types.OPERATIONS.INSERT, i);
        };
    }
    // Méthode remove -> supprime un item au tableau
    // paramètre item : item à supprimer
    if (!Array.prototype.remove)
    {
        Array.prototype.remove = function (a) {
            if (!a) return;
            var index = this.indexOf(a);
            if (index >= 0) this.splice(index, 1);
            index = null;
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
            if (this.isCollection) this.onChange.invoke(Types.OPERATIONS.REMOVE, a);
        };
    }
    // Méthode removeAt -> supprime un item du tableau à la position donnée
    // paramètre index : position de l'item
    if (!Array.prototype.removeAt)
    {
        Array.prototype.removeAt = function (a) {
            a = a | 0;
            a = this.splice(a, 1);
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
            if (this.isCollection) this.onChange.invoke(Types.OPERATIONS.REMOVE, a.first());
        };
    }
    // Méthode isEmpty -> test si le tableau est vide
    // Retourne vrai si le tableau est vide sinon faux
    if (!Array.prototype.isEmpty)
    {
        Array.prototype.isEmpty = function () { return this.length < 1; };
    }
    // Méthode isArray -> test si l'objet passé en paramètre est un tableau
    // Paramètre obj : objet à tester
    // Retourne vrai si l'objet est un tableau sinon faux
    if (!Array.prototype.isArray)
    {
        Array.prototype.isArray = function (a) {
            if (!a) return false;
            return Object.prototype.toString.apply(a) === "[object Array]";
        };
    }
    // Méthode isArray -> test si l'objet passé en paramètre est un tableau
    // Paramètre obj : objet à tester
    // Retourne vrai si l'objet est un tableau sinon faux
    if (!Array.prototype.equals)
    {
        Array.prototype.equals = function (a) {
            var temp = [], i;
            if (!a)
            { // If either is not an array
                return false;
            }
            if (this.length !== a.length)
            {
                return false;
            }
            // Put all the elements from array1 into a "tagged" array
            for (i = 0; i < this.length; i++)
            {
                key = (typeof this[i]) + "~" + this[i];
                // Use "typeof" so a number 1 isn't equal to a string "1".
                if (temp[key]) { temp[key]++; } else { temp[key] = 1; }
                // temp[key]=# of occurrences of the value (so an element could appear multiple times)
            }
            // Go through array2 - if same tag missing in "tagged" array,not equal
            for (i = 0; i < a.length; i++)
            {
                key = (typeof a[i]) + "~" + a[i];
                if (temp[key])
                {
                    if (temp[key] === 0) { return false; } else { temp[key]--; }
                    // Subtract to keep track of # of appearances in array2
                } else
                { // Key didn't appear in array1,arrays are not equal.
                    return false;
                }
            }
            // If we get to this point,then every generated key in array1 showed up the exact same
            // number of times in array2,so the arrays are equal.
            return true;
        };
    }
    // Méthode first -> renvoi le premier élément du tableau
    if (!Array.prototype.first)
    {
        Array.prototype.first = function () { return this[0]; };
    }
    // Méthode last -> renvoi le dernier élément du tableau
    if (!Array.prototype.last)
    {
        Array.prototype.last = function () { return this[this.length - 1]; };
    }
    // Méthode last -> renvoi le dernier élément du tableau
    if (!Array.prototype.count)
    {
        Array.prototype.count = function () { return this.length; };
    }
    if (!Array.prototype.swap)
    {
        Array.prototype.swap = function (x, y) {
            var b = this[x];
            this[x] = this[y];
            this[y] = b;
            if (this.isCollection) this.onChange.invoke();
            return this;
        };
    }

    if (!Array.prototype.filter)
    {
        Array.prototype.filter = function (fun /*, thisp */) {
            "use strict";
            if (!this) throw new TypeError();
            var t = new Object(this), len = t.length >>> 0;
            if (typeof fun !== "function") throw new TypeError();
            var res = [], thisp = arguments[1];
            for (var i = 0; i < len; i++)
            {
                if (i in t)
                {
                    var val = t[i]; // in case fun mutates this
                    if (fun.call(thisp, val, i, t)) res.push(val);
                }
            }
            return res;
        };
    }
});
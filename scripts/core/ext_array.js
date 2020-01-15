/*************************/
/*                       */
/* array.js extend Array */
/*                       */
/*************************/
if (!Array.prototype.convertToCollection) {
    /**
     * Convert a array to a collection
     * @param       {Component}         owner           The owner component of the collection
     * @param       {Class}             itemClass       The item class for all items in the collection
     */
    Array.prototype.convertToCollection = function (owner, itemClass) {
        //#region Variables déclaration
        let _updating = false;
        let _owner = owner;
        let _itemClass = itemClass;
        this._push = this.push;
        this._sort = this.sort;
        const _isCollection = false;
        //#endregion Variables déclaration
        Object.defineProperty(this, "updating", {
            get: function () { return _updating; },
            set: function (newValue) { _updating = newValue; },
            enumerable: false
        });
        Object.defineProperty(this, "owner", {
            get: function () { return _owner; },
            set: function (newValue) { _owner = newValue; },
            enumerable: false
        });
        Object.defineProperty(this, "itemClass", {
            get: function () { return _itemClass; },
            set: function (newValue) { _itemClass = newValue; },
            enumerable: false
        });
        Object.defineProperty(this, "isCollection", {
            get: function () { return _isCollection; },
            enumerable: false
        });
        this.push = function (a) {
            //#region Variables déclaration
            let canPush = false;
            //#endregion Variables déclaration
            if (typeof _itemClass === typeof a || !canPush && a instanceof _itemClass) {
                canPush = true;
            }
            if (canPush) {
                this._push(a);
                if (!_updating) {
                    this.onChange.invoke(Types.OPERATIONS.INSERT, a);
                }
            }
        };
        this.onChange = new Core.classes.NotifyEvent(owner);
        this.beginUpdate = function () {
            _updating = true;
        };
        this.endUpdate = function () {
            _updating = false;
            this.onChange.invoke();
        };
        this.sort = function (callback) {
            this.onChange.invoke(Types.OPERATIONS.SORT);
            return this._sort(callback);
        };
    };
}
if (!Array.prototype.destroy) {
    /**
     * Clear and destroy all properties if the array is a collection
     */
    Array.prototype.destroy = function () {
        this.clear();
        if (this.isCollection) {
            this.updating = null;
            this.owner = null;
            this.itemClass = null;
            this.isCollection = null;
            this.onChange.destroy();
            this.onChange = null;
        }
    };
}
// Méthode add -> Alias sur la méthode push
// Paramètre item : élement à ajouter au tableau
// Retourne la longueur du tableau
if (!Array.prototype.add) {
    /**
     * Alias of push, can support collection
     * @param       {Array}     a       The Array/Collection to add
     * @Returns     {Number}            The length of the array
     */
    Array.prototype.add = function (a) {
        if (a != undefined) {
            this.push(a);
        }
        //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
        return this.length;
    };
}
// Méthode addRange -> ajoute plusieurs items au tableau
// Paramètre items : élements à ajouter au tableau
if (!Array.prototype.addRange) {
    /**
     * Add a array in the current Array/Collection
     * @param       {Array}     a       The Array/Collection to add
     * @Returns      {Number}            The length of the array
     */
    Array.prototype.addRange = function (a) {
        if (a != undefined && Array.isArray(a)) {
            const length = a.length;
            if (length !== 0) {
                //for (var index=0;index<length;index++) this.push(a[index]);
                if (this.isCollection) {
                    this.beginUpdate();
                }
                Array.prototype.push.apply(this, a);
                if (this.isCollection) {
                    this.endUpdate();
                }
            }
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
        }
        return this.length;
    };
}
// Méthode clear -> supprime tout les items du tableau
if (!Array.prototype.clear) {
    /**
     * Clear the Array/Collection
     */
    Array.prototype.clear = function () {
        if (this.length > 0) {
            this.splice(0, this.length);
        }
        this.length = 0;
        if (this.isCollection) {
            this.onChange.invoke(Types.OPERATIONS.REMOVE);
        }
        //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
    };
}
// Méthode clone -> duplique le tableau
// Retourne un nouveau tableau qui est la copie conforme
if (!Array.prototype.clone) {
    /**
     * Clone the Array/Collection to a new Array/Collection
     */
    Array.prototype.clone = function () {
        const clonedArray = []/*,length=this.length*/;
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
if (!Array.prototype.contains) {
    /**
     * Alias of indexOf
     * @param       {Any}       a       The value to check existance
     */
    Array.prototype.contains = function (a) {
        if (a != undefined) {
            return this.indexOf(a) > -1;
        }
        return false;
    };
}
// Méthode queue -> détermine si un item existe déjà dans le tableau
// Paramètre item : item à ajouter au tableau
if (!Array.prototype.queue) {
    /**
     * Another alias of add
     * @param       {Any}       a       The value to append
     */
    Array.prototype.queue = function (a) {
        if (a != undefined) {
            this.push(a);
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
            //if (this.isCollection) this.onChange.invoke($j.types.operations.);
        }
        return;
    };
}
// Méthode dequeue -> enléve le premier item du tableau
// Retourne l'élement enlevé
if (!Array.prototype.dequeue) {
    /**
     * Alias of shift
     */
    Array.prototype.dequeue = function () {
        //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
        const a = this.shift();
        if (this.isCollection) {
            this.onChange.invoke(Types.OPERATIONS.REMOVE, a);
        }
        return a;
    };
}
// Méthode insert -> insert un item au tableau
// Paramètre index : position de l'item à inserer
// paramètre item : item à inserer
if (!Array.prototype.insert) {
    /**
     * Alias of splice with three arguments
     * @param       {Number}        a       The index position to insert the new value
     * @param       {Any}           i       The new value to insert
     */
    Array.prototype.insert = function (a, i) {
        if (i != undefined && Tools.isNumber(a)) {
            this.splice(a, 0, i);
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
            if (this.isCollection) {
                this.onChange.invoke(Types.OPERATIONS.INSERT, i);
            }
        }
    };
}
// Méthode remove -> supprime un item au tableau
// paramètre item : item à supprimer
if (!Array.prototype.remove) {
    /**
     * Alias of splice with two arguments
     * @param       {Any}           a       The value to remove if exist
     */
    Array.prototype.remove = function (a) {
        if (a != undefined) {
            const index = this.indexOf(a);
            if (index >= 0) {
                this.splice(index, 1);
            }
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
            if (this.isCollection) {
                this.onChange.invoke(Types.OPERATIONS.REMOVE, a);
            }
        }
    };
}
// Méthode removeAt -> supprime un item du tableau à la position donnée
// paramètre index : position de l'item
if (!Array.prototype.removeAt) {
    /**
     * Remove a element at the specified index
     * @param       {Number}        a       The index of the value to remove
     */
    Array.prototype.removeAt = function (a) {
        if (Tools.isNumber(a)) {
            a = this.splice(a, 1);
            //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
            if (this.isCollection) {
                this.onChange.invoke(Types.OPERATIONS.REMOVE, a.first);
            }
        }
    };
}
// Méthode isEmpty -> test si le tableau est vide
// Retourne vrai si le tableau est vide sinon faux
Object.defineProperty(Array.prototype, "isEmpty", {
    get: function () {
        return this.length < 1;
    }
});
// Méthode isArray -> test si l'objet passé en paramètre est un tableau
// Paramètre obj : objet à tester
// Retourne vrai si l'objet est un tableau sinon faux
if (!Array.prototype.equals) {
    /**
     * Indicate if an Array/Collection is equal to the current Array/Collection
     * @param       {Array}         a       The Array/Collection to test
     * @returns     {Boolean}       True if equal else false
     */
    Array.prototype.equals = function (a) {
        const temp = [];
        if (a == undefined) { // If either is not an array
            return false;
        }
        if (this.length !== a.length) {
            return false;
        }
        // Put all the elements from array1 into a "tagged" array
        for (let i = 0; i < this.length; i++) {
            const key = `${typeof this[i]}~${this[i]}`;
            // Use "typeof" so a number 1 isn't equal to a string "1".
            if (temp[key]) {
                temp[key]++;
            } else {
                temp[key] = 1;
            }
            // temp[key]=# of occurrences of the value (so an element could appear multiple times)
        }
        // Go through array2 - if same tag missing in "tagged" array,not equal
        for (let i = 0; i < a.length; i++) {
            const key = `${typeof a[i]}~${a[i]}`;
            if (temp[key]) {
                if (temp[key] === 0) {
                    return false;
                } else {
                    temp[key]--;
                }
                // Subtract to keep track of # of appearances in array2
            } else { // Key didn't appear in array1,arrays are not equal.
                return false;
            }
        }
        // If we get to this point,then every generated key in array1 showed up the exact same
        // number of times in array2,so the arrays are equal.
        return true;
    };
}
if (!Array.prototype.filterBy) {
    Array.prototype.filterBy = function (func, thisArg) {
        return this.filter(func, thisArg);
    };
}
// Méthode first -> renvoi le premier élément du tableau
//if (!Array.prototype.first) {
/**
 * Return the first element of the Array/Collection
 * @returns         {Any}       The first element
 */
Object.defineProperty(Array.prototype, "first", {
    get: function () {
        return this[0];
    }
});
// Méthode last -> renvoi le dernier élément du tableau
Object.defineProperty(Array.prototype, "last", {
    /**
     * Return the last element of the Array/Collection
     * @returns         {Any}       The last element
     */
    get: function () {
        return this[this.length - 1];
    }
});
// Méthode last -> renvoi le dernier élément du tableau
Object.defineProperty(Array.prototype, "count", {
    /**
     * Return the number of element in the Array/Collection
     * @returns         {Number}        The count
     */
    get: function () {
        return this.length;
    }
});
if (!Array.prototype.swap) {
    /**
     * Swap two element in the Array/Collection
     * @param       {Number}        x       The first index
     * @param       {Number}        y       The second index
     * @returns     {Array}         The current Array/Collection
     */
    Array.prototype.swap = function (x, y) {
        const b = this[x];
        this[x] = this[y];
        this[y] = b;
        if (this.isCollection) {
            this.onChange.invoke();
        }
        return this;
    };
}
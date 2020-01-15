//#region Imports
import { Rect } from "/scripts/core/geometry.js";
//import { Events } from "./events.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion
//#region Bounds
/**
 * Class representing an Bounds.
 * @extends {Rect}
 */
const Bounds = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#region Bounds
    class Bounds extends Rect {
        /**
         * Create a new instance of Bounds.
         * @param   {Object}    rect        Properties to initialize the Bounds.
         * @param   {Object}    owner       Owner of the Bounds.
         */
        //#region constructor
        constructor(rect, owner) {
            if (!(rect instanceof Core.classes.Rect)) {
                rect = new Core.classes.Rect;
            }
            super(rect.left, rect.top, rect.right, rect.bottom);
            const priv = internal(this);
            priv.owner = owner;
            //if (!rect) rect = new Rect;
            //#region Private
            //#endregion
            this.onChange = new Core.classes.NotifyEvent(owner);
        }
        //#endregion constructor
        //#region Getters / Setter
        /**
         * @return {Number} the width of the bounds
         */
        //get width() {
        //    return this.right + this.left;
        //}
        /**
         * @return {Number} the height of the bounds
         */
        //get height() {
        //    return this.bottom + this.top;
        //}
        //#endregion
        //#region Setters
        /**
         * Set the left property
         * @param   {Number}   newValue    the new value
         */
        //set left(newValue) {
        //    if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
        //    if (this.left !== newValue) {
        //        this.setValues(newValue, this.top, this.right, this.bottom);
        //    }
        //}
        /**
         * Set the top property
         * @param   {Number}   newValue    the new value
         */
        //set top(newValue) {
        //    if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
        //    if (this.top !== newValue) {
        //        this.setValues(this.left, newValue, this.right, this.bottom);
        //    }
        //}
        /**
         * Set the right property
         * @param   {Number}   newValue    the new value
         */
        //set right(newValue) {
        //    if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
        //    if (this.right !== newValue) {
        //        this.setValues(this.left, this.top, newValue, this.bottom);
        //    }
        //}
        /**
         * Set the bottom property
         * @param   {Number}   newValue    the new value
         */
        //set bottom(newValue) {
        //    if (typeof newValue !== Types.CONSTANTS.NUMBER) return;
        //    if (this.bottom !== newValue) {
        //        this.setValues(this.left, this.top, this.right, newValue);
        //    }
        //}
        //#region properties
        get properties() {
            return Tools.getPropertiesFromObject(this);
        }
        //#endregion properties
        //#endregion
        //#region Methods
        /**
         * Return a new rect that combine the local rect and the rect parameter
         * @param   {Rect}      rect        The rect that contain the margins
         * @return  {Rect}                  The new rect
         */
        marginRect(rect) {
            if (rect instanceof Core.classes.Rect) {
                return new Core.classes.Rect(rect.left + this.left, rect.top + this.top, rect.right - this.right, rect.bottom - this.bottom);
            }
            return rect;
        }
        /**
         * Return a new rect that combine the local rect and the rect parameter
         * @param   {Rect}      rect        The rect that contain the padding
         * @return  {Rect}                  The new rect
         */
        paddingRect(rect) {
            if (rect instanceof Core.classes.Rect) {
                return new Core.classes.Rect(rect.left + this.left, rect.top + this.top, rect.right - this.right, rect.bottom - this.bottom);
            }
            return rect;
        }
        /**
         * Apply the local property to another object
         * @param   {Bounds}    obj         The object to apply the local rect
         */
        applyTo(obj) {
            obj.left += this.left;
            obj.top += this.top;
            obj.width -= this.right;
            obj.height -= this.bottom;
        }
        /**
         * Apply the local property to owner
         */
        apply() {
            this.owner.left += this.left;
            this.owner.top += this.top;
            this.owner.width -= this.right + this.left;
            this.owner.height -= this.bottom + this.top;
        }
        /**
         * Convert the local rect to css
         */
        toCSS() {
            const PX = Types.CSSUNITS.PX;
            return `${this.top}${PX}${String.SPACE}${this.right}${PX}${String.SPACE}${this.bottom}${PX}${String.SPACE}${this.left}${PX}`;
        }
        /**
         * Destroy all properties of the instance
         * @override
         */
        destroy() {
            this.onChange.destroy();
            this.onChange = null;
            super.destroy();
        }
        /**
         * Return all custom properties of this object
         */
        //#endregion
    }
    return Bounds;
    //#endregion Bounds
})();
//#endregion
Core.classes.register(Types.CATEGORIES.COMMON, Bounds);
export { Bounds };
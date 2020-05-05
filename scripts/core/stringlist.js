//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { NotifyEvent } from '/scripts/core/events.js';
//#endregion Imports
//#region StringList
const StringList = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region StringList
    class StringList extends BaseClass {
        //#region constructor
        constructor(owner) {
            super(owner);
            const priv = internal(this);
            priv.list = [];
            priv.owner = owner;
            this.onChange = new NotifyEvent(this);
        }
        //#endregion constructor
        //#region Getters/ Setters
        //#region list
        get list() {
            return internal(this).list;
        }
        set list(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isString(newValue) && priv.list !== newValue && (priv.list = newValue);
        }
        //#endregion list
        //#region owner
        get owner() {
            return internal(this).owner;
        }
        //#endregion owner
        //#region text
        get text() {
            return internal(this).list.join('\n');
        }
        //#endregion text
        //#region length
        get length() {
            return internal(this).list.length;
        }
        //#endregion length
        //#endregion Getters / Setters
        //#region Methods
        //#region assign
        assign(source) {
            //#region Variables déclaration
            const priv = internal(this);
            const list = this.list;
            //#endregion Variables déclaration
            if (source instanceof StringList) {
                list.clear();
                list.addRange(source.list);
                this.onChange.invoke(priv.owner);
            }
        }
        //#endregion assign
        //#region addText
        addText(str, fireEvent) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isString(str)) {
                !fireEvent && (fireEvent = !0);
                priv.list.addRange(str.split('\n'));
                fireEvent && this.onChange.invoke(priv.owner);
            }
        }
        //#endregion addText
        //#region add
        add(str) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isString(str)) {
                priv.list.push(str);
                this.onChange.invoke(priv.owner);
            }
        }
        //#endregion add
        //#region clear
        clear() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.list.clear();
            this.onChange.invoke(priv.owner);
        }
        //#endregion clear
        //#region remove
        remove(idx) {
            //#region Variables déclaration
            const priv = internal(this);
            const list = priv.list;
            //#endregion Variables déclaration
            if (idx > -1 && idx <= list.length - 1) {
                list.removeAt(idx);
                this.onChange.invoke(priv.owner);
            }
        }
        //#endregion remove
        //#region exchange
        exchange(idx, idx1) {
            //#region Variables déclaration
            const priv = internal(this);
            const list = priv.list;
            //#endregion Variables déclaration
            if (idx > -1 && idx1 > -1 && idx <= list.length - 1 && idx1 <= list.length - 1) {
                const t = list[idx];
                list[idx] = list[idx1];
                list[idx1] = t;
                this.onChange.invoke(priv.owner);
            }
        }
        //#endregion exchange
        //#region find
        find(str, idx) {
        }
        //#endregion find
        //#region indexOf
        indexOf(str) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return core.tools.isString(str) ? priv.list.indexOf(str) : -1;
        }
        //#endregion indexOf
        //#region insert
        insert(idx, str) {
            //#region Variables déclaration
            const priv = internal(this);
            const list = priv.list;
            //#endregion Variables déclaration
            if (idx > -1 && idx <= list.length - 1 && core.tools.isString(str)) {
                list.insert(idx, str);
                this.onChange.invoke(priv.owner);
            }
        }
        //#endregion insert
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.list.clear();
            priv.list = null;
            priv.owner = null;
            this.onChange.destroy();
            this.onChange = null;
            delete this.onChange;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Metods
    }
    return StringList;
    //#endregion StringList
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, StringList);
//#endregion StringList
export { StringList };
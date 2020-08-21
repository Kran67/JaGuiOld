//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { NotifyEvent } from '/scripts/core/events.js';
//#endregion Imports
//#region StringList
class StringList extends BaseClass {
    //#region Private fields
    #list = [];
    #owner;
    //#endregion Private fields
    //#region constructor
    constructor(owner) {
        super(owner);
        this.#owner = owner;
        this.onChange = new NotifyEvent(this);
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region list
    get list() {
        return this.#list;
    }
    set list(newValue) {
        core.tools.isString(newValue) && this.#list !== newValue && (this.#list = newValue);
    }
    //#endregion list
    //#region owner
    get owner() {
        return this.#owner;
    }
    //#endregion owner
    //#region text
    get text() {
        return this.#list.join('\n');
    }
    //#endregion text
    //#region length
    get length() {
        return this.#list.length;
    }
    //#endregion length
    //#endregion Getters / Setters
    //#region Methods
    //#region assign
    assign(source) {
        //#region Variables déclaration
        const list = this.#list;
        //#endregion Variables déclaration
        if (source instanceof StringList) {
            list.clear();
            list.addRange(source.list);
            this.onChange.invoke(this.#owner);
        }
    }
    //#endregion assign
    //#region addText
    addText(str, fireEvent) {
        if (core.tools.isString(str)) {
            !fireEvent && (fireEvent = !0);
            this.#list.addRange(str.split('\n'));
            fireEvent && this.onChange.invoke(this.#owner);
        }
    }
    //#endregion addText
    //#region add
    add(str) {
        if (core.tools.isString(str)) {
            this.#list.push(str);
            this.onChange.invoke(this.#owner);
        }
    }
    //#endregion add
    //#region clear
    clear() {
        this.#list.clear();
        this.onChange.invoke(this.#owner);
    }
    //#endregion clear
    //#region remove
    remove(idx) {
        //#region Variables déclaration
        const list = this.#list;
        //#endregion Variables déclaration
        if (idx > -1 && idx <= list.length - 1) {
            list.removeAt(idx);
            this.onChange.invoke(this.#owner);
        }
    }
    //#endregion remove
    //#region exchange
    exchange(idx, idx1) {
        //#region Variables déclaration
        const list = this.#list;
        //#endregion Variables déclaration
        if (idx > -1 && idx1 > -1 && idx <= list.length - 1 && idx1 <= list.length - 1) {
            const t = list[idx];
            list[idx] = list[idx1];
            list[idx1] = t;
            this.onChange.invoke(this.#owner);
        }
    }
    //#endregion exchange
    //#region find
    find(str, idx) {
    }
    //#endregion find
    //#region indexOf
    indexOf(str) {
        return core.tools.isString(str) ? this.#list.indexOf(str) : -1;
    }
    //#endregion indexOf
    //#region insert
    insert(idx, str) {
        //#region Variables déclaration
        const list = this.#list;
        //#endregion Variables déclaration
        if (idx > -1 && idx <= list.length - 1 && core.tools.isString(str)) {
            list.insert(idx, str);
            this.onChange.invoke(this.#owner);
        }
    }
    //#endregion insert
    //#region destroy
    destroy() {
        this.#list.clear();
        this.onChange.destroy();
        this.onChange = null;
        delete this.onChange;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, StringList);
//#endregion StringList
export { StringList };
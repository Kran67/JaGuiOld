import { BaseClass } from "/scripts/core/baseclass.js";
//import { NotifyEvent } from "/scripts/core/events.js";
//#region StringList
const StringList = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class StringList extends BaseClass {
        constructor(owner) {
            const priv = internal(this);
            priv.list = [];
            priv.owner = owner;
            this.onChange = new Core.classes.NotifyEvent(this);
        }
        get list() {
            return internal(this).list;
        }
        get owner() {
            return internal(this).owner;
        }
        get text() {
            return internal(this).list.join("\n");
        }
        get length() {
            return internal(this).list.length;
        }
        //#region Methods
        assign(source) {
            const list = this.list;
            if (source instanceof StringList) {
                list.clear();
                list.addRange(source.list);
                this.onChange.invoke(this.owner);
            }
        }
        addText(s, fireEvent) {
            if (typeof s === Types.CONSTANTS.STRING) {
                if (!fireEvent) {
                    fireEvent = true;
                }
                this.list.addRange(s.split("\n"));
                if (fireEvent) {
                    this.onChange.invoke(this.owner);
                }
            }
        }
        add(s) {
            if (typeof s === Types.CONSTANTS.STRING) {
                this.list.push(s);
                this.onChange.invoke(this.owner);
            }
        }
        clear() {
            this.list.clear();
            this.onChange.invoke(this.owner);
        }
        remove(idx) {
            const list = this.list;
            if (idx > -1 && idx <= list.length - 1) {
                list.removeAt(idx);
                this.onChange.invoke(this.owner);
            }
        }
        exchange(idx, idx1) {
            const list = this.list;
            if (idx > -1 && idx1 > -1) {
                if (idx <= list.length - 1 && idx1 <= list.length - 1) {
                    const t = list[idx];
                    list[idx] = list[idx1];
                    list[idx1] = t;
                    this.onChange.invoke(this.owner);
                }
            }
        }
        find(s, idx) {
        }
        indexOf(s) {
            if (typeof s === Types.CONSTANTS.STRING) {
                return this.list.indexOf(s);
            }
            return -1;
        }
        insert(idx, s) {
            const list = this.list;
            if (idx > -1 && idx <= list.length - 1) {
                if (typeof s === Types.CONSTANTS.STRING) {
                    list.insert(idx, s);
                    this.onChange.invoke(this.owner);
                }
            }
        }
        destroy() {
            this.list.clear();
            this.onChange.destroy();
        }
        //#endregion
    }
    return StringList;
})();
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, StringList);
export { StringList };
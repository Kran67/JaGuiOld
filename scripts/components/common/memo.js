//#region Import
import { CustomTextControl } from '/scripts/core/customtextcontrol.js';
//import { Window } from '/scripts/components/containers/window.js';
import { Events } from '/scripts/core/events.js';
import { StringList } from '/scripts/core/stringlist.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region WHITESPACES
const WHITESPACES = Object.freeze(Object.seal({
    INHERIT: 'inherit',
    INITIAL: 'initial',
    NORMAL: 'normal',
    NOWRAP: 'nowrap',
    PRE: 'pre',
    PRELINE: 'pre-line',
    PREWRAP: 'pre-wrap'
}));
//#endregion WHITESPACES
//#region WORDBREAKS
const WORDBREAKS = Object.freeze(Object.seal({
    BREAKALL: 'break-all',
    BREAKWORD: 'break-word',
    INITIAL: 'initial',
    NORMAL: 'normal',
    INHERIT: 'inherit'
}));
//#endregion WORDBREAKS
//#region WORDWRAPS
const WORDWRAPS = Object.freeze(Object.seal({
    BREAKWORD: 'break-word',
    INITIAL: 'initial',
    NORMAL: 'normal',
    INHERIT: 'inherit'
}));
//#endregion WORDWRAPS
//#region Memo
const Memo = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class Memo
    class Memo extends CustomTextControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.whiteSpace = props.hasOwnProperty('whiteSpace') ? props.whiteSpace : WHITESPACES.INHERIT;
                priv.wordBreak = props.hasOwnProperty('wordBreak') ? props.wordBreak : WORDBREAKS.INHERIT;
                priv.wordWraps = props.hasOwnProperty('wordWraps') ? props.wordWraps : WORDWRAPS.INHERIT;
                if (!Core.isHTMLRenderer) {
                    this.width = 185;
                    this.height = 89;
                }
                this.hitTest.mouseWheel = !0;
                priv.lines = new StringList(this);
                priv.lines.onChange.addListener(this.update);
                priv.text = props.hasOwnProperty('text') ? props.text : this.name;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region whiteSpace
        get whiteSpace() {
            return internal(this).whiteSpace;
        }
        set whiteSpace(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, WHITESPACES)) {
                if (priv.whiteSpace !== newValue) {
                    priv.whiteSpace = newValue;
                    this.update();
                }
            }
        }
        //#endregion whiteSpace
        //#region wordBreak
        get wordBreak() {
            return internal(this).wordBreak;
        }
        set wordBreak(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, WORDBREAKS)) {
                if (priv.wordBreak !== newValue) {
                    priv.wordBreak = newValue;
                    this.update();
                }
            }
        }
        //#endregion wordBreak
        //#region wordWrap
        get wordWrap() {
            return internal(this).wordWrap;
        }
        set wordWrap(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, WORDWRAPS)) {
                if (priv.wordWraps !== newValue) {
                    priv.wordWraps = newValue;
                    this.update();
                }
            }
        }
        //#endregion wordWrap
        //#region lines
        get lines() {
            return internal(this).lines;
        }
        set lines(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof StringList) {
                if (priv.lines !== newValue) {
                    priv.lines.clear();
                    priv.lines.list.addRange(newValue);
                    this.update();
                }
            }
        }
        //#endregion lines
        //#endregion Getters / Setters
        //#region Methods
        textChanged() {
            this.jsObj.lines.list = this.value.split('\n');
        }
        update(arg) {
            //#region Variables déclaration
            let memo = this;
            //#endregion Variables déclaration
            if (arg) {
                memo = arg;
            }
            if (!memo.loading && !memo.form.loading) {
                if (memo.inputObj) {
                    const ta = memo.inputObj;
                    const taStyle = ta.style;
                    ta.value = memo.lines.text;
                    taStyle.whiteSpace = memo.whiteSpace;
                    taStyle.wordBreak = memo.wordBreak;
                    taStyle.wordWrap = memo.wordWrap;
                    if (memo.maxLength > 0) {
                        ta.setAttribute('maxlength', memo.maxLength);
                    }
                    ta.setAttribute('placeholder', memo.placeHolder);
                    if (memo.readOnly) {
                        ta.setAttribute('readonly', null);
                    }
                    else {
                        ta.removeAttribute('readonly');
                    }
                }
            }
        }
        HTMLFocus() {
            this.jsObj.enterFocus();
        }
        HTMLBlur() {
            this.jsObj.killFocus();
        }
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const ta = document.createElement(Types.HTMLELEMENTS.TEXTAREA);
            //#endregion Variables déclaration
            super.loaded();
            ta.classList.add('Control', 'csr_text', 'MemoInput', this.themeName);
            ta.jsObj = this;
            this.inputObj = ta;
            Events.bind(ta, Types.HTMLEVENTS.CHANGE, this.textChanged);
            Events.bind(ta, Types.HTMLEVENTS.FOCUS, this.HTMLFocus);
            Events.bind(ta, Types.HTMLEVENTS.BLUR, this.HTMLBlur);
            priv.lines.addText(priv.text, false);
        }
        //#endregion Methods
    }
    return Memo;
    //#endregion Memo
})();
Core.classes.register(Types.CATEGORIES.COMMON, Memo);
//#endregion Memo
//#region Templates
if (Core.isHTMLRenderer) {
    const MemoTpl = ['<jagui-memo id="{internalId}" data-class="Memo" class="Control Memo {theme}"><properties>{ "name": "{name}",',
        ' "width": 134, "height": 94 }</properties></jagui-memo>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: Memo, template: MemoTpl }]);
}
//#endregion
export { Memo };
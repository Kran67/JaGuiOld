//#region Import
import { CustomTextControl } from '/scripts/core/customtextcontrol.js';
//import { Window } from '/scripts/components/containers/window.js';
import { Events } from '/scripts/core/events.js';
import { StringList } from '/scripts/core/stringlist.js';
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
//#region Class Memo
class Memo extends CustomTextControl {
    //#region Private fields
    #whiteSpace;
    #wordBreak;
    #wordWrap;
    #lines = new StringList(this);
    #text;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.hitTest = { mouseWheel: !0 };
            if (!core.isHTMLRenderer) {
                props.width = 185;
                props.height = 89;
            }
            super(owner, props);
            this.#whiteSpace = props.hasOwnProperty('whiteSpace') ? props.whiteSpace : WHITESPACES.INHERIT;
            this.#wordBreak = props.hasOwnProperty('wordBreak') ? props.wordBreak : WORDBREAKS.INHERIT;
            this.#wordWrap = props.hasOwnProperty('wordWrap') ? props.wordWrap : WORDWRAPS.INHERIT;
            this.#text = props.hasOwnProperty('text') ? props.text : this.name;
            this.#lines.onChange.addListener(this.update);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region whiteSpace
    get whiteSpace() {
        return this.#whiteSpace;
    }
    set whiteSpace(newValue) {
        if (core.tools.valueInSet(newValue, WHITESPACES) && this.#whiteSpace !== newValue) {
            this.#whiteSpace = newValue;
            this.update();
        }
    }
    //#endregion whiteSpace
    //#region wordBreak
    get wordBreak() {
        return this.#wordBreak;
    }
    set wordBreak(newValue) {
        if (core.tools.valueInSet(newValue, WORDBREAKS) && this.#wordBreak !== newValue) {
            this.#wordBreak = newValue;
            this.update();
        }
    }
    //#endregion wordBreak
    //#region wordWrap
    get wordWrap() {
        return this.#wordWrap;
    }
    set wordWrap(newValue) {
        if (core.tools.valueInSet(newValue, WORDWRAPS) && this.#wordWrap !== newValue) {
            this.#wordWrap = newValue;
            this.update();
        }
    }
    //#endregion wordWrap
    //#region lines
    get lines() {
        return this.#lines;
    }
    set lines(newValue) {
        if (newValue instanceof StringList && this.#lines !== newValue) {
            this.#lines.clear();
            this.#lines.list.addRange(newValue);
            this.update();
        }
    }
    //#endregion lines
    //#endregion Getters / Setters
    //#region Methods
    //#region textChanged
    textChanged() {
        this.jsObj.lines.list = this.value.split('\n');
    }
    //#endregion textChanged
    //#region update
    update(arg) {
        //#region Variables déclaration
        let memo = this;
        //#endregion Variables déclaration
        arg && (memo = arg);
        if (!memo.loading && !memo.form.loading && memo.inputObj) {
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
            memo.readOnly ? ta.setAttribute('readonly', null) : ta.removeAttribute('readonly');
        }
    }
    //#endregion update
    //#region HTMLFocus
    HTMLFocus() {
        this.jsObj.enterFocus();
    }
    //#endregion HTMLFocus
    //#region HTMLBlur
    HTMLBlur() {
        this.jsObj.killFocus();
    }
    //#endregion HTMLBlur
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const ta = document.createElement(core.types.HTMLELEMENTS.TEXTAREA);
        //#endregion Variables déclaration
        super.loaded();
        ta.classList.add('Control', 'csr_text', 'MemoInput', this.themeName);
        ta.jsObj = this;
        this.inputObj = ta;
        Events.bind(ta, core.types.HTMLEVENTS.CHANGE, this.textChanged);
        Events.bind(ta, core.types.HTMLEVENTS.FOCUS, this.HTMLFocus);
        Events.bind(ta, core.types.HTMLEVENTS.BLUR, this.HTMLBlur);
        this.#lines.addText(this.#text, false);
    }
    //#endregion loaded
    //#endregion Methods
}
Object.defineProperties(Memo.prototype, {
    'whiteSpace': {
        enumerable: !0
    },
    'wordBreak': {
        enumerable: !0
    },
    'wordWrap': {
        enumerable: !0
    },
    'lines': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.COMMON, Memo);
//#endregion Memo
//#region Templates
if (core.isHTMLRenderer) {
    const MemoTpl = ['<jagui-memo id="{internalId}" data-class="Memo" class="Control Memo {theme}"><properties>{ "name": "{name}",',
        ' "width": 134, "height": 94 }</properties></jagui-memo>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Memo, template: MemoTpl }]);
}
//#endregion
export { Memo };
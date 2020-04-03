//#region Import
import '/scripts/components/containers/flexlayout.js';
import { Window } from '/scripts/components/containers/window.js';
import { Tools } from '/scripts/core/tools.js';
import { Uri } from '/scripts/core/uri.js';
//#endregion Import
//#region MESSAGETYPES
const MESSAGETYPES = {
    WARNING: "warning",
    ERROR: "error",
    INFORMATION: "information",
    CONFIRMATION: "confirmation",
    CUSTOM: "custom"
};
Object.freeze(Object.seal(MESSAGETYPES));
//#endregion
//#region MESSAGEBUTTONS
const MESSAGEBUTTONS = {
    YES: "yes",
    NO: "no",
    OK: "ok",
    CANCEL: "cancel",
    ABORT: "abort",
    RETRY: "retry",
    IGNORE: "ignore",
    ALL: "all",
    NOTOALL: "noToAll",
    YESTOALL: "yesToAll",
    HELP: "help"
};
Object.freeze(Object.seal(MESSAGEBUTTONS));
//#endregion
//#region Dialogs constants
const DIALOGS_CONSTS = {
    BTNS_ALL: [MESSAGEBUTTONS.YES, MESSAGEBUTTONS.NO, MESSAGEBUTTONS.OK, MESSAGEBUTTONS.CANCEL, MESSAGEBUTTONS.ABORT, MESSAGEBUTTONS.RETRY, MESSAGEBUTTONS.IGNORE, MESSAGEBUTTONS.ALL, MESSAGEBUTTONS.NOTOALL, MESSAGEBUTTONS.YESTOALL, MESSAGEBUTTONS.HELP],
    BTNS_YESNO: [MESSAGEBUTTONS.YES, MESSAGEBUTTONS.NO],
    BTNS_YESNOCANCEL: [MESSAGEBUTTONS.YES, MESSAGEBUTTONS.NO, MESSAGEBUTTONS.CANCEL],
    BTNS_YESALLNOALLCANCEL: [MESSAGEBUTTONS.YES, MESSAGEBUTTONS.YESTOALL, MESSAGEBUTTONS.NO, MESSAGEBUTTONS.NOTOALL, MESSAGEBUTTONS.CANCEL],
    BTNS_OKCANCEL: [MESSAGEBUTTONS.OK, MESSAGEBUTTONS.CANCEL],
    BTNS_ABORTRETRYIGNORE: [MESSAGEBUTTONS.ABORT, MESSAGEBUTTONS.RETRY, MESSAGEBUTTONS.IGNORE],
    BTNS_ABORTIGNORE: [MESSAGEBUTTONS.ABORT, MESSAGEBUTTONS.IGNORE]
}
Object.freeze(Object.seal(DIALOGS_CONSTS));
//#endregion Dialogs constants
//#region MessageDlg
const MessageDlg = (() => {
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
    //#region MessageDlg
    class MessageDlg extends Window {
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.dlgType = MESSAGETYPES.CUSTOM;
                priv.dlgButtons = [MESSAGEBUTTONS.OK];
                priv.dlgIcon = String.EMPTY;
                if (props.dlgType) {
                    priv.dlgType = props.dlgType;
                }
                if (props.dlgButtons) {
                    priv.dlgButtons = props.dlgButtons;
                }
                if (!String.isNullOrEmpty(props.dlgIcon)) {
                    priv.dlgIcon = props.dlgIcon
                } else if (priv.dlgType !== MESSAGETYPES.CUSTOM) {
                    priv.dlgIcon = priv.dlgType;
                }
            }
        }
        //#region template
        get template() {
            //#region Variables déclaration
            let html = super.template;
            let a = html.split('{internalId_gridlayout}');
            //#endregion Variables déclaration
            html = a.join(String.uniqueId());
            a = html.split('{internalId_msg}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_img}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnCont}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnYes}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnNo}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnOk}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnCancel}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnAbort}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnRetry}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnIgnore}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnAll}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnNoToAll}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnYesToAll}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnHelp}');
            html = a.join(String.uniqueId());
            return html;
        }
        //#endregion template
        loaded() {
            const priv = internal(this);
            const htmlElment = this.HTMLElement;
            super.loaded();
            this.borderStyle = Window.BORDERSTYLES.DIALOG;
            this.Msg_gridlayout.columnGap = 0;
            this.Msg_gridlayout.rowGap = 0;
            if (String.isNullOrEmpty(priv.dlgIcon)) {
                this.Msg_gridlayout.templateColumns = '12px 1fr 12px';
                this.Msg_gridlayout.templateRows = '12px 1fr 5px 22px 5px';
                this.Msg.column = 2;
            } else {
                this.Msg_gridlayout.templateColumns = '12px 32px 12px 1fr 12px';
                this.Msg_gridlayout.templateRows = '12px 32px 1fr 5px 22px 5px';
                this.Msg.column = 4;
                this.Msg.rowSpan = 2;
                this.Msg_btnsLayout.row = 5;
                this.Msg_btnsLayout.colSpan = 3;
            }
            this.Msg.colSpan = 1;
            this.resizeByContent();
        }
        resizeByContent() {
            const priv = internal(this);
            const buttons = priv.dlgButtons;
            const msgW = this.Msg.HTMLElement.offsetWidth;
            const msgH = this.Msg.HTMLElement.offsetHeight;
            const titleH = this.titleBarSize.height;
            const msgIcon = this.Msg_icon;
            let nW = 24 + Window.SIZEABLEBORDERSIZE * 2;
            let nH = titleH + 44 + Window.SIZEABLEBORDERSIZE * 2;
            let btnsWidth = 0;
            if (!String.isNullOrEmpty(priv.dlgIcon)) {
                nH += (msgH<32?32:msgH);
                msgIcon.visible = true;
                if (priv.dlgType == MESSAGETYPES.CUSTOM) {
                    msgIcon.load(priv.dlgIcon);
                } else {
                    msgIcon.changeCSS(priv.dlgIcon);
                }
            }
            DIALOGS_CONSTS.BTNS_ALL.forEach(btn => {
                if (buttons.indexOf(btn) > -1) {
                    const btnName = `btn${btn.firstCharUpper}`;
                    if (this.hasOwnProperty(btnName)) {
                        const button = this[btnName];
                        button.visible = true;
                        if (buttons.length > 1 && btn !== buttons.last) {
                            button.margin.right = 10;
                            button.sizing();
                        }
                        btnsWidth += button.width + button.margin.right;
                    }
                }
            });
            if (!String.isNullOrEmpty(priv.dlgIcon)) {
                nW += 44;
            }
            nW += (btnsWidth < msgW ? msgW : btnsWidth);
            if (nW > document.body.offsetWidth) {
                nW = document.body.offsetWidth - 20;
            }
            if (nH > document.body.offsetHeight) {
                nH = document.body.offsetHeight - 20;
            }
            this.width = nW;
            this.height = nH;
        }
        destroy() {
            const priv = internal(this);
            priv.dlgType = null;
            priv.dlgButtons = null;
            priv.dlgIcon = null;
            super.destroy();
        }
    }
    return MessageDlg;
})();
//#endregion
//#region InputDlg
class InputDlg extends Window {
    //constructor(owner, props) {
    //    props = !props ? {} : props;
    //    if (owner) {
    //        super(owner, props);
    //    }
    //}
    getTemplate() {
        let html = super.getTemplate();
        let a = html.split("{internalId_msg}");
        html = a.join(String.uniqueId());
        a = html.split("{internalId_btnCont}");
        html = a.join(String.uniqueId());
        a = html.split("{internalId_btnOk}");
        html = a.join(String.uniqueId());
        a = html.split("{internalId_btnCancel}");
        html = a.join(String.uniqueId());
        a = html.split("{internalId_input}");
        html = a.join(String.uniqueId());
        return html;
    }
    resizeByContent() {
        //var msgW = this.Msg._DOMObj.offsetWidth, msgH = this.Msg._DOMObj.offsetHeight, titleH = this._titleBar._DOMObj.offsetHeight, /nW,/ nH, lW = 0, lH = this.Msg_layout._DOMObj.offsetHeight, lastBtnLeft = 0, nbBtns = 0;
        //this.btnOk.setLeft(lastBtnLeft);
        //lW += this.btnOk._DOMObj.offsetWidth;
        //lastBtnLeft += this.btnOk._DOMObj.offsetWidth + 6;
        //nbBtns++;
        //this.btnCancel.setLeft(lastBtnLeft);
        //lW += this.btnCancel._DOMObj.offsetWidth;
        //lastBtnLeft += this.btnCancel._DOMObj.offsetWidth + 6;
        //nbBtns++;
        //lW += 6;
        //if (msgW < lW) nW = lW + 24;
        //else nW = msgW + 10;
        //this.Msg_layout.setWidth(lW);
        //this.TextBox.setTop(this.Msg._DOMObj.offsetTop + msgH + 5);
        //this.TextBox.setFocus();
        //nH = titleH + 13 + msgH + 5 + this.TextBox._DOMObj.offsetHeight + 13 + lH + 13;
        //nW += parseInt(getComputedStyle(this._layout._DOMObj).marginLeft, 10) + parseInt(getComputedStyle//(this._layout._DOMObj).marginRight, 10);
        //if (nW > $j.doc.body.offsetWidth) nW = $j.doc.body.offsetWidth - 20;
        //if (nH > $j.doc.body.offsetHeight) nH = $j.doc.body.offsetHeight - 20;
        //this.setWidth(nW);
        //this.setHeight(nH);
    }
}
//#endregion InputDlg
//#region dialogs
class Dialogs {
    static get MESSAGETYPES() {
        return MESSAGETYPES;
    }
    static get MESSAGEBUTTONS() {
        return MESSAGEBUTTONS;
    }
    static get DIALOGS_CONSTS() {
        return DIALOGS_CONSTS;
    }
    static messageDlgPos(msg, dlgType, buttons, icon, x, y, defaultButton) {
        const dlg = Core.classes.createComponent({
            class: MessageDlg,
            owner: Core.apps.activeApplication,
            props: {
                parentHTML: document.body,
                dlgType: dlgType,
                dlgButtons: buttons,
                dlgIcon: icon
            }
        });
        dlg.Msg.caption = msg;
        dlg.caption = Core.apps.activeApplication.name;
        dlg.showModal();
        if (!Tools.isNumber(x) && !Tools.isNumber(y)) {
            dlg.center();
        }
        else {
            dlg.moveTo(x, y);
        }
        return dlg;
    }
    static showMessage(msg) {
        return dialogs.showMessagePos(msg);
    }
    static messageBox(msg) {
        return dialogs.showMessage(msg);
    }
    static alert(msg) {
        return dialogs.showMessage(msg);
    }
    static showMessagePos(msg, icon, x, y) {
        return dialogs.messageDlgPos(msg, MESSAGETYPES.CUSTOM, null, icon,/*0,*/x, y);
    }
    static messageDlg(msg, dlgType, buttons, icon, defaultButton) {
        return dialogs.messageDlgPos(msg, dlgType, buttons, icon,/*helpCtx,*/ null, null, defaultButton);
    }
    static warning(msg, buttons) {
        return dialogs.messageDlgPos(msg, MESSAGETYPES.WARNING, buttons);
    }
    static information(msg, buttons) {
        return dialogs.messageDlgPos(msg, MESSAGETYPES.INFORMATION, (buttons ? buttons : DIALOGS_CONSTS.BTNS_YESNO));
    }
    static error(msg, buttons) {
        return dialogs.messageDlgPos(msg, MESSAGETYPES.ERROR, (buttons ? buttons : null));
    }
    static confirmation(msg, buttons) {
        return dialogs.messageDlgPos(msg, MESSAGETYPES.CONFIRMATION, (buttons ? buttons : DIALOGS_CONSTS.BTNS_OKCANCEL));
    }
    static confirm(msg, buttons) {
        return dialogs.confirmation(msg, buttons);
    }
    static prompt(caption, prompt, value) {
        const inputDlg = Core.classes.createComponent({
            class: Core.classes.InputDlg,
            owner: Core.apps.activeApplication,
            props: {
                parentHTML: document.body
            }
        });
        //inputDlg.loaded();
        inputDlg.Msg.caption = prompt;
        inputDlg.TextBox.text = value;
        inputDlg.caption = caption;
        inputDlg.resizeByContent();
        inputDlg.center();
        inputDlg.showModal();
        return inputDlg;
    }
    static inputQuery(caption, prompt, value) {
        return dialogs.prompt(caption, prompt, value);
    }
}
window.dialogs = Dialogs;
Core.classes.register(Types.INTERNALCATEGORIES.INTERNAL, MessageDlg, InputDlg);
//#endregion dialogs
//#region Templates
const WindowTpl = Core.classes.getTemplate(Core.classes.Window.name);
const MessageDlgContentTpl = [
    '<jagui-gridlayout id="{internalId_gridlayout}" data-class="GridLayout" class="GridLayout"><properties>{ "name": "Msg_gridlayout", "height": -1, "width": -1 }</properties>',
    '<jagui-icon id="{internalId_img}" data-class="Icon" class="Control Icon {theme}"><properties>{ "name": "Msg_icon", "left":  12, "top": 16, "visible": false, "column": 2, "row": 2 }</properties></jagui-icon>',
    '<jagui-label id="{internalId_msg}" data-class="Label" class="Label {theme}"><properties>{ "name": "Msg", "left": 58, "top": 16, "column": 4, "row": 2 }</properties></jagui-label>',
    '<jagui-flexlayout id="{internalId_btnCont}" data-class="FlexLayout" class="FlexLayout"><properties>{ "name": "Msg_btnsLayout", "column": 2, "row": 4, "justifyContent": "center" }</properties>',
    '<jagui-button id="{internalId_btnYes}" data-class="Button" class="Button {theme}"><properties>{ "name": "btnYes", "height": 22, "width": 71, "top": 0, "caption": "Yes", "visible": false, "forceDisplayVisibility": true, "modalResult": "yes" }</properties></jagui-button>',
    '<jagui-button id="{internalId_btnNo}" data-class="Button" class="Button {theme}"><properties>{ "name": "btnNo", "height":  22, "width": 71, "top": 0, "modalResult": "no", "visible": false, "forceDisplayVisibility": true, "caption": "No" }</properties></jagui-button>',
    '<jagui-button id="{internalId_btnOk}" data-class="Button" class="Button {theme}"><properties>{ "name": "btnOk", "height":  22, "width": 71, "top": 0, "modalResult": "ok", "visible": false, "forceDisplayVisibility": true, "caption": "Ok" }</properties></jagui-button>',
    '<jagui-button id="{internalId_btnCancel}" data-class="Button" class="Button {theme}"><properties>{ "name": "btnCancel", "height": 22, "width": 71, "top": 0, "modalResult": "cancel", "visible": false, "forceDisplayVisibility": true, "caption": "Cancel" }</properties></jagui-button>',
    '<jagui-button id="{internalId_btnAbort}" data-class="Button" class="Button {theme}"><properties>{ "name": "btnAbort", "height": 22, "width": 71, "top": 0, "modalResult": "abort", "visible": false, "forceDisplayVisibility": true, "caption": "Abort" }</properties></jagui-button>',
    '<jagui-button id="{internalId_btnRetry}" data-class="Button" class="Button {theme}"><properties>{ "name": "btnRetry", "height": 22, "width": 71, "top": 0, "modalResult": "retry", "visible": false, "forceDisplayVisibility": true, "caption": "Retry" }</properties></jagui-button>',
    '<jagui-button id="{internalId_btnIgnore}" data-class="Button" class="Button {theme}"><properties>{ "name": "btnIgnore", "height": 22, "width": 71, "top": 0, "modalResult": "ignore", "visible": false, "forceDisplayVisibility": true, "caption": "Ignore" }</properties></jagui-button>',
    '<jagui-button id="{internalId_btnAll}" data-class="Button" class="Button {theme}"><properties>{ "name": "btnAll", "height": 22, "width": 71, "top": 0, "modalResult": "all", "visible": false, "forceDisplayVisibility": true, "caption": "All" }</properties></jagui-button>',
    '<jagui-button id="{internalId_btnNoToAll}" data-class="Button" class="Button {theme}"><properties>{ "name": "btnNoToAll", "height": 22, "width": 71, "top": 0, "modalResult": "noToAll", "visible": false, "forceDisplayVisibility": true, "caption": "No to All" }</properties></jagui-button>',
    '<jagui-button id="{internalId_btnYesToAll}" data-class="Button" class="Button {theme}"><properties>{ "name": "btnYesToAll", "height": 22, "width": 71, "top": 0, "modalResult": "yesToAll", "visible": false, "forceDisplayVisibility": true, "caption": "Yes to All" }</properties></jagui-button>',
    '<jagui-button id="{internalId_btnHelp}" data-class="Button" class="Button {theme}"><properties>{ "name": "btnHelp", "height": 22, "width": 71, "top": 0, "modalResult": "help", "visible": false, "forceDisplayVisibility": true, "caption": "Help" }</properties></jagui-button>',
    '</jagui-flexlayout></jagui-gridlayout>'].join(String.EMPTY);
//const InputDlgTpl = ['<div id="{internalId}" data-name="{name}" data-class="Window" class="Window csr_default {theme} dialog" data-//theme="{theme}" data-borderstyle="dialog">',
//    '<div id="{internalId_Layout}" data-class="Layout" class="WindowLayout">',
//    WindowTitleBarTpl,
//    '<div id="{internalId_content}" data-name="showMessage_content" data-class="WindowContent" class="WindowContent">',
//    '<label id="{internalId_msg}" data-name="Msg" data-class="Label" class="Label csr_default {theme}" data-theme="{theme}" /style="left:/ 12px; top: 12px;"></label>',
//    '<div id="{internalId_input}" data-name="TextBox" data-class="TextBox" style="left: 12px; right: 12px; height: 20px" /class="TextBox /{theme}" data-theme="{theme}">',
//    '<input type="text" value="{value}" class="csr_text" /></div>',
//    '<div id="{internalId_btnCont}" data-class="Layout" data-name="Msg_layout" class="Layout horizontalCenter" //style="overflow:visible;height: 24px; bottom: 5px;">',
//    '<div id="{internalId_btnOk}" data-name="btnOk" data-class="Button" style="height: 22px; width: 71px;top: 0;" class="Button /{theme}"/ data-theme="{theme}" data-modalresult="ok"><span>Ok</span></div>',
//    '<div id="{internalId_btnCancel}" data-name="btnCancel" data-class="Button" style="height: 22px; width: 71px;top: 0;" /class="Button /{theme}" data-theme="{theme}" data-modalresult="cancel"><span>Cancel</span></div>',
//    '</div></div></div></div>'].join(String.EMPTY);
Core.classes.registerTemplates([{ Class: MessageDlg, template: WindowTpl.replace('{content}', MessageDlgContentTpl) }/*,
{ Class: InputDlg, template: InputDlgTpl }*/]);
//#endregion
export { Dialogs };
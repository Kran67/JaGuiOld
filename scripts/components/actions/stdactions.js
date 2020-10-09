//#region Imports
import { Action } from '/scripts/components/actions/action.js';
//#endregion
//#region EditAction
class EditAction extends Action {
    //#region Private fields
    #needCheckIsAvailable;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#needCheckIsAvailable = props.hasOwnProperty("needCheckIsAvailable") && core.tools.isBool(props.needCheckIsAvailable)
                    ? props.needCheckIsAvailable : !1;
        }        
    }
    //#endregion constructor
    //#region Methods
    //#region execute
    execute() {
        //#region Variables déclaration
        let canExecCmd = !0;
        //#endregion Variables déclaration
        if (this.command !== Action.COMMANDS.NONE) {
            !this.form.focusedControl && (canExecCmd = !1);
            !(this.form.focusedControl instanceof core.classes.CustomTextControl) && (canExecCmd = !1);
            !document.queryCommandEnabled(this.command) && (canExecCmd = !1);
            canExecCmd  && document.execCommand(this.command, !0, null);
            //else this.onExecute.invoke();


            //if (this.app.getAceWrappers().length>0) {
            //if (this.app._aceWrappers[i].isFocused())) {
            //this.app.getAceWrappers().first().execCommand(this._command.toLowerCase());
            //}
            //}
            super.execute();
        }
    }
    //#endregion execute
    //#region checkCommandAvailable
    checkCommandAvailable() {
        //#region Variables déclaration
        let selection = window.getSelection();
        let available = !1;
        //#endregion Variables déclaration
        //if (this.app._aceWrappers.length > 0) {
        //    //selection.removeAllRanges();
        //    for (let i = 0, l = this.app._aceWrappers.length; i < l; i++) {
        //        //if (this.app._aceWrappers[i].isFocused()) {
        //        switch (this.#command) {
        //            case Action.COMMANDS.CUT:
        //            case Action.COMMANDS.COPY:
        //            case Action.COMMANDS.DELETE:
        //                //if (this.app._aceWrappers[i].selection) {
        //                //    available = this.app._aceWrappers[i].getSelectedText() !== String.EMPTY;
        //                //}
        //                break;
        //            default:
        //                available = !0;
        //                break;
        //        }
        //        //}
        //    }
        /*} else*/ if (selection.type === 'Range') {
            available = !0;
            //console.log(selection.getRangeAt(0));
        }
        this.enabled = available;
    }
    //#endregion checkCommandAvailable
    //#region loaded
    loaded() {
        this.#needCheckIsAvailable && core.looper.addListener(this, 'checkCommandAvailable');
    }
    //#endregion loaded
    //#endregion Methods
}
//#endregion EditAction
//#region EditCut
class EditCut extends EditAction {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        props.command = Action.COMMANDS.CUT;
        props.needCheckIsAvailable = !0;
        owner && super(owner, props);
    }
    //#endregion constructor
}
Object.seal(EditCut);
//#endregion
//#region EditCopy
class EditCopy extends EditAction {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        props.command = Action.COMMANDS.COPY;
        props.needCheckIsAvailable = !0;
        owner && super(owner, props);
    }
    //#endregion constructor
}
Object.seal(EditCopy);
//#endregion
//#region EditPaste
class EditPaste extends EditAction {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        props.command = Action.COMMANDS.PASTE;
        owner && super(owner, props);
    }
    //#endregion constructor
}
Object.seal(EditPaste);
//#endregion
//#region EditSelectAll
class EditSelectAll extends EditAction {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        props.command = Action.COMMANDS.SELECTALL;
        owner && super(owner, props);
    }
    //#endregion constructor
}
Object.seal(EditSelectAll);
//#endregion
//#region EditUndo
class EditUndo extends EditAction {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        props.command = Action.COMMANDS.UNDO;
        owner && super(owner, props);
    }
    //#endregion constructor
}
Object.seal(EditUndo);
//#endregion
//#region EditRedo
class EditRedo extends EditAction {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        props.command = Action.COMMANDS.REDO;
        owner && super(owner, props);
    }
    //#endregion constructor
};
Object.seal(EditRedo);
//#endregion
//#region EditDelete
class EditDelete extends EditAction {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        props.command = Action.COMMANDS.DELETE;
        props.needCheckIsAvailable = !0;
        owner && super(owner, props);
    }
    //#endregion constructor
}
Object.seal(EditDelete);
//#endregion
//#region CommonDialogAction
class CommonDialogAction extends Action {
    //#region Private fields
    #dialog = null;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            //this.executeResult=false;
            //this.onCancel=new $j.classes.NotifyEvent(this);
            this.createEventsAndBind(['beforeExecute'], props);
        }
    }
    //#endregion constructor
    //#region Methods
    //doCancel:function() {
    //  if (!this.onCancel.hasListener()) this.onCancel.invoke(this);
    //},
    //#region execute
    execute() {
        this.executeResult = !1;
        if (this.#dialog) {
            this.#dialog.onClose.removeListener(this.onCloseDialog);
            this.#dialog.onClose.addListener(this.onCloseDialog);
            this.beforeExecute.hasListener && this.beforeExecute.invoke(this);
            this.#dialog.action = this;
            this.#dialog.execute();
        }
        super.execute();
    }
    //#endregion execute
    //#region onCloseDialog
    onCloseDialog() { }
    //#endregion onCloseDialog
    //#endregion Methods
}
Object.seal(CommonDialogAction);
//#endregion CommonDialogAction
//#region FileOpen
class FileOpen extends CommonDialogAction {
    //#region Private fields
    #filesFilter = String.EMPTY;
    #multiSelect = !1;
    #dialog;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            const form = this.form;
            this.#dialog = new core.classes.OpenDialog(owner);
            this.createEventsAndBind(['onFilesSelected'], props);
            if (props.onFilesSelected) {
                if (core.tools.isFunc(form[props.onFilesSelected])) {
                    this.onFilesSelected.addListener(form[props.onFilesSelected]);
                } else if (core.tools.isString(props.onFilesSelected)) {
                    !String.isNullOrEmpty(props.onFilesSelected) && this.onFilesSelected.addListener(new Function(props.onFilesSelected));
                } else if (core.tools.isFunc(props.onFilesSelected)) {
                    this.onFilesSelected.addListener(props.onFilesSelected);
                }
            }
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region filesFilter
    get filesFilter() {
        return this.#filesFilter;
    }
    set filesFilter(newValue) {
        core.tools.isString(newValue) && this.#filesFilter !== newVlaue && (this.#filesFilter = newVlaue);
    }
    //#endregion filesFilter
    //#region multiSelect
    get multiSelect() {
        return this.#multiSelect;
    }
    set multiSelect(newValue) {
        core.tools.isBool(newValue) && this.#multiSelect !== newVlaue && (this.#multiSelect = newVlaue);
    }
    //#endregion multiSelect
    //#endregion Getters / Setters
    //#region Methods
    //#region execute
    execute() {
        this.#dialog.filesFilter = this.#filesFilter;
        this.#dialog.multiple = this.#multiSelect;
        super.execute();
    }
    //#endregion execute
    //#region doFilesSelected
    doFilesSelected(files) {
        !this.#multiSelect && (files = files.first);
        this.onFilesSelected.hasListener && this.onFilesSelected.invoke(files);
    }
    //#endregion doFilesSelected
    //#region onCloseDialog
    onCloseDialog(files) {
        files.length > 0 && this.action.doFilesSelected(files);
    }
    //#endregion onCloseDialog
    //#endregion Methods
}
Object.seal(FileOpen);
Object.defineProperties(Action.prototype, {
    'filesFilter': {
        enumerable: !0
    },
    'multiSelect': {
        enumerable: !0
    }
});
//#endregion FileOpen
//#region FileSaveAs
class FileSaveAs extends CommonDialogAction {}
Object.seal(FileSaveAs);
//#endregion FileSaveAs
//#region FilePrintSetup
class FilePrintSetup extends CommonDialogAction {}
Object.seal(FilePrintSetup);
//#endregion FilePrintSetup
//#region FilePageSetup
class FilePageSetup extends CommonDialogAction {}
Object.seal(FilePageSetup);
//#endregion FilePageSetup
//#region FileExit
class FileExit extends CommonDialogAction {}
Object.seal(FileExit);
//#endregion FileExit
//#region Search Actions
//#region SearchAction
class SearchAction extends CommonDialogAction {}
Object.seal(SearchAction);
//#endregion SearchAction
//#region SearchFind
class SearchFind extends CommonDialogAction {}
Object.seal(SearchFind);
//#endregion SearchFind
//#region SearchReplace
class SearchReplace extends CommonDialogAction {}
Object.seal(SearchReplace);
//#endregion SearchReplace
//#region SearchFindFirst
class SearchFindFirst extends CommonDialogAction {}
Object.seal(SearchFindFirst);
//#endregion SearchFindFirst
//#region SearchFindNext
class SearchFindNext extends CommonDialogAction {}
Object.seal(SearchFindNext);
//#endregion SearchFindNext
//#endregion Search Actions
//#region FontEdit
class FontEdit extends CommonDialogAction {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.dialog = new core.classes.FontDialog(owner);
        }
    }
    //#endregion constructor
}
Object.seal(FontEdit);
//#endregion FontEdit
//#region ColorSelect
class ColorSelect extends CommonDialogAction {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.dialog = new core.classes.FontDialog(owner);
        }
    }
    //#endregion constructor
}
Object.seal(ColorSelect);
//#endregion ColorSelect
//#region PrintDlg
class PrintDlg extends CommonDialogAction {}
Object.seal(PrintDlg);
//#endregion
core.classes.register(core.types.CATEGORIES.INTERNAL, EditAction, CommonDialogAction);
core.classes.register(core.types.CATEGORIES.ACTIONS, EditCut, EditCopy, EditPaste, EditSelectAll, EditUndo, EditRedo, EditDelete, FileOpen, FileSaveAs);
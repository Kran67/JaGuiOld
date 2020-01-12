(function () {
    "use strict";
    //#region Commands
    $j.types.commands = {
        NONE: "none",
        BACKCOLOR: "backColor",
        BOLD: "bold",
        CONTENTREADONLY: "contentReadOnly",
        COPY: "copy",
        CREATELINK: "createLink",
        CUT: "cut",
        DECREASEFONTSIZE: "decreaseFontSize",
        DELETE: "delete",
        ENABLEINLINETABLEEDITING: "enableInlineTableEditing",
        ENABLEOBJECTRESIZING: "enableObjectResizing",
        FONTNAME: "fontName",
        FONTSIZE: "fontSize",
        FORECOLOR: "foreColor",
        FORMATBLOCK: "formatBlock",
        FORWARDDELETE: "forwardDelete",
        HEADING: "heading",
        HILITECOLOR: "hiliteColor",
        INCREASEFONTSIZE: "increaseFontSize",
        INDENT: "indent",
        INSERTBRONRETURN: "insertBrOnReturn",
        INSERTHORIZONTALRULE: "insertHorizontalRule",
        INSERTHTML: "insertHTML",
        INSERTIMAGE: "insertImage",
        INSERTORDEREDLIST: "insertOrderedList",
        INSERTUNORDEREDLIST: "insertUnorderedList",
        INSERTPARAGRAPH: "insertParagraph",
        INSERTTEXT: "insertText",
        ITALIC: "italic",
        JUSTIFYCENTER: "justifyCenter",
        JUSTIFYFULL: "justifyFull",
        JUSTIFYLEFT: "justifyLeft",
        JUSTIFYRIGHT: "justifyRight",
        OUTDENT: "outdent",
        PASTE: "paste",
        REDO: "redo",
        REMOVEFORMAT: "removeFormat",
        SELECTALL: "selectAll",
        STRIKETHROUGH: "strikeThrough",
        SUBSCRIPT: "subscript",
        SUPERSCRIPT: "superscript",
        UNDERLINE: "underline",
        UNDO: "undo",
        UNLINK: "unlink",
        USECSS: "useCSS",
        STYLEWITHCSS: "styleWithCSS"
    };
    //#endregion
    //#region Edit actions
    var EditAction = $j.classes.Action.extend("EditAction", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._command = $j.types.commands.NONE;
                this._needCheckIsAvailable = false;
                //#endregion
            }
        },
        //#region Methods
        execute: function () {
            var canExecCmd = true;
            //if (!$j.doc.queryCommandSupported(command)) console.log("The command "+command+" is not supported, use the keyboard shortcut.");
            if (this._command === $j.types.commands.NONE) return;
            if (!this.form._focusedControl) canExecCmd = false;
            if (!(this.form._focusedControl instanceof $j.classes.CustomTextControl)) canExecCmd = false;
            if (!$j.doc.queryCommandEnabled(this._command)) canExecCmd = false;
            if (canExecCmd) $j.doc.execCommand(this._command, true, null);
            //else this.onExecute.invoke();


            //if (this.app.getAceWrappers().length>0) {
            //if (this.app._aceWrappers[i].isFocused())) {
            //this.app.getAceWrappers().first().execCommand(this._command.toLowerCase());
            //}
            //}
            this._inherited();
        },
        checkCommandAvailable: function () {
            var selection = window.getSelection(), available = false;
            if (this.app._aceWrappers.length > 0) {
                //selection.removeAllRanges();
                for (var i = 0, l = this.app._aceWrappers.length; i < l; i++) {
                    //if (this.app._aceWrappers[i].isFocused()) {
                    switch (this._command) {
                        case $j.types.commands.CUT:
                        case $j.types.commands.COPY:
                        case $j.types.commands.DELETE:
                            if (this.app._aceWrappers[i].selection) {
                                available = this.app._aceWrappers[i].getSelectedText() !== String.EMPTY;
                            }
                            break;
                        default:
                            available = true;
                            break;
                    }
                    //}
                }
            } else if (selection.type === "Range") {
                available = true;
                //console.log(selection.getRangeAt(0));
            }
            this.setEnabled(available);
        },
        loaded: function () {
            this._inherited();
            if (this._needCheckIsAvailable) $j.looper.addListener(this, "checkCommandAvailable");
        }
        //#endregion
    });
    //#endregion
    //#region EditCut
    var EditCut = EditAction.extend("EditCut", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._command = $j.types.commands.CUT;
                this._needCheckIsAvailable = true;
                //#endregion
            }
        }
    });
    Object.seal(EditCut);
    //#endregion
    //#region EditCopy
    var EditCopy = EditAction.extend("EditCopy", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._command = $j.types.commands.COPY;
                this._needCheckIsAvailable = true;
                //#endregion
            }
        }
    });
    Object.seal(EditCopy);
    //#endregion
    //#region EditPaste
    var EditPaste = EditAction.extend("EditPaste", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._command = $j.types.commands.PASTE;
                //#endregion
            }
        }
    });
    Object.seal(EditPaste);
    //#endregion
    //#region EditSelectAll
    var EditSelectAll = EditAction.extend("EditSelectAll", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._command = $j.types.commands.SELECTALL;
                //#endregion
            }
        }
    });
    Object.seal(EditSelectAll);
    //#endregion
    //#region EditUndo
    var EditUndo = EditAction.extend("EditUndo", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._command = $j.types.commands.UNDO;
                //#endregion
            }
        }
    });
    Object.seal(EditUndo);
    //#endregion
    //#region EditRedo
    var EditRedo = EditAction.extend("EditRedo", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._command = $j.types.commands.REDO;
                //#endregion
            }
        }
    });
    Object.seal(EditRedo);
    //#endregion
    //#region EditDelete
    var EditDelete = EditAction.extend("EditDelete", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._command = $j.types.commands.DELETE;
                this._needCheckIsAvailable = true;
                //#endregion
            }
        }
    });
    Object.seal(EditDelete);
    //#endregion
    //#region CommonDialogAction
    var CommonDialogAction = $j.classes.Action.extend("CommonDialogAction", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //this.executeResult=false;
                //this.onCancel=new $j.classes.NotifyEvent(this);
                this.beforeExecute = new $j.classes.NotifyEvent(this);
                this.dialog = null;
            }
        },
        //#region Methods
        //doCancel:function() {
        //  if (!this.onCancel.hasListener()) this.onCancel.invoke(this);
        //},
        execute: function () {
            this.executeResult = false;
            if (this.dialog) {
                this.dialog.onClose.removeListener(this.onCloseDialog);
                this.dialog.onClose.addListener(this.onCloseDialog);
                if (this.beforeExecute.hasListener()) this.beforeExecute.invoke(this);
                this.dialog.action = this;
                this.dialog.execute();
            }
            this._inherited();
        },
        onCloseDialog: function () { }
        //#endregion
    });
    Object.seal(CommonDialogAction);
    //#endregion
    //#region FileOpen
    var FileOpen = CommonDialogAction.extend("FileOpen", {
        init: function (owner, props) {
            if (owner) {
                this.filesFilter = String.EMPTY;
                this._inherited(owner, props);
                this.onFilesSelected = new $j.classes.NotifyEvent(this);
                this.multiSelect = false;
                this.dialog = new $j.classes.OpenDialog(owner);
                if (props.onFilesSelected) {
                    if (this.form[props.onFilesSelected]) this.onFilesSelected.addListener(this.form[props.onFilesSelected]);
                    else if (typeof props.onFilesSelected === _const.STRING) this.onFilesSelected.addListener(new Function(props.onFilesSelected));
                }
            }
        },
        //#region Setters
        setFilesFilter: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.filesFilter !== newVlaue) {
                this.filesFilter = newVlaue;
            }
        },
        setMultiSelect: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.multiSelect !== newVlaue) {
                this.multiSelect = newVlaue;
            }
        },
        //#endregion
        //#region Methods
        execute: function () {
            this.dialog.filesFilter = this.filesFilter;
            this.dialog.multiple = this.multiSelect;
            this._inherited();
        },
        doFilesSelected: function (files) {
            if (!this.multiSelect) files = files.first();
            if (this.onFilesSelected.hasListener()) this.onFilesSelected.invoke(files);
        },
        onCloseDialog: function (files) {
            if (files.length > 0) this.action.doFilesSelected(files);
        }
        //#endregion
    });
    Object.seal(FileOpen);
    //#endregion
    //#region FileSaveAs
    var FileSaveAs = CommonDialogAction.extend("FileSaveAs", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        },
        //#region Methods
        execute: function (command) {
            this._inherited();
        }
        //#endregion
    });
    Object.seal(FileSaveAs);
    //#endregion
    //#region FilePrintSetup
    var FilePrintSetup = CommonDialogAction.extend("FilePrintSetup", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        },
        //#region Methods
        execute: function (command) {
            this._inherited();
        }
        //#endregion
    });
    Object.seal(FilePrintSetup);
    //#endregion
    //#region FilePageSetup
    var FilePageSetup = CommonDialogAction.extend("FilePageSetup", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        },
        //#region Methods
        execute: function (command) {
            this._inherited();
        }
        //#endregion
    });
    Object.seal(FilePageSetup);
    //#endregion
    //#region FileExit
    var FileExit = CommonDialogAction.extend("FileExit", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        },
        //#region Methods
        execute: function (command) {
            this._inherited();
        }
        //#endregion
    });
    Object.seal(FileExit);
    //#endregion
    //#region Search Actions
    //#region SearchAction
    var SearchAction = CommonDialogAction.extend("SearchAction", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        }
    });
    Object.seal(SearchAction);
    //#endregion
    //#region SearchFind
    var SearchFind = CommonDialogAction.extend("SearchFind", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        }
        //#region Methods
        //#endregion
    });
    Object.seal(SearchFind);
    //#endregion
    //#region SearchReplace
    var SearchReplace = CommonDialogAction.extend("SearchReplace", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        }
        //#region Methods
        //#endregion
    });
    Object.seal(SearchReplace);
    //#endregion
    //#region SearchFindFirst
    var SearchFindFirst = CommonDialogAction.extend("SearchFindFirst", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        }
        //#region Methods
        //#endregion
    });
    Object.seal(SearchFindFirst);
    //#endregion
    //#region SearchFindNext
    var SearchFindNext = CommonDialogAction.extend("SearchFindNext", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        }
        //#region Methods
        //#endregion
    });
    Object.seal(SearchFindNext);
    //#endregion
    //#endregion
    //#region FontEdit
    var FontEdit = CommonDialogAction.extend("FontEdit", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.dialog = new $j.classes.FontDialog(owner);
            }
        }
        //#region Methods
        //#endregion
    });
    Object.seal(FontEdit);
    //#endregion
    //#region ColorSelect
    var ColorSelect = CommonDialogAction.extend("ColorSelect", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.dialog = new $j.classes.ColorDialog(owner);
            }
        }
        //#region Methods
        //#endregion
    });
    Object.seal(ColorSelect);
    //#endregion
    //#region PrintDlg
    var PrintDlg = CommonDialogAction.extend("PrintDlg", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        }
        //#region Methods
        //#endregion
    });
    Object.seal(PrintDlg);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, EditAction, CommonDialogAction);
    $j.classes.register($j.types.categories.ACTIONS, EditCut, EditCopy, EditPaste, EditSelectAll, EditUndo, EditRedo, EditDelete, FileOpen, FileSaveAs);
})();
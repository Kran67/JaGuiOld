(function () {
    "use strict";
    //#region TabAction
    var TabAction = $j.classes.Action.extend("TabAction", {
        init: function (owner) {
            if (owner) {
                this._inherited(owner);
            }
        }
    });
    Object.seal(TabAction);
    //#endregion
    //#region PreviousTab
    var PreviousTab = TabAction.extend("PreviousTab", {
        init: function (owner) {
            if (owner) {
                this._inherited(owner);
            }
        }
    });
    Object.seal(PreviousTab);
    //#endregion
    //#region NextTab
    var NextTab = TabAction.extend("NextTab", {
        init: function (owner) {
            if (owner) {
                this._inherited(owner);
            }
        }
    });
    Object.seal(NextTab);
    //#endregion
    //#region OpenPicture
    var OpenPicture = $j.classes.CommonDialogAction.extend("OpenPicture", {
        init: function (owner) {
            if (owner) {
                this._inherited(owner);
            }
        }
    });
    Object.seal(OpenPicture);
    //#endregion
    //#region SavePicture
    var SavePicture = $j.classes.CommonDialogAction.extend("SavePicture", {
        init: function (owner) {
            if (owner) {
                this._inherited(owner);
            }
        }
    });
    Object.seal(SavePicture);
    //#endregion
    //#region ListControlAction
    var ListControlAction = $j.classes.Action.extend("ListControlAction", {
        init: function (owner) {
            if (owner) {
                this._inherited(owner);
            }
        }
    });
    Object.seal(ListControlAction);
    //#endregion
    //#region ListControlSelectAll
    var ListControlSelectAll = ListControlAction.extend("ListControlSelectAll", {
        init: function (owner) {
            if (owner) {
                this._inherited(owner);
            }
        }
    });
    Object.seal(ListControlSelectAll);
    //#endregion
    //#region ListControlClearSelection
    var ListControlClearSelection = ListControlAction.extend("ListControlClearSelection", {
        init: function (owner) {
            if (owner) {
                this._inherited(owner);
            }
        }
    });
    Object.seal(ListControlClearSelection);
    //#endregion
    //#region ListControlDeleteSelection
    var ListControlDeleteSelection = ListControlAction.extend("ListControlDeleteSelection", {
        init: function (owner) {
            if (owner) {
                this._inherited(owner);
            }
        }
    });
    Object.seal(ListControlDeleteSelection);
    //#endregion
    //#region ListBoxCopySelection
    var ListBoxCopySelection = ListControlAction.extend("ListBoxCopySelection", {
        init: function (owner) {
            if (owner) {
                this._inherited(owner);
            }
        }
    });
    Object.seal(ListBoxCopySelection);
    //#endregion
    //#region ListControlMoveSelection
    var ListControlMoveSelection = ListControlAction.extend("ListControlMoveSelection", {
        init: function (owner) {
            if (owner) {
                this._inherited(owner);
            }
        }
    });
    Object.seal(ListControlMoveSelection);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, TabAction, ListControlAction);
    $j.classes.register($j.types.categories.ACTIONS, PreviousTab, NextTab, OpenPicture, SavePicture, ListControlSelectAll, ListControlClearSelection, ListControlDeleteSelection, ListBoxCopySelection, ListControlMoveSelection);
})();
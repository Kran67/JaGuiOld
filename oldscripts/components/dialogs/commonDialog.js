(function () {
    var CommonDialog = $j.classes.Component.extend("CommonDialog", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.onClose = new $j.classes.NotifyEvent(this);
                this.onShow = new $j.classes.NotifyEvent(this);
            }
        },
        //#region Properties
        //#endregion
        //#region Methods
        loaded: function () {
            this._inherited();
            this.setName(this.name);
        },
        destroy: function () {
            this._inherited();
            this.onClose.destroy();
            this.onClose = null;
            this.onShow.destroy();
            this.onShow = null;
        },
        execute: function () {
            this.onShow.invoke();
        }
        //#endregion
    });
    $j.classes.register($j.types.categories.INTERNAL, CommonDialog);
})();
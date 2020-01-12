(function() {
    //#region TextBoxBtn
    var TextBoxBtn = $j.classes.CustomTextBoxBtn.extend("TextBoxBtn",{
        init: function(owner,props) {
            if(owner) {
                props = !props ? {} : props;
                props._btnClass = $j.classes.TextButton;
                this._inherited(owner,props);
                //#region Private
                //#endregion
                if(!$j.isHTMLRenderer()) {
                    this.width = 121;
                    this.height = 21;
                }
            }
        }
        //#region Setters
        //#endregion
        //#region Methods
    });
    $j.classes.register($j.types.categories.EXTENDED,TextBoxBtn);
    //#region Templates
    if($j.isHTMLRenderer()) {
        var TextBoxBtnTpl = "<div id='{internalId}' data-name='{name}' data-class='TextBoxBtn' class='Control TextBox TextBoxBtn {theme}'>\
                       <input type='text' class='Control csr_text TextBoxInput TextBoxBtnInput {theme}'>\
                       {buttons}\
                       </div>";
        $j.classes.registerTemplates([{ Class: TextBoxBtn,template: TextBoxBtnTpl }]);
    }
    //endregion
})();
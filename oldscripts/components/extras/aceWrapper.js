(function () {
    $j.types.aceModes = {
        HTML: "html",
        CSS: "css",
        TEXT: "text",
        JAVASCRIPT: "javascript",
        JSON: "json",
        XML: "xml"
    };
    var AceWrapper = $j.classes.Control.extend("AceWrapper", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._editorSessions = [];
                this._aceMode = "ace/mode/";
                this._aceTheme = "ace/theme/";
                //#endregion
                this.editor = null;
                this.editorTheme = "twilight";
                this.editorMode = "text";
                this.autoCapture = true;
                this.canFocused = true;
            }
        },
        //#region Setter
        setEditorMode: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.editorMode !== newValue) {
                this.editorMode = newValue;
                this.editor.session.setMode(this._aceMode + this.editorMode);
            }
        },
        setEditorTheme: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.editorTheme !== newValue) {
                this.editorTheme = newValue;
                this.editor.setTheme(this._aceTheme + this.editorTheme);
            }
        },
        setEditorSession: function (index) {
            if (index < 0 || index > this._editorSessions.length) return;
            this.editor.setSession(this._editorSessions[index]);
            this.editor.focus();
        },
        //#endregion
        //#region Methods
        getSession: function (index) {
            if (index < 0 || index > this._editorSessions.length) return null;
            return this._editorSessions[index];
        },
        loaded: function () {
            this._inherited();
            this.editor = ace.edit(this._internalId + '_editor', this._aceMode + $j.types.aceModes.TEXT);
            this.editor.setTheme(this._aceTheme + this.editorTheme);
            this.editor.setSession(this.newSession(String.EMPTY, $j.types.aceModes.TEXT));
            this.editor.container.firstElementChild.jsObj = this;
            Application._aceWrappers.push(this.editor);
        },
        mouseMove: function () {
            this._stopEvent = false;
        },
        newSession: function (text, mode) {
            var design = String.EMPTY, session;
            if (mode === $j.types.aceModes.HTML) {
                design = text;
                text = String.EMPTY;
            }
            session = ace.createEditSession(text, this._aceMode + mode);
            session.design = design;
            this._editorSessions.push(session);
            this.editor.setSession(session);
        },
        destroy: function () {
            this._inherited();
            this.editor = null;
        }
        //#endregion
    });
    Object.seal(AceWrapper);
    $j.classes.register($j.types.categories.EXTRAS, AceWrapper);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var AceWrapperTpl = "<div id='{internalId}' data-name='{name}' data-class='AceWrapper' class='Control AceWrapper' style='width:320px;height:191px;'>\
                       <div id='{internalId}_editor' class='Control aceEditor'></div>\
                       </div>";
        $j.classes.registerTemplates([{ Class: AceWrapper, template: AceWrapperTpl }]);
    }
    //#endregion
})();
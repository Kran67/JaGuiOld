(function () {
    //#region TableCell
    TableCell = Class.extend("TableCell", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                //#region Private
                this._owner = owner;
                this._HTMLElement = (props["HTMLObj"] ? props["HTMLObj"] : null);
                this._HTMLElementStyle = (this._HTMLElement ? this._HTMLElement.style : null);
                //#endregion Private
                this.left = (props.hasOwnProperty("left") ? props.left : 0);
                this.top = (props.hasOwnProperty("top") ? props.top : 0);
                this.width = (props.hasOwnProperty("width") ? props.width : 0);
                this.height = (props.hasOwnProperty("height") ? props.height : 0);
                this.colSpan = (props.hasOwnProperty("colSpan") ? props.colSpan : 1);
                this.rowSpan = (props.hasOwnProperty("rowSpan") ? props.rowSpan : 1);
                this.col = (props.hasOwnProperty("col") ? props.col : 0);
                this.row = (props.hasOwnProperty("row") ? props.row : 0);
                this.visible = (props.hasOwnProperty("visible") ? props.visible : true);
            }
        },
        //#region Setters
        setBounds: function (l, t, w, h) {
            var style;
            if (typeof l !== _const.NUMBER) return;
            if (typeof t !== _const.NUMBER) return;
            if (typeof w !== _const.NUMBER) return;
            if (typeof h !== _const.NUMBER) return;
            this.left = l;
            this.top = t;
            this.width = w;
            this.height = h;
            if (this._HTMLElement) {
                //style=this._HTMLElement.style;
                this._HTMLElementStyle.left = l + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.top = t + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.width = w + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.height = h + $j.types.CSSUnits.PX;
            }
        },
        setVisible: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.visible !== newValue) {
                this.visible = newValue;
                if (this._HTMLElement) {
                    this._HTMLElement.dataset.visible = this.visible;
                }
            }
        },
        //#endregion Setters
        getChildsHTMLElement: function (HTMLObj) {
            var nodes = HTMLObj ? HTMLObj.childNodes : this._HTMLElement.childNodes, obj, owner, dataClass, dataName;
            for (var i = 0, l = nodes.length; i < l; i++) {
                if (!nodes[i]) continue;
                if (nodes[i].nodeType === $j.types.xmlNodeTypes.ELEMENT_NODE) {
                    dataClass = nodes[i].dataset.class;
                    dataName = nodes[i].dataset.name;
                    if (dataClass) {
                        owner = this._owner;
                        if ($j.classes[dataClass]) {
                            obj = $j.classes.createComponent($j.classes[dataClass], owner, dataName, null, false, nodes[i].id);
                            obj.col = this.col;
                            obj.row = this.row;
                            obj.colSpan = this.colSpan;
                            obj.rowSpan = this.rowSpan;
                            obj.setVisible(this.visible);
                        }
                    }
                }
            }
        },
        destroy: function () {
            this._owner = null;
            if (this._HTMLElement) {
                this._HTMLElement.remove();
            }
            this._HTMLElement = null;
            this.left = null;
            this.top = null;
            this.width = null;
            this.height = null;
            this.colSpan = null;
            this.rowSpan = null;
            this.col = null;
            this.row = null;
            this.visible = null;
        }
    });
    //#endregion TableCell
    //#region TableColumn
    TableColumn = Class.extend("TableColumn", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                //#region Private
                this._owner = owner;
                //#endregion Private
                this.left = (props["left"] ? props["left"] : 0);
                this.width = (props["width"] ? props["width"] : 100);
                this.unit = (props["unit"] ? props["unit"] : $j.types.CSSUnits.PX);
            }
        },
        //region Setters
        setWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.width) {
                this.width = newValue;
                this._owner.onChange.invoke();
            }
        },
        setUnit: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.CSSUnits)) return;
            if (newValue !== this.unit) {
                this.unit = newValue;
                this._owner.onChange.invoke();
            }
        },
        destroy: function () {
            this._owner = null;
            this.left = null;
            this.width = null;
            this.unit = null;
        }
        //endregion Setters
    });
    Object.seal(TableColumn);
    //#endregion TableColumn
    //#region TableRow
    TableRow = Class.extend("TableRow", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                //#region Private
                this._owner = owner;
                //#endregion Private
                this.top = (props["top"] ? props["top"] : 0);
                this.height = (props["height"] ? props["height"] : 100);
                this.unit = (props["unit"] ? props["unit"] : $j.types.CSSUnits.PX);
            }
        },
        //region Setters
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.height) {
                this.height = newValue;
                this._owner.onChange.invoke();
            }
        },
        setUnit: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.CSSUnits)) return;
            if (newValue !== this.unit) {
                this.unit = newValue;
                this._owner.onChange.invoke();
            }
        },
        //endregion Setters
        //region Methods
        destroy: function () {
            this._owner = null;
            this.top = null;
            this.height = null;
            this.unit = null;
        }
        //endregion
    });
    Object.seal(TableRow);
    //#endregion TableRow
    //#region TableLayout
    TableLayout = $j.classes.ThemedControl.extend("TableLayout", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._rowDeleted = false;
                this._colDeleted = false;
                //#endregion Private
                $j.classes.newCollection(this, owner, TableRow, "rows");
                $j.classes.newCollection(this, owner, TableColumn, "columns");
                this.cells = [];
                this.cellSpacing = 0;
                this.cellPadding = 0;
                this.showCells = false;
            }
        },
        //#region Setters
        setShowCells: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showCells !== newValue) {
                this.showCells = newValue;
                //this.applyAllStyles();
            }
        },
        setCellSpacing: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.cellSpacing !== newValue) {
                this.cellSpacing = newValue;
                //this.applyAllStyles();
            }
        },
        setCellPadding: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.cellPadding !== newValue) {
                this.cellPadding = newValue;
                //this.applyAllStyles();
            }
        },
        //#endregion
        //region Methods
        updateFromHTML: function () {
            var data, i = 0, l, rowIdx, colIdx, row, col, rows, units, cols, dataClass;
            data = this._HTMLElement.dataset.showcells;
            if (data) this.showCells = _conv.strToBool(data);
            data = this._HTMLElement.dataset.cellspacing;
            if (data) this.cellSpacing = ~~data;
            data = this._HTMLElement.dataset.cellpadding;
            if (data) this.cellPadding = ~~data;
            // rows
            data = this._HTMLElement.dataset.rows;
            if (data) {
                data = data.split(";");
                rows = data[0].split(",");
                units = data[1].split(",");
                for (i = 0, l = rows.length; i < l; i++) {
                    row = new this.rows._itemClass(this.rows, { "height": ~~rows[i], "unit": units[i] });
                    this.rows.push(row);
                }
            }
            // columns
            data = this._HTMLElement.dataset.cols;
            if (data) {
                data = data.split(";");
                cols = data[0].split(",");
                units = data[1].split(",");
                for (i = 0, l = cols.length; i < l; i++) {
                    col = new this.columns._itemClass(this.columns, { "width": ~~cols[i], "unit": units[i] });
                    this.columns.push(col);
                }
            }
            // on va chercher les cellules
            data = this._HTMLElement.querySelectorAll('[data-row]');
            l = data.length;
            for (i = 0; i < l; i++) {
                dataClass = data[i].dataset.class;
                if (dataClass) continue;
                rowIdx = ~~data[i].dataset.row;
                colIdx = ~~data[i].dataset.col;
                if (!this.cells[rowIdx]) this.cells[rowIdx] = [];
                this.cells[rowIdx][colIdx] = new $j.classes.TableCell(this, {
                    "left": ~~data[i].offsetLeft, "top": ~~data[i].offsetTop, "width": ~~data[i].offsetWidth, "height": ~~data[i].offsetHeight,
                    "colSpan": ~~data[i].dataset.colspan,
                    "rowSpan": ~~data[i].dataset.rowspan,
                    "col": ~~data[i].dataset.col,
                    "row": ~~data[i].dataset.row,
                    "HTMLObj": data[i],
                    "visible": _conv.strToBool(data[i].dataset.visible)
                });
                this.cells[rowIdx][colIdx].getChildsHTMLElement();
            }
            this._inherited();
        },
        hasComponentsInRow: function (index) {
            var i, l, canContinue = true;
            for (i = 0, l = this._owner._components.length; i < l; i++) {
                if ((this._owner._components[i].col === i) && (this._owner._components[i].row === index)) {
                    canContinue = false;
                    break;
                }
            }
            if (canContinue) {
                for (i = 0, l = this.cells[index].length; i < l; i++) {
                    if (!this.cells[index][i].visible) {
                        canContinue = false;
                        break;
                    }
                }
            }
            return canContinue;
        },
        hasComponentsInColumn: function (index) {
            var i, l, canContinue = true;
            for (i = 0, l = this._owner._components.length; i < l; i++) {
                if ((this._owner._components[i].col === index) && (this._owner._components[i].row === i)) {
                    canContinue = false;
                    break;
                }
            }
            if (canContinue) {
                for (i = 0, l = this.cells.length; i < l; i++) {
                    if (!this.cells[i][index].visible) {
                        canContinue = false;
                        break;
                    }
                }
            }
            return canContinue;
        },
        deleteCellsFromRow: function (index) {
            var i, l;
            for (i = this.cells.length - 1; i >= 0; i--) {
                this.cells[index][i].free();
                this.cells[index][i] = null;
            }
            this.cells.removeAt(index);
            this._rowDeleted = true;
            for (i = 0, l = this._components.length; i < l; i++) {
                if (this._components[i].row >= index) {
                    if (index > 0) {
                        this._components[i].row--;
                    } else {
                        this._components[i].row++;
                    }
                }
            }
        },
        deleteCellsFromColumn: function (index) {
            var i, l;
            for (i = this.cells.length - 1; i >= 0; i--) {
                this.cells[i][index].free();
                this.cells[i][index] = null;
                this.cells[i].removeAt(index);
            }
            this._colDeleted = true;
            for (i = 0, l = this._components.length; i < l; i++) {
                if (this._components[i].col >= index) {
                    if (index > 0) {
                        this._components[i].col--;
                    } else {
                        this._components[i].cols++;
                    }
                }
            }
        },
        recalc: function () {
            var i, lng, heights = widths = 0, totalHeight = this._HTMLElement.offsetHeight, totalWidth = this._HTMLElement.offsetWidth, j, l, t,
                row, col, lng1, h, w, lastPo = -1, currentPo = 0, totalPo = 0, u;
            if (this._loading) return;
            // first getting rows height with px unit
            if (this._rowDeleted) {
                lng = this.rows.length;
                for (i = 0; i < lng; i++) {
                    if (this.rows[i].unit === $j.types.CSSUnits.PX) {
                        heights += this.rows[i].height;
                    }
                    if (this.rows[i].unit === $j.types.CSSUnits.PO) {
                        totalPo += this.rows[i].height;
                        lastPo = i;
                    }
                }
                totalHeight -= heights;
                if (totalPo > 0) {
                    totalPo -= this.rows[lastPo].height;
                    heights = totalHeight - ~~(totalHeight * (totalPo / 100));
                    currentPo = ~~((heights * 100) / this._HTMLElement.offsetHeight);
                    this.rows[lastPo].height = currentPo;
                }
            }
            // first getting columns width with px unit
            if (this._colDeleted) {
                totalPo = 0;
                lng = this.columns.length;
                for (i = 0; i < lng; i++) {
                    if (this.columns[i].unit === $j.types.CSSUnits.PX) {
                        widths += this.columns[i].width;
                    }
                    if (this.columns[i].unit === $j.types.CSSUnits.PO) {
                        totalPo += this.columns[i].width;
                        lastPo = i;
                    }
                }
                totalWidth -= widths;
                if (totalPo > 0) {
                    totalPo -= this.columns[lastPo].width;
                    heights = totalWidth - ~~(totalWidth * (totalPo / 100));
                    currentPo = ~~((widths * 100) / this._HTMLElement.offsetWidth);
                    this.columns[lastPo].width = currentPo;
                }
            }
            // resize all cells
            l = 0;
            t = 0;
            for (i = 0; i < this.rows.length; i++) {
                for (j = 0; j < this.columns.length; j++) {
                    if (this.columns[j].unit === $j.types.CSSUnits.PX) w = this.columns[j].width;
                    else w = ~~(this._HTMLElement.offsetWidth * (this.columns[j].width / 100));
                    if (this.rows[i].unit === $j.types.CSSUnits.PX) h = this.rows[i].height;
                    else h = ~~(this._HTMLElement.offsetHeight * (this.rows[i].height / 100));
                    if (this.cells[i][j].colSpan > 1) {
                        w = 0;
                        for (u = 0; u < this.cells[i][j].colSpan; u++) {
                            w += ~~(this._HTMLElement.offsetWidth * (this.columns[j + u].width / 100));
                        }
                    }
                    if (this.cells[i][j].rowSpan > 1) {
                        h = 0;
                        for (u = 0; u < this.cells[i][j].colSpan; u++) {
                            h += ~~(this._HTMLElement.offsetWidth * (this.columns[i + u].width / 100));
                        }
                    }
                    this.cells[i][j].setBounds(l, t, w, h);
                    if (this.cells[i][j].visible) this.cells[i][j]._HTMLElementStyle.display = $j.types.displays.BLOCK;
                    else this.cells[i][j]._HTMLElementStyle.display = $j.types.displays.NONE;
                    l += w;
                }
                t += h;
                l = 0;
            }
            this._rowDeleted = this._colDeleted === false;
            //
            // remove all components from cells
            for (i = 0, l = this._components.length; i < l; i++) {
                this._components[i]._HTMLElement.remove();
                this.cells[this._components[i].row][this._components[i].col]._HTMLElement.appendChild(this._components[i]._HTMLElement);
                //this._components[i].realign();
            }
        },
        loaded:function() {
            this._inherited();
            this.recalc();
        },
        destroy: function () {
            var i, l;
            this._inherited();
            this._rowDeleted = null;
            this._colDeleted = null;
            for (i = 0, l = this.rows.length; i < l; i++) {
                this.rows[i].destroy();
                this.rows[i] = null;
            }
            this.rows.destroy();
            this.rows = null;
            for (i = 0, l = this.columns.length; i < l; i++) {
                this.columns[i].destroy();
                this.columns[i] = null;
            }
            this.columns.destroy();
            this.columns = null;
            for (i = 0, l = this.cells.length; i < l; i++) {
                for (j = 0, l1 = this.cells[i].length; j < l1; j++) {
                    this.cells[i][j].destroy();
                    this.cells[i][j] = null;
                }
                this.cells[i] = null;
            }
            this.cells.destroy();
            this.cells = null;
            this.cellSpacing = null;
            this.cellPadding = null;
        }
        //#endregion
    });
    //#endregion
    Object.seal(TableLayout);
    //endregion TableLayout
    $j.classes.register($j.types.categories.INTERNAL, TableRow, TableColumn, TableCell);
    $j.classes.register($j.types.categories.CONTAINERS, TableLayout);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var TableLayoutTpl = "<div id='{internalId}' data-name='{name}' data-class='TableLayout' data-showcells='true' data-rows='33,33,33;%,%,%' data-cols='33,33,33;%,%,%' class='Control TableLayout {theme} showcells' style='width:185px;height:41px;'></div>";
        $j.classes.registerTemplates([{ Class: TableLayout, template: TableLayoutTpl }]);
    }
    //endregion
})();
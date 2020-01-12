(function () {
    //#region GridView
    var GridView = $j.classes.ScrollControl.extend("GridView", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                // private
                this._viewPort = null;
                this._totalRowsHeight = 0;
                this._totalColsWidth = 0;
                this._down = false;
                this._lastDelta = new $j.classes.Point;
                this._currentPos = new $j.classes.Point;
                this._minColWidth = 10;
                this._content = null;
                this._rowIndicatorWidth = 20;
                this._hasSparkLinesCells = -1;
                //this.pager=$j.classes.createComponent($j.classes.Pager,this,null,null,false);;
                this._HScrollBar = $j.classes.createComponent($j.classes.ScrollBar, this, null, { _inForm: false }, false);
                this._HScrollBar.onChange.addListener(this.scroll);
                this._HScrollBar.smallChange = ~~(this._HScrollBar.viewportSize / 5);
                this._HScrollBar.setAlign($j.types.aligns.MOSTBOTTOM);
                this._VScrollBar = $j.classes.createComponent($j.classes.ScrollBar, this, null, { _inForm: false }, false);
                this._VScrollBar.setAlign($j.types.aligns.MOSTRIGHT);
                this._VScrollBar.onChange.addListener(this.scroll);
                this._VScrollBar.smallChange = ~~(this._VScrollBar.viewportSize / 5);
                // public
                if (!$j.isHTMLRenderer()) {
                    this.width = 320;
                    this.height = 120;
                }
                this.fixedCols = 0;
                this.fixedRows = 0;
                this.vertLine = true;
                this.horzLine = false;
                this.rangeSelect = true;
                this.rowSizing = false;
                this.colSizing = false;
                this.rowMoving = false;
                this.colMoving = false;
                this.editing = false;
                this.tabs = false;
                this.alwaysShowEditor = false;
                this.rowHeight = 24;
                this.colWidth = 64;
                this.stretchLastCol = false;
                this.autoCols = true;
                this.autoSizeCols = true;
                this.header = null;
                this.rowsHeight = null;
                this.showHeader = true;
                this.showFooter = true;
                this.showPager = false;
                this.showRowIndicator = false;
                this.sortable = true;
                this.dataSource = null;
                this.animatedScroll = true;
                this.useAlternateColor = false;
                this.hitTest.mouseWheel = true;
                this.canFocused = true;
            }
        },
        //#region Setters
        setDataSource: function (newValue) {
            if (!(newValue instanceof $j.classes.DataSource)) return;
            if (this.dataSource !== newValue) {
                if (this.dataSource instanceof $j.classes.DataSource) this.dataSource.removeControl(this);
                this.dataSource = newValue;
                this.dataSource.addControl(this);
            }
        },
        //#endregion
        //#region Methods
        refresh: function () {
            if (!this.dataSource) return;
            if (!(this.dataSource.dataset instanceof $j.classes.DataSet)) return;
            this.refreshTotalRowsHeight(false);
            this.refreshTotalColsWidth(false);
            this.moveToCursor();
            this.draw();
        },
        draw: function () {
            var l, t, minRow = 0, minCol = 0, maxRow = 0, maxCol = 0, wrapper = [], cell, curRow, curCol, row = [], cellValue, fieldsNames, rowHeight, colWidth, theme = this.getThemeName(), topOffset = 0,
                rows, cols, colVisible, curLeft = 0, leftOffset = 0, headerHeight = 0;
            //headerHeight=parseInt($j.CSS.getCSSValue("GridViewHeader",$j.types.jsCSSProperties.HEIGHT,null,this.getThemeName()),10);
            //if (isNaN(headerHeight)||(headerHeight===String.EMPTY)) headerHeight=parseInt($j.CSS.getCSSValue("GridViewHeader",$j.types.jsCSSProperties.HEIGHT,$j.types.CSSSelectorsFlags.ENDS,theme),10);
            //if (headerHeight===0) headerHeight=parseInt($j.CSS.getCSSValue("GridViewHeader",$j.types.jsCSSProperties.HEIGHT,null,$j.types.CSSFiles.JAGUI),10);
            l = this._HScrollBar.value;
            t = this._VScrollBar.value;
            if (!this.rowsHeight) {
                rowHeight = this.rowHeight;
            } else {
                rowHeight = 0;
            }
            if (this.autoCols) {
                colWidth = this.colWidth;
                minCol = ~~(l / colWidth) | 0;
                maxCol = (minCol + ~~(this._viewPort.offsetWidth / colWidth)) + 1;
                if (maxCol > this.dataSource.dataset._nbrFields) maxCol = this.dataSource.dataset._nbrFields;
            } else if (this.header) {
                maxCol = this.header.length;
            } else {
                maxCol = this.dataSource.dataset._nbrFields;
                headerHeight = 0;
            }
            if (!this.rowsHeight) {
                minRow = ~~(t / (rowHeight)) | 0;
                maxRow = (minRow + $j.round((this._viewPort.offsetHeight) / rowHeight));
                if (maxRow > this.dataSource.dataset._nbrRecords) maxRow = this.dataSource.dataset._nbrRecords;
            }
            if (this.showHeader) topOffset += headerHeight;
            this._viewPort.innerHTML = String.EMPTY;
            $j.CSS.addClass(this._viewPort, "hidden");
            if (this.dataSource.dataset.isOpen) {
                // clear all events
                rows = this._viewPort.childNodes;
                for (curRow = 0; curRow < rows.length; curRow++) {
                    cols = rows[curRow].childNodes;
                    for (curCol = 1; curCol < cols.length; curCol++) {
                        $j.tools.events.unBind(cols[curCol], "click", this.sort);
                    }
                }
                // gestion de l'entête
                if (this.showHeader) {
                    if (this.showRowIndicator && this.dataSource.dataset.hasKeyfield()) curLeft = this._rowIndicatorWidth;
                    else curLeft = 0;
                    curLeft += leftOffset - l;
                    row.push(["<div class='GridViewHeader GridViewRowLine'>"].join(String.EMPTY));
                    if (this.showRowIndicator && this.dataSource.dataset.hasKeyfield()) row.push(["<div class='GridViewRowIndic", (this.vertLine) ? " GridViewColLine" : String.EMPTY, "'></div>"].join(String.EMPTY));
                    fieldsNames = Object.keys(this.dataSource.dataset._datas[0]);
                    for (curCol = minCol; curCol < maxCol; curCol++) {
                        colWidth = (!this.header) ? colWidth : this.header[curCol].width;
                        cellValue = fieldsNames[curCol];
                        colVisible = true;
                        if (this.header) {
                            if (this.header[curCol]) {
                                if (this.header[curCol].caption) cellValue = this.header[curCol].caption;
                                if (this.header[curCol].visible) colVisible = this.header[curCol].visible;
                            } else colVisible = false;
                        }
                        if (colVisible) {
                            cell = ["<div class='GridViewCell", (this.vertLine) ? " GridViewColLine" : String.EMPTY,
                                  (this.sortedColumn === curCol) ? " sorted" : String.EMPTY,
                                  (this.sortedColumn === curCol) ? String.SPACE + this.sortedOrder : String.EMPTY,
                                  "' style='width:", colWidth, "px;transform:translateX(", curLeft, "px);' data-idx='", curCol, "' ",
                                  " data-sortedorder='", (this.sortedColumn === curCol) ? this.sortedOrder : String.EMPTY, "'>",
                                  "<span class='GridViewCellValue verticalCenter'>", cellValue,
                                  "</span>", this.colSizing ? "<div class='GridViewColResizer csr_colResize' data-theme='" + theme + "'></div>" : String.EMPTY, "</div>"].join(String.EMPTY);
                            row.push(cell);
                            curLeft += colWidth;
                        }
                    }
                    row.push("</div>");
                    wrapper.push(row.join(String.EMPTY));
                    row.clear();
                }
                curTop = topOffset - (t - (minRow * (rowHeight)));
                for (curRow = minRow; curRow < maxRow; curRow++) {
                    if (this.showRowIndicator && this.dataSource.dataset.hasKeyfield()) curLeft = this._rowIndicatorWidth;
                    else curLeft = 0;
                    curLeft += leftOffset - l;
                    fieldsNames = Object.keys(this.dataSource.dataset._datas[curRow]);
                    row.push(["<div class='GridViewRow",
                              (this.horzLine) ? " GridViewRowLine" : String.EMPTY,
                              (this.dataSource.dataset._cursorIdx === curRow) ? " iscurrent" : String.EMPTY,
                              (curRow % 2 !== 0 ? (this.useAlternateColor ? " alternate" : String.EMPTY) : String.EMPTY),
                              "' style='height:", rowHeight, "px;transform:translateY(", curTop, "px);'",
                              "' data-idx='", curRow, "'>"].join(String.EMPTY));
                    if (this.showRowIndicator && this.dataSource.dataset.hasKeyfield())
                        row.push(["<div class='GridViewRowIndic GridViewRowLine", (this.vertLine) ? " GridViewColLine" : String.EMPTY,
                                  "'></div>"].join(String.EMPTY));
                    for (curCol = minCol; curCol < maxCol; curCol++) {
                        colWidth = (!this.header) ? colWidth : this.header[curCol].width;
                        cellValue = this.dataSource.dataset._datas[curRow][fieldsNames[curCol]];
                        colVisible = true;
                        if (this.header) {
                            if (this.header[curCol]) {
                                if (this.header[curCol].fieldName) {
                                    cellValue = this.dataSource.dataset._datas[curRow][this.header[curCol].fieldName];
                                    if (!cellValue) cellValue = this.dataSource.dataset._datas[curRow][fieldsNames[curCol]];
                                }
                                if (this.header[curCol].visible) colVisible = this.header[curCol].visible
                            } else colVisible = false;
                        }
                        if (colVisible) {
                            cell = ["<div class='GridViewCell", (this.vertLine) ? " GridViewColLine" : String.EMPTY, "' style='width:", colWidth, "px;transform:translateX(", curLeft, "px);'>",
                                  this.getCellTemplate(cellValue, curCol, colWidth), "</div>"].join(String.EMPTY);
                            row.push(cell);
                            curLeft += colWidth;
                        }
                    }
                    row.push("</div>");
                    wrapper.push(row.join(String.EMPTY));
                    row.clear();
                    curTop += rowHeight;
                }
                this._viewPort.innerHTML = wrapper.join(String.EMPTY);
                if (this.showHeader) this._header = this._viewPort.querySelectorAll(".GridViewHeader");
                else this._header = null;
                rows = this._viewPort.childNodes;
                if (this.autoSizeCols) {
                    if (!this.header) {
                        this.header = [];
                    }
                    for (curRow = 0; curRow < rows.length; curRow++) {
                        cols = rows[curRow].childNodes;
                        curCol = (this.showRowIndicator && this.dataSource.dataset.hasKeyfield()) ? 1 : 0;
                        for (; curCol < cols.length; curCol++) {
                            if (!this.header[curCol - (this.showRowIndicator && this.dataSource.dataset.hasKeyfield() ? 1 : 0)]) this.header[curCol - (this.showRowIndicator && this.dataSource.dataset.hasKeyfield() ? 1 : 0)] = { "width": this.colWidth };
                            if (cols[curCol].firstElementChild.offsetWidth > this.header[curCol - (this.showRowIndicator && this.dataSource.dataset.hasKeyfield() ? 1 : 0)].width) {
                                this.header[curCol - (this.showRowIndicator && this.dataSource.dataset.hasKeyfield() ? 1 : 0)].width = cols[curCol].firstElementChild.offsetWidth;
                            }
                        }
                    }
                }
                if (this.header) {
                    cols = rows[0].childNodes;
                    for (curCol = 1; curCol < cols.length; curCol++) {
                        if (this.sortable) {
                            cols[curCol].jsObj = this;
                            cols[curCol].firstElementChild.jsObj = this;
                            $j.tools.events.bind(cols[curCol], $j.types.mouseEvents.CLICK, this.sort);
                        }
                        if (this.colSizing) {
                            cols[curCol].lastElementChild.jsObj = this;
                            cols[curCol].lastElementChild.dataset.colidx = curCol;
                            $j.tools.events.bind(cols[curCol].lastElementChild, $j.types.mouseEvents.DOWN, this.downColResizer);
                            $j.tools.events.bind(cols[curCol].lastElementChild, $j.types.mouseEvents.MOVE, this.moveColResizer);
                            $j.tools.events.bind(cols[curCol].lastElementChild, $j.types.mouseEvents.UP, this.upColResizer);
                        }
                    }
                }
                $j.CSS.removeClass(this._viewPort, "hidden");
                if (this._hasSparkLinesCells > -1) this.drawSparks();
            }
        },
        beginUpdate: function () {
            this._allowUpdate = false;
        },
        endUpdate: function () {
            this._allowUpdate = true;
            this.refresh();
        },
        refreshTotalRowsHeight: function (draw) {
            if (!(this.dataSource.dataset instanceof $j.classes.DataSet)) return;
            if (!this.dataSource.dataset.isOpen) return;
            var rows = this.dataSource.dataset;
            this._totalRowsHeight = 0;
            if (this.rowsHeight) {
                for (var i = 0, l = rows._nbrRecords; i < l; i++) {
                    this._totalRowsHeight += this.rowsHeight[i]/*+(this.horzLine?1:0)*/;
                }
            } else this._totalRowsHeight = (rows._nbrRecords/*+(this.showHeader?1:0)*/) * (this.rowHeight/*+(this.horzLine?1:0)*/);
            if (this._allowUpdate) {
                this.updateVScrollBar();
                if (draw) this.draw();
            }
        },
        refreshTotalColsWidth: function (draw) {
            if (!(this.dataSource.dataset instanceof $j.classes.DataSet)) return;
            if (!this.dataSource.dataset.isOpen) return;
            var rows = this.dataSource.dataset, colVisible = true;;
            this._totalColsWidth = 0;
            if (this.header) {
                for (var i = 0, l = rows._nbrFields; i < l; i++) {
                    colVisible = true;
                    if (this.header[i]) {
                        if (this.header[i].visible) colVisible = this.header[i].visible;
                        if (colVisible) this._totalColsWidth += this.header[i].width;
                    }
                }
                if (this.showRowIndicator) this._totalColsWidth += 20;
            } else this._totalColsWidth = rows._nbrFields * this.colWidth;
            if (this._allowUpdate) {
                this.updateHScrollBar();
                if (draw) this.draw();
            }
        },
        updateHScrollBar: function () {
            var offset = 0, data;
            data = this._HTMLElement.dataset.scrollbars;
            if ((data === $j.types.scrollbars.VERTICAL) || (data === $j.types.scrollbars.BOTH)) offset = this._VScrollBar.width;
            if (this._totalColsWidth > this._viewPort.offsetWidth) {
                if (this._totalRowsHeight < this._viewPort.offsetHeight) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.HORIZONTAL;
                    $j.CSS.addClass(this._content, "scrollbars-horizontal");
                } else {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.BOTH;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._content, "scrollbars-both");
                }
                this._HScrollBar.setMax(this._totalColsWidth + (this.showRowIndicator ? this._rowIndicatorWidth : 0));
                this._HScrollBar.setViewportSize(this._viewPort.offsetWidth);
                this._HScrollBar.smallChange = ~~(this._HScrollBar.viewportSize / 5);
            } else {
                if (this._totalRowsHeight < this._viewPort.offsetHeight + this._viewPort.offsetTop) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.NONE;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._content, "scrollbars-none");
                } else {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.VERTICAL;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._content, "scrollbars-vertical");
                }
            }
            if ((data === $j.types.scrollbars.VERTICAL) || (data === $j.types.scrollbars.BOTH)) this.updateVScrollBar();
            if (data === $j.types.scrollbars.NONE) $j.CSS.addClass(this._content, "scrollbars-none");
        },
        updateVScrollBar: function () {
            var rowHeight;
            if (this._totalRowsHeight > this._viewPort.offsetHeight) {
                if (this._totalColsWidth < this._viewPort.offsetWidth) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.VERTICAL;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._content, "scrollbars-vertical");
                } else {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.BOTH;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._content, "scrollbars-both");
                }
                this._VScrollBar.setMax(this._totalRowsHeight + (this.showHeader ? this.rowHeight/*+(this.horzLine?1:0)*/ : 0));
                this._VScrollBar.setViewportSize(this._viewPort.offsetHeight);
                this._VScrollBar.smallChange = ~~(this._VScrollBar.viewportSize / 5);
            } else {
                if (this._totalColsWidth < this._viewPort.offsetWidth + this._viewPort.offsetLeft) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.NONE;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._content, "scrollbars-none");
                } else {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.HORIZONTAL;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._content, "scrollbars-horizontal");
                }
                this._VScrollBar.setMax(0);
                this._VScrollBar.setViewportSize(0);
                this._VScrollBar.setValue(0);
            }
        },
        clearScrollBarCSS: function () {
            $j.CSS.removeClass(this._content, "scrollbars-none");
            $j.CSS.removeClass(this._content, "scrollbars-horizontal");
            $j.CSS.removeClass(this._content, "scrollbars-vertical");
            $j.CSS.removeClass(this._content, "scrollbars-both");
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.usealternatecolor;
            if (data) this.useAlternateColor = _conv.strToBool(data);
            data = this._HTMLElement.dataset.columns;
            if (data) this.editing = _conv.strToBool(data);
            data = this._HTMLElement.dataset.source;
            if (data) this.dataSource = data;
            data = this._HTMLElement.dataset.showheader;
            if (data) this.showHeader = _conv.strToBool(data);
            data = this._HTMLElement.dataset.showrowindicator;
            if (data) this.showRowIndicator = _conv.strToBool(data);
            data = this._HTMLElement.dataset.autocols;
            if (data) this.autoCols = _conv.strToBool(data);
            data = this._HTMLElement.dataset.showpager;
            if (data) this.showPager = _conv.strToBool(data);
            data = this._HTMLElement.dataset.sortable;
            if (data) this.sortable = _conv.strToBool(data);
            data = this._HTMLElement.dataset.horzline;
            if (data) this.horzLine = _conv.strToBool(data);
            data = this._HTMLElement.dataset.vertline;
            if (data) this.vertLine = _conv.strToBool(data);
            data = this._HTMLElement.dataset.rowsizing;
            if (data) this.rowSizing = _conv.strToBool(data);
            data = this._HTMLElement.dataset.colsizing;
            if (data) this.colSizing = _conv.strToBool(data);
            data = this._HTMLElement.dataset.rowmoving;
            if (data) this.rowMoving = _conv.strToBool(data);
            data = this._HTMLElement.dataset.colmoving;
            if (data) this.colMoving = _conv.strToBool(data);
            data = this._HTMLElement.dataset.tabs;
            if (data) this.tabs = _conv.strToBool(data);
            data = this._HTMLElement.dataset.alwaysshoweditor;
            if (data) this.alwaysShowEditor = _conv.strToBool(data);
            data = this._HTMLElement.dataset.stretchlastcol;
            if (data) this.stretchLastCol = _conv.strToBool(data);
            data = this._HTMLElement.dataset.autosizecols;
            if (data) this.autoSizeCols = _conv.strToBool(data);
            data = this._HTMLElement.dataset.showfooter;
            if (data) this.showFooter = _conv.strToBool(data);
            data = this._HTMLElement.dataset.header;
            if (data && data !== String.EMPTY) this.header = JSON.parse(data);
            data = this._HTMLElement.dataset.rowsheight;
            if (data && data !== String.EMPTY) this.rowsHeight = JSON.parse(data);
            data = this._HTMLElement.dataset.fixedcols;
            if (data && data !== String.EMPTY) this.fixedCols = ~~data;
            data = this._HTMLElement.dataset.fixedrows;
            if (data && data !== String.EMPTY) this.fixedRows = ~~data;
            data = this._HTMLElement.dataset.rangeselect;
            if (data) this.rangeSelect = _conv.strToBool(data);
            data = this._HTMLElement.dataset.animatedscroll;
            if (data) this.animatedScroll = _conv.strToBool(data);
            if (this.header) this.autoCols = this.autoSizeCols = false;
        },
        getChildsHTMLElement: function () {
            this._content = this._HTMLElement.firstElementChild;
            this._content.jsObj = this;
            this._viewPort = this._content.firstElementChild;
            this._viewPort.jsObj = this;
            this._VScrollBar.getHTMLElement(this._content.lastElementChild.id);
            this._VScrollBar.getChildsHTMLElement();
            this._VScrollBar.setOrientation($j.types.orientations.VERTICAL);
            this._VScrollBar.updateFromHTML();
            this._HScrollBar.getHTMLElement(this._content.querySelectorAll(".ScrollBar").item(0).id);
            this._HScrollBar.getChildsHTMLElement();
            this._HScrollBar.updateFromHTML();
        },
        update: function () {
            $j.CSS.removeClass(this._HTMLElement, "colsizing");
            if (this.colSizing) $j.CSS.addClass(this._HTMLElement, "colsizing");
        },
        scroll: function () {
            if (this._owner.form._focusedControl !== this._owner) this._owner.setFocus();
            this._owner.draw();
        },
        mouseWheel: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.scrollbars;
            if ((data === $j.types.scrollbars.VERTICAL) || (data === $j.types.scrollbars.BOTH)) {
                this._VScrollBar.mouseWheel();
            } else if (data === $j.types.scrollbars.HORIZONTAL) {
                this._HScrollBar.mouseWheel();
            }
        },
        loaded: function () {
            this._inherited();
            if (this.dataSource) {
                if (this.form[this.dataSource]) this.setDataSource(this.form[this.dataSource]);
            }
            this.refresh();
        },
        mouseDown: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                this._lastDelta.setValues(0, 0);
                this._currentPos.assign($j.mouse.screen);
                this._down = true;
                if (this._VScrollAni && this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
                if (this._HScrollAni && this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
            }
        },
        mouseMove: function () {
            var data;
            if (this._curResizer) this.moveColResizer.apply(this._curResizer, [$j.mouse.event]);
            else {
                this._inherited();
                if (this._down) {
                    data = this._HTMLElement.dataset.scrollbars;
                    if (data === $j.types.scrollbars.VERTICAL || data === $j.types.scrollbars.BOTH) {
                        this._VScrollBar.setValue(this._VScrollBar.value - ($j.mouse.screen.y - this._currentPos.y));
                        this._lastDelta.y = ($j.mouse.screen.y - this._currentPos.y);
                    } else if (data === $j.types.scrollbars.HORIZONTAL || data === $j.types.scrollbars.BOTH) {
                        this._HScrollBar.setValue(this._HScrollBar.value - ($j.mouse.screen.x - this._currentPos.x));
                        this._lastDelta.x = ($j.mouse.screen.x - this._currentPos.x);
                    }
                    this._currentPos.assign($j.mouse.screen);
                }
            }
        },
        mouseUp: function () {
            var data;
            if (this._curResizer) {
                this._curResizer = null;
                $j.CSS.removeClass(this._viewPort.lastElementChild, "csr_colResize");
                // destruction du dernier élément dans viewPort
                this._viewPort.removeChild(this._viewPort.lastElementChild);
                this.refresh();
                return;
            }
            this._inherited();
            if (this._down) {
                this._down = false;
                if (this.animatedScroll && ((this._lastDelta.x !== 0) || (this._lastDelta.y !== 0))) {
                    data = this._HTMLElement.dataset.scrollbars;
                    if (data === $j.types.scrollbars.VERTICAL || data === $j.types.scrollbars.BOTH) {
                        this.createVScrollAni();
                        if (this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
                        this._VScrollAni.stopValue = this._VScrollBar.value - (this._lastDelta.y * 20);
                        this._VScrollAni.start();
                    } else if (data === $j.types.scrollbars.HORIZONTAL || data === $j.types.scrollbars.BOTH) {
                        this.createHScrollAni();
                        if (this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
                        this._HScrollAni.stopValue = this._HScrollBar.value - (this._lastDelta.x * 20);
                        this._HScrollAni.start();
                    }
                }
            }
        },
        createVScrollAni: function () {
            if (!this._VScrollAni) {
                this._VScrollAni = new $j.classes.FloatAnimation(this);
                this._VScrollAni.animationType = $j.types.animationTypes.OUT;
                this._VScrollAni.interpolation = $j.types.interpolationTypes.QUADRATIC;
                this._VScrollAni.duration = 1;
                this._VScrollAni.control = this._VScrollBar;
                this._VScrollAni.propertyName = "value";
                this._VScrollAni.startFromCurrent = true;
                this._VScrollAni.convertToCSS = false;
            }
        },
        createHScrollAni: function () {
            if (!this._HScrollAni) {
                this._HScrollAni = new $j.classes.FloatAnimation(this);
                this._HScrollAni.animationType = $j.types.animationTypes.OUT;
                this._HScrollAni.interpolation = $j.types.interpolationTypes.QUADRATIC;
                this._HScrollAni.duration = 1;
                this._HScrollAni.control = this._HScrollBar;
                this._HScrollAni.propertyName = "value";
                this._HScrollAni.startFromCurrent = true;
                this._HScrollAni.convertToCSS = false;
            }
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{horizontalScrollBar}"), tpl;
            tpl = this._HScrollBar.getTemplate();
            html = a.join(tpl);
            a = html.split("{verticalScrollBar}"), tpl;
            tpl = this._VScrollBar.getTemplate();
            html = a.join(tpl);
            return html;
        },
        sort: function (col, order) {
            var gridView, parentNode;
            if (this.jsObj) {
                gridView = this.jsObj;
                if (this instanceof HTMLSpanElement) parentNode = this.parentNode;
                else parentNode = this;
                if (gridView.colSizing && col instanceof MouseEvent && col.target === parentNode.lastElementChild) return;
                col = parentNode.dataset.idx;
                if (col) col = parseInt(col, 10);
                order = parentNode.dataset.sortedorder;
                if (!order || order === String.EMPTY) order = $j.types.sortedOrders.DESC;
                if (gridView.header) {
                    if (gridView.header[col].sortable) {
                        if (!gridView.header[col].sortable) return;
                    }
                }
            } else gridView = this;
            if (!col) return;
            gridView.sortedColumn = col;
            if (!gridView.header) gridView.sortedColType = _const.STRING;
            else gridView.sortedColtype = gridView.header[col].dataType;
            if (order === $j.types.sortedOrders.ASC) order = $j.types.sortedOrders.DESC;
            else order = $j.types.sortedOrders.ASC;
            gridView.sortedOrder = order;
            switch (gridView.sortedColtype) {
                case _const.DATE:
                    gridView.dataSource.dataset._datas.sort(gridView.dataSource.dataset.sortByDate(col, order));
                    break;
                case _const.NUMBER:
                case _const.INTEGER:
                    gridView.dataSource.dataset._datas.sort(gridView.dataSource.dataset.sortByNumber(col, order));
                    break;
                case _const.BOOLEAN:
                    gridView.dataSource.dataset._datas.sort(gridView.dataSource.dataset.sortByBoolean(col, order));
                    break;
                case _const.STRING:
                default:
                    gridView.dataSource.dataset._datas.sort(gridView.dataSource.dataset.sortByString(col, order));
                    break;
            }
            gridView.dataSource.dataset.goToCurrentCursor();
            gridView.moveToCursor();
            gridView.refresh();
        },
        downColResizer: function (event) {
            var obj = this.jsObj, resizeLine, x, mat;
            if (!obj.isEnabled()) return;
            $j.mouse.getMouseInfos(event);
            obj._lastDelta.setValues(this.parentNode.offsetWidth, 0);
            obj._curResizer = this;
            obj._currentPos.assign($j.mouse.document);
            $j.CSS.addClass(obj._viewPort.lastElementChild, "csr_colResize");
            obj.form.setCapturedControl(obj);
            obj.enterFocus();
            resizeLine = $j.doc.createElement($j.types.HTMLElements.DIV);
            $j.CSS.addClass(resizeLine, "vResizeLine");
            resizeLine.dataset.theme = obj.getThemeName();
            mat = getComputedStyle(this.parentNode).transform;
            mat = mat.match(/-?[\d\.]+/g);
            x = this.offsetLeft + ~~mat[4] + this.offsetWidth;
            resizeLine.style.left = x + $j.types.CSSUnits.PX;
            obj._viewPort.appendChild(resizeLine);
            $j.mouse.stopEvent(event);
        },
        moveColResizer: function (event) {
            var obj = this.jsObj, newWidth, colIdx = 0, x;
            if (!obj.isEnabled()) return;
            if (obj.form._capturedControl !== obj) return;
            if (obj._curResizer !== this) return;
            $j.mouse.getMouseInfos(event);
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                if (obj._curResizer === this) {
                    newWidth = obj._lastDelta.x + ($j.mouse.document.x - obj._currentPos.x);
                    if (newWidth < obj._rowIndicatorWidth) newWidth = obj._rowIndicatorWidth;
                    colIdx = parseInt(this.parentNode.dataset.idx, 10);
                    x = newWidth + this.parentNode.offsetLeft;
                    obj._viewPort.lastElementChild.style.left = x + $j.types.CSSUnits.PX;
                    obj.header[colIdx].width = newWidth;
                }
            }
            $j.mouse.stopEvent(event);
        },
        upColResizer: function (event) {
            var obj = this.jsObj;
            if (!obj.isEnabled()) return;
            $j.mouse.getMouseInfos(event);
            $j.mouse.stopEvent(event);
            obj.mouseUp();
        },
        moveToCursor: function () {
            var top = 0, i = 0, l;
            if (this.rowsHeight) {
                l = this.rowsHeight.length;
                for (; i < l; i++) {

                }
            } else {
                while (i < this.dataSource.dataset._cursorIdx) {
                    top += this.rowHeight;
                    i++;
                }
            }
            this._VScrollBar.setValue(top);
        },
        getCellTemplate: function (value, col, cellWidth) {
            var tpl, a, column, cellTemplate, w, val = value;
            if (this.header) {
                column = this.header[col];
                if (column.cellTemplate) cellTemplate = "GridViewCell" + column.cellTemplate;
                else cellTemplate = "GridViewCellLabel";
            } else cellTemplate = "GridViewCellLabel";
            tpl = $j.templates[cellTemplate], a;
            a = tpl.split("{value}");
            if (cellTemplate === "GridViewCellColor") {
                val = _colors.getColorName(_colors.parse(value));
            } else if (cellTemplate === "GridViewCellSparkLines") {
                val = JSON.stringify(value.values);
            }
            tpl = a.join(val);
            switch (cellTemplate) {
                case "GridViewCellCheckbox":
                    a = tpl.split("{ischecked}");
                    if (val) tpl = a.join("ischecked");
                    break;
                case "GridViewCellRating":
                    w = column.cellEditor.classProperties.maxWidth;
                    w = (w / column.cellEditor.classProperties.max) * value;
                    a = tpl.split("{width}");
                    tpl = a.join(w);
                    break;
                case "GridViewCellProgressBar":
                    w = ~~((value / 100) * cellWidth);
                    a = tpl.split("{width}");
                    tpl = a.join(w);
                    break;
                case "GridViewCellImage":
                    a = tpl.split("{width}");
                    tpl = a.join(this.rowHeight);
                    break;
                case "GridViewCellSparkLines":
                    a = tpl.split("{width}");
                    tpl = a.join(cellWidth - 1);
                    a = tpl.split("{height}");
                    tpl = a.join(this.rowHeight - 1);
                    a = tpl.split("{color}");
                    tpl = a.join(value.color);
                    a = tpl.split("{minColor}");
                    tpl = a.join(value.minColor);
                    a = tpl.split("{maxColor}");
                    tpl = a.join(value.maxColor);
                    a = tpl.split("{filledColor}");
                    if (value.filledColor) tpl = a.join(value.filledColor);
                    else tpl = a.join(String.EMPTY);
                    a = tpl.split("{type}");
                    tpl = a.join(value.type);
                    this._hasSparkLinesCells = col;
                    break;
            }
            return tpl;
        },
        drawSparks: function () {
            var cell, rows = this._viewPort.childNodes, row, r = 0, tr = rows.length, canvas, ctx, idx;
            r = 1;
            for (; r < tr; r++) {
                row = rows[r];
                idx = row.dataset.idx;
                cell = row.childNodes[this._hasSparkLinesCells];
                canvas = cell.firstElementChild;
                ctx = canvas.getContext("2d");
                ctx.drawSpark(this.dataSource.dataset._datas[idx][this.header[this._hasSparkLinesCells].fieldName]);
            }
        },
        destroy: function () {
            this._inherited();
            this._viewPort = null;
            this._totalRowsHeight = null;
            this._totalColsWidth = null;
            this._down = null;
            this._lastDelta = new $j.classes.Point;
            this._currentPos = new $j.classes.Point;
            this._minColWidth = null;
            this._content = null;
            this._rowIndicatorWidth = null;
            this._hasSparkLinesCells = null;
            //this.pager=$j.classes.createComponent($j.classes.Pager,this,null,null,false);;
            this._HScrollBar = null;
            this._VScrollBar = null;
            this.fixedCols = null;
            this.fixedRows = null;
            this.vertLine = null;
            this.horzLine = null;
            this.rangeSelect = null;
            this.rowSizing = null;
            this.colSizing = null;
            this.rowMoving = null;
            this.colMoving = null;
            this.editing = null;
            this.tabs = null;
            this.alwaysShowEditor = null;
            this.rowHeight = null;
            this.colWidth = null;
            this.stretchLastCol = null;
            this.autoCols = null;
            this.autoSizeCols = null;
            if (this.header) this.header.destroy();
            this.header = null;
            this.rowsHeight = null;
            this.showHeader = null;
            this.showFooter = null;
            this.showPager = null;
            this.showRowIndicator = null;
            this.sortable = null;
            this.dataSource = null;
            this.animatedScroll = null;
            this.useAlternateColor = null;
        }
        //#endregion
    });
    //#endregion
    Object.seal(GridView);
    $j.classes.register($j.types.categories.COMMON, GridView);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var GridViewTpl = "<div id='{internalId}' data-name='{name}' data-class='GridView' class='Control GridView {theme} scrollbars-none'data-scrollbars='none' style='width:320px;height:120px;'>\
                     <div class='Control GridViewContent {theme}'>\
                     <div class='Control GridViewViewPort {theme}'></div>\
                     {horizontalScrollBar}\
                     {verticalScrollBar}\
                     </div>",
             GridViewCellLabelTpl = "<label class='Control GridviewCellLabel csr_default verticalCenter GridViewCellValue'>{value}</label>",
             GridViewCellRatingTpl = "<div class='Control GridviewCellRating Rating verticalCenter GridViewCellValue Rating-selected' data-nbitem='5' data-value='{value}' data-precision='wholeitem'><div class='RatingSelected' style='width:{width}px;'></div></div>",
             GridViewCellCheckboxTpl = "<div class='Control GridviewCellCheckbox Checkbox verticalCenter GridViewCellValue {ischecked}'></div>",
             GridViewCellProgressBarTpl = "<div class='Control GridviewCellProgressBar ProgressBar verticalCenter GridViewCellValue' style='width:{width}px' data-value='{value}' title='{value}'></div>",
             GridViewCellImageTpl = "<div class='Control GridviewCellImage centerCenter GridViewCellValue' style='width:{width}px;height:{width}px;background-image:url({value});' title='{value}'></div>",
             GridViewCellColorTpl = "<div class='Control GridViewCellColor verticalCenter GridViewCellValue'>{value}<div class='' style='background-color:{value};'></div></div>",
             GridViewCellSparkLinesTpl = "<canvas class='Control' width='{width}' height='{height}' style='width:{width}px;height:{height}px;'></canvas>";
        $j.classes.registerTemplates([{ Class: GridView, template: GridViewTpl }, { Class: "GridViewCellLabel", template: GridViewCellLabelTpl },
                                      { Class: "GridViewCellCheckbox", template: GridViewCellCheckboxTpl }, { Class: "GridViewCellRating", template: GridViewCellRatingTpl },
                                      { Class: "GridViewCellProgressBar", template: GridViewCellProgressBarTpl }, { Class: "GridViewCellColor", template: GridViewCellColorTpl },
                                      { Class: "GridViewCellImage", template: GridViewCellImageTpl }, { Class: "GridViewCellSparkLines", template: GridViewCellSparkLinesTpl }]);
    }
    //#endregion
})();
/*
http://handsontable.com/demo/fixed.html
http://www.koolchart.com/koolgrid



                     "<div id='{Pager_internalId}' data-class='Pager' class='Pager'>",
                     "<div id='' data-class='Button' class='Button NavButton NavBtnFirst'><span></span></div>",
                     "<div id='' data-class='Button' class='Button NavButton NavBtnPrev'><span></span></div>",
                     "<div id='' data-class='Button' class='Button NavButton'><span>1</span></div>",
                     "<div id='' data-class='Button' class='Button NavButton'><span>2</span></div>",
                     "<div id='' data-class='Button' class='Button NavButton'><span>3</span></div>",
                     "<div id='' data-class='Button' class='Button NavButton NavBtnNext'><span></span></div>",
                     "<div id='' data-class='Button' class='Button NavButton NavBtnLast'><span></span></div>",
                     "<div id='' data-class='TextBox' class='TextBox NavItemsPerPage'><input type='text' value='10' class='csr_text' /></div>",
                     "<label id='' data-class='Label' class='Label csr_default NavLblItems'>items per page</label>",
                     "<label id='' data-class='Label' class='Label csr_default NavLblCurItems'>1 - 10 of 50 items</label>",
                     "</div>
*/
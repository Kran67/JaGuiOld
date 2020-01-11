import { Window } from "/scripts/components/containers/window.js";
import * as Canvas from "/scripts/core/canvas.js";
import "/scripts/components/common/label.js";
import "/scripts/components/common/speedButton.js";
//import { Point } from "/scripts/core/geometry.js";
//import { Dialogs } from "/scripts/components/dialogs/dialogs.js";
//import { ListBox, ListBoxItem } from "/scripts/components/common/listbox.js";
//import { Image } from "/scripts/components/common/image.js";
//import { Animation } from "/scripts/animation.js";
//import { GroupBox } from "/scripts/components/containers/groupBox.js";
//import { Checkbox } from "/scripts/components/common/checkbox.js";
//import { RadioButton } from "/scripts/components/common/radioButton.js";
import "/scripts/components/extended/circleButton.js";
//import { PopupButton } from "/scripts/components/extended/popupButton.js";
import "/scripts/components/extended/bitmapButton.js";
import "/scripts/components/extended/pathButton.js";
//import { Panel } from "/scripts/components/containers/panel.js";
//import { CalloutPanel } from "/scripts/components/containers/calloutPanel.js";
//import { ColorButton } from "/scripts/components/color/colorButton.js";
import "/scripts/components/extended/cornerButton.js";
//import { StatusBar } from "/scripts/components/toolbars/statusBar.js";
//import { ToolBar } from "/scripts/components/toolbars/toolBar.js";
//import { ToolButton } from "/scripts/components/toolbars/toolButton.js";
//import { ValueLabel } from "/scripts/components/extended/valueLabel.js";
//import { PathCheckbox } from "/scripts/components/extended/pathCheckbox.js";
//import { AngleButton } from "/scripts/components/extended/angleButton.js";
//import { ProgressBar } from "/scripts/components/common/progressBar.js";
//import { Slider } from "/scripts/components/common/slider.js";
//import { ScrollBar } from "/scripts/components/common/scrollBar.js";
//import { ScrollBox } from "/scripts/components/containers/scrollBox.js";
//import { Expander } from "/scripts/components/containers/expander.js";
//import { AlphaSlider } from "/scripts/components/color/alphaSlider.js";
//import { BwSlider } from "/scripts/components/color/bwSlider.js";
//import { HueSlider } from "/scripts/components/color/hueSlider.js";
//import { ColorBox } from "/scripts/components/color/colorBox.js";
//import { ColorPicker } from "/scripts/components/color/colorPicker.js";
//import { colorQuad } from "/scripts/components/color/colorQuad.js";
//import { rating } from "/scripts/components/common/rating.js";
//import { gradientEdit } from "/scripts/components/color/gradientEdit.js";
//import { colorPanel } from "/scripts/components/color/colorPanel.js";
//import { shapes } from "/scripts/components/common/shapes.js";
//import { treeView } from "/scripts/components/common/treeView.js";
//import { pageControl } from "/scripts/components/containers/pageControl.js";
//import { paintBox } from "/scripts/components/common/paintBox.js";
//import { plotGrid } from "/scripts/components/common/plotGrid.js";
//import { textBox } from "/scripts/components/common/textBox.js";
//import { passwordTextBox } from "/scripts/components/common/passwordTextBox.js";
//import { roundTextBox } from "/scripts/components/extended/roundTextBox.js";
//import { textBoxClearBtn } from "/scripts/components/extended/textBoxClearBtn.js";
//import { spinBox } from "/scripts/components/common/spinBox.js";
//import { memo } from "/scripts/components/common/memo.js";
//import { maskedTextBox } from "/scripts/components/extended/maskedTextBox.js";
//import { iPhoneButton } from "/scripts/components/extended/iPhoneButton.js";
//import { calendar } from "/scripts/components/common/calendar.js";
//import { menus } from "/scripts/components/menus/menus.js";
//import { dropDownListBox } from "/scripts/components/common/dropDownListBox.js";
//import { labeledAngleBar } from "/scripts/components/extended/labeledAngleBar.js";
//import { labeledColorButton } from "/scripts/components/extended/labeledColorButton.js";
//import { labeledTextBox } from "/scripts/components/extended/labeledTextBox.js";
//import { labeledSlider } from "/scripts/components/extended/labeledSlider.js";
//import { labeledMemo } from "/scripts/components/extended/labeledMemo.js";
//import { dropDownColors } from "/scripts/components/color/dropDownColors.js";
//import { dropDownCalendar } from "/scripts/components/common/dropDownCalendar.js";
//import { dropDownSlider } from "/scripts/components/extended/dropDownSlider.js";
//import { numberWheel } from "/scripts/components/common/numberWheel.js";
//import { timePanel } from "/scripts/components/common/timePanel.js";
//import { imageControl } from "/scripts/components/extended/imageControl.js";
//import { labeledImage } from "/scripts/components/extended/labeledImage.js";
//import { imageViewer } from "/scripts/components/extended/imageViewer.js";
//import { dropDownTimePanel } from "/scripts/components/common/dropDownTimePanel.js";
import "/scripts/components/extended/bitmapStateButton.js";
//import { busyIndicator } from "/scripts/components/common/busyIndicator.js";
//import { splitButton } from "/scripts/components/extended/splitButton.js";
//import { commonDialog } from "/scripts/components/dialogs/commonDialog.js";
//import { openDialog } from "/scripts/components/dialogs/openDialog.js";
//import { findReplaceDialog } from "/scripts/components/dialogs/findReplaceDialog.js";
//import { fontDialog } from "/scripts/components/dialogs/fontDialog.js";
//import { colorDialog } from "/scripts/components/dialogs/colorDialog.js";
//import { gridView } from "/scripts/components/common/gridView.js";
//import { imageList } from "/scripts/components/nonvisual/imageList.js";
//import { timers } from "/scripts/components/nonvisual/timers.js";
//import { dataFile } from "/scripts/components/data/dataFile.js";
//import { dataSource } from "/scripts/components/data/dataSource.js";
//import { flowLayout } from "/scripts/components/containers/flowLayout.js";
//import { gridLayout } from "/scripts/components/containers/gridLayout.js";
//import { tableLayout } from "/scripts/components/containers/tableLayout.js";
//import { splitter } from "/scripts/components/common/splitter.js";
//import { splitToolButton } from "/scripts/components/toolbars/splitToolButton.js";
//import { actnList } from "/scripts/components/actions/actnList.js";
//import { stdActns } from "/scripts/components/actions/stdActns.js";
//import { textBoxBtn } from "/scripts/components/extended/textBoxBtn.js";
//import { clock } from "/scripts/components/common/clock.js";
//import { propertyGrid } from "/scripts/components/extras/propertyGrid.js";
//import { radioGroup } from "/scripts/components/extended/radioGroup.js";
//import { toggle } from "/scripts/components/extended/toggle.js";
//import { batteryIndicator } from "/scripts/components/common/batteryIndicator.js";
//import { segmentLedLabel } from "/scripts/components/extended/segmentLedLabel.js";
//import { circularProgressBar } from "/scripts/components/extended/circularProgressBar.js";
let lastTime;
class Window1 extends Window {
    get MAX_DEPTH() { return 32; }
    get STARS() { return this._stars; }
    get TOTALSTARS() { return 512; }
    get SIZE() { return [10, 30]; }
    get SHINEDIR() { return [0.01, 0.05]; }
    get ANGSPEED() { return [0.01, 0.04]; }
    get PENTARADIANT() { return Math.PI * 2 / 5; }
    get COLORS() { return ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8b00ff"]; }
    get FRAME() { return (Math.random() * 360) | 0; }
    constructor(owner, props) {
        super(owner, props);
        this._stars = [];
        this.onShow.addListener(this.formShow);
    }
    rand(ar) {
        return Math.random() * (ar[1] - ar[0]) + ar[0];
    }
    formCreated(id) {
        super.formCreated(id);
        if (Core.isCanvasRenderer) {
            //this.Gauge2.createArrow=this.createArrowBlue;
            //this.Gauge3.createArrow=this.createArrowBlack;
        }
        //this.initStars();
        //Core.looper.addListener(this, "paint");
    }
    formShow() {
        if (!Core.browser.chrome) {
            Dialogs.alert("Best experience with Chrome Browser");
        }
        lastTime = new Date().getTime();
    }
    initStars() {
        for (let i = 0; i < this.TOTALSTARS; i++) {
            this.STARS[i] = {
                x: this.randomRange(-25, 25),
                y: this.randomRange(-25, 25),
                z: this.randomRange(1, this.MAX_DEPTH)
            };
        }
        this.PaintBox1.drawType = 0;
    }
    randomRange(minVal, maxVal) {
        return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
    }
    Button1_onClick(sender) {
        const confirm = Dialogs.confirm("This operation takes several seconds.<br />It depends on your CPU.<br />Proceed?");
        confirm.onClose.addListener(this.form.createListBoxItems);
    }
    createListBoxItems() {
        if (this.modalResult === Window.MODALRESULTS.OK) {
            const t = new Date().getTime();
            this.app.activeWindow.ListBox2.beginUpdate();
            for (let i = 0; i < 1000000; i++) {
                const span = new ListBoxItem(this.app.activeWindow.ListBox2, "item" + i);
                this.app.activeWindow.ListBox2.addItem(span);
            }
            this.app.activeWindow.ListBox2.endUpdate();
            console.log((new Date().getTime() - t) + "ms");
        }
    }
    RoundButton1_onClick() {
        this.form.OpenDialog1.execute();
    }
    Label1_onClick() {
        this.form.FontDialog1.execute(this);
    }
    paint(elapsedTime) {
        //this.PaintBox1.onPaint.invoke();
        if ((new Date().getTime() - lastTime) > 3000) {
            this.CircularProgressBar1.value = ~~(Math.random() * 101);
            this.ProgressBar1.value = ~~(Math.random() * 101);
            this.ProgressBar2.value = ~~(Math.random() * 101);
            lastTime = new Date().getTime();
        }
    }
    PaintBox1_onClick() {
        this.drawType++;
        if (this.drawType > 2) {
            this.drawType = 0;
        }
        this.form.STARS.clear();
        if (this.drawType === 0) {
            this.form.initStars();
        }
    }
    PaintBox1_onPaint() {
        const halfWidth = this.HTMLElement.offsetWidth / 2;
        const halfHeight = this.HTMLElement.offsetHeight / 2;
        let star = null;
        const stars = this.form.STARS;

        switch (this.drawType) {
            case 0:
                this._ctx.globalCompositeOperation = Canvas.GLOBALCOMPOSITEOPERATIONS.SOURCEOVER;
                this._ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                this._ctx.fillRect(0, 0, this.HTMLElement.offsetWidth, this.HTMLElement.offsetHeight);
                for (let i = 0; i < stars.length; i++) {
                    star = stars[i];
                    star.z -= 0.2;

                    if (star.z <= 0) {
                        star.x = this.form.randomRange(-25, 25);
                        star.y = this.form.randomRange(-25, 25);
                        star.z = this.form.MAX_DEPTH;
                    }

                    const k = 128.0 / star.z;
                    const px = star.x * k + halfWidth;
                    const py = star.y * k + halfHeight;

                    if (px >= 0 && px <= 500 && py >= 0 && py <= 400) {
                        const size = (1 - star.z / 32.0) * 5;
                        const shade = ~~((1 - star.z / 32.0) * 255);
                        this._ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
                        this._ctx.fillRect(px, py, size, size);
                    }
                }
                break;
            case 1:
                ++this.form._frame;
                this._ctx.globalCompositeOperation = Canvas.GLOBALCOMPOSITEOPERATIONS.DESTINATIONOUT;
                this._ctx.fillStyle = "rgba(0, 0, 0, .1)";
                this._ctx.fillRect(0, 0, this.HTMLElement.offsetWidth, this.HTMLElement.offsetHeight);
                this._ctx.globalCompositeOperation = Canvas.GLOBALCOMPOSITEOPERATIONS.LIGHTER;

                if (Math.random() < 0.3) {
                    stars.push(new Star(this.form, this._ctx));
                }

                for (let s = 0; s < stars.length; ++s) {
                    star = stars[s];
                    star.use();

                    if ((star.x + star.size < 0) || (star.y + star.size > this.HTMLElement.offsetHeight + star.size * 2) || (star.x + star.size > this.HTMLElement.offsetWidth + star.size * 2)) {
                        stars.splice(s, 1);
                        --s;
                    }
                }
                break;
            case 2: {
                const total = ~~(this.HTMLElement.offsetWidth * 0.5);
                this._ctx.globalCompositeOperation = Canvas.GLOBALCOMPOSITEOPERATIONS.SOURCEOVER;
                for (let i = 0; i < stars.length; ++i) {
                    stars[i].update(this._ctx);
                    if (stars[i].pos.y < 0 || stars[i].pos.y > this.HTMLElement.offsetHeight || stars[i].pos.x < 0 || stars[i].pos.x > this.HTMLElement.offsetWidth) {
                        stars.splice(i, 1);
                    }
                }
                if (stars.length < total) {
                    stars.push(new Circle(Math.random() - 0.5, Math.random() - 0.5, halfWidth, halfHeight));
                }
                this._ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                this._ctx.fillRect(0, 0, this.HTMLElement.offsetWidth, this.HTMLElement.offsetHeight);

                break;
            }

        }
    }
    PlotGrid1_onPaint() {
        let p = new Array(100);
        let x = null;
        let y = null;
        let i = null;
        this._ctx.save();
        // Paint sin
        for (i = 0, l = p.length; i < l; i++) {
            // calc only in PlotGrid area
            x = -(this.HTMLElement.offsetWidth / 2) + ((i / l) * this.HTMLElement.offsetWidth);
            x = x / this.frequency;
            // formula here
            y = Math.sin(x);
            p[i] = new Point(this.HTMLElement.offsetWidth / 2 + x * this.frequency, this.HTMLElement.offsetHeight / 2 - y * this.frequency);
        }
        this._ctx.lineWidth = 2;
        this._ctx.strokeStyle = "red";
        this._ctx.drawPolyline(p);
        // Paint cos * x
        p = new Array(100);
        for (i = 0, l = p.length; i < l; i++) {
            // calc only in PlotGrid area
            x = -(this.HTMLElement.offsetWidth / 2) + ((i / l) * this.HTMLElement.offsetWidth);
            x = x / this.frequency;
            // formula here
            y = Math.cos(x) * x;
            p[i] = new Point(this.HTMLElement.offsetWidth / 2 + x * this.frequency, this.HTMLElement.offsetHeight / 2 - y * this.frequency);
        }
        this._ctx.linewidth = 2;
        this._ctx.strokeStyle = "green";
        this._ctx.drawPolyline(p);
        // Paint x * x }
        p = new Array(100);
        for (i = 0, l = p.length; i < l; i++) {
            // calc only in PlotGrid area
            x = -(this.HTMLElement.offsetWidth / 2) + ((i / l) * this.HTMLElement.offsetWidth);
            x = x / this.frequency;
            // formula here
            y = x * x;
            p[i] = new Point(this.HTMLElement.offsetWidth / 2 + x * this.frequency, this.HTMLElement.offsetHeight / 2 - y * this.frequency);
        }
        this._ctx.lineWidth = 2;
        this._ctx.strokeStyle = "blue";
        this._ctx.drawPolyline(p);
        // End Paint
        this._ctx.restore();
    }
    ToolButton1_onClick() {
        window.location.href = "/index.html";
    }
    changeTheme() {
        this.app.themeManifest.themeName = this.caption.replace(String.SPACE, String.EMPTY).toLowerCase();
    }
    SpeedButton1_onClick() {
        //this.app.addWindow($j.tools.getPath($j.types.internalCategories.APPS)+this.app.name+"/window2");
        this.app.newWindow("window2");
    }
    closeQuery() {
        const dlg = Dialogs.confirmation("Are you sure you want to quit?");
        dlg.onClose.addListener(function () {
            Core.apps.activeApplication.activeWindow.canClose = this.modalResult === Window.MODALRESULTS.OK;
        });
    }
    showBorderDialogWindow() {
        this.app.newWindow("borderDialog");
    }
    showBorderNoneWindow() {
        this.app.newWindow("borderNone");
    }
    showBorderSingleWindow() {
        this.app.newWindow("borderSingle");
    }
    showBorderSizeableWindow() {
        this.app.newWindow("borderSizeable");
    }
}

class Circle {
    constructor() {
        this.color = Core.apps.activeApplication.activeWindow.COLORS[(Math.random() * Core.apps.activeApplication.activeWindow.COLORS.length) | 0];
        this.pos = { x: cx, y: cy };
        this.vel = { x: vx, y: vy };
        this.frame = 1;
        this.ctx = null;
    }
    update(ctx) {
        this.frame += 0.0001;
        this.vel.x *= this.frame;
        this.vel.y *= this.frame;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Star {
    constructor() {
        this.size = form.rand(form.SIZE);
        this.x = Math.random() * ctx.canvas.width;
        this.y = -this.size * 2;
        this.vy = this.size / 10;
        this.vx = Math.random() * 6 - 3;
        this.ay = this.size / 5000;
        this.shine = 0;
        this.shineDir = form.rand(form.SHINEDIR);
        this.color = "hsla(hue, 80%, brightness%, .15)".replace("hue", form.FRAME % 360);
        this.rot = Math.random() * 2 * Math.PI;
        this.omega = form.rand(form.ANGSPEED);
        if (Math.random() < 0.5) {
            this.omega *= -1;
        }
        this.form = form;
        this.ctx = ctx;
    }
    use() {
        this.x += this.vx;
        this.y += this.vy += this.ay;

        const newShine = this.shine + this.shineDir;
        if (newShine < 0 || newShine > 1) {
            this.shineDir *= -1;
        }
        else {
            this.shine = newShine;
        }
        this.rot += this.omega;

        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rot);
        this.ctx.fillStyle = this.color.replace("brightness", (0.25 + this.shine / 2) * 100);
        this.ctx.beginPath();
        this.ctx.moveTo(this.size, 0);

        for (let i = 0; i < 5; ++i) {
            const rad = this.form.PENTARADIANT * i;
            const halfRad = rad + this.form.PENTARADIANT / 2;
            this.ctx.lineTo(Math.cos(rad) * this.size, Math.sin(rad) * this.size);
            this.ctx.lineTo(Math.cos(halfRad) * this.size / 2, Math.sin(halfRad) * this.size / 2);
        }
        this.ctx.closePath();

        this.ctx.fill();

        this.ctx.rotate(-this.rot);
        this.ctx.translate(-this.x, -this.y);
    }
}
export { Window1 };
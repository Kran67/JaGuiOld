//#region Imports
import { Window } from '/scripts/components/containers/window.js';
import { CANVAS as canvas } from '/scripts/core/canvas.js';
import '/scripts/components/common/label.js';
import '/scripts/components/common/speedbutton.js';
//import { Point } from '/scripts/core/geometry.js';
import '/scripts/components/dialogs/dialogs.js';
import '/scripts/components/common/listbox.js';
import '/scripts/components/common/image.js';
//import { Animation } from '/scripts/animation.js';
import '/scripts/components/containers/groupbox.js';
import '/scripts/components/common/checkbox.js';
import '/scripts/components/common/radiobutton.js';
import '/scripts/components/extended/circlebutton.js';
import '/scripts/components/extended/popupbutton.js';
import '/scripts/components/extended/bitmapbutton.js';
import '/scripts/components/extended/pathbutton.js';
import '/scripts/components/containers/panel.js';
import '/scripts/components/containers/calloutpanel.js';
import '/scripts/components/color/colorbutton.js';
import '/scripts/components/extended/cornerbutton.js';
import '/scripts/components/toolbars/statusbar.js';
import '/scripts/components/toolbars/toolbar.js';
import '/scripts/components/toolbars/toolbutton.js';
import '/scripts/components/extended/valuelabel.js';
import '/scripts/components/extended/pathcheckbox.js';
import '/scripts/components/extended/anglebutton.js';
import '/scripts/components/common/progressbar.js';
import '/scripts/components/common/slider.js';
//import { ScrollBar } from '/scripts/components/common/scrollBar.js';
import '/scripts/components/containers/scrollbox.js';
import '/scripts/components/containers/expander.js';
import '/scripts/components/color/alphaslider.js';
import '/scripts/components/color/bwslider.js';
import '/scripts/components/color/hueslider.js';
import '/scripts/components/color/colorbox.js';
import '/scripts/components/color/colorpicker.js';
import '/scripts/components/color/colorquad.js';
import '/scripts/components/common/rating.js';
//import { gradientEdit } from '/scripts/components/color/gradientEdit.js';
import '/scripts/components/color/colorpanel.js';
import '/scripts/components/common/shapes.js';
import '/scripts/components/common/treeview.js';
import '/scripts/components/containers/pagecontrol.js';
import '/scripts/components/common/paintbox.js';
import '/scripts/components/common/plotgrid.js';
import '/scripts/components/common/textbox.js';
import '/scripts/components/common/passwordtextbox.js';
import '/scripts/components/extended/roundtextbox.js';
import '/scripts/components/extended/textboxclearbtn.js';
import '/scripts/components/common/spinbox.js';
import '/scripts/components/common/memo.js';
import '/scripts/components/extended/maskedtextbox.js';
import '/scripts/components/extended/iphonebutton.js';
import '/scripts/components/common/calendar.js';
//import { menus } from '/scripts/components/menus/menus.js';
//import { dropDownListBox } from '/scripts/components/common/dropDownListBox.js';
import '/scripts/components/extended/labeledanglebar.js';
import '/scripts/components/extended/labeledcolorbutton.js';
import '/scripts/components/extended/labeledtextbox.js';
import '/scripts/components/extended/labeledslider.js';
import '/scripts/components/extended/labeledmemo.js';
//import { dropDownColors } from '/scripts/components/color/dropDownColors.js';
import '/scripts/components/common/dropdowncalendar.js';
//import { dropDownSlider } from '/scripts/components/extended/dropDownSlider.js';
import '/scripts/components/common/numberwheel.js';
import '/scripts/components/common/timepanel.js';
import '/scripts/components/extended/imagecontrol.js';
import '/scripts/components/extended/labeledimage.js';
import '/scripts/components/extended/imageviewer.js';
//import { dropDownTimePanel } from '/scripts/components/common/dropDownTimePanel.js';
import '/scripts/components/extended/bitmapstatebutton.js';
import '/scripts/components/common/busyindicator.js';
import '/scripts/components/extended/splitbutton.js';
//import { commonDialog } from '/scripts/components/dialogs/commonDialog.js';
//import { openDialog } from '/scripts/components/dialogs/openDialog.js';
//import { findReplaceDialog } from '/scripts/components/dialogs/findReplaceDialog.js';
//import { fontDialog } from '/scripts/components/dialogs/fontDialog.js';
//import { colorDialog } from '/scripts/components/dialogs/colorDialog.js';
//import { gridView } from '/scripts/components/common/gridView.js';
//import { imageList } from '/scripts/components/nonvisual/imageList.js';
//import { timers } from '/scripts/components/nonvisual/timers.js';
//import { dataFile } from '/scripts/components/data/dataFile.js';
//import { dataSource } from '/scripts/components/data/dataSource.js';
import '/scripts/components/containers/flowlayout.js';
import '/scripts/components/containers/gridlayout.js';
import '/scripts/components/common/splitter.js';
import '/scripts/components/toolbars/splittoolbutton.js';
//import { actnList } from '/scripts/components/actions/actnList.js';
//import { stdActns } from '/scripts/components/actions/stdActns.js';
import '/scripts/components/extended/textboxbtn.js';
import '/scripts/components/common/clock.js';
//import { propertyGrid } from '/scripts/components/extras/propertyGrid.js';
import '/scripts/components/extended/radiogroup.js';
import '/scripts/components/extended/toggle.js';
import '/scripts/components/common/batteryindicator.js';
import '/scripts/components/extended/segmentledlabel.js';
import '/scripts/components/extended/circularprogressbar.js';
//#endregion Imports
let lastTime;
class Window1 extends Window {
    get MAX_DEPTH() { return 32; }
    get STARS() { return this.stars; }
    get TOTALSTARS() { return 512; }
    get SIZE() { return [10, 30]; }
    get SHINEDIR() { return [0.01, 0.05]; }
    get ANGSPEED() { return [0.01, 0.04]; }
    get PENTARADIANT() { return Math.PI * 2 / 5; }
    get COLORS() { return ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff']; }
    //get FRAME() { return (Math.random() * 360) | 0; }
    constructor(owner, props) {
        super(owner, props);
        this.stars = [];
        this.onShow.addListener(this.formShow);
        this.frame = (Math.random() * 360) | 0;
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
        this.initStars();
        //Core.looper.addListener(this, "paint");
    }
    formShow() {
        if (!Core.browser.chrome) {
            Dialogs.alert('Best experience with Chrome Browser');
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
        const confirm = dialogs.confirm('This operation takes several seconds.<br />It depends on your CPU.<br />Proceed?');
        confirm.onClose.addListener(this.form.createListBoxItems);
    }
    createListBoxItems() {
        if (this.modalResult === Window.MODALRESULTS.OK) {
            const t = new Date().getTime();
            this.app.activeWindow.ListBox2.beginUpdate();
            for (let i = 0; i < 1000000; i++) {
                const span = new ListBoxItem(this.app.activeWindow.ListBox2, `item${i}`);
                this.app.activeWindow.ListBox2.addItem(span);
            }
            this.app.activeWindow.ListBox2.endUpdate();
            console.log(`${new Date().getTime() - t}ms`);
        }
    }
    RoundButton1_onClick() {
        this.form.OpenDialog1.execute();
    }
    Label1_onClick() {
        this.form.FontDialog1.execute(this);
    }
    paint(elapsedTime) {
        this.PaintBox1.onPaint.invoke();
        if ((new Date().getTime() - lastTime) > 3000) {
            this.CircularProgressBar1.value = ~~(Math.random() * 101);
            this.ProgressBar1.value = ~~(Math.random() * 101);
            this.ProgressBar2.value = ~~(Math.random() * 101);
            lastTime = new Date().getTime();
        }
    }
    PaintBox1_onClick() {
        const form = this.form;
        this.drawType++;
        if (this.drawType > 2) {
            this.drawType = 0;
        }
        form.STARS.clear();
        if (this.drawType === 0) {
            form.initStars();
        }
    }
    PaintBox1_onPaint() {
        const htmlElement = this.HTMLElement;
        const halfWidth = htmlElement.offsetWidth / 2;
        const halfHeight = htmlElement.offsetHeight / 2;
        let star = null;
        const form = this.form;
        const stars = form.STARS;
        const ctx = this.ctx;
        switch (this.drawType) {
            case 0:
                ctx.globalCompositeOperation = canvas.GLOBALCOMPOSITEOPERATIONS.SOURCEOVER;
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.fillRect(0, 0, htmlElement.offsetWidth, htmlElement.offsetHeight);
                for (let i = 0; i < stars.length; i++) {
                    star = stars[i];
                    star.z -= 0.2;

                    if (star.z <= 0) {
                        star.x = form.randomRange(-25, 25);
                        star.y = form.randomRange(-25, 25);
                        star.z = form.MAX_DEPTH;
                    }

                    const k = 128.0 / star.z;
                    const px = star.x * k + halfWidth;
                    const py = star.y * k + halfHeight;

                    if (px >= 0 && px <= 500 && py >= 0 && py <= 400) {
                        const size = (1 - star.z / 32.0) * 5;
                        const shade = ~~((1 - star.z / 32.0) * 255);
                        ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
                        ctx.fillRect(px, py, size, size);
                    }
                }
                break;
            case 1:
                ++form.FRAME;
                ctx.globalCompositeOperation = canvas.GLOBALCOMPOSITEOPERATIONS.DESTINATIONOUT;
                ctx.fillStyle = 'rgba(0, 0, 0, .1)';
                ctx.fillRect(0, 0, htmlElement.offsetWidth, htmlElement.offsetHeight);
                ctx.globalCompositeOperation = canvas.GLOBALCOMPOSITEOPERATIONS.LIGHTER;

                if (Math.random() < 0.3) {
                    stars.push(new Star(form, ctx));
                }

                for (let s = 0; s < stars.length; ++s) {
                    star = stars[s];
                    star.use();

                    if ((star.x + star.size < 0) || (star.y + star.size > htmlElement.offsetHeight + star.size * 2) || (star.x + star.size > htmlElement.offsetWidth + star.size * 2)) {
                        stars.splice(s, 1);
                        --s;
                    }
                }
                break;
            case 2: {
                const total = ~~(htmlElement.offsetWidth * 0.5);
                ctx.globalCompositeOperation = canvas.GLOBALCOMPOSITEOPERATIONS.SOURCEOVER;
                for (let i = 0; i < stars.length; ++i) {
                    stars[i].update(ctx);
                    if (stars[i].pos.y < 0 || stars[i].pos.y > htmlElement.offsetHeight || stars[i].pos.x < 0 || stars[i].pos.x > htmlElement.offsetWidth) {
                        stars.splice(i, 1);
                    }
                }
                if (stars.length < total) {
                    stars.push(new Circle(Math.random() - 0.5, Math.random() - 0.5, halfWidth, halfHeight));
                }
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.fillRect(0, 0, htmlElement.offsetWidth, htmlElement.offsetHeight);

                break;
            }

        }
    }
    PlotGrid1_onPaint() {
        let p = new Array(100);
        const htmlElement = this.HTMLElement;
        const frequency = this.frequency;
        const ctx = this.ctx;
        const calc = (formula) => {
            let y = null;
            for (let i = 0, l = p.length; i < l; i++) {
                // calc only in PlotGrid area
                let x = -(htmlElement.offsetWidth / 2) + ((i / l) * htmlElement.offsetWidth);
                x = x / frequency;
                // formula here
                switch (formula) {
                    case 'sin':
                        y = Math.sin(x);
                        break;
                    case 'cos':
                        y = Math.cos(x) * x;
                        break;
                    default: //(x * x)
                        y = x * x;
                        break;
                }
                p[i] = new Core.classes.Point(htmlElement.offsetWidth / 2 + x * frequency, htmlElement.offsetHeight / 2 - y * frequency);
            }
        }
        ctx.save();
        // Paint sin
        calc('sin');
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.drawPolyline(p);
        // Paint cos * x
        p = new Array(100);
        calc('cos');
        ctx.linewidth = 2;
        ctx.strokeStyle = 'green';
        ctx.drawPolyline(p);
        // Paint x * x }
        p = new Array(100);
        calc();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'blue';
        ctx.drawPolyline(p);
        // End Paint
        ctx.restore();
    }
    ToolButton1_onClick() {
        window.location.href = '/index.html';
    }
    changeTheme() {
        this.app.themeManifest.themeName = this.caption.replace(String.SPACE, String.EMPTY).toLowerCase();
    }
    SpeedButton1_onClick() {
        //this.app.addWindow($j.tools.getPath($j.types.internalCategories.APPS)+this.app.name+'/window2');
        this.app.newWindow('window2');
    }
    closeQuery() {
        const dlg = Dialogs.confirmation('Are you sure you want to quit?');
        dlg.onClose.addListener(function () {
            Core.apps.activeApplication.activeWindow.canClose = this.modalResult === Window.MODALRESULTS.OK;
        });
    }
    showBorderDialogWindow() {
        this.app.newWindow('borderDialog');
    }
    showBorderNoneWindow() {
        this.app.newWindow('borderNone');
    }
    showBorderSingleWindow() {
        this.app.newWindow('borderSingle');
    }
    showBorderSizeableWindow() {
        this.app.newWindow('borderSizeable');
    }
    countdownEnd() {
        alert("countdownEnd");
    }
}

class Circle {
    constructor(vx, vy, cx, cy) {
        this.color = activeWindow.COLORS[(Math.random() * activeWindow.COLORS.length) | 0];
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
    constructor(form, ctx) {
        this.size = form.rand(form.SIZE);
        this.x = Math.random() * ctx.canvas.width;
        this.y = -this.size * 2;
        this.vy = this.size / 10;
        this.vx = Math.random() * 6 - 3;
        this.ay = this.size / 5000;
        this.shine = 0;
        this.shineDir = form.rand(form.SHINEDIR);
        this.color = 'hsla(hue, 80%, brightness%, .15)'.replace('hue', form.frame % 360);
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
        this.ctx.fillStyle = this.color.replace('brightness', (0.25 + this.shine / 2) * 100);
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
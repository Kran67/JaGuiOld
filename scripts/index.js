(function() {
    document.addEventListener("DOMContentLoaded",function() {
        document.getElementById("demo_total").innerHTML = document.querySelectorAll("#demos h5").length;
        document.getElementById("visualcontrols_total").innerHTML = document.querySelectorAll("#visualcontrols li").length;
        document.getElementById("nonvisualcontrols_total").innerHTML = document.querySelectorAll(".nonVisualContainer a").length;
        document.getElementById("themes_total").innerHTML = document.querySelectorAll("#themes h5").length;
        prepareEventAndBubblesButtons("demo");
        prepareEventAndBubblesButtons("theme");
        sortItems();
        document.getElementById("currentYear").innerHTML = new Date().getFullYear();
    });
    function prepareEventAndBubblesButtons(elementName) {
        let i,l,elms,nbElmsPerPageHoriz,offset,nbElmsPerPageVert,el,parent;
        // on calcul le nombre de points du caroussel pour les demos
        elms = document.querySelectorAll("#" + elementName + "1 div." + elementName);
        i = elms[0].offsetWidth;
        l = document.getElementById(elementName + "1");
        nbElmsPerPageHoriz = ~~(l.offsetWidth / i);
        offset = nbElmsPerPageHoriz * i;
        i = elms[0].offsetHeight;
        nbElmsPerPageVert = ~~(l.offsetHeight / i);
        max = ~~(elms.length / (nbElmsPerPageHoriz * nbElmsPerPageVert)) * offset;
        el = document.getElementById(elementName + "_prev");
        el.offset = offset;
        el.max = max;
        el.addEventListener("click",prev_gallery,false);
        el = document.getElementById(elementName + "_next");
        el.offset = offset;
        el.max = max;
        el.addEventListener("click",next_gallery,false);
        parent = el.parentNode;
        for(i = 0,l = elms.length;i < l;i += nbElmsPerPageHoriz * nbElmsPerPageVert) {
            el = document.createElement("div");
            el.className = "nav_but" + (i === 0 ? " selBut" : "");
            el.offset = offset * (i / (nbElmsPerPageHoriz * nbElmsPerPageVert));
            parent.appendChild(el);
            el.addEventListener("click",changeGallery,false);
        }
    }
    function sortItems() {
        let items = document.querySelectorAll("#common li"), i, l;
        items = Array.prototype.slice.call(items,0).sort(function(a,b) { return (b.innerHTML < a.innerHTML) ? 1 : -1; });
        document.getElementById("common").innerHTML = "";
        for(i = 0,l = items.length;i < l;i++) document.getElementById("common").appendChild(items[i]);
        items = document.querySelectorAll("#containers a")
        items = Array.prototype.slice.call(items,0).sort(function(a,b) { return (b.innerHTML < a.innerHTML) ? 1 : -1; });
        document.getElementById("containers").innerHTML = "";
        for(i = 0,l = items.length;i < l;i++) document.getElementById("containers").appendChild(items[i]);
        items = document.querySelectorAll("#menus a")
        items = Array.prototype.slice.call(items,0).sort(function(a,b) { return (b.innerHTML < a.innerHTML) ? 1 : -1; });
        document.getElementById("menus").innerHTML = "";
        for(i = 0,l = items.length;i < l;i++) document.getElementById("menus").appendChild(items[i]);
        items = document.querySelectorAll("#dialogs a")
        items = Array.prototype.slice.call(items,0).sort(function(a,b) { return (b.innerHTML < a.innerHTML) ? 1 : -1; });
        document.getElementById("dialogs").innerHTML = "";
        for(i = 0,l = items.length;i < l;i++) document.getElementById("dialogs").appendChild(items[i]);
        //items = document.querySelectorAll("#data a")
        //items = Array.prototype.slice.call(items,0).sort(function(a,b) { return (b.innerHTML < a.innerHTML) ? 1 : -1; });
        //document.getElementById("data").innerHTML = "";
        //for(i = 0,l = items.length;i < l;i++) document.getElementById("data").appendChild(items[i]);
        items = document.querySelectorAll("#extras a")
        items = Array.prototype.slice.call(items,0).sort(function(a,b) { return (b.innerHTML < a.innerHTML) ? 1 : -1; });
        document.getElementById("extras").innerHTML = "";
        for(i = 0,l = items.length;i < l;i++) document.getElementById("extras").appendChild(items[i]);
        items = document.querySelectorAll("#extended a")
        items = Array.prototype.slice.call(items,0).sort(function(a,b) { return (b.innerHTML < a.innerHTML) ? 1 : -1; });
        document.getElementById("extended").innerHTML = "";
        for(i = 0,l = items.length;i < l;i++) document.getElementById("extended").appendChild(items[i]);
        items = document.querySelectorAll("#color a")
        items = Array.prototype.slice.call(items,0).sort(function(a,b) { return (b.innerHTML < a.innerHTML) ? 1 : -1; });
        document.getElementById("color").innerHTML = "";
        for(i = 0,l = items.length;i < l;i++) document.getElementById("color").appendChild(items[i]);
        items = document.querySelectorAll("#shapes a")
        items = Array.prototype.slice.call(items,0).sort(function(a,b) { return (b.innerHTML < a.innerHTML) ? 1 : -1; });
        document.getElementById("shapes").innerHTML = "";
        for(i = 0,l = items.length;i < l;i++) document.getElementById("shapes").appendChild(items[i]);
    }
    function next_gallery(e) {
        let el = e.target,p = el.parentNode.parentNode,childs = p.getElementsByClassName("nav_cont");
        let offset = el.offset + (childs[0].firstElementChild.currentOffset | 0);
        childs[0].firstElementChild.style.transform = "translateX(-" + offset + "px)";
        childs[0].firstElementChild.currentOffset = offset;
        if(offset > 0) {
            el.parentNode.firstElementChild.classList.remove("hidden");
        }
        if(offset >= el.max) {
            el.classList.add("hidden");
        }
        //on allume le bouton
        el = p.querySelector("div.nav_but.selBut");
        el.classList.remove("selBut");
        el.nextElementSibling.classList.add("selBut");
    }
    function prev_gallery(e) {
        let el = e.target,p = el.parentNode.parentNode,childs = p.getElementsByClassName("nav_cont");
        let offset = (childs[0].firstElementChild.currentOffset | 0) - el.offset;
        childs[0].firstElementChild.style.transform = "translateX(-" + offset + "px)";
        childs[0].firstElementChild.currentOffset = offset;
        if(offset === 0) {
            el.classList.add("hidden");
        }
        if(offset < el.max) {
            el.parentNode.lastElementChild.classList.remove("hidden");
        }
        //on allume le bouton
        el = p.querySelector("div.nav_but.selBut");
        el.classList.remove("selBut");
        el.previousElementSibling.classList.add("selBut");
    }
    function changeGallery(e) {
        let el = e.target,p = el.parentNode.parentNode,childs = p.getElementsByClassName("nav_cont"),elms;
        childs[0].firstElementChild.style.transform = "translateX(-" + el.offset + "px)";
        p = el.parentNode;
        elms = p.querySelectorAll("div.nav_but.selBut");
        for(i = 0;i < elms.length;i++) {
            elms[i].classList.remove("selBut");
        }
        el.classList.add("selBut");
        childs[0].firstElementChild.currentOffset = el.offset;
        if(el.offset > 0) el.parentNode.firstElementChild.classList.remove("hidden");
        else el.parentNode.firstElementChild.classList.add("hidden");
        if(el.offset >= el.parentNode.firstElementChild.max) el.parentNode.firstElementChild.nextElementSibling.classList.add("hidden");
        else el.parentNode.firstElementChild.nextElementSibling.classList.remove("hidden");
    }
})();
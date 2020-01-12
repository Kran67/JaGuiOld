define(['require'], function (require) {
    //#region Methods
    function newDocument(encoding, version, standalone, rootName) {
        if (!encoding) encoding = 'ISO-8859-1';
        if (!version) version = '1.0';
        if (!standalone) standalone = 'false';
        if (!rootName) rootName = 'root';
        var xmlDoc = '<?xml version="' + version + '" encoding="' + encoding + '" ?><' + rootName + '></' + rootName + '>';
        if (window.ActiveXObject) { // IE
            var doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = false;
            doc.loadXML(xmlDoc);
            return doc;
        } else {// Mozilla, Firefox, Opera, etc.
            return (new DOMParser()).parseFromString(xmlDoc, 'text/xml');
        }
    };
    function findNodes(xml, xpath) {
        var nodes, arr = [], i, obj, j;
        if (window.ActiveXObject) {
            nodes = xml.selectNodes(xpath);
            for (i = 0; i < nodes.length; i++) arr.push(nodes[i]);
        } else {
            nodes = xml.evaluate(xpath, xml, null, XPathResult.ANY_TYPE, null);
            var result = nodes.iterateNext();
            while (result) {
                arr.push(result);
                result = nodes.iterateNext();
            }
        }
        return arr;
    };
    function addNode(xml, parentNode, name) {
        var newNode;
        newNode = xml.createElement(name);
        parentNode.appendChild(newNode);
        return newNode;
    };
    function delNode(node) {
        node.parentNode.removeChild(node);
    };
    //#endregion Methods
    return {
        newDocument: newDocument,
        findNodes: findNodes,
        addNode: addNode,
        delNode: delNode
    }
});
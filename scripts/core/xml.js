/**
 *
 */
class Xml {
    //#region Methods
    static newDocument(encoding, version, standalone, rootName) {
        if (!encoding) {
            encoding = "ISO-8859-1";
        }
        if (!version) {
            version = "1.0";
        }
        if (!standalone) {
            standalone = "false";
        }
        if (!rootName) {
            rootName = "root";
        }
        const xmlDoc = `<?xml version="${version}" encoding="${encoding}" ?><${rootName}></${rootName}>`;
        if (window.ActiveXObject) { // IE
            const doc = new ActiveXObject("Microsoft.XMLDOM");
            doc.async = false;
            doc.loadXML(xmlDoc);
            return doc;
        } else {// Mozilla, Firefox, Opera, etc.
            return (new DOMParser()).parseFromString(xmlDoc, "text/xml");
        }
    }
    static findNodes(xml, xpath) {
        const arr = [];
        if (window.ActiveXObject) {
            const nodes = xml.selectNodes(xpath);
            nodes.forEach(node => {
                arr.push(node);
            });
        } else {
            const nodes = xml.evaluate(xpath, xml, null, XPathResult.ANY_TYPE, null);
            let result = nodes.iterateNext();
            while (result) {
                arr.push(result);
                result = nodes.iterateNext();
            }
        }
        return arr;
    }
    static addNode(xml, parentNode, name) {
        const newNode = xml.createElement(name);
        parentNode.appendChild(newNode);
        return newNode;
    }
    static delNode(node) {
        node.parentNode.removeChild(node);
    }
    //#endregion Methods
}
export { Xml };
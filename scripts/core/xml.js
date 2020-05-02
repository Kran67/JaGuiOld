/**
 *
 */
class Xml {
    //#region Methods
    //#region Statics
    //#region newDocument
    static newDocument(encoding, version, standalone, rootName) {
        encoding = encoding || 'ISO-8859-1';
        version = version || '1.0';
        standalone = standalone || '!1';
        rootName = rootName || 'root';
        const xmlDoc = `<?xml version='${version}' encoding='${encoding}' ?><${rootName}></${rootName}>`;
        if (window.ActiveXObject) { // IE
            const doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = !1;
            doc.loadXML(xmlDoc);
            return doc;
        } else {// Mozilla, Firefox, Opera, etc.
            return (new DOMParser()).parseFromString(xmlDoc, 'text/xml');
        }
    }
    //#endregion newDocument
    //#region findNodes
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
    //#endregion findNodes
    //#region addNode
    static addNode(xml, parentNode, name) {
        const newNode = xml.createElement(name);
        parentNode.appendChild(newNode);
        return newNode;
    }
    //#endregion addNode
    //#region delNode
    static delNode(node) {
        node.parentNode.removeChild(node);
    }
    //#endregion delNode
    //#endregion Statics
    //#endregion Methods
}
export { Xml };
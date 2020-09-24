//导入包
var Parser = require('../lib/dom-parser');

function loadXMLString(txt) {
  //新建DOM解析对象
  var parser = new Parser.DOMParser();
  //基于请求到的 XML数据 来构建DOM对象
  var xmlDoc = parser.parseFromString(txt, "text/xml");

  return xmlDoc;
}

function xml2Obj(xmlText) {
  // 获取到xml dom对象
  let xmlDoc = loadXMLString(xmlText);
  //console.log(xmlDoc)
  // 按元素名获取节点
  let baseNode_list = xmlDoc.childNodes[1];
  //console.log(baseNode_list)
  return xmlToJson(baseNode_list);
}


// Changes XML to JSON
function xmlToJson(xml) {
  // Create the return object
  var obj = {};
  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } 
  else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }
  // do children
  if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      }else {
        if (typeof(obj[nodeName].length) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        //console.log(obj[nodeName])
        if(obj[nodeName]){
         obj[nodeName].push(xmlToJson(item));
        }
      }
    }
  }
  return obj;
};

exports.xml2Obj = xml2Obj
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;
const parkNS = "http://www.example.org/PFRMapData";

async function loadParks() {
  if (xml == undefined) {
    //"http://localhost:8888/facilities-data.xml"
    let response = await fetch(
      "https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/cbea3a67-9168-4c6d-8186-16ac1a795b5b/resource/180c85e3-3803-4f34-80b2-a7367220e118/download/facilities-data.xml",
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml"
        }
      }
    );
    //convert XML string (response.text()) to XML DOM document
    data = new JSDOM(await response.text(), { contentType: "application/xml" });
    //console.log(data);
    xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
  }
  return xml;
}
async function loadLocations() {
  xml = await loadParks();
  //xml.getElementsByTagName("Location")
  //xml.querySelectorAll("Location")
  return xml.querySelectorAll("Location");
}
async function getParkById(id) {
  xml = await loadParks();
  //1st param: XPath expression to evaluate
  //2nd param: context node (i.e. node we're querying)
  //3rd param: namespace
  //4th param: the data type we want for the result
  //5th param: existing XPathResult object or null to create a new one
  let result = xml.evaluate(
    `//Location[LocationID/text()='${id}']`,
    xml,
    parkNS,
    4,
    null
  );
  //result.iterateNext()
  //to loop over multiple results:
  //while(item = result.iterateNext()) { }
  return result.iterateNext();
}

module.exports = {
  loadParks,
  loadLocations,
  getParkById
};
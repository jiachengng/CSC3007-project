// Api link for dengue cluster data
const apiUrl1 = "https://jiachengng.github.io/CSC3007-project/dataset/dengue_cluster.json";

const clinicJson = "https://jiachengng.github.io/CSC3007-project/dataset/clinic.json";

// Create Layer Object
let tiles = new L.tileLayer(
  "https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png",
  {
    detectRetina: true,
    maxZoom: 18,
    minZoom: 11,
    //Do not remove this attribution
    attribution:
      '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;">' +
      'New OneMap | Map data Â© contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>',
  }
);

// Add MaxBound
let map = new L.Map("map", {
  center: [1.347833, 103.809357],
  zoom: 11,
  maxBounds: L.latLngBounds(L.latLng(1.1, 103.5), L.latLng(1.5, 104.3)),
}).addLayer(tiles);

fetch(apiUrl1)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.SrchResults[1].ZONE);

    // console.log(myArray)

    // Drawing Polygons Start
    for (let i = 1; i < data.SrchResults.length; i++) {
      var example = data.SrchResults[i].LatLng;
      const myArray = example.split("|");
      var dengueCase = data.SrchResults[i].CASE_SIZE;
      var locationName = data.SrchResults[i].DESCRIPTION;
    //   console.log(myArray)
      const myArray2 = [];
      myArray.forEach((element) => {
        // console.log(element)
        var x = element.split(",");
        var tempArray = [];
        x.forEach((xElement) => {
          // console.log(xElement)
          tempArray.push(parseFloat(xElement));
        //   console.log(tempArray)
        });
        myArray2.push(tempArray);
      });
      var finalArray = [];
      finalArray.push(myArray2);
      //   console.log(finalArray)

      // Creating multi polygon options
      if (dengueCase <= 11) {
        var multiPolygonOptions = { color: "yellow", weight: 8 };
      } else if (dengueCase > 11 && dengueCase < 200) {
        var multiPolygonOptions = { color: "orange", weight: 8 };
      } else {
        var multiPolygonOptions = { color: "red", weight: 8 };
      }
      // Creating multi polygons
      var multipolygon = L.multiPolygon(finalArray, multiPolygonOptions);

      // Adding multi polygon to map
      multipolygon.addTo(map);

      // create popup contents
      var customPopup =
        "No of Cases: " + dengueCase + "<br>" + "Location: " + locationName;
      // specify popup options
      var customOptions = {
        maxWidth: "400",
        width: "200",
        className: "popupCustom",
      };

      multipolygon.bindPopup(customPopup, customOptions);
      //   multipolygon.bindPopup(
      //     "No of Cases: " + dengueCase + "<br>" + "Location: " + locationName
      //   );
      // L.polygon(finalArray).bindTooltip("my tooltip").addTo(map);
    }
    //Drawing Polygon END

    // Drawing Clinc
  });

  fetch(clinicJson)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.SrchResults[1].LatLng);
    var x = data.SrchResults[1].LatLng.split(",");
    console.log(x)
    // console.log()
    // var testArray = [];
    // var clinic =  data.SrchResults[1].LatLng.split(",");
    // console.log(clinic)
    // testArray.push(parseFloat(clinic))
    // console.log(testArray)

    var greenIcon = L.icon({
        iconUrl: 'leaf-green.png',
        shadowUrl: 'leaf-shadow.png',
    
        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    // L.marker(x, {icon: greenIcon}).addTo(map);

    // const myArray2 = [];
    for (let i = 1; i < data.SrchResults.length; i++) {
        var x = data.SrchResults[i].LatLng.split(",");
        // console.log(x)
        // L.marker(x, {icon: greenIcon}).addTo(map);
        // var example = data.SrchResults[i].LatLng;
        // var tempArray = [];
        // tempArray.push(example)
        // tempArray.forEach((xElement) => {
        //     // console.log(xElement)
        //     tempArray.push(parseFloat(xElement));
        //   });
        //   myArray2.push(tempArray);
        // L.marker(myArray2, {icon: greenIcon}).addTo(map);
     }
    // console.log(myArray)

    // Drawing Polygons Start
    // for (let i = 1; i < data.SrchResults.length; i++) {
    //   var example = data.SrchResults[i].LatLng;
    //   const myArray = example.split("|");
    //   var dengueCase = data.SrchResults[i].CASE_SIZE;
    //   var locationName = data.SrchResults[i].DESCRIPTION;

    //   const myArray2 = [];
    //   myArray.forEach((element) => {
    //     // console.log(element)
    //     var x = element.split(",");
    //     var tempArray = [];
    //     x.forEach((xElement) => {
    //       // console.log(xElement)
    //       tempArray.push(parseFloat(xElement));
    //     });
    //     myArray2.push(tempArray);
    //   });
    //   var finalArray = [];
    //   finalArray.push(myArray2);
    //   //   console.log(finalArray)

    //   // Creating multi polygon options
    //   if (dengueCase <= 11) {
    //     var multiPolygonOptions = { color: "yellow", weight: 8 };
    //   } else if (dengueCase > 11 && dengueCase < 200) {
    //     var multiPolygonOptions = { color: "orange", weight: 8 };
    //   } else {
    //     var multiPolygonOptions = { color: "red", weight: 8 };
    //   }
    //   // Creating multi polygons
    //   var multipolygon = L.multiPolygon(finalArray, multiPolygonOptions);

    //   // Adding multi polygon to map
    //   multipolygon.addTo(map);

    //   // create popup contents
    //   var customPopup =
    //     "No of Cases: " + dengueCase + "<br>" + "Location: " + locationName;
    //   // specify popup options
    //   var customOptions = {
    //     maxWidth: "400",
    //     width: "200",
    //     className: "popupCustom",
    //   };

    //   multipolygon.bindPopup(customPopup, customOptions);
    //   //   multipolygon.bindPopup(
    //   //     "No of Cases: " + dengueCase + "<br>" + "Location: " + locationName
    //   //   );
    //   // L.polygon(finalArray).bindTooltip("my tooltip").addTo(map);
    // }
    //Drawing Polygon END

    // Drawing Clinc
  });



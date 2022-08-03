// Api link for dengue cluster data
const apiUrl1 = "https://jiachengng.github.io/CSC3007-project/dataset/dengue_cluster.json";

const clinicJson = "https://jiachengng.github.io/CSC3007-project/dataset/clinic.json";

// Create Layer Object
let tiles = new L.tileLayer(
  "https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png",
  {
    detectRetina: true,
    maxZoom: 18,
    minZoom: 12,
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
      } else if (dengueCase > 11 && dengueCase < 50) {
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

    }
    //Drawing Polygon END
  });


  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 50]
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(map);
  function getColor(d) {
    return d > 50   ? 'red' :
           d > 10   ? 'orange' :
                      'yellow';
}



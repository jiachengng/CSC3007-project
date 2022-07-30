// Api link for dengue cluster data
const apiUrl =
  "https://jiachengng.github.io/CSC3007-project/dataset/dengue_cluster.json";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);

    
    var example = data.SrchResults[1].LatLng;

    const myArray = example.split("|")

    // console.log(myArray)


    const myArray2 = []
    myArray.forEach(element => {
        // console.log(element)
        var x = element.split(",")
        var tempArray = []
        x.forEach(xElement => {
            // console.log(xElement)
            tempArray.push(parseFloat(xElement))
        })
        myArray2.push(tempArray)
    });

    var finalArray = []
    finalArray.push(myArray2)
    console.log(finalArray)

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
          'New OneMap | Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>',
      }
    );

    // Add MaxBound
    let map = new L.Map("map", {
      center: [1.347833, 103.809357],
      zoom: 11,
      maxBounds: L.latLngBounds(L.latLng(1.1, 103.5), L.latLng(1.5, 104.3)),
    }).addLayer(tiles);

    
    // Creating latlng object
    // var latlang = [
    //     [
    //       [1.34129739596254, 103.786640196476],
    //       [1.34105333307691, 103.78681280269],
    //       [1.340988729456, 103.786888406905],
    //       [1.34055222638813, 103.786844870949],
    //       [1.34032279236236, 103.7869163925],
    //       [1.34011584859407, 103.786920866728],
    //     ],
    //   ];

    console.log(latlang)

    // Creating multi polygon options
    var multiPolygonOptions = {color:'red', weight:8};
         
    // Creating multi polygons
    var multipolygon = L.multiPolygon(finalArray , multiPolygonOptions);

    // Adding multi polygon to map
    multipolygon.addTo(map);
  });

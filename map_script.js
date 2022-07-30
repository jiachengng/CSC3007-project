// Api link for dengue cluster data
const apiUrl = 'https://jiachengng.github.io/CSC3007-project/dataset/dengue_cluster.json'

fetch(apiUrl)
    .then(response => response.json())
    .then(data => { 
        console.log(data)

        let tiles = new L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 18,
            minZoom: 11,
            //Do not remove this attribution
            attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;">' +
                'New OneMap | Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
        });

        // Add MaxBound
        let map = new L.Map("map", {
            center: [1.347833, 103.809357],
            zoom: 11,
            maxBounds: L.latLngBounds(L.latLng(1.1, 103.5), L.latLng(1.5, 104.3))
        })
            .addLayer(tiles);
    })
var mymap = L.map('worldmap',
     {
      center: [48.866667, 2.333333],
      zoom: 4
     }
     );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

/*var customIcon = L.icon({
    iconUrl: '../images/leaf-green.png',
    shadowUrl: '../images/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});*/

var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: '../images/leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});
var greenIcon = new LeafIcon({iconUrl: '../images/leaf-green.png'}),
    redIcon = new LeafIcon({iconUrl: '../images/leaf-red.png'}),
    orangeIcon = new LeafIcon({iconUrl: '../images/leaf-orange.png'});
   

var cities = document.getElementsByClassName('list-group-item');
for(let i =0; i<cities.length; i++) {
 var lon = cities[i].dataset.lon;
 var lat = cities[i].dataset.lat;
 var city = cities[i].dataset.city;
 

  //L.marker([lat, lon], {icon: customIcon}).addTo(mymap).bindPopup(city);
  //L.marker([lat, lon], {icon: greenIcon}).addTo(mymap).bindPopup(city);
  L.marker([lat, lon], {icon: redIcon}).addTo(mymap).bindPopup(city);
  //L.marker([lat, lon], {icon: orangeIcon}).addTo(mymap).bindPopup(city);
}
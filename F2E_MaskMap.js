$(function () {

    var map = L.map('mapid', {
        center: [22.604799,120.2976256],
        zoom: 16
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.marker([22.604799,120.2976256], {icon: greenIcon}).addTo(map)
        .bindPopup('<div class="info_card">\
                        <h1>測試藥局</h1>\
                        <div>\
                            <span><i class="fas fa-map-marker-alt"></i></span>\
                            <span>台中市太平區ＸＸＸＸ</span>\
                        </div>\
                        <div>\
                            <span><i class="fas fa-phone"></i></span>\
                            <span>04-234567</span>\
                        </div>\
                        <div class="m-t-sm">\
                            <div class="type_count">成人：已售完</div>\
                            <div class="type_count sufficient">兒童：18 個</div>\
                            <div class="clear_both"></div>\
                        </div>\
                    </div>',
                    {
                        width: '250px'
                    }
                    );
    
    
    L.marker([22.6066728,120.3015429]).addTo(map)
        .bindPopup('<h1>IKEA</h1><p>成人口罩：50<br>兒童口罩:50</p>')
    
    
    

});

// =========================
_.templateSettings = { //  underscore.js .Template method.
    evaluate: /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g,
    escape: /\{\{-(.+?)\}\}/g
};
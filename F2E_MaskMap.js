$(function () {
    getLocation();
    // initMap();
    // getData();
});

// =========================
var map;
var infoData;
var markers;
var userLatitude = '25.047819';
var userLongitude = '121.5147601';
var blueIcon = new L.Icon({
    iconUrl: 'img/blue_marker.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var grayIcon = new L.Icon({
    iconUrl: 'img/gray_marker.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var orangeIcon = new L.Icon({
    iconUrl: 'img/orange_marker.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

_.templateSettings = { //  underscore.js .Template method.
    evaluate: /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g,
    escape: /\{\{-(.+?)\}\}/g
};

function initMap(location) {
    // map = L.map('mapid', {
    //     center: [userLatitude, userLongitude],
    //     zoom: 16
    // });
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
    // markers = new L.MarkerClusterGroup().addTo(map);
    if (location) {
        userLatitude = location.coords.latitude;
        userLongitude = location.coords.longitude;
    } else {
        userLatitude = '25.047819';;
        userLongitude = '121.5147601';
    }

    map = L.map('mapid', {
        center: [userLatitude, userLongitude],
        zoom: 16
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    markers = new L.MarkerClusterGroup().addTo(map);
    getData();

}

function getData() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            infoData = data.features;
            // console.log(infoData[0]);
            dataAppendMap();


        }
    });
}

function dataAppendMap() {
    for (var i = 0; i < infoData.length; i++) {
        var id = infoData[i].properties.id;
        var name = infoData[i].properties.name;
        var position1 = infoData[i].geometry.coordinates[1];
        var position2 = infoData[i].geometry.coordinates[0];
        var phone = infoData[i].properties.phone;
        var address = infoData[i].properties.address;
        var mask_adult = infoData[i].properties.mask_adult;
        var mask_child = infoData[i].properties.mask_child;
        var updated = infoData[i].properties.updated;
        var available = infoData[i].properties.available;
        var note = infoData[i].properties.note;
        var custom_note = infoData[i].properties.custom_note;
        var website = infoData[i].properties.website;
        var adultClass = '';
        var childClass = '';

        if (mask_adult > 0) {
            adultClass = ' sufficient';
        }

        if (mask_child > 0) {
            childClass = ' sufficient';
        }

        if (mask_adult > 0 && mask_child > 0) {
            var icon = blueIcon;
        } else if (mask_adult > 0 && mask_child === 0) {
            var icon = orangeIcon;
        } else if (mask_adult === 0 && mask_child > 0) {
            var icon = orangeIcon;
        } else {
            var icon = grayIcon;
        }
        markers.addLayer(
            L.marker([position1, position2], {
                icon: icon
            }).bindPopup('<div class="info_card">\
                    <h1>' + name + '</h1>\
                    <div>\
                        <span><i class="fas fa-map-marker-alt"></i></span>\
                        <span>' + address + '</span>\
                    </div>\
                    <div>\
                        <span><i class="fas fa-phone"></i></span>\
                        <span>' + phone + '</span>\
                    </div>\
                    <div class="m-t-sm">\
                        <div class="type_count' + adultClass + '">成人：' + mask_adult + ' 個</div>\
                        <div class="type_count' + childClass + '">兒童：' + mask_child + ' 個</div>\
                        <div class="clear_both"></div>\
                    </div>\
                </div>', {
                width: '250px'
            })
        )
    }
    map.addLayer(markers);
}

function getLocation() {
    if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(function (location) {
        //     showPosition(location);
        //     showError(location);
        //     initMap(location);
        // });
        // navigator.geolocation.getCurrentPosition(function (location) {
        //     initMap(location);
        // });

        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
}

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
    console.log(latlon);
    initMap(position);
}

function showError(error) {
    initMap();
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            console.log = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            console.log = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            console.log = "An unknown error occurred."
            break;
    }
}
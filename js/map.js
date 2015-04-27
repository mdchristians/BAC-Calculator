var map;
var infowindow;
var inwindow;
var request;
var service;

function initialize() {
    //new
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: pos,
            zoom: 15
        });
        
        request = {
            location: pos,
            radius: 10000,
            query: 'pub'
        };

        request2 = {
            location: pos,
            radius: 10000,
            types: ['liquor_store']
        }

        request3 = {
            location: pos,
            radius: 10000,
            query: 'nightclub'
        }

        request4 = {
            location: pos,
            radius: 10000,
            types: ['bar']
        }

        request5 = {
            location: pos,
            radius: 10000,
            query: 'bar'
        };

        request6 = {
            location: pos,
            radius: 10000,
            query: 'lounge'
        };

        request7 = {
            location: pos,
            radius: 10000,
            query: 'brewery'
        };

        request8 = {
            location: pos,
            radius: 10000,
            query: 'tavern'
        };

        request9 = {
            location: pos,
            radius: 10000,
            query: 'grill'
        };

        request10 = {
            location: pos,
            radius: 10000,
            query: 'spurs'
        };

        inwindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
        service.nearbySearch(request2, callback);
        service.textSearch(request3, callback);
        service.nearbySearch(request4, callback);
        service.textSearch(request5, callback);
        service.textSearch(request6, callback);
        service.textSearch(request7, callback);
        service.textSearch(request8, callback);
        service.textSearch(request9, callback);
        service.textSearch(request10, callback);
        
        var input = /** @type {HTMLInputElement} */(
            document.getElementById('pac-input'));

        var types = document.getElementById('type-selector');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
            }
            marker.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                  (place.address_components[0] && place.address_components[0].short_name || ''),
                  (place.address_components[1] && place.address_components[1].short_name || ''),
                  (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infowindow.open(map, marker);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
            var radioButton = document.getElementById(id);
            google.maps.event.addDomListener(radioButton, 'click', function () {
                autocomplete.setTypes(types);
            });
        }

        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-establishment', ['establishment']);
        setupClickListener('changetype-geocode', ['geocode']);

    }, function () {
        handleNoGeolocation(true);
    });

}//end initialize

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    //service = new google.maps.places.PlacesService(map);
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function () {
        inwindow.setContent(place.name);
        inwindow.open(map, this);
    });
}

function handleNoGeolocation(errorFlag) {
	var content;
    if (errorFlag) {
        content = 'Error: The Geolocation service failed.';
    } else {
        content = 'Error: Your browser doesn\'t support geolocation.';
    }
    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };
    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);


        

        //close but no cigar on getting details for each place
        //function createMarker(place) {
        //    var request = {
        //        placeId: place.place_id
        //    }
        //    service.getDetails(request, function (place, status) {
        //        //if (status == google.maps.places.PlacesServiceStatus.OK) {
        //        var marker = new google.maps.Marker({
        //            map: map,
        //            position: place.geometry.location
        //        });
        //        google.maps.event.addListener(marker, 'click', function () {
        //            inwindow.setContent(place.name);
        //            inwindow.open(map, this);
        //        });
        //        // }
        //    });
        //}
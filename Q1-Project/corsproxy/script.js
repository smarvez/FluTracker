//create markers array and define remove function

var gMarkers = [];
function removeMarkers(){
  for(i=0; i<gMarkers.length; i++){
    gMarkers[i].setMap(null);
  }
  return gMarkers;
}

//set zip code to user favorite using local storage

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {lat: 20, lng: 0},
    container: 'map',
    mapTypeId: 'terrain',
    styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
  });
}


$(document).ready(function() {

  $('#amount').val(0);
  var linkH = "https://g-flutrack.herokuapp.com/";
  var resultsInLastNumDays = '?time=7';
  var newLink = linkH + resultsInLastNumDays;
  var favoriteTweets = JSON.parse(localStorage.getItem("tweet")) || [];

  let $xhr = $.getJSON(newLink);

    $xhr.done(function(data) {

      if ($xhr.status !== 200) {
      }
      // console.log(data);

      // find date groups
      var start = Date.now();
      var today = new Date(start);
      var todaysHour = today.getHours();
      var todaysDate = today.getDate();


      // add today's markers to map
      for (var j = 0; j < data.length; j++) {
        var latitude = data[j].latitude;
        var longitude = data[j].longitude;
        var tweet = data[j].tweet_text;
        var image = "Sick_Emoji.png";
        var date = new Date(data[j].tweet_date * 1000);
        var day = date.getDate();
        var daysAgo = (todaysDate - day);
        var latLng = new google.maps.LatLng(latitude, longitude);
        if (daysAgo === 0) {
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: image
          });
          marker.setMap(map);
          gMarkers.push(marker);
          attachSecretMessage(marker, tweet);
          marker.addListener('click', function() {
            favoriteTweets.push(tweet);
            localStorage.setItem('tweet', JSON.stringify(favoriteTweets));
          })
        }
      }

      // add event listenter to markers to get tweets
      function attachSecretMessage(marker, secretMessage) {
        var infowindow = new google.maps.InfoWindow({
          content: secretMessage
        });

        marker.addListener('mouseover', function() {
          infowindow.open(marker.get('map'), marker);
        });
        marker.addListener('mouseout', function() {
          infowindow.close();
        })
      }

      //slider functionality

      $( function() {
        $('#amount').val(0);
        $( "#slider" ).slider({
          animate: "fast",
          range: "max",
          min: 0,
          max: 6,
          value: 0,
          change: function( event, ui ) {
            $( "#amount" ).val( ui.value );
            if (ui.value === 0) {
              removeMarkers();
              for (var j = 0; j < data.length; j++) {
                var latitude = data[j].latitude;
                var longitude = data[j].longitude;
                var tweet = data[j].tweet_text;
                var image = "Sick_Emoji.png";
                var date = new Date(data[j].tweet_date * 1000);
                var day = date.getDate();
                var daysAgo = (todaysDate - day);
                var latLng = new google.maps.LatLng(latitude, longitude);
                if (daysAgo === 0) {
                  var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image
                  });
                  marker.setMap(map);
                  gMarkers.push(marker);
                  attachSecretMessage(marker, tweet);
                }
              }
            }

            if (ui.value === 1) {
              removeMarkers();
              for (var j = 0; j < data.length; j++) {
                var latitude = data[j].latitude;
                var longitude = data[j].longitude;
                var tweet = data[j].tweet_text;
                var image = "Sick_Emoji.png";
                var date = new Date(data[j].tweet_date * 1000);
                // var day = date.getDate();
                if ((start - date) > 86400000 && (start - date) < 172800000) {
                  var daysAgo = 1;
                }
                // var daysAgo = (todaysDate - day);
                var latLng = new google.maps.LatLng(latitude, longitude);
                if (daysAgo === 1) {
                  var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image
                  });
                  marker.setMap(map);
                  gMarkers.push(marker);
                  attachSecretMessage(marker, tweet);
                }
              }
            }
            if (ui.value === 2) {
              removeMarkers();
              for (var j = 0; j < data.length; j++) {
                var latitude = data[j].latitude;
                var longitude = data[j].longitude;
                var tweet = data[j].tweet_text;
                var image = "Sick_Emoji.png";
                var date = new Date(data[j].tweet_date * 1000);
                var day = date.getDate();
                var daysAgo = (todaysDate - day);
                var latLng = new google.maps.LatLng(latitude, longitude);
                if ((start - date) > 172800000 && (start - date) < 259200000) {
                  var daysAgo = 2;
                }
                if (daysAgo === 2) {
                  var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image
                  });
                  marker.setMap(map);
                  gMarkers.push(marker);
                  attachSecretMessage(marker, tweet);
                }
              }
            }
            if (ui.value === 3) {
              removeMarkers();
              for (var j = 0; j < data.length; j++) {
                var latitude = data[j].latitude;
                var longitude = data[j].longitude;
                var tweet = data[j].tweet_text;
                var image = "Sick_Emoji.png";
                var date = new Date(data[j].tweet_date * 1000);
                var day = date.getDate();
                var daysAgo = (todaysDate - day);
                var latLng = new google.maps.LatLng(latitude, longitude);
                if ((start - date) > 259200000 && (start - date) < 345600000) {
                  var daysAgo = 3;
                }
                if (daysAgo === 3) {
                  var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image
                  });
                  marker.setMap(map);
                  gMarkers.push(marker);
                  attachSecretMessage(marker, tweet);
                }
              }
            }
            if (ui.value === 4) {
              removeMarkers();
              for (var j = 0; j < data.length; j++) {
                var latitude = data[j].latitude;
                var longitude = data[j].longitude;
                var tweet = data[j].tweet_text;
                var image = "Sick_Emoji.png";
                var date = new Date(data[j].tweet_date * 1000);
                var day = date.getDate();
                var daysAgo = (todaysDate - day);
                var latLng = new google.maps.LatLng(latitude, longitude);
                if ((start - date) > 345600000 && (start - date) < 432000000) {
                  var daysAgo = 4;
                }
                if (daysAgo === 4) {
                  var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image
                  });
                  marker.setMap(map);
                  gMarkers.push(marker);
                  attachSecretMessage(marker, tweet);
                }
              }
            }
            if (ui.value === 5) {
              removeMarkers();
              for (var j = 0; j < data.length; j++) {
                var latitude = data[j].latitude;
                var longitude = data[j].longitude;
                var tweet = data[j].tweet_text;
                var image = "Sick_Emoji.png";
                var date = new Date(data[j].tweet_date * 1000);
                var day = date.getDate();
                var daysAgo = (todaysDate - day);
                var latLng = new google.maps.LatLng(latitude, longitude);
                if ((start - date) > 432000000 && (start - date) < 518400000) {
                  var daysAgo = 5;
                }
                if (daysAgo === 5) {
                  var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image
                  });
                  marker.setMap(map);
                  gMarkers.push(marker);
                  attachSecretMessage(marker, tweet);
                }
              }
            }
            if (ui.value === 6) {
              removeMarkers();
              for (var j = 0; j < data.length; j++) {
                var latitude = data[j].latitude;
                var longitude = data[j].longitude;
                var tweet = data[j].tweet_text;
                var image = "Sick_Emoji.png";
                var date = new Date(data[j].tweet_date * 1000);
                var day = date.getDate();
                var daysAgo = (todaysDate - day);
                var latLng = new google.maps.LatLng(latitude, longitude);
                if ((start - date) > 518400000 && (start - date) < 604800000) {
                  var daysAgo = 6;
                }
                if (daysAgo === 6) {
                  var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image
                  });
                  marker.setMap(map);
                  gMarkers.push(marker);
                  attachSecretMessage(marker, tweet);
                }
              }
            }
            if (ui.value === 7) {
              removeMarkers();
              for (var j = 0; j < data.length; j++) {
                var latitude = data[j].latitude;
                var longitude = data[j].longitude;
                var tweet = data[j].tweet_text;
                var image = "Sick_Emoji.png";
                var date = new Date(data[j].tweet_date * 1000);
                var day = date.getDate();
                var daysAgo = (todaysDate - day);
                var latLng = new google.maps.LatLng(latitude, longitude);
                if ((start - date) > 604800000) {
                  var daysAgo = 6;
                }
                if (daysAgo === 7) {
                  var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image
                  });
                  marker.setMap(map);
                  gMarkers.push(marker);
                  attachSecretMessage(marker, tweet);
                }
              }
            }
          }
        });
      } );

      //Show all markers from past week
      $('#button2').click(function() {
        event.preventDefault();
        for (var j = 0; j < data.length; j++) {
          var latitude = data[j].latitude;
          var longitude = data[j].longitude;
          var tweet = data[j].tweet_text;
          var image = "Sick_Emoji.png";
          var date = new Date(data[j].tweet_date * 1000);
          var day = date.getDate();
          var daysAgo = (todaysDate - day);
          var latLng = new google.maps.LatLng(latitude, longitude);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: image
          });
          marker.setMap(map);
          gMarkers.push(marker);
          attachSecretMessage(marker, tweet);
        }
      })

      //user input geocoding//
      var geocoder = new google.maps.Geocoder();
      var favoriteZips = JSON.parse(localStorage.getItem("address")) || [];

      $('#trigger').click( function(){
        $('#drop').toggle();
      });

      $('#check').click(function(){
        if(localStorage)
          $('#userInput').val(favoriteZips)
            console.log(favoriteZips);
      });

      $('#onclick').click(function() {
        event.preventDefault();
        var address = $('#userInput').val();
        localStorage.setItem('address', JSON.stringify(address));
        geocodeAddress(geocoder, map);
        function geocodeAddress(geocoder, resultsMap) {
          geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
              console.log(address);
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            map.setZoom(7);
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }
      })
      // console.log(JSON.parse(localStorage.getItem("tweet")));
    })
})

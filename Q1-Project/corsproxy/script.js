// var gMarkers = [];
// function removeMarkers(){
//   for(i=0; i<gMarkers.length; i++){
//     gMarkers[i].setMap(null);
//   }
//   return gMarkers;
// }

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {lat: 0, lng: 0},
    mapTypeId: 'terrain'
  });
}

$(document).ready(function() {

  var linkH = "https://g-flutrack.herokuapp.com/";
  // var search = '?s=feverANDcoughORfever';
  // var aggravated = '?a=TRUE';
  var resultsInLastNumDays = '?time=7';
  var newLink = linkH + resultsInLastNumDays;

  let $xhr = $.getJSON(newLink);

    $xhr.done(function(data) {

      if ($xhr.status !== 200) {
      }
      console.log(data);

      //create markers array and define remove function
      var gMarkers = [];
      function removeMarkers(){
        for(i=0; i<gMarkers.length; i++){
          gMarkers[i].setMap(null);
        }
      }

      // find date groups
      var start = Date.now();
      var today = new Date(start);
      var todaysHour = today.getHours();
      var todaysDate = today.getDate();
      console.log(start);

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

      //clear markers from map
      function clearMarkers() {
        setMapOnAll(null);
      }
      // $('#amount').val(ui.value) = 0
      //slider functionality
      $( function() {
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
            // if (ui.value === 7) {
            //   removeMarkers();
            //   for (var j = 0; j < data.length; j++) {
            //     var latitude = data[j].latitude;
            //     var longitude = data[j].longitude;
            //     var tweet = data[j].tweet_text;
            //     var image = "Sick_Emoji.png";
            //     var date = new Date(data[j].tweet_date * 1000);
            //     var day = date.getDate();
            //     var daysAgo = (todaysDate - day);
            //     var latLng = new google.maps.LatLng(latitude, longitude);
            //     if ((start - date) > 604800000) {
            //       var daysAgo = 6;
            //     }
            //     if (daysAgo === 7) {
            //       var marker = new google.maps.Marker({
            //         position: latLng,
            //         map: map,
            //         icon: image
            //       });
            //       marker.setMap(map);
            //       gMarkers.push(marker);
            //       attachSecretMessage(marker, tweet);
            //     }
            //   }
            // }
          }
        });
        $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
      } );

      //user input geocoding//
      var geocoder = new google.maps.Geocoder();
      var favoriteZips = JSON.parse(localStorage.getItem("address")) || [];

      $('#onclick').click(function() {
        event.preventDefault();
        var address = $('#userInput').val();
        favoriteZips.push(address);
        localStorage.setItem('address', JSON.stringify(favoriteZips));
        geocodeAddress(geocoder, map);
        function geocodeAddress(geocoder, resultsMap) {
          // var address = $('#userInput').val();

        // var address = document.getElementById('address').value;
          geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
              console.log(address);
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            map.setZoom(5);
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }
      })
      console.log(JSON.parse(localStorage.getItem("address")));
    })
})

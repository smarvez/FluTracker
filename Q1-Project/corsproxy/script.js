var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {lat: 2.8, lng: -187.3},
    mapTypeId: 'terrain'
  });
}

$(document).ready(function() {

  var linkH = "https://g-flutrack.herokuapp.com/";
  var search = '?s=feverANDcoughORfever';
  var aggravated = '?a=TRUE';
  var resultsInLastNumDays = '?time=7';
  var newLink = linkH + resultsInLastNumDays;

  let $xhr = $.getJSON(newLink);

    $xhr.done(function(data) {

      if ($xhr.status !== 200) {
      }
      console.log(data);

      // add markers to map
      // function addMarkers() {
        for (var i = 0; i < data.length; i++) {
          var latitude = data[i].latitude;
          var longitude = data[i].longitude;
          var tweet = data[i].tweet_text;
          var image = "Sick_Emoji.png";
          var latLng = new google.maps.LatLng(latitude, longitude);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: image
          });
          marker.setMap(map);
          attachSecretMessage(marker, tweet);
        }
      // }

      // find date groups
      var start = Date.now();
      var today = new Date(start);
      console.log(today);

      for (var j = 0; j < data.length; j++) {
        var date = new Date(data[j].tweet_date * 1000);
        var day = date.getDate();

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
      $( function() {
    $( "#slider" ).slider({
      range: "max",
      min: 0,
      max: 7,
      value: 3,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
      }
    });
    $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
  } );


    })
})

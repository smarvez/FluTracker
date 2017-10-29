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
      console.log(data[0].tweet_text);

      // add markers to map
        for (var i = 0; i < data.length; i++) {
          var latitude = data[i].latitude;
          var longitude = data[i].longitude;
          var tweet = data[i].tweet_text;
          // var coords = data[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(latitude, longitude);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
          });
          marker.setMap(map);
          attachSecretMessage(marker, tweet);
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


    })
})

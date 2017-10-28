$(document).ready(function() {
  console.log('this is working');

  var linkH = "https://g-flutrack.herokuapp.com/";
  var search = '?s=feverANDcoughORfever';
  var aggravated = '?a=TRUE';
  var resultsInLastNumDays = '?time=7';
  var newLink = linkH + resultsInLastNumDays;

  let $xhr = $.getJSON(newLink);

    $xhr.done(function(data) {

      if ($xhr.status !== 200) {
        console.log("THIS IS NOT WORKING");
      }
      console.log(data);
    })

    var latitude;
    var longitude;

    for (var i = 0; i < data.length; i++) {
      latitude 
    }
})

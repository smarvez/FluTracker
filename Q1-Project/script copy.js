$(document).ready(function() {
  console.log('this is working');

  let $xhr = $.getJSON("http://api.flutrack.org/?s=feverANDcoughORfever");

    $xhr.done(function(data) {

      if ($xhr.status !== 200) {
        return;
      }
      console.log(data);
    })
})

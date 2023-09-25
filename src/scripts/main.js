// jshint devel:true

// Decode params --
// Source : http://stackoverflow.com/questions/4292914/javascript-url-decode-function
function urldecode(str) {
  return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

// Get params --
// Source : http://stackoverflow.com/questions/10001726/access-get-variables-using-jquery-javascript
function getUrlVars()
{
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = urldecode(hash[1]);
  }
  return vars;
}

$(document).ready(function() {
  var params = getUrlVars();
  console.log(params);

  params['first'] = parseInt(params['first']);
  params['end'] = parseInt(params['end']);

  if(isNaN(params['first']) || isNaN(params['end'])) { // Display the form --
    console.log('Form');
  }
  else { // Display the result --
    console.log('Results');
    $('#form').hide();

    var container = $('#display');

    // Prepare keys' label --
    var keyLabels = {
      'exp':    'Expérience :',
      'person': 'Personne concernée :',
      'souche': 'Souche :',
      'gender': 'Sexe :',
      'age':    'Age :',
      'source': 'Provenance :',
      'number': 'Lot N° :',
      'ethics': 'N° Com. ETH :',
      'expend': 'Fin d\'expé :'
    };

    // Prepare gender --
    params['gender'] = params['gender'] == 1 ? 'M' : 'F';

    // For each label --
    for(var i = params['first']; i <= params['end']; i++) {
      var item = '<div class="item">';

      // For each info in the label --
      for (var key in params){
        if (isNaN(parseInt(key)) && key != 'first' && key != 'end') { // Textual --
          item += '<div class="row"><div class="key">'
            + keyLabels[key]
            + '</div><div class="value">'
            + params[key]
            + '</div></div>';
        }
      }

      // Number and end --
      item += '<div class="num">' + i + '</div>';
      item += '</div>';

      container.append(item);
    }
  }
});




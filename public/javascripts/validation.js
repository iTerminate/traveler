function isValid(form) {
  var disabled = $('input,textarea', form).first().prop('disabled');
  if (disabled) {
    $('input,textarea', form).prop('disabled', false);
  }
  var i = 0;
  var last_input_name = '';
  var input;
  for (i = 0; i < form.elements.length; i += 1) {
    input = form.elements[i];

    var input_name = input.name;
    if (input_name === last_input_name) {
      continue;
    }
    last_input_name = input_name;

    input = form.elements[i];
    if (!input.checkValidity()) {
      if (disabled) {
        $('input,textarea', form).prop('disabled', true);
      }
      return false;
    }
  }
  return true;
}

function markValidity(element) {
  if (element.checkValidity()) {
    $(element).removeClass('invalid');
  } else {
    $(element).addClass('invalid');
  }
}

function markFormValidity(form) {
  // set validity
  $('input:not([type="file"]),textarea', form).each(function () {
    var disabled = $(this).prop('disabled');
    if (disabled) {
      $(this).prop('disabled', false);
    }
    markValidity(this);
    if (disabled) {
      $(this).prop('disabled', true);
    }
  });
}

function validationMessage(form) {
  var disabled = $('input,textarea', form).first().prop('disabled');
  if (disabled) {
    $('input,textarea', form).prop('disabled', false);
  }
  var i = 0;
  var output = $('<div>');
  var p;
  var value;
  var input;
  var label;
  var span;
  var last_input_name = '';
  for (i = 0; i < form.elements.length; i += 1) {
    input = form.elements[i];

    var input_name = input.name;
    if (input_name === last_input_name) {
      continue;
    }
    last_input_name = input_name;

    input = form.elements[i];
    p = $('<p>');
    span = $('<span class="validation">');
    if (input.checkValidity()) {
      p.css('color', '#468847');
      span.css('color', '#468847');
    } else {
      p.css('color', '#b94a48');
      span.css('color', '#b94a48');
    }
    if (input.type === 'checkbox') {
      value = input.checked ? 'checked' : 'not checked';
    } else if (input.type === 'radio') {
      var radio_ittr = i;
      var ittr_input = input;
      value = '';
      while (ittr_input !== undefined && input_name === ittr_input.name) {
        if (value !== '') {
          value += ' / ';
        }
        if (ittr_input.checked) {
          value = ittr_input.value;
          break;
        }
        value += ittr_input.value;

        radio_ittr++;
        ittr_input = form.elements[radio_ittr];
      }
    } else if (input.value === '') {
      value = 'no input from user';
    } else {
      value = input.value;
    }
    label = $(input).closest('.control-group').children('.control-label').text();
    if (label === '' && input.type === 'checkbox') {
      label = $(input).next().text();
    }
    if (input.checkValidity()) {
      p.html('<b>' + label + '</b>: ' + value);
      span.text('validation passed');
    } else {
      p.html('<b>' + label + '</b>: ' + value + ' | Message: ' + input.validationMessage);
      span.text(input.validationMessage);
    }
    $(input).closest('.controls').append(span);
    output.append(p);
  }
  if (disabled) {
    $('input,textarea', form).prop('disabled', true);
  }
  return output.html();
}

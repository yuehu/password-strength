
function byStep(raw) {
  // e.g. 123456, abcde
  var delta = raw.charCodeAt(1) - raw.charCodeAt(0);
  for (var i = 0; i < raw.length-1; i++) {
    if (raw.charCodeAt(i+1) - raw.charCodeAt(i) !== delta) {
      return false;
    }
  }
  return true;
}

var ASDF = 'qwertyuiopasdfghjklzxcvbnm';

function isAsdf(raw) {
  return ~ASDF.indexOf(raw);
}

function strength(raw) {
  if (raw.length < 8) {
    return 'medium';
  }

  var types = 0;

  // lower case
  if (/[a-z]/.test(raw)) types += 1;

  // upper case
  if (/[A-Z]/.test(raw)) types += 1;

  // number
  if (/[0-9]/.test(raw)) types += 1;

  // marks
  if (/[^0-9a-zA-Z]/.test(raw)) types += 1;

  return types > 2 ? 'strong': 'medium';
}

function valid(raw) {
  if (raw.length < valid.length) {
    return {
      valid: false,
      strength: 'simple',
      hint: 'too short'
    };
  }

  if (~valid.words.indexOf(raw)) {
    return {
      valid: false,
      strength: 'simple',
      hint: 'simple word'
    };
  }

  if (byStep(raw) || isAsdf(raw)) {
    return {
      valid: false,
      strength: 'simple',
      hint: 'too simple'
    };
  }

  return {
    valid: true,
    strength: strength(raw),
    hint: null
  };
}

valid.length = 4;
valid.words = [];

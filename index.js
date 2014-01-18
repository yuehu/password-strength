/**
 * Password Strength
 *
 * Check if a password is trong enough.
 *
 * Copyright (c) 2014 by Hsiaoming Yang.
 */

/**
 * If the password is alphabet step by step.
 */
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

var ASDF = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

/**
 * If the password is in the order on keyboard.
 */
function isAsdf(raw) {
  var reverse = raw.split('').reverse().join('');
  var asdf = ASDF.join('');
  if (~asdf.indexOf(raw) || ~asdf.indexOf(reverse)) {
    return true;
  }
  asdf = ASDF.reverse().join('');
  if (~asdf.indexOf(raw) || ~asdf.indexOf(reverse)) {
    return true;
  }
  return false;
}

function strength(raw) {
  if (raw.length < 6) {
    return 'simple';
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

  if (raw.length < 8 && types === 1) {
    return 'simple';
  }

  return types > 2 ? 'strong': 'medium';
}

/**
 * Export interface.
 */
function valid(raw) {
  if (raw.length < valid.min) {
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

// min length of the password
valid.min = 4;
// password can't be these words
valid.words = [];

module.exports = valid;

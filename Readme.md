# password-strength

Check if a password is strong enough. Available on Node and Browser.

[![Build Status](https://travis-ci.org/yuehu/password-strength.png?branch=master)](https://travis-ci.org/yuehu/password-strength)

## Installation

Install with [component(1)](http://component.io):

    $ component install yuehu/password-strength

Install with npm:

    $ npm install password-strength

## API

```js
var valid = require('password-strength');
valid(password);
// -> {valid: true, strength: 'medium', hint: null}
```

### .min

The min length of the password, default is 4.

### .words

The password can't be these words, default is [].

## License

MIT

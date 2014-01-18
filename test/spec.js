describe('password-strength', function() {
  var valid = require('..');

  function assert(a, b) {
    if (a !== b) {
      throw new Error(a + ' not equal ' + b);
    }
  }

  it('is too short', function() {
    assert(valid('foo').hint, 'too short');
  });

  it('is too simple', function() {
    assert(valid('asdfg').hint, 'too simple');
    assert(valid('abcdef').hint, 'too simple');
    assert(valid('zlkjh').hint, 'too simple');
    assert(valid('gfdsa').hint, 'too simple');
  });

  it('is simple world', function() {
    valid.words = ['hello'];
    assert(valid('hello').hint, 'simple word');
  });

  it('is simple but valid', function() {
    assert(valid('boom').strength, 'simple');
    assert(valid('boom').valid, true);
  });

  it('is medium', function() {
    assert(valid('foobarbaz').strength, 'medium');
    assert(valid('bar.baz').strength, 'medium');
  });

  it('is strong', function() {
    assert(valid('bar.baz.Foo').strength, 'strong');
  });
});

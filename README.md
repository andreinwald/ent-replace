# Encode and decode HTML entities
Replacement for abandoned library [ent](https://www.npmjs.com/package/ent)

Without any dependencies and without using of punycode api.

## Replacement in other libraries dependency
Add to your package.json override:
```json
{
  "overrides": {
    "ent": "npm:ent-replace"
  }
}
```
and run
```shell
npm update
```

## Installation from scratch
```shell
npm i ent-replace
```

## Example
``` js
const ent = require('ent');
console.log(ent.encode('<span>©moo</span>'))
console.log(ent.decode('&pi; &amp; &rho;'));
```
```
&#60;span&#62;&#169;moo&#60;/span&#62;
π & ρ
```

### encode(str, opts={})
Escape unsafe characters in `str` with html entities.

By default, entities are encoded with numeric decimal codes.

If `opts.numeric` is false or `opts.named` is true, encoding will used named
codes like `&pi;`.

If `opts.special` is set to an Object, the key names will be forced
to be encoded (defaults to forcing: `<>'"&`). For example:

``` js
console.log(encode('hello', { special: { l: true } }));
```

```
he&#108;&#108;o
```

### decode(str)

Convert html entities in `str` back to raw text.



## Tests
All tests copied from original repository
```shell
vitest
```

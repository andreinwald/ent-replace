# Replacement for abandoned library ent
Without any dependencies and without using of punycode api.

# Replacement
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

# Documentation
See at original package https://www.npmjs.com/package/ent

# Tests
All tests copied from original repository
```shell
vitest
```

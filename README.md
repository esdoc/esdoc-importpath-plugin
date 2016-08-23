[![Build Status](https://travis-ci.org/esdoc/esdoc-importpath-plugin.svg?branch=master)](https://travis-ci.org/esdoc/esdoc-importpath-plugin)
[![Coverage Status](https://coveralls.io/repos/esdoc/esdoc-importpath-plugin/badge.svg)](https://coveralls.io/r/esdoc/esdoc-importpath-plugin)
[![Document](https://doc.esdoc.org/github.com/esdoc/esdoc-importpath-plugin/badge.svg)](https://doc.esdoc.org/github.com/esdoc/esdoc-importpath-plugin)

# ESDoc Import Path Plugin
This is a plugin that converts the import path in documentation.
ESDoc displays the import path of class/function into the document.
However, the import path may be different from real import path because usually ES6 is transpiled to use it.

For example, ``src/MyClass.js`` will be referred to as ``import MyClass from 'my-module/src/MyClass.js'`` in the documentation.
However, in practice it is different from the real import path when you use because it is transpiled
(for example, ``import MyClass from 'my-module/lib/MyClass.js'``).

Therefore, convert the import path by using following setting.

```json
{
  "source": "./src",
  "destination": "./doc",
  "plugins": [
    {
      "name": "esdoc-importpath-plugin",
      "option": {
        // setting the main ignores the replace
        "main": "my-import-override",
        "replaces": [
          {"from": "^src/", "to": "lib/"}
        ]
      }
    }
  ]
}
```

### main [string]

Prefer setting your project's `package.json` main property instead of using this override to better adhere to [npm docs's main spec](https://docs.npmjs.com/files/package.json#main).

**note:** Anytime main is set, the `option.replaces` transformation will be ignored. This includes either in esdoc-importpath-plugin's `option.main` or the package.json's `main` option.

### replaces [array]

Each item in the replaces should be an object consisting of `from` and `to` properties.

``from`` is regular expression and ``to``is letter. In the internal ``from`` and ``to`` are used with ``String#replace(new RegExp (from), to)``.

When writing multi rules, the `replaces` transformations will be executed in the exact order that is defined in the array.

For example, ``my-module/src/MyFooClass.js`` => `` my-module/lib/MyFooClass.js`` => ``my-module/lib/my-foo`` with the following config:
```json
// esdocs.json
{
  "source": "./src",
  "destination": "./doc",
  "plugins": [
    {
      "name": "esdoc-importpath-plugin",
      "option": {
        "main": "my-import-override",
        "replaces": [
          { from: "^src/", to: "lib/" },
          { from: "MyFooClass", to: "my-foo" }
        ]
      }
    }
  ]
}
```

# Setup

1. Install `esdoc-importpath-plugin`.
  ```sh
  $ npm install esdoc-importpath-plugin --save-dev
  ```
1. setup ``plugin`` property in ``esdoc.json``
  ```json
  {
    "source": "./src",
    "destination": "./doc",
    "plugins": [
      {
        "name": "esdoc-importpath-plugin",
        "option": {
          "replaces": [
            {"from": "^src/", "to": "lib"}
          ]
        }
      }
    ]
  }
  ```
1. Execute ESDoc
  ```sh
  $ esdoc -c esdoc.json
  ```

# LICENSE
MIT

# Author
[Ryo Maruyama@h13i32maru](https://twitter.com/h13i32maru)

[![Build Status](https://travis-ci.org/esdoc/esdoc-importpath-plugin.svg?branch=master)](https://travis-ci.org/esdoc/esdoc-importpath-plugin)
[![Coverage Status](https://coveralls.io/repos/esdoc/esdoc-importpath-plugin/badge.svg)](https://coveralls.io/r/esdoc/esdoc-importpath-plugin)
[![Document](https://doc.esdoc.org/github.com/esdoc/esdoc-importpath-plugin/badge.svg)](https://doc.esdoc.org/github.com/esdoc/esdoc-importpath-plugin)

# ESDoc Import Path Plugin
TODO

# Install and Usage
```sh
npm install -g esdoc-importpath-plugin
```

setup ``plugin`` property in ``esdoc.json``

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

execute ESDoc

```json
esdoc -c esdoc.json
```

# LICENSE
MIT

[Ryo Maruyama@h13i32maru](https://twitter.com/h13i32maru)

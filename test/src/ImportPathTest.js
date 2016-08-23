import fs from 'fs-extra';
import assert from 'power-assert';

import ESDoc from 'esdoc/out/src/ESDoc.js';
import defaultPublisher from 'esdoc/out/src/Publisher/publish.js';

/**
 * @test {onHandleTag}
 */
describe('Import Path', ()=> {
  let id = 0;
  function generateDocs(config, assertion) {
    id += 1;
    config.source = "./test/fixture/src";
    config.destination = `./test/fixture/esdoc_${ id }`
    ESDoc.generate(config, defaultPublisher);
    return fs.readFileSync(config.destination + '/class/src/FooClass.js~FooClass.html').toString();
  }

  it('should show only path to file', ()=> {
    const html = generateDocs({
      "package": {
        "name": "esdoc-importpath-plugin"
      },
      "plugins": [
        {
          "name": "./src/Plugin.js",
          "option": {
            "appendPackageName": false,
          }
        }
      ]
    });
    assert(html.includes('>src/FooClass.js<'));
  });

  it('should append package name', ()=> {
    const html = generateDocs({
      "package": {
        "name": "esdoc-importpath-plugin"
      },
      "plugins": [
        {
          "name": "./src/Plugin.js",
          "option": {
            "appendPackageName": true,
          }
        }
      ]
    });
    assert(html.includes('>esdoc-importpath-plugin/src/FooClass.js<'));
  });

  it('should convert using custom replacement string', ()=> {
    const html = generateDocs({
      "package": {
        "name": "MyPackageName"
      },
      "plugins": [
        {
          "name": "./src/Plugin.js",
          "option": {
            "replaces": "esdoc-importpath-plugin",
          }
        }
      ]
    });
    assert(html.includes('>esdoc-importpath-plugin<'));
  });

  it('should convert using custom replacement array', ()=> {
    const html = generateDocs({
      "package": {
        "name": "esdoc-importpath-plugin"
      },
      "plugins": [
        {
          "name": "./src/Plugin.js",
          "option": {
            "appendPackageName": true,
            "replaces": [
              {"from": "^src/", "to": "lib/"},
              {"from": "^lib/FooClass.js", "to": "lib/foo"}
            ]
          }
        }
      ]
    });
    assert(html.includes('>esdoc-importpath-plugin/lib/foo<'));
  });

  it('should convert using package property name', ()=> {
    const html = generateDocs({
      "package": {
        "name": "esdoc-importpath-plugin",
        "main": "MyPackageMain"
      },
      "plugins": [
        {
          "name": "./src/Plugin.js",
          "option": {
            packageProp: "name",
            // ignores these replacements
            "replaces": [
              {"from": "^src/", "to": "lib/"},
            ]
          }
        }
      ]
    });
    assert(html.includes('>esdoc-importpath-plugin<'));
  });

  it('should convert using package main property', ()=>{
    const html = generateDocs({
      "package": {
        "name": "MyPackageName",
        "main": "esdoc-importpath-plugin"
      },
      "plugins": [
        {
          "name": "./src/Plugin.js",
          "option": {
            packageProp: "main",
            // ignores these replacements
            "replaces": [
              {"from": "^src/", "to": "lib/"},
            ]
          }
        }
      ]
    });
    assert(html.includes('>esdoc-importpath-plugin<'));
  });
});

import fs from 'fs-extra';
import assert from 'power-assert';

import ESDoc from 'esdoc/out/src/ESDoc.js';
import defaultPublisher from 'esdoc/out/src/Publisher/publish.js';

/**
 * @test {onHandleTag}
 */
describe('Import Path', ()=> {
  function assertPath(config, assertion) {
    ESDoc.generate(config, defaultPublisher);
    const html = fs.readFileSync(config.destination + '/class/src/FooClass.js~FooClass.html').toString();
    assert(html.includes(assertion));
  }

  it('should convert using package name only', ()=> {
    assertPath({
      "source": "./test/fixture/src",
      "destination": "./test/fixture/esdoc1",
      "package": {
        "name": "esdoc-importpath-plugin"
      }
    }, '>esdoc-importpath-plugin/src/FooClass.js<');
  });

  it('should convert using custom replacement', ()=> {
    assertPath({
      "source": "./test/fixture/src",
      "destination": "./test/fixture/esdoc2",
      "package": {
        "name": "esdoc-importpath-plugin"
      },
      "plugins": [
        {
          "name": "./src/Plugin.js",
          "option": {
            "replaces": [
              {"from": "^src/", "to": "lib/"},
              {"from": "^lib/FooClass.js", "to": "lib/foo"}
            ]
          }
        }
      ]
    }, '>esdoc-importpath-plugin/lib/foo<');
  });

  it('should convert using custom main', ()=> {
    assertPath({
      "source": "./test/fixture/src",
      "destination": "./test/fixture/esdoc3",
      "package": {
        "name": "MyPackageName"
      },
      "plugins": [
        {
          "name": "./src/Plugin.js",
          "option": {
            "main": "esdoc-importpath-plugin",
            // ignores these replacements
            "replaces": [
              {"from": "^src/", "to": "lib/"},
            ]
          }
        }
      ]
    }, '>esdoc-importpath-plugin<');
  });

  it('should convert using package main property', ()=>{
    assertPath({
      "source": "./test/fixture/src",
      "destination": "./test/fixture/esdoc4",
      "package": {
        "name": "MyPackageName",
        "main": "esdoc-importpath-plugin"
      },
      "plugins": [
        {
          "name": "./src/Plugin.js",
          "option": {
            // ignores these replacements
            "replaces": [
              {"from": "^src/", "to": "lib/"},
            ]
          }
        }
      ]
    }, '>esdoc-importpath-plugin<');
  });
});

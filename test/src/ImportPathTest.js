import fs from 'fs-extra';
import assert from 'assert';

/**
 * @test {onHandleTag}
 */
describe('Import Path', ()=> {
  it('simply convert', ()=> {
    const html = fs.readFileSync('./test/fixture/esdoc/class/src/MyClass.js~MyClass.html').toString();
    assert(html.includes('>esdoc-importpath-plugin/lib/MyClass.js<'));
  });

  it('multiple convert', ()=>{
    const html = fs.readFileSync('./test/fixture/esdoc/class/src/FooClass.js~FooClass.html').toString();
    assert(html.includes('>esdoc-importpath-plugin/lib/foo<'));
  });

  it('package name convert', ()=>{
    const html = fs.readFileSync('./test/fixture/esdoc/class/src/Index.js~Index.html').toString();
    assert(html.includes('>esdoc-importpath-plugin<'));
  });
});

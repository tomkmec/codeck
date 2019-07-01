import { LayoutEngine } from './DefaultLayoutEngine.js'
import { ElementRegister } from './ElementRegister.js'

import { Compiler } from './Compiler.js'

describe('Compiler', () => {
  test('compile', () => {
    const compiler = new Compiler({
      layoutEngine: new LayoutEngine(),
      elementRegister: new ElementRegister(),
      theme: null //TODO      
    });

    const runtime = compiler.compile({title: "title"});
    //TODO
    // expect(runtime.metadata.title).toBe("title")
    // expect(runtime.pageCount).toBe(0)
  });
});
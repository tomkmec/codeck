import { LayoutEngine } from './DefaultLayoutEngine.js'
import { ElementRegister } from './ElementRegister.js'

import { Compiler } from './Compiler.js'

import { DebugRenderer } from './DebugRenderer.js'

describe('Compiler', () => {
  test('compile', () => {
    const compiler = new Compiler(
      new LayoutEngine(), 
      new ElementRegister(),
      {} // TODO
      );

    const runtime = compiler.compile({
      title: "title", 
      pages: [
        {layout: "title/text", title: "Hello World", text: "Hi!"},
      ]
    });
    expect(runtime.metadata.title).toBe("title")
    expect(runtime.pages.length).toBe(1)
    expect(runtime.pages[0].elements.length).toBe(2)
    expect(runtime.pages[0].elements[0].type).toBe("title")
    expect(runtime.pages[0].elements[0].content).toBe("Hello World")

    //TODO standalone test. integration and unit
    new DebugRenderer().render(runtime, 0, [800,600])
  });

});
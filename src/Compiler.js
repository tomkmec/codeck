class Compiler {
  constructor(layoutEngine, elementRegister, theme) {
    this.layoutEngine = layoutEngine;
    this.elementRegister = elementRegister;
    this.theme = theme;
  }

  compile(source, runtime = {metadata:{}}) {
    ['title', 'authors', 'style']
      .forEach(prop => runtime.metadata[prop] = source[prop]);

    runtime.pages = source.pages
      .map(page => this.layoutEngine.parsePageLayout(page));

    runtime.pages.forEach(page => {
      page.elements.forEach(element => {
        const et = this.elementRegister.get(element.type);
        if (et.content) {
          element.node.setFlexGrow(1)
          element.node.getParent().setFlexGrow(1)
        }
      })
    })

    return runtime;
  }
}


export { Compiler }
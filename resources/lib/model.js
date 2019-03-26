class Presentation {
  constructor(model) {
    this.model = model;
    parse(model)
  }

  parse(model) {
    this.title = model.title;
    this.authors = model.authors;
    this.style = model.style;

    this.theme = loadTheme(model.theme || "basic");
    this.pages = model.pages.map((model) => new Page(model));
  }

  loadTheme(name) {
    console.log("TODO Themes");
  }
}

class Page {
  constructor(model) {
    this.model = model;
    parse(model)
  }

  parse(model) {
    const layoutDef = parseLayoutDef(model.layout);
  }

  parseLayoutDef(def) {
    const typecounter = {};
    const regex = /([a-zA-Z]+)(\d*)/;
    return def.split('-').map((rowDef) => {
      const cols = rowDef.split('/');
      return cols.map((colDef) => {
        const match = def.exec(colDef);
        const type = match[1];
        const width = isNaN(match[2]) ? 0 : parseFloat(match[2]) / 100.0; //TODO compute missing widths
        typecounter[match[1]] = isNaN(typecounter[match[1]]) ? 0 : typecounter[match[1]] + 1;
        return {
          type: type,
          index: typecounter[type],
          width: width
        }
      }
    })
  }
}

export {Presentation, Page}
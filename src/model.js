class Presentation {
  constructor(model = {}) {
    this.model = model;
    this.parse(model)
  }

  parse(model) {
    this.title = model.title;
    this.authors = model.authors;
    this.style = model.style;

    this.theme = this.loadTheme(model.theme || "basic");
    this.pages = (model.pages || []).map((model) => new Page(model));
  }

  loadTheme(name) {
    console.log("TODO Themes");
  }
}

class Page {
  constructor(model = {}) {
    this.model = model;
    this.parse(model)
  }

  parse(model) {
    const layoutDef = this.parseLayoutDef(model.layout);
  }

  parseLayoutDef(def) {
    const typecounter = {};
    const regex = /([a-zA-Z]+)(\d*)/;
    return (def || '').split('-').map((rowDef) => {
      const cols = rowDef.split('/');
      return cols.map((colDef) => {
        const match = regex.exec(colDef.trim());
        const type = match ? match[1] : "text";
        const width = (match == null || isNaN(match[2])) ? 0 : parseFloat(match[2]) / 100.0; //TODO compute missing widths
        typecounter[type] = isNaN(typecounter[type]) ? 0 : typecounter[type] + 1;
        return {
          type: type,
          index: typecounter[type],
          width: width
        }
      })
    })
  }
}

export {Presentation, Page}
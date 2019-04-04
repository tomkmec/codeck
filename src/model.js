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
    this.layoutDefinition = this.parseLayoutDef(this.model.layout);
  }

  parseLayoutDef(def) {
    const typecounter = new Map();
    const regex = /([a-zA-Z]+)(\d*)/;
    const rows = (def || '').split('/').map((rowDef) => {
      const colDefs = rowDef.split('-');
      const cols = colDefs.map((colDef) => {
        const match = regex.exec(colDef.trim());
        const type = match ? match[1] : "text";
        const width = (match == null || isNaN(match[2]) || match[2] == '') ? 0 : parseFloat(match[2]) / 100.0;
        typecounter.set(type, isNaN(typecounter.get(type)) ? 0 : typecounter.get(type) + 1);
        return {
          type: type,
          index: typecounter.get(type),
          width: width
        }
      })
      
      const noWidth = cols.filter((c) => c.width == 0);
      if (noWidth.length > 0) {
        const remainingWidth = Math.max(0, 1 - cols.reduce((total, col) => total + col.width, 0))
        noWidth.forEach(col => {col.width = remainingWidth / noWidth.length});
      }

      return cols;
    });

    rows.forEach(row => row.forEach(element => {
      element.getContent = (typecounter[element.type] === 0)
        ? (pageDef) => pageDef.type
        : (pageDef) => pageDef.type[element.index]
    }));

    return rows;
  }
}

export {Presentation, Page}
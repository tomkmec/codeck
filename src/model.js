class Presentation {
  //TODO kill
  constructor(layoutEngine, source = {}) {
    this.source = source;

    this.title = source.title;
    this.authors = source.authors;
    this.style = source.style;

    this.theme = this.loadTheme(source.theme || "basic");
    this.pages = (source.pages || []).map((pageSource) => new Page(pageSource, layoutEngine));
  }

  loadTheme(name) {
    console.log("TODO Themes");
  }
}

class Page {
  constructor(source = {}, layoutEngine = new LayoutEngine()) {
    layoutEngine.parseLayout(source);
  }

}

export {Presentation, Page}
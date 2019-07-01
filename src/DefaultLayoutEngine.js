import yoga, {Node} from 'yoga-layout-prebuilt';

class LayoutEngine {

  parseLayout(page = {layout:''}) {
    const rows = this.parseLayoutDef(page.layout || this.inferLayout(page)) 

    const rootNode = Node.create();
    rootNode.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN)

    const result = {
      rootNode: rootNode,
      elements: []
    };

    rows.forEach((row, i) => {
      const rowNode = Node.create();
      rowNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW)
      rootNode.insertChild(rowNode, i);
      row.forEach((element, j) => {
        const cellNode = Node.create();
        rowNode.insertChild(cellNode, j);
        cellNode.setWidthPercent(100.0 * element.width)
        result.elements.push({
          node: cellNode,
          type: element.type,
          content: element.getContent(page)
        })
      })
    })

    return result;
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
        ? (pageDef) => pageDef[element.type]
        : (pageDef) => pageDef[element.type][element.index]
    }));
    return rows;
  }

  inferLayout(page) {
    //TODO default layouts based on content
  }
}

export { LayoutEngine }
import yoga, {Node} from 'yoga-layout-prebuilt';

class DebugRenderer {
  render(runtime, pageNumber, viewPort) {
    runtime.pages[pageNumber].rootNode
      .calculateLayout(viewPort[0], viewPort[1], yoga.DIRECTION_LTR)
    logLayout(runtime.pages, runtime.pages[pageNumber].rootNode);
  }
}

function logLayout(pages, node, depth = 0) {
  console.log(
    "  ".repeat(depth),
    (pages.find(p => p.node === node) || {type:"-"}).type,
    node.getComputedLayout()
  )

  for (var i = 0; i < node.getChildCount(); i++) {
    logLayout(pages, node.getChild(i), depth+1)
  }
}

export { DebugRenderer }
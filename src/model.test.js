import * as model from './model.js'

describe('Page.parseLayoutDef', () => {
  const page = new model.Page();
  test.each([null, '', ' '])('empty layout', (val) => {
    const result = page.parseLayoutDef(val);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(1);
    expect(result[0][0]).toMatchObject({
      type : 'text',
      index : 0
    });
  });

  test.each(['element', 'element50', ' element100 '])('single layout element', (val) => {
    const result = page.parseLayoutDef(val);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(1);
    expect(page.parseLayoutDef('element')[0][0]).toMatchObject({
      type : 'element',
      index : 0,
      width: 1
    });
  });
})


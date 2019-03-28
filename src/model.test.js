import * as model from './model.js'

describe('Page.parseLayoutDef', () => {
  const page = new model.Page();

  test.each([null, '', ' '])('empty layout', (val) => {
    const result = page.parseLayoutDef(val);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(1);
    expect(result[0][0]).toMatchObject({
      type : 'text',
      index : 0,
      width : 1
    });
  });

  test.each(['element', ' element100 '])('single layout element', (val) => {
    const result = page.parseLayoutDef(val);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(1);
    expect(result[0][0]).toMatchObject({
      type : 'element',
      index : 0,
      width : 1
    });
  });

  test.each(['element / element100', 'element/element'])('two-rows layout', (val) => {
    const result = page.parseLayoutDef(val);
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveLength(1);
    expect(result[1]).toHaveLength(1);
    expect(result[0][0]).toMatchObject({
      type : 'element',
      index : 0,
      width : 1
    });
    expect(result[1][0]).toMatchObject({
      type : 'element',
      index : 1,
      width : 1
    });
  });

  test('one-row, two-cols layout', () => {
    const result = page.parseLayoutDef('element-another');
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(2);
    expect(result[0][0]).toMatchObject({
      type : 'element',
      index : 0,
      width : 0.5
    });
    expect(result[0][1]).toMatchObject({
      type : 'another',
      index : 0,
      width : 0.5
    });
  });

  test('complex layout', () => {
    const result = page.parseLayoutDef('element/element20-another/x-y-x20');
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveLength(1);
    expect(result[1]).toHaveLength(2);
    expect(result[2]).toHaveLength(3);
    expect(result[0][0]).toMatchObject({
      type : 'element',
      index : 0,
      width : 1
    });
    expect(result[1][0]).toMatchObject({
      type : 'element',
      index : 1,
      width : 0.2
    });
    expect(result[1][1]).toMatchObject({
      type : 'another',
      index : 0,
      width : 0.8
    });
    expect(result[2][0]).toMatchObject({
      type : 'x',
      index : 0,
      width : 0.4
    });
    expect(result[2][1]).toMatchObject({
      type : 'y',
      index : 0,
      width : 0.4
    });
    expect(result[2][2]).toMatchObject({
      type : 'x',
      index : 1,
      width : 0.2
    });
  });


})


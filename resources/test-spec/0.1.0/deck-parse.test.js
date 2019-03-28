import {Parser} from '../../../src/parser.js';
import * as model from '../../../src/model.js';
import * as fs from 'fs';

describe('0.1.0/deck', () => {
  const source = fs.readFileSync('./resources/test-spec/0.1.0/deck.yaml', 'utf8');

  test('parse', () => {
    const deck = new model.Presentation(Parser.yaml(source));
    expect(deck.title).toBe("Scope for 0.1.0");
    expect(deck.pages[2].layout[1][1]).toMatchObject({
      type : 'text',
      index : 1,
      width : 0.7
    });
  });
});
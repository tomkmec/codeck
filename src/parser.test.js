import {Parser} from './parser.js';

test('Parser.yaml', () => {
	expect(Parser.yaml("- a")).toHaveLength(1);
});

import * as jsYaml from 'js-yaml';

const Parser = {
	yaml: function(yaml) {
		return jsYaml.safeLoad(yaml);
	}
}

export {Parser}
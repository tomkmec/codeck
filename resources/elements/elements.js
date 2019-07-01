//TODO just a concept

let remarkable = require('remarkable');
let md = new remarkable();

const text = {
	content: true,
	renderContent: function(element) {
		return md.render(element) //TODO where is content
	}
}

const title = {
	content: false,
	renderContent: function(element) {
		return md.render(element)
	}
}

const subtitle = {
	content: false,
	renderContent: function(element) {
		return md.render(element)
	}
}

export { text, title, subtitle }
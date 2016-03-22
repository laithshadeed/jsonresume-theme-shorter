var fs = require("fs");
var moment = require("moment");
var Handlebars = require("handlebars");

function render(resume) {
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var template = fs.readFileSync(__dirname + "/resume.template", "utf-8");

	// Nicer dates
	Handlebars.registerHelper('date', function(date) {
    return moment(date).format('MMM YYYY');
	});

  Handlebars.registerHelper('spaceToDash', function(str) {
    return str.replace(/\s/g, '-').toLowerCase();
  });

  Handlebars.registerHelper('base64decode', function(str) {
    return (new Buffer(str, 'base64')).toString('utf8');
  });

	return Handlebars.compile(template)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};

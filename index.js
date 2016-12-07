const fs = require('fs');
const path = require('path');
const moment = require('moment');
const Handlebars = require('handlebars');

function render(resume) {
  let css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf-8');
  let template = fs.readFileSync(path.join(__dirname, 'resume.template'), 'utf-8');

  // Nicer dates
  Handlebars.registerHelper('date', function(date) {
    return moment(date).format('YYYY');
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

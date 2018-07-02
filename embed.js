const fs = require('fs');
const bundle = fs.readFileSync('dist/bundle.js');
const index = fs.readFileSync('dist/index.html');
const result = index.toString().replace('<script type="text/javascript" src="/bundle.js"></script>',
  '<script>' + bundle.toString() + '</script>');
fs.writeFileSync('dist/index-embedded.html', result);
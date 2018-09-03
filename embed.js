const fs = require('fs');
// embed the bundle file
const bundle = fs.readFileSync('dist/bundle.js');
const index = fs.readFileSync('dist/index.html');
let result = index.toString().replace('<script type="text/javascript" src="/bundle.js"></script>',
  '<script>' + bundle.toString() + '</script>');
// embed the favicon
const favicon = fs.readFileSync('dist/favicon.png');
result = result.toString().replace('<link rel="shortcut icon" href="/favicon.png">',
  '<link rel="shortcut icon" href="data:image/png;base64,' + favicon.toString('base64') + '">');
fs.writeFileSync('dist/index-embedded.html', result);

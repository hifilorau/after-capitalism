const path = require('path')

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
    $red-color:#E22126;
    $blue-color: #68BFD0;
    `
  }
}

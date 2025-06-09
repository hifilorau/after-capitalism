const path = require('path')

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
    $red-color:#E22126;
    $blue-color: #68BFD0;
    `
  },
  images: {
    domains: [
      'api.imaginingaftercapitalism.com',
      'i0.wp.com',
      'i1.wp.com',
      'i2.wp.com',
      'i3.wp.com',
      'secure.gravatar.com'
    ]
  }
}

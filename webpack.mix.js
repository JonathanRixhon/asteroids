// webpack.mix.js
let mix = require('laravel-mix')
mix.setPublicPath('dist')
mix.js('src/js/app.js', 'js').sass('src/scss/main.scss', 'css')
mix.copy('src/index.html', 'dist/index.html')

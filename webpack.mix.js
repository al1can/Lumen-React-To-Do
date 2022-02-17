let mix = require('laravel-mix');

//mix.js('resources/js/app.js', 'public/js')
//.react('resources/js/app.jsx', 'public/js/components');

mix.js('resources/js/app.js', 'public/js')
   .react();

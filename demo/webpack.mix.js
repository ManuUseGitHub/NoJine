const mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');


// relative path to css folder
const css = 'public/assets/css';


if(process.env.NODE_ENV != 'production'){
    mix
    // auto reloading of the page
    .browserSync('localhost/mixouterlaravel')


    /*____________________________
     |                            |
     |            CSS's           |
     |____________________________|*/

    // copying the stylus file from the demo to the dev folder
    // assuming that the end developper will have his/her favorite
    // framework, the dev should only provide a simple copy of the stylus file
    .copy('resources/assets/styl/style2.styl', '../dev/styl/style.styl')

    // compiling the stylus file to generate the end css (stored in public folder)
    .stylus('resources/assets/styl/style2.styl',css,{
        use: [
            require('rupture')()
        ]
    })

    // then we copy result to the dist folder not minified 
    .copy(css+'/style2.css', '../dev/css/style.css')


    // PostCss (demo only)
    .options({
        autoprefixer: {
            options: {
                browsers: [ 'last 6 versions']
            }
        }
    })

    /*____________________________
     |                            |
     |         JavaScript's       |
     |____________________________|*/

    // we provide a plan javascript so it is universal
    // note : using .js('file','dest') create modules limited to bundles
    // provided by WebPack
    .scripts(
        'public/assets/js/notif_engine.js', 
        '../dev/js/notif_engine.js'
    )


    /*____________________________
     |                            |
     |    Pages and components    |
     |         (demo only)        |
     |____________________________|*/

    .vue('resources/Vue/Vue-apps/v-app.vue','public/assets/js/components')
    .pug('public/*.pug','',{
        ext: '.html',
        pug: {
            pretty: true,
            debug: false
        }
    });    
}

else{
    mix
        .scripts(
            'public/assets/js/notif_engine.js',
            '../dist/js/notif_engine.min.js'
        )
        .styles('public/assets/css/style2.css', '../dist/css/style.min.css')


        // PostCss (demo only)
        .options({
            autoprefixer: {
                options: {
                    browsers: [ 'last 6 versions']
                }
            }
        })
}

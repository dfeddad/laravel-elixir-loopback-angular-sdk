var gulp = require('gulp');
var Elixir = require('laravel-elixir');
var loopbackAngular = require('gulp-loopback-sdk-angular');
var path = require('path');

var $ = Elixir.Plugins;
var config = Elixir.config;

var defaults = {
    loopBackApp: './server/server.js',

    outputFolder: config.get('public.js.outputFolder'),

    outputFile: 'lb-services.js',

    options: {
        ngModuleName: 'lbServices',
        apiUrl: '/api'
    },

    source: './common/models/*.+(js|json)'
};

/*
 |----------------------------------------------------------------
 | LoopBack AngularJS SDK Generation Task
 |----------------------------------------------------------------
 |
 | This task will auto-generate Angular $resource services for
 | LoopBack.
 |
 */

Elixir.extend('lbServices', function (output, options) {
    config.js.lbServices = Object.assign({}, defaults, config.js.lbServices);

    var paths = prepGulpPaths(output);

    new Elixir.Task('lbServices', function () {
        return gulp.src(config.js.lbServices.loopBackApp)
            .pipe(loopbackAngular(Object.assign({}, config.js.lbServices.options, options)))
            .pipe($.rename(paths.outputFile))
            .pipe(gulp.dest(paths.outputFolder))
            .pipe(new Elixir.Notification('LoopBack Angular SDK Generation Completed!'));
    })
    .watch(config.js.lbServices.source);
});

/**
 * Prep the Gulp output path.
 *
 * @param  {string|undefined}  output
 * @return {object}
 */
var prepGulpPaths = function prepGulpPaths(output) {
    var outputFolder = config.js.lbServices.outputFolder;
    var outputFile = config.js.lbServices.outputFile;

    if (output !== undefined && output !== null) {
        var destFolder = path.dirname(output);
        outputFolder = destFolder !== '.' ? destFolder : outputFolder;
        outputFile = path.basename(output);
    }

    return {
        outputFolder: outputFolder,
        outputFile: outputFile
    };
};

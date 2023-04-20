/*!
 * WPCover Theme Gruntfile
 *
 */

module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function(string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\'Theme\\\'s JavaScript requires jQuery\') }\n\n',
        clean: {
            dist: ['<%= pkg.jsoutput %>', '<%= pkg.cssoutput %>']
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded', // compressed
                    compass: false,
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'assets/scss',
                    src: ['*.scss'],
                    dest: '<%= pkg.cssoutput %>/',
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                // https://github.com/nDmitry/grunt-postcss
                map: false, // inline sourcemaps
                // syntax: require('postcss-scss'),
                processors: [
                    require('pixrem'), // add fallbacks for rem units
                    require('autoprefixer')(), // add vendor prefixes
                    require('cssnano') // minify the result
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.cssoutput %>/',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= pkg.cssdest %>/',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            options: {
                banner: '<%= jqueryCheck %>',
                stripBanners: false
            },
            theme: {
                src: [
                    'assets/js-dev/app.js',
                ],
                dest: '<%= pkg.jsoutput %>/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                preserveComments: false,
                sourceMap: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            theme: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.jsoutput %>',
                    src: '**/*.js',
                    dest: '<%= pkg.jsdest %>',
                    ext: '.min.js'
                }]
            }
        }

    });

    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    grunt.loadNpmTasks('@lodder/grunt-postcss');

    // JS distribution task.
    grunt.registerTask('dist-js', ['concat', 'uglify']);

    // CSS distribution task.
    grunt.registerTask('dist-css', ['sass', 'postcss']);

    grunt.registerTask('dist', ['clean', 'dist-js', 'dist-css']);
    grunt.registerTask('default', ['dist']);
};
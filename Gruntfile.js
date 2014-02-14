module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            main: {
                src: [
                    'js/libs/jquery-2.0.2.min.js',
                    'js/libs/bootstrap.min.js',
                    'js/libs/jquery.scrollTo.js',
                    'js/libs/jquery.nav.js',
                    'js/libs/jquery.easypiechart.min.js',
                    'js/libs/jquery.vegas.min.js',
                    'js/libs/waypoints.min.js',
                    'js/libs/jquery.isotope.min.js',
                    'js/libs/jquery.magnific-popup.min.js',
                    'js/src/main.js',
                ],
                dest: 'js/build/site.min.js',
            },
            fallback: {
                src: [
                    'js/libs/jquery-1.10.1.min.js',
                    'js/libs/html5-shiv.js',
                    'js/libs/bootstrap.min.js',
                    'js/libs/jquery.scrollTo.js',
                    'js/libs/jquery.nav.js',
                    'js/libs/jquery.easypiechart.min.js',
                    'js/libs/jquery.vegas.min.js',
                    'js/libs/waypoints.min.js',
                    'js/libs/jquery.isotope.min.js',
                    'js/libs/jquery.magnific-popup.min.js',
                    'js/src/main.js',
                ],
                dest: 'js/build/site_fallback.min.js',
            }
        },

        uglify: {
            options: {
                report: 'min',
                banner: '/*! <%= pkg.name %> - © Chris Edson <%= grunt.template.today("dd-mm-yyyy") %> */\n',
            },
            main: {
                src: 'js/build/site.min.js',
                dest: 'js/build/site.min.js',
            },
            fallback: {
                src: 'js/build/site_fallback.min.js',
                dest: 'js/build/site_fallback.min.js',
            },
        },

        sass: {
            dev: {
                files: {
                    'css/build/site.min.css': 'css/src/main.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/build/site.min.css': 'css/src/main.scss'
                }
            }
        },

        connect: {
            server: {
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['js/src/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['css/src/*.scss'],
                tasks: ['sass:dev'],
                options: {
                    spawn: false,
                }
            },
        },

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'sass:dev']);

    grunt.registerTask('dev', ['concat', 'sass:dev']);

    grunt.registerTask('prod', ['concat', 'uglify', 'sass:prod']);

};

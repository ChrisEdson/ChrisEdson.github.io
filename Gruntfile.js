module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            main: {
                src: [
                    'js/libs/jquery-2.1.0.js',
                    'js/libs/bootstrap.js',
                    'js/libs/jquery.scrollTo.js',
                    'js/libs/jquery.nav.js',
                    'js/libs/jquery.easypiechart.js',
                    'js/libs/waypoints.js',
                    'js/libs/jquery.magnific-popup.js',
                    'js/src/main.js',
                ],
                dest: 'js/build/site.min.js',
            },
            fallback: {
                src: [
                    'js/libs/jquery-1.11.0.js',
                    'js/libs/html5shiv.js',
                    'js/libs/bootstrap.js',
                    'js/libs/jquery.scrollTo.js',
                    'js/libs/jquery.nav.js',
                    'js/libs/jquery.easypiechart.js',
                    'js/libs/waypoints.js',
                    'js/libs/jquery.magnific-popup.js',
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
            main: {
                files: {
                    'css/build/site.min.css': 'css/src/main.scss'
                }
            }
        },

        cssmin: {
            main: {
                options: {
                    banner: '/*! <%= pkg.name %> - © Chris Edson <%= grunt.template.today("dd-mm-yyyy") %> */',
                    keepSpecialComments: 0
                },
                files: {
                    'css/build/site.min.css': 'css/build/site.min.css'
                }
            }
        },

        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 5000
                }
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
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
        },

        concurrent: {
            tasks: ['connect', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-sass');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-concurrent');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'sass']);

    grunt.registerTask('dev', ['concat', 'sass', 'concurrent']);

    grunt.registerTask('prod', ['concat', 'uglify', 'sass', 'cssmin']);

};

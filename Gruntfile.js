'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var hbs = require('component-builder-handlebars');

    grunt.initConfig({

        config: grunt.file.readJSON('component.json'),

        componentbuild: {
            build: {
                options: {
                    name: 'build',
                    verbose: true,
                    standalone: true,
                    configure: function (builder) {
                        builder.use(hbs({
                            extname: '.hbs',
                            partialRegex: /^_/
                        }));
                    }
                },
                src: '.',
                dest: './build'
            }
        },

        clean: [
            './build',
            './components'
        ],

        watch: {
            files: [
                'scripts/*.js',
                '*.css',
                '*.hbs'
            ],
            tasks: [
                'default'
            ]
        },

        shell: {
            dist: {
                options: {
                    stdout: false
                },
                command: './node_modules/component/bin/component install -d'
            }
        },

        uglify: {
            files: {
                'dist/<%= config.name %>.min.js': ['build/build.js']
            }
        },

        jshint: {
            src: ['scripts/*.js']
        }

    });

    grunt.registerTask('dist', [
        'clean',
        'jshint',
        'shell:dist',
        'componentbuild:build',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'clean',
        'shell:dist',
        'componentbuild:build',
        'watch'
    ]);

};

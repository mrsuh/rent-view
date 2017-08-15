module.exports = function (grunt) {

    grunt.initConfig({
        less: {
            main: {
                files: {'web/style/style.css': 'web/style/style.less'},
                options: {
                    compress: true
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/view/src', src: '**', dest: 'src/view/dist/'}
                ]
            }
        },
        'string-replace': {
            dict: {
                files: {
                    'src/view/dist/': 'src/view/dist/**'
                },
                options: {
                    replacements: [
                        {
                            pattern: /\?v\d+/ig,
                            replacement: '?v' + (new Date()).getTime()
                        },
                        {
                            pattern: '{{version}}',
                            replacement: 'v1.0.5'
                        }
                    ]
                }
            },
            footer: {
                files: {
                    'src/view/dist/': 'src/view/dist/**'
                },
                options: {
                    replacements: [
                        {
                            pattern: /<!-- @import (.*?) -->/ig,
                            replacement: function (match, p1) {
                                return grunt.file.read(p1);
                            }
                        }
                    ]
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'web/js/common.min.js': [
                        'web/js/ajax.js',
                        'web/js/class.js',
                        'web/js/collapse.js',
                        'web/js/full_screen.js',
                        'web/js/preview.js',
                        'web/js/slider.js',
                        'web/js/subway/map.js',
                        'web/js/subway/list.js',
                        'web/js/subway/list_check.js',
                        'web/js/subway/search.js',
                        'web/js/subway/station.js',
                        'web/js/url.js'
                    ],
                    'web/js/main.min.js': ['web/js/main.js'],
                    'web/js/page.min.js': ['web/js/page.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['copy', 'less', 'string-replace', 'uglify']);
};
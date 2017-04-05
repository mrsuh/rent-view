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
                    {src: 'src/view/src/main/index.html', dest: 'src/view/dist/main/index.html'},
                    {src: 'src/view/src/page/index.html', dest: 'src/view/dist/page/index.html'},
                    {src: 'src/view/src/about/index.html', dest: 'src/view/dist/about/index.html'},
                    {src: 'src/view/src/sitemap/index.html', dest: 'src/view/dist/sitemap/index.html'},
                    {src: 'src/view/src/statistic/index.html', dest: 'src/view/dist/statistic/index.html'},
                    {src: 'src/view/src/layout/footer.html', dest: 'src/view/dist/layout/footer.html'},
                    {src: 'src/view/src/layout/header.html', dest: 'src/view/dist/layout/header.html'},
                    {src: 'src/view/src/layout/metrika.html', dest: 'src/view/dist/layout/metrika.html'},
                    {src: 'src/view/src/layout/map.html', dest: 'src/view/dist/layout/map.html'}
                ]
            }
        },
        'string-replace': {
            dict: {
                files: {
                    'src/view/dist/main/index.html': 'src/view/dist/main/index.html',
                    'src/view/dist/page/index.html': 'src/view/dist/page/index.html',
                    'src/view/dist/about/index.html': 'src/view/dist/about/index.html',
                    'src/view/dist/statistic/index.html': 'src/view/dist/statistic/index.html',
                    'src/view/dist/layout/footer.html': 'src/view/dist/layout/footer.html',
                    'src/view/dist/layout/header.html': 'src/view/dist/layout/header.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: /\?v\d+/ig,
                            replacement: '?v' + (new Date()).getTime()
                        },
                        {
                            pattern: '{{version}}',
                            replacement: 'v0.5.2 beta'
                        }
                    ]
                }
            },
            footer: {
                files: {
                    'src/view/dist/main/index.html': 'src/view/dist/main/index.html',
                    'src/view/dist/page/index.html': 'src/view/dist/page/index.html',
                    'src/view/dist/about/index.html': 'src/view/dist/about/index.html',
                    'src/view/dist/statistic/index.html': 'src/view/dist/statistic/index.html',
                    'src/view/dist/layout/footer.html': 'src/view/dist/layout/footer.html'
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
                    'web/js/common.min.js': ['web/js/ajax.js', 'web/js/class.js', 'web/js/collapse.js', 'web/js/full_screen.js', 'web/js/preview.js', 'web/js/slider.js', 'web/js/subway.js', 'web/js/url.js'],
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
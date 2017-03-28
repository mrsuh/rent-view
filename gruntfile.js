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
                    {src: 'src/view/main/index.html.dist', dest: 'src/view/main/index.html'},
                    {src: 'src/view/page/index.html.dist', dest: 'src/view/page/index.html'},
                    {src: 'src/view/about/index.html.dist', dest: 'src/view/about/index.html'},
                    {src: 'src/view/sitemap/index.html.dist', dest: 'src/view/sitemap/index.html'},
                    {src: 'src/view/statistic/index.html.dist', dest: 'src/view/statistic/index.html'},
                    {src: 'src/view/layout/footer.html.dist', dest: 'src/view/layout/footer.html'},
                    {src: 'src/view/layout/header.html.dist', dest: 'src/view/layout/header.html'}
                ]
            }
        },
        'string-replace': {
            dict: {
                files: {
                    'src/view/main/index.html': 'src/view/main/index.html',
                    'src/view/page/index.html': 'src/view/page/index.html',
                    'src/view/about/index.html': 'src/view/about/index.html',
                    'src/view/statistic/index.html': 'src/view/statistic/index.html',
                    'src/view/layout/footer.html': 'src/view/layout/footer.html',
                    'src/view/layout/header.html': 'src/view/layout/header.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: /\?v\d+/ig,
                            replacement: '?v' + (new Date()).getTime()
                        },
                        {
                            pattern: '{{version}}',
                            replacement: 'v0.4.1 beta'
                        }
                    ]
                }
            },
            footer: {
                files: {
                    'src/view/main/index.html': 'src/view/main/index.html',
                    'src/view/page/index.html': 'src/view/page/index.html',
                    'src/view/about/index.html': 'src/view/about/index.html',
                    'src/view/statistic/index.html': 'src/view/statistic/index.html',
                    'src/view/layout/footer.html': 'src/view/layout/footer.html'
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
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
                    {src: 'src/view/about/index.html.dist', dest: 'src/view/about/index.html'}
                ]
            }
        },
        'string-replace': {
            dist: {
                files: {
                    'src/view/main/index.html': 'src/view/main/index.html',
                    'src/view/page/index.html': 'src/view/page/index.html',
                    'src/view/about/index.html': 'src/view/about/index.html'
                },
                options: {
                    replacements: [
                        {
                        pattern: /\?v\d+/ig,
                        replacement: '?v' + (new Date()).getTime()
                        },
                        {
                            pattern: '{{version}}',
                            replacement: 'v0.3 beta'
                        }
                    ]
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'web/js/common.min.js': ['web/js/ajax.js', 'web/js/class.js', 'web/js/collapse.js', 'web/js/full_screen.js', 'web/js/preview.js', 'web/js/slider.js', 'web/js/subway.js', 'web/js/url.js' ],
                    'web/js/main.min.js': ['web/js/main.js' ],
                    'web/js/page.min.js': ['web/js/page.js' ]
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
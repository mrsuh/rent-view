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
        'string-replace': {
            dist: {
                files: {
                    'src/view/main/index.html': 'src/view/main/index.html',
                    'src/view/page/index.html': 'src/view/page/index.html',
                    'src/view/about/index.html': 'src/view/about/index.html'
                },
                options: {
                    replacements: [{
                        pattern: /\?v\d+/ig,
                        replacement: '?v' + (new Date()).getTime()
                    }]
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

    grunt.registerTask('build', ['less', 'string-replace', 'uglify']);
};
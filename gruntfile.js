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
                    'src/view/page/index.html': 'src/view/page/index.html'
                },
                options: {
                    replacements: [{
                        pattern: /\?v\d+/ig,
                        replacement: '?v' + (new Date()).getTime()
                    }]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('build', ['less', 'string-replace']);
};
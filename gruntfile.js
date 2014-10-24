module.exports = function (grunt) {
    var pkgFile = grunt.file.readJSON('package.json'),
        banner =
            "/*          __              __\n" +
            " *   __    /\\ \\            /\\ \\\n" +
            " *  /\\_\\   \\_\\ \\    ___    \\_\\ \\     __   __  __\n" +
            " *  \\/\\ \\  /'_` \\  / __`\\  /'_` \\  /'__`\\/\\ \\/\\ \\ \n" +
            " *   \\ \\ \\/\\ \\L\\ \\/\\ \\L\\ \\/\\ \\L\\ \\/\\  __/\\ \\ \\_/ |\n" +
            " *    \\ \\_\\ \\___,_\\ \\____/\\ \\___,_\\ \\____\\\\ \\___/\n" +
            " *     \\/_/\\/__,_ /\\/___/  \\/__,_ /\\/____/ \\/__/\n" +
            " *\n" +
            " *  " + pkgFile.name + "\n" +
            " *  v" + pkgFile.version + "\n" +
            " *  " + pkgFile.description + "\n" +
            " *  Copyright " + grunt.template.today("yyyy") + "\n" +
            " */\n" +
            "\n"
   
    

	grunt.initConfig({
		pkg: pkgFile,
        
		uglify: {
            app: {
                options: {
                    compress: {
                        drop_console: true
                    },
                    banner: banner
                },
                files: {
                    'app/public/js/app.min.js': 'app/public/js/app/*.js'
                }
            },
            vendor: {
                options: {
                    mangle: false,
                    banner: '/* Combined third part javascript libraries, for more info visit:\n * https://github.com/idodev/pushboard/tree/master/js/vendor\n */\n\n'
                },
                files: {
                    'app/public/js/vendor.min.js': 'app/public/js/vendor/*.js'
                }
            }
        },   
		watch: {
			js_app: {
				files: 'app/public/js/app/*.js',
				tasks: ['uglify:app']
			},
            js_vendor: {
				files: 'app/public/js/vendor/*.js',
				tasks: ['uglify:vendor']
			}
		},
        mochaTest: {
          test: {
            src: ['test/*.js'],
            options: {
              require: ['should','request'],
              reporter: 'spec'
            }
          }
        },
        
        express: {
          dev: {
            options: {
              script:  'app.js',
                delay: 1000
            }
          }
        }
        
        
	})
    
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-watch')
    
    grunt.loadNpmTasks('grunt-mocha-test')
    grunt.loadNpmTasks('grunt-express-server');
    
	grunt.registerTask('default', ['uglify', 'watch'])
    
    grunt.registerTask('test', ['express:dev','mochaTest'])

};

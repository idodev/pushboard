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
                    banner: banner,
                    sourceMap: true
                },
                files: {
                    'app/public/js/app.min.js': 'app/public/js/app/*.js'
                }
            },
            vendor: {
                options: {
                    mangle: false,
                    banner: '/* Combined, minified, third party javascript libraries, for more info visit:\n * https://github.com/idodev/pushboard/tree/master/js/vendor\n */\n\n',
                    sourceMap: true
                },
                files: {
                    'app/public/js/vendor.min.js': 'app/public/js/vendor/*.js'
                }
            }
        },
        sass: {
            dist: {
				options: {
                    /*style: 'compressed',
                    banner: banner*/
                },
                files: {
					'app/public/css/main.min.css' : 'app/public/css/sass/main.scss'
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
			},
            sass: {
                files: 'app/public/css/sass/main.scss',
				tasks: ['sass']
            }
		},
        
        
        env: {
          coverage: {
            APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/app/'
          }
        },
        
        
        /* test suite*/
        mochaTest: {
          test: {
            src: ['test/api/*.js'],
            options: {
              require: ['should', 'request', 'supertest'],
              reporter: 'spec'
            }
          }
        },
        
        /*coverage generation*/
        clean: {
            coverageFolder: 'build/coverage'
        },
        
        instrument: {
          files: ['app/*.js','app/config/*.js','app/controllers/*.js','app/models/*.js','app/routes/*.js'],
          options: {
            lazy: false,
            basePath: 'build/coverage/instrument'
          }
        },
        reloadTasks : {
          rootPath : 'build/coverage/instrument/tasks'
        },
        storeCoverage: {
            options: {
                dir: 'build/coverage/reports'
            }
        },
        makeReport: {
          src: 'build/coverage/reports/**/*.json',
          options: {
            type: 'lcov',
            dir: 'build/coverage/reports',
            print: 'detail'
          }
        },
        
        /* express set up for tests*/
        express: {
          test: {
            options: {
              script:  'app/app.js',
                delay: 1000
            }
          },
          coverage: {
             options: {
              script:  'build/coverage/instrument/app/app.js',
                delay: 1000
            } 
          }
        }
        
        
	})
    
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-watch')
    
    grunt.loadNpmTasks('grunt-mocha-test')
    grunt.loadNpmTasks('grunt-express-server')
    grunt.loadNpmTasks('grunt-istanbul')
    grunt.loadNpmTasks('grunt-contrib-clean')
    
	grunt.registerTask('default', ['uglify', 'sass', 'watch'])
    
    grunt.registerTask('test', ['mochaTest'])
    
    grunt.registerTask('coverage', ['clean','instrument','reloadTasks','mochaTest','storeCoverage','makeReport'])

};

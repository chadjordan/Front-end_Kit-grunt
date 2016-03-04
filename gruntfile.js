module.exports = function(grunt) {
  // Do grunt-related things in here

  // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      // **************************************
      // Sass compile Configuration
      // **************************************

      sass: {
    		options: {
          loadPath: ['bower_components/foundation/scss']
    		},
    		dist: {
          options: {
            sourcemap: 'none'
          },
    			files: {
    				'assets/css/main.css': 'assets/scss/main.scss'
    			}
    		}
    	},

      // **************************************
      // CSS Minify Configuration
      // **************************************

      cssmin: {
        css: {
          src: 'assets/css/main.css',
          dest: 'assets/css/main.min.css'
        }
      },

      // **************************************
      // Linting Configuration
      // **************************************

      jshint: {
        // define the files to lint
        files: ['Gruntfile.js', 'assets/developJS/*.js'],
        // configure JSHint (documented at http://www.jshint.com/docs/)
        options: {
            // more options here if you want to override JSHint defaults
          globals: {
            jQuery: true,
            console: true,
            module: true
          }
        }
      },

      // **************************************
      // Concatination Configuration
      // **************************************

      concat: {
      	options: {
      		separator: ';'
      	},
      	script: {
      		src: [
      			'bower_components/foundation/js/foundation/foundation.js',
      			'bower_components/foundation/js/foundation/foundation.alert.js',
      			'bower_components/foundation/js/foundation/foundation.abide.js',
      			'bower_components/foundation/js/foundation/foundation.joyride.js',
      			// ...more foundation JS you might want to add
      			'assets/developJS/script.js'
      		],
      		dest: 'assets/js/mainscript.js'
      	},
      	modernizr: {
      		src: [
      			'bower_components/modernizr/modernizr.js'
      		],
      		dest: 'assets/js/modernizr.js'
      	}
      },

      // **************************************
      // JS Uglify Configuration
      // **************************************

      uglify : {
          js: {
              files: {
                  'assets/js/mainscript.min.js' : [ 'assets/js/mainscript.js' ]
              }
          }
      },

      // **************************************
      // Watch Configuration
      // **************************************

      watch: {
        grunt: {
          files: ['Gruntfile.js'],
          tasks: ['default']
        },

      	sass: {
      		files: 'assets/scss/**/*.scss',
      		tasks: ['CSSprocess']
      	},

      	script: {
      		files: 'assets/developJS/**/*.js',
      		tasks: ['JSprocess']
      	}
      }

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register your grunt task(s).
    grunt.registerTask('CSSprocess', ['sass', 'cssmin']);
    grunt.registerTask('JSprocess', ['jshint', 'concat', 'uglify']);

    // Default task(s).
    grunt.registerTask('default', ['CSSprocess', 'JSprocess', 'watch']);

};

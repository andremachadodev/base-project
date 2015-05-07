module.exports = function(grunt){
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    paths: {
      src: '../../src/',
      dist: '../../dist/',
      bower: '../../bower_src/',
      compass: '../compass/'
    },

		concat: {
			vendors: {
				src: [
					'<%= paths.bower %>angular/angular.min.js',
					'<%= paths.bower %>angular-animate/angular-animate.min.js',
					'<%= paths.bower %>angular-route/angular-route.min.js',
					'<%= paths.bower %>angular-touch/angular-touch.min.js'
				],
				dest: '<%= paths.dist %>js/vendors.js'
			},
			app: {
				src: [
					'<%= paths.src %>js/*.js'
				],
				dest: '<%= paths.dist %>js/app.js'
			},
			modules: {
				src: [
					'<%= paths.src %>js/modules/**/*.js'
				],
				dest: '<%= paths.dist %>js/modules.js'
			}
		},

		jshint: {
	    beforeconcat: ['<%= paths.src %>js/**/*.js']
	  },

		uglify: {
			options: {
				mangle: false
			},
			vendors: {
				files: {
					'<%= paths.dist %>js/vendors.js': ['<%= paths.dist %>js/vendors.js']
				}
			},
			app: {
				files: {
					'<%= paths.dist %>js/app.js': ['<%= paths.dist %>js/app.js']
				}
			},
			modules: {
				files: {
					'<%= paths.dist %>js/modules.js': ['<%= paths.dist %>js/modules.js']
				}
			}
		},

		compass: {
			dist: {
				options: {
					config: '<%= paths.compass %>config.rb'
				}
			}
		},

		webfont: {
		    icons: {
		    	src: '<%= paths.src %>svg/*.svg',
		        dest: '<%= paths.dist %>fonts/',
		        destCss: '<%= paths.dist %>fonts/'
		    }
		},

		favicons: {
			options: {
				appleTouchBackgroundColor: "none",
				trueColor: false,
				precomposed: true,
				coast: true,
				windowsTile: true,
				tileBlackWhite: false,
				tileColor: "#ffffff",
				html: '<%= paths.dist %>favicons/index.html',
				HTMLPrefix: "assets/favicons/"
			},
			icons: {
				src: '<%= paths.src %>favicons/matrix.png',
				dest: '<%= paths.dist %>favicons/'
			}
		},

		watch: {
			scripts: {
				files: ['<%= paths.src %>js/**/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					spawn: false
				}
			},
			styles: {
				files: ['<%= paths.src %>sass/**/*.scss'],
				tasks: ['compass'],
				options: {
					spawn: false
				}
			}
		}

  });

	grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Run on start development
  grunt.registerTask(
  	'default', [
  		'compass',
  		'jshint',
	 		'concat',
			'webfont',
		  'favicons'
    ]
  );

  // Run on build
  grunt.registerTask(
  	'prod', [
	 		'jshint',
	 		'compass',
	 		'concat',
	 		'uglify'
	 	]
	);
};







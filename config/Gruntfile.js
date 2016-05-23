module.exports = function(grunt){
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    paths: {
      root: '../',
      src: '../src/',
      dist: '../dist/',
      components: 'node_modules'
    },

    copy: {
      font: {
        expand: true,
        cwd: '<%= paths.src %>/fonts/',
        src: '*',
        dest: '<%= paths.dist %>/fonts'
      }
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    concat: {
			vendors: {
				src: [
					'<%= paths.components %>angular/angular.js'
				],
				dest: '<%= paths.dist %>js/vendors.js'
			},
			app: {
				src: [
					'<%= paths.src %>js/app.js',
					'<%= paths.src %>js/app-config.js',
          '<%= paths.src %>js/filters/**/*.js',
					'<%= paths.src %>js/helpers/**/*.js',
					'<%= paths.src %>js/directives/**/*.js'
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
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask(
  	'default', ['copy:font', 'compass', 'jshint', 'uglify', 'concat', 'watch']
  );
};

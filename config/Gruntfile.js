module.exports = function(grunt){
  var gifsicle = require('imagemin-gifsicle'),
      jpegtran = require('imagemin-jpegtran'),
      optipng  = require('imagemin-optipng'),
      svgo     = require('imagemin-svgo');

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
        cwd: '<%= paths.src %>fonts/',
        src: '*',
        dest: '<%= paths.dist %>fonts'
      }
    },

    sass: {
      dist: {
        files: {
          '<%= paths.dist %>css/app.css': '<%= paths.src %>sass/app.scss'
        }
      }
    },

    imagemin: {
      default: {
        options: {
          progressive: true,
          interlaced: true,
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: '<%= paths.src %>/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= paths.dist %>/img'
        }]  
      }
    },

    concat: {
			vendors: {
				src: [
					'<%= paths.components %>angular/angular.js'
				],
				dest: '<%= paths.dist %>js/vendors.js'
			},
      modules: {
        src: [
          '<%= paths.src %>js/modules/**/*.js'
        ],
        dest: '<%= paths.dist %>js/modules.js'
      },
			app: {
				src: [
					'<%= paths.src %>js/**/*.js'
				],
				dest: '<%= paths.dist %>js/app.js'
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
				tasks: ['sass'],
				options: {
					spawn: false
				}
			}
		}
  });

	grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask(
  	'prod', ['copy:font', 'sass', 'jshint', 'uglify', 'imagemin', 'concat']
  );

  grunt.registerTask(
    'dev', ['sass', 'copy:font', 'jshint', 'uglify', 'concat', 'watch']
  );
};

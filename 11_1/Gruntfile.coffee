module.exports = (grunt) ->
	# Project configuration.
	grunt.initConfig
		pkg: grunt.file.readJSON('11.1.jquery.json')
		banner: """
				/*
				* <%= pkg.title || pkg.name %> - v<%= pkg.version %>
				* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>
				*
				* Dual licensed under the MIT and GPL licenses:
				*        http://www.opensource.org/licenses/mit-license.php
				*        http://www.gnu.org/licenses/gpl.html
				*/
				
				
				"""
	
		clean:
			files: [
				'dist'
				'test/specs/**/*.js'
			]

		concat:
			options:
				preserveComments: true
				stripBanners: false			
			dist:
				src: ['assets/js/angular.min.js','assets/js/angular-sanitize.js','assets/js/jquery-2.0.2.js','assets/js/jquery-ui-min.js','assets/js/ui-bootstrap-tpls-0.6.0.min.js','assets/js/keypress.js', 'assets/js/app.js','assets/js/controllers.js','assets/js/questions_controller.js','assets/js/directives.js','assets/js/highcharts/highcharts.js']
				dest: 'js/<%= pkg.name %>.js'
                        	
		uglify:
			options:
				banner: '<%= banner %>'
				preserveComments: false
				stripBanners: true			
			dist:
				files:
    			'js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
		sass:
      dist:
        options:
          style: 'compressed'
          compass: true
        files:
          'css/<%= pkg.name %>.min.css': ['assets/sass/screen.scss']
      compile:
        options:
          style: 'expanded'
          compass: true
        files:
          'css/<%= pkg.name %>.css': ['assets/sass/screen.scss']
							
		watch:
			js:
				files: 'assets/js/**/*.js'
				tasks: ['concat', 'uglify']
			style:
				files: 'assets/sass/**/*.scss'
				tasks: ['sass' , 'cssmin']
		
					
		cssmin:
			combine:
				options:
					banner: '<%= banner %>'
					keepSpecialComments: 0
					removeEmpty: true
				files:
					"css/<%= pkg.name %>.min.css": "css/<%= pkg.name %>.min.css"


	# These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-jshint')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-cssmin')
	grunt.loadNpmTasks('grunt-contrib-compass')
	grunt.loadNpmTasks('grunt-contrib-sass')
	# Test task
	grunt.registerTask('test', ['clean'] )
	# Default task.
	# grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less', 'cssmin'] )
	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin'] )
	
	
	
	
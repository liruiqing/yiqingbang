module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['built/css/*css', 'built/js/*js', 'built/views/*.html','built/views/**/*.html']
		,concat: {
			options: {
			  separator: ' '
			},
			js: {
			  src: ['js/lib/angular.min.js',
				  'js/lib/angular-route.min.js',
				  'js/lib/angular-animate.min.js',
				  'js/lib/angular-touch.min.js',
				  'js/lib/angular-sanitize.min.js',
				  'js/config.js',
				  'js/*.js','js/**/*.js',
				  'js/**/**/*.js','js/**/**/**/*.js'],
			  dest: 'built/js/built.js'
			},
			css: {
				src: ['css/*.css'],
				dest: 'built/css/built.css'
			}
		}
		,uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			js: {
				src: 'built/js/built.js',
				dest: 'built/js/built.min.js'
			}
		},cssmin: {
			css: {
				src: 'built/css/built.css',
				dest: 'built/css/built.min.css'
			}
		},watch: {
			html: {
				files: ['index.html','views_original/*.html','views_original/**/*.html','js/*.js','js/**/*.js','js/**/**/*.js','js/**/**/**/*.js','css/*.css'],
				tasks: ['default'],
				options: {
					debounceDelay: 500
				}
			}
		},imagemin: {
			prod: {
				options: {
					optimizationLevel: 7,
					pngquant: true
				},
				files: [
					{expand: true, cwd: 'img', src: ['*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'built/img'}
				]
			}
		},//压缩HTML
		htmlmin: {
			options: {
				removeComments: true,
				removeCommentsFromCDATA: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeAttributeQuotes: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true
			},
			html: {
				files: [
					{expand: true, cwd: 'views', src: ['*.html','**/*html'], dest: 'built/views'}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');


	grunt.registerTask('default', ['clean','concat','htmlmin','uglify','cssmin']);
	//grunt.registerTask('default', ['concat','htmlmin']);
	grunt.registerTask('img', ['imagemin']);
	grunt.registerTask('html', ['htmlmin']);
	grunt.registerTask('css', ['htmlmin']);
};
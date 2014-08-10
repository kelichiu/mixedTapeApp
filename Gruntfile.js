module.exports = function(grunt) {
         // Project configuration.
         grunt.initConfig({
             pkg: grunt.file.readJSON('package.json'),
             // Set up configuration options
             sass: {
                 dist: {
                    files: {
                         'css/style.css': 'css/style.scss'
                     }
                 }
             },
             watch:{
                css:{
                    files:['css/*.scss'],
                    tasks:['sass','autoprefixer']
                },
                jade: {
                    files:['*.jade'],
                    tasks: ['jade']
                },
                //svginject:{
                    //files:['images/svgs/*.svg'],
                    //tasks:['svginject']

                //},
                options:{
                    livereload:true
                }
             },
             autoprefixer:{
                options:{
                    browsers:['last 5 version','ie 7','ie 8','ie 9']
                },
                no_dest:{
                    src:'css/style.css'
                }
             },
             connect:{
                server:{
                    options:{
                        port:9001,
                        base:''
                    }
                }
             },
             jade: {
               compile: {
                 options: {
                   data: {
                     debug: false
                   }
                 },
                 files: {
                   "index.html": "index.jade",
                   "about.html": "about.jade"
                 }
               }
             },
             svginject: {
                 all : {
                   options: {},
                   files: {
                      'SVGinject.js': 'images/svgs/*.svg'
                   }
                 }
               },
            cssmin: {
              minify: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'production/css/',
                ext: '.min.css'
              }
            },
            mkdir: {
                all: {
                  options: {
                    create: ['production', 'production/css','production/js']
                  }
                }
              },
         });

         // Load the task plugins
         grunt.loadNpmTasks('grunt-contrib-sass');
         grunt.loadNpmTasks('grunt-contrib-watch');
         grunt.loadNpmTasks('grunt-autoprefixer');
         grunt.loadNpmTasks('grunt-contrib-connect');
         grunt.loadNpmTasks('grunt-contrib-jade');
         grunt.loadNpmTasks('grunt-svginject');
         grunt.loadNpmTasks('grunt-contrib-cssmin');
         grunt.loadNpmTasks('grunt-mkdir');

         // Define Tasks.
         grunt.registerTask('default', ['connect','watch',]);
         grunt.registerTask('starter', ['mkdir',]);
         grunt.registerTask('svg', ['svginject',]);
         grunt.registerTask('production', ['cssmin',]);

     };
'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    root: {
      app: 'web/tocapu/app',
      tmp: 'web/tocapu/.tmp',
      test: 'web/tocapu/test',
      dist: 'web/tocapu/dist'
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= root.tmp %>',
            '<%= root.dist %>/*',
            '!<%= root.dist %>/.git*'
          ]
        }]
      },
      server: '<%= root.tmp %>'
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= root.app %>',
          dest: '<%= root.dist %>',
          src: [
            '*.{ico,png,txt}'
          ]
        }]
      }
    },

    compass: {
      options: {
        sassDir: '<%= root.app %>/styles',
        cssDir: '<%= root.tmp %>/styles',
        generatedImagesDir: '<%= root.tmp %>/images/sprite',
        imagesDir: '<%= root.app %>/images',
        javascriptsDir: '<%= root.app %>/scripts',
        fontsDir: '<%= root.app %>/styles/fonts',
        importPath: '<%= root.app %>/vendor',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          httpImagesPath: '/dist/images',
          httpGeneratedImagesPath: '/dist/images/sprite',
          httpFontsPath: '/dist/fonts'
        }
      },
      app: {
        options: {
          debugInfo: true,
          relativeAssets: true
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= root.dist %>/styles/main.css': [
            '<%= root.app %>/vendor/normalize-css/normalize.css',
            '<%= root.tmp %>/styles/{,*/}*.css'
          ]
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= root.app %>/scripts/{,*/}{,*/}*.js',
        '<%= root.test %>/specs/{,*/}{,*/}*.js',
        '<%= root.test %>/runner.js'
      ]
    },

    mocha_phantomjs: {
      all: ['<%= root.test %>/index.html']
    },

    requirejs: {
      options: {
        optimize: 'uglify',
        preserveLicenseComments: false,
        useStrict: true,
        wrap: false
      },
      dist: {
        options: {
          baseUrl: '<%= root.app %>/scripts',
          include: 'main',
          out: '<%= root.dist %>/scripts/main.js',
          mainConfigFile: '<%= root.app %>/scripts/main.js',
        }
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          '<%= root.dist %>/vendor/requirejs/require.js': ['<%= root.app %>/vendor/requirejs/require.js']
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= root.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= root.dist %>/images'
        }]
      }
    },

    watch: {
      options: {
        nospawn: true
      },
      compass: {
        files: [
          '<%= root.app %>/styles/{,*/}*{,*/}*.{scss,sass}'
        ],
        tasks: ['compass:app']
      },
      test: {
        files: [
          '<%= root.app %>/scripts/{,*/}{,*/}*.js',
          '<%= root.test %>/specs/{,*/}{,*/}*.js',
          '<%= root.test %>/specRunner.js',
          'Gruntfile.js'
        ],
        tasks: ['test']
      }
    }

  });

  grunt.registerTask('test', [
    'jshint',
    'mocha_phantomjs'
  ]);

  grunt.registerTask('build', [
    'test',
    'clean:dist',
    'requirejs',
    'copy:dist',
    'uglify',
    'compass:dist',
    'cssmin',
    'imagemin'
  ]);

  grunt.registerTask('default', [
    'clean:server',
    'test',
    'compass:app'
  ]);

};

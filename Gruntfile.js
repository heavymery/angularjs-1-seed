'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  //------------------------------------------------------------------------------
  //
  //  Modules
  //
  //------------------------------------------------------------------------------

  require('dotenv').config({silent: true});

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');

  //------------------------------------------------------------------------------
  //
  //  Constants
  //
  //------------------------------------------------------------------------------

  var CONNECT_HOST = process.env.CONNECT_HOST || '0.0.0.0';
  var CONNECT_PORT = process.env.CONNECT_PORT || 9000;

  var LIVERELOAD_PORT = process.env.LIVERELOAD_PORT || 35729;

  //------------------------------------------------------------------------------
  //
  //  Configuration
  //
  //------------------------------------------------------------------------------



  //------------------------------------------------------------------------------
  //
  //  Initialize
  //
  //------------------------------------------------------------------------------

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Configurable paths for the application
    appConfig: {
      module: require('./bower.json').moduleName || 'myAngular',
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    //--------------------------------------
    //  Watch
    //--------------------------------------

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },

      js: {
        files: ['<%= appConfig.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          spawn: false,
          interrupt: true,
          debounceDelay: 0,
          event: 'changed',
          livereload: '<%= connect.serve.options.livereload %>'
        }
      },

      // TODO: Remove vendor prefix mixins from sass before using this.
      // css: {
      //   files: ['<%= appConfig.app %>/styles/{,*/}*.css'],
      //   tasks: ['newer:autoprefixer:app'],
      //   options: {
      //     spawn: false,
      //     interrupt: true,
      //     debounceDelay: 0,
      //     event: 'changed',
      //     livereload: '<%= connect.serve.options.livereload %>'
      //   }
      // },

      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },

      gruntfile: {
        files: ['Gruntfile.js']
      },

      livereload: {
        options: {
          livereload: '<%= connect.serve.options.livereload %>'
        },
        files: [
          '<%= appConfig.app %>/{,*/}*.html',
          '<%= appConfig.app %>/views/{,*/,*/*/}*.html',
          '<%= appConfig.app %>/scripts/{,*/}*.js',
          // '.tmp/styles/{,*/}*.css', // TODO: Restore after `watch:css` enabled
          '<%= appConfig.app %>/styles/{,*/}*.css', // TODO: Remove after `watch:css` enabled
          '<%= appConfig.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    //--------------------------------------
    //  Connect
    //--------------------------------------

    // The actual grunt server settings
    connect: {
      serve: {
        options: {
          hostname: CONNECT_HOST,
          port: CONNECT_PORT,
          livereload: LIVERELOAD_PORT,
          middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            var middlewares = [
              connect().use(
                '/bower_components',
                serveStatic('./bower_components')
              ),
              serveStatic('.tmp'),
              serveStatic(appConfig.app)
            ];

            // Make directory browse-able.
            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(serveIndex(directory));

            return middlewares;
          }
        }
      },
      test: {
        options: {
          hostname: CONNECT_HOST,
          port: CONNECT_PORT + 1,
          middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            var middlewares = [
              connect().use(
                '/bower_components',
                serveStatic('./bower_components')
              ),
              serveStatic('.tmp'),
              serveStatic('test')
            ];

            // Make directory browse-able.
            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(serveIndex(directory));

            return middlewares;
          }
        }
      },
      dist: {
        options: {
          hostname: CONNECT_HOST,
          port: CONNECT_PORT,
          middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            var middlewares = [
              serveStatic(appConfig.dist)
            ];

            // Make directory browse-able.
            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(serveIndex(directory));

            return middlewares;
          }
        }
      }
    },

    //--------------------------------------
    //  Lint
    //--------------------------------------

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= appConfig.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    //--------------------------------------
    //  Clean
    //--------------------------------------

    // Empties folders to start fresh
    clean: {
      serve: '.tmp',

      build: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= appConfig.dist %>/{,*/}*',
            '!<%= appConfig.dist %>/.git{,*/}*'
          ]
        }]
      }
    },

    //--------------------------------------
    //  Post CSS
    //--------------------------------------

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: [
          // 'last 1 version'
          'last 2 Chrome versions', // Desktop / mobile (Chrome for iOS/Android)
          'last 2 Firefox versions',
          'last 2 Safari versions',
          'Explorer >= 10', // IE
          'iOS >= 8', // Mobile Safari
          'Android >= 4' // Android Browser
        ]
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          // cwd: '.tmp/styles/',
          cwd: '<%= appConfig.app %>/styles/',
          src: '{,*/}*.css',
          // dest: '.tmp/styles/'
          dest: '<%= appConfig.app %>/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          // cwd: '.tmp/styles/',
          cwd: '<%= appConfig.dist %>/styles/',
          src: '{,*/}*.css',
          // dest: '.tmp/styles/'
          dest: '<%= appConfig.dist %>/styles/'
        }]
      }
    },

    //--------------------------------------
    //  Wire Bower
    //--------------------------------------

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= appConfig.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.local.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['<%= appConfig.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath:  /\.\.\/\.\.\/\.\.\//
        //ignorePath: /(\.\.\/)*bower_components\//
      }
    },

    //--------------------------------------
    //  File revision
    //--------------------------------------

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= appConfig.dist %>/scripts/{,*/}*.js',
          '<%= appConfig.dist %>/styles/{,*/}*.css',
          '<%= appConfig.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= appConfig.dist %>/styles/fonts/*'
        ]
      }
    },

    //--------------------------------------
    //  Minify
    //--------------------------------------

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= appConfig.app %>/index.html',

      options: {
        dest: '<%= appConfig.dist %>',
        flow: {
          html: {
            steps: {
              js: [
                'concat',
                'uglifyjs'
              ],
              css: [
                'concat',
                'cssmin'
              ]
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= appConfig.dist %>/{,*/}*.html'],
      css: ['<%= appConfig.dist %>/styles/{,*/}*.css'],
      js: ['<%= appConfig.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= appConfig.dist %>',
          '<%= appConfig.dist %>/images',
          '<%= appConfig.dist %>/styles'
        ],
        patterns: {
          js: [
            [/(images\/[\w/.@-]*\.(png|jpg|gif|svg))/ig, 'Update the JS with the new image filenames']
          ]
        }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= appConfig.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= appConfig.dist %>/scripts/scripts.js': [
    //         '<%= appConfig.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      options: {
        compress: {
          'drop_console': true
        }
      },
    },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= appConfig.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= appConfig.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= appConfig.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= appConfig.dist %>'
        }]
      }
    },

    //--------------------------------------
    //  NG preprocess
    //--------------------------------------

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    ngtemplates: {
      options: {
        htmlmin:  {
          collapseBooleanAttributes: true,
          removeAttributeQuotes: false,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: false,
          removeOptionalTags: true,
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true
        },
        module: '<%= appConfig.module %>'
      },
      files: {
        cwd: '<%= appConfig.app %>',
        src: 'views/**/*.html',
        dest: '.tmp/scripts/templates.js'
      }
    },

    //--------------------------------------
    //  CDN
    //--------------------------------------

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= appConfig.dist %>/*.html']
      }
    },

    //--------------------------------------
    //  Copy
    //--------------------------------------

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appConfig.app %>',
          dest: '<%= appConfig.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            // '*.html',
            // 'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= appConfig.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= appConfig.dist %>'
        }]
      },
      index: {
        expand: true,
        cwd: '.tmp',
        dest: '<%= appConfig.dist %>',
        src: '*.html'
      },
      styles: {
        expand: true,
        cwd: '<%= appConfig.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      test: {
        expand: true,
        cwd: '<%= appConfig.app %>',
        dest: '.tmp',
        src: '**/*'
      }
    },

    //--------------------------------------
    //  Concurrent
    //--------------------------------------

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
      ],
      test: [
        'shell:sassCompile',
        'copy:test'
      ],
      dist: [
        'imagemin',
        'svgmin'
      ]
    },

    //--------------------------------------
    //  Unit, E2E Test
    //--------------------------------------

    // Test settings
    karma: {
      local: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    'protractor_webdriver': {
      start: {
        options: {
          path: 'node_modules/protractor/bin/',
          command: 'webdriver-manager start'
        }
      }
    },

    protractor: {
      options: {
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      local: {
        options: {
          configFile: 'test/e2e/protractor.conf.js'
        }
      }
    },

    //--------------------------------------
    //  Preprocess
    //--------------------------------------

    preprocess: {
      options: {
        inline: true,
        context: {
          DEVELOP: false
        }
      },
      buildHtml: {
        expand: true,
        cwd: '<%= appConfig.app %>',
        dest: '.tmp',
        src: ['index.html', 'views/**/*.html']
      },
      buildJs: {
        src: '.tmp/concat/scripts/*.js'
      },
      test: {
        src: [
          '.tmp/index.html',
          '.tmp/scripts/app.js'
        ]
      }
    },

    //--------------------------------------
    //  Commands (Sass compile/watch, etc.)
    //--------------------------------------

    shell: {
      webdriverUpdate: {
        command: 'npm run webdriver-manager -- update --standalone',
        options: {
          async: false
        }
      },
      launchApiServer: {
        command: 'node test/e2e/awesome-server.js',
        options: {
          async: true,
          execOptions: {
            cwd: './'
          }
        }
      },
      initApiData: {
        command: '',
        options: {
          async: false,
          execOptions: {
            cwd: './'
          }
        }
      },
      sassCompile: {
        command: 'npm run node-sass -- --recursive --source-map true <%= appConfig.app %>/styles/sass/ --output <%= appConfig.app %>/styles/',
      },
      sassWatch: {
        command: 'npm run node-sass -- --watch --recursive --source-map true <%= appConfig.app %>/styles/sass/ --output <%= appConfig.app %>/styles/',
        options: {
          async: true
        }
      }
    }

  });

  //------------------------------------------------------------------------------
  //
  //  Tasks
  //
  //------------------------------------------------------------------------------

  //--------------------------------------
  //  Serve
  //--------------------------------------

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      // return grunt.task.run(['build', 'connect:dist:keepalive']);
      return grunt.task.run([
        'connect:dist:keepalive'
      ]);
    }

    grunt.task.run([
      'clean:serve',
      'wiredep',
      'concurrent:server',
      'shell:sassCompile',
      // 'autoprefixer:server',
      'connect:serve',
      'shell:sassWatch',
      'watch'
    ]);
  });

  //--------------------------------------
  //  Test
  //--------------------------------------

  grunt.registerTask('test', 'Unit & E2E test', function () {
    var tasks = [
      'clean:serve',
      'wiredep',
      'concurrent:test',
      'autoprefixer:server',
      'connect:test',
      'karma:local'
    ];

    if(grunt.option('e2e')) {
      tasks.push('shell:webdriverUpdate');
      tasks.push('protractor_webdriver');

       if(!grunt.option('mock')) {
         tasks.push('preprocess:test');
         tasks.push('shell:initApiData');
         tasks.push('shell:launchApiServer');
       }

      tasks.push('protractor:local');
    }

    grunt.task.run(tasks);
  });

  //--------------------------------------
  //  Build
  //--------------------------------------

  grunt.registerTask('build', [
    'clean:build',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'shell:sassCompile',
    'autoprefixer:dist',
    'preprocess:buildHtml',
    'ngtemplates',
    'concat',
    'preprocess:buildJs',
    'ngAnnotate',
    'copy:dist',
    'copy:index',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  //--------------------------------------
  //  Default (Test -> Build)
  //--------------------------------------

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

};

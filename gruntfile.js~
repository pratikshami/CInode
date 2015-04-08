module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['spec/*_spec.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },

 /*jasmine_node: {
    options: {
      forceExit: true,
      match: '.',
      matchall: false,
      extensions: 'js',
      specNameMatcher: 'spec'
    },
    all: ['spec/']
  }*/

jasmine: {
        coverage: {
            src: 'functions.js',
            options: {
                specs: 'spec/*_spec.js',
                
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'bin/coverage/coverage.json',
                    report: 'bin/coverage',
                    thresholds: {
                        lines: 75,
                        statements: 75,
                        branches: 75,
                        functions: 90
                    }
                }
            }
        }
    },
 sonarRunner: {
        analysis: {
            options: {
                sonar: {
                    host: {
                        url: 'http://localhost:9000'
                    },
                    jdbc: {
                        url: 'jdbc:mysql://localhost:3306/sonar',
                        username: 'your-username-here',
                        password: 'your-password-here'
                    },
                    projectKey: 'your-unique-project-key-here',
                    projectName: 'Your Project Name Here',
                    projectVersion: '0.0.1',
                    sources: 'scripts',
                    tests: 'tests',
                    javascript: {
                        lcov: {
                            reportPath: "reports/lcov/lcov.info"
                        }
                    },
                    sourceEncoding: 'UTF-8'
                }
            }
        }
    }
  });

  
 

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
grunt.loadNpmTasks('grunt-istanbul');

  //grunt.registerTask('default', ['jshint']);
grunt.registerTask('default', 'jasmine');

};

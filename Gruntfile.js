module.exports = function(grunt) {
grunt.initConfig({
    jasmine: {
        coverage: {
            src: 'functions.js',
            options: {
                specs: 'spec/test_spec.js',
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'reports/coverage.json',
                    report: [
                            {type: 'html', options: {dir: 'coverage/html'}},
                            {type: 'cobertura', options: {dir: 'output/coverage/cobertura'}},
                          
                        ]
                }
            }
        }
    },

sonarRunner: {
        analysis: {
            options: {
                debug: true,
                separator: '\n',
                sonar: {
                    host: {
                        url: 'http://localhost:9000'
                    },
                 
                    projectKey: 'sonar:grunt-sonar-runner:0.1.0',
                    projectName: 'Gruntsonar',
                    projectVersion: '0.10',
                    sources: ['functions.js'].join(','),
                    language: 'js',
 
                }
                }
        
    }
},

karmaSonar: {
 runnerProperties: {
    'sonar.links.homepage': 'https://github.com/mdasberg/grunt-karma-sonar',
    'sonar.branch': 'master'
},
    your_target: {
                  project:{
                        Key: 'sonar:grunt-sonar-runner:0.1.0',
                        Name: 'Gruntsonar',
                         Version: '0.10'
                          },
               
     
      paths: [
        {
          cwd: '/jasmineapp', // the current working directory'
          src: '/jasmineapp/functions.js', // the source directory within the cwd
          test: '/jasmineapp/spec/test_spec.js', // the test directory within the cwd
          reports: {
              unit: '/output/coverage/cobertura/coverage.xml', // the result file within the cwd
              coverage: '/coverage/lcov.info' // the glob for lcov files'
          }
        }

   
]
},
 exclusions: []
}      ,
exusDeployer: {
    release: {
      options: {
          groupId: "grunt-nexus-deployer",
          artifactId: "grunt-nexus-deployer",
          version: "1.0",
          packaging: 'zip',
                  classifier: 'dev',
          auth: {
            username:'admin',
            password:'admin123'
          },
          pomDir: 'build/pom',
          url: 'http://172.27.59.103:8081/nexus/content/repositories/releases/',
          artifact: 'build/grunt-nexus-deployer.zip',
          noproxy: 'localhost',
          cwd: ''
        }
      }
    } ,/*nexusDeployer: {
    release: {
      options: {
          groupId: "EmployeeApplication",
          artifactId: "EmployeeApplication",
          version: "1.1",
          packaging: 'war',
                  classifier: 'dev',
          auth: {
            username:'admin',
            password:'admin123'
          },
          pomDir: 'build/pom',
          url: 'http://172.27.59.103:8081/nexus/content/repositories/releases/',
          artifact: 'build/EmployeeApplication.war',
          noproxy: 'localhost',
          cwd: ''
        }
      }
    } ,*/
nexusDownloader: {
     options: {
         baseUrl: 'http://172.27.59.103:8081/nexus/content/repositories/',
         repository: 'releases/',
         groupId: 'grunt-nexus-deployer',
         destination: 'download'
     },
     basic: {
      options: {
             artifactId: 'grunt-nexus-deployer',
             classifier: 'dev',
             extension: 'zip',
             destination: 'download'
         },
         dependencies: {
             'grunt-nexus-deployer': ['1.0']
         }
     }
/*nexusDownloader: {
     options: {
         baseUrl: 'http://172.27.59.103:8081/nexus/content/repositories/',
         repository: 'releases/',
         groupId: 'EmployeeApplication',
         destination: 'download'
     },
     basic: {
      options: {
             artifactId: 'EmployeeApplication',
             classifier: 'dev',
             extension: 'war',
             destination: 'download'
         },
         dependencies: {
             'EmployeeApplication': ['1.1']
         }
     }*/
         
     
 }   
/*nexus: {
  client: {
    url: 'http://172.27.59.103:8081/nexus/content/repositories/releases/',
    repository: 'Releases',
    fetch: [
      { id: 'grunt-nexus-deployer:grunt-nexus-deployer:zip:1.0', path: 'download' }
    ]
  }
}  */   


});
grunt.loadNpmTasks('grunt-contrib-jasmine');
//grunt.loadNpmTasks('grunt-sonar-runner');
grunt.loadNpmTasks('grunt-nexus-artifact');
grunt.loadNpmTasks('grunt-nexus-downloader');
//grunt.loadNpmTasks('grunt-karma-sonar');
grunt.loadNpmTasks('grunt-nexus-deployer');

grunt.registerTask('default', ['jasmine', 'sonarRunner']);
grunt.registerTask('nexus', ['nexusDeployer']);

grunt.registerTask('nexus1', ['nexus']);
grunt.registerTask('download', ['nexusDownloader']);


};

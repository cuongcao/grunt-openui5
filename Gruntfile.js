// Copyright 2014 SAP SE.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http: //www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific
// language governing permissions and limitations under the License.

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		eslint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= mochaTest.tests.src %>'
			]
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		'openui5_theme': {
			'default_options': {
				options: {},
				files: [
					{
						expand: true,
						cwd: 'test/theme/fixtures/lib1/my/theme/foo',
						src: 'foo.less',
						dest: 'tmp/theme/default_options'
					}
				]
			},
			'compress_option': {
				options: {
					compiler: {
						compress: true
					}
				},
				files: [
					{
						expand: true,
						cwd: 'test/theme/fixtures/lib1/my/theme/foo',
						src: 'foo.less',
						dest: 'tmp/theme/compress_option'
					}
				]
			},
			'rootPaths_option': {
				options: {
					rootPaths: [
						'test/theme/fixtures/lib1',
						'test/theme/fixtures/lib2'
					]
				},
				files: [
					{
						expand: true,
						cwd: 'test/theme/fixtures/lib2/my/theme/bar',
						src: 'bar.less',
						dest: 'tmp/theme/rootPaths_option'
					}
				]
			}
		},

		// Configuration to be run (and then tested).
		'openui5_library_preload': {
			'default_options': {
				options: {
					libraryName: 'my.ui.lib',
					dest: 'tmp/library_preload/default_options/lib1'
				},
				files: [
					{
						expand: true,
						cwd: 'test/library_preload/fixtures/lib1',
						src: 'my/ui/lib/**/*.{js,json,xml}'
					}
				]
			},
			'raw_options': {
				options: {
					libraryName: 'my.ui.lib',
					dest: 'tmp/library_preload/raw_options/lib1',
					compress: false
				},
				files: [
					{
						expand: true,
						cwd: 'test/library_preload/fixtures/lib1',
						src: 'my/ui/lib/**/*.{js,json,xml}'
					}
				]
			}
		},

		// Configuration to be run (and then tested).
		'openui5_preload': { // maybe other task name?

			// 'examples': {
			//
			// 	options: {
			//
			// 		resources: 'test/preload/component/fixtures/app1',
			// 		// OR
			// 		resources: [
			// 			{
			// 				cwd: 'test/preload/component/fixtures/app1',
			// 				prefix: 'my/app', // default: ''
			// 				//autoDetectPrefix: false, // default: false (analyzes files (declare/define)) escope -> var definitions (detect globals) -> see eslint no-global rule
			// 				src: [ '**', '!*.bla' ], // default: see default_includes
			// 				ignoreDefaultFilters: false // default: false
			// 			},
			// 			'test/preload/component/fixtures/app1'
			// 		],
			//
			// 		dest: 'tmp/preload/component/default_options/app1'
			//
			// 	},
			//
			// 	components: true, // looks for **/Component.js files and writes **/Component-preload.js
			// 	components: 'my/**', // looks for my/**/Component.js files and writes my/**/Component-preload.js
			// 	components: [
			// 		'my/app'
			// 	],
			// 	components: {
			// 		'my/app': {
			// 			// TODO
			// 		}
			// 	},
			//
			// 	libraries: true, // looks for **/.library files and writes **/library-preload.js
			// 	libraries: 'my/**', // looks for my/**/.library files and writes my/**/library-preload.js
			// 	libraries: [
			// 		'my/ui/lib'
			// 	],
			// 	libraries: {
			// 		'my/ui/lib': {
			// 			// TODO
			// 		}
			// 	}
			//
			// },

			'component_default_options': {
				options: {
					resources: 'test/preload/fixtures/app',
					dest: 'tmp/preload/component_default_options'
				},
				components: '**'
			},

			'component_resource_prefix': {
				options: {
					resources: [
						{
							cwd: 'test/preload/fixtures/app/my/app',
							prefix: 'my/app'
						}
					],
					dest: 'tmp/preload/component_resource_prefix'
				},
				components: 'my/app'
			},

			'component_no_compress': {
				options: {
					resources: 'test/preload/fixtures/app',
					dest: 'tmp/preload/component_no_compress',
					compress: false
				},
				components: '**'
			},

			'library_default_options': {
				options: {
					resources: 'test/preload/fixtures/library',
					dest: 'tmp/preload/library_default_options'
				},
				libraries: '**'
			},

			'library_resource_prefix': {
				options: {
					resources: [
						{
							cwd: 'test/preload/fixtures/library/my/ui/lib',
							prefix: 'my/ui/lib'
						}
					],
					dest: 'tmp/preload/library_resource_prefix'
				},
				libraries: 'my/ui/lib'
			},

			'library_no_compress': {
				options: {
					resources: 'test/preload/fixtures/library',
					dest: 'tmp/preload/library_no_compress',
					compress: false
				},
				libraries: '**'
			}

		},

		connect: {

			connectTest: {
				options: {
					port: 8080
				}
			},

			serverToBeProxified: {
				options: {
					port: 9000
				}
			}

		},

		'openui5_connect': {

			connectTest: {
				options: {
					appresources: [
						'test/connect/fixtures',
						'test/connect/fixtures/app'
					],
					resources: [
						'test/connect/fixtures/someLib/resources',
						'test/connect/fixtures/anotherLib/res'
					],
					testresources: [
						'test/connect/fixtures/someLib/test-resources',
						'test/connect/fixtures/anotherLib/testres'
					],
					contextpath: 'mycontext',
					proxypath: 'proxy'
				}
			},

			serverToBeProxified: {
				options: {
					appresources: [
						'test/connect/fixtures',
						'test/connect/fixtures/app'
					],
					resources: [
						'test/connect/fixtures/someLib/resources',
						'test/connect/fixtures/anotherLib/res'
					],
					testresources: [
						'test/connect/fixtures/someLib/test-resources',
						'test/connect/fixtures/anotherLib/testres'
					],
					contextpath: 'mycontext'
				}
			}

		},

		// Unit tests.
		mochaTest: {
			tests: {
				src: ['test/*_test.js']
			},
			connectTest: {
				src: ['test/connect_test.js' ]
			},
			preload: {
				src: 'test/preload_test.js'
			}
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-mocha-test');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', [
		'clean',

		'openui5_theme',
		'openui5_library_preload',
		'openui5_preload',
		'openui5_connect',

		'mochaTest:tests'
	]);

	grunt.registerTask('test-preload', [
		'clean',

		'openui5_preload',

		'mochaTest:preload'
	]);

	// By default, lint and run all tests.
	grunt.registerTask('default', [ 'eslint', 'test']);

};

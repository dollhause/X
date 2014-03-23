// ----------------------------------------------------------------
//
//	Tests > Configuration
//
// ----------------------------------------------------------------
var config = module.exports;

config['Helpers'] = {
    environment: 'node',
    rootPath: "../",
    sources: ['X.js'],
    tests: [
        'Tests/Helpers/*-test.js',
        'Tests/Core/*-test.js'
    ]
};
#!/usr/bin/env node
var yargs = require('yargs')
    .usage('Make mongoscope dance.\nUsage: $0')
    .default('u', 'http://localhost:29017')
    .alias('u', 'scope')
    .describe('u', 'root url of the scope to point at')
    .default('s')
    .alias('s', 'seed')
    .describe('s', 'seed mongo url to run commands against'),
  argv = yargs.argv;

if(argv.help || argv.h) return yargs.showHelp();

require('../index')(argv);

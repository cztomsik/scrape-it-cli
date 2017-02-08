#!/usr/bin/env node

const path = require('path');
const docopt = require('docopt').docopt;
const getStdin = require('get-stdin');
const scrape = require.main.require('scrape-it');

const DEF_CFG = './scrape.config.js';

const doc = `
Scrape it.

Usage:
  scrape-it - [options]
  scrape-it <url> [options]

Options:
  -h --help      Show this screen.
  --version      Show version.
  --config=FILE  Config [default: ${DEF_CFG}]
`;

const options = parse();
const config = getConfig();

if (options.stdin){
  getStdin().then((str) => {
    console.log(scrape.scrapeHTML(str, config));
  });
}

if (options.url){
  scrape(options.url, config).then((res) => {
    console.log(res);
  });
}


function parse(){
  const args = docopt(doc);

  return {
    url: args['<url>'],
    stdin: args['-'],
    config: args['--config'] || DEF_CFG
  };
}

function getConfig(){
  return require(path.resolve(process.cwd(), options.config));
}

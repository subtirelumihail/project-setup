import chalk      from "chalk";
import readline   from 'readline';
import {log}      from './logger';

import config  from './config';
const {port, hostname} =  config;

export const url  = chalk.yellow.bold(`http://${hostname}:${port}`);

export const resetTerminal = () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  console.log(`Listening at: [ ${url} ]\n`);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

export default {
  init() {
    // Reset the terminal window
    resetTerminal();
    
    //Listen to stdin input and handle action
    rl.on('line', function(line){
        switch(line) {
          case 'port':
            log(port);
            break;
          case 'url':
            log(url);
            break;
          case 'clear':
            resetTerminal();
            break;
          case 'help':
            console.log('Create a readline commands for the moment the following commands work:\n- url -> displays the url of the application\n- port -> displays the port number');
            break;
        }
    });
    
    rl.on('close', function() {
      return process.exit(1);
    });
  }
};

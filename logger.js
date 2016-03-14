import chalk from "chalk";
import logger from "nano-logger";

const log = logger("webpack");
function Logger() {}

Logger.prototype.apply = (compiler) => {
  
  compiler.plugin("invalid", () => {
    log(chalk.red("✗ build is now INVALID"));
  });
  
  compiler.plugin("done", () => {
    log(chalk.green("✓ build is now VALID"));
  });
};

module.exports = Logger;

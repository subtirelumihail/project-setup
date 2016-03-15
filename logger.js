import chalk from "chalk";
import logger from "nano-logger";

export const log = logger("webpack");

export function customLogger(s) {
  log(chalk.green(`✓ build is now VALID (${s})`));
}

function Logger() {}
Logger.prototype.apply = (compiler) => {
  compiler.plugin("invalid", () => {
    log(chalk.red("✗ build is now INVALID"));
  });
};

export default Logger;

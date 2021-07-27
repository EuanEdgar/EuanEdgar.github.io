const runOnce = require('./runOnce');

class RunScriptPlugin {
  name = 'RunScriptPlugin'

  constructor(scriptPath) {
    if (typeof scriptPath !== 'string') {
      throw new Error(
        `${this.name} was not given a valid string script path as its first argument. Argument was \`${scriptPath}\`.`,
      );
    }
    this.scriptPath = scriptPath;

    ['run'].forEach((fnName) => { this[fnName] = this[fnName].bind(this); });
  }

  apply(compiler) {
    compiler.hooks.run.tapPromise(this.name, this.run);
    compiler.hooks.watchRun.tapPromise(
      this.name,
      runOnce(this.run, Promise.resolve(undefined)),
    );
  }

  async run() {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(this.scriptPath)();
  }
}

module.exports = RunScriptPlugin;

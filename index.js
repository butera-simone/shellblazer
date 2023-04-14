const { spawnSync } = require('child_process')

module.exports = createShellBlazer()

function createShellBlazer (opts = {}) {
  function shellBlazer (...args) {
    return new Promise((resolve, reject) => {
      for (const line of args) {
        const proc = spawnSync(line[0], [...line.slice(1)], { stdio: 'inherit', cwd: shellBlazer.cwd })
        if (proc.status !== 0) {
          return reject(new Error(`"${line.join(' ')}"` + ' failed with code ' + proc.status))
        }
      }
      console.log()
      resolve()
    }
    )
  }
  shellBlazer.cwd = opts.cwd || '.'
  shellBlazer.configure = function configure (newOpts = {}) {
    return createShellBlazer({ ...opts, ...newOpts })
  }
  return shellBlazer
}

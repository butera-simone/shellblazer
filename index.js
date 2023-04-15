const { spawn } = require('child_process')

module.exports = createShellBlazer()

function createShellBlazer (opts = {}) {
  function shellBlazer (...args) {
    return new Promise((resolve, reject) => {
      for (const line of args) {
        const proc = spawn(line[0], line.slice(1), { stdio: 'inherit', cwd: shellBlazer.cwd })

        proc.on('error', reject)
        proc.on('exit', code => {
          if (code) reject(new Error('"' + line.join(' ') + '" failed with code: ' + code))
          else resolve()
        })
      }
      resolve()
    })
  }
  shellBlazer.cwd = opts.cwd || '.'
  shellBlazer.configure = function configure (newOpts = {}) {
    return createShellBlazer({ ...opts, ...newOpts })
  }
  return shellBlazer
}

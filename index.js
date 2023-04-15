const { spawn } = require('child_process')

module.exports = createShellBlazer()

function createShellBlazer (opts = {}) {
  async function shellBlazer (...args) {
    for (const line of args) {
      await new Promise((resolve, reject) => {
        const proc = spawn(line[0], line.slice(1), { stdio: 'inherit', cwd: shellBlazer.cwd, env: shellBlazer.env })

        proc.on('error', reject)
        proc.on('exit', code => {
          if (code) reject(new Error('"' + line.join(' ') + '" failed with code: ' + code))
          else resolve()
        })
      })
    }
  }
  shellBlazer.cwd = opts.cwd || '.'
  shellBlazer.env = opts.env || process.env
  shellBlazer.configure = function configure (newOpts = {}) {
    return createShellBlazer({ ...opts, ...newOpts })
  }
  return shellBlazer
}

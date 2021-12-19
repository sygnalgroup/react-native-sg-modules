/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-dynamic-require */
let modules

let storeMiddlewares = []
let connectRouter

try {
  // modules = require(`${__dirname}/../../onboarding-react-web/src/modules/index.js`)
  // eslint-disable-next-line global-require
  modules = require(`${__dirname}/../../../../src/modules/index.js`)

  storeMiddlewares = modules.storeMiddlewares || (() => [])
  connectRouter = modules.connectRouter || null
} catch (ex) {
  console.error(
    'Modules not found, please create a file with your modules in {PROJECT_ROOT}/src/modules/index.js ',
    ex
  )
  modules = {}
}

export { storeMiddlewares, connectRouter }

export default modules.default

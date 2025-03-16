import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginMocha from 'eslint-plugin-mocha'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha
      }
    }
  },
  {
    files: ['**/test/**/*.js'],
    plugins: {
      mocha: pluginMocha
    },
    rules: {
      'mocha/no-skipped-tests': 'error',
      'mocha/no-exclusive-tests': 'error'
    }
  },
  pluginJs.configs.recommended
]

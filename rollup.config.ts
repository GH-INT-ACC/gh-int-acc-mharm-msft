import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const config = {
  input: 'src/application.ts',
  output: { esModule: true, dir: 'dist', format: 'es' },
  plugins: [typescript(), nodeResolve({ preferBuiltins: true }), commonjs()]
}

export default config

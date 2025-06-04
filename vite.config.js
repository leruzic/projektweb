/**
 * @type {import('vite').UserConfig}
 */
export default{
    base: process.env.N0DE_ENV === 'production' ? '/projektweb/' : ''
}
/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/7/20
 * ======================================== */

let packageJson = require('../package')
let devServer = {

    // 开发环境下的路由404处理（线上环境的nginx try_files配置）
    historyApiFallback:{
        rewrites:[
            { from: RegExp(`^\/${packageJson.name}`), to: `/${packageJson.name}` }
        ]
    },

    https: true
}

module.exports = devServer
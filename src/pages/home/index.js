/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/10/18
 * ======================================== */

import Vue from 'vue'
import App from './App.vue'
import Base from '../../service/base'
import '../../registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Base)

new Vue({
    render: h => h(App)
}).$mount('#app')

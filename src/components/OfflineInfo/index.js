/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2019/12/27
 * ======================================== */

import OfflineInfo from './App.vue'

OfflineInfo.install = function (Vue) {

    let el = document.createElement('div');
    document.body.appendChild(el);

    let componentInstance = new Vue({
        render: h => h(OfflineInfo)
    }).$mount(el).$children[0]

    Vue.$offline = Vue.prototype.$offline = function (isOffline) {
        isOffline ? componentInstance.show() : componentInstance.hide()
    }

}

export default OfflineInfo
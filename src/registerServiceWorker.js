/* eslint-disable no-console */
import { register } from 'register-service-worker'
import Vue from 'vue'

register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
        console.info('SW已就绪')
    },
    registered () {
        console.info('SW已注册')
    },
    cached () {
        console.info('SW已缓存')
    },
    updatefound () {
        console.info('SW有更新')
    },
    updated () {
        console.info('SW已更新')
    },
    offline () {
        console.info('离线模式')
        Vue.$offline(true)
    },
    error (error) {
        console.error('Error during service worker registration:', error)
    }
})
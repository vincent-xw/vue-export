// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import fileSaver from 'file-saver'
// import shim from './config/shim'
import xlsx from 'xlsx'
import xlsxStyle from 'xlsx-style'

Vue.config.productionTip = false

Vue.prototype.$xlsx = xlsx;
Vue.prototype.$xlsxStyle = xlsxStyle;
Vue.prototype.$fileSaver = fileSaver;
Vue.prototype.$export = globalconf.xlsxExport;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

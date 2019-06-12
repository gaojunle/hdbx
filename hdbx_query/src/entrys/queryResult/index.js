/**
 * Created by VULCAN on 2018/9/26.
 */

import '@css/common/common'
import '@share/css/theme'
import Vue from 'vue'
import App from '@components/queryResult/app'
import newVue from '@share/js/utils/newVue'
import { Pagination } from 'element-ui'

Vue.use(Pagination)

newVue(App)
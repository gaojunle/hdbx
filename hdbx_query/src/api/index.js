/**
 * Created by Cray on 2017/1/5.
 */
import axios from '@share/api/axios'
import {USER_HOST} from '@share/api/config'
import queryResultApi from './queryResult'
import registerQuery from './registerQuery'
import Z11 from './Z11'
import R11 from './R11'
export default Object.assign({},
    queryResultApi,
    registerQuery,
    Z11,
    R11,
    {
        axios,
        USER_HOST,
    })




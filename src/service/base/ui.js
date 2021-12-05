/* ========================================
 *  company : Dilusense
 *   author : Kuangch
 *     date : 2018/10/18
 * ======================================== */

import '../../common/common.css'
import '../../common/default.style.scss'
import 'element-ui/lib/theme-chalk/index.css';
import ConvenienceImage from 'convenience-image'
import {
    Button,
    // Select,
    // Slider,
    // Option,
    // Switch,
    Input,
    // InputNumber,
    // Table,
    // TableColumn,
    // Col,
    // Row,
    Message,
    Dialog,
    Upload
} from 'element-ui'

import OfflineInfo from '../../components/OfflineInfo'

export default function (Vue) {

    Vue.use(Button)
    // Vue.use(Select)
    // Vue.use(Option)
    Vue.use(Input)
    // Vue.use(InputNumber)
    // Vue.use(Table)
    // Vue.use(TableColumn)
    // Vue.use(Col)
    // Vue.use(Row)
    // Vue.use(Slider)
    // Vue.use(Switch)
    Vue.use(Dialog)
    Vue.use(Upload)
    Vue.prototype.$message = Message

    Vue.use(ConvenienceImage)
    Vue.use(OfflineInfo)
}

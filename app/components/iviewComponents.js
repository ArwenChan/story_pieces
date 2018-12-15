import {
    Input,
    Page,
    Button,
    Alert,
    Message,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Upload,
    Steps,
    Step,
    Select,
    Option,
    Modal,
} from 'iview'

const iview = {
    Input,
    Page,
    Button,
    Alert,
    Message,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Upload,
    Steps,
    Step,
    Select,
    Option,
    Modal,
}


const Iview = {
    install(Vue) {
        for (let key of Object.keys(iview)) {
            Vue.component(key, iview[key])
        }
        Vue.prototype.$message = Message
        Vue.prototype.$modal = Modal
    }
}


export default Iview
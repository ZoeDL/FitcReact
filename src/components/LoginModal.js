/*
 * 登录失效弹框
 * @Author: Honye 
 * @Date: 2018-05-07 11:51:43 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-07 14:41:14
 */
import { Modal } from 'antd-mobile';

const LoginModal = {

    modal: null,

    alert: (title, message, actions, platform) => {
        if(this.modal) {
            this.modal.close();
            this.modal = null;
        }

        this.modal = Modal.alert(title, message, actions, platform);
    }
}

export default LoginModal;
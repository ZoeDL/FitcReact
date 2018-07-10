import React from 'react';
import { NavBar, Icon, List, InputItem } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';
import { connect } from 'dva';
import isPhoneAvailable from './util/validate';

class ModifyPhonePage extends React.Component {
    state = {
        phoneNumber2: ''
    }

    goBack = () => {
        router.goBack()
    }

    onInputChange = (v) => {
        this.setState({
            phoneNumber2: v
        })
    }

    onSave = () => {
        const { dispatch, login } = this.props;
        const {phoneNumber2} = this.state;
        const {user, token} = login;
        const {name, phoneNumber, avatar} = user;
        if (isPhoneAvailable(phoneNumber2)) {
            dispatch({
                type: 'modifyPhone/modifyPhone',
                payload: {
                    userId: user.userId,
                    token,
                    name,
                    phoneNumber,
                    phoneNumber2,
                    avatar
                }
            })
        }
    }

    render() {
        const rightContent = (
            <div className={styles.rightContent} onClick={this.onSave}>保存</div>
        )
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                    rightContent={rightContent}
                >修改备份电话</NavBar>
                <List className={styles.List}>
                    <InputItem
                        className={`row-cell ${styles.inputItem}`}
                        placeholder="请输入备用电话"
                        clear
                        onChange={this.onInputChange}
                    ></InputItem>
                </List>
            </div>
        )
    }
}

const mapStateToProps = ({ login, modifyPhone }) => ({
    login,
    modifyPhone
})

export default connect(mapStateToProps)(ModifyPhonePage);
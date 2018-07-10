import React from 'react';
import { NavBar, Icon, List, InputItem } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';
import { connect } from 'dva';
import checkInput from './util/validate';

class ModifyNamePage extends React.Component {

    state = {
        name: ''
    }

    goBack = () => {
        router.goBack()
    }

    onInputChange = (v) => {
        this.setState({
            name: v
        })
    }

    onSave = () => {
        const { dispatch, login } = this.props;
        const {name} = this.state;
        const {user, token} = login;
        const {phoneNumber, phoneNumber2, avatar} = user;
        if (checkInput(name)) {
            dispatch({
                type: 'modifyName/modifyTradeName',
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
                >修改交易称谓</NavBar>
                <List className={styles.List}>
                    <InputItem
                        className={`row-cell ${styles.inputItem}`}
                        placeholder="请输入新的交易称谓"
                        clear
                        onChange={this.onInputChange}
                    ></InputItem>
                </List>
            </div>
        )
    }
}

const mapStateToProps = ({ login, modifyName }) => ({
    login,
    modifyName
})

export default connect(mapStateToProps)(ModifyNamePage);
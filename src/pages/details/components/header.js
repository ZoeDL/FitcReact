import React from 'react';
import styles from './header.less';
import { Button } from 'antd-mobile';
import images from '../../../constants/Images';

class Header extends React.Component{
    render(){
        const { type, bankType, paymentFullname } = this.props; 
        let img;
        let noteType;
        let btnStyle;
        if (type === "0"){
            img = images.IC_SILVER;
            noteType = bankType;
            btnStyle = { color: '#44F036', border: '#44F036 1px solid'};
        }else if(type === "1"){
            img = images.ICON_SHANG;
            noteType = '商票';
            btnStyle = { color: '#F0364F', border: '#F0364F 1px solid' };
        }
            return(
                <div className={styles.container}>
                    <div className={styles.pic}>
                        <img src={img} alt="logo" className={styles.logo}/>
                    </div>
                    <div className={styles.title}>
                        <div>承兑人全称</div>
                        <div className={styles.source}>
                            <div>
                                <Button className={styles.btn} style={btnStyle} type="ghost" size="small" inline>{noteType}</Button>
                            </div>
                            <div className={styles.name} >
                                {paymentFullname}
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

export default Header;
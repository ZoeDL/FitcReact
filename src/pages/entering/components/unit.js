import React from 'react';
import styles from './unit.less';

class Unit extends React.PureComponent{
    render(){
        const { title, ...restProps} = this.props;
        let content, wordNum;
        switch(title){  
                case '金额(元)':
                    content = '请输入发票金额';
                    break;
                case '买入成本(万)':
                    content = '请输入买入成本';
                    break;
                case '发票信息':
                    content = ' ';
                    break;
                case '发票代码':
                    wordNum = 12;
                    break;
                case '发票号码':
                    wordNum = 8;
                    break;
                default:
                    wordNum = 34;
                    break;
            }
        
        return(
                <div className={styles.unit}>
                    <div className={styles.title}>{this.props.title}</div>
                    <div>
                        <input placeholder={content || `请输入${this.props.title}`} 
                                maxLength= {wordNum} size="40" 
                                {...restProps}>
                        </input>
                    </div>
                </div>
        )
    }
}

export default Unit;
import React from 'react';
import styles from './Filter.less';
import { Button, Toast, DatePicker } from 'antd-mobile';
import images from '../../../constants/Images';
import convertUtil from '../../../utils/convertUtil';
import DateUtil from '../../../utils/dateUtil';

/**
 * 遍历对象
 * @param {*} object 
 */
function ergodic(object) {
    let arr = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            arr.push(element);
        }
    }
    return arr;
}

const data1 = ergodic(convertUtil.tradeType_today); //交易类型
const data2 = ergodic(convertUtil.paymentType_today); //承兑行类型
let dateStart = DateUtil.format(DateUtil.addYear(new Date(),-1),'yyyy-MM-dd');
let dateEnd = DateUtil.format(new Date() ,'yyyy-MM-dd');

const DateChildren = ({ extra, onClick, children }) => (
    <div onClick={onClick}>
        <span>{extra}</span>
    </div>
)

class FilterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: data1.map((item, index)=> {
                if (index === 0) {
                    return true
                } else {
                    return false
                }
            }),
            selected1: data2.map((item, index)=> {
                if (index === 0) {
                    return true
                } else {
                    return false
                }
            }),
            restDayStart: 0,
            restDayEnd: 366,
            minMoney: 0,
            maxMoney: 100000,
            dateStart: dateStart,
            dateEnd: dateEnd
        }
    }

    componentDidMount() {
        const { open } = this.props;
        this.showFilter(open);
    }

    componentWillReceiveProps(nextProps) {
        const { open } = nextProps;
        if (nextProps.open === this.props.open) {
            return
        }
        this.showFilter(open);
    }

    showFilter = (open) => {
        if (open) {
            this.filter.style.webkitTransform = "translateX(0px)";
        } else {
            const wid = document.documentElement.clientWidth;
            this.filter.style.webkitTransform = `translateX(${wid}px)`;
        }
    }

    /** 筛选标签点击事件 */
    onTagsClick = (index, key) => {
        if (index === 0) {
            this.setState({
                [key]: this.state[key].map((item, index) => {
                    if (index === 0) {
                        item = true;
                        return item;
                    } else {
                        item = false;
                        return item;
                    }
                })
            })
        } else {
            this.setState({
                [key]: this.state[key].map((item, zindex) => {
                    if (zindex === 0) {
                        return item = false;
                    } else {
                        if(index === zindex) {
                            item = !item;
                            return item;
                        } else {
                            return item;
                        }
                    }
                })
            })
        } 
    }

    /** 表单输入框change函数 */
    onInputChange = (key) => (e) => {
        this.setState({
            [key]: e.target.value
        })
    }
    
    /**
     * 交割日期选择
     */
    onDateChange = (key) => (date) => {
        let newDate = DateUtil.format(new Date(date) ,'yyyy-MM-dd');
        this.setState({
            [key]: newDate
        })
    }

    onRecover = () => {
        this.setState({
            selected: data1.map((item, index)=> {
                if (index === 0) {
                    return true
                } else {
                    return false
                }
            }),
            selected1: data2.map((item, index)=> {
                if (index === 0) {
                    return true
                } else {
                    return false
                }
            }),
            restDayStart: 0,
            restDayEnd: 366,
            minMoney: 0,
            maxMoney: 100000,
            dateStart: dateStart,
            dateEnd: dateEnd
        })
    }

    /**
     * 交割日期验证
     */
    testDate = (d1, d2) => {
        return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
    }

    onSure = (query, onClose) => {
        const {selected, selected1, restDayStart, restDayEnd, minMoney, maxMoney, dateStart, dateEnd} = this.state;
        if (Number(restDayStart) > Number(restDayEnd)) {
            Toast.info('剩余天数范围输入不正确');
            return
        }
        if (Number(minMoney) > Number(maxMoney)) {
            Toast.info('票据金额范围输入不正确');
            return
        }
        if (Number(minMoney) > 100000 || Number(maxMoney) > 100000 ) {
            Toast.info('票据面额最大值不超过10亿');
            return
        }
        const testResult = this.testDate(dateEnd, dateStart);
        if (!testResult) {
            Toast.info('日期范围输入不正确');
            return
        }
        const tradeType_selected = selected.map((item, index) => {  //交易类型
            if (item) {
                return data1[index].code
            } 
        }).filter((item) => (item !== undefined)).join(',');
        const paymentType_selected = selected1.map((item, index) => {  //承兑行类型
            if (item) {
                return data2[index].code
            } 
        }).filter((item) => (item !== undefined)).join(',');
        const restDays = `${restDayStart}~${restDayEnd}`;
        const ticketPrice = `${minMoney * 10000}~${maxMoney * 10000}`;
        const date = `${dateStart}~${dateEnd}`;
        const options = {
            paymentType: paymentType_selected,
            restDayStart: restDayStart,
            restDayEnd: restDayEnd,
            restDays: restDays,
            ticketPrice: ticketPrice,
            moneyStart: minMoney * 10000,
            moneyEnd: maxMoney * 10000,
            tradeType: tradeType_selected,
            dateStart: dateStart,
            dateEnd: dateEnd,
            date: date
        }
        query(options);
        onClose();
    }

    render() {
        const { onClose, query } = this.props;
        const {selected, selected1, restDayStart, restDayEnd, minMoney, maxMoney, dateStart, dateEnd} = this.state;
        return (
            <div className={styles.container} ref={el => this.filter = el} >
                <div className={styles.part} onClick={onClose} ></div>
                <div className={styles.sidebar} >
                    <div className={styles.section} >
                        <div className={styles.title} > 交易类型 </div>
                        <div className={styles.tags}>
                            {data1.map((item, index) => (
                                <div className={styles.tag} key={index} onClick={() => this.onTagsClick(index, 'selected')} >
                                    <span className={selected[index] ? styles.tagActive : ''}>{item.label}</span>
                                    <img className={selected[index] ? styles.tagsActive : ''} src={images.IC_RADIO_CHECKED} alt="icon" />
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className={styles.section} >
                        <div className={styles.title} > 承兑行类型 </div>
                        <div className={styles.tags}>
                            {data2.map((item, index) => (
                                <div className={styles.tag} key={index} onClick={() => this.onTagsClick(index, 'selected1')}>
                                    <span className={selected1[index] ? styles.tagActive : ''}>{item.label}</span>
                                    <img className={selected1[index] ? styles.tagsActive : ''} src={images.IC_RADIO_CHECKED} alt="icon" />
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className={styles.section} >
                        <div className={styles.title} > 剩余天数区间（天） </div>
                        <div className={styles.area}>
                            <div className={styles.inputarea}>
                                <input type="text"
                                    className={styles.inputTag}
                                    placeholder="0"
                                    maxLength="3"
                                    value={restDayStart}
                                    onChange={this.onInputChange('restDayStart')}
                                />
                            </div>
                            <div className={styles.linearea}>—</div>
                            <div className={styles.inputarea}>
                                <input type="text"
                                    className={styles.inputTag}
                                    placeholder="366"
                                    maxLength="3"
                                    value={restDayEnd}
                                    onChange={this.onInputChange('restDayEnd')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.section} >
                        <div className={styles.title} > 票据总额区间（万） </div>
                        <div className={styles.area}>
                            <div className={styles.inputarea}>
                                <input type="text"
                                    className={styles.inputTag}
                                    placeholder="最小总额"
                                    maxLength="6"
                                    value={minMoney}
                                    onChange={this.onInputChange('minMoney')}
                                />
                            </div>
                            <div className={styles.linearea}>—</div>
                            <div className={styles.inputarea}>
                                <input type="text"
                                    className={styles.inputTag}
                                    placeholder="最大总额"
                                    maxLength="6"
                                    value={maxMoney}
                                    onChange={this.onInputChange('maxMoney')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.section} >
                        <div className={styles.title} > 交割日期 </div>
                        <div className={styles.area}>
                            <div className={styles.inputarea}>
                                <div className={styles.inputTag}>
                                    <DatePicker
                                        mode="date"
                                        title="开始日期"
                                        extra="请选择"
                                        className={styles.datepicker}
                                        format={(date) => DateUtil.format(date, 'yyyy/MM/dd')}
                                        value={ new Date(dateStart) }
                                        onChange={ this.onDateChange('dateStart') }
                                    >
                                        <DateChildren />
                                    </DatePicker>
                                </div>
                            </div>
                            <div className={styles.linearea}>—</div>
                            <div className={styles.inputarea}>
                                <div className={styles.inputTag}>
                                    <DatePicker
                                        mode="date"
                                        title="结束日期"
                                        extra="请选择"
                                        className={styles.datepicker}
                                        format={(date) => DateUtil.format(date, 'yyyy/MM/dd')}
                                        value={ new Date(dateEnd) }
                                        onChange={ this.onDateChange('dateEnd') }
                                    >
                                        <DateChildren />
                                    </DatePicker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer}>
                            <div className={styles.buttonWrap}>
                                <Button
                                    className={`${styles.button} ${styles.blueButton}`}
                                    activeClassName={styles.blueButtonActive}
                                    onClick={this.onRecover}
                                >恢复全部</Button>
                            </div>
                            <div className={styles.buttonWrap}>
                                <Button
                                    className={`${styles.button} ${styles.orangeButton}`}
                                    activeClassName={styles.orangeButtonActive}
                                    onClick={() => this.onSure(query, onClose)}
                                >确认</Button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterPage;
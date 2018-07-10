import React from 'react';
import styles from './TicketRow.less';
import { Button } from 'antd-mobile';
import images from '../../../constants/Images';
import dateUtil from '../../../utils/dateUtil';
import router from 'umi/router';
import calckitUtil from '../../../utils/calckitUtils';

class TicketRow extends React.Component {

    onItemClick = (id) => {
        router.push({
            pathname: '/ticket_details',
            query: {id}
        })
    }

    render() {
        const {data} = this.props;
        let statusImage;
        switch (data.assureStatus) {
            case 0:
                statusImage = null;
                break;
            case 1:
                statusImage = images.STATUS_ING;
                break;
            case 2:
                statusImage = images.STATUS_FAILURE;
                break;
            case 3:
                statusImage = images.STATUS_PASS;
                break;
            default:
                break;
        }
        return(
            <div className={styles.container} onClick={() => this.onItemClick(data.pleTrdId)} >
                <div className={styles.top}>
                    <Button type="ghost"
                        size="small"
                        inline
                        activeStyle={false} 
                        className={styles.tags}
                    >商票</Button>
                    <Button type="ghost"
                        size="small"
                        inline
                        activeStyle={false} 
                        className={styles.tags}
                    >收票人</Button>
                    <div className={styles.name}>{data.cnptyFullName}</div>
                </div>
                <div className={styles.middle}>
                    <div className={styles.ticketType}>电商</div>
                    <div className={styles.money}>{calckitUtil.formatTicketPrice(data.ticketsPrice, 10000)}万元</div>
                    <div>{data.lastDays}天到期</div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.date}>
                        出票日：{dateUtil.format(new Date(data.outTicketDate), 'yyyy/MM/dd')}
                    </div>
                    <div className={styles.date}>
                        到期日：{dateUtil.format(new Date(data.expireDate), 'yyyy/MM/dd')}
                    </div>
                </div>
                { data.assureStatus ? <img src={statusImage} className={styles.status} alt="审核状态" /> : null }
            </div>
        )
    }
}

export default TicketRow;
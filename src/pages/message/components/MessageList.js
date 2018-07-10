import React from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, List } from 'antd-mobile';
import styles from './MessageList.less';
import images from '../../../constants/Images';
import router from 'umi/router';

const Item = List.Item;
const Brief = Item.Brief;

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
        };
    }

    /** 点击消息进入详情 */
    onItemClick = (item) => {
        router.push({
            pathname: '/message_details',
            query: item
        })
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        this.setState({
            height: hei,
        })
    }

    render() {
        const { list, onRefresh, refreshing } = this.props;
        return (
            <div>
                <PullToRefresh
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    // refreshing={this.state.refreshing}
                    refreshing={refreshing}
                    // onRefresh={() => {
                    //     this.setState({ refreshing: true });
                    //     setTimeout(() => {
                    //         this.setState({ refreshing: false });
                    //     }, 1000);
                    // }}
                    onRefresh={onRefresh}
                >
                    {list.map((item, index) => (
                        <Item
                            key={index}
                            className={styles.item}
                            extra={item.timestamp}
                            align="top"
                            thumb={images.IC_SILVER_RECT}
                            multipleLine
                            onClick={() => this.onItemClick(item)}
                        >
                            {item.title} <Brief>{item.content}</Brief>
                        </Item>
                    ))}
                </PullToRefresh>
            </div>
        );
    }
}

export default MessageList;
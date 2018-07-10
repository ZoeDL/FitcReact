
import { MessageType, MarketChartMsgName } from '../../../constants/TopicName';

/** 查询图表数据 */
export function QueryChartData({ socket, params }) {
    socket.sendToServer(MessageType.NO_LOGIN, MarketChartMsgName.QUERY_DATA, { ...params });
}

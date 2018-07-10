/*
 * 银行账户格式化
 * @Author: caocong 
 */
'use strcit';

import images from '../constants/Images';

export default function bankcardUtil() {

}

const bank = {
    ZGRMYH: '中国人民银行',
    ZGYH: "中国银行",
    ZGGSYH: "中国工商银行",
    ZSYH: "招商银行",
    HFYH: "汇丰银行",
    ZXYH: '中信银行',
    HXYH: '华夏银行',
    gfyh: "广发银行",
    dyyh: "东亚银行",
    wncsyhh: "武汉农村商业银行",
    hbyh: "湖北银行",

    zgjsyh: "中国建设银行",
    jtyh: "交通银行",
    xyyh: "兴业银行",
    pfyh: "浦发银行",
    hqyh: "花旗银行",
    hkyh: "汉口银行",
    OTHER: "其他银行",

    zgnyyh: "中国农业银行",
    zgmsyh: "中国民生银行",
    zgyzyh: "中国邮政银行",

    zjsyyh: "浙商银行",
    gdyh: "光大银行",
    payh: "平安银行",
};

const styles = {
    bankcardRed: '#b85758', //银行卡颜色red
    bankcardBlue: '#32639e', //银行卡颜色blue
    bankcardGreen: '#3d8a78',//银行卡颜色green
    bankcardYellow: '#8a823d',//银行卡颜色yellow
    bankcardYellow2: '#b2803e',//银行卡颜色yellow2
}

/**
 * 银行全称是否包含指定的银行名称
 * str1： 银行全称，str2：银行名称
 */

function convertBank(str1, str2) {
    if (str1.indexOf(str2) !== -1) {
        return true;
    } else {
        return false;
    }
}

/**
 * 格式化银行名称
 */
bankcardUtil.formatBankName = (name) => {
    let bankName = bank.OTHER; // 其他银行
    if (convertBank(name, bank.ZGRMYH)) { //中国人民银行
        bankName = bank.ZGRMYH;
    } else if (convertBank(name, bank.ZGYH)) { //中国银行
        bankName = bank.ZGYH;
    } else if (convertBank(name, bank.ZGGSYH)) { //中国工商银行
        bankName = bank.ZGGSYH;
    } else if (convertBank(name, bank.ZSYH)) { //招商银行
        bankName = bank.ZSYH;
    } else if (convertBank(name, bank.HFYH)) { //汇丰银行
        bankName = bank.HFYH;
    } else if (convertBank(name, bank.ZXYH)) { //中信银行
        bankName = bank.ZXYH;
    } else if (convertBank(name, bank.HXYH)) { //华夏银行
        bankName = bank.HXYH;
    } else if (convertBank(name, bank.gfyh)) { //广发银行
        bankName = bank.gfyh;
    } else if (convertBank(name, bank.dyyh)) { //东亚银行
        bankName = bank.dyyh;
    } else if (convertBank(name, bank.wncsyhh)) { //武汉农村商业银行
        bankName = bank.wncsyhh;
    } else if (convertBank(name, bank.hbyh)) { //湖北银行
        bankName = bank.hbyh;
    } else if (convertBank(name, bank.zgjsyh)) { //中国建设银行
        bankName = bank.zgjsyh;
    } else if (convertBank(name, bank.jtyh)) { //交通银行
        bankName = bank.jtyh;
    } else if (convertBank(name, bank.xyyh)) { //兴业银行
        bankName = bank.xyyh;
    } else if (convertBank(name, bank.pfyh)) { //浦发银行
        bankName = bank.pfyh;
    } else if (convertBank(name, bank.hqyh)) { //花旗银行
        bankName = bank.hqyh;
    } else if (convertBank(name, bank.hkyh)) { //汉口银行
        bankName = bank.hkyh;
    } else if (convertBank(name, bank.zgnyyh)) { //中国农业银行
        bankName = bank.zgnyyh;
    } else if (convertBank(name, bank.zgmsyh)) { //中国民生银行
        bankName = bank.zgmsyh;
    } else if (convertBank(name, bank.zgyzyh)) { //中国邮政银行
        bankName = bank.zgyzyh;
    } else if (convertBank(name, bank.zjsyyh)) { //浙商银行
        bankName = bank.zjsyyh;
    } else if (convertBank(name, bank.gdyh)) { //光大银行
        bankName = bank.gdyh;
    } else if (convertBank(name, bank.payh)) { //平安银行
        bankName = bank.payh;
    } 
    return bankName;
}

/**
 * 格式化银行logo
 */
bankcardUtil.formatBankLogo = (name) => {
    let bankLogo = images.ICON_OTHER; //其他银行
    if (convertBank(name, bank.ZGRMYH)) { //中国人民银行
        bankLogo = images.ICON_ZGRMYH; 
    } else if (convertBank(name, bank.ZGYH)) { //中国银行
        bankLogo = images.ICON_ZGYH; 
    } else if (convertBank(name, bank.ZGGSYH)) { //中国工商银行
        bankLogo = images.ICON_ZGGSYH; 
    } else if (convertBank(name, bank.ZSYH)) { //招商银行
        bankLogo = images.ICON_ZSYH; 
    } else if (convertBank(name, bank.HFYH)) { //汇丰银行
        bankLogo = images.ICON_HFYH; 
    } else if (convertBank(name, bank.ZXYH)) { //中信银行
        bankLogo = images.ICON_ZXYH; 
    } else if (convertBank(name, bank.HXYH)) { //华夏银行
        bankLogo = images.ICON_HXYH; 
    } else if (convertBank(name, bank.gfyh)) { //广发银行
        bankLogo = images.ICON_GFYH; 
    } else if (convertBank(name, bank.dyyh)) { //东亚银行
        bankLogo = images.ICON_DYYH; 
    } else if (convertBank(name, bank.wncsyhh)) { //武汉农村商业银行
        bankLogo = images.ICON_WNCSYHH; 
    } else if (convertBank(name, bank.hbyh)) { //湖北银行
        bankLogo = images.ICON_HBYH; 
    } else if (convertBank(name, bank.zgjsyh)) { //中国建设银行
        bankLogo = images.ICON_ZGJSYH; 
    } else if (convertBank(name, bank.jtyh)) { //交通银行
        bankLogo = images.ICON_JTYH; 
    } else if (convertBank(name, bank.xyyh)) { //兴业银行
        bankLogo = images.ICON_XYYH; 
    } else if (convertBank(name, bank.pfyh)) { //浦发银行
        bankLogo = images.ICON_PFYH; 
    } else if (convertBank(name, bank.hqyh)) { //花旗银行
        bankLogo = images.ICON_HQYH; 
    } else if (convertBank(name, bank.hkyh)) { //汉口银行
        bankLogo = images.ICON_HKYH; 
    } else if (convertBank(name, bank.zgnyyh)) { //中国农业银行
        bankLogo = images.ICON_ZGNYYH; 
    } else if (convertBank(name, bank.zgmsyh)) { //中国民生银行
        bankLogo = images.ICON_ZGMSYH; 
    } else if (convertBank(name, bank.zgyzyh)) { //中国邮政银行
        bankLogo = images.ICON_ZGYZYH; 
    } else if (convertBank(name, bank.zjsyyh)) { //浙商银行
        bankLogo = images.ICON_ZJSYYH; 
    } else if (convertBank(name, bank.gdyh)) { //光大银行
        bankLogo = images.ICON_GDYH; 
    } else if (convertBank(name, bank.payh)) { //平安银行
        bankLogo = images.ICON_PAYH; 
    } 
    return bankLogo;
}

/**
 * 格式化银行卡颜色
 */
bankcardUtil.formatBankColor = (name) => {
    let bankColor = styles.bankcardBlue; //其他银行
    if (convertBank(name, bank.ZGRMYH)) { //中国人民银行
        bankColor = styles.bankcardRed;
    } else if (convertBank(name, bank.ZGYH)) { //中国银行
        bankColor = styles.bankcardRed;
    } else if (convertBank(name, bank.ZGGSYH)) { //中国工商银行
        bankColor = styles.bankcardRed;
    } else if (convertBank(name, bank.ZSYH)) { //招商银行
        bankColor = styles.bankcardRed;
    } else if (convertBank(name, bank.HFYH)) { //汇丰银行
        bankColor = styles.bankcardRed;
    } else if (convertBank(name, bank.ZXYH)) { //中信银行
        bankColor = styles.bankcardRed;
    } else if (convertBank(name, bank.HXYH)) { //华夏银行
        bankColor = styles.bankcardRed;
    } else if (convertBank(name, bank.gfyh)) { //广发银行
        bankColor = styles.bankcardRed;
    } else if (convertBank(name, bank.dyyh)) { //东亚银行
        bankColor = styles.bankcardRed;
    } else if (convertBank(name, bank.wncsyhh)) { //武汉农村商业银行
        bankColor = styles.bankcardRed;
    } else if (convertBank(name, bank.hbyh)) { //湖北银行
        bankColor = styles.bankcardRed;
    } else if (convertBank(name, bank.zgjsyh)) { //中国建设银行
        bankColor = styles.bankcardBlue;
    } else if (convertBank(name, bank.jtyh)) { //交通银行
        bankColor = styles.bankcardBlue;
    } else if (convertBank(name, bank.xyyh)) { //兴业银行
        bankColor = styles.bankcardBlue;
    } else if (convertBank(name, bank.pfyh)) { //浦发银行
        bankColor = styles.bankcardBlue;
    } else if (convertBank(name, bank.hqyh)) { //花旗银行
        bankColor = styles.bankcardBlue;
    } else if (convertBank(name, bank.hkyh)) { //汉口银行
        bankColor = styles.bankcardBlue;
    } else if (convertBank(name, bank.zgnyyh)) { //中国农业银行
        bankColor = styles.bankcardGreen;
    } else if (convertBank(name, bank.zgmsyh)) { //中国民生银行
        bankColor = styles.bankcardGreen;
    } else if (convertBank(name, bank.zgyzyh)) { //中国邮政银行
        bankColor = styles.bankcardGreen;
    } else if (convertBank(name, bank.zjsyyh)) { //浙商银行
        bankColor = styles.bankcardYellow;
    } else if (convertBank(name, bank.gdyh)) { //光大银行
        bankColor = styles.bankcardYellow2;
    } else if (convertBank(name, bank.payh)) { //平安银行
        bankColor = styles.bankcardYellow2;
    } 
    return bankColor;
}

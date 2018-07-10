export default function convertUtils(){

};

convertUtils.platformMark = function(num){
    let display = '';
    switch(num){
        case 0: 
            display ='正常';
            break;
        case 11:
            display = '重复票据';
            break;
        case 12:
            display = '异议冻结';
            break;
        default:
            break;
    }
    return display;
}


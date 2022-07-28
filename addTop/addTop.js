
const { topUp } = require('../Topup/topUp')

let subPlan = {};
let planList = [];
let totalPrice = 0;
let TOPUPLIST = [];

const addTop = (device, num) => {
    if (subPlan.date == 'NULL') {
        console.log('ADD_TOPUP_FAILED INVALID_DATE');
        return;
    }
    if (planList.length === 0) {
        console.log('ADD_TOPUP_FAILED SUBSCRIPTIONS_NOT_FOUND');
        return;
    }
    let checkSub = TOPUPLIST.find(item => item == device + '_' + num)
    if (checkSub) {
        console.log('ADD_TOPUP_FAILED DUPLICATE_TOPUP');
        return;
    }
    let topInfo = topUp[device];
    let topPrice = topInfo.amount * num;
    totalPrice = totalPrice + topPrice;
    TOPUPLIST.push(device + '_' + num);
}

module.exports = {
    addTop
}

const moment = require('moment')
const { Plans } = require('../Plans/Plans')

let subPlan = {};
let planList = [];
let totalPrice = 0;

const subScrip = (type, plan) => {
    let planDetails = Plans[type];
    let month = planDetails[plan.trim()].time
    if (subPlan.date == 'NULL') {
        console.log('ADD_SUBSCRIPTION_FAILED INVALID_DATE');
        return;
    }

    let enDate = moment(subPlan.date, "DD-MM-YYYY").add(month, 'M').format('DD-MM-YYYY');
    let obj = {
        type,
        plan,
        startDate: subPlan.date,
        enDate: moment(enDate, "DD-MM-YYYY").subtract(10, 'days').format('DD-MM-YYYY')
    }
    let checkSub = planList.find(item => item.type.trim() == type.trim())
    if (checkSub) {
        console.log('ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY');
        return;
    }
    if (!checkSub) {
        planList.push(obj);
        totalPrice = totalPrice + planDetails[plan.trim()].amount
    }


}

module.exports = {
    subScrip
}
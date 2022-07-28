
const fs = require("fs");
const moment = require('moment')
const plans = require('../models/PlanModel')
const topUp = require('../models/TopUpModel')
const filename = process.argv[2];


let subplan = {};
let planlist = [];
let totalprice = 0;
let topuplist = [];


const printInfo = () => {
    if (planlist.length === 0) {
        console.log('SUBSCRIPTIONS_NOT_FOUND');
        return;
    }
    for (j = 0; j < planlist.length; j++) {
        console.log('RENEWAL_REMINDER ' + planlist[j].type + ' ' + planlist[j].enDate);
    }
    console.log('RENEWAL_AMOUNT ' + totalprice);
}

const addTop = (device, num) => {
    if (subplan.date == 'NULL') {
        console.log('ADD_TOPUP_FAILED INVALID_DATE');
        return;
    }
    if (planlist.length === 0) {
        console.log('ADD_TOPUP_FAILED SUBSCRIPTIONS_NOT_FOUND');
        return;
    }
    let checkSub = topuplist.find(item => item == device + '_' + num)
    if (checkSub) {
        console.log('ADD_TOPUP_FAILED DUPLICATE_TOPUP');
        return;
    }
    let topInfo = topUp[device];
    let topPrice = topInfo.amount * num;
    totalprice = totalprice + topPrice;
    topuplist.push(device + '_' + num);
}

const subScrip = (type, plan) => {
    let planDetails = plans[type];
    let month = planDetails[plan.trim()].time
    if (subplan.date == 'NULL') {
        console.log('ADD_SUBSCRIPTION_FAILED INVALID_DATE');
        return;
    }

    let enDate = moment(subplan.date, "DD-MM-YYYY").add(month, 'M').format('DD-MM-YYYY');
    let obj = {
        type,
        plan,
        startDate: subplan.date,
        enDate: moment(enDate, "DD-MM-YYYY").subtract(10, 'days').format('DD-MM-YYYY')
    }
    let checkSub = planlist.find(item => item.type.trim() == type.trim())
    if (checkSub) {
        console.log('ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY');
        return;
    }
    if (!checkSub) {
        planlist.push(obj);
        totalprice = totalprice + planDetails[plan.trim()].amount
    }
}

const addDate = (dateStr) => {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (dateStr.match(regex) === null) {
        console.log('INVALID_DATE');
        subplan.date = 'NULL';
        return "NULL";
    }
    const [day, month, year] = dateStr.split('-');
    const isoFormattedStr = `${year}-${month}-${day}`;
    const date = new Date(isoFormattedStr);
    const timestamp = date.getTime();
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        console.log('INVALID_DATE');
        subplan.date = 'NULL';
        return "NULL";
    }
    subplan.date = dateStr;
}


module.exports = {
    printInfo,
    addTop,
    subScrip,
    addDate
}
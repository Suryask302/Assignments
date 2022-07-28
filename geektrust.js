const fs = require("fs");
const filename = process.argv[2];
const moment = require('moment')
const { Plans } = require('./Plans/Plans')
const {topUp} = require('./Topup/topUp')
let subPlan = {};
let planList = [];
let totalPrice = 0;
let TOPUPLIST = [];


function main(dataInput) {
    var inputLines = dataInput.toString().split("\n")
    for (i = 0; i < inputLines.length; i++) {
        if (inputLines) {
            let input = inputLines[i].split(' ')
            switch (input[0]) {
                case 'START_SUBSCRIPTION':
                    addDate(input[1].trim());
                    break;
                case 'ADD_SUBSCRIPTION':
                    subScrip(input[1], input[2]);
                    break;
                case 'ADD_TOPUP':
                    addTop(input[1], input[2]);
                    break;
                case 'PRINT_RENEWAL_DETAILS':
                    printInfo()
                    break;

            }
        }
    }
}

const printInfo = () => {
    if (planList.length === 0) {
        console.log('SUBSCRIPTIONS_NOT_FOUND');
        return;
    }
    for (j = 0; j < planList.length; j++) {
        console.log('RENEWAL_REMINDER ' + planList[j].type + ' ' + planList[j].enDate);
    }
    console.log('RENEWAL_AMOUNT ' + totalPrice);
}

data = fs.readFileSync(process.argv[2]).toString();
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
const addDate = (dateStr) => {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (dateStr.match(regex) === null) {
        console.log('INVALID_DATE');
        subPlan.date = 'NULL';
        return "NULL";
    }
    const [day, month, year] = dateStr.split('-');
    const isoFormattedStr = `${year}-${month}-${day}`;
    const date = new Date(isoFormattedStr);
    const timestamp = date.getTime();
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        console.log('INVALID_DATE');
        subPlan.date = 'NULL';
        return "NULL";
    }
    subPlan.date = dateStr;


}
main(data);


module.exports = { main }

let planList = [];
let totalPrice = 0;

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

module.exports = {
    printInfo
}
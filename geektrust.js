
const fs = require("fs");
let data = fs.readFileSync(process.argv[2]).toString();

let { addDate, subScrip, addTop, printInfo } = require('./routes/route')

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

main(data)

module.exports = { main }
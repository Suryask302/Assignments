

let fs = require('fs')
const {main} = require('./main/main')
let data = fs.readFileSync('./sample_input/input1.txt')
main(data);

module.exports = { main }
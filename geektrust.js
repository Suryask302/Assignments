

let fs = require('fs')
let fileName = process.argv[2]
const {main} = require('./main/main')
let data = fs.readFileSync('./sample_input/input1.txt')
main(data);

module.exports = { main }
// [US02] As a user I want the application to pronounce a winner when 4 is connected, so that the winner can celebrate
// Christoffer

let { $, sleep } = require('./funcs')

module.exports = function () {

    this.Given(/^that http:\/\/localhost:(\d+)\/game loaded properly$/, async function (arg1) {
        await helpers.loadPage('http://localhost:3000')
        
      });





}
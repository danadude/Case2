let { $, sleep } = require('./funcs')

module.exports = function () {

    this.Given(/^that http:\/\/localhost:(\d+)\/game loaded properly$/, async function (arg1) {
        await helpers.loadPage('http://localhost:3000')
        
      });





}
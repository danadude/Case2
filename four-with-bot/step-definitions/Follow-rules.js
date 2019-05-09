let { $, sleep, clickRow } = require("./funcs");

let sleepTime = 500;

module.exports = function() {
    this.When(/^"([^"]*)" plays a bricks$/,async function (arg1) {
      let gameInfo = await driver.findElement(by.css('h3')).getText()
      await gameInfo
      assert(gameInfo.includes('Spelare 1, drag 1') , 'wrong order!')
      clickRow(1)

      });

      this.Then(/^it should be "([^"]*)" turn$/,async function (arg1) {
        await sleep(sleepTime*6)
        let gameInfo = await driver.findElement(by.css('h3')).getText()
        await gameInfo
        assert(gameInfo.includes('Spelare 2, drag 1') , 'wrong order!')

      });      


};

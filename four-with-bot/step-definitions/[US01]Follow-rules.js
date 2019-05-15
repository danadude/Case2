let { $, sleep, clickCol } = require("./funcs");

let sleepTime = 500;

module.exports = function() {
    this.When(/^player (\d+) plays a bricks$/,async function (arg1) {
      let gameInfo = await driver.findElement(by.css('h3')).getText()
      await gameInfo
      assert(gameInfo.includes('Spelare 1, drag 1') , 'wrong order!')
      clickCol(1)

      });

      this.Then(/^it should be player (\d+) turn$/,async function (arg1) {
        await sleep(sleepTime*2)
        let gameInfo = await driver.findElement(by.css('h3')).getText()
        await gameInfo
        assert(gameInfo.includes('Spelare 2, drag 1') , 'wrong order!')
        clickCol(1)
      });      

      this.Then(/^the turn should return to player (\d+)$/,async function (arg1) {
        await sleep(sleepTime*2)
        let gameInfo = await driver.findElement(by.css('h3')).getText()
        await gameInfo
        assert(gameInfo.includes('Spelare 1, drag 2') , 'wrong order!')
      });

};

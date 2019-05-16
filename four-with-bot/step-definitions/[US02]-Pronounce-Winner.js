// [US02] As a user I want the application to pronounce a winner when 4 is connected, so that the winner can celebrate
// [US03] and [US04] are also incorporated in this test.
// Christoffer

let { clickCol, $, sleep, playGame } = require('./funcs')

module.exports = function () {

    this.Given(/^that http:\/\/localhost:(\d+)\/game loaded properly$/, async function (arg1) {
        await helpers.loadPage('http://localhost:3000/game')
        
      });

    this.When(/^a player has played (\d+) bricks that connect either horizontaly, verticaly or diagonaly$/, async function (brickstoWin) {
        await playGame("1616161")
      });

    this.Then(/^that player should win$/, async function () {

        let gameInfo = await driver.findElement(by.css('h3 > span')).getText()
        await gameInfo
        // asserting against the text on the page
        assert(gameInfo === 'Spelare 1 vann, efter 4 drag!', 'FEL')

      });

    
    this.Then(/^A message that congratulates the winner should be shown$/, function () {
       
        //This is tested in the above step. Pass.
       
      });

    this.When(/^the board is full$/, async function () {
        await playGame("012345601234560123456103254061234560123456")
      });

    this.When(/^no winner can be declared$/, function () {
      
        //This is tested in the above step

      });

    this.Then(/^a draw should be announced$/, async function () {
        
        //Detta scenario testar [US04] As a user I want the application to tell me when it is a draw.

        let gameInfo = await driver.findElement(by.css('h3')).getText()
        await gameInfo
        // asserting against the text on the page
        assert(gameInfo.includes('Det blev oavgjort!'), 'FEL')

      });


      this.When(/^one player has placed (\d+) bricks in row$/, async function (arg1) {
        // Loops the game sequence to let the first player who place a brick win
        await playGame("1626364")
      });

      this.Then(/^the losing player should be informed off the loss$/, async function () {
        
        //This test is checking user story [US03] As a user I want the application to tell me when i lost.
        //It will (or should) fail due to the functionality not existing in the program.

        let gameInfo = await driver.findElement(by.css('h3')).getText()
        await gameInfo
        // asserting agianst the text on the page
        assert(gameInfo.includes('Spelare 2 förlorade, efter 4 drag!'), 'Matchar EJ')

      
 
      });
}
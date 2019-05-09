// [US02] As a user I want the application to pronounce a winner when 4 is connected, so that the winner can celebrate
// [US03] and [US04] are also incorporated in this test.
// Christoffer

let { clickRow, $, sleep } = require('./funcs')

module.exports = function () {

    this.Given(/^that http:\/\/localhost:(\d+)\/game loaded properly$/, async function (arg1) {
        await helpers.loadPage('http://localhost:3000/game')
        
      });

    this.When(/^a player has played (\d+) bricks that connect either horizontaly, verticaly or diagonaly$/, async function (brickstoWin) {
        
        gameSeq = [1,6,1,6,1,6,1]
        for(i = 0; i < gameSeq.length; i++){
          await clickRow(gameSeq[i])}

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
        
        gameSeq = [0,1,2,3,4,5,6,0,1,2,3,4,5,6,0,1,2,3,4,5,6,1,0,3,2,5,4,0,6,1,2,3,4,5,6,0,1,2,3,4,5,6]
        for(i = 0; i < gameSeq.length; i++){
        await clickRow(gameSeq[i])}
    
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
        gameSeq = [1,6,2,6,3,6,4]
        for(i = 0; i < gameSeq.length; i++){
          await clickRow(gameSeq[i])
        }
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
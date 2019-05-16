let {$, sleep, clickCol, playGame} = require('./funcs');
 
let sleepTime = 500;

module.exports = function(){
  // Background
 
  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('http://localhost:3000/game');
  });
 
  this.When(/^I choose to play as two human players$/, async function () {
    let typeChoiceButtons = await $('.type-choice-btn' );
    for(let typeChoiceButton of typeChoiceButtons){
      await typeChoiceButton.click();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for(let choice of choices){
        let text = await choice.getText();
        if(text === 'Människa'){
          await choice.click();
          // we MUST break because the dom changes after click
          // and erases the old menu.. (tricky...)
          break;
        }
      }
      await sleep(sleepTime);
    }
  });
 
  this.When(/^with two different names$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
    await inputFields[0].sendKeys('Spelare 1');
    await sleep(sleepTime);
    await inputFields[1].sendKeys('Spelare 2');
    await sleep(sleepTime);
  });
 
  this.When(/^press the Börja spela\-button$/, async function () {
    let beginButton = await $('.begin-btn');
    await beginButton.click();
    await sleep(sleepTime);
  });
 
  this.Then(/^the game should start$/, async function () {
    let activeMenuLink = await $('.nav-link.active');
    let text = await activeMenuLink.getText();
    await sleep(sleepTime); // small wait needed
    assert.equal(text, 'Avbryt spelet', 'The game did not start!');
    await sleep(sleepTime);
  });
 
  // Scenarios
 
  this.When(/^the first player plays (\d+) bricks in a row horizontally$/, async function (brickstoWin) {
    // Loops the game sequence required to get the desired outcome
    await playGame("1626364")
  });

  this.Then(/^first player should win$/,async function () {
  let gameInfo = await driver.findElement(by.css('h3')).getText()
  // asserting agianst the text on the page
  assert(gameInfo.includes('Spelare 1 vann,'), 'Matchar EJ')
  });

  this.Then(/^second player should win$/, async function () {
    let gameInfo = await driver.findElement(by.css('h3 > span')).getText()
    // asserting agianst the text on the page
    assert(gameInfo.includes('Spelare 2 vann,'), 'Matchar EJ')
  });

  this.When(/^the first player plays (\d+) bricks in a row vertical$/,async function (brickstoWin) {
    // Loops the game sequence required to get the desired outcome
    await playGame("1616161")
  });

  this.When(/^the first player plays (\d+) bricks in a diagonally \(left to right\)$/,async function (brickstoWin) {
    // Loops the game sequence required to get the desired outcome
    await playGame("01122323313")
  });

  this.When(/^the first player plays (\d+) bricks in a diagonally \(right to left\)$/,async function (brickstoWin) {
    // Loops the game sequence required to get the desired outcome
    await playGame("65544343313")
  });

  this.When(/^the second player plays (\d+) bricks in a row horizontally$/,async function (brickstoWin) {
    // Loops the game sequence required to get the desired outcome
    await playGame("16251423")
  });

  this.When(/^the second player plays (\d+) bricks in a row vertical$/,async function (brickstoWin) {
    await playGame("16161626")
  });

  this.When(/^the second player plays (\d+) bricks in a diagonally \(left to right\)$/,async function (brickstoWin) {
    await playGame("1021223333")
  });

  this.When(/^the second player plays (\d+) bricks in a diagonally \(right to left\)$/,async function (brickstoWin) {
    await playGame("5645443333")
  });

}
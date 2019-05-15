let { $, sleep } = require('./funcs');
const { Builder } = require('selenium-webdriver');

//Sparar brädet till en array
async function boardToArray(){
    let boardArray = [];
    let slots = await $('.slot'); // 42 slots
    let count = 0;
    for(let slot of slots){
      let cssClass = await slot.getAttribute('class');
      let color = 'empty';
      if(cssClass.includes('red')){ color = 'red'; }
      if(cssClass.includes('yellow')){ color = 'yellow'; }
      boardArray.push(color);
    }
    return boardArray;
  }
 
let sleepTime = 500;
 
module.exports = function () {
 
  // Background
 
  this.When(/^I choose to play as a bot and a human$/, async function () {
    let typeChoiceButtons = await $('.type-choice-btn');
    let choiceArray = ['Bot', 'Människa'];
    for (let typeChoiceButton of typeChoiceButtons) {
      await typeChoiceButton.click();
      let currentChoice = choiceArray.shift();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for (let choice of choices) {
        let text = await choice.getText();
        if (text === currentChoice) {
          await choice.click();
          // we MUST break because the dom changes after click
          // and erases the old menu.. (tricky...)
          break;
        }
      }
      await sleep(sleepTime * 2);
    }
  });
 
  let gamesolverDriver;

  function $$(cssSelector) {
    return $(cssSelector, gamesolverDriver);
  }
 
  this.Given(/^that we are on the gamesolver page$/, async function () {
    // creating a new driver
    gamesolverDriver = await new Builder().forBrowser('chrome').build();
    // loading the gamesolver page
    await gamesolverDriver.get('https://connect4.gamesolver.org/');
  });
 
  this.When(/^I choose to play as human and bot in the gamesolver$/, async function () {
    let player2Button = await $$('#player_2');
    await player2Button.click();
    await sleep(sleepTime * 2);
  });

  this.When(/^two bots have played until someone wins$/, function () {
    
    
  });

  this.Then(/^the gamesolver bot should always win$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });
 
  // Now we only have to write two different functions (or at least understand)
  // how to dectect which column that was played as the latest move in
  // 1) our app/the prototype
  // 2) the gamesolver/perfect app
  //
  // Then we can start to fake being a human but sending the other bots
  // move so the two bots can meet automatically
  //
  // Then can we test if the perfect bot always win
 
 
}
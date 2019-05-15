let { $, sleep } = require('./funcs');
 
// Importing a standalone selenium webdriver
// since the selenium-cucumber-js module
// sadly only supports one...
const { Builder } = require('selenium-webdriver');
 
let sleepTime = 500;
 
module.exports = function () {
 
  // Background
 
  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('https://localhost:3000/game');
  });
 
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
 
  this.When(/^with two different names$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
    await inputFields[0].sendKeys('Our bot');
    await sleep(sleepTime * 2);
    await inputFields[1].sendKeys('Ms Perfect');
    await sleep(sleepTime * 2);
  });
 
  this.When(/^press the Börja spela\-button$/, async function () {
    let beginButton = await $('.begin-btn');
    beginButton.click();
    await sleep(sleepTime * 2);
  });
 
  this.Then(/^the game should start$/, async function () {
    let activeMenuLink = await $('.nav-link.active');
    let text = await activeMenuLink.getText();
    await sleep(1000); // small wait needed
    assert.equal(text, 'Avbryt spelet', 'The game did not start!');
    await sleep(sleepTime * 2);
  });
 
  let gamesolverDriver;
 
  // After having done a small change in funcs.js
  // so that $ can use any driver - as a second argument
  // I write my own function $$ that can be used instead of writing
  // gamesolverDriver.findElements(By.css('selector'));
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
    await sleep(sleepTime * 5);
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
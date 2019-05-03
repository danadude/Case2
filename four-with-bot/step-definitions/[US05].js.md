// [US05] As a user I want the normal bot to have some randomness in its game choices, so that I can improve my own game
// Tomas

let { $, sleep, clickRow } = require('./funcs');

let sleepTime = 500;

module.exports = function () {

  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('http://localhost:3000/game');
  });

  this.When(/^I choose to play as a human player vs\. a normal bot$/, async function () {
    let typeChoiceButton = await $('.type-choice-btn');
    await typeChoiceButton[0].click();
    let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
    for (let choice of choices) {
      let text = await choice.getText();
      if (text === 'Bot') {
        await choice.click();
        // we MUST break because the dom changes after click
        // and erases the old menu.. (tricky...)
        break;
      }
    }
    await typeChoiceButton[1].click();
    choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
    for (let choice of choices) {
      text = await choice.getText();
      if (text === 'Människa') {
        await choice.click();
        // we MUST break because the dom changes after click
        // and erases the old menu.. (tricky...)
        break;
      }
    }
    await sleep(sleepTime * 2);

  });


}
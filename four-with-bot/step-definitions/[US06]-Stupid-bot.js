// [US06] As a user I want the dumb bot to play worse than the normal bot
// David

let { $, sleep } = require('./funcs');
let spelare1 = 0
let spelare2 = 0
let sleepTime = 500;

module.exports = function () {

  // Background

  this.When(/^I choose to play as a dumb bot player vs\. a normal bot$/, async function () {
    let typeChoiceButton = await $('.type-choice-btn');

    await typeChoiceButton[0].click();
    let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
    for (let choice of choices) {
      let text = await choice.getText();
      if (text.includes("Dum")) {
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
      if (text === 'Bot') {
        await choice.click();
        // we MUST break because the dom changes after click
        // and erases the old menu.. (tricky...)
        break;
      }
      await sleep(sleepTime * 2);
    }
    });

  this.Then(/^they should play (\d+) games against each other$/,{timeout: 90*1000}, async function (gamesToPlay) {
    let gameInfo = await driver.findElement(by.css('h3')).getText()
      do {
      await sleep(sleepTime*2)
      gameInfo = await driver.findElement(by.css('h3')).getText()
      }
      while (! gameInfo.includes('vann'))
      if (gameInfo.includes('Spelare 2')){
      spelare2 ++
      }
      if (gameInfo.includes('Spelare 1')){
      spelare1 ++
      }
    let againButton = await $('.again-btn');
    await againButton.click();
    await sleep(2000)
    let beginButton = await $('.begin-btn');
    await beginButton.click();
    await sleep(sleepTime*2);
    do {
      await sleep(sleepTime*2)
      gameInfo = await driver.findElement(by.css('h3')).getText()
      }
      while (! gameInfo.includes('vann'))
      if (gameInfo.includes('Spelare 2')){
      spelare2 ++
      }
      if (gameInfo.includes('Spelare 1')){
      spelare1 ++
      }
    againButton = await $('.again-btn');
    await againButton.click();
    await sleep(2000)
    beginButton = await $('.begin-btn');
    await beginButton.click();
    await sleep(sleepTime*2);
    do {
      await sleep(sleepTime*2)
      gameInfo = await driver.findElement(by.css('h3')).getText()
      }
      while (! gameInfo.includes('vann'))
      if (gameInfo.includes('Spelare 2')){
      spelare2 ++
      }
      if (gameInfo.includes('Spelare 1')){
      spelare1 ++
      }
  });

  this.Then(/^the normal bot should win all games$/, async function () {
    assert(spelare2 === 3, 'Boten förlorade mot idioten!')
  });

}

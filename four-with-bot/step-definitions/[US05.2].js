// [US05] As a user I want the normal bot to have some randomness in its game choices, so that I can improve my own game
// Tomas

let { $, sleep, clickCol } = require('./funcs')

let sleepTime = 500

let spelare1 = 0
let spelare2 = 0

let j = 1

let fs = require('fs')

module.exports = function () {

  this.When(/^I choose to play as a normal bot vs\. a normal bot$/, async function () {
    // Click on drop down menu and choose 'Bot'
    let typeChoiceButton = await $('.type-choice-btn')
    await typeChoiceButton[0].click()
    let choices = await $('.dropdown-menu.type-choice.show .dropdown-item')
    for (let choice of choices) {
      let text = await choice.getText()
      if (text === 'Bot') {
        await choice.click()
        assert(text === 'Bot', '1st choice button is not set to Bot')
        // we MUST break because the dom changes after click
        // and erases the old menu.. (tricky...)
        break
      }
    }
    // Click on drop down menu and choose 'Bot'
    await typeChoiceButton[1].click()
    choices = await $('.dropdown-menu.type-choice.show .dropdown-item')
    for (let choice of choices) {
      text = await choice.getText()
      if (text === 'Bot') {
        await choice.click()
        assert(text === 'Bot', '2nd choice button is not set to Bot')
        // we MUST break because the dom changes after click
        // and erases the old menu.. (tricky...)
        break
      }
    }
    await sleep(sleepTime)
  })

  // Input spelare1 to first name field, and input spelare2 to second name field
  this.When(/^I enter two bot names$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]')
    await inputFields[0].sendKeys('Spelare 1')
    await sleep(sleepTime)
    await inputFields[1].sendKeys('Spelare 2')
    await sleep(sleepTime)
  })

  this.Then(/^the normal bots will play (\d+) games against each other$/, { timeout: 240 * 1000 }, async function (x) {
    while(true){
      let gameInfoH3 = await $('.game-info h3');
      // if there is no h3 run next iteration of the loop
      if(gameInfoH3 === null){ continue; }
      // otherwise check the text in the h3
      let text;
      try {
        text = await gameInfoH3.getText();
      }
      catch(e){
        // the element probably disappeared from the dom
        // we go a selenium "stale element" error
        // just continue the loop
        continue;
      }
      if(text.includes('oavgjort') || text.includes('vann')){
        // stop the loop if the game is over
        break;
      }
      // wait a short while between checks (otherwise the cpi is overloaded)
      await sleep(200);
    }


    // Saving game outcome as a screenshot
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync('./reports/BotVsBotOutcome' + j + '.png', data, 'base64')
    })
    j = j + 1


    let againButton = await $('.again-btn');
    await againButton.click();
    await sleep(2000)

    let beginButton = await $('.begin-btn');
    await beginButton.click();
    await sleep(sleepTime * 2);

    do {
      await sleep(sleepTime * 6)
      gameInfo = await driver.findElement(by.css('.game-info h3')).getText()
    }
    while (!gameInfo.includes('!'))

    if (gameInfo.includes('Spelare 2')) {
      spelare2++
    }

    if (gameInfo.includes('Spelare 1')) {
      spelare1++
    }

    // Saving game outcome as a screenshot
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync('./reports/BotVsBotOutcome' + j + '.png', data, 'base64')
    })
    j = j + 1


    againButton = await $('.again-btn');
    await againButton.click();
    await sleep(2000)

    beginButton = await $('.begin-btn');
    await beginButton.click();
    await sleep(sleepTime * 2);

    do {
      await sleep(sleepTime * 6)
      gameInfo = await driver.findElement(by.css('.game-info h3')).getText()
    }
    while (!gameInfo.includes('!'))

    if (gameInfo.includes('Spelare 2')) {
      spelare2++
    }

    if (gameInfo.includes('Spelare 1')) {
      spelare1++
    }

    // Saving game outcome as a screenshot
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync('./reports/BotVsBotOutcome' + j + '.png', data, 'base64')
    })
    j = j + 1

  });

  this.Then(/^take screen shot on bot vs bot Game outcome$/, async function () {
    // This is implemented in previous step
  })
}
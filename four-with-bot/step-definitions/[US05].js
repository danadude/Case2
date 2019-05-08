// [US05] As a user I want the normal bot to have some randomness in its game choices, so that I can improve my own game
// Tomas

let { $, sleep, clickRow } = require('./funcs')

let sleepTime = 500

let gameSeq = []
let i
let j = 1

let spelare1 = 'Anders_Bot'
let spelare2 = 'Bosse'

let fs = require('fs')


module.exports = function () {

  // Click on drop down menu and choose 'Bot'
  this.When(/^I choose to play as a human player vs\. a normal bot$/, async function () {
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
    // Click on drop down menu and choose 'Människa'
    await typeChoiceButton[1].click()
    choices = await $('.dropdown-menu.type-choice.show .dropdown-item')
    for (let choice of choices) {
      text = await choice.getText()
      if (text === 'Människa') {
        await choice.click()
        assert(text === 'Människa', '2nd choice button is not set to Människa')
        // we MUST break because the dom changes after click
        // and erases the old menu.. (tricky...)
        break
      }
    }
    await sleep(sleepTime)
  })


  // Input spelare1 to first name field, and input spelare2 to second name field
  this.When(/^I enter two different names$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]')
    await inputFields[0].sendKeys(spelare1)
    await sleep(sleepTime)
    await inputFields[1].sendKeys(spelare2)
    await sleep(sleepTime)
    })


  // Click the begin button
  this.When(/^I press the Börja spela\-button$/, async function () {
    let beginButton = await $('button.begin-btn.btn.btn-primary.float-right')
    await beginButton.click()
    await sleep(sleepTime)
  })


  // Array gameSeq for Human game choice
  // Await sleep is required for waiting on the coins to fall down
  this.When(/^I place my coins in a certain way$/, async function () {
    await sleep(sleepTime)
    gameSeq = [3, 2, 4]
    for (i = 0; i < gameSeq.length; i++) {
      await clickRow(gameSeq[i])
      await sleep(sleepTime * 4)
    }
    let gameInfo = await driver.findElement(by.css('h3 > span')).getText()
    await gameInfo
    // asserting agianst the text on the page
    assert(gameInfo === spelare1 + ' vann, efter 4 drag!', spelare1 + 'should have won after 4 moves')
  })


  this.Then(/^the normal bot will place its coins in a certain way$/, async function () {
    // This goes simultaneously as previous step, no need to test
  })


  // Saving game outcome as a screenshot
  this.Then(/^take screen shot on Game outcome$/, async function () {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync('./reports/imgGameOutcome' + j + '.png', data, 'base64')
    })
    j = j + 1
  })


  // Array gameSeq for Human game choice, (should be the same as above) 
  // Await sleep is required for waiting on the coins to fall down
  this.When(/^I place my coins the same way as the previous game$/, async function () {
    await sleep(sleepTime)
    gameSeq = [3, 2, 4]
    for (i = 0; i < gameSeq.length; i++) {
      await clickRow(gameSeq[i])
      await sleep(sleepTime * 4)
    }
    let gameInfo = await driver.findElement(by.css('h3 > span')).getText()
    await gameInfo
    // asserting agianst the text on the page
    assert(gameInfo === spelare1 + ' vann, efter 4 drag!', spelare1 + 'should have won after 4 moves')
  })


  this.Then(/^the normal bot should vary his game choice$/, async function () {
    // This goes simultaneously as previous step
    // Fetching game outcome and saving it into "gameOutcome2"
  })
}
// [US05] As a user I want the normal bot to have some randomness in its game choices, so that I can improve my own game
// Tomas

let { $, sleep, clickCol } = require('./funcs')

let sleepTime = 500

let spelare1 = 'Anders_Bot'
let spelare2 = 'Bo_Bot'

let gameOutcomeArray = [];

let i = 1

async function boardToArray() {
  gameOutcomeArray = [];
  let slots = await $('.slot');
  let count = 0;
  for (let slot of slots) {
    let cssClass = await slot.getAttribute('class');
    let color = 'empty';
    if (cssClass.includes('red')) { color = 'red'; }
    if (cssClass.includes('yellow')) { color = 'yellow'; }
    gameOutcomeArray.push(color);
  }
  return gameOutcomeArray;
}

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
    await inputFields[0].sendKeys(spelare1)
    await sleep(sleepTime)
    await inputFields[1].sendKeys(spelare2)
    await sleep(sleepTime)
  })

  this.Then(/^the normal bots will play a game against each other$/, { timeout: 240 * 1000 }, async function () {
    while (true) {
      let gameInfoH3 = await $('.game-info h3')
      // if there is no h3 run next iteration of the loop
      if (gameInfoH3 === null) { continue }
      // otherwise check the text in the h3
      let text
      try {
        text = await gameInfoH3.getText()
      }
      catch (e) {
        // the element probably disappeared from the dom
        // we go a selenium "stale element" error
        // just continue the loop
        continue
      }
      if (text.includes('oavgjort') || text.includes('vann')) {
        // stop the loop if the game is over
        break
      }
      // wait between checks
      await sleep(200)
    }
  })

  this.Then(/^they will place their bricks in a certain way$/, async function () {
    // save board as gameOutcome1
    let gameOutcome1 = await boardToArray();
    console.log(gameOutcome1.length)
    console.log(gameOutcome1)
  })

  this.Then(/^the normal bots will play a second game against each other$/, { timeout: 240 * 1000 }, async function () {
    while (true) {
      let gameInfoH3 = await $('.game-info h3')
      // if there is no h3 run next iteration of the loop
      if (gameInfoH3 === null) { continue }
      // otherwise check the text in the h3
      let text
      try {
        text = await gameInfoH3.getText()
      }
      catch (e) {
        // the element probably disappeared from the dom
        // we go a selenium "stale element" error
        // just continue the loop
        continue
      }
      if (text.includes('oavgjort') || text.includes('vann')) {
        // stop the loop if the game is over
        break
      }
      // wait between checks
      await sleep(200)
    }
  })

  this.Then(/^they should not play identically in comparison to the first game$/, async function () {
    // save board as gameOutcome2
    let gameOutcome2 = await boardToArray();
    console.log(gameOutcome2.length)
    console.log(gameOutcome2)

    assert.deepStrictEqual(gameOutcome1, gameOutcome2, "The two boards are not equal");
  })


}
// [US05] As a user I want the normal bot to have some randomness in its game choices, so that I can improve my own game
// Tomas

let { $, sleep, boardToArray, checkIfGameIsFinished } = require('./funcs')

let sleepTime = 500

let spelare1 = 'Spelare 1'
let spelare2 = 'Spelare 2'

let gameOutcome1
let gameOutcome2

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
    await checkIfGameIsFinished()
  })

  this.Then(/^they will place their bricks in a certain way$/, async function () {
    // save board as gameOutcome1
    gameOutcome1 = await boardToArray()
    // console.log(gameOutcome1.length)
    // console.log(gameOutcome1)
    // assert, checking if board is saved as gameOutcome1
    assert(gameOutcome1.length === 42, "gameOutcome1.length should be 42")
  })

  this.Then(/^the normal bots will play a second game against each other$/, { timeout: 240 * 1000 }, async function () {
    await checkIfGameIsFinished()
  })

  this.Then(/^they should not play identically in comparison to the first game$/, async function () {
    // save board as gameOutcome2
    gameOutcome2 = await boardToArray()
    // console.log(gameOutcome2.length)
    // console.log(gameOutcome2)
    // assert, checking if board is saved as gameOutcome1
    assert(gameOutcome2.length === 42, "gameOutcome2.length should be 42")
    // assert for comparing game 1 board and game 1 board, 
    // if they are not equal the test will pass
    assert.notDeepEqual(gameOutcome1, gameOutcome2, "[The two boards are equal. They should not be equal. Run the test again]")
  })
}
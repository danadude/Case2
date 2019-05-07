// [US05] As a user I want the normal bot to have some randomness in its game choices, so that I can improve my own game
// Tomas

let { $, sleep, clickRow } = require('./funcs',);

let sleepTime = 500;

let gameSeq = []
let i
let j = 1

let spelare1 = 'Anders_Bot'
let spelare2 = 'Bosse'

let fs = require('fs');


module.exports = function () {

  // Click on drop down menu and choose 'Bot'
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
    // Click on drop down menu and choose 'Människa'
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


  // Input spelare1 to first name field, and input spelare2 to second name field
  this.When(/^I enter two different names$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
    await inputFields[0].sendKeys(spelare1);
    await sleep(sleepTime);
    await inputFields[1].sendKeys(spelare2);
    await sleep(sleepTime * 2);
  });


  // Click the begin button
  this.When(/^I press the Börja spela\-button$/, async function () {
    let beginButton = await $('button.begin-btn.btn.btn-primary.float-right');
    await beginButton.click();
    await sleep(sleepTime * 2);
  });


  // Array gameSeq for Human game choice
  // Await sleep is required for waiting on the coins to fall down
  this.When(/^I place my coins in a certain way$/, async function () {
    gameSeq = [3, 2, 4, 3]
    for (i = 0; i < gameSeq.length; i++) {
      await clickRow(gameSeq[i])
      await sleep(sleepTime * 4)
    }
  });


  this.Then(/^the normal bot will place its coins in a certain way$/, async function () {
    // This goes simultaneously as previous step, no need to test
  });


  // Saving game outcome as a screenshot
  this.Then(/^take screen shot on Game outcome$/, async function () {
    await driver.takeScreenshot().then(function (data) {
      fs.writeFileSync('imgGameOutcome' + j + '.png', data, 'base64')
    });
    j = j + 1
  });


  // Array gameSeq for Human game choice, (should be the same as above) 
  // Await sleep is required for waiting on the coins to fall down
  this.When(/^I place my coins the same way as the previous game$/, async function () {
    gameSeq = [3, 2, 4, 3]
    for (i = 0; i < gameSeq.length; i++) {
      await clickRow(gameSeq[i])
      await sleep(sleepTime * 4)
    }
  });


  this.Then(/^the normal bot should vary his game choice$/, async function () {
    // This goes simultaneously as previous step
    // Fetching game outcome and saving it into "gameOutcome2"
  });
}




  //ALOT OF SAVED CODE AS COMMENTS

/*
// Fetching game outcome and saving it into "gameOutcome1"
// With help of Benjamin, trying to create an array with all coins and their colour with a loop.
// Didn't work
let gameOutcome1;
gameOutcome1 = await $('.slot')
let board = []
gameOutcome1.forEach(async (slot) => {
try {
  board.push(await slot.getAttribute('class'))
} catch (e) { }
})
console.log(board)
* /

/*
let gameOutcome2
gameOutcome2 = await $('.slot')
let m=gameOutcome2
console.log(m)
*/

/*
let arrayOfgameOutcome2
arrayOfgameOutcome2 = $('body > div > main > div > div.board.clearfix.shown').map(function () {
  return this.className;
}).get();

$("#output").text(arrayOfgameOutcome2);

console.log(arrayOfgameOutcome2)

assert(gameOutcome1 !== gameOutcome2, 'gameOutcome1 should not be equal to gameOutcome2, but it')
*/

/*
gameOutcome1 = await $('body > div > main > div > div.board.clearfix.shown > div:nth-child(37)').getText();
await gameOutcome1
//console.log('hej' + gameOutcome1[0])
console.log('hej1' + gameOutcome1)

gameOutcome2 = await driver.findElement(by.css('body > div > main > div > div.board.clearfix.shown > div:nth-child(37)')).getText();
await gameOutcome2
//console.log('hej' + gameOutcome2[0])
console.log('hej1' + gameOutcome2[0])

let gameOutcome2
gameOutcome2 = await driver.findElement(by.css('h3')).getText()
gameOutcome2 = gameOutcome2.replace(/\D/g, '') / 1
await gameOutcome2
if (gameOutcome2 === gameOutcome1) { }

humanMove = await driver.findElement(by.css('h3')).getText()
humanMove = humanMove.replace(/\D/g, '') / 1
await humanMove

if (humanMove === 1) {
  await clickRow(3)
  await sleep(sleepTime * 4)
}

humanMove = await driver.findElement(by.css('h3')).getText()
humanMove = humanMove.replace(/\D/g, '') / 1
await humanMove

if (humanMove === 2) {
  await clickRow(2)
  await sleep(sleepTime * 4)
}

humanMove = await driver.findElement(by.css('h3')).getText()
humanMove = humanMove.replace(/\D/g, '') / 1
await humanMove

if (humanMove === 3) {
  await clickRow(4)
  await sleep(sleepTime * 4)
}

humanMove = await driver.findElement(by.css('h3')).getText()
humanMove = humanMove.replace(/\D/g, '') / 1
await humanMove

if (humanMove === 4) {
  await clickRow(3)
  await sleep(sleepTime * 4)
}

    */
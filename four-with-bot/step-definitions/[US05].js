// [US05] As a user I want the normal bot to have some randomness in its game choices, so that I can improve my own game
// Tomas

let { $, sleep, clickRow } = require('./funcs');

let sleepTime = 500;

let gameSeq = []
let i

let spelare1 = 'Anders_Bot'
let spelare2 = 'Bosse'

module.exports = function () {



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

  this.When(/^I enter two different names$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
    await inputFields[0].sendKeys(spelare1);
    await sleep(sleepTime);
    await inputFields[1].sendKeys(spelare2);
    await sleep(sleepTime * 2);
  });

  this.When(/^I press the Börja spela\-button$/, async function () {
    let beginButton = await $('button.begin-btn.btn.btn-primary.float-right');
    await beginButton.click();
    await sleep(sleepTime * 2);
  });

  this.When(/^I place my coins in a certain way$/, async function () {
    gameSeq = [3, 2, 4, 3]
    for (i = 0; i < gameSeq.length; i++) {
      await clickRow(gameSeq[i])
      await sleep(sleepTime * 4)
    }

  });

  this.Then(/^the normal bot will place its coins in a certain way$/, async function () {



  });

  this.When(/^I place my coins the same way as the previous game$/, async function () {
    gameSeq = [3, 2, 4, 3]
    for (i = 0; i < gameSeq.length; i++) {
      await clickRow(gameSeq[i])
      await sleep(sleepTime * 4)
    }

  });

  this.Then(/^the normal bot should vary his game choice$/, async function () {




  });



  
}

/*

        humanMove = await driver.findElement(by.css('h3')).getText()
        humanMove = humanMove.replace(/\D/g, '') /1
        await humanMove

        if (humanMove === 1){
          await clickRow(3)
          await sleep(sleepTime *4)
        }

        humanMove = await driver.findElement(by.css('h3')).getText()
        humanMove = humanMove.replace(/\D/g, '') /1
        await humanMove

        if (humanMove === 2){
          await clickRow(2)
          await sleep(sleepTime *4)
        }

        humanMove = await driver.findElement(by.css('h3')).getText()
        humanMove = humanMove.replace(/\D/g, '') /1
        await humanMove

        if (humanMove === 3){
          await clickRow(4)
          await sleep(sleepTime *4)
        }

        humanMove = await driver.findElement(by.css('h3')).getText()
        humanMove = humanMove.replace(/\D/g, '') /1
        await humanMove

        if (humanMove === 4){
          await clickRow(3)
          await sleep(sleepTime *4)
        }

    */
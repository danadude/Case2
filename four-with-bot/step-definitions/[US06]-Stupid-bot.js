// [US06] As a user I want the dumb bot to play worse than the normal bot
// David

let { $, sleep } = require('./funcs');

let sleepTime = 500;
let spelare1 = 'Normal bot'
let spelare2 = 'Dumb bot'

module.exports = function () {

  // Background

  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('http://localhost:3000/game');
    await sleep(sleepTime * 2);

  });

  this.When(/^I choose to play as a dumb bot player vs\. a normal bot$/, async function () {
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
      if (text === 'Dum Bot') {
        await choice.click();
        // we MUST break because the dom changes after click
        // and erases the old menu.. (tricky...)
        break;
      }
<<<<<<< HEAD
    }
    await sleep(sleepTime * 2);
  });
=======
      await sleep(sleepTime * 2);
    }
    });
>>>>>>> bf81c80ff4c15f62e150bdae4ac49b62f22ee1ff

  this.When(/^with two different names$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
    await inputFields[0].sendKeys('Spelare 1');
    await sleep(sleepTime * 2);
    await inputFields[1].sendKeys('Spelare 2');
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
    await sleep(200); // small wait needed
    assert.equal(text, 'Avbryt spelet', 'The game did not start!');
    await sleep(sleepTime * 2);
  });
<<<<<<< HEAD
  // Scenario: Game

  this.Then(/^they should play (\d+) games against each other$/, async function (brickstoWin) {
    // Write code here that turns the phrase above into concrete actions
    await sleep(sleepTime * 10000);
    let againButton = await $('.again-btn');
    await againButton.click();
  });

  this.Then(/^the normal bot should win all games$/, async function () {
    // Write code here that turns the phrase above into concrete actions
  });




}
=======
 
  // Scenarios
 
  this.When(/^the first player plays (\d+) bricks in a row horizontally$/, async function (brickstoWin) {
 
    // NOTE: Only began this code, by playing one brick
    let slots = await $('.slot'); 
    // clicking slots[0] is putting a coin in column 1
    // clicking slots[1] is putting a coin in column 2
    await slots[3].click();
 
    await sleep(sleepTime * 10);
 
    // MORE TO WRITE HERE!
  
  });
 

}
>>>>>>> bf81c80ff4c15f62e150bdae4ac49b62f22ee1ff

let {$, sleep} = require('./funcs');
 
let sleepTime = 500;
 
module.exports = function(){
 
  // Background
 
  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('http://localhost:3000/game');
  });
 
  this.When(/^I choose to play as two human players$/, async function () {
    let typeChoiceButtons = await $('.type-choice-btn' );
    for(let typeChoiceButton of typeChoiceButtons){
      await typeChoiceButton.click();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for(let choice of choices){
        let text = await choice.getText();
        if(text === 'Människa'){
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
    await sleep(1000); // small wait needed
    assert.equal(text, 'Avbryt spelet', 'The game did not start!');
    await sleep(sleepTime * 2);
  });
 
  // Scenarios
 
  this.When(/^the first player plays (\d+) bricks in a row horizontally$/, async function (brickstoWin) {
 
    // NOTE: Only began this code, by playing one brick
    let slots = await $('.slot')
    // let gameInfo = await driver.findElement(by.css('html > body > div > main.container.mt-4.mb-3 > div.game > div.game-info > h3.mb-3.text-center > span'))
    // clicking slots[0] is putting a coin in column 1
    // clicking slots[1] is putting a coin in column 2
    // loop this shit!!!!
    // DOM need to regrab element.... DOM changed?
    await slots[1].click()
    await sleep(sleepTime)
    await slots[6].click()
    await sleep(sleepTime)
    await slots[2].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[6].click()
    await sleep(sleepTime)
    await slots[3].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[6].click()
    await sleep(sleepTime)
    await slots[4].click()
    // Game won how do i assert
    await sleep(sleepTime * 2)
 
 
  });

  this.Then(/^he\/she should win$/,async function () {
  let gameInfo = await driver.findElement(by.css('html > body > div > main > div.game > div.game-info > h3.mb-3 > span')).getText()
  await gameInfo
  // asserting agianst the text on the page
  assert(gameInfo === 'Spelare \d vann, efter \d drag!', 'Matchar EJ')

  });

  this.When(/^the first player plays (\d+) bricks in a row vertical$/,async function (brickstoWin) {
    let slots = await $('.slot')
    // let gameInfo = await driver.findElement(by.css('html > body > div > main.container.mt-4.mb-3 > div.game > div.game-info > h3.mb-3.text-center > span'))
    // clicking slots[0] is putting a coin in column 1
    // clicking slots[1] is putting a coin in column 2
    // loop this shit!!!!
    // DOM need to regrab element.... DOM changed?
    await slots[1].click()
    await sleep(sleepTime)
    await slots[6].click()
    await sleep(sleepTime)
    await slots[2].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[6].click()
    await sleep(sleepTime)
    await slots[3].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[6].click()
    await sleep(sleepTime)
    await slots[1].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[6].click()
    // Game won how do i assert
    await sleep(sleepTime * 2)
 
 
  });

  this.When(/^the first player plays (\d+) bricks in a diagonally \(left to right\)$/,async function (brickstoWin) {
    let slots = await $('.slot')
    // let gameInfo = await driver.findElement(by.css('html > body > div > main.container.mt-4.mb-3 > div.game > div.game-info > h3.mb-3.text-center > span'))
    // clicking slots[0] is putting a coin in column 1
    // clicking slots[1] is putting a coin in column 2
    // loop this shit!!!!
    // DOM need to regrab element.... DOM changed?
    await slots[0].click()
    await sleep(sleepTime)
    await slots[1].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[1].click()
    await sleep(sleepTime)
    await slots[2].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[2].click()
    await sleep(sleepTime)
    await slots[3].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[2].click()
    await sleep(sleepTime)
    await slots[3].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[3].click()
    await sleep(sleepTime)
    await slots[1].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[3].click()
    // Game won how do i assert
    await sleep(sleepTime * 4)
  });

  this.When(/^the first player plays (\d+) bricks in a diagonally \(right to left\)$/,async function (brickstoWin) {
    let slots = await $('.slot')
    // clicking slots[0] is putting a coin in column 1
    // clicking slots[1] is putting a coin in column 2
    // loop this shit!!!!
    // DOM need to regrab element.... DOM changed?
    await slots[6].click()
    await sleep(sleepTime)
    await slots[5].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[5].click()
    await sleep(sleepTime)
    await slots[4].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[4].click()
    await sleep(sleepTime)
    await slots[3].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[4].click()
    await sleep(sleepTime)
    await slots[3].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[3].click()
    await sleep(sleepTime)
    await slots[1].click()
    await sleep(sleepTime)
    slots = await $('.slot')
    await slots[3].click()
    // Game won how do i assert
    await sleep(sleepTime * 4)
  });


}
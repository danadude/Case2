let {$, sleep, clickCol, playGame} = require('./funcs');
let sleepTime = 500;
const fs = require('fs');
 

let winCounter = {
  vinnare: []
};
 

// stringify JSON Object (för att kunna spara den sen)
var jsonContent = JSON.stringify(winCounter); //tidigare jsonObj

module.exports = function(){
  // Background
 
  this.Given(/^that i goto the game pages$/, async function () {
    await helpers.loadPage('http://localhost:3000/game');
  });
 
  this.When(/^i choose to play as two human playerss$/, async function () {
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
      await sleep(sleepTime);
    }
  });
 
  this.When(/^with two different namess$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
    await inputFields[0].sendKeys('Spelare 1');
    await sleep(sleepTime);
    await inputFields[1].sendKeys('Spelare 2');
    await sleep(sleepTime);
  });
 
  this.When(/^press the Börja spela\-buttons$/, async function () {
    let beginButton = await $('.begin-btn');
    await beginButton.click();
    await sleep(sleepTime);
  });
 
  this.Then(/^the game should starts$/, async function () {
    let activeMenuLink = await $('.nav-link.active');
    let text = await activeMenuLink.getText();
    await sleep(sleepTime); // small wait needed
    assert.equal(text, 'Avbryt spelet', 'The game did not start!');
    await sleep(sleepTime);
  });
 
  // Scenarios
 
  this.When(/^the first player plays (\d+) bricks in a row horizontallys$/, async function (brickstoWin) {
    // Loops the game sequence required to get the desired outcome
    await playGame("1626364")
  });

  this.Then(/^first player should wins$/,async function () {
  let gameInfo = await driver.findElement(by.css('h3')).getText()
  // asserting agianst the text on the page
  assert(gameInfo.includes('Spelare 1 vann,'), 'Matchar EJ')
  
  //JSON TESTING GROUNDS!! BE AWARE!! LIVE AMMUNITION!!
  
  if (gameInfo.includes('Spelare 1 vann,')){

  fs.readFile('output.json', 'utf8', function readFileCallback(err, jsonContent){
    if (err){
        console.log(err);
    } else {
    winCounter = JSON.parse(jsonContent); //now it an object
    winCounter.vinnare.push({spelare:1, win:"win"}); //add some data
    jsonContent = JSON.stringify(winCounter);; //convert it back to json
    fs.writeFile('output.json', jsonContent, 'utf8', function(err, result){
        if (err){
            console.log(err);
    }
    })
    console.log("JSON file has been saved.");
    }})
    }
    });


}




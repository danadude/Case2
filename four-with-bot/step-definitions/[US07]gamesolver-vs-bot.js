let { $, sleep, clickCol } = require('./funcs');
const { Builder } = require('selenium-webdriver');
let gamesolverDriver;

function $$(cssSelector) {
  return $(cssSelector, gamesolverDriver);
}

//Sparar four with bot brädet till en array
async function boardToArray(){
    let boardArray = [];
    let slots = await $('.slot'); // 42 slots
    let count = 0;
    for(let slot of slots){
      let cssClass = await slot.getAttribute('class');
      let color = 'empty';
      if(cssClass.includes('red')){ color = 'red'; }
      if(cssClass.includes('yellow')){ color = 'yellow'; }
      boardArray.push(color);
    }
    return boardArray;
}

//sparar gamesolverbrädet
/*
async function boardToArray2(){
  let boardArray2 = [];
  let slots = await $$('.board'); // 42 slots
  let count2 = 0;
  for(let slot of slots){
    let cssClass = await slot.getAttribute('class');
    let color = 'empty';
    if(cssClass.includes('player1')){ color = 'red'; }
    if(cssClass.includes('player2')){ color = 'yellow'; }
    boardArray2.push(color);
  }
  return boardArray2;
}
*/
 
let sleepTime = 500;
 
module.exports = function () {

 
  // Background
 
  this.When(/^I choose to play as a bot and a human$/, async function () {
    let typeChoiceButtons = await $('.type-choice-btn');
    let choiceArray = ['Bot', 'Människa'];
    for (let typeChoiceButton of typeChoiceButtons) {
      await typeChoiceButton.click();
      let currentChoice = choiceArray.shift();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for (let choice of choices) {
        let text = await choice.getText();
        if (text === currentChoice) {
          await choice.click();
          // we MUST break because the dom changes after click
          // and erases the old menu.. (tricky...)
          break;
        }
      }
      await sleep(sleepTime * 2);
    }
  });
 

 
  this.Given(/^that we are on the gamesolver page$/, async function () {
    // creating a new driver
    gamesolverDriver = await new Builder().forBrowser('chrome').build();
    // loading the gamesolver page
    await gamesolverDriver.get('https://connect4.gamesolver.org/');
  });
 
  this.When(/^I choose to play as human and bot in the gamesolver$/, async function () {
    let player2Button = await $$('#player_2');
    await player2Button.click();
    await sleep(sleepTime * 2);
  });

  this.When(/^two bots have played until someone wins$/, async function () {
    
    let theBoard = await boardToArray()
    red_brick = await theBoard.indexOf('red')
    red_brick = red_brick + 15
    console.log(red_brick)



    if (red_brick == 15 || red_brick == 22 || 29 == red_brick || red_brick == 36 || red_brick == 15 ){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(9)'))
        await gamesolverHumanClick.click()  
        
    }else if (16 === red_brick || red_brick === 23 || 30 === red_brick || red_brick === 37 || 44 === red_brick || red_brick === 51){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(15)'))
        await gamesolverHumanClick.click()  

    }else if (17 === red_brick || red_brick === 24 || 31 === red_brick || red_brick === 38 || 45 === red_brick || red_brick === 52){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(21)'))
        await gamesolverHumanClick.click()  

    }else if (18 === red_brick || red_brick === 25 || 32 === red_brick || red_brick === 39 || 46 === red_brick || red_brick === 53){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(27)'))
        await gamesolverHumanClick.click()  

    }else if (19 === red_brick || red_brick === 26 || 33 === red_brick ||red_brick === 40 || 47 === red_brick || red_brick === 54){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(33)'))
        await gamesolverHumanClick.click()  

    }else if (20 === red_brick || red_brick === 27 || 34 === red_brick || red_brick === 41 || 48 === red_brick || red_brick === 55){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(39)'))
        await gamesolverHumanClick.click()  

    }else if (21 === red_brick || red_brick === 28 || 35 === red_brick || red_brick === 42 || 49 === red_brick || red_brick === 56){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(45)'))
        await gamesolverHumanClick.click()  

    }else{
        alert('helvete')

    }


    await sleep(sleepTime*2)
    let player2 = await $$('.player2')
    for(let elem of player2){
      let width = await elem.getAttribute('style')
      if(width.includes('left: 0%')){ clickCol(0); console.log('bajs 1')}
      if(width.includes('left: 14.2857%')){ clickCol(1); console.log('bajs 2')}
      if(width.includes('left: 28.5714%')){ clickCol(2); console.log('bajs 3')}
      if(width.includes('left: 42.8571%')){ clickCol(3); console.log('bajs 4')}
      if(width.includes('left: 57.1429%')){ clickCol(4); console.log('bajs 5')}
      if(width.includes('left: 71.4286%')){ clickCol(5); console.log('bajs 6')}
      if(width.includes('left: 85.7143%')){ clickCol(6); console.log('bajs 7')}
    }


    
  });

  this.Then(/^the gamesolver bot should always win$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });
 

 
 
}
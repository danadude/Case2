let { $, sleep } = require('./funcs');
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
    //Hela denna är under uppbyggnad. Array med index finns, fungerande klick i gamesolver.
    //Arrayen behöver spara in indexen som har red som color i variabel och skicka
    //det till gamesolverDrivern. Och vice versa
    //Gamesolver spelets brädes nummer speglar inte connect4

    let theBoard = await boardToArray()

    function logArrayElements(element, index, array) {
        console.log('a[' + index + '] = ' + element)
    }

    theBoard.forEach(logArrayElements)

    red_brick = await theBoard.indexOf('red')
    
    console.log(red_brick)

    //function Spela(red_brick, yellow_brick)
    //logiken fungerar, men kolumn/radläsningen från four-with-bot är inte korrekt än

    if (0 <= red_brick && red_brick <= 5){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(9)'))
        await gamesolverHumanClick.click()  
        
    }else if (6 <= red_brick && red_brick <= 11){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(15)'))
        await gamesolverHumanClick.click()  

    }else if (12 <= red_brick && red_brick <= 17){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(21)'))
        await gamesolverHumanClick.click()  

    }else if (18 <= red_brick && red_brick <= 23){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(27)'))
        await gamesolverHumanClick.click()  

    }else if (24 <= red_brick && red_brick <= 29){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(33)'))
        await gamesolverHumanClick.click()  

    }else if (30 <= red_brick && red_brick <= 35){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(39)'))
        await gamesolverHumanClick.click()  

    }else if (36 <= red_brick && red_brick <= 41){
        let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(45)'))
        await gamesolverHumanClick.click()  

    }else{
        alert('helvete')

    }

    let theBoard2 = await boardToArray2()

    function logArrayElements2(element, index, array) {
        console.log('b[' + index + '] = ' + element)
    }

    theBoard2.forEach(logArrayElements2)

    
    let player2 = await $$('.player2')
    for(let elem of player2){
      let width = await elem.getAttribute('style')
      console.log(width)
    }

    

    
    //Gamesolverkolumner
    //col 1: (9) document.querySelector("#board > div:nth-child(9)") 
    //col 2: (15) document.querySelector("#board > div:nth-child(15)")
    //col 3: (21) document.querySelector("#board > div:nth-child(21)") 
    //col 4: (27) document.querySelector("#board > div:nth-child(27)")
    //col 5: (33) document.querySelector("#board > div:nth-child(33)")
    //col 6: (39) document.querySelector("#board > div:nth-child(39)")
    //col 7: (45) document.querySelector("#board > div:nth-child(45)")

    //från sidkälla
    //div.col0 {left:0%;}
    //div.col1 {left:14.285714286%;}
    //div.col2 {left:28.571428571%;}
    //div.col3 {left:42.857142857%;}
    //div.col4 {left:57.142857143%;}
    //div.col5 {left:71.428571429%;}
    //div.col6 {left:85.714285714%;}
   
  


    
  });

  this.Then(/^the gamesolver bot should always win$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });
 
  // Now we only have to write two different functions (or at least understand)
  // how to dectect which column that was played as the latest move in
  // 1) our app/the prototype
  // 2) the gamesolver/perfect app
  //
  // Then we can start to fake being a human but sending the other bots
  // move so the two bots can meet automatically
  //
  // Then can we test if the perfect bot always win
 
 
}
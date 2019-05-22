let { $, sleep, clickCol, jsonWriteData } = require('./funcs');
const { Builder } = require('selenium-webdriver');
const fs = require('fs');
let gamesolverDriver;
let thePBoard;
let theBoard
let widthCount
let player2
let i;
let playTracker = []
let color
let winCounter = {spelare1: [], spelare2:[], draw:[]};

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

//skapar ett tomt bräde att göra första jämnförelsen med
async function cleanBoardToArray(){
  let boardArray = [];
  for(i = 0; i < 42; i++){
    let color = 'empty';
    boardArray.push(color);
  }
  return boardArray;
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
    thePBoard = await cleanBoardToArray()
    await sleep(2000)
    theBoard = await boardToArray()
    for (i = 0; i < theBoard.length; i++) { 
      if(theBoard[i].includes('red') !=thePBoard[i].includes('red')){
        red_brick = i
        if (red_brick == 0 || red_brick == 7 || red_brick == 14|| red_brick == 21 || red_brick == 28 || red_brick == 35){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(9)'))
          await gamesolverHumanClick.click()  
          
      }else if (red_brick == 1|| red_brick == 8 || red_brick == 15|| red_brick == 22 || red_brick === 29 || red_brick == 36){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(15)'))
          await gamesolverHumanClick.click()  
  
      }else if (red_brick == 2|| red_brick == 9 || red_brick == 16|| red_brick == 23 || red_brick === 30 || red_brick == 37){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(21)'))
          await gamesolverHumanClick.click()  
  
      }else if (red_brick == 3|| red_brick == 10 || red_brick == 17|| red_brick == 24 || red_brick === 31 || red_brick == 38){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(27)'))
          await gamesolverHumanClick.click()  
  
      }else if (red_brick == 4|| red_brick == 11 || red_brick == 18|| red_brick == 25 || red_brick === 32 || red_brick == 39){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(33)'))
          await gamesolverHumanClick.click()  
  
      }else if (red_brick == 5|| red_brick == 12 || red_brick == 19|| red_brick == 26 || red_brick === 33 || red_brick == 40){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(39)'))
          await gamesolverHumanClick.click()  
  
      }else if (red_brick == 6|| red_brick == 13 || red_brick == 20|| red_brick == 27 || red_brick === 34 || red_brick == 41){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(45)'))
          await gamesolverHumanClick.click()  
  
      }else{
          alert('helvete')
  
      } 
      }
    }
    thePBoard = theBoard.slice(0)

    await sleep(2000)
    player2 = await $$('.player2')
    for(let elem of player2){
      width = await elem.getAttribute('style')
      if(width.includes('left')){
        playTracker.push(width);
      }
    }
    widthCount = playTracker.length - 1
    if(playTracker[widthCount].includes('left: 0%')){ clickCol(0); console.log('clicking col 1')}
    if(playTracker[widthCount].includes('left: 14.2857%')){ clickCol(1); console.log('clicking col 2')}
    if(playTracker[widthCount].includes('left: 28.5714%')){ clickCol(2); console.log('clicking col 3')}
    if(playTracker[widthCount].includes('left: 42.8571%')){ clickCol(3); console.log('clicking col 4')}
    if(playTracker[widthCount].includes('left: 57.1429%')){ clickCol(4); console.log('clicking col 5')}
    if(playTracker[widthCount].includes('left: 71.4286%')){ clickCol(5); console.log('clicking col 6')}
    if(playTracker[widthCount].includes('left: 85.7143%')){ clickCol(6); console.log('clicking col 7')}

    await sleep(2000)
    theBoard = await boardToArray()
    for (i = 0; i < theBoard.length; i++) { 
      if(theBoard[i].includes('red') !=thePBoard[i].includes('red')){
        red_brick = i
        if (red_brick == 0 || red_brick == 7 || red_brick == 14|| red_brick == 21 || red_brick == 28 || red_brick == 35){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(9)'))
          await gamesolverHumanClick.click()  
          
      }else if (red_brick == 1|| red_brick == 8 || red_brick == 15|| red_brick == 22 || red_brick === 29 || red_brick == 36){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(15)'))
          await gamesolverHumanClick.click()  
  
      }else if (red_brick == 2|| red_brick == 9 || red_brick == 16|| red_brick == 23 || red_brick === 30 || red_brick == 37){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(21)'))
          await gamesolverHumanClick.click()  
  
      }else if (red_brick == 3|| red_brick == 10 || red_brick == 17|| red_brick == 24 || red_brick === 31 || red_brick == 38){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(27)'))
          await gamesolverHumanClick.click()  
  
      }else if (red_brick == 4|| red_brick == 11 || red_brick == 18|| red_brick == 25 || red_brick === 32 || red_brick == 39){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(33)'))
          await gamesolverHumanClick.click()  
  
      }else if (red_brick == 5|| red_brick == 12 || red_brick == 19|| red_brick == 26 || red_brick === 33 || red_brick == 40){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(39)'))
          await gamesolverHumanClick.click()  
  
      }else if (red_brick == 6|| red_brick == 13 || red_brick == 20|| red_brick == 27 || red_brick === 34 || red_brick == 41){
          let gamesolverHumanClick = await gamesolverDriver.findElement(by.css('#board > div:nth-child(45)'))
          await gamesolverHumanClick.click()  
  
      }else{
          alert('helvete')
  
      } 
      }
    }

    await sleep(2000)
    player2 = await $$('.player2')
    for(let elem of player2){
      width = await elem.getAttribute('style')
      if(width.includes('left')){
        playTracker.push(width);
      }
    }
    widthCount = playTracker.length - 1
    if(playTracker[widthCount].includes('left: 0%')){ clickCol(0); console.log('clicking col 1')}
    if(playTracker[widthCount].includes('left: 14.2857%')){ clickCol(1); console.log('clicking col 2')}
    if(playTracker[widthCount].includes('left: 28.5714%')){ clickCol(2); console.log('clicking col 3')}
    if(playTracker[widthCount].includes('left: 42.8571%')){ clickCol(3); console.log('clicking col 4')}
    if(playTracker[widthCount].includes('left: 57.1429%')){ clickCol(4); console.log('clicking col 5')}
    if(playTracker[widthCount].includes('left: 71.4286%')){ clickCol(5); console.log('clicking col 6')}
    if(playTracker[widthCount].includes('left: 85.7143%')){ clickCol(6); console.log('clicking col 7')}


await sleep(5000)
    
  });

  this.Then(/^the gamesolver bot should always win$/, function () {
     
    await jsonWriteData();

    let data=fs.readFileSync('output.json', 'utf8');
    let words=JSON.parse(data);
    console.log(words)

    let spelare1 = words.spelare1
    let spelare2 = words.spelare2
    console.log(spelare1.length)
    console.log(spelare2.length)
  });
 

 
 
}
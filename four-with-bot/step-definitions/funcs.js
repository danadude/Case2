// Detta är våran gamla func $

async function $(selector, chosenDriver = driver) {
  let elements = await chosenDriver.findElements(by.css(selector));
  if (elements.length === 0) {
    return null;
  }
  if (elements.length === 1) {
    return elements[0];
  }
  return elements;
}

module.exports.$ = $;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.sleep = sleep;

// function for clicking on top of columns. accepted values from [0] to [6]
async function clickCol(row) {
  try {
    let slots = await $('.slot')
    await slots[row].click()
    await sleep(250)
  } catch (e) {
    console.log(e)
  }
}

module.exports.clickCol = clickCol;

async function playGame(clickOrder) {
  for (let i = 0; i < clickOrder.length; i++) {
    await clickCol(clickOrder[i])
  }
}

module.exports.playGame = playGame;

async function boardToArray() {
  let boardArray = [];
  let slots = await $('.slot'); // 42 slots
  for (let slot of slots) {
    let cssClass = await slot.getAttribute('class');
    let color = 'empty';
    if (cssClass.includes('red')) { color = 'red'; }
    if (cssClass.includes('yellow')) { color = 'yellow'; }
    boardArray.push(color);
  }
  return boardArray;
}

module.exports.boardToArray = boardToArray;

async function cleanBoardToArray(){
  let boardArray = [];
  for(i = 0; i < 42; i++){
    let color = 'empty';
    boardArray.push(color);
  }
  return boardArray;
}

module.exports.cleanBoardToArray = cleanBoardToArray;

async function checkIfGameIsFinished() {
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
}

module.exports.checkIfGameIsFinished = checkIfGameIsFinished;

async function jsonWriteData() {
  const fs = require('fs');
  let gameInfo = await driver.findElement(by.css('h3')).getText()
  

  if (gameInfo.includes('Spelare 1 vann,')) {

    fs.readFile('output.json', 'utf8', function readFileCallback(err, jsonContent) {
      if (err) {
        console.log(err);
      } else {
        winCounter = JSON.parse(jsonContent); //now it an object
        winCounter.vinnare.push({ spelare: 1, win: "win" }); //add some data
        jsonContent = JSON.stringify(winCounter); //convert it back to json
        fs.writeFile('output.json', jsonContent, 'utf8', function (err, result) {
          if (err) {
            console.log(err);
          }
        })
        console.log("JSON file has been saved.");
      }
    })

  } else if (gameInfo.includes('Spelare 2 vann,')) {

    fs.readFile('output.json', 'utf8', function readFileCallback(err, jsonContent) {
      if (err) {
        console.log(err);
      } else {
        winCounter = JSON.parse(jsonContent); //now it an object
        winCounter.vinnare.push({ spelare: 2, win: "win" }); //add some data
        jsonContent = JSON.stringify(winCounter);; //convert it back to json
        fs.writeFile('output.json', jsonContent, 'utf8', function (err, result) {
          if (err) {
            console.log(err);
          }
        })
        console.log("JSON file has been saved.");
      }
    })

  } else {

    fs.readFile('output.json', 'utf8', function readFileCallback(err, jsonContent) {
      if (err) {
        console.log(err);
      } else {
        winCounter = JSON.parse(jsonContent); //now it an object
        winCounter.vinnare.push({ spelare: 0, win: "draw" }); //add some data
        jsonContent = JSON.stringify(winCounter);; //convert it back to json
        fs.writeFile('output.json', jsonContent, 'utf8', function (err, result) {
          if (err) {
            console.log(err);
          }
        })
        console.log("JSON file has been saved.");
      }
    })
  }
  

}

module.exports.jsonWriteData = jsonWriteData
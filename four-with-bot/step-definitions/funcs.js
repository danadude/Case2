 // Detta är våran gamla func $
 
 async function $ (selector, chosenDriver = driver){
  let elements = await chosenDriver.findElements(by.css(selector));
  if(elements.length === 0){
    return null; 
  }
  if(elements.length === 1){
    return elements[0];
  }
  return elements;
}

module.exports.$ = $;


function sleep (ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.sleep = sleep; 

// function for clicking on top of columns. accepted values from [0] to [6]
async function clickCol(row) {
  try{
    let slots = await $('.slot')
    await slots[row].click()
    await sleep(250)
  }catch(e){
    console.log(e)
  }
}

module.exports.clickCol = clickCol; 

async function playGame(clickOrder) {
  for(let i = 0; i < clickOrder.length; i++){
    await clickCol(clickOrder[i])
  }
}

module.exports.playGame = playGame; 

async function boardToArray(){
  let boardArray = [];
  let slots = await $('.slot'); // 42 slots
  for(let slot of slots){
    let cssClass = await slot.getAttribute('class');
    let color = 'empty';
    if(cssClass.includes('red')){ color = 'red'; }
    if(cssClass.includes('yellow')){ color = 'yellow'; }
    boardArray.push(color);
  }
  return boardArray;
}

module.exports.boardToArray = boardToArray;
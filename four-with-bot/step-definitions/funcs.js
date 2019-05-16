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
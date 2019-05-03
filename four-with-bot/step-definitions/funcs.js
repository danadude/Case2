 async function $ (selector){
  let elements = await driver.findElements(by.css(selector));
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
  
async function clickRow(row) {
  try{
    let slots = await $('.slot')
    await slots[row].click()
    await sleep(250)
  }catch(e){
    console.log(e)
  }
}

module.exports.clickRow = clickRow; 
let { $, sleep, clickRow } = require("./funcs");

let sleepTime = 500;

module.exports = function() {
  this.When(/^i change the avatars$/, async function() {
    let typeChoiceButton = await $(".avatar-choice-btn");
    await typeChoiceButton[0].click();
    let choice = await $(
      ".dropdown-menu.avatar-choice.show > .dropdown-item:nth-of-type(3)"
    );
    await choice.click();;
    await typeChoiceButton[1].click();
    choice = await $(
      ".dropdown-menu.avatar-choice.show > .dropdown-item:nth-of-type(4)"
    );
    await choice.click();
    await sleep(sleepTime)
  });

  this.Then(/^i should have the new avatars$/,async function() {
    let gameInfo = await driver.findElement(by.css('h3')).getText()
    await gameInfo
    let logen = gameInfo.replace('�� ','')
    console.log(logen)
    await sleep(sleepTime)
  });
};

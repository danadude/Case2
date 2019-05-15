let { $, sleep, clickCol } = require("./funcs");

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
    let avatar1 = await driver.findElement(by.css('h3')).getText()
    clickCol(1)
    await sleep(sleepTime)
    let avatar2 = await driver.findElement(by.css('h3')).getText()
    await sleep(500)
    assert(avatar1 === '👩🏻 Spelare 1, drag 1' && avatar2 === '👨🏼 Spelare 2, drag 1', 'kunde inte jämnföra avatar')


  });
};

// [US06] As a user I want the dumb bot to play worse than the normal bot
// David

let { $, sleep } = require("./funcs");
let spelare1 = 0;
let spelare2 = 0;
let againButton;
let beginButton;
let gamesPlayed = 0;
let sleepTime = 500;

module.exports = function() {
  // Background

  this.When(
    /^I choose to play as a dumb bot player vs\. a normal bot$/,
    async function() {
      let typeChoiceButton = await $(".type-choice-btn");

      await typeChoiceButton[0].click();
      let choices = await $(".dropdown-menu.type-choice.show .dropdown-item");
      for (let choice of choices) {
        let text = await choice.getText();
        if (text.includes("Dum")) {
          await choice.click();
          // we MUST break because the dom changes after click
          // and erases the old menu.. (tricky...)
          break;
        }
      }

      await typeChoiceButton[1].click();
      choices = await $(".dropdown-menu.type-choice.show .dropdown-item");
      for (let choice of choices) {
        text = await choice.getText();
        if (text === "Bot") {
          await choice.click();
          // we MUST break because the dom changes after click
          // and erases the old menu.. (tricky...)
          break;
        }
        await sleep(sleepTime * 2);
      }
    }
  );

  this.Then(
    /^they should play (\d+) games against each other$/,
    { timeout: 90 * 1000 },
    async function(gamesToPlay) {
      do {
        while (true) {
          let gameInfoH3 = await $(".game-info h3");
          // if there is no h3 run next iteration of the loop
          if (gameInfoH3 === null) {
            continue;
          }
          // otherwise check the text in the h3
          let text;
          try {
            text = await gameInfoH3.getText();
          } catch (e) {
            // the element probably disappeared from the dom
            // we go a selenium "stale element" error
            // just continue the loop
            continue;
          }
          if (text.includes("oavgjort") || text.includes("vann")) {
            if (text.includes("Spelare 1 vann")) {
              spelare1++;
            }
            if (text.includes("Spelare 2 vann")) {
              spelare2++;
            }
            break;
          }
        }
        gamesPlayed++;
        console.log(gamesPlayed);
        if (gamesPlayed < gamesToPlay) {
          againButton = await $(".again-btn");
          await againButton.click();
          await sleep(2000);
          beginButton = await $(".begin-btn");
          await beginButton.click();
          await sleep(sleepTime * 2);
        }
      } while (gamesPlayed < gamesToPlay);
    }
  );

  this.Then(/^the normal bot should win all games$/, async function(arg1) {
    assert(spelare2 === gamesPlayed, "Boten förlorade mot idioten!");
  });
};

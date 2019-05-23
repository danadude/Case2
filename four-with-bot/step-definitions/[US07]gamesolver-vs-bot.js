let { $, sleep, clickCol, boardToArray, cleanBoardToArray, jsonWriteData} = require("./funcs");
const { Builder } = require("selenium-webdriver");
const fs = require("fs");
let gamesolverDriver, thePBoard, theBoard, widthCount, player2, color, gameInfoH3, text, gamesPlayed, gamesToPlay, restart, scenarioName;
let playTracker = [];
let spelare1 = 0
let spelare2 = 0
let winCounter = { spelare1: [], spelare2: [], draw: [] };
let sleepTime = 500;

function $$(cssSelector) {
  return $(cssSelector, gamesolverDriver);
}

async function playOurBoard() {
  player2 = await $$(".player2");
  playTracker = [];
  for (let elem of player2) {
    width = await elem.getAttribute("style");
    if (width.includes("left")) {
      playTracker.push(width);
    }
  }
  widthCount = playTracker.length - 1;
  if (playTracker[widthCount].includes("left: 0%")) {
    clickCol(0);
  }
  if (playTracker[widthCount].includes("left: 14.2857%")) {
    clickCol(1);
  }
  if (playTracker[widthCount].includes("left: 28.5714%")) {
    clickCol(2);
  }
  if (playTracker[widthCount].includes("left: 42.8571%")) {
    clickCol(3);
  }
  if (playTracker[widthCount].includes("left: 57.1429%")) {
    clickCol(4);
  }
  if (playTracker[widthCount].includes("left: 71.4286%")) {
    clickCol(5);
  }
  if (playTracker[widthCount].includes("left: 85.7143%")) {
    clickCol(6);
  }
}

async function playGamesolverBoard() {
  theBoard = await boardToArray();
  for (i = 0; i < theBoard.length; i++) {
    if (theBoard[i].includes("red") != thePBoard[i].includes("red")) {
      red_brick = i;
      if (
        red_brick == 0 ||
        red_brick == 7 ||
        red_brick == 14 ||
        red_brick == 21 ||
        red_brick == 28 ||
        red_brick == 35
      ) {
        let gamesolverHumanClick = await gamesolverDriver.findElement(
          by.css("#board > div:nth-child(9)")
        );
        await gamesolverHumanClick.click();
      } else if (
        red_brick == 1 ||
        red_brick == 8 ||
        red_brick == 15 ||
        red_brick == 22 ||
        red_brick === 29 ||
        red_brick == 36
      ) {
        let gamesolverHumanClick = await gamesolverDriver.findElement(
          by.css("#board > div:nth-child(15)")
        );
        await gamesolverHumanClick.click();
      } else if (
        red_brick == 2 ||
        red_brick == 9 ||
        red_brick == 16 ||
        red_brick == 23 ||
        red_brick === 30 ||
        red_brick == 37
      ) {
        let gamesolverHumanClick = await gamesolverDriver.findElement(
          by.css("#board > div:nth-child(21)")
        );
        await gamesolverHumanClick.click();
      } else if (
        red_brick == 3 ||
        red_brick == 10 ||
        red_brick == 17 ||
        red_brick == 24 ||
        red_brick === 31 ||
        red_brick == 38
      ) {
        let gamesolverHumanClick = await gamesolverDriver.findElement(
          by.css("#board > div:nth-child(27)")
        );
        await gamesolverHumanClick.click();
      } else if (
        red_brick == 4 ||
        red_brick == 11 ||
        red_brick == 18 ||
        red_brick == 25 ||
        red_brick === 32 ||
        red_brick == 39
      ) {
        let gamesolverHumanClick = await gamesolverDriver.findElement(
          by.css("#board > div:nth-child(33)")
        );
        await gamesolverHumanClick.click();
      } else if (
        red_brick == 5 ||
        red_brick == 12 ||
        red_brick == 19 ||
        red_brick == 26 ||
        red_brick === 33 ||
        red_brick == 40
      ) {
        let gamesolverHumanClick = await gamesolverDriver.findElement(
          by.css("#board > div:nth-child(39)")
        );
        await gamesolverHumanClick.click();
      } else if (
        red_brick == 6 ||
        red_brick == 13 ||
        red_brick == 20 ||
        red_brick == 27 ||
        red_brick === 34 ||
        red_brick == 41
      ) {
        let gamesolverHumanClick = await gamesolverDriver.findElement(
          by.css("#board > div:nth-child(45)")
        );
        await gamesolverHumanClick.click();
      } else {
        alert("helvete");
      }
    }
  }
  thePBoard = theBoard.slice(0);
}

module.exports = function() {
  // Background

  this.Before(function (scenario, callback) {
    scenarioName = scenario
    callback();
});

  this.When(/^I choose to play as a bot and a human$/, async function() {
    let typeChoiceButtons = await $(".type-choice-btn");
    let choiceArray = ["Bot", "Människa"];
    for (let typeChoiceButton of typeChoiceButtons) {
      await typeChoiceButton.click();
      let currentChoice = choiceArray.shift();
      let choices = await $(".dropdown-menu.type-choice.show .dropdown-item");
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

  this.Given(/^that we are on the gamesolver page$/, async function() {
    // creating a new driver
    gamesolverDriver = await new Builder().forBrowser("chrome").build();
    // loading the gamesolver page
    await gamesolverDriver.get("https://connect4.gamesolver.org/");
  });

  this.When(
    /^I choose to play as human and bot in the gamesolver$/,
    async function() {
      let player2Button = await $$("#player_2");
      await player2Button.click();
      await sleep(sleepTime * 2);
    }
  );

  this.When(
    /^two bots have played until someone wins$/,
    { timeout: 10000000 },
    async function() {
      thePBoard = await cleanBoardToArray();
      gamesPlayed = 0;
      gamesToPlay = 1;
      do {
        while (true) {
          gameInfoH3 = await $(".game-info h3");
          // if there is no h3 run next iteration of the loop
          if (gameInfoH3 === null) {
            continue;
          }
          // otherwise check the text in the h3
          try {
            text = await gameInfoH3.getText();
          } catch (e) {
            // the element probably disappeared from the dom
            // we go a selenium "stale element" error
            // just continue the loop
            continue;
          }
          if (text.includes("Spelare 2, drag")) {
            await sleep(sleepTime);
            await playGamesolverBoard();
            await sleep(1000);
            await playOurBoard();
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
          await sleep(sleepTime);
        }
        gamesPlayed++;
        // Klickar och startar en ny match igen.
        if (gamesPlayed < gamesToPlay) {
          jsonWriteData();
          await sleep(100)
          againButton = await $(".again-btn");
          await againButton.click();
          await sleep(1000);
          beginButton = await $(".begin-btn");
          await beginButton.click();
          await sleep(sleepTime * 2);
          restart = await $$("#new");
          await restart.click();
          await sleep(sleepTime);
          await gamesolverDriver.navigate().refresh();
          thePBoard = await cleanBoardToArray();
          await sleep(sleepTime);
          player2Button = await $$("#player_2");
          await player2Button.click();
          await sleep(sleepTime * 4);
        }
      } while (gamesPlayed < gamesToPlay);
      jsonWriteData();
      await sleep(100)
    }
  );

  this.Then(/^the gamesolver bot should always win$/, async function() {
    let data = fs.readFileSync("output.json", "utf8");
    let words = JSON.parse(data);
    let player1 = words.spelare1.length;
    let player2 = words.spelare2.length;
    let totalAmount = player1 + player2
    assert(player1 == 0, 'Gamesolver har inte vunnit alla spel')
    assert(spelare1 < spelare2, 'Four-With-Bot har vunnit flest matcher')
    scenarioName.attach(`Gamesolver has won ${player2} of the ${totalAmount} games played`, 'text/html');
  });
};

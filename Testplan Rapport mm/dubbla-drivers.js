//först: npm install selenium-webdriver.
//glöm inte scenario (gamesolver vs smartbot)
//det krävs att båda sidorna spelar med human vs bot respektive
//Gamesolverboten borde vinna varje gång.

//måste importera Builder från selenium
const {Builder} = require('selenium-webdriver')

let choices = ['bot', 'human']
let currentChoice = choices.shift //choices.shift switchar i arrayen.

let gameSolverDriver;

//i givenstep plutta in koden som skapar en ny driver, denna driver saknar helperfunktioner
//men detta nedan öppnar Gamesolver i ett nytt fönster

gameSolverDriver = await new Builder().forBrowser('chrome').build()
await gameSolverDriver.get('https://connect4.gamesolver.org')
await SVGPathSegClosePath(sleepTime * 5)

//efter detta krävs att sätta sg in i DOM på gamesolver, och välja spelare


skapa en array för four-with-bot spottar ut data som:
    a[index]red/yellow/empty

Array för gamesolver spottar ut data som:
    b[index]red/yellow/empty

red_bricks sparar index för alla röda brickor från four-with-bot
yellow_bricks sparar index för alla gula brickor från gamesolver (denna kan tas från #board eller .solver)

loop/else-if/function
 läser indexdata från variabel red_bricks
 klickar på motsvarande kolumn i gamesolver
 kolla om vinst/förslust/oavgjort 
  if vinst/förlust/oavgjort 
  break
 

 läser indexdata från variabel yellow_bricks
 klickar på motsvarande kolumn i four-with-bot
  kolla om vinst/förslust/oavgjort 
  if vinst/förlust/oavgjort 
  break

 repeat

 tadaa ... 
 Logiken är ful och tung, men fungerar för gamesolver. Arbetar på den imorn när/om febern lagt sig.

 Arrayerna behöver inte ha a och b i dem, la det där för att jag i framtiden kanske vill kunna särskilja datan från dem.





